import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import Login from "./pages/Login/Login";

function App() {
  const { user } = useSelector((state) => state);
  return (
    <>
      {user == null ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<p>register</p>} />
        </Routes>
      ) : user.role == "admin" ? (
        <Routes>
          <Route path="/" element={<p>Acceuil admin</p>} />
        </Routes>
      ) : user.role == "gerant" ? (
        <Routes>
          <Route path="/" element={<p>Acceuil gérant</p>} />
          <Route path="/a" element={<p>a gérant</p>} />
          <Route path="*" element={<p>not found</p>} />
        </Routes>
      ) : user.role == "technicien" ? (
        <Routes>
          <Route path="/" element={<p>Aceuil technicien</p>} />
        </Routes>
      ) : user.role == "assistant" ? (
        <Routes>
          <Route path="/" element={<p>Aceuil assistant</p>} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<p>User error</p>} />
        </Routes>
      )}
    </>
  );
}

export default App;
