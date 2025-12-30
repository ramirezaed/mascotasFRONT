import { uploadImage } from "../lib/uploadImage"; // Tu función existente
import { Icampana, Irefugios } from "../types";
// conecto con el endpoint de la api para ver las todas las mascotas
export async function fetchMascotas() {
  try {
    const response = await fetch(
      `${process.env.API_HOST}/api/mascotas/fetchMascotas`
    );
    if (!response.ok) throw new Error("error al cargar mascotas");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("error de coneccion con la api0", error);
    return [];
  }
}
// conecto con el endpoint de la api para ver las mascotas con el estado perdidas
export async function perdidas() {
  try {
    const response = await fetch(
      `${process.env.API_HOST}/api/mascotas/perdidas`
    );
    if (!response.ok) {
      throw new Error("no hay mascotas perdidas");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("error", error);
    return [];
  }
}
// conecto con el endpoint de la api para ver las mascotas con el estado encontradas
export async function encontradas() {
  try {
    const response = await fetch(
      `${process.env.API_HOST}/api/mascotas/encontradas`
    );
    if (!response.ok) {
      throw new Error("error");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("error", error);
    return [];
  }
}

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
export async function fetchCampaña() {
  try {
    const response = await fetch(
      `${process.env.API_HOST}/api/campana/fetchCampana`
    );
    if (!response.ok) {
      throw new Error("error al cargar datos");
    }

    return response.json();
  } catch (error) {
    console.error("error", error);
  }
}

/////// REFUGIOS ALOJAMIENTOS
export async function fetchRefugios() {
  try {
    const response = await fetch(
      `${process.env.API_HOST}/api/refugios/fetchRefugios`
    );
    if (!response.ok) {
      throw new Error("error al cargar campañas");
    }
    return response.json();
  } catch (error) {
    console.error("error", error);
    return [];
  }
}

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
