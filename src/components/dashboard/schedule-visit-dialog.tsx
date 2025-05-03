"use client";

import type React from "react";
import { useState, useEffect } from "react"; // Import useEffect
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";

interface ScheduleVisitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDateFromPage?: string;
  selectedMonthFromPage?: string; 
  selectedTimeFromPage?: string;
  refetch?: () => void;
}

interface VisitPayload {
  address: string;
  date: string;
  type: string;
  plan: string;
  addsOnService: string;
}

export function ScheduleVisitDialog({
  open,
  onOpenChange,
  selectedDateFromPage,
  selectedMonthFromPage,
  selectedTimeFromPage,
  refetch
}: ScheduleVisitDialogProps) {
  const [visitType, setVisitType] = useState("routine-check");
  const [selectedDate, setSelectedDate] = useState(selectedDateFromPage || ""); 
  const [selectedMonth, setSelectedMonth] = useState(selectedMonthFromPage || "");
  const [selectedTime, setSelectedTime] = useState(selectedTimeFromPage || "");
  const [address, setAddress] = useState("");

 
  useEffect(() => {
    setSelectedDate(selectedDateFromPage || "");
  }, [selectedDateFromPage]);

  useEffect(() => {
    setSelectedMonth(selectedMonthFromPage || "");
  }, [selectedMonthFromPage]);

    useEffect(() => {
    setSelectedTime(selectedTimeFromPage || "");
  }, [selectedTimeFromPage]);

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

  const session = useSession();
  const token = session?.data?.accessToken;

  const createVisit = async (data: VisitPayload) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/visits/create-visit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to schedule visit");
    }

    return response.json();
  };

  // TanStack Query mutation
  const mutation = useMutation({
    mutationFn: createVisit,
    onSuccess: () => {
      toast.success("Visit scheduled successfully!");
      refetch?.();
      onOpenChange(false);
      // Reset form
      setAddress("");
      setSelectedDate("");
      setSelectedMonth("");
      setSelectedTime("");
      setVisitType("routine-check");
    },
    onError: (error) => {
      toast.error("Error scheduling visit. Please try again.");
      console.error(error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (!selectedDate || !selectedTime || !address || !visitType) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Combine date and time into ISO format
    const [year, month, day] = selectedDate.split("-").map(Number); // Assuming date format is YYYY-MM-DD
    const [time, period] = selectedTime.split(" ");
    let [hours] = time.split(":").map(Number);

    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    const visitDate = new Date(year, month - 1, day, hours);
    const isoDate = visitDate.toISOString();

    const payload: VisitPayload = {
      address,
      date: isoDate,
      type: visitType.replace("-", " "),
      plan: "68033c17c6e62e6bad133d91",
      addsOnService: "680355ac9071138c9b14d1e0",
    };

    mutation.mutate(payload);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div>
            <DialogTitle>Schedule Visit</DialogTitle>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="House #, Block ##, City Name, State Name"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="day" className="text-xs">
                    Day
                  </Label>
                  <Select value={selectedDate} onValueChange={setSelectedDate}> {/* Use value prop */}
                    <SelectTrigger>
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 7 }).map((_, i) => {
                        const date = new Date();
                        date.setDate(date.getDate() + i);
                        const dateValue = date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
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

                <div>
                  <Label htmlFor="month" className="text-xs">
                    Month
                  </Label>
                  <Select value={selectedMonth} onValueChange={setSelectedMonth}> {/* Use value prop */}
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
                            {date.toLocaleString("en-US", { month: "long" })}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <h1>Available Time Slots</h1>

            <div className="grid grid-cols-5 gap-2">
              {timeSlots.map((time, i) => (
                <Button
                  key={i}
                  type="button"
                  size="sm"
                  className={
                    selectedTime === time
                      ? "bg-[#091057] text-white rounded-3xl"
                      : "text-xs py-1 px-2 rounded-3xl border-none bg-[#e6e7ee] text-[] hover:bg-[#091057] hover:text-white"
                  }
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-[#091057] hover:bg-[#091057] text-white"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Scheduling..." : "Schedule Visit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}