import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { TypeClient } from "../../../types/clientSchema";

interface Client {
  id: number;
  nome?: string;
  nomeFantasia?: string;
}

function ListClient() {
  //   const [clients, setClients] = useState<Client[]>([]);

  const fetchClients = useCallback(async () => {
    const response = await fetch("/api/clients");
    return (await response.json()) as TypeClient[];
  }, []);

  //   useEffect(() => {
  //     fetchClients();
  //   }, [fetchClients]);

  const { data: clients, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
  });

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
    <ul>
      {clients?.map((client) => (
        <li key={client.id}>
          {client.tipo === "PF" ? client.nome : client.nomeFantasia}{" "}
          <button>Editar</button>{" "}
          <button onClick={() => handleDelete(client.id!)}>Deletar</button>
        </li>
      ))}
    </ul>
  );
}

export default ListClient;
