import create from "zustand";
import { devtools } from "zustand/middleware";

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

export const useStore = create<Store & ActionsType>(
  devtools(
    (set, get) => ({
      ...initialState,
      computed: () => `menu: ${get().isMenuOpen} - cart: ${get().isCartOpen}`,
      toggleCart: () =>
        set(
          (s) => ({ ...s, isCartOpen: !s.isCartOpen }),
          undefined,
          "toggleCart"
        ),
      toggleMenu: () =>
        set(
          (s) => ({ ...s, isMenuOpen: !s.isMenuOpen }),
          undefined,
          "toggleMenu"
        ),
    }),
    { name: "hook-store" }
  )
);
