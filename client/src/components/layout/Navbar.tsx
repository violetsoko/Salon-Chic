import { Link } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logoImage from "@assets/generated_images/minimalist_salon_logo.png";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "SERVICES", href: "#services" },
    { name: "ABOUT US", href: "#about" },
    { name: "GALLERY", href: "#gallery" },
    { name: "TESTIMONIALS", href: "#testimonials" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2 group">
            <div className="h-10 w-10 md:h-12 md:w-12 overflow-hidden rounded-full bg-white p-1 shadow-sm transition-transform group-hover:scale-105">
              <img src={logoImage} alt="Lumière Salon" className="h-full w-full object-contain" />
            </div>
            <span className={`text-xl md:text-2xl font-serif font-bold tracking-tight ${scrolled ? 'text-primary' : 'text-primary md:text-white'} transition-colors`}>
              LUMIÈRE
            </span>
          </a>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium tracking-wide hover:text-accent transition-colors ${
                scrolled ? "text-foreground" : "text-white/90 hover:text-white"
              }`}
            >
              {link.name}
            </a>
          ))}
          
          <DropdownMenu>
            <DropdownMenuTrigger className={`flex items-center gap-1 text-sm font-medium tracking-wide hover:text-accent transition-colors outline-none ${
                scrolled ? "text-foreground" : "text-white/90 hover:text-white"
              }`}>
              MORE <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Videos</DropdownMenuItem>
              <DropdownMenuItem>Careers</DropdownMenuItem>
              <DropdownMenuItem>Blog</DropdownMenuItem>
              <DropdownMenuItem>Contact</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center gap-4 ml-4">
            <span className={`text-sm font-medium cursor-pointer hover:text-accent transition-colors ${scrolled ? "text-foreground" : "text-white"}`}>
              Log In
            </span>
            <Button 
              className="bg-accent hover:bg-accent/90 text-white font-medium px-6 rounded-full"
              size="sm"
            >
              BOOK APPOINTMENT
            </Button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-base font-medium text-foreground hover:text-primary py-2 border-b border-border/50"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a href="#" className="text-base font-medium text-foreground hover:text-primary py-2">Videos</a>
          <a href="#" className="text-base font-medium text-foreground hover:text-primary py-2">Log In</a>
          <Button className="w-full bg-primary text-white mt-2">BOOK NOW</Button>
        </div>
      )}
    </nav>
  );
}
