import Image from "next/image";

export default function Header() {
    return (              
      <header className="bg-white shadow-md p-4 md:p-6">
         <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 md:w-1/4">
              <Image
                src="/images/primary-logo.png"
                alt="Logo de la Clínica"
                width={70}
                height={60}
                className="rounded-md"
              />
              <div className="text-sm">
                <p className="font-semibold text-gray-900">Cuidamos de tu corazón</p>
                <p className="text-gray-700">Cuidamos de tí</p>
              </div>
            </div>          
          <h1 className="text-2xl md:text-3xl font-bold text-center text-red-500 w-full md:w-2/4">
              Unitat de Salud Cardiovascular
            </h1>
          <div className="w-full md:w-1/4 flex justify-center md:justify-end">
              <Image
                src="/images/secondary-logo.png"
                alt="Secondary Logo"
                width={60}
                height={60}
                className="rounded-md"
              />
            </div>
          </div>
        </div>
      </header>

    )
}