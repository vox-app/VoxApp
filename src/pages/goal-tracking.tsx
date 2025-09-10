import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Plus, Target, Calendar, TrendingUp, CheckCircle, AlertCircle, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// todo: remove mock functionality
const mockGoals = [
  {
    id: 1,
    title: "Increase Monthly Attendance",
    description: "Reach 100 average monthly attendance across all events",
    category: "Attendance",
    target: 100,
    current: 89,
    unit: "people",
    deadline: "2024-12-31",
    status: "In Progress",
    priority: "High",
    createdBy: "Sarah Johnson",
    progress: 89,
  },
  {
    id: 2,
    title: "New Member Recruitment",
    description: "Welcome 25 new members to the youth ministry this year",
    category: "Growth",
    target: 25,
    current: 18,
    unit: "members",
    deadline: "2024-12-31",
    status: "In Progress",
    priority: "High",
    createdBy: "Mike Davis",
    progress: 72,
  },
  {
    id: 3,
    title: "Community Service Events",
    description: "Organize 12 community outreach events throughout the year",
    category: "Outreach",
    target: 12,
    current: 8,
    unit: "events",
    deadline: "2024-12-31",
    status: "In Progress",
    priority: "Medium",
    createdBy: "Emily Chen",
    progress: 67,
  },
  {
    id: 4,
    title: "Volunteer Training Sessions",
    description: "Conduct 15 training sessions for youth ministry volunteers",
    category: "Training",
    target: 15,
    current: 12,
    unit: "sessions",
    deadline: "2024-12-31",
    status: "In Progress",
    priority: "Medium",
    createdBy: "Sarah Johnson",
    progress: 80,
  },
  {
    id: 5,
    title: "Youth Leadership Development",
    description: "Identify and develop 10 youth leaders from within the ministry",
    category: "Leadership",
    target: 10,
    current: 10,
    unit: "leaders",
    deadline: "2024-06-30",
    status: "Completed",
    priority: "High",
    createdBy: "Mike Davis",
    progress: 100,
  },
]

const goalFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  target: z.string().min(1, "Target is required"),
  unit: z.string().min(1, "Unit is required"),
  deadline: z.string().min(1, "Deadline is required"),
  priority: z.string().min(1, "Priority is required"),
})

