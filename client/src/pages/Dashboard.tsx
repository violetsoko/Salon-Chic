import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CheckCircle, Clock, AlertCircle, Trash2 } from "lucide-react";
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-primary mb-2">Salon Dashboard</h1>
          <p className="text-muted-foreground">Manage appointments, inquiries, and testimonials</p>
        </div>

        <Tabs defaultValue="appointments" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="appointments">Appointments ({appointments.length})</TabsTrigger>
            <TabsTrigger value="contacts">Inquiries ({contacts.length})</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials ({testimonials.length})</TabsTrigger>
          </TabsList>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-4">
            {appointments.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                  No appointments yet
                </CardContent>
              </Card>
            ) : (
              appointments.map((apt) => (
                <Card key={apt.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Client</p>
                        <p className="font-semibold text-foreground">{apt.clientName}</p>
                        <p className="text-sm text-muted-foreground">{apt.clientEmail}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Service & Date</p>
                        <p className="font-semibold text-foreground">{apt.service}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(apt.appointmentDate), "MMM dd, yyyy h:mm a")}
                        </p>
                      </div>
                      <div className="flex flex-col justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Status</p>
                          <Badge className={`${getStatusColor(apt.status)} border-0`}>
                            {apt.status}
                          </Badge>
                        </div>
                        <Button size="sm" variant="outline" className="mt-2">
                          Update
                        </Button>
                      </div>
                    </div>
                    {apt.notes && (
                      <p className="text-sm text-muted-foreground mt-4 pt-4 border-t">
                        <strong>Notes:</strong> {apt.notes}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="space-y-4">
            {contacts.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                  No inquiries yet
                </CardContent>
              </Card>
            ) : (
              contacts.map((contact) => (
                <Card key={contact.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Name</p>
                        <p className="font-semibold text-foreground">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">{contact.email}</p>
                        {contact.phone && <p className="text-sm text-muted-foreground">{contact.phone}</p>}
                      </div>
                      <div className="flex items-end">
                        <Badge className={`${getStatusColor(contact.status)} border-0`}>
                          {contact.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="bg-secondary/30 p-3 rounded border border-border">
                      <p className="text-foreground text-sm">{contact.message}</p>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-4 border-t">
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(contact.createdAt), "MMM dd, yyyy h:mm a")}
                      </p>
                      <Button size="sm" variant="outline">
                        Mark as Handled
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials" className="space-y-4">
            {testimonials.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                  No testimonials yet
                </CardContent>
              </Card>
            ) : (
              testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Client</p>
                        <p className="font-semibold text-foreground">{testimonial.clientName}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.service}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-2 md:mt-0">
                        <div className="flex gap-1">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <span key={i} className="text-accent text-lg">★</span>
                          ))}
                        </div>
                        <Badge className={testimonial.approved ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                          {testimonial.approved ? "Approved" : "Pending"}
                        </Badge>
                      </div>
                    </div>
                    <div className="bg-secondary/30 p-3 rounded border border-border mb-4">
                      <p className="text-foreground italic">"{testimonial.content}"</p>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t">
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(testimonial.createdAt), "MMM dd, yyyy")}
                      </p>
                      {!testimonial.approved && (
                        <Button size="sm" variant="outline" className="text-green-700 border-green-200 hover:bg-green-50">
                          Approve
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
