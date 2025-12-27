"use client";
export default function ToggleMascotas({
  estado,
  onChange,
}: {
  estado: "PERDIDA" | "ENCONTRADA";
  onChange: (estado: "PERDIDA" | "ENCONTRADA") => void;
}) {
  const toggle = () =>
    onChange(estado === "PERDIDA" ? "ENCONTRADA" : "PERDIDA");

  return (
    <div className="flex items-center justify-center gap-4 my-6">
      <span
        className={`font-semibold bg- ${
          estado === "PERDIDA" ? "text-orange-400" : "text-gray-400"
        }`}
      >
        Me Perdí
      </span>

      <button
        type="button"
        onClick={toggle}
        aria-label="Alternar entre perdidas y encontradas"
        className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
          estado === "PERDIDA" ? "bg-orange-600" : "bg-green-500"
        }`}
      >
        <span
          className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
            estado === "ENCONTRADA" ? "translate-x-7" : ""
          }`}
        />
      </button>

      <span
        className={`font-semibold ${
          estado === "ENCONTRADA" ? "text-green-600" : "text-gray-400"
        }`}
      >
        ¿Soy tu mascota?
      </span>
    </div>
  );
}
