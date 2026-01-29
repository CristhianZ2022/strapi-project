import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";

export default function HeaderSearch() {
  const styles = {
    header:
      "w-full bg-gray-200 dark:bg-gray-950 border-b px-4 py-0.5 sticky top-0 z-20 shadow-sm",
    container: "max-w-7xl mx-auto",
    searchRow:
      "flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center",
    searchField: "relative flex w-full",
    searchFieldContainer: {
      identifier: "sm:w-64 lg:w-72 min-w-50",
      nombres: "sm:w-80 lg:w-96 min-w-60",
      contrato: "sm:w-64 lg:w-72 min-w-50",
    },
    input:
      "flex-1 h-6 px-3 text-xs placeholder:text-xs text-center bg-gray-50/70 dark:bg-gray-900/70 shadow-none focus-visible:ring-1 focus-visible:ring-offset-0 border-none outline-none rounded-l-none",
    searchButton:
      "h-6 px-3 text-black-400/80 text-xs border-r border-gray-300 dark:border-gray-700 cursor-pointer flex items-center justify-center bg-gray-50/70 dark:bg-gray-900/70 hover:bg-gray-100/70 dark:hover:bg-gray-800/70 transition-colors rounded-l",
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.searchRow}>
          {/* Campo Identificación */}
          <div
            className={`${styles.searchField} ${styles.searchFieldContainer.identifier}`}
          >
            <button className={styles.searchButton} type="button">
              <FaSearch />
            </button>
            <Input
              id="identifier"
              placeholder="Identificación"
              className={styles.input}
              autoComplete="off"
            />
          </div>

          {/* Campo Nombres y apellidos */}
          <div
            className={`${styles.searchField} ${styles.searchFieldContainer.nombres}`}
          >
            <button className={styles.searchButton} type="button">
              <FaSearch />
            </button>
            <Input
              id="nombres&apellidos"
              placeholder="Nombres y apellidos"
              className={styles.input}
              autoComplete="off"
            />
          </div>

          {/* Campo Contrato */}
          <div
            className={`${styles.searchField} ${styles.searchFieldContainer.contrato}`}
          >
            <button className={styles.searchButton} type="button">
              <FaSearch />
            </button>
            <Input
              id="contrato"
              placeholder="Contrato"
              className={styles.input}
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
