import { useState, useEffect } from 'react';
import { PencilSimple, CalendarBlank, Trash } from 'phosphor-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { examStorage } from '@/utils/examStorage';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import type { Exam } from '@/types/exam';

// Mock Estonian schools
const ESTONIAN_SCHOOLS = [
  { value: 'tallinna-kesklinna-gumnaasium', label: 'Tallinna Kesklinna Gümnaasium' },
  { value: 'tartu-annelinna-gumnaasium', label: 'Tartu Annelinna Gümnaasium' },
];

const SUBJECTS = [
  { value: 'mathematics', label: 'Mathematics' },
  { value: 'estonian-language', label: 'Estonian Language' },
  { value: 'english-language', label: 'English Language' },
  { value: 'history', label: 'History' },
  { value: 'geography', label: 'Geography' },
  { value: 'physics', label: 'Physics' },
  { value: 'chemistry', label: 'Chemistry' },
  { value: 'biology', label: 'Biology' },
];

const EXAM_TYPES = [
  { value: 'test', label: 'Test' },
  { value: 'final-exam', label: 'Final Exam' },
  { value: 'midterm', label: 'Midterm Exam' },
  { value: 'quiz', label: 'Quiz' },
  { value: 'practice-exam', label: 'Practice Exam' },
];

const GRADE_LEVELS = [
  { value: 'grade-1', label: '1st Grade' },
  { value: 'grade-2', label: '2nd Grade' },
  { value: 'grade-3', label: '3rd Grade' },
  { value: 'grade-4', label: '4th Grade' },
  { value: 'grade-5', label: '5th Grade' },
  { value: 'grade-6', label: '6th Grade' },
  { value: 'grade-7', label: '7th Grade' },
  { value: 'grade-8', label: '8th Grade' },
  { value: 'grade-9', label: '9th Grade' },
  { value: 'grade-10', label: '10th Grade' },
  { value: 'grade-11', label: '11th Grade' },
  { value: 'grade-12', label: '12th Grade' },
];

interface ExamDetailsModalProps {
  exam: Exam;
  open: boolean;
  onClose: () => void;
  onUpdate: () => void;
  onDelete: () => void;
}

