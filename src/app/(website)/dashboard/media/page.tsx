"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MediaViewerDialog } from "@/components/dashboard/media-viewer-dialog";
import { Search, Filter, Play, Eye, Edit } from "lucide-react";
import Image from "next/image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

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
            <div className="">
              {filteredMedia.length === 0 ? (
                <div className="col-span-full text-center py-10">
                  No media found
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Visit Time</TableHead>
                      <TableHead>Staff</TableHead>
                      <TableHead>Issue</TableHead>
                      <TableHead>Visit Type</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMedia.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {item.id}
                        </TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.time}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground">
                              {item.id}
                            </div>
                            <div>
                              <div className="font-medium">
                                {item.id}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {item.id}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.status === "completed"
                                ? "default"
                                : item.status === "cancelled"
                                  ? "destructive"
                                  : "outline"
                            }
                            className={
                              item.status === "completed"
                                ? "bg-green-500"
                                : item.status === "cancelled"
                                  ? "bg-red-500"
                                  : "bg-yellow-500 text-yellow-950"
                            }
                          >
                            {item.status.charAt(0).toUpperCase() +
                              item.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.status}</TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {item.status}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleViewMedia(item)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </TabsContent>

          <TabsContent value="videos">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Visit Type</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMedia
                  .filter((item) => item.type === "video")
                  .map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.id}
                      </TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.time}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground">
                            {item.id}
                          </div>
                          <div>
                            <div className="font-medium">
                              {item.id}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {item.id}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            item.status === "completed"
                              ? "default"
                              : item.status === "cancelled"
                                ? "destructive"
                                : "outline"
                          }
                          className={
                            item.status === "completed"
                              ? "bg-green-500"
                              : item.status === "cancelled"
                                ? "bg-red-500"
                                : "bg-yellow-500 text-yellow-950"
                          }
                        >
                          {item.status.charAt(0).toUpperCase() +
                            item.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {item.status}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewMedia(item)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
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
