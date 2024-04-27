import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListClient from "./components/clients/list";
import AddClient from "./components/clients/add"; // Import the AddClient component
import HomePage from "./pages/home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/add-client" Component={AddClient} />
          <Route path="/list-client" Component={ListClient} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
