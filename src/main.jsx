import ReactDOM from "react-dom/client"
import "./index.css"
import { HelmetProvider } from "react-helmet-async"
import { router } from "./routes/Routes"
import React from "react"
import { RouterProvider } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import AuthProvider from "./providers/AuthProvider"

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<HelmetProvider>
			<AuthProvider>
				<RouterProvider router={router} />
				<Toaster />
			</AuthProvider>
		</HelmetProvider>
	</React.StrictMode>
)
