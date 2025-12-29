import Encabezado from "../components/ComInicio";
import Servicios from "../components/ComInicio/servicios";

export default async function Home() {
  return (
    <main>
      <Encabezado />
      <Servicios />
    </main>
  );
}
