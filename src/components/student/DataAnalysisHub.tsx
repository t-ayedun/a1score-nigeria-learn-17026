import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, PieChart, LineChart, ScatterChart, Database, 
  Calculator, Code, Download, Upload, Play, Settings,
  TrendingUp, Target, FileSpreadsheet, Lightbulb, HelpCircle
} from "lucide-react";

interface Dataset {
  id: string;
  name: string;
  type: 'csv' | 'xlsx' | 'json';
  size: string;
  rows: number;
  columns: number;
  uploadDate: string;
  description: string;
}

interface AnalysisResult {
  id: string;
  testType: string;
  dataset: string;
  results: any;
  interpretation: string;
  recommendations: string[];
  createdAt: string;
}

const DataAnalysisHub = () => {
  const [datasets, setDatasets] = useState<Dataset[]>([
    {
      id: "1",
      name: "Student_Performance_Data.csv",
      type: "csv",
      size: "2.4 MB",
      rows: 1500,
      columns: 12,
      uploadDate: "2024-01-20",
      description: "Academic performance data from 2023-2024 cohort"
    },
    {
      id: "2", 
      name: "Survey_Responses.xlsx",
      type: "xlsx",
      size: "890 KB",
      rows: 450,
      columns: 25,
      uploadDate: "2024-01-18",
      description: "Student satisfaction survey responses"
    }
  ]);

  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([
    {
      id: "1",
      testType: "T-Test",
      dataset: "Student_Performance_Data.csv",
      results: {
        statistic: 2.457,
        pValue: 0.014,
        significance: "significant"
      },
      interpretation: "There is a statistically significant difference between groups (p < 0.05)",
      recommendations: [
        "Effect size should be calculated to determine practical significance",
        "Check assumptions of normality and equal variances"
      ],
      createdAt: "2024-01-20"
    }
  ]);

  const [selectedDataset, setSelectedDataset] = useState<string>("");
  const [selectedTest, setSelectedTest] = useState<string>("");
  const [analysisCode, setAnalysisCode] = useState<string>("");

  const statisticalTests = [
    { id: "ttest", name: "Independent T-Test", description: "Compare means of two groups" },
    { id: "anova", name: "ANOVA", description: "Compare means of multiple groups" },
    { id: "chi-square", name: "Chi-Square Test", description: "Test association between categorical variables" },
    { id: "correlation", name: "Correlation Analysis", description: "Measure relationship between variables" },
    { id: "regression", name: "Linear Regression", description: "Predict outcomes from predictor variables" },
    { id: "non-parametric", name: "Mann-Whitney U", description: "Non-parametric comparison of groups" }
  ];

  const chartTypes = [
    { id: "bar", name: "Bar Chart", icon: BarChart3, description: "Compare categories" },
    { id: "line", name: "Line Chart", icon: LineChart, description: "Show trends over time" },
    { id: "scatter", name: "Scatter Plot", icon: ScatterChart, description: "Show relationships" },
    { id: "pie", name: "Pie Chart", icon: PieChart, description: "Show proportions" }
  ];

  const generateCode = (testType: string, dataset: string) => {
    const templates = {
      ttest: `# Independent T-Test Analysis
import pandas as pd
import scipy.stats as stats
import matplotlib.pyplot as plt

# Load data
data = pd.read_csv('${dataset}')

# Perform independent t-test
group1 = data[data['group'] == 'A']['score']
group2 = data[data['group'] == 'B']['score']

t_stat, p_value = stats.ttest_ind(group1, group2)

print(f"T-statistic: {t_stat:.3f}")
print(f"P-value: {p_value:.3f}")

# Interpretation
if p_value < 0.05:
    print("Result is statistically significant")
else:
    print("Result is not statistically significant")`,
      
      anova: `# One-Way ANOVA Analysis
import pandas as pd
import scipy.stats as stats
from statsmodels.stats.anova import anova_lm
from statsmodels.formula.api import ols

# Load data
data = pd.read_csv('${dataset}')

# Perform one-way ANOVA
model = ols('score ~ C(group)', data=data).fit()
anova_results = anova_lm(model, typ=2)

print(anova_results)

# Post-hoc analysis if significant
if anova_results['PR(>F)'][0] < 0.05:
    print("Significant result - consider post-hoc tests")`
    };

    return templates[testType as keyof typeof templates] || "# Select a test type to generate code";
  };

  const runAnalysis = () => {
    if (!selectedTest || !selectedDataset) return;

    const newResult: AnalysisResult = {
      id: Date.now().toString(),
      testType: selectedTest,
      dataset: selectedDataset,
      results: {
        statistic: Math.random() * 5,
        pValue: Math.random() * 0.1,
        significance: Math.random() > 0.5 ? "significant" : "not significant"
      },
      interpretation: "Analysis completed successfully. Results show...",
      recommendations: [
        "Review data quality and outliers",
        "Consider effect size calculations",
        "Validate assumptions"
      ],
      createdAt: new Date().toISOString().split('T')[0]
    };

    setAnalysisResults(prev => [newResult, ...prev]);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Data Analysis & Visualization Hub
          </CardTitle>
          <p className="text-muted-foreground">
            Statistical analysis tools and data visualization for research projects
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="datasets" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="datasets">Datasets</TabsTrigger>
          <TabsTrigger value="analysis">Statistical Tests</TabsTrigger>
          <TabsTrigger value="visualization">Visualizations</TabsTrigger>
          <TabsTrigger value="code">Code Generator</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="datasets" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Your Datasets</h3>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Dataset
            </Button>
          </div>

          <div className="grid gap-4">
            {datasets.map(dataset => (
              <Card key={dataset.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <FileSpreadsheet className="h-4 w-4" />
                        <h3 className="font-semibold">{dataset.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {dataset.type.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {dataset.description}
                      </p>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Size:</span>
                          <div className="font-medium">{dataset.size}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Rows:</span>
                          <div className="font-medium">{dataset.rows.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Columns:</span>
                          <div className="font-medium">{dataset.columns}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Uploaded:</span>
                          <div className="font-medium">{dataset.uploadDate}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Database className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-2 border-dashed">
            <CardContent className="p-8 text-center">
              <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="font-semibold mb-2">Upload New Dataset</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop your CSV, Excel, or JSON files here
              </p>
              <Button variant="outline">
                Browse Files
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Statistical Test Selector
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Select Dataset</label>
                  <Select value={selectedDataset} onValueChange={setSelectedDataset}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a dataset" />
                    </SelectTrigger>
                    <SelectContent>
                      {datasets.map(dataset => (
                        <SelectItem key={dataset.id} value={dataset.name}>
                          {dataset.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Statistical Test</label>
                  <Select value={selectedTest} onValueChange={setSelectedTest}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a statistical test" />
                    </SelectTrigger>
                    <SelectContent>
                      {statisticalTests.map(test => (
                        <SelectItem key={test.id} value={test.id}>
                          {test.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4">
                {statisticalTests.map(test => (
                  <Card key={test.id} className={`p-4 cursor-pointer transition-colors ${selectedTest === test.id ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => setSelectedTest(test.id)}>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{test.name}</h3>
                        <p className="text-sm text-muted-foreground">{test.description}</p>
                      </div>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </div>
                  </Card>
                ))}
              </div>

              <div className="flex gap-2">
                <Button onClick={runAnalysis} disabled={!selectedTest || !selectedDataset}>
                  <Play className="h-4 w-4 mr-2" />
                  Run Analysis
                </Button>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Advanced Options
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visualization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Chart Builder
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {chartTypes.map(chart => {
                  const Icon = chart.icon;
                  return (
                    <Card key={chart.id} className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                      <div className="text-center">
                        <Icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <h3 className="font-semibold">{chart.name}</h3>
                        <p className="text-xs text-muted-foreground">{chart.description}</p>
                      </div>
                    </Card>
                  );
                })}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Data Source</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select dataset" />
                    </SelectTrigger>
                    <SelectContent>
                      {datasets.map(dataset => (
                        <SelectItem key={dataset.id} value={dataset.name}>
                          {dataset.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Chart Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select chart type" />
                    </SelectTrigger>
                    <SelectContent>
                      {chartTypes.map(chart => (
                        <SelectItem key={chart.id} value={chart.id}>
                          {chart.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-600">Chart preview will appear here</p>
                  <Button className="mt-4" variant="outline">
                    Generate Chart
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Analysis Code Generator
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Generate Python/R code for your statistical analyses
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Programming Language</label>
                  <Select defaultValue="python">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="python">Python (pandas, scipy)</SelectItem>
                      <SelectItem value="r">R (built-in stats)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Analysis Type</label>
                  <Select value={selectedTest} onValueChange={(value) => {
                    setSelectedTest(value);
                    setAnalysisCode(generateCode(value, selectedDataset));
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select analysis" />
                    </SelectTrigger>
                    <SelectContent>
                      {statisticalTests.map(test => (
                        <SelectItem key={test.id} value={test.id}>
                          {test.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">Generated Code</label>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
                <Textarea
                  value={analysisCode || generateCode(selectedTest, selectedDataset)}
                  onChange={(e) => setAnalysisCode(e.target.value)}
                  className="min-h-[300px] font-mono text-sm"
                  placeholder="Select an analysis type to generate code..."
                />
              </div>

              <div className="flex gap-2">
                <Button>
                  <Play className="h-4 w-4 mr-2" />
                  Run Code
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Notebook
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Analysis Results</h3>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export All Results
            </Button>
          </div>

          <div className="space-y-4">
            {analysisResults.map(result => (
              <Card key={result.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {result.testType}
                        <Badge variant={result.results.significance === "significant" ? "default" : "secondary"}>
                          {result.results.significance}
                        </Badge>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Dataset: {result.dataset} • {result.createdAt}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold">{result.results.statistic.toFixed(3)}</div>
                      <div className="text-sm text-muted-foreground">Test Statistic</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold">{result.results.pValue.toFixed(3)}</div>
                      <div className="text-sm text-muted-foreground">P-Value</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold">α = 0.05</div>
                      <div className="text-sm text-muted-foreground">Significance Level</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Interpretation</h4>
                    <p className="text-sm bg-blue-50 p-3 rounded-lg">{result.interpretation}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Recommendations</h4>
                    <div className="space-y-2">
                      {result.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm">
                          <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataAnalysisHub;