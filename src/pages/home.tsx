import { ListClient } from "../components/clients/list";
import { Layout } from "../components/layouts";

function HomePage() {
  return (
    <Layout title="Listagem de Cliente">
      <ListClient />
    </Layout>
  );
}

export default HomePage;
