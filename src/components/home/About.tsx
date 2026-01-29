import pinterestImage from "@assets/Screenshot_20251219_221610_com.pinterest_edit_45761750143537_1766906612188.jpg";
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
                src={pinterestImage} 
                alt="Professional Braiding" 
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
              Braiding <br/> Excellence & Artistry
            </h2>
            <p className="text-muted-foreground text-lg font-light mb-6 leading-relaxed">
              At Florence, braiding is more than a service—it's an art form. We specialise in creating stunning, protective styles that celebrate your natural beauty and unique style. Our salon has become the trusted destination for those seeking expert braiding in the UK.
            </p>
            <p className="text-muted-foreground text-lg font-light mb-8 leading-relaxed">
              Our team of master braiders brings precision, creativity, and passion to every style. From classic box braids to intricate cornrows and artistic designs, we deliver stunning results using the highest standards of technique and care.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {["Expert Braiders", "Premium Care", "Custom Designs", "Protective Styling"].map((item) => (
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
