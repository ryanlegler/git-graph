"use client";
import React from "react";
import Link from "next/link";
// types
import { HeaderProps } from "./types";

// TODO - style this
function Header({ userName }: HeaderProps) {
    return (
        <header data-testid="header">
            <div
                data-testid="breadcrumb"
                className=" bg-black flex gap-1 p-1 pr-4 rounded-full items-center"
            >
                <Link
                    className="rounded-full flex justify-center items-center bg-slate-900 hover:bg-[green] size-9 text-2xl"
                    href="/"
                >
                    🐙
                </Link>
                <div>/ {userName}</div>
            </div>
        </header>
    );
}

export { Header };
