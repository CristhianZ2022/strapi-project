"use client";

import { useClientContext } from "@/contexts/client-context";
import { useClientById } from "@/hooks/useClientById";
import { useEffect, useRef, useState } from "react";
import { SearchI, UserI } from "@/components/icons/Icons";
import { ClientDataRow } from "@/components/ui/client-data-row";
import { cn } from "@/lib/utils";
import Separator from "../ui/separator";
import Select from "../ui/select";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  TableSearchHeader,
  CompactTable,
  Headers,
  RowsStats,
} from "../ui/compact-table";
import {
  DataInput,
  DataSelect,
  DataToggle,
  DataRadioGroup,
} from "../ui/client-data-fields";
import { Input } from "../ui/input";
import { styles } from "@/app/styles/styles";

export default function RenderClient() {
  const { selectedClientId, setActiveTab } = useClientContext();
  const {
    data: client,
    isLoading,
    error,
  } = useClientById(selectedClientId || "");

  const [toggles, setToggles] = useState({
    corteAutomatico: false,
    facturaAutomatica: false,
    descuentoDiscapacidad: false,
    descuentoTerceraEdad: false,
    agenteRetencion: false,
    principal: false,
  });

  const [selectedMedia, setSelectedMedia] = useState("FIBRA ÓPTICA");
  const prevClientId = useRef(selectedClientId);

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    if (selectedClientId !== prevClientId.current) {
      prevClientId.current = selectedClientId;
      setActiveTab("cliente");
    }
  }, [selectedClientId, setActiveTab]);

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
        <section className={cn(styles.leftColumn, "w-3/4")}>
          <ClientDataRow label="Venta">
            <div className="flex w-full items-center">
              <p className={styles.select}>Venta Tradicional</p>
              <Separator />
              <p className="w-32 text-center text-indigo-600 text-sm">
                {client.contrato}
              </p>
            </div>
            <Separator />
            <div className="flex w-md gap-2">
              <Select defaultValue={client.estado}>
                <option value="PROSPECTO">PROSPECTO</option>
                <option value="ACTIVO" className="text-green-500">
                  ACTIVO
                </option>
                <option value="CORTADO" className="text-red-500">
                  CORTADO
                </option>
                <option value="SUSPENDIDO" className="text-yellow-500">
                  SUSPENDIDO
                </option>
                <option value="TERMINADO" className="text-gray-500">
                  TERMINADO
                </option>
              </Select>
            </div>
          </ClientDataRow>

          <ClientDataRow label="Identificación">
            <div className="flex gap-2 w-full items-center">
              <Select className="w-auto text-xs border-r dark:border-indigo-900/30 font-medium">
                {client.identificacion.length === 10 ? (
                  <option>CEDULA</option>
                ) : client.identificacion.length === 13 ? (
                  <option>RUC</option>
                ) : (
                  <option>PASAPORTE</option>
                )}
              </Select>
              <Input
                type="text"
                className={cn(styles.input, "font-mono font-medium")}
                value={client.identificacion}
                readOnly
              />
            </div>
          </ClientDataRow>

          <DataInput label="Razón Social" placeholder="Nombre de empresa" />

          <DataInput
            label="Cédula Rep.Legal"
            value={client.identificacion}
            readOnly
          />

          <DataInput
            label="Apellidos"
            value={client.apellidos}
            readOnly
            className="uppercase font-medium"
          />

          <DataInput
            label="Nombres"
            value={client.nombres}
            readOnly
            className="uppercase font-medium"
          />

          <ClientDataRow label="Contacto">
            <section className="flex flex-1 justify-between items-center gap-2">
              <div className="flex flex-1 items-center gap-2">
                <Label className={styles.inputLabel}>Telf:</Label>
                <Input
                  type="text"
                  className={cn(styles.input, "font-mono")}
                  value={"0" + client.telefono.toString()}
                  readOnly
                />
              </div>

              <div className="flex flex-1 items-center gap-2">
                <Label className={styles.inputLabel}>Celular SMS:</Label>
                <Input
                  type="text"
                  className={cn(styles.input, "font-mono")}
                  placeholder="0999999999"
                />
              </div>

              <div className="flex flex-1 items-center gap-2">
                <Label className={styles.inputLabel}>Celular(2):</Label>
                <Input
                  type="text"
                  className={cn(styles.input, "font-mono")}
                  placeholder="0999999999"
                />
              </div>
            </section>
          </ClientDataRow>

          <DataInput label="Email" value={client.email} readOnly />

          <DataInput
            label="Dirección Fac."
            className="uppercase"
            value={`${client.ciudad} - DIRECCION REFERENCIAL`}
            readOnly
          />

          <ClientDataRow label="Fecha Nacimiento">
            <div className="flex items-center gap-4">
              <input
                type="date"
                className="bg-transparent text-xs text-gray-600 dark:text-gray-300"
                defaultValue="2000-01-01"
              />
              <div className="flex items-center gap-2 text-indigo-500/80 text-[11px] bg-indigo-50 dark:bg-indigo-900/20 px-2 py-0.5 rounded">
                <span>📅 Edad:</span>
                <span className="font-medium">24 años | 1 meses | 18 días</span>
              </div>
            </div>
          </ClientDataRow>

          <DataRadioGroup
            label="Medio Plan"
            name="media"
            value={selectedMedia}
            onChange={setSelectedMedia}
            options={[
              { label: "COBRE", value: "COBRE" },
              { label: "MEDIO INALÁMBRICO", value: "MEDIO INALÁMBRICO" },
              { label: "FIBRA ÓPTICA", value: "FIBRA ÓPTICA" },
            ]}
          />

          <ClientDataRow label="Planes Mensuales">
            <CompactTable>
              <section
                className={cn(
                  "w-full flex bg-indigo-50/20 dark:bg-indigo-900/10 border-b border-indigo-100 dark:border-indigo-900/30",
                )}
              >
                <TableSearchHeader
                  ariaLabel="Planes Disponibles"
                  type="text"
                  id="planes"
                  placeholder="Busque aquí el plan"
                >
                  + Añadir (Principal)
                </TableSearchHeader>
                <Headers
                  headers={["Valor", "Principal", "$Dscto.", "Meses", "Opción"]}
                />
              </section>
              <RowsStats
                rows={[
                  {
                    title: "RESIDENCIAL ONE SOCIAL (200 MBPS)",
                    corte: 25,
                    valor: 20.54,
                    esPrincipal: true,
                    descuento: 0.0,
                    meses: -1,
                  },
                ]}
              />
            </CompactTable>
          </ClientDataRow>

          <DataSelect label="Es una entidad">
            <option>PRIVADA</option>
            <option>PUBLICA</option>
          </DataSelect>

          <DataSelect label="Rubro Instalación">
            <option>INSTALACION RESIDENCIAL F.O | 178.2522</option>
          </DataSelect>

          <ClientDataRow label="Descuento Aplicado">
            <div className="flex-1 flex items-center">
              <Select className={cn("w-3/4")}>
                <option>Ninguno</option>
              </Select>
              <div className="flex items-center px-4 border-l border-indigo-100 dark:border-indigo-900/30 text-[11px] text-gray-500 bg-indigo-50/20 h-full">
                A Cancelar:{" "}
                <span className="ml-2 font-bold text-indigo-700 dark:text-indigo-300 font-mono text-xs">
                  178.2522
                </span>
              </div>
            </div>
          </ClientDataRow>

          <DataToggle
            label="Corte Automático"
            onToggle={() => handleToggle("corteAutomatico")}
            isOn={toggles.corteAutomatico}
          />

          <ClientDataRow label="Aplica Dscto.">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-[11px]">
                  Por Discapacidad:
                </span>
                <DataToggle
                  label=""
                  onToggle={() => handleToggle("descuentoDiscapacidad")}
                  isOn={toggles.descuentoDiscapacidad}
                  size="sm"
                  rowClassName="border-none bg-transparent hover:bg-transparent min-h-0 p-0"
                />
              </div>
              <Separator />
              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-[11px]">
                  Por Tercera Edad:
                </span>
                <DataToggle
                  label=""
                  onToggle={() => handleToggle("descuentoTerceraEdad")}
                  isOn={toggles.descuentoTerceraEdad}
                  size="sm"
                  rowClassName="border-none bg-transparent hover:bg-transparent min-h-0 p-0"
                />
              </div>
            </div>
          </ClientDataRow>
        </section>

        <section className={cn(styles.rightColumn, "w-1/4")}>
          <div className="p-4 border-b border-indigo-100 dark:border-indigo-900/30 bg-white dark:bg-gray-950">
            <DataToggle
              label="¿Es agente de retención?"
              onToggle={() => handleToggle("agenteRetencion")}
              isOn={toggles.agenteRetencion}
              rowClassName="border-none bg-transparent hover:bg-transparent min-h-0 p-0"
            />
          </div>
          <div className="p-4 flex flex-col gap-3 h-[calc(100%-250px)]">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Subir Archivos
              </label>
              <div className="flex gap-2">
                <Select>
                  <option>Seleccione tipo de archivo</option>
                </Select>
                <Button className={styles.uploadButton}>CARGAR</Button>
              </div>
            </div>

            <div className="border border-indigo-100 dark:border-indigo-900/30 rounded-lg bg-white dark:bg-gray-950 flex-1 overflow-hidden shadow-sm flex flex-col">
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-indigo-50/50 dark:bg-indigo-900/20 z-10">
                  <tr>
                    <th className={styles.tableHeader}>Archivo</th>
                    <th className={styles.tableHeader}>Tipo</th>
                    <th className={styles.tableHeader}>Opción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      colSpan={3}
                      className="p-8 text-center text-gray-400 italic text-[11px]"
                    >
                      No hay archivos adjuntos
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="border-t border-indigo-100 dark:border-indigo-900/30 bg-white dark:bg-gray-950">
            <DataSelect label="Cliente" defaultValue="RESIDENCIAL">
              <option>RESIDENCIAL</option>
              <option>CORPORATIVO</option>
            </DataSelect>

            <ClientDataRow label="Promoción" />

            <ClientDataRow label="Referido por">
              <div className="relative w-full">
                <SearchI className="absolute left-0 top-0.5 w-3 h-3 text-gray-300" />
                <input
                  type="text"
                  className={cn(styles.input, "pl-5")}
                  placeholder="Buscar por nombres"
                />
              </div>
            </ClientDataRow>

            <ClientDataRow label="Motivo" />

            <DataToggle
              label="Factura auto."
              onToggle={() => handleToggle("facturaAutomatica")}
              isOn={toggles.facturaAutomatica}
            />

            <ClientDataRow label="Referencia">
              <span className="text-gray-400 italic text-[10px]">
                NO HABILITADO
              </span>
            </ClientDataRow>
          </div>
        </section>
      </main>
    </article>
  );
}
