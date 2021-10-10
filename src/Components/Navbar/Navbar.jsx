import style from "./Navbar.module.css";

const Navbar = () => {
    return(

        <nav> 
            <div className={style.logo}> 
                <h3>Employee Management</h3> 
            </div>

            <ul className={style.navLink}>
                <li>Employees</li>
                <li>Data</li>
                <li>Logout</li>
            </ul>
        </nav>

    )
}

export default Navbar;