"use client";

import type React from "react";
import { useState } from "react";
import { X } from "lucide-react";
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

interface ScheduleVisitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface VisitPayload {
  address: string;
  date: string;
  type: string;
  plan: string;
  addsOnService: string;
}

const createVisit = async (data: VisitPayload) => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDg4NTA4Yzk2ZDQ2ZDYyNTU3ZmQ4NCIsImlhdCI6MTc0NTM4ODg2OCwiZXhwIjoxNzQ1OTkzNjY4fQ.jpYRAndRR3RW2FkXYJ-TGkVe_UAQS7RwUPreGbFW6Hg";

  const response = await fetch(
    "http://localhost:5100/api/v1/visits/client/create-visit",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to schedule visit");
  }

  return response.json();
};

export function ScheduleVisitDialog({
  open,
  onOpenChange,
}: ScheduleVisitDialogProps) {
  const [visitType, setVisitType] = useState("routine-check");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  console.log(selectedMonth);
  
  const [selectedTime, setSelectedTime] = useState("");
  const [address, setAddress] = useState("");

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

  // TanStack Query mutation
  const mutation = useMutation({
    mutationFn: createVisit,
    onSuccess: () => {
      toast.success("Visit scheduled successfully!");
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
    let [hours, ] = time.split(":").map(Number);

    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    const visitDate = new Date(year, month - 1, day, hours, );
    const isoDate = visitDate.toISOString();

    const payload: VisitPayload = {
      address,
      date: isoDate,
      type: visitType.replace("-", " "), // Convert "routine-check" to "routine check"
      plan: "68033c17c6e62e6bad133d91", // Hardcoded as per your example
      addsOnService: "680355ac9071138c9b14d1e0", // Hardcoded as per your example
    };

    // Trigger the mutation
    mutation.mutate(payload);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Schedule Visit</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <Select value={visitType} onValueChange={setVisitType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select visit type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="routine-check">Routine Check</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                  <SelectItem value="installation">Installation</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
              <Label>Available Time Slots</Label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="day" className="text-xs">
                    Day
                  </Label>
                  <Select onValueChange={setSelectedDate}>
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
                  <Select onValueChange={setSelectedMonth}>
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
            <div className="grid grid-cols-5 gap-2">
              {timeSlots.map((time, i) => (
                <Button
                  key={i}
                  type="button"
                  variant={selectedTime === time ? "default" : "outline"}
                  size="sm"
                  className={
                    selectedTime === time
                      ? "bg-primary text-primary-foreground"
                      : ""
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
              className="bg-primary text-primary-foreground hover:bg-primary/90"
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