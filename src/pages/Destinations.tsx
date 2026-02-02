import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sun, Binoculars, Filter } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import SEO from '@/components/SEO';
import { destinationPreviews, destinationCategories } from '@/data/destinations';

const Destinations = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredDestinations = activeCategory === 'all' 
    ? destinationPreviews 
    : destinationPreviews.filter(d => d.category === activeCategory);

  return (
    <div className="min-h-screen bg-background pt-16 lg:pt-20">
      <SEO 
        title="Kenya Safari Destinations | Awili Safaris Guides"
        description="Explore in-depth guides to Kenya's top safari destinations. Discover Maasai Mara, Amboseli, Nairobi National Park, Samburu, Tsavo, Laikipia, and coastal paradises with insider tips."
        keywords="Kenya destinations, Maasai Mara guide, Amboseli guide, Nairobi National Park, Samburu safari, Tsavo, Laikipia, Kenya safari destinations"
      />
      <Header />

      <section className="py-20 lg:py-28 bg-gradient-to-br from-safari/10 via-background to-primary/5">
        <div className="container mx-auto px-4 lg:px-8">
          <PageBreadcrumb items={[{ label: 'Destinations' }]} className="mb-8" />
          <div className="max-w-3xl">
            <span className="text-primary font-semibold uppercase tracking-wider text-sm">Explore Kenya</span>
            <h1 className="section-title mt-2">Destination Guides</h1>
            <p className="section-subtitle mt-4">
              In-depth guides to Kenya's 10 most spectacular wildlife and beach destinations. Discover history, wildlife, best lodges, and insider tips.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 border-b border-border bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-muted-foreground shrink-0" />
            {destinationCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((dest) => (
              <Link
                key={dest.slug}
                to={`/destination/${dest.slug}`}
                className="group bg-card rounded-3xl overflow-hidden shadow-card border border-border hover:shadow-elevated transition-all"
              >
                <div className="relative h-56 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                    style={{ backgroundImage: `url(${dest.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      dest.category === 'safari' ? 'bg-safari text-secondary-foreground' :
                      dest.category === 'beach' ? 'bg-blue-500 text-white' :
                      dest.category === 'rift-valley' ? 'bg-primary text-primary-foreground' :
                      'bg-emerald-600 text-white'
                    }`}>
                      {dest.category === 'rift-valley' ? 'Rift Valley' : 
                       dest.category.charAt(0).toUpperCase() + dest.category.slice(1)}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display text-2xl font-bold text-white mb-1">{dest.name}</h3>
                    <p className="text-white/80 text-sm">{dest.tagline}</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {dest.highlights.map((highlight, index) => (
                      <span key={index} className="text-xs bg-primary/10 text-primary font-medium px-3 py-1 rounded-full">
                        {highlight}
                      </span>
                    ))}
                  </div>

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

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-1">{dest.wildlife}</p>

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

      <section className="py-16 bg-gradient-to-r from-safari to-safari-light">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-secondary-foreground mb-4">Not Sure Where to Go?</h2>
          <p className="text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
            Take our quick quiz to find your perfect safari destination based on your interests and preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quiz" className="btn-gold">Take Safari Quiz</Link>
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
