
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import AdminProductsTab from "@/components/admin/AdminProductsTab";
import AdminCategoriesTab from "@/components/admin/AdminCategoriesTab";
import AdminReportsTab from "@/components/admin/AdminReportsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("products");
  const navigate = useNavigate();

  // Check if user is logged in and has admin role
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.username || user.role !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button 
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/login");
            }}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Logout
          </button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="products" className="mt-4">
            <AdminProductsTab />
          </TabsContent>
          <TabsContent value="categories" className="mt-4">
            <AdminCategoriesTab />
          </TabsContent>
          <TabsContent value="reports" className="mt-4">
            <AdminReportsTab />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Admin;
