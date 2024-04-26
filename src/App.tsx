import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListClient from "./components/clients/list";
import AddClient from "./components/clients/add"; // Import the AddClient component
import HomePage from "./pages/home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/add-client" Component={AddClient} />
        <Route path="/list-client" Component={ListClient} />
      </Routes>
    </Router>
  );
}

export default App;
