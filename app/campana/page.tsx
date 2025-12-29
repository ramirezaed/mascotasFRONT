"use client";

import { useEffect, useState } from "react";
import { fetchCampaña } from "../../actions/authActions";
import ListaCampanas from "../../components/ComCampana";
import ModalNuevaCampana from "../../components/ComCampana/formularioModal";
import { Stethoscope } from "lucide-react";

export default function Campana() {
  const [campañas, setCampañas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const cargarCampañas = async () => {
    setLoading(true);
    try {
      const data = await fetchCampaña();
      setCampañas(data ?? []);
    } catch (error) {
      console.error("Error al cargar campañas:", error);
      setCampañas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarCampañas();
  }, []);

  return (
    <div className="mb-12 px-4">
      {/* Encabezado */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="flex flex-col items-center justify-center mb-4 mt-8 sm:flex-row sm:justify-center">
          <Stethoscope className="w-12 h-12 mb-3 sm:mb-0 sm:mr-4 text-orange-400" />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-orange-400">
            Bienestar Animal
          </h1>
        </div>
        <p className="text-lg sm:text-xl text-gray-600">
          {/* Explora campañas de salud, vacunación y bienestar para tus mascotas.
          Participa y mantén a tus amigos peludos felices y saludables. */}
        </p>
      </div>

      {/* Botón nueva campaña */}
      <div className="mt-4 flex justify-center">
        <button
          className="px-10 py-2 bg-orange-300 text-white rounded-lg hover:bg-orange-400 cursor-pointer"
          onClick={() => setModalOpen(true)}
        >
          Nueva Campaña
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <ModalNuevaCampana
          onClose={() => setModalOpen(false)}
          onSuccess={cargarCampañas}
        />
      )}

      {/* Contenido */}
      <div className="mt-10 min-h-[90vh]">
        {loading ? (
          <div className="flex flex-col items-center justify-center mt-16">
            <div className="text-2xl font-semibold text-gray-700">
              Cargando campañas...
            </div>
          </div>
        ) : campañas.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-16">
            <div className="text-2xl font-semibold text-gray-700 mb-4 mt-11">
              No se encontró ninguna Campaña
            </div>
            <div className="text-sm text-gray-500 py-8 mt-14">
              Una vez que alguien proponga una campaña, aparecerá aquí.
            </div>
          </div>
        ) : (
          <ListaCampanas params={campañas} />
        )}
      </div>
    </div>
  );
}
