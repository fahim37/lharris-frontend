"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ScheduleVisitDialog } from "@/components/dashboard/schedule-visit-dialog";
import { VisitDetailsDialog } from "@/components/dashboard/visit-details-dialog";
import { toast } from "sonner";
import { Eye, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import PaginationComponent from "@/components/Pagination/Pagination";
import { useSession } from "next-auth/react";

// Dummy data for scheduled visits

export default function SchedulePage() {
  const [activeTab, setActiveTab] = useState("upcoming-visits");
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [visitDetailsOpen, setVisitDetailsOpen] = useState(false);
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [selectedVisit, setSelectedVisit] = useState<any>(null);
  const [currentMonth] = useState("September 2025");
  const session = useSession();
  const token = session.data?.accessToken;
  console.log(token);

  const handleScheduleVisit = () => {
    setScheduleDialogOpen(true);
  };
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const handleViewDetails = (visit: any) => {
    setSelectedVisit(visit._id);
    setVisitDetailsOpen(true);
  };
  console.log(selectedVisit);

  const [page, setPage] = useState(1);
  console.log(page);

  const { data } = useQuery({
    queryKey: ["scheduledVisits"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/visits/client/get-past-visits?page=1&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch live auctions");
      }

      const data = await response.json();
      return data;
    },
  });
  console.log(data);

  // const { data: upcomingVisits,  } = useQuery({
  //   queryKey: ["upcomingVisits"],
  //   queryFn: async () => {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/visits/client/get-upcoming-visits`, {
  //       headers: {
  //         Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDMzNTdhMjBlZDFjNTA0MGMxNjEzMyIsImlhdCI6MTc0NTMxMjQ0NSwiZXhwIjoxNzQ1OTE3MjQ1fQ.dfzccsPNmh3Pw6eB9aQxaYs8QtLrLuUyTZwUAqksk30",
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch live auctions");
  //     }

  //     const data = await response.json();
  //     return data;
  //   },
  // });
  //  console.log(upcomingVisits);

  return (
    <DashboardLayout
      title="Client Name"
      subtitle="Client Dashboard"
      userName="Name"
      userRole="Customer"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-semibold">Schedule</h2>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleScheduleVisit}
          >
            <Plus className="mr-2 h-4 w-4" /> Schedule Visit
          </Button>
        </div>

        <Tabs defaultValue="upcoming-visits" onValueChange={setActiveTab}>
          <TabsList className="w-full max-w-md grid grid-cols-2">
            <TabsTrigger value="past-visits" className="rounded-full">
              Upcoming Visits
            </TabsTrigger>
            <TabsTrigger value="upcoming-visits" className="rounded-full">
              Past Visits
            </TabsTrigger>

            {/* <TabsTrigger value="requested-visits" className="rounded-full">
              Requested Visits
            </TabsTrigger> */}
          </TabsList>

          <TabsContent value="upcoming-visits" className="mt-6">
            {activeTab === "upcoming-visits" && (
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Staff</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Issue</TableHead>
                      <TableHead>Visit Type</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.data.map((visit) => (
                      <TableRow key={visit.id}>
                        <TableCell className="font-medium">
                          {visit.visitCode}
                        </TableCell>
                        <TableCell>
                          {
                            new Date(visit.updatedAt)
                              .toISOString()
                              .split("T")[0]
                          }
                        </TableCell>
                        <TableCell>
                          {new Date(visit.updatedAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div>
                              <div className="font-medium">
                                {visit.client.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {visit.client.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              visit.status === "completed"
                                ? "default"
                                : visit.status === "cancelled"
                                ? "destructive"
                                : "outline"
                            }
                            className={
                              visit.status === "completed"
                                ? "bg-green-500"
                                : visit.status === "cancelled"
                                ? "bg-red-500"
                                : "bg-yellow-500 text-yellow-950"
                            }
                          >
                            {visit.status.charAt(0).toUpperCase() +
                              visit.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              !visit.issues || visit.issues.length === 0
                                ? "default"
                                : "destructive"
                            }
                            className={
                              !visit.issues || visit.issues.length === 0
                                ? "bg-green-500"
                                : "bg-[#E9BFBF] text-[red]"
                            }
                          >
                            {!visit.issues || visit.issues.length === 0
                              ? "No issue"
                              : "Issue found"}
                          </Badge>
                        </TableCell>

                        <TableCell>{visit.type}</TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {visit.notes}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleViewDetails(visit)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
            <div className="mt-3 ">
              <PaginationComponent
                currentPage={data?.pagination.currentPage}
                totalPages={data?.pagination.totalPages}
                onPageChange={(newPage) => setPage(newPage)}
              />
            </div>
          </TabsContent>

          <TabsContent value="past-visits" className="mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">
                  {currentMonth}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 text-center">
                  <div className="text-xs font-medium text-muted-foreground">
                    Sun
                  </div>
                  <div className="text-xs font-medium text-muted-foreground">
                    Mon
                  </div>
                  <div className="text-xs font-medium text-muted-foreground">
                    Tue
                  </div>
                  <div className="text-xs font-medium text-muted-foreground">
                    Wed
                  </div>
                  <div className="text-xs font-medium text-muted-foreground">
                    Thu
                  </div>
                  <div className="text-xs font-medium text-muted-foreground">
                    Fri
                  </div>
                  <div className="text-xs font-medium text-muted-foreground">
                    Sat
                  </div>

                  {Array.from({ length: 35 }).map((_, i) => {
                    const day = i - 3; // Offset to start from previous month
                    const isCurrentMonth = day >= 0 && day < 30;
                    const isToday = day === 15;
                    const hasEvent = [2, 6, 13, 26, 28].includes(day);
                    const isScheduled = [4, 10, 19].includes(day);
                    const isCancelled = [13].includes(day);

                    return (
                      <div
                        key={i}
                        className={`
                          h-10 flex items-center justify-center rounded-md text-sm cursor-pointer
                          ${!isCurrentMonth ? "text-muted-foreground" : ""}
                          ${isToday ? "bg-primary/20 font-bold" : ""}
                          ${hasEvent ? "bg-green-100" : ""}
                          ${isScheduled ? "bg-blue-100" : ""}
                          ${isCancelled ? "bg-red-100" : ""}
                        `}
                        onClick={() => {
                          if (isCurrentMonth) {
                            toast.info(
                              `Selected date: September ${day + 1}, 2025`
                            );
                          }
                        }}
                      >
                        {day >= 0 ? day + 1 : 31 + day}
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-wrap gap-4 mt-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span>Successful Visit</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span>Cancelled Visit</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span>Pending Visit</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span>Confirmed Visit</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* <TabsContent value="requested-visits" className="mt-6">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Visit Type</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scheduledVisits
                      .filter((visit) => visit.status === "pending")
                      .map((visit) => (
                        <TableRow key={visit.id}>
                          <TableCell className="font-medium">
                            {visit.id}
                          </TableCell>
                          <TableCell>{visit.date}</TableCell>
                          <TableCell>{visit.time}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground">
                                {visit.client.name.charAt(0)}
                              </div>
                              <div>
                                <div className="font-medium">
                                  {visit.client.name}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {visit.client.email}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="bg-yellow-500 text-yellow-950"
                            >
                              {visit.status.charAt(0).toUpperCase() +
                                visit.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{visit.visitType}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleViewDetails(visit)}
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
              </CardContent>
            </Card>
          </TabsContent> */}
        </Tabs>
      </div>

      <ScheduleVisitDialog
        open={scheduleDialogOpen}
        onOpenChange={setScheduleDialogOpen}
      />
      {selectedVisit && (
        <VisitDetailsDialog
          visitId={selectedVisit}
          open={visitDetailsOpen}
          onOpenChange={setVisitDetailsOpen}
        />
      )}
    </DashboardLayout>
  );
}
