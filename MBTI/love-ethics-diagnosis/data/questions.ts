import { AxisId } from "./axes";

export type Question = {
  id: number;
  text: string;
  axis: AxisId;
  direction: 1 | -1;
  weight?: number;
};

export const questions: Question[] = [
  // 軸1 介入 / 放任
  { id: 1, text: "恋人の行動は把握できていた方が安心だ", axis: 1, direction: 1 },
  { id: 2, text: "恋人には異性のいる飲み会に行ってほしくない", axis: 1, direction: 1 },
  { id: 3, text: "恋人に対して不満がある時は素直に言うべきだ", axis: 1, direction: 1 },
  { id: 4, text: "恋人から返信が来ないのに恋人のSNSが更新されていたら不快だ", axis: 1, direction: 1 },
  { id: 5, text: "嫉妬は愛情表現の一つだ", axis: 1, direction: 1 },
  { id: 6, text: "恋愛は自由であるべきでお互いあまり干渉するべきではない", axis: 1, direction: -1 },
  { id: 7, text: "恋人と連絡はたくさん取りたい", axis: 1, direction: 1 },

  // 軸2 一貫 / 正直
  { id: 8, text: "誠実さとは約束を守ることだ", axis: 2, direction: 1 },
  { id: 9, text: "気持ちが変わっても態度は変えない方が相手のためだ", axis: 2, direction: 1 },
  { id: 10, text: "傷つけないための嘘なら積極的につく", axis: 2, direction: -1 },
  { id: 11, text: "浮気は理由を問わず許されない", axis: 2, direction: 1 },
  { id: 12, text: "浮気された側にも非はある", axis: 2, direction: -1 },
  { id: 13, text: "正直浮気してもバレなければ良いと思う", axis: 2, direction: -1 },

  // 軸3 抑制 / 忠実
  { id: 14, text: "恋人がいても他人に惹かれるのは生物として当たり前のことだ", axis: 3, direction: -1 },
  { id: 15, text: "惹かれても行動しなければ問題ない", axis: 3, direction: 1 },
  { id: 16, text: "欲求は理性で管理すべきだ", axis: 3, direction: 1 },
  { id: 17, text: "恋人より魅力的な人がいれば積極的にアプローチする", axis: 3, direction: -1 },
  { id: 18, text: "欲求を抑え続ける恋愛は正しい", axis: 3, direction: 1 },

  // 軸4 明確 / 可変
  { id: 19, text: "一度決めた恋愛ルールは守るべきだ", axis: 4, direction: 1 },
  { id: 20, text: "恋人が嫌がるかもしれない行動は避けるべきだ", axis: 4, direction: 1 },
  { id: 21, text: "浮気の境界線は最初に決めておくべきだ", axis: 4, direction: 1 },
  { id: 22, text: "境界線を越えたら関係は終わりだ", axis: 4, direction: 1 },
  { id: 23, text: "ワンナイトは絶対に許されない", axis: 4, direction: 1 },
];
