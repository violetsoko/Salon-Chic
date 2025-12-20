import { useState } from "react";
import classicBoxBraids from "@assets/generated_images/classic_box_braids_hairstyle.png";
import knotlessBoxBraids from "@assets/generated_images/knotless_box_braids_style.png";
import geometricCornrows from "@assets/generated_images/geometric_cornrow_design.png";
import goddessBraids from "@assets/generated_images/elegant_goddess_braids_style.png";
import senegaleseTwists from "@assets/generated_images/senegalese_twists_protective_style.png";
import lemonadeBraids from "@assets/generated_images/lemonade_braids_with_accessories.png";
import bridalBraids from "@assets/generated_images/bridal_braided_updo_style.png";
import kidsBraids from "@assets/generated_images/kids_braids_with_colorful_beads.png";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const galleryImages = [
  { id: 1, src: classicBoxBraids, alt: "Classic Box Braids", category: "Box Braids" },
  { id: 2, src: knotlessBoxBraids, alt: "Knotless Box Braids", category: "Box Braids" },
  { id: 3, src: geometricCornrows, alt: "Geometric Cornrows", category: "Cornrows" },
  { id: 4, src: goddessBraids, alt: "Goddess Braids", category: "Protective" },
  { id: 5, src: senegaleseTwists, alt: "Senegalese Twists", category: "Twists" },
  { id: 6, src: lemonadeBraids, alt: "Lemonade Braids", category: "Stylish" },
  { id: 7, src: bridalBraids, alt: "Bridal Updo Braids", category: "Special Occasion" },
  { id: 8, src: kidsBraids, alt: "Kids Braids with Beads", category: "Kids" },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h4 className="text-accent uppercase tracking-widest text-sm font-semibold mb-3">Portfolio</h4>
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-primary">Our Braiding Work</h2>
            <p className="text-muted-foreground text-lg font-light mt-3">Showcasing our expert braiding styles and professional craftsmanship</p>
          </div>
          <button className="text-primary hover:text-accent font-medium tracking-wide border-b border-primary hover:border-accent transition-colors pb-1">
            VIEW FULL GALLERY
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryImages.map((img) => (
            <div 
              key={img.id}
              className="group relative overflow-hidden rounded-lg cursor-zoom-in aspect-[4/5]"
              onClick={() => setSelectedImage(img.src)}
              data-testid={`gallery-item-${img.id}`}
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-gradient-to-t from-black via-black/80 to-transparent">
                <p className="text-accent text-xs font-bold tracking-widest uppercase mb-1">{img.category}</p>
                <p className="text-white font-serif text-lg">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none shadow-none">
          {selectedImage && (
            <img 
              src={selectedImage} 
              alt="Gallery Preview" 
              className="w-full h-auto rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
