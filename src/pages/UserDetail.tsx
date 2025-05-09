
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone } from "lucide-react";

// Define User interface
interface User {
  id: number;
  username: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  biography: string;
  profilePhoto?: string;
  totalPoints: number;
}

// Define Course interface
interface Course {
  id: number;
  name: string;
  status: "Completed" | "In Progress" | "Not Started";
  progress: number;
  completedDate?: string;
}

const UserDetail = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [ongoingCourses, setOngoingCourses] = useState<Course[]>([]);
  const [completedCourses, setCompletedCourses] = useState<Course[]>([]);

  useEffect(() => {
    // Check if user is logged in and has admin role
    const loggedInUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (!loggedInUser.username || loggedInUser.role !== "admin") {
      navigate("/login");
      return;
    }

    // Mock user data
    const mockUser: User = {
      id: Number(userId),
      username: "johndoe",
      fullname: "John Doe",
      email: "john.doe@example.com",
      phoneNumber: "+1 234 567 890",
      biography: "Passionate learner with interest in web development and programming. Always looking to improve skills and knowledge through online courses.",
      profilePhoto: "https://randomuser.me/api/portraits/men/44.jpg",
      totalPoints: 1250
    };
    setUser(mockUser);

    // Mock courses data
    const mockCourses: Course[] = [
      {
        id: 1,
        name: "Introduction to JavaScript",
        status: "Completed",
        progress: 100,
        completedDate: "2025-04-25"
      },
      {
        id: 2,
        name: "React for Beginners",
        status: "Completed",
        progress: 100,
        completedDate: "2025-05-02"
      },
      {
        id: 3,
        name: "Advanced CSS Techniques",
        status: "In Progress",
        progress: 65
      },
      {
        id: 4,
        name: "TypeScript Fundamentals",
        status: "In Progress",
        progress: 32
      },
      {
        id: 5,
        name: "Node.js Essentials",
        status: "Not Started",
        progress: 0
      }
    ];
    setCourses(mockCourses);

    // Filter courses by status
    setOngoingCourses(mockCourses.filter(course => course.status !== "Completed"));
    setCompletedCourses(mockCourses.filter(course => course.status === "Completed"));
  }, [userId, navigate]);

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate("/admin")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Reports
          </Button>
        </div>

        {/* User Profile Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>User Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:w-1/3">
                <Avatar className="h-32 w-32 mb-4">
                  {user.profilePhoto ? (
                    <AvatarImage src={user.profilePhoto} alt={user.fullname} />
                  ) : (
                    <AvatarFallback>{user.fullname.substring(0, 2).toUpperCase()}</AvatarFallback>
                  )}
                </Avatar>
                
                <div className="text-center">
                  <h2 className="text-xl font-bold">{user.fullname}</h2>
                  <p className="text-gray-500">@{user.username}</p>
                </div>
                
                <Card className="w-full mt-4">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center">
                      <span className="text-sm text-gray-500">Total Points</span>
                      <span className="text-3xl font-bold text-primary">{user.totalPoints}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:w-2/3">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-medium mb-2">Biography</h3>
                    <p className="text-gray-600">{user.biography}</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h3 className="text-base font-medium">Contact Information</h3>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{user.phoneNumber}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Ongoing Courses */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Ongoing Courses</CardTitle>
          </CardHeader>
          <CardContent>
            {ongoingCourses.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ongoingCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.name}</TableCell>
                      <TableCell>
                        <Badge className={course.status === "In Progress" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" : "bg-gray-100 text-gray-800 hover:bg-gray-100"}>
                          {course.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-full bg-gray-200 rounded-full">
                            <div 
                              className="h-full bg-primary rounded-full" 
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                          <span className="text-xs whitespace-nowrap">{course.progress}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center p-4 text-muted-foreground">
                No ongoing courses
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Completed Courses */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Completed Courses</CardTitle>
          </CardHeader>
          <CardContent>
            {completedCourses.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Completion Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.name}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          {course.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{course.completedDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center p-4 text-muted-foreground">
                No completed courses
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default UserDetail;
