import { Routes, Route } from "react-router-dom";
import NavMain from "./components/Nav/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/ProtectedRoute/PrivateRoute";
import LoggedOut from "./components/LoggedOut/LoggedOut";
import NewMigraine from "./pages/NewMigraine";
import Trackers from "./pages/Trackers";
import MigraineJournalFull from "./components/Migraines/MigraineJournalFull";
import MigraineSingle from "./components/Migraines/MigraineSingle";

function App() {
  return (
    <div className="App">
      <NavMain />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<LoggedOut />}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<PrivateRoute />}>
          {/* All routes after the PrivateRoute require the user to be loggedIn */}
          <Route path="/profile">
            <Route index element={<Profile />} />
            <Route path="migraine-journal" element={<MigraineJournalFull />} />
            <Route path="migraine/:id" element={<MigraineSingle />} />
          </Route>
          <Route path="/migraines" element={<NewMigraine />} />
          <Route path="/migraines/trackers" element={<Trackers />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
