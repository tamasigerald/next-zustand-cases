import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import { initStore, Provider } from "../store/store-with-props";

import App from "next/app";
import Header from "../components/common/Header";

function MyApp({ Component, pageProps }: AppProps) {
  const createStore = initStore(pageProps.initZustand);
  return (
    <Provider createStore={createStore}>
      <Header />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
