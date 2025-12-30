import { Heart } from "lucide-react";
import Link from "next/link";

export default function Encabezado() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/assets/hero-pets.jpg)" }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-background/95 via-background/80 to-background/95" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Heart className="w-12 h-12 mr-3 text-orange-500" />
            <h1 className="text-5xl md:text-7xl font-bold text-orange-400">
              RedMascotas
            </h1>
          </div>

          <p className="text-xl md:text-2xl mb-8 text-gray-800">
            Conectamos mascotas perdidas con sus familias...
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/campana"
              className="bg-orange-300 text-white px-4 py-2 rounded-xl  hover:bg-orange-500 transition w-40"
            >
              Ver Campañas
            </Link>
            <Link
              href="/refugios"
              className="bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-700 transition w-40"
            >
              Ver Refugios
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
