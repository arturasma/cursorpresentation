import { useState, useEffect } from 'react';
import { Plus, CalendarBlank } from 'phosphor-react';
import { format, parseISO } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { TimePicker } from '@/components/ui/time-picker';
import { examStorage } from '@/utils/examStorage';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import type { ExamFormData, Exam } from '@/types/exam';

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

interface ExamCreationModalProps {
  teacherName: string;
  onExamCreated: () => void;
  exam?: Exam; // Optional exam for edit mode
  mode?: 'create' | 'edit'; // Mode flag
  open?: boolean; // Control open state externally for edit mode
  onOpenChange?: (open: boolean) => void; // External control
}

export default function ExamCreationModal({ 
  teacherName, 
  onExamCreated, 
  exam, 
  mode = 'create',
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
}: ExamCreationModalProps) {
  const isEditMode = mode === 'edit';
  const [internalOpen, setInternalOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [isDirty, setIsDirty] = useState(false);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [formData, setFormData] = useState<ExamFormData>({
    name: '',
    subject: '',
    examType: '',
    gradeLevel: '',
    school: '',
    location: '',
    scheduledDate: '',
    scheduledTime: '',
    teacherName,
  });

  // Use external open state for edit mode, internal for create mode
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = externalOnOpenChange || setInternalOpen;

  // Initialize form data when exam prop changes (edit mode)
  useEffect(() => {
    if (exam && isEditMode) {
      setFormData({
        name: exam.name,
        subject: exam.subject,
        examType: exam.examType,
        gradeLevel: exam.gradeLevel,
        school: exam.school,
        location: exam.location,
        scheduledDate: exam.scheduledDate,
        scheduledTime: exam.scheduledTime,
        teacherName: exam.teacherName,
        durationMinutes: exam.durationMinutes,
        numberOfBreaks: exam.numberOfBreaks,
        breakDurationMinutes: exam.breakDurationMinutes,
      });
      if (exam.scheduledDate) {
        setDate(parseISO(exam.scheduledDate));
      }
      setIsDirty(false);
    }
  }, [exam, isEditMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditMode && exam) {
      // Update existing exam
      examStorage.update(exam.id, formData);
    } else {
      // Create new exam
      examStorage.create(formData);
    }
    
    resetForm();
    setOpen(false);
    onExamCreated();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      subject: '',
      examType: '',
      gradeLevel: '',
      school: '',
      location: '',
      scheduledDate: '',
      scheduledTime: '',
      teacherName,
    });
    setDate(undefined);
    setIsDirty(false);
  };

  const handleChange = (field: keyof ExamFormData, value: string) => {
    // Convert numeric fields from string to number
    let processedValue: string | number | undefined = value;
    if (field === 'durationMinutes' || field === 'numberOfBreaks' || field === 'breakDurationMinutes') {
      processedValue = value === '' ? undefined : Number(value);
    }
    setFormData(prev => ({ ...prev, [field]: processedValue }));
    setIsDirty(true);
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setFormData(prev => ({ ...prev, scheduledDate: format(selectedDate, 'yyyy-MM-dd') }));
      setIsDirty(true);
    }
  };

  const handleCancel = () => {
    if (isDirty) {
      setShowUnsavedDialog(true);
    } else {
      resetForm();
      setOpen(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && isDirty) {
      setShowUnsavedDialog(true);
    } else {
      setOpen(newOpen);
      if (!newOpen && !isEditMode) {
        // Only reset form on close for create mode
        resetForm();
      }
    }
  };

  const confirmLeave = () => {
    resetForm();
    setOpen(false);
    setShowUnsavedDialog(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {!isEditMode && (
        <DialogTrigger asChild>
          <Button size="sm" className="gap-2 w-full sm:w-auto">
            <Plus size={16} weight="bold" />
            Create Exam
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit Exam' : 'Create New Exam Session'}</DialogTitle>
          <DialogDescription>
            {isEditMode 
              ? 'Update the exam details. Changes will be saved immediately.'
              : 'Set up a new exam with PIN-based authentication. Student PINs will be generated from their registration data.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Exam Name</Label>
            <Input
              id="name"
              placeholder="e.g., Q4 Mathematics Assessment"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select
                value={formData.subject}
                onValueChange={(value) => handleChange('subject', value)}
                required
              >
                <SelectTrigger id="subject">
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
              <Label htmlFor="examType">Exam Type</Label>
              <Select
                value={formData.examType}
                onValueChange={(value) => handleChange('examType', value)}
                required
              >
                <SelectTrigger id="examType">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gradeLevel">Grade Level</Label>
              <Select
                value={formData.gradeLevel}
                onValueChange={(value) => handleChange('gradeLevel', value)}
                required
              >
                <SelectTrigger id="gradeLevel">
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
              <Label htmlFor="school">School</Label>
              <Select
                value={formData.school}
                onValueChange={(value) => handleChange('school', value)}
                required
              >
                <SelectTrigger id="school">
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
            <Label htmlFor="location">Room / Location</Label>
            <Input
              id="location"
              placeholder="e.g., Room 101, Building A"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="durationMinutes">Duration (minutes)</Label>
              <Input
                id="durationMinutes"
                type="number"
                min="1"
                placeholder="e.g., 90"
                value={formData.durationMinutes || ''}
                onChange={(e) => handleChange('durationMinutes', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="numberOfBreaks">Number of Breaks</Label>
              <Input
                id="numberOfBreaks"
                type="number"
                min="0"
                placeholder="e.g., 2"
                value={formData.numberOfBreaks || ''}
                onChange={(e) => handleChange('numberOfBreaks', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="breakDurationMinutes">Break Duration (minutes each)</Label>
            <Input
              id="breakDurationMinutes"
              type="number"
              min="0"
              placeholder="e.g., 15"
              value={formData.breakDurationMinutes || ''}
              onChange={(e) => handleChange('breakDurationMinutes', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <Label htmlFor="scheduledTime">Time</Label>
              <TimePicker
                id="scheduledTime"
                value={formData.scheduledTime}
                onChange={(value) => handleChange('scheduledTime', value)}
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">{isEditMode ? 'Save Changes' : 'Create Exam'}</Button>
          </div>
        </form>
      </DialogContent>

      <ConfirmDialog
        open={showUnsavedDialog}
        onOpenChange={setShowUnsavedDialog}
        title="Unsaved Changes"
        description="You have unsaved changes. Are you sure you want to leave? All changes will be lost."
        confirmText="Leave"
        cancelText="Stay"
        onConfirm={confirmLeave}
        variant="destructive"
      />
    </Dialog>
  );
}

