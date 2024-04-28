import { Layout } from "../components/layouts";
import ListClient from "../components/clients/list";

function HomePage() {
  return (
    <Layout title="Listagem de Cliente">
      <ListClient />
    </Layout>
  );
}

export default HomePage;
