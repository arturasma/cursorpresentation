import { useState, useEffect } from 'react';
import { PencilSimple, CalendarBlank, Trash, X } from 'phosphor-react';
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
import { examStorage } from '@/utils/examStorage';
import type { Exam } from '@/types/exam';

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
  const [formData, setFormData] = useState({
    name: exam.name,
    examType: exam.examType,
    location: exam.location,
    scheduledDate: exam.scheduledDate,
    scheduledTime: exam.scheduledTime,
  });

  useEffect(() => {
    setFormData({
      name: exam.name,
      examType: exam.examType,
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
      if (window.confirm('You have unsaved changes. Are you sure you want to discard them?')) {
        setFormData({
          name: exam.name,
          examType: exam.examType,
          location: exam.location,
          scheduledDate: exam.scheduledDate,
          scheduledTime: exam.scheduledTime,
        });
        setIsEditing(false);
        setIsDirty(false);
      }
    } else {
      setIsEditing(false);
    }
  };

  const handleClose = () => {
    if (isEditing && isDirty) {
      if (window.confirm('You have unsaved changes. Are you sure you want to close?')) {
        onClose();
        setIsEditing(false);
        setIsDirty(false);
      }
    } else {
      onClose();
      setIsEditing(false);
      setIsDirty(false);
    }
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
                  onClick={onDelete}
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

                <div className="space-y-2">
                  <Label htmlFor="edit-examType">Exam Type</Label>
                  <Input
                    id="edit-examType"
                    value={formData.examType}
                    onChange={(e) => handleChange('examType', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-location">Location</Label>
                  <Input
                    id="edit-location"
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
                      <p className="text-sm text-muted-foreground mb-1">Type</p>
                      <p className="font-medium">{exam.examType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Location</p>
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
                      <div className="space-y-2">
                        {exam.registeredStudents.map((student) => (
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
                                  year: 'numeric',
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
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

