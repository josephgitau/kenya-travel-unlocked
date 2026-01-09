import { createContext, useContext, useState, ReactNode } from 'react';

export type ResidentType = 'resident' | 'non-resident';
export type BudgetType = 'budget' | 'mid-range' | 'luxury';
export type TripType = 'group' | 'private';

interface FilterContextType {
  residentType: ResidentType;
  setResidentType: (type: ResidentType) => void;
  budgetType: BudgetType;
  setBudgetType: (type: BudgetType) => void;
  tripType: TripType;
  setTripType: (type: TripType) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [residentType, setResidentType] = useState<ResidentType>('non-resident');
  const [budgetType, setBudgetType] = useState<BudgetType>('mid-range');
  const [tripType, setTripType] = useState<TripType>('group');

  return (
    <FilterContext.Provider value={{
      residentType,
      setResidentType,
      budgetType,
      setBudgetType,
      tripType,
      setTripType
    }}>
      {children}
    </FilterContext.Provider>
  );
};
