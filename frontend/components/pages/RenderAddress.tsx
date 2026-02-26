import { useClientContext } from "@/contexts/client-context";
import { useClientById } from "@/hooks/useClientById";
import { UserI } from "../icons/Icons";
import { styles } from "@/app/styles/styles";
import { ClientDataRow } from "../ui/client-data-row";

export default function RenderAddress() {
  const { selectedClientId } = useClientContext();
  const {
    data: client,
    isLoading,
    error,
  } = useClientById(selectedClientId || "");

  if (!selectedClientId) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[600px] text-gray-400 dark:text-gray-600">
        <UserI className="text-6xl mb-4 opacity-20" />
        <p className="text-sm">Seleccione un cliente para ver su información</p>
      </div>
    );
  }

  if (isLoading)
    return <div className="p-8 text-center text-xs">Cargando datos...</div>;
  if (error || !client)
    return (
      <div className="p-8 text-center text-xs text-red-500">
        Error al cargar datos
      </div>
    );

  return (
    <article className={styles.container} key={selectedClientId}>
      <main className={styles.mainGrid}>
        <section className={styles.leftColumn}>
          <ClientDataRow label="Fecha de instalación">
            <p className={styles.select}>11-01-2026</p>
          </ClientDataRow>
        </section>
      </main>
    </article>
  );
}
