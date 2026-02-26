import { useClientContext } from "@/contexts/client-context";
import { useClientById } from "@/hooks/useClientById";
import { UserI } from "../icons/Icons";
import { styles } from "@/app/styles/styles";
import { ClientDataRow } from "../ui/client-data-row";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import Select from "../ui/select";
import StarRating from "../ui/stars";

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
        <section className={cn(styles.leftColumn, "w-2/4")}>
          <ClientDataRow label="Fecha de instalación">
            <p className={styles.select}>11-01-2026</p>
          </ClientDataRow>
          <ClientDataRow label="Fecha de Traslado">
            <p className={styles.select}>12-01-2026</p>
          </ClientDataRow>
          <ClientDataRow label="Cliente desde">
            <p className={styles.select}># años | # meses | # dias</p>
          </ClientDataRow>
          <ClientDataRow label="Cantón">
            <p className={styles.select}>{client.ciudad}</p>
          </ClientDataRow>
          <ClientDataRow label="Dirección de instalación">
            <Input
              type="text"
              className={styles.input}
              value={client.ciudad}
              readOnly
            />
          </ClientDataRow>
          <ClientDataRow label="Dirección de Trabajo">
            <Input
              type="text"
              className={styles.input}
              value={client.ciudad}
              readOnly
            />
          </ClientDataRow>
          <ClientDataRow label="La vivienda es_">
            <Select defaultValue={client.estado}>
              <option value="Propia">PROPIA</option>
              <option value="Alquilada">ALQUILADA</option>
              <option value="Familiar">FAMILIAR</option>
            </Select>
          </ClientDataRow>
          <ClientDataRow label="Referencia de la ubicación">
            <textarea
              className="min-h-10 w-full max-h-24 p-2 text-xs focus:ring-0 dark:text-gray-200 border-none"
              value={client.ciudad}
              readOnly
            />
          </ClientDataRow>
          <ClientDataRow label="Calificación Crediticia">
            <p className={styles.select}>0</p>
            <span>
              <StarRating score={500} />
            </span>
          </ClientDataRow>
        </section>
        <section className={cn(styles.rightColumn, "w-2/4")}>
          <ClientDataRow label="Fecha de creación">
            <p className={styles.select}>10-01-2026</p>
          </ClientDataRow>
          <ClientDataRow label="Fecha de Terminado">
            <p className={styles.select}>00-00-0000</p>
          </ClientDataRow>
        </section>
      </main>
    </article>
  );
}
