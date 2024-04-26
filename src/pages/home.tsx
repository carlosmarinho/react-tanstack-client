import { Link } from "react-router-dom";
import ListClient from "../components/clients/list";

function HomePage() {
  return (
    <div>
      <Link to="/add-client">
        <button>Add Client</button>
      </Link>
      <ListClient />
    </div>
  );
}

export default HomePage;
