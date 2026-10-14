"use client"

import Link from "next/link"
import { Menu, Home } from "lucide-react"
import { usePathname } from "next/navigation"
import React, { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from "@/components/logo"
import { FullScreenToggle } from "./fullscreen-toggle"

const navItems = [
  { name: "ARCHIVE", href: "#archive" },
  { name: "NARRATIVES", href: "/narratives" },
  { name: "THOUGHTS", href: "/thoughts" },
];

const mobileNavItems = [
  { name: "HOME", href: "/" },
  ...navItems,
];


export function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const { scrollY } = useScroll();

  const headerHeight = useTransform(scrollY, [0, 100], ["5rem", "4rem"]);
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(26, 26, 26, 0)", "rgba(10, 10, 10, 0.95)"]
  );
  const headerBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(20px)"]);
  const headerBorder = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.1)"]
  );

  const getHref = (href: string) => {
    if (href === '/') return '/';
    // If we are not on the home page, and it's a hash link, prepend the root path.
    if (!isHomePage && href.startsWith('#')) {
        return `/${href}`;
    }
    return href;
  }

  const NavLinks = () => (
    <nav className={cn("flex items-center gap-2")}>
      {navItems.map((item, index) => (
        <React.Fragment key={item.name}>
          <Button
            variant="ghost"
            asChild
            className={cn(
              "tracking-widest uppercase text-xs hover:bg-transparent transition-colors duration-300",
              "font-medium subpixel-antialiased",
              pathname === getHref(item.href) ? "underline underline-offset-4" : "hover:underline hover:opacity-80"
            )}
          >
            <Link href={getHref(item.href)}>{item.name}</Link>
          </Button>
          {index < navItems.length - 1 && <span className="opacity-50">|</span>}
        </React.Fragment>
      ))}
    </nav>
  );

  return (
    <motion.header 
      style={{ 
        height: headerHeight,
        backgroundColor: headerBg,
        backdropFilter: headerBlur,
        WebkitBackdropFilter: headerBlur,
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: headerBorder
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "fixed top-0 z-50 w-full transition-colors duration-300 text-primary"
      )}
    >
      <div className="container mx-auto flex h-full items-center justify-between px-4 md:px-6 relative">
        {/* Left Side: Logo and Name Separated */}
        <div className="flex items-center gap-6">
          <Link href="/" className="group flex items-center gap-4">
            <Logo />
            <span className="font-headline text-xl font-bold tracking-tight text-white/90 transition-all duration-300 group-hover:text-white">
              El Artsy Lens
            </span>
          </Link>
        </div>
        
        {/* Centered Nav */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <NavLinks />
        </div>

        {/* Right Side & Mobile Menu */}
        <div className="flex items-center gap-2">
            <FullScreenToggle />
            <Button variant="ghost" size="icon" asChild className="hidden lg:inline-flex">
              <Link href="/">
                <Home className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </Link>
            </Button>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="lg:hidden">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <div className="flex flex-col items-start gap-4 p-8">
                        {mobileNavItems.map((item) => (
                            <Link key={item.name} href={getHref(item.href)} className="text-lg font-medium">{item.name}</Link>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
