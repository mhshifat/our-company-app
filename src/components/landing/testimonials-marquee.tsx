"use client";

import { useEffect, useState } from "react";
import { Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

import { TESTIMONIALS } from "@/lib/site";
import { cn } from "@/lib/utils";

/** ms to transition one slide; higher = slower drift (readable quotes). */
const SWIPER_TRANSITION_MS = 14_000;

function TestimonialCard({
  quote,
  name,
  role,
  org,
}: {
  quote: string;
  name: string;
  role: string;
  org: string;
}) {
  return (
    <article
      className={cn(
        "h-full w-[min(calc(100vw-3rem),22rem)] rounded-2xl border border-border/50 bg-card/60 p-6 shadow-sm backdrop-blur-sm",
        "md:w-[26rem] md:p-7"
      )}
    >
      <Quote
        className="size-8 text-cyan-400/50"
        strokeWidth={1.25}
        aria-hidden
      />
      <blockquote className="mt-4 text-sm leading-relaxed text-foreground md:text-[0.9375rem]">
        <p>&ldquo;{quote}&rdquo;</p>
      </blockquote>
      <footer className="mt-5 border-t border-border/40 pt-4">
        <p className="font-medium text-foreground">{name}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {role} · {org}
        </p>
      </footer>
    </article>
  );
}

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return reduce;
}

export function TestimonialsMarquee() {
  const reduceMotion = usePrefersReducedMotion();

  const slides = [0, 1, 2].flatMap((round) =>
    TESTIMONIALS.map((t) => ({ ...t, slideKey: `${t.id}-${round}` }))
  );

  const onSwiper = (swiper: SwiperType) => {
    if (reduceMotion) swiper.autoplay?.stop();
    else swiper.autoplay?.start();
  };

  return (
    <section
      id="testimonials"
      aria-label="Client testimonials"
      className="border-y border-border/40 bg-muted/15 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="text-sm font-medium tracking-wide text-cyan-300/90 uppercase">
          Testimonials
        </p>
        <h2 className="mt-3 max-w-2xl font-heading text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          Teams we&apos;ve shipped with.
        </h2>
        <p className="mt-4 max-w-xl text-muted-foreground leading-relaxed">
          Real feedback from product and engineering leaders—one continuous
          glide, like a film strip, never stopping.
        </p>
      </div>

      <div className="relative mt-12 md:mt-16">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r from-background md:w-24"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-gradient-to-l from-background md:w-24"
          aria-hidden
        />

        <div className="overflow-hidden pl-5 md:pl-6">
          <Swiper
            className="testimonials-swiper !overflow-visible"
            modules={[Autoplay]}
            onSwiper={onSwiper}
            loop
            loopAdditionalSlides={TESTIMONIALS.length}
            slidesPerView="auto"
            spaceBetween={20}
            speed={SWIPER_TRANSITION_MS}
            allowTouchMove
            grabCursor
            autoplay={
              reduceMotion
                ? false
                : {
                    delay: 0,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: false,
                    waitForTransition: true,
                  }
            }
            breakpoints={{
              768: { spaceBetween: 24 },
            }}
          >
            {slides.map((t) => (
              <SwiperSlide
                key={t.slideKey}
                className="!h-auto !w-[min(calc(100vw-3rem),22rem)] md:!w-[26rem]"
              >
                <TestimonialCard
                  quote={t.quote}
                  name={t.name}
                  role={t.role}
                  org={t.org}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
