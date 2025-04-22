"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VisitDetailsDialog } from "@/components/dashboard/visit-details-dialog"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Eye, Edit } from "lucide-react"

// Dummy data for visit logs
const visitLogs = [
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
    notes: "Visit completed on time, all systems checked and functioning properly.",
    actions: ["view", "edit"],
  },
  {
    id: "002",
    date: "Mar 16, 2025",
    time: "9:00 AM",
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
    time: "9:00 AM",
    client: {
      name: "Sarah Wilson",
      email: "sarah@example.com",
    },
    status: "pending",
    visitType: "Routine Check",
    notes: "All devices working normally.",
    actions: ["view", "edit"],
  },
]

export default function VisitLogsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedVisit, setSelectedVisit] = useState<any>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const filteredVisits = visitLogs.filter((visit) => {
    const searchLower = searchQuery.toLowerCase()
    return (
      visit.client.name.toLowerCase().includes(searchLower) ||
      visit.visitType.toLowerCase().includes(searchLower) ||
      visit.status.toLowerCase().includes(searchLower) ||
      visit.date.toLowerCase().includes(searchLower)
    )
  })

  const handleViewDetails = (visit: any) => {
    setSelectedVisit(visit)
    setIsDetailsOpen(true)
  }

  return (
    <DashboardLayout title="Client Name" subtitle="Client Dashboard" userName="Name" userRole="Customer">
      <div className="space-y-4">
        <Tabs defaultValue="all-logs">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <TabsList>
              <TabsTrigger value="all-logs">All Logs</TabsTrigger>
              <TabsTrigger value="completed-visits">Completed Visits</TabsTrigger>
              <TabsTrigger value="issue-reported">Issue Reported</TabsTrigger>
            </TabsList>
            <div className="flex w-full sm:w-auto gap-2">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search visits..."
                  className="pl-8 w-full sm:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="all-logs" className="mt-4">
            <div className="rounded-md border">
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
                  {filteredVisits.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-4">
                        No visits found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredVisits.map((visit) => (
                      <TableRow key={visit.id}>
                        <TableCell className="font-medium">{visit.id}</TableCell>
                        <TableCell>{visit.date}</TableCell>
                        <TableCell>{visit.time}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground">
                              {visit.client.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium">{visit.client.name}</div>
                              <div className="text-xs text-muted-foreground">{visit.client.email}</div>
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
                            {visit.status.charAt(0).toUpperCase() + visit.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{visit.visitType}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{visit.notes}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleViewDetails(visit)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
              <div className="text-sm text-muted-foreground">
                Showing 1 to {filteredVisits.length} of {filteredVisits.length} results
              </div>
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="completed-visits">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Visit Type</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVisits
                    .filter((visit) => visit.status === "completed")
                    .map((visit) => (
                      <TableRow key={visit.id}>
                        <TableCell className="font-medium">{visit.id}</TableCell>
                        <TableCell>{visit.date}</TableCell>
                        <TableCell>{visit.time}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground">
                              {visit.client.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium">{visit.client.name}</div>
                              <div className="text-xs text-muted-foreground">{visit.client.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{visit.visitType}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{visit.notes}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleViewDetails(visit)}>
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
          </TabsContent>

          <TabsContent value="issue-reported">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Visit Type</TableHead>
                    <TableHead>Issue</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No issues reported
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {selectedVisit && (
        <VisitDetailsDialog visit={selectedVisit} open={isDetailsOpen} onOpenChange={setIsDetailsOpen} />
      )}
    </DashboardLayout>
  )
}
