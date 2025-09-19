// components/HeroFooter.jsx
import Image from "next/image";

export default function HeroFooter() {
    return (
        <div className="h-40vh flex flex-col justify-between rounded-t-[34px] bg-black text-white w-full relative z-50">
            {/* Hero szekció */}
            <section className="flex-1 flex items-start justify-between px-[35px] box-border py-24">
                <h1 className="text-4xl md:text-6xl font-light leading-snug max-w-2xl">
                    I MAKE WEBSITES THAT <br />
                    DON’T JUST WORK <br />
                    THEY WOW
                </h1>           
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-700 p-6 flex flex-col md:flex-row justify-between items-end text-sm">
                <span>HUNGARY</span>
                <span>ALL RIGHTS RESERVED © 2025 Motion Studio.</span>
                <div className="flex gap-4">
                    <a href="#" className="hover:underline">PRIVACY POLICY</a>
                    <a href="#" className="hover:underline">TERMS AND CONDITIONS</a>
                </div>
            </footer>
        </div>
    );
}
