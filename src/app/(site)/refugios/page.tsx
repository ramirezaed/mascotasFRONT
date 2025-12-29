"use client";

import { useEffect, useState } from "react";
import { fetchRefugios } from "@/actions/authActions";
import ListaRefugios from "@/components/ComRefugios";
import ModalNuevoRefugio from "@/components/ComRefugios/formularioModal";
import { Home } from "lucide-react";
import { Irefugios } from "@/types";

export default function Alojamientos() {
  const [refugios, setRefugios] = useState<Irefugios[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const cargarRefugios = async () => {
    setLoading(true);
    try {
      const data = await fetchRefugios();
      setRefugios(data ?? []);
    } catch (error) {
      console.error("Error al cargar refugios:", error);
      setRefugios([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarRefugios();
  }, []);

  return (
    <div className="mb-12 px-4">
      {/* Encabezado */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="flex flex-col items-center justify-center mb-4 mt-8 sm:flex-row sm:justify-center">
          <Home className="w-12 h-12 mb-3 sm:mb-0 sm:mr-4 text-orange-400" />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-orange-400">
            Hogares Temporales
          </h1>
        </div>
        <p className="text-lg sm:text-xl text-gray-600">
          {/* Un espacio para conectar mascotas con hogares temporales. Descubrí
          opciones disponibles o compartí la tuya para ayudar. */}
        </p>
      </div>

      {/* Botón nuevo refugio */}
      <div className="mt-4 flex justify-center">
        <button
          className="px-10 py-2 bg-orange-300 text-white rounded-lg hover:bg-orange-400 cursor-pointer"
          onClick={() => setModalOpen(true)}
        >
          + Nuevo Alojamiento
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <ModalNuevoRefugio
          onClose={() => setModalOpen(false)}
          onSuccess={cargarRefugios}
        />
      )}

      {/* Contenido */}
      <div className="mt-10 min-h-[90vh]">
        {loading ? (
          <div className="flex flex-col items-center justify-center mt-16">
            <div className="text-2xl font-semibold text-orange-400">
              Cargando Alojamientos...
            </div>
          </div>
        ) : refugios.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-16">
            <div className="text-2xl font-semibold text-gray-700 mb-4 mt-11">
              No se encontró ningun alojamiento temporario
            </div>
            <div className="text-sm text-gray-500 py-8 mt-4">
              Una vez que alguien proponga un alojamiento, aparecerá aquí.
            </div>
          </div>
        ) : (
          <ListaRefugios params={refugios} />
        )}
      </div>
    </div>
  );
}
