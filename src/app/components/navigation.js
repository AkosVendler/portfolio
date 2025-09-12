"use client";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";


export default function Navigation({ menuOpen, toggleMenu }) {
    const navRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(
            navRef.current,
            { opacity: 0, y: -70 },
            { y: 0, opacity: 1, duration: 1.5, ease: "power4.inOut", delay: 3.2 }
        );
    }, []);

    return (
        <div ref={navRef} className="w-full absolute z-10 flex items-center justify-between px-[35px]">
            <div className="flex items-center gap-15 h-[150px]">

                <p style={{
                    color: menuOpen ? "white" : "white",
                }} className="text-2xl font-[700]">Motion Studio.</p>
            </div>

            <div className="flex items-center gap-6">
                {/* Ha menu nyitva, akkor balra "Work" és "Contact" linkek */}
                {menuOpen && (
                    <div className="pr-20 flex gap-6">
                        <Link
                        target="_blank"
                            href={{
                                pathname: 'https://mailto:vendler.akos@gmail.com',
                            }}
                        >
                            <p className="text-2xl text-white cursor-pointer select-none">Contact</p>
                        </Link>
                        <p className="text-2xl text-white cursor-pointer select-none">Work</p>
                        </div>
                )}

                {/* Menü gomb */}
                <p
                    className="text-2xl cursor-pointer select-none"
                    onClick={toggleMenu}
                    style={{
                        color: menuOpen ? "white" : "white",
                    }}
                >
                    {menuOpen ? "Close" : "Menu"}
                </p>
            </div>
        </div>
    );
}
