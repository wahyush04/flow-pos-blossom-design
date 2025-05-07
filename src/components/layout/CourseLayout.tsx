
import React from 'react';
import Navbar from './Navbar';

interface CourseLayoutProps {
  children: React.ReactNode;
}

const CourseLayout = ({ children }: CourseLayoutProps) => {
  return (
    <div className="min-h-screen bg-pos-bg-light flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default CourseLayout;
