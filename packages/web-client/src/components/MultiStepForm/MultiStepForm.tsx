import React, { useState } from 'react';
import { Button } from '@skillfuze/ui-components';

interface StepProps {
  currentStep?: number;
  number?: number;
  children?: any;
  title: string;
  description: string;
}

export const Step: React.FC<StepProps> = (props: StepProps) => {
  if (props.currentStep !== props.number) {
    return null;
  }

  return (
    <div className="mt-20 space-y-2">
      <h1 className="font-semibold">{props.title}</h1>
      <h3 className="text-xl text-grey leading-tight">{props.description}</h3>
      <div className="pt-6 pb-12 space-y-4">{props.children}</div>
    </div>
  );
};

interface MultiStepFormProps {
  children: any;
  onNext: () => boolean;
}

const MultiStepForm: React.FC<MultiStepFormProps> = (props: MultiStepFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);

  const onNext = () => {
    if (props.onNext()) {
      if (currentStep < props.children.length) {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const onPrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const getStepColor = step => {
    if (step < currentStep) {
      return 'bg-primary';
    }
    if (step === currentStep) {
      return 'bg-secondary';
    }
    return 'bg-grey';
  };

  return (
    <div className="flex flex-col flex-grow w-full mt-12">
      <div className="flex justify-between">
        {props.children.map((child, index) => {
          return (
            <div
              className={`${getStepColor(index + 1)} rounded-full flex justify-center items-center text-white`}
              style={{ width: '30px', height: '30px' }}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
      {props.children.map((step, index) => React.cloneElement(step, { currentStep, number: index + 1 }))}
      {/* TODO: Save */}
      <div className="flex justify-end space-x-2">
        <Button onClick={onPrev} disabled={currentStep === 1} color="secondary">
          PREVIOUS
        </Button>
        <Button onClick={onNext} disabled={currentStep === props.children.length}>
          NEXT
        </Button>
      </div>
    </div>
  );
};

export default MultiStepForm;
