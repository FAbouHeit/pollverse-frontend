import { Outlet } from "react-router-dom";
import Navbar from "../../Layout/Navbar/Navbar";
import Styles from './HomeOutlet.module.css'
import Chat from "../../Layout/Chat/Chat";
import Search from "../../Layout/Search/Search";

const HomeOutlet = () => {
    return (
        <>
            <Navbar/>
            <div className={Styles.homeOutletContainer}>
                <div className={Styles.leftAside}>
                    <aside className={Styles.aside}>
                        <Search/>
                    </aside>
                </div>

                <main className={Styles.homeContainer}>
                    <Outlet/>
                </main>

                <div className={Styles.rightAside}>
                    <aside className={Styles.aside}>
                        <Chat/>
                    </aside>
                </div>
            </div>
        </>
    );
}

export default HomeOutlet
