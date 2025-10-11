import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TimePickerProps {
  value?: string; // Format: "HH:mm" (e.g., "14:30")
  onChange?: (value: string) => void;
  required?: boolean;
  id?: string;
}

export function TimePicker({ value = '', onChange, required, id }: TimePickerProps) {
  // Parse the time value
  const [hours, minutes] = value ? value.split(':') : ['', ''];

  const handleHourChange = (newHour: string) => {
    const newTime = `${newHour}:${minutes || '00'}`;
    onChange?.(newTime);
  };

  const handleMinuteChange = (newMinute: string) => {
    const newTime = `${hours || '00'}:${newMinute}`;
    onChange?.(newTime);
  };

  // Generate hour options (00-23)
  const hourOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return { value: hour, label: hour };
  });

  // Generate minute options (00-59, in 5-minute intervals)
  const minuteOptions = Array.from({ length: 12 }, (_, i) => {
    const minute = (i * 5).toString().padStart(2, '0');
    return { value: minute, label: minute };
  });

  return (
    <div className="flex gap-2 items-center" id={id}>
      <Select value={hours} onValueChange={handleHourChange} required={required}>
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Hour" />
        </SelectTrigger>
        <SelectContent>
          {hourOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className="text-muted-foreground">:</span>
      <Select value={minutes} onValueChange={handleMinuteChange} required={required}>
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Min" />
        </SelectTrigger>
        <SelectContent>
          {minuteOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