export default function GoalTracking() {
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const form = useForm<z.infer<typeof goalFormSchema>>({
    resolver: zodResolver(goalFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      target: "",
      unit: "",
      deadline: "",
      priority: "",
    },
  })

  const filteredGoals = mockGoals.filter(goal => {
    const matchesCategory = filterCategory === "all" || goal.category.toLowerCase() === filterCategory
    const matchesStatus = filterStatus === "all" || goal.status.toLowerCase() === filterStatus
    return matchesCategory && matchesStatus
  })

  const handleAddGoal = (values: z.infer<typeof goalFormSchema>) => {
    console.log("Add goal:", values)
    // todo: implement actual goal creation
    setIsAddDialogOpen(false)
    form.reset()
  }

  const handleGoalAction = (action: string, goalId: number) => {
    console.log(`${action} for goal ${goalId}`)
    // todo: implement actual goal actions
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed": return "bg-chart-1 text-white"
      case "in progress": return "bg-chart-2 text-white"
      case "on hold": return "bg-chart-4 text-white"
      case "cancelled": return "bg-destructive text-destructive-foreground"
      default: return "bg-muted"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high": return "text-destructive"
      case "medium": return "text-chart-2"
      case "low": return "text-muted-foreground"
      default: return "text-muted-foreground"
    }
  }

  const getProgressIcon = (progress: number) => {
    if (progress === 100) return <CheckCircle className="h-5 w-5 text-chart-1" />
    if (progress >= 75) return <TrendingUp className="h-5 w-5 text-chart-2" />
    return <AlertCircle className="h-5 w-5 text-chart-4" />
  }

  const overallStats = {
    totalGoals: mockGoals.length,
    completedGoals: mockGoals.filter(g => g.status === "Completed").length,
    inProgressGoals: mockGoals.filter(g => g.status === "In Progress").length,
    averageProgress: Math.round(mockGoals.reduce((sum, goal) => sum + goal.progress, 0) / mockGoals.length),
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold" data-testid="text-page-title">
            Goal Tracking
          </h1>
          <p className="text-muted-foreground">
            Set, track, and achieve your youth ministry objectives.
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-goal">
              <Plus className="h-4 w-4 mr-2" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
              <DialogDescription>
                Set a new goal for your youth ministry.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddGoal)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Goal Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter goal title" {...field} data-testid="input-goal-title" />
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
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe the goal..." {...field} data-testid="input-goal-description" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-goal-category">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="attendance">Attendance</SelectItem>
                            <SelectItem value="growth">Growth</SelectItem>
                            <SelectItem value="outreach">Outreach</SelectItem>
                            <SelectItem value="training">Training</SelectItem>
                            <SelectItem value="leadership">Leadership</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Priority</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-goal-priority">
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="target"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter target" {...field} data-testid="input-goal-target" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="unit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Unit</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., people, events" {...field} data-testid="input-goal-unit" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deadline</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} data-testid="input-goal-deadline" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1" data-testid="button-save-goal">
                    Create Goal
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

      {/* Goal Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center gap-3 p-6">
            <Target className="h-8 w-8 text-chart-1" />
            <div>
              <p className="text-2xl font-bold" data-testid="metric-total-goals">
                {overallStats.totalGoals}
              </p>
              <p className="text-sm text-muted-foreground">Total Goals</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-6">
            <CheckCircle className="h-8 w-8 text-chart-1" />
            <div>
              <p className="text-2xl font-bold" data-testid="metric-completed-goals">
                {overallStats.completedGoals}
              </p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-6">
            <TrendingUp className="h-8 w-8 text-chart-2" />
            <div>
              <p className="text-2xl font-bold" data-testid="metric-in-progress-goals">
                {overallStats.inProgressGoals}
              </p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-6">
            <AlertCircle className="h-8 w-8 text-chart-3" />
            <div>
              <p className="text-2xl font-bold" data-testid="metric-average-progress">
                {overallStats.averageProgress}%
              </p>
              <p className="text-sm text-muted-foreground">Avg Progress</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-48" data-testid="select-filter-category">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="attendance">Attendance</SelectItem>
            <SelectItem value="growth">Growth</SelectItem>
            <SelectItem value="outreach">Outreach</SelectItem>
            <SelectItem value="training">Training</SelectItem>
            <SelectItem value="leadership">Leadership</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48" data-testid="select-filter-status">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="in progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="on hold">On Hold</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {filteredGoals.map((goal) => (
          <Card key={goal.id} className="hover-elevate">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getProgressIcon(goal.progress)}
                  <div>
                    <CardTitle className="text-lg" data-testid={`text-goal-title-${goal.id}`}>
                      {goal.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getStatusColor(goal.status)} data-testid={`badge-status-${goal.id}`}>
                        {goal.status}
                      </Badge>
                      <Badge variant="outline">
                        {goal.category}
                      </Badge>
                      <span className={`text-sm font-medium ${getPriorityColor(goal.priority)}`}>
                        {goal.priority} Priority
                      </span>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" data-testid={`button-goal-menu-${goal.id}`}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleGoalAction('Edit', goal.id)}>
                      Edit Goal
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleGoalAction('Update Progress', goal.id)}>
                      Update Progress
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleGoalAction('Mark Complete', goal.id)}>
                      Mark Complete
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleGoalAction('Archive', goal.id)}>
                      Archive Goal
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{goal.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span data-testid={`text-goal-progress-${goal.id}`}>
                    {goal.current}/{goal.target} {goal.unit}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span data-testid={`text-goal-deadline-${goal.id}`}>
                    Due: {new Date(goal.deadline).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Created by: {goal.createdBy}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" data-testid={`progress-${goal.id}`} />
              </div>

              {goal.status === "In Progress" && (
                <Button 
                  size="sm" 
                  onClick={() => handleGoalAction('Update Progress', goal.id)}
                  data-testid={`button-update-progress-${goal.id}`}
                >
                  Update Progress
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredGoals.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">No goals found matching your criteria.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setFilterCategory("all")
                setFilterStatus("all")
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