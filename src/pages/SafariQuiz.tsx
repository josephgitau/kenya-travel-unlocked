import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Check, Compass, Heart, Mountain, Camera, Users, Sparkles, TreePine, Waves, Sun, Star, RotateCcw, Share2, Download, Zap, MapPin, Calendar, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import SEO from '@/components/SEO';
import { usePackages } from '@/hooks/usePackages';

interface QuizOption {
  id: string;
  label: string;
  emoji: string;
  description: string;
  tags: string[];
}

interface QuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: QuizOption[];
  multiSelect?: boolean;
  category: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What excites you most about a safari?",
    subtitle: "Pick the experience that makes your heart race",
    category: "Experience",
    options: [
      { id: 'migration', label: 'The Great Migration', emoji: '🦓', description: 'Witness 2 million animals crossing crocodile-filled rivers', tags: ['migration', 'Maasai Mara', 'wildlife'] },
      { id: 'photography', label: 'Wildlife Photography', emoji: '📸', description: 'Capture iconic shots of Africa\'s Big Five', tags: ['photography', 'wildlife', 'Maasai Mara'] },
      { id: 'relaxation', label: 'Escape & Unwind', emoji: '🌿', description: 'Find peace in pristine wilderness lodges', tags: ['relaxation', 'nature', 'luxury'] },
      { id: 'beach', label: 'Bush & Beach Combo', emoji: '🏝️', description: 'Safari adventure + tropical beach paradise', tags: ['beach', 'Diani', 'combo', 'relaxation'] },
    ],
  },
  {
    id: 2,
    question: "How adventurous are you feeling?",
    subtitle: "Be honest – we'll match you perfectly!",
    category: "Style",
    options: [
      { id: 'comfort', label: 'Pure Luxury', emoji: '✨', description: 'Five-star lodges, gourmet dining, spa treatments', tags: ['luxury', 'comfort', 'premium'] },
      { id: 'moderate', label: 'Best of Both', emoji: '⚖️', description: 'Comfortable camps with authentic experiences', tags: ['mid-range', 'balanced'] },
      { id: 'adventurous', label: 'Wild Explorer', emoji: '⛺', description: 'Mobile camps, walking safaris, under-the-stars', tags: ['adventure', 'camping', 'walking safari'] },
      { id: 'family', label: 'Family Fun', emoji: '👨‍👩‍👧‍👦', description: 'Kid-friendly, safe, educational adventures', tags: ['family', 'safe', 'educational'] },
    ],
  },
  {
    id: 3,
    question: "Which animals are absolute must-sees?",
    subtitle: "Select all that you can't miss!",
    multiSelect: true,
    category: "Wildlife",
    options: [
      { id: 'big5', label: 'The Big Five', emoji: '🦁', description: 'Lion, Elephant, Buffalo, Leopard, Rhino', tags: ['Big Five', 'Maasai Mara', 'Amboseli', 'Nairobi National Park', 'wildlife'] },
      { id: 'elephants', label: 'Elephant Herds', emoji: '🐘', description: 'Giants with Kilimanjaro backdrop', tags: ['elephants', 'Amboseli', 'Tsavo', 'Nairobi National Park'] },
      { id: 'cats', label: 'Big Cats Only', emoji: '🐆', description: 'Lions, cheetahs hunting on the plains', tags: ['big cats', 'Maasai Mara', 'Nairobi National Park', 'predators'] },
      { id: 'unique', label: 'Rare & Unique', emoji: '🦒', description: "Grevy's zebra, gerenuk, wild dogs", tags: ['rare', 'Samburu', 'Laikipia', 'wild dogs'] },
    ],
  },
  {
    id: 4,
    question: "How long is your dream safari?",
    subtitle: "Include travel days from Nairobi",
    category: "Duration",
    options: [
      { id: 'short', label: 'Quick Escape', emoji: '⚡', description: '2-3 days • Perfect weekend getaway', tags: ['short', '2 days', '3 days'] },
      { id: 'medium', label: 'Classic Safari', emoji: '🌄', description: '4-5 days • The sweet spot for most travelers', tags: ['medium', '4 days', '5 days'] },
      { id: 'long', label: 'Deep Dive', emoji: '🗺️', description: '6-8 days • Multiple parks, rich experiences', tags: ['long', '6 days', '7 days', '8 days'] },
      { id: 'extended', label: 'Ultimate Journey', emoji: '🌍', description: '9+ days • The complete Kenya experience', tags: ['extended', 'comprehensive', 'multi-destination'] },
    ],
  },
  {
    id: 5,
    question: "What's your investment range?",
    subtitle: "Per person, all-inclusive (flights, lodging, meals, activities)",
    category: "Budget",
    options: [
      { id: 'budget', label: 'Smart Value', emoji: '💚', description: 'Under $200/day • Great experiences, smart choices', tags: ['budget', 'value'] },
      { id: 'midrange', label: 'Comfortable', emoji: '💛', description: '$200-$400/day • Quality lodges, full experience', tags: ['mid-range', 'comfortable'] },
      { id: 'premium', label: 'Premium', emoji: '🧡', description: '$400-$700/day • Excellent camps, exclusive areas', tags: ['premium', 'luxury'] },
      { id: 'luxury', label: 'Ultra Luxury', emoji: '💎', description: '$700+/day • World-class, once-in-a-lifetime', tags: ['ultra-luxury', 'exclusive', 'premium'] },
    ],
  },
];

