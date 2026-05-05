import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/layout/Footer.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";
import AssetDetail from "./pages/AssetDetail.jsx";
import Explore from "./pages/Explore.jsx";
import Home from "./pages/Home.jsx";
import Learn from "./pages/Learn.jsx";
import Profile from "./pages/Profile.jsx";
import AddCrypto from "./pages/AddCrypto.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";

function App() {
  const location = useLocation();
  const isAuthRoute = location.pathname === "/signup" || location.pathname === "/signin";

  return (
    <div className={`min-h-screen text-slate-900 ${isAuthRoute ? "bg-[#05080f]" : "bg-slate-50"}`}>
      {isAuthRoute ? null : <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/asset/:symbol" element={<AssetDetail />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
          <Route path="/admin/crypto" element={<ProtectedRoute element={<AddCrypto />} />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </main>
      {isAuthRoute ? null : <Footer />}
    </div>
  );
}

export default App;
