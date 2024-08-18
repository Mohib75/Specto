import { Outlet, ScrollRestoration } from "react-router-dom"
import Navbar from "../components/navbar/Navbar"
import Footer from "../components/footer/Footer"

const MainLayout = () => {
	return (
		<>
			<div className='container mx-auto'>
				<Navbar />
				<Outlet />
				<ScrollRestoration />
			</div>
			<Footer />
		</>
	)
}

export default MainLayout
