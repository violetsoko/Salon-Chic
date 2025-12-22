import { useState } from "react";
import heroImage from "@assets/generated_images/hero_image_of_woman_with_flowing_hair.png";
import colorImage from "@assets/generated_images/hair_coloring_service_image.png";
import cutImage from "@assets/generated_images/haircut_service_image.png";
import extensionImage from "@assets/generated_images/extensions_service_image.png";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const galleryImages = [
  { id: 1, src: colorImage, alt: "Blonde Balayage Transformation", category: "Color" },
  { id: 2, src: extensionImage, alt: "Volume Extensions", category: "Extensions" },
  { id: 3, src: cutImage, alt: "Precision Bob Cut", category: "Cut" },
  { id: 4, src: heroImage, alt: "Glamour Styling", category: "Style" },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h4 className="text-accent uppercase tracking-widest text-sm font-semibold mb-3">Portfolio</h4>
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-primary">Real Transformations</h2>
          </div>
          <button className="text-primary hover:text-accent font-medium tracking-wide border-b border-primary hover:border-accent transition-colors pb-1">
            VIEW FULL GALLERY
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryImages.map((img) => (
            <div 
              key={img.id}
              className="group relative overflow-hidden rounded-lg cursor-zoom-in aspect-square"
              onClick={() => setSelectedImage(img.src)}
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
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
