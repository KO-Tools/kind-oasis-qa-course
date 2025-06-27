import { useEffect } from "react";
import { Module } from "@/lib/course-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import QuizComponent from "@/components/quiz-component";
import THCCalculator from "@/components/thc-calculator";
import RiskMatrix from "@/components/risk-matrix";
import FMEACalculator from "@/components/fmea-calculator";
import HACCPDecisionTree from "@/components/haccp-decision-tree";
import RiskAssessmentFlowchart from "@/components/risk-assessment-flowchart";
import GMPFacilityDesigner from "@/components/gmp-facility-designer";
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Target, 
  ClipboardCheck, 
  Bookmark,
  Play,
  CheckCircle,
  Users,
  Building,
  ServerCog,
  FileText,
  GraduationCap,
  DraftingCompass,
  MoreHorizontal
} from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ModuleContentProps {
  module: Module;
  onModuleChange: (moduleId: number) => void;
  totalModules: number;
}

export default function ModuleContent({ module, onModuleChange, totalModules }: ModuleContentProps) {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Reset quiz state when module changes and scroll to top
  useEffect(() => {
    setShowQuiz(false);
    setQuizCompleted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [module.id]);

  const bookmarkMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/bookmarks", {
        moduleId: module.id,
        sectionId: "main",
        title: module.title
      });
    },
    onSuccess: () => {
      toast({
        title: "Bookmarked",
        description: "Module has been added to your bookmarks",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/bookmarks"] });
    }
  });

  const progressMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/progress", {
        moduleId: module.id,
        completed: true
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/progress"] });
    }
  });

  const handleQuizComplete = (passed: boolean) => {
    setQuizCompleted(true);
    if (passed) {
      progressMutation.mutate();
    }
  };

  const canProceed = true; // Allow navigation to any module

  const renderSection = (section: any) => {
    switch (section.type) {
      case 'objectives':
        return (
          <Card key={section.id} className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">{section.title}</h2>
              <div className="space-y-4">
                {section.objectives?.map((objective: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3 p-4 rounded-lg hover:bg-secondary transition-colors cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="mt-1 w-5 h-5 text-accent rounded border-gray-300 focus:ring-accent" 
                      defaultChecked 
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{objective.split(' - ')[0]}</h3>
                      {objective.includes(' - ') && (
                        <p className="text-sm text-gray-600 mt-1">{objective.split(' - ')[1]}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 'interactive':
        if (section.interactive?.type === 'checklist') {
          return (
            <Card key={section.id} className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-primary mb-6">
                  <GraduationCap className="inline mr-3" />
                  {section.title}
                </h2>
                {section.image && (
                  <img 
                    src={section.image} 
                    alt={section.title}
                    className="rounded-lg shadow-sm w-full h-48 object-cover mb-6" 
                  />
                )}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {section.interactive.items?.map((item: string, index: number) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-secondary rounded-lg">
                        <CheckCircle className="h-5 w-5 text-accent" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        }

        if (section.interactive?.type === 'rating') {
          return (
            <Card key={section.id} className="mb-8">
              <CardContent className="p-8 bg-gradient-to-r from-primary to-accent text-white">
                <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                <p className="mb-6 opacity-90">{section.content}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {section.interactive.items?.map((item: string, index: number) => (
                    <div key={index} className="flex items-center justify-between bg-white bg-opacity-20 p-4 rounded-lg">
                      <span className="text-sm">{item}</span>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <Button
                            key={rating}
                            variant="ghost"
                            size="sm"
                            className="w-6 h-6 bg-white bg-opacity-30 rounded hover:bg-opacity-50 transition text-xs"
                          >
                            {rating}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        }

        if (section.interactive?.type === 'facility-design') {
          return (
            <Card key={section.id} className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-primary mb-6">
                  <DraftingCompass className="inline mr-3" />
                  Interactive Facility Design
                </h2>
                <div className="bg-secondary p-6 rounded-lg">
                  <h3 className="font-semibold text-primary mb-4">cGMP Facility Layout Principles</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Essential Zones</h4>
                      <div className="space-y-2">
                        {[
                          { color: "bg-red-400", label: "Raw Material Storage" },
                          { color: "bg-blue-400", label: "Production Area" },
                          { color: "bg-green-400", label: "Packaging Area" },
                          { color: "bg-yellow-400", label: "QC Laboratory" }
                        ].map((zone, index) => (
                          <div key={index} className="flex items-center space-x-3 p-2 bg-white rounded">
                            <div className={`w-4 h-4 ${zone.color} rounded`}></div>
                            <span className="text-sm">{zone.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Design Considerations</h4>
                      <div className="space-y-2">
                        {[
                          "Logical material flow",
                          "Contamination prevention", 
                          "Personnel movement control",
                          "Environmental separation",
                          "Cleaning accessibility"
                        ].map((item, index) => (
                          <div key={index} className="flex items-center space-x-3 p-2 bg-white rounded">
                            <CheckCircle className="h-4 w-4 text-accent" />
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        }
        break;

      case 'calculator':
        return (
          <Card key={section.id} className="mb-8">
            <CardContent className="p-8">
              <THCCalculator />
            </CardContent>
          </Card>
        );

      default:
        return (
          <Card key={section.id} className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">{section.title}</h2>
              {section.image && (
                <img 
                  src={section.image} 
                  alt={section.title}
                  className="rounded-lg shadow-sm w-full h-48 object-cover mb-6" 
                />
              )}
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{section.content}</p>
              </div>
              
              {section.id === 'cgmp-pillars' && (
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  {[
                    { icon: Users, title: "Personnel", desc: "Qualified, trained staff" },
                    { icon: Building, title: "Facilities", desc: "Properly designed spaces" },
                    { icon: ServerCog, title: "Equipment", desc: "Validated and maintained" },
                    { icon: FileText, title: "Documentation", desc: "Complete and accurate" }
                  ].map((pillar, index) => (
                    <div key={index} className="bg-secondary p-4 rounded-lg flex items-center space-x-4">
                      <pillar.icon className="h-8 w-8 text-accent flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-primary mb-1">{pillar.title}</h3>
                        <p className="text-sm text-gray-600">{pillar.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        );
    }
  };

  // Show enhanced content for modules 5-14
  if (module.id > 4) {
    return (
      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><span className="hover:text-primary cursor-pointer">Course</span></li>
            <li><ChevronRight className="h-3 w-3" /></li>
            <li className="text-primary font-medium">Module {module.id}: {module.title}</li>
          </ol>
        </nav>

        <div className="max-w-4xl">
          {/* Module Header */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {module.id}
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-primary">Module {module.id}</h1>
                      <p className="text-lg text-gray-600">{module.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <span><Clock className="inline h-4 w-4 mr-2" />{module.duration}</span>
                    <span><Target className="inline h-4 w-4 mr-2" />{module.objectives} learning objectives</span>
                    {module.hasQuiz && (
                      <span><ClipboardCheck className="inline h-4 w-4 mr-2 text-primary" />Quiz included</span>
                    )}
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => bookmarkMutation.mutate()}
                  disabled={bookmarkMutation.isPending}
                  className="bg-secondary text-primary hover:bg-opacity-80"
                >
                  <Bookmark className="h-4 w-4 mr-2" />
                  Bookmark
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Module Content Sections */}
          {module.content.sections.map(renderSection)}

          {/* Quiz Section */}
          {module.hasQuiz && !showQuiz && (
            <Card className="mb-8">
              <CardContent className="p-8 text-center">
                <ClipboardCheck className="h-12 w-12 text-accent mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-primary mb-4">Ready for the Knowledge Assessment?</h2>
                <p className="text-gray-600 mb-6">
                  Test your understanding of {module.title.toLowerCase()} concepts.
                </p>
                <Button 
                  onClick={() => setShowQuiz(true)}
                  className="bg-accent text-white hover:bg-opacity-90"
                >
                  Start Quiz
                </Button>
              </CardContent>
            </Card>
          )}

          {showQuiz && module.content.quiz && (
            <QuizComponent 
              quiz={module.content.quiz}
              moduleId={module.id}
              onComplete={handleQuizComplete}
            />
          )}

          {/* Module Navigation */}
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="ghost"
              onClick={() => onModuleChange(module.id - 1)}
              disabled={module.id === 1}
              className="text-primary hover:text-accent"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous Module
            </Button>
            <Button
              onClick={() => onModuleChange(module.id + 1)}
              disabled={module.id === totalModules}
              className="bg-primary text-white hover:bg-opacity-90 disabled:bg-gray-400"
            >
              Next Module
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li><span className="hover:text-primary cursor-pointer">Course</span></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li className="text-primary font-medium">Module {module.id}: {module.title}</li>
        </ol>
      </nav>

      <div className="max-w-4xl">
        {/* Module Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {module.id <= 3 ? <Play className="h-6 w-6" /> : module.id}
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-primary">Module {module.id}</h1>
                    <p className="text-lg text-gray-600">{module.title}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <span><Clock className="inline h-4 w-4 mr-2" />{module.duration}</span>
                  <span><Target className="inline h-4 w-4 mr-2" />{module.objectives} learning objectives</span>
                  {module.hasQuiz && (
                    <span><ClipboardCheck className="inline h-4 w-4 mr-2 text-primary" />Quiz included</span>
                  )}
                  {module.id <= 3 && (
                    <span><CheckCircle className="inline h-4 w-4 mr-2 text-accent" />Completed</span>
                  )}
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={() => bookmarkMutation.mutate()}
                disabled={bookmarkMutation.isPending}
                className="bg-secondary text-primary hover:bg-opacity-80"
              >
                <Bookmark className="h-4 w-4 mr-2" />
                Bookmark
              </Button>
            </div>

            {/* Course Statistics for Module 1 */}
            {module.id === 1 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-secondary rounded-lg">
                {[
                  { value: "14", label: "Modules" },
                  { value: "25+", label: "Interactive Elements" },
                  { value: "12", label: "Knowledge Checks" },
                  { value: "100%", label: "Compliance Focus" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Module Content Sections */}
        {module.content.sections.map((section, index) => {
          // Handle interactive components
          if (section.interactive?.type === 'risk-matrix') {
            return (
              <Card key={section.id} className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-6">{section.title}</h2>
                  <p className="text-gray-600 mb-6">{section.content}</p>
                  <RiskMatrix />
                </CardContent>
              </Card>
            );
          }
          
          if (section.interactive?.type === 'fmea-calculator') {
            return (
              <Card key={section.id} className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-6">{section.title}</h2>
                  <p className="text-gray-600 mb-6">{section.content}</p>
                  <FMEACalculator />
                </CardContent>
              </Card>
            );
          }
          
          if (section.interactive?.type === 'haccp-decision-tree') {
            return (
              <Card key={section.id} className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-6">{section.title}</h2>
                  <p className="text-gray-600 mb-6">{section.content}</p>
                  <HACCPDecisionTree />
                </CardContent>
              </Card>
            );
          }
          
          if (section.interactive?.type === 'risk-assessment-flowchart') {
            return (
              <Card key={section.id} className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-6">{section.title}</h2>
                  <p className="text-gray-600 mb-6">{section.content}</p>
                  <RiskAssessmentFlowchart />
                </CardContent>
              </Card>
            );
          }
          
          if (section.interactive?.type === 'facility-design') {
            return (
              <Card key={section.id} className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-primary mb-6">{section.title}</h2>
                  <p className="text-gray-600 mb-6">{section.content}</p>
                  <GMPFacilityDesigner />
                </CardContent>
              </Card>
            );
          }
          
          // Use existing renderSection for other content types
          return renderSection(section);
        })}

        {/* Quiz Section */}
        {module.hasQuiz && !showQuiz && (
          <Card className="mb-8">
            <CardContent className="p-8 text-center">
              <ClipboardCheck className="h-12 w-12 text-accent mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-primary mb-4">Ready for the Knowledge Assessment?</h2>
              <p className="text-gray-600 mb-6">
                Test your understanding of {module.title.toLowerCase()} concepts.
              </p>
              <Button 
                onClick={() => setShowQuiz(true)}
                className="bg-accent text-white hover:bg-opacity-90"
              >
                Start Quiz
              </Button>
            </CardContent>
          </Card>
        )}

        {showQuiz && module.content.quiz && (
          <QuizComponent 
            quiz={module.content.quiz}
            moduleId={module.id}
            onComplete={handleQuizComplete}
          />
        )}

        {/* Module Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="ghost"
            onClick={() => onModuleChange(module.id - 1)}
            disabled={module.id === 1}
            className="text-primary hover:text-accent"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous Module
          </Button>
          <Button
            onClick={() => onModuleChange(module.id + 1)}
            disabled={module.id === totalModules}
            className="bg-primary text-white hover:bg-opacity-90 disabled:bg-gray-400"
          >
            Next Module
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
