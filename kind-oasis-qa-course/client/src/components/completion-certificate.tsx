import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Download, Calendar, User } from "lucide-react";

interface CompletionCertificateProps {
  studentName: string;
  completionDate: string;
  overallScore: number;
}

export default function CompletionCertificate({ 
  studentName, 
  completionDate, 
  overallScore 
}: CompletionCertificateProps) {
  const handleDownload = () => {
    // In a real implementation, this would generate a PDF certificate
    const element = document.createElement('a');
    const file = new Blob([`
Kind Oasis Manufacturing Quality Assurance Certificate

This certifies that ${studentName} has successfully completed the 
Manufacturing Quality Assurance Course with a score of ${overallScore}%.

Completion Date: ${completionDate}
Course Duration: 14 Modules
Total Learning Objectives: 85

Kind Oasis Cannabis Training Platform
    `], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `Kind_Oasis_QA_Certificate_${studentName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Card className="max-w-2xl mx-auto border-2 border-primary shadow-lg">
      <CardContent className="p-8">
        <div className="text-center space-y-6">
          {/* Header */}
          <div className="border-b border-secondary pb-6">
            <Award className="h-16 w-16 text-accent mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-primary mb-2">
              Certificate of Completion
            </h1>
            <p className="text-lg text-gray-600">
              Manufacturing Quality Assurance Course
            </p>
          </div>

          {/* Certificate Body */}
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              This certifies that
            </p>
            
            <div className="border-b-2 border-dotted border-primary pb-2 mb-4">
              <p className="text-2xl font-bold text-primary">
                {studentName}
              </p>
            </div>
            
            <p className="text-lg text-gray-700">
              has successfully completed the comprehensive
            </p>
            
            <h2 className="text-xl font-semibold text-primary">
              Kind Oasis Manufacturing Quality Assurance Training Course
            </h2>
            
            <div className="bg-secondary p-6 rounded-lg">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Modules Completed</p>
                  <p className="text-xl font-bold text-primary">14</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Overall Score</p>
                  <p className="text-xl font-bold text-accent">{overallScore}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Learning Objectives</p>
                  <p className="text-xl font-bold text-primary">85</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-secondary pt-6 space-y-4">
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Completed: {completionDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Kind Oasis Training Platform</span>
              </div>
            </div>
            
            <div className="text-xs text-gray-500">
              Certificate ID: KO-QA-{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </div>
            
            <Button 
              onClick={handleDownload}
              className="bg-primary text-white hover:bg-opacity-90"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Certificate
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}