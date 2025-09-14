"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Navigation({ menuOpen, toggleMenu }) {
    const navRef = useRef(null);
    const pathname = usePathname(); // <<< itt tudod lekérdezni az aktuális route-ot
    const isWorks = pathname === "/works"; // works oldalon vagy-e?

    useEffect(() => {
        const tl = gsap.timeline();
        const delay = isWorks ? 0.1 : 3.2; // works oldalon rövidebb delay

        tl.fromTo(
            navRef.current,
            { opacity: 0, y: -70 },
            { y: 0, opacity: 1, duration: 1.5, ease: "power4.inOut", delay }
        );
    }, [isWorks]);

    return (
        <div
            ref={navRef}
            className="w-full absolute z-10 flex items-center justify-between px-[35px]"
            style={{
                backgroundColor: menuOpen ? "black" : "transparent", // menü nyitva fekete bg
                transition: "background-color 0.3s ease",
            }}
        >
            <div className="flex items-center gap-15 h-[150px]">
                <Link href="/">
                <p
                    className="text-2xl font-[700]"
                    style={{
                        color: menuOpen ? "white" : isWorks ? "black" : "white",
                    }}
                >
                    Motion Studio.
                </p>
                </Link>
                
            </div>

            <div className="flex items-center gap-6">
                {menuOpen && (
                    <div className="pr-20 flex gap-6">
                        <Link href="mailto:vendler.akos@gmail.com" target="_blank">
                            <p
                                className="text-2xl cursor-pointer select-none"
                                style={{
                                    color: "white",
                                }}
                            >
                                Contact
                            </p>
                        </Link>

                        <Link href="/works">
                            <p
                                className="text-2xl cursor-pointer select-none"
                                style={{
                                    color: "white",
                                }}
                            >
                                Work
                            </p>
                        </Link>
                    </div>
                )}

                <p
                    className="text-2xl cursor-pointer select-none"
                    onClick={toggleMenu}
                    style={{
                        color: menuOpen ? "white" : isWorks ? "black" : "white",
                    }}
                >
                    {menuOpen ? "Close" : "Menu"}
                </p>
            </div>
        </div>
    );
}
