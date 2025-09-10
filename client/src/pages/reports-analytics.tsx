import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from "recharts"
import { Download, Calendar, TrendingUp, Users, Target, Activity } from "lucide-react"

// todo: remove mock functionality
const mockAttendanceData = [
  { month: "Jan", attendance: 65, events: 8 },
  { month: "Feb", attendance: 72, events: 7 },
  { month: "Mar", attendance: 78, events: 9 },
  { month: "Apr", attendance: 85, events: 10 },
  { month: "May", attendance: 82, events: 8 },
  { month: "Jun", attendance: 90, events: 12 },
]

const mockMembershipGrowth = [
  { month: "Jan", total: 120, new: 5, inactive: 2 },
  { month: "Feb", total: 123, new: 6, inactive: 3 },
  { month: "Mar", total: 127, new: 8, inactive: 4 },
  { month: "Apr", total: 130, new: 5, inactive: 2 },
  { month: "May", total: 133, new: 7, inactive: 4 },
  { month: "Jun", total: 136, new: 6, inactive: 3 },
]

const mockEventTypes = [
  { name: "Services", value: 40, color: "hsl(var(--chart-1))" },
  { name: "Small Groups", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Outreach", value: 20, color: "hsl(var(--chart-3))" },
  { name: "Social Events", value: 15, color: "hsl(var(--chart-4))" },
]

const mockGoalProgress = [
  { goal: "Monthly Attendance", target: 100, current: 89, percentage: 89 },
  { goal: "New Members", target: 25, current: 18, percentage: 72 },
  { goal: "Community Events", target: 12, current: 8, percentage: 67 },
  { goal: "Volunteer Training", target: 15, current: 12, percentage: 80 },
]

const mockTopEvents = [
  { name: "Youth Christmas Service", attendance: 95, date: "Dec 2023" },
  { name: "Summer Camp", attendance: 78, date: "Jul 2024" },
  { name: "Community Outreach", attendance: 65, date: "May 2024" },
  { name: "Easter Celebration", attendance: 88, date: "Mar 2024" },
]

export default function ReportsAnalytics() {
  const [timeRange, setTimeRange] = useState("6months")
  const [reportType, setReportType] = useState("overview")

  const handleExportReport = (format: string) => {
    console.log(`Export report as ${format}`)
    // todo: implement actual export functionality
  }

  const handleGenerateReport = () => {
    console.log(`Generate ${reportType} report for ${timeRange}`)
    // todo: implement actual report generation
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold" data-testid="text-page-title">
            Reports & Analytics
          </h1>
          <p className="text-muted-foreground">
            Track progress and generate insights about your youth ministry.
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => handleExportReport('PDF')}
            data-testid="button-export-pdf"
          >
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button 
            variant="outline"
            onClick={() => handleExportReport('Excel')}
            data-testid="button-export-excel"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Report Controls */}
      <div className="flex gap-4">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-48" data-testid="select-time-range">
            <Calendar className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1month">Last Month</SelectItem>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="1year">Last Year</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={reportType} onValueChange={setReportType}>
          <SelectTrigger className="w-48" data-testid="select-report-type">
            <SelectValue placeholder="Select report type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="overview">Overview</SelectItem>
            <SelectItem value="attendance">Attendance</SelectItem>
            <SelectItem value="membership">Membership</SelectItem>
            <SelectItem value="events">Events</SelectItem>
            <SelectItem value="goals">Goals</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleGenerateReport} data-testid="button-generate-report">
          Generate Report
        </Button>
      </div>

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center gap-3 p-6">
            <TrendingUp className="h-8 w-8 text-chart-1" />
            <div>
              <p className="text-2xl font-bold" data-testid="metric-avg-attendance">89%</p>
              <p className="text-sm text-muted-foreground">Avg Attendance</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-6">
            <Users className="h-8 w-8 text-chart-2" />
            <div>
              <p className="text-2xl font-bold" data-testid="metric-total-members">136</p>
              <p className="text-sm text-muted-foreground">Total Members</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-6">
            <Activity className="h-8 w-8 text-chart-3" />
            <div>
              <p className="text-2xl font-bold" data-testid="metric-total-events">54</p>
              <p className="text-sm text-muted-foreground">Events This Year</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-6">
            <Target className="h-8 w-8 text-chart-4" />
            <div>
              <p className="text-2xl font-bold" data-testid="metric-goal-completion">77%</p>
              <p className="text-sm text-muted-foreground">Goal Completion</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Trends</CardTitle>
            <CardDescription>Monthly attendance rates and event frequency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockAttendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Area 
                    type="monotone" 
                    dataKey="attendance" 
                    stroke="hsl(var(--chart-1))" 
                    fill="hsl(var(--chart-1))"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Event Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Event Distribution</CardTitle>
            <CardDescription>Breakdown of event types held this period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockEventTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {mockEventTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {mockEventTypes.map((item, index) => (
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

        {/* Membership Growth */}
        <Card>
          <CardHeader>
            <CardTitle>Membership Growth</CardTitle>
            <CardDescription>Total membership and new member acquisition</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockMembershipGrowth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Line 
                    type="monotone" 
                    dataKey="total" 
                    stroke="hsl(var(--chart-1))" 
                    strokeWidth={2}
                    name="Total Members"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="new" 
                    stroke="hsl(var(--chart-2))" 
                    strokeWidth={2}
                    name="New Members"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Goal Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Goal Progress</CardTitle>
            <CardDescription>Current progress towards yearly ministry goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockGoalProgress.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{goal.goal}</span>
                    <span>{goal.current}/{goal.target}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-chart-1 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${goal.percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{goal.percentage}% complete</span>
                    <Badge variant={goal.percentage >= 80 ? "default" : "secondary"}>
                      {goal.percentage >= 80 ? "On Track" : "Needs Attention"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Events */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Events</CardTitle>
          <CardDescription>Events with highest attendance this period</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockTopEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-chart-1 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    #{index + 1}
                  </div>
                  <div>
                    <p className="font-medium" data-testid={`text-top-event-${index}`}>
                      {event.name}
                    </p>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg" data-testid={`text-top-event-attendance-${index}`}>
                    {event.attendance}
                  </p>
                  <p className="text-sm text-muted-foreground">attendees</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}