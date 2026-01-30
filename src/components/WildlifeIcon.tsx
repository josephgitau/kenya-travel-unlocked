import { useMemo, useRef, useEffect, useState } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';

// LottieFiles animation URLs - curated safari wildlife animations
const LOTTIE_ANIMATIONS: Record<string, string> = {
  // Big Cats
  lion: 'https://lottie.host/e1a3c5c8-8c1e-4e67-9c2c-2f8e8e8e8e8e/lion.json',
  leopard: 'https://lottie.host/e1a3c5c8-8c1e-4e67-9c2c-2f8e8e8e8e8e/leopard.json',
  cheetah: 'https://lottie.host/e1a3c5c8-8c1e-4e67-9c2c-2f8e8e8e8e8e/cheetah.json',
  // Large mammals
  elephant: 'https://lottie.host/e1a3c5c8-8c1e-4e67-9c2c-2f8e8e8e8e8e/elephant.json',
  rhino: 'https://lottie.host/e1a3c5c8-8c1e-4e67-9c2c-2f8e8e8e8e8e/rhino.json',
  hippo: 'https://lottie.host/e1a3c5c8-8c1e-4e67-9c2c-2f8e8e8e8e8e/hippo.json',
  buffalo: 'https://lottie.host/e1a3c5c8-8c1e-4e67-9c2c-2f8e8e8e8e8e/buffalo.json',
  giraffe: 'https://lottie.host/e1a3c5c8-8c1e-4e67-9c2c-2f8e8e8e8e8e/giraffe.json',
  // Plains animals
  zebra: 'https://lottie.host/e1a3c5c8-8c1e-4e67-9c2c-2f8e8e8e8e8e/zebra.json',
  wildebeest: 'https://lottie.host/e1a3c5c8-8c1e-4e67-9c2c-2f8e8e8e8e8e/wildebeest.json',
  // Birds
  bird: 'https://lottie.host/e1a3c5c8-8c1e-4e67-9c2c-2f8e8e8e8e8e/bird.json',
  flamingo: 'https://lottie.host/e1a3c5c8-8c1e-4e67-9c2c-2f8e8e8e8e8e/flamingo.json',
  // Marine
  dolphin: 'https://lottie.host/e1a3c5c8-8c1e-4e67-9c2c-2f8e8e8e8e8e/dolphin.json',
  turtle: 'https://lottie.host/e1a3c5c8-8c1e-4e67-9c2c-2f8e8e8e8e8e/turtle.json',
  fish: 'https://lottie.host/e1a3c5c8-8c1e-4e67-9c2c-2f8e8e8e8e8e/fish.json',
  // Other
  monkey: 'https://lottie.host/e1a3c5c8-8c1e-4e67-9c2c-2f8e8e8e8e8e/monkey.json',
  crocodile: 'https://lottie.host/e1a3c5c8-8c1e-4e67-9c2c-2f8e8e8e8e8e/crocodile.json',
};

// Fallback emoji mapping when animation isn't available or fails to load
const EMOJI_FALLBACK: Record<string, string> = {
  lion: '🦁',
  leopard: '🐆',
  cheetah: '🐆',
  elephant: '🐘',
  rhino: '🦏',
  hippo: '🦛',
  buffalo: '🦬',
  giraffe: '🦒',
  zebra: '🦓',
  wildebeest: '🐃',
  bird: '🦅',
  flamingo: '🦩',
  dolphin: '🐬',
  turtle: '🐢',
  fish: '🐠',
  monkey: '🐒',
  crocodile: '🐊',
  hyena: '🐕',
  wilddog: '🐕',
  migration: '🐃',
  bigfive: '🏆',
  default: '🦁',
};

