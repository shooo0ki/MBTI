export type AxisId = 1 | 2 | 3 | 4;

export type AxisDefinition = {
  id: AxisId;
  title: string;
  leftLabel: string;
  rightLabel: string;
  maxAbs: number;
  description: string;
  letters: { left: string; right: string };
};

export const axes: AxisDefinition[] = [
  {
    id: 1,
    title: "介入型 / 放任型",
    leftLabel: "介入型",
    rightLabel: "放任型",
    maxAbs: 21,
    description: "どこまで互いの行動に踏み込むか。安心を管理するか、自由を尊重するかの軸。",
    letters: { left: "I", right: "L" },
  },
  {
    id: 2,
    title: "一貫型 / 正直型",
    leftLabel: "一貫型",
    rightLabel: "正直型",
    maxAbs: 18,
    description: "約束や態度の一貫性を重視するか、本音や正直さを優先するかの軸。",
    letters: { left: "K", right: "H" },
  },
  {
    id: 3,
    title: "抑制型 / 忠実型",
    leftLabel: "抑制型",
    rightLabel: "忠実型",
    maxAbs: 15,
    description: "欲求を理性で管理するか、惹かれた気持ちに忠実であるかの軸。",
    letters: { left: "C", right: "A" },
  },
  {
    id: 4,
    title: "明確型 / 可変型",
    leftLabel: "明確型",
    rightLabel: "可変型",
    maxAbs: 15,
    description: "境界線やルールを明文化するか、状況で変化させるかの軸。",
    letters: { left: "R", right: "F" },
  },
];

export const axisOrder: AxisId[] = [1, 2, 3, 4];

export const axisMap: Record<AxisId, AxisDefinition> = axes.reduce(
  (acc, axis) => {
    acc[axis.id] = axis;
    return acc;
  },
  {} as Record<AxisId, AxisDefinition>,
);
