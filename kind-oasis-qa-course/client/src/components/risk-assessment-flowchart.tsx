import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle, Play, SkipForward, RotateCcw } from 'lucide-react';

interface FlowStep {
  id: string;
  title: string;
  description: string;
  details: string[];
  deliverables: string[];
  timeEstimate: string;
  keyQuestions: string[];
}

const flowSteps: FlowStep[] = [
  {
    id: 'preparation',
    title: '1. Preparation & Team Formation',
    description: 'Establish the risk assessment team and define scope',
    details: [
      'Assemble cross-functional team members',
      'Define assessment scope and boundaries',
      'Gather relevant documentation and data',
      'Schedule team meetings and sessions'
    ],
    deliverables: [
      'Team roster with roles and responsibilities',
      'Risk assessment charter',
      'Data collection plan'
    ],
    timeEstimate: '1-2 weeks',
    keyQuestions: [
      'Who are the subject matter experts needed?',
      'What processes/products are in scope?',
      'What historical data is available?'
    ]
  },
  {
    id: 'identification',
    title: '2. Hazard Identification',
    description: 'Systematically identify potential hazards and failure modes',
    details: [
      'Review process flow diagrams',
      'Analyze historical incidents and complaints',
      'Conduct brainstorming sessions',
      'Review regulatory requirements and industry standards'
    ],
    deliverables: [
      'Comprehensive hazard register',
      'Process mapping with hazard points',
      'Failure mode catalog'
    ],
    timeEstimate: '2-3 weeks',
    keyQuestions: [
      'What could go wrong at each process step?',
      'What are the biological, chemical, and physical hazards?',
      'What external factors could introduce risks?'
    ]
  },
  {
    id: 'analysis',
    title: '3. Risk Analysis',
    description: 'Evaluate likelihood and impact of identified hazards',
    details: [
      'Assess probability of occurrence',
      'Evaluate severity of consequences',
      'Consider detection capabilities',
      'Calculate risk scores using chosen methodology'
    ],
    deliverables: [
      'Risk scoring matrix',
      'Probability and impact assessments',
      'Risk Priority Numbers (RPNs) or equivalent scores'
    ],
    timeEstimate: '2-4 weeks',
    keyQuestions: [
      'How likely is this hazard to occur?',
      'What would be the impact if it occurred?',
      'How easily can we detect this hazard?'
    ]
  },
  {
    id: 'evaluation',
    title: '4. Risk Evaluation',
    description: 'Prioritize risks and determine acceptability',
    details: [
      'Compare risks against acceptance criteria',
      'Rank risks by priority',
      'Identify risks requiring immediate attention',
      'Categorize risks by control strategy needed'
    ],
    deliverables: [
      'Prioritized risk register',
      'Risk acceptance decisions',
      'Action priority matrix'
    ],
    timeEstimate: '1-2 weeks',
    keyQuestions: [
      'Which risks are unacceptable?',
      'What are our risk tolerance levels?',
      'Which risks need immediate action?'
    ]
  },
  {
    id: 'control',
    title: '5. Risk Control Implementation',
    description: 'Develop and implement risk control measures',
    details: [
      'Design engineering controls',
      'Develop administrative procedures',
      'Implement monitoring systems',
      'Train personnel on new controls'
    ],
    deliverables: [
      'Risk control plan',
      'Updated procedures and work instructions',
      'Training materials and records'
    ],
    timeEstimate: '4-8 weeks',
    keyQuestions: [
      'What controls will effectively reduce the risk?',
      'How will we monitor control effectiveness?',
      'What training is needed for implementation?'
    ]
  },
  {
    id: 'monitoring',
    title: '6. Monitoring & Review',
    description: 'Establish ongoing monitoring and periodic review',
    details: [
      'Set up Key Risk Indicators (KRIs)',
      'Establish review schedules',
      'Create reporting mechanisms',
      'Plan for continuous improvement'
    ],
    deliverables: [
      'Monitoring plan with KRIs',
      'Review schedule and responsibilities',
      'Reporting templates and dashboards'
    ],
    timeEstimate: 'Ongoing',
    keyQuestions: [
      'How will we track risk control effectiveness?',
      'When should we review and update the assessment?',
      'What triggers require immediate reassessment?'
    ]
  }
];

export default function RiskAssessmentFlowchart() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isPlaying, setIsPlaying] = useState(false);

  const progress = ((currentStep + 1) / flowSteps.length) * 100;

  const nextStep = () => {
    if (currentStep < flowSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const markCompleted = () => {
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    if (currentStep < flowSteps.length - 1) {
      setTimeout(nextStep, 500);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setCompletedSteps(new Set());
    setIsPlaying(false);
  };

  const autoPlay = () => {
    setIsPlaying(true);
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < flowSteps.length - 1) {
          setCompletedSteps(prevCompleted => new Set([...prevCompleted, prev]));
          return prev + 1;
        } else {
          setIsPlaying(false);
          clearInterval(interval);
          return prev;
        }
      });
    }, 3000);
  };

  const currentStepData = flowSteps[currentStep];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-primary">Risk Assessment Process Flow</CardTitle>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={autoPlay}
                disabled={isPlaying}
              >
                <Play className="h-4 w-4 mr-2" />
                Auto Play
              </Button>
              <Button variant="outline" size="sm" onClick={reset}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg mb-6">
            <strong>Instructions:</strong> Navigate through the 6 phases of risk assessment by clicking "Next" or jump to any step using the numbered buttons. 
            Mark steps as complete as you progress. Use "Auto Play" to see the entire process flow automatically.
          </div>
          <div className="space-y-6">
            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Progress</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>

            {/* Step navigation */}
            <div className="flex flex-wrap gap-2">
              {flowSteps.map((step, index) => (
                <Button
                  key={step.id}
                  variant={currentStep === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => goToStep(index)}
                  className="flex items-center space-x-2"
                >
                  {completedSteps.has(index) ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Circle className="h-4 w-4" />
                  )}
                  <span className="hidden sm:inline">Step {index + 1}</span>
                </Button>
              ))}
            </div>

            {/* Current step details */}
            <Card className="border-2 border-primary">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{currentStepData.title}</CardTitle>
                  <Badge variant="outline">{currentStepData.timeEstimate}</Badge>
                </div>
                <p className="text-gray-600">{currentStepData.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Key Activities:</h4>
                  <ul className="space-y-1">
                    {currentStepData.details.map((detail, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm">
                        <span className="text-primary">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Key Questions to Address:</h4>
                  <ul className="space-y-1">
                    {currentStepData.keyQuestions.map((question, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                        <span className="text-accent">?</span>
                        <span className="italic">{question}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Expected Deliverables:</h4>
                  <ul className="space-y-1">
                    {currentStepData.deliverables.map((deliverable, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                  >
                    Previous
                  </Button>
                  <div className="flex space-x-2">
                    <Button
                      onClick={markCompleted}
                      disabled={completedSteps.has(currentStep)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {completedSteps.has(currentStep) ? 'Completed' : 'Mark Complete'}
                    </Button>
                    <Button
                      onClick={nextStep}
                      disabled={currentStep === flowSteps.length - 1}
                    >
                      Next
                      <SkipForward className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}