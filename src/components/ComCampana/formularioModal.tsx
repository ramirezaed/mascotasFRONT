"use client";

import { useState } from "react";
import { newCampana } from "@/actions/authActions"; // Acción que envía los datos al backend
import { FiX, FiMapPin, FiCalendar } from "react-icons/fi"; // Iconos de UI
import { IcampanaForm } from "@/types"; // Tipado de props para el modal

/**
 * Componente ModalNuevaCampana
 *
 * Este componente representa un modal para crear una nueva campaña.
 * Contiene campos: título, descripción, fecha y ubicación.
 * Realiza validaciones de campos obligatorios y fecha futura.
 * Refresca la lista de campañas en la página padre al crear una nueva campaña.
 *
 * Props:
 * - onClose: función para cerrar el modal
 * - onSuccess: función que se ejecuta después de crear la campaña (ej: recargar lista)
 */
export default function ModalNuevaCampana({
  onClose,
  onSuccess,
}: IcampanaForm) {
  // -----------------------------------
  // ESTADOS DEL COMPONENTE
  // -----------------------------------

  const [titulo, setTitulo] = useState(""); // Título de la campaña
  const [descripcion, setDescripcion] = useState(""); // Descripción
  const [fecha, setFecha] = useState(""); // Fecha en formato string YYYY-MM-DD
  const [ubicacion, setUbicacion] = useState(""); // Ubicación
  const [loading, setLoading] = useState(false); // Estado de carga mientras se envía
  const [errorMsg, setErrorMsg] = useState<string | null>(null); // Mensaje de error

  // -----------------------------------
  // FUNCIONES AUXILIARES
  // -----------------------------------

  /**
   * resetForm
   * Limpia todos los campos del formulario y el mensaje de error
   */
  const resetForm = () => {
    setTitulo("");
    setDescripcion("");
    setFecha("");
    setUbicacion("");
    setErrorMsg(null);
  };

  // -----------------------------------
  // FUNCIONES PRINCIPALES
  // -----------------------------------

  /**
   * handleSubmit
   * Se ejecuta al enviar el formulario
   * Valida que todos los campos estén completos
   * Valida que la fecha sea hoy o futura
   * Llama a la acción newCampana para enviar datos al backend
   * Cierra el modal y ejecuta onSuccess para refrescar la lista
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Validación de campos obligatorios
    if (!titulo || !descripcion || !fecha || !ubicacion) {
      setErrorMsg("Por favor completa todos los campos");
      return;
    }

    // ✅ Validación de fecha futura
    const selectedDate = new Date(fecha);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ignora hora
    if (selectedDate < today) {
      setErrorMsg("La fecha debe ser hoy o futura");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const fechaLocal = fecha + "T00:00:00";
      // Llamada al backend para crear la campaña
      await newCampana({
        titulo,
        descripcion,
        fecha: fechaLocal,
        ubicacion,
      });

      onClose(); // Cierra el modal

      // Refresca la lista de campañas en la página padre
      if (onSuccess) await onSuccess();

      // Limpia el formulario
      resetForm();
    } catch (error: any) {
      console.error("Error creando campaña:", error);
      setErrorMsg(error.message || "Error al crear la campaña");
    } finally {
      setLoading(false);
    }
  };

  /**
   * handleCancel
   * Cancela la creación de la campaña y cierra el modal
   */
  const handleCancel = () => {
    resetForm();
    onClose();
  };

  // -----------------------------------
  // RENDER DEL COMPONENTE
  // -----------------------------------

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 backdrop-blur-sm">
      <div className="bg-orange-50 rounded-2xl shadow-xl p-6 w-full max-w-md relative">
        {/* Botón para cerrar modal */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-orange-600 hover:text-orange-800 cursor-pointer"
        >
          <FiX size={24} />
        </button>

        {/* Título y mensaje */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold text-orange-700">
            🐾 Nueva Campaña
          </h2>
          <p className="text-sm text-orange-600 mt-1">
            Completa los datos de la campaña
          </p>
          {errorMsg && <p className="mt-2 text-red-600 text-sm">{errorMsg}</p>}
        </div>

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo Título */}
          <div>
            <label className="block text-sm font-medium text-orange-700 mb-1">
              Nombre de la campaña
            </label>
            <input
              type="text"
              required
              placeholder="Nombre de la campaña"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full border border-orange-200 p-2 rounded-lg focus:ring-2 focus:ring-orange-300 outline-none"
            />
          </div>

          {/* Campo Descripción */}
          <div>
            <label className="block text-sm font-medium text-orange-700 mb-1">
              Descripción
            </label>
            <textarea
              required
              placeholder="Escribe la descripción de la campaña"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full border border-orange-200 p-2 rounded-lg focus:ring-2 focus:ring-orange-300 outline-none resize-none h-20"
            />
          </div>

          {/* Campos Fecha y Ubicación */}
          <div className="grid grid-cols-2 gap-4">
            {/* Fecha */}
            <div>
              <label className="block text-sm font-medium text-orange-700 mb-1">
                Fecha
              </label>
              <div className="relative">
                <FiCalendar className="absolute left-2 top-2 text-orange-400" />
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full pl-8 border border-orange-200 p-2 rounded-lg focus:ring-2 focus:ring-orange-300 outline-none"
                  min={new Date().toISOString().split("T")[0]} // deshabilita fechas pasadas
                />
              </div>
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
                  required
                  placeholder="Ej: Ciudad, Barrio"
                  value={ubicacion}
                  onChange={(e) => setUbicacion(e.target.value)}
                  className="w-full pl-8 border border-orange-200 p-2 rounded-lg focus:ring-2 focus:ring-orange-300 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Botones Cancelar y Guardar */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="cursor-pointer px-5 py-2 rounded-lg bg-orange-200 text-orange-700 hover:bg-orange-300 transition"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer px-5 py-2 rounded-lg bg-orange-400 text-white hover:bg-orange-500 transition disabled:opacity-70"
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
