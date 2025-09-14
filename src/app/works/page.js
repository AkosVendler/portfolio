"use client"

import { useState, useEffect, useRef } from "react";
import Footer from "../components/footer";
import Navigation from "../components/navigation";
import Image from "next/image";
import { gsap } from "gsap";
import Lenis from 'lenis'; // ajánlott package
import { ScrollTrigger } from "gsap/ScrollTrigger";



export default function Works() {
    const [loading, setLoading] = useState(true);
    const [percent, setPercent] = useState(0);
    const [NavActive, setNavActive] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const textRef = useRef(null); // <<< szöveg referenciája
    const workRef = useRef(null);
    const cardsRef = useRef([]);
    const firstRowRef = useRef([]);
    const secondRowRef = useRef([]);

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

    // 👇 ScrollTrigger animáció a szövegre
    useEffect(() => {
        if (!textRef.current || loading) return;

        gsap.fromTo(
            textRef.current,
            {
                y: 150,
                opacity: 0,
                letterSpacing: "0.2em",   // tág betűköz
                filter: "blur(0px)"      // életlen indulás
            },
            {
                y: 0,
                opacity: 1,
                letterSpacing: "0em",     // normál betűköz
                filter: "blur(0px)",      // tisztul ki
                duration: 1.5,
                ease: "power4.out",

                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 85%",
                    end: "top 40%",
                    scrub: true,
                }
            }
        );
    }, [loading]);



    useEffect(() => {
        if (!workRef.current || loading) return;

        // alap stílus: csak kontúr
        gsap.set(workRef.current, {
            color: "transparent",
            WebkitTextStroke: "1px black",
        });

        gsap.to(workRef.current, {
            color: "black",                  // kitöltés
            WebkitTextStroke: "0px black",   // stroke eltűnik
            delay: 1,
            duration: 2,
            ease: "power4.out",

        });
    }, [loading]);

    useEffect(() => {
        if (loading) return;
      
        // Első sor animáció
        // Első sor
gsap.fromTo(
    firstRowRef.current,
    { y: 100, opacity: 0, scale: 0.95, filter: "blur(10px)" },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: firstRowRef.current[0],
        start: "top 80%",
        end: "top 50%",
        scrub: false,
      },
    }
  );
  
  // Második sor
// Második sor animáció
gsap.fromTo(
    secondRowRef.current,
    {
      y: 100,
      opacity: 0,
      scale: 0.95,
      filter: "blur(10px)",
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: secondRowRef.current[0], // első kártya a sorból
        start: "top 85%", // amikor a sor 85%-a a viewport topjához ér
        end: "top 50%",
        scrub: true,
        markers: false,
      },
    }
  );
  
  
          
      }, [loading]);
      

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
            <div className="relative transition-all duration-300"
                style={{
                    marginRight: menuOpen ? "1.5rem" : undefined,
                    marginLeft: menuOpen ? "1.5rem" : undefined,
                    transform: menuOpen ? "translate(0px, 9.5rem)" : undefined,
                    borderTopLeftRadius: menuOpen ? "34px" : undefined,
                    borderTopRightRadius: menuOpen ? "34px" : undefined,
                }}
            >
                <div className="h-[400vh] w-full bg-white"
                    style={{
                        borderTopLeftRadius: menuOpen ? "34px" : undefined,
                        borderTopRightRadius: menuOpen ? "34px" : undefined,
                    }}
                >
                    <div className="pt-48 px-[34px] flex flex-col ">
                        <div className="">
                            <h1 ref={workRef} className="uppercase text-black font-[700] text-9xl">Work</h1>
                        </div>

                        {/* Első sor */}
                        <div className="w-full h-screen flex items-center gap-10 relative top-[-100px]">
                            {[0, 1].map((i) => (
                                <div
                                    key={i}
                                    ref={(el) => (firstRowRef.current[i] = el)}
                                    className="w-2/4 h-5/7 bg-[#0A0908] rounded-[34px] p-5 pb-20 box-border"
                                >
                                    <div className="w-full h-full relative rounded-[20px] overflow-hidden">
                                        <Image
                                            src={i === 0 ? "/contrastabout.png" : "/lumero.png"}
                                            alt="Picture of the author"
                                            fill
                                            style={{ objectFit: "cover", borderRadius: "20px" }}
                                        />
                                    </div>
                                    <div className="w-full h-[70px] flex justify-between items-center">
                                        <p className="font-[500] text-2xl">{i === 0 ? "Contrast site" : "Lumero site"}</p>
                                        <p className="font-[500] text-2xl">2025</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Második sor */}
                        <div className="w-full h-screen flex items-start gap-10 relative top-[-180px]">
                            {[2, 3].map((i) => (
                                <div
                                    key={i}
                                    ref={(el) => (secondRowRef.current[i - 2] = el)}
                                    className="w-2/4 h-5/7 bg-[#0A0908] rounded-[34px] p-5 pb-20 box-border"
                                >
                                    <div className="w-full h-full relative rounded-[20px] overflow-hidden">
                                        <Image
                                            src={i === 2 ? "/contrastabout.png" : "/lumero.png"}
                                            alt="Picture of the author"
                                            fill
                                            style={{ objectFit: "cover", borderRadius: "20px" }}
                                        />
                                    </div>
                                    <div className="w-full h-[70px] flex justify-between items-center">
                                        <p className="font-[500] text-2xl">{i === 2 ? "Contrast site" : "Lumero site"}</p>
                                        <p className="font-[500] text-2xl">2025</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* 👇 animált szöveg */}
                    <div className="flex items-center justify-center h-1/4">
                        <h1
                            ref={textRef}
                            className="text-black font-[600] text-9xl"
                        >
                            Let yours be here too
                        </h1>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
} 