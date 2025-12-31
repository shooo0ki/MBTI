import { AxisId, axisOrder } from "@/data/axes";
import { questions } from "@/data/questions";

export type AxisScoreMap = Record<AxisId, number>;

export function createEmptyScores(): AxisScoreMap {
  return axisOrder.reduce((acc, axisId) => {
    acc[axisId] = 0;
    return acc;
  }, {} as AxisScoreMap);
}

export function calculateAxisScores(answers: number[]): AxisScoreMap {
  const scores = createEmptyScores();

  questions.forEach((question, index) => {
    const answer = answers[index];
    if (!answer) return;

    const weight = question.weight ?? 1;
    const raw = answer - 4; // 7段階（1〜7）で中央は4 -> -3〜+3
    scores[question.axis] += raw * question.direction * weight;
  });

  return scores;
}

export function answeredCount(answers: number[]): number {
  return answers.filter(
    (answer) => typeof answer === "number" && answer >= 1 && answer <= 7,
  ).length;
}

export function isComplete(answers: number[]): boolean {
  return answeredCount(answers) === questions.length;
}
