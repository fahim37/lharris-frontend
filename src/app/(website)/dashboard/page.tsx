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


export default function DashboardPage() {
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);

  const session = useSession();
  const userInfo = session?.data?.user;
  console.log(userInfo)


  const handleScheduleVisit = () => {
    setScheduleDialogOpen(true);
  };



  return (
    <DashboardLayout
      title="Client Name"
      subtitle="Client Dashboard"
      userName= {userInfo?.name}
      userRole={userInfo?.role}
    >
      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Upcoming Visits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2</div>
              <div className="text-xs text-muted-foreground mt-1">
                Next: March 26, 9:00 AM
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3</div>
              <div className="text-xs text-muted-foreground mt-1">
                Last: 2 hours ago
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Latest Video Upload
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                <div className="flex justify-between items-center">
                  <span>March 22, 2025 - 14:30</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1"
                    onClick={() => toast.info("Video viewer would open here")}
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>View</span>
                  </Button>
                </div>
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
              <h3 className="text-lg font-medium mb-4">
                Available Time Slots:
              </h3>
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                  <select className="px-3 py-2 rounded-md border">
                    <option>Day</option>
                  </select>
                  <select className="px-3 py-2 rounded-md border">
                    <option>Month</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-4">
                {Array.from({ length: 10 }).map((_, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    className="text-xs py-1 px-2"
                    onClick={handleScheduleVisit}
                  >
                    Mar 30, {9 + Math.floor(i / 2)}:{i % 2 === 0 ? "00" : "30"}{" "}
                    {i < 6 ? "AM" : "PM"}
                  </Button>
                ))}
              </div>
              <div className="flex justify-end">
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
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
                Lorem ipsum dolor sit amet.
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

                {Array.from({ length: 35 }).map((_, i) => {
                  const day = i - 3; // Offset to start from previous month
                  const isCurrentMonth = day >= 0 && day < 31;
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
                          toast.info(`Selected date: March ${day + 1}, 2025`);
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

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">
                Notifications
              </CardTitle>
              <div className="text-xs text-muted-foreground">
                Lorem ipsum dolor sit amet.
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-medium">
                      Visit scheduled for March 26
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
