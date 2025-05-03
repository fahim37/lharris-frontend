"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye } from "lucide-react";
import { toast } from "sonner";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScheduleVisitDialog } from "@/components/dashboard/schedule-visit-dialog";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

export default function DashboardPage() {
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const session = useSession();
  const userID = session?.data?.user?.id;
  const token = session?.data?.accessToken;

  const handleScheduleVisit = () => {
    setScheduleDialogOpen(true);
  };

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

  const { data: allVisits = [] } = useQuery({
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

  console.log(allVisits);

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

  return (
    <DashboardLayout title="">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                Upcoming Visits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{pendingVisits.length}</div>
              <div className="text-sm text-muted-foreground">
                Next:{" "}
                {pendingVisits[0]?.date
                  ? format(new Date(pendingVisits[0]?.date), "MMMM dd, h:mm a")
                  : "No upcoming visits"}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                Pending Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">
                {pendingMessage?.data || 0}
              </div>
              <div className="text-sm text-muted-foreground">
                Last: 2 hours ago
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                Latest Video Upload
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>March 22, 2025 - 14:30</div>
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1 bg-[#091057] text-white"
                onClick={() => toast.info("Video viewer would open here")}
              >
                <Eye className="h-4 w-4" />
                View
              </Button>
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
                <h3 className="text-2xl font-medium">Available Time Slots:</h3>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <select className="px-3 py-2 rounded-md border w-[221px] bg-inherit">
                      <option>Day</option>
                    </select>
                    <select className="px-3 py-2 rounded-md border w-[221px] bg-inherit">
                      <option>Month</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 mb-4">
                {Array.from({ length: 10 }).map((_, i) => (
                  <Button
                    key={i}
                    className="text-xs py-1 px-2 rounded-3xl border-none bg-[#e6e7ee] text-[] hover:bg-[#091057] hover:text-white"
                    onClick={handleScheduleVisit}
                  >
                    Mar 30, {9 + Math.floor(i / 2)}:{i % 2 === 0 ? "00" : "30"}{" "}
                    {i < 6 ? "AM" : "PM"}
                  </Button>
                ))}
              </div>
              <div className="flex justify-end">
                <Button
                  className="bg-[#091057] hover:bg-[#091057] text-white"
                  onClick={handleScheduleVisit}
                >
                  Schedule Visit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
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
                  const isToday =
                    day === currentDate.getDate() &&
                    currentMonth === currentDate.getMonth() &&
                    currentYear === currentDate.getFullYear();

                  return (
                    <div
                      key={day}
                      className={`
                        h-10 flex items-center justify-center rounded-md text-sm cursor-pointer border border-border
                        ${isToday ? "bg-primary/20 font-bold" : ""}
                        ${visitStatus === "completed" ? "bg-green-300" : ""}
                        ${visitStatus === "confirmed" ? "bg-blue-300" : ""}
                        ${visitStatus === "cancelled" ? "bg-red-300" : ""}
                        ${visitStatus === "pending" ? "bg-blue-300" : ""}
                      `}
                      onClick={() => {
                        toast.info(
                          `Selected date: ${format(
                            new Date(currentYear, currentMonth, day),
                            "MMMM dd, yyyy"
                          )}`
                        );
                      }}
                    >
                      {day}
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

          <Card>
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
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-medium">
                      Visit scheduled for{" "}
                      {pendingVisits[0]?.date
                        ? format(new Date(pendingVisits[0]?.date), "MMMM dd")
                        : "N/A"}
                    </h4>
                    <p className="text-xs text-muted-foreground">2h Ago</p>
                  </div>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-medium">
                      New message from Security Team
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Mar 15, 11:30 AM
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-medium">
                      New message from Security Team
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Mar 15, 11:30 AM
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-medium">Visit log updated</h4>
                    <p className="text-xs text-muted-foreground">
                      Mar 12, 11:30 AM
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-medium">
                      New message from Security Team
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Mar 10, 11:30 AM
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-medium">Visit log updated</h4>
                    <p className="text-xs text-muted-foreground">
                      Mar 10, 11:30 AM
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-medium">Visit log updated</h4>
                    <p className="text-xs text-muted-foreground">
                      Mar 10, 11:30 AM
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <Link href="#" className="text-xs text-muted-foreground">
                  See all notifications
                </Link>
                <span className="text-xs">?</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ScheduleVisitDialog
        open={scheduleDialogOpen}
        onOpenChange={setScheduleDialogOpen}
      />
    </DashboardLayout>
  );
}
