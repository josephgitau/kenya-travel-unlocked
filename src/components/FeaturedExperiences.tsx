import { ArrowRight, Binoculars, Umbrella, Mountain, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';
import maraImage from '@/assets/hero-safari.jpg';
import dianiImage from '@/assets/diani-beach.jpg';
import samburuImage from '@/assets/samburu.jpg';
import naivashaImage from '@/assets/naivasha.jpg';

interface Experience {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  icon: React.ElementType;
  color: string;
  startingPrice: number;
  packageCount: number;
}

const experiences: Experience[] = [
  {
    id: 'bush',
    category: 'Bush Safari',
    title: 'Big 5 Adventures',
    description: 'Witness the Great Migration and encounter Africa\'s most majestic wildlife.',
    image: maraImage,
    icon: Binoculars,
    color: 'from-safari to-safari-light',
    startingPrice: 350,
    packageCount: 12,
  },
  {
    id: 'beach',
    category: 'Beach Escapes',
    title: 'Coastal Paradise',
    description: 'Pristine white sands, turquoise waters, and world-class resorts.',
    image: dianiImage,
    icon: Umbrella,
    color: 'from-blue-500 to-blue-400',
    startingPrice: 280,
    packageCount: 8,
  },
  {
    id: 'adrenaline',
    category: 'Adventure',
    title: 'Peak Experiences',
    description: 'Climb Mt. Kenya, trek gorges, and push your limits in stunning landscapes.',
    image: samburuImage,
    icon: Mountain,
    color: 'from-emerald-600 to-emerald-500',
    startingPrice: 200,
    packageCount: 6,
  },
  {
    id: 'staycation',
    category: 'Staycation',
    title: 'Weekend Getaways',
    description: 'Quick escapes to lakes, lodges, and hidden gems near Nairobi.',
    image: naivashaImage,
    icon: Coffee,
    color: 'from-amber-600 to-amber-500',
    startingPrice: 150,
    packageCount: 10,
  },
];

const ExperienceCard = ({ experience }: { experience: Experience }) => {
  const Icon = experience.icon;
  
  return (
    <Link 
      to={`/experience/${experience.id}`}
      className="group relative overflow-hidden rounded-3xl min-h-[380px] lg:min-h-[420px] block"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${experience.image})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      
      {/* Top Badge */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${experience.color} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <span className="text-white/90 text-sm font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
          {experience.packageCount} Packages
        </span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
        <span className="text-primary font-semibold uppercase tracking-wider text-xs mb-2 block">
          {experience.category}
        </span>
        
        <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-3">
          {experience.title}
        </h3>
        
        <p className="text-white/70 text-sm mb-5 line-clamp-2">
          {experience.description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-white/60 text-xs block">Starting from</span>
            <span className="text-primary text-xl font-bold">${experience.startingPrice}</span>
          </div>
          
          <div className="w-12 h-12 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-all duration-300 group-hover:bg-primary">
            <ArrowRight className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </Link>
  );
};

const FeaturedExperiences = () => {
  return (
    <section id="experiences" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-primary font-semibold uppercase tracking-wider text-sm">Choose Your Adventure</span>
          <h2 className="section-title mt-2">What's Your Safari Style?</h2>
          <p className="section-subtitle mx-auto mt-4">
            Whether you crave wild encounters, coastal bliss, or mountain thrills—start with your perfect experience.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedExperiences;
