import heroImage from "@assets/Screenshot_20251222_071612_com.huawei.himovie.overseas_edit_34_1766380789766.jpg";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import BookingModal from "./BookingModal";

export default function Hero() {
  const [bookingOpen, setBookingOpen] = useState(false);

  const scrollToServices = () => {
    const servicesSection = document.getElementById("services");
    servicesSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Beautiful hair transformation"
          className="h-full w-full object-cover object-center md:object-top"
        />
        <div className="absolute inset-0 bg-black/20" /> {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 h-full flex items-center">
        <div className="max-w-2xl text-white pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-accent uppercase tracking-[0.2em] text-sm md:text-base font-medium mb-4">
              Expert Hair Braiding
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-[1.1] mb-6 drop-shadow-lg">
              Master <br />
              <span className="italic font-light">Braiding</span> <br />
              Artistry
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-md font-light leading-relaxed">
              Discover the art of expert braiding. 
              Stunning, protective styles crafted with precision and passion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => setBookingOpen(true)}
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                data-testid="button-hero-book"
              >
                Book Appointment
              </Button>
              <Button 
                onClick={scrollToServices}
                size="lg" 
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-white/10 hover:text-white rounded-full px-8 py-6 text-lg backdrop-blur-sm"
                data-testid="button-hero-services"
              >
                View Services
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </>
  );
}
