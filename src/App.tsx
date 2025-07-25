import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Helmet } from "react-helmet";
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
      <Helmet>
        <title>MovieSpot - 영화 검색</title>
        <meta
          name="description"
          content="MovieSpot - 영화와 TV 프로그램을 검색하고 정보를 확인하세요"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/logo_transparent.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/logo_transparent.png"
        />
        <link rel="apple-touch-icon" href="/logo_transparent.png" />
      </Helmet>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/react-PRJ2" replace />} />
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
