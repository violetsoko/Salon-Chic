import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { Users, Calendar, Zap, Clock, BarChart3, TrendingUp, Settings, LogOut, Search, Bell, Check, X } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useToast } from "@/hooks/use-toast";
import type { Appointment, Contact, Testimonial } from "@shared/schema";

export default function Dashboard() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: appointments = [], refetch: refetchAppointments } = useQuery<Appointment[]>({
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

  // Confirm booking mutation
  const confirmMutation = useMutation({
    mutationFn: async (appointmentId: string) => {
      const response = await fetch(`/api/appointments/${appointmentId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "confirmed" }),
      });
      if (!response.ok) throw new Error("Failed to confirm appointment");
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Appointment confirmed!" });
      refetchAppointments();
    },
    onError: () => {
      toast({ title: "Error confirming appointment", variant: "destructive" });
    },
  });

  // Cancel booking mutation
  const cancelMutation = useMutation({
    mutationFn: async (appointmentId: string) => {
      const response = await fetch(`/api/appointments/${appointmentId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "cancelled" }),
      });
      if (!response.ok) throw new Error("Failed to cancel appointment");
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Appointment cancelled" });
      refetchAppointments();
    },
    onError: () => {
      toast({ title: "Error cancelling appointment", variant: "destructive" });
    },
  });

  // Generate chart data
  const appointmentChartData = [
    { date: "Mon", count: 5 },
    { date: "Tue", count: 3 },
    { date: "Wed", count: 7 },
    { date: "Thu", count: 4 },
    { date: "Fri", count: 6 },
    { date: "Sat", count: 8 },
    { date: "Sun", count: 5 },
  ];

  const stylist = { id: 1, name: "Florence Soko", role: "Hair Braiding Specialist", avatar: "👩‍🦱" };

  // Upcoming appointments sorted by date
  const upcomingAppointments = appointments
    .filter(apt => new Date(apt.appointmentDate) > new Date())
    .sort((a, b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime())
    .slice(0, 10);

  const pendingAppointments = appointments.filter(apt => apt.status === "pending");
  const confirmedAppointments = appointments.filter(apt => apt.status === "confirmed");

  // Generate calendar dates for current month
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-full lg:w-64 bg-white border-r border-gray-200 p-6 overflow-y-auto">
        <div className="mb-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center text-white font-bold text-lg">
            F
          </div>
          <h2 className="text-xl font-serif font-bold text-gray-900">FLORENCE</h2>
        </div>

        <nav className="space-y-2">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-50 text-red-600">
            <BarChart3 size={20} />
            <span className="font-semibold">Dashboard</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 cursor-pointer transition text-gray-700">
            <Calendar size={20} />
            <span>Appointments</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 cursor-pointer transition text-gray-700">
            <Users size={20} />
            <span>Clients</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 cursor-pointer transition text-gray-700">
            <Zap size={20} />
            <span>Analytics</span>
          </div>
        </nav>

        <div className="absolute bottom-6 left-6 right-6 space-y-2">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 cursor-pointer transition text-gray-700">
            <Settings size={20} />
            <span>Settings</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 cursor-pointer transition text-gray-700">
            <LogOut size={20} />
            <span>Logout</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto w-full">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-6 sticky top-0 z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-serif font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center gap-3 md:gap-6 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none">
                <Search size={20} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full md:w-48 pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm"
                  data-testid="input-search"
                />
              </div>
              <Bell size={20} className="text-gray-600 cursor-pointer" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-semibold text-sm">
                  FS
                </div>
                <span className="text-sm font-medium text-gray-900 hidden sm:block">Florence Soko</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-8">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Total Clients</p>
                    <p className="text-3xl font-bold text-gray-900">{appointments.length * 3}</p>
                    <p className="text-xs text-gray-500 mt-1">Jan 23, 2026</p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users size={28} className="text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Total Service</p>
                    <p className="text-3xl font-bold text-gray-900">8</p>
                    <p className="text-xs text-gray-500 mt-1">Jan 23, 2026</p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <Zap size={28} className="text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Total Stylist</p>
                    <p className="text-3xl font-bold text-gray-900">1</p>
                    <p className="text-xs text-gray-500 mt-1">Florence Soko</p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                    <Users size={28} className="text-purple-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Appointment</p>
                    <p className="text-3xl font-bold text-gray-900">{appointments.length}</p>
                    <p className="text-xs text-gray-500 mt-1">Jan 23, 2026</p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-cyan-100 flex items-center justify-center">
                    <Calendar size={28} className="text-cyan-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Clients Statistic Chart */}
            <Card className="border-0 shadow-sm lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Clients Statistic</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={appointmentChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#EF4444" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Top Stylists */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Top Stylists</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                    <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white text-lg flex-shrink-0">
                      {stylist.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-900">{stylist.name}</p>
                      <p className="text-xs text-gray-600">{stylist.role}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="aspect-square w-full rounded-lg overflow-hidden bg-gray-200">
                      <div className="w-full h-full bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center">
                        <span className="text-6xl">👰</span>
                      </div>
                    </div>
                    <button className="absolute bottom-3 right-3 bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition shadow-lg">
                      <span className="text-sm">→</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Status - Pending Appointments */}
          <div className="mb-8">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Booking Requests</CardTitle>
                  <div className="flex gap-2">
                    <button className="text-xs px-3 py-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition">
                      Upcoming Booking
                    </button>
                    <button className="text-xs px-3 py-1 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition">
                      All Booking
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Client</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Service</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Date & Time</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {upcomingAppointments.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-gray-500">
                            No upcoming appointments
                          </td>
                        </tr>
                      ) : (
                        upcomingAppointments.map((apt) => (
                          <tr key={apt.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-semibold">
                                  {apt.clientName.charAt(0)}
                                </div>
                                <span className="font-medium text-gray-900">{apt.clientName}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-600">{apt.service}</td>
                            <td className="py-3 px-4 text-gray-600">{format(new Date(apt.appointmentDate), "MMM dd, h:mm a")}</td>
                            <td className="py-3 px-4">
                              <Badge variant={apt.status === "pending" ? "outline" : "default"}>
                                {apt.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => confirmMutation.mutate(apt.id)}
                                  disabled={apt.status !== "pending" || confirmMutation.isPending}
                                  className="p-1.5 rounded hover:bg-green-100 text-green-600 disabled:opacity-50"
                                  data-testid={`button-confirm-${apt.id}`}
                                  title="Confirm booking"
                                >
                                  <Check size={16} />
                                </button>
                                <button
                                  onClick={() => cancelMutation.mutate(apt.id)}
                                  disabled={apt.status === "cancelled" || cancelMutation.isPending}
                                  className="p-1.5 rounded hover:bg-red-100 text-red-600 disabled:opacity-50"
                                  data-testid={`button-cancel-${apt.id}`}
                                  title="Cancel booking"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Inquiries */}
          {contacts.length > 0 && (
            <div className="mb-8">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Inquiries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {contacts.slice(0, 6).map((contact) => (
                      <div key={contact.id} className="p-4 rounded-lg border border-gray-200 hover:border-gray-300">
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-semibold text-gray-900 text-sm">{contact.name}</p>
                          <Badge variant="outline" className="text-xs">
                            {contact.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{contact.email}</p>
                        <p className="text-xs text-gray-500 line-clamp-2">{contact.message}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
