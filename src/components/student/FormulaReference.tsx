import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calculator, FlaskConical, Atom, Search, Copy, Star,
  BookOpen, Zap, Target, TrendingUp, CheckCircle
} from "lucide-react";
import { toast } from "sonner";
import BackToDashboard from "@/components/shared/BackToDashboard";
import PageHeader from "@/components/shared/PageHeader";

interface Formula {
  id: string;
  name: string;
  formula: string;
  description: string;
  variables: { symbol: string; meaning: string }[];
  example?: string;
  category: string;
  difficulty: 'Basic' | 'Intermediate' | 'Advanced';
  isFavorite?: boolean;
}

interface FormulaReferenceProps {
  onBackToDashboard?: () => void;
}

const FormulaReference = ({ onBackToDashboard }: FormulaReferenceProps = {}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);

  const mathFormulas: Formula[] = [
    {
      id: 'quadratic',
      name: 'Quadratic Formula',
      formula: 'x = (-b ± √(b² - 4ac)) / 2a',
      description: 'Solves quadratic equations of the form ax² + bx + c = 0',
      variables: [
        { symbol: 'a', meaning: 'Coefficient of x²' },
        { symbol: 'b', meaning: 'Coefficient of x' },
        { symbol: 'c', meaning: 'Constant term' }
      ],
      example: 'For x² - 5x + 6 = 0: a=1, b=-5, c=6',
      category: 'Algebra',
      difficulty: 'Intermediate'
    },
    {
      id: 'distance',
      name: 'Distance Formula',
      formula: 'd = √[(x₂-x₁)² + (y₂-y₁)²]',
      description: 'Calculates distance between two points in a coordinate plane',
      variables: [
        { symbol: '(x₁,y₁)', meaning: 'First point coordinates' },
        { symbol: '(x₂,y₂)', meaning: 'Second point coordinates' }
      ],
      category: 'Geometry',
      difficulty: 'Basic'
    },
    {
      id: 'area-circle',
      name: 'Area of Circle',
      formula: 'A = πr²',
      description: 'Calculates the area of a circle',
      variables: [
        { symbol: 'r', meaning: 'Radius of the circle' },
        { symbol: 'π', meaning: 'Pi (≈ 3.14159)' }
      ],
      category: 'Geometry',
      difficulty: 'Basic'
    }
  ];

  const physicsFormulas: Formula[] = [
    {
      id: 'newton-second',
      name: "Newton's Second Law",
      formula: 'F = ma',
      description: 'Relates force, mass, and acceleration',
      variables: [
        { symbol: 'F', meaning: 'Force (Newtons)' },
        { symbol: 'm', meaning: 'Mass (kg)' },
        { symbol: 'a', meaning: 'Acceleration (m/s²)' }
      ],
      category: 'Mechanics',
      difficulty: 'Basic'
    },
    {
      id: 'kinematic',
      name: 'Kinematic Equation',
      formula: 'v² = u² + 2as',
      description: 'Relates velocity, initial velocity, acceleration, and displacement',
      variables: [
        { symbol: 'v', meaning: 'Final velocity (m/s)' },
        { symbol: 'u', meaning: 'Initial velocity (m/s)' },
        { symbol: 'a', meaning: 'Acceleration (m/s²)' },
        { symbol: 's', meaning: 'Displacement (m)' }
      ],
      category: 'Mechanics',
      difficulty: 'Intermediate'
    },
    {
      id: 'ohms-law',
      name: "Ohm's Law",
      formula: 'V = IR',
      description: 'Relates voltage, current, and resistance',
      variables: [
        { symbol: 'V', meaning: 'Voltage (Volts)' },
        { symbol: 'I', meaning: 'Current (Amperes)' },
        { symbol: 'R', meaning: 'Resistance (Ohms)' }
      ],
      category: 'Electricity',
      difficulty: 'Basic'
    }
  ];

  const chemistryFormulas: Formula[] = [
    {
      id: 'ideal-gas',
      name: 'Ideal Gas Law',
      formula: 'PV = nRT',
      description: 'Relates pressure, volume, amount, and temperature of an ideal gas',
      variables: [
        { symbol: 'P', meaning: 'Pressure (atm)' },
        { symbol: 'V', meaning: 'Volume (L)' },
        { symbol: 'n', meaning: 'Amount of substance (mol)' },
        { symbol: 'R', meaning: 'Gas constant (0.082 L·atm/mol·K)' },
        { symbol: 'T', meaning: 'Temperature (K)' }
      ],
      category: 'Physical Chemistry',
      difficulty: 'Intermediate'
    },
    {
      id: 'molarity',
      name: 'Molarity',
      formula: 'M = n/V',
      description: 'Calculates the molarity (concentration) of a solution',
      variables: [
        { symbol: 'M', meaning: 'Molarity (mol/L)' },
        { symbol: 'n', meaning: 'Moles of solute' },
        { symbol: 'V', meaning: 'Volume of solution (L)' }
      ],
      category: 'Solution Chemistry',
      difficulty: 'Basic'
    },
    {
      id: 'ph',
      name: 'pH Formula',
      formula: 'pH = -log[H⁺]',
      description: 'Calculates the pH of a solution',
      variables: [
        { symbol: '[H⁺]', meaning: 'Hydrogen ion concentration (mol/L)' }
      ],
      category: 'Acid-Base',
      difficulty: 'Intermediate'
    }
  ];

  const allFormulas = [...mathFormulas, ...physicsFormulas, ...chemistryFormulas];

  const filteredFormulas = allFormulas.filter(formula =>
    formula.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    formula.formula.toLowerCase().includes(searchTerm.toLowerCase()) ||
    formula.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFavorite = (formulaId: string) => {
    setFavorites(prev => 
      prev.includes(formulaId) 
        ? prev.filter(id => id !== formulaId)
        : [...prev, formulaId]
    );
  };

  const copyFormula = (formula: string) => {
    navigator.clipboard.writeText(formula);
    toast("Formula copied to clipboard!");
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Basic': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'math': return Calculator;
      case 'physics': return Zap;
      case 'chemistry': return Atom;
      default: return BookOpen;
    }
  };

  const renderFormulaCard = (formula: Formula) => (
    <Card key={formula.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">{formula.name}</h3>
              <Badge variant="outline" className="text-xs mt-1">
                {formula.category}
              </Badge>
            </div>
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => toggleFavorite(formula.id)}
                className="p-1 h-8 w-8"
              >
                <Star 
                  className={`h-4 w-4 ${
                    favorites.includes(formula.id) 
                      ? 'fill-yellow-400 text-yellow-400' 
                      : 'text-gray-400'
                  }`} 
                />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyFormula(formula.formula)}
                className="p-1 h-8 w-8"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="font-mono text-lg text-center">{formula.formula}</div>
          </div>
          
          <p className="text-sm text-gray-600">{formula.description}</p>
          
          <div className="space-y-1">
            <div className="text-sm font-medium">Variables:</div>
            {formula.variables.map((variable, index) => (
              <div key={index} className="text-xs text-gray-600 flex gap-2">
                <span className="font-mono font-bold">{variable.symbol}:</span>
                <span>{variable.meaning}</span>
              </div>
            ))}
          </div>
          
          {formula.example && (
            <div className="bg-blue-50 p-2 rounded text-xs">
              <strong>Example:</strong> {formula.example}
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <Badge className={getDifficultyColor(formula.difficulty)}>
              {formula.difficulty}
            </Badge>
            <Button size="sm" variant="outline">
              Practice Problems
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {onBackToDashboard && (
        <BackToDashboard onClick={onBackToDashboard} />
      )}

      <PageHeader
        title="Formula Reference"
        description="Quick reference for Math, Physics, and Chemistry formulas"
        breadcrumbs={[
          { label: "Dashboard", onClick: onBackToDashboard },
          { label: "Formulas" }
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-blue-600" />
            Formula Quick Reference
          </CardTitle>
          <p className="text-gray-600">
            Essential formulas for Math, Physics, and Chemistry with examples and explanations
          </p>
        </CardHeader>
      </Card>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search formulas by name, formula, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Formulas</TabsTrigger>
          <TabsTrigger value="math">Mathematics</TabsTrigger>
          <TabsTrigger value="physics">Physics</TabsTrigger>
          <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFormulas.map(renderFormulaCard)}
          </div>
        </TabsContent>

        <TabsContent value="math" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mathFormulas.filter(f => 
              f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              f.formula.toLowerCase().includes(searchTerm.toLowerCase())
            ).map(renderFormulaCard)}
          </div>
        </TabsContent>

        <TabsContent value="physics" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {physicsFormulas.filter(f => 
              f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              f.formula.toLowerCase().includes(searchTerm.toLowerCase())
            ).map(renderFormulaCard)}
          </div>
        </TabsContent>

        <TabsContent value="chemistry" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {chemistryFormulas.filter(f => 
              f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              f.formula.toLowerCase().includes(searchTerm.toLowerCase())
            ).map(renderFormulaCard)}
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allFormulas
              .filter(f => favorites.includes(f.id))
              .map(renderFormulaCard)}
          </div>
          {favorites.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Favorites Yet</h3>
                <p className="text-gray-600">
                  Click the star icon on any formula to add it to your favorites
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Practice with real values to understand better</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Always check units in your calculations</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Memorize the most common formulas</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Understand the meaning behind each variable</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormulaReference;