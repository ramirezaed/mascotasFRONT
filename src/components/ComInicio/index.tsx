import { Heart } from "lucide-react";
import heroImage from "@/assets/hero-pets.jpg";
import Link from "next/link";

export default function Encabezado() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage.src})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/95"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Heart className="w-12 h-12 mr-3 text-orange-500" />
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-hero bg-clip-text text-orange-400">
              RedMascotas
            </h1>
          </div>

          <p className="text-xl md:text-2xl  mb-8 leading-relaxed text-gray-800">
            Conectamos mascotas perdidas con sus familias, ofrecemos refugio
            temporal y promovemos campañas de vacunación en nuestra comunidad
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/campana">
              <button className=" bg-amber-500 w-42 h-10 rounded-xl  text-white mt-4 flex items-center justify-center gap-2 cursor-pointer hover:bg-amber-600">
                Ver Campañas
              </button>
            </Link>
            <Link href="/refugios">
              <button className=" bg-slate-50 w-42 h-10 rounded-xl  text-black mt-4 flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-100">
                Ver Refugios
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
