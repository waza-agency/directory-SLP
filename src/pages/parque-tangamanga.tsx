import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

export const getStaticProps: GetStaticProps = async ({ locale = 'es' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
    revalidate: 3600,
  };
};

export default function ParqueTangamanga() {
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full">
        <Image
          src="/images/parque-tangamanga/hero.jpg"
          alt="Parque Tangamanga"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
            Parque Tangamanga
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Description */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold mb-6">El Pulmón Verde de San Luis Potosí</h2>
            <p className="text-lg mb-6">
              Con una extensión de más de 420 hectáreas, el Parque Tangamanga es el espacio verde más importante 
              de San Luis Potosí. Este impresionante parque urbano ofrece una gran variedad de actividades y 
              espacios para disfrutar de la naturaleza en plena ciudad.
            </p>

            <h3 className="text-2xl font-bold mb-4">Historia</h3>
            <p className="text-lg mb-6">
              El Parque Tangamanga fue inaugurado en 1980 como parte de un proyecto de desarrollo urbano 
              que buscaba crear espacios verdes para la recreación y el esparcimiento de los potosinos. 
              El nombre "Tangamanga" proviene de una palabra huachichil que significa "lugar de encuentro", 
              y desde su creación, el parque se ha convertido en un punto de reunión fundamental para la 
              comunidad potosina.
            </p>
            
            <h3 className="text-2xl font-bold mb-4">Atracciones Principales</h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>Lago artificial para paseos en bote</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>Canchas deportivas para fútbol, voleibol, basquetbol y tenis</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>Skatepark para patinadores</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>Jardín botánico con diversas especies de plantas</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span>Senderos para caminata y ciclismo</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold mb-4">Áreas Recreativas</h3>
            <p className="text-lg mb-6">
              El parque cuenta con áreas de picnic, asadores y palapas para disfrutar de un día al aire libre 
              en compañía de amigos y familia. También encontrarás espacios inclusivos diseñados para que 
              todos puedan disfrutar de la naturaleza.
            </p>

            <h3 className="text-2xl font-bold mb-4">Actividades y Eventos</h3>
            <div className="space-y-4 mb-8">
              <div>
                <h4 className="text-xl font-semibold mb-2">Actividades Deportivas</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Clases de yoga al aire libre</li>
                  <li>Grupos de running y caminata</li>
                  <li>Clases de zumba y baile</li>
                  <li>Práctica de deportes en equipo</li>
                  <li>Escalada en rocódromo</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Actividades Culturales</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Presentaciones de teatro al aire libre</li>
                  <li>Conciertos en el anfiteatro</li>
                  <li>Exposiciones de arte</li>
                  <li>Talleres de educación ambiental</li>
                  <li>Festivales culturales</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Actividades Familiares</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Área de juegos infantiles</li>
                  <li>Paseos en lancha por el lago</li>
                  <li>Visitas guiadas al jardín botánico</li>
                  <li>Actividades de educación ambiental</li>
                  <li>Festivales familiares</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-4">Biodiversidad</h3>
            <p className="text-lg mb-6">
              El parque alberga una rica diversidad de flora y fauna. En sus más de 420 hectáreas, 
              podrás encontrar diversas especies de árboles nativos, aves migratorias y residentes, 
              así como pequeños mamíferos y reptiles. El jardín botánico es especialmente importante 
              para la conservación de especies endémicas de la región.
            </p>
          </div>

          {/* Sidebar */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Información Importante</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Horario</h4>
                <p>Lunes a Domingo: 6:00 AM - 8:00 PM</p>
              </div>
              <div>
                <h4 className="font-semibold">Ubicación</h4>
                <p>Av. Dr. Salvador Nava Martínez S/N, San Luis Potosí, S.L.P.</p>
              </div>
              <div>
                <h4 className="font-semibold">Entrada</h4>
                <p>Gratuita</p>
              </div>
              <div>
                <h4 className="font-semibold">Servicios</h4>
                <ul className="list-disc list-inside">
                  <li>Estacionamiento</li>
                  <li>Baños públicos</li>
                  <li>Áreas de descanso</li>
                  <li>Puestos de comida</li>
                  <li>Renta de bicicletas</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Actividades</h4>
                <ul className="list-disc list-inside">
                  <li>Deportes</li>
                  <li>Paseos en bote</li>
                  <li>Caminata</li>
                  <li>Ciclismo</li>
                  <li>Picnic</li>
                  <li>Yoga</li>
                  <li>Running</li>
                  <li>Zumba</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Recomendaciones</h4>
                <ul className="list-disc list-inside">
                  <li>Llevar protector solar</li>
                  <li>Usar ropa cómoda</li>
                  <li>Traer agua</li>
                  <li>Respetar las áreas designadas</li>
                  <li>No dejar basura</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 