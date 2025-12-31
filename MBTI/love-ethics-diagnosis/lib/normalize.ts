import { AxisId, axisMap, axisOrder } from "@/data/axes";
import { AxisScoreMap } from "./scoring";
import { clamp } from "./utils";

export type AxisPercentMap = Record<AxisId, number>;

export function toPercents(scores: AxisScoreMap): AxisPercentMap {
  const percents = {} as AxisPercentMap;

  axisOrder.forEach((axisId) => {
    const { maxAbs } = axisMap[axisId];
    const percent =
      ((scores[axisId] + maxAbs) / (2 * maxAbs)) * 100;
    percents[axisId] = clamp(Math.round(percent), 0, 100);
  });

  return percents;
}
