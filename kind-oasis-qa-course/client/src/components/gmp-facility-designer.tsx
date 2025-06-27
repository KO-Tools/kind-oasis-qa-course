import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building, Users, Wind, Droplets, Shield, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FacilityZone {
  id: string;
  name: string;
  color: string;
  risk: 'high' | 'medium' | 'low';
  requirements: string[];
  description: string;
}

const facilityZones: FacilityZone[] = [
  {
    id: 'cultivation',
    name: 'Cultivation Areas',
    color: 'bg-green-500',
    risk: 'medium',
    requirements: [
      'Climate control (18-26°C, 40-60% RH)',
      'Adequate lighting systems',
      'Air filtration and circulation',
      'Pest exclusion measures',
      'Drainage systems'
    ],
    description: 'Growing areas including mother plant rooms, vegetative growth, and flowering spaces'
  },
  {
    id: 'extraction',
    name: 'Extraction Suites',
    color: 'bg-red-500',
    risk: 'high',
    requirements: [
      'Explosion-proof electrical systems',
      'Negative pressure ventilation',
      'Solvent detection systems',
      'Emergency shut-off controls',
      'Fire suppression systems'
    ],
    description: 'High-risk areas for solvent-based extraction processes'
  },
  {
    id: 'processing',
    name: 'Processing Areas',
    color: 'bg-orange-500',
    risk: 'medium',
    requirements: [
      'Smooth, cleanable surfaces',
      'HEPA filtration systems',
      'Temperature monitoring',
      'Personnel hygiene stations',
      'Product flow controls'
    ],
    description: 'Manufacturing areas for formulation, filling, and packaging'
  },
  {
    id: 'laboratory',
    name: 'Quality Laboratory',
    color: 'bg-blue-500',
    risk: 'high',
    requirements: [
      'Controlled environment (±2°C)',
      'Chemical fume hoods',
      'Sample storage systems',
      'Calibrated instruments',
      'Data security measures'
    ],
    description: 'Testing facility for quality control and compliance testing'
  },
  {
    id: 'storage',
    name: 'Storage Warehouses',
    color: 'bg-yellow-500',
    risk: 'low',
    requirements: [
      'Climate monitoring systems',
      'Inventory tracking systems',
      'Segregated storage areas',
      'Security access controls',
      'Pest monitoring programs'
    ],
    description: 'Raw material and finished product storage areas'
  },
  {
    id: 'support',
    name: 'Support Areas',
    color: 'bg-gray-500',
    risk: 'low',
    requirements: [
      'Personnel facilities',
      'Equipment maintenance areas',
      'Waste management zones',
      'Administrative offices',
      'Training rooms'
    ],
    description: 'Non-production support functions and personnel areas'
  }
];

const designPrinciples = [
  {
    id: 'flow',
    title: 'Unidirectional Material Flow',
    icon: Wind,
    description: 'Materials should flow in one direction from raw materials to finished products to prevent cross-contamination',
    examples: ['Raw materials → Processing → Packaging → Shipping', 'Separate incoming and outgoing paths', 'No backtracking through production areas']
  },
  {
    id: 'segregation',
    title: 'Operational Segregation',
    icon: Shield,
    description: 'Different operations should be physically separated to prevent contamination and ensure safety',
    examples: ['Separate cultivation from processing', 'Isolate extraction from other operations', 'Quarantine areas for materials']
  },
  {
    id: 'contamination',
    title: 'Contamination Prevention',
    icon: AlertTriangle,
    description: 'Design features that prevent introduction and spread of contaminants throughout the facility',
    examples: ['Airlocks between zones', 'Positive pressure gradients', 'Smooth, cleanable surfaces', 'Proper drainage systems']
  },
  {
    id: 'personnel',
    title: 'Personnel Movement Control',
    icon: Users,
    description: 'Controlled access and movement patterns for personnel to maintain hygiene and security',
    examples: ['Designated entry/exit points', 'Gowning/degowning areas', 'Hand washing stations', 'Training on movement protocols']
  }
];

