import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import UserProvider from "./auth/UserProvider";
import "./styles/reset.css";
import "./styles/global.css";

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<UserProvider>
				<App />
			</UserProvider>
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);
