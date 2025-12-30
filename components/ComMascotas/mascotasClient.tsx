// "use client";

// import { perdidas, encontradas } from "../../actions/authActions";
// import ToggleMascotas from "../../components/ComMascotas/toggle";
// import ListaMascotas from "../../components/ComMascotas/index";
// import { Imascotas } from "../../types";
// import { useEffect, useState } from "react";
// import ModalNuevaMascota from "../../components/ComMascotas/formularioModal";
// import { Heart } from "lucide-react";

// export default function MascotasClient() {
//   const [estado, setEstado] = useState<"PERDIDA" | "ENCONTRADA">("PERDIDA");
//   const [mascotas, setMascotas] = useState<Imascotas[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);

//   const fetchMascotas = async () => {
//     setLoading(true);
//     try {
//       const data =
//         estado === "PERDIDA" ? await perdidas() : await encontradas();
//       setMascotas(data ?? []);
//     } catch (e) {
//       console.error(e);
//       setMascotas([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMascotas();
//   }, [estado]);

//   return (
//     <div>
//       <div className="text-center mb-12">
//         <div className="flex items-center justify-center mb-4 mt-7">
//           <Heart className="w-12 h-12 text-orange-500 mr-3" />
//           <h1 className="text-4xl font-bold text-orange-400">
//             Mascotas Perdidas y Encontradas
//           </h1>
//         </div>
//       </div>

//       <div className="mt-4 flex justify-center">
//         <button
//           className="px-10 py-2 bg-orange-400 text-white rounded-lg"
//           onClick={() => setModalOpen(true)}
//         >
//           Reportar Mascota
//         </button>
//       </div>

//       {modalOpen && (
//         <ModalNuevaMascota
//           onClose={() => setModalOpen(false)}
//           onSuccess={fetchMascotas}
//         />
//       )}

//       <div className="mt-10 min-h-[90vh]">
//         <ToggleMascotas estado={estado} onChange={setEstado} />

//         {loading ? (
//           <div className="text-center text-orange-400 text-2xl mt-16">
//             Cargando...
//           </div>
//         ) : mascotas.length === 0 ? (
//           <div className="text-center text-gray-600 mt-16">
//             No hay mascotas {estado.toLowerCase()}
//           </div>
//         ) : (
//           <ListaMascotas params={mascotas} />
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import ToggleMascotas from "../../components/ComMascotas/toggle";
import ListaMascotas from "../../components/ComMascotas/index";
import { Imascotas } from "../../types";
import { useEffect, useState } from "react";
import ModalNuevaMascota from "../../components/ComMascotas/formularioModal";
import { Heart } from "lucide-react";

export default function MascotasClient() {
  const [estado, setEstado] = useState<"PERDIDA" | "ENCONTRADA">("PERDIDA");
  const [mascotas, setMascotas] = useState<Imascotas[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchMascotas = async () => {
    setLoading(true);
    try {
      const url =
        estado === "PERDIDA"
          ? `${process.env.NEXT_PUBLIC_API_HOST}/api/mascotas/perdidas`
          : `${process.env.NEXT_PUBLIC_API_HOST}/api/mascotas/encontradas`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error al obtener mascotas");
      }

      const data = await response.json();
      setMascotas(data ?? []);
    } catch (error) {
      console.error("Error fetching mascotas:", error);
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
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4 mt-7">
          <Heart className="w-12 h-12 text-orange-500 mr-3" />
          <h1 className="text-4xl font-bold text-orange-400">
            Mascotas Perdidas y Encontradas
          </h1>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <button
          className="px-10 py-2 bg-orange-400 text-white rounded-lg"
          onClick={() => setModalOpen(true)}
        >
          Reportar Mascota
        </button>
      </div>

      {modalOpen && (
        <ModalNuevaMascota
          onClose={() => setModalOpen(false)}
          onSuccess={fetchMascotas}
        />
      )}

      <div className="mt-10 min-h-[90vh]">
        <ToggleMascotas estado={estado} onChange={setEstado} />

        {loading ? (
          <div className="text-center text-orange-400 text-2xl mt-16">
            Cargando...
          </div>
        ) : mascotas.length === 0 ? (
          <div className="text-center text-gray-600 mt-16">
            No hay mascotas {estado.toLowerCase()}
          </div>
        ) : (
          <ListaMascotas params={mascotas} />
        )}
      </div>
    </div>
  );
}
