import { NavLink } from "react-router-dom";
import useAuth from "../../auth/useAuth";
import "../../styles/NavMain.css";

const NavMain = () => {
	const { isLoggedIn, currentUser, removeUser } = useAuth();
	return (
		<nav className="NavMain">
			<NavLink className="logo" to="/">
				App name
			</NavLink>
			{isLoggedIn && (
				<>
					<NavLink to="/profile">{currentUser && currentUser.email}</NavLink>
					<button onClick={removeUser}>Log-Out</button>
				</>
			)}
			{!isLoggedIn && (
				<>
					<NavLink to="/signin">Log in</NavLink>
					<NavLink to="/signup">Sign Up</NavLink>
				</>
			)}
		</nav>
	);
};

export default NavMain;
