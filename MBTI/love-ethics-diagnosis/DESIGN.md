# 恋愛倫理スタイル診断（16タイプ）設計書 v1.0

作成日: 2025-12-31  
目的: 本書のみを読めば、エンジニアが設計確認なしで実装できる状態にする

---

## 0. プロダクト概要

恋愛における価値観・倫理判断を、  
**23問の5段階診断**から以下に変換して提示する診断プロダクト。

- 4つの評価軸（0〜100%表示）
- 16タイプ（4軸の組み合わせ）
- LoveType系の「キャッチーさ」とMBTI系の「納得感」を両立
- 固定16枚ではなく **4軸合成型アバター（SVG）** を表示

---

## 1. ゴール / 非ゴール

### 1.1 ゴール（Must）
- 23問（固定）× 5段階評価
- 回答から以下を算出
  - 4軸スコア（合計点）
  - 4軸％（0〜100）
  - 16タイプ（キー判定）
- 結果ページで以下を表示
  1. タイプ名＋一言
  2. アバター（合成）
  3. 4軸％バー
  4. あるある（3〜5）
  5. 300字解説
  6. 立ち回り（3行）
  7. 揉めやすいポイント（2〜3）
  8. 相性（合う2／しんどい2）
  9. ワンポイント
  10. CTA（シェア等）

### 1.2 非ゴール
- 心理学的妥当性の保証
- 恋愛の正解・指導の提示

---

## 2. 技術スタック（確定）

### フロントエンド
- Next.js（App Router）
- TypeScript
- Tailwind CSS

### 状態管理
- React標準（useReducer）

### バックエンド
- 初期: なし（結果はURLで復元）
- 拡張: Next.js Route Handlers

### アバター
- SVGレイヤー合成
- CSSでopacity制御

### コンテナ
- Docker（dev / prod共通）

---

## 3. ディレクトリ構造

```
love-ethics-diagnosis/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx                     # トップページ（概要＋診断開始）
│  │
│  ├─ diagnose/
│  │  ├─ page.tsx                  # 診断ページ（質問表示）
│  │  └─ DiagnoseClient.tsx        # use client（回答状態・遷移）
│  │
│  ├─ result/
│  │  ├─ page.tsx                  # 結果ページ（payload復元）
│  │  └─ ResultClient.tsx          # use client（表示ロジック）
│  │
│  └─ api/
│     └─ result/
│        └─ route.ts               # （任意）結果保存・取得API
│
├─ components/
│  ├─ QuestionCard.tsx             # 質問カードUI
│  ├─ LikertScale.tsx              # 5段階評価UI
│  ├─ ProgressBar.tsx              # 診断進捗バー
│  ├─ AxisBar.tsx                  # 軸％バー表示
│  ├─ ShareButtons.tsx             # SNSシェア
│  │
│  └─ Avatar/
│     ├─ Avatar.tsx                # アバター合成ロジック
│     └─ avatar.config.ts          # 表示設定（任意）
│
├─ data/
│  ├─ questions.ts                 # 23問＋direction＋weight
│  ├─ axes.ts                      # 軸定義（maxAbs / ラベル）
│  └─ types.ts                     # 16タイプ定義（本文・相性等）
│
├─ lib/
│  ├─ scoring.ts                   # 軸スコア計算
│  ├─ normalize.ts                 # ％正規化
│  ├─ typeResolver.ts              # 4軸→タイプキー
│  ├─ payload.ts                   # 結果URLエンコード/デコード
│  └─ utils.ts                     # 汎用関数
│
├─ public/
│  ├─ avatar/
│  │  ├─ base/
│  │  │  ├─ base1.svg              # アバターベース
│  │  │  └─ base2.svg              # （任意）
│  │  │
│  │  ├─ axis1/                    # 介入 / 放任
│  │  │  ├─ left.svg
│  │  │  └─ right.svg
│  │  │
│  │  ├─ axis2/                    # 一貫 / 正直
│  │  │  ├─ left.svg
│  │  │  └─ right.svg
│  │  │
│  │  ├─ axis3/                    # 抑制 / 忠実
│  │  │  ├─ left.svg
│  │  │  └─ right.svg
│  │  │
│  │  └─ axis4/                    # 明確 / 可変
│  │     ├─ left.svg
│  │     └─ right.svg
│  │
│  └─ ogp.png                      # OGP画像
│
├─ styles/
│  └─ globals.css                  # グローバルCSS
│
├─ docker/
│  ├─ Dockerfile
│  └─ docker-compose.yml
│
├─ .env.example
├─ next.config.js
├─ tailwind.config.js
├─ tsconfig.json
├─ package.json
└─ DESIGN.md                       # ← 今回作った設計書
```

