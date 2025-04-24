"use client";

import { X } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

interface MediaViewerDialogProps {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  media: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MediaViewerDialog({
  media,
  open,
  onOpenChange,
}: MediaViewerDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>{media.title}</DialogTitle>
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
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            {media.date} | {media.time}
          </div>

          <div className="aspect-video bg-black rounded-md overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <Image
                src={media.thumbnail || "/placeholder.svg"}
                alt={media.title}
                className="object-contain max-w-full max-h-full"
                fill
              />
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium">Additional Details</h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="text-sm">
                  {media.status.charAt(0).toUpperCase() + media.status.slice(1)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Type</p>
                <p className="text-sm">
                  {media.type.charAt(0).toUpperCase() + media.type.slice(1)}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium">Description</h3>
            <p className="text-sm mt-1">
              This {media.type} was recorded during a security check on{" "}
              {media.date}. No incidents were detected during this recording.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button
            onClick={() => {
              toast.success(
                `${
                  media.type.charAt(0).toUpperCase() + media.type.slice(1)
                } downloaded`
              );
              onOpenChange(false);
            }}
          >
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
