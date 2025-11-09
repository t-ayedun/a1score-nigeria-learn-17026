import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BookOpen, 
  PlayCircle, 
  FileText, 
  Activity, 
  Clock, 
  Star, 
  Search,
  Filter,
  Download,
  ExternalLink,
  Heart,
  Users,
  Target,
  Award
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface LearningResource {
  id: string;
  title: string;
  description: string;
  resource_type: 'guide' | 'activity' | 'tip' | 'video' | 'article';
  target_age_group: string;
  subject: string;
  content: string;
  external_url?: string;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  estimated_duration: number;
  tags: string[];
  is_featured: boolean;
  created_at: string;
}

const HomeLearningResources = () => {
  const [resources, setResources] = useState<LearningResource[]>([]);
  const [filteredResources, setFilteredResources] = useState<LearningResource[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchResources();
  }, []);

  useEffect(() => {
    filterResources();
  }, [resources, searchTerm, selectedCategory, selectedSubject, selectedDifficulty]);

  const fetchResources = async () => {
    try {
      setLoading(true);
      
      // Fetch from database
      const { data: dbResources } = await supabase
        .from('home_learning_resources')
        .select('*')
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      // Add mock data to demonstrate features
      const mockResources: LearningResource[] = [
        {
          id: 'mock1',
          title: "Supporting Your Child's Math Journey",
          description: "Comprehensive guide for parents to help their children excel in mathematics through engaging activities and proven strategies.",
          resource_type: 'guide',
          target_age_group: 'JSS 1-3',
          subject: 'Mathematics',
          content: `# Supporting Your Child's Math Journey

## Understanding the Nigerian Math Curriculum

The Nigerian mathematics curriculum is designed to build strong foundational skills in:
- Number and numeration
- Basic operations
- Algebraic processes
- Geometry and mensuration
- Statistics and probability

## How to Help at Home

### 1. Create a Math-Positive Environment
- Celebrate math discoveries and problem-solving
- Avoid saying "I'm not a math person"
- Show how math is used in daily life

### 2. Practice with Real-World Applications
- Cooking: Measuring ingredients, doubling recipes
- Shopping: Calculating change, comparing prices
- Home projects: Measuring spaces, calculating areas

### 3. Study Schedule Tips
- Set aside 20-30 minutes daily for math practice
- Use the "little and often" approach
- Mix review of old concepts with new learning

### 4. Working with AI Tutors
When your child uses AI tutoring:
- Encourage them to explain their thinking process
- Ask them to teach you what they learned
- Review the AI's explanations together

### 5. Signs Your Child Needs Extra Help
- Consistently struggling with homework
- Avoiding math-related activities
- Expressing strong negative feelings about math
- Declining grades despite effort

### 6. Communication with Teachers
- Attend parent-teacher conferences
- Ask specific questions about your child's progress
- Request concrete ways to help at home
- Share observations about your child's learning style

## Resources for Different Learning Styles

### Visual Learners
- Use charts, graphs, and diagrams
- Encourage drawing to solve problems
- Use color-coding for different operations

### Auditory Learners
- Talk through problems step by step
- Use math songs and rhymes
- Encourage verbal explanation of solutions

### Kinesthetic Learners
- Use manipulatives and hands-on activities
- Incorporate movement into learning
- Use real objects for counting and measuring

## Building Confidence

### Praise the Process, Not Just Results
- "I can see you really thought about that problem"
- "You tried a different strategy when the first one didn't work"
- "You kept working even when it was challenging"

### Mistakes Are Learning Opportunities
- Model how to learn from errors
- Show that mistakes are normal and valuable
- Encourage multiple solution methods

Remember: Your involvement and positive attitude toward mathematics significantly impacts your child's success and confidence in the subject.`,
          difficulty_level: 'beginner',
          estimated_duration: 15,
          tags: ['mathematics', 'parent-guide', 'study-tips', 'confidence-building'],
          is_featured: true,
          created_at: '2024-01-15T10:00:00Z'
        },
        {
          id: 'mock2',
          title: "Creating Healthy Study Habits",
          description: "Essential strategies for establishing productive study routines and creating an optimal learning environment at home.",
          resource_type: 'article',
          target_age_group: 'All Ages',
          subject: 'Study Skills',
          content: `# Creating Healthy Study Habits

## The Science of Effective Learning

Research shows that consistent, well-structured study habits significantly improve academic performance and reduce stress for both students and parents.

## Setting Up the Physical Environment

### The Ideal Study Space
- Quiet, well-lit area away from distractions
- Comfortable chair and appropriate desk height
- Good ventilation and temperature control
- Organized supplies within easy reach

### Technology Guidelines
- Designated device-free zones and times
- Use of website blockers during study time
- Educational apps and tools only during study sessions
- Regular digital detox periods

## Time Management Strategies

### The Pomodoro Technique for Students
- 25 minutes of focused study
- 5-minute break
- Repeat 3-4 times
- Longer break (15-30 minutes) after 4 cycles

### Weekly Planning
- Sunday planning sessions with your child
- Color-coded calendar for different subjects
- Balance of study time, activities, and rest
- Buffer time for unexpected assignments

## Building Motivation

### Intrinsic vs. Extrinsic Motivation
- Focus on learning goals, not just grades
- Celebrate effort and improvement
- Connect learning to your child's interests
- Encourage curiosity and questions

### Reward Systems That Work
- Non-material rewards (special activities, privileges)
- Achievement charts for younger children
- Goal-setting and progress tracking
- Family celebrations for milestones

## Dealing with Study Challenges

### When Your Child Resists Studying
- Identify underlying causes (too difficult, boring, overwhelming)
- Break tasks into smaller, manageable chunks
- Offer choices within structure
- Use positive reinforcement

### Managing Stress and Anxiety
- Teach relaxation techniques
- Maintain perspective on grades and performance
- Encourage open communication about concerns
- Know when to seek additional support

## Working with AI Learning Tools

### Guidelines for AI Tutor Use
- Set clear time limits
- Review AI interactions together
- Encourage critical thinking about AI responses
- Use AI as a supplement, not replacement for human learning

### Ethics and Academic Integrity
- Teach proper use of AI assistance
- Distinguish between help and cheating
- Encourage original thinking and effort
- Model honest academic practices

## Nutrition and Study Performance

### Brain-Healthy Foods
- Omega-3 rich foods (fish, nuts)
- Fresh fruits and vegetables
- Whole grains for sustained energy
- Adequate hydration

### Study Snacks
- Mixed nuts and dried fruits
- Greek yogurt with berries
- Apple slices with peanut butter
- Avoid sugary snacks that cause energy crashes

## Sleep and Academic Success

### Age-Appropriate Sleep Guidelines
- JSS students: 9-11 hours
- SS students: 8-10 hours
- Consistent bedtime routines
- Screen-free time before bed

## Communication with School

### Regular Check-ins
- Weekly discussions about school
- Review of assignments and progress
- Coordination with teachers on study strategies
- Addressing concerns promptly

Your role as a parent is crucial in establishing these foundations for lifelong learning success.`,
          difficulty_level: 'beginner',
          estimated_duration: 10,
          tags: ['study-habits', 'environment', 'time-management', 'motivation'],
          is_featured: true,
          created_at: '2024-01-14T09:00:00Z'
        },
        {
          id: 'mock3',
          title: "Understanding AI in Your Child's Education",
          description: "A parent's guide to artificial intelligence tutoring, its benefits, limitations, and how to ensure responsible use.",
          resource_type: 'video',
          target_age_group: 'Parents',
          subject: 'Technology',
          content: `# Understanding AI in Your Child's Education

## What is AI Tutoring?

Artificial Intelligence tutoring uses computer systems that can:
- Understand your child's questions in natural language
- Provide personalized explanations based on learning style
- Adapt difficulty level to your child's current understanding
- Available 24/7 for immediate help

## Benefits of AI Tutoring

### Personalized Learning
- Adapts to your child's pace and style
- Provides unlimited patience and practice opportunities
- Offers multiple explanation methods for the same concept
- Identifies knowledge gaps automatically

### Accessibility
- Available anytime your child needs help
- Consistent quality of responses
- No scheduling constraints
- Supports multiple languages including Nigerian languages

### Confidence Building
- No fear of judgment or embarrassment
- Safe space to make mistakes and learn
- Encourages questions and exploration
- Builds independence in learning

## Potential Concerns and Limitations

### What AI Cannot Do
- Replace human connection and mentorship
- Understand complex emotional needs
- Provide physical demonstrations
- Adapt to unique cultural contexts automatically

### Academic Integrity Concerns
- Risk of over-dependence on AI assistance
- Potential for academic dishonesty
- Need for clear boundaries on appropriate use
- Importance of developing original thinking skills

## Guidelines for Responsible AI Use

### Setting Boundaries
- Establish clear rules about when AI help is appropriate
- Teach the difference between getting help and cheating
- Encourage effort before seeking AI assistance
- Review AI-assisted work together

### Maintaining Human Connection
- Regular check-ins about AI interactions
- Encourage questions to human teachers
- Balance AI time with human tutoring
- Preserve family study time

## Red Flags to Watch For

### Signs of Over-Dependence
- Child cannot solve problems without AI help
- Declining performance on tests vs. homework
- Reluctance to ask human teachers for help
- Loss of problem-solving confidence

### Academic Integrity Issues
- Submitting AI-generated work as original
- Using AI during exams or assessments
- Copying AI responses without understanding
- Avoiding effort on challenging problems

## Best Practices for Parents

### Monitoring AI Interactions
- Review conversation logs regularly
- Discuss interesting AI responses
- Encourage critical thinking about AI suggestions
- Set time limits for AI tutoring sessions

### Encouraging Critical Thinking
- Ask your child to explain AI-provided solutions
- Encourage questioning of AI responses
- Teach verification of information
- Promote independent problem-solving

## Supporting Your Child's Learning Journey

### Balancing Technology and Traditional Methods
- Use AI as one tool among many
- Maintain importance of textbooks and human teachers
- Encourage offline learning and thinking time
- Value process over just getting answers

### Building Digital Literacy
- Teach responsible technology use
- Discuss AI capabilities and limitations
- Encourage ethical decision-making
- Model appropriate technology behavior

## Communication with Teachers

### What to Share
- How your child uses AI at home
- Any concerns about AI dependence
- Questions about school AI policies
- Observations about learning patterns

### What to Ask
- School policies on AI use
- How teachers integrate AI in learning
- Warning signs teachers watch for
- Ways to support AI ethics at home

## The Future of AI in Education

As AI continues to evolve, helping your child develop a healthy, ethical relationship with AI technology will serve them throughout their educational journey and beyond.

Remember: AI is a powerful tool that works best when combined with human guidance, creativity, and critical thinking skills.`,
          difficulty_level: 'intermediate',
          estimated_duration: 8,
          tags: ['AI-education', 'technology', 'ethics', 'digital-literacy'],
          is_featured: true,
          created_at: '2024-01-13T14:30:00Z'
        },
        {
          id: 'mock4',
          title: "Family Learning Activities",
          description: "Fun, educational activities that bring the whole family together while reinforcing academic concepts in an enjoyable way.",
          resource_type: 'activity',
          target_age_group: 'All Ages',
          subject: 'General',
          content: `# Family Learning Activities

## Mathematics Activities

### 1. Kitchen Math Adventures
**Age Group:** All ages  
**Duration:** 30-45 minutes  
**Materials:** Measuring cups, ingredients, calculator

**Activity:**
- Cook traditional Nigerian dishes together
- Double or halve recipes (fractions and multiplication)
- Calculate cooking times and temperatures
- Measure ingredients using metric and imperial units
- Calculate cost per serving

**Learning Outcomes:**
- Practical application of fractions
- Understanding of ratios and proportions
- Money management skills
- Cultural connection through food

### 2. Market Day Mathematics
**Age Group:** JSS and SS students  
**Duration:** 2-3 hours (including market visit)  
**Materials:** Calculator, notepad, budget

**Activity:**
- Plan a family meal with a set budget
- Visit local market together
- Compare prices between vendors
- Calculate best value for money
- Practice negotiation skills in appropriate contexts

**Learning Outcomes:**
- Real-world arithmetic applications
- Financial literacy
- Critical thinking and comparison skills
- Cultural and social awareness

## Science Exploration

### 3. Weather Station Project
**Age Group:** JSS 1-3  
**Duration:** Ongoing (daily observations)  
**Materials:** Thermometer, rain gauge, wind vane, notebook

**Activity:**
- Create a family weather station
- Record daily temperature, rainfall, wind direction
- Create graphs and charts of weather patterns
- Discuss climate vs. weather
- Connect to geography lessons about Nigerian climate zones

**Learning Outcomes:**
- Data collection and analysis
- Understanding of scientific method
- Graph interpretation skills
- Environmental awareness

### 4. Garden Science Laboratory
**Age Group:** All ages  
**Duration:** Seasonal project  
**Materials:** Seeds, soil, containers, measuring tools

**Activity:**
- Plant and maintain a family garden
- Test different growing conditions
- Measure plant growth over time
- Study plant biology and nutrition
- Connect to food security and nutrition

**Learning Outcomes:**
- Biology concepts
- Scientific observation skills
- Environmental stewardship
- Nutrition awareness

## Language Arts Activities

### 5. Family Storytelling Circle
**Age Group:** All ages  
**Duration:** 1 hour weekly  
**Materials:** None required

**Activity:**
- Share traditional family stories and folklore
- Create new stories together
- Practice storytelling in English and local languages
- Record stories for younger siblings
- Discuss moral lessons and cultural values

**Learning Outcomes:**
- Oral communication skills
- Cultural preservation
- Creative expression
- Vocabulary development

### 6. Community Newsletter Project
**Age Group:** SS students  
**Duration:** Monthly project  
**Materials:** Computer/paper, camera

**Activity:**
- Create a family or neighborhood newsletter
- Interview family members and neighbors
- Write articles about community events
- Practice editing and proofreading
- Share with extended family

**Learning Outcomes:**
- Writing and journalism skills
- Interview techniques
- Community engagement
- Digital literacy

## Social Studies and Culture

### 7. Family Heritage Map
**Age Group:** All ages  
**Duration:** Multi-week project  
**Materials:** Map, markers, photos, research materials

**Activity:**
- Research family history and origins
- Map family migration patterns
- Interview elderly relatives
- Create a visual family tree
- Discuss historical events that affected the family

**Learning Outcomes:**
- Historical research skills
- Geography knowledge
- Cultural identity and pride
- Interview and communication skills

### 8. Economics of Household
**Age Group:** SS students  
**Duration:** Monthly analysis  
**Materials:** Household bills, calculator, spreadsheet

**Activity:**
- Analyze family budget together
- Discuss income, expenses, and savings
- Compare prices for family necessities
- Plan for family goals and purchases
- Understand concepts of supply and demand

**Learning Outcomes:**
- Financial literacy
- Economics concepts
- Planning and goal-setting
- Responsible resource management

## Technology and Digital Literacy

### 9. Digital Safety Workshop
**Age Group:** All ages  
**Duration:** 2-3 hours  
**Materials:** Computer, internet access

**Activity:**
- Explore online safety together
- Create strong passwords as a family
- Discuss appropriate online behavior
- Practice identifying reliable vs. unreliable sources
- Set family technology agreements

**Learning Outcomes:**
- Digital citizenship skills
- Critical thinking about online information
- Family communication about technology
- Safety awareness

### 10. Family Documentary Project
**Age Group:** SS students  
**Duration:** Multi-week project  
**Materials:** Camera/phone, editing software

**Activity:**
- Create a documentary about family traditions
- Interview family members
- Learn basic video editing
- Research documentary techniques
- Share with extended family

**Learning Outcomes:**
- Media literacy
- Technical skills
- Historical documentation
- Creative expression

## Tips for Success

### Making Activities Engaging
- Connect to your child's interests
- Allow for creativity and personal expression
- Celebrate efforts and discoveries
- Be flexible with timing and approaches
- Include breaks and fun elements

### Adapting for Different Ages
- Give younger children simpler tasks
- Allow older children to lead portions
- Create roles for everyone to contribute
- Adjust complexity based on abilities
- Encourage peer teaching between siblings

### Connecting to School Learning
- Review current school topics
- Reinforce concepts being taught
- Extend classroom learning at home
- Share activities with teachers
- Use activities to identify learning strengths and challenges

### Building Family Bonds
- Focus on collaboration, not competition
- Celebrate everyone's contributions
- Create positive learning memories
- Establish family learning traditions
- Document your learning journey together

These activities are designed to make learning a natural, enjoyable part of family life while supporting your child's academic development.`,
          difficulty_level: 'beginner',
          estimated_duration: 30,
          tags: ['family-activities', 'hands-on-learning', 'bonding', 'cultural-connection'],
          is_featured: false,
          created_at: '2024-01-12T11:00:00Z'
        }
      ];

      const allResources = [...(dbResources || []), ...mockResources] as LearningResource[];
      setResources(allResources);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load learning resources",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filterResources = () => {
    let filtered = resources;

    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(resource => resource.resource_type === selectedCategory);
    }

    if (selectedSubject !== 'all') {
      filtered = filtered.filter(resource => resource.subject === selectedSubject);
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(resource => resource.difficulty_level === selectedDifficulty);
    }

    setFilteredResources(filtered);
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video': return <PlayCircle className="h-5 w-5" />;
      case 'guide': return <BookOpen className="h-5 w-5" />;
      case 'article': return <FileText className="h-5 w-5" />;
      case 'activity': return <Activity className="h-5 w-5" />;
      case 'tip': return <Star className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'guide': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'article': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
      case 'activity': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'tip': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const subjects = [...new Set(resources.map(r => r.subject))];

  if (loading) {
    return <div className="p-6">Loading learning resources...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Home Learning Resources</h1>
        <p className="text-muted-foreground">
          Expert-curated resources to support your child's learning journey at home
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="guide">Guides</SelectItem>
                <SelectItem value="article">Articles</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="activity">Activities</SelectItem>
                <SelectItem value="tip">Tips</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map(subject => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="h-full flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      {getResourceIcon(resource.resource_type)}
                      <Badge className={getTypeColor(resource.resource_type)}>
                        {resource.resource_type}
                      </Badge>
                    </div>
                    {resource.is_featured && (
                      <Badge variant="default" className="bg-yellow-500">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground mb-4 flex-1">
                    {resource.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">
                        {resource.target_age_group}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {resource.subject}
                      </Badge>
                      <Badge className={`text-xs ${getDifficultyColor(resource.difficulty_level)}`}>
                        {resource.difficulty_level}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {resource.estimated_duration} min
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        Family
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {resource.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {resource.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{resource.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button 
                        className="flex-1"
                        onClick={() => {
                          // In a real app, this would open a modal or navigate to a detailed view
                          toast({
                            title: "Resource Opened",
                            description: `Opening: ${resource.title}`
                          });
                        }}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Read
                      </Button>
                      {resource.external_url && (
                        <Button variant="outline" size="icon">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="outline" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="featured">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.filter(r => r.is_featured).map((resource) => (
              <Card key={resource.id} className="h-full flex flex-col border-yellow-200 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-800">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      {getResourceIcon(resource.resource_type)}
                      <Badge className={getTypeColor(resource.resource_type)}>
                        {resource.resource_type}
                      </Badge>
                    </div>
                    <Badge variant="default" className="bg-yellow-500">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground mb-4 flex-1">
                    {resource.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">
                        {resource.target_age_group}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {resource.subject}
                      </Badge>
                      <Badge className={`text-xs ${getDifficultyColor(resource.difficulty_level)}`}>
                        {resource.difficulty_level}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {resource.estimated_duration} min
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4" />
                        Top Rated
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Start Learning
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="guides">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredResources.filter(r => r.resource_type === 'guide').map((resource) => (
              <Card key={resource.id} className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    <Badge className={getTypeColor('guide')}>Guide</Badge>
                    {resource.is_featured && (
                      <Badge variant="default" className="bg-yellow-500">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardTitle>{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {resource.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {resource.estimated_duration} min read
                    </div>
                    <Button>
                      Read Guide
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activities">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredResources.filter(r => r.resource_type === 'activity').map((resource) => (
              <Card key={resource.id} className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    <Badge className={getTypeColor('activity')}>Activity</Badge>
                  </div>
                  <CardTitle>{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {resource.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {resource.estimated_duration} min
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        Family
                      </div>
                    </div>
                    <Button>
                      Start Activity
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="videos">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.filter(r => r.resource_type === 'video').map((resource) => (
              <Card key={resource.id} className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <PlayCircle className="h-5 w-5" />
                    <Badge className={getTypeColor('video')}>Video</Badge>
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {resource.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {resource.estimated_duration} min watch
                    </div>
                    <Button>
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Watch
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No resources found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or browse all resources.
          </p>
        </div>
      )}
    </div>
  );
};

export default HomeLearningResources;