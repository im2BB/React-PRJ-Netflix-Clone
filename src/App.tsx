import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Routes/Pages/Home";
import Tv from "./Routes/Pages/Tv";
import Search from "./Routes/Pages/Search";
import Header from "./Routes/Components/Header";
import Footer from "./Routes/Components/Footer";

import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <Router>
        <Header />
        <Routes>
          <Route path="/react-PRJ2" element={<Home />} />
          <Route path="/movies/:id" element={<Home />} />
          <Route path="/tv" element={<Tv />} />
          <Route path="/tv/:id" element={<Tv />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search/:id" element={<Search />} />
        </Routes>
        <Footer />
      </Router>
    </QueryClientProvider>
  );
}

export default App;