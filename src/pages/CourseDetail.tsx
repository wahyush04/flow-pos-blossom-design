
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProducts } from "@/lib/productService";
import { Product } from "@/components/pos/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Book, User, Clock, Award, Play } from "lucide-react";
import CourseLayout from "@/components/layout/CourseLayout";
import { toast } from "sonner";

// Testimonial interface
interface Testimonial {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Product | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

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
    
    if (selectedCourse) {
      setCourse(selectedCourse);
      
      // Mock testimonials data for the course
      const mockTestimonials = [
        {
          id: 1,
          name: "Sarah Johnson",
          rating: 5,
          comment: "This course completely transformed my understanding of the subject. Highly recommended!",
          date: "2 weeks ago"
        },
        {
          id: 2,
          name: "Michael Chen",
          rating: 4,
          comment: "Great explanations and practical exercises. Would have given 5 stars but some sections felt rushed.",
          date: "1 month ago"
        },
        {
          id: 3,
          name: "Emma Wilson",
          rating: 5,
          comment: "Excellent course! The instructor explains complex topics in a simple, understandable way.",
          date: "2 months ago"
        }
      ];
      
      setTestimonials(mockTestimonials);
    } else {
      // Course not found
      toast.error("Course not found");
      navigate("/pos");
    }
  }, [courseId, navigate]);

  const handleTakeCourse = () => {
    toast.success(`You've enrolled in ${course?.name}`);
    
    // Navigate to appropriate page based on course type
    if (course?.type === "tryout") {
      navigate(`/course/${courseId}/quiz`);
    } else {
      navigate(`/course/${courseId}/material`);
    }
  };

  if (!course) return null;

  return (
    <CourseLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-pos-text-dark mb-4">{course.name}</h1>
            <p className="text-lg text-pos-neutral mb-6">{course.description}</p>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
                  <Award size={16} />
                  <span>Intermediate</span>
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
                  <User size={16} />
                  <span>1,245 Students</span>
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
                  <Clock size={16} />
                  <span>12 Hours</span>
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
                  <Book size={16} />
                  <span>{course.type === "tryout" ? "Quiz" : "Self-paced"}</span>
                </Badge>
              </div>
            </div>
            
            <Button onClick={handleTakeCourse} className="bg-primary flex items-center gap-2">
              <Play size={16} />
              {course.type === "tryout" ? "Take This Quiz" : "Take This Course"}
            </Button>
          </div>
          
          <div className="aspect-video overflow-hidden bg-gray-100 rounded-lg mb-8">
            {course.image ? (
              <img 
                src={course.image} 
                alt={course.name} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-200">
                <span className="text-gray-500">No course preview available</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Course Description</h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-pos-neutral">
              {course.description || "This course will teach you everything you need to know about this subject. Join thousands of students who have already benefited from this comprehensive learning experience."}
            </p>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Student Testimonials</h2>
          <div className="space-y-4">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{testimonial.name}</h3>
                  <span className="text-xs text-gray-500">{testimonial.date}</span>
                </div>
                <div className="flex items-center mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg 
                      key={i}
                      className={`h-4 w-4 ${i < testimonial.rating ? 'text-primary' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-pos-neutral text-sm">{testimonial.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CourseLayout>
  );
};

export default CourseDetail;
