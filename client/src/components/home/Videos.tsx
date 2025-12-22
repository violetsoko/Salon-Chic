import { useState } from "react";
import { Play } from "lucide-react";

const videos = [
  {
    id: 1,
    title: "Box Braids",
    src: "/attached_assets/44866e04b82afa54babf6ee8a2a8f047_1766377113492.mp4",
  },
  {
    id: 2,
    title: "Knotless Braids",
    src: "/attached_assets/807a360603ef04dedc93ef80b0a0b11f_1766377113695.mp4",
  },
  {
    id: 3,
    title: "Cornrows",
    src: "/attached_assets/37265b4dd110e7f81ba7bba3f6c49d93_1766377113757.mp4",
  },
  {
    id: 4,
    title: "Goddess Braids",
    src: "/attached_assets/327ce19813f75444b61f248311f2e68d_1766377113810.mp4",
  },
  {
    id: 5,
    title: "Twists",
    src: "/attached_assets/e763ef1f171361e0b05b9edbd12062f6_1766377113849.mp4",
  },
  {
    id: 6,
    title: "Lemonade Braids",
    src: "/attached_assets/0f3751f129b0d737945ae15e7ac087f1_1766377113897.mp4",
  },
  {
    id: 7,
    title: "Bridal Updo",
    src: "/attached_assets/065a74cc055395d54a9a981e5862974f_1766377113950.mp4",
  },
  {
    id: 8,
    title: "Kids Braids",
    src: "/attached_assets/a4c3cbdeaa578b7dd938064d1c09c538_1766377113999.mp4",
  },
];

export default function Videos() {
  const [playingId, setPlayingId] = useState<number | null>(null);

  return (
    <section id="videos" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h4 className="text-accent uppercase tracking-widest text-sm font-semibold mb-3">Video Showcase</h4>
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-primary mb-6">See Our Work in Action</h2>
          <p className="text-muted-foreground text-lg font-light">
            Watch our expert braiders create stunning styles. From start to finish, witness the precision and artistry that goes into every braid.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="group relative overflow-hidden rounded-lg bg-secondary/20 aspect-[9/16]"
              onClick={() => setPlayingId(video.id)}
              data-testid={`video-card-${video.id}`}
            >
              <video
                src={video.src}
                className="w-full h-full object-cover cursor-pointer"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-accent/0 group-hover:bg-accent transition-colors duration-300 flex items-center justify-center">
                  <Play className="h-8 w-8 text-white fill-white" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/60 to-transparent">
                <p className="text-white font-serif text-lg">{video.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground text-lg mb-4">
            Follow us on TikTok and Instagram for more braiding inspiration and styling tips!
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="#"
              className="px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-white rounded-full transition-colors font-medium"
              data-testid="link-tiktok"
            >
              TikTok
            </a>
            <a
              href="#"
              className="px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-white rounded-full transition-colors font-medium"
              data-testid="link-instagram"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
