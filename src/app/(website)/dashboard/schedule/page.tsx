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
import { Eye, Edit, Plus } from "lucide-react";

// Dummy data for scheduled visits
const scheduledVisits = [
  {
    id: "001",
    date: "Mar 15, 2025",
    time: "9:00 AM",
    client: {
      name: "Sarah Wilson",
      email: "sarah@example.com",
    },
    status: "completed",
    visitType: "Routine Check",
    notes: "All devices working normally.",
    actions: ["view", "edit"],
  },
  {
    id: "002",
    date: "Mar 16, 2025",
    time: "2:30 PM",
    client: {
      name: "Sarah Wilson",
      email: "sarah@example.com",
    },
    status: "cancelled",
    visitType: "Follow-up",
    notes: "Client cancelled due to personal emergency.",
    actions: ["view", "edit"],
  },
  {
    id: "003",
    date: "Mar 18, 2025",
    time: "10:00 AM",
    client: {
      name: "Sarah Wilson",
      email: "sarah@example.com",
    },
    status: "pending",
    visitType: "Routine Check",
    notes: "Visit scheduled for next week.",
    actions: ["view", "edit"],
  },
];

export default function SchedulePage() {
  const [activeTab, setActiveTab] = useState("upcoming-visits");
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [visitDetailsOpen, setVisitDetailsOpen] = useState(false);
/* eslint-disable @typescript-eslint/no-explicit-any */
  const [selectedVisit, setSelectedVisit] = useState<any>(null);
  const [currentMonth] = useState("September 2025");

  const handleScheduleVisit = () => {
    setScheduleDialogOpen(true);
  };
/* eslint-disable @typescript-eslint/no-explicit-any */
  const handleViewDetails = (visit: any) => {
    setSelectedVisit(visit);
    setVisitDetailsOpen(true);
  };

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
          <TabsList className="w-full max-w-md grid grid-cols-3">
            <TabsTrigger value="upcoming-visits" className="rounded-full">
              Upcoming Visits
            </TabsTrigger>
            <TabsTrigger value="past-visits" className="rounded-full">
              Past Visits
            </TabsTrigger>
            <TabsTrigger value="requested-visits" className="rounded-full">
              Requested Visits
            </TabsTrigger>
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
                      <TableHead>Client</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Visit Type</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scheduledVisits.map((visit) => (
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
                        <TableCell>{visit.visitType}</TableCell>
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
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
            <div className="flex items-center justify-between py-4">
              <div className="text-sm text-muted-foreground">
                Showing 1 to {scheduledVisits.length} of 24 results
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" disabled>
                  <span className="sr-only">Go to previous page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  1
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 bg-primary text-primary-foreground"
                >
                  2
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  3
                </Button>
                <Button variant="outline" size="icon">
                  <span className="sr-only">Go to next page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Button>
              </div>
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

          <TabsContent value="requested-visits" className="mt-6">
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
          </TabsContent>
        </Tabs>
      </div>

      <ScheduleVisitDialog
        open={scheduleDialogOpen}
        onOpenChange={setScheduleDialogOpen}
      />
      {selectedVisit && (
        <VisitDetailsDialog
          visit={selectedVisit}
          open={visitDetailsOpen}
          onOpenChange={setVisitDetailsOpen}
        />
      )}
    </DashboardLayout>
  );
}
