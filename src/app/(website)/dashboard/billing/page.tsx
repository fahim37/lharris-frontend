"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Download, Check, Eye } from "lucide-react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import PaginationComponent from "@/components/Pagination/Pagination";
import { useSession } from "next-auth/react";

// Dummy data for payment history
const paymentHistory = [
  {
    id: "103",
    date: "Mar 15, 2025",
    time: "9:00 AM",
    amount: "$99.00",
    type: "Monthly Subscription",
    status: "Paid",
  },
  {
    id: "101",
    date: "Mar 15, 2025",
    time: "9:00 AM",
    amount: "$99.00",
    type: "Monthly Subscription",
    status: "Paid",
  },
];

// Dummy data for invoices
const invoices = [
  {
    id: "103",
    date: "Mar 15, 2025",
    time: "9:00 AM",
    amount: "$99.00",
    status: "Drafted",
  },
  {
    id: "101",
    date: "Mar 15, 2025",
    time: "9:00 AM",
    amount: "$99.00",
    status: "Drafted",
  },
];

// Subscription plans
const subscriptionPlans = [
  {
    name: "Basic",
    price: "$49",
    period: "/month",
    features: [
      "Weekly Visits",
      "Daily Savings",
      "Basic Reports",
      "1 User Access",
    ],
    current: false,
  },
  {
    name: "Professional",
    price: "$99",
    period: "/month",
    features: [
      "Daily Visits",
      "Weekly Reports",
      "SMS + Email Alerts",
      "Detailed Reports",
      "5 User Access",
      "24/7 Support",
    ],
    current: true,
  },
  {
    name: "Enterprise",
    price: "$199",
    period: "/month",
    features: [
      "Custom Schedule",
      "Unlimited Reports",
      "Priority Support",
      "Advanced Analytics",
      "Unlimited Users",
      "API Access",
      "Custom Integration",
    ],
    current: false,
  },
];

export default function BillingPage() {
  const [searchQuery] = useState("");

  // const [setActiveTab] = useState("payment-history");
  const [activeTab, setActiveTab] = useState("payment-history");
  console.log(activeTab);

  const session = useSession();
    const userInfo = session?.data?.user;
  
  // const [searchQuery, setSearchQuery] = useState("");

  const filteredPayments = paymentHistory.filter(() => {
    // const searchLower = searchQuery.toLowerCase();
    // return (
    //   payment.id.toLowerCase().includes(searchLower) ||
    //   payment.date.toLowerCase().includes(searchLower) ||
    //   payment.type.toLowerCase().includes(searchLower)
    // );
  });
  console.log(filteredPayments);

  const filteredInvoices = invoices.filter(() => {
    // const searchLower = searchQuery.toLowerCase();
    // return (
    //   invoice.id.toLowerCase().includes(searchLower) ||
    //   invoice.date.toLowerCase().includes(searchLower) ||
    //   invoice.status.toLowerCase().includes(searchLower)
    // );
  });

  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  console.log(currentPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setPage(page);
  };

  const { data } = useQuery({
    queryKey: ["pymentDetails", page],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/payments/paymentDetails/67f0b5e939baaffa730ffc11`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDg4NTA4Yzk2ZDQ2ZDYyNTU3ZmQ4NCIsImlhdCI6MTc0NTM4OTQ0NSwiZXhwIjoxNzQ1OTk0MjQ1fQ.toHCcZ7DoT7WVLSvhYz_8_DUE1igGMup_CCpUjGbhsw",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch live auctions");
      }
      const data = await response.json();
      return data;
    },
  });
  console.log(data);

  return (
    <DashboardLayout
      title="Client Name"
      subtitle="Client Dashboard"
      userName= {userInfo?.name}
      userRole={userInfo?.role}
    >
      {/* onValueChange={setActiveTab} */}
      <div className="space-y-6">
        <Tabs defaultValue="payment-history">
          <TabsList className="w-full max-w-md grid grid-cols-3">
            <TabsTrigger value="payment-history" className="rounded-full">
              Payment History
            </TabsTrigger>
            <TabsTrigger value="subscription" className="rounded-full">
              Subscription
            </TabsTrigger>
            <TabsTrigger value="invoices" className="rounded-full">
              Invoices
            </TabsTrigger>
          </TabsList>

          <TabsContent value="payment-history" className="mt-6">
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Amount</TableHead>
                    {/* <TableHead>Type</TableHead> */}
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.data.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">
                        {/* {payment.id} */}
                        {"225"}
                      </TableCell>
                      <TableCell>
                        {" "}
                        {
                          new Date(payment.createdAt)
                            .toISOString()
                            .split("T")[0]
                        }
                      </TableCell>

                      <TableCell>
                        {new Date(payment.createdAt).toLocaleTimeString()}
                      </TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      {/* <TableCell>{payment.type}</TableCell> */}
                      <TableCell>
                        <Badge className=" bg-[#B3E9C9] text-black">
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toast.info("View payment details")}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toast.success("Receipt downloaded")}
                          >
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
                currentPage={data?.pagination.currentPage || 1}
                totalPages={data?.pagination.totalPages || 1}
                onPageChange={handlePageChange}
              />
            </div>
          </TabsContent>

          <TabsContent value="subscription" className="mt-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">
                Powerful features for powerful creators
              </h2>
              <p className="text-muted-foreground">
                Choose a plan that&apos;s right for you
              </p>

              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded-full border border-primary mr-2 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <span>Pay Monthly</span>
                </div>
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded-full border border-muted-foreground mr-2"></div>
                  <span>Pay Yearly</span>
                </div>
                <div className="flex items-center text-sm text-primary">
                  <span>Save 25%</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subscriptionPlans.map((plan) => (
                <Card
                  key={plan.name}
                  className="overflow-hidden border-2 rounded-xl"
                >
                  <div className="p-6 bg-secondary text-secondary-foreground">
                    <h3 className="font-medium mb-2">{plan.name}</h3>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-sm ml-1">{plan.period}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full mt-6 ${
                        plan.current
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-primary text-primary-foreground"
                      }`}
                      onClick={() =>
                        toast.info(
                          plan.current
                            ? "This is your current plan"
                            : `Switching to ${plan.name} plan`
                        )
                      }
                    >
                      {plan.current ? "Current Plan" : "Choose Plan"}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="invoices" className="mt-6">
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        {invoice.id}
                      </TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.time}</TableCell>
                      <TableCell>{invoice.amount}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500 text-white">
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toast.info("View invoice details")}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toast.success("Invoice downloaded")}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-between py-4">
              <div className="text-sm text-muted-foreground">
                Showing 1 to {filteredInvoices.length} of 24 results
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" disabled>
                  <span className="sr-only">Go to previous page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  1
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0 bg-primary text-primary-foreground"
                >
                  2
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  3
                </Button>
                <Button variant="outline" size="icon">
                  <span className="sr-only">Go to next page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
