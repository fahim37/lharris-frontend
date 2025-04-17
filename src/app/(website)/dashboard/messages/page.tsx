"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search, Send } from "lucide-react"
import { toast } from "sonner"

// Dummy data for messages
const messageHistory = [
  {
    id: "001",
    sender: "John Doe",
    content: "Hi, I have a question...",
    timestamp: "10:15 AM",
    isUser: false,
  },
  {
    id: "002",
    sender: "John Doe",
    content: "Hi, I have a question...",
    timestamp: "10:15 AM",
    isUser: false,
  },
  {
    id: "003",
    sender: "You",
    content: "Hi, Mandy",
    timestamp: "09:41 AM",
    isUser: true,
  },
  {
    id: "004",
    sender: "You",
    content: "I've tried the app.",
    timestamp: "09:41 AM",
    isUser: true,
  },
  {
    id: "005",
    sender: "John Doe",
    content: "Really?",
    timestamp: "09:42 AM",
    isUser: false,
  },
]

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState(messageHistory)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: "You",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isUser: true,
    }

    setMessages([...messages, newMsg])
    setNewMessage("")
    toast.success("Message sent")
  }

  return (
    <DashboardLayout title="Client Name" subtitle="Client Dashboard" userName="Name" userRole="Customer">
      <div className="flex flex-col h-[calc(100vh-8rem)]">
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search messages..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Card className="flex flex-1 flex-col overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 h-full">
            <div className="border-r hidden md:block">
              <div className="p-4 border-b">
                <Input type="search" placeholder="Search Message..." className="w-full" />
              </div>
              <div className="overflow-auto h-[calc(100%-4rem)]">
                {messageHistory.slice(0, 2).map((msg) => (
                  <div key={msg.id} className="flex items-start gap-3 p-4 hover:bg-muted/50 cursor-pointer border-b">
                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground">
                      {msg.sender.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-sm">{msg.sender}</h3>
                        <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-2 flex flex-col h-full">
              <div className="p-4 border-b flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground">
                  J
                </div>
                <div>
                  <h3 className="font-medium">John Doe</h3>
                </div>
              </div>

              <div className="flex-1 overflow-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] px-4 py-2 rounded-lg ${
                        msg.isUser ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <div
                        className={`text-xs mt-1 ${
                          msg.isUser ? "text-primary-foreground/70" : "text-muted-foreground"
                        }`}
                      >
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                  <Input
                    placeholder="Type your message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-10 w-10"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
