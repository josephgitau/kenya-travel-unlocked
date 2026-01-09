import { useState, useMemo } from 'react';
import { Users, User, Minus, Plus, Calculator, Info } from 'lucide-react';

interface PricingCalculatorProps {
  residentPrice: number;
  nonResidentPrice: number;
  singleSupplement: number;
  childDiscount: number;
}

const PricingCalculator = ({
  residentPrice,
  nonResidentPrice,
  singleSupplement,
  childDiscount,
}: PricingCalculatorProps) => {
  const [isResident, setIsResident] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [isSingleRoom, setIsSingleRoom] = useState(false);

  const basePrice = isResident ? residentPrice : nonResidentPrice;

  const totals = useMemo(() => {
    const adultTotal = adults * basePrice;
    const childPrice = basePrice * (1 - childDiscount / 100);
    const childTotal = children * childPrice;
    const singleTotal = isSingleRoom ? singleSupplement : 0;
    const grandTotal = adultTotal + childTotal + singleTotal;

    return {
      adultTotal,
      childTotal,
      childPrice,
      singleTotal,
      grandTotal,
      perPerson: grandTotal / (adults + children || 1),
    };
  }, [adults, children, basePrice, childDiscount, singleSupplement, isSingleRoom]);

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

  const formatPrice = (price: number) => {
    return isResident
      ? `KES ${price.toLocaleString()}`
      : `USD ${price.toLocaleString()}`;
  };

  return (
    <div className="bg-card rounded-3xl p-6 lg:p-8 shadow-card border border-border">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Calculator className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-display text-xl font-bold text-foreground">
            Pricing Calculator
          </h3>
          <p className="text-sm text-muted-foreground">
            Customize your trip to get an estimate
          </p>
        </div>
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

      {/* Number of Guests */}
      <div className="space-y-4 mb-6">
        {/* Adults */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-foreground">Adults</p>
            <p className="text-sm text-muted-foreground">Age 12+</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => adjustValue(setAdults, adults, -1, 1, 10)}
              className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
              disabled={adults <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-semibold text-lg">{adults}</span>
            <button
              onClick={() => adjustValue(setAdults, adults, 1, 1, 10)}
              className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
              disabled={adults >= 10}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Children */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-foreground">Children</p>
            <p className="text-sm text-muted-foreground">Age 3-11 ({childDiscount}% off)</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => adjustValue(setChildren, children, -1, 0, 6)}
              className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
              disabled={children <= 0}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-semibold text-lg">{children}</span>
            <button
              onClick={() => adjustValue(setChildren, children, 1, 0, 6)}
              className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
              disabled={children >= 6}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Single Room Supplement */}
      <div className="flex items-center justify-between py-4 border-t border-b border-border mb-6">
        <div>
          <p className="font-medium text-foreground">Single Room</p>
          <p className="text-sm text-muted-foreground">
            +{formatPrice(singleSupplement)} supplement
          </p>
        </div>
        <button
          onClick={() => setIsSingleRoom(!isSingleRoom)}
          className={`w-14 h-8 rounded-full transition-colors ${
            isSingleRoom ? 'bg-primary' : 'bg-muted'
          }`}
        >
          <div
            className={`w-6 h-6 rounded-full bg-white shadow-md transition-transform ${
              isSingleRoom ? 'translate-x-7' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            {adults} Adult{adults > 1 ? 's' : ''} × {formatPrice(basePrice)}
          </span>
          <span className="font-medium">{formatPrice(totals.adultTotal)}</span>
        </div>
        {children > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {children} Child{children > 1 ? 'ren' : ''} × {formatPrice(Math.round(totals.childPrice))}
            </span>
            <span className="font-medium">{formatPrice(Math.round(totals.childTotal))}</span>
          </div>
        )}
        {isSingleRoom && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Single room supplement</span>
            <span className="font-medium">{formatPrice(totals.singleTotal)}</span>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="bg-primary/10 rounded-2xl p-5">
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-foreground font-medium">Estimated Total</span>
          <span className="font-display text-3xl font-bold text-primary">
            {formatPrice(Math.round(totals.grandTotal))}
          </span>
        </div>
        <p className="text-sm text-muted-foreground text-right">
          {formatPrice(Math.round(totals.perPerson))} per person
        </p>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-2 mt-4 p-3 bg-muted rounded-xl">
        <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground">
          This is an estimate. Final pricing may vary based on season, accommodation choice, and availability. Request a quote for exact pricing.
        </p>
      </div>
    </div>
  );
};

export default PricingCalculator;
