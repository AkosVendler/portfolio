"use client"

import { useState, useEffect, useRef } from "react";
import Footer from "../components/footer";
import Navigation from "../components/navigation";
import Image from "next/image";
import { gsap } from "gsap";
import Lenis from 'lenis'; // ajánlott package
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";



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
      
          {/* Külső fekete wrapper */}
          <div className="w-full bg-black transition-all duration-300">
      
            {/* Eredeti fehér tartalom */}
            <div
              className="relative transition-all duration-300"
              style={{
                marginRight: menuOpen ? "1.5rem" : undefined,
                marginLeft: menuOpen ? "1.5rem" : undefined,
                transform: menuOpen ? "translate(0px, 9.5rem)" : undefined,
                borderTopLeftRadius: menuOpen ? "34px" : undefined,
                borderTopRightRadius: menuOpen ? "34px" : undefined,
              }}
            >
              <div
                className="h-[300vh] w-full bg-white"
                style={{
                  borderTopLeftRadius: menuOpen ? "34px" : undefined,
                  borderTopRightRadius: menuOpen ? "34px" : undefined,
                }}
              >
                <div className="pt-48 px-[34px] flex flex-col ">
                  <div className="">
                    <h1 ref={workRef} className="uppercase text-black font-[700] 2xl:text-9xl max-[500px]: text-8xl">
                      Work
                    </h1>
                  </div>
      
                  {/* Kártya Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-20">
                    {[0, 1, 2, 3].map((i) => (
                      <Link
                        key={i}
                        href={i === 0 ? "/contrast" : i === 1 ? "/lumero" : "#"}
                        ref={(el) =>
                          i < 2
                            ? (firstRowRef.current[i] = el)
                            : (secondRowRef.current[i - 2] = el)
                        }
                        className="
                          w-full rounded-[34px] p-5 bg-[#0A0908]
                          h-[300px] sm:h-[380px] md:h-[450px] lg:h-[620px]
                          flex flex-col justify-between box-border
                        "
                      >
                        {/* Kép */}
                        <div className="relative w-full flex-1 rounded-[20px] overflow-hidden">
                          <Image
                            src={i === 0 || i === 2 ? "/contrastabout.png" : "/lumero.png"}
                            alt="Work project"
                            fill
                            className="object-cover rounded-[20px]"
                          />
                        </div>
      
                        {/* Text + Date */}
                        <div className="w-full h-[60px] flex justify-between items-center text-white mt-4">
                          <p className="font-[500] text-xl sm:text-2xl">
                            {i === 0 || i === 2 ? "Contrast site" : "Lumero site"}
                          </p>
                          <p className="font-[500] text-xl sm:text-2xl">
                            2025
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
      
                {/* Animált szöveg */}
                <div className="flex items-center justify-center h-1/4">
                  <h1
                    ref={textRef}
                    className="text-black font-[600] 2xl:text-9xl lg:text-9xl md:text-7xl text-center max-[500px]:text-4xl max-[500px]:text-center"
                  >
                    Let yours be here too
                  </h1>
                </div>
              </div>
            </div>
          </div>
      
          <Footer />
        </>
      )
      
} 