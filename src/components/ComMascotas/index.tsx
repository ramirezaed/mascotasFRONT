"use client";
import { Imascotas } from "@/types";
import { useState } from "react";

export default function ListaMascotas({
  params = [],
}: {
  params?: Imascotas[];
}) {
  const [mascotas, setMascotas] = useState<Imascotas[]>(params || []);
  const [contactoAbierto, setContactoAbierto] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 py-10">
      {mascotas.map((mascota) => (
        <div
          key={mascota.id}
          className="bg-white rounded-3xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
        >
          {/* Imagen con overlay */}
          <div className="relative h-56 w-full bg-gray-100">
            {mascota.imagen ? (
              <img
                src={mascota.imagen}
                alt={mascota.nombre || "Mascota"}
                className="h-full w-full object-contain bg-gray-100"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-gray-400">
                Sin imagen
              </div>
            )}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
              <h2 className="text-white text-xl font-bold">{mascota.nombre}</h2>
              <p className="text-sm text-gray-200">{mascota.estado}</p>
            </div>
          </div>

          {/* Contenido */}
          <div className="p-6">
            <p className="text-gray-700 mb-1">
              <strong>Tipo:</strong> {mascota.tipo}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Raza:</strong> {mascota.raza || "No especificada"}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Tamaño:</strong> {mascota.tamaño || "No especificado"}
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Descripción:</strong>{" "}
              {mascota.descripcion || "Sin descripción"}
            </p>

            {mascota.contactoNombre ||
            mascota.contactoCorreo ||
            mascota.contactoTelefono ? (
              <>
                <button
                  onClick={() =>
                    setContactoAbierto(
                      contactoAbierto === mascota.id ? null : mascota.id
                    )
                  }
                  className="w-full bg-orange-500 hover cursor-pointer text-white py-2 rounded-xl font-semibold hover:bg-orange-700 transition-colors"
                >
                  {contactoAbierto === mascota.id
                    ? "Ocultar contacto"
                    : "Contactar"}
                </button>

                {contactoAbierto === mascota.id && (
                  <div className="mt-4 bg-orange-50 p-4 rounded-xl text-sm text-gray-700 space-y-1">
                    {mascota.contactoNombre && (
                      <p>
                        <strong>Nombre:</strong> {mascota.contactoNombre}
                      </p>
                    )}
                    {mascota.contactoCorreo && (
                      <p>
                        <strong>Email:</strong> {mascota.contactoCorreo}
                      </p>
                    )}
                    {mascota.contactoTelefono && (
                      <p>
                        <strong>Teléfono:</strong> {mascota.contactoTelefono}
                      </p>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="text-gray-400 text-center py-2">
                Sin datos de contacto
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
