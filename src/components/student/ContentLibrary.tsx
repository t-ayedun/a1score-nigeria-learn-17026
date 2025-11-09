import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useContentGeneration } from '@/hooks/useContentGeneration';
import { 
  BookOpen, 
  Brain, 
  FileText, 
  ClipboardList,
  Star,
  Search,
  Trash2,
  Download,
  Filter,
  Tag
} from 'lucide-react';
import type { ContentLibraryItem } from '@/types/ai';

const CONTENT_TYPE_ICONS = {
  quiz: ClipboardList,
  practice_test: FileText,
  study_guide: BookOpen,
  mnemonic: Brain,
  concept_map: Brain
};

const CONTENT_TYPE_LABELS = {
  quiz: 'Quiz',
  practice_test: 'Practice Test',
  study_guide: 'Study Guide',
  mnemonic: 'Mnemonics',
  concept_map: 'Concept Map'
};

export function ContentLibrary() {
  const [items, setItems] = useState<ContentLibraryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<ContentLibraryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  
  const { getContentLibrary, deleteFromLibrary, toggleFavorite, loading } = useContentGeneration();

  useEffect(() => {
    loadLibrary();
  }, []);

  useEffect(() => {
    filterItems();
  }, [items, searchQuery, selectedType, selectedSubject]);

  const loadLibrary = async () => {
    const data = await getContentLibrary();
    setItems(data);
  };

  const filterItems = () => {
    let filtered = items;

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(item => item.content_type === selectedType);
    }

    if (selectedSubject !== 'all') {
      filtered = filtered.filter(item => item.subject === selectedSubject);
    }

    setFilteredItems(filtered);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const success = await deleteFromLibrary(id);
      if (success) {
        setItems(items.filter(item => item.id !== id));
      }
    }
  };

  const handleToggleFavorite = async (id: string, isFavorite: boolean) => {
    const success = await toggleFavorite(id, isFavorite);
    if (success) {
      setItems(items.map(item =>
        item.id === id ? { ...item, is_favorite: !isFavorite } : item
      ));
    }
  };

  const subjects = ['all', ...new Set(items.map(item => item.subject))];
  const favorites = filteredItems.filter(item => item.is_favorite);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Content Library
          </CardTitle>
          <CardDescription>
            All your generated study materials in one place
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, subject, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="all">All Types</option>
              <option value="quiz">Quizzes</option>
              <option value="practice_test">Practice Tests</option>
              <option value="study_guide">Study Guides</option>
              <option value="mnemonic">Mnemonics</option>
              <option value="concept_map">Concept Maps</option>
            </select>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>
                  {subject === 'all' ? 'All Subjects' : subject}
                </option>
              ))}
            </select>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="all">All ({filteredItems.length})</TabsTrigger>
              <TabsTrigger value="favorites">Favorites ({favorites.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {filteredItems.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No content found. Generate some study materials to get started!</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredItems.map(item => (
                    <ContentCard
                      key={item.id}
                      item={item}
                      onDelete={handleDelete}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="favorites" className="space-y-4">
              {favorites.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Star className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No favorites yet. Star items to add them here!</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {favorites.map(item => (
                    <ContentCard
                      key={item.id}
                      item={item}
                      onDelete={handleDelete}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

interface ContentCardProps {
  item: ContentLibraryItem;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string, isFavorite: boolean) => void;
}

function ContentCard({ item, onDelete, onToggleFavorite }: ContentCardProps) {
  const Icon = CONTENT_TYPE_ICONS[item.content_type];
  
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Icon className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">{item.title}</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{item.subject}</Badge>
              {item.topic && <Badge variant="outline">{item.topic}</Badge>}
              <Badge>{CONTENT_TYPE_LABELS[item.content_type]}</Badge>
              {item.difficulty && (
                <Badge variant={
                  item.difficulty === 'easy' ? 'default' :
                  item.difficulty === 'medium' ? 'secondary' : 'destructive'
                }>
                  {item.difficulty}
                </Badge>
              )}
            </div>

            {item.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="h-3 w-3 text-muted-foreground" />
                {item.tags.slice(0, 5).map((tag, i) => (
                  <span key={i} className="text-xs text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <p className="text-xs text-muted-foreground">
              Created {new Date(item.created_at).toLocaleDateString()}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onToggleFavorite(item.id, item.is_favorite)}
            >
              <Star
                className={`h-4 w-4 ${item.is_favorite ? 'fill-yellow-400 text-yellow-400' : ''}`}
              />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onDelete(item.id)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
