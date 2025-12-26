import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import cornrowsImage from "@assets/Screenshot_20251222_071218_com.android.gallery3d_edit_34296968_1766380789637.jpg";
import goddessImage from "@assets/Screenshot_20251222_071537_com.huawei.himovie.overseas_edit_34_1766380789728.jpg";
import boxBraidsImage from "@assets/Screenshot_20251222_071612_com.huawei.himovie.overseas_edit_34_1766380789766.jpg";
import twistsImage from "@assets/Screenshot_20251222_070858_com.huawei.himovie.overseas_edit_33_1766380789921.jpg";
import bunBraidsImage from "@assets/Screenshot_20251222_070824_com.huawei.himovie.overseas_edit_33_1766380789883.jpg";
import feedInImage from "@assets/Screenshot_20251222_070948_com.huawei.himovie.overseas_edit_33_1766380789961.jpg";
import knotlessImage from "@assets/Screenshot_20251222_071434_com.huawei.himovie.overseas_1766380789806.jpg";
import braidsAiImage from "@assets/Gemini_Generated_Image_41vmcf41vmcf41vm_1766765928353.png";

const services = [
  {
    id: 1,
    title: "Knotless Braids",
    image: boxBraidsImage,
    size: "large",
  },
  {
    id: 2,
    title: "Cornrows",
    image: knotlessImage,
    size: "small",
  },
  {
    id: 3,
    title: "Cornrows",
    image: cornrowsImage,
    size: "small",
  },
  {
    id: 4,
    title: "Goddess Braids",
    image: goddessImage,
    size: "large",
  },
  {
    id: 5,
    title: "Twists & Senegalese",
    image: twistsImage,
    size: "small",
  },
  {
    id: 6,
    title: "Bun Braids",
    image: bunBraidsImage,
    size: "small",
  },
  {
    id: 7,
    title: "Feed-in Braids",
    image: feedInImage,
    size: "small",
  },
  {
    id: 8,
    title: "Feed-in Cornrows",
    image: braidsAiImage,
    size: "small",
  },
];

export default function Services() {
  const handleViewAll = () => {
    const gallerySection = document.getElementById("gallery");
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-3">OUR SERVICES</h2>
          </div>
          <Button 
            onClick={handleViewAll}
            className="bg-primary text-white hover:bg-primary/90 rounded-full px-6 h-10"
            data-testid="button-view-all-services"
          >
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map((service) => (
            <div 
              key={service.id}
              className={`group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300 ${
                service.size === "large" ? "md:col-span-2 md:row-span-2 aspect-auto min-h-96" : "aspect-square"
              }`}
            >
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                <h3 className="text-white font-serif text-lg md:text-2xl font-bold mb-3 uppercase tracking-wider">
                  {service.title}
                </h3>
                <Button 
                  size="sm"
                  className="w-fit bg-white text-primary hover:bg-accent hover:text-white rounded-full"
                  data-testid={`button-book-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  Book <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
