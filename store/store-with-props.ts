import create from "zustand";
import { devtools } from "zustand/middleware";
import createContext from "zustand/context";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
};

export type Actions = {
  type: "actionToggler";
};

const reducer = (
  state: InitialStateType,
  action: Actions
): InitialStateType => {
  switch (action.type) {
    case "actionToggler":
      alert(
        `There are a total of ${state.products?.length} products on the store`
      );
      return { ...state };
  }
  return state;
};

type InitialStateType = {
  products?: Product[];
};

export const initialState: InitialStateType = { products: undefined };

// Dynamically crated store to use on getStaticProps, getServerSideProps or getInitialProps

export const initStore = (data?: Partial<InitialStateType>, name?: string) => {
  const createStore = () =>
    create<InitialStateType & { dispatch: (action: Actions) => void }>(
      devtools(
        (set, get) => ({
          ...initialState,
          ...data,
          dispatch: (action: Actions) =>
            set((state) => reducer(state, action), undefined, action.type),
        }),
        { name: name || "static-generated-store" }
      )
    );

  return createStore;
};

const { Provider, useStore, useStoreApi } = createContext<
  InitialStateType & { dispatch: (action: Actions) => void }
>();

export {
  Provider,
  useStore as useStaticStore,
  useStoreApi as useStaticStoreApi,
};
