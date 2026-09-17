"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import HeroCarousel from "@/components/ui/HeroCarousel";
import { CASINO_SLIDES } from "@/mocks/slides";
import { AuthGuard } from "@/components/providers/AuthGuard";

const MyPage = () => {
    const [nickname, setNickname] = useState("");
    const [bankName, setBankName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    return (
        <AuthGuard>
            <HeroCarousel slides={CASINO_SLIDES} />
            <div className="flex w-full flex-col px-0 pb-10 md:px-5">
                {/* Header */}
                <div className="flex w-full pt-px">
                    <div className="flex min-h-30 w-full shrink-0 items-center bg-[#11141d88] px-4 backdrop-blur-[5px] md:h-50 md:px-0">
                        <span className="block w-full text-left text-2xl font-medium text-[#aaaaaa] md:pl-20 md:text-[40px]">
                            나의 정보
                        </span>
                    </div>
                </div>

                {/* User info grid */}
                <div className="grid w-full grid-cols-1 gap-px">
                    <div className="flex h-11 w-full md:h-12.5">
                        <label className="mr-px flex w-25 shrink-0 items-center justify-center bg-[#07172d] px-0.5 text-center text-xs leading-tight text-[#aaaaaa] md:w-37.5 md:text-[15px] md:leading-[50px]">
                            닉네임
                        </label>
                        <div className="relative flex flex-1 justify-center bg-[#0d1d32]">
                            <input
                                type="text"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                placeholder=""
                                className="w-full bg-transparent px-2 text-right text-sm text-[#ef7c00] outline-hidden placeholder:text-gray/50 md:px-2.5 md:text-lg"
                            />
                        </div>
                    </div>
                    <div className="flex h-11 w-full md:h-12.5">
                        <label className="mr-px flex w-25 shrink-0 items-center justify-center bg-[#07172d] px-0.5 text-center text-xs leading-tight text-[#aaaaaa] md:w-37.5 md:text-[15px] md:leading-[50px]">
                            은행명
                        </label>
                        <div className="relative flex flex-1 justify-center bg-[#0d1d32]">
                            <input
                                type="text"
                                value={bankName}
                                onChange={(e) => setBankName(e.target.value)}
                                placeholder=""
                                className="w-full bg-transparent px-2 text-right text-sm text-[#ef7c00] outline-hidden placeholder:text-gray/50 md:px-2.5 md:text-lg"
                            />
                        </div>
                    </div>
                    <div className="flex h-11 w-full md:h-12.5">
                        <label className="mr-px flex w-25 shrink-0 items-center justify-center bg-[#07172d] px-0.5 text-center text-xs leading-tight text-[#aaaaaa] md:w-37.5 md:text-[15px] md:leading-[50px]">
                            계좌번호
                        </label>
                        <div className="relative flex flex-1 justify-center bg-[#0d1d32]">
                            <input
                                type="text"
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                                placeholder=""
                                className="w-full bg-transparent px-2 text-right text-sm text-[#ef7c00] outline-hidden placeholder:text-gray/50 md:px-2.5 md:text-lg"
                            />
                        </div>
                    </div>
                    <div className="flex min-h-11 w-full items-stretch md:h-12.5">
                        <label className="mr-px flex w-25 shrink-0 items-center justify-center bg-[#07172d] px-0.5 text-center text-[10px] leading-tight text-[#aaaaaa] sm:text-xs md:w-37.5 md:text-[15px] md:leading-[50px]">
                            기존 비밀번호
                        </label>
                        <div className="relative flex flex-1 items-center bg-[#0d1d32] px-2 md:px-2.5">
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="기존 비밀번호"
                                className="w-full bg-transparent text-right text-xl text-[#ef7c00] outline-hidden placeholder:text-xs placeholder:tracking-widest placeholder:text-white md:text-2xl md:placeholder:text-lg"
                            />
                        </div>
                    </div>
                    <div className="flex min-h-11 w-full items-stretch md:h-12.5">
                        <label className="mr-px flex w-25 shrink-0 items-center justify-center bg-[#07172d] px-0.5 text-center text-[10px] leading-tight text-[#aaaaaa] sm:text-xs md:w-37.5 md:text-[15px] md:leading-[50px]">
                            변경할 비밀번호
                        </label>
                        <div className="relative flex flex-1 items-center bg-[#0d1d32] px-2 md:px-2.5">
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="변경할 비밀번호"
                                className="w-full bg-transparent text-right text-xl text-[#ef7c00] outline-hidden placeholder:text-xs placeholder:tracking-widest placeholder:text-white md:text-2xl md:placeholder:text-lg"
                            />
                        </div>
                    </div>
                    <div className="flex min-h-11 w-full items-stretch md:h-12.5">
                        <label className="mr-px flex w-25 shrink-0 items-center justify-center bg-[#07172d] px-0.5 text-center text-[10px] leading-tight text-[#aaaaaa] sm:text-xs md:w-37.5 md:text-[15px] md:leading-[50px]">
                            비밀번호확인
                        </label>
                        <div className="relative flex flex-1 items-center bg-[#0d1d32] px-2 md:px-2.5">
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="비밀번호확인"
                                className="w-full bg-transparent text-right text-lg text-[#ef7c00] outline-hidden placeholder:text-xs placeholder:tracking-widest placeholder:text-white md:text-2xl md:placeholder:text-lg"
                            />
                        </div>
                    </div>
                    <Button
                        variant="red"
                        className="mt-px h-20 w-full rounded-none px-6 text-base font-normal text-gray md:h-25 md:px-12.5 md:text-lg"
                    >
                        변경하기
                    </Button>
                </div>
            </div>
        </AuthGuard>
    );
};

export default MyPage;
