import { axisMap, axisOrder } from "@/data/axes";
import { typeProfiles } from "@/data/types";
import { AxisPercentMap } from "./normalize";

export function resolveTypeKey(percents: AxisPercentMap): string {
  return axisOrder
    .map((axisId) =>
      percents[axisId] >= 50
        ? axisMap[axisId].letters.left
        : axisMap[axisId].letters.right,
    )
    .join("");
}

export function findTypeProfile(key: string) {
  return typeProfiles.find((profile) => profile.key === key);
}
