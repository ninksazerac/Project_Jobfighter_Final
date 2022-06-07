import { Outlet } from "react-router-dom";
import Navbarcompany from "../../components/navbar/Navbar-company";
import Navbarstudent from "../../components/navbar/Navbar-student";
import Footer from "../../components/footer/Footer";
import { useSelector } from "react-redux";
const Layout = ({role}) => {
    var { user } = useSelector((state) => ({ ...state }));
    const checkRole = () => {
    if(user.role === "student" ){
        return   (  <Navbarstudent/>
     )

    }else if (user.role === "company" ){
     return (<Navbarcompany/>)
    }
}

  return (
    <body class="flex flex-col min-h-screen ">
           
        <header>
        {checkRole()}
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
