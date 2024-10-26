import Header from '@/components/header';
import Calculator from '@/components/calculator';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <Header/>
      <main className="container mx-auto px-4 py-8 md:py-16 space-y-12">
        <Calculator/>
      </main> 
      <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 text-center">
      <p>&copy; 2024 Unitat de Salud Cardiovascular. Todos los derechos reservados.</p>
      </div>
      </footer>
      
    </div>
  );
}
