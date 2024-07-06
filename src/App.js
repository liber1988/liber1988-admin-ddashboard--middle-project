import "bootstrap-icons/font/bootstrap-icons.css";
import "remixicon/fonts/remixicon.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Main from "./components/Main";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import TradingTable from "./pages/TradingTable";
import FaqPage from "./pages/Faq";
import BlankSection from "./pages/Blank";
import NewsPage from "./pages/NewsPage.jsx";
import Contact from "./pages/Contact.jsx";
import MacroTable from "./pages/MacroTable.jsx";
import IndustryPerformance from "./pages/IndustryPerformance.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/Profile.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <SideBar />
        <Routes>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<Main />}></Route>
          <Route path="/mainpage" element={<TradingTable />}></Route>
          <Route path="/F.A.Q" element={<FaqPage />}></Route>
          <Route path="/Blank" element={<BlankSection />}></Route>
          <Route path="/News" element={<NewsPage />}></Route>
          <Route path="/Contact" element={<Contact />}></Route>
          <Route path="/Macrotable" element={<MacroTable />}></Route>
          <Route
            path="/IndustryTable"
            element={<IndustryPerformance />}
          ></Route>
          <Route path="/Profile" element={<Profile />}></Route>
        </Routes>
        <ToastContainer />

        <Footer />
        <BackToTop />
      </BrowserRouter>
    </>
  );
}

export default App;
