import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import cornrowsImage from "@assets/Screenshot_20251222_071218_com.android.gallery3d_edit_34296968_1766380789637.jpg";
import goddessImage from "@assets/Screenshot_20251222_071537_com.huawei.himovie.overseas_edit_34_1766380789728.jpg";
import boxBraidsImage from "@assets/Screenshot_20251222_071612_com.huawei.himovie.overseas_edit_34_1766380789766.jpg";
import twistsImage from "@assets/Screenshot_20251222_070858_com.huawei.himovie.overseas_edit_33_1766380789921.jpg";
import bunBraidsImage from "@assets/Screenshot_20251222_070824_com.huawei.himovie.overseas_edit_33_1766380789883.jpg";
import feedInImage from "@assets/Screenshot_20251222_070948_com.huawei.himovie.overseas_edit_33_1766380789961.jpg";
import knotlessImage from "@assets/Screenshot_20251222_071434_com.huawei.himovie.overseas_1766380789806.jpg";
import locImage from "@assets/Screenshot_20251222_070916_com.huawei.himovie.overseas_1766380790004.jpg";

const services = [
  {
    id: 1,
    title: "Box Braids",
    description: "Classic and versatile box braids that offer a clean, polished look. Perfect for protective styling with endless customization options.",
    image: boxBraidsImage,
  },
  {
    id: 2,
    title: "Knotless Braids",
    description: "Modern knotless technique that reduces tension and damage. Lightweight, comfortable, and incredibly stylish with a seamless finish.",
    image: knotlessImage,
  },
  {
    id: 3,
    title: "Cornrows",
    description: "Intricate cornrow patterns that showcase artistry and creativity. From simple lines to complex geometric designs.",
    image: cornrowsImage,
  },
  {
    id: 4,
    title: "Goddess Braids",
    description: "Elegant and sophisticated goddess braids with added volume and glamour. Perfect for special occasions or everyday elegance.",
    image: goddessImage,
  },
  {
    id: 5,
    title: "Locs & Dreadlocks",
    description: "Professional locs installation and maintenance. A timeless statement that celebrates natural texture and cultural heritage.",
    image: locImage,
  },
  {
    id: 6,
    title: "Twists & Senegalese",
    description: "Beautiful two-strand twists and Senegalese twists with smooth, defined texture. Protective and incredibly chic.",
    image: twistsImage,
  },
  {
    id: 7,
    title: "Bun Braids",
    description: "Creative bun braids combining protective styling with beautiful updo designs. Perfect for daily wear and special events.",
    image: bunBraidsImage,
  },
  {
    id: 8,
    title: "Feed-in Braids",
    description: "Natural-looking feed-in braids that blend seamlessly with your hair. Minimal tension for maximum comfort.",
    image: feedInImage,
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
                    Book This Style <ArrowRight className="ml-1 h-3 w-3" />
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
