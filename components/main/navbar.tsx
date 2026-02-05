'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { NAV_LINKS, SOCIALS } from "@/constants";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", "/");
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001427] backdrop-blur-md z-50 px-10">
      {/* Navbar Container */}
      <div className="w-full h-full flex items-center justify-between m-auto px-[10px]">

        {/* Logo + Name */}
        <button
          onClick={() => handleScroll("hero")}
          className="flex items-center"
        >
          <Image
            src="/indra.png"
            alt="Logo"
            width={36}
            height={36}
            draggable={false}
            className="cursor-pointer"
          />
          <div className="hidden md:flex font-bold ml-[10px] text-gray-300">
            iamindra
          </div>
        </button>

        {/* Web Navbar */}
        <div className="hidden md:flex h-full items-center justify-center flex-1">
          <div className="flex items-center gap-8 border border-[rgba(112,66,248,0.38)] bg-[rgba(3,0,20,0.37)] px-[28px] py-[10px] rounded-full text-gray-200">
            {NAV_LINKS.map((link) => (
              <button
                key={link.title}
                onClick={() => handleScroll(link.link.replace("#", ""))}
                className="cursor-pointer whitespace-nowrap hover:text-[rgb(112,66,248)] transition bg-transparent"
              >
                {link.title}
              </button>
            ))}
          </div>
        </div>

        {/* Social Icons (Web) */}
        <div className="hidden md:flex flex-row gap-5">
          {SOCIALS.map(({ link, name, icon: Icon }) => (
            <Link
              href={link}
              target="_blank"
              rel="noreferrer noopener"
              key={name}
            >
              <Icon className="h-6 w-6 text-white" />
            </Link>
          ))}
        </div>

        {/* Hamburger Menu */}
        <button
          className="md:hidden text-white focus:outline-none text-4xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-[65px] left-0 w-full bg-[#030014] p-5 flex flex-col items-center text-gray-300 md:hidden">

          {/* Links */}
          <div className="flex flex-col items-center gap-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link.title}
                onClick={() => handleScroll(link.link.replace("#", ""))}
                className="cursor-pointer whitespace-nowrap hover:text-[rgb(112,66,248)] transition bg-transparent"
              >
                {link.title}
              </button>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-6 mt-6">
            {SOCIALS.map(({ link, name, icon: Icon }) => (
              <Link
                href={link}
                target="_blank"
                rel="noreferrer noopener"
                key={name}
              >
                <Icon className="h-8 w-8 text-white" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
