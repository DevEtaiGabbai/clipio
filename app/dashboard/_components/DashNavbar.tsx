"use client";

import { useUser, UserButton } from "@clerk/nextjs";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils";
import Link from "next/link";
import React from 'react';
import { Settings, Zap } from "lucide-react";

const DashNavbar = () => {
    const { user } = useUser();

    return (
        <header className="sticky top-0 inset-x-0 h-14 w-full p-[2rem] z-[99999] bg-background/90 backdrop-blur-xl select-none border-b border-gray-700/50">
            <div className="flex items-center justify-between h-full px-4">
                <h1 className="text-md font-semibold">Clipio</h1>
                <div className="flex items-center">
                    {user && (
                        <>
                        <button className="mr-5">
                            <Settings className="w-4 h-4" />
                        </button>
                        <UserButton />
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default DashNavbar;