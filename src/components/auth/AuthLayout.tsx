
import React from "react";

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
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/30 to-teal-300/10 flex flex-col justify-center items-center text-white p-12">
          <h1 className="text-4xl font-bold mb-4 drop-shadow-md">E-Learning Platform</h1>
          <p className="text-xl drop-shadow-md max-w-md text-center">
            Enhance your skills with our comprehensive courses and materials
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-teal-500/80 to-teal-200/80">
        <div className="w-full max-w-md">
          {/* Logo above the form */}
          <div className="flex justify-center mb-8">
            <img 
              src="/placeholder.svg" 
              alt="Logo" 
              className="h-16 w-auto drop-shadow-md"
            />
          </div>
          
          <div className="backdrop-blur-sm bg-white/20 p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-2 text-white">{title}</h2>
            <p className="text-white/80 text-center mb-6">{subtitle}</p>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
