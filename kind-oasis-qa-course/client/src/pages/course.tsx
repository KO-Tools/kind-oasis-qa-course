import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CourseSidebar from "@/components/course-sidebar";
import ModuleContent from "@/components/module-content";
import CompletionCertificate from "@/components/completion-certificate";
import { COURSE_MODULES } from "@/lib/course-data";
import { Leaf, User, Menu, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

export default function Course() {
  const [currentModule, setCurrentModule] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: progress = [] } = useQuery({
    queryKey: ["/api/progress"],
  });

  const progressArray = Array.isArray(progress) ? progress : [];
  const completedCount = progressArray.filter((p: any) => p.completed).length;
  const progressPercentage = Math.round((completedCount / COURSE_MODULES.length) * 100);
  const courseCompleted = completedCount === COURSE_MODULES.length;
  
  // Calculate overall score for certificate
  const completedQuizzes = progressArray.filter((p: any) => p.completed && p.quizScore);
  const overallScore = completedQuizzes.length > 0 
    ? Math.round(completedQuizzes.reduce((sum: number, p: any) => sum + p.quizScore, 0) / completedQuizzes.length)
    : 0;

  // Show certificate if course is completed
  if (courseCompleted) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-primary text-white shadow-lg sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Leaf className="h-8 w-8" />
                <div>
                  <h1 className="text-xl font-bold">Kind Oasis Training</h1>
                  <p className="text-sm opacity-90">Course Completed!</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="bg-accent text-white">
                  <Award className="h-4 w-4 mr-2" />
                  Certified
                </Badge>
                <Button 
                  variant="ghost" 
                  onClick={() => setCurrentModule(1)}
                  className="text-white hover:text-secondary"
                >
                  Return to Course
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8">
          <CompletionCertificate
            studentName="Student"
            completionDate={new Date().toLocaleDateString()}
            overallScore={overallScore}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Leaf className="h-8 w-8" />
              <div>
                <h1 className="text-xl font-bold">Kind Oasis Training</h1>
                <p className="text-sm opacity-90">Manufacturing Quality Assurance Course</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-accent text-white">
                <User className="h-4 w-4 mr-2" />
                Student Portal
              </Badge>
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon" className="text-white hover:text-secondary">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <CourseSidebar
                    modules={COURSE_MODULES}
                    currentModule={currentModule}
                    onModuleSelect={(moduleId) => {
                      setCurrentModule(moduleId);
                      setSidebarOpen(false);
                    }}
                    progress={progressArray}
                    completedCount={completedCount}
                    progressPercentage={progressPercentage}
                  />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-80 bg-white shadow-lg overflow-y-auto">
          <CourseSidebar
            modules={COURSE_MODULES}
            currentModule={currentModule}
            onModuleSelect={setCurrentModule}
            progress={progressArray}
            completedCount={completedCount}
            progressPercentage={progressPercentage}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <ModuleContent
            module={COURSE_MODULES.find(m => m.id === currentModule)!}
            onModuleChange={setCurrentModule}
            totalModules={COURSE_MODULES.length}
          />
        </main>
      </div>
    </div>
  );
}
