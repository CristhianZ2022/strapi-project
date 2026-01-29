import { useClients } from "@/hooks/useClients";

export default function ClientsList() {
  const { data, isLoading, error } = useClients();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading clients</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
  {data?.data.map((client) => (
    <div
      key={client.documentId}
      className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow"
    >
      <h2 className="text-xl font-semibold text-indigo-600 mb-4">
        {client.nombres} {client.apellidos}
      </h2>

      <div className="space-y-2 text-gray-700">
        <p>
          <span className="font-medium text-gray-900">📧 Email:</span>{" "}
          {client.email}
        </p>
        <p>
          <span className="font-medium text-gray-900">📞 Teléfono:</span>{" "}
          {client.telefono}
        </p>
        <p>
          <span className="font-medium text-gray-900">💰 Valores:</span>{" "}
          ${client.valores}
        </p>
        <p>
          <span className="font-medium text-gray-900">🏙️ Ciudad:</span>{" "}
          {client.ciudad}
        </p>
        <p>
          <span className="font-medium text-gray-900">📄 Contrato:</span>{" "}
          {client.contrato}
        </p>
        <p>
          <span className="font-medium text-gray-900">🆔 Identificación:</span>{" "}
          {client.identificacion}
        </p>
        <p>
          <span className="font-medium text-gray-900">📌 Estado:</span>{" "}
          <span
            className={`px-2 py-1 rounded text-sm ${
              client.estado === "ACTIVO"
                ? "bg-green-100 text-green-700"
                : client.estado === "SUSPENDIDO"
                ? "bg-yellow-100 text-shadow-yellow-400"
                : "bg-red-100 text-red-700"
            }`}
          >
            {client.estado}
          </span>
        </p>
      </div>
    </div>
  ))}
</div>
  );
}