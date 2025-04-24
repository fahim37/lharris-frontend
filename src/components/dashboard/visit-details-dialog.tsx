"use client"

import { X } from "lucide-react"
import { toast } from "sonner"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface VisitDetailsDialogProps {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  visit: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function VisitDetailsDialog({ visit, open, onOpenChange }: VisitDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Visit Details</DialogTitle>
            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            {visit.date} | {visit.time} | {visit.client.name}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium">Status</h3>
              <Badge
                variant={
                  visit.status === "completed" ? "default" : visit.status === "cancelled" ? "destructive" : "outline"
                }
                className={
                  visit.status === "completed"
                    ? "bg-green-500 mt-1"
                    : visit.status === "cancelled"
                      ? "bg-red-500 mt-1"
                      : "bg-yellow-500 text-yellow-950 mt-1"
                }
              >
                {visit.status.charAt(0).toUpperCase() + visit.status.slice(1)}
              </Badge>
            </div>
            <div>
              <h3 className="text-sm font-medium">Visit Type</h3>
              <p className="text-sm mt-1">{visit.visitType}</p>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium">Address</h3>
            <p className="text-sm mt-1">House #, Block ##, City Name, State Name</p>
          </div>

          <div>
            <h3 className="text-sm font-medium">Staff Notes</h3>
            <p className="text-sm mt-1">{visit.notes}</p>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium">Checklist</h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <h4 className="text-xs font-medium">Items</h4>
                <div className="space-y-2 mt-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Doors</span>
                    <Badge className="bg-green-500">Passed</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Windows</span>
                    <Badge className="bg-green-500">Passed</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Perimeter</span>
                    <Badge className="bg-red-500">Failed</Badge>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-medium">Staff Notes</h4>
                <p className="text-xs mt-1">Security improvements requested for basement exterior lock.</p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium">Media Gallery</h3>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
                <span className="text-xs text-muted-foreground">Photo 1</span>
              </div>
              <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
                <span className="text-xs text-muted-foreground">Video 1</span>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button
            onClick={() => {
              toast.success("Report downloaded")
              onOpenChange(false)
            }}
          >
            Download Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
