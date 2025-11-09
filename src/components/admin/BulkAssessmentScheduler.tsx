import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, Users, BookOpen, Target, ArrowLeft } from "lucide-react";
import { format } from "date-fns";

interface BulkAssessmentSchedulerProps {
  onBack: () => void;
  institutionType: 'secondary' | 'university';
}

const BulkAssessmentScheduler = ({ onBack, institutionType }: BulkAssessmentSchedulerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [assessmentTitle, setAssessmentTitle] = useState("");
  const [assessmentDescription, setAssessmentDescription] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [duration, setDuration] = useState("");
  const [assessmentType, setAssessmentType] = useState("");

  const subjects = institutionType === 'university' ? 
    ['Computer Science', 'Engineering', 'Medicine', 'Business', 'Sciences', 'Arts'] :
    ['Mathematics', 'English', 'Physics', 'Chemistry', 'Biology', 'Geography', 'Economics'];

  const classes = institutionType === 'university' ?
    ['Year 1 CS', 'Year 2 CS', 'Year 3 CS', 'Year 4 CS', 'Year 1 ENG', 'Year 2 ENG', 'Year 3 ENG', 'Year 4 ENG'] :
    ['SS1A', 'SS1B', 'SS2A', 'SS2B', 'SS3A', 'SS3B', 'JSS1A', 'JSS1B', 'JSS2A', 'JSS2B', 'JSS3A', 'JSS3B'];

  const assessmentTypes = institutionType === 'university' ?
    ['Mid-term Exam', 'Final Exam', 'Quiz', 'Research Assessment', 'Practical Exam', 'Thesis Defense'] :
    ['WAEC Mock', 'Mid-term Test', 'End of Term Exam', 'Class Assessment', 'Continuous Assessment'];

  const handleClassToggle = (className: string) => {
    setSelectedClasses(prev => 
      prev.includes(className) 
        ? prev.filter(c => c !== className)
        : [...prev, className]
    );
  };

  const handleScheduleAssessment = () => {
    // Here you would implement the actual scheduling logic
    console.log("Scheduling assessment:", {
      title: assessmentTitle,
      description: assessmentDescription,
      subject: selectedSubject,
      classes: selectedClasses,
      date: selectedDate,
      time: selectedTime,
      duration,
      type: assessmentType
    });
    
    // Show success message or redirect
    alert("Assessment scheduled successfully!");
    onBack();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <h1 className="text-2xl font-bold">Schedule Bulk Assessment</h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Assessment Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Assessment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Assessment Title</Label>
              <Input
                id="title"
                value={assessmentTitle}
                onChange={(e) => setAssessmentTitle(e.target.value)}
                placeholder="Enter assessment title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={assessmentDescription}
                onChange={(e) => setAssessmentDescription(e.target.value)}
                placeholder="Assessment instructions and details"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Subject</Label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map(subject => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Assessment Type</Label>
                <Select value={assessmentType} onValueChange={setAssessmentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {assessmentTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Duration (minutes)</Label>
              <Input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g., 90"
              />
            </div>
          </CardContent>
        </Card>

        {/* Scheduling */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Schedule & Target Classes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Time</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="08:00">8:00 AM</SelectItem>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="14:00">2:00 PM</SelectItem>
                    <SelectItem value="15:00">3:00 PM</SelectItem>
                    <SelectItem value="16:00">4:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Select {institutionType === 'university' ? 'Classes/Years' : 'Classes'}</Label>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {classes.map(className => (
                  <div key={className} className="flex items-center space-x-2">
                    <Checkbox
                      id={className}
                      checked={selectedClasses.includes(className)}
                      onCheckedChange={() => handleClassToggle(className)}
                    />
                    <Label htmlFor={className} className="text-sm">
                      {className}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {selectedClasses.length > 0 && (
              <div className="space-y-2">
                <Label>Selected Classes ({selectedClasses.length})</Label>
                <div className="flex flex-wrap gap-1">
                  {selectedClasses.map(className => (
                    <Badge key={className} variant="secondary">
                      {className}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Preview & Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Assessment Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="font-semibold">{selectedClasses.length}</p>
              <p className="text-sm text-muted-foreground">Classes Selected</p>
            </div>
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <BookOpen className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="font-semibold">{selectedSubject || 'Not Selected'}</p>
              <p className="text-sm text-muted-foreground">Subject</p>
            </div>
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="font-semibold">{duration || '0'} min</p>
              <p className="text-sm text-muted-foreground">Duration</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={handleScheduleAssessment}
              disabled={!assessmentTitle || !selectedSubject || !selectedDate || selectedClasses.length === 0}
              className="flex-1"
            >
              Schedule Assessment
            </Button>
            <Button variant="outline" onClick={onBack}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BulkAssessmentScheduler;