// Import images - existing
import maraLodge from '@/assets/mara-lodge.jpg';
import maraLions from '@/assets/mara-lions.jpg';
import maraMigration from '@/assets/mara-migration.jpg';
import maraGameDrive from '@/assets/mara-game-drive.jpg';
import maraBalloon from '@/assets/mara-balloon.jpg';
import amboseli from '@/assets/amboseli.jpg';
import amboseliElephants from '@/assets/amboseli-elephants.jpg';
import amboseliLodge from '@/assets/amboseli-lodge.jpg';
import samburu from '@/assets/samburu.jpg';
import samburuWildlife from '@/assets/samburu-wildlife.jpg';
import samburuCulture from '@/assets/samburu-culture.jpg';
import samburuRiver from '@/assets/samburu-river.jpg';
import naivasha from '@/assets/naivasha.jpg';
import naivashaHippos from '@/assets/naivasha-hippos.jpg';
import naivashaBoat from '@/assets/naivasha-boat.jpg';
import naivashaWildlife from '@/assets/naivasha-wildlife.jpg';
import dianiBeach from '@/assets/diani-beach.jpg';
import dianiOcean from '@/assets/diani-ocean.jpg';
import dianiResort from '@/assets/diani-resort.jpg';
import dianiSnorkeling from '@/assets/diani-snorkeling.jpg';
// New unique destination images
import tsavo from '@/assets/tsavo.jpg';
import laikipia from '@/assets/laikipia.jpg';
import lakeNakuru from '@/assets/lake-nakuru.jpg';
import mountKenya from '@/assets/mount-kenya.jpg';
import lamu from '@/assets/lamu.jpg';

export interface PricingTier {
  budget: string;
  midRange: string;
  luxury: string;
}

export interface QuickDecision {
  bestTime: string;
  idealFor: string;
  recommendedStay: string;
}

