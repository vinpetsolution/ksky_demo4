"use server";

import type { AuthResponse } from "@/types";

const LOGIN_FAILED: AuthResponse = {
  success: false,
  message: "아이디 또는 비밀번호가 올바르지 않습니다.",
  result: {
    token: "",
    user: {
      id: "",
      userName: "",
      nickName: "",
      role: "USER",
      balanceMoney: 0,
      balancePoint: 0,
      balancePot: 0,
    },
  },
};

export async function demoSignIn(
  userName: string,
  password: string,
): Promise<AuthResponse> {
  const expectedUser = process.env.DEMO_USERNAME ?? "";
  const expectedPass = process.env.DEMO_PASSWORD ?? "";

  if (!expectedUser || !expectedPass) {
    return LOGIN_FAILED;
  }

  if (userName.trim() !== expectedUser || password !== expectedPass) {
    return LOGIN_FAILED;
  }

  return {
    success: true,
    message: "로그인 성공",
    result: {
      token: "demo-session",
      user: {
        id: "demo-user",
        userName: expectedUser,
        nickName: expectedUser,
        role: "USER",
        balanceMoney: 0,
        balancePoint: 0,
        balancePot: 0,
      },
    },
  };
}
