import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: 1,
    title: "Box Braids",
    description: "Classic and versatile box braids that offer a clean, polished look. Perfect for protective styling with endless customization options.",
    emoji: "📦",
  },
  {
    id: 2,
    title: "Knotless Braids",
    description: "Modern knotless technique that reduces tension and damage. Lightweight, comfortable, and incredibly stylish with a seamless finish.",
    emoji: "🪢",
  },
  {
    id: 3,
    title: "Cornrows",
    description: "Intricate cornrow patterns that showcase artistry and creativity. From simple lines to complex geometric designs.",
    emoji: "🌾",
  },
  {
    id: 4,
    title: "Goddess Braids",
    description: "Elegant and sophisticated goddess braids with added volume and glamour. Perfect for special occasions or everyday elegance.",
    emoji: "👑",
  },
  {
    id: 5,
    title: "Locs & Dreadlocks",
    description: "Professional locs installation and maintenance. A timeless statement that celebrates natural texture and cultural heritage.",
    emoji: "🔗",
  },
  {
    id: 6,
    title: "Twists & Senegalese",
    description: "Beautiful two-strand twists and Senegalese twists with smooth, defined texture. Protective and incredibly chic.",
    emoji: "✨",
  },
  {
    id: 7,
    title: "Crochet Braids",
    description: "Lightweight crochet braids with various hair textures. Quick installation with stunning versatility and volume.",
    emoji: "🧶",
  },
  {
    id: 8,
    title: "Feed-in Braids",
    description: "Natural-looking feed-in braids that blend seamlessly with your hair. Minimal tension for maximum comfort.",
    emoji: "🎀",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h4 className="text-accent uppercase tracking-widest text-sm font-semibold mb-3">Our Specialty</h4>
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-primary mb-6">Braiding Styles</h2>
          <p className="text-muted-foreground text-lg font-light">
            From timeless classics to modern designs, we offer a complete range of braiding styles tailored to your unique personality and lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="group relative flex flex-col h-full bg-card hover:shadow-xl transition-all duration-300 rounded-sm overflow-hidden border border-border/50 p-6"
            >
              <div className="text-5xl mb-4">{service.emoji}</div>
              <h3 className="text-xl font-serif font-semibold text-primary mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">
                {service.description}
              </p>
              <div className="pt-2 border-t border-border/50 w-full flex justify-start">
                <Button variant="link" className="text-accent hover:text-primary p-0 h-auto font-medium group-hover:underline">
                  Book This Style <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
