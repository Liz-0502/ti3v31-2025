export default function InscripcionesCard( 
  { nombres, apellidos, correo, taller }) {
    const t = taller[0];
   return  (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800">Nombre: {nombres} {apellidos}</h2>
      <p className="text-sm text-gray-600"><a href="mailto:{correo}">Correo: {correo}</a></p>
        <p className="text-sm text-gray-600">Taller: {t.nombre}</p>
        <p className="text-sm text-gray-600">{t.descripcion}</p>
        <p className="text-sm text-gray-600">Profesor: {t.profesor}</p>  
    </div>
   );
}  
