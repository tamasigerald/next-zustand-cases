import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Product, useStaticStore } from "../store/store-with-props";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { query } = useRouter();
  const product = useStaticStore((s) => s.products)?.find(
    (product) => product.id.toString() === query.id
  );
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.grid}>
          {product && (
            <div className={styles.card}>
              <h2>{product.title}</h2>
              <p>{product.description}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  const res = await fetch("https://fakestoreapi.com/products/");
  const products = (await res.json()) as Product[];

  let paths: { params: { id: any } }[] = [];

  products.forEach((product) => {
    const path = { params: { id: product.id.toString() } };
    paths.push(path);
  });

  return {
    paths: paths,
    fallback: true, // false or 'blocking'
  };
}
