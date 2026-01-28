import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sun, Cloud, CloudRain, Thermometer, Eye, Calendar, MapPin, 
  ChevronLeft, ChevronRight, Sparkles, Camera, TreeDeciduous,
  Bird, Waves, Mountain, Star, ArrowRight, Binoculars
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import SEO from '@/components/SEO';

interface WildlifeEvent {
  animal: string;
  event: string;
  rating: 'excellent' | 'good' | 'fair' | 'low';
  location: string;
  icon: 'lion' | 'elephant' | 'bird' | 'zebra' | 'hippo' | 'giraffe' | 'rhino' | 'cheetah' | 'leopard' | 'croc' | 'buffalo' | 'wilddog';
}

interface MonthData {
  name: string;
  shortName: string;
  weather: 'dry' | 'rainy' | 'short-rains';
  avgTemp: { high: number; low: number };
  rainfall: number;
  crowdLevel: 'low' | 'medium' | 'high' | 'peak';
  priceLevel: 'low' | 'medium' | 'high';
  wildlife: WildlifeEvent[];
  highlights: string[];
  bestFor: string[];
  migrationPhase: string;
}

const animalEmojis: Record<string, string> = {
  lion: '🦁',
  elephant: '🐘',
  bird: '🦅',
  zebra: '🦓',
  hippo: '🦛',
  giraffe: '🦒',
  rhino: '🦏',
  cheetah: '🐆',
  leopard: '🐆',
  croc: '🐊',
  buffalo: '🐃',
  wilddog: '🐕',
};

