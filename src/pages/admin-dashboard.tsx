import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Users, Calendar, Target, TrendingUp, Plus, UserCheck } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts"

// todo: remove mock functionality
const mockMetrics = {
  totalMembers: 127,
  activeMembers: 89,
  upcomingEvents: 3,
  monthlyAttendance: 78,
  yearlyGoals: 8,
  completedGoals: 5,
}

const mockAttendanceData = [
  { month: "Jan", attendance: 65 },
  { month: "Feb", attendance: 72 },
  { month: "Mar", attendance: 78 },
  { month: "Apr", attendance: 85 },
  { month: "May", attendance: 82 },
  { month: "Jun", attendance: 90 },
]

const mockEngagementData = [
  { name: "Regular Attendees", value: 45, color: "hsl(var(--chart-1))" },
  { name: "Occasional", value: 30, color: "hsl(var(--chart-2))" },
  { name: "New Members", value: 14, color: "hsl(var(--chart-3))" },
  { name: "Inactive", value: 11, color: "hsl(var(--chart-4))" },
]

const mockRecentActivity = [
  { action: "New member registered", name: "Alex Thompson", time: "2 hours ago" },
  { action: "Event attendance recorded", name: "Youth Service", time: "1 day ago" },
  { action: "Goal completed", name: "Monthly Outreach", time: "3 days ago" },
  { action: "Member updated", name: "Emily Davis", time: "1 week ago" },
]

export default function AdminDashboard() {
  const handleQuickAction = (action: string) => {
    console.log(`${action} triggered`)
    // todo: implement actual functionality
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold" data-testid="text-page-title">
            Ministry Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening in your youth ministry.
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => handleQuickAction('Add Member')} data-testid="button-add-member">
            <Plus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
          <Button onClick={() => handleQuickAction('Create Event')} data-testid="button-create-event">
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="metric-total-members">
              {mockMetrics.totalMembers}
            </div>
            <p className="text-xs text-muted-foreground">
              {mockMetrics.activeMembers} active this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="metric-upcoming-events">
              {mockMetrics.upcomingEvents}
            </div>
            <p className="text-xs text-muted-foreground">
              Next: Youth Service (Friday)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Monthly Attendance</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="metric-attendance">
              {mockMetrics.monthlyAttendance}%
            </div>
            <p className="text-xs text-chart-1">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Goal Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="metric-goals">
              {mockMetrics.completedGoals}/{mockMetrics.yearlyGoals}
            </div>
            <Progress value={(mockMetrics.completedGoals / mockMetrics.yearlyGoals) * 100} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trends Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Trends</CardTitle>
            <CardDescription>Monthly attendance over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockAttendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Line 
                    type="monotone" 
                    dataKey="attendance" 
                    stroke="hsl(var(--chart-1))" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Member Engagement */}
        <Card>
          <CardHeader>
            <CardTitle>Member Engagement</CardTitle>
            <CardDescription>Distribution of member participation levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockEngagementData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {mockEngagementData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {mockEngagementData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-sm" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates and changes in your ministry</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRecentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-2 rounded-md hover-elevate">
                <div className="w-2 h-2 bg-chart-1 rounded-full" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.name}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}