import { AxisId } from "@/data/axes";

export const avatarConfig = {
  base: "/avatar/base/base1.svg",
  baseByType: {
    // 例: "IKCR": "/avatar/base/base2.svg",
  } as Record<string, string>,
  layers: {
    1: { left: "/avatar/axis1/left.svg", right: "/avatar/axis1/right.svg" },
    2: { left: "/avatar/axis2/left.svg", right: "/avatar/axis2/right.svg" },
    3: { left: "/avatar/axis3/left.svg", right: "/avatar/axis3/right.svg" },
    4: { left: "/avatar/axis4/left.svg", right: "/avatar/axis4/right.svg" },
  } as Record<
    AxisId,
    {
      left: string;
      right: string;
    }
  >,
};
