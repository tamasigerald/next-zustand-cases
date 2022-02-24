import { useAtom } from "jotai";
import type { NextPage } from "next";
import Link from "next/link";
import { filteredProducts } from "../components/common/atoms";
import { useStore } from "../store/store";
import { useStoreReduxReducer, useStoreRedux2 } from "../store/store-redux";
import { useVanillaStore, store } from "../store/store-vanilla";
import { useStaticStore } from "../store/store-with-props";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const {
    isCartOpen: isCartOpenMiddleware,
    isMenuOpen: isMenuOpenMiddleware,
    dispatch: dispatchMiddleware,
  } = useStoreReduxReducer();
  const { computed: computedRedux, dispatch } = useStoreRedux2();
  const { computed, toggleCart, toggleMenu } = useStore();
  const {
    computed: computedVanilla,
    toggleCart: toggleVanillaCart,
    toggleMenu: toggleVanillaMenu,
  } = useVanillaStore();

  const staticStore = useStaticStore();

  const [filtered] = useAtom(filteredProducts);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Vanilla store state:</h2>
            <p>{computedVanilla()}</p>
            <button onClick={toggleVanillaCart}>cart</button>
            <button onClick={toggleVanillaMenu}>menu</button>

            <p>
              State from vanilla store:{" "}
              {`menu: ${store.getState().isMenuOpen} - cart: ${
                store.getState().isCartOpen
              }`}
            </p>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Store state:</h2>
            <p>{computed()}</p>
            <button onClick={toggleCart}>cart</button>
            <button onClick={toggleMenu}>menu</button>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Redux state:</h2>
            <p>{computedRedux()}</p>
            <button onClick={() => dispatch({ type: "toggleCart" })}>
              cart
            </button>
            <button onClick={() => dispatch({ type: "toggleMenu" })}>
              menu
            </button>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Redux middleware state:</h2>
            <p>{`menu: ${isMenuOpenMiddleware} - cart: ${isCartOpenMiddleware}`}</p>
            <button onClick={() => dispatchMiddleware({ type: "toggleCart" })}>
              cart
            </button>
            <button onClick={() => dispatchMiddleware({ type: "toggleMenu" })}>
              menu
            </button>
          </div>
        </div>
      </div>

      <main className={styles.main}>
        {filtered.length > 0 && <h2>Results: {filtered.length}</h2>}
        <button onClick={() => staticStore.dispatch({ type: "actionToggler" })}>
          static store action
        </button>
        <div className={styles.grid}>
          {filtered &&
            filtered.length > 0 &&
            filtered.map((product, i) => (
              <Link key={i} passHref href={`/${product.id}`}>
                <a className={styles.card}>
                  <h2>{product.title}</h2>
                  <p>{product.description}</p>
                </a>
              </Link>
            ))}
        </div>
      </main>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const res = await fetch("https://fakestoreapi.com/products/");
  const products = await res.json();

  return {
    props: {
      initZustand: {
        products: products,
      },
    }, // will be passed to the page component as props
  };
}
