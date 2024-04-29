import ListClient from "../components/clients/list/ListClient";
import { Layout } from "../components/layouts";

function HomePage() {
  return (
    <Layout title="Listagem de Cliente">
      <ListClient />
    </Layout>
  );
}

export default HomePage;
