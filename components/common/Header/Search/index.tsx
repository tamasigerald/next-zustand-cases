import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useStaticStore } from "../../../../store/store-with-props";
import { filteredProducts } from "../../atoms";
import styles from "./styles.module.css";

const Search: React.FC = () => {
  const allProducts = useStaticStore((s) => s.products);

  const [, setFilteredProducts] = useAtom(filteredProducts);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    if (allProducts) {
      const filtered = allProducts.filter((product) =>
        product.title.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  return (
    <input className={styles.input}
      type="text"
      placeholder="search"
      value={input}
      onInput={(e) => setInput(e.currentTarget.value)}
    />
  );
};

export default Search;
