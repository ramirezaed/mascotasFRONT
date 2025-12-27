"use client";
import { Search, MapPin, Home, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";

export default function Servicios() {
  const services = [
    {
      id: 1,
      icon: <Search className="text-gray-50 w-10 h-10" />,
      title: "Mascotas Perdidas",
      description:
        "Publica información de tu mascota perdida y ayuda a otros a encontrarlas",
      action: "Reportar Pérdida",
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      link: "/publicar-mascota",
    },
    {
      id: 2,
      icon: <MapPin />,
      title: "Mascotas Encontradas",
      description:
        "Comparte si encontraste una mascota para reunirla con su familia",

      color: "text-secondary",
      bgColor: "bg-secondary/10",
      link: "/mascotas",
    },
    {
      id: 3,
      icon: <Home />,
      title: "Refugio Temporal",
      description:
        "Ofrece o encuentra hogares temporales para mascotas rescatadas",

      color: "text-accent",
      bgColor: "bg-accent/10",
      link: "/refugios",
    },
    {
      id: 4,
      icon: <Stethoscope />,
      title: "Campañas de Vacunación",
      description: "Participa en campañas comunitarias de salud y vacunación",

      color: "text-primary",
      bgColor: "bg-primary/10",
      link: "/campanas",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Controla el tiempo entre cada animación
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: -50,
      transition: {
        duration: 0.9,
        delay: index * 0.5, // Cada tarjeta se retrasa según su índice
      },
    }),
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
              ¿Cómo podemos ayudarte?
            </h2>
            <p className="text-xl max-w-2xl mx-auto text-gray-600">
              Nuestra plataforma ofrece múltiples servicios para el bienestar de
              las mascotas en tu comunidad
            </p>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 hover:scale-105 hover:bg-gray-100 transform hover:-translate-y-2"
              variants={itemVariants}
            >
              <div className="flex flex-col items-center p-6">
                <div className="inline-flex items-center justify-center  w-16 h-16 rounded-2xl bg-orange-200">
                  {service.icon}
                </div>
              </div>

              <div className="p-6">
                <h3 className="flex flex-col items-center text-xl font-bold mb-2 text-black">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 flex flex-col items-center ">
                  {service.description}
                </p>
                <p className="text-gray-600 mb-4 flex flex-col items-center">
                  {service.action}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
