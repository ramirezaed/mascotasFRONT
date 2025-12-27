"use client";

import { useState } from "react";
import { newRefugio } from "@/actions/authActions";
import { FiX, FiMapPin } from "react-icons/fi";
import { IrefugiosForm } from "@/types";

export default function ModalNuevoRefugio({
  onClose,
  onSuccess,
}: IrefugiosForm) {
  // ------------------------
  // ESTADOS
  // ------------------------

  const [descripcion, setDescripcion] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [capacidad, setCapacidad] = useState<number | "">("");
  const [contactoNombre, setContactoNombre] = useState("");
  const [contactoCorreo, setContactoCorreo] = useState("");
  const [contactoTelefono, setContactoTelefono] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // ------------------------
  // HELPERS
  // ------------------------

  const resetForm = () => {
    setDescripcion("");
    setUbicacion("");
    setCapacidad("");
    setContactoNombre("");
    setContactoCorreo("");
    setContactoTelefono("");
    setErrorMsg(null);
  };

  // ------------------------
  // SUBMIT
  // ------------------------

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!descripcion || !ubicacion || !contactoNombre || !contactoCorreo) {
      setErrorMsg("Por favor completá todos los campos obligatorios");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      await newRefugio({
        descripcion,
        ubicacion,
        capacidad: capacidad === "" ? undefined : Number(capacidad),
        contactoNombre,
        contactoCorreo,
        contactoTelefono,
      });

      if (onSuccess) await onSuccess();
      resetForm();
      onClose();
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message || "Error al crear el refugio");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------
  // RENDER
  // ------------------------

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 backdrop-blur-sm">
      <div className="bg-orange-50 rounded-2xl shadow-xl p-6 w-full max-w-md relative">
        {/* Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-orange-600 hover:text-orange-800"
        >
          <FiX size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold text-orange-700">
            🏠 Nuevo Refugio
          </h2>
          <p className="text-sm text-orange-600 mt-1">
            Ingresá la información del refugio
          </p>
          {errorMsg && <p className="mt-2 text-red-600 text-sm">{errorMsg}</p>}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-orange-700 mb-1">
              Descripción
            </label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full border border-orange-200 p-2 rounded-lg resize-none h-20"
              required
            />
          </div>

          {/* Ubicación */}
          <div>
            <label className="block text-sm font-medium text-orange-700 mb-1">
              Ubicación
            </label>
            <div className="relative">
              <FiMapPin className="absolute left-2 top-2 text-orange-400" />
              <input
                type="text"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                className="w-full pl-8 border border-orange-200 p-2 rounded-lg"
                required
              />
            </div>
          </div>

          {/* Capacidad */}
          <div>
            <label className="block text-sm font-medium text-orange-700 mb-1">
              Capacidad (opcional)
            </label>
            <input
              type="number"
              min={1}
              value={capacidad}
              onChange={(e) =>
                setCapacidad(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              className="w-full border border-orange-200 p-2 rounded-lg"
            />
          </div>

          {/* Contacto */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nombre de contacto"
              value={contactoNombre}
              onChange={(e) => setContactoNombre(e.target.value)}
              className="border border-orange-200 p-2 rounded-lg"
              required
            />
            <input
              type="email"
              placeholder="Correo de contacto"
              value={contactoCorreo}
              onChange={(e) => setContactoCorreo(e.target.value)}
              className="border border-orange-200 p-2 rounded-lg"
              required
            />
          </div>

          <input
            type="text"
            placeholder="Teléfono de contacto"
            value={contactoTelefono}
            onChange={(e) => setContactoTelefono(e.target.value)}
            className="w-full border border-orange-200 p-2 rounded-lg"
          />

          {/* Botones */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-orange-200 text-orange-700 hover:bg-orange-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-orange-400 text-white hover:bg-orange-500 disabled:opacity-70"
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
