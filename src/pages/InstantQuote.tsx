import { useState, useMemo } from 'react';
import { ArrowLeft, Calendar, Users, User, Minus, Plus, Home, Plane, Camera, Loader2, Check, Info, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { usePackages } from '@/hooks/usePackages';
import { format, addDays } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface AddOn {
  id: string;
  name: string;
  description: string;
  priceResident: number;
  priceNonResident: number;
  icon: React.ReactNode;
}

const addOns: AddOn[] = [
  {
    id: 'balloon',
    name: 'Hot Air Balloon Safari',
    description: 'Sunrise flight over the Mara with champagne breakfast',
    priceResident: 35000,
    priceNonResident: 450,
    icon: <Plane className="w-5 h-5" />,
  },
  {
    id: 'photography',
    name: 'Photography Guide',
    description: 'Professional photographer to guide your shots',
    priceResident: 15000,
    priceNonResident: 150,
    icon: <Camera className="w-5 h-5" />,
  },
  {
    id: 'upgrade',
    name: 'Luxury Lodge Upgrade',
    description: 'Upgrade to premium 5-star accommodation',
    priceResident: 25000,
    priceNonResident: 300,
    icon: <Home className="w-5 h-5" />,
  },
  {
    id: 'extension',
    name: 'Extra Day Extension',
    description: 'Add an extra day to your safari',
    priceResident: 20000,
    priceNonResident: 250,
    icon: <Calendar className="w-5 h-5" />,
  },
];

const InstantQuote = () => {
  const { data: packages, isLoading } = usePackages();
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [isResident, setIsResident] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [travelDate, setTravelDate] = useState<Date | undefined>(addDays(new Date(), 14));
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [isSingleRoom, setIsSingleRoom] = useState(false);

  const selectedPkg = packages?.find((p) => p.id === selectedPackage);

  const toggleAddOn = (addOnId: string) => {
    if (selectedAddOns.includes(addOnId)) {
      setSelectedAddOns(selectedAddOns.filter((id) => id !== addOnId));
    } else {
      setSelectedAddOns([...selectedAddOns, addOnId]);
    }
  };

  const adjustValue = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    current: number,
    delta: number,
    min: number,
    max: number
  ) => {
    const newValue = current + delta;
    if (newValue >= min && newValue <= max) {
      setter(newValue);
    }
  };

  const pricing = useMemo(() => {
    if (!selectedPkg) {
      return { basePrice: 0, adultTotal: 0, childTotal: 0, addOnsTotal: 0, singleSupplement: 0, grandTotal: 0, perPerson: 0 };
    }

    const basePrice = isResident ? selectedPkg.price_resident : selectedPkg.price_non_resident;
    const childDiscount = 0.3; // 30% off for children
    const singleSupplementRate = 0.3; // 30% of base price

    const adultTotal = adults * basePrice;
    const childTotal = children * basePrice * (1 - childDiscount);
    const singleSupplement = isSingleRoom ? basePrice * singleSupplementRate : 0;

    const addOnsTotal = selectedAddOns.reduce((total, addOnId) => {
      const addOn = addOns.find((a) => a.id === addOnId);
      if (addOn) {
        const addOnPrice = isResident ? addOn.priceResident : addOn.priceNonResident;
        return total + addOnPrice * (adults + children);
      }
      return total;
    }, 0);

    const grandTotal = adultTotal + childTotal + singleSupplement + addOnsTotal;
    const perPerson = grandTotal / (adults + children || 1);

    return { basePrice, adultTotal, childTotal, addOnsTotal, singleSupplement, grandTotal, perPerson };
  }, [selectedPkg, isResident, adults, children, selectedAddOns, isSingleRoom]);

  const formatPrice = (price: number) => {
    return isResident ? `KES ${price.toLocaleString()}` : `USD ${price.toLocaleString()}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-primary/10 via-background to-safari/5">
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
              Instant Pricing
            </span>
            <h1 className="section-title mt-2">Get Your Safari Quote</h1>
            <p className="section-subtitle mt-4">
              Build your perfect safari package and get real-time pricing. Customize dates, guests, and add-ons to see your total instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Configuration Panel */}
            <div className="lg:col-span-2 space-y-8">
              {/* Step 1: Select Package */}
              <div className="bg-card rounded-3xl p-6 lg:p-8 shadow-card border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    1
                  </div>
                  <h2 className="font-display text-xl font-bold text-foreground">
                    Select Your Safari Package
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {packages?.slice(0, 6).map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg.id)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all ${
                        selectedPackage === pkg.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-foreground">{pkg.name}</h3>
                        {selectedPackage === pkg.id && (
                          <Check className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{pkg.duration}</p>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-primary fill-primary" />
                        <span className="text-sm text-muted-foreground">{pkg.rating}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Travel Details */}
              <div className="bg-card rounded-3xl p-6 lg:p-8 shadow-card border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    2
                  </div>
                  <h2 className="font-display text-xl font-bold text-foreground">
                    Travel Details
                  </h2>
                </div>

                {/* Resident Toggle */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-muted-foreground mb-3 block">
                    Select your rate:
                  </label>
                  <div className="flex gap-2 bg-muted rounded-full p-1">
                    <button
                      onClick={() => setIsResident(true)}
                      className={`filter-toggle flex-1 ${isResident ? 'active' : ''}`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <User className="w-4 h-4" />
                        Kenyan Resident
                      </span>
                    </button>
                    <button
                      onClick={() => setIsResident(false)}
                      className={`filter-toggle flex-1 ${!isResident ? 'active' : ''}`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <Users className="w-4 h-4" />
                        Non-Resident
                      </span>
                    </button>
                  </div>
                </div>

                {/* Date Selection */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-muted-foreground mb-3 block">
                    Travel Date:
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="w-full flex items-center gap-3 p-4 bg-muted rounded-xl text-left hover:bg-muted/80 transition-colors">
                        <Calendar className="w-5 h-5 text-primary" />
                        <span className="text-foreground font-medium">
                          {travelDate ? format(travelDate, 'EEEE, MMMM d, yyyy') : 'Select a date'}
                        </span>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={travelDate}
                        onSelect={setTravelDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Guests */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                    <div>
                      <p className="font-medium text-foreground">Adults</p>
                      <p className="text-sm text-muted-foreground">Age 12+</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => adjustValue(setAdults, adults, -1, 1, 10)}
                        className="w-10 h-10 rounded-full bg-background hover:bg-background/80 flex items-center justify-center transition-colors"
                        disabled={adults <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold text-lg">{adults}</span>
                      <button
                        onClick={() => adjustValue(setAdults, adults, 1, 1, 10)}
                        className="w-10 h-10 rounded-full bg-background hover:bg-background/80 flex items-center justify-center transition-colors"
                        disabled={adults >= 10}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                    <div>
                      <p className="font-medium text-foreground">Children</p>
                      <p className="text-sm text-muted-foreground">Age 3-11 (30% off)</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => adjustValue(setChildren, children, -1, 0, 6)}
                        className="w-10 h-10 rounded-full bg-background hover:bg-background/80 flex items-center justify-center transition-colors"
                        disabled={children <= 0}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold text-lg">{children}</span>
                      <button
                        onClick={() => adjustValue(setChildren, children, 1, 0, 6)}
                        className="w-10 h-10 rounded-full bg-background hover:bg-background/80 flex items-center justify-center transition-colors"
                        disabled={children >= 6}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Single Room */}
                  <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                    <div>
                      <p className="font-medium text-foreground">Single Room Supplement</p>
                      <p className="text-sm text-muted-foreground">
                        +{selectedPkg ? formatPrice(Math.round(pricing.basePrice * 0.3)) : '30%'}
                      </p>
                    </div>
                    <button
                      onClick={() => setIsSingleRoom(!isSingleRoom)}
                      className={`w-14 h-8 rounded-full transition-colors ${
                        isSingleRoom ? 'bg-primary' : 'bg-border'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full bg-white shadow-md transition-transform ${
                          isSingleRoom ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Step 3: Add-ons */}
              <div className="bg-card rounded-3xl p-6 lg:p-8 shadow-card border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    3
                  </div>
                  <h2 className="font-display text-xl font-bold text-foreground">
                    Enhance Your Experience
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addOns.map((addOn) => (
                    <button
                      key={addOn.id}
                      onClick={() => toggleAddOn(addOn.id)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all ${
                        selectedAddOns.includes(addOn.id)
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          selectedAddOns.includes(addOn.id)
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {addOn.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold text-foreground">{addOn.name}</h3>
                            {selectedAddOns.includes(addOn.id) && (
                              <Check className="w-5 h-5 text-primary shrink-0" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{addOn.description}</p>
                          <p className="text-sm font-semibold text-primary">
                            +{formatPrice(isResident ? addOn.priceResident : addOn.priceNonResident)}/person
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quote Summary */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="bg-card rounded-3xl p-6 lg:p-8 shadow-card border border-border">
                <h2 className="font-display text-xl font-bold text-foreground mb-6">
                  Your Quote Summary
                </h2>

                {selectedPkg ? (
                  <>
                    <div className="mb-6 p-4 bg-muted rounded-xl">
                      <h3 className="font-semibold text-foreground mb-1">{selectedPkg.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedPkg.duration} • {selectedPkg.location}</p>
                    </div>

                    {/* Date */}
                    {travelDate && (
                      <div className="flex justify-between text-sm mb-4">
                        <span className="text-muted-foreground">Travel Date</span>
                        <span className="font-medium">{format(travelDate, 'MMM d, yyyy')}</span>
                      </div>
                    )}

                    {/* Price Breakdown */}
                    <div className="space-y-3 py-4 border-t border-b border-border mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {adults} Adult{adults > 1 ? 's' : ''} × {formatPrice(pricing.basePrice)}
                        </span>
                        <span className="font-medium">{formatPrice(pricing.adultTotal)}</span>
                      </div>

                      {children > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {children} Child{children > 1 ? 'ren' : ''} (30% off)
                          </span>
                          <span className="font-medium">{formatPrice(Math.round(pricing.childTotal))}</span>
                        </div>
                      )}

                      {isSingleRoom && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Single Room</span>
                          <span className="font-medium">{formatPrice(Math.round(pricing.singleSupplement))}</span>
                        </div>
                      )}

                      {selectedAddOns.length > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Add-ons ({selectedAddOns.length})</span>
                          <span className="font-medium">{formatPrice(Math.round(pricing.addOnsTotal))}</span>
                        </div>
                      )}
                    </div>

                    {/* Total */}
                    <div className="bg-primary/10 rounded-2xl p-5 mb-6">
                      <div className="flex justify-between items-baseline mb-2">
                        <span className="text-foreground font-medium">Estimated Total</span>
                        <span className="font-display text-3xl font-bold text-primary">
                          {formatPrice(Math.round(pricing.grandTotal))}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground text-right">
                        {formatPrice(Math.round(pricing.perPerson))} per person
                      </p>
                    </div>

                    <Link
                      to={`/package/${selectedPkg.slug}`}
                      className="btn-gold w-full text-center block mb-4"
                    >
                      Request This Quote
                    </Link>

                    <div className="flex items-start gap-2 p-3 bg-muted rounded-xl">
                      <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground">
                        This is an estimate. Final pricing may vary based on season and availability.
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                      <Home className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">
                      Select a package to see your instant quote
                    </p>
                  </div>
                )}
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

export default InstantQuote;
