import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, Plus, Trash2 } from 'lucide-react';

interface FMEAEntry {
  id: string;
  processStep: string;
  failureMode: string;
  effect: string;
  cause: string;
  severity: number;
  occurrence: number;
  detection: number;
  rpn: number;
}

const getRPNLevel = (rpn: number): { level: string; color: string; action: string } => {
  if (rpn >= 500) return { level: 'Critical', color: 'bg-red-500 text-white', action: 'Stop process immediately' };
  if (rpn >= 200) return { level: 'High', color: 'bg-orange-500 text-white', action: 'Immediate action required' };
  if (rpn >= 100) return { level: 'Medium', color: 'bg-yellow-500 text-black', action: 'Enhanced controls needed' };
  return { level: 'Low', color: 'bg-green-500 text-white', action: 'Routine monitoring' };
};

const severityDescriptions = [
  'No effect',
  'Very minor effect',
  'Minor effect',
  'Moderate effect',
  'Significant effect',
  'Major effect',
  'Extreme effect',
  'Serious effect',
  'Hazardous effect',
  'Catastrophic effect'
];

const occurrenceDescriptions = [
  'Remote possibility',
  'Very low occurrence',
  'Low occurrence',
  'Moderately low occurrence',
  'Moderate occurrence',
  'Moderately high occurrence',
  'High occurrence',
  'Very high occurrence',
  'Extremely high occurrence',
  'Certain to occur'
];

const detectionDescriptions = [
  'Almost certain detection',
  'Very high detection',
  'High detection',
  'Moderately high detection',
  'Moderate detection',
  'Low detection',
  'Very low detection',
  'Remote detection',
  'Very remote detection',
  'Absolute uncertainty'
];

