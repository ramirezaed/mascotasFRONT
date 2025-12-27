import { Heart } from "lucide-react";
export default function Footer() {
  return (
    <footer className="bg-card border-t border-orange-200 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center mb-4">
              <Heart className="w-8 h-8 mr-2 text-orange-500" />
              <span className="text-2xl font-bold text-orange-400">
                RedMascotas
              </span>
            </div>
            <p className=" mb-4 max-w-md text-gray-500">
              Conectando mascotas con sus familias y construyendo una comunidad
              más cuidadosa para nuestros amigos peludos.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-black">Servicios</h3>
            <ul className="space-y-2  text-gray-500">
              <li>Mascotas Perdidas</li>
              <li>Mascotas Encontradas</li>
              <li>Refugio Temporal</li>
              <li>Campañas de Vacunación</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-black">Contacto</h3>
            <ul className="space-y-2  text-gray-500">
              <li>ayuda@redmascotas.com</li>
              {/* <li>+1 (555) 123-4567</li> */}
              {/* <li>Síguenos en redes</li> */}
            </ul>
          </div>
        </div>

        <div className="border-t border-orange-200 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; 2025 RedMascotas. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
