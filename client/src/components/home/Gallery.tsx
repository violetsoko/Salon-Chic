import { useState } from "react";
import image1 from "@assets/Screenshot_20251222_071218_com.android.gallery3d_edit_34296968_1766380789637.jpg";
import image2 from "@assets/Screenshot_20251222_071537_com.huawei.himovie.overseas_edit_34_1766380789728.jpg";
import image3 from "@assets/Screenshot_20251222_071612_com.huawei.himovie.overseas_edit_34_1766380789766.jpg";
import image4 from "@assets/Screenshot_20251222_070754_com.huawei.himovie.overseas_edit_34_1766380789847.jpg";
import image5 from "@assets/Screenshot_20251222_070824_com.huawei.himovie.overseas_edit_33_1766380789883.jpg";
import image6 from "@assets/Screenshot_20251222_070858_com.huawei.himovie.overseas_edit_33_1766380789921.jpg";
import image7 from "@assets/Screenshot_20251222_070948_com.huawei.himovie.overseas_edit_33_1766380789961.jpg";
import image8 from "@assets/Screenshot_20251222_070916_com.huawei.himovie.overseas_1766380790004.jpg";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const galleryImages = [
  { id: 1, src: image1, alt: "Cornrows with Beads", category: "Cornrows" },
  { id: 2, src: image2, alt: "Goddess Braids", category: "Goddess Braids" },
  { id: 3, src: image3, alt: "Long Box Braids", category: "Box Braids" },
  { id: 4, src: image4, alt: "Salon Cornrows", category: "Cornrows" },
  { id: 5, src: image5, alt: "Creative Bun Braids", category: "Bun Braids" },
  { id: 6, src: image6, alt: "Underwig Cornrows Design", category: "Cornrows" },
  { id: 7, src: image7, alt: "Side Feed-in Braids", category: "Feed-in Braids" },
  { id: 8, src: image8, alt: "Locs Styling", category: "Locs" },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h4 className="text-accent uppercase tracking-widest text-sm font-semibold mb-3">Portfolio</h4>
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-primary">Our Braiding Gallery</h2>
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
