"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VisitDetailsDialog } from "@/components/dashboard/visit-details-dialog"
import { Badge } from "@/components/ui/badge"
import { Eye,  Download } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import PaginationComponent from "@/components/Pagination/Pagination"

// Dummy data for visit boylogs (unchanged)


interface Staff {
  fullname: string;
  email: string;
}

interface Visit {
  id: string;
  visitCode: string;
  createdAt: string;
  updatedAt: string;
  staff: Staff | null; // Allow null to handle cases where staff is missing
  status: string;
  type: string;
  notes: string;
  issues?: string[] | null; // Optional, as it may not always be present
}

export default function VisitLogsPage() {

  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  console.log(currentPage);
  

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setPage(page) // Sync both states to ensure consistency
  }

  // const filteredVisits = visitLogs.filter((visit) => {
  //   const searchLower = searchQuery.toLowerCase()
  //   return (
  //     visit.client.name.toLowerCase().includes(searchLower) ||
  //     visit.visitType.toLowerCase().includes(searchLower) ||
  //     visit.status.toLowerCase().includes(searchLower) ||
  //     visit.date.toLowerCase().includes(searchLower)
  //   )
  // })

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const handleViewDetails = (visit: Visit) => {
    setSelectedVisit(visit);
    setIsDetailsOpen(true);
  };

  const { data: allLogs } = useQuery({
    queryKey: ["allVisits", page], 
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/visits/client/get-all-visits?page=${page}&limit=10`,
        {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDg4NTA4Yzk2ZDQ2ZDYyNTU3ZmQ4NCIsImlhdCI6MTc0NTM4OTQ0NSwiZXhwIjoxNzQ1OTk0MjQ1fQ.toHCcZ7DoT7WVLSvhYz_8_DUE1igGMup_CCpUjGbhsw",
          },
        }
      )
      if (!response.ok) {
        throw new Error("Failed to fetch live auctions")
      }
      const data = await response.json()
      return data
    },
  })
  console.log(allLogs);
  

  const { data } = useQuery({
    queryKey: ["completedVisits", page], 
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/visits/client/get-completed-visits-pagination?page=${page}&limit=10`,
        {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDg4NTA4Yzk2ZDQ2ZDYyNTU3ZmQ4NCIsImlhdCI6MTc0NTM4OTQ0NSwiZXhwIjoxNzQ1OTk0MjQ1fQ.toHCcZ7DoT7WVLSvhYz_8_DUE1igGMup_CCpUjGbhsw",
          },
        }
      )
      if (!response.ok) {
        throw new Error("Failed to fetch live auctions")
      }
      const data = await response.json()
      return data
    },
  })

  

  const { data: IssueFounded } = useQuery({
    queryKey: ["issueFounded", page],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/visits/client/get-completed-visits-with-issues?page=${page}&limit=10`,
        {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDg4NTA4Yzk2ZDQ2ZDYyNTU3ZmQ4NCIsImlhdCI6MTc0NTM4OTQ0NSwiZXhwIjoxNzQ1OTk0MjQ1fQ.toHCcZ7DoT7WVLSvhYz_8_DUE1igGMup_CCpUjGbhsw",
          },
        }
      )
      if (!response.ok) {
        throw new Error("Failed to fetch live auctions")
      }
      const data = await response.json()
      return data
    },
  })
  console.log(IssueFounded)

  return (
    <DashboardLayout title="Client Name" subtitle="Client Dashboard" userName="Name" userRole="Customer">
      <div className="space-y-4">
        <Tabs defaultValue="all-logs">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <TabsList>
              <TabsTrigger value="all-logs">All Logs</TabsTrigger>
              <TabsTrigger value="completed-visits">Completed Visits</TabsTrigger>
              <TabsTrigger value="issue-reported">Issue Founded</TabsTrigger>
            </TabsList>
            {/* <div className="flex w-full sm:w-auto gap-2">
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
            </div> */}
          </div>

          <TabsContent value="all-logs" className="mt-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Staff</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Visit Type</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allLogs?.data?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-4">
                        No visits found
                      </TableCell>
                    </TableRow>
                  ) : (
                    allLogs?.data?.map((visit) => (
                      <TableRow key={visit.id}>
                        <TableCell className="font-medium">{visit.visitCode}</TableCell>
                        <TableCell>
                          {new Date(visit.createdAt).toISOString().split("T")[0]}
                        </TableCell>
                        <TableCell>
                          {new Date(visit.updatedAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div>
                              <div className="font-medium">{visit.staff?.fullname || "N/A"}</div>
                              <div className="text-xs text-muted-foreground">
                                {visit.staff?.email || "N/A"}
                              </div>
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
                                  : visit.status === "confirmed"
                                    ? "secondary"
                                    : "outline"
                            }
                            className={
                              visit.status === "completed"
                                ? "bg-green-500 text-white"
                                : visit.status === "cancelled"
                                  ? "bg-red-500 text-white"
                                  : visit.status === "pending"
                                    ? "bg-yellow-500 text-yellow-950"
                                    : visit.status === "confirmed"
                                      ? "bg-blue-500 text-white"
                                      : ""
                            }
                          >
                            {visit.status.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>{visit.type}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{visit.notes}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleViewDetails(visit)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="mt-3">
              <PaginationComponent
                currentPage={allLogs?.pagination.currentPage || 1}
                totalPages={allLogs?.pagination.totalPages || 1}
                onPageChange={handlePageChange}
              />
            </div>
          </TabsContent>

          <TabsContent value="completed-visits">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Visit Time</TableHead>
                    <TableHead>Staff</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Issue</TableHead>
                    <TableHead>Visit Type</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.data.map((visit) => (
                    <TableRow key={visit.id}>
                      <TableCell className="font-medium">{visit.visitCode}</TableCell>
                      <TableCell>
                        {new Date(visit.createdAt).toISOString().split("T")[0]}
                      </TableCell>
                      <TableCell>
                        {new Date(visit.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div>
                            <div className="font-medium">{visit.staff.fullname}</div>
                            <div className="text-xs text-muted-foreground">{visit.staff.email}</div>
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
                              ? "bg-[#B3E9C9] text-black"
                              : visit.status === "cancelled"
                                ? "bg-red-500"
                                : "bg-yellow-500 text-yellow-950"
                          }
                        >
                          {visit.status.charAt(0).toUpperCase() + visit.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            !visit.issues || visit.issues.length === 0 ? "default" : "destructive"
                          }
                          className={
                            !visit.issues || visit.issues.length === 0
                              ? "bg-[#B3E9C9] text-black"
                              : "bg-[#E9BFBF] text-[red]"
                          }
                        >
                          {!visit.issues || visit.issues.length === 0 ? "No issue" : "Issue found"}
                        </Badge>
                      </TableCell>
                      <TableCell>{visit.type}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{visit.notes}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleViewDetails(visit)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-3">
              <h1>Current Page: {data?.pagination.currentPage}</h1>
              <PaginationComponent
                currentPage={data?.pagination.currentPage || 1}
                totalPages={data?.pagination.totalPages || 1}
                onPageChange={handlePageChange}
              />
            </div>
          </TabsContent>

          <TabsContent value="issue-reported">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Visit Time</TableHead>
                    <TableHead>Staff</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Issue</TableHead>
                    <TableHead>Visit Type</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {IssueFounded?.data.map((visit) => (
                    <TableRow key={visit.id}>
                      <TableCell className="font-medium">{visit.visitCode}</TableCell>
                      <TableCell>
                        {new Date(visit.createdAt).toISOString().split("T")[0]}
                      </TableCell>
                      <TableCell>
                        {new Date(visit.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div>
                            <div className="font-medium">{visit.staff.fullname}</div>
                            <div className="text-xs text-muted-foreground">{visit.staff.email}</div>
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
                              ? "bg-[#B3E9C9] text-black"
                              : visit.status === "cancelled"
                                ? "bg-red-500"
                                : "bg-yellow-500 text-yellow-950"
                          }
                        >
                          {visit.status.charAt(0).toUpperCase() + visit.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            !visit.issues || visit.issues.length === 0 ? "default" : "destructive"
                          }
                          className={


                            !visit.issues || visit.issues.length === 0
                              ? "bg-green-500"
                              : "bg-[#E9BFBF] text-[red]"
                          }
                        >
                          {!visit.issues || visit.issues.length === 0 ? "No issue" : "Issue found"}
                        </Badge>
                      </TableCell>
                      <TableCell>{visit.type}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{visit.notes}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleViewDetails(visit)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-3">
              <PaginationComponent
                currentPage={IssueFounded?.pagination.currentPage || 1}
                totalPages={IssueFounded?.pagination.totalPages || 1}
                onPageChange={handlePageChange}
              />
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