export default function GMPFacilityDesigner() {
  const [selectedZone, setSelectedZone] = useState<FacilityZone | null>(null);
  const [selectedPrinciple, setSelectedPrinciple] = useState<string | null>(null);
  const [showRequirements, setShowRequirements] = useState(false);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">GMP Facility Design Tool</CardTitle>
          <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
            <strong>Instructions:</strong> Click on facility zones below to explore their specific GMP requirements. 
            Then review the design principles to understand how to layout a compliant cannabis facility. 
            Each zone has different risk levels and environmental requirements.
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Facility Layout Visualization */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Cannabis Facility Zones</h3>
              <div className="grid grid-cols-2 gap-3">
                {facilityZones.map(zone => (
                  <div
                    key={zone.id}
                    className={cn(
                      "p-4 rounded-lg cursor-pointer transition-all border-2",
                      zone.color,
                      "text-white hover:opacity-80",
                      selectedZone?.id === zone.id ? "ring-4 ring-primary/20 border-white" : "border-transparent"
                    )}
                    onClick={() => setSelectedZone(zone)}
                  >
                    <div className="text-sm font-medium mb-1">{zone.name}</div>
                    <Badge className={cn("text-xs", getRiskColor(zone.risk))}>
                      {zone.risk.toUpperCase()} RISK
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Zone Details */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Zone Requirements</h3>
              {selectedZone ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-primary mb-2">{selectedZone.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{selectedZone.description}</p>
                    <Badge className={getRiskColor(selectedZone.risk)}>
                      {selectedZone.risk.toUpperCase()} RISK ZONE
                    </Badge>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">GMP Requirements:</h5>
                    <div className="space-y-2">
                      {selectedZone.requirements.map((req, index) => (
                        <div key={index} className="flex items-start space-x-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <Building className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Click on a facility zone to view its GMP requirements</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">GMP Facility Design Principles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {designPrinciples.map(principle => (
              <div
                key={principle.id}
                className={cn(
                  "p-4 border rounded-lg cursor-pointer transition-all",
                  selectedPrinciple === principle.id
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                )}
                onClick={() => setSelectedPrinciple(
                  selectedPrinciple === principle.id ? null : principle.id
                )}
              >
                <div className="flex items-start space-x-3 mb-3">
                  <principle.icon className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900">{principle.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{principle.description}</p>
                  </div>
                </div>
                
                {selectedPrinciple === principle.id && (
                  <div className="border-t pt-3 mt-3">
                    <h5 className="font-medium text-gray-900 mb-2">Implementation Examples:</h5>
                    <div className="space-y-1">
                      {principle.examples.map((example, index) => (
                        <div key={index} className="flex items-start space-x-2 text-sm">
                          <Info className="h-3 w-3 text-blue-500 mt-1 flex-shrink-0" />
                          <span>{example}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Environmental Control Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <Wind className="h-5 w-5 text-blue-600" />
                <h4 className="font-medium text-blue-900">Air Quality</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div>• HEPA filtration (99.97% efficiency)</div>
                <div>• Pressure differentials between zones</div>
                <div>• Air change rates: 10-20 ACH</div>
                <div>• Particle monitoring systems</div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <Droplets className="h-5 w-5 text-green-600" />
                <h4 className="font-medium text-green-900">Climate Control</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div>• Temperature: ±2°C tolerance</div>
                <div>• Humidity: 40-60% RH typical</div>
                <div>• Continuous monitoring systems</div>
                <div>• Alarm systems for deviations</div>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <Shield className="h-5 w-5 text-orange-600" />
                <h4 className="font-medium text-orange-900">Safety Systems</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div>• Fire suppression systems</div>
                <div>• Emergency ventilation</div>
                <div>• Gas detection systems</div>
                <div>• Emergency power backup</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}