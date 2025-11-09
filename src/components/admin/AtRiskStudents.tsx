import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, AlertTriangle, TrendingDown, User, MessageSquare, Phone, Mail, Search, Filter, Download } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AtRiskStudentsProps {
  onBack: () => void;
  institutionType: 'secondary' | 'university';
}

const AtRiskStudents = ({ onBack, institutionType }: AtRiskStudentsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [riskLevel, setRiskLevel] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  // Mock data for at-risk students
  const atRiskStudents = [
    {
      id: "1",
      name: "Adebayo Temitope",
      class: institutionType === 'university' ? "Year 2 Computer Science" : "SS3A",
      riskLevel: "high",
      riskScore: 85,
      issues: ["Declining grades", "Low attendance", "Missing assignments"],
      currentGrade: institutionType === 'university' ? "2.1 GPA" : "45%",
      attendance: 67,
      assignments: "3/8 completed",
      lastActivity: "3 days ago",
      parentContact: "+234 803 123 4567",
      teacherNotes: "Student struggling with mathematics concepts"
    },
    {
      id: "2", 
      name: "Fatima Aisha",
      class: institutionType === 'university' ? "Year 3 Engineering" : "SS2B",
      riskLevel: "medium",
      riskScore: 65,
      issues: ["Inconsistent performance", "Peer conflicts"],
      currentGrade: institutionType === 'university' ? "2.8 GPA" : "62%",
      attendance: 78,
      assignments: "6/8 completed",
      lastActivity: "1 day ago",
      parentContact: "+234 807 987 6543",
      teacherNotes: "Shows potential but needs more support"
    },
    {
      id: "3",
      name: "Chinedu Emmanuel",
      class: institutionType === 'university' ? "Year 1 Medicine" : "SS3B", 
      riskLevel: "high",
      riskScore: 90,
      issues: ["Failing multiple subjects", "No parent engagement", "Mental health concerns"],
      currentGrade: institutionType === 'university' ? "1.9 GPA" : "38%",
      attendance: 45,
      assignments: "1/8 completed",
      lastActivity: "1 week ago",
      parentContact: "+234 806 555 1234",
      teacherNotes: "Urgent intervention needed - considering counseling referral"
    },
    {
      id: "4",
      name: "Hauwa Maryam",
      class: institutionType === 'university' ? "Year 4 Business" : "SS1A",
      riskLevel: "low",
      riskScore: 35,
      issues: ["Slight grade decline"],
      currentGrade: institutionType === 'university' ? "3.2 GPA" : "71%",
      attendance: 89,
      assignments: "7/8 completed",
      lastActivity: "Today",
      parentContact: "+234 809 111 2222",
      teacherNotes: "Minor concerns, monitoring situation"
    }
  ];

  const classes = institutionType === 'university' ? 
    ['Year 1 Computer Science', 'Year 2 Computer Science', 'Year 3 Engineering', 'Year 4 Business'] :
    ['SS1A', 'SS1B', 'SS2A', 'SS2B', 'SS3A', 'SS3B'];

  const filteredStudents = atRiskStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === "all" || student.class === selectedClass;
    const matchesRisk = riskLevel === "all" || student.riskLevel === riskLevel;
    return matchesSearch && matchesClass && matchesRisk;
  });

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleContactParent = (student: any) => {
    alert(`Initiating contact with parent of ${student.name}`);
  };

  const handleAssignTutor = (student: any) => {
    alert(`Assigning AI tutor to ${student.name}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <h1 className="text-2xl font-bold">At-Risk Students Management</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-6 w-6 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-red-600">{atRiskStudents.filter(s => s.riskLevel === 'high').length}</p>
            <p className="text-sm text-red-700">High Risk</p>
          </CardContent>
        </Card>
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4 text-center">
            <TrendingDown className="h-6 w-6 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-orange-600">{atRiskStudents.filter(s => s.riskLevel === 'medium').length}</p>
            <p className="text-sm text-orange-700">Medium Risk</p>
          </CardContent>
        </Card>
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4 text-center">
            <User className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-yellow-600">{atRiskStudents.filter(s => s.riskLevel === 'low').length}</p>
            <p className="text-sm text-yellow-700">Low Risk</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4 text-center">
            <MessageSquare className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">{atRiskStudents.length}</p>
            <p className="text-sm text-blue-700">Total Monitored</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Students
            </CardTitle>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Classes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {classes.map(cls => (
                  <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={riskLevel} onValueChange={setRiskLevel}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Risk Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>At-Risk Students ({filteredStudents.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Current Grade</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Key Issues</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Last activity: {student.lastActivity}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>
                    <Badge className={getRiskColor(student.riskLevel)}>
                      {student.riskLevel} ({student.riskScore}%)
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{student.currentGrade}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Progress value={student.attendance} className="w-16" />
                      <span className="text-sm">{student.attendance}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {student.issues.slice(0, 2).map((issue, index) => (
                        <Badge key={index} variant="outline" className="text-xs mr-1">
                          {issue}
                        </Badge>
                      ))}
                      {student.issues.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{student.issues.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedStudent(student)}
                      >
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleContactParent(student)}
                      >
                        <Phone className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAssignTutor(student)}
                      >
                        AI Tutor
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <Card className="fixed inset-4 z-50 bg-background shadow-lg border max-h-[90vh] overflow-y-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Student Details: {selectedStudent.name}</CardTitle>
              <Button variant="ghost" onClick={() => setSelectedStudent(null)}>×</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Academic Performance</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Current Grade:</span>
                      <span className="font-medium">{selectedStudent.currentGrade}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Attendance:</span>
                      <span className="font-medium">{selectedStudent.attendance}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Assignments:</span>
                      <span className="font-medium">{selectedStudent.assignments}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Risk Assessment</h4>
                  <Badge className={getRiskColor(selectedStudent.riskLevel)}>
                    {selectedStudent.riskLevel} Risk - {selectedStudent.riskScore}%
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Identified Issues</h4>
                  <div className="space-y-1">
                    {selectedStudent.issues.map((issue: string, index: number) => (
                      <Badge key={index} variant="outline" className="mr-1 mb-1">
                        {issue}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Contact Information</h4>
                  <p className="text-sm">Parent: {selectedStudent.parentContact}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Teacher Notes</h4>
                  <p className="text-sm text-muted-foreground">{selectedStudent.teacherNotes}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <Button onClick={() => handleContactParent(selectedStudent)}>
                <Mail className="h-4 w-4 mr-2" />
                Contact Parent
              </Button>
              <Button variant="outline" onClick={() => handleAssignTutor(selectedStudent)}>
                Assign AI Tutor
              </Button>
              <Button variant="outline">Schedule Intervention</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AtRiskStudents;