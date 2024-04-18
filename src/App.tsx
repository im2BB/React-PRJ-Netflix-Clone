import {BrowserRouter as Router,Route, Routes } from "react-router-dom";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./Routes/Components/Header";
import { QueryClient, QueryClientProvider } from "react-query";
import Footer from "./Routes/Components/Footer";

function App() {
  const client = new QueryClient();
    return (
    <QueryClientProvider client={client}>
      <Router>
        <Header />
        <Routes>
          <Route path="/tv" element={<Tv />} />
          <Route path="tv/:id" element={<Tv />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search/:id" element={<Search />} />
          <Route path="/" element={<Home />} />
          <Route path="movies/:id" element={< Home />} />
        </Routes>
        <Footer />
      </Router>
    </QueryClientProvider>

    );
  
  
  }
  
  
export default App;
