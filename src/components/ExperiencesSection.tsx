import { ArrowRight, Binoculars, Umbrella, Mountain, Coffee } from 'lucide-react';
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
}

const experiences: Experience[] = [
  {
    id: 'bush',
    category: 'Bush',
    title: 'Big 5 Safaris',
    description: 'Witness the Great Migration and encounter lions, elephants, and more in their natural habitat.',
    image: maraImage,
    icon: Binoculars,
    color: 'bg-safari',
  },
  {
    id: 'beach',
    category: 'Beach',
    title: 'Diani & Watamu Getaways',
    description: 'Relax on pristine white sand beaches with turquoise waters of the Indian Ocean.',
    image: dianiImage,
    icon: Umbrella,
    color: 'bg-primary',
  },
  {
    id: 'adrenaline',
    category: 'Adrenaline',
    title: 'Mt. Kenya & Longonot',
    description: 'Challenge yourself with thrilling hikes and witness breathtaking views from the summit.',
    image: samburuImage,
    icon: Mountain,
    color: 'bg-accent',
  },
  {
    id: 'staycation',
    category: 'Staycation',
    title: 'Nairobi & Naivasha Weekenders',
    description: 'Escape the city with quick getaways to serene lakes and wildlife sanctuaries.',
    image: naivashaImage,
    icon: Coffee,
    color: 'bg-earth',
  },
];

const ExperienceCard = ({ experience, index }: { experience: Experience; index: number }) => {
  const Icon = experience.icon;
  
  const handleClick = () => {
    const destinationsSection = document.getElementById('destinations');
    if (destinationsSection) {
      destinationsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <article 
      className="experience-card group min-h-[320px] lg:min-h-[400px] cursor-pointer"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      {/* Background Image */}
      <div
        className="experience-bg"
        style={{ backgroundImage: `url(${experience.image})` }}
      />
      
      {/* Overlay */}
      <div className="experience-overlay" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6 lg:p-8">
        {/* Icon Badge */}
        <div className={`w-12 h-12 ${experience.color} rounded-2xl flex items-center justify-center mb-4`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        
        {/* Category */}
        <span className="text-primary font-semibold uppercase tracking-wider text-sm mb-2">
          {experience.category}
        </span>
        
        {/* Title */}
        <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-3">
          {experience.title}
        </h3>
        
        {/* Description */}
        <p className="text-white/70 text-sm lg:text-base mb-6 line-clamp-2">
          {experience.description}
        </p>
        
        {/* CTA */}
        <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
          <span>Explore Packages</span>
          <ArrowRight className="w-5 h-5" />
        </div>
      </div>
    </article>
  );
};

const ExperiencesSection = () => {
  return (
    <section id="experiences" className="py-20 lg:py-28 bg-sand">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold uppercase tracking-wider text-sm">Curated Experiences</span>
          <h2 className="section-title mt-2">Choose Your Adventure</h2>
          <p className="section-subtitle mx-auto mt-4">
            Whether you crave wild encounters, coastal bliss, mountain thrills, or peaceful escapes—we've crafted the perfect experience for you.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((experience, index) => (
            <ExperienceCard key={experience.id} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperiencesSection;
