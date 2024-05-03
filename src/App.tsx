import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListClient from "./pages/client/List";
import AddClientPage from "./pages/client/Add";
import EditClientPage from "./pages/client/Edit";
import HomePage from "./pages/home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/add-client" Component={AddClientPage} />
          <Route path="/edit-client/:id" Component={EditClientPage} />
          <Route path="/list-client" Component={ListClient} />
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
