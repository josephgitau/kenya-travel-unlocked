import { Search, MapPin, Calendar, ChevronDown } from 'lucide-react';
import { useSearch } from '@/contexts/SearchContext';
import heroImage from '@/assets/hero-safari.jpg';

const HeroSection = () => {
  const { searchQuery, setSearchQuery, searchDate, setSearchDate } = useSearch();

  const handleSearch = () => {
    const destinationsSection = document.getElementById('destinations');
    if (destinationsSection) {
      destinationsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePopularClick = (place: string) => {
    setSearchQuery(place);
    handleSearch();
  };

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-6 sm:mb-8 animate-fade-in-up">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-white/90 text-xs sm:text-sm font-medium">Licensed by Tourism Regulatory Authority</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-4 sm:mb-6 animate-fade-in-up stagger-1">
            Experience the Magic
            <span className="block sm:inline"> of Kenya</span>
            <span className="block text-primary mt-1 sm:mt-2">From Bush to Beach</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8 sm:mb-10 lg:mb-12 px-2 animate-fade-in-up stagger-2">
            Discover breathtaking safaris, pristine beaches, and unforgettable adventures 
            with Kenya's most trusted tour operator.
          </p>

          {/* Search Bar */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl lg:rounded-full p-2 sm:p-3 shadow-elevated max-w-3xl mx-auto animate-fade-in-up stagger-3">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              {/* Destination Input */}
              <div className="flex-1 flex items-center gap-3 px-3 sm:px-4 py-3 sm:py-4 sm:border-r border-border/50 bg-white/50 sm:bg-transparent rounded-xl sm:rounded-none">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <input
                  type="text"
                  placeholder="Where do you want to go?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm sm:text-base"
                />
              </div>

              {/* Date Input */}
              <div className="flex-1 flex items-center gap-3 px-3 sm:px-4 py-3 sm:py-4 sm:border-r border-border/50 bg-white/50 sm:bg-transparent rounded-xl sm:rounded-none">
                <Calendar className="w-5 h-5 text-primary shrink-0" />
                <input
                  type="text"
                  placeholder="When?"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                  onFocus={(e) => (e.target.type = 'date')}
                  onBlur={(e) => (e.target.type = 'text')}
                  className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm sm:text-base"
                />
              </div>

              {/* Search Button */}
              <button 
                onClick={handleSearch}
                className="btn-gold flex items-center justify-center gap-2 py-3.5 sm:py-4 lg:py-3 px-6 lg:px-8 rounded-xl lg:rounded-full text-sm sm:text-base font-semibold"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Search</span>
              </button>
            </div>
          </div>

          {/* Popular Searches */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 animate-fade-in-up stagger-4 px-2">
            <span className="text-white/60 text-xs sm:text-sm">Popular:</span>
            {['Maasai Mara', 'Diani Beach', 'Amboseli', 'Mt. Kenya'].map((place) => (
              <button
                key={place}
                onClick={() => handlePopularClick(place)}
                className="text-xs sm:text-sm text-white bg-white/10 hover:bg-white/20 active:bg-white/30 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-200"
              >
                {place}
              </button>
            ))}
          </div>
        </div>

        {/* Scroll Indicator - hidden on very small screens */}
        <div className="hidden sm:block absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <button 
            onClick={handleSearch}
            className="flex flex-col items-center gap-2 text-white/60 hover:text-white/80 transition-colors"
          >
            <span className="text-xs font-medium uppercase tracking-wider">Explore</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
