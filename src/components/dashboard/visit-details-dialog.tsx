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
import Image from "next/image";

// Define interfaces
interface Media {
  type: string;
  url: string;
  _id: string;
}

interface Issue {
  place: string;
  issue: string;
  issueDate: string;
  type: string;
  media: Media[];
  notes: string;
  _id: string;
}

interface Staff {
  _id: string;
  fullname: string;
  email: string;
  role: string;
}

interface Visit {
  _id: string;
  client: string;
  staff: Staff | string | null;
  address: string;
  date: string;
  status: string;
  cancellationReason: string;
  type: string;
  notes: string;
  issues: Issue[];
  isPaid: boolean;
  createdAt?: string;
  time?: string;
  report?: string;
}

interface VisitDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  visitId: string;
}

export function VisitDetailsDialog({
  open,
  onOpenChange,
  visitId,
}: VisitDetailsDialogProps) {
  const { data: session } = useSession();
  const token = session?.accessToken;

  const { data: visit, isLoading, error } = useQuery<{ data: Visit }>({
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

  if (error || !visit?.data) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Error</DialogTitle>
          </DialogHeader>
          <div className="mt-7">
            <h2 className="text-[24px] text-[#091057] font-bold">
              Visit Not Found
            </h2>
            <p className="text-base text-[#595959]">
              {error ? error.message : "Unable to load visit details"}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const visitData = visit.data;
  const staffName = typeof visitData.staff === 'object' ? visitData.staff?.fullname : 'N/A';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Visit Details</DialogTitle>
        </DialogHeader>
        <div className="mt-7">
          <div className="flex justify-between items-center">
            <h2 className="text-[24px] text-[#091057] font-bold">
              {visitData.date
                ? format(new Date(visitData.date), "MMMM d, yyyy")
                : "N/A"}
            </h2>
            <button
              className="bg-[#091057] text-white rounded-full p-2 hover:bg-[#0a1269] transition-colors"
              onClick={() =>
                toast("Delete functionality is not yet implemented")
              }
              aria-label="Delete visit"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex justify-between mt-4">
            <div className="space-y-5">
              <p className="text-base font-semibold text-[#595959]">Status:</p>
              <p className="text-base font-semibold text-[#595959]">Type:</p>
              <p className="text-base font-semibold text-[#595959]">Staff:</p>
              <p className="text-base font-semibold text-[#595959]">Address:</p>
              <p className="text-base font-semibold text-[#595959]">Notes:</p>
              <p className="text-base font-semibold text-[#595959]">Payment Status:</p>
            </div>
            <div className="space-y-5">
              <p className="text-base font-semibold text-[#595959]">
                {visitData.status ? visitData.status.charAt(0).toUpperCase() + visitData.status.slice(1) : "N/A"}
              </p>
              <p className="text-base font-semibold text-[#595959]">
                {visitData.type ? visitData.type.charAt(0).toUpperCase() + visitData.type.slice(1) : "N/A"}
              </p>
              <p className="text-base font-semibold text-[#595959]">
                {staffName}
              </p>
              <p className="text-base font-semibold text-[#595959]">
                {visitData.address || "N/A"}
              </p>
              <p className="text-base font-semibold text-[#595959]">
                {visitData.notes || "N/A"}
              </p>
              <p className="text-base font-semibold text-[#595959]">
                {visitData.isPaid ? "Paid" : "Unpaid"}
              </p>
            </div>
          </div>

          {visitData.issues && visitData.issues.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-bold text-[#091057] mb-4">Issues Found</h3>
              {visitData.issues.map((issue) => (
                <div key={issue._id} className="mb-6 p-4 border rounded-lg">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold text-[#595959]">Place:</p>
                      <p className="text-base">{issue.place}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#595959]">Issue Type:</p>
                      <p className="text-base">{issue.type}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#595959]">Issue Date:</p>
                      <p className="text-base">
                        {format(new Date(issue.issueDate), "MMMM d, yyyy h:mm a")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#595959]">Issue:</p>
                      <p className="text-base">{issue.issue}</p>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <p className="text-sm font-semibold text-[#595959]">Notes:</p>
                    <p className="text-base">{issue.notes}</p>
                  </div>
                  
                  {issue.media && issue.media.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-semibold text-[#595959] mb-2">Media:</p>
                      <div className="flex flex-wrap gap-2">
                        {issue.media.map((mediaItem) => (
                          <div key={mediaItem._id} className="relative w-24 h-24 border rounded-md overflow-hidden">
                            {mediaItem.type === 'photo' ? (
                              <Image
                                src={mediaItem.url}
                                alt="Issue photo"
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <video className="w-full h-full object-cover">
                                <source src={mediaItem.url} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
