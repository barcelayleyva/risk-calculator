import Image from "next/image";

export default function Header() {
    return (              
      <header className="print:hidden bg-white shadow-md p-4 md:p-6">
         <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center w-3/4 md:w-1/4 space-x-1 md:space-x-3">
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
          <h1 className="hidden md:block text-3xl font-bold text-center text-red-500 w-2/4">
              Unitat de Salut Cardiovascular
            </h1>
          <div className="md:flex md:justify-end w-1/4">
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