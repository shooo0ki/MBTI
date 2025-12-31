import { questions } from "@/data/questions";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export type AnswerPayload = {
  v: 1;
  answers: number[];
};

function toBase64Url(value: string): string {
  const toBase64 = () => {
    if (typeof Buffer !== "undefined") {
      return Buffer.from(value, "utf-8").toString("base64");
    }
    const binary = String.fromCharCode(...encoder.encode(value));
    return btoa(binary);
  };

  const base64 = toBase64();
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(encoded: string): string {
  const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");

  if (typeof Buffer !== "undefined") {
    return Buffer.from(base64, "base64").toString("utf-8");
  }

  const padded = base64 + "===".slice((base64.length + 3) % 4);
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return decoder.decode(bytes);
}

function isValidAnswers(answers: unknown): answers is number[] {
  return (
    Array.isArray(answers) &&
    answers.length === questions.length &&
    answers.every(
      (value) =>
        typeof value === "number" && Number.isFinite(value) && value >= 1 && value <= 7,
    )
  );
}

export function encodePayload(answers: number[]): string {
  const payload: AnswerPayload = { v: 1, answers };
  return toBase64Url(JSON.stringify(payload));
}

export function decodePayload(encoded: string | null): AnswerPayload | null {
  if (!encoded) return null;
  try {
    const json = fromBase64Url(encoded);
    const parsed = JSON.parse(json);
    if (parsed?.v === 1 && isValidAnswers(parsed.answers)) {
      return parsed as AnswerPayload;
    }
    return null;
  } catch (error) {
    console.error("Failed to decode payload", error);
    return null;
  }
}
