import { Facebook, Instagram, Twitter } from "lucide-react";
import logoImage from "@assets/generated_images/minimalist_salon_logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async () => {
    if (!email.trim()) {
      toast({
        title: "Please enter your email",
        variant: "destructive",
      });
      return;
    }

    setSubscribing(true);
    try {
      // Simulate subscription - in a real app, this would hit an API
      await new Promise(resolve => setTimeout(resolve, 500));
      toast({
        title: "Success!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer className="bg-zinc-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 bg-white rounded-full p-1">
                <img src={logoImage} alt="Logo" className="h-full w-full object-contain" />
              </div>
              <span className="text-2xl font-serif font-bold">FLORENCE</span>
            </div>
            <p className="text-zinc-400 font-light leading-relaxed">
              Elevating hair care to an art form. Experience luxury, style, and confidence in every visit.
            </p>
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-serif font-medium mb-6">Explore</h3>
            <ul className="space-y-4">
              {['Home', 'Services', 'About Us', 'Gallery', 'Testimonials', 'Careers'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-zinc-400 hover:text-accent transition-colors">{item}</a>
                </li>
              ))}
              <li>
                <a href="/dashboard" className="text-zinc-400 hover:text-accent transition-colors font-semibold text-sm">→ Staff Dashboard</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-serif font-medium mb-6">Contact</h3>
            <ul className="space-y-4 text-zinc-400">
              <li>123 Fashion Avenue,<br/>New York, NY 10012</li>
              <li>
                <a href="tel:+12125550123" className="hover:text-accent transition-colors">+1 (212) 555-0123</a>
              </li>
              <li>
                <a href="mailto:hello@lumieresalon.com" className="hover:text-accent transition-colors">hello@lumieresalon.com</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-serif font-medium mb-6">Newsletter</h3>
            <p className="text-zinc-400 mb-4 font-light text-sm">Subscribe for latest trends and exclusive offers.</p>
            <div className="flex flex-col gap-3">
              <Input 
                placeholder="Your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSubscribe()}
                className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-accent"
                data-testid="input-subscribe-email"
              />
              <Button 
                onClick={handleSubscribe}
                disabled={subscribing}
                className="bg-accent hover:bg-accent/90 text-white w-full"
                data-testid="button-subscribe"
              >
                {subscribing ? "Subscribing..." : "Subscribe"}
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
          <p>&copy; 2024 Lumière Salon. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
