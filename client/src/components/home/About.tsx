import aboutImage from "@assets/generated_images/luxury_salon_interior.png";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Image Side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl">
              <img 
                src={aboutImage} 
                alt="Lumière Salon Interior" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decor Elements */}
            <div className="absolute -top-6 -left-6 w-full h-full border-2 border-accent rounded-lg z-0 hidden md:block" />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl z-0" />
          </div>

          {/* Text Side */}
          <div className="order-1 lg:order-2">
            <h4 className="text-accent uppercase tracking-widest text-sm font-semibold mb-3">Who We Are</h4>
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-primary mb-6">
              Redefining Beauty <br/> & Confidence
            </h2>
            <p className="text-muted-foreground text-lg font-light mb-6 leading-relaxed">
              At Lumière, we believe that your hair is your best accessory. Founded in 2015, our salon has become a sanctuary for those seeking exceptional hair care in a luxurious, relaxing environment.
            </p>
            <p className="text-muted-foreground text-lg font-light mb-8 leading-relaxed">
              Our team of master stylists stays ahead of the trends to bring you the latest techniques in color, cutting, and styling. We use only premium, eco-friendly products that nourish your hair while delivering stunning results.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {["Master Stylists", "Premium Products", "Personalized Consultations", "Relaxing Atmosphere"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                    <Check className="h-4 w-4" />
                  </div>
                  <span className="text-primary font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-8">
              Read Our Story
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
