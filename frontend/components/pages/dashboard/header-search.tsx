import SearchInput from "@/components/ui/searchInput";

export default function HeaderSearch() {
  const styles = {
    header:
      "w-full bg-gray-200 dark:bg-gray-950 border-b px-4 py-0.5 sticky top-0 z-20 shadow-sm",
    container: "max-w-7xl mx-auto",
    searchRow:
      "flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center",
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.searchRow}>
          <SearchInput
            type="text"
            id="identifier"
            placeholder="Identificación"
          />
          <SearchInput
            type="text"
            id="nombres-apellidos"
            placeholder="Nombres y apellidos"
          />

          <SearchInput 
            type="text" id="contrato" 
            placeholder="Contrato" 
          />
        </div>
      </div>
    </header>
  );
}
