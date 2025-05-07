import { create } from 'zustand';
import { CartState, CartItem, ServiceType, Tire } from '../types';

type CartStore = CartState & {
  addToCart: (tire: Tire, quantity: number) => void;
  removeFromCart: (tireId: string) => void;
  updateQuantity: (tireId: string, quantity: number) => void;
  setServiceType: (type: ServiceType) => void;
  setLocation: (locationId: string) => void;
  clearCart: () => void;
  calculateTotal: () => void;
};

const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  serviceType: ServiceType.FITTING,
  selectedLocationId: null,
  total: 0,
  
  addToCart: (tire: Tire, quantity: number) => {
    const { items } = get();
    const existingItemIndex = items.findIndex(item => item.tire.id === tire.id);
    
    if (existingItemIndex !== -1) {
      const updatedItems = [...items];
      updatedItems[existingItemIndex].quantity += quantity;
      set({ items: updatedItems });
    } else {
      set({ items: [...items, { tire, quantity }] });
    }
    
    get().calculateTotal();
  },
  
  removeFromCart: (tireId: string) => {
    const { items } = get();
    const updatedItems = items.filter(item => item.tire.id !== tireId);
    set({ items: updatedItems });
    get().calculateTotal();
  },
  
  updateQuantity: (tireId: string, quantity: number) => {
    const { items } = get();
    const updatedItems = items.map(item => 
      item.tire.id === tireId ? { ...item, quantity } : item
    );
    set({ items: updatedItems });
    get().calculateTotal();
  },
  
  setServiceType: (type: ServiceType) => {
    // When changing service type, reset the selected location
    set({ 
      serviceType: type,
      selectedLocationId: null
    });
    get().calculateTotal();
  },
  
  setLocation: (locationId: string) => {
    set({ selectedLocationId: locationId });
  },
  
  clearCart: () => {
    set({ items: [], total: 0 });
  },
  
  calculateTotal: () => {
    const { items } = get();
    let total = 0;
    
    // Calculate subtotal from items (no additional service fees)
    items.forEach(item => {
      const price = item.tire.salePrice || item.tire.price;
      total += price * item.quantity;
    });
    
    // No fitting fees - all fitting services are free
    
    set({ total });
  }
}));

export default useCartStore;