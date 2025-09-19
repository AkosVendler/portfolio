"use client"

import { useState, useEffect, useRef } from "react";
import Navigation from "../components/navigation";
import { gsap } from "gsap";
import Image from "next/image";
import Lenis from 'lenis'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "../components/footer";
import Link from "next/link";

export default function contrast() {
    const [loading, setLoading] = useState(true);
    const [percent, setPercent] = useState(0);
    const [NavActive, setNavActive] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);


    // Loading animáció
    useEffect(() => {
        const interval = setInterval(() => {
            setPercent((p) => (p < 100 ? p + 1 : p));
        }, 40);

        const timeout = setTimeout(() => {
            setLoading(false);
            setNavActive(false);
        }, 4000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, []);

    // GSAP ScrollTrigger regisztráció
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    }, []);

    useEffect(() => {
        // csak ha a window elérhető
        if (typeof window === "undefined") return;

        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis();

        lenis.on("scroll", () => {
            ScrollTrigger.update();
            gsap.updateRoot();
        });

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
    }), [];

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        if (!menuOpen) return;
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setMenuOpen(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [menuOpen]);


    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-white">
                <span className="text-xl font-[500] text-black">{percent}</span>
            </div>
        );
    }

    return (


        <>
            <Navigation menuOpen={menuOpen} toggleMenu={toggleMenu} NavActive={NavActive}></Navigation>
            <div className="relative transition-all duration-300"
                style={{
                    marginRight: menuOpen ? "1.5rem" : undefined,
                    marginLeft: menuOpen ? "1.5rem" : undefined,
                    transform: menuOpen ? "translate(0px, 9.5rem)" : undefined,
                    borderTopLeftRadius: menuOpen ? "34px" : undefined,
                    borderTopRightRadius: menuOpen ? "34px" : undefined,
                }}
            >
                <div className="h-[400vh] w-full pt-40 bg-white flex items-start justify-center"
                    style={{
                        borderTopLeftRadius: menuOpen ? "34px" : undefined,
                        borderTopRightRadius: menuOpen ? "34px" : undefined,
                    }}
                >

                    <div className="w-full h-fit relative z-1 rounded-[40px] box-border mx-[20px] bg-[#0F0F0F]">
                        <div className="w-full h-24 flex items-center px-[40px] py-40 justify-between">
                            <h1 className="uppercase font-[700] text-9xl">Contrast</h1>
                            <h1 className="uppercase font-[700] text-9xl">2025</h1>
                        </div>
                        <div className="flex flex-col px-[20px] pb-[100vh] rounded-[40px] pt-20 gap-20 bg-[#2D2E2E] mx-[20px]">
                            <div className="flex flex-row px-[20px]rounded-[40px] gap-20">
                                <div className="flex flex-col">
                                    <h2 className="font-[700] text-3xl pb-4">Services</h2>
                                    <div className="flex flex-row gap-3">
                                        <p className="px-2 py-1 bg-[#606060] min-w-24 text-center rounded-[7px]">Html</p>
                                        <p className="px-2 py-1 bg-[#606060] min-w-24 text-center rounded-[7px]">Js</p>
                                        <p className="px-2 py-1 bg-[#606060] min-w-24 text-center rounded-[7px]">Gsap</p>
                                        <p className="px-2 py-1 bg-[#606060] min-w-24 text-center rounded-[7px]">Lenis</p>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <h2 className="font-[700] text-3xl pb-4">Description</h2>
                                    <div className="flex flex-row gap-3">
                                        <p className="max-w-3/6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                    </div>
                                </div>

                                <div className="">
                                    <Link href="https://akosvendler.github.io/ContrastWeb/">
                                        <h1 className="underline w-40 text-right text-[1.2rem] font-[500]">Visit site</h1>
                                    </Link>

                                </div>
                            </div>


                            <div className="relative w-full h-[100vh] overflow-hidden rounded-[30px] bg-black">
                                
                                <video className="w-full h-full" preload="none" autoPlay loop muted>
                                    <source src="/tempvideo.mp4" type="video/mp4" />
                                </video>
                            </div>
                            <div className="flex flex-row gap-12">
                                <div className="relative w-2/4 h-[60vh] overflow-hidden rounded-[30px] bg-black">
                                    <Image
                                        src="/contrastabout.png"
                                        alt="Contrast site"
                                        fill
                                        className="object-contain rounded-[20px]"
                                    />
                                </div>

                                <div className="relative w-2/4 h-[60vh] overflow-hidden rounded-[30px] bg-black">
                                    <Image
                                        src="/HOME.png"
                                        alt="Contrast site"
                                        fill
                                        className="object-contain rounded-[20px]"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row gap-12">
                                <div className="relative w-2/4 h-[60vh] overflow-hidden rounded-[30px] bg-black">
                                    <Image
                                        src="/contrastabout.png"
                                        alt="Contrast site"
                                        fill
                                        className="object-contain rounded-[20px]"
                                    />
                                </div>

                                <div className="relative w-2/4 h-[60vh] overflow-hidden rounded-[30px] bg-black">
                                    <Image
                                        src="/HOME.png"
                                        alt="Contrast site"
                                        fill
                                        className="object-contain rounded-[20px]"
                                    />
                                </div>
                            </div>
                        </div>



                    </div>

                </div>
            </div>
            <Footer></Footer>
        </>

    );
}

