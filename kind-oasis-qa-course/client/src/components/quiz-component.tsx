import { useState } from "react";
import { Quiz } from "@/lib/course-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { ClipboardCheck, Check, Info } from "lucide-react";

interface QuizComponentProps {
  quiz: Quiz;
  moduleId: number;
  onComplete: (passed: boolean) => void;
}

export default function QuizComponent({ quiz, moduleId, onComplete }: QuizComponentProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<{ score: number; passed: boolean } | null>(null);
  const queryClient = useQueryClient();

  const submitMutation = useMutation({
    mutationFn: async (quizData: any) => {
      return apiRequest("POST", "/api/quiz-attempts", quizData);
    },
    onSuccess: (data) => {
      setResults({ score: data.score, passed: data.passed });
      setSubmitted(true);
      onComplete(data.passed);
      queryClient.invalidateQueries({ queryKey: ["/api/quiz-attempts"] });
    }
  });

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < quiz.questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    // Calculate score
    let correctCount = 0;
    quiz.questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;

    submitMutation.mutate({
      moduleId,
      answers,
      score,
      passed
    });
  };

  if (submitted && results) {
    return (
      <Card className="mb-8">
        <CardContent className="p-8 text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            results.passed ? 'bg-green-100' : 'bg-red-100'
          }`}>
            <Check className={`h-8 w-8 ${results.passed ? 'text-green-600' : 'text-red-600'}`} />
          </div>
          <h3 className="text-xl font-bold text-primary mb-2">
            {results.passed ? 'Quiz Completed!' : 'Quiz Failed'}
          </h3>
          <p className="text-gray-600 mb-4">
            Score: <span className="font-bold text-accent">{results.score}%</span>
          </p>
          <div className={`border rounded-lg p-4 mb-4 ${
            results.passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
          }`}>
            <p className={`text-sm ${results.passed ? 'text-green-800' : 'text-red-800'}`}>
              <Check className="inline h-4 w-4 mr-2" />
              {results.passed 
                ? 'Congratulations! You have successfully completed this module.'
                : `You need ${quiz.passingScore}% to pass. Please review the material and try again.`
              }
            </p>
          </div>
          <div className="text-sm text-gray-600">
            <p><strong>Correct Answers:</strong></p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              {quiz.questions.map((question, index) => (
                <p key={question.id}>
                  {index + 1}. {question.options.find(opt => opt.id === question.correctAnswer)?.text}
                </p>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-8">
      <CardContent className="p-8">
        <div className="flex items-center space-x-3 mb-6">
          <ClipboardCheck className="h-8 w-8 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Knowledge Assessment</h2>
        </div>
        
        <div className="space-y-6">
          {quiz.questions.map((question, questionIndex) => (
            <Card key={question.id} className="border border-gray-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  {questionIndex + 1}. {question.question}
                </h3>
                <RadioGroup
                  value={answers[question.id] || ""}
                  onValueChange={(value) => handleAnswerChange(question.id, value)}
                >
                  <div className="space-y-2">
                    {question.options.map((option) => (
                      <div key={option.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary transition-colors">
                        <RadioGroupItem value={option.id} id={`${question.id}-${option.id}`} />
                        <Label 
                          htmlFor={`${question.id}-${option.id}`} 
                          className="flex-1 cursor-pointer"
                        >
                          {option.text}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          ))}

          {/* Quiz Actions */}
          <div className="flex justify-between items-center pt-6">
            <div className="text-sm text-gray-600">
              <Info className="inline h-4 w-4 mr-2" />
              {quiz.questions.length} questions • Pass with {quiz.passingScore}% or higher
            </div>
            <Button 
              onClick={handleSubmit}
              disabled={submitMutation.isPending || Object.keys(answers).length < quiz.questions.length}
              className="bg-accent text-white hover:bg-opacity-90"
            >
              {submitMutation.isPending ? "Submitting..." : "Submit Quiz"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
