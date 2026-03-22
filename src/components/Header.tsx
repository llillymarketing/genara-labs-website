"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Search, FlaskConical, User, ShoppingCart } from "lucide-react";
import { useCart } from "@/components/CartDrawer";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/calculator", label: "Calculator" },
  { href: "/affiliates", label: "Affiliates" },
  { href: "/contact", label: "Contact" },
];

const compounds = [
  { name: "BPC-157", variant: "5mg" },
  { name: "TB-500", variant: "5mg" },
  { name: "PT-141", variant: "10mg" },
  { name: "Melanotan II", variant: "10mg" },
  { name: "CJC-1295", variant: "2mg" },
  { name: "Ipamorelin", variant: "5mg" },
  { name: "Sermorelin", variant: "2mg" },
  { name: "GHK-Cu", variant: "50mg" },
  { name: "Thymosin Alpha-1", variant: "5mg" },
  { name: "Selank", variant: "5mg" },
  { name: "Semax", variant: "5mg" },
  { name: "DSIP", variant: "5mg" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const { openCart, totalItems } = useCart();

  const filtered =
    query.length > 0
      ? compounds.filter((c) =>
          c.name.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  // Scroll listener for header state change
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
      setQuery("");
    }
  }, [searchOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    if (searchOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, []);

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-lg border-b border-silver/40"
            : "bg-white/80 backdrop-blur-md border-b border-silver/20"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[88px]">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0" onClick={closeAll}>
            <Image
              src="/genara-logo-transparent.png"
              alt="Genara Labs"
              width={320}
              height={80}
              className="h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav links — centered */}
          <div className="hidden md:flex items-center gap-1 ml-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-graphite hover:text-royal hover:bg-mist transition-colors font-medium text-[15px] font-display"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Search with inline dropdown */}
            <div className="relative" ref={searchContainerRef}>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="relative flex items-center justify-center size-9 rounded-lg border border-silver/60 bg-white hover:bg-mist transition-colors cursor-pointer xl:h-9 xl:w-56 xl:justify-between xl:px-3 xl:py-2"
              >
                <span className="hidden xl:inline-flex text-sm text-slate">
                  Search compounds...
                </span>
                <span className="sr-only">Search</span>
                <Search className="size-4 text-slate xl:hidden" />
                <div className="hidden xl:flex items-center gap-1">
                  <kbd className="inline-flex items-center rounded border border-silver/60 bg-mist px-1.5 py-0.5 text-[10px] text-slate font-mono">
                    ⌘K
                  </kbd>
                  <Search className="size-3.5 text-slate" />
                </div>
              </button>

              {/* Dropdown */}
              {searchOpen && (
                <div className="absolute right-0 xl:left-0 top-full mt-2 w-80 bg-white rounded-xl border border-silver/60 overflow-hidden z-[60]">
                  <div className="flex items-center border-b border-silver/40 px-3">
                    <Search className="size-4 text-slate shrink-0" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search compounds..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="flex-1 h-11 bg-transparent px-3 text-[16px] text-graphite placeholder:text-slate outline-none"
                    />
                  </div>
                  <div className="max-h-[280px] overflow-y-auto">
                    {query.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <FlaskConical className="size-6 text-silver mb-2" />
                        <p className="text-xs text-slate">
                          Search by compound name
                        </p>
                      </div>
                    ) : filtered.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <p className="text-sm text-slate">
                          No results for &ldquo;{query}&rdquo;
                        </p>
                      </div>
                    ) : (
                      <div className="p-1.5">
                        {filtered.map((compound) => (
                          <Link
                            key={compound.name}
                            href={`/shop/${compound.name.toLowerCase().replace(/\s+/g, "-")}`}
                            onClick={() => { setSearchOpen(false); setQuery(""); }}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-mist transition-colors"
                          >
                            <FlaskConical className="size-4 text-royal shrink-0" />
                            <div className="flex flex-col min-w-0">
                              <span className="text-sm font-medium text-navy truncate">
                                {compound.name}
                              </span>
                              <span className="text-xs text-slate">
                                {compound.variant}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Account */}
            <Link
              href="/account"
              className="flex items-center gap-1.5 size-9 md:w-auto md:h-9 md:px-3 justify-center rounded-lg border border-silver/60 bg-white hover:bg-mist transition-colors text-graphite hover:text-royal"
              title="My Account"
            >
              <User className="size-4 shrink-0" />
              <span className="hidden md:inline text-sm font-medium">Account</span>
            </Link>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative flex items-center justify-center size-9 rounded-lg border border-silver/60 bg-white hover:bg-mist transition-colors text-graphite hover:text-royal cursor-pointer"
              aria-label="Cart"
            >
              <ShoppingCart className="size-4" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center size-[18px] rounded-full bg-royal text-white text-[10px] font-semibold leading-none">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Browse Peptides CTA */}
            <Link
              href="/shop"
              className="hidden md:inline-flex bg-royal text-white px-5 py-2.5 rounded-lg text-[15px] font-semibold hover:bg-deep-blue transition-colors ml-1"
            >
              Shop Peptides
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-graphite rounded-lg hover:bg-mist transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* ── Search dropdown (inline, anchored to search button) ── */}

      {/* ── Mobile slide-in menu ── */}
      {menuOpen && (
        <div className="fixed inset-0 z-[55] md:hidden">
          <div
            className="absolute inset-0 bg-navy/30 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <div
            className="absolute inset-y-0 left-0 w-3/4 max-w-sm bg-white border-r border-silver/40 flex flex-col"
            style={{ animation: "slideInLeft 0.3s ease-out" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 h-[88px] border-b border-silver/40">
              <Image
                src="/genara-logo-transparent.png"
                alt="Genara Labs"
                width={320}
                height={80}
                className="h-10 w-auto"
              />
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 text-graphite rounded-lg hover:bg-mist transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav links */}
            <div className="flex-1 overflow-y-auto px-4 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 px-3 rounded-lg text-graphite hover:text-royal hover:bg-mist font-medium text-[16px] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Footer: Account, Sign In, Cart, CTA */}
            <div className="p-4 border-t border-silver/40 space-y-2">
              <Link
                href="/account"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 py-3 px-3 rounded-lg text-graphite hover:text-royal hover:bg-mist font-medium text-[16px] transition-colors"
              >
                <User className="size-5" />
                My Account
              </Link>
              <Link
                href="/sign-in"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 py-3 px-3 rounded-lg text-graphite hover:text-royal hover:bg-mist font-medium text-[16px] transition-colors"
              >
                <User className="size-5" />
                Sign In
              </Link>
              <button
                onClick={() => { setMenuOpen(false); openCart(); }}
                className="flex items-center gap-3 w-full py-3 px-3 rounded-lg text-graphite hover:text-royal hover:bg-mist font-medium text-[16px] transition-colors text-left cursor-pointer"
              >
                <ShoppingCart className="size-5" />
                Cart
                {totalItems > 0 && (
                  <span className="ml-auto flex items-center justify-center size-5 rounded-full bg-royal text-white text-[11px] font-semibold leading-none">
                    {totalItems}
                  </span>
                )}
              </button>
              <Link
                href="/shop"
                onClick={() => setMenuOpen(false)}
                className="block bg-royal text-white px-5 py-3 rounded-lg text-center font-semibold hover:bg-deep-blue transition-colors text-[16px] mt-2"
              >
                Shop Peptides
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
