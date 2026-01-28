import { ArrowRight, HelpCircle, Calendar, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';

const tools = [
  {
    icon: HelpCircle,
    title: 'Safari Quiz',
    description: 'Not sure where to go? Answer 4 quick questions and we\'ll match you with your perfect destination.',
    cta: 'Take the Quiz',
    href: '/quiz',
    color: 'bg-primary',
  },
  {
    icon: Calendar,
    title: 'Wildlife Calendar',
    description: 'See what\'s happening each month—migrations, calving season, bird watching peaks, and more.',
    cta: 'View Calendar',
    href: '/calendar',
    color: 'bg-secondary',
  },
  {
    icon: Calculator,
    title: 'Instant Quote',
    description: 'Get personalized pricing in 60 seconds. No obligations, no spam—just transparent costs.',
    cta: 'Get Your Quote',
    href: '/quote',
    color: 'bg-accent',
  },
];

const PlanYourTrip = () => {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-primary font-semibold uppercase tracking-wider text-sm">Plan Your Trip</span>
          <h2 className="section-title mt-2">Need Help Deciding?</h2>
          <p className="section-subtitle mx-auto mt-4">
            Use our free planning tools to find your perfect safari experience.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.title}
              to={tool.href}
              className="group bg-card rounded-2xl p-6 lg:p-8 shadow-card border border-border hover:shadow-elevated transition-all duration-300"
            >
              <div className={`w-14 h-14 ${tool.color} rounded-2xl flex items-center justify-center mb-6`}>
                <tool.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {tool.title}
              </h3>

              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                {tool.description}
              </p>

              <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                {tool.cta}
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlanYourTrip;