// Safari personality types based on answers
const safariPersonalities: Record<string, { title: string; emoji: string; description: string }> = {
  'migration-adventurous': { title: 'Migration Chaser', emoji: '🦓', description: "You live for the drama! River crossings and predator action are your calling." },
  'migration-comfort': { title: 'Luxury Migration', emoji: '👑', description: "You want front-row seats to nature's greatest show, from a five-star deck." },
  'photography-adventurous': { title: 'Wild Photographer', emoji: '📷', description: "Golden hour is your religion. You'll do anything for THE shot." },
  'photography-comfort': { title: 'Safari Artist', emoji: '🎨', description: "Capturing beauty in comfort – the best lens AND the best bed." },
  'beach-comfort': { title: 'Bush & Beach Dreamer', emoji: '🏖️', description: "Why choose? Big Five in the morning, ocean sunsets by evening." },
  'beach-moderate': { title: 'Adventure Combo', emoji: '🌊', description: "Safari thrills AND beach chills – you want it all!" },
  'relaxation-comfort': { title: 'Wellness Safari', emoji: '🧘', description: "Nature therapy at its finest. Serenity with wildlife." },
  'relaxation-adventurous': { title: 'Nature Purist', emoji: '🌲', description: "Deep in the wilderness, far from crowds. True immersion." },
  'default': { title: 'Safari Explorer', emoji: '🦁', description: "Ready for the adventure of a lifetime in Kenya!" },
};

const SafariQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [animating, setAnimating] = useState(false);
  const { data: packages } = usePackages();

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleSelect = (optionId: string) => {
    if (question.multiSelect) {
      const current = answers[question.id] || [];
      if (current.includes(optionId)) {
        setAnswers({ ...answers, [question.id]: current.filter((id) => id !== optionId) });
      } else {
        setAnswers({ ...answers, [question.id]: [...current, optionId] });
      }
    } else {
      setAnswers({ ...answers, [question.id]: [optionId] });
    }
  };

  const isSelected = (optionId: string) => {
    return (answers[question.id] || []).includes(optionId);
  };

  const canProceed = (answers[question.id] || []).length > 0;

  const handleNext = () => {
    if (!canProceed) return;
    setAnimating(true);
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true);
      }
      setAnimating(false);
    }, 300);
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setAnimating(true);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion - 1);
        setAnimating(false);
      }, 200);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  // Get personality type
  const getPersonality = () => {
    const goal = answers[1]?.[0] || 'default';
    const style = answers[2]?.[0] || 'default';
    const key = `${goal}-${style}`;
    return safariPersonalities[key] || safariPersonalities['default'];
  };

  // Calculate recommendations
  const getRecommendations = () => {
    const allTags: string[] = [];
    Object.entries(answers).forEach(([questionId, selectedOptions]) => {
      const q = quizQuestions.find((q) => q.id === parseInt(questionId));
      if (q) {
        selectedOptions.forEach((optId) => {
          const opt = q.options.find((o) => o.id === optId);
          if (opt) {
            allTags.push(...opt.tags);
          }
        });
      }
    });

    const scoredPackages = (packages || []).map((pkg) => {
      let score = 0;
      const pkgText = `${pkg.name} ${pkg.location} ${pkg.description} ${pkg.category}`.toLowerCase();
      
      allTags.forEach((tag) => {
        if (pkgText.includes(tag.toLowerCase())) {
          score += 1;
        }
      });

      return { ...pkg, score };
    });

    return scoredPackages.sort((a, b) => b.score - a.score).slice(0, 3);
  };

  // Get answer summary
  const getAnswerSummary = () => {
    return quizQuestions.map(q => {
      const selectedIds = answers[q.id] || [];
      const selectedLabels = q.options
        .filter(o => selectedIds.includes(o.id))
        .map(o => o.label);
      return { category: q.category, selections: selectedLabels };
    }).filter(s => s.selections.length > 0);
  };

  // Results View
  if (showResults) {
    const recommendations = getRecommendations();
    const personality = getPersonality();
    const summary = getAnswerSummary();

    return (
      <div className="min-h-screen bg-background pt-16 lg:pt-20">
        <SEO 
          title="Your Safari Matches | Awili Safaris Quiz Results"
          description="Based on your preferences, we've found the ideal Kenya safari experiences for you."
        />
        <Header />

        {/* Results Hero */}
        <section className="relative py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-safari/20 via-primary/10 to-background" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 text-8xl">🦁</div>
            <div className="absolute top-20 right-20 text-6xl">🐘</div>
            <div className="absolute bottom-10 left-1/4 text-7xl">🦓</div>
          </div>
          
          <div className="relative container mx-auto px-4 lg:px-8 text-center">
            {/* Personality Card */}
            <div className="inline-block bg-card rounded-3xl p-8 shadow-elevated border border-border mb-8 animate-scale-in">
              <div className="text-6xl mb-4">{personality.emoji}</div>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Your Safari Personality</p>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                {personality.title}
              </h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                {personality.description}
              </p>
            </div>

            {/* Answer Summary Pills */}
            <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
              {summary.map((item, i) => (
                <div key={i} className="inline-flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full">
                  <span className="text-xs font-medium text-muted-foreground">{item.category}:</span>
                  <span className="text-sm font-semibold text-foreground">{item.selections.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recommendations */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-3">
                🎯 Your Perfect Safari Matches
              </h2>
              <p className="text-muted-foreground">
                Based on your preferences, here are your top recommendations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {recommendations.map((pkg, index) => (
                <Link
                  key={pkg.id}
                  to={`/package/${pkg.slug}`}
                  className={`relative bg-card rounded-3xl overflow-hidden shadow-card border-2 hover:shadow-elevated transition-all group ${
                    index === 0 ? 'border-safari md:scale-105' : 'border-border'
                  }`}
                >
                  {/* Best Match Badge */}
                  {index === 0 && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-safari to-safari-light py-2 text-center z-10">
                      <span className="text-sm font-bold text-secondary-foreground">🏆 BEST MATCH</span>
                    </div>
                  )}

                  <div className={`relative h-52 overflow-hidden ${index === 0 ? 'mt-8' : ''}`}>
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                      style={{ backgroundImage: `url(${pkg.images[0] || '/placeholder.svg'})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Match Score */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-card/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1">
                        <Zap className="w-4 h-4 text-primary" />
                        <span className="text-sm font-bold text-foreground">{Math.min(98, 85 + (pkg.score || 0) * 3)}%</span>
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                        <MapPin className="w-4 h-4" />
                        {pkg.location}
                      </div>
                      <h3 className="font-display text-xl font-bold text-white">
                        {pkg.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {pkg.short_description || pkg.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {pkg.duration}
                        </span>
                        {pkg.rating && (
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-primary text-primary" />
                            {pkg.rating}
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">From</p>
                        <p className="font-bold text-primary">${pkg.price_non_resident.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={resetQuiz}
                className="inline-flex items-center gap-2 px-6 py-3 bg-muted text-foreground font-semibold rounded-full hover:bg-muted/80 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                Retake Quiz
              </button>
              <Link to="/quote" className="btn-gold">
                Get Custom Quote
              </Link>
              <Link to="/#destinations" className="inline-flex items-center gap-2 px-6 py-3 text-foreground font-semibold hover:text-primary transition-colors">
                Browse All Packages
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Expert Help CTA */}
        <section className="py-12 bg-gradient-to-r from-primary to-primary/80">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h3 className="font-display text-2xl font-bold text-primary-foreground mb-3">
              Want Expert Guidance?
            </h3>
            <p className="text-primary-foreground/80 mb-6 max-w-lg mx-auto">
              Our safari specialists can create a completely custom itinerary based on your quiz results.
            </p>
            <a 
              href="https://wa.me/254722792069"
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-background text-foreground font-semibold px-8 py-4 rounded-full hover:shadow-elevated transition-all"
            >
              💬 Chat with an Expert
            </a>
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  // Quiz View
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30 pt-16 lg:pt-20">
      <SEO 
        title="Safari Quiz - Find Your Perfect Kenya Safari | Awili Safaris"
        description="Take our quick quiz to discover your ideal Kenya safari destination."
        keywords="safari quiz, Kenya safari match, find safari, safari planner"
      />
      <Header />

      {/* Progress Bar - Fixed */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="h-1.5 bg-muted">
          <div
            className="h-full bg-gradient-to-r from-primary to-safari transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <PageBreadcrumb 
              items={[
                { label: 'Plan Your Trip', href: '/' },
                { label: 'Safari Quiz' }
              ]} 
            />
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-foreground">{currentQuestion + 1}</span>
              <span className="text-muted-foreground">of {quizQuestions.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <section className="pt-36 pb-20 lg:pt-44 lg:pb-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className={`max-w-3xl mx-auto transition-all duration-300 ${animating ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'}`}>
            
            {/* Question Category Badge */}
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                Question {currentQuestion + 1}: {question.category}
              </span>
            </div>

            {/* Question */}
            <div className="text-center mb-10">
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                {question.question}
              </h1>
              <p className="text-lg text-muted-foreground">
                {question.subtitle}
                {question.multiSelect && (
                  <span className="inline-flex items-center gap-1 ml-2 text-primary font-medium">
                    (Pick multiple!)
                  </span>
                )}
              </p>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {question.options.map((option) => {
                const selected = isSelected(option.id);
                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelect(option.id)}
                    className={`relative p-6 rounded-3xl border-2 text-left transition-all duration-200 hover:scale-[1.02] ${
                      selected
                        ? 'border-primary bg-primary/5 shadow-lg ring-2 ring-primary/20'
                        : 'border-border bg-card hover:border-primary/50 hover:shadow-md'
                    }`}
                  >
                    {/* Selection indicator */}
                    {selected && (
                      <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-primary flex items-center justify-center animate-scale-in">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}

                    {/* Emoji */}
                    <div className={`text-4xl mb-3 transition-transform ${selected ? 'scale-110' : ''}`}>
                      {option.emoji}
                    </div>

                    {/* Content */}
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">
                      {option.label}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {option.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleBack}
                disabled={currentQuestion === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                  currentQuestion === 0
                    ? 'text-muted-foreground/50 cursor-not-allowed'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>

              <button
                onClick={handleNext}
                disabled={!canProceed}
                className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all ${
                  canProceed
                    ? 'bg-gradient-to-r from-primary to-safari text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                {currentQuestion === quizQuestions.length - 1 ? (
                  <>
                    See My Matches
                    <Sparkles className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            {/* Quick Stats */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <span>Takes 60 seconds</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span>10,000+ travelers matched</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-primary" />
                  <span>Personalized results</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default SafariQuiz;
