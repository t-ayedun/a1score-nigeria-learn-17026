import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search, FileText, Network, TrendingUp, Plus, BookOpen,
  Download, Filter, Star, Quote, Lightbulb, ArrowRight
} from "lucide-react";
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
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Literature Review Assistant
          </CardTitle>
          <p className="text-muted-foreground">
            AI-powered research discovery and systematic literature review tools
          </p>
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
              <Button variant="outline">
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
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Export as Word
                </Button>
                <Button variant="outline">
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