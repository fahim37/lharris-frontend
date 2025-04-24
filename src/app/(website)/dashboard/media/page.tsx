"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MediaViewerDialog } from "@/components/dashboard/media-viewer-dialog";
import { Search, Filter, Play } from "lucide-react";
import Image from "next/image";

// Dummy data for media
const mediaItems = [
  {
    id: "001",
    type: "video",
    date: "Mar 15, 2025",
    time: "9:00 AM",
    title: "Front Door Check",
    thumbnail: "/placeholder.svg?height=200&width=300",
    url: "#",
    status: "completed",
  },
  {
    id: "002",
    type: "video",
    date: "Mar 16, 2025",
    time: "2:30 PM",
    title: "Backyard Inspection",
    thumbnail: "/placeholder.svg?height=200&width=300",
    url: "#",
    status: "pending",
  },
  {
    id: "003",
    type: "video",
    date: "Mar 18, 2025",
    time: "11:15 AM",
    title: "Garage Security Check",
    thumbnail: "/placeholder.svg?height=200&width=300",
    url: "#",
    status: "completed",
  },
  {
    id: "004",
    type: "video",
    date: "Mar 20, 2025",
    time: "4:45 PM",
    title: "Perimeter Walk",
    thumbnail: "/placeholder.svg?height=200&width=300",
    url: "#",
    status: "cancelled",
  },
];

export default function MediaPage() {
  const [searchQuery, setSearchQuery] = useState("");
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const filteredMedia = mediaItems.filter((item) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(searchLower) ||
      item.date.toLowerCase().includes(searchLower) ||
      item.status.toLowerCase().includes(searchLower)
    );
  });

  const handleViewMedia = (media: any) => {
    setSelectedMedia(media);
    setIsViewerOpen(true);
  };

  return (
    <DashboardLayout
      title="Client Name"
      subtitle="Client Dashboard"
      userName="Name"
      userRole="Customer"
    >
      <div className="space-y-4">
        <Tabs defaultValue="all-media">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <TabsList>
              <TabsTrigger value="all-media">All Media</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
            </TabsList>
            <div className="flex w-full sm:w-auto gap-2">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search media..."
                  className="pl-8 w-full sm:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="all-media" className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredMedia.length === 0 ? (
                <div className="col-span-full text-center py-10">
                  No media found
                </div>
              ) : (
                filteredMedia.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="relative aspect-video">
                      <Image
                        src={item.thumbnail || "/placeholder.svg"}
                        alt={item.title}
                        className="object-cover w-full h-full"
                        fill
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="rounded-full opacity-90 hover:opacity-100"
                          onClick={() => handleViewMedia(item)}
                        >
                          <Play className="h-6 w-6" />
                        </Button>
                      </div>
                      <div
                        className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === "completed"
                            ? "bg-green-500 text-white"
                            : item.status === "cancelled"
                            ? "bg-red-500 text-white"
                            : "bg-yellow-500 text-yellow-950"
                        }`}
                      >
                        {item.status.charAt(0).toUpperCase() +
                          item.status.slice(1)}
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-medium text-sm">{item.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.date} - {item.time}
                      </p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="videos">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredMedia
                .filter((item) => item.type === "video")
                .map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="relative aspect-video">
                      <Image
                        src={item.thumbnail || "/placeholder.svg"}
                        alt={item.title}
                        className="object-cover w-full h-full"
                        fill
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="rounded-full opacity-90 hover:opacity-100"
                          onClick={() => handleViewMedia(item)}
                        >
                          <Play className="h-6 w-6" />
                        </Button>
                      </div>
                      <div
                        className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === "completed"
                            ? "bg-green-500 text-white"
                            : item.status === "cancelled"
                            ? "bg-red-500 text-white"
                            : "bg-yellow-500 text-yellow-950"
                        }`}
                      >
                        {item.status.charAt(0).toUpperCase() +
                          item.status.slice(1)}
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-medium text-sm">{item.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.date} - {item.time}
                      </p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="photos">
            <div className="text-center py-10">No photos available</div>
          </TabsContent>
        </Tabs>
      </div>

      {selectedMedia && (
        <MediaViewerDialog
          media={selectedMedia}
          open={isViewerOpen}
          onOpenChange={setIsViewerOpen}
        />
      )}
    </DashboardLayout>
  );
}
