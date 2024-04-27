import { useCallback, useEffect, useState } from "react";

interface Client {
  id: number;
  nome?: string;
  nomeFantasia?: string;
}

function ListClient() {
  const [clients, setClients] = useState<Client[]>([]);

  const fetchClients = useCallback(async () => {
    const response = await fetch("/api/clients");
    const data: Client[] = await response.json();
    setClients(data);
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  async function handleDelete(id: number) {
    try {
      const response = await fetch(`/api/clients/20`, {
        method: "DELETE",
      });

      if (!response.ok) {
        // throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log(`Client with id ${id} deleted successfully`);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div>
      <h1>Client app!</h1>
      <ul>
        {clients?.map((client) => (
          <li key={client.id}>
            {client.nome || client.nomeFantasia} <button>Editar</button>{" "}
            <button onClick={() => handleDelete(client.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListClient;
