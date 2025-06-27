import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calculator, Info } from "lucide-react";

export default function THCCalculator() {
  const [delta9, setDelta9] = useState<string>("");
  const [thca, setThca] = useState<string>("");
  const [result, setResult] = useState<{ totalTHC: number; compliant: boolean } | null>(null);

  const calculateTHC = () => {
    const delta9Value = parseFloat(delta9) || 0;
    const thcaValue = parseFloat(thca) || 0;
    
    // Formula: THCA × 0.877 + Delta-9 THC
    const totalTHC = (thcaValue * 0.877) + delta9Value;
    const isCompliant = totalTHC <= 0.3;
    
    setResult({ totalTHC, compliant: isCompliant });
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-primary mb-6">
        <Calculator className="inline mr-3" />
        Interactive THC Compliance Calculator
      </h2>
      <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg mb-6">
        <strong>Instructions:</strong> Enter the Delta-9 THC and THCA percentages from your lab results. 
        The calculator will determine total THC using the formula: Delta-9 THC + (THCA × 0.877). 
        Results show compliance status for hemp (≤0.3% total THC) and cannabis regulations.
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Calculate Total THC</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="delta9" className="block text-sm font-medium text-gray-700 mb-2">
                Delta-9 THC (%)
              </Label>
              <Input
                id="delta9"
                type="number"
                step="0.01"
                max="0.3"
                value={delta9}
                onChange={(e) => setDelta9(e.target.value)}
                placeholder="0.15"
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="thca" className="block text-sm font-medium text-gray-700 mb-2">
                THCA (%)
              </Label>
              <Input
                id="thca"
                type="number"
                step="0.01"
                value={thca}
                onChange={(e) => setThca(e.target.value)}
                placeholder="0.05"
                className="w-full"
              />
            </div>
            <Button 
              onClick={calculateTHC}
              className="w-full bg-accent text-white hover:bg-opacity-90"
            >
              Calculate Total THC
            </Button>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Results</h3>
          <div className="bg-secondary p-6 rounded-lg">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-700">Formula:</span>
                <span className="text-sm font-mono">THCA × 0.877 + Δ9-THC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-700">Total THC:</span>
                <span className="text-sm font-bold">
                  {result ? `${result.totalTHC.toFixed(3)}%` : '---%'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-700">Compliance Status:</span>
                <span className={`text-sm font-bold ${
                  result 
                    ? result.compliant 
                      ? 'text-green-600' 
                      : 'text-red-600'
                    : 'text-gray-500'
                }`}>
                  {result 
                    ? result.compliant 
                      ? 'COMPLIANT' 
                      : 'NON-COMPLIANT'
                    : '---'
                  }
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800">
              <Info className="inline h-4 w-4 mr-2" />
              Legal hemp must contain ≤0.3% Delta-9 THC on a dry weight basis
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
