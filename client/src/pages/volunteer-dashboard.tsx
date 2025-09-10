import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UserCheck, Calendar, Clock, CheckCircle } from "lucide-react"

// todo: remove mock functionality
const mockTodayEvents = [
  {
    id: 1,
    name: "Youth Service",
    time: "6:00 PM - 8:00 PM",
    location: "Main Sanctuary",
    attendanceRecorded: false,
    expectedAttendees: 45,
  },
  {
    id: 2,
    name: "Small Group - Teens",
    time: "7:30 PM - 9:00 PM",
    location: "Room 102",
    attendanceRecorded: true,
    expectedAttendees: 12,
  },
]

const mockRecentActions = [
  { action: "Recorded attendance for Youth Service", time: "2 hours ago" },
  { action: "Updated member contact info", time: "1 day ago" },
  { action: "Marked event completion", time: "3 days ago" },
]

export default function VolunteerDashboard() {
  const handleRecordAttendance = (eventId: number, eventName: string) => {
    console.log(`Record attendance for event ${eventId}: ${eventName}`)
    // todo: implement actual attendance recording
  }

  const handleQuickEntry = (type: string) => {
    console.log(`Quick entry: ${type}`)
    // todo: implement quick entry functionality
  }

  return (
    <div className="space-y-6 p-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-semibold" data-testid="text-page-title">
          Volunteer Dashboard
        </h1>
        <p className="text-muted-foreground">
          Quick access to record attendance and manage today's activities.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button 
          size="lg" 
          className="h-20 flex-col gap-2" 
          onClick={() => handleQuickEntry('Attendance')}
          data-testid="button-quick-attendance"
        >
          <UserCheck className="h-6 w-6" />
          Record Attendance
        </Button>
        <Button 
          size="lg" 
          variant="outline" 
          className="h-20 flex-col gap-2"
          onClick={() => handleQuickEntry('Member Update')}
          data-testid="button-quick-member"
        >
          <Clock className="h-6 w-6" />
          Update Member Info
        </Button>
        <Button 
          size="lg" 
          variant="outline" 
          className="h-20 flex-col gap-2"
          onClick={() => handleQuickEntry('Event Notes')}
          data-testid="button-quick-notes"
        >
          <CheckCircle className="h-6 w-6" />
          Add Event Notes
        </Button>
      </div>

      {/* Today's Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Today's Events
          </CardTitle>
          <CardDescription>Events scheduled for today that need attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTodayEvents.map((event) => (
              <div 
                key={event.id} 
                className="flex items-center justify-between p-4 border rounded-md hover-elevate"
                data-testid={`event-card-${event.id}`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium" data-testid={`text-event-name-${event.id}`}>
                      {event.name}
                    </h3>
                    {event.attendanceRecorded ? (
                      <Badge variant="secondary" className="text-chart-1">
                        Recorded
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-chart-2">
                        Pending
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {event.time} • {event.location}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Expected: {event.expectedAttendees} attendees
                  </p>
                </div>
                <div className="flex gap-2">
                  {!event.attendanceRecorded && (
                    <Button
                      onClick={() => handleRecordAttendance(event.id, event.name)}
                      data-testid={`button-record-attendance-${event.id}`}
                    >
                      Record Attendance
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Your Recent Activity</CardTitle>
          <CardDescription>Your recent contributions to the ministry</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockRecentActions.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-2">
                <div className="w-2 h-2 bg-chart-1 rounded-full" />
                <div className="flex-1">
                  <p className="text-sm">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card>
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
          <CardDescription>Quick guidance for common tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Recording Attendance</h4>
              <p className="text-sm text-muted-foreground">
                Click on any event above and mark members as present or absent. 
                You can also add notes about the event.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Updating Member Info</h4>
              <p className="text-sm text-muted-foreground">
                Use the quick update button to modify contact information, 
                emergency contacts, or participation status.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}