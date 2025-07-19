"use client";

// Importamos las bibliotecas para utilizar efectos y estados de objetos
import { useEffect, useState } from "react";

// Importamos el componente reusable ClienteCard
import InscripcionesCard from "./components/InscripcionesCard";

// Definimos el componente principal de la página
export default function Home() {
  // Se declaran los 3 objetos que representarán las entidades de dato de la API
  const [talleres, setTalleres] = useState([]);
  const [Inscripcioness, setInscripciones] = useState([]);

  // Se declara objeto que definirá si aparece o no el mensaje "Cargando datos"
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Definición de la función asíncrona para obtener los datos de la API
    async function fetchData() {
      try {
        // Definimos los objetos y llamamos a los servicios de la API
        const [talleresRes, inscripcionesRes] = await Promise.all([
          fetch("https://ejemplo-firebase-657d0-default-rtdb.firebaseio.com/talleres.json"),
          fetch("https://ejemplo-firebase-657d0-default-rtdb.firebaseio.com/inscripciones.json")
        ])

        // Definimos las variables que estarán esperando los datos de respuesta de 
        // los servicios de la API
        const [talleresData, inscripcionesData] = await Promise.all([
          talleresRes.json(),
          inscripcionesRes.json(),
        ]);

        talleresData.shift();
        inscripcionesData.shift();

        // Almacenamiento de los datos ya obtenidos en los objetos que representan
        // las entidades de datos de la API.
        setTalleres(talleresData);
        setInscripciones(inscripcionesData);
      } catch (error) {
        // En caso de error, no se detiene el programa
        console.error("Error al cargar datos:", error);
      } finally {
        // Si todo sale bien, se deja de mostrar el mensaje "Cargando datos"
        setCargando(false);
      }
    }

    // Se invoca a la función que obtiene y almacena los datos de la API
    fetchData();
  }, []);

  // Definir una estructura que relaciona los datos de Incripciones por Talleres
  const obtenerInscripcionesPorTaller = (tallerId) => {
    // Se realiza la consulta de las ventas del cliente identificado clienteId
    const talleresInscripciones = talleres
      .filter(rel => rel.id === tallerId);
    
    // Devuelve la información de las inscripciones por talleres 
    return { talleres: talleresInscripciones };
  };

  // Esto es lo que se dibuja en la pagína (es el "children")
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      {cargando ? (
        <p className="text-center text-gray-500">Cargando datos...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Inscripcioness.map(insc => {
            const { talleres } = obtenerInscripcionesPorTaller(insc.taller);
            return (
              // Aquí se hace referencia a la componente inscripcionesCard
              <InscripcionesCard
                key={insc.id}
                nombres={insc.nombres}
                apellidos={insc.apellidos}
                correo={insc.correo}
                taller={talleres}
              />
            );
          })}
        </div>
      )}
    </main>
  );
} 
