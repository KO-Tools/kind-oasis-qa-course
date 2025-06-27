import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RiskScenario {
  id: string;
  title: string;
  description: string;
  probability: number; // 1-3 (Low, Medium, High)
  impact: number; // 1-3 (Low, Medium, High)
  category: 'biological' | 'chemical' | 'physical';
}

const riskScenarios: RiskScenario[] = [
  {
    id: 'mold',
    title: 'Mold Contamination',
    description: 'Improper drying conditions leading to mold growth',
    probability: 2,
    impact: 3,
    category: 'biological'
  },
  {
    id: 'pesticide',
    title: 'Pesticide Residue',
    description: 'Excessive pesticide application during cultivation',
    probability: 2,
    impact: 3,
    category: 'chemical'
  },
  {
    id: 'metal',
    title: 'Metal Fragment',
    description: 'Equipment wear causing metal contamination',
    probability: 1,
    impact: 2,
    category: 'physical'
  },
  {
    id: 'solvent',
    title: 'Residual Solvents',
    description: 'Incomplete solvent removal during extraction',
    probability: 2,
    impact: 2,
    category: 'chemical'
  },
  {
    id: 'bacteria',
    title: 'Bacterial Growth',
    description: 'Poor sanitation leading to bacterial contamination',
    probability: 1,
    impact: 3,
    category: 'biological'
  }
];

const getRiskLevel = (probability: number, impact: number): string => {
  const score = probability * impact;
  if (score >= 6) return 'Critical';
  if (score >= 4) return 'High';
  if (score >= 2) return 'Medium';
  return 'Low';
};

const getRiskColor = (level: string): string => {
  switch (level) {
    case 'Critical': return 'bg-red-500 text-white';
    case 'High': return 'bg-orange-500 text-white';
    case 'Medium': return 'bg-yellow-500 text-black';
    case 'Low': return 'bg-green-500 text-white';
    default: return 'bg-gray-300 text-black';
  }
};

const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'biological': return 'bg-blue-100 text-blue-800';
    case 'chemical': return 'bg-purple-100 text-purple-800';
    case 'physical': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function RiskMatrix() {
  const [selectedScenario, setSelectedScenario] = useState<RiskScenario | null>(null);
  const [selectedCell, setSelectedCell] = useState<{probability: number, impact: number} | null>(null);

  const getCellScenarios = (probability: number, impact: number) => {
    return riskScenarios.filter(s => s.probability === probability && s.impact === impact);
  };

  const handleScenarioClick = (scenario: RiskScenario) => {
    setSelectedScenario(scenario);
    setSelectedCell({probability: scenario.probability, impact: scenario.impact});
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Interactive Risk Assessment Matrix</CardTitle>
          <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
            <strong>Instructions:</strong> Click on any scenario below to see where it appears on the risk matrix. 
            Each scenario is positioned based on its probability (how likely) and impact (how severe) ratings.
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2 mb-6">
            {/* Header row */}
            <div className="text-center font-semibold text-sm">Impact →<br/>Probability ↓</div>
            <div className="text-center font-semibold text-sm bg-gray-100 p-2 rounded">Low (1)</div>
            <div className="text-center font-semibold text-sm bg-gray-100 p-2 rounded">Medium (2)</div>
            <div className="text-center font-semibold text-sm bg-gray-100 p-2 rounded">High (3)</div>
            
            {/* Matrix cells */}
            {[3, 2, 1].map(probability => (
              <React.Fragment key={probability}>
                <div className="text-center font-semibold text-sm bg-gray-100 p-2 rounded">
                  {probability === 3 ? 'High (3)' : probability === 2 ? 'Medium (2)' : 'Low (1)'}
                </div>
                {[1, 2, 3].map(impact => {
                  const level = getRiskLevel(probability, impact);
                  const scenarios = getCellScenarios(probability, impact);
                  return (
                    <div
                      key={`${probability}-${impact}`}
                      className={cn(
                        "min-h-24 p-2 rounded border-2 cursor-pointer transition-all",
                        getRiskColor(level),
                        selectedCell?.probability === probability && selectedCell?.impact === impact
                          ? "border-primary border-solid shadow-lg ring-2 ring-primary/20"
                          : "border-gray-300"
                      )}
                      onClick={() => setSelectedCell({probability, impact})}
                    >
                      <div className="text-xs font-semibold mb-1">{level}</div>
                      <div className="space-y-1">
                        {scenarios.map(scenario => (
                          <div
                            key={scenario.id}
                            className={cn(
                              "text-xs p-1 bg-white/30 rounded cursor-pointer hover:bg-white/50 transition-colors",
                              selectedScenario?.id === scenario.id && "ring-2 ring-white"
                            )}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleScenarioClick(scenario);
                            }}
                          >
                            {scenario.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>

          {selectedCell && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-sm">
                  Risk Level: {getRiskLevel(selectedCell.probability, selectedCell.impact)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {getCellScenarios(selectedCell.probability, selectedCell.impact).map(scenario => (
                    <div key={scenario.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div>
                        <div className="font-medium">{scenario.title}</div>
                        <div className="text-sm text-gray-600">{scenario.description}</div>
                      </div>
                      <Badge className={getCategoryColor(scenario.category)}>
                        {scenario.category}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Cannabis Manufacturing Risk Scenarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600 mb-3">
            Click on any scenario to see its position on the risk matrix above and learn about its risk assessment.
          </div>
          <div className="space-y-2">
            {riskScenarios.map(scenario => (
              <div
                key={scenario.id}
                className={cn(
                  "flex items-center justify-between p-3 rounded cursor-pointer transition-all hover:shadow-md",
                  selectedScenario?.id === scenario.id 
                    ? "bg-primary/10 border-2 border-primary" 
                    : "bg-gray-50 hover:bg-gray-100"
                )}
                onClick={() => handleScenarioClick(scenario)}
              >
                <div>
                  <div className="font-medium">{scenario.title}</div>
                  <div className="text-sm text-gray-600">{scenario.description}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getCategoryColor(scenario.category)}>
                    {scenario.category}
                  </Badge>
                  <Badge variant="outline">
                    Risk Level: {getRiskLevel(scenario.probability, scenario.impact)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}