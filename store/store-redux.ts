import create from "zustand";
import { devtools, redux } from "zustand/middleware";

export type Store = {
  isMenuOpen: boolean;
  isCartOpen: boolean;
  computed: () => string;
};

export type Actions =
  | {
      type: "toggleCart";
    }
  | { type: "toggleMenu" };

const reducer = (state: Store, action: Actions): Store => {
  switch (action.type) {
    case "toggleCart":
      return { ...state, isCartOpen: !state.isCartOpen };
    case "toggleMenu":
      return { ...state, isMenuOpen: !state.isMenuOpen };
  }
};

const initialState: Store = {
  isMenuOpen: false,
  isCartOpen: false,
  computed: () => "",
};

// REDUX TYPE STORE

export const useStoreReduxReducer = create(
  devtools(redux(reducer, initialState), { name: "redux-middleware-store" })
);

export const useStoreRedux2 = create<
  Store & { dispatch: (action: Actions) => void }
>(
  devtools(
    (set, get) => ({
      ...initialState,
      computed: () => `menu: ${get().isMenuOpen} - cart: ${get().isCartOpen}`,
      dispatch: (action: Actions) =>
        set((state) => reducer(state, action), undefined, action.type),
    }),
    { name: "redux-store" }
  )
);
