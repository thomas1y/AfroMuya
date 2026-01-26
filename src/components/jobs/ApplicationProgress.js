'use client';

const ApplicationProgress = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'Personal Info' },
    { number: 2, label: 'Documents' },
    { number: 3, label: 'Questions' },
    { number: 4, label: 'Review' },
  ];

  return (
    <div className="mb-8">
      <div className="flex justify-between relative">
        {/* Progress line */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
        <div 
          className="absolute top-4 left-0 h-0.5 bg-primary -z-10 transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        ></div>
        
        {/* Steps */}
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
              ${currentStep >= step.number 
                ? 'bg-primary text-white' 
                : 'bg-gray-200 text-gray-500'
              }
              ${currentStep === step.number ? 'ring-4 ring-primary/20' : ''}
            `}>
              {step.number}
            </div>
            <span className={`
              text-xs mt-2 font-medium
              ${currentStep >= step.number ? 'text-primary' : 'text-gray-500'}
            `}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationProgress;