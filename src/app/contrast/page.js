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
    <Navigation menuOpen={menuOpen} toggleMenu={toggleMenu} NavActive={NavActive} />
    
    {/* Külső fekete háttér div */}
    <div className="w-full bg-black min-h-screen flex justify-center">
        <div
            className="relative transition-all duration-300 w-full max-w-[1920px]"
            style={{
                marginRight: menuOpen ? "1.5rem" : undefined,
                marginLeft: menuOpen ? "1.5rem" : undefined,
                transform: menuOpen ? "translate(0px, 9.5rem)" : undefined,
                borderTopLeftRadius: menuOpen ? "34px" : undefined,
                borderTopRightRadius: menuOpen ? "34px" : undefined,
            }}
        >
            {/* Eredeti fehér háttér div */}
            <div
                className="h-[400vh] w-full pt-40 bg-white flex items-start justify-center"
                style={{
                    borderTopLeftRadius: menuOpen ? "34px" : undefined,
                    borderTopRightRadius: menuOpen ? "34px" : undefined,
                }}
            >
                <div className="w-full h-fit relative z-1 rounded-[40px] box-border mx-4 sm:mx-6 md:mx-8 bg-[#0F0F0F]">
                    {/* ...itt marad minden tartalom, amit eddig használtál... */}
                    <div className="w-full flex flex-col md:flex-row items-center justify-between px-6 sm:px-10 md:px-16 py-10 md:py-20">
                        <h1 className="uppercase font-[700] text-5xl min-[320px]:text-4xl max-sm:text-6xl max-md:text-8xl min-2xl:text-9xl text-white mb-4 md:mb-0">Contrast</h1>
                        <h1 className="uppercase font-[700] text-5xl min-[320px]:text-4xl max-sm:text-6xl max-md:text-8xl min-2xl:text-9xl text-white">2025</h1>
                    </div>

                    <div className="flex flex-col justify-between px-4 sm:px-8 pb-[100vh] pt-10 gap-10 sm:gap-20 bg-[#2D2E2E] rounded-[40px]">
                        {/* Services / Description / Visit site */}
                        <div className="flex flex-col md:flex-row px-2 sm:px-6 gap-6 sm:gap-12 items-start">
                            <div className="flex flex-col mb-6 md:mb-0">
                                <h2 className="font-[700] text-xl sm:text-2xl md:text-3xl text-white pb-2 sm:pb-4">Services</h2>
                                <div className="flex flex-wrap gap-2 sm:gap-3">
                                    {["Html", "Js", "Gsap", "Lenis"].map((service, i) => (
                                        <p key={i} className="px-2 py-1 bg-[#606060] min-w-[48px] sm:min-w-[60px] text-center text-white rounded-[7px]">{service}</p>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col mb-6 md:mb-0">
                                <h2 className="font-[700] text-xl sm:text-2xl md:text-3xl pb-2 sm:pb-4 text-white">Description</h2>
                                <p className="text-white max-w-full sm:max-w-[300px] md:max-w-[400px]">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>

                            <div className="md:ml-auto">
                                <Link href="https://contrastdesign.hu">
                                    <h1 className="underline w-40 text-[0.9rem] sm:text-[1rem] md:text-[1.2rem] text-left md:text-right text-white font-[500]">
                                        Visit site
                                    </h1>
                                </Link>
                            </div>
                        </div>

                        {/* Video */}
                        <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[100vh] overflow-hidden rounded-[30px] bg-black">
                            <video className="w-full h-full object-cover" preload="none" autoPlay loop muted>
                                <source src="/tempvideo.mp4" type="video/mp4" />
                            </video>
                        </div>

                        {/* Képsorok */}
                        {[0, 1].map((row) => (
                            <div key={row} className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-12">
                                {[0, 1].map((col) => (
                                    <div key={col} className="relative w-full md:w-1/2 h-[40vh] sm:h-[50vh] md:h-[60vh] overflow-hidden rounded-[30px] bg-black">
                                        <Image
                                            src={col === 0 && row === 0 ? "/contrastabout.png" : "/HOME.png"}
                                            alt="Contrast site"
                                            fill
                                            className="object-contain rounded-[20px]"
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer />
</>


    );
}

