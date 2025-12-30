"use server";
import { uploadImage } from "../lib/uploadImage"; // Tu función existente
import { Icampana, Irefugios } from "../types";
// conecto con el endpoint de la api para ver las todas las mascotas

export async function newMascotas(data: FormData) {
  try {
    // Si hay imagen, súbela primero
    const imagenFile = data.get("imagen") as File | null;
    let imagen = null;

    if (imagenFile && imagenFile.size > 0) {
      imagen = await uploadImage(imagenFile);
      data.delete("imagen"); // Remover el archivo del FormData
      data.append("imagen", imagen); // Agregar la URL
    }

    const response = await fetch(`${process.env.API_HOST}/api/mascotas/new`, {
      method: "POST",
      body: data, // Ahora tiene imagenUrl en lugar del archivo
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al crear mascota");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en newMascotas:", error);
    throw error;
  }
}

/// CAMPAÑAS VETERINARIAS
export async function newCampana(data: Icampana) {
  try {
    const response = await fetch(`${process.env.API_HOST}/api/campana/new`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al crear campaña");
    }
    return await response.json();
  } catch (error) {
    console.log("Error en crear nueva campaña", error);
    throw error;
  }
}

/////// REFUGIOS ALOJAMIENTOS

export async function newRefugio(data: Irefugios) {
  try {
    const response = await fetch(`${process.env.API_HOST}/api/refugios/new`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al crear campaña");
    }
    return await response.json();
  } catch (error) {
    console.log("Error en crear nueva campaña", error);
    throw error;
  }
}
