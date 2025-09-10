import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Plus, Calendar, Clock, MapPin, Users, MoreHorizontal, Search } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// todo: remove mock functionality
const mockEvents = [
  {
    id: 1,
    name: "Youth Service",
    date: "2024-09-15",
    time: "18:00",
    duration: "2 hours",
    location: "Main Sanctuary",
    description: "Weekly youth service with worship and teaching",
    expectedAttendees: 45,
    actualAttendees: 42,
    status: "Completed",
    type: "Service",
  },
  {
    id: 2,
    name: "Small Group - Teens",
    date: "2024-09-16",
    time: "19:30",
    duration: "1.5 hours",
    location: "Room 102",
    description: "Discussion and fellowship for teenage members",
    expectedAttendees: 12,
    actualAttendees: null,
    status: "Scheduled",
    type: "Small Group",
  },
  {
    id: 3,
    name: "Community Outreach",
    date: "2024-09-20",
    time: "10:00",
    duration: "4 hours",
    location: "Downtown Park",
    description: "Serving the community with food distribution",
    expectedAttendees: 25,
    actualAttendees: null,
    status: "Scheduled",
    type: "Outreach",
  },
  {
    id: 4,
    name: "Youth Retreat Planning",
    date: "2024-09-25",
    time: "14:00",
    duration: "3 hours",
    location: "Conference Room",
    description: "Planning meeting for upcoming youth retreat",
    expectedAttendees: 8,
    actualAttendees: null,
    status: "Scheduled",
    type: "Meeting",
  },
]

const eventFormSchema = z.object({
  name: z.string().min(2, "Event name must be at least 2 characters"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  duration: z.string().min(1, "Duration is required"),
  location: z.string().min(2, "Location is required"),
  type: z.string().min(1, "Event type is required"),
  description: z.string().optional(),
  expectedAttendees: z.string().min(1, "Expected attendees is required"),
})

export default function EventManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      name: "",
      date: "",
      time: "",
      duration: "",
      location: "",
      type: "",
      description: "",
      expectedAttendees: "",
    },
  })

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatusFilter = filterStatus === "all" || event.status.toLowerCase() === filterStatus
    const matchesTypeFilter = filterType === "all" || event.type.toLowerCase() === filterType
    return matchesSearch && matchesStatusFilter && matchesTypeFilter
  })

  const handleAddEvent = (values: z.infer<typeof eventFormSchema>) => {
    console.log("Add event:", values)
    // todo: implement actual event creation
    setIsAddDialogOpen(false)
    form.reset()
  }

  const handleEventAction = (action: string, eventId: number) => {
    console.log(`${action} for event ${eventId}`)
    // todo: implement actual event actions
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "scheduled": return "bg-chart-2 text-white"
      case "completed": return "bg-chart-1 text-white"
      case "cancelled": return "bg-chart-4 text-white"
      default: return "bg-muted"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "service": return "bg-primary text-primary-foreground"
      case "small group": return "bg-secondary text-secondary-foreground"
      case "outreach": return "bg-chart-3 text-white"
      case "meeting": return "bg-muted text-muted-foreground"
      default: return "bg-muted"
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold" data-testid="text-page-title">
            Event Management
          </h1>
          <p className="text-muted-foreground">
            Schedule and manage youth ministry events and activities.
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-event">
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
              <DialogDescription>
                Enter the event details below.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddEvent)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter event name" {...field} data-testid="input-event-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} data-testid="input-event-date" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} data-testid="input-event-time" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 2 hours" {...field} data-testid="input-event-duration" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter location" {...field} data-testid="input-event-location" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-event-type">
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="service">Service</SelectItem>
                          <SelectItem value="small group">Small Group</SelectItem>
                          <SelectItem value="outreach">Outreach</SelectItem>
                          <SelectItem value="meeting">Meeting</SelectItem>
                          <SelectItem value="social">Social</SelectItem>
                          <SelectItem value="retreat">Retreat</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="expectedAttendees"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expected Attendees</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter expected number" {...field} data-testid="input-event-attendees" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Event description..." {...field} data-testid="input-event-description" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1" data-testid="button-save-event">
                    Create Event
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search-events"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40" data-testid="select-filter-status">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-40" data-testid="select-filter-type">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="service">Service</SelectItem>
            <SelectItem value="small group">Small Group</SelectItem>
            <SelectItem value="outreach">Outreach</SelectItem>
            <SelectItem value="meeting">Meeting</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="hover-elevate">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div>
                    <CardTitle className="text-lg" data-testid={`text-event-name-${event.id}`}>
                      {event.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getStatusColor(event.status)} data-testid={`badge-status-${event.id}`}>
                        {event.status}
                      </Badge>
                      <Badge variant="outline" className={getTypeColor(event.type)}>
                        {event.type}
                      </Badge>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" data-testid={`button-event-menu-${event.id}`}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleEventAction('Edit', event.id)}>
                      Edit Event
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEventAction('Duplicate', event.id)}>
                      Duplicate Event
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEventAction('View Attendance', event.id)}>
                      View Attendance
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEventAction('Cancel', event.id)}>
                      Cancel Event
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span data-testid={`text-event-date-${event.id}`}>
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span data-testid={`text-event-time-${event.id}`}>
                    {event.time} ({event.duration})
                  </span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span data-testid={`text-event-location-${event.id}`}>
                    {event.location}
                  </span>
                </div>
              </div>
              
              {event.description && (
                <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                  {event.description}
                </p>
              )}

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span data-testid={`text-event-attendance-${event.id}`}>
                    {event.actualAttendees !== null 
                      ? `${event.actualAttendees}/${event.expectedAttendees} attended`
                      : `${event.expectedAttendees} expected`
                    }
                  </span>
                </div>
                {event.status === "Scheduled" && (
                  <Button 
                    size="sm" 
                    onClick={() => handleEventAction('Record Attendance', event.id)}
                    data-testid={`button-record-attendance-${event.id}`}
                  >
                    Record Attendance
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">No events found matching your criteria.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm("")
                setFilterStatus("all")
                setFilterType("all")
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}