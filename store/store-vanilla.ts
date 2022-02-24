import create from "zustand";
import createVanilla from "zustand/vanilla";

export type Store = {
  isMenuOpen: boolean;
  isCartOpen: boolean;
  computed: () => string;
};

const initialState: Store = {
  isMenuOpen: false,
  isCartOpen: false,
  computed: () => "",
};

export type ActionsType = {
  toggleCart: () => void;
  toggleMenu: () => void;
};

// VANILLA STORE

export const store = createVanilla<Store & ActionsType>((set, get) => ({
  ...initialState,
  computed: () => `menu: ${get().isMenuOpen} - cart: ${get().isCartOpen}`,
  toggleCart: () => set((s) => ({ ...s, isCartOpen: !s.isCartOpen })),
  toggleMenu: () => set((s) => ({ ...s, isMenuOpen: !s.isMenuOpen })),
}));

// VANILLA STORE CONVERTED TO HOOK STORE

export const useVanillaStore = create(store);
