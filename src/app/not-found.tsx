"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Compass, Sparkles } from "lucide-react";
import { LandingNav } from "@/components/landing/nav";
import { MeshBackground } from "@/components/landing/mesh-background";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="relative min-h-screen text-foreground">
      <MeshBackground />
      <LandingNav />
      <main className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-28 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex w-full max-w-3xl flex-col items-center text-center"
        >
          <Badge
            variant="secondary"
            className="rounded-full border border-border/80 bg-muted/40 px-3 py-1 text-xs font-medium backdrop-blur-sm"
          >
            <Sparkles className="mr-1 size-3" aria-hidden />
            Lost in the loop
          </Badge>

          <NotFoundArt />

          <h1 className="mt-2 font-heading text-5xl font-semibold tracking-tight text-balance md:text-6xl">
            This page took a wrong turn.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
            The URL you followed doesn&apos;t match anything we&apos;ve shipped.
            It may have moved, been renamed, or never existed in the first
            place.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 rounded-full px-7 text-sm"
              )}
            >
              <ArrowLeft className="mr-1 size-4" aria-hidden />
              Back home
            </Link>
            <Link
              href="/blog"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 rounded-full border-border/80 bg-background/40 px-7 text-sm backdrop-blur-sm"
              )}
            >
              <Compass className="mr-1 size-4" aria-hidden />
              Read the blog
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

function NotFoundArt() {
  return (
    <div className="relative my-10 w-full max-w-md">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.35), rgba(34,211,238,0.18) 45%, transparent 70%)",
        }}
      />
      <svg
        viewBox="0 0 400 220"
        className="h-auto w-full"
        role="img"
        aria-label="404 illustration"
      >
        <defs>
          <linearGradient id="nf-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        <motion.g
          style={{ transformOrigin: "200px 110px" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          <ellipse
            cx="200"
            cy="110"
            rx="170"
            ry="50"
            fill="none"
            stroke="url(#nf-grad)"
            strokeOpacity="0.45"
            strokeWidth="1.2"
          />
          <circle cx="370" cy="110" r="4" fill="url(#nf-grad)" />
        </motion.g>
        <motion.g
          style={{ transformOrigin: "200px 110px" }}
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <ellipse
            cx="200"
            cy="110"
            rx="130"
            ry="80"
            fill="none"
            stroke="url(#nf-grad)"
            strokeOpacity="0.3"
            strokeWidth="1"
          />
          <circle cx="70" cy="110" r="3" fill="url(#nf-grad)" />
        </motion.g>

        <motion.text
          x="200"
          y="150"
          textAnchor="middle"
          className="font-heading"
          fontSize="140"
          fontWeight="700"
          fill="url(#nf-grad)"
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        >
          404
        </motion.text>
      </svg>
    </div>
  );
}
