import { ChallengeDTO } from "shared/types/dto"

export interface StarChartProps {
    data: ChallengeDTO[]
    className?: string
}

export interface ChartData {
    star1: string,
    star2: string,
    day: number
}