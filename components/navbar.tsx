"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Database, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + "/")
      ? "text-primary border-b-2 border-primary"
      : "hover:text-primary/90 hover:border-b-2 hover:border-primary/70";
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md shadow-md"
          : "bg-black/60 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 text-white">
        {/* Logo - Left Section */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <Database className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Easyer</span>
          </Link>
        </div>

        {/* Navigation - Center Section */}
        <div className="hidden md:flex flex-1 justify-center">
          <nav className="flex items-center gap-8">
            <SignedIn>
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors py-1 ${isActive("/dashboard")}`}
              >
                Dashboard
              </Link>
              <Link
                href="/editor/new"
                className={`text-sm font-medium transition-colors py-1 ${isActive("/editor")}`}
              >
                ER Editor
              </Link>
            </SignedIn>
            <Link
              href="/#features"
              className={`text-sm font-medium transition-colors py-1 ${isActive("/#features")}`}
            >
              Features
            </Link>
            <Link
              href="/#pricing"
              className={`text-sm font-medium transition-colors py-1 ${isActive("/#pricing")}`}
            >
              Pricing
            </Link>
          </nav>
        </div>

        {/* Auth Buttons - Right Section */}
        <div className="flex items-center gap-4">
          <SignedOut>
            <div className="hidden md:flex items-center gap-2">
              <SignInButton>
                <Button
                  variant="ghost"
                  className="text-white hover:text-white hover:bg-primary/20"
                >
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Sign Up
                </Button>
              </SignUpButton>
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none p-2 rounded-md hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden py-4 px-4 bg-black/90 backdrop-blur-md border-t border-white/10">
          <div className="flex flex-col space-y-4">
            <SignedIn>
              <Link
                href="/dashboard"
                className={`text-sm font-medium p-2 rounded-md ${
                  isActive("/dashboard").includes("text-primary")
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-white/5"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/editor/new"
                className={`text-sm font-medium p-2 rounded-md ${
                  isActive("/editor").includes("text-primary")
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-white/5"
                }`}
                onClick={() => setIsOpen(false)}
              >
                ER Editor
              </Link>
            </SignedIn>
            <Link
              href="/#features"
              className="text-sm font-medium p-2 rounded-md hover:bg-white/5"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/#pricing"
              className="text-sm font-medium p-2 rounded-md hover:bg-white/5"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            <SignedOut>
              <div className="pt-4 flex flex-col space-y-2 border-t border-white/10">
                <SignInButton>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white hover:text-white hover:bg-white/10"
                  >
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button className="w-full justify-start bg-primary hover:bg-primary/90 text-white">
                    Sign Up
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>
        </div>
      )}
    </header>
  );
}
