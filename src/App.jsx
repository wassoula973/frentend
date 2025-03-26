import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import NotFound from "./pages/NotFound/NotFound";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import HomeAssistant from "./pages/Assistant/HomeAssistant/HomeAssistant";
import Navbar from "./components/Navbar/Navbar";
import HomeGerant from "./pages/Gerant/HomeGerant/HomeGerant";
import AddRequest from "./pages/Gerant/AddRequest/AddRequest";
import ListRequests from "./pages/ListRequests/ListRequests";
import RequestInfo from "./pages/RequestInfo/RequestInfo";
import StationInfo from "./pages/Gerant/StationInfo/StationInfo";
import HomeAdmin from "./pages/Admin/HomeAdmin/HomeAdmin";
import SidebarAdmin from "./components/SidebarAdmin/SidebarAdmin";
import ListUsers from "./pages/Admin/ListUsers/ListUsers";
import UserInfo from "./pages/Admin/UserInfo/UserInfo";
import ListStation from "./pages/Admin/ListStation/ListStation";
import StationInfoAdmin from "./pages/Admin/StationInfoAdmin/StationInfoAdmin";
import ListIntervention from "./pages/Admin/ListIntervention/ListIntervention";
import InterventionInfoAdmin from "./pages/Admin/InterventionInfoAdmin/InterventionInfoAdmin";

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
      ) : (
        <>
          <Navbar />
          {user.role == "admin" ? (
            <>
              <SidebarAdmin />
              <Routes>
                <Route path="/" element={<HomeAdmin />} />
                <Route path="/users" element={<ListUsers />} />
                <Route path="/user/:id" element={<UserInfo />} />
                <Route path="/stations" element={<ListStation />} />
                <Route path="/station/:id" element={<StationInfoAdmin />} />
                <Route path="/interventions" element={<ListIntervention />} />
                <Route
                  path="/intervention/:id"
                  element={<InterventionInfoAdmin />}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </>
          ) : user.role == "gerant" ? (
            <Routes>
              <Route path="/" element={<HomeGerant />} />
              <Route path="/add_request" element={<AddRequest />} />
              <Route path="/requests" element={<ListRequests />} />
              <Route path="/request/:id" element={<RequestInfo />} />
              <Route path="/station" element={<StationInfo />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          ) : user.role == "technicien" ? (
            <Routes>
              <Route path="/" element={<p>Aceuil technicien</p>} />
              <Route path="/requests" element={<ListRequests />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          ) : user.role == "assistant" ? (
            <Routes>
              <Route path="/" element={<HomeAssistant />} />
              <Route path="/request/:id" element={<RequestInfo />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="*" element={<Unauthorized />} />
            </Routes>
          )}
        </>
      )}
    </>
  );
}

export default App;
