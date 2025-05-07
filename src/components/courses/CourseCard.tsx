
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from '@/components/pos/ProductCard';

interface CourseCardProps {
  course: Product & { description?: string; type?: string };
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle>{course.name}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-sm text-gray-500">
          {course.type === "course" ? "Full Course" : "Practice Tryout"}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="outline" className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
