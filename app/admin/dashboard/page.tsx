"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Image from 'next/image';

interface Activity {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  imageUrl: string;
}

export default function AdminDashboard() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<Partial<Activity>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    const res = await fetch('/api/activities');
    const data = await res.json();
    setActivities(data);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('title', currentActivity.title || '');
    formData.append('shortDescription', currentActivity.shortDescription || '');
    formData.append('longDescription', currentActivity.longDescription || '');
    if (currentActivity.id) {
      formData.append('id', currentActivity.id);
    }
    if (fileInputRef.current?.files?.[0]) {
      formData.append('image', fileInputRef.current.files[0]);
    }

    const method = currentActivity.id ? 'PUT' : 'POST';
    const url = currentActivity.id ? `/api/activities/${currentActivity.id}` : '/api/activities';

    await fetch(url, {
      method,
      body: formData, // No 'Content-Type' header, browser sets it for FormData
    });

    fetchActivities();
    setIsSheetOpen(false);
    setCurrentActivity({});
  };

  const handleEdit = (activity: Activity) => {
    setCurrentActivity(activity);
    setIsSheetOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this activity?')) {
      await fetch(`/api/activities/${id}`, { method: 'DELETE' });
      fetchActivities();
    }
  };

  const handleAddNew = () => {
    setCurrentActivity({});
    setIsSheetOpen(true);
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Short Description</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {activities.map((activity) => (
                  <tr key={activity.id}>
                    <td className="px-6 py-4">
                      <div className="relative h-16 w-24 rounded-md overflow-hidden">
                        <Image src={activity.imageUrl} alt={activity.title} layout="fill" objectFit="cover" />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{activity.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">{activity.shortDescription}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(activity)}>Edit</Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(activity.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full max-w-lg sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{currentActivity.id ? 'Edit Activity' : 'Add New Activity'}</SheetTitle>
          </SheetHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={currentActivity.title || ''} onChange={(e) => setCurrentActivity({ ...currentActivity, title: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="shortDescription">Short Description</Label>
              <Input id="shortDescription" value={currentActivity.shortDescription || ''} onChange={(e) => setCurrentActivity({ ...currentActivity, shortDescription: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="longDescription">Long Description</Label>
              <Textarea id="longDescription" value={currentActivity.longDescription || ''} onChange={(e) => setCurrentActivity({ ...currentActivity, longDescription: e.target.value })} rows={10} />
            </div>
            <div>
              <Label htmlFor="image">Image</Label>
              <Input id="image" type="file" ref={fileInputRef} />
              {currentActivity.imageUrl && (
                <div className="mt-4">
                  <p className="text-sm font-medium">Current Image:</p>
                  <div className="relative h-32 w-48 mt-2 rounded-md overflow-hidden">
                    <Image src={currentActivity.imageUrl} alt={currentActivity.title || 'Activity Image'} layout="fill" objectFit="cover" />
                  </div>
                </div>
              )}
            </div>
            <Button onClick={handleSave} className="w-full">Save Activity</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
