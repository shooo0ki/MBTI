import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { message: "保存APIは未実装です。クライアント側でURLに結果を保存してください。" },
    { status: 501 },
  );
}

export async function GET() {
  return NextResponse.json(
    { message: "保存APIは未実装です。URLパラメータのpを利用してください。" },
    { status: 501 },
  );
}
