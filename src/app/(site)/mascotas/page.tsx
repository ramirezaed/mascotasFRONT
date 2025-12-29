"use client";
import { perdidas, encontradas } from "@/actions/authActions";
import ToggleMascotas from "@/components/ComMascotas/toggle";
import ListaMascotas from "@/components/ComMascotas";
import { Imascotas } from "@/types";
import { useEffect, useState } from "react";
import ModalNuevaMascota from "@/components/ComMascotas/formularioModal";
import { Heart } from "lucide-react";

export default function Mascotas() {
  const [estado, setEstado] = useState<"PERDIDA" | "ENCONTRADA">("PERDIDA");
  const [mascotas, setMascotas] = useState<Imascotas[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false); // <-- controlar el modal

  const fetchMascotas = async () => {
    setLoading(true);
    try {
      const data =
        estado === "PERDIDA" ? await perdidas() : await encontradas();
      setMascotas(data ?? []);
    } catch (e) {
      console.error(e);
      setMascotas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMascotas();
  }, [estado]);

  return (
    <div>
      {/* Botón para abrir modal */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4 mt-7">
          <Heart className="w-12 h-12  text-orange-500 mr-3" />
          <h1 className="text-4xl font-bold text-orange-400">
            Mascotas Perdidas y Encontradas
          </h1>
        </div>
        {/* <p className="text-xl text-muted-foreground"> */}
      </div>
      <div className="mt-4 flex justify-center">
        <button
          className="px-10 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-600 cursor-pointer  "
          onClick={() => setModalOpen(true)}
        >
          + Reportar Mascota
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <ModalNuevaMascota
          onClose={() => setModalOpen(false)} // cierra modal
          onSuccess={fetchMascotas} // refresca lista después de crear
        />
      )}

      <div className="mt-10 min-h-[90vh]">
        <ToggleMascotas estado={estado} onChange={setEstado} />

        {loading ? (
          <div className="flex flex-col items-center justify-center mt-16">
            <div className="text-2xl font-semibold text-orange-400">
              Cargando...
            </div>
          </div>
        ) : mascotas.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-16">
            <div className="text-2xl font-semibold text-gray-700 mb-4 mt-11">
              No hay ninguna mascota {estado.toLowerCase()}
            </div>
            <div className="text-sm text-gray-500 py-8 mt-14">
              Una vez que se realice una solicitud, aparecerá aquí.
            </div>
          </div>
        ) : (
          <ListaMascotas params={mascotas} />
        )}
      </div>
    </div>
  );
}
