import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MapPin, Star, Sun, Binoculars } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

// Import images
import maraLodge from '@/assets/mara-lodge.jpg';
import amboseli from '@/assets/amboseli.jpg';
import samburu from '@/assets/samburu.jpg';
import naivasha from '@/assets/naivasha.jpg';
import dianiBeach from '@/assets/diani-beach.jpg';

interface DestinationPreview {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  highlights: string[];
  bestTime: string;
  wildlife: string;
}

const destinations: DestinationPreview[] = [
  {
    slug: 'maasai-mara',
    name: 'Maasai Mara',
    tagline: 'Home of the Great Migration',
    image: maraLodge,
    highlights: ['Great Migration', 'Big Five', 'Big Cats'],
    bestTime: 'Jul - Oct',
    wildlife: 'Lions, Leopards, Elephants, Wildebeest',
  },
  {
    slug: 'amboseli',
    name: 'Amboseli',
    tagline: 'Land of Giants with Kilimanjaro Views',
    image: amboseli,
    highlights: ['Elephant Herds', 'Mt. Kilimanjaro', 'Bird Watching'],
    bestTime: 'Jun - Oct',
    wildlife: 'Elephants, Lions, Cheetahs, Hippos',
  },
  {
    slug: 'samburu',
    name: 'Samburu',
    tagline: 'Where the Wild North Begins',
    image: samburu,
    highlights: ['Samburu Special Five', 'Cultural Experience', 'Leopards'],
    bestTime: 'Jul - Oct',
    wildlife: "Grevy's Zebra, Reticulated Giraffe, Gerenuk",
  },
  {
    slug: 'lake-naivasha',
    name: 'Lake Naivasha',
    tagline: 'A Freshwater Paradise',
    image: naivasha,
    highlights: ['Boat Safaris', 'Hell\'s Gate', 'Bird Watching'],
    bestTime: 'Jun - Sep',
    wildlife: 'Hippos, Fish Eagles, Giraffes',
  },
  {
    slug: 'diani-beach',
    name: 'Diani Beach',
    tagline: "Kenya's Tropical Paradise",
    image: dianiBeach,
    highlights: ['Beach & Safari', 'Snorkeling', 'Marine Life'],
    bestTime: 'Dec - Mar',
    wildlife: 'Dolphins, Sea Turtles, Colobus Monkeys',
  },
];

const Destinations = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-safari/10 via-background to-primary/5">
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
              Explore Kenya
            </span>
            <h1 className="section-title mt-2">Destination Guides</h1>
            <p className="section-subtitle mt-4">
              In-depth guides to Kenya's most spectacular wildlife destinations. Discover history, wildlife, best lodges, and insider tips.
            </p>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest) => (
              <Link
                key={dest.slug}
                to={`/destination/${dest.slug}`}
                className="group bg-card rounded-3xl overflow-hidden shadow-card border border-border hover:shadow-elevated transition-all"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                    style={{ backgroundImage: `url(${dest.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Destination Name */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display text-2xl font-bold text-white mb-1">
                      {dest.name}
                    </h3>
                    <p className="text-white/80 text-sm">{dest.tagline}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {dest.highlights.map((highlight, index) => (
                      <span
                        key={index}
                        className="text-xs bg-primary/10 text-primary font-medium px-3 py-1 rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* Quick Info */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4 text-primary" />
                      <span>Best: {dest.bestTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Binoculars className="w-4 h-4 text-primary" />
                      <span>Wildlife</span>
                    </div>
                  </div>

                  {/* Wildlife Preview */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-1">
                    {dest.wildlife}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-semibold">Explore Guide</span>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <ArrowRight className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-safari to-safari-light">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-secondary-foreground mb-4">
            Not Sure Where to Go?
          </h2>
          <p className="text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
            Take our quick quiz to find your perfect safari destination based on your interests and preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quiz" className="btn-gold">
              Take Safari Quiz
            </Link>
            <Link to="/calendar" className="bg-background text-foreground font-semibold px-8 py-4 rounded-full transition-all hover:shadow-elevated">
              View Wildlife Calendar
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Destinations;
