import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import NotFound from "./pages/NotFound/NotFound";
import Unauthorized from "./pages/Unauthorized/Unauthorized";

function App() {
  const { user } = useSelector((state) => state);
  return (
    <>
      {user == null ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : user.role == "admin" ? (
        <Routes>
          <Route path="/" element={<p>Acceuil admin</p>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : user.role == "gerant" ? (
        <Routes>
          <Route path="/" element={<p>Acceuil gérant</p>} />
          <Route path="/a" element={<p>a gérant</p>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : user.role == "technicien" ? (
        <Routes>
          <Route path="/" element={<p>Aceuil technicien</p>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : user.role == "assistant" ? (
        <Routes>
          <Route path="/" element={<p>Aceuil assistant</p>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="*" element={<Unauthorized />} />
        </Routes>
      )}
    </>
  );
}

export default App;
