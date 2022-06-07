import { Outlet } from "react-router-dom";
import Navbarcompany from "../../../components/navbar/Navbar-company";
import Footer from "../../../components/footer/Footer";
function Layout() {
  
  return (
    <body class="flex flex-col min-h-screen ">
            <header>
                <Navbarcompany/>
            </header>
            <main class="flex-grow">
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </body>
  );
}

export default Layout;
