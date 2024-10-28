import { FormDataType } from "@/components/cardiovascular_risk/formSchemas";
import { CardioRiskType } from "@/types/riskResult.types";

 
  /**
   * Calculate the cardiovascular risk based on the form data.
   * 
   * The risk is then determined by the total score:
   * - Low: less than 10 percents
   * - Medium: between 10-20 percents
   * - High: between 20-30 percents
   * - Highest: more than 30 percents
   * 
   * @param {FormDataType} data - The form data
   * @returns {CardioRiskType} The calculated risk
   */
export const cardioRiskCalculator = (data: FormDataType): { risk: CardioRiskType } => {
  type Sex = 'male' | 'female';

  const ageFactor: Record<Sex, number> = { male: 3.06117, female: 2.32888 };
  const cholesterolFactor: Record<Sex, number> = { male: 1.1237, female: 1.20904 };
  const hdlFactor: Record<Sex, number> = { male: -0.70833, female: -0.93263 };
  const systolicFactor: Record<Sex, number> = { male: 1.93303, female: 2.76157 };
  const smokingFactor: Record<Sex, number> = { male: 0.65451, female: 0.52873 };
  const diabetesFactor: Record<Sex, number> = { male: 0.65451, female: 0.69154 };

  /**
   * Calculates the cardiovascular risk based on the formula:
   * 
   * ln(R) = ageFactor * ln(age) + cholesterolFactor * ln(cholesterol) + hdlFactor * ln(hdl) + systolicFactor * ln(systolic) + smokingFactor * smoking + diabetesFactor * diabetes
   * R = e^(ln(R) - 23.9802)
   * risk = 100 * (1 - 0.88936^R)
   * 
   * The risk is then rounded to the nearest whole number.
   * 
   * @param {FormDataType} data - The form data
   * @param {Sex} sex - The patient's sex
   * @returns {number} The calculated risk
   */
  const makeCalculations = (data: FormDataType, sex: Sex): number => {
    const ageLog = Math.log(data.age);
    const cholesterolLog = Math.log(data.cholesterol);
    const hdlLog = Math.log(data.hdl);
    const systolicLog = Math.log(data.systolic);
    const smoking = data.smoking === 'yes' ? smokingFactor[sex] : 0;
    const diabetes = data.diabetes === 'yes' ? diabetesFactor[sex] : 0;

    const ageFinalValue = ageFactor[sex] * ageLog;
    const cholesterolFinalValue = cholesterolFactor[sex] * cholesterolLog;
    const hdlFinalValue = hdlFactor[sex] * hdlLog;
    const systolicFinalValue = systolicFactor[sex] * systolicLog;
    const smokingFinalValue = smoking;
    const diabetesFinalValue = diabetes;

    const riskScore = ageFinalValue + cholesterolFinalValue + hdlFinalValue + systolicFinalValue + smokingFinalValue + diabetesFinalValue;

    const exponential = Math.exp(riskScore - 23.9802);
    return Math.round((1 - Math.pow(0.88936, exponential)) * 100);    
  }
  const risk = makeCalculations(data, data.sex);
  if (risk < 10) return { risk: 'low' } ;
  if (risk > 10 && risk < 20) return { risk: 'medium' };
  if (risk > 20 && risk < 30) return { risk: 'high' };
  return { risk: 'highest' };
}