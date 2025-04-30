"use client";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

<<<<<<< HEAD
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface VisitDetailsDialogProps {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  visit: any
  open: boolean
  onOpenChange: (open: boolean) => void
=======
// Define interfaces
interface Staff {
  _id: string;
  fullname: string;
  email: string;
  role: string;
>>>>>>> 03992f111b5644ff250dc76dcb484fddebff671d
}

interface Visit {
  _id: string;
  createdAt: string;
  time: string;
  staff: Staff | null;
  status: string;
  type: string;
  notes: string;
  address: string;
  report: string;
  data:[]
}

interface VisitDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  visitId: string;
}

export function VisitDetailsDialog({ open, onOpenChange, visitId }: VisitDetailsDialogProps) {
  const { data: session } = useSession();
  const token = session?.accessToken;

  const { data: visit, isLoading, error } = useQuery<Visit>({
    queryKey: ["visit", visitId],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/visits/get-visit/${visitId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch visit details");
      }

      return response.json();
    },
    enabled: !!token && !!visitId,
  });
  console.log(visit?.data);
  // const visitData = visit?.data.map((item) => item) ;
  // console.log(visitData); 
  
  

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Loading Visit Details</DialogTitle>
          </DialogHeader>
          <div className="mt-7 flex justify-center">
            <p className="text-base text-[#595959]">Loading visit details...</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (error || !visit) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Error</DialogTitle>
          </DialogHeader>
          <div className="mt-7">
            <h2 className="text-[24px] text-[#091057] font-bold">Visit Not Found</h2>
            <p className="text-base text-[#595959]">
              {error ? error.message : "Unable to load visit details"}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Visit Details</DialogTitle>
        </DialogHeader>
        <div className="mt-7">
          <div className="flex justify-between items-center">
            <h2 className="text-[24px] text-[#091057] font-bold">
              {visit.createdAt
                ? format(new Date(visit.createdAt), "MMMM d, yyyy")
                : "N/A"}
            </h2>
            <button
              className="bg-[#091057] text-white rounded-full p-2 hover:bg-[#0a1269] transition-colors"
              onClick={() => toast("Delete functionality is not yet implemented")}
              aria-label="Delete visit"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
          <div className="flex justify-between mt-4">
            <div className="space-y-5">
              <p className="text-base font-semibold text-[#595959]">Time:</p>
              <p className="text-base font-semibold text-[#595959]">Staff:</p>
              <p className="text-base font-semibold text-[#595959]">Status:</p>
              <p className="text-base font-semibold text-[#595959]">Type:</p>
              <p className="text-base font-semibold text-[#595959]">Notes:</p>
              <p className="text-base font-semibold text-[#595959]">Address:</p>
              <p className="text-base font-semibold text-[#595959]">Report:</p>
            </div>
            <div className="space-y-5">
              <p className="text-base font-semibold text-[#595959]">
                {visit.time || "N/A"}
              </p>
              <p className="text-base font-semibold text-[#595959]">
                {visit.staff?.fullname || "N/A"}
              </p>
              <p className="text-base font-semibold text-[#595959]">
                {visit.status || "N/A"}
              </p>
              <p className="text-base font-semibold text-[#595959]">
                {visit.type || "N/A"}
              </p>
              <p className="text-base font-semibold text-[#595959]">
                {visit.notes || "N/A"}
              </p>
              <p className="text-base font-semibold text-[#595959]">
                {visit.address || "N/A"}
              </p>
              <p className="text-base font-semibold text-[#595959]">
                {visit.report || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}