const monthsData: MonthData[] = [
  {
    name: 'January',
    shortName: 'Jan',
    weather: 'dry',
    avgTemp: { high: 30, low: 15 },
    rainfall: 45,
    crowdLevel: 'medium',
    priceLevel: 'medium',
    migrationPhase: 'Calving Season Begins',
    wildlife: [
      { animal: 'Wildebeest', event: 'Calving season begins - 8,000 babies born daily!', rating: 'excellent', location: 'Southern Serengeti', icon: 'zebra' },
      { animal: 'Lions', event: 'Prime hunting during calving chaos', rating: 'excellent', location: 'Maasai Mara', icon: 'lion' },
      { animal: 'Elephants', event: 'Large herds with newborns', rating: 'good', location: 'Amboseli', icon: 'elephant' },
      { animal: 'Flamingos', event: 'Peak pink spectacle', rating: 'excellent', location: 'Lake Nakuru', icon: 'bird' },
    ],
    highlights: ['🍼 Wildebeest calving begins', '🦁 Great predator action', '📸 Baby animals everywhere'],
    bestFor: ['Photography', 'Predator Action', 'Baby Animals'],
  },
  {
    name: 'February',
    shortName: 'Feb',
    weather: 'dry',
    avgTemp: { high: 31, low: 15 },
    rainfall: 40,
    crowdLevel: 'high',
    priceLevel: 'high',
    migrationPhase: 'Peak Calving Season',
    wildlife: [
      { animal: 'Wildebeest', event: 'PEAK CALVING - 500,000 babies in 3 weeks!', rating: 'excellent', location: 'Southern Serengeti', icon: 'zebra' },
      { animal: 'Cheetahs', event: 'Easiest hunting of the year', rating: 'excellent', location: 'Serengeti', icon: 'cheetah' },
      { animal: 'Zebras', event: 'Foaling season alongside wildebeest', rating: 'good', location: 'Maasai Mara', icon: 'zebra' },
      { animal: 'Migratory Birds', event: 'European migrants still present', rating: 'good', location: 'Lake Naivasha', icon: 'bird' },
    ],
    highlights: ['⭐ BEST month for calving', '🐆 Cheetah hunts on newborns', '📷 Once-in-a-lifetime shots'],
    bestFor: ['Calving', 'Photography', 'Big Cats'],
  },
  {
    name: 'March',
    shortName: 'Mar',
    weather: 'short-rains',
    avgTemp: { high: 29, low: 16 },
    rainfall: 100,
    crowdLevel: 'low',
    priceLevel: 'low',
    migrationPhase: 'Herds Moving North',
    wildlife: [
      { animal: 'Wildebeest', event: 'Herds begin northward trek', rating: 'good', location: 'Central Serengeti', icon: 'zebra' },
      { animal: 'Elephants', event: 'Stunning Kilimanjaro backdrops (clear mornings)', rating: 'excellent', location: 'Amboseli', icon: 'elephant' },
      { animal: 'Hippos', event: 'Very active in full pools', rating: 'good', location: 'Lake Naivasha', icon: 'hippo' },
      { animal: 'Crocodiles', event: 'Basking on riverbanks', rating: 'fair', location: 'Mara River', icon: 'croc' },
    ],
    highlights: ['🌿 Emerald green landscapes', '👥 Fewer tourists', '🦜 Peak bird watching'],
    bestFor: ['Budget Safari', 'Bird Watching', 'Photography'],
  },
  {
    name: 'April',
    shortName: 'Apr',
    weather: 'rainy',
    avgTemp: { high: 27, low: 16 },
    rainfall: 180,
    crowdLevel: 'low',
    priceLevel: 'low',
    migrationPhase: 'Long Rains - Migration Paused',
    wildlife: [
      { animal: 'Elephants', event: 'Lush grazing, relaxed behavior', rating: 'good', location: 'Samburu', icon: 'elephant' },
      { animal: 'Buffalo', event: 'Massive herds forming', rating: 'good', location: 'Maasai Mara', icon: 'buffalo' },
      { animal: 'Birds', event: '450+ species visible - birder paradise', rating: 'excellent', location: 'All parks', icon: 'bird' },
      { animal: 'Rhinos', event: 'Active grazing on fresh grass', rating: 'fair', location: 'Ol Pejeta', icon: 'rhino' },
    ],
    highlights: ['💰 Best low-season rates', '🌱 Lush scenery', '🦜 Birding paradise'],
    bestFor: ['Budget Safari', 'Bird Watching', 'Rhinos'],
  },
  {
    name: 'May',
    shortName: 'May',
    weather: 'rainy',
    avgTemp: { high: 26, low: 15 },
    rainfall: 150,
    crowdLevel: 'low',
    priceLevel: 'low',
    migrationPhase: 'Herds in Western Corridor',
    wildlife: [
      { animal: 'Wildebeest', event: 'Crossing Grumeti River', rating: 'fair', location: 'Western Serengeti', icon: 'zebra' },
      { animal: 'Leopards', event: 'Excellent sightings in dry areas', rating: 'good', location: 'Samburu', icon: 'leopard' },
      { animal: 'Giraffes', event: 'Mating season - necking battles', rating: 'good', location: 'Amboseli', icon: 'giraffe' },
      { animal: 'Wild Dogs', event: 'Denning with puppies', rating: 'fair', location: 'Laikipia', icon: 'wilddog' },
    ],
    highlights: ['⛈️ Dramatic storm skies', '💰 Lowest prices', '🐾 Growing cubs'],
    bestFor: ['Budget Safari', 'Dramatic Photos', 'Wild Dogs'],
  },
  {
    name: 'June',
    shortName: 'Jun',
    weather: 'dry',
    avgTemp: { high: 26, low: 13 },
    rainfall: 35,
    crowdLevel: 'high',
    priceLevel: 'high',
    migrationPhase: 'Approaching Mara River',
    wildlife: [
      { animal: 'Wildebeest', event: 'Massive herds gathering at Mara', rating: 'excellent', location: 'Northern Serengeti', icon: 'zebra' },
      { animal: 'Lions', event: 'Pride activity peaks', rating: 'excellent', location: 'Maasai Mara', icon: 'lion' },
      { animal: 'Elephants', event: 'River crossing behavior', rating: 'good', location: 'Samburu', icon: 'elephant' },
      { animal: 'Cheetah Cubs', event: 'Cubs learning to hunt', rating: 'good', location: 'Maasai Mara', icon: 'cheetah' },
    ],
    highlights: ['🦓 Migration masses gathering', '☀️ Perfect dry weather', '🎬 Peak season begins'],
    bestFor: ['Migration Preview', 'Big Cats', 'Photography'],
  },
  {
    name: 'July',
    shortName: 'Jul',
    weather: 'dry',
    avgTemp: { high: 25, low: 12 },
    rainfall: 15,
    crowdLevel: 'peak',
    priceLevel: 'high',
    migrationPhase: '⭐ RIVER CROSSINGS BEGIN',
    wildlife: [
      { animal: 'Wildebeest', event: '🌟 DRAMATIC RIVER CROSSINGS START!', rating: 'excellent', location: 'Mara River', icon: 'zebra' },
      { animal: 'Crocodiles', event: 'Giant crocs feast during crossings', rating: 'excellent', location: 'Mara River', icon: 'croc' },
      { animal: 'Lions', event: 'Ambush hunting at crossing points', rating: 'excellent', location: 'Maasai Mara', icon: 'lion' },
      { animal: 'Hippos', event: 'Territorial during crossing chaos', rating: 'good', location: 'Mara River', icon: 'hippo' },
    ],
    highlights: ['⭐ RIVER CROSSINGS BEGIN', '🐊 Crocodile attacks', '📸 World-famous wildlife drama'],
    bestFor: ['Great Migration', 'River Crossings', 'Wildlife Drama'],
  },
  {
    name: 'August',
    shortName: 'Aug',
    weather: 'dry',
    avgTemp: { high: 26, low: 12 },
    rainfall: 20,
    crowdLevel: 'peak',
    priceLevel: 'high',
    migrationPhase: '⭐ PEAK RIVER CROSSINGS',
    wildlife: [
      { animal: 'Wildebeest', event: '🌟 PEAK CROSSINGS - 1,000s cross daily!', rating: 'excellent', location: 'Mara River', icon: 'zebra' },
      { animal: 'Big Cats', event: 'Highest predator activity of year', rating: 'excellent', location: 'Maasai Mara', icon: 'lion' },
      { animal: 'Elephants', event: 'Clear Kilimanjaro views', rating: 'excellent', location: 'Amboseli', icon: 'elephant' },
      { animal: 'Zebras', event: '500,000 zebras with migration', rating: 'excellent', location: 'Maasai Mara', icon: 'zebra' },
    ],
    highlights: ['⭐ BEST month for crossings', '🦁 Peak predator action', '📷 Iconic photography'],
    bestFor: ['Great Migration', 'Photography', 'Big Cats'],
  },
  {
    name: 'September',
    shortName: 'Sep',
    weather: 'dry',
    avgTemp: { high: 28, low: 13 },
    rainfall: 25,
    crowdLevel: 'high',
    priceLevel: 'medium',
    migrationPhase: 'Crossings Continue',
    wildlife: [
      { animal: 'Wildebeest', event: 'Late crossings - still spectacular', rating: 'excellent', location: 'Mara River', icon: 'zebra' },
      { animal: 'Lions', event: 'Well-fed, relaxed prides', rating: 'excellent', location: 'Maasai Mara', icon: 'lion' },
      { animal: 'Leopards', event: 'Active hunting in trees', rating: 'good', location: 'Maasai Mara', icon: 'leopard' },
      { animal: 'Hyenas', event: 'Large clan gatherings', rating: 'good', location: 'Maasai Mara', icon: 'wilddog' },
    ],
    highlights: ['🦓 Migration continues', '☀️ Perfect weather', '💰 Good value shoulder'],
    bestFor: ['Migration', 'Value Safari', 'Big Cats'],
  },
  {
    name: 'October',
    shortName: 'Oct',
    weather: 'short-rains',
    avgTemp: { high: 29, low: 15 },
    rainfall: 60,
    crowdLevel: 'medium',
    priceLevel: 'medium',
    migrationPhase: 'Migration Moving South',
    wildlife: [
      { animal: 'Wildebeest', event: 'Heading back to Serengeti', rating: 'good', location: 'Northern Serengeti', icon: 'zebra' },
      { animal: 'Elephants', event: 'Large family groups gathering', rating: 'excellent', location: 'Amboseli', icon: 'elephant' },
      { animal: 'Migratory Birds', event: 'European migrants arriving', rating: 'excellent', location: 'All parks', icon: 'bird' },
      { animal: 'Flamingos', event: 'Numbers building up', rating: 'good', location: 'Lake Bogoria', icon: 'bird' },
    ],
    highlights: ['🌧️ Short rains begin', '🦜 Bird migration arrives', '🐘 Great elephant viewing'],
    bestFor: ['Bird Watching', 'Elephants', 'Value Safari'],
  },
  {
    name: 'November',
    shortName: 'Nov',
    weather: 'short-rains',
    avgTemp: { high: 28, low: 15 },
    rainfall: 120,
    crowdLevel: 'low',
    priceLevel: 'low',
    migrationPhase: 'Herds in Southern Serengeti',
    wildlife: [
      { animal: 'Wildebeest', event: 'Settled in southern plains', rating: 'good', location: 'Southern Serengeti', icon: 'zebra' },
      { animal: 'Elephants', event: 'Scattered herds', rating: 'good', location: 'Amboseli', icon: 'elephant' },
      { animal: 'Rhinos', event: 'Good visibility in green bush', rating: 'good', location: 'Ol Pejeta', icon: 'rhino' },
      { animal: 'Birds', event: '🌟 PEAK migrant season', rating: 'excellent', location: 'Lake Naivasha', icon: 'bird' },
    ],
    highlights: ['🌿 Green season beauty', '👥 Fewest crowds', '🍼 Newborn season starts'],
    bestFor: ['Budget Safari', 'Bird Watching', 'Photography'],
  },
  {
    name: 'December',
    shortName: 'Dec',
    weather: 'short-rains',
    avgTemp: { high: 29, low: 15 },
    rainfall: 80,
    crowdLevel: 'high',
    priceLevel: 'high',
    migrationPhase: 'Pre-Calving Gathering',
    wildlife: [
      { animal: 'Wildebeest', event: 'Massing for calving season', rating: 'good', location: 'Southern Serengeti', icon: 'zebra' },
      { animal: 'Lion Cubs', event: 'Playful cubs everywhere', rating: 'good', location: 'Maasai Mara', icon: 'lion' },
      { animal: 'Elephants', event: 'Holiday herds - festive sightings', rating: 'excellent', location: 'Amboseli', icon: 'elephant' },
      { animal: 'Giraffes', event: 'Active browsing', rating: 'good', location: 'Samburu', icon: 'giraffe' },
    ],
    highlights: ['🎄 Holiday safari magic', '🍼 Calving prep begins', '🌈 Beautiful landscapes'],
    bestFor: ['Family Safari', 'Holiday Travel', 'Elephants'],
  },
];

const WildlifeCalendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const currentMonth = monthsData[selectedMonth];

  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case 'dry':
        return <Sun className="w-5 h-5 text-primary" />;
      case 'rainy':
        return <CloudRain className="w-5 h-5 text-blue-500" />;
      case 'short-rains':
        return <Cloud className="w-5 h-5 text-muted-foreground" />;
      default:
        return <Sun className="w-5 h-5 text-primary" />;
    }
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'excellent':
        return 'bg-safari text-secondary-foreground';
      case 'good':
        return 'bg-primary/20 text-primary';
      case 'fair':
        return 'bg-muted text-muted-foreground';
      case 'low':
        return 'bg-accent/10 text-accent';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getCrowdColor = (level: string) => {
    switch (level) {
      case 'peak':
        return 'bg-accent text-accent-foreground';
      case 'high':
        return 'bg-primary/80 text-primary-foreground';
      case 'medium':
        return 'bg-primary/40 text-primary';
      case 'low':
        return 'bg-safari/60 text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const navigateMonth = (direction: number) => {
    setSelectedMonth((prev) => (prev + direction + 12) % 12);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Wildlife & Weather Calendar | Awili Safaris"
        description="Plan your Kenya safari with our month-by-month wildlife calendar. Discover the best times to see the Great Migration, Big Five, and seasonal wildlife events."
        keywords="Kenya wildlife calendar, best time safari Kenya, Great Migration timing, Kenya weather, safari seasons"
      />
      <Header />

      {/* Hero Section with animated background */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-safari/20 via-background to-primary/10" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 text-6xl animate-pulse">🦁</div>
          <div className="absolute top-20 right-20 text-5xl animate-pulse delay-100">🐘</div>
          <div className="absolute bottom-20 left-1/4 text-4xl animate-pulse delay-200">🦓</div>
          <div className="absolute bottom-10 right-1/3 text-5xl animate-pulse delay-300">🦒</div>
        </div>
        
        <div className="relative container mx-auto px-4 lg:px-8">
          <PageBreadcrumb 
            items={[
              { label: 'Plan Your Trip', href: '/' },
              { label: 'Wildlife Calendar' }
            ]} 
            className="mb-6"
          />

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-safari/10 text-safari px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Interactive Safari Planner</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Wildlife & Weather
              <span className="text-primary"> Calendar</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Plan your perfect safari with our month-by-month guide to Kenya's incredible wildlife events, 
              from the Great Migration river crossings to calving season.
            </p>
          </div>
        </div>
      </section>

      {/* Visual Month Timeline */}
      <section className="py-6 border-y border-border sticky top-16 bg-card/95 backdrop-blur-sm z-40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-3 rounded-full bg-muted hover:bg-primary/20 transition-colors shrink-0"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div 
              ref={scrollContainerRef}
              className="flex gap-2 overflow-x-auto scrollbar-hide py-2 flex-1"
            >
              {monthsData.map((month, index) => {
                const isSelected = selectedMonth === index;
                const isPeak = [6, 7, 8].includes(index);
                
                return (
                  <button
                    key={month.name}
                    onClick={() => setSelectedMonth(index)}
                    className={`relative flex flex-col items-center gap-1 px-4 py-3 rounded-2xl transition-all min-w-[72px] ${
                      isSelected 
                        ? 'bg-primary text-primary-foreground shadow-lg scale-105' 
                        : isPeak 
                          ? 'bg-safari/10 hover:bg-safari/20 text-foreground'
                          : 'bg-muted/50 hover:bg-muted text-foreground'
                    }`}
                  >
                    <span className="text-xs font-medium">{month.shortName}</span>
                    <span className="text-lg">{getWeatherIcon(month.weather)}</span>
                    {isPeak && !isSelected && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-safari rounded-full border-2 border-card" />
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => navigateMonth(1)}
              className="p-3 rounded-full bg-muted hover:bg-primary/20 transition-colors shrink-0"
              aria-label="Next month"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10 lg:py-14">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Month Header Card */}
          <div className="bg-gradient-to-br from-card to-muted/30 rounded-3xl p-6 lg:p-8 mb-8 border border-border shadow-card">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              {/* Month Info */}
              <div className="flex items-center gap-5 flex-1">
                <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-4xl">
                  {getWeatherIcon(currentMonth.weather)}
                </div>
                <div>
                  <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground">
                    {currentMonth.name}
                  </h2>
                  <p className="text-primary font-semibold text-lg mt-1">
                    {currentMonth.migrationPhase}
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-card rounded-2xl p-4 text-center border border-border">
                  <Thermometer className="w-5 h-5 text-accent mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Temperature</p>
                  <p className="font-bold text-foreground">{currentMonth.avgTemp.low}°-{currentMonth.avgTemp.high}°C</p>
                </div>
                <div className="bg-card rounded-2xl p-4 text-center border border-border">
                  <CloudRain className="w-5 h-5 text-blue-500 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Rainfall</p>
                  <p className="font-bold text-foreground">{currentMonth.rainfall}mm</p>
                </div>
                <div className="bg-card rounded-2xl p-4 text-center border border-border">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${getCrowdColor(currentMonth.crowdLevel)}`}>
                    {currentMonth.crowdLevel.toUpperCase()}
                  </span>
                  <p className="text-xs text-muted-foreground mt-2">Crowds</p>
                </div>
                <div className="bg-card rounded-2xl p-4 text-center border border-border">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                    currentMonth.priceLevel === 'low' ? 'bg-safari/60 text-secondary-foreground' :
                    currentMonth.priceLevel === 'medium' ? 'bg-primary/40 text-primary' :
                    'bg-accent text-accent-foreground'
                  }`}>
                    {currentMonth.priceLevel === 'low' ? '💰 DEALS' : currentMonth.priceLevel === 'medium' ? 'MODERATE' : 'PEAK $$$'}
                  </span>
                  <p className="text-xs text-muted-foreground mt-2">Prices</p>
                </div>
              </div>
            </div>

            {/* Best For Tags */}
            <div className="mt-6 pt-6 border-t border-border/50">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Best for:</span>
                {currentMonth.bestFor.map((item, i) => (
                  <span key={i} className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Wildlife Events - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl font-bold text-foreground flex items-center gap-3">
                  <Binoculars className="w-7 h-7 text-primary" />
                  Wildlife in {currentMonth.name}
                </h2>
              </div>

              <div className="grid gap-4">
                {currentMonth.wildlife.map((event, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-2xl p-5 shadow-card border border-border hover:shadow-elevated hover:border-primary/30 transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-safari/20 flex items-center justify-center text-3xl shrink-0">
                        {animalEmojis[event.icon] || '🦁'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h3 className="font-display text-xl font-bold text-foreground">
                            {event.animal}
                          </h3>
                          <span className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-full ${getRatingColor(event.rating)}`}>
                            {event.rating === 'excellent' && '⭐ '}{event.rating.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-muted-foreground mb-3">{event.event}</p>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground">{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <div className="bg-gradient-to-br from-safari/10 to-primary/5 rounded-3xl p-6 border border-safari/20">
                <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-safari" />
                  {currentMonth.name} Highlights
                </h3>
                <div className="grid sm:grid-cols-3 gap-3">
                  {currentMonth.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="bg-card/80 rounded-xl p-4 text-center border border-border"
                    >
                      <p className="text-foreground font-medium">{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Migration Tracker */}
              <div className="bg-card rounded-3xl p-6 shadow-card border border-border">
                <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <TreeDeciduous className="w-5 h-5 text-safari" />
                  Migration Status
                </h3>
                <div className="relative">
                  {/* Simple migration visual */}
                  <div className="flex flex-col gap-3">
                    {['Southern Serengeti', 'Western Corridor', 'Maasai Mara', 'Northern Serengeti'].map((location, i) => {
                      const isActive = 
                        (selectedMonth <= 2 && i === 0) ||
                        ([3, 4, 5].includes(selectedMonth) && i === 1) ||
                        ([6, 7, 8, 9].includes(selectedMonth) && i === 2) ||
                        ([10, 11].includes(selectedMonth) && i === 3);
                      
                      return (
                        <div key={location} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                          isActive ? 'bg-safari/20 border-2 border-safari' : 'bg-muted/50'
                        }`}>
                          <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-safari animate-pulse' : 'bg-muted-foreground/30'}`} />
                          <span className={`text-sm ${isActive ? 'font-bold text-foreground' : 'text-muted-foreground'}`}>
                            {location}
                          </span>
                          {isActive && <span className="ml-auto text-safari">🦓</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Quick CTA */}
              <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-6 text-center">
                <Calendar className="w-10 h-10 text-primary-foreground mx-auto mb-3" />
                <h3 className="font-display text-xl font-bold text-primary-foreground mb-2">
                  Visit in {currentMonth.name}?
                </h3>
                <p className="text-primary-foreground/80 text-sm mb-4">
                  Get a custom itinerary for this season
                </p>
                <Link to="/quote" className="btn-safari bg-background text-foreground w-full justify-center">
                  Get Instant Quote
                </Link>
              </div>

              {/* Best Destinations This Month */}
              <div className="bg-card rounded-3xl p-6 shadow-card border border-border">
                <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Mountain className="w-5 h-5 text-primary" />
                  Top Picks for {currentMonth.shortName}
                </h3>
                <div className="space-y-3">
                  {currentMonth.wildlife.slice(0, 3).map((event, i) => (
                    <Link
                      key={i}
                      to={`/destination/${event.location.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-')}`}
                      className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl hover:bg-muted transition-colors group"
                    >
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="text-foreground font-medium flex-1">{event.location}</span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Year Overview Visual */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-8 text-center">
            Year-Round Safari Guide
          </h2>

          {/* Visual Year Timeline */}
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
            {monthsData.map((month, index) => {
              const isSelected = selectedMonth === index;
              const isPeak = [6, 7, 8].includes(index);
              const isCalving = [0, 1].includes(index);
              
              return (
                <button
                  key={month.name}
                  onClick={() => setSelectedMonth(index)}
                  className={`relative p-4 rounded-2xl border-2 transition-all ${
                    isSelected 
                      ? 'border-primary bg-primary/10 shadow-lg' 
                      : isPeak 
                        ? 'border-safari/50 bg-safari/5 hover:border-safari'
                        : isCalving
                          ? 'border-accent/50 bg-accent/5 hover:border-accent'
                          : 'border-border bg-card hover:border-primary/50'
                  }`}
                >
                  <p className="font-bold text-foreground">{month.shortName}</p>
                  <div className="flex justify-center my-2">
                    {getWeatherIcon(month.weather)}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{month.migrationPhase.split(' ').slice(0, 2).join(' ')}</p>
                  {isPeak && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs bg-safari text-secondary-foreground px-2 py-0.5 rounded-full font-bold">
                      PEAK
                    </span>
                  )}
                  {isCalving && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full font-bold">
                      CALVING
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-safari" />
              Peak Migration (Jul-Sep)
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-accent" />
              Calving Season (Jan-Feb)
            </div>
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-primary" />
              Dry Season
            </div>
            <div className="flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-blue-500" />
              Rainy Season
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-safari to-safari-light">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <Camera className="w-12 h-12 text-secondary-foreground mx-auto mb-4" />
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-secondary-foreground mb-4">
            Ready to Experience Kenya?
          </h2>
          <p className="text-secondary-foreground/80 mb-8 max-w-2xl mx-auto text-lg">
            Our safari experts will help you choose the perfect time for your dream wildlife adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quiz" className="btn-gold">
              Take Safari Quiz
            </Link>
            <Link to="/quote" className="bg-background text-foreground font-semibold px-8 py-4 rounded-full transition-all hover:shadow-elevated inline-flex items-center gap-2 justify-center">
              Get Instant Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default WildlifeCalendar;
