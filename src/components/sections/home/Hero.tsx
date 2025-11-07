'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Shield, Globe, Rocket, Users, TrendingUp } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Container, Engine } from 'tsparticles-engine';
import { ReactTyped } from 'react-typed';
import Countdown from 'react-countdown';
import { Link } from 'react-scroll';

type BackgroundPattern = 'dots' | 'grid' | 'gradient';

const DEFAULT_HERO = {
  badge: '🚀 TechFlow 2.0 launching soon',
  title: 'Build the future of',
  titleHighlight: 'digital innovation',
  typedWords: ['startups', 'SaaS platforms', 'mobile apps', 'AI solutions', 'web experiences'],
  subtitle:
    'The complete platform for modern tech teams to design, build, and scale exceptional digital products with cutting-edge tools and AI-powered insights.',
  primaryCTA: 'Start Free Trial',
  secondaryCTA: 'Watch Demo',
  primaryCTAHref: '/signup',
  secondaryCTAHref: '/demo',
  feature1Icon: 'rocket',
  feature1Text: 'AI-powered development',
  feature2Icon: 'shield',
  feature2Text: 'Enterprise security',
  feature3Icon: 'trendingUp',
  feature3Text: 'Scale globally',
  trustedByText: 'Trusted by 50,000+ developers worldwide',
  showTrustedLogos: true,
  backgroundPattern: 'dots' as BackgroundPattern,
  showAnimatedBadge: true,
  launchDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
  showCountdown: true,
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();
  const heroRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    mouseX.set(x * 0.1);
    mouseY.set(y * 0.1);
  };

  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine);
  };

  const particlesLoaded = async (container?: Container) => {
    console.log(container);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'zap':
        return Zap;
      case 'shield':
        return Shield;
      case 'globe':
        return Globe;
      case 'rocket':
        return Rocket;
      case 'users':
        return Users;
      case 'trendingUp':
        return TrendingUp;
      default:
        return Sparkles;
    }
  };

  const Feature1Icon = getIcon(config.feature1Icon);
  const Feature2Icon = getIcon(config.feature2Icon);
  const Feature3Icon = getIcon(config.feature3Icon);

  const countdownRenderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      return <span className="text-primary font-bold">🎉 Launched!</span>;
    } else {
      return (
        <div className="flex items-center gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{days}</div>
            <div className="text-muted-foreground">days</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{hours}</div>
            <div className="text-muted-foreground">hours</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{minutes}</div>
            <div className="text-muted-foreground">min</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{seconds}</div>
            <div className="text-muted-foreground">sec</div>
          </div>
        </div>
      );
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen overflow-hidden bg-background"
      onMouseMove={handleMouseMove}
    >
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: 'transparent',
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: 'push',
              },
              onHover: {
                enable: true,
                mode: 'repulse',
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: 'hsl(var(--primary))',
            },
            links: {
              color: 'hsl(var(--primary))',
              distance: 150,
              enable: true,
              opacity: 0.1,
              width: 1,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce',
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.2,
            },
            shape: {
              type: 'circle',
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0"
      />

      {/* Background Pattern */}
      {config.backgroundPattern === 'dots' && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_0.5px,transparent_0.5px)] [background-size:16px_16px] opacity-[0.03]" />
      )}
      {config.backgroundPattern === 'grid' && (
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:64px_64px]" />
      )}
      {config.backgroundPattern === 'gradient' && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.05]" />
      )}

      {/* Floating gradient orbs with parallax */}
      <motion.div
        className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/[0.03] blur-3xl"
        style={{ y, x: springX, y: springY }}
      />
      <motion.div
        className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-accent/[0.03] blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '-30%']) }}
      />

      <motion.div
        className="container relative mx-auto px-4 sm:px-6 lg:px-8 z-10"
        style={{ opacity }}
      >
        <div className="flex min-h-screen flex-col items-center justify-center py-20 text-center">
          {/* Animated Badge */}
          {config.showAnimatedBadge && (
            <motion.div
              className="mb-8 inline-flex"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="flex items-center gap-2 rounded-full border border-border bg-background/50 backdrop-blur-sm px-4 py-2 text-sm"
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(var(--primary-rgb), 0)',
                    '0 0 0 10px rgba(var(--primary-rgb), 0.1)',
                    '0 0 0 0 rgba(var(--primary-rgb), 0)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="h-4 w-4 text-primary" />
                </motion.div>
                <span data-editable="badge" className="text-muted-foreground">
                  {config.badge}
                </span>
              </motion.div>
            </motion.div>
          )}

          {/* Main Title with Typed Effect */}
          <motion.h1
            className="max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              data-editable="title"
              className="text-foreground block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {config.title}
            </motion.span>
            <motion.span
              className="relative ml-3 block mt-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <span
                data-editable="titleHighlight"
                className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent"
              >
                <ReactTyped
                  strings={config.typedWords}
                  typeSpeed={100}
                  backSpeed={50}
                  backDelay={2000}
                  loop
                  showCursor={true}
                  cursorChar="|"
                />
              </span>
              <motion.svg
                className="absolute -right-2 -top-2 h-6 w-6 text-primary/60"
                fill="currentColor"
                viewBox="0 0 24 24"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </motion.svg>
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            data-editable="subtitle"
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {config.subtitle}
          </motion.p>

          {/* Countdown Timer */}
          {config.showCountdown && (
            <motion.div
              className="mt-8 p-6 rounded-2xl border border-border bg-background/50 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <div className="text-sm text-muted-foreground mb-2">TechFlow 2.0 launches in:</div>
              <Countdown date={config.launchDate} renderer={countdownRenderer} />
            </motion.div>
          )}

          {/* Feature Pills */}
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            {[
              { icon: Feature1Icon, text: config.feature1Text, key: 'feature1Text' },
              { icon: Feature2Icon, text: config.feature2Text, key: 'feature2Text' },
              { icon: Feature3Icon, text: config.feature3Text, key: 'feature3Text' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 rounded-full border border-border bg-background/50 backdrop-blur-sm px-4 py-2 text-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                style={{ x: springX, y: springY }}
              >
                <feature.icon className="h-4 w-4 text-primary" />
                <span data-editable={feature.key} className="text-muted-foreground">
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="group px-8 text-base font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                onClick={() => navigate(config.primaryCTAHref)}
                data-editable-href="primaryCTAHref"
                data-href={config.primaryCTAHref}
              >
                <span data-editable="primaryCTA">{config.primaryCTA}</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-border/50 backdrop-blur-sm text-base font-medium hover:bg-background/50 transition-all"
                onClick={() => navigate(config.secondaryCTAHref)}
                data-editable-href="secondaryCTAHref"
                data-href={config.secondaryCTAHref}
              >
                <span data-editable="secondaryCTA">{config.secondaryCTA}</span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Trusted By Section */}
          {config.showTrustedLogos && (
            <motion.div
              className="mt-20 w-full max-w-4xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              <p data-editable="trustedByText" className="mb-6 text-sm text-muted-foreground">
                {config.trustedByText}
              </p>
              <motion.div
                className="flex flex-wrap items-center justify-center gap-8 opacity-50 grayscale"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, delay: 1.8 }}
              >
                {/* Placeholder for logos - in production these would be actual logos */}
                {[1, 2, 3, 4, 5].map(i => (
                  <motion.div
                    key={i}
                    className="h-8 w-24 rounded bg-muted-foreground/10"
                    whileHover={{ scale: 1.1, opacity: 0.8 }}
                    transition={{ duration: 0.2 }}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.0 }}
          >
            <Link to="features" smooth={true} duration={500} className="cursor-pointer">
              <motion.div
                className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <motion.div
                  className="w-1 h-3 bg-primary rounded-full mt-2"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
