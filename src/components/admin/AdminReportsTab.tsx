
import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search, Eye } from "lucide-react";
import { 
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// Define the UserLog interface
interface UserLog {
  id: number;
  username: string;
  fullname: string;
  course: string;
  status: "Completed" | "In Progress" | "Not Started";
  completedDate?: string;
}

const AdminReportsTab = () => {
  const [logs, setLogs] = useState<UserLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<UserLog[]>([]);
  const [usernameFilter, setUsernameFilter] = useState<string>("");
  const [showFilter, setShowFilter] = useState<boolean>(false);
  
  useEffect(() => {
    // Mock data for user logs
    const mockLogs: UserLog[] = [
      {
        id: 1,
        username: "johndoe",
        fullname: "John Doe",
        course: "Introduction to JavaScript",
        status: "Completed",
        completedDate: "2025-04-25"
      },
      {
        id: 2,
        username: "janedoe",
        fullname: "Jane Doe",
        course: "React for Beginners",
        status: "Completed",
        completedDate: "2025-05-02"
      },
      {
        id: 3,
        username: "mikebrown",
        fullname: "Mike Brown",
        course: "Advanced CSS Techniques",
        status: "Completed",
        completedDate: "2025-05-01"
      },
      {
        id: 4,
        username: "sarahsmith",
        fullname: "Sarah Smith",
        course: "TypeScript Fundamentals",
        status: "Completed",
        completedDate: "2025-04-29"
      },
      {
        id: 5,
        username: "robertjohnson",
        fullname: "Robert Johnson",
        course: "Node.js Essentials",
        status: "Completed",
        completedDate: "2025-05-03"
      }
    ];
    
    setLogs(mockLogs);
    setFilteredLogs(mockLogs);
  }, []);

  useEffect(() => {
    // Filter logs based on username filter
    if (usernameFilter.trim() === "") {
      setFilteredLogs(logs);
    } else {
      const filtered = logs.filter(log => 
        log.username.toLowerCase().includes(usernameFilter.toLowerCase())
      );
      setFilteredLogs(filtered);
    }
  }, [logs, usernameFilter]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Completions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{logs.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unique Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(logs.map(log => log.username)).size}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(logs.map(log => log.course)).size}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Logs Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>User Course Completion Logs</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={toggleFilter}>
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showFilter && (
            <div className="mb-4 flex flex-col sm:flex-row gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Filter by username..."
                  className="pl-8"
                  value={usernameFilter}
                  onChange={(e) => setUsernameFilter(e.target.value)}
                />
              </div>
            </div>
          )}
          
          {filteredLogs.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">No</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log, index) => (
                  <TableRow key={log.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{log.username}</TableCell>
                    <TableCell>{log.fullname}</TableCell>
                    <TableCell>{log.course}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        log.status === "Completed" ? "bg-green-100 text-green-800" : 
                        log.status === "In Progress" ? "bg-yellow-100 text-yellow-800" : 
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {log.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center p-4 text-muted-foreground">
              No user logs found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminReportsTab;
