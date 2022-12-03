import { Routes, Route } from "react-router-dom";
import Header from "./components/Nav/Header";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/ProtectedRoute/PrivateRoute";
import LoggedOut from "./components/LoggedOut/LoggedOut";
import NewMigraine from "./pages/NewMigraineOLDVERSION";
import Trackers from "./pages/Trackers";
import FormNewMigraineStep2 from "./components/Forms/FormNewMigraine/FormNewMigraineStep2";
import MigraineJournalFull from "./pages/MigraineJournalFull";
import MigraineSingle from "./pages/MigraineSingle";
import NewMigraineButton from "./components/Migraines/NewMigraineButton";
import FormSignIn from "./components/Forms/FormSignIn";
import EditProfile from "./pages/EditProfile";
import NewMigraineRefactor from "./pages/NewMigraineRefactor";

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
              <Route path="create" element={<NewMigraineRefactor />} />
            </Route>
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