---

## 4. 診断仕様

### 回答形式
- 5段階評価（1〜5）
- 1: まったくそう思わない  
- 5: とてもそう思う

---

## 5. 質問セット（固定）

### 軸① 介入型／放任型（7問）
- 恋人の行動は把握できていた方が安心だ
- 恋人には異性のいる飲み会に行ってほしくない
- 恋人に対して不満がある時は素直に言うべきだ
- 恋人から返信が来ないのに恋人のSNSが更新されていたら不快だ
- 嫉妬は愛情表現の一つだ
- 恋愛は自由であるべきでお互いあまり干渉するべきではない
- 恋人と連絡はたくさん取りたい

### 軸② 一貫型／正直型（6問）
- 誠実さとは約束を守ることだ
- 気持ちが変わっても態度は変えない方が相手のためだ
- 傷つけないための嘘なら積極的につく
- 浮気は理由を問わず許されない
- 浮気された側にも非はある
- 正直浮気してもバレなければ良いと思う

### 軸③ 抑制型／忠実型（5問）
- 恋人がいても他人に惹かれるのは生物として当たり前のことだ
- 惹かれても行動しなければ問題ない
- 欲求は理性で管理すべきだ
- 恋人より魅力的な人がいれば積極的にアプローチする
- 欲求を抑え続ける恋愛は正しい

### 軸④ 明確型／可変型（5問）
- 一度決めた恋愛ルールは守るべきだ
- 恋人が嫌がるかもしれない行動は避けるべきだ
- 浮気の境界線は最初に決めておくべきだ
- 境界線を越えたら関係は終わりだ
- ワンナイトは絶対に許されない

---

## 6. スコアリング仕様

### 回答値 → 点数
raw = answer - 3 // -2〜+2

### direction（逆転）
- 左側寄り: +1
- 右側寄り: -1

### 軸ごとの最大値
| 軸 | 問題数 | maxAbs |
|----|--------|--------|
| 1 | 7 | 14 |
| 2 | 6 | 12 |
| 3 | 5 | 10 |
| 4 | 5 | 10 |

### 軸スコア
axisScore = Σ(raw * direction * weight)

### %正規化
percent = (axisScore + maxAbs) / (2 * maxAbs) * 100

- 表示は整数
- 45〜55% は「中間」扱い

---

## 7. 16タイプ判定

### 判定ルール
- percent >= 50 → 左側
- percent < 50 → 右側

| 軸 | 左 | 右 |
|----|----|----|
| 1 | I | L |
| 2 | K | H |
| 3 | C | A |
| 4 | R | F |

例: `IKCR`

---

## 8. 結果ページ構成

1. タイプ名＋一言
2. アバター
3. 4軸％バー
4. あるある
5. 300字解説
6. 立ち回り
7. 揉めやすいポイント
8. 相性
9. ワンポイント
10. CTA

---

## 9. アバター設計

### 方針
- 固定16枚は作らない
- base + axis1〜4 のSVGを合成

### 表示ルール
- percent >= 50 → left.svg
- percent < 50 → right.svg
- 濃さは50%からの距離でopacity調整

|percent-50| <= 5 → 0.25
<= 20 → 0.5
<= 35 → 0.75
else → 1.0

---

## 10. Docker

### Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```
docker-compose.yml
version: "3.9"
services:
  web:
    build:
      context: ..
      dockerfile: docker/Dockerfile
    ports:
      - "3000:3000"
    volumes:
      - ../:/app
```

---

## 11. 実装順（最短）

- questions.ts
- scoring / normalize / typeResolver
- 診断UI
- 結果復元
- types.ts（仮でOK）
- SVG素材配置
- OGP / シェア

---

## 12. 将来拡張

- 結果保存API
- ゲート質問のweight調整
- アバターベース増加
- 他タイプ一覧ページ

