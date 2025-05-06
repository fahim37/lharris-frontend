"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VisitDetailsDialog } from "@/components/dashboard/visit-details-dialog"
import { Badge } from "@/components/ui/badge"
import { Eye, Download } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import PaginationComponent from "@/components/Pagination/Pagination"
import { useSession } from "next-auth/react"

interface Visit {
  _id: string
  visitId: string
  visitCode: string
  createdAt: string
  updatedAt: string
  staff: {
    fullname: string
    email: string
  } | null
  status: string
  type: string
  notes: string
  issues?: Array<{
    place: string
    issue: string
    type: string
  }> | null
}

interface IssuesCount {
  totalIssues: number
  resolvedIssues: number
  pendingIssues: number
}

export default function VisitLogsPage() {
  const [selectedVisit, setSelectedVisit] = useState<string | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const session = useSession()
  const token = session.data?.accessToken
  const userInfo = session?.data?.user

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleViewDetails = (visit: Visit) => {
    setSelectedVisit(visit._id)
    setIsDetailsOpen(true)
  }

  // Fetch all visits
  const { data: allLogs, isLoading: allLogsLoading } = useQuery({
    queryKey: ["allVisits", currentPage],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/visits/get-all-visit?page=${currentPage}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      if (!response.ok) {
        throw new Error("Failed to fetch visits")
      }
      return await response.json()
    },
    enabled: !!token,
  })

  // Fetch completed visits
  const { data: completedVisits, isLoading: completedVisitsLoading } = useQuery({
    queryKey: ["completedVisits", currentPage],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/visits/get-completed-visits?page=${currentPage}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      if (!response.ok) {
        throw new Error("Failed to fetch completed visits")
      }
      return await response.json()
    },
    enabled: !!token,
  })

  // Fetch visits with issues
  const { data: issueFounded, isLoading: issuesLoading } = useQuery({
    queryKey: ["issueFounded", currentPage],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/visits/get-completed-visits?page=${currentPage}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      if (!response.ok) {
        throw new Error("Failed to fetch visits with issues")
      }
      return await response.json()
    },
    enabled: !!token,
  })

  // Fetch issues count
  const { data: issuesCount, isLoading: issuesCountLoading } = useQuery<{ data: IssuesCount }>({
    queryKey: ["issuesCount"],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/visits/get-all-issues-count`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        throw new Error("Failed to fetch issues count")
      }
      return await response.json()
    },
    enabled: !!token,
  })

  // Safely get pagination data with defaults
  const getAllLogsPagination = () => ({
    currentPage: allLogs?.pagination?.currentPage || 1,
    totalPages: allLogs?.pagination?.totalPages || 1,
  })

  const getCompletedVisitsPagination = () => ({
    currentPage: completedVisits?.pagination?.currentPage || 1,
    totalPages: completedVisits?.pagination?.totalPages || 1,
  })

  const getIssueFoundedPagination = () => ({
    currentPage: issueFounded?.pagination?.currentPage || 1,
    totalPages: issueFounded?.pagination?.totalPages || 1,
  })

  const isLoading = allLogsLoading || completedVisitsLoading || issuesLoading || issuesCountLoading

  if (isLoading) {
    return (
      <DashboardLayout
        title="Client Name"
        subtitle="Client Dashboard"
        userName={userInfo?.name}
        userRole={userInfo?.role}
      >
        <div className="flex justify-center items-center h-64">
          <p>Loading visit logs...</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout
      title="Client Name"
      subtitle="Client Dashboard"
      userName={userInfo?.name}
      userRole={userInfo?.role}
    >
      <div className="space-y-4">
        {/* Issues Count Summary */}
        {issuesCount?.data && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">Total Issues</h3>
              <p className="text-2xl font-bold">{issuesCount.data.totalIssues || 0}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">Resolved Issues</h3>
              <p className="text-2xl font-bold">{issuesCount.data.resolvedIssues || 0}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">Pending Issues</h3>
              <p className="text-2xl font-bold">{issuesCount.data.pendingIssues || 0}</p>
            </div>
          </div>
        )}

        <Tabs defaultValue="all-logs">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <TabsList>
              <TabsTrigger value="all-logs">All Logs</TabsTrigger>
              <TabsTrigger value="completed-visits">Completed Visits</TabsTrigger>
              <TabsTrigger value="issue-reported">
                Issue Founded {issuesCount?.data?.totalIssues ? `(${issuesCount.data.totalIssues})` : ""}
              </TabsTrigger>
            </TabsList>
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
                    allLogs?.data?.map((visit: Visit) => (
                      <TableRow key={visit._id}>
                        <TableCell className="font-medium">{visit.visitId}</TableCell>
                        <TableCell>{new Date(visit.createdAt).toISOString().split("T")[0]}</TableCell>
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
                              <div className="text-xs text-muted-foreground">{visit.staff?.email || "N/A"}</div>
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
                                ? "bg-[#B3E9C9] text-black"
                                : visit.status === "cancelled"
                                  ? "bg-[#E9BFBF] text-black"
                                  : visit.status === "pending"
                                    ? "bg-[#F7E39F] text-black"
                                    : visit.status === "confirmed"
                                      ? "bg-[#B3E9C9] text-black"
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
                            <Button variant="ghost" size="icon" onClick={() => handleViewDetails(visit)}>
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
                totalItems={allLogs?.pagination?.totalItems || 0}
                itemsPerPage={allLogs?.pagination?.itemsPerPage || 10}
                currentPage={getAllLogsPagination().currentPage}
                totalPages={getAllLogsPagination().totalPages}
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
                  {completedVisits?.data?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-4">
                        No completed visits found
                      </TableCell>
                    </TableRow>
                  ) : (
                    completedVisits?.data?.map((visit: Visit) => (
                      <TableRow key={visit._id}>
                        <TableCell className="font-medium">{visit.visitCode}</TableCell>
                        <TableCell>{new Date(visit.createdAt).toISOString().split("T")[0]}</TableCell>
                        <TableCell>
                          {new Date(visit.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div>
                              <div className="font-medium">{visit.staff?.fullname || "N/A"}</div>
                              <div className="text-xs text-muted-foreground">{visit?.staff?.email || "N/A"}</div>
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
                                  ? "bg-[#E9BFBF] text-black"
                                  : visit.status === "pending"
                                    ? "bg-[#F7E39F] text-black"
                                    : visit.status === "confirmed"
                                      ? "bg-[#B3E9C9] text-black"
                                      : ""
                            }
                          >
                            {visit.status.charAt(0).toUpperCase() + visit.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={!visit.issues || visit.issues.length === 0 ? "default" : "destructive"}
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
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="mt-3">
              <PaginationComponent
                totalItems={completedVisits?.pagination?.totalItems || 0}
                itemsPerPage={completedVisits?.pagination?.itemsPerPage || 10}
                currentPage={getCompletedVisitsPagination().currentPage}
                totalPages={getCompletedVisitsPagination().totalPages}
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
                  {issueFounded?.data?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-4">
                        No visits with issues found
                      </TableCell>
                    </TableRow>
                  ) : (
                    issueFounded?.data?.map((visit: Visit) => (
                      <TableRow key={visit._id}>
                        <TableCell className="font-medium">{visit.visitCode}</TableCell>
                        <TableCell>{new Date(visit.createdAt).toISOString().split("T")[0]}</TableCell>
                        <TableCell>
                          {new Date(visit.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div>
                              <div className="font-medium">{visit.staff?.fullname || "N/A"}</div>
                              <div className="text-xs text-muted-foreground">{visit.staff?.email || "N/A"}</div>
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
                                  ? "bg-[#E9BFBF] text-black"
                                  : visit.status === "pending"
                                    ? "bg-[#F7E39F] text-black"
                                    : visit.status === "confirmed"
                                      ? "bg-[#B3E9C9] text-black"
                                      : ""
                            }
                          >
                            {visit.status.charAt(0).toUpperCase() + visit.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={!visit.issues || visit.issues.length === 0 ? "default" : "destructive"}
                            className={
                              !visit.issues || visit.issues.length === 0
                                ? "bg-[#B3E9C9] text-black"
                                : "bg-[#E9BFBF] text-black"
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
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="mt-3">
              <PaginationComponent
                totalItems={issueFounded?.pagination?.totalItems || 0}
                itemsPerPage={issueFounded?.pagination?.itemsPerPage || 10}
                currentPage={getIssueFoundedPagination().currentPage}
                totalPages={getIssueFoundedPagination().totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {selectedVisit && (
        <VisitDetailsDialog visitId={selectedVisit} open={isDetailsOpen} onOpenChange={setIsDetailsOpen} />
      )}
    </DashboardLayout>
  )
}
