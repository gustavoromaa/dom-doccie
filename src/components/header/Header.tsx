'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsBag } from "react-icons/bs";
import { useEffect } from "react";
import Image from "next/image";
import logo from "/public/Doccie.svg"
import logoCor from "/public/logoComCor.svg"
import { Tooltip } from "@nextui-org/react";

import "./header.css"

import { WindSong } from 'next/font/google'

const windSong = WindSong({
    weight: '400',
    subsets: ['latin'],
})

export default function Header({ className, classNameMobile, style }: { className?: string, classNameMobile?: string, style?: any }) {
    return (
        <div>
            <div className={`header_mobile ${className}`} style={style}>
                <div className={`header_mobile_container`} style={style}>
                    <Link href="/">
                        <Image
                            src={logoCor}
                            alt="logo"
                            className="header_icon"
                        />
                    </Link>
                    <Link href="/carrinho">
                        <BsBag className="header_icon_cart" />
                    </Link>
                </div>
            </div>
            <div className={`header_background ${className}`} style={style}>
                <div className={`header_container`} style={style}>
                    <Link href="/">
                        <Image
                            src={logoCor}
                            alt="logo"
                            className="header_icon"
                        />
                    </Link>
                    <Link href="/">
                        <button className={`header_logo ${windSong.className}`}>Dom Docciê</button>
                    </Link>
                    <Link href="/carrinho">
                        <BsBag className="header_icon_cart" />
                    </Link>
                </div>
            </div>
        </div>
    );
}