export default function FMEACalculator() {
  const [entries, setEntries] = useState<FMEAEntry[]>([
    {
      id: '1',
      processStep: 'Drying Process',
      failureMode: 'Temperature too high',
      effect: 'Product degradation',
      cause: 'Thermostat malfunction',
      severity: 7,
      occurrence: 3,
      detection: 4,
      rpn: 84
    }
  ]);

  const [newEntry, setNewEntry] = useState<Partial<FMEAEntry>>({
    processStep: '',
    failureMode: '',
    effect: '',
    cause: '',
    severity: 5,
    occurrence: 5,
    detection: 5
  });

  const calculateRPN = (severity: number, occurrence: number, detection: number): number => {
    return severity * occurrence * detection;
  };

  const updateEntry = (id: string, field: keyof FMEAEntry, value: any) => {
    setEntries(prev => prev.map(entry => {
      if (entry.id === id) {
        const updated = { ...entry, [field]: value };
        if (['severity', 'occurrence', 'detection'].includes(field)) {
          updated.rpn = calculateRPN(updated.severity, updated.occurrence, updated.detection);
        }
        return updated;
      }
      return entry;
    }));
  };

  const addEntry = () => {
    if (newEntry.processStep && newEntry.failureMode) {
      const entry: FMEAEntry = {
        id: Date.now().toString(),
        processStep: newEntry.processStep || '',
        failureMode: newEntry.failureMode || '',
        effect: newEntry.effect || '',
        cause: newEntry.cause || '',
        severity: newEntry.severity || 5,
        occurrence: newEntry.occurrence || 5,
        detection: newEntry.detection || 5,
        rpn: calculateRPN(newEntry.severity || 5, newEntry.occurrence || 5, newEntry.detection || 5)
      };
      setEntries(prev => [...prev, entry]);
      setNewEntry({
        processStep: '',
        failureMode: '',
        effect: '',
        cause: '',
        severity: 5,
        occurrence: 5,
        detection: 5
      });
    }
  };

  const removeEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const exportData = () => {
    const csvContent = [
      ['Process Step', 'Failure Mode', 'Effect', 'Cause', 'Severity', 'Occurrence', 'Detection', 'RPN', 'Risk Level'].join(','),
      ...entries.map(entry => [
        entry.processStep,
        entry.failureMode,
        entry.effect,
        entry.cause,
        entry.severity,
        entry.occurrence,
        entry.detection,
        entry.rpn,
        getRPNLevel(entry.rpn).level
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fmea-analysis.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">FMEA Calculator & Analysis Tool</CardTitle>
          <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
            <strong>Instructions:</strong> Fill in the process details and adjust the severity, occurrence, and detection ratings using the sliders. 
            The Risk Priority Number (RPN) is automatically calculated as Severity × Occurrence × Detection. Higher RPN scores indicate higher priority risks requiring immediate attention.
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="processStep">Process Step</Label>
                <Input
                  id="processStep"
                  value={newEntry.processStep || ''}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, processStep: e.target.value }))}
                  placeholder="e.g., Extraction Process"
                />
              </div>
              <div>
                <Label htmlFor="failureMode">Failure Mode</Label>
                <Input
                  id="failureMode"
                  value={newEntry.failureMode || ''}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, failureMode: e.target.value }))}
                  placeholder="e.g., Pressure loss"
                />
              </div>
              <div>
                <Label htmlFor="effect">Effect</Label>
                <Input
                  id="effect"
                  value={newEntry.effect || ''}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, effect: e.target.value }))}
                  placeholder="e.g., Incomplete extraction"
                />
              </div>
              <div>
                <Label htmlFor="cause">Cause</Label>
                <Input
                  id="cause"
                  value={newEntry.cause || ''}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, cause: e.target.value }))}
                  placeholder="e.g., Seal degradation"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>Severity: {newEntry.severity}</Label>
                <Slider
                  value={[newEntry.severity || 5]}
                  onValueChange={(value) => setNewEntry(prev => ({ ...prev, severity: value[0] }))}
                  min={1}
                  max={10}
                  step={1}
                  className="w-full"
                />
                <div className="text-xs text-gray-600">
                  {severityDescriptions[(newEntry.severity || 5) - 1]}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Occurrence: {newEntry.occurrence}</Label>
                <Slider
                  value={[newEntry.occurrence || 5]}
                  onValueChange={(value) => setNewEntry(prev => ({ ...prev, occurrence: value[0] }))}
                  min={1}
                  max={10}
                  step={1}
                  className="w-full"
                />
                <div className="text-xs text-gray-600">
                  {occurrenceDescriptions[(newEntry.occurrence || 5) - 1]}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Detection: {newEntry.detection}</Label>
                <Slider
                  value={[newEntry.detection || 5]}
                  onValueChange={(value) => setNewEntry(prev => ({ ...prev, detection: value[0] }))}
                  min={1}
                  max={10}
                  step={1}
                  className="w-full"
                />
                <div className="text-xs text-gray-600">
                  {detectionDescriptions[(newEntry.detection || 5) - 1]}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
              <div>
                <div className="text-sm font-medium">Risk Priority Number (RPN)</div>
                <div className="text-xs text-gray-600">
                  {newEntry.severity} × {newEntry.occurrence} × {newEntry.detection}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-2xl font-bold">
                  {calculateRPN(newEntry.severity || 5, newEntry.occurrence || 5, newEntry.detection || 5)}
                </div>
                <Badge className={getRPNLevel(calculateRPN(newEntry.severity || 5, newEntry.occurrence || 5, newEntry.detection || 5)).color}>
                  {getRPNLevel(calculateRPN(newEntry.severity || 5, newEntry.occurrence || 5, newEntry.detection || 5)).level}
                </Badge>
              </div>
            </div>

            <Button onClick={addEntry} disabled={!newEntry.processStep || !newEntry.failureMode}>
              <Plus className="h-4 w-4 mr-2" />
              Add FMEA Entry
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>FMEA Analysis Results</CardTitle>
            <Button onClick={exportData} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {entries.map(entry => {
              const rpnInfo = getRPNLevel(entry.rpn);
              return (
                <div key={entry.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">{entry.processStep}</h4>
                      <p className="text-sm text-gray-600">{entry.failureMode}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={rpnInfo.color}>
                        RPN: {entry.rpn} ({rpnInfo.level})
                      </Badge>
                      <Button
                        onClick={() => removeEntry(entry.id)}
                        variant="ghost"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Effect:</span> {entry.effect}
                    </div>
                    <div>
                      <span className="font-medium">Cause:</span> {entry.cause}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                    <div>Severity: {entry.severity}</div>
                    <div>Occurrence: {entry.occurrence}</div>
                    <div>Detection: {entry.detection}</div>
                  </div>
                  <div className="mt-2 text-xs text-gray-600">
                    <span className="font-medium">Action Required:</span> {rpnInfo.action}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}