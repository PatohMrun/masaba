'use client'
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from "next/navigation";
import Image from 'next/image';
import ThemeSwitch from './ThemeSwitch';
import { useTheme } from "next-themes";
import Link from 'next/link';
import { MdMenuOpen, MdClose } from "react-icons/md";

const Navbar: React.FC = () => {
    const pathname = usePathname();
    // const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [currentLogo, setCurrentLogo] = useState<string>('/images/Logo2.png');
    const { theme, systemTheme } = useTheme();

    const handleToggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const menuRef = useRef<HTMLDivElement>(null);

    const handleOutsideClick = (e: MouseEvent) => {
        if (
            isOpen &&
            menuRef.current &&
            !menuRef.current.contains((e.target as Node) || null)
        ) {
            setIsOpen(false);
        }
    };

    const handleScroll = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleOutsideClick);
            window.addEventListener("scroll", handleScroll);
        } else {
            document.removeEventListener("mousedown", handleOutsideClick);
            window.removeEventListener("scroll", handleScroll);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isOpen]);

    useEffect(() => {
        // Check the current theme and set the appropriate logo
        const currentTheme = theme === 'system' ? systemTheme : theme;
        setCurrentLogo(currentTheme === 'dark' ? '/images/Logo.png' : '/images/Logo2.png');
    }, [theme, systemTheme]);

    return (
        <nav className='bg-white shadow-md dark:bg-primary flex justify-between items-center px-4 font-oswald'>
            <div>
                <Image 
                    width={45}
                    height={45}
                    src={currentLogo}
                    alt='Logo'
                />
            </div>

            {/* Theme switch and large screen nav links */}
            <div className='flex gap-4 items-center'>
                {/* Large screen navlinks */}
                <div className='hidden sm:flex gap-4 text-primary dark:text-white'>
                    <Link href='/' className={`navlinks ${pathname === "/" ? "active" : ""}`}>Home</Link>
                    <Link href='/classes' className={`navlinks ${pathname === "/classes" ? "active" : ""}`}>Classes</Link>
                    <Link href='/portfolio' className={`navlinks ${pathname === "/portfolio" ? "active" : ""}`}>Portfolio</Link>
                    <Link href='/contact' className={`navlinks ${pathname === "/contact" ? "active" : ""}`}>Contact</Link>
                </div>

                {/* Mobile menu toggle icon */}
                <div className="sm:hidden ml-2 mr-2">
                    {isOpen ? (
                        <MdClose
                            className="text-primary dark:text-white text-3xl"
                            onClick={handleToggleMenu}
                        />
                    ) : (
                        <MdMenuOpen
                            className="text-primary dark:text-white text-3xl"
                            onClick={handleToggleMenu}
                        />
                    )}
                </div>

                {/* Navlinks mobile */}
                <div
                    className={`${
                        isOpen ? "flex" : "hidden"
                    } absolute top-12 left-0 w-full flex-col sm:hidden bg-white dark:bg-primary shadow-sm shadow-primary mt-0 pt-4 pb-2 items-center `}
                >
                    <div
                        ref={menuRef}
                        className="flex flex-col gap-2 text-primary dark:text-white w-[95%] bg-slate-50 dark:bg-[#11202c] py-2  items-center rounded-xl"
                    >
                        <Link
                            onClick={() => {
                                setIsOpen(false);
                            }}
                            href="/"
                            className={`navlinks ${pathname === "/" ? "active" : ""}`}
                        >
                            Home
                        </Link>
                        <Link
                            onClick={() => {
                                setIsOpen(false);
                            }}
                            href="/classes"
                            className={`navlinks ${pathname === "/classes" ? "active" : ""}`}
                        >
                            Classes
                        </Link>
                        <Link
                            onClick={() => {
                                setIsOpen(false);
                            }}
                            href="/portfolio"
                            className={`navlinks ${pathname === "/portfolio" ? "active" : ""}`}
                        >
                            Portfolio
                        </Link>
                        <Link
                            onClick={() => {
                                setIsOpen(false);
                            }}
                            href="/contact"
                            className={`navlinks ${pathname === "/contact" ? "active" : ""}`}
                        >
                            Contact
                        </Link>
                    </div>
                </div>

                <div className={`border-l border-l-gray-900 dark:border-l-white pl-4`}><ThemeSwitch /></div>
            </div>
        </nav>
    );
}

export default Navbar;