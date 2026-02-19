"use client";

import { useClientContext } from "@/contexts/client-context";
import { useClientById } from "@/hooks/useClientById";
import { FaUser } from "react-icons/fa6";

export default function ClientDataDisplay() {
  const { selectedClientId, activeTab } = useClientContext();
  const {
    data: client,
    isLoading,
    error,
  } = useClientById(selectedClientId || "");

  if (!selectedClientId) {
    return (
      <div className="text-center py-12 text-gray-400 dark:text-gray-500">
        <FaUser className="mx-auto text-4xl mb-3 opacity-30" />
        <p className="text-sm">
          Busca y selecciona un cliente para ver su información
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Cargando datos del cliente...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        <p className="text-sm">Error al cargar los datos del cliente</p>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="text-center py-12 text-gray-400 dark:text-gray-500">
        <p className="text-sm">No se encontraron datos del cliente</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-900">
      {activeTab === "cliente" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Información del Cliente
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Nombres
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {client.nombres}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Apellidos
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {client.apellidos}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Identificación
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {client.identificacion}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Contrato
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {client.contrato}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Email
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {client.email}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Teléfono
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {client.telefono}
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Estado
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    client.estado === "ACTIVO"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : client.estado === "SUSPENDIDO"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  {client.estado}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "direccion" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Dirección
          </h2>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Ciudad
            </p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {client.ciudad}
            </p>
          </div>
        </div>
      )}

      {activeTab === "pagosPendientes" &&
        (client.valores > 0 ? (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Pagos Pendientes
            </h2>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Valores
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                ${client.valores}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Pagos Pendientes
            </h2>
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>No hay pagos pendientes registrados</p>
            </div>
          </div>
        ))}

      {activeTab === "pagosRealizados" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Pagos Realizados
          </h2>
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No hay historial de pagos recientes</p>
          </div>
        </div>
      )}
    </div>
  );
}
