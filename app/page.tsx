"use client"
import Header from '@/components/header';
import CardiovascularRiskCalculator from '@/components/cardiovascular_risk/calculator';
import { useState } from 'react';
import CardiovascularRiskResult from '@/components/cardiovascular_risk/result';
import { CardioRiskResultType } from '@/types/riskResult.types';

export default function Home() {
  const [showResults, setShowResults] = useState(false);
  const [riskData, setRiskData] = useState<CardioRiskResultType>({} as CardioRiskResultType);
  
  const handleRiskCalculation = (data: CardioRiskResultType): void => {
    setRiskData(data);
    setShowResults(true);
  };

   const handleResetCalculation = (): void => {
    setShowResults(false);
    setRiskData({} as CardioRiskResultType);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <Header/>
      <main className="container mx-auto px-4 py-8 md:py-16 space-y-12">
        {showResults ? (
          <CardiovascularRiskResult riskData={riskData}  onReset={handleResetCalculation} />
        ) : (
          <CardiovascularRiskCalculator onCalculateRisk={handleRiskCalculation} />
        )}
      </main> 
      <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 text-center">
      <p>&copy; 2024 Unitat de Salut Cardiovascular. Todos los derechos reservados.</p>
      </div>
      </footer>      
    </div>
  );
}
