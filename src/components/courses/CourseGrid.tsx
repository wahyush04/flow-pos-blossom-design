
import React from 'react';
import CourseCard from './CourseCard';
import { Product } from '@/components/pos/ProductCard';

interface CourseGridProps {
  courses: Product[];
}

const CourseGrid: React.FC<CourseGridProps> = ({ courses }) => {
  if (courses.length === 0) {
    return (
      <div className="text-center p-8 border border-dashed rounded-lg">
        <p className="text-gray-500">No courses available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default CourseGrid;
