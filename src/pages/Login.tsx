
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";

// Mock users for demonstration purposes
// In a real app, you would verify against a database
const USERS = [
  { username: "instructor", password: "teach123", role: "admin" },
  { username: "student", password: "learn123", role: "cashier" }
];

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      const user = USERS.find(
        (user) => user.username === data.username && user.password === data.password
      );

      if (user) {
        // Store user info in localStorage (in a real app, use a proper auth solution)
        localStorage.setItem("user", JSON.stringify({ username: user.username, role: user.role }));
        
        // Redirect based on role
        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/pos");
        }
        
        toast.success("Login successful!");
      } else {
        toast.error("Invalid username or password");
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    
    // Simulate Google login
    setTimeout(() => {
      toast.success("Google login successful!");
      // In a real app, this would be handled by the OAuth provider
      localStorage.setItem("user", JSON.stringify({ username: "google_user", role: "cashier" }));
      navigate("/pos");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to access your account"
      imageSrc="/placeholder.svg"
    >
      <div className="space-y-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="username" className="block text-white text-sm font-medium">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-white/60" />
              <input 
                id="username"
                placeholder="Enter your username" 
                className="w-full h-10 pl-10 pr-3 py-2 rounded-md bg-white/20 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                {...form.register("username")} 
              />
            </div>
            {form.formState.errors.username && (
              <p className="text-white text-xs mt-1">{form.formState.errors.username.message}</p>
            )}
          </div>
          
          <div className="space-y-1">
            <label htmlFor="password" className="block text-white text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-white/60" />
              <input 
                id="password"
                type={showPassword ? "text" : "password"} 
                placeholder="Enter your password" 
                className="w-full h-10 pl-10 pr-10 py-2 rounded-md bg-white/20 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                {...form.register("password")} 
              />
              <button
                type="button"
                className="absolute right-2 top-2 h-6 w-6 flex items-center justify-center text-white/70 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </button>
            </div>
            {form.formState.errors.password && (
              <p className="text-white text-xs mt-1">{form.formState.errors.password.message}</p>
            )}
          </div>
          
          <button 
            type="submit" 
            className="w-full h-10 px-4 py-2 bg-white text-teal-600 rounded-md font-medium hover:bg-white/90 transition focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed" 
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/30"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-white bg-teal-500">OR</span>
          </div>
        </div>
        
        <button
          type="button"
          className="w-full h-10 px-4 py-2 flex items-center justify-center gap-2 bg-white text-teal-600 rounded-md font-medium border border-white hover:bg-white/90 transition focus:outline-none focus:ring-2 focus:ring-white/50"
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            className="h-4 w-4"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          Sign in with Google
        </button>

        <div className="text-sm text-center text-white/80 mt-4 space-y-4">
          <div>
            <p>Demo Credentials:</p>
            <p>Instructor: instructor / teach123</p>
            <p>Student: student / learn123</p>
          </div>
          <div>
            <p>Don't have an account?</p>
            <button 
              type="button"
              className="text-white underline hover:text-white/80" 
              onClick={() => navigate("/register")}
            >
              Register here
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
