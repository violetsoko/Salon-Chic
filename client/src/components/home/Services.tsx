import { ArrowRight } from "lucide-react";
import colorImage from "@assets/generated_images/hair_coloring_service_image.png";
import cutImage from "@assets/generated_images/haircut_service_image.png";
import treatmentImage from "@assets/generated_images/hair_treatment_service_image.png";
import extensionImage from "@assets/generated_images/extensions_service_image.png";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: 1,
    title: "Coloring & Highlights",
    description: "From subtle balayage to bold transformations, our color experts create the perfect shade for your complexion.",
    image: colorImage,
  },
  {
    id: 2,
    title: "Haircuts & Styling",
    description: "Precision cuts tailored to your face shape and lifestyle. Experience the perfect blowout or style.",
    image: cutImage,
  },
  {
    id: 3,
    title: "Treatments & Repair",
    description: "Restore your hair's health with our premium keratin, hydration, and damage repair treatments.",
    image: treatmentImage,
  },
  {
    id: 4,
    title: "Extensions & Events",
    description: "Add length and volume with luxury extensions, or get styled for your wedding and special occasions.",
    image: extensionImage,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h4 className="text-accent uppercase tracking-widest text-sm font-semibold mb-3">Our Expertise</h4>
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-primary mb-6">Exclusive Services</h2>
          <p className="text-muted-foreground text-lg font-light">
            We offer a comprehensive range of hair services designed to help you look and feel your absolute best.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="group relative flex flex-col h-full bg-card hover:shadow-xl transition-all duration-300 rounded-sm overflow-hidden border border-border/50"
            >
              <div className="aspect-[4/5] overflow-hidden relative">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
              <div className="p-6 flex flex-col flex-grow text-center relative bg-white dark:bg-zinc-900 -mt-8 mx-4 shadow-lg mb-4 rounded-sm z-10">
                <h3 className="text-xl font-serif font-semibold text-primary mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">
                  {service.description}
                </p>
                <div className="pt-2 border-t border-border/50 w-full flex justify-center">
                  <Button variant="link" className="text-accent hover:text-primary p-0 h-auto font-medium group-hover:underline">
                    Learn More <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
