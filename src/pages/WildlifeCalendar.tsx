import { useState } from 'react';
import { Sun, Cloud, CloudRain, Thermometer, Eye, Calendar, MapPin, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

interface WildlifeEvent {
  animal: string;
  event: string;
  rating: 'excellent' | 'good' | 'fair' | 'low';
  location: string;
}

interface MonthData {
  name: string;
  weather: 'dry' | 'rainy' | 'short-rains';
  avgTemp: { high: number; low: number };
  rainfall: number;
  wildlife: WildlifeEvent[];
  highlights: string[];
}

const monthsData: MonthData[] = [
  {
    name: 'January',
    weather: 'dry',
    avgTemp: { high: 30, low: 15 },
    rainfall: 45,
    wildlife: [
      { animal: 'Wildebeest', event: 'Calving season begins', rating: 'excellent', location: 'Serengeti/Southern Mara' },
      { animal: 'Lions', event: 'Hunting during calving', rating: 'excellent', location: 'Maasai Mara' },
      { animal: 'Elephants', event: 'Large herds gathering', rating: 'good', location: 'Amboseli' },
      { animal: 'Flamingos', event: 'Peak numbers', rating: 'excellent', location: 'Lake Nakuru' },
    ],
    highlights: ['Wildebeest calving begins', 'Great predator action', 'Baby animals everywhere'],
  },
  {
    name: 'February',
    weather: 'dry',
    avgTemp: { high: 31, low: 15 },
    rainfall: 40,
    wildlife: [
      { animal: 'Wildebeest', event: 'Peak calving season', rating: 'excellent', location: 'Southern Serengeti' },
      { animal: 'Cheetahs', event: 'Hunting newborns', rating: 'excellent', location: 'Maasai Mara' },
      { animal: 'Zebras', event: 'Foaling season', rating: 'good', location: 'Maasai Mara' },
      { animal: 'Birds', event: 'Migratory birds present', rating: 'good', location: 'Lake Naivasha' },
    ],
    highlights: ['Best month for calving', 'Predator-prey interactions', 'Photography opportunities'],
  },
  {
    name: 'March',
    weather: 'short-rains',
    avgTemp: { high: 29, low: 16 },
    rainfall: 100,
    wildlife: [
      { animal: 'Wildebeest', event: 'Starting northward movement', rating: 'good', location: 'Central Serengeti' },
      { animal: 'Elephants', event: 'Kilimanjaro views', rating: 'excellent', location: 'Amboseli' },
      { animal: 'Hippos', event: 'Very active', rating: 'good', location: 'Lake Naivasha' },
      { animal: 'Crocodiles', event: 'Basking season', rating: 'fair', location: 'Mara River' },
    ],
    highlights: ['Green landscapes', 'Fewer tourists', 'Bird watching peak'],
  },
  {
    name: 'April',
    weather: 'rainy',
    avgTemp: { high: 27, low: 16 },
    rainfall: 180,
    wildlife: [
      { animal: 'Elephants', event: 'Lush grazing', rating: 'good', location: 'Samburu' },
      { animal: 'Buffalo', event: 'Large herds forming', rating: 'good', location: 'Maasai Mara' },
      { animal: 'Birds', event: '450+ species visible', rating: 'excellent', location: 'All parks' },
      { animal: 'Rhinos', event: 'Active grazing', rating: 'fair', location: 'Ol Pejeta' },
    ],
    highlights: ['Low season rates', 'Lush green scenery', 'Excellent bird watching'],
  },
  {
    name: 'May',
    weather: 'rainy',
    avgTemp: { high: 26, low: 15 },
    rainfall: 150,
    wildlife: [
      { animal: 'Wildebeest', event: 'Moving through Serengeti', rating: 'fair', location: 'Western Serengeti' },
      { animal: 'Leopards', event: 'Good sightings', rating: 'good', location: 'Samburu' },
      { animal: 'Giraffes', event: 'Mating season', rating: 'good', location: 'Amboseli' },
      { animal: 'Wild Dogs', event: 'Denning season', rating: 'fair', location: 'Laikipia' },
    ],
    highlights: ['Dramatic skies', 'Low season prices', 'Baby animals growing'],
  },
  {
    name: 'June',
    weather: 'dry',
    avgTemp: { high: 26, low: 13 },
    rainfall: 35,
    wildlife: [
      { animal: 'Wildebeest', event: 'Approaching Mara River', rating: 'excellent', location: 'Northern Serengeti' },
      { animal: 'Lions', event: 'Pride activity high', rating: 'excellent', location: 'Maasai Mara' },
      { animal: 'Elephants', event: 'River crossings', rating: 'good', location: 'Samburu' },
      { animal: 'Cheetahs', event: 'Cubs visible', rating: 'good', location: 'Maasai Mara' },
    ],
    highlights: ['Migration approaching', 'Clear dry weather', 'Peak safari season begins'],
  },
  {
    name: 'July',
    weather: 'dry',
    avgTemp: { high: 25, low: 12 },
    rainfall: 15,
    wildlife: [
      { animal: 'Wildebeest', event: 'RIVER CROSSINGS BEGIN', rating: 'excellent', location: 'Mara River' },
      { animal: 'Crocodiles', event: 'Hunting at crossings', rating: 'excellent', location: 'Mara River' },
      { animal: 'Lions', event: 'Ambush hunting', rating: 'excellent', location: 'Maasai Mara' },
      { animal: 'Hippos', event: 'Territorial displays', rating: 'good', location: 'Mara River' },
    ],
    highlights: ['Great Migration crossings', 'Best wildlife viewing', 'Dramatic river scenes'],
  },
  {
    name: 'August',
    weather: 'dry',
    avgTemp: { high: 26, low: 12 },
    rainfall: 20,
    wildlife: [
      { animal: 'Wildebeest', event: 'Peak river crossings', rating: 'excellent', location: 'Mara River' },
      { animal: 'Big Cats', event: 'High predator activity', rating: 'excellent', location: 'Maasai Mara' },
      { animal: 'Elephants', event: 'Kilimanjaro backdrop', rating: 'excellent', location: 'Amboseli' },
      { animal: 'Zebras', event: 'Part of migration', rating: 'excellent', location: 'Maasai Mara' },
    ],
    highlights: ['Peak migration month', 'Best river crossings', 'Exceptional photography'],
  },
  {
    name: 'September',
    weather: 'dry',
    avgTemp: { high: 28, low: 13 },
    rainfall: 25,
    wildlife: [
      { animal: 'Wildebeest', event: 'Still crossing rivers', rating: 'excellent', location: 'Mara River' },
      { animal: 'Lions', event: 'Fat and content', rating: 'excellent', location: 'Maasai Mara' },
      { animal: 'Leopards', event: 'Active hunting', rating: 'good', location: 'Maasai Mara' },
      { animal: 'Hyenas', event: 'Clan activity high', rating: 'good', location: 'Maasai Mara' },
    ],
    highlights: ['Migration continues', 'Excellent weather', 'Good value shoulder season'],
  },
  {
    name: 'October',
    weather: 'short-rains',
    avgTemp: { high: 29, low: 15 },
    rainfall: 60,
    wildlife: [
      { animal: 'Wildebeest', event: 'Moving south', rating: 'good', location: 'Northern Serengeti' },
      { animal: 'Elephants', event: 'Large family groups', rating: 'excellent', location: 'Amboseli' },
      { animal: 'Birds', event: 'Migration arriving', rating: 'excellent', location: 'All parks' },
      { animal: 'Flamingos', event: 'Numbers increasing', rating: 'good', location: 'Lake Bogoria' },
    ],
    highlights: ['Short rains begin', 'Bird migration starts', 'Good wildlife viewing'],
  },
  {
    name: 'November',
    weather: 'short-rains',
    avgTemp: { high: 28, low: 15 },
    rainfall: 120,
    wildlife: [
      { animal: 'Wildebeest', event: 'In southern Serengeti', rating: 'good', location: 'Southern Serengeti' },
      { animal: 'Elephants', event: 'Scattered herds', rating: 'good', location: 'Amboseli' },
      { animal: 'Rhinos', event: 'Good visibility', rating: 'good', location: 'Ol Pejeta' },
      { animal: 'Birds', event: 'Peak migratory season', rating: 'excellent', location: 'Lake Naivasha' },
    ],
    highlights: ['Green season begins', 'Fewer crowds', 'Newborn animals'],
  },
  {
    name: 'December',
    weather: 'short-rains',
    avgTemp: { high: 29, low: 15 },
    rainfall: 80,
    wildlife: [
      { animal: 'Wildebeest', event: 'Gathering for calving', rating: 'good', location: 'Southern Serengeti' },
      { animal: 'Lions', event: 'Cubs playing', rating: 'good', location: 'Maasai Mara' },
      { animal: 'Elephants', event: 'Christmas herds', rating: 'excellent', location: 'Amboseli' },
      { animal: 'Giraffes', event: 'Active browsing', rating: 'good', location: 'Samburu' },
    ],
    highlights: ['Holiday safari season', 'Calving preparation', 'Beautiful landscapes'],
  },
];

const destinations = [
  { name: 'Maasai Mara', description: 'Kenya\'s premier wildlife destination, home to the Great Migration' },
  { name: 'Amboseli', description: 'Best elephant viewing with Mt. Kilimanjaro backdrop' },
  { name: 'Samburu', description: 'Unique northern species: Grevy\'s zebra, reticulated giraffe' },
  { name: 'Lake Nakuru', description: 'Flamingo paradise and rhino sanctuary' },
  { name: 'Tsavo', description: 'Kenya\'s largest park with red elephants' },
];

const WildlifeCalendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const currentMonth = monthsData[selectedMonth];

  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case 'dry':
        return <Sun className="w-6 h-6 text-primary" />;
      case 'rainy':
        return <CloudRain className="w-6 h-6 text-blue-500" />;
      case 'short-rains':
        return <Cloud className="w-6 h-6 text-muted-foreground" />;
      default:
        return <Sun className="w-6 h-6 text-primary" />;
    }
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'excellent':
        return 'bg-safari text-secondary-foreground';
      case 'good':
        return 'bg-primary text-primary-foreground';
      case 'fair':
        return 'bg-muted text-muted-foreground';
      case 'low':
        return 'bg-accent/20 text-accent';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const navigateMonth = (direction: number) => {
    setSelectedMonth((prev) => (prev + direction + 12) % 12);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-safari/10 via-background to-primary/5">
        <div className="container mx-auto px-4 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>

          <div className="max-w-3xl">
            <span className="text-primary font-semibold uppercase tracking-wider text-sm">
              Plan Your Safari
            </span>
            <h1 className="section-title mt-2">
              Wildlife & Weather Calendar
            </h1>
            <p className="section-subtitle mt-4">
              Discover the best times to witness Kenya's incredible wildlife events, from the Great Migration to calving season.
            </p>
          </div>
        </div>
      </section>

      {/* Month Selector */}
      <section className="py-8 border-b border-border sticky top-16 bg-background/95 backdrop-blur-sm z-40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex gap-2 overflow-x-auto scrollbar-hide py-2 px-4 flex-1 mx-4">
              {monthsData.map((month, index) => (
                <button
                  key={month.name}
                  onClick={() => setSelectedMonth(index)}
                  className={`filter-toggle whitespace-nowrap ${
                    selectedMonth === index ? 'active' : ''
                  }`}
                >
                  {month.name.slice(0, 3)}
                </button>
              ))}
            </div>

            <button
              onClick={() => navigateMonth(1)}
              className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Weather & Overview */}
            <div className="space-y-6">
              <div className="bg-card rounded-3xl p-6 lg:p-8 shadow-card border border-border">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-foreground">
                      {currentMonth.name}
                    </h2>
                    <p className="text-muted-foreground capitalize">
                      {currentMonth.weather.replace('-', ' ')} season
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-muted rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Thermometer className="w-5 h-5 text-accent" />
                      <span className="text-sm text-muted-foreground">Temperature</span>
                    </div>
                    <p className="font-semibold text-foreground">
                      {currentMonth.avgTemp.low}°C - {currentMonth.avgTemp.high}°C
                    </p>
                  </div>

                  <div className="bg-muted rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      {getWeatherIcon(currentMonth.weather)}
                      <span className="text-sm text-muted-foreground">Rainfall</span>
                    </div>
                    <p className="font-semibold text-foreground">{currentMonth.rainfall}mm</p>
                  </div>
                </div>

                {/* Monthly Highlights */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-primary" />
                    Highlights
                  </h3>
                  <ul className="space-y-2">
                    {currentMonth.highlights.map((highlight, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-muted-foreground"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quick Destinations */}
              <div className="bg-card rounded-3xl p-6 lg:p-8 shadow-card border border-border">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">
                  Top Destinations
                </h3>
                <div className="space-y-3">
                  {destinations.slice(0, 3).map((dest) => (
                    <div
                      key={dest.name}
                      className="flex items-start gap-3 p-3 bg-muted rounded-xl"
                    >
                      <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">{dest.name}</p>
                        <p className="text-sm text-muted-foreground">{dest.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Wildlife Events */}
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Wildlife Sightings in {currentMonth.name}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentMonth.wildlife.map((event, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-2xl p-6 shadow-card border border-border hover:shadow-elevated transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-display text-xl font-bold text-foreground">
                          {event.animal}
                        </h3>
                        <p className="text-muted-foreground">{event.event}</p>
                      </div>
                      <span
                        className={`text-xs font-bold px-3 py-1.5 rounded-full capitalize ${getRatingColor(
                          event.rating
                        )}`}
                      >
                        {event.rating}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      {event.location}
                    </div>
                  </div>
                ))}
              </div>

              {/* Year Overview Grid */}
              <div className="mt-12">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Year-Round Overview
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px]">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-4 px-4 font-semibold text-foreground">
                          Month
                        </th>
                        <th className="text-center py-4 px-2 font-semibold text-foreground">
                          Weather
                        </th>
                        <th className="text-center py-4 px-2 font-semibold text-foreground">
                          Migration
                        </th>
                        <th className="text-center py-4 px-2 font-semibold text-foreground">
                          Big Cats
                        </th>
                        <th className="text-center py-4 px-2 font-semibold text-foreground">
                          Elephants
                        </th>
                        <th className="text-center py-4 px-2 font-semibold text-foreground">
                          Birds
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {monthsData.map((month, index) => (
                        <tr
                          key={month.name}
                          className={`border-b border-border/50 cursor-pointer hover:bg-muted/50 transition-colors ${
                            selectedMonth === index ? 'bg-primary/5' : ''
                          }`}
                          onClick={() => setSelectedMonth(index)}
                        >
                          <td className="py-4 px-4 font-medium text-foreground">
                            {month.name}
                          </td>
                          <td className="py-4 px-2 text-center">
                            <div className="flex justify-center">
                              {getWeatherIcon(month.weather)}
                            </div>
                          </td>
                          <td className="py-4 px-2 text-center">
                            <span
                              className={`inline-block w-4 h-4 rounded-full ${
                                [6, 7, 8].includes(index)
                                  ? 'bg-safari'
                                  : [0, 1, 5, 9].includes(index)
                                  ? 'bg-primary'
                                  : 'bg-muted'
                              }`}
                            />
                          </td>
                          <td className="py-4 px-2 text-center">
                            <span
                              className={`inline-block w-4 h-4 rounded-full ${
                                [0, 1, 6, 7, 8].includes(index)
                                  ? 'bg-safari'
                                  : 'bg-primary'
                              }`}
                            />
                          </td>
                          <td className="py-4 px-2 text-center">
                            <span className="inline-block w-4 h-4 rounded-full bg-primary" />
                          </td>
                          <td className="py-4 px-2 text-center">
                            <span
                              className={`inline-block w-4 h-4 rounded-full ${
                                [3, 4, 10, 11].includes(index) ? 'bg-safari' : 'bg-primary'
                              }`}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-safari" />
                    Excellent
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-primary" />
                    Good
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-muted" />
                    Fair
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-safari to-safari-light">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-secondary-foreground mb-4">
            Ready to Plan Your Safari?
          </h2>
          <p className="text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
            Our experts can help you choose the perfect time and destination for your dream wildlife experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quiz" className="btn-gold">
              Take Safari Quiz
            </Link>
            <Link to="/#destinations" className="bg-background text-foreground font-semibold px-8 py-4 rounded-full transition-all hover:shadow-elevated">
              Browse Packages
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
