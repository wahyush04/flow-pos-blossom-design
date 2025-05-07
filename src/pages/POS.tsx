
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getProducts } from "@/lib/productService";
import { Product } from "@/components/pos/ProductCard";
import CourseLayout from "@/components/layout/CourseLayout";
import CourseGrid from "@/components/courses/CourseGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const POS = () => {
  const [courses, setCourses] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<string>("courses");
  const navigate = useNavigate();
  
  // Check if user is logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.username) {
      navigate("/login");
    } else if (user.role === "admin") {
      navigate("/admin");
    }
    
    // Load courses (using the existing products as courses for now)
    const allCourses = getProducts().map(product => ({
      ...product,
      type: product.id % 2 === 0 ? "course" : "tryout", // For demo: even IDs are courses, odd are tryouts
      description: `This is a ${product.id % 2 === 0 ? "course" : "tryout"} about ${product.name}. Learn everything you need to know!`
    }));
    setCourses(allCourses);
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const filteredCourses = courses.filter(
    course => activeTab === "courses" ? course.type === "course" : course.type === "tryout"
  );
  
  return (
    <CourseLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">E-Learning Platform</h1>
          <button 
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Logout
          </button>
        </div>
        
        <Tabs defaultValue="courses" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="tryouts">Tryouts</TabsTrigger>
          </TabsList>
          <TabsContent value="courses" className="mt-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Available Courses</h2>
              <p className="text-pos-neutral mb-4">Select a course to learn more</p>
              <CourseGrid courses={filteredCourses} />
            </div>
          </TabsContent>
          <TabsContent value="tryouts" className="mt-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Available Tryouts</h2>
              <p className="text-pos-neutral mb-4">Test your knowledge with these tryouts</p>
              <CourseGrid courses={filteredCourses} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </CourseLayout>
  );
};

export default POS;
