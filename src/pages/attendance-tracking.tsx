import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { UserCheck, UserX, Calendar, Search, Save, Clock } from "lucide-react"

// todo: remove mock functionality
const mockEvents = [
  { id: 1, name: "Youth Service", date: "2024-09-15", time: "18:00" },
  { id: 2, name: "Small Group - Teens", date: "2024-09-16", time: "19:30" },
  { id: 3, name: "Community Outreach", date: "2024-09-20", time: "10:00" },
]

const mockMembers = [
  { id: 1, name: "Alex Thompson", avatar: "", status: "present" },
  { id: 2, name: "Emma Rodriguez", avatar: "", status: "present" },
  { id: 3, name: "Jordan Kim", avatar: "", status: "absent" },
  { id: 4, name: "Morgan Davis", avatar: "", status: "late" },
  { id: 5, name: "Riley Chen", avatar: "", status: "present" },
  { id: 6, name: "Casey Williams", avatar: "", status: "present" },
]

export default function AttendanceTracking() {
  const [selectedEvent, setSelectedEvent] = useState("1")
  const [searchTerm, setSearchTerm] = useState("")
  const [attendance, setAttendance] = useState(
    mockMembers.reduce((acc, member) => ({
      ...acc,
      [member.id]: member.status
    }), {} as Record<number, string>)
  )
  const [eventNotes, setEventNotes] = useState("")

  const selectedEventData = mockEvents.find(e => e.id.toString() === selectedEvent)
  const filteredMembers = mockMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAttendanceChange = (memberId: number, status: string) => {
    setAttendance(prev => ({ ...prev, [memberId]: status }))
    console.log(`Member ${memberId} marked as ${status}`)
  }

  const handleSaveAttendance = () => {
    console.log("Saving attendance:", { eventId: selectedEvent, attendance, notes: eventNotes })
    // todo: implement actual attendance saving
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return <Badge className="bg-chart-1 text-white">Present</Badge>
      case "absent":
        return <Badge variant="destructive">Absent</Badge>
      case "late":
        return <Badge className="bg-chart-2 text-white">Late</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const attendanceStats = {
    present: Object.values(attendance).filter(status => status === "present").length,
    absent: Object.values(attendance).filter(status => status === "absent").length,
    late: Object.values(attendance).filter(status => status === "late").length,
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold" data-testid="text-page-title">
            Attendance Tracking
          </h1>
          <p className="text-muted-foreground">
            Record attendance for events and services.
          </p>
        </div>
        <Button onClick={handleSaveAttendance} data-testid="button-save-attendance">
          <Save className="h-4 w-4 mr-2" />
          Save Attendance
        </Button>
      </div>

      {/* Event Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Select Event
          </CardTitle>
          <CardDescription>Choose the event to record attendance for</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Select value={selectedEvent} onValueChange={setSelectedEvent}>
              <SelectTrigger className="flex-1" data-testid="select-event">
                <SelectValue placeholder="Select an event" />
              </SelectTrigger>
              <SelectContent>
                {mockEvents.map((event) => (
                  <SelectItem key={event.id} value={event.id.toString()}>
                    {event.name} - {new Date(event.date).toLocaleDateString()} at {event.time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedEventData && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{selectedEventData.time}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Attendance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex items-center gap-3 p-6">
            <UserCheck className="h-8 w-8 text-chart-1" />
            <div>
              <p className="text-2xl font-bold" data-testid="metric-present">
                {attendanceStats.present}
              </p>
              <p className="text-sm text-muted-foreground">Present</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-6">
            <Clock className="h-8 w-8 text-chart-2" />
            <div>
              <p className="text-2xl font-bold" data-testid="metric-late">
                {attendanceStats.late}
              </p>
              <p className="text-sm text-muted-foreground">Late</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-6">
            <UserX className="h-8 w-8 text-destructive" />
            <div>
              <p className="text-2xl font-bold" data-testid="metric-absent">
                {attendanceStats.absent}
              </p>
              <p className="text-sm text-muted-foreground">Absent</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Member Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
          data-testid="input-search-members"
        />
      </div>

      {/* Member Attendance List */}
      <Card>
        <CardHeader>
          <CardTitle>Member Attendance</CardTitle>
          <CardDescription>Mark attendance for each member</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredMembers.map((member) => (
              <div 
                key={member.id} 
                className="flex items-center justify-between p-3 border rounded-md hover-elevate"
                data-testid={`member-row-${member.id}`}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium" data-testid={`text-member-name-${member.id}`}>
                      {member.name}
                    </p>
                    {getStatusBadge(attendance[member.id] || "absent")}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant={attendance[member.id] === "present" ? "default" : "outline"}
                    onClick={() => handleAttendanceChange(member.id, "present")}
                    data-testid={`button-present-${member.id}`}
                  >
                    Present
                  </Button>
                  <Button
                    size="sm"
                    variant={attendance[member.id] === "late" ? "default" : "outline"}
                    onClick={() => handleAttendanceChange(member.id, "late")}
                    data-testid={`button-late-${member.id}`}
                  >
                    Late
                  </Button>
                  <Button
                    size="sm"
                    variant={attendance[member.id] === "absent" ? "destructive" : "outline"}
                    onClick={() => handleAttendanceChange(member.id, "absent")}
                    data-testid={`button-absent-${member.id}`}
                  >
                    Absent
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Event Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Event Notes</CardTitle>
          <CardDescription>Add any additional notes about this event</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter notes about the event, highlights, concerns, etc..."
            value={eventNotes}
            onChange={(e) => setEventNotes(e.target.value)}
            className="min-h-24"
            data-testid="textarea-event-notes"
          />
        </CardContent>
      </Card>
    </div>
  )
}