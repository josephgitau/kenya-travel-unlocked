import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Compass, Heart, Mountain, Camera, Users, Sparkles, TreePine, Waves, Sun, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { usePackages } from '@/hooks/usePackages';

interface QuizOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  tags: string[];
}

interface QuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: QuizOption[];
  multiSelect?: boolean;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What's your primary safari goal?",
    subtitle: "Select what excites you most",
    options: [
      { id: 'migration', label: 'Great Migration', icon: <Compass className="w-6 h-6" />, description: 'Witness millions of wildebeest crossing rivers', tags: ['migration', 'Maasai Mara'] },
      { id: 'photography', label: 'Wildlife Photography', icon: <Camera className="w-6 h-6" />, description: 'Capture stunning images of African wildlife', tags: ['photography', 'wildlife'] },
      { id: 'relaxation', label: 'Relaxation & Nature', icon: <TreePine className="w-6 h-6" />, description: 'Peaceful escapes in pristine wilderness', tags: ['relaxation', 'nature'] },
      { id: 'beach', label: 'Beach & Safari Combo', icon: <Waves className="w-6 h-6" />, description: 'Best of both worlds - bush and beach', tags: ['beach', 'Diani', 'combo'] },
    ],
  },
  {
    id: 2,
    question: "What's your adventure level?",
    subtitle: "Be honest - we'll match you perfectly!",
    options: [
      { id: 'comfort', label: 'Comfort First', icon: <Heart className="w-6 h-6" />, description: 'Luxury lodges with all amenities', tags: ['luxury', 'comfort'] },
      { id: 'moderate', label: 'Balanced Explorer', icon: <Sun className="w-6 h-6" />, description: 'Mix of comfort and adventure', tags: ['mid-range', 'balanced'] },
      { id: 'adventurous', label: 'Wild at Heart', icon: <Mountain className="w-6 h-6" />, description: 'Camping under the stars, rugged terrain', tags: ['adventure', 'camping'] },
      { id: 'family', label: 'Family-Friendly', icon: <Users className="w-6 h-6" />, description: 'Safe, engaging activities for all ages', tags: ['family', 'safe'] },
    ],
  },
  {
    id: 3,
    question: "Which animals are must-sees?",
    subtitle: "Select all that apply",
    multiSelect: true,
    options: [
      { id: 'big5', label: 'Big Five', icon: <Star className="w-6 h-6" />, description: 'Lion, Elephant, Buffalo, Leopard, Rhino', tags: ['Big Five', 'Maasai Mara', 'Amboseli'] },
      { id: 'elephants', label: 'Elephants', icon: <Sparkles className="w-6 h-6" />, description: 'Majestic herds with Kilimanjaro views', tags: ['elephants', 'Amboseli'] },
      { id: 'cats', label: 'Big Cats', icon: <Compass className="w-6 h-6" />, description: 'Lions, cheetahs, and leopards', tags: ['big cats', 'Maasai Mara'] },
      { id: 'unique', label: 'Rare Species', icon: <Camera className="w-6 h-6" />, description: "Grevy's zebra, gerenuk, wild dogs", tags: ['rare', 'Samburu'] },
    ],
  },
  {
    id: 4,
    question: "How long is your ideal trip?",
    subtitle: "Including travel days",
    options: [
      { id: 'short', label: '2-3 Days', icon: <Sun className="w-6 h-6" />, description: 'Quick getaway, perfect for weekends', tags: ['short', '2 days', '3 days'] },
      { id: 'medium', label: '4-5 Days', icon: <TreePine className="w-6 h-6" />, description: 'Great balance of experiences', tags: ['medium', '4 days', '5 days'] },
      { id: 'long', label: '6-8 Days', icon: <Mountain className="w-6 h-6" />, description: 'In-depth exploration', tags: ['long', '6 days', '7 days', '8 days'] },
      { id: 'extended', label: '9+ Days', icon: <Compass className="w-6 h-6" />, description: 'The ultimate safari experience', tags: ['extended', 'comprehensive'] },
    ],
  },
  {
    id: 5,
    question: "What's your budget range?",
    subtitle: "Per person, all-inclusive",
    options: [
      { id: 'budget', label: 'Budget Friendly', icon: <Heart className="w-6 h-6" />, description: 'Under $200/day - great value', tags: ['budget'] },
      { id: 'midrange', label: 'Mid-Range', icon: <Star className="w-6 h-6" />, description: '$200-$400/day - comfortable', tags: ['mid-range'] },
      { id: 'premium', label: 'Premium', icon: <Sparkles className="w-6 h-6" />, description: '$400-$700/day - excellent', tags: ['premium', 'luxury'] },
      { id: 'luxury', label: 'Ultra Luxury', icon: <Mountain className="w-6 h-6" />, description: '$700+/day - extraordinary', tags: ['ultra-luxury', 'exclusive'] },
    ],
  },
];

const SafariQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const { data: packages } = usePackages();
  const navigate = useNavigate();

  const question = quizQuestions[currentQuestion];

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
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Calculate recommendations based on answers
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

    // Score packages based on matching tags
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

    // Sort by score and return top 3
    return scoredPackages.sort((a, b) => b.score - a.score).slice(0, 3);
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  if (showResults) {
    const recommendations = getRecommendations();

    return (
      <div className="min-h-screen bg-background">
        <Header />

        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <div className="w-20 h-20 rounded-full bg-safari/20 flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-safari" />
              </div>
              <h1 className="font-display text-4xl font-bold text-foreground mb-4">
                Your Perfect Safari Matches!
              </h1>
              <p className="text-lg text-muted-foreground">
                Based on your preferences, we've found these ideal experiences for you.
              </p>
            </div>

            {/* Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {recommendations.map((pkg, index) => (
                <Link
                  key={pkg.id}
                  to={`/package/${pkg.slug}`}
                  className="bg-card rounded-3xl overflow-hidden shadow-card border border-border hover:shadow-elevated transition-all group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                      style={{ backgroundImage: `url(${pkg.images[0] || '/placeholder.svg'})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                        index === 0 ? 'bg-safari text-secondary-foreground' : 'bg-primary text-primary-foreground'
                      }`}>
                        {index === 0 ? '🏆 Best Match' : `#${index + 1} Match`}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 price-tag">
                      ${pkg.price_non_resident.toLocaleString()}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {pkg.short_description || pkg.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{pkg.duration}</span>
                      <span>•</span>
                      <span>{pkg.location}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setCurrentQuestion(0);
                  setAnswers({});
                  setShowResults(false);
                }}
                className="px-8 py-4 bg-muted text-foreground font-semibold rounded-full hover:bg-muted/80 transition-colors"
              >
                Retake Quiz
              </button>
              <Link to="/#destinations" className="btn-gold text-center">
                Browse All Packages
              </Link>
            </div>
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Progress Bar */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="h-1 bg-muted">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <section className="py-32 lg:py-40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Question */}
            <div className="text-center mb-12">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                {question.question}
              </h1>
              <p className="text-lg text-muted-foreground">{question.subtitle}</p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {question.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  className={`relative p-6 rounded-2xl border-2 text-left transition-all ${
                    isSelected(option.id)
                      ? 'border-primary bg-primary/5 shadow-gold'
                      : 'border-border bg-card hover:border-primary/50'
                  }`}
                >
                  {isSelected(option.id) && (
                    <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}

                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    isSelected(option.id) ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {option.icon}
                  </div>

                  <h3 className="font-display text-lg font-bold text-foreground mb-1">
                    {option.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleBack}
                disabled={currentQuestion === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-colors ${
                  currentQuestion === 0
                    ? 'text-muted-foreground cursor-not-allowed'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>

              <button
                onClick={handleNext}
                disabled={!canProceed}
                className={`flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all ${
                  canProceed
                    ? 'btn-gold'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                {currentQuestion === quizQuestions.length - 1 ? 'See Results' : 'Next'}
                <ArrowRight className="w-5 h-5" />
              </button>
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
