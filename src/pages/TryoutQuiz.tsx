
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProducts } from "@/lib/productService";
import { Product } from "@/components/pos/ProductCard";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Check, Timer, Flag, ArrowRight, ArrowLeft } from "lucide-react";
import CourseLayout from "@/components/layout/CourseLayout";

// Quiz question interface
interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

const TryoutQuiz = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Product | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [questions, setQuestions] = useState<Question[]>([]);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.username) {
      navigate("/login");
      return;
    }

    // Load course data
    const allCourses = getProducts();
    const selectedCourse = allCourses.find((c) => c.id === Number(courseId));
    
    if (selectedCourse && selectedCourse.type === "tryout") {
      setCourse(selectedCourse);
      
      // Generate mock quiz questions
      const mockQuestions = generateMockQuestions(selectedCourse.name);
      setQuestions(mockQuestions);
    } else {
      // Course not found or not a tryout
      toast.error("Tryout not found");
      navigate("/pos");
    }
  }, [courseId, navigate]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !quizCompleted) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0 && !quizCompleted) {
      handleFinishQuiz();
    }
  }, [timeLeft, quizCompleted]);

  const generateMockQuestions = (courseName: string): Question[] => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      text: `Question ${i + 1}: What is the correct answer about ${courseName}?`,
      options: [
        `Option A for question ${i + 1}`,
        `Option B for question ${i + 1}`,
        `Option C for question ${i + 1}`,
        `Option D for question ${i + 1}`,
      ],
      correctAnswer: Math.floor(Math.random() * 4), // Random correct answer (0-3)
    }));
  };

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: optionIndex,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleToggleFlag = () => {
    const newFlagged = new Set(flaggedQuestions);
    if (newFlagged.has(currentQuestionIndex)) {
      newFlagged.delete(currentQuestionIndex);
    } else {
      newFlagged.add(currentQuestionIndex);
    }
    setFlaggedQuestions(newFlagged);
  };

  const handleFinishQuiz = () => {
    // Calculate score
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / questions.length) * 100);
    
    setQuizCompleted(true);
    toast.success(`Quiz completed! Your score: ${score}%`);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const calculateProgress = () => {
    return (Object.keys(selectedAnswers).length / questions.length) * 100;
  };

  const allQuestionsAnswered = () => {
    return Object.keys(selectedAnswers).length === questions.length;
  };

  if (!course || questions.length === 0) return null;

  const currentQuestion = questions[currentQuestionIndex];

  if (quizCompleted) {
    // Results page
    const correctAnswers = questions.filter((q, idx) => selectedAnswers[idx] === q.correctAnswer).length;
    const score = Math.round((correctAnswers / questions.length) * 100);
    
    return (
      <CourseLayout>
        <div className="max-w-2xl mx-auto my-8">
          <Card className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Quiz Results</h2>
            <div className="text-7xl font-bold text-primary mb-6">{score}%</div>
            <p className="text-lg mb-4">
              You answered {correctAnswers} out of {questions.length} questions correctly.
            </p>
            
            <div className="mt-8">
              <Button 
                onClick={() => navigate("/pos")}
                className="bg-primary"
              >
                Return to Courses
              </Button>
            </div>
          </Card>
        </div>
      </CourseLayout>
    );
  }

  return (
    <CourseLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">{course.name} - Quiz</h1>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Timer size={18} className="text-primary" />
              <span className="font-medium">{formatTime(timeLeft)}</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="font-medium">Question {currentQuestionIndex + 1} of {questions.length}</span>
                {flaggedQuestions.has(currentQuestionIndex) && (
                  <Flag size={16} className="text-primary" />
                )}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleToggleFlag}
                className={flaggedQuestions.has(currentQuestionIndex) ? "bg-primary/10" : ""}
              >
                <Flag size={16} className="mr-1" />
                {flaggedQuestions.has(currentQuestionIndex) ? "Unflag" : "Flag"}
              </Button>
            </div>
            
            <Progress value={calculateProgress()} className="mb-6" />
            
            <div className="mb-6">
              <h3 className="text-xl font-medium mb-4">{currentQuestion.text}</h3>
              
              <RadioGroup 
                value={selectedAnswers[currentQuestionIndex]?.toString()} 
                onValueChange={(value) => handleAnswerSelect(parseInt(value))}
                className="space-y-3"
              >
                {currentQuestion.options.map((option, idx) => (
                  <div key={idx} className="flex items-center space-x-2 border border-gray-200 rounded-md p-3 hover:bg-gray-50">
                    <RadioGroupItem value={idx.toString()} id={`option-${idx}`} />
                    <Label htmlFor={`option-${idx}`} className="flex-1 cursor-pointer">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <div className="flex justify-between mt-8">
              <Button 
                variant="outline" 
                onClick={handlePrevQuestion} 
                disabled={currentQuestionIndex === 0}
                className="flex items-center"
              >
                <ArrowLeft size={16} className="mr-1" />
                Previous
              </Button>
              
              <div className="flex gap-2">
                {currentQuestionIndex === questions.length - 1 ? (
                  <Button 
                    onClick={handleFinishQuiz}
                    disabled={!allQuestionsAnswered()}
                    className="flex items-center bg-primary"
                  >
                    <Check size={16} className="mr-1" />
                    Finish Quiz
                  </Button>
                ) : (
                  <Button 
                    onClick={handleNextQuestion}
                    className="flex items-center"
                  >
                    Next
                    <ArrowRight size={16} className="ml-1" />
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">Question Navigator</h3>
            <div className="flex flex-wrap gap-2">
              {questions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${currentQuestionIndex === idx ? 'bg-primary text-white' : 
                      selectedAnswers[idx] !== undefined ? 'bg-green-100 text-green-800 border border-green-200' : 
                      'bg-gray-100 text-gray-800 border border-gray-200'}
                    ${flaggedQuestions.has(idx) ? 'ring-2 ring-yellow-400' : ''}`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CourseLayout>
  );
};

export default TryoutQuiz;
