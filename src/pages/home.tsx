import { Link } from "react-router-dom";
import ListClient from "../components/clients/list";

function HomePage() {
  return (
    <div>
      <Link to="/add-client">
        <button>Add Client</button>
      </Link>
      <h1>Client app!</h1>
      <ListClient />
    </div>
  );
}

export default HomePage;
