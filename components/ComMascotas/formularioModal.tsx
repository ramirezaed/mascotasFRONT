"use client";
import { useState } from "react";

import { newMascotas } from "../../actions/authActions";
import { FiX, FiCamera } from "react-icons/fi";

interface ModalNuevaMascotaProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ModalNuevaMascota({
  onClose,
  onSuccess,
}: ModalNuevaMascotaProps) {
  const [nombre, setNombre] = useState("");
  const [raza, setRaza] = useState("");
  const [tipo, setTipo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState<"PERDIDA" | "ENCONTRADA">("PERDIDA");
  const [contactoNombre, setContactoNombre] = useState("");
  const [contactoCorreo, setContactoCorreo] = useState("");
  const [contactoTelefono, setContactoTelefono] = useState("");
  const [imagen, setImagen] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setNombre("");
    setRaza("");
    setTipo("");
    setDescripcion("");
    setEstado("PERDIDA");
    setContactoNombre("");
    setContactoCorreo("");
    setContactoTelefono("");
    setImagen(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("raza", raza);
      formData.append("tipo", tipo);
      formData.append("descripcion", descripcion);
      formData.append("estado", estado);
      formData.append("contactoNombre", contactoNombre);
      formData.append("contactoCorreo", contactoCorreo);
      formData.append("contactoTelefono", contactoTelefono);
      if (imagen) formData.append("imagen", imagen);

      await newMascotas(formData);
      onSuccess?.();
      resetForm();
      onClose();
    } catch (error: any) {
      alert(error.message || "Error al crear la mascota");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-orange-50 rounded-xl shadow-lg p-4 w-full max-w-sm relative">
        {/* Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-orange-600 hover:text-orange-800"
        >
          <FiX size={18} />
        </button>

        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-orange-700">
            🐾 Nueva Mascota
          </h2>
          <p className="text-sm text-orange-600">Completá los datos</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Datos principales */}
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="w-full border border-orange-200 py-1.5 px-2 text-sm rounded-md"
            />
            <input
              type="text"
              placeholder="Raza"
              value={raza}
              onChange={(e) => setRaza(e.target.value)}
              className="w-full border border-orange-200 py-1.5 px-2 text-sm rounded-md"
            />
            <input
              type="text"
              name="tipo"
              placeholder="Tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
              className="w-full border border-orange-200 py-1.5 px-2 text-sm rounded-md"
            />
            <select
              value={estado}
              onChange={(e) =>
                setEstado(e.target.value as "PERDIDA" | "ENCONTRADA")
              }
              className="w-full border border-orange-200 py-1.5 px-2 text-sm rounded-md"
            >
              <option value="PERDIDA">PERDIDA/O</option>
              <option value="ENCONTRADA">ENCONTRADA/O</option>
            </select>
          </div>

          {/* Descripción */}
          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full border border-orange-200 py-1.5 px-2 text-sm rounded-md resize-none h-16"
          />

          {/* Contacto */}
          <div>
            <p className="text-sm font-semibold text-orange-700 mb-1 text-center">
              📞 Contacto
            </p>
            <div className="grid grid-cols-1 gap-2">
              <input
                type="text"
                placeholder="Nombre"
                value={contactoNombre}
                onChange={(e) => setContactoNombre(e.target.value)}
                className="w-full border border-orange-200 py-1.5 px-2 text-sm rounded-md"
              />
              <input
                type="email"
                placeholder="Correo"
                value={contactoCorreo}
                onChange={(e) => setContactoCorreo(e.target.value)}
                className="w-full border border-orange-200 py-1.5 px-2 text-sm rounded-md"
              />
              <input
                type="tel"
                placeholder="Teléfono"
                value={contactoTelefono}
                onChange={(e) => setContactoTelefono(e.target.value)}
                className="w-full border border-orange-200 py-1.5 px-2 text-sm rounded-md"
              />
            </div>
          </div>

          {/* Foto */}
          <label className="flex items-center justify-center border border-dashed border-orange-300 py-2 rounded-md cursor-pointer text-sm text-orange-600">
            <FiCamera className="mr-2" size={16} />
            {imagen ? imagen.name : "Seleccionar imagen"}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && setImagen(e.target.files[0])}
              className="hidden"
            />
          </label>

          {/* Botones */}
          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 text-sm rounded-md bg-orange-200 text-orange-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-1.5 text-sm rounded-md bg-orange-400 text-white disabled:opacity-70"
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
