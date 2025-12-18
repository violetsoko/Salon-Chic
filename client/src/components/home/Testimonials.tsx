import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import type { Testimonial } from "@shared/schema";

export default function Testimonials() {
  const { data: testimonials = [] } = useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const response = await fetch("/api/testimonials");
      if (!response.ok) throw new Error("Failed to fetch testimonials");
      return response.json();
    },
  });

  const displayTestimonials = testimonials.slice(0, 3);

  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h4 className="text-accent uppercase tracking-widest text-sm font-semibold mb-3">Client Reviews</h4>
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-primary mb-6">What Our Clients Say</h2>
          <p className="text-muted-foreground text-lg font-light">
            Real stories from clients who've experienced the Lumière transformation.
          </p>
        </div>

        {displayTestimonials.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>Testimonials coming soon. Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-card border border-border/50 p-8 rounded-lg hover:shadow-lg transition-all">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                <div className="border-t border-border/50 pt-4">
                  <p className="font-serif font-semibold text-primary">{testimonial.clientName}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.service}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
