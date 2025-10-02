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

export default function AdminDashboard() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<Partial<Activity>>({});
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchActivities();
  }, []);

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
        <h1 className="text-3xl font-bold">Activities Dashboard</h1>
        <Button onClick={handleAddNew}>Add New Activity</Button>
      </div>

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
    </div>
  );
}
