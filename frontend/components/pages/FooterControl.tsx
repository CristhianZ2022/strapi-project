"use client";

import { Button } from "@/components/ui/button";
import { useClientContext } from "@/contexts/client-context";
import { useClientById } from "@/hooks/useClientById";
import { useUpdateClient } from "@/hooks/useUpdateClient";

export default function FooterControl() {
  const { selectedClientId, isEditing, setIsEditing, formData, resetFormData, isValidToSave, validationError } =
    useClientContext();

  const { data: client } = useClientById(selectedClientId || "");
  const updateClient = useUpdateClient();

  const handleEdit = () => {
    if (client) {
      resetFormData(client);
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    if (!selectedClientId) return;

    updateClient.mutate(
      { documentId: selectedClientId, data: formData },
      { onSuccess: () => resetFormData(undefined) },
    );
  };

  const handleCancel = () => {
    resetFormData(client ?? undefined);
  };

  const hasClient = !!selectedClientId;

  return (
    <footer className="w-full bg-white dark:bg-gray-950 border-t border-indigo-100 dark:border-indigo-900/30 p-3 shadow-sm mt-auto">
      <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-7xl mx-auto">
        {isEditing ? (
          <>
            <Button
              className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm px-6 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSave}
              disabled={updateClient.isPending || !isValidToSave}
            >
              {updateClient.isPending ? "Guardando..." : "Guardar"}
            </Button>
            <Button
              variant={"outline"}
              className="border-red-200 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/50"
              onClick={handleCancel}
              disabled={updateClient.isPending}
            >
              Cancelar
            </Button>
          </>
        ) : (
          <>
            <Button
              className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm px-6"
              disabled
            >
              Guardar
            </Button>
            <Button
              variant={"outline"}
              className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-900/50"
              onClick={handleEdit}
              disabled={!hasClient}
            >
              Editar
            </Button>
          </>
        )}
        <Button
          variant={"outline"}
          className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-900/50"
        >
          Nuevo
        </Button>
        <Button
          variant={"outline"}
          className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-900/50"
        >
          + Añadir
        </Button>
        <Button
          variant={"outline"}
          className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-900/50"
        >
          Liberar
        </Button>
        <Button
          variant={"outline"}
          className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-900/50"
        >
          RE-ENVIAR PIN
        </Button>
        <Button
          variant={"outline"}
          className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-900/50"
        >
          Hist de Planes
        </Button>
        <Button
          variant={"outline"}
          className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-900/50"
        >
          Enviar Contrato
        </Button>

        {updateClient.isError && (
          <p className="w-full text-center text-xs text-red-500 mt-1 flex-1 basis-full">
            Error al guardar. Intente nuevamente.
          </p>
        )}
        {validationError && isEditing && (
          <p className="w-full text-center text-xs text-amber-600 mt-1 flex-1 basis-full font-medium">
            ⚠ {validationError}
          </p>
        )}
      </div>
    </footer>
  );
}
