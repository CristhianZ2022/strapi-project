import { useClientContext } from "@/contexts/client-context";
import { useClientById } from "@/hooks/useClientById";
import { styles } from "@/app/styles/styles";
import {
  CompactTable,
  Headers,
  PaymentRow,
  PaymentRowData,
} from "../ui/compact-table";
import { Label } from "../ui/label";
import { useUser } from "@/hooks/useUser";

export default function RenderPaymentsHistory() {
  const { selectedClientId, setActiveTab } = useClientContext();
  const { data: user } = useUser();
  const {
    data: client,
    isLoading,
    error,
  } = useClientById(selectedClientId || "");

  const firstChar = user?.fullname
    ?.split(" ")[0]
    .split("")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const lastname = user?.lastname?.split(" ")[0]?.toUpperCase();

  const usuario = firstChar?.concat(lastname || "");

  if (!selectedClientId) {
    setActiveTab("cliente");
  }

  if (isLoading)
    return <div className="p-8 text-center text-xs">Cargando datos...</div>;
  if (error || !client)
    return (
      <div className="p-8 text-center text-xs text-red-500">
        Error al cargar datos
      </div>
    );

  const rows: PaymentRowData[] = [];

  return (
    <article className={styles.container} key={selectedClientId}>
      <main className={styles.mainGrid}>
        <CompactTable>
          <Headers
            headers={[
              "No.",
              "Emision",
              "Total",
              "Fecha de Pago",
              "Valor",
              "Forma de Pago",
              "Fecha de Deposito",
              "Documento",
              "Dsctos",
              `Usuario`,
              "Acción",
            ]}
          />
          <Label className="p-2 bg-indigo-50/20 dark:bg-indigo-900/10 border-b border-indigo-100 dark:border-indigo-900/30">
            Contrato No.: {client.contrato}
          </Label>
          {rows.length > 0 ? (
            rows.map((row) => (
              <PaymentRow
                key={row.id ?? row.no}
                row={row}
                onAction={(id) => console.log("Acción:", id)}
              />
            ))
          ) : (
            <div className="p-10 text-center text-gray-400 italic text-sm">
              No hay pagos realizados.
            </div>
          )}
        </CompactTable>
      </main>
    </article>
  );
}
