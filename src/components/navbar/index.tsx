"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu as MenuIcon, X, Heart } from "lucide-react";

export default function Menu() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const barraMenu = [
    // { nombre: "Inicio", ruta: "/" },
    { nombre: "Mascotas", ruta: "/mascotas" },
    { nombre: "Alojamientos", ruta: "/refugios" },
    { nombre: "Campañas", ruta: "/campana" },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    }

    function handleResize() {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="w-full sticky top-0 z-50 bg-sky-50 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo como botón */}
        <Link href="/" className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-orange-500" />
          <span className="text-xl font-bold text-orange-400 hover:text-orange-600 transition-colors">
            RedMascotas
          </span>
        </Link>

        {/* Menú Desktop centrado */}
        <ul className="hidden md:flex gap-6 text-sm absolute left-1/2 transform -translate-x-1/2">
          {barraMenu.map(({ nombre, ruta }) => (
            <li key={nombre}>
              <Link
                href={ruta}
                className="text-black hover:text-orange-600 transition-all duration-300 transform hover:scale-105"
              >
                {nombre}
              </Link>
            </li>
          ))}
        </ul>

        {/* Botón hamburguesa */}
        <button
          className="md:hidden text-black z-50"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Menú Mobile tipo Drawer */}
      <div
        ref={menuRef}
        className={`
          fixed inset-y-0 left-0 z-40 w-64 h-screen bg-black p-6
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          md:hidden
        `}
      >
        <ul className="flex flex-col gap-4 text-sm">
          {barraMenu.map(({ nombre, ruta }) => (
            <li key={nombre}>
              <Link
                href={ruta}
                className="block text-slate-50 hover:text-blue-600 transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                {nombre}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
}
