import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const braidingCategories = [
  {
    id: 1,
    category: "Box Braids",
    styles: [
      "Classic box braids",
      "Knotless box braids",
      "Small box braids",
      "Medium box braids",
      "Large / jumbo box braids",
      "Long box braids",
      "Short box braids",
    ],
    emoji: "📦",
  },
  {
    id: 2,
    category: "Cornrows & Feed-In Braids",
    styles: [
      "Straight back cornrows",
      "Feed-in cornrows",
      "Ghana braids",
      "Stitch braids",
      "Side part cornrows",
      "Tribal cornrows",
    ],
    emoji: "🌾",
  },
  {
    id: 3,
    category: "Twist Braids",
    styles: [
      "Senegalese twists",
      "Passion twists",
      "Spring twists",
      "Marley twists",
      "Havana twists",
    ],
    emoji: "✨",
  },
  {
    id: 4,
    category: "Stylish & Protective Braids",
    styles: [
      "Lemonade braids",
      "Goddess braids",
      "Fulani braids",
      "Boho braids",
      "Butterfly braids",
    ],
    emoji: "👑",
  },
  {
    id: 5,
    category: "Braided Updos & Special Styles",
    styles: [
      "Braided bun",
      "Half-up half-down braids",
      "Crown braids",
      "Bridal braided styles",
      "Party & occasion braids",
    ],
    emoji: "💒",
  },
  {
    id: 6,
    category: "Kids Braiding",
    styles: [
      "Kids box braids",
      "Braids with beads",
      "Simple cornrows for kids",
    ],
    emoji: "👧",
  },
];

export default function Services() {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  const toggleCategory = (id: number) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h4 className="text-accent uppercase tracking-widest text-sm font-semibold mb-3">Our Specialty</h4>
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-primary mb-6">Braiding Styles</h2>
          <p className="text-muted-foreground text-lg font-light">
            Professional braiding services tailored to your style. From classic box braids to intricate designs, we specialise in all braiding techniques.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {braidingCategories.map((categoryItem) => (
            <div
              key={categoryItem.id}
              className="bg-card border border-border/50 rounded-sm overflow-hidden hover:shadow-lg transition-all duration-300"
              data-testid={`category-${categoryItem.id}`}
            >
              <button
                onClick={() => toggleCategory(categoryItem.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary/30 transition-colors"
                data-testid={`button-expand-${categoryItem.id}`}
              >
                <div className="flex items-center gap-4 text-left">
                  <span className="text-4xl">{categoryItem.emoji}</span>
                  <h3 className="text-xl font-serif font-semibold text-primary">
                    {categoryItem.category}
                  </h3>
                </div>
                <ChevronDown
                  size={24}
                  className={`text-accent transition-transform duration-300 ${
                    expandedCategory === categoryItem.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expandedCategory === categoryItem.id && (
                <div className="px-6 py-4 border-t border-border/50 bg-secondary/10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    {categoryItem.styles.map((style, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 py-2"
                        data-testid={`style-${categoryItem.id}-${idx}`}
                      >
                        <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                        <span className="text-foreground text-sm">{style}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="w-full bg-accent hover:bg-accent/90 text-white rounded-sm mt-4"
                    data-testid={`button-book-${categoryItem.id}`}
                  >
                    Book {categoryItem.category}
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground text-lg mb-4">
            Don't see your style? We create custom braiding designs tailored to your vision.
          </p>
          <Button
            size="lg"
            className="bg-primary text-white hover:bg-primary/90 rounded-full px-8"
            data-testid="button-contact-custom"
          >
            Contact for Custom Design
          </Button>
        </div>
      </div>
    </section>
  );
}