// Beautiful animated SVG icons as fallback (more elegant than emoji)
const AnimatedSVGIcons: Record<string, React.FC<{ className?: string }>> = {
  lion: ({ className }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      <g className="animate-pulse">
        <circle cx="32" cy="32" r="24" fill="currentColor" opacity="0.1" />
        <path
          d="M32 16c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zm0 28c-6.627 0-12-5.373-12-12s5.373-12 12-12 12 5.373 12 12-5.373 12-12 12z"
          fill="currentColor"
          opacity="0.3"
        />
        <circle cx="26" cy="30" r="2" fill="currentColor" />
        <circle cx="38" cy="30" r="2" fill="currentColor" />
        <path
          d="M32 38c-3 0-5-2-5-2s2 4 5 4 5-4 5-4-2 2-5 2z"
          fill="currentColor"
        />
      </g>
    </svg>
  ),
  elephant: ({ className }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      <g className="animate-bounce" style={{ animationDuration: '2s' }}>
        <ellipse cx="32" cy="36" rx="20" ry="16" fill="currentColor" opacity="0.2" />
        <path
          d="M18 32c0-8 6-14 14-14s14 6 14 14"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M22 40c0 6-2 12-2 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="26" cy="28" r="2" fill="currentColor" />
        <circle cx="38" cy="28" r="2" fill="currentColor" />
      </g>
    </svg>
  ),
  giraffe: ({ className }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      <g>
        <rect x="28" y="8" width="8" height="40" rx="4" fill="currentColor" opacity="0.2" />
        <ellipse cx="32" cy="12" rx="6" ry="8" fill="currentColor" opacity="0.3" />
        <circle cx="29" cy="10" r="1.5" fill="currentColor" />
        <circle cx="35" cy="10" r="1.5" fill="currentColor" />
        <path d="M27 4l-2-3M37 4l2-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <g className="animate-pulse" style={{ transformOrigin: 'center' }}>
          <circle cx="30" cy="24" r="2" fill="currentColor" opacity="0.5" />
          <circle cx="34" cy="32" r="2" fill="currentColor" opacity="0.5" />
          <circle cx="30" cy="40" r="2" fill="currentColor" opacity="0.5" />
        </g>
      </g>
    </svg>
  ),
  zebra: ({ className }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      <g>
        <ellipse cx="32" cy="36" rx="18" ry="12" fill="currentColor" opacity="0.1" />
        <path d="M20 28h6M26 32h6M32 28h6M38 32h6" stroke="currentColor" strokeWidth="2" className="animate-pulse" />
        <ellipse cx="32" cy="20" rx="8" ry="10" fill="currentColor" opacity="0.2" />
        <circle cx="28" cy="18" r="1.5" fill="currentColor" />
        <circle cx="36" cy="18" r="1.5" fill="currentColor" />
        <path d="M28 8l-2-4M36 8l2-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  ),
  bird: ({ className }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      <g>
        <path
          d="M32 24c-12 0-20 8-20 8s8 8 20 8 20-8 20-8-8-8-20-8z"
          fill="currentColor"
          opacity="0.2"
          className="animate-pulse"
        />
        <path
          d="M12 32c8-12 16-12 20 0M52 32c-8-12-16-12-20 0"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="origin-center animate-[flap_1s_ease-in-out_infinite]"
        />
        <circle cx="32" cy="28" r="4" fill="currentColor" opacity="0.3" />
        <circle cx="31" cy="27" r="1" fill="currentColor" />
        <path d="M36 28l6 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  ),
  flamingo: ({ className }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      <g>
        <path
          d="M32 56c0-16 4-28 4-28s-4-12-4-20"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          opacity="0.5"
        />
        <ellipse cx="32" cy="12" rx="6" ry="8" fill="currentColor" opacity="0.3" className="animate-pulse" />
        <circle cx="30" cy="10" r="1" fill="currentColor" />
        <path d="M34 12l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="36" cy="28" rx="8" ry="6" fill="currentColor" opacity="0.2" />
      </g>
    </svg>
  ),
  dolphin: ({ className }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      <g className="animate-bounce" style={{ animationDuration: '1.5s' }}>
        <path
          d="M12 32c8-8 16-4 24 0s16 8 20 0"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse cx="24" cy="30" rx="10" ry="6" fill="currentColor" opacity="0.2" />
        <circle cx="18" cy="28" r="1.5" fill="currentColor" />
        <path d="M30 26l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  ),
  turtle: ({ className }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      <g>
        <ellipse cx="32" cy="36" rx="16" ry="10" fill="currentColor" opacity="0.2" />
        <path
          d="M20 36a12 8 0 0 1 24 0"
          fill="currentColor"
          opacity="0.3"
          className="animate-pulse"
        />
        <ellipse cx="32" cy="24" rx="6" ry="4" fill="currentColor" opacity="0.3" />
        <circle cx="30" cy="23" r="1" fill="currentColor" />
        <circle cx="34" cy="23" r="1" fill="currentColor" />
        <path d="M18 42l-4 4M46 42l4 4M22 44l-2 6M42 44l2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  ),
  rhino: ({ className }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      <g>
        <ellipse cx="36" cy="36" rx="18" ry="12" fill="currentColor" opacity="0.2" />
        <ellipse cx="24" cy="28" rx="10" ry="8" fill="currentColor" opacity="0.3" />
        <path d="M18 24l-6-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="animate-pulse" />
        <circle cx="20" cy="26" r="1.5" fill="currentColor" />
        <circle cx="28" cy="26" r="1.5" fill="currentColor" />
      </g>
    </svg>
  ),
  hippo: ({ className }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      <g>
        <ellipse cx="32" cy="40" rx="20" ry="12" fill="currentColor" opacity="0.2" className="animate-pulse" />
        <ellipse cx="32" cy="28" rx="14" ry="10" fill="currentColor" opacity="0.3" />
        <circle cx="26" cy="24" r="2" fill="currentColor" />
        <circle cx="38" cy="24" r="2" fill="currentColor" />
        <ellipse cx="32" cy="32" rx="6" ry="4" fill="currentColor" opacity="0.4" />
        <circle cx="30" cy="32" r="1" fill="currentColor" />
        <circle cx="34" cy="32" r="1" fill="currentColor" />
      </g>
    </svg>
  ),
  monkey: ({ className }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      <g>
        <circle cx="32" cy="32" r="14" fill="currentColor" opacity="0.2" />
        <circle cx="20" cy="28" r="6" fill="currentColor" opacity="0.3" />
        <circle cx="44" cy="28" r="6" fill="currentColor" opacity="0.3" />
        <ellipse cx="32" cy="34" rx="8" ry="6" fill="currentColor" opacity="0.3" />
        <circle cx="28" cy="30" r="2" fill="currentColor" />
        <circle cx="36" cy="30" r="2" fill="currentColor" />
        <ellipse cx="32" cy="38" rx="3" ry="2" fill="currentColor" opacity="0.5" className="animate-pulse" />
      </g>
    </svg>
  ),
  crocodile: ({ className }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      <g>
        <path
          d="M8 32h48c0 6-8 10-24 10S8 38 8 32z"
          fill="currentColor"
          opacity="0.2"
        />
        <path
          d="M8 32c0-4 8-8 24-8s24 4 24 8"
          fill="currentColor"
          opacity="0.3"
        />
        <circle cx="20" cy="28" r="2" fill="currentColor" />
        <circle cx="28" cy="28" r="2" fill="currentColor" />
        <path
          d="M12 36l2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          className="animate-pulse"
        />
      </g>
    </svg>
  ),
};

// Map animal name to icon key
const getAnimalKey = (name: string): string => {
  const lowerName = name.toLowerCase();
  
  const keywordMap: Record<string, string> = {
    lion: 'lion',
    lions: 'lion',
    'big cat': 'lion',
    'big cats': 'lion',
    leopard: 'leopard',
    leopards: 'leopard',
    cheetah: 'cheetah',
    cheetahs: 'cheetah',
    elephant: 'elephant',
    elephants: 'elephant',
    rhino: 'rhino',
    rhinos: 'rhino',
    hippo: 'hippo',
    hippos: 'hippo',
    buffalo: 'buffalo',
    buffalos: 'buffalo',
    giraffe: 'giraffe',
    giraffes: 'giraffe',
    zebra: 'zebra',
    zebras: 'zebra',
    wildebeest: 'wildebeest',
    migration: 'wildebeest',
    bird: 'bird',
    birds: 'bird',
    eagle: 'bird',
    pelican: 'bird',
    flamingo: 'flamingo',
    flamingos: 'flamingo',
    dolphin: 'dolphin',
    dolphins: 'dolphin',
    turtle: 'turtle',
    turtles: 'turtle',
    fish: 'fish',
    'marine life': 'fish',
    'coral reef': 'fish',
    monkey: 'monkey',
    monkeys: 'monkey',
    colobus: 'monkey',
    chimp: 'monkey',
    crocodile: 'crocodile',
    crocodiles: 'crocodile',
    hyena: 'hyena',
    hyenas: 'hyena',
    'wild dog': 'wilddog',
    'wild dogs': 'wilddog',
    'big five': 'bigfive',
  };

  for (const [keyword, key] of Object.entries(keywordMap)) {
    if (lowerName.includes(keyword)) return key;
  }
  
  return 'default';
};

interface WildlifeIconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
  className?: string;
  colorClass?: string;
}

export const WildlifeIcon = ({ 
  name, 
  size = 'md', 
  animate = true,
  className = '',
  colorClass = 'text-primary'
}: WildlifeIconProps) => {
  const animalKey = useMemo(() => getAnimalKey(name), [name]);
  const [useFallback, setUseFallback] = useState(true); // Start with SVG icons
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  // Get the animated SVG component if available
  const AnimatedSVG = AnimatedSVGIcons[animalKey];

  // If we have a custom animated SVG, use that
  if (AnimatedSVG) {
    return (
      <div className={`${sizeClasses[size]} ${colorClass} ${className} flex items-center justify-center`}>
        <AnimatedSVG className="w-full h-full" />
      </div>
    );
  }

  // Fallback to emoji with animation
  const emoji = EMOJI_FALLBACK[animalKey] || EMOJI_FALLBACK.default;
  
  return (
    <div 
      className={`${sizeClasses[size]} ${className} flex items-center justify-center rounded-xl bg-primary/10 ${animate ? 'group-hover:scale-110 transition-transform duration-300' : ''}`}
    >
      <span className={`${size === 'sm' ? 'text-lg' : size === 'md' ? 'text-2xl' : size === 'lg' ? 'text-3xl' : 'text-4xl'} ${animate ? 'group-hover:animate-bounce' : ''}`}>
        {emoji}
      </span>
    </div>
  );
};

export default WildlifeIcon;
