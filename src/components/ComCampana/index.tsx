"use client";
import { useState } from "react";
import { Icampana } from "@/types";
import { CalendarDays, MapPin } from "lucide-react";

export default function ListaCampañas({
  params = [],
}: {
  params?: Icampana[];
}) {
  const [campanas] = useState<Icampana[]>(params || []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 py-8 px-6">
      {campanas.map((campana) => (
        <div
          key={campana.id}
          className="bg-white rounded-2xl border border-orange-100 shadow-sm hover:shadow-lg hover:border-orange-200 transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-orange-100 to-orange-50 border-b border-orange-100">
            <h2 className="text-lg font-semibold text-orange-600">
              {campana.titulo}
            </h2>
          </div>

          {/* Contenido */}
          <div className="p-6 flex-1 flex flex-col justify-between">
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {campana.descripcion}
            </p>

            {/* Etiquetas */}
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-700">
                <CalendarDays className="w-4 h-4 mr-2 text-orange-500" />
                {campana.fecha
                  ? new Date(campana.fecha).toLocaleDateString("es-AR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })
                  : "Sin fecha"}
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                {campana.ubicacion || "Sin ubicación"}
              </div>
            </div>
          </div>

          {/* Footer con botón */}
          <div className="px-6 py-4 bg-orange-50 border-t border-orange-100 flex justify-end"></div>
        </div>
      ))}
    </div>
  );
}
