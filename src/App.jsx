import { Routes, Route } from "react-router-dom";
import Header from "./components/Nav/Header";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/ProtectedRoute/PrivateRoute";
import LoggedOut from "./components/LoggedOut/LoggedOut";
import MigraineJournalFull from "./pages/MigraineJournalFull";
import MigraineSingle from "./pages/MigraineSingle";
import NewMigraineButton from "./components/Migraines/NewMigraineButton";
import EditProfile from "./pages/EditProfile";
import NewMigraineRefactor from "./pages/NewMigraineRefactor";
import EditMigraine from "./pages/EditMigraine";
import AllStats from "./pages/AllStats";
import SunburstStats from "./components/Stats/SunburstStats";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<LoggedOut />}>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route element={<PrivateRoute />}>
            {/* All routes after the PrivateRoute require the user to be loggedIn */}
            <Route path="/profile" element={<NewMigraineButton />}>
              <Route index element={<Profile />} />
              <Route path="edit" element={<EditProfile />} />
            </Route>
            <Route path="/migraines" element={<NewMigraineButton />}>
              <Route index element={<MigraineJournalFull />} />
              <Route path=":id" element={<MigraineSingle />} />
              <Route path="statistics" element={<AllStats />} />
            </Route>
            <Route path="/migraines/edit/:id" element={<EditMigraine />} />
            <Route path="/migraines/create" element={<NewMigraineRefactor />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
