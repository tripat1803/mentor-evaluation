import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";

const { Routes, Route } = require("react-router-dom");

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/students" element={<Students/>} />
      </Routes>
      <Toaster/>
    </Layout>
  );
}

export default App;