export interface DestinationData {
  slug: string;
  name: string;
  tagline: string;
  heroImage: string;
  gallery: string[];
  description: string;
  history: string;
  category: 'safari' | 'beach' | 'rift-valley' | 'adventure';
  // New 2026 pricing and quick decision data
  quickDecision: QuickDecision;
  pricing2026: PricingTier;
  tripCost?: string; // Example trip cost estimate
  parkFees?: string; // Daily park/reserve entry fees
  signatureSighting: string;
  viewingProbability: 'Excellent' | 'Good' | 'Moderate' | 'Rare';
  insiderTip: string;
  wildlife: {
    name: string;
    description: string;
    bestTime: string;
  }[];
  activities: {
    name: string;
    description: string;
    duration: string;
    iconName: string;
    cost?: string; // Activity cost where applicable
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

export const destinationsData: Record<string, DestinationData> = {
  // ==========================================
  // EXISTING DESTINATIONS - ENHANCED
  // ==========================================

  'maasai-mara': {
    slug: 'maasai-mara',
    name: 'Maasai Mara',
    tagline: 'The Crown Jewel of African Safaris',
    heroImage: maraLodge,
    gallery: [maraLions, maraMigration, maraGameDrive, maraBalloon, maraLodge],
    category: 'safari',
    // 2026 Quick Decision & Pricing
    quickDecision: {
      bestTime: 'July–October (Migration), Jan–March (Big Cats)',
      idealFor: 'First-timers, Photographers',
      recommendedStay: '3–4 Nights',
    },
    pricing2026: {
      budget: '$250–$400 pppn',
      midRange: '$500–$850 pppn',
      luxury: '$1,000–$2,500+ pppn',
    },
    tripCost: '7 Days: Budget ~$3,000 | Mid-Range ~$5,500 | Luxury ~$9,000+',
    signatureSighting: 'The Great Wildebeest Migration river crossings (July–Sept)',
    viewingProbability: 'Excellent',
    insiderTip: 'Stay in Mara North or Naboisho conservancies for exclusivity. Conservancy fees are ~$100–$120 pppn.',
    description: 'The Maasai Mara National Reserve is Kenya\'s most famous wildlife destination, renowned for the Great Migration and exceptional big cat sightings. This iconic savannah landscape offers unparalleled wildlife viewing opportunities year-round, with one of the highest predator densities in Africa.',
    history: 'Named after the Maasai people who have lived in the area for centuries and the Mara River that flows through it, the reserve was established in 1961. The name "Mara" means "spotted" in Maasai, referring to the dotted landscape of trees and shadows across the plains. Today, the Maasai Mara is part of the greater Mara-Serengeti ecosystem, one of Earth\'s most spectacular wildlife sanctuaries.',
    wildlife: [
      { name: 'Big Five', description: 'Lion, leopard, elephant, buffalo, and rhino all present in healthy numbers', bestTime: 'Year-round' },
      { name: 'Great Migration', description: '2 million wildebeest and 500,000 zebra cross from Tanzania in dramatic river crossings', bestTime: 'July - October' },
      { name: 'Big Cats', description: 'Highest density of lions in Africa, plus cheetahs and leopards - see kills almost daily', bestTime: 'Year-round' },
      { name: 'Hippos & Crocodiles', description: 'Abundant in the Mara River, especially at crossing points', bestTime: 'Year-round' },
      { name: 'Hyenas', description: 'Large clans of spotted hyenas thrive here', bestTime: 'Year-round' },
      { name: 'African Wild Dogs', description: 'Occasional sightings, especially in conservancies', bestTime: 'Variable' },
    ],
    activities: [
      { name: 'Game Drives', description: 'Morning and evening safaris in 4x4 vehicles through pristine grasslands', duration: '3-4 hours', iconName: 'Car' },
      { name: 'Hot Air Balloon', description: 'Sunrise flight over the savannah with champagne breakfast landing', duration: '4 hours', iconName: 'Plane' },
      { name: 'Maasai Village Visit', description: 'Cultural experience with local community including traditional dances', duration: '2 hours', iconName: 'Users' },
      { name: 'Bush Walks', description: 'Guided walking safaris with armed rangers in conservancies', duration: '2-3 hours', iconName: 'Binoculars' },
      { name: 'Night Safari', description: 'Spotlight drives to see nocturnal wildlife in conservancies', duration: '2-3 hours', iconName: 'Moon' },
      { name: 'Bush Dining', description: 'Romantic dinner under the stars in the wilderness', duration: '3 hours', iconName: 'Utensils' },
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
      { name: 'Governors\' Camp Collection', type: 'Luxury Tented', description: 'Iconic camps along the Mara River with exceptional service', priceRange: '$$$' },
      { name: 'Angama Mara', type: 'Ultra-Luxury', description: 'Perched on the edge of the Great Rift Valley escarpment', priceRange: '$$$' },
      { name: 'Mara Serena Safari Lodge', type: 'Lodge', description: 'Stunning hilltop location with panoramic views', priceRange: '$$' },
      { name: 'Basecamp Masai Mara', type: 'Eco-Lodge', description: 'Award-winning eco-friendly camp run with local community', priceRange: '$$' },
      { name: 'Mara Engai Wilderness Lodge', type: 'Mid-Range', description: 'Great value with excellent game viewing location', priceRange: '$' },
    ],
    tips: [
      'Book accommodations well in advance for migration season (July-October) - lodges fill up 6-12 months ahead',
      'Bring warm layers - mornings and evenings can be surprisingly cold at 1,500m elevation',
      'The Mara Triangle (west side) offers less crowded game viewing than the main reserve',
      'River crossings happen mainly at specific points - guides know the best spots',
      'Conservancies around the reserve offer night drives and walking safaris not allowed in the main park',
    ],
    facts: [
      'Covers 1,510 km² (583 sq mi) of pristine wilderness',
      'Part of the 25,000 km² greater Serengeti-Mara ecosystem',
      'Home to over 95 species of mammals and 450 bird species',
      'Lion population of approximately 850-900 individuals',
      'Wildebeest crossings at the Mara River can see 250,000 animals in a single day',
    ],
    gettingThere: {
      fromNairobi: '270 km, approximately 5-6 hours by road',
      byAir: '45 minutes from Wilson Airport to various Mara airstrips (Keekorok, Musiara, Olare Orok)',
      byRoad: 'Well-maintained tarmac to Narok, then murram roads to the reserve - 4x4 recommended',
    },
  },

  'amboseli': {
    slug: 'amboseli',
    name: 'Amboseli',
    tagline: 'Land of Giants with Kilimanjaro Views',
    heroImage: amboseli,
    gallery: [amboseliElephants, amboseliLodge, amboseli],
    category: 'safari',
    // 2026 Quick Decision & Pricing
    quickDecision: {
      bestTime: 'June–October, Jan–Feb',
      idealFor: 'Elephant lovers, Photographers',
      recommendedStay: '2–3 Nights',
    },
    pricing2026: {
      budget: '$200–$350 pppn',
      midRange: '$450–$700 pppn',
      luxury: '$800–$1,500 pppn',
    },
    tripCost: '3 Days: Budget ~$1,200 | Mid-Range ~$2,200 | Luxury ~$3,500+',
    parkFees: '~$70–$100 per day for international tourists',
    signatureSighting: 'Massive "Tuskers" framed against the snow-capped Mount Kilimanjaro',
    viewingProbability: 'Excellent',
    insiderTip: 'Park entry fees for 2026 are ~$70–$100 per day for international tourists.',
    description: 'Amboseli National Park offers one of Africa\'s most iconic views: large herds of elephants against the backdrop of Mount Kilimanjaro, Africa\'s highest peak. This 392 km² park is renowned for having the best-studied elephant population in the world and some of the largest tuskers in Africa.',
    history: 'Established as a reserve in 1948 and upgraded to national park status in 1974, Amboseli meaning "salty dust" in Maasai refers to the dry conditions. The park has been the subject of the Amboseli Elephant Research Project since 1972, one of the longest-running studies of any wild animal population.',
    wildlife: [
      { name: 'Elephants', description: 'Over 1,600 elephants, including famous big tuskers like Tim', bestTime: 'Year-round' },
      { name: 'Lions & Cheetahs', description: 'Good populations across the plains, often with Kilimanjaro backdrop', bestTime: 'Dry season' },
      { name: 'Hippos', description: 'Found in the permanent swamps fed by Kilimanjaro\'s snowmelt', bestTime: 'Year-round' },
      { name: 'Birds', description: 'Over 400 species including pelicans, flamingos, and martial eagles', bestTime: 'November - April' },
      { name: 'Wildebeest & Zebra', description: 'Large herds especially in the green season', bestTime: 'November - May' },
      { name: 'Spotted Hyena', description: 'Active predators often seen at dusk', bestTime: 'Year-round' },
    ],
    activities: [
      { name: 'Game Drives', description: 'Best at dawn for clear Kilimanjaro views and active wildlife', duration: '3-4 hours', iconName: 'Car' },
      { name: 'Observation Hill', description: 'Climb for panoramic views of the park, swamps, and Kilimanjaro', duration: '1 hour', iconName: 'Binoculars' },
      { name: 'Maasai Village', description: 'Cultural visits to nearby communities with traditional crafts', duration: '2 hours', iconName: 'Users' },
      { name: 'Bird Watching', description: 'Excellent opportunities in swamps - 400+ species recorded', duration: '2-3 hours', iconName: 'Camera' },
      { name: 'Sundowner Drinks', description: 'Evening drinks with Kilimanjaro views as the sun sets', duration: '2 hours', iconName: 'Sun' },
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
      { name: 'Tortilis Camp', type: 'Luxury Tented', description: 'Exclusive camp with stunning unobstructed Kilimanjaro views', priceRange: '$$$' },
      { name: 'Elewana Tortilis', type: 'Luxury', description: 'Award-winning camp in private conservancy', priceRange: '$$$' },
      { name: 'Amboseli Serena Safari Lodge', type: 'Lodge', description: 'Award-winning lodge with excellent service and location', priceRange: '$$' },
      { name: 'Ol Tukai Lodge', type: 'Lodge', description: 'Classic lodge in heart of the park with elephant visits', priceRange: '$$' },
      { name: 'Kibo Safari Camp', type: 'Tented', description: 'Great value tented camp outside the park', priceRange: '$' },
    ],
    tips: [
      'Visit in dry season (June-October) for best Kilimanjaro views - clouds often obscure it by midday',
      'Early morning game drives (6am start) offer the clearest mountain views and best light',
      'The park can get very dusty - bring eye drops, sunglasses, and camera lens cleaning kit',
      'Observation Hill offers the best panoramic photography spots in the entire park',
      'The Amboseli elephants are exceptionally habituated and tolerant of vehicles',
    ],
    facts: [
      'Home to over 1,600 elephants, some with tusks weighing over 100 lbs each',
      'Mount Kilimanjaro is 5,895m tall - Africa\'s highest peak, visible from the park',
      'The park\'s permanent swamps are fed by underground rivers from Kilimanjaro\'s melting snow',
      'The Amboseli Elephant Research Project has individually identified over 3,000 elephants',
      'Featured in many wildlife documentaries including BBC\'s "Echo of the Elephants"',
    ],
    gettingThere: {
      fromNairobi: '240 km, approximately 4-5 hours by road via Namanga',
      byAir: '45 minutes from Wilson Airport to Amboseli airstrip',
      byRoad: 'Via Namanga road, well-maintained tarmac with views of Kilimanjaro en route',
    },
  },

  'samburu': {
    slug: 'samburu',
    name: 'Samburu',
    tagline: 'The Arid Frontier',
    heroImage: samburu,
    gallery: [samburuWildlife, samburuCulture, samburuRiver, samburu],
    category: 'safari',
    // 2026 Quick Decision & Pricing
    quickDecision: {
      bestTime: 'June–October, Dec–March',
      idealFor: 'Seasoned safari-goers',
      recommendedStay: '2–3 Nights',
    },
    pricing2026: {
      budget: '$180–$300 pppn',
      midRange: '$400–$650 pppn',
      luxury: '$750–$1,400 pppn',
    },
    tripCost: '3 Days: Budget ~$1,100 | Mid-Range ~$2,000 | Luxury ~$3,200+',
    parkFees: '~$70–$90 per day',
    signatureSighting: 'The Gerenuk standing on its hind legs to reach acacia leaves',
    viewingProbability: 'Good',
    insiderTip: 'Reserve entry fees are ~$70–$90 per day. Fly-in options from Nairobi cost ~$150–$280 one-way.',
    description: 'Samburu National Reserve offers a unique safari experience with species found nowhere else in Kenya. The rugged, semi-arid landscape along the Ewaso Ng\'iro River is home to the famous "Samburu Special Five" - rare animals adapted to this dramatic northern terrain.',
    history: 'Named after the Samburu people, close relatives of the Maasai, the reserve was established in 1985. The Samburu culture remains vibrant, with traditional warriors still practicing age-old customs. The area is also linked to the Shaba and Buffalo Springs reserves, creating a larger wildlife ecosystem.',
    wildlife: [
      { name: 'Samburu Special Five', description: 'Grevy\'s zebra, reticulated giraffe, Somali ostrich, gerenuk, beisa oryx - found only here', bestTime: 'Year-round' },
      { name: 'Elephants', description: 'Large herds congregate along the Ewaso Ng\'iro River', bestTime: 'Dry season' },
      { name: 'Leopards', description: 'Excellent sightings along the riverine forest - some of Kenya\'s most relaxed leopards', bestTime: 'Year-round' },
      { name: 'African Wild Dogs', description: 'Occasional sightings - one of the best places in Kenya', bestTime: 'Variable' },
      { name: 'Lions', description: 'Several prides including black-maned individuals', bestTime: 'Year-round' },
      { name: 'Crocodiles', description: 'Large Nile crocodiles in the Ewaso Ng\'iro River', bestTime: 'Year-round' },
    ],
    activities: [
      { name: 'Game Drives', description: 'Focus on unique northern species in dramatic arid landscapes', duration: '3-4 hours', iconName: 'Car' },
      { name: 'Samburu Village', description: 'Cultural immersion with warriors, traditional dances, and crafts', duration: '2-3 hours', iconName: 'Users' },
      { name: 'Sundowners', description: 'Evening drinks on the riverbank with stunning views', duration: '2 hours', iconName: 'Sun' },
      { name: 'Camel Safaris', description: 'Unique way to explore the bush with Samburu guides', duration: 'Half day', iconName: 'Binoculars' },
      { name: 'Night Drives', description: 'Search for nocturnal predators in some lodges', duration: '2-3 hours', iconName: 'Moon' },
      { name: 'Walking Safaris', description: 'Guided walks with Samburu warriors', duration: '2-3 hours', iconName: 'Footprints' },
    ],
    bestTime: {
      peak: ['July', 'August', 'September', 'October'],
      good: ['January', 'February', 'June', 'December'],
      low: ['March', 'April', 'May', 'November'],
    },
    weather: {
      dry: 'June to October, December to March',
      wet: 'March to May, October to November',
      temp: '21°C - 38°C (70°F - 100°F) - one of Kenya\'s hottest parks',
    },
    lodges: [
      { name: 'Saruni Samburu', type: 'Luxury Lodge', description: 'Award-winning lodge with infinity pool overlooking waterhole', priceRange: '$$$' },
      { name: 'Elephant Bedroom Camp', type: 'Luxury Tented', description: 'Intimate camp directly on the river', priceRange: '$$$' },
      { name: 'Sasaab', type: 'Ultra-Luxury', description: 'Moroccan-styled luxury overlooking the plains', priceRange: '$$$' },
      { name: 'Samburu Intrepids', type: 'Tented', description: 'Riverside tented camp with pool', priceRange: '$$' },
      { name: 'Samburu Game Lodge', type: 'Lodge', description: 'Classic lodge with great value and crocodile feeding', priceRange: '$' },
    ],
    tips: [
      'Pack light-colored clothing for the intense heat - temperatures can exceed 40°C',
      'The river attracts wildlife all day - stay near it for best sightings',
      'Samburu culture is fascinating - engage respectfully and tip fairly for photos',
      'This is malaria country - take prophylaxis and use insect repellent',
      'Combine with Buffalo Springs and Shaba reserves for complete experience',
    ],
    facts: [
      'Home to the only wild population of Grevy\'s zebra in Kenya (fewer than 3,000 left worldwide)',
      'The Ewaso Ng\'iro River ("brown water") never dries completely, sustaining wildlife year-round',
      'Reticulated giraffes have the most beautiful geometric coat patterns of all giraffe species',
      'Gerenuk (giraffe gazelle) stand upright on hind legs to browse - unique behavior',
      'Samburu warriors still practice traditional customs including cattle herding and lion-hunting ceremonies',
    ],
    gettingThere: {
      fromNairobi: '350 km, approximately 5-6 hours by road via Nanyuki',
      byAir: '1 hour from Wilson Airport to Samburu airstrip',
      byRoad: 'Via Isiolo, mostly tarmac with some murram sections - 4x4 recommended',
    },
  },

  'lake-naivasha': {
    slug: 'lake-naivasha',
    name: 'Lake Naivasha',
    tagline: 'The Serene Freshwater Oasis',
    heroImage: naivasha,
    gallery: [naivashaHippos, naivashaBoat, naivashaWildlife, naivasha],
    category: 'rift-valley',
    // 2026 Quick Decision & Pricing
    quickDecision: {
      bestTime: 'Year-round',
      idealFor: 'Birders, Weekend escapes',
      recommendedStay: '1–2 Nights',
    },
    pricing2026: {
      budget: '$100–$200 pppn',
      midRange: '$250–$450 pppn',
      luxury: '$500–$900 pppn',
    },
    signatureSighting: 'Fish Eagles diving for prey against the Rift Valley backdrop',
    viewingProbability: 'Excellent',
    insiderTip: 'Combine with a cycling trip to Hell\'s Gate ($30 entry + $10 bike hire).',
    description: 'Lake Naivasha is a stunning freshwater lake in Kenya\'s Great Rift Valley, known for its abundant birdlife, large hippo population, and the dramatic nearby Hell\'s Gate National Park. It offers a unique blend of water-based safaris and adventure activities.',
    history: 'The lake\'s name comes from the Maasai word "nai\'posha" meaning "rough water" due to sudden storms. It has been a hub for Kenya\'s world-famous flower industry and provides a peaceful escape just 90km from Nairobi. The area was once home to early colonial settlers and adventurers.',
    wildlife: [
      { name: 'Hippos', description: 'Large pods of 30-50 hippos visible during boat rides', bestTime: 'Year-round' },
      { name: 'Birds', description: 'Over 400 species including African fish eagles, pelicans, and cormorants', bestTime: 'November - April' },
      { name: 'Giraffes & Zebras', description: 'Walk freely on Crescent Island sanctuary', bestTime: 'Year-round' },
      { name: 'Buffalos', description: 'Often seen grazing along the lake shore', bestTime: 'Year-round' },
      { name: 'Colobus Monkeys', description: 'Black and white colobus in lakeside forests', bestTime: 'Year-round' },
      { name: 'Waterbuck', description: 'Common around the lake shores and Crescent Island', bestTime: 'Year-round' },
    ],
    activities: [
      { name: 'Boat Safari', description: 'See hippos, fish eagles, and papyrus beds up close', duration: '2 hours', iconName: 'Binoculars', cost: '~$20–$40 pp' },
      { name: 'Hell\'s Gate Cycling', description: 'Cycle among wildlife, gorges, and geothermal vents', duration: '3-4 hours', iconName: 'Bike', cost: '$30 entry + $10 bike hire' },
      { name: 'Crescent Island Walk', description: 'Walk among zebras, giraffes, and wildebeest - no predators', duration: '2 hours', iconName: 'Footprints', cost: '~$30–$50 pp' },
      { name: 'Bird Watching', description: 'World-class birding with 400+ species recorded', duration: '2-3 hours', iconName: 'Camera' },
      { name: 'Geothermal Spa', description: 'Natural hot springs and spa experience at Olkaria', duration: '2-3 hours', iconName: 'Sun' },
      { name: 'Rock Climbing', description: 'Climb Fischer\'s Tower and Hell\'s Gate gorges', duration: 'Half day', iconName: 'Mountain' },
    ],
    bestTime: {
      peak: ['June', 'July', 'August', 'September'],
      good: ['January', 'February', 'October', 'November', 'December'],
      low: ['March', 'April', 'May'],
    },
    weather: {
      dry: 'June to September, December to March',
      wet: 'March to May, October to November',
      temp: '8°C - 25°C (46°F - 77°F) - cool due to elevation',
    },
    lodges: [
      { name: 'Loldia House', type: 'Boutique', description: 'Historic 1920s farmhouse on the lake with incredible gardens', priceRange: '$$$' },
      { name: 'Great Rift Valley Lodge', type: 'Resort', description: 'Golf resort with stunning Rift Valley views', priceRange: '$$$' },
      { name: 'Lake Naivasha Sopa Resort', type: 'Resort', description: 'Large resort with pool and lakefront location', priceRange: '$$' },
      { name: 'Naivasha Kongoni Lodge', type: 'Lodge', description: 'Peaceful lodge with beautiful lake views', priceRange: '$$' },
      { name: 'Camp Carnelley\'s', type: 'Camp', description: 'Lakeside camping, bandas, and budget rooms', priceRange: '$' },
    ],
    tips: [
      'Book boat safaris for early morning (6-7am) - best light and most active hippos',
      'Bring layers - the lake area can be surprisingly cool at 1,884m elevation',
      'Combine with Hell\'s Gate National Park for cycling among zebras and giraffes',
      'Watch for African fish eagles - they\'re spectacular hunters and often catch fish on cue',
      'Crescent Island is perfect for walking safaris with children - completely safe',
    ],
    facts: [
      'The lake sits at 1,884m elevation in the Great Rift Valley',
      'One of only two freshwater lakes in Kenya\'s Rift Valley (the other is Baringo)',
      'Major hub for Kenya\'s $1 billion flower export industry - roses to Europe',
      'Hell\'s Gate\'s dramatic gorges inspired parts of Disney\'s "The Lion King"',
      'Joy Adamson (of "Born Free" fame) once lived at Elsamere on the lake shore',
    ],
    gettingThere: {
      fromNairobi: '90 km, approximately 1.5-2 hours by road - perfect day trip',
      byAir: 'No regular flights, but helicopter charters available',
      byRoad: 'Via the Nairobi-Nakuru highway (A104), excellent tarmac all the way',
    },
  },

  'diani-beach': {
    slug: 'diani-beach',
    name: 'Diani Beach',
    tagline: 'The Pristine Swahili Coast',
    heroImage: dianiBeach,
    gallery: [dianiOcean, dianiResort, dianiSnorkeling, dianiBeach],
    category: 'beach',
    // 2026 Quick Decision & Pricing
    quickDecision: {
      bestTime: 'Dec–March, July–October',
      idealFor: 'Honeymooners',
      recommendedStay: '4–7 Nights',
    },
    pricing2026: {
      budget: '$80–$150 pppn',
      midRange: '$200–$450 pppn',
      luxury: '$600–$1,500+ pppn',
    },
    signatureSighting: 'Whale Sharks (seasonal, Nov–Feb) and vibrant coral reefs',
    viewingProbability: 'Good',
    insiderTip: 'All-inclusive resorts offer the best value for mid-range travelers (~$250 pppn).',
    description: 'Diani Beach is Kenya\'s premier beach destination, featuring 17km of pristine white sands, turquoise waters, and vibrant coral reefs. Perfect for combining a safari adventure with a relaxing beach holiday, offering world-class diving, water sports, and Swahili coastal culture.',
    history: 'The area has been a trading post for centuries, with Arab, Portuguese, and Swahili influences visible in the nearby old town of Mombasa. The name "Diani" comes from the Digo people who inhabited the area. Today, it\'s East Africa\'s most popular beach resort area, consistently voted Africa\'s Leading Beach Destination.',
    wildlife: [
      { name: 'Marine Life', description: 'Dolphins, sea turtles, and whale sharks (seasonal)', bestTime: 'Year-round' },
      { name: 'Colobus Monkeys', description: 'Endangered Angolan colobus live in the coastal forest', bestTime: 'Year-round' },
      { name: 'Coral Reef Fish', description: 'Hundreds of colorful tropical species on the reef', bestTime: 'October - March' },
      { name: 'Whale Sharks', description: 'The world\'s largest fish visits seasonally', bestTime: 'October - March' },
      { name: 'Dolphins', description: 'Pod of 200+ spinner and bottlenose dolphins', bestTime: 'Year-round' },
      { name: 'Sea Turtles', description: 'Green and hawksbill turtles nest on the beaches', bestTime: 'Year-round' },
    ],
    activities: [
      { name: 'Snorkeling', description: 'Explore vibrant coral reefs teeming with tropical fish', duration: '2-3 hours', iconName: 'Camera', cost: '~$50–$100 pp' },
      { name: 'Scuba Diving', description: 'Discover underwater caves, wrecks, and pristine reefs', duration: 'Half day', iconName: 'Binoculars' },
      { name: 'Kite Surfing', description: 'World-class conditions with consistent winds', duration: '2-3 hours', iconName: 'Wind' },
      { name: 'Shimba Hills Safari', description: 'Day trip to see sable antelope and elephants', duration: 'Full day', iconName: 'Car' },
      { name: 'Kisite Marine Park', description: 'Snorkel with dolphins in protected marine reserve', duration: 'Full day', iconName: 'Fish' },
      { name: 'Skydiving', description: 'Tandem skydiving with coastal views', duration: '2 hours', iconName: 'Plane', cost: '~$400 pp' },
      { name: 'Dhow Cruise', description: 'Traditional sailing boat sunset cruise', duration: '3 hours', iconName: 'Ship' },
    ],
    bestTime: {
      peak: ['December', 'January', 'February', 'March'],
      good: ['June', 'July', 'August', 'September', 'October'],
      low: ['April', 'May', 'November'],
    },
    weather: {
      dry: 'December to March, June to October',
      wet: 'April to May (long rains), November (short rains)',
      temp: '22°C - 33°C (72°F - 91°F) - warm and tropical year-round',
    },
    lodges: [
      { name: 'The Sands at Nomad', type: 'Boutique', description: 'Intimate barefoot-luxury beachfront hotel', priceRange: '$$$' },
      { name: 'Almanara Luxury Villas', type: 'Villa', description: 'Exclusive private villas with personal chefs', priceRange: '$$$' },
      { name: 'Diani Reef Beach Resort', type: 'Resort', description: 'All-inclusive beachfront resort with water sports', priceRange: '$$' },
      { name: 'Leopard Beach Resort', type: 'Resort', description: 'Popular family-friendly resort with great pool', priceRange: '$$' },
      { name: 'Diani Backpackers', type: 'Budget', description: 'Great value beach accommodation with pool', priceRange: '$' },
    ],
    tips: [
      'The best swimming is at high tide when water is deep over the reef',
      'Book dolphin tours for early morning when seas are calmest',
      'Try the local Swahili cuisine - especially grilled seafood and coconut dishes',
      'Visit the Colobus Conservation center to learn about monkey protection efforts',
      'Kisite-Mpunguti Marine Park (south) offers the best snorkeling in Kenya',
    ],
    facts: [
      'Voted Africa\'s Leading Beach Destination at World Travel Awards multiple times',
      '17 km of pristine white sand beach protected by a coral reef',
      'Protected by reef - calm, safe swimming with minimal currents',
      'Home to Kenya\'s only population of endangered Angolan colobus monkeys',
      'Water temperature averages 26-28°C (79-82°F) year-round - perfect for swimming',
    ],
    gettingThere: {
      fromNairobi: '500 km, approximately 8 hours by road or 1 hour by air',
      byAir: 'Fly to Ukunda airstrip (10 min from beach) or Mombasa airport (45 min drive)',
      byRoad: 'Via Mombasa and the Likoni ferry or new Dongo Kundu bypass bridge',
    },
  },

  // ==========================================
  // NEW DESTINATIONS
  // ==========================================

  'tsavo': {
    slug: 'tsavo',
    name: 'Tsavo',
    tagline: 'The Theater of the Wild',
    heroImage: tsavo,
    gallery: [tsavo],
    category: 'safari',
    // 2026 Quick Decision & Pricing
    quickDecision: {
      bestTime: 'June–October, Jan–Feb',
      idealFor: 'Adventure seekers',
      recommendedStay: '3–4 Nights',
    },
    pricing2026: {
      budget: '$150–$280 pppn',
      midRange: '$350–$600 pppn',
      luxury: '$700–$1,300 pppn',
    },
    tripCost: '4 Days: Budget ~$1,400 | Mid-Range ~$2,500 | Luxury ~$4,000+',
    parkFees: '~$80 per day',
    signatureSighting: 'Red-dusted elephants bathing in the Galana River or Mzima Springs',
    viewingProbability: 'Good',
    insiderTip: 'Park entry fees are ~$80 per day. Tsavo West is more scenic; Tsavo East has better visibility.',
    description: 'Tsavo is Kenya\'s largest protected area, comprising Tsavo East and Tsavo West national parks covering over 20,000 km². This vast wilderness is famous for its red elephants (dusted with the distinctive red soil), the Man-Eaters of Tsavo legend, and dramatic volcanic landscapes including the Shetani Lava Flow.',
    history: 'The parks were established in 1948 and named after the Tsavo River. Tsavo gained international notoriety in 1898 when two maneless lions killed 135 railway workers during the construction of the Kenya-Uganda Railway. The "Man-Eaters of Tsavo" story was immortalized in the film "The Ghost and the Darkness." Today, the parks protect one of Africa\'s largest elephant populations.',
    wildlife: [
      { name: 'Red Elephants', description: 'Over 12,000 elephants, famous for their red dust-covered appearance', bestTime: 'Dry season' },
      { name: 'Lions', description: 'Maneless lions unique to Tsavo, descendants of the famous man-eaters', bestTime: 'Year-round' },
      { name: 'Black Rhino', description: 'Rhino Valley sanctuary in Tsavo West protects endangered rhinos', bestTime: 'Year-round' },
      { name: 'Hippos at Mzima Springs', description: 'Crystal-clear underwater viewing of hippos and fish', bestTime: 'Year-round' },
      { name: 'Lesser Kudu', description: 'Beautiful striped antelope found in Tsavo\'s thick bush', bestTime: 'Year-round' },
      { name: 'Crocodiles', description: 'Giant Nile crocodiles at Mzima Springs and rivers', bestTime: 'Year-round' },
    ],
    activities: [
      { name: 'Game Drives', description: 'Explore vast plains and volcanic landscapes', duration: '4-6 hours', iconName: 'Car' },
      { name: 'Mzima Springs', description: 'Underwater hippo viewing through glass observation chamber', duration: '2 hours', iconName: 'Fish' },
      { name: 'Shetani Lava Flow', description: 'Walk on 500-year-old volcanic lava fields', duration: '2 hours', iconName: 'Mountain' },
      { name: 'Rhino Tracking', description: 'Track endangered black rhinos in sanctuary area', duration: 'Half day', iconName: 'Binoculars' },
      { name: 'Lumo Conservancy', description: 'Night drives and walking safaris in community area', duration: '3-4 hours', iconName: 'Moon' },
      { name: 'Ngulia Rhino Sanctuary', description: 'Visit protected breeding area for black rhinos', duration: '3 hours', iconName: 'Shield' },
    ],
    bestTime: {
      peak: ['June', 'July', 'August', 'September', 'October'],
      good: ['January', 'February', 'November', 'December'],
      low: ['March', 'April', 'May'],
    },
    weather: {
      dry: 'June to October, January to February',
      wet: 'March to May (long rains), November to December (short rains)',
      temp: '25°C - 38°C (77°F - 100°F) - hot and semi-arid',
    },
    lodges: [
      { name: 'Finch Hattons', type: 'Ultra-Luxury', description: '1920s safari elegance at Tsavo West\'s springs', priceRange: '$$$' },
      { name: 'Kilaguni Serena Safari Lodge', type: 'Lodge', description: 'Historic lodge overlooking waterhole', priceRange: '$$' },
      { name: 'Satao Camp', type: 'Luxury Tented', description: 'Elephant-focused camp with waterhole views', priceRange: '$$$' },
      { name: 'Voi Safari Lodge', type: 'Lodge', description: 'Clifftop lodge with panoramic views', priceRange: '$$' },
      { name: 'Ngutuni Lodge', type: 'Budget Lodge', description: 'Great value with excellent wildlife', priceRange: '$' },
    ],
    tips: [
      'Tsavo is massive - pick either East or West rather than trying to see both in one trip',
      'Tsavo West has more scenic variety (lava, Mzima Springs); East is better for big elephant herds',
      'The red dust can be harsh - bring sunglasses and protect camera equipment',
      'Visit Mzima Springs early morning before the hippos go underwater for the day',
      'Perfect stopover between Nairobi and Mombasa coast',
    ],
    facts: [
      'Combined parks cover 22,000 km² - larger than Wales or New Jersey',
      'Home to approximately 12,000 elephants - one of Africa\'s largest populations',
      'The Man-Eaters of Tsavo killed 135 workers in 1898 - lions now displayed at Chicago Field Museum',
      'Shetani Lava Flow is only 500 years old - Maasai named it "devil" for its black appearance',
      'Mzima Springs produces 250 million liters of crystal-clear water daily from volcanic filtration',
    ],
    gettingThere: {
      fromNairobi: '230 km to Mtito Andei gate, approximately 4 hours by road',
      byAir: '1 hour from Wilson Airport to several airstrips (Satao, Finch Hattons)',
      byRoad: 'Excellent tarmac on Nairobi-Mombasa highway runs through Tsavo',
    },
  },

  'laikipia': {
    slug: 'laikipia',
    name: 'Laikipia Plateau',
    tagline: 'The Conservation Frontier',
    heroImage: laikipia,
    gallery: [laikipia],
    category: 'safari',
    // 2026 Quick Decision & Pricing
    quickDecision: {
      bestTime: 'June–October, Dec–March',
      idealFor: 'Conservationists',
      recommendedStay: '3–4 Nights',
    },
    pricing2026: {
      budget: '$250–$450 pppn',
      midRange: '$550–$900 pppn',
      luxury: '$1,200–$3,000+ pppn',
    },
    tripCost: '4 Days: Budget ~$1,800 | Mid-Range ~$3,500 | Luxury ~$6,500+',
    signatureSighting: 'The last two Northern White Rhinos at Ol Pejeta Conservancy',
    viewingProbability: 'Excellent',
    insiderTip: 'Private conservancy fees (e.g., Lewa, Ol Pejeta) range from $100–$150 pppn.',
    description: 'The Laikipia Plateau is Kenya\'s premier conservation destination and a remarkable success story of community and private conservancies working together. This vast mosaic of ranches and wildlife sanctuaries has the second-highest wildlife density in Kenya after the Maasai Mara, including the last viable population of African wild dogs.',
    history: 'Laikipia\'s conservation model evolved from colonial-era cattle ranches in the 1970s-80s when landowners began integrating wildlife with livestock. Today, the Laikipia ecosystem covers over 9,500 km² of mixed-use land where cattle, people, and wildlife coexist. It\'s home to Ol Pejeta Conservancy, the largest black rhino sanctuary in East Africa.',
    wildlife: [
      { name: 'African Wild Dogs', description: 'Kenya\'s last refuge for endangered painted wolves', bestTime: 'Year-round' },
      { name: 'Black & White Rhinos', description: 'Ol Pejeta has the largest black rhino population in East Africa', bestTime: 'Year-round' },
      { name: 'Big Five', description: 'All Big Five present including strong lion and elephant populations', bestTime: 'Year-round' },
      { name: 'Grevy\'s Zebra', description: 'Significant population of this endangered species', bestTime: 'Year-round' },
      { name: 'Reticulated Giraffe', description: 'Beautiful northern species with geometric patterns', bestTime: 'Year-round' },
      { name: 'Chimpanzees', description: 'Ol Pejeta\'s sanctuary houses rescued chimps', bestTime: 'Year-round' },
    ],
    activities: [
      { name: 'Walking Safaris', description: 'Premium walking experiences with armed guides', duration: '3-4 hours', iconName: 'Footprints' },
      { name: 'Night Drives', description: 'Search for nocturnal predators including leopards', duration: '2-3 hours', iconName: 'Moon' },
      { name: 'Rhino Tracking', description: 'Track endangered rhinos on foot with rangers', duration: 'Half day', iconName: 'Binoculars' },
      { name: 'Horseback Safaris', description: 'Ride among wildlife on scenic trails', duration: '2-4 hours', iconName: 'Horse' },
      { name: 'Chimp Sanctuary Visit', description: 'Meet rescued chimpanzees at Ol Pejeta', duration: '2 hours', iconName: 'Users' },
      { name: 'Community Visits', description: 'Learn about conservation partnerships with local communities', duration: '2 hours', iconName: 'Home' },
    ],
    bestTime: {
      peak: ['July', 'August', 'September', 'October'],
      good: ['January', 'February', 'June', 'November', 'December'],
      low: ['March', 'April', 'May'],
    },
    weather: {
      dry: 'June to October, December to March',
      wet: 'March to May, November',
      temp: '14°C - 28°C (57°F - 82°F) - cooler due to elevation',
    },
    lodges: [
      { name: 'Segera Retreat', type: 'Ultra-Luxury', description: 'Art-filled eco-retreat with exceptional guiding', priceRange: '$$$' },
      { name: 'Ol Pejeta Bush Camp', type: 'Luxury Tented', description: 'Intimate camp in famous rhino conservancy', priceRange: '$$$' },
      { name: 'Lewa Safari Camp', type: 'Luxury', description: 'Award-winning camp in Lewa Conservancy', priceRange: '$$$' },
      { name: 'Borana Lodge', type: 'Luxury', description: 'Stunning clifftop views overlooking Mount Kenya', priceRange: '$$$' },
      { name: 'Sweetwaters Serena', type: 'Lodge', description: 'Large camp with chimpanzee sanctuary access', priceRange: '$$' },
    ],
    tips: [
      'Book well in advance - Laikipia lodges are small and exclusive with high demand',
      'This is the best place in Kenya for walking safaris and horse riding safaris',
      'Ol Pejeta is home to the last two northern white rhinos in the world',
      'Night drives here are exceptional - high chance of seeing leopards and rare species',
      'Conservation fees directly support community and wildlife protection programs',
    ],
    facts: [
      'Second-highest wildlife concentration in Kenya after Maasai Mara',
      'Home to 50% of Kenya\'s black rhino population',
      'Last viable population of African wild dogs in Kenya lives here',
      'The Laikipia model of community conservation is studied worldwide',
      'Ol Pejeta houses the last 2 northern white rhinos left on Earth',
    ],
    gettingThere: {
      fromNairobi: '250-350 km depending on conservancy, approximately 4-5 hours by road',
      byAir: '45-60 minutes from Wilson Airport to various conservancy airstrips',
      byRoad: 'Via Nanyuki on good tarmac roads, then gravel roads to conservancies',
    },
  },

  'lake-nakuru': {
    slug: 'lake-nakuru',
    name: 'Lake Nakuru',
    tagline: 'The Birdwatcher\'s Paradise',
    heroImage: lakeNakuru,
    gallery: [lakeNakuru],
    category: 'rift-valley',
    // 2026 Quick Decision & Pricing
    quickDecision: {
      bestTime: 'June–March',
      idealFor: 'Bird watchers, Rhino enthusiasts',
      recommendedStay: '1–2 Nights',
    },
    pricing2026: {
      budget: '$150–$250 pppn',
      midRange: '$300–$550 pppn',
      luxury: '$600–$1,000 pppn',
    },
    parkFees: '~$70–$100 per day for international tourists',
    signatureSighting: 'A "pink lake" created by thousands of flamingos',
    viewingProbability: 'Excellent',
    insiderTip: 'One of the most reliable places to see Black Rhinos in Kenya.',
    description: 'Lake Nakuru National Park is a compact gem in Kenya\'s Great Rift Valley, famous for its spectacular flamingo gatherings, successful rhino sanctuary, and easy accessibility from Nairobi. The park\'s diverse habitats support an incredible variety of wildlife including the endangered Rothschild\'s giraffe.',
    history: 'Lake Nakuru was designated a national park in 1961, initially to protect the flamingos and aquatic environment. In the 1980s, it became a rhino sanctuary and has been crucial in rebuilding Kenya\'s rhino population. The lake\'s alkaline waters support massive algae blooms that attract millions of flamingos seasonally.',
    wildlife: [
      { name: 'Flamingos', description: 'Up to 2 million lesser and greater flamingos turn the lake pink', bestTime: 'Variable - depends on water levels' },
      { name: 'Both Rhino Species', description: 'Black and white rhinos in fenced sanctuary area', bestTime: 'Year-round' },
      { name: 'Rothschild\'s Giraffe', description: 'Endangered subspecies with distinct markings', bestTime: 'Year-round' },
      { name: 'Lions & Leopards', description: 'Tree-climbing lions and leopards in forested areas', bestTime: 'Year-round' },
      { name: 'Pelicans', description: 'Great white pelicans in large flocks', bestTime: 'Year-round' },
      { name: 'Waterbuck & Buffalo', description: 'Large herds throughout the park', bestTime: 'Year-round' },
    ],
    activities: [
      { name: 'Game Drives', description: 'Circuit drives around the lake with diverse habitats', duration: '3-4 hours', iconName: 'Car' },
      { name: 'Rhino Tracking', description: 'Search for both black and white rhinos', duration: '2-3 hours', iconName: 'Binoculars' },
      { name: 'Baboon Cliff Viewpoint', description: 'Panoramic views over the entire lake and park', duration: '1 hour', iconName: 'Mountain' },
      { name: 'Bird Watching', description: 'Over 450 species recorded - exceptional diversity', duration: '2-3 hours', iconName: 'Camera' },
      { name: 'Makalia Falls', description: 'Scenic waterfall in the park\'s southern section', duration: '2 hours', iconName: 'Droplets' },
      { name: 'Night Game Drives', description: 'Spotlighting for nocturnal species (some lodges)', duration: '2 hours', iconName: 'Moon' },
    ],
    bestTime: {
      peak: ['June', 'July', 'August', 'September'],
      good: ['January', 'February', 'October', 'November', 'December'],
      low: ['March', 'April', 'May'],
    },
    weather: {
      dry: 'June to September, December to March',
      wet: 'March to May, October to November',
      temp: '11°C - 28°C (52°F - 82°F) - pleasant highland climate',
    },
    lodges: [
      { name: 'Lake Nakuru Sopa Lodge', type: 'Lodge', description: 'Hilltop lodge with stunning lake views', priceRange: '$$' },
      { name: 'Sarova Lion Hill', type: 'Lodge', description: 'Classic lodge with excellent rhino sightings', priceRange: '$$' },
      { name: 'Flamingo Hill Camp', type: 'Tented', description: 'Luxury tents with waterhole views', priceRange: '$$' },
      { name: 'Lake Nakuru Lodge', type: 'Lodge', description: 'Historic lodge near the lake shore', priceRange: '$$' },
      { name: 'Mbweha Camp', type: 'Boutique', description: 'Intimate camp on the escarpment', priceRange: '$$' },
    ],
    tips: [
      'Flamingo numbers vary dramatically with water levels - check recent reports before visiting',
      'The park is fully fenced, making rhino sightings very reliable',
      'Perfect for a day trip from Nairobi or as part of a Rift Valley circuit',
      'Baboon Cliff at sunset offers spectacular photography opportunities',
      'Combine with Lake Naivasha and Hell\'s Gate for a complete Rift Valley experience',
    ],
    facts: [
      'Home to over 450 bird species - one of the highest diversities in Africa',
      'The park covers just 188 km² but has incredible wildlife density',
      'Lake Nakuru is one of the Rift Valley\'s soda (alkaline) lakes',
      'The rhino sanctuary has helped increase Kenya\'s rhino population significantly',
      'Rothschild\'s giraffe here are a vital insurance population for the species',
    ],
    gettingThere: {
      fromNairobi: '160 km, approximately 2.5-3 hours by road',
      byAir: 'No regular flights - road access is easy and scenic',
      byRoad: 'Via the Nairobi-Nakuru highway (A104), excellent tarmac all the way',
    },
  },

  'mount-kenya': {
    slug: 'mount-kenya',
    name: 'Mount Kenya',
    tagline: 'The Celestial Peak',
    heroImage: mountKenya,
    gallery: [mountKenya],
    category: 'adventure',
    // 2026 Quick Decision & Pricing
    quickDecision: {
      bestTime: 'Jan–March, July–October',
      idealFor: 'Trekkers',
      recommendedStay: '4–6 Nights',
    },
    pricing2026: {
      budget: '$150–$250 pppn',
      midRange: '$300–$500 pppn',
      luxury: '$600–$1,000 pppn',
    },
    tripCost: 'Standard Trek: $850–$1,200 (4–5 days) | Luxury Trek: $1,500–$2,500 (6 days)',
    parkFees: '~$52 per day for international adults',
    signatureSighting: 'Sunrise from Point Lenana (4,985m)',
    viewingProbability: 'Rare',
    insiderTip: 'The Sirimon-Chogoria Traverse is the most scenic route ($1,100–$1,600 avg).',
    description: 'Mount Kenya is Africa\'s second-highest mountain and a UNESCO World Heritage Site, offering dramatic scenery from glaciers to tropical rainforests. The Mount Kenya National Park protects diverse ecosystems and unique wildlife while providing trekking adventures for all skill levels.',
    history: 'Called "Kirinyaga" (mountain of whiteness) by the Kikuyu people, Mount Kenya has been sacred for centuries. The first European to reach the summit was Halford Mackinder in 1899. The national park was established in 1949 and declared a UNESCO World Heritage Site in 1997 for its outstanding natural beauty and ecological importance.',
    wildlife: [
      { name: 'Elephants', description: 'Forest elephants with straighter tusks in the lower slopes', bestTime: 'Year-round' },
      { name: 'Buffalo', description: 'Large herds in the bamboo and forest zones', bestTime: 'Year-round' },
      { name: 'Black Leopard', description: 'Rare melanistic leopards reported on Mount Kenya', bestTime: 'Year-round' },
      { name: 'Giant Forest Hog', description: 'World\'s largest wild pig in the forest zone', bestTime: 'Year-round' },
      { name: 'Colobus Monkeys', description: 'Black and white colobus in the forest canopy', bestTime: 'Year-round' },
      { name: 'Alpine Birds', description: 'Unique high-altitude species including sunbirds', bestTime: 'Year-round' },
    ],
    activities: [
      { name: 'Peak Climbing', description: 'Summit Batian (5,199m) or Point Lenana (4,985m)', duration: '4-6 days', iconName: 'Mountain' },
      { name: 'Trekking', description: 'Multiple routes through diverse vegetation zones', duration: '3-5 days', iconName: 'Footprints' },
      { name: 'Game Drives', description: 'Safari in the lower forest and moorland zones', duration: '3-4 hours', iconName: 'Car' },
      { name: 'Forest Walks', description: 'Guided walks in indigenous forest with wildlife', duration: '2-3 hours', iconName: 'TreeDeciduous' },
      { name: 'Fishing', description: 'Trout fishing in mountain streams', duration: '3-4 hours', iconName: 'Fish' },
      { name: 'Bird Watching', description: 'Highland and forest species including sunbirds', duration: '2-3 hours', iconName: 'Camera' },
    ],
    bestTime: {
      peak: ['January', 'February', 'July', 'August', 'September'],
      good: ['June', 'October', 'December'],
      low: ['March', 'April', 'May', 'November'],
    },
    weather: {
      dry: 'January to February, July to October',
      wet: 'March to May (long rains), November to December (short rains)',
      temp: 'Varies dramatically: 20°C at base to -10°C at summit',
    },
    lodges: [
      { name: 'Fairmont Mount Kenya Safari Club', type: 'Ultra-Luxury', description: 'Historic celebrity favorite with stunning grounds', priceRange: '$$$' },
      { name: 'Serena Mountain Lodge', type: 'Lodge', description: 'Tree lodge overlooking waterhole and salt lick', priceRange: '$$' },
      { name: 'Ol Pejeta House', type: 'Luxury', description: 'Exclusive house with Mount Kenya views', priceRange: '$$$' },
      { name: 'Castle Forest Lodge', type: 'Lodge', description: 'Rustic forest lodge with great birding', priceRange: '$$' },
      { name: 'Mountain Rock Lodge', type: 'Budget', description: 'Good value base for trekkers', priceRange: '$' },
    ],
    tips: [
      'Point Lenana (4,985m) is achievable for fit hikers - no technical climbing required',
      'Acclimatize properly - altitude sickness is common above 3,000m',
      'The Sirimon and Chogoria routes offer the best scenery and wildlife',
      'Hire guides and porters from local communities - required and worthwhile',
      'Pack for all weather conditions - equatorial sun to freezing temperatures',
    ],
    facts: [
      'At 5,199m, Mount Kenya is Africa\'s second-highest peak after Kilimanjaro',
      'The mountain has three main peaks: Batian, Nelion, and Point Lenana',
      'Mount Kenya\'s glaciers are among the few in Africa, though shrinking rapidly',
      'The mountain creates its own weather patterns and has five distinct vegetation zones',
      'The Kikuyu believe their god Ngai lives on the mountain\'s peaks',
    ],
    gettingThere: {
      fromNairobi: '175 km to Nanyuki town, approximately 3-4 hours by road',
      byAir: '40 minutes from Wilson Airport to Nanyuki airstrip',
      byRoad: 'Excellent tarmac to Nanyuki, then good murram roads to park gates',
    },
  },

  'lamu': {
    slug: 'lamu',
    name: 'Lamu Island',
    tagline: 'The Timeless Swahili Sanctuary',
    heroImage: lamu,
    gallery: [lamu],
    category: 'beach',
    // 2026 Quick Decision & Pricing
    quickDecision: {
      bestTime: 'December–March',
      idealFor: 'Culture seekers',
      recommendedStay: '3–5 Nights',
    },
    pricing2026: {
      budget: '$60–$120 pppn',
      midRange: '$150–$350 pppn',
      luxury: '$500–$1,200 pppn',
    },
    signatureSighting: 'Traditional sailing dhows at sunset',
    viewingProbability: 'Moderate',
    insiderTip: 'Stay in Shela Village for a quieter, more upscale beach experience.',
    description: 'Lamu is Kenya\'s oldest continuously inhabited town and a UNESCO World Heritage Site, preserving 700 years of Swahili culture. This car-free island offers pristine beaches, traditional dhow sailing, and an authentic glimpse into East Africa\'s rich coastal heritage.',
    history: 'Founded in the 14th century, Lamu was a major center of the East African slave and ivory trade, and later became a hub for Swahili culture, architecture, and Islamic learning. The old town has barely changed in centuries, with its narrow streets, carved wooden doors, and distinctive Swahili architecture.',
    wildlife: [
      { name: 'Marine Turtles', description: 'Green and hawksbill turtles nest on Lamu beaches', bestTime: 'Year-round' },
      { name: 'Dolphins', description: 'Pods of dolphins in the channel waters', bestTime: 'Year-round' },
      { name: 'Tropical Fish', description: 'Colorful reef fish around coral formations', bestTime: 'Year-round' },
      { name: 'Sea Birds', description: 'Terns, herons, and fish eagles along the coast', bestTime: 'Year-round' },
      { name: 'Donkeys', description: 'Over 3,000 donkeys - the island\'s only transport', bestTime: 'Year-round' },
      { name: 'Cats', description: 'Famous Lamu cats descended from Persian traders\' companions', bestTime: 'Year-round' },
    ],
    activities: [
      { name: 'Dhow Sunset Cruise', description: 'Traditional sailing on wooden boats with drinks', duration: '2 hours', iconName: 'Ship', cost: '~$30–$60 pp' },
      { name: 'Guided Town Tour', description: 'Explore narrow streets, museums, and mosques', duration: '2-3 hours', iconName: 'Home', cost: '~$20 pp' },
      { name: 'Shela Beach', description: 'Relax on 12km of pristine white sand', duration: 'Full day', iconName: 'Sun' },
      { name: 'Snorkeling', description: 'Discover coral reefs and marine life', duration: '2-3 hours', iconName: 'Fish' },
      { name: 'Swahili Cooking Class', description: 'Learn traditional coastal cuisine', duration: '3 hours', iconName: 'Utensils' },
      { name: 'Full-Day Dhow Cruise', description: 'Full day sailing with lunch and island hopping', duration: 'Full day', iconName: 'Ship', cost: '~$60–$100 pp' },
    ],
    bestTime: {
      peak: ['December', 'January', 'February', 'March'],
      good: ['June', 'July', 'August', 'September'],
      low: ['April', 'May', 'October', 'November'],
    },
    weather: {
      dry: 'December to March, June to September',
      wet: 'April to May (long rains), October to November (short rains)',
      temp: '24°C - 32°C (75°F - 90°F) - tropical and humid',
    },
    lodges: [
      { name: 'The Majlis Resort', type: 'Ultra-Luxury', description: 'Stunning cliffside resort on Manda Island', priceRange: '$$$' },
      { name: 'Peponi Hotel', type: 'Boutique', description: 'Iconic Shela beachfront hotel since 1967', priceRange: '$$$' },
      { name: 'Lamu House', type: 'Boutique', description: 'Beautifully restored Swahili townhouse', priceRange: '$$' },
      { name: 'Shela Royal House', type: 'Guesthouse', description: 'Traditional Swahili house with rooftop', priceRange: '$$' },
      { name: 'Lamu Backpackers', type: 'Budget', description: 'Simple waterfront accommodation', priceRange: '$' },
    ],
    tips: [
      'There are no cars on Lamu Island - transport is by donkey, foot, or boat',
      'Respect local Muslim culture - dress modestly, especially in the old town',
      'The best beaches are at Shela village, a 40-minute walk from Lamu town',
      'Visit during the annual Lamu Cultural Festival (usually November) for unique experiences',
      'Hire a local guide for the old town - the narrow streets are a maze',
    ],
    facts: [
      'Lamu Old Town is Kenya\'s only UNESCO World Heritage Site for cultural significance',
      'The island has been continuously inhabited for over 700 years',
      'Lamu has approximately 3,000 donkeys and zero cars',
      'The carved wooden doors of Lamu are famous works of art, some centuries old',
      'Swahili is the original language here - some of the purest form spoken in Kenya',
    ],
    gettingThere: {
      fromNairobi: 'No direct road access - fly or ferry from mainland',
      byAir: '1.5 hours from Nairobi or Mombasa to Manda Airport, then boat to Lamu',
      byRoad: 'Drive to Mokowe on the mainland, then 20-minute boat crossing to Lamu',
    },
  },
};

// Export destination previews for the listing page
export interface DestinationPreview {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  highlights: string[];
  bestTime: string;
  wildlife: string;
  category: 'safari' | 'beach' | 'rift-valley' | 'adventure';
}

export const destinationPreviews: DestinationPreview[] = [
  // Safari Parks
  {
    slug: 'maasai-mara',
    name: 'Maasai Mara',
    tagline: 'The Crown Jewel of African Safaris',
    image: maraLodge,
    highlights: ['Great Migration', 'Big Five', 'Big Cats'],
    bestTime: 'Jul - Oct',
    wildlife: 'Lions, Leopards, Elephants, Wildebeest',
    category: 'safari',
  },
  {
    slug: 'amboseli',
    name: 'Amboseli',
    tagline: 'Land of the Giants',
    image: amboseli,
    highlights: ['Elephant Herds', 'Mt. Kilimanjaro', 'Bird Watching'],
    bestTime: 'Jun - Oct',
    wildlife: 'Elephants, Lions, Cheetahs, Hippos',
    category: 'safari',
  },
  {
    slug: 'samburu',
    name: 'Samburu',
    tagline: 'The Arid Frontier',
    image: samburu,
    highlights: ['Samburu Special Five', 'Cultural Experience', 'Leopards'],
    bestTime: 'Jun - Oct',
    wildlife: "Grevy's Zebra, Reticulated Giraffe, Gerenuk",
    category: 'safari',
  },
  {
    slug: 'tsavo',
    name: 'Tsavo',
    tagline: 'The Theater of the Wild',
    image: tsavo,
    highlights: ['Red Elephants', 'Man-Eaters Legacy', 'Mzima Springs'],
    bestTime: 'Jun - Oct',
    wildlife: 'Red Elephants, Lions, Black Rhinos, Hippos',
    category: 'safari',
  },
  {
    slug: 'laikipia',
    name: 'Laikipia Plateau',
    tagline: 'The Conservation Frontier',
    image: laikipia,
    highlights: ['Wild Dogs', 'Rhino Tracking', 'Walking Safaris'],
    bestTime: 'Jun - Oct',
    wildlife: "Wild Dogs, Rhinos, Grevy's Zebra, Elephants",
    category: 'safari',
  },
  // Rift Valley Lakes
  {
    slug: 'lake-naivasha',
    name: 'Lake Naivasha',
    tagline: 'The Serene Freshwater Oasis',
    image: naivasha,
    highlights: ['Boat Safaris', 'Hell\'s Gate', 'Bird Watching'],
    bestTime: 'Year-round',
    wildlife: 'Hippos, Fish Eagles, Giraffes',
    category: 'rift-valley',
  },
  {
    slug: 'lake-nakuru',
    name: 'Lake Nakuru',
    tagline: 'The Birdwatcher\'s Paradise',
    image: lakeNakuru,
    highlights: ['Flamingos', 'Rhino Sanctuary', "Rothschild's Giraffe"],
    bestTime: 'Jun - Mar',
    wildlife: 'Flamingos, Rhinos, Lions, Pelicans',
    category: 'rift-valley',
  },
  // Adventure
  {
    slug: 'mount-kenya',
    name: 'Mount Kenya',
    tagline: 'The Celestial Peak',
    image: mountKenya,
    highlights: ['Peak Climbing', 'Forest Treks', 'Unique Wildlife'],
    bestTime: 'Jan - Mar, Jul - Oct',
    wildlife: 'Forest Elephants, Giant Forest Hogs, Colobus',
    category: 'adventure',
  },
  // Beach Destinations
  {
    slug: 'diani-beach',
    name: 'Diani Beach',
    tagline: 'The Pristine Swahili Coast',
    image: dianiBeach,
    highlights: ['Beach & Safari', 'Snorkeling', 'Marine Life'],
    bestTime: 'Dec - Mar, Jul - Oct',
    wildlife: 'Dolphins, Sea Turtles, Colobus Monkeys',
    category: 'beach',
  },
  {
    slug: 'lamu',
    name: 'Lamu Island',
    tagline: 'The Timeless Swahili Sanctuary',
    image: lamu,
    highlights: ['Swahili Culture', 'Dhow Sailing', 'Pristine Beaches'],
    bestTime: 'Dec - Mar',
    wildlife: 'Sea Turtles, Dolphins, Tropical Fish',
    category: 'beach',
  },
];

export const destinationCategories = [
  { id: 'all', label: 'All Destinations' },
  { id: 'safari', label: 'Safari Parks' },
  { id: 'rift-valley', label: 'Rift Valley' },
  { id: 'adventure', label: 'Adventure' },
  { id: 'beach', label: 'Beach & Coast' },
] as const;
