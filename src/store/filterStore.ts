import { create } from 'zustand';
import { VehicleType } from '../types';
import { tires } from '../data/tires';

type AvailableOptions = {
  widths: number[];
  profiles: number[];
  rimSizes: number[];
  brands: string[];
};

type FilterState = {
  width: number | null;
  profile: number | null;
  rimSize: number | null;
  vehicleType: VehicleType | null;
  brand: string | null;
  searchQuery: string;
  availableOptions: AvailableOptions;
  filteredTires: typeof tires;
};

type FilterStore = FilterState & {
  setWidth: (width: number | null) => void;
  setProfile: (profile: number | null) => void;
  setRimSize: (rimSize: number | null) => void;
  setVehicleType: (type: VehicleType | null) => void;
  setBrand: (brand: string | null) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
  updateAvailableOptions: () => void;
};

// Calculate all available options initially
const getAllOptions = (): AvailableOptions => {
  return {
    widths: Array.from(new Set(tires.map(tire => tire.size.width))).sort((a, b) => a - b),
    profiles: Array.from(new Set(tires.map(tire => tire.size.profile))).sort((a, b) => a - b),
    rimSizes: Array.from(new Set(tires.map(tire => tire.size.rimSize))).sort((a, b) => a - b),
    brands: Array.from(new Set(tires.map(tire => tire.brand))).sort(),
  };
};

// Filter tires based on current filter state
const filterTires = (state: Omit<FilterState, 'availableOptions' | 'filteredTires'>) => {
  let result = [...tires];
  
  if (state.width !== null) {
    result = result.filter(tire => tire.size.width === state.width);
  }
  
  if (state.profile !== null) {
    result = result.filter(tire => tire.size.profile === state.profile);
  }
  
  if (state.rimSize !== null) {
    result = result.filter(tire => tire.size.rimSize === state.rimSize);
  }
  
  if (state.vehicleType !== null) {
    result = result.filter(tire => tire.vehicleTypes.includes(state.vehicleType as VehicleType));
  }
  
  if (state.brand !== null) {
    result = result.filter(tire => tire.brand === state.brand);
  }
  
  if (state.searchQuery) {
    const query = state.searchQuery.toLowerCase();
    result = result.filter(
      tire => 
        tire.brand.toLowerCase().includes(query) || 
        tire.model.toLowerCase().includes(query) ||
        tire.description.toLowerCase().includes(query)
    );
  }
  
  return result;
};

// Calculate available options based on current filter state
const getAvailableOptions = (state: Omit<FilterState, 'availableOptions' | 'filteredTires'>) => {
  // Start with filtered tires based on current state
  const filteredTires = filterTires(state);
  
  // Extract available options from filtered tires
  return {
    widths: Array.from(new Set(filteredTires.map(tire => tire.size.width))).sort((a, b) => a - b),
    profiles: Array.from(new Set(filteredTires.map(tire => tire.size.profile))).sort((a, b) => a - b),
    rimSizes: Array.from(new Set(filteredTires.map(tire => tire.size.rimSize))).sort((a, b) => a - b),
    brands: Array.from(new Set(filteredTires.map(tire => tire.brand))).sort(),
  };
};

// Initialize with all available options
const initialOptions = getAllOptions();

const useFilterStore = create<FilterStore>((set, get) => ({
  width: null,
  profile: null,
  rimSize: null,
  vehicleType: null,
  brand: null,
  searchQuery: '',
  availableOptions: initialOptions,
  filteredTires: tires,
  
  setWidth: (width) => {
    set({ width });
    set(state => {
      const filteredTires = filterTires(state);
      // When setting width, we need to update available options
      // ignoring the current width filter to calculate what's available
      const availableOptions = getAvailableOptions({
        ...state,
        width, // Use the new width value
      });
      return { filteredTires, availableOptions };
    });
  },
  
  setProfile: (profile) => {
    set({ profile });
    set(state => {
      const filteredTires = filterTires(state);
      const availableOptions = getAvailableOptions({
        ...state,
        profile, // Use the new profile value
      });
      return { filteredTires, availableOptions };
    });
  },
  
  setRimSize: (rimSize) => {
    set({ rimSize });
    set(state => {
      const filteredTires = filterTires(state);
      const availableOptions = getAvailableOptions({
        ...state,
        rimSize, // Use the new rimSize value
      });
      return { filteredTires, availableOptions };
    });
  },
  
  setVehicleType: (vehicleType) => {
    set({ vehicleType });
    set(state => {
      const filteredTires = filterTires(state);
      const availableOptions = getAvailableOptions({
        ...state,
        vehicleType, // Use the new vehicleType value
      });
      return { filteredTires, availableOptions };
    });
  },
  
  setBrand: (brand) => {
    set({ brand });
    set(state => {
      const filteredTires = filterTires(state);
      const availableOptions = getAvailableOptions({
        ...state,
        brand, // Use the new brand value
      });
      return { filteredTires, availableOptions };
    });
  },
  
  setSearchQuery: (searchQuery) => {
    set({ searchQuery });
    set(state => {
      const filteredTires = filterTires(state);
      const availableOptions = getAvailableOptions({
        ...state,
        searchQuery, // Use the new searchQuery value
      });
      return { filteredTires, availableOptions };
    });
  },
  
  resetFilters: () => {
    set({
      width: null,
      profile: null,
      rimSize: null,
      vehicleType: null,
      brand: null,
      searchQuery: '',
      availableOptions: initialOptions,
      filteredTires: tires
    });
  },
  
  updateAvailableOptions: () => {
    set(state => {
      const filteredTires = filterTires(state);
      const availableOptions = getAvailableOptions(state);
      return { filteredTires, availableOptions };
    });
  }
}));

export default useFilterStore;