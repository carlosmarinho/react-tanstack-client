import { useCallback, useEffect, useState } from "react";

interface Client {
  id: number;
  name: string;
}

function App() {
  const [clients, setClients] = useState<Client[]>([]);

  const fetchClients = useCallback(async () => {
    const response = await fetch("/api/getclients");
    const data: Client[] = await response.json();
    setClients(data);
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  console.log("\n\n***\n clients: ", clients, "\n***\n");

  return (
    <div>
      <h1>Client app</h1>
      {clients?.map((client) => (
        <div key={client.id}>{client.name}</div>
      ))}
    </div>
  );
}

export default App;
