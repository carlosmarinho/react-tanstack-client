import { Layout } from "../components/Layouts";
import ListClient from "../components/clients/list";

function HomePage() {
  return (
    <Layout title="Listagem de Cliente">
      <ListClient />
    </Layout>
  );
}

export default HomePage;
