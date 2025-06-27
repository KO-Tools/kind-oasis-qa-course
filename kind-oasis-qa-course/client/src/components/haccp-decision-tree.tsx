import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ChevronDown, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface DecisionNode {
  id: string;
  question: string;
  explanation: string;
  yesPath?: string;
  noPath?: string;
  result?: 'CCP' | 'CP' | 'Not Control Point';
  examples?: string[];
}

const decisionNodes: Record<string, DecisionNode> = {
  start: {
    id: 'start',
    question: 'Are preventive measures in place for this hazard?',
    explanation: 'Preventive measures are actions taken to prevent or minimize hazards.',
    yesPath: 'q1',
    noPath: 'modify',
    examples: [
      'Temperature controls for drying',
      'Cleaning procedures for equipment',
      'Supplier qualification programs'
    ]
  },
  modify: {
    id: 'modify',
    question: 'Can the step be modified to include preventive measures?',
    explanation: 'Consider if you can add controls or modify the process to address the hazard.',
    yesPath: 'q1',
    noPath: 'not_cp',
    examples: [
      'Add temperature monitoring to drying process',
      'Install metal detection equipment',
      'Implement visual inspection procedures'
    ]
  },
  q1: {
    id: 'q1',
    question: 'Is control at this step necessary to prevent, eliminate, or reduce the hazard?',
    explanation: 'This step must be essential for safety - without it, the hazard would remain uncontrolled.',
    yesPath: 'q2',
    noPath: 'cp',
    examples: [
      'Heat treatment to eliminate pathogens',
      'Metal detection before packaging',
      'pH adjustment to prevent bacterial growth'
    ]
  },
  q2: {
    id: 'q2',
    question: 'Could contamination occur at unacceptable levels?',
    explanation: 'Consider if hazards could increase to dangerous levels at this step.',
    yesPath: 'q3',
    noPath: 'cp',
    examples: [
      'Microbial growth during storage',
      'Cross-contamination during handling',
      'Chemical contamination from cleaning agents'
    ]
  },
  q3: {
    id: 'q3',
    question: 'Will a subsequent step eliminate or reduce the hazard?',
    explanation: 'Check if later process steps will adequately control this hazard.',
    yesPath: 'cp',
    noPath: 'q4',
    examples: [
      'Heat treatment after mixing',
      'Final testing before packaging',
      'Filtration in downstream processing'
    ]
  },
  q4: {
    id: 'q4',
    question: 'Will a subsequent step reduce the hazard to acceptable levels?',
    explanation: 'Even if not eliminated, will later steps make the hazard acceptable?',
    yesPath: 'cp',
    noPath: 'ccp',
    examples: [
      'Partial reduction through processing',
      'Dilution in final formulation',
      'Testing that catches most issues'
    ]
  },
  ccp: {
    id: 'ccp',
    question: '',
    explanation: 'This is a Critical Control Point (CCP). Establish critical limits, monitoring, and corrective actions.',
    result: 'CCP',
    examples: [
      'Final product testing for potency',
      'Metal detection before packaging',
      'Temperature control during extraction'
    ]
  },
  cp: {
    id: 'cp',
    question: '',
    explanation: 'This is a Control Point (CP). Important for quality but not critical for safety.',
    result: 'CP',
    examples: [
      'Visual inspection for defects',
      'Weight checks during filling',
      'Label verification processes'
    ]
  },
  not_cp: {
    id: 'not_cp',
    question: '',
    explanation: 'This step is not a control point. Consider if the process needs modification.',
    result: 'Not Control Point',
    examples: [
      'Administrative record keeping',
      'Storage of finished products',
      'Routine equipment maintenance'
    ]
  }
};

const cannabisExamples = {
  'Drying Process': {
    hazard: 'Mold growth due to excessive moisture',
    steps: ['start', 'q1', 'q2', 'q3', 'ccp'],
    answers: ['Yes', 'Yes', 'Yes', 'No', ''],
    result: 'CCP'
  },
  'Extraction Process': {
    hazard: 'Residual solvents above safe limits',
    steps: ['start', 'q1', 'q2', 'q3', 'ccp'],
    answers: ['Yes', 'Yes', 'Yes', 'No', ''],
    result: 'CCP'
  },
  'Packaging Process': {
    hazard: 'Foreign material contamination',
    steps: ['start', 'q1', 'q2', 'q3', 'q4', 'cp'],
    answers: ['Yes', 'Yes', 'No', 'Yes', 'Yes', ''],
    result: 'CP'
  }
};

