import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen, Download, Upload, Search, Plus, Trash2,
  Copy, Check, FileText, Quote, Settings, Import
} from "lucide-react";
import BackToDashboard from "@/components/shared/BackToDashboard";
import PageHeader from "@/components/shared/PageHeader";

interface Reference {
  id: string;
  type: 'journal' | 'book' | 'conference' | 'thesis' | 'website';
  title: string;
  authors: string[];
  year: number;
  journal?: string;
  volume?: string;
  pages?: string;
  doi?: string;
  url?: string;
  publisher?: string;
  tags: string[];
  notes: string;
  dateAdded: string;
}

interface ReferenceManagerProps {
  onBackToDashboard?: () => void;
}

const ReferenceManager = ({ onBackToDashboard }: ReferenceManagerProps = {}) => {
  const [references, setReferences] = useState<Reference[]>([
    {
      id: "1",
      type: "journal",
      title: "Machine Learning in Educational Technology",
      authors: ["Smith, J.", "Johnson, M."],
      year: 2023,
      journal: "Computers & Education",
      volume: "45",
      pages: "123-145",
      doi: "10.1016/j.compedu.2023.01.001",
      tags: ["AI", "Education", "Technology"],
      notes: "Excellent overview of current ML applications in education",
      dateAdded: "2024-01-15"
    },
    {
      id: "2",
      type: "book",
      title: "Research Methods in Education",
      authors: ["Brown, A.", "Davis, P."],
      year: 2022,
      publisher: "Academic Press",
      tags: ["Research", "Methodology"],
      notes: "Comprehensive guide to educational research methods",
      dateAdded: "2024-01-10"
    }
  ]);

  const [citationStyle, setCitationStyle] = useState("apa");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReference, setSelectedReference] = useState<Reference | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [newReference, setNewReference] = useState<Partial<Reference>>({
    type: 'journal',
    title: '',
    authors: [''],
    year: new Date().getFullYear(),
    tags: [],
    notes: ''
  });

  const citationStyles = {
    apa: "APA 7th Edition",
    mla: "MLA 8th Edition",
    chicago: "Chicago 17th Edition",
    harvard: "Harvard",
    ieee: "IEEE",
    nature: "Nature"
  };

  const formatCitation = (ref: Reference, style: string): string => {
    const authors = ref.authors.join(", ");
    
    switch (style) {
      case "apa":
        if (ref.type === "journal") {
          return `${authors} (${ref.year}). ${ref.title}. ${ref.journal}, ${ref.volume}, ${ref.pages}. ${ref.doi ? `https://doi.org/${ref.doi}` : ''}`;
        }
        return `${authors} (${ref.year}). ${ref.title}. ${ref.publisher}.`;
      
      case "mla":
        return `${authors}. "${ref.title}." ${ref.journal || ref.publisher}, ${ref.year}, ${ref.pages || ''}.`;
      
      default:
        return `${authors} (${ref.year}). ${ref.title}.`;
    }
  };

  const handleCopyCitation = (ref: Reference) => {
    const citation = formatCitation(ref, citationStyle);
    navigator.clipboard.writeText(citation);
    setCopiedId(ref.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const addReference = () => {
    const ref: Reference = {
      ...newReference as Reference,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString().split('T')[0]
    };
    setReferences(prev => [ref, ...prev]);
    setNewReference({
      type: 'journal',
      title: '',
      authors: [''],
      year: new Date().getFullYear(),
      tags: [],
      notes: ''
    });
    setShowAddForm(false);
  };

  const deleteReference = (id: string) => {
    setReferences(prev => prev.filter(ref => ref.id !== id));
  };

  const filteredReferences = references.filter(ref =>
    ref.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ref.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
    ref.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {onBackToDashboard && (
        <BackToDashboard onClick={onBackToDashboard} />
      )}

      <PageHeader
        title="Reference Manager"
        description="Organize and manage your research references"
        breadcrumbs={[
          { label: "Dashboard", onClick: onBackToDashboard },
          { label: "References" }
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Quote className="h-5 w-5" />
            Reference & Citation Manager
          </CardTitle>
          <p className="text-muted-foreground">
            Organize references and generate citations in multiple academic styles
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="library" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="library">Reference Library</TabsTrigger>
          <TabsTrigger value="add">Add Reference</TabsTrigger>
          <TabsTrigger value="import">Import/Export</TabsTrigger>
          <TabsTrigger value="styles">Citation Styles</TabsTrigger>
        </TabsList>

        <TabsContent value="library" className="space-y-6">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search references by title, author, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={citationStyle} onValueChange={setCitationStyle}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(citationStyles).map(([key, name]) => (
                  <SelectItem key={key} value={key}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {filteredReferences.map(ref => (
              <Card key={ref.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {ref.type.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Added {ref.dateAdded}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg mb-1">{ref.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {ref.authors.join(", ")} ({ref.year})
                      </p>
                      {ref.journal && (
                        <p className="text-sm text-muted-foreground">
                          {ref.journal} {ref.volume && `${ref.volume}`} {ref.pages && `pp. ${ref.pages}`}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopyCitation(ref)}
                      >
                        {copiedId === ref.id ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteReference(ref.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-xs text-muted-foreground mb-1">Citation ({citationStyles[citationStyle]}):</div>
                    <div className="text-sm bg-gray-50 p-2 rounded border font-mono">
                      {formatCitation(ref, citationStyle)}
                    </div>
                  </div>

                  {ref.tags.length > 0 && (
                    <div className="flex gap-1 mb-2">
                      {ref.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {ref.notes && (
                    <div className="text-sm text-muted-foreground bg-blue-50 p-2 rounded">
                      <strong>Notes:</strong> {ref.notes}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="add" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Reference</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Reference Type</label>
                  <Select value={newReference.type} onValueChange={(value) => 
                    setNewReference(prev => ({...prev, type: value as any}))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="journal">Journal Article</SelectItem>
                      <SelectItem value="book">Book</SelectItem>
                      <SelectItem value="conference">Conference Paper</SelectItem>
                      <SelectItem value="thesis">Thesis/Dissertation</SelectItem>
                      <SelectItem value="website">Website</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Year</label>
                  <Input
                    type="number"
                    value={newReference.year}
                    onChange={(e) => setNewReference(prev => ({...prev, year: parseInt(e.target.value)}))}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={newReference.title}
                  onChange={(e) => setNewReference(prev => ({...prev, title: e.target.value}))}
                  placeholder="Enter the title of the work"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Authors (one per line)</label>
                <Textarea
                  value={newReference.authors?.join('\n')}
                  onChange={(e) => setNewReference(prev => ({...prev, authors: e.target.value.split('\n').filter(a => a.trim())}))}
                  placeholder="Smith, J.\nJohnson, M."
                  className="min-h-[80px]"
                />
              </div>

              {newReference.type === 'journal' && (
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Journal</label>
                    <Input
                      value={newReference.journal || ''}
                      onChange={(e) => setNewReference(prev => ({...prev, journal: e.target.value}))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Volume</label>
                    <Input
                      value={newReference.volume || ''}
                      onChange={(e) => setNewReference(prev => ({...prev, volume: e.target.value}))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Pages</label>
                    <Input
                      value={newReference.pages || ''}
                      onChange={(e) => setNewReference(prev => ({...prev, pages: e.target.value}))}
                      placeholder="123-145"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-sm font-medium">DOI or URL</label>
                <Input
                  value={newReference.doi || newReference.url || ''}
                  onChange={(e) => setNewReference(prev => ({...prev, doi: e.target.value}))}
                  placeholder="10.1000/example or https://..."
                />
              </div>

              <div>
                <label className="text-sm font-medium">Tags (comma-separated)</label>
                <Input
                  value={newReference.tags?.join(', ')}
                  onChange={(e) => setNewReference(prev => ({...prev, tags: e.target.value.split(',').map(t => t.trim()).filter(t => t)}))}
                  placeholder="AI, Education, Technology"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Notes</label>
                <Textarea
                  value={newReference.notes}
                  onChange={(e) => setNewReference(prev => ({...prev, notes: e.target.value}))}
                  placeholder="Personal notes about this reference..."
                />
              </div>

              <Button onClick={addReference} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Reference
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="import" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Import References
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Import className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    Drop BibTeX, RIS, or CSV files here
                  </p>
                  <Button variant="outline" className="mt-2">
                    Browse Files
                  </Button>
                </div>
                <div className="text-xs text-gray-500">
                  Supported formats: .bib, .ris, .csv, .json
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Export References
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Export as BibTeX (.bib)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Export as RIS (.ris)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Export as CSV (.csv)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Export Bibliography (Word)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="styles" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Citation Style Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                {Object.entries(citationStyles).map(([key, name]) => (
                  <Card key={key} className={`p-4 cursor-pointer transition-colors ${citationStyle === key ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => setCitationStyle(key)}>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{name}</h3>
                        <p className="text-sm text-gray-600">
                          {key === 'apa' && 'Most common in psychology, education, and social sciences'}
                          {key === 'mla' && 'Standard for literature, arts, and humanities'}
                          {key === 'chicago' && 'Used in history, literature, and the arts'}
                          {key === 'harvard' && 'Popular in UK universities and business'}
                          {key === 'ieee' && 'Standard for engineering and computer science'}
                          {key === 'nature' && 'Scientific journal format'}
                        </p>
                      </div>
                      {citationStyle === key && (
                        <Check className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReferenceManager;