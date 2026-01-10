import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Star, Users, Sun, CloudRain, Camera, Binoculars, Home, Utensils, Car, Plane } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { usePackages } from '@/hooks/usePackages';

// Import images
import maraLodge from '@/assets/mara-lodge.jpg';
import maraLions from '@/assets/mara-lions.jpg';
import maraMigration from '@/assets/mara-migration.jpg';
import maraGameDrive from '@/assets/mara-game-drive.jpg';
import amboseli from '@/assets/amboseli.jpg';
import amboseliElephants from '@/assets/amboseli-elephants.jpg';
import samburu from '@/assets/samburu.jpg';
import samburuWildlife from '@/assets/samburu-wildlife.jpg';
import naivasha from '@/assets/naivasha.jpg';
import naivashaHippos from '@/assets/naivasha-hippos.jpg';
import dianiBeach from '@/assets/diani-beach.jpg';
import dianiOcean from '@/assets/diani-ocean.jpg';

interface DestinationData {
  slug: string;
  name: string;
  tagline: string;
  heroImage: string;
  gallery: string[];
  description: string;
  history: string;
  wildlife: {
    name: string;
    description: string;
    bestTime: string;
  }[];
  activities: {
    name: string;
    description: string;
    duration: string;
    icon: React.ReactNode;
  }[];
  bestTime: {
    peak: string[];
    good: string[];
    low: string[];
  };
  weather: {
    dry: string;
    wet: string;
    temp: string;
  };
  lodges: {
    name: string;
    type: string;
    description: string;
    priceRange: string;
  }[];
  tips: string[];
  facts: string[];
  gettingThere: {
    fromNairobi: string;
    byAir: string;
    byRoad: string;
  };
}

const destinationsData: Record<string, DestinationData> = {
  'maasai-mara': {
    slug: 'maasai-mara',
    name: 'Maasai Mara',
    tagline: 'The Crown Jewel of African Safaris',
    heroImage: maraLodge,
    gallery: [maraLions, maraMigration, maraGameDrive, maraLodge],
    description: 'The Maasai Mara National Reserve is Kenya\'s most famous wildlife destination, renowned for the Great Migration and exceptional big cat sightings. This iconic savannah landscape offers unparalleled wildlife viewing opportunities year-round.',
    history: 'Named after the Maasai people who have lived in the area for centuries and the Mara River that flows through it, the reserve was established in 1961. The name "Mara" means "spotted" in Maasai, referring to the dotted landscape of trees and shadows across the plains.',
    wildlife: [
      { name: 'Big Five', description: 'Lion, leopard, elephant, buffalo, and rhino all present', bestTime: 'Year-round' },
      { name: 'Great Migration', description: '2 million wildebeest and zebra cross from Tanzania', bestTime: 'July - October' },
      { name: 'Big Cats', description: 'Highest density of lions in Africa, plus cheetahs and leopards', bestTime: 'Year-round' },
      { name: 'Hippos & Crocodiles', description: 'Abundant in the Mara River', bestTime: 'Year-round' },
    ],
    activities: [
      { name: 'Game Drives', description: 'Morning and evening safaris in 4x4 vehicles', duration: '3-4 hours', icon: <Car className="w-5 h-5" /> },
      { name: 'Hot Air Balloon', description: 'Sunrise flight over the savannah', duration: '4 hours', icon: <Plane className="w-5 h-5" /> },
      { name: 'Maasai Village Visit', description: 'Cultural experience with local community', duration: '2 hours', icon: <Users className="w-5 h-5" /> },
      { name: 'Bush Walks', description: 'Guided walking safaris with armed rangers', duration: '2-3 hours', icon: <Binoculars className="w-5 h-5" /> },
    ],
    bestTime: {
      peak: ['July', 'August', 'September', 'October'],
      good: ['January', 'February', 'June', 'November', 'December'],
      low: ['March', 'April', 'May'],
    },
    weather: {
      dry: 'June to October, December to March',
      wet: 'March to May (long rains), November (short rains)',
      temp: '15°C - 30°C (59°F - 86°F)',
    },
    lodges: [
      { name: 'Governors\' Camp Collection', type: 'Luxury Tented', description: 'Iconic camps along the Mara River', priceRange: '$$$' },
      { name: 'Mara Serena Safari Lodge', type: 'Lodge', description: 'Stunning hilltop location with panoramic views', priceRange: '$$' },
      { name: 'Basecamp Masai Mara', type: 'Eco-Lodge', description: 'Award-winning eco-friendly camp', priceRange: '$$' },
      { name: 'Mara Engai Wilderness Lodge', type: 'Mid-Range', description: 'Great value with excellent game viewing', priceRange: '$' },
    ],
    tips: [
      'Book accommodations well in advance for migration season (July-October)',
      'Bring warm layers - mornings and evenings can be surprisingly cold',
      'A good pair of binoculars is essential',
      'Respect the Maasai culture when visiting villages',
      'Stay in your vehicle during game drives for safety',
    ],
    facts: [
      'Covers 1,510 km² (583 sq mi) of wilderness',
      'Part of the greater Serengeti ecosystem',
      'Home to over 95 species of mammals',
      'Over 450 bird species recorded',
      'The Mara Triangle offers less crowded game viewing',
    ],
    gettingThere: {
      fromNairobi: '270 km, approximately 5-6 hours by road',
      byAir: '45 minutes from Wilson Airport to various Mara airstrips',
      byRoad: 'Well-maintained tarmac to Narok, then murram roads to the reserve',
    },
  },
  'amboseli': {
    slug: 'amboseli',
    name: 'Amboseli',
    tagline: 'Land of Giants with Kilimanjaro Views',
    heroImage: amboseli,
    gallery: [amboseliElephants, amboseli],
    description: 'Amboseli National Park offers one of Africa\'s most iconic views: large herds of elephants against the backdrop of Mount Kilimanjaro. This 392 km² park is renowned for its large elephant population and stunning landscapes.',
    history: 'Established as a reserve in 1948 and upgraded to national park status in 1974, Amboseli meaning "salty dust" in Maasai refers to the dry conditions. The park has been the subject of some of the longest elephant studies in Africa.',
    wildlife: [
      { name: 'Elephants', description: 'Over 1,600 elephants, some of Africa\'s largest tuskers', bestTime: 'Year-round' },
      { name: 'Lions & Cheetahs', description: 'Good populations across the plains', bestTime: 'Dry season' },
      { name: 'Hippos', description: 'Found in the permanent swamps', bestTime: 'Year-round' },
      { name: 'Birds', description: 'Over 400 species including flamingos', bestTime: 'November - April' },
    ],
    activities: [
      { name: 'Game Drives', description: 'Best at dawn for Kilimanjaro views', duration: '3-4 hours', icon: <Car className="w-5 h-5" /> },
      { name: 'Observation Hill', description: 'Panoramic views of the park and swamps', duration: '1 hour', icon: <Binoculars className="w-5 h-5" /> },
      { name: 'Maasai Village', description: 'Cultural visits to nearby communities', duration: '2 hours', icon: <Users className="w-5 h-5" /> },
      { name: 'Bird Watching', description: 'Excellent opportunities in the swamps', duration: '2-3 hours', icon: <Camera className="w-5 h-5" /> },
    ],
    bestTime: {
      peak: ['June', 'July', 'August', 'September', 'October'],
      good: ['January', 'February', 'November', 'December'],
      low: ['March', 'April', 'May'],
    },
    weather: {
      dry: 'June to October, January to February',
      wet: 'March to May, November to December',
      temp: '20°C - 35°C (68°F - 95°F)',
    },
    lodges: [
      { name: 'Tortilis Camp', type: 'Luxury Tented', description: 'Exclusive camp with stunning Kilimanjaro views', priceRange: '$$$' },
      { name: 'Amboseli Serena Safari Lodge', type: 'Lodge', description: 'Award-winning lodge with excellent service', priceRange: '$$' },
      { name: 'Ol Tukai Lodge', type: 'Lodge', description: 'Classic lodge in heart of the park', priceRange: '$$' },
      { name: 'Kibo Safari Camp', type: 'Tented', description: 'Great value tented camp', priceRange: '$' },
    ],
    tips: [
      'Visit in dry season for best Kilimanjaro views (clouds often obscure it)',
      'Early morning game drives offer the clearest mountain views',
      'The park can get dusty - bring eye drops and camera lens cleaning kit',
      'Observation Hill offers the best panoramic photography spots',
    ],
    facts: [
      'Home to over 1,600 elephants',
      'Kilimanjaro is 5,895m tall - Africa\'s highest peak',
      'The park\'s swamps are fed by Kilimanjaro\'s melting snow',
      'Featured in many wildlife documentaries',
    ],
    gettingThere: {
      fromNairobi: '240 km, approximately 4-5 hours by road',
      byAir: '45 minutes from Wilson Airport',
      byRoad: 'Via Namanga road, well-maintained tarmac',
    },
  },
  'samburu': {
    slug: 'samburu',
    name: 'Samburu',
    tagline: 'Where the Wild North Begins',
    heroImage: samburu,
    gallery: [samburuWildlife, samburu],
    description: 'Samburu National Reserve offers a unique safari experience with species found nowhere else in Kenya. The rugged, semi-arid landscape along the Ewaso Ng\'iro River is home to the "Samburu Special Five" - rare animals adapted to this northern terrain.',
    history: 'Named after the Samburu people, close relatives of the Maasai, the reserve was established in 1985. The Samburu culture remains vibrant, with traditional warriors still practicing age-old customs.',
    wildlife: [
      { name: 'Samburu Special Five', description: 'Grevy\'s zebra, reticulated giraffe, Somali ostrich, gerenuk, beisa oryx', bestTime: 'Year-round' },
      { name: 'Elephants', description: 'Large herds along the river', bestTime: 'Dry season' },
      { name: 'Leopards', description: 'Excellent sightings along the riverine forest', bestTime: 'Year-round' },
      { name: 'Wild Dogs', description: 'Occasional sightings', bestTime: 'Variable' },
    ],
    activities: [
      { name: 'Game Drives', description: 'Focus on unique northern species', duration: '3-4 hours', icon: <Car className="w-5 h-5" /> },
      { name: 'Samburu Village', description: 'Cultural immersion with warriors', duration: '2-3 hours', icon: <Users className="w-5 h-5" /> },
      { name: 'Sundowners', description: 'Evening drinks with stunning views', duration: '2 hours', icon: <Sun className="w-5 h-5" /> },
      { name: 'Camel Safaris', description: 'Unique way to explore', duration: 'Half day', icon: <Binoculars className="w-5 h-5" /> },
    ],
    bestTime: {
      peak: ['July', 'August', 'September', 'October'],
      good: ['January', 'February', 'June', 'December'],
      low: ['March', 'April', 'May', 'November'],
    },
    weather: {
      dry: 'June to October, December to March',
      wet: 'March to May, October to November',
      temp: '21°C - 38°C (70°F - 100°F)',
    },
    lodges: [
      { name: 'Saruni Samburu', type: 'Luxury Lodge', description: 'Award-winning lodge with infinity pool', priceRange: '$$$' },
      { name: 'Elephant Bedroom Camp', type: 'Luxury Tented', description: 'Intimate camp on the river', priceRange: '$$$' },
      { name: 'Samburu Intrepids', type: 'Tented', description: 'Riverside tented camp', priceRange: '$$' },
      { name: 'Samburu Game Lodge', type: 'Lodge', description: 'Classic lodge with great value', priceRange: '$' },
    ],
    tips: [
      'Pack light-colored clothing for the heat',
      'The river attracts wildlife all day - stay near it',
      'Samburu culture is fascinating - engage respectfully',
      'This is malaria country - take precautions',
    ],
    facts: [
      'Home to the only population of Grevy\'s zebra in Kenya',
      'The Ewaso Ng\'iro River never dries completely',
      'Reticulated giraffes have the most beautiful coat patterns',
      'Gerenuk (giraffe gazelle) stand on hind legs to browse',
    ],
    gettingThere: {
      fromNairobi: '350 km, approximately 5-6 hours by road',
      byAir: '1 hour from Wilson Airport',
      byRoad: 'Via Isiolo, mostly tarmac with some murram sections',
    },
  },
  'lake-naivasha': {
    slug: 'lake-naivasha',
    name: 'Lake Naivasha',
    tagline: 'A Freshwater Paradise in the Rift Valley',
    heroImage: naivasha,
    gallery: [naivashaHippos, naivasha],
    description: 'Lake Naivasha is a freshwater lake in Kenya\'s Rift Valley, known for its abundant birdlife, hippo population, and the nearby Hell\'s Gate National Park. It offers a unique blend of water-based and land activities.',
    history: 'The lake\'s name comes from the Maasai word "nai\'posha" meaning "rough water." It has been a hub for Kenya\'s flower industry and provides a peaceful escape from Nairobi.',
    wildlife: [
      { name: 'Hippos', description: 'Large pods visible during boat rides', bestTime: 'Year-round' },
      { name: 'Birds', description: 'Over 400 species including fish eagles', bestTime: 'November - April' },
      { name: 'Giraffes & Zebras', description: 'On Crescent Island', bestTime: 'Year-round' },
      { name: 'Buffalos', description: 'Along the lake shore', bestTime: 'Year-round' },
    ],
    activities: [
      { name: 'Boat Safari', description: 'See hippos and birds up close', duration: '2 hours', icon: <Binoculars className="w-5 h-5" /> },
      { name: 'Hell\'s Gate Cycling', description: 'Cycle among wildlife and gorges', duration: '3-4 hours', icon: <Car className="w-5 h-5" /> },
      { name: 'Crescent Island Walk', description: 'Walk among zebras and giraffes', duration: '2 hours', icon: <Users className="w-5 h-5" /> },
      { name: 'Bird Watching', description: 'World-class birding opportunities', duration: '2-3 hours', icon: <Camera className="w-5 h-5" /> },
    ],
    bestTime: {
      peak: ['June', 'July', 'August', 'September'],
      good: ['January', 'February', 'October', 'November', 'December'],
      low: ['March', 'April', 'May'],
    },
    weather: {
      dry: 'June to September, December to March',
      wet: 'March to May, October to November',
      temp: '8°C - 25°C (46°F - 77°F)',
    },
    lodges: [
      { name: 'Loldia House', type: 'Boutique', description: 'Historic farmhouse on the lake', priceRange: '$$$' },
      { name: 'Lake Naivasha Sopa Resort', type: 'Resort', description: 'Large resort with great facilities', priceRange: '$$' },
      { name: 'Naivasha Kongoni Lodge', type: 'Lodge', description: 'Peaceful lodge with lake views', priceRange: '$$' },
      { name: 'Camp Carnelley\'s', type: 'Camp', description: 'Lakeside camping and budget rooms', priceRange: '$' },
    ],
    tips: [
      'Book boat safaris for early morning - best light and hippo activity',
      'Bring layers - the lake area can be quite cool',
      'Combine with Hell\'s Gate for cycling among wildlife',
      'Watch for fish eagles - they\'re spectacular hunters',
    ],
    facts: [
      'The lake is at 1,884m elevation in the Rift Valley',
      'One of the highest lakes in Africa\'s Rift Valley',
      'Major hub for Kenya\'s flower export industry',
      'Hell\'s Gate inspired parts of Disney\'s "Lion King"',
    ],
    gettingThere: {
      fromNairobi: '90 km, approximately 1.5-2 hours by road',
      byAir: 'No regular flights, but charter possible',
      byRoad: 'Via the Nairobi-Nakuru highway, excellent tarmac',
    },
  },
  'diani-beach': {
    slug: 'diani-beach',
    name: 'Diani Beach',
    tagline: 'Kenya\'s Tropical Paradise',
    heroImage: dianiBeach,
    gallery: [dianiOcean, dianiBeach],
    description: 'Diani Beach is Kenya\'s premier beach destination, featuring pristine white sands, turquoise waters, and vibrant coral reefs. Perfect for combining a safari adventure with a relaxing beach holiday.',
    history: 'The area has been a trading post for centuries, with Arab and Portuguese influences visible in the nearby old town of Mombasa. Today, it\'s East Africa\'s most popular beach resort area.',
    wildlife: [
      { name: 'Marine Life', description: 'Dolphins, sea turtles, whale sharks (seasonal)', bestTime: 'Year-round' },
      { name: 'Colobus Monkeys', description: 'Black and white colobus in the forest', bestTime: 'Year-round' },
      { name: 'Coral Reef Fish', description: 'Hundreds of colorful species', bestTime: 'October - March' },
      { name: 'Whale Sharks', description: 'The world\'s largest fish', bestTime: 'October - March' },
    ],
    activities: [
      { name: 'Snorkeling', description: 'Explore vibrant coral reefs', duration: '2-3 hours', icon: <Camera className="w-5 h-5" /> },
      { name: 'Scuba Diving', description: 'Discover underwater wonders', duration: 'Half day', icon: <Binoculars className="w-5 h-5" /> },
      { name: 'Kite Surfing', description: 'World-class conditions', duration: '2-3 hours', icon: <Sun className="w-5 h-5" /> },
      { name: 'Shimba Hills Safari', description: 'Day trip to nearby reserve', duration: 'Full day', icon: <Car className="w-5 h-5" /> },
    ],
    bestTime: {
      peak: ['December', 'January', 'February', 'March'],
      good: ['June', 'July', 'August', 'September', 'October'],
      low: ['April', 'May', 'November'],
    },
    weather: {
      dry: 'December to March, June to October',
      wet: 'April to May (long rains), November (short rains)',
      temp: '22°C - 33°C (72°F - 91°F)',
    },
    lodges: [
      { name: 'The Sands at Nomad', type: 'Boutique', description: 'Intimate beachfront boutique hotel', priceRange: '$$$' },
      { name: 'Diani Reef Beach Resort', type: 'Resort', description: 'All-inclusive beachfront resort', priceRange: '$$' },
      { name: 'Leopard Beach Resort', type: 'Resort', description: 'Popular family-friendly resort', priceRange: '$$' },
      { name: 'Diani Backpackers', type: 'Budget', description: 'Great value beach accommodation', priceRange: '$' },
    ],
    tips: [
      'The best swimming is at high tide when water is deep',
      'Book dolphin tours for early morning when seas are calm',
      'Try the local Swahili cuisine - especially seafood',
      'Visit the Colobus Conservation center',
    ],
    facts: [
      'Voted Africa\'s Leading Beach Destination multiple times',
      '17 km of pristine white sand beach',
      'Protected by coral reef - calm, safe swimming',
      'Home to endangered Colobus monkeys',
    ],
    gettingThere: {
      fromNairobi: '500 km, approximately 8 hours by road or 1 hour by air',
      byAir: 'Fly to Ukunda airstrip or Mombasa airport',
      byRoad: 'Via Mombasa and the Likoni ferry',
    },
  },
};

const DestinationGuide = () => {
  const { destinationSlug } = useParams<{ destinationSlug: string }>();
  const { data: packages } = usePackages();

  const destination = destinationSlug ? destinationsData[destinationSlug] : null;

  // Find related packages
  const relatedPackages = packages?.filter((pkg) =>
    pkg.location.toLowerCase().includes(destination?.name.toLowerCase() || '') ||
    pkg.name.toLowerCase().includes(destination?.name.toLowerCase() || '')
  ).slice(0, 3);

  if (!destination) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">
            Destination Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The destination you're looking for doesn't exist.
          </p>
          <Link to="/destinations" className="btn-gold inline-flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            View All Destinations
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] lg:h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${destination.heroImage})` }}
        />
        <div className="absolute inset-0 hero-overlay" />

        <div className="relative z-10 container mx-auto px-4 lg:px-8 h-full flex flex-col justify-end pb-12 lg:pb-16">
          <Link
            to="/"
            className="absolute top-24 left-4 lg:left-8 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>

          <div className="max-w-3xl">
            <span className="inline-block bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full mb-4">
              Destination Guide
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {destination.name}
            </h1>
            <p className="text-xl text-white/90 mb-6">{destination.tagline}</p>
          </div>
        </div>
      </section>

      {/* Quick Facts Bar */}
      <section className="bg-card border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            <div className="py-6 px-4 text-center">
              <Sun className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Best Time</p>
              <p className="font-semibold text-foreground">{destination.bestTime.peak.slice(0, 2).join(', ')}</p>
            </div>
            <div className="py-6 px-4 text-center">
              <Binoculars className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Wildlife</p>
              <p className="font-semibold text-foreground">{destination.wildlife.length}+ Species</p>
            </div>
            <div className="py-6 px-4 text-center">
              <Car className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">From Nairobi</p>
              <p className="font-semibold text-foreground">{destination.gettingThere.fromNairobi.split(',')[0]}</p>
            </div>
            <div className="py-6 px-4 text-center">
              <Home className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Lodges</p>
              <p className="font-semibold text-foreground">{destination.lodges.length}+ Options</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <div>
                <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-4">
                  Overview
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {destination.description}
                </p>
                <div className="bg-muted rounded-2xl p-6">
                  <h3 className="font-semibold text-foreground mb-3">History & Background</h3>
                  <p className="text-muted-foreground">{destination.history}</p>
                </div>
              </div>

              {/* Wildlife */}
              <div>
                <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-6">
                  Wildlife Highlights
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {destination.wildlife.map((animal, index) => (
                    <div
                      key={index}
                      className="bg-card rounded-2xl p-6 shadow-card border border-border"
                    >
                      <h3 className="font-display text-lg font-bold text-foreground mb-2">
                        {animal.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">{animal.description}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">Best: {animal.bestTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activities */}
              <div>
                <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-6">
                  Things to Do
                </h2>
                <div className="space-y-4">
                  {destination.activities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-card rounded-2xl shadow-card border border-border"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        {activity.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{activity.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                        <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                          {activity.duration}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lodges */}
              <div>
                <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-6">
                  Where to Stay
                </h2>
                <div className="space-y-4">
                  {destination.lodges.map((lodge, index) => (
                    <div
                      key={index}
                      className="flex items-start justify-between p-4 bg-card rounded-2xl shadow-card border border-border"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{lodge.name}</h3>
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            {lodge.type}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{lodge.description}</p>
                      </div>
                      <span className="text-primary font-bold shrink-0">{lodge.priceRange}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Best Time to Visit */}
              <div className="bg-card rounded-3xl p-6 lg:p-8 shadow-card border border-border">
                <h3 className="font-display text-xl font-bold text-foreground mb-6">
                  Best Time to Visit
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-safari" />
                      <span className="font-medium text-foreground">Peak Season</span>
                    </div>
                    <p className="text-sm text-muted-foreground pl-5">
                      {destination.bestTime.peak.join(', ')}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <span className="font-medium text-foreground">Good Season</span>
                    </div>
                    <p className="text-sm text-muted-foreground pl-5">
                      {destination.bestTime.good.join(', ')}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                      <span className="font-medium text-foreground">Low Season</span>
                    </div>
                    <p className="text-sm text-muted-foreground pl-5">
                      {destination.bestTime.low.join(', ')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Weather */}
              <div className="bg-card rounded-3xl p-6 lg:p-8 shadow-card border border-border">
                <h3 className="font-display text-xl font-bold text-foreground mb-6">
                  Weather & Climate
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Sun className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Dry Season</p>
                      <p className="text-sm text-muted-foreground">{destination.weather.dry}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CloudRain className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Wet Season</p>
                      <p className="text-sm text-muted-foreground">{destination.weather.wet}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      <strong>Temperature:</strong> {destination.weather.temp}
                    </p>
                  </div>
                </div>
              </div>

              {/* Insider Tips */}
              <div className="bg-safari/5 rounded-3xl p-6 lg:p-8 border border-safari/20">
                <h3 className="font-display text-xl font-bold text-foreground mb-6">
                  Insider Tips
                </h3>
                <ul className="space-y-3">
                  {destination.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 text-safari shrink-0 mt-0.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Getting There */}
              <div className="bg-card rounded-3xl p-6 lg:p-8 shadow-card border border-border">
                <h3 className="font-display text-xl font-bold text-foreground mb-6">
                  Getting There
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Car className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">By Road</p>
                      <p className="text-sm text-muted-foreground">{destination.gettingThere.byRoad}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Plane className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">By Air</p>
                      <p className="text-sm text-muted-foreground">{destination.gettingThere.byAir}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-primary rounded-3xl p-6 lg:p-8 text-center">
                <h3 className="font-display text-xl font-bold text-primary-foreground mb-3">
                  Ready to Explore {destination.name}?
                </h3>
                <p className="text-primary-foreground/80 text-sm mb-6">
                  Let us plan your perfect safari experience
                </p>
                <Link to="/quote" className="btn-safari bg-background text-foreground inline-block">
                  Get Instant Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Packages */}
      {relatedPackages && relatedPackages.length > 0 && (
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-8">
              {destination.name} Safari Packages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPackages.map((pkg) => (
                <Link
                  key={pkg.id}
                  to={`/package/${pkg.slug}`}
                  className="bg-card rounded-2xl overflow-hidden shadow-card border border-border hover:shadow-elevated transition-all group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                      style={{ backgroundImage: `url(${pkg.images[0] || '/placeholder.svg'})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 right-4 price-tag">
                      ${pkg.price_non_resident.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">
                      {pkg.name}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{pkg.duration}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-primary fill-primary" />
                        {pkg.rating}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default DestinationGuide;
