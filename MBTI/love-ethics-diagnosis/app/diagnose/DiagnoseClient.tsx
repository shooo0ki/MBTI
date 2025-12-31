"use client";

import { useReducer, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/ProgressBar";
import QuestionCard from "@/components/QuestionCard";
import { questions } from "@/data/questions";
import { encodePayload } from "@/lib/payload";

type State = {
  page: number;
  answers: number[];
  answeredCount: number;
};

type Action =
  | { type: "setAnswer"; index: number; value: number }
  | { type: "nextPage" }
  | { type: "prevPage" }
  | { type: "setPage"; page: number };

const initialState: State = {
  page: 0,
  answers: Array(questions.length).fill(0),
  answeredCount: 0,
};

function countAnswered(answers: number[]): number {
  return answers.filter((val) => typeof val === "number" && val >= 1 && val <= 7)
    .length;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "setAnswer": {
      const nextAnswers = [...state.answers];
      nextAnswers[action.index] = action.value;
      return { ...state, answers: nextAnswers, answeredCount: countAnswered(nextAnswers) };
    }
    case "nextPage":
      return { ...state, page: state.page + 1 };
    case "prevPage":
      return { ...state, page: Math.max(0, state.page - 1) };
    case "setPage":
      return {
        ...state,
        page: Math.max(0, Math.min(action.page, Math.ceil(questions.length / 5) - 1)),
      };
    default:
      return state;
  }
}

export default function DiagnoseClient() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const listRef = useRef<HTMLDivElement>(null);

  const pageSize = 5;
  const totalPages = Math.ceil(questions.length / pageSize);

  const answered = state.answeredCount;
  const completed = answered === questions.length;
  const progress = (answered / questions.length) * 100;
  const startIndex = state.page * pageSize;
  const currentQuestions = questions.slice(startIndex, startIndex + pageSize);
  const pageMissingCount = currentQuestions.filter((_, localIdx) => {
    const val = state.answers[startIndex + localIdx];
    return !(typeof val === "number" && val >= 1 && val <= 7);
  }).length;
  const pageComplete = pageMissingCount === 0;
  const firstMissingIndex = state.answers.findIndex(
    (val) => !(typeof val === "number" && val >= 1 && val <= 7),
  );

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [state.page]);

  const handleNextPage = () => {
    if (!pageComplete) {
      setError("このページの回答をすべて選んでください");
      return;
    }
    setError(null);
    if (state.page < totalPages - 1) dispatch({ type: "nextPage" });
  };
  const handlePrevPage = () => {
    if (state.page > 0) dispatch({ type: "prevPage" });
  };

  const handleSubmit = () => {
    if (!completed) {
      const missing = questions.length - answered;
      setError(`未回答が${missing}問あります。全て選択してください。`);
      if (firstMissingIndex >= 0) {
        dispatch({ type: "setPage", page: Math.floor(firstMissingIndex / pageSize) });
      }
      return;
    }
    const payload = encodePayload(state.answers);
    router.push(`/result?p=${payload}`);
  };

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-emerald-100 bg-white/80 p-4 shadow-sm">
        <ProgressBar percent={progress} label="回答済み" />
      </div>
      <div className="space-y-6" ref={listRef}>
        {currentQuestions.map((question, localIdx) => {
          const globalIndex = startIndex + localIdx;
          return (
            <QuestionCard
              key={question.id}
              question={question}
              index={globalIndex}
              total={questions.length}
              value={state.answers[globalIndex]}
              onChange={(value) => {
                setError(null);
                dispatch({
                  type: "setAnswer",
                  index: globalIndex,
                  value,
                });
              }}
            />
          );
        })}
      </div>
      <div className="flex flex-wrap items-center gap-3 rounded-[18px] border border-gray-100 bg-white/80 p-4 shadow-sm">
        <button
          type="button"
          onClick={handlePrevPage}
          className="inline-flex items-center justify-center rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:border-gray-100 disabled:text-gray-400 disabled:shadow-none"
          disabled={state.page === 0}
        >
          前へ
        </button>
        <button
          type="button"
          onClick={handleNextPage}
          className="inline-flex items-center justify-center rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:border-gray-100 disabled:text-gray-400 disabled:shadow-none"
          disabled={state.page >= totalPages - 1 || !pageComplete}
        >
          次へ
        </button>
        <div className="ml-auto flex flex-col items-start gap-2 sm:flex-row sm:items-center">
          <div className="flex flex-col text-xs text-gray-600">
            <span>残り {questions.length - answered} 問</span>
            {!pageComplete && (
              <span className="text-rose-500">このページの未回答: {pageMissingCount} 問</span>
            )}
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:translate-y-[-1px] hover:shadow-xl disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
            disabled={!completed}
          >
            結果を見る
          </button>
        </div>
      </div>
      {error && (
        <p className="text-sm font-semibold text-rose-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
