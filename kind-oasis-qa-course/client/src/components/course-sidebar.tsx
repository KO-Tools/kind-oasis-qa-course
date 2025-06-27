import { Module } from "@/lib/course-data";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight, ClipboardCheck, Lock, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface CourseSidebarProps {
  modules: Module[];
  currentModule: number;
  onModuleSelect: (moduleId: number) => void;
  progress: any[];
  completedCount: number;
  progressPercentage: number;
}

export default function CourseSidebar({
  modules,
  currentModule,
  onModuleSelect,
  progress,
  completedCount,
  progressPercentage
}: CourseSidebarProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const resetMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/reset-progress", {});
    },
    onSuccess: () => {
      toast({
        title: "Progress Reset",
        description: "Your course progress has been reset successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/progress"] });
      queryClient.invalidateQueries({ queryKey: ["/api/quiz-attempts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/bookmarks"] });
      onModuleSelect(1); // Navigate back to first module
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to reset progress. Please try again.",
        variant: "destructive",
      });
    }
  });

  const getModuleStatus = (moduleId: number) => {
    const moduleProgress = progress.find(p => p.moduleId === moduleId);
    return {
      completed: moduleProgress?.completed || false,
      accessible: true, // All modules are now accessible
      score: moduleProgress?.quizScore
    };
  };

  return (
    <div className="p-6">
      {/* Progress Overview */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-primary mb-2">Course Progress</h3>
        <Progress value={progressPercentage} className="mb-2" />
        <p className="text-sm text-gray-600">
          {completedCount} of {modules.length} modules completed
        </p>
        
        {/* Reset Progress Button */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-3 w-full text-gray-600 hover:text-red-600 hover:border-red-300"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset Progress
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reset Course Progress?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete all your progress, quiz scores, and bookmarks. 
                You'll start the course from the beginning. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => resetMutation.mutate()}
                disabled={resetMutation.isPending}
                className="bg-red-600 hover:bg-red-700"
              >
                {resetMutation.isPending ? "Resetting..." : "Reset Progress"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Module Navigation */}
      <nav className="space-y-2">
        {modules.map((module) => {
          const status = getModuleStatus(module.id);
          const isActive = currentModule === module.id;

          return (
            <div key={module.id} className="group">
              <Button
                variant="ghost"
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors text-left h-auto",
                  isActive && "bg-secondary text-primary module-btn active"
                )}
                onClick={() => onModuleSelect(module.id)}
              >
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0",
                    status.completed 
                      ? "bg-accent" 
                      : isActive 
                        ? "bg-primary" 
                        : "bg-gray-400 text-white"
                  )}>
                    {status.completed ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      module.id
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-medium block truncate">
                      {module.title}
                    </span>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>{module.duration}</span>
                      {status.score && (
                        <span>• Score: {status.score}%</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  {module.hasQuiz && (
                    <ClipboardCheck className={cn(
                      "h-4 w-4",
                      status.completed ? "text-accent" : "text-gray-400"
                    )} />
                  )}
                  <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-primary" />
                </div>
              </Button>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
