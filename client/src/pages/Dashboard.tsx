import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { Users, Calendar, Zap, Clock, BarChart3, TrendingUp, Settings, LogOut, Search, Bell } from "lucide-react";
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import type { Appointment, Contact, Testimonial } from "@shared/schema";

export default function Dashboard() {
  const { data: appointments = [] } = useQuery<Appointment[]>({
    queryKey: ["appointments"],
    queryFn: async () => {
      const response = await fetch("/api/appointments");
      if (!response.ok) throw new Error("Failed to fetch");
      return response.json();
    },
  });

  const { data: contacts = [] } = useQuery<Contact[]>({
    queryKey: ["contacts"],
    queryFn: async () => {
      const response = await fetch("/api/contacts");
      if (!response.ok) throw new Error("Failed to fetch");
      return response.json();
    },
  });

  const { data: testimonials = [] } = useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const response = await fetch("/api/testimonials");
      if (!response.ok) throw new Error("Failed to fetch");
      return response.json();
    },
  });

  // Generate chart data
  const appointmentChartData = [
    { date: "Jan 1", count: 5 },
    { date: "Jan 8", count: 3 },
    { date: "Jan 15", count: 7 },
    { date: "Jan 22", count: 4 },
    { date: "Jan 29", count: 6 },
    { date: "Feb 5", count: 8 },
    { date: "Feb 12", count: 5 },
    { date: "Feb 19", count: 9 },
  ];

  const financialData = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 5200 },
    { month: "Mar", revenue: 6100 },
    { month: "Apr", revenue: 7300 },
  ];

  const stylists = [
    { id: 1, name: "Delphine", role: "Hair Styling Artist", avatar: "👩‍🦱" },
    { id: 2, name: "Gabriel Soares", role: "Makeup Artist", avatar: "👨‍🦱" },
    { id: 3, name: "Cristian Mehringer", role: "Hair Styling Artist", avatar: "👨‍🦱" },
    { id: 4, name: "Alex Edwards", role: "Hair Coloring Specialist", avatar: "👩‍🦰" },
  ];

  // Upcoming appointments sorted by date
  const upcomingAppointments = appointments
    .filter(apt => new Date(apt.appointmentDate) > new Date())
    .sort((a, b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime())
    .slice(0, 6);

  // Generate calendar dates for current month
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const genderData = [
    { name: "Female", value: 65 },
    { name: "Male", value: 35 },
  ];

  const COLORS = {
    accent: "hsl(35 40% 70%)", // Gold
    plum: "hsl(330 15% 30%)", // Plum
    cream: "hsl(40 20% 98%)", // Cream
    charcoal: "hsl(270 5% 20%)", // Charcoal
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[hsl(40_20%_98%)]">
      {/* Sidebar */}
      <div className="w-full lg:w-64 bg-[hsl(270_5%_20%)] text-white p-6 overflow-y-auto lg:overflow-y-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-serif font-bold">Salon.</h2>
        </div>

        <nav className="space-y-2">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10">
            <BarChart3 size={20} />
            <span className="font-medium">Dashboard</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 cursor-pointer transition">
            <Calendar size={20} />
            <span>Appointments</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 cursor-pointer transition">
            <Users size={20} />
            <span>Clients</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 cursor-pointer transition">
            <Zap size={20} />
            <span>Analytics</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 cursor-pointer transition">
            <Clock size={20} />
            <span>Message</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 cursor-pointer transition">
            <TrendingUp size={20} />
            <span>Reviews</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 cursor-pointer transition">
            <BarChart3 size={20} />
            <span>Finances</span>
          </div>
        </nav>

        <div className="absolute bottom-6 left-6 right-6 space-y-2">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 cursor-pointer transition">
            <Settings size={20} />
            <span>Settings</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 cursor-pointer transition">
            <LogOut size={20} />
            <span>Logout</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto w-full">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-serif font-bold text-[hsl(270_5%_20%)] mb-1">Overview</h1>
            <p className="text-sm text-gray-500">This Week</p>
          </div>
          <div className="flex items-center gap-3 md:gap-6 w-full md:w-auto">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm"
                data-testid="input-search"
              />
            </div>
            <Bell size={20} className="text-gray-600 cursor-pointer" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[hsl(35_40%_70%)] flex items-center justify-center text-white font-semibold">
                RM
              </div>
              <span className="text-sm font-medium">Rithvical Moreira</span>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-8">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Clients</p>
                    <p className="text-3xl font-bold text-[hsl(270_5%_20%)]">{appointments.length * 3}</p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-[hsl(35_40%_70%)]/20 flex items-center justify-center">
                    <Users size={28} className="text-[hsl(35_40%_70%)]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Appointments</p>
                    <p className="text-3xl font-bold text-[hsl(270_5%_20%)]">{appointments.length}</p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-[hsl(35_40%_70%)]/20 flex items-center justify-center">
                    <Calendar size={28} className="text-[hsl(35_40%_70%)]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Services</p>
                    <p className="text-3xl font-bold text-[hsl(270_5%_20%)]">8</p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-[hsl(35_40%_70%)]/20 flex items-center justify-center">
                    <Zap size={28} className="text-[hsl(35_40%_70%)]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Treatments</p>
                    <p className="text-3xl font-bold text-[hsl(270_5%_20%)]">{appointments.length * 2}</p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-[hsl(35_40%_70%)]/20 flex items-center justify-center">
                    <TrendingUp size={28} className="text-[hsl(35_40%_70%)]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Appointments Chart */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Overall Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={appointmentChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="hsl(35 40% 70%)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Stylists */}
          <div className="mb-8">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Stylists</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {stylists.map((stylist) => (
                    <div key={stylist.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[hsl(35_40%_70%)]/20 flex items-center justify-center text-xl flex-shrink-0">
                          {stylist.avatar}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-sm truncate">{stylist.name}</p>
                          <p className="text-xs text-gray-600 truncate">{stylist.role}</p>
                        </div>
                      </div>
                      <div className="cursor-pointer ml-2">⋮</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Upcoming Appointments */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Contact Inquiries */}
            {contacts.length > 0 && (
              <Card className="border-0 shadow-md lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Inquiries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {contacts.slice(0, 3).map((contact) => (
                      <div key={contact.id} className="p-3 rounded-lg border border-gray-200">
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-medium text-sm">{contact.name}</p>
                          <Badge className="text-xs" variant="outline">
                            {contact.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600">{contact.email}</p>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{contact.message}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Upcoming Appointments Panel */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
                <div className="text-xs text-gray-600">February 2026</div>
              </CardHeader>
              <CardContent>
                {/* Calendar */}
                <div className="mb-6">
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                      <div key={day} className="text-center text-xs font-semibold text-gray-600">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {calendarDays.slice(0, 28).map((day, idx) => (
                      <div
                        key={idx}
                        className={`text-center text-sm py-2 rounded ${
                          day.getDate() === today.getDate() && day.getMonth() === today.getMonth()
                            ? "bg-[hsl(35_40%_70%)] text-white font-bold"
                            : "text-gray-700"
                        }`}
                        data-testid={`calendar-day-${day.getDate()}`}
                      >
                        {day.getDate()}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Appointments List */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {upcomingAppointments.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">No upcoming appointments</p>
                  ) : (
                    upcomingAppointments.map((apt) => (
                      <div key={apt.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-[hsl(35_40%_70%)] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                            {apt.clientName.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{apt.clientName}</p>
                            <p className="text-xs text-gray-600">{apt.service}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {format(new Date(apt.appointmentDate), "MMM dd, h:mm a")}
                            </p>
                          </div>
                          <div className="cursor-pointer">⋮</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mobile-friendly sidebar toggle would go here
// For now, the sidebar is always visible
// On mobile, it would need to be hidden or converted to a hamburger menu
