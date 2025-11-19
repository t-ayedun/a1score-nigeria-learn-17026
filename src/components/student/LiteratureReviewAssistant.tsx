import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search, FileText, Network, TrendingUp, Plus, BookOpen,
  Download, Filter, Star, Quote, Lightbulb, ArrowRight, Save
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BackToDashboard from "@/components/shared/BackToDashboard";
import PageHeader from "@/components/shared/PageHeader";

interface Paper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  journal: string;
  abstract: string;
  citations: number;
  relevanceScore: number;
  keywords: string[];
  doi: string;
  isStarred: boolean;
}

interface LiteratureReviewAssistantProps {
  onBackToDashboard?: () => void;
}

const LiteratureReviewAssistant = ({ onBackToDashboard }: LiteratureReviewAssistantProps = {}) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [papers, setPapers] = useState<Paper[]>([
    {
      id: "1",
      title: "Machine Learning Applications in Educational Assessment",
      authors: ["Dr. Sarah Johnson", "Prof. Michael Chen"],
      year: 2023,
      journal: "Journal of Educational Technology",
      abstract: "This study explores the implementation of machine learning algorithms in automated educational assessment systems...",
      citations: 45,
      relevanceScore: 94,
      keywords: ["machine learning", "education", "assessment", "AI"],
      doi: "10.1000/example",
      isStarred: false
    },
    {
      id: "2",
      title: "Natural Language Processing for Academic Writing Support",
      authors: ["Dr. Emily Rodriguez", "Dr. James Park"],
      year: 2022,
      journal: "Computers & Education",
      abstract: "We present a comprehensive framework for using NLP techniques to provide real-time writing assistance...",
      citations: 78,
      relevanceScore: 89,
      keywords: ["NLP", "academic writing", "automation", "linguistics"],
      doi: "10.1000/example2",
      isStarred: true
    }
  ]);

  const [reviewOutline, setReviewOutline] = useState({
    introduction: "",
    methodology: "",
    keyThemes: [] as string[],
    gaps: [] as string[],
    conclusion: ""
  });

  const [searchProgress, setSearchProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("search");
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);

  // Load saved review from localStorage on mount
  useEffect(() => {
    const savedReview = localStorage.getItem('literatureReviewDraft');
    if (savedReview) {
      try {
        const draft = JSON.parse(savedReview);
        setPapers(draft.papers);
        setReviewOutline(draft.reviewOutline);
        setLastSavedAt(new Date(draft.savedAt));
      } catch (e) {
        console.error('Failed to load review draft:', e);
      }
    }
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setSearchProgress(0);
    setActiveTab("results");
    
    // Simulate search progress
    const interval = setInterval(() => {
      setSearchProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 20;
      });
    }, 500);

    // Add demo results based on search
    setTimeout(() => {
      const newPaper: Paper = {
        id: Date.now().toString(),
        title: `Recent Advances in ${searchQuery}`,
        authors: ["Dr. Research Author"],
        year: 2024,
        journal: "Academic Journal",
        abstract: `This paper provides a comprehensive review of recent developments in ${searchQuery}...`,
        citations: 12,
        relevanceScore: 85,
        keywords: searchQuery.split(" "),
        doi: "10.1000/new",
        isStarred: false
      };
      setPapers(prev => [newPaper, ...prev]);
    }, 2500);
  };

  const toggleStar = (paperId: string) => {
    setPapers(prev => prev.map(paper => 
      paper.id === paperId ? { ...paper, isStarred: !paper.isStarred } : paper
    ));
  };

  const generateOutline = () => {
    const starredPapers = papers.filter(p => p.isStarred);
    setReviewOutline({
      introduction: `Literature review covering ${starredPapers.length} key papers in the field...`,
      methodology: "Systematic search conducted across major databases including PubMed, IEEE, and Google Scholar...",
      keyThemes: ["Artificial Intelligence", "Educational Technology", "Assessment Methods"],
      gaps: ["Limited longitudinal studies", "Lack of diverse participant demographics"],
      conclusion: "Current research shows promising directions but requires further investigation..."
    });
    setActiveTab("outline");
  };

  const handleSaveDraft = () => {
    const draft = {
      papers,
      reviewOutline,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem('literatureReviewDraft', JSON.stringify(draft));
    setLastSavedAt(new Date());
    toast({
      title: "Review Saved",
      description: "Your literature review has been saved as a draft.",
    });
  };

  const handleExportReferences = () => {
    const starredPapers = papers.filter(p => p.isStarred);
    let bibtex = "";

    starredPapers.forEach((paper, index) => {
      const authors = paper.authors.join(" and ");
      bibtex += `@article{paper${index + 1},\n`;
      bibtex += `  title={${paper.title}},\n`;
      bibtex += `  author={${authors}},\n`;
      bibtex += `  journal={${paper.journal}},\n`;
      bibtex += `  year={${paper.year}},\n`;
      bibtex += `  doi={${paper.doi}}\n`;
      bibtex += `}\n\n`;
    });

    const blob = new Blob([bibtex], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'references.bib';
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "References Exported",
      description: `Exported ${starredPapers.length} references as BibTeX.`,
    });
  };

  const handleExportOutline = () => {
    const content = `# Literature Review Outline\n\n## 1. Introduction\n${reviewOutline.introduction}\n\n## 2. Methodology\n${reviewOutline.methodology}\n\n## 3. Key Themes\n${reviewOutline.keyThemes.map(t => `- ${t}`).join('\n')}\n\n## 4. Research Gaps\n${reviewOutline.gaps.map(g => `- ${g}`).join('\n')}\n\n## 5. Conclusion\n${reviewOutline.conclusion}`;

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'literature-review-outline.md';
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Outline Exported",
      description: "Your literature review outline has been exported.",
    });
  };

  const handleGenerateCitations = () => {
    const starredPapers = papers.filter(p => p.isStarred);
    let apa = "";

    starredPapers.forEach(paper => {
      const authors = paper.authors.join(", ");
      apa += `${authors} (${paper.year}). ${paper.title}. ${paper.journal}. https://doi.org/${paper.doi}\n\n`;
    });

    const blob = new Blob([apa], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'citations-apa.txt';
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Citations Generated",
      description: `Generated ${starredPapers.length} citations in APA format.`,
    });
  };

  // Auto-save every 30 seconds if there's content
  useEffect(() => {
    const hasContent = reviewOutline.introduction || reviewOutline.methodology || reviewOutline.conclusion;
    if (!hasContent) return;

    const autoSaveInterval = setInterval(() => {
      handleSaveDraft();
    }, 30000); // 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [papers, reviewOutline]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {onBackToDashboard && (
        <BackToDashboard onClick={onBackToDashboard} />
      )}

      <PageHeader
        title="Literature Review Assistant"
        description="AI-powered literature review and synthesis"
        breadcrumbs={[
          { label: "Dashboard", onClick: onBackToDashboard },
          { label: "Literature Review" }
        ]}
      />

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Literature Review Assistant
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                AI-powered research discovery and systematic literature review tools
              </p>
              {lastSavedAt && (
                <p className="text-sm text-gray-500 mt-1">
                  Last saved: {lastSavedAt.toLocaleTimeString()}
                </p>
              )}
            </div>
            <Button
              onClick={handleSaveDraft}
              variant="outline"
              size="sm"
              disabled={!reviewOutline.introduction && !papers.some(p => p.isStarred)}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="search">Paper Discovery</TabsTrigger>
          <TabsTrigger value="results">Search Results</TabsTrigger>
          <TabsTrigger value="network">Citation Network</TabsTrigger>
          <TabsTrigger value="outline">Review Outline</TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Smart Literature Search
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input 
                  placeholder="Enter research topic, keywords, or research question..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleSearch} className="bg-primary hover:bg-primary/90">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Search Suggestions</h3>
                  <div className="space-y-2">
                    {["artificial intelligence education", "machine learning assessment", "natural language processing"].map(suggestion => (
                      <Badge 
                        key={suggestion}
                        variant="secondary" 
                        className="cursor-pointer hover:bg-secondary/80"
                        onClick={() => setSearchQuery(suggestion)}
                      >
                        {suggestion}
                      </Badge>
                    ))}
                  </div>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Search Filters</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <span>Year Range: 2020-2024</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>Peer-reviewed only</span>
                    </div>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {searchProgress < 100 && searchProgress > 0 && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Search className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Searching academic databases...</span>
                </div>
                <Progress value={searchProgress} className="w-full" />
              </CardContent>
            </Card>
          )}

          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Search Results ({papers.length})</h3>
            <div className="flex gap-2">
              <Button onClick={generateOutline} variant="outline">
                <Lightbulb className="h-4 w-4 mr-2" />
                Generate Outline
              </Button>
              <Button onClick={handleExportReferences} variant="outline" disabled={!papers.some(p => p.isStarred)}>
                <Download className="h-4 w-4 mr-2" />
                Export References
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {papers.map(paper => (
              <Card key={paper.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{paper.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {paper.authors.join(", ")} • {paper.journal} • {paper.year}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleStar(paper.id)}
                    >
                      <Star className={`h-4 w-4 ${paper.isStarred ? "fill-yellow-400 text-yellow-400" : ""}`} />
                    </Button>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">{paper.abstract}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {paper.keywords.slice(0, 3).map(keyword => (
                        <Badge key={keyword} variant="secondary" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Citations: {paper.citations}</span>
                      <div className="flex items-center gap-1">
                        <span>Relevance:</span>
                        <Badge variant={paper.relevanceScore > 90 ? "default" : "secondary"}>
                          {paper.relevanceScore}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="network" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="h-5 w-5" />
                Citation Network Visualization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Network className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">Interactive citation network will be displayed here</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Visualize relationships between papers and identify research clusters
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="outline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Generated Literature Review Outline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">1. Introduction</h3>
                  <Textarea 
                    value={reviewOutline.introduction}
                    onChange={(e) => setReviewOutline(prev => ({...prev, introduction: e.target.value}))}
                    className="min-h-[100px]"
                  />
                </div>

                <div>
                  <h3 className="font-semibold mb-2">2. Methodology</h3>
                  <Textarea 
                    value={reviewOutline.methodology}
                    onChange={(e) => setReviewOutline(prev => ({...prev, methodology: e.target.value}))}
                    className="min-h-[100px]"
                  />
                </div>

                <div>
                  <h3 className="font-semibold mb-2">3. Key Themes</h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {reviewOutline.keyThemes.map((theme, index) => (
                      <Badge key={index} variant="outline">{theme}</Badge>
                    ))}
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Theme
                  </Button>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">4. Research Gaps</h3>
                  <div className="space-y-2">
                    {reviewOutline.gaps.map((gap, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-yellow-50 rounded">
                        <TrendingUp className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm">{gap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">5. Conclusion</h3>
                  <Textarea 
                    value={reviewOutline.conclusion}
                    onChange={(e) => setReviewOutline(prev => ({...prev, conclusion: e.target.value}))}
                    className="min-h-[100px]"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleExportOutline}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Outline
                </Button>
                <Button variant="outline" onClick={handleGenerateCitations} disabled={!papers.some(p => p.isStarred)}>
                  <Quote className="h-4 w-4 mr-2" />
                  Generate Citations
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LiteratureReviewAssistant;