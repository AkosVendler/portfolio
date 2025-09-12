"use client";
import { useState, useEffect, useRef } from "react";
import Navigation from "./components/navigation";
import localFont from "next/font/local";
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

      const totalHeight = items.length * window.innerHeight;
      wrapper.style.height = `${totalHeight}px`;

      // Állítsuk be: az első elem legyen lent (látható), a többiek legyenek teljesen lent (ki vannak tolva)
      items.forEach((item, index) => {
        if (index !== 0) {
          gsap.set(item, { yPercent: 100 });
        } else {
          gsap.set(item, { yPercent: 0 }); // az első látszik
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

      // Animáció: az első elem kicsit skálázódik, majd a többi jön fel sorban
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
              yPercent: 0, // a következő elem jön fel
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
          style={{
            borderTopLeftRadius: menuOpen ? "34px" : undefined,
            borderTopRightRadius: menuOpen ? "34px" : undefined,
          }}
          className="background bg-[url('/background.jpg')] bg-cover bg-center h-[130vh] w-full"
        >
          <div className="w-full h-screen flex items-end px-[35px] flex-col justify-center gap-10">
            <div className="flex items-center gap-48">
              <h1 ref={websitesRef} onMouseEnter={() => handleMouseEnter(websitesRef)}
                onMouseLeave={() => handleMouseLeave(websitesRef)} className="text-white text-9xl font-[300] cursor-pointer">
                WEBSITES
              </h1>
              <h1 ref={thatRef} onMouseEnter={() => handleMouseEnter(thatRef)}
                onMouseLeave={() => handleMouseLeave(thatRef)} className="text-white text-9xl font-[300] cursor-pointer">
                THAT
              </h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 ref={dontJustRef} onMouseEnter={() => handleMouseEnter(dontJustRef)}
                onMouseLeave={() => handleMouseLeave(dontJustRef)} className="text-white text-9xl font-[300] cursor-pointer">
                DON’T JUST
              </h1>
              <h1
                ref={workRef}
                onMouseEnter={() => handleMouseEnter(workRef)}
                onMouseLeave={() => handleMouseLeave(workRef)}
                className={`${Caslon.className} text-white text-9xl font-[300] cursor-pointer`}
              >
                WORK —
              </h1>
            </div>
            <div className="flex items-center gap-6">
              <Image ref={smileRef} onMouseEnter={() => handleMouseEnter(smileRef)}
                onMouseLeave={() => handleMouseLeave(smileRef)}
                src="/sticker.svg"
                width={100}
                height={100}
                alt="Picture of the author"
                style={{ cursor: "pointer" }}

              />
              <h1 ref={theyRef} onMouseEnter={() => handleMouseEnter(theyRef)}
                onMouseLeave={() => handleMouseLeave(theyRef)} className="text-white text-9xl font-[300] cursor-pointer">
                THEY
              </h1>
              <h1
                ref={wowRef} onMouseEnter={() => handleMouseEnter(wowRef)}
                onMouseLeave={() => handleMouseLeave(wowRef)}
                className={`${Caslon.className} text-white text-9xl font-[300] cursor-pointer`}
              >
                WOW
              </h1>
            </div>
          </div>
          <h1 ref={descRef} className="w-96 relative pl-[35px] text-white top-[-150px]">
            I design and build websites that are fun to use, nice to look at, and don’t make your brain hurt. Think of me as the guy who turns “just a website” into “wait, this is kinda cool.”
          </h1>
        </div>
      </main>
      <div className=" top-28 w-full bg-white">
        <div className="scroll-wrapper">
          <h1 className="text-black text-[12rem] pt-50 uppercase font-[700] text-center">My Projects</h1>
          <div className="scroll-section vertical-section section">
            <div className="wrapper">
              <div role="list" className="list">
                <div role="listitem" className="item border-2">
                  <div className="item_content bg-[url('/lumero.png')]">
                  </div>
                </div>
                <div role="listitem" className="item">
                  <div className="item_content bg-[url('/contrast.png')]">

                  </div>
                </div>
                <div role="listitem" className="item">
                  <div className="item_content bg-[url('/barber.png')]">
                  </div>
                </div>
                <div role="listitem" className="item">
                  <div className="item_content bg-no-repeat bg-cover bg-[url('/nolta.png')]">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex items-center justify-center gap-3 cursor-pointer"

          >
            <h1 className="text-center text-black text-4xl font-normal">
              See all
            </h1>
            <Image
              src="/arrow.svg"
              width={35}
              height={35}
              alt="Arrow icon"
            />
          </div>
          <div ref={triggerRef} className=" flex items-center h-screen justify-between px-[35px] pt-64 textTrigger">
            <div className="w-2/4">
              <h1 ref={textRef} className="text-black text-5xl font-bold w-5/6">
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
      className="flex gap-6 px-[35px] justify-between items-start h-[250vh]"
    >
      <h2 className="text-3xl text-black font-medium">My skills</h2>
      <div className="grid grid-cols-3 gap-4">
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            ref={(el) => (cardsRef.current[index] = el)}
            className="bg-black flex items-center justify-center rounded-lg p-6 w-90 h-90"
          >
            <Image
              src={skill.icon}
              alt={skill.name}
              width={100}
              height={50}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </section>

    
      </div>
      <Footer />;
    </>
  );
}
