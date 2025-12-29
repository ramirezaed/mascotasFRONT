"use client";
import { useState } from "react";
import { Irefugios } from "@/types";
import { MapPin, Phone, Mail, User } from "lucide-react"; // 👈 íconos extra

export default function ListaRefugios({
  params = [],
}: {
  params?: Irefugios[];
}) {
  const [refugios] = useState<Irefugios[]>(params || []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 py-8 px-6">
      {refugios.map((refugio) => (
        <div
          key={refugio.id}
          className="bg-white rounded-2xl border border-orange-100 shadow-sm hover:shadow-lg hover:border-orange-200 transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-orange-100 to-orange-50 border-b border-orange-100">
            <h2 className="text-lg font-semibold text-orange-600">
              Capacidad: {refugio.capacidad} mascotas
            </h2>
          </div>

          {/* Contenido */}
          <div className="p-6 flex-1 flex flex-col justify-between">
            {/* <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {refugio.descripcion}
            </p> */}
            <p className="text-gray-600 text-sm mb-4">{refugio.descripcion}</p>

            {/* Etiquetas */}
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-700">
                <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                {refugio.ubicacion || "Sin ubicación"}
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <User className="w-4 h-4 mr-2 text-orange-500" />
                {refugio.contactoNombre || "Sin contacto"}
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <Mail className="w-4 h-4 mr-2 text-orange-500" />
                {refugio.contactoCorreo || "Sin correo"}
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <Phone className="w-4 h-4 mr-2 text-orange-500" />
                {refugio.contactoTelefono || "Sin teléfono"}
              </div>
            </div>
          </div>

          {/* Footer con botón */}
          <div className="px-6 py-4 bg-orange-50 border-t border-orange-100 flex justify-end">
            {/* <button className="px-4 py-2 text-sm bg-orange-500 text-white rounded-xl shadow hover:bg-orange-600 transition">
              Contactar
            </button> */}
          </div>
        </div>
      ))}
    </div>
  );
}
