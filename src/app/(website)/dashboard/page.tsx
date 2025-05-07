"use client";
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScheduleVisitDialog } from "@/components/dashboard/schedule-visit-dialog";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "@/app/globals.css";

export default function DashboardPage() {
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const session = useSession();
  const userInfo = session?.data?.user;
  const userID = session?.data?.user?.id;
  const token = session?.data?.accessToken;

  const [selectedMonthFromPage, setSelectedMonthFromPage] = useState("");
  const [selectedDateFromPage, setSelectedDateFromPage] = useState("");
  const [selectedTimeFromPage, setSelectedTimeFromPage] = useState("");

  const handleScheduleVisit = () => {
    setScheduleDialogOpen(true);
  };

  // pending message api
  const { data: pendingMessage = "" } = useQuery({
    queryKey: ["pending-message"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/messages/pending-count/${userID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch pending messages");
      }

      const data = await res.json();

      return data;
    },
  });

  //all visits api
  const { data: allVisits = [], refetch } = useQuery({
    queryKey: ["[all-visits"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/visits/get-visit-client`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch all visits");
      }

      const data = await res.json();
      return data?.data;
    },
  });

  //notification api
  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/notifications/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch pending messages");
      }

      const data = await res.json();

      return data.data;
    },
  });

  interface Visit {
    _id: string;
    status: string;
    date: string;
    [key: string]: string | object | string[] | boolean | null;
  }

  const pendingVisits = (allVisits as Visit[]).filter(
    (visit) => visit.status === "pending"
  );
  const completedVisits = (allVisits as Visit[]).filter(
    (visit) => visit.status === "completed"
  );
  const cancelledVisits = (allVisits as Visit[]).filter(
    (visit) => visit.status === "cancelled"
  );
  const confirmedVisits = (allVisits as Visit[]).filter(
    (visit) => visit.status === "confirmed"
  );

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const getVisitStatusForDay = (day: number): string | null => {
    const dateToCheck = new Date(currentYear, currentMonth, day);
    const formattedDateToCheck = format(dateToCheck, "yyyy-MM-dd");

    const pending = pendingVisits.some(
      (visit) =>
        format(new Date(visit.date), "yyyy-MM-dd") === formattedDateToCheck
    );
    if (pending) return "pending";

    const completed = completedVisits.some(
      (visit) =>
        format(new Date(visit.date), "yyyy-MM-dd") === formattedDateToCheck
    );
    if (completed) return "completed";

    const cancelled = cancelledVisits.some(
      (visit) =>
        format(new Date(visit.date), "yyyy-MM-dd") === formattedDateToCheck
    );
    if (cancelled) return "cancelled";

    const confirmed = confirmedVisits.some(
      (visit) =>
        format(new Date(visit.date), "yyyy-MM-dd") === formattedDateToCheck
    );
    if (confirmed) return "confirmed";

    return null;
  };

  const timeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
  ];

  return (
    <DashboardLayout
      title=""
      subtitle="Client Dashboard"
      userName={userInfo?.name}
      userRole={userInfo?.role}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                Upcoming Visits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-[#091057]">{pendingVisits.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium text-[#091057]">
                Pending Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl text-[#091057] font-bold">
                {pendingMessage?.data || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">
              Request New Visit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <div className="flex items-center justify-between mb-5 mt-2">
                <h3 className="text-2xl font-medium text-[#091057]">Available Time Slots:</h3>
                <div>
                  <div className="flex items-center gap-5">
                    <div className="w-[221px]">
                      <Label htmlFor="day" className="text-xs">
                        Day
                      </Label>
                      <Select onValueChange={setSelectedDateFromPage}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select day" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 7 }).map((_, i) => {
                            const date = new Date();
                            date.setDate(date.getDate() + i);
                            const dateValue = date.toISOString().split("T")[0];
                            return (
                              <SelectItem key={i} value={dateValue}>
                                {date.toLocaleDateString("en-US", {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className=" w-[221px]">
                      <Label htmlFor="month" className="text-xs">
                        Month
                      </Label>
                      <Select onValueChange={setSelectedMonthFromPage}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select month" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }).map((_, i) => {
                            const date = new Date();
                            date.setMonth(i);
                            return (
                              <SelectItem
                                key={i}
                                value={date.toLocaleString("en-US", {
                                  month: "long",
                                })}
                              >
                                {date.toLocaleString("en-US", {
                                  month: "long",
                                })}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 mb-4">
                {timeSlots.map((time, i) => (
                  <Button
                    key={i}
                    type="button"
                    size="sm"
                    className={
                      selectedTimeFromPage === time
                        ? "bg-[#091057] text-white rounded-3xl py-5 px-2"
                        : "text-xs py-5 px-2 rounded-3xl border-none bg-[#e6e7ee] text-[#091057] hover:bg-[#091057] hover:text-white"
                    }
                    onClick={() => setSelectedTimeFromPage(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
              <div className="flex justify-end">
                <Button
                  className="bg-[#091057] hover:bg-[#091057] text-primary"
                  onClick={handleScheduleVisit}
                >
                  Schedule Visit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 ">
          <Card className=" lg:col-span-4 max-h-[500px] overflow-y-auto">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Calendar</CardTitle>
              <div className="text-xs text-muted-foreground">
                {format(new Date(currentYear, currentMonth, 1), "MMMM yyyy")}
              </div>
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

                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-10" />
                ))}

                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const visitStatus = getVisitStatusForDay(day);

                  return (
                    <div
                      key={day}
                      className={`
                        h-14 flex items-center justify-center rounded-md text-sm cursor-pointer border border-border
                        ${visitStatus === "completed" ? "bg-[#ecfdf5]" : ""}
                        ${visitStatus === "confirmed" ? "bg-[#e6e7ee]" : ""}
                        ${visitStatus === "cancelled" ? "bg-[#fef2f2]" : ""}
                        ${visitStatus === "pending" ? "bg-[#fffbeb]" : ""}
                      `}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-4 mt-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Completed Visit</span>
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

          <Card className=" lg:col-span-2 max-h-[500px] overflow-y-auto">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">
                Notifications
              </CardTitle>
              <div className="text-xs text-muted-foreground">
                Latest updates and alerts.
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification?._id}
                    className="flex justify-between items-start mt-5 text-[14px] "
                  >
                    <div className="flex  justify-between w-full text-[12px]">
                      <h4 className="text-sm">
                        {notification?.message}
                      </h4>
                      <p className="text-muted-foreground text-[12px] text-nowrap">
                        {new Date(notification?.createdAt).toLocaleString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* <div className="flex justify-between items-center mt-4">
                <Link href="#" className="text-xs text-muted-foreground">
                  See all notifications
                </Link>
                <span className="text-xs">?</span>
              </div> */}
            </CardContent>
          </Card>
        </div>
      </div>

      <ScheduleVisitDialog
        open={scheduleDialogOpen}
        onOpenChange={setScheduleDialogOpen}
        selectedDateFromPage={selectedDateFromPage}
        selectedMonthFromPage={selectedMonthFromPage}
        selectedTimeFromPage={selectedTimeFromPage}
        refetch={refetch}
      />
    </DashboardLayout>
  );
}