export default function ExamDetailsModal({ exam, open, onClose, onUpdate, onDelete }: ExamDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [date, setDate] = useState<Date>();
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: exam.name,
    subject: exam.subject,
    examType: exam.examType,
    gradeLevel: exam.gradeLevel,
    school: exam.school,
    location: exam.location,
    scheduledDate: exam.scheduledDate,
    scheduledTime: exam.scheduledTime,
  });

  useEffect(() => {
    setFormData({
      name: exam.name,
      subject: exam.subject,
      examType: exam.examType,
      gradeLevel: exam.gradeLevel,
      school: exam.school,
      location: exam.location,
      scheduledDate: exam.scheduledDate,
      scheduledTime: exam.scheduledTime,
    });
    if (exam.scheduledDate) {
      setDate(new Date(exam.scheduledDate));
    }
  }, [exam]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setFormData(prev => ({ ...prev, scheduledDate: format(selectedDate, 'yyyy-MM-dd') }));
      setIsDirty(true);
    }
  };

  const handleSave = () => {
    examStorage.update(exam.id, formData);
    setIsEditing(false);
    setIsDirty(false);
    onUpdate();
  };

  const handleCancel = () => {
    if (isDirty) {
      setShowUnsavedDialog(true);
    } else {
      setIsEditing(false);
    }
  };

  const confirmCancelEdit = () => {
    setFormData({
      name: exam.name,
      subject: exam.subject,
      examType: exam.examType,
      gradeLevel: exam.gradeLevel,
      school: exam.school,
      location: exam.location,
      scheduledDate: exam.scheduledDate,
      scheduledTime: exam.scheduledTime,
    });
    setIsEditing(false);
    setIsDirty(false);
    setShowUnsavedDialog(false);
  };

  const handleClose = () => {
    if (isEditing && isDirty) {
      setShowUnsavedDialog(true);
    } else {
      onClose();
      setIsEditing(false);
      setIsDirty(false);
    }
  };

  const confirmClose = () => {
    onClose();
    setIsEditing(false);
    setIsDirty(false);
    setShowUnsavedDialog(false);
  };

  const formatDisplayDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: Exam['status']) => {
    switch (status) {
      case 'scheduled':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'active':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'completed':
        return 'text-gray-600 bg-gray-50 border-gray-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => !newOpen && handleClose()}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl">{exam.name}</DialogTitle>
              <DialogDescription className="mt-2">
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border ${getStatusColor(exam.status)}`}>
                  {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                </span>
              </DialogDescription>
            </div>
            {!isEditing && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                >
                  <PencilSimple size={16} weight="regular" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowDeleteDialog(true)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash size={16} weight="regular" />
                </Button>
              </div>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {isEditing ? (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Exam Name</Label>
                  <Input
                    id="edit-name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-subject">Subject</Label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) => handleChange('subject', value)}
                    >
                      <SelectTrigger id="edit-subject">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {SUBJECTS.map((subject) => (
                          <SelectItem key={subject.value} value={subject.value}>
                            {subject.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-examType">Exam Type</Label>
                    <Select
                      value={formData.examType}
                      onValueChange={(value) => handleChange('examType', value)}
                    >
                      <SelectTrigger id="edit-examType">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {EXAM_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-gradeLevel">Grade Level</Label>
                    <Select
                      value={formData.gradeLevel}
                      onValueChange={(value) => handleChange('gradeLevel', value)}
                    >
                      <SelectTrigger id="edit-gradeLevel">
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {GRADE_LEVELS.map((grade) => (
                          <SelectItem key={grade.value} value={grade.value}>
                            {grade.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-school">School</Label>
                    <Select
                      value={formData.school}
                      onValueChange={(value) => handleChange('school', value)}
                    >
                      <SelectTrigger id="edit-school">
                        <SelectValue placeholder="Select school" />
                      </SelectTrigger>
                      <SelectContent>
                        {ESTONIAN_SCHOOLS.map((school) => (
                          <SelectItem key={school.value} value={school.value}>
                            {school.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-location">Room / Location</Label>
                  <Input
                    id="edit-location"
                    placeholder="e.g., Room 101"
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarBlank size={16} weight="regular" className="mr-2" />
                          {date ? format(date, 'PPP') : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={handleDateSelect}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-time">Time</Label>
                    <Input
                      id="edit-time"
                      type="time"
                      value={formData.scheduledTime}
                      onChange={(e) => handleChange('scheduledTime', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            </>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Exam Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Subject</p>
                      <p className="font-medium capitalize">
                        {SUBJECTS.find(s => s.value === exam.subject)?.label || exam.subject}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Type</p>
                      <p className="font-medium capitalize">
                        {EXAM_TYPES.find(t => t.value === exam.examType)?.label || exam.examType}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Grade Level</p>
                      <p className="font-medium">
                        {GRADE_LEVELS.find(g => g.value === exam.gradeLevel)?.label || exam.gradeLevel}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">School</p>
                      <p className="font-medium">
                        {ESTONIAN_SCHOOLS.find(s => s.value === exam.school)?.label || exam.school}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Room / Location</p>
                      <p className="font-medium">{exam.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Date</p>
                      <p className="font-medium">{formatDisplayDate(exam.scheduledDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Time</p>
                      <p className="font-medium">{exam.scheduledTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Expected Students</p>
                      <p className="font-medium">{exam.studentCount} students</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Teacher</p>
                      <p className="font-medium">{exam.teacherName}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Registered Students ({exam.registeredStudents.length}/{exam.studentCount})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {exam.registeredStudents.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">
                          No students have registered yet.
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Students will appear here once they register for the exam.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* Completed Students Section */}
                        {exam.registeredStudents.filter(s => s.completedAt).length > 0 && (
                          <div>
                            <h3 className="text-sm font-semibold text-green-700 mb-2 flex items-center gap-2">
                              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-700 text-xs">
                                {exam.registeredStudents.filter(s => s.completedAt).length}
                              </span>
                              Completed
                            </h3>
                            <div className="space-y-2">
                              {exam.registeredStudents
                                .filter(s => s.completedAt)
                                .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime())
                                .map((student) => (
                                  <div
                                    key={student.studentId}
                                    className="flex items-center justify-between p-3 rounded-lg border border-green-200 bg-green-50/50"
                                  >
                                    <div>
                                      <p className="font-medium">{student.studentName}</p>
                                      <p className="text-xs text-muted-foreground">
                                        Registered: {new Date(student.registeredAt).toLocaleDateString('en-US', {
                                          month: 'short',
                                          day: 'numeric',
                                          hour: '2-digit',
                                          minute: '2-digit',
                                        })}
                                      </p>
                                      <p className="text-xs text-green-700 font-medium mt-1">
                                        ✓ Completed: {new Date(student.completedAt!).toLocaleDateString('en-US', {
                                          month: 'short',
                                          day: 'numeric',
                                          hour: '2-digit',
                                          minute: '2-digit',
                                        })}
                                      </p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-xs text-muted-foreground mb-1">PIN</p>
                                      <p className="font-mono font-semibold">{student.pin}</p>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}

                        {/* Pending Students Section */}
                        {exam.registeredStudents.filter(s => !s.completedAt).length > 0 && (
                          <div>
                            <h3 className="text-sm font-semibold text-blue-700 mb-2 flex items-center gap-2">
                              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs">
                                {exam.registeredStudents.filter(s => !s.completedAt).length}
                              </span>
                              Pending
                            </h3>
                            <div className="space-y-2">
                              {exam.registeredStudents
                                .filter(s => !s.completedAt)
                                .sort((a, b) => new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime())
                                .map((student) => (
                                  <div
                                    key={student.studentId}
                                    className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30"
                                  >
                                    <div>
                                      <p className="font-medium">{student.studentName}</p>
                                      <p className="text-xs text-muted-foreground">
                                        Registered: {new Date(student.registeredAt).toLocaleDateString('en-US', {
                                          month: 'short',
                                          day: 'numeric',
                                          hour: '2-digit',
                                          minute: '2-digit',
                                        })}
                                      </p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-xs text-muted-foreground mb-1">PIN</p>
                                      <p className="font-mono font-semibold">{student.pin}</p>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </DialogContent>

      <ConfirmDialog
        open={showUnsavedDialog}
        onOpenChange={setShowUnsavedDialog}
        title="Unsaved Changes"
        description="You have unsaved changes. Are you sure you want to discard them?"
        confirmText={isEditing && isDirty && !open ? "Close" : "Discard"}
        cancelText="Keep Editing"
        onConfirm={isEditing && isDirty && !open ? confirmClose : confirmCancelEdit}
        variant="destructive"
      />

      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Delete Exam"
        description="Are you sure you want to delete this exam? This action cannot be undone. All student registrations will be lost."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => {
          setShowDeleteDialog(false);
          onDelete();
        }}
        variant="destructive"
      />
    </Dialog>
  );
}

