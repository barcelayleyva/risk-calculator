export const CARDIO_RISK_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  HIGHEST: 'highest',
} as const;

export type CardioRiskType = typeof CARDIO_RISK_LEVELS[keyof typeof CARDIO_RISK_LEVELS];

export type CardioRiskResultType = {
  risk: CardioRiskType
  data: {
    fullName: string,
    diabetes: string
    smoking: string
    cholesterol: number
    systolic: number
  }
}