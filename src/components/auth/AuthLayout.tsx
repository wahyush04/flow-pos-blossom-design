
import React from "react";
import { Card } from "@/components/ui/card";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  imageSrc: string;
}

const AuthLayout = ({ children, title, subtitle, imageSrc }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Image Section */}
      <div className="hidden md:block md:w-1/2 relative">
        <img 
          src={imageSrc} 
          alt="Authentication" 
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/10 flex flex-col justify-center items-center text-white p-12">
          <h1 className="text-4xl font-bold mb-4 drop-shadow-md">E-Learning Platform</h1>
          <p className="text-xl drop-shadow-md max-w-md text-center">
            Enhance your skills with our comprehensive courses and materials
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 bg-pos-bg-light">
        <Card className="w-full max-w-md shadow-xl border-0">
          <div className="px-8 pt-8 pb-4">
            <h2 className="text-3xl font-bold text-center mb-2">{title}</h2>
            <p className="text-muted-foreground text-center mb-6">{subtitle}</p>
            {children}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AuthLayout;
