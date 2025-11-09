"use client";
import { useState, useEffect, useRef } from "react";
import Navigation from "./components/navigation";
import localFont from "next/font/local";
import Link from "next/link";
import Image from "next/image";
import { gsap, wrap } from "gsap";
import Lenis from 'lenis'; // ajánlott package
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "./components/footer";

const Caslon = localFont({
  src: "./fonts/Big_Caslon_CC_Italic.otf",
  weight: "400",
  style: "normal",
});

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [percent, setPercent] = useState(0);
  const [NavActive, setNavActive] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // Ref-ek
  const websitesRef = useRef(null);
  const thatRef = useRef(null);
  const dontJustRef = useRef(null);
  const workRef = useRef(null);
  const theyRef = useRef(null);
  const wowRef = useRef(null);
  const smileRef = useRef(null);
  const descRef = useRef(null);
  const textRef = useRef(null);
  const triggerRef = useRef(null);
  const cardsRef = useRef([]);
  const cardSectionRef = useRef(null);

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





  // GSAP hover effekt React-es kezeléssel (ez a legjobb)
  const handleMouseEnter = (el) => {
    if (!el.current) return;
    gsap.to(el.current, {
      duration: 0.3,
      skewX: 5,
      skewY: 1,
      ease: "power1.out",
    });
  };

  const handleMouseLeave = (el) => {
    if (!el.current) return;
    gsap.to(el.current, {
      duration: 0.3,
      skewX: 0,
      skewY: 0,
      ease: "power1.out",
    });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  
    const scrollWrappers = document.querySelectorAll(".scroll-wrapper");
  
    scrollWrappers.forEach((wrapper) => {
      const section = wrapper.querySelector(".scroll-section");
      const items = section.querySelectorAll(".item");
  
      // Responsive magasság
      const isMobile = window.innerWidth <= 425;
      const itemHeight = isMobile ? window.innerHeight * 0.7 : window.innerHeight; // mobilon 60%-os magasság
      const totalHeight = items.length * itemHeight;
      wrapper.style.height = `${totalHeight}px`;
  
      // Állítsuk be: az első elem legyen lent (látható), a többiek legyenek teljesen lent (ki vannak tolva)
      items.forEach((item, index) => {
        if (index !== 0) {
          gsap.set(item, { yPercent: 100 });
        } else {
          gsap.set(item, { yPercent: 0 });
        }
      });
  
      // Pin a wrapper
      ScrollTrigger.create({
        trigger: wrapper,
        pin: true,
        start: "top+=200px top",
        end: () => `+=${totalHeight}`,
        scrub: true,
        //markers: true,
      });
  
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${totalHeight}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "none" },
      });
  
      items.forEach((item, index) => {
        timeline.to(item, {
          scale: 0.9,
          borderRadius: "34px",
          duration: 0.5,
        });
  
        if (index + 1 < items.length) {
          timeline.to(
            items[index + 1],
            {
              yPercent: 0,
              duration: 0.5,
            },
            "<"
          );
        }
      });
    });
  }, [loading]);
  



  // Bejövő animációk, ha nem tölt
  useEffect(() => {
    if (!loading) {
      const tl = gsap.timeline();

      tl.from(websitesRef.current, { y: 50, opacity: 0, duration: 1.5, ease: "power3.out" })
        .from(thatRef.current, { y: 50, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.6")
        .from(dontJustRef.current, { y: 50, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.6")
        .from(smileRef.current, { y: 50, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
        .from(workRef.current, { y: 50, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.6")
        .from(theyRef.current, { y: 50, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
        .from(wowRef.current, { y: 50, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
        .from(descRef.current, { y: 100, opacity: 0, duration: 0.8, ease: "power3.inOut" }, "-=0.6");
    }
  }, [loading]);

  useEffect(() => {
    if (!textRef.current || !triggerRef.current) return;

    if (window.innerWidth <= 425) return;

    const el = textRef.current;
    const originalText = el.innerText;
    const words = originalText.split(" ");

    // statikus indexek kijelölése (pl. 30%)
    const staticIndexes = [];
    words.forEach((_, i) => {
      if (Math.random() < 0.3) {
        staticIndexes.push(i);
      }
    });

    // HTML felépítése + extra space, ha statikus
    el.innerHTML = words
      .map((word, i) => {
        const extraSpace = staticIndexes.includes(i)
          ? `<span style="display:inline-block;width:30px;"></span>` // 🔥 extra space
          : "";
        return `<span class="inline-block relative" style="display:inline-block;margin-left:20px;margin-right:20px;">${word}</span>${extraSpace}`;
      })
      .join("");

    const spans = el.querySelectorAll("span");
    const wrapperHeight = triggerRef.current.offsetHeight;
    const startOffset = wrapperHeight * 3.5;
    const endOffset = startOffset + 600;

    spans.forEach((span, i) => {
      const isStatic = staticIndexes.includes(i);

      if (isStatic) {
        gsap.set(span, { x: 0, opacity: 1 });
        return;
      }

      if (staticIndexes.includes(i - 1)) {
        const startX = gsap.utils.random(-80, -30);
        gsap.set(span, { x: 0, opacity: 1 });
        gsap.to(span, {
          x: startX,
          opacity: 1,
          duration: 8,
          scrollTrigger: {
            trigger: el,
            start: () => `top+=${startOffset}px top`,
            end: () => `bottom+=${endOffset}px center`,
            scrub: true,
          },
        });
        return;
      }

      if (staticIndexes.includes(i + 1)) {
        const endX = gsap.utils.random(30, 80);
        gsap.set(span, { x: 0, opacity: 1 });
        gsap.to(span, {
          x: endX,
          opacity: 1,
          duration: 8,
          scrollTrigger: {
            trigger: el,
            start: () => `top+=${startOffset}px top`,
            end: () => `bottom+=${endOffset}px center`,
            scrub: true,
          },
        });
        return;
      }

      const randomX = gsap.utils.random(-40, 40);
      gsap.set(span, { x: 0, opacity: 1 });
      gsap.to(span, {
        x: randomX,
        opacity: 1,
        duration: 8,
        scrollTrigger: {
          trigger: el,
          start: () => `top+=${startOffset}px top`,
          end: () => `bottom+=${endOffset}px center`,
          scrub: true,
        },
      });
    });
  }, [loading]);



  const skills = [
    { name: "Figma", icon: "/skills/figma.svg" },
    { name: "Adobe XD", icon: "/skills/xd.svg" },
    { name: "Next.js", icon: "/skills/nextjs.svg" },
    { name: "Tailwind", icon: "/skills/tailwind.svg" },
    { name: "React", icon: "/skills/react.svg" },
    { name: "GSAP", icon: "/skills/gsap.svg" },
    { name: "CSS3", icon: "/skills/css.svg" },
    { name: "HTML5", icon: "/skills/html.svg" },
    { name: "Vercel", icon: "/skills/vercel.svg" },
  ];



  useEffect(() => {
    if (!cardSectionRef.current) return;
    const cards = gsap.utils.toArray(cardsRef.current);

    // Inicializáljuk a kártyákat lent, kisebb méret és skew
    gsap.set(cards, { y: 80, scale: 0.8, skewY: 10, opacity: 0 });

    // Timeline ScrollTrigger-rel
    gsap.timeline({
      scrollTrigger: {
        trigger: cardSectionRef.current,
        scroller: document.querySelector("body"), // ha Lenis-t használsz, lenis.el
        start: "top-=50px center+=50px", // szekció teteje érje el viewport alját
        end: "center top",    // a szekció alja érje el viewport tetejét
        scrub: 0.6,           // finom visszacsatolás scrollra
      },
    })
      .to(cards, {
        y: 0,
        scale: 1,
        skewY: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
      });
  }, [loading]);



  useEffect(() => {
    if (menuOpen) {
      document.body.style.backgroundColor = "black";
    } else {
      document.body.style.backgroundColor = "";
    }

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [menuOpen]);


  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (!menuOpen) return; // csak ha nyitva van a menü

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

      <main
        className="relative transition-all duration-300 bg-black"
        style={{
          marginRight: menuOpen ? "1.5rem" : undefined,
          marginLeft: menuOpen ? "1.5rem" : undefined,
          transform: menuOpen ? "translate(0px, 9.5rem)" : undefined,
          borderTopLeftRadius: menuOpen ? "34px" : undefined,
          borderTopRightRadius: menuOpen ? "34px" : undefined,
        }}
      >
        <div
          style={{
            borderTopLeftRadius: menuOpen ? "34px" : undefined,
            borderTopRightRadius: menuOpen ? "34px" : undefined,
          }}
          className="background bg-[url('/background.jpg')] bg-cover bg-center h-[130vh] w-full"
        >
          <div className="w-full h-screen flex items-end px-[35px] flex-col justify-center 2xl:gap-10 min-[320px]:gap-6">
            <div className="flex items-center 2xl:gap-48 lg:gap-48 md:gap-48 min-[425px]:gap-16 min-[320px]:gap-12">
              <h1 ref={websitesRef} onMouseEnter={() => handleMouseEnter(websitesRef)}
                onMouseLeave={() => handleMouseLeave(websitesRef)} className="text-white 2xl:text-9xl lg:text-8xl md:text-7xl min-[425px]:text-4xl min-[320px]:text-2xl font-[300] cursor-pointer">
                WEBSITES
              </h1>
              <h1 ref={thatRef} onMouseEnter={() => handleMouseEnter(thatRef)}
                onMouseLeave={() => handleMouseLeave(thatRef)} className="text-white 2xl:text-9xl lg:text-8xl md:text-7xl min-[425px]:text-4xl min-[320px]:text-2xl font-[300] cursor-pointer">
                THAT
              </h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 ref={dontJustRef} onMouseEnter={() => handleMouseEnter(dontJustRef)}
                onMouseLeave={() => handleMouseLeave(dontJustRef)} className="text-white 2xl:text-9xl lg:text-8xl md:text-7xl min-[425px]:text-4xl min-[320px]:text-2xl font-[300] cursor-pointer">
                DON’T JUST
              </h1>
              <h1
                ref={workRef}
                onMouseEnter={() => handleMouseEnter(workRef)}
                onMouseLeave={() => handleMouseLeave(workRef)}
                className={`${Caslon.className} text-white 2xl:text-9xl lg:text-8xl md:text-7xl min-[425px]:text-4xl min-[320px]:text-2xl font-[300] cursor-pointer`}
              >
                WORK —
              </h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative 2xl:w-[100px] 2xl:h-[100px] md:w-[80px] md:h-[80px] min-[425px]:w-[40px] min-[425px]:h-[40px] min-[320px]:w-[30px] min-[320px]:h-[30px]">
                <Image
                  ref={smileRef}
                  onMouseEnter={() => handleMouseEnter(smileRef)}
                  onMouseLeave={() => handleMouseLeave(smileRef)}
                  src="/sticker.svg"
                  alt="Picture of the author"
                  fill
                  style={{ objectFit: 'contain', cursor: 'pointer' }}
                />
              </div>

              <h1 ref={theyRef} onMouseEnter={() => handleMouseEnter(theyRef)}
                onMouseLeave={() => handleMouseLeave(theyRef)} className="text-white 2xl:text-9xl lg:text-8xl md:text-7xl min-[425px]:text-4xl min-[320px]:text-2xl font-[300] cursor-pointer">
                THEY
              </h1>
              <h1
                ref={wowRef} onMouseEnter={() => handleMouseEnter(wowRef)}
                onMouseLeave={() => handleMouseLeave(wowRef)}
                className={`${Caslon.className} text-white 2xl:text-9xl lg:text-8xl md:text-7xl min-[425px]:text-4xl min-[320px]:text-2xl font-[300] cursor-pointer`}
              >
                WOW
              </h1>
            </div>
          </div>
          <h1 ref={descRef} className="2xl:w-96 min-[425px]:w-72 min-[320px]:w-64 relative pl-[35px] text-white top-[-150px]">
            I design and build websites that are fun to use, nice to look at, and don’t make your brain hurt. Think of me as the guy who turns “just a website” into “wait, this is kinda cool.”
          </h1>
        </div>
      </main>
      <div className=" top-28 w-full bg-white">
        <div className="scroll-wrapper">
          <h1 className="text-black 2xl:text-[12rem] xl:text-[10rem] lg:text-[9rem] md:text-9xl min-[425px]:text-5xl min-[320px]:text-4xl pt-50 uppercase font-[700] text-center">My Projects</h1>
          <div className="scroll-section vertical-section section">
            <div className="wrapper">
              <div role="list" className="list">
                {["/lumero.png", "/contrast.png", "/barber.png", "/nolta.png"].map((img, i) => (
                  <div
                    key={i}
                    role="listitem"
                    className="item border-2 flex justify-center items-center max-[425px]:bg-black"
                  >
                    <div className="relative bg-black w-full h-full 2xl:w-full 2xl:h-full lg:w-full lg:h-full md:w-[400px] md:h-[400px] sm:w-[300px] sm:h-[300px]">
                      <Image
                        src={img}
                        alt={`Project ${i}`}
                        fill
                        style={{ objectFit: 'contain', objectPosition: 'center' }}
                      />
                    </div>
                  </div>
                ))}
              </div>



            </div>
          </div>
          <div className="flex items-center justify-center cursor-pointer md:mb-96">
            <Link href="/works">
              <span className="inline-flex items-center gap-3 relative group">

                {/* Underline */}
                <span className="absolute -bottom-1 left-0 h-[2px] bg-black w-0 transition-all duration-500 ease-out group-hover:w-full"></span>

                <span className="text-black text-4xl font-normal">
                  See all
                </span>

                <Image
                  src="/arrow.svg"
                  width={35}
                  height={35}
                  alt="Arrow icon"
                />
              </span>
            </Link>
          </div>
          <div ref={triggerRef} className=" flex 2xl:flex-row md:flex-col-reverse min-[425px]:flex-col-reverse min-[320px]:flex-col-reverse items-center h-screen justify-between px-[35px] pt-64 textTrigger">
            <div className="2xl:w-2/4 lg:w-3/4 md:w-4/4 min-[425px]:w-4/4 2xl:flex-none md:flex md:items-center md:justify-center md:gap-4 min-[425px]:flex min-[425px]:items-center min-[425px]:justify-center min-[425px]:gap-4">
              <h1 ref={textRef} className="text-black 2xl:text-5xl lg:text-4xl md:text-5xl min-[425px]:text-xl 2xl:text-left md:text-center font-bold w-5/6 xl:w-full">
                Driven by the sweet spot between design and development, I create sleek, responsive interfaces that feel as good as they look. Every pixel, every interaction — crafted with care to help bold ideas come alive on screen.
              </h1>
            </div>
            <Image
              src="/me.png"
              width={600}
              height={600}
              alt="Arrow icon"
            />
          </div>
        </div>
        <section
          ref={cardSectionRef}
          className="flex 2xl:flex-row min-[425px]:flex-col min-[320px]:flex-col gap-6 px-[35px] 2xl:justify-between items-start 2xl:h-[250vh] lg:h-[150vh] md:h-[150vh] min-[425px]:h-[100vh] min-[320px]:h-[100vh]"
        >
          <h2 className="text-5xl text-black font-medium">My skills</h2>
          <div className="grid grid-cols-3 gap-4">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                ref={(el) => (cardsRef.current[index] = el)}
                className="bg-black flex items-center justify-center rounded-lg p-6 2xl:w-90 2xl:h-90 lg:w-64 lg:h-64 md:w-52 md:h-52 min-[425px]:w-28 min-[425px]:h-28 min-[320px]:w-20 min-[320px]:h-20"
              >
                <div className="relative 2xl:w-[70px] 2xl:h-[70px] lg:w-[50px] lg:h-[50px] md:w-[60px] md:h-[60px] min-[425px]:w-20 min-[425px]:h-20 min-[320px]:w-20 min-[320px]:h-20">
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>


      </div>
      <Footer />
    </>
  );
}
