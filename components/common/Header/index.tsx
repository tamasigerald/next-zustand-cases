import Search from "./Search";
import styles from "./styles.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Search />
    </header>
  );
};

export default Header;