export default function HACCPDecisionTree() {
  const [currentNode, setCurrentNode] = useState('start');
  const [path, setPath] = useState<string[]>(['start']);
  const [selectedExample, setSelectedExample] = useState<string | null>(null);
  const [showExamples, setShowExamples] = useState(false);

  const handleAnswer = (answer: 'yes' | 'no') => {
    const node = decisionNodes[currentNode];
    const nextNode = answer === 'yes' ? node.yesPath : node.noPath;
    
    if (nextNode) {
      setCurrentNode(nextNode);
      setPath(prev => [...prev, nextNode]);
    }
  };

  const reset = () => {
    setCurrentNode('start');
    setPath(['start']);
    setSelectedExample(null);
  };

  const runExample = (exampleName: string) => {
    const example = cannabisExamples[exampleName as keyof typeof cannabisExamples];
    if (example) {
      setSelectedExample(exampleName);
      setCurrentNode(example.steps[example.steps.length - 1]);
      setPath(example.steps);
    }
  };

  const currentNodeData = decisionNodes[currentNode];
  const isComplete = currentNodeData.result !== undefined;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-primary">HACCP Decision Tree</CardTitle>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowExamples(!showExamples)}
              >
                {showExamples ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                Examples
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
            <strong>Instructions:</strong> Answer each question with Yes or No to determine if a process step is a Critical Control Point (CCP). 
            You can also try the cannabis industry examples to see how different hazards are evaluated. A CCP is essential for food safety and requires monitoring, critical limits, and corrective actions.
          </div>
          {showExamples && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-3">Cannabis Industry Examples</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {Object.entries(cannabisExamples).map(([name, example]) => (
                  <Button
                    key={name}
                    variant="outline"
                    size="sm"
                    onClick={() => runExample(name)}
                    className="h-auto p-3 text-left"
                  >
                    <div>
                      <div className="font-medium">{name}</div>
                      <div className="text-xs text-gray-600 mt-1">{example.hazard}</div>
                      <Badge className="mt-2" variant={example.result === 'CCP' ? 'destructive' : 'secondary'}>
                        {example.result}
                      </Badge>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            {/* Progress indicator */}
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Step {path.length}</span>
              <div className="flex space-x-1">
                {path.map((step, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === path.length - 1 ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {selectedExample && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">Example</Badge>
                  <span className="font-medium">{selectedExample}</span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {cannabisExamples[selectedExample as keyof typeof cannabisExamples].hazard}
                </div>
              </div>
            )}

            <Card className="border-2 border-primary">
              <CardContent className="p-6">
                {currentNodeData.question && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">{currentNodeData.question}</h3>
                    <p className="text-gray-600 text-sm">{currentNodeData.explanation}</p>
                  </div>
                )}

                {currentNodeData.examples && (
                  <div className="mb-4">
                    <h4 className="font-medium text-sm mb-2">Examples:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {currentNodeData.examples.map((example, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span>•</span>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {isComplete ? (
                  <div className="text-center">
                    <div className="mb-4">
                      {currentNodeData.result === 'CCP' && (
                        <div className="flex items-center justify-center space-x-2 text-red-600">
                          <XCircle className="h-8 w-8" />
                          <span className="text-xl font-bold">Critical Control Point</span>
                        </div>
                      )}
                      {currentNodeData.result === 'CP' && (
                        <div className="flex items-center justify-center space-x-2 text-yellow-600">
                          <CheckCircle className="h-8 w-8" />
                          <span className="text-xl font-bold">Control Point</span>
                        </div>
                      )}
                      {currentNodeData.result === 'Not Control Point' && (
                        <div className="flex items-center justify-center space-x-2 text-gray-600">
                          <CheckCircle className="h-8 w-8" />
                          <span className="text-xl font-bold">Not a Control Point</span>
                        </div>
                      )}
                    </div>
                    <Badge
                      className={
                        currentNodeData.result === 'CCP'
                          ? 'bg-red-500 text-white'
                          : currentNodeData.result === 'CP'
                          ? 'bg-yellow-500 text-black'
                          : 'bg-gray-500 text-white'
                      }
                    >
                      {currentNodeData.result}
                    </Badge>
                  </div>
                ) : (
                  <div className="flex space-x-4 justify-center">
                    <Button onClick={() => handleAnswer('yes')} className="bg-green-600 hover:bg-green-700">
                      Yes
                    </Button>
                    <Button onClick={() => handleAnswer('no')} className="bg-red-600 hover:bg-red-700">
                      No
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}