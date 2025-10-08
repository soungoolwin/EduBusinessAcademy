"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface ActivityImage {
  id: string;
  url: string;
  order: number;
}

interface Activity {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  imageUrl: string;
  images?: ActivityImage[];
}

interface InvestorApplication {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  organization: string | null;
  address: string;
  socialWebsite: string | null;
  financialInvestor: boolean;
  advisorMentor: boolean;
  businessPartner: boolean;
  otherType: string | null;
  sector: string;
  experienceSkills: string;
  investmentModel: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface EntrepreneurApplication {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  currentOccupation: string;
  address: string;
  socialLinks: string | null;
  businessName: string | null;
  ideaSummary: string;
  problemSolved: string;
  targetCustomer: string | null;
  businessStage: string;
  physicalAssets: string;
  mentalAssets: string;
  assistanceNeeded: string;
  expectations: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"activities" | "investors" | "entrepreneurs">("activities");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [investors, setInvestors] = useState<InvestorApplication[]>([]);
  const [entrepreneurs, setEntrepreneurs] = useState<EntrepreneurApplication[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<Partial<Activity>>({});
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedInvestor, setSelectedInvestor] = useState<InvestorApplication | null>(null);
  const [selectedEntrepreneur, setSelectedEntrepreneur] = useState<EntrepreneurApplication | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchActivities();
    fetchInvestors();
    fetchEntrepreneurs();
  }, []);

  const fetchInvestors = async () => {
    try {
      const res = await fetch("/api/investors");
      if (!res.ok) {
        console.error("Failed to fetch investor applications:", res.status);
        setInvestors([]);
        return;
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setInvestors(data);
      } else {
        console.error("Investor applications data is not an array:", data);
        setInvestors([]);
      }
    } catch (error) {
      console.error("Error fetching investor applications:", error);
      setInvestors([]);
    }
  };

  const fetchEntrepreneurs = async () => {
    try {
      const res = await fetch("/api/entrepreneurs");
      if (!res.ok) {
        console.error("Failed to fetch entrepreneur applications:", res.status);
        setEntrepreneurs([]);
        return;
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setEntrepreneurs(data);
      } else {
        console.error("Entrepreneur applications data is not an array:", data);
        setEntrepreneurs([]);
      }
    } catch (error) {
      console.error("Error fetching entrepreneur applications:", error);
      setEntrepreneurs([]);
    }
  };

  const fetchActivities = async () => {
    try {
      const res = await fetch("/api/activities");
      if (!res.ok) {
        console.error("Failed to fetch activities:", res.status);
        setActivities([]);
        return;
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setActivities(data);
      } else {
        console.error("Activities data is not an array:", data);
        setActivities([]);
      }
    } catch (error) {
      console.error("Error fetching activities:", error);
      setActivities([]);
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("title", currentActivity.title || "");
    formData.append("shortDescription", currentActivity.shortDescription || "");
    formData.append("longDescription", currentActivity.longDescription || "");
    if (currentActivity.id) {
      formData.append("id", currentActivity.id);
    }

    // Debug file upload - use state instead of ref
    console.log("=== Client Side Debug ===");
    console.log("Number of files selected:", selectedFiles.length);

    // Append all selected files with the key "images"
    selectedFiles.forEach((file, index) => {
      formData.append("images", file);
      console.log(`✅ File ${index + 1} appended:`, file.name);
    });

    if (selectedFiles.length === 0) {
      console.log("⚠️ No files to upload");
    }

    const method = currentActivity.id ? "PUT" : "POST";
    const url = currentActivity.id
      ? `/api/activities/${currentActivity.id}`
      : "/api/activities";

    console.log("Sending request to:", url);

    const response = await fetch(url, {
      method,
      body: formData, // No 'Content-Type' header, browser sets it for FormData
    });

    console.log("Response status:", response.status);
    const data = await response.json();
    console.log("Response data:", data);

    fetchActivities();
    setIsSheetOpen(false);
    setCurrentActivity({});
    setSelectedFiles([]);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEdit = (activity: Activity) => {
    setCurrentActivity(activity);
    setIsSheetOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this activity?")) {
      await fetch(`/api/activities/${id}`, { method: "DELETE" });
      fetchActivities();
    }
  };

  const handleAddNew = () => {
    setCurrentActivity({});
    setSelectedFiles([]);
    setIsSheetOpen(true);
    // Clear file input when opening new form
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        {activeTab === "activities" && (
          <Button onClick={handleAddNew}>Add New Activity</Button>
        )}
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("activities")}
            className={`${
              activeTab === "activities"
                ? "border-emerald-500 text-emerald-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors`}
          >
            Activities
            <Badge className="ml-2 bg-emerald-100 text-emerald-800">
              {activities.length}
            </Badge>
          </button>
          <button
            onClick={() => setActiveTab("investors")}
            className={`${
              activeTab === "investors"
                ? "border-emerald-500 text-emerald-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors`}
          >
            Investor Applications
            <Badge className="ml-2 bg-emerald-100 text-emerald-800">
              {investors.length}
            </Badge>
          </button>
          <button
            onClick={() => setActiveTab("entrepreneurs")}
            className={`${
              activeTab === "entrepreneurs"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors`}
          >
            Entrepreneur Applications
            <Badge className="ml-2 bg-blue-100 text-blue-800">
              {entrepreneurs.length}
            </Badge>
          </button>
        </nav>
      </div>

      {/* Activities Tab */}
      {activeTab === "activities" && (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Short Description
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {activities.map((activity) => (
                    <tr key={activity.id}>
                      <td className="px-6 py-4">
                        <div className="relative h-16 w-24 rounded-md overflow-hidden">
                          <Image
                            src={activity.imageUrl}
                            alt={activity.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {activity.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                        {activity.shortDescription}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(activity)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(activity.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Investor Applications Tab */}
      {activeTab === "investors" && (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sector
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {investors.map((investor) => (
                    <tr key={investor.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {investor.fullName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {investor.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex flex-wrap gap-1">
                          {investor.financialInvestor && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              Financial
                            </Badge>
                          )}
                          {investor.advisorMentor && (
                            <Badge className="bg-blue-100 text-blue-800 text-xs">
                              Advisor
                            </Badge>
                          )}
                          {investor.businessPartner && (
                            <Badge className="bg-purple-100 text-purple-800 text-xs">
                              Partner
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                        {investor.sector}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(investor.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedInvestor(investor)}
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Entrepreneur Applications Tab */}
      {activeTab === "entrepreneurs" && (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Business Stage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Business Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {entrepreneurs.map((entrepreneur) => (
                    <tr key={entrepreneur.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {entrepreneur.fullName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {entrepreneur.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Badge 
                          className={
                            entrepreneur.businessStage === "idea"
                              ? "bg-yellow-100 text-yellow-800"
                              : entrepreneur.businessStage === "research"
                              ? "bg-blue-100 text-blue-800"
                              : entrepreneur.businessStage === "testing"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-green-100 text-green-800"
                          }
                        >
                          {entrepreneur.businessStage === "idea" && "💡 Idea"}
                          {entrepreneur.businessStage === "research" && "🔍 Research"}
                          {entrepreneur.businessStage === "testing" && "🧪 Testing"}
                          {entrepreneur.businessStage === "operating" && "🚀 Operating"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                        {entrepreneur.businessName || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(entrepreneur.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedEntrepreneur(entrepreneur)}
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full max-w-3xl overflow-y-auto p-8">
          <SheetHeader className="pb-6 border-b mb-8">
            <SheetTitle className="text-3xl font-bold">
              {currentActivity.id ? "Edit Activity" : "Add New Activity"}
            </SheetTitle>
            <p className="text-sm text-gray-500 mt-2">
              {currentActivity.id
                ? "Update activity details and images"
                : "Create a new activity with images"}
            </p>
          </SheetHeader>
          <div className="space-y-8">
            <div className="space-y-3">
              <Label
                htmlFor="title"
                className="text-lg font-semibold text-gray-800"
              >
                Title
              </Label>
              <Input
                id="title"
                placeholder="Enter activity title"
                value={currentActivity.title || ""}
                onChange={(e) =>
                  setCurrentActivity({
                    ...currentActivity,
                    title: e.target.value,
                  })
                }
                className="text-base h-12 px-4"
              />
            </div>
            <div className="space-y-3">
              <Label
                htmlFor="shortDescription"
                className="text-lg font-semibold text-gray-800"
              >
                Short Description
              </Label>
              <Textarea
                id="shortDescription"
                placeholder="Brief description for the activity card"
                value={currentActivity.shortDescription || ""}
                onChange={(e) =>
                  setCurrentActivity({
                    ...currentActivity,
                    shortDescription: e.target.value,
                  })
                }
                rows={3}
                className="text-base px-4 py-3"
              />
            </div>
            <div className="space-y-3">
              <Label
                htmlFor="longDescription"
                className="text-lg font-semibold text-gray-800"
              >
                Long Description
              </Label>
              <Textarea
                id="longDescription"
                placeholder="Detailed description for the activity page"
                value={currentActivity.longDescription || ""}
                onChange={(e) =>
                  setCurrentActivity({
                    ...currentActivity,
                    longDescription: e.target.value,
                  })
                }
                rows={10}
                className="text-base px-4 py-3"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="images"
                  className="text-lg font-semibold text-gray-800"
                >
                  Images
                </Label>
                <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  JPG, PNG, WebP, GIF (Max 10MB each)
                </span>
              </div>

              {/* Current Images - Show if editing and has images */}
              {currentActivity.id &&
                currentActivity.images &&
                currentActivity.images.length > 0 &&
                !selectedFiles.length && (
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-dashed border-gray-300">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-base font-semibold text-gray-800">
                        Current Images ({currentActivity.images.length})
                      </p>
                      <p className="text-xs text-gray-600 bg-white px-3 py-1 rounded-full">
                        Upload new to replace
                      </p>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                      {currentActivity.images.map((image, index) => (
                        <div
                          key={image.id}
                          className="relative aspect-square rounded-xl overflow-hidden border-2 border-gray-300 bg-white shadow-md hover:shadow-lg transition-shadow"
                        >
                          <Image
                            src={image.url}
                            alt={`Current image ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2.5 py-1 rounded-md font-medium">
                            {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* File Input */}
              <div className="relative">
                <Input
                  id="images"
                  type="file"
                  ref={fileInputRef}
                  multiple
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    if (files.length > 0) {
                      console.log(`${files.length} files selected`);
                      files.forEach((file, i) => {
                        console.log(
                          `File ${i + 1}: ${file.name} (${file.size} bytes)`
                        );
                      });
                      setSelectedFiles(files);
                      console.log("✅ Files saved to state");
                    } else {
                      setSelectedFiles([]);
                    }
                  }}
                  className="cursor-pointer h-12 px-4"
                />
              </div>

              {/* Preview newly selected files */}
              {selectedFiles.length > 0 && (
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border-2 border-emerald-300 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-base font-semibold text-emerald-900">
                      New Images to Upload ({selectedFiles.length})
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFiles([]);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}
                      className="text-xs text-emerald-700 hover:text-emerald-900 font-medium bg-white px-3 py-1.5 rounded-full hover:bg-emerald-100 transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                    {selectedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-xl overflow-hidden border-2 border-emerald-400 bg-white shadow-md hover:shadow-lg transition-shadow group"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-emerald-600 text-white text-xs px-2.5 py-1 rounded-md font-medium shadow-sm">
                          {index + 1}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const newFiles = selectedFiles.filter(
                              (_, i) => i !== index
                            );
                            setSelectedFiles(newFiles);
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-base hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg font-bold"
                        >
                          ×
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white text-xs px-2 py-2 truncate">
                          {file.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="pt-6 border-t mt-8">
              <Button
                onClick={handleSave}
                className="w-full h-14 text-lg font-bold bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-xl transition-all"
              >
                {currentActivity.id
                  ? "💾 Update Activity"
                  : "✨ Create Activity"}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Investor Details Modal - Full Screen */}
      {selectedInvestor && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-8 py-6 border-b bg-gradient-to-r from-emerald-50 to-white">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Investor Application Details
                  </h2>
                  <p className="text-sm text-gray-500 mt-2">
                    Submitted on{" "}
                    {new Date(selectedInvestor.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedInvestor(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content - Scrollable */}
            <div className="overflow-y-auto flex-1 px-8 py-6">
              <div className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-emerald-200 pb-3">
                    📋 Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <Label className="text-sm font-medium text-gray-500">
                        Full Name
                      </Label>
                      <p className="mt-2 text-lg font-semibold text-gray-900">
                        {selectedInvestor.fullName}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <Label className="text-sm font-medium text-gray-500">
                        Email Address
                      </Label>
                      <p className="mt-2 text-base text-gray-900">
                        <a
                          href={`mailto:${selectedInvestor.email}`}
                          className="text-emerald-600 hover:underline font-medium"
                        >
                          {selectedInvestor.email}
                        </a>
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <Label className="text-sm font-medium text-gray-500">
                        Phone Number
                      </Label>
                      <p className="mt-2 text-base text-gray-900">
                        <a
                          href={`tel:${selectedInvestor.phoneNumber}`}
                          className="text-emerald-600 hover:underline font-medium"
                        >
                          {selectedInvestor.phoneNumber}
                        </a>
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <Label className="text-sm font-medium text-gray-500">
                        Organization/Company
                      </Label>
                      <p className="mt-2 text-base text-gray-900 font-medium">
                        {selectedInvestor.organization || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <Label className="text-sm font-medium text-gray-500">
                      Address
                    </Label>
                    <p className="mt-2 text-base text-gray-900">
                      {selectedInvestor.address}
                    </p>
                  </div>
                  {selectedInvestor.socialWebsite && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <Label className="text-sm font-medium text-gray-500">
                        Social Media / Website
                      </Label>
                      <p className="mt-2 text-base text-gray-900">
                        <a
                          href={selectedInvestor.socialWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-600 hover:underline font-medium inline-flex items-center gap-1"
                        >
                          {selectedInvestor.socialWebsite}
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      </p>
                    </div>
                  )}
                </div>

                {/* Investment Information */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-emerald-200 pb-3">
                    💼 Investment Information
                  </h3>
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-lg border border-emerald-200">
                    <Label className="text-sm font-medium text-gray-700">
                      Investor/Partner Type
                    </Label>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedInvestor.financialInvestor && (
                        <Badge className="bg-green-100 text-green-800 px-4 py-2 text-sm">
                          💰 Financial Investor
                        </Badge>
                      )}
                      {selectedInvestor.advisorMentor && (
                        <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-sm">
                          🎓 Advisor/Mentor
                        </Badge>
                      )}
                      {selectedInvestor.businessPartner && (
                        <Badge className="bg-purple-100 text-purple-800 px-4 py-2 text-sm">
                          🤝 Business Partner
                        </Badge>
                      )}
                    </div>
                    {selectedInvestor.otherType && (
                      <div className="mt-4 bg-white p-4 rounded-lg border border-emerald-200">
                        <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Other Type Description
                        </Label>
                        <p className="mt-2 text-sm text-gray-900">
                          {selectedInvestor.otherType}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-50 p-5 rounded-lg">
                    <Label className="text-sm font-medium text-gray-500">
                      Sector/Industry of Interest
                    </Label>
                    <p className="mt-2 text-lg font-semibold text-gray-900">
                      {selectedInvestor.sector}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-lg">
                    <Label className="text-sm font-medium text-gray-500 mb-2 block">
                      Experience & Skills
                    </Label>
                    <p className="text-base text-gray-900 whitespace-pre-wrap leading-relaxed">
                      {selectedInvestor.experienceSkills}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-lg">
                    <Label className="text-sm font-medium text-gray-500 mb-2 block">
                      Preferred Investment Method
                    </Label>
                    <p className="text-base text-gray-900 whitespace-pre-wrap leading-relaxed">
                      {selectedInvestor.investmentModel}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer - Actions */}
            <div className="px-8 py-5 border-t bg-gray-50 flex gap-4">
              <Button
                onClick={() => setSelectedInvestor(null)}
                variant="outline"
                className="flex-1 h-12 text-base font-medium"
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  window.location.href = `mailto:${selectedInvestor.email}?subject=Re: Investment Partnership Application - ${selectedInvestor.fullName}`;
                }}
                className="flex-1 h-12 text-base font-medium bg-emerald-600 hover:bg-emerald-700"
              >
                📧 Send Email
              </Button>
              <Button
                onClick={() => {
                  window.open(`tel:${selectedInvestor.phoneNumber}`);
                }}
                className="flex-1 h-12 text-base font-medium bg-blue-600 hover:bg-blue-700"
              >
                📞 Call Now
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Entrepreneur Details Modal - Full Screen */}
      {selectedEntrepreneur && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-8 py-6 border-b bg-gradient-to-r from-blue-50 to-white">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Entrepreneur Application Details
                  </h2>
                  <p className="text-sm text-gray-500 mt-2">
                    Submitted on{" "}
                    {new Date(selectedEntrepreneur.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedEntrepreneur(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content - Scrollable */}
            <div className="overflow-y-auto flex-1 px-8 py-6">
              <div className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-blue-200 pb-3">
                    📋 Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <Label className="text-sm font-medium text-gray-500">
                        Full Name
                      </Label>
                      <p className="mt-2 text-lg font-semibold text-gray-900">
                        {selectedEntrepreneur.fullName}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <Label className="text-sm font-medium text-gray-500">
                        Email Address
                      </Label>
                      <p className="mt-2 text-base text-gray-900">
                        <a
                          href={`mailto:${selectedEntrepreneur.email}`}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {selectedEntrepreneur.email}
                        </a>
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <Label className="text-sm font-medium text-gray-500">
                        Phone Number
                      </Label>
                      <p className="mt-2 text-base text-gray-900">
                        <a
                          href={`tel:${selectedEntrepreneur.phoneNumber}`}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {selectedEntrepreneur.phoneNumber}
                        </a>
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <Label className="text-sm font-medium text-gray-500">
                        Current Occupation
                      </Label>
                      <p className="mt-2 text-base text-gray-900 font-medium">
                        {selectedEntrepreneur.currentOccupation}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <Label className="text-sm font-medium text-gray-500">
                      Address
                    </Label>
                    <p className="mt-2 text-base text-gray-900">
                      {selectedEntrepreneur.address}
                    </p>
                  </div>
                  {selectedEntrepreneur.socialLinks && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <Label className="text-sm font-medium text-gray-500">
                        Social Media Links
                      </Label>
                      <p className="mt-2 text-base text-gray-900">
                        <a
                          href={selectedEntrepreneur.socialLinks}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline font-medium inline-flex items-center gap-1"
                        >
                          {selectedEntrepreneur.socialLinks}
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      </p>
                    </div>
                  )}
                </div>

                {/* Business Details */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-blue-200 pb-3">
                    💡 Idea and Business Details
                  </h3>
                  
                  {selectedEntrepreneur.businessName && (
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-lg border border-blue-200">
                      <Label className="text-sm font-medium text-gray-700">
                        Business Name
                      </Label>
                      <p className="mt-2 text-xl font-bold text-blue-900">
                        {selectedEntrepreneur.businessName}
                      </p>
                    </div>
                  )}

                  <div className="bg-gray-50 p-5 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm font-medium text-gray-500">
                        Business Stage
                      </Label>
                      <Badge 
                        className={
                          selectedEntrepreneur.businessStage === "idea"
                            ? "bg-yellow-100 text-yellow-800"
                            : selectedEntrepreneur.businessStage === "research"
                            ? "bg-blue-100 text-blue-800"
                            : selectedEntrepreneur.businessStage === "testing"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-green-100 text-green-800"
                        }
                      >
                        {selectedEntrepreneur.businessStage === "idea" && "💡 Idea Stage"}
                        {selectedEntrepreneur.businessStage === "research" && "🔍 Research Stage"}
                        {selectedEntrepreneur.businessStage === "testing" && "🧪 Testing Stage"}
                        {selectedEntrepreneur.businessStage === "operating" && "🚀 Operating Stage"}
                      </Badge>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-lg">
                    <Label className="text-sm font-medium text-gray-500 mb-2 block">
                      Business Idea Summary
                    </Label>
                    <p className="text-base text-gray-900 whitespace-pre-wrap leading-relaxed">
                      {selectedEntrepreneur.ideaSummary}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-lg">
                    <Label className="text-sm font-medium text-gray-500 mb-2 block">
                      Problem to Solve
                    </Label>
                    <p className="text-base text-gray-900 whitespace-pre-wrap leading-relaxed">
                      {selectedEntrepreneur.problemSolved}
                    </p>
                  </div>

                  {selectedEntrepreneur.targetCustomer && (
                    <div className="bg-gray-50 p-5 rounded-lg">
                      <Label className="text-sm font-medium text-gray-500 mb-2 block">
                        Target Customer
                      </Label>
                      <p className="text-base text-gray-900 whitespace-pre-wrap leading-relaxed">
                        {selectedEntrepreneur.targetCustomer}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-5 rounded-lg">
                      <Label className="text-sm font-medium text-gray-500 mb-2 block">
                        Physical Assets
                      </Label>
                      <p className="text-base text-gray-900 whitespace-pre-wrap leading-relaxed">
                        {selectedEntrepreneur.physicalAssets}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-lg">
                      <Label className="text-sm font-medium text-gray-500 mb-2 block">
                        Skills & Knowledge
                      </Label>
                      <p className="text-base text-gray-900 whitespace-pre-wrap leading-relaxed">
                        {selectedEntrepreneur.mentalAssets}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Requirements */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-blue-200 pb-3">
                    🎯 Requirements
                  </h3>

                  <div className="bg-gray-50 p-5 rounded-lg">
                    <Label className="text-sm font-medium text-gray-500 mb-2 block">
                      Assistance Needed
                    </Label>
                    <p className="text-base text-gray-900 whitespace-pre-wrap leading-relaxed">
                      {selectedEntrepreneur.assistanceNeeded}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-lg">
                    <Label className="text-sm font-medium text-gray-500 mb-2 block">
                      Expectations from Incubation Center
                    </Label>
                    <p className="text-base text-gray-900 whitespace-pre-wrap leading-relaxed">
                      {selectedEntrepreneur.expectations}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer - Actions */}
            <div className="px-8 py-5 border-t bg-gray-50 flex gap-4">
              <Button
                onClick={() => setSelectedEntrepreneur(null)}
                variant="outline"
                className="flex-1 h-12 text-base font-medium"
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  window.location.href = `mailto:${selectedEntrepreneur.email}?subject=Re: Entrepreneur Application - ${selectedEntrepreneur.fullName}`;
                }}
                className="flex-1 h-12 text-base font-medium bg-blue-600 hover:bg-blue-700"
              >
                📧 Send Email
              </Button>
              <Button
                onClick={() => {
                  window.open(`tel:${selectedEntrepreneur.phoneNumber}`);
                }}
                className="flex-1 h-12 text-base font-medium bg-blue-600 hover:bg-blue-700"
              >
                📞 Call Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
