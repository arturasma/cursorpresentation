import { Card } from '@/components/ui/card';
import { ArrowRight, ArrowDown } from 'phosphor-react';

type FlowStep = {
  role: 'teacher' | 'student' | 'system';
  title: string;
  description: string;
  icon?: React.ReactNode;
};

type FlowStepGroup = {
  teacher?: FlowStep;
  system?: FlowStep;
  student?: FlowStep;
};

interface VerticalFlowStepperProps {
  steps: FlowStepGroup[];
}

const roleStyles = {
  teacher: {
    bg: 'bg-blue-50 dark:bg-blue-950/20',
    border: 'border-blue-200 dark:border-blue-800',
    text: 'text-blue-900 dark:text-blue-100',
    badge: 'bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-100',
  },
  student: {
    bg: 'bg-green-50 dark:bg-green-950/20',
    border: 'border-green-200 dark:border-green-800',
    text: 'text-green-900 dark:text-green-100',
    badge: 'bg-green-100 dark:bg-green-900/40 text-green-900 dark:text-green-100',
  },
  system: {
    bg: 'bg-primary/10',
    border: 'border-primary/30',
    text: 'text-primary',
    badge: 'bg-primary/20 text-primary',
  },
};

function FlowStepCard({ step }: { step: FlowStep }) {
  const styles = roleStyles[step.role];
  
  return (
    <div className="flex-1 min-w-0">
      <Card className={`${styles.bg} ${styles.border} border p-4 shadow-sm h-full`}>
        <div className="flex items-start gap-3">
          {step.icon && (
            <div className={`${styles.text} flex-shrink-0`}>
              {step.icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${styles.badge} inline-block px-2 py-0.5 rounded`}>
              {step.role}
            </div>
            <h4 className={`font-semibold text-sm mb-1 ${styles.text}`}>
              {step.title}
            </h4>
            <p className="text-xs text-muted-foreground">
              {step.description}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function VerticalFlowStepper({ steps }: VerticalFlowStepperProps) {
  return (
    <div className="space-y-8">
      {steps.map((stepGroup, groupIndex) => (
        <div key={groupIndex}>
          {/* Desktop: Horizontal layout */}
          <div className="hidden md:flex gap-4 items-start">
            {/* Teacher Column */}
            <div className="flex-1">
              {stepGroup.teacher ? (
                <FlowStepCard step={stepGroup.teacher} />
              ) : (
                <div className="h-full" />
              )}
            </div>

            {/* Arrow */}
            {stepGroup.teacher && stepGroup.system && (
              <div className="flex items-center pt-8">
                <ArrowRight size={20} weight="bold" className="text-muted-foreground" />
              </div>
            )}

            {/* System Column */}
            <div className="flex-1">
              {stepGroup.system ? (
                <FlowStepCard step={stepGroup.system} />
              ) : (
                <div className="h-full" />
              )}
            </div>

            {/* Arrow */}
            {stepGroup.system && stepGroup.student && (
              <div className="flex items-center pt-8">
                <ArrowRight size={20} weight="bold" className="text-muted-foreground" />
              </div>
            )}

            {/* Student Column */}
            <div className="flex-1">
              {stepGroup.student ? (
                <FlowStepCard step={stepGroup.student} />
              ) : (
                <div className="h-full" />
              )}
            </div>
          </div>

          {/* Mobile: Vertical stack */}
          <div className="md:hidden space-y-3">
            {stepGroup.teacher && (
              <>
                <FlowStepCard step={stepGroup.teacher} />
                {(stepGroup.system || stepGroup.student) && (
                  <div className="flex justify-center">
                    <ArrowDown size={20} weight="bold" className="text-muted-foreground" />
                  </div>
                )}
              </>
            )}
            {stepGroup.system && (
              <>
                <FlowStepCard step={stepGroup.system} />
                {stepGroup.student && (
                  <div className="flex justify-center">
                    <ArrowDown size={20} weight="bold" className="text-muted-foreground" />
                  </div>
                )}
              </>
            )}
            {stepGroup.student && <FlowStepCard step={stepGroup.student} />}
          </div>

          {/* Connector to next group */}
          {groupIndex < steps.length - 1 && (
            <div className="flex justify-center my-4">
              <ArrowDown size={24} weight="bold" className="text-primary" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

