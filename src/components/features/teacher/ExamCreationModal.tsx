import { useState } from 'react';
import { Plus, CalendarBlank } from 'phosphor-react';
import { format } from 'date-fns';
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
import { examStorage } from '@/utils/examStorage';
import type { ExamFormData } from '@/types/exam';

interface ExamCreationModalProps {
  onExamCreated: () => void;
}

export default function ExamCreationModal({ onExamCreated }: ExamCreationModalProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [isDirty, setIsDirty] = useState(false);
  const [formData, setFormData] = useState<ExamFormData>({
    name: '',
    examType: '',
    location: '',
    scheduledDate: '',
    scheduledTime: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    examStorage.create(formData);
    resetForm();
    setOpen(false);
    onExamCreated();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      examType: '',
      location: '',
      scheduledDate: '',
      scheduledTime: '',
    });
    setDate(undefined);
    setIsDirty(false);
  };

  const handleChange = (field: keyof ExamFormData, value: string) => {
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

  const handleCancel = () => {
    if (isDirty) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        resetForm();
        setOpen(false);
      }
    } else {
      resetForm();
      setOpen(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && isDirty) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        resetForm();
        setOpen(false);
      }
    } else {
      setOpen(newOpen);
      if (!newOpen) {
        resetForm();
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2">
          <Plus size={16} weight="bold" />
          Create Exam
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Exam Session</DialogTitle>
          <DialogDescription>
            Set up a new exam with PIN-based authentication. Student PINs will be generated from their registration data.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Exam Name</Label>
            <Input
              id="name"
              placeholder="e.g., Mathematics Final Exam"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="examType">Exam Type</Label>
            <Input
              id="examType"
              placeholder="e.g., Final, Midterm, Quiz"
              value={formData.examType}
              onChange={(e) => handleChange('examType', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="e.g., Room 101, Building A"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              required
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
              <Label htmlFor="scheduledTime">Time</Label>
              <Input
                id="scheduledTime"
                type="time"
                value={formData.scheduledTime}
                onChange={(e) => handleChange('scheduledTime', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Create Exam</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

