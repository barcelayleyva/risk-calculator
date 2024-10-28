"use client"
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CARDIO_RISK_LEVELS, CardioRiskResultType } from '@/types/riskResult.types'
import Image from "next/image"

type CardiovascularRiskResultProps = {
  riskData: CardioRiskResultType;
  onReset: () => void;
};

export default function CardiovascularRiskResult( { riskData: { risk, data }, onReset }: CardiovascularRiskResultProps) {  

  const heartIcon = {
    [CARDIO_RISK_LEVELS.LOW]: (
      <svg className="w-24 h-24 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
      </svg>
    ),
    [CARDIO_RISK_LEVELS.MEDIUM]: (
      <svg className="w-24 h-24 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
      </svg>
    ),
    [CARDIO_RISK_LEVELS.HIGH]: (
      <svg className="w-24 h-24 text-orange-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
      </svg>
    ),
    [CARDIO_RISK_LEVELS.HIGHEST]: (
      <svg className="w-24 h-24 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
      </svg>
    )
  }

  const riskMessages = {
    [CARDIO_RISK_LEVELS.LOW]: {
      title: '¡Tu riesgo es bajo!',
      message: 'Enhorabuena, tu riesgo cardiovascular es bajo. No te descuides y mantén tus buenos hábitos de vida, come sano, haz deporte y no fumes. Comparte con tus amigos.'
    },
    [CARDIO_RISK_LEVELS.MEDIUM]: {
      title: '¡Tu riesgo es moderado!',
      message: 'Tu riesgo cardiovascular es moderado. Es importante que mejores tus hábitos de vida. Sigue una dieta saludable, haz ejercicio regularmente y evita el tabaco. Consulta con tu médico para más recomendaciones.'
    },
    [CARDIO_RISK_LEVELS.HIGH]: {
      title: '¡Tu riesgo es alto!',
      message: 'Peligro, tu corazón está en alto riesgo de infarto pero todavía lo podemos salvar. Come sano, limita los alimentos grasos y salados, abusa de frutas y verduras y legumbres y evita los dulces, precocinados y ultraprocesados. Muévete todos los días 45 minutos de ejercicio moderado 5 días a la semana. No fumes, tu médico puede ayudarte a superarlo. Pide cita con tu médico, estudiará tu caso y es posible que necesites tratamiento.'
    },
    [CARDIO_RISK_LEVELS.HIGHEST]: {
      title: '¡Tu riesgo es muy alto!',
      message: 'Peligro, tu corazón está en altísimo riesgo de infarto pero todavía lo podemos salvar. Come sano, limita los alimentos grasos y salados, abusa de frutas y verduras y legumbres y evita los dulces, precocinados y ultraprocesados. Muévete todos los días 45 minutos de ejercicio moderado 5 días a la semana. No fumes, tu médico puede ayudarte a superarlo. Pide cita con tu médico, estudiará tu caso y es posible que necesites tratamiento.'
    }
  } 

  const makeReadableDecisionValue = (desition: string): string => {
    return desition === 'yes' ? 'Si' : 'No'
  }

  // Ensure that the risk is a valid key, otherwise default to 'medium'
  const safeRisk = risk in riskMessages ? risk : 'medium'

  return (
    <>    
    <h1 className="text-2xl font-bold text-center text-red-500 w-full print:block hidden">Unitat de Salut Cardiovascular</h1>
    <Card className="bg-white p-6 md:p-8 shadow-lg max-w-2xl mx-auto">      
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Resultados</h2>
      <p className="text-center text-gray-700 mb-6">
        El riesgo cardiovascular indica las posibilidades que tienes de sufrir alguna enfermedad cardíaca según tus antecedentes y hábitos de vida.
      </p>
      <div className="flex flex-col items-center mb-6">
        {heartIcon[safeRisk]}
        <h3 className="text-2xl font-bold mt-4 text-center">{riskMessages[safeRisk].title}</h3>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p><strong>¿Eres diabético/a?</strong> {makeReadableDecisionValue(data.diabetes) || 'No especificado'}</p>
          <p><strong>¿Fumas?</strong> { makeReadableDecisionValue(data.smoking) || 'No especificado'}</p>
        </div>
        <div>
          <p><strong>Colesterol total:</strong> {data.cholesterol || 'No especificado'}</p>
          <p><strong>Tensión sistólica:</strong> {data.systolic || 'No especificado'}</p>
        </div>
      </div>
      <p className="text-gray-700 font-bold break-words">{data.fullName}</p>
      <p className="text-gray-700 mb-6">{riskMessages[safeRisk].message}</p>
      <div className="print:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button onClick={onReset} className="bg-rose-600 hover:bg-rose-700 text-white">
          Calcular de nuevo
        </Button>        
        <Button onClick={() => window.print()} className="bg-rose-600 hover:bg-rose-700 text-white">
          Imprimir
        </Button>
      </div>  
      <div className=" print:flex hidden flex-row justify-between items-center">
            <div className="flex items-center space-x-4 ">
              <Image
                src="/images/primary-logo.png"
                alt="Logo de la Clínica"
                width={70}
                height={60}
              />
              <div className="text-sm">
                <p className="font-semibold text-gray-900">Cuidamos de tu corazón</p>
                <p className="text-gray-700">Cuidamos de tí</p>
              </div>
            </div>          
          
          <div className="flex justify-center md:justify-end">
              <Image
                src="/images/secondary-logo.png"
                alt="Secondary Logo"
                width={60}
                height={60}
              />
            </div>
          </div>         
    </Card>
    </>
  )
}