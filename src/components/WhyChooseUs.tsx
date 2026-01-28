import { Star, Quote, ChevronLeft, ChevronRight, Shield, Award, Clock, Users } from 'lucide-react';
import { useState } from 'react';

const stats = [
  { value: '8+', label: 'Years Experience', icon: Clock },
  { value: '500+', label: 'Happy Travelers', icon: Users },
  { value: '4.9', label: 'Average Rating', icon: Star },
  { value: '100%', label: 'Licensed & Insured', icon: Shield },
];

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    location: 'London, UK',
    avatar: 'SM',
    rating: 5,
    text: 'Awili Safaris made our honeymoon absolutely magical. From the moment we landed, everything was perfectly organized. The Maasai Mara experience exceeded all expectations!',
    trip: 'Maasai Mara Safari',
  },
  {
    id: 2,
    name: 'James & Emily Chen',
    location: 'Toronto, Canada',
    avatar: 'JC',
    rating: 5,
    text: 'We\'ve done safaris in South Africa and Tanzania, but Kenya with Awili was special. Their local knowledge and personal touches made all the difference. Highly recommended!',
    trip: 'Bush & Beach Combo',
  },
  {
    id: 3,
    name: 'Michael Okonkwo',
    location: 'Lagos, Nigeria',
    avatar: 'MO',
    rating: 5,
    text: 'As an African exploring my continent, I appreciated how authentic this experience felt. No tourist traps, just genuine wildlife encounters and cultural immersion.',
    trip: 'Samburu & Laikipia',
  },
];

const WhyChooseUs = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentTestimonial];

  return (
    <section className="py-16 lg:py-24 bg-secondary text-secondary-foreground overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-semibold uppercase tracking-wider text-sm">Why Choose Us</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">
            Trusted by Travelers Worldwide
          </h2>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 mb-4">
                <stat.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="font-display text-3xl lg:text-4xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-white/70 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-12">
            {/* Quote Icon */}
            <Quote className="w-12 h-12 text-primary/30 absolute top-6 left-6" />

            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Rating */}
              <div className="flex items-center justify-center gap-1 mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                ))}
              </div>

              {/* Quote Text */}
              <p className="text-lg lg:text-xl text-white leading-relaxed mb-8">
                "{current.text}"
              </p>

              {/* Author */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold mb-3">
                  {current.avatar}
                </div>
                <div className="font-semibold text-white">{current.name}</div>
                <div className="text-white/60 text-sm">{current.location}</div>
                <div className="text-primary text-sm mt-1">{current.trip}</div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button 
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentTestimonial ? 'bg-primary w-6' : 'bg-white/30'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button 
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-12">
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Award className="w-5 h-5 text-primary" />
            <span>TRA Licensed Operator</span>
          </div>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Shield className="w-5 h-5 text-primary" />
            <span>Fully Insured</span>
          </div>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Star className="w-5 h-5 text-primary" />
            <span>TripAdvisor Excellence Award</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
