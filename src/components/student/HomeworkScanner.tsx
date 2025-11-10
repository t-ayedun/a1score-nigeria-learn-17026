
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  Camera, Upload, Scan, BookOpen, Calculator, 
  FlaskConical, Globe, Lightbulb, Clock 
} from "lucide-react";

interface HomeworkScannerProps {
  onSolutionGenerated: (solution: string) => void;
}

const HomeworkScanner = ({ onSolutionGenerated }: HomeworkScannerProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [solution, setSolution] = useState('');
  const [manualText, setManualText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const sampleProblems = [
    {
      type: "Mathematics",
      problem: "Solve for x: 3x + 7 = 22",
      icon: Calculator,
      color: "bg-blue-100 text-blue-700"
    },
    {
      type: "Physics",
      problem: "A ball is thrown upward with initial velocity 20 m/s. Find maximum height.",
      icon: FlaskConical,
      color: "bg-purple-100 text-purple-700"
    },
    {
      type: "Chemistry",
      problem: "Balance the equation: H₂ + O₂ → H₂O",
      icon: FlaskConical,
      color: "bg-green-100 text-green-700"
    },
    {
      type: "English",
      problem: "Write a summary of the given passage about climate change.",
      icon: Globe,
      color: "bg-orange-100 text-orange-700"
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateOCR = async (imageFile: File): Promise<string> => {
    // Simulate OCR processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock OCR results based on common homework types
    const mockResults = [
      "Solve for x: 2x + 5 = 15\n\nFind the value of x in the equation above.",
      "Calculate the area of a triangle with base 8cm and height 6cm.\n\nUse the formula: Area = ½ × base × height",
      "What is the derivative of f(x) = 3x² + 2x - 1?\n\nShow your working step by step.",
      "Explain the process of photosynthesis.\n\nInclude the chemical equation and main stages."
    ];
    
    return mockResults[Math.floor(Math.random() * mockResults.length)];
  };

  const generateSolution = async (problemText: string): Promise<string> => {
    // Simulate AI solution generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const lowerText = problemText.toLowerCase();
    
    if (lowerText.includes('2x + 5 = 15') || lowerText.includes('solve for x')) {
      return `**Step-by-Step Solution:**

**Given:** 2x + 5 = 15

**Step 1:** Subtract 5 from both sides
2x + 5 - 5 = 15 - 5
2x = 10

**Step 2:** Divide both sides by 2
2x ÷ 2 = 10 ÷ 2
x = 5

**Verification:** 2(5) + 5 = 10 + 5 = 15 ✓

**Answer:** x = 5

**Key Concept:** When solving linear equations, perform the same operation on both sides to maintain equality.`;
    }
    
    if (lowerText.includes('area') && lowerText.includes('triangle')) {
      return `**Triangle Area Calculation:**

**Given:** Base = 8cm, Height = 6cm

**Formula:** Area = ½ × base × height

**Solution:**
Area = ½ × 8cm × 6cm
Area = ½ × 48cm²
Area = 24cm²

**Answer:** The area of the triangle is 24cm²

**Remember:** The area formula works for any triangle when you know the base and perpendicular height.`;
    }
    
    if (lowerText.includes('derivative') || lowerText.includes('3x²')) {
      return `**Derivative Calculation:**

**Given:** f(x) = 3x² + 2x - 1

**Rule:** Use the power rule: d/dx(xⁿ) = nxⁿ⁻¹

**Step-by-step:**
- d/dx(3x²) = 3 × 2x¹ = 6x
- d/dx(2x) = 2 × 1x⁰ = 2
- d/dx(-1) = 0

**Answer:** f'(x) = 6x + 2

**Check:** You can verify by using the definition of derivative or graphing tools.`;
    }
    
    if (lowerText.includes('photosynthesis')) {
      return `**Photosynthesis Explanation:**

**Definition:** The process by which green plants make glucose using sunlight.

**Chemical Equation:**
6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂

**Main Stages:**

**1. Light Reactions** (in thylakoids)
- Chlorophyll absorbs light energy
- Water molecules split (H₂O → H⁺ + OH⁻)
- Oxygen released as by-product

**2. Dark Reactions** (Calvin Cycle)
- CO₂ from air is "fixed" into organic molecules
- Glucose (C₆H₁₂O₆) is produced
- Uses energy from light reactions

**Importance:** Provides food for plants and oxygen for all living things!`;
    }
    
    return `**AI Solution Analysis:**

I've analyzed your problem: "${problemText.substring(0, 100)}..."

**Approach:**
1. First, I identify the type of problem (Mathematics, Science, Language, etc.)
2. Then I break it down into manageable steps
3. Finally, I provide a detailed solution with explanations

**Solution Strategy:**
- Show all working steps clearly
- Explain the reasoning behind each step
- Provide verification where possible
- Include relevant formulas or concepts

**Next Steps:**
- Would you like me to explain any part in more detail?
- Do you have a similar problem to practice with?
- Need help with related concepts?

Feel free to ask follow-up questions!`;
  };

  const processImage = async () => {
    if (!selectedImage) return;
    
    setIsProcessing(true);
    try {
      // Extract text from image using OCR
      const text = await simulateOCR(selectedImage);
      setExtractedText(text);
      
      // Generate solution
      const aiSolution = await generateSolution(text);
      setSolution(aiSolution);
      onSolutionGenerated(aiSolution);
      
    } catch (error) {
      console.error('Error processing image:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const processManualText = async () => {
    if (!manualText.trim()) return;
    
    setIsProcessing(true);
    try {
      const aiSolution = await generateSolution(manualText);
      setSolution(aiSolution);
      onSolutionGenerated(aiSolution);
    } catch (error) {
      console.error('Error processing text:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const processSampleProblem = async (problem: string) => {
    setManualText(problem);
    setIsProcessing(true);
    try {
      const aiSolution = await generateSolution(problem);
      setSolution(aiSolution);
      onSolutionGenerated(aiSolution);
    } catch (error) {
      console.error('Error processing sample:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scan className="h-6 w-6 text-blue-600" />
            📚 Homework Scanner & Solver
          </CardTitle>
          <p className="text-gray-600">
            Take a photo of your homework or type it in, and get step-by-step AI solutions!
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="camera" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="camera">📸 Camera/Upload</TabsTrigger>
          <TabsTrigger value="type">✏️ Type Problem</TabsTrigger>
        </TabsList>

        <TabsContent value="camera" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Button
                    onClick={() => cameraInputRef.current?.click()}
                    className="flex-1"
                    variant="outline"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Take Photo
                  </Button>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1"
                    variant="outline"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                  </Button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                {imagePreview && (
                  <div className="space-y-4">
                    <div className="border rounded-lg overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Homework preview"
                        className="w-full max-h-64 object-contain bg-gray-50"
                      />
                    </div>
                    
                    <Button
                      onClick={processImage}
                      disabled={isProcessing}
                      className="w-full"
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Scan className="h-4 w-4 mr-2" />
                          Scan & Solve
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="type" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <Textarea
                  value={manualText}
                  onChange={(e) => setManualText(e.target.value)}
                  placeholder="Type or paste your homework question here..."
                  className="min-h-32"
                />
                <Button
                  onClick={processManualText}
                  disabled={!manualText.trim() || isProcessing}
                  className="w-full"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating Solution...
                    </>
                  ) : (
                    <>
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Get AI Solution
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>

      {/* Extracted Text Display */}
      {extractedText && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Extracted Text
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="whitespace-pre-wrap">{extractedText}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Solution */}
      {solution && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              AI Solution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="whitespace-pre-wrap">{solution}</div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                Explain More
              </Button>
              <Button variant="outline" size="sm">
                <Calculator className="h-4 w-4 mr-2" />
                Similar Problems
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HomeworkScanner;
