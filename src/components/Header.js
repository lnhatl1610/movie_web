import React from "react";
import logo from "../assets/logo.png"; // Adjust the path as necessary
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import userIcon from "../assets/user.png";
import { IoSearch } from "react-icons/io5";
import { navigation } from "../contants/navigation";

const Header = () => {
    const [searchInput, setSearchInput] = React.useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    React.useEffect(() => {
        if (searchInput) {
            navigate(`/search?q=${searchInput}`);
        }
    }, [searchInput]);

    return (
        <header className="fixed top-0 w-full h-16 bg-black bg-opacity-50 z-40">
            <div className="container mx-auto px-5 flex items-center h-full">
                <Link to="/">
                    <img src={logo} width={120} />
                </Link>
                <nav className="hidden lg:flex items-center gap-1 ml-5">
                    {navigation.map((nav, index) => {
                        return (
                            // <div>
                            <NavLink key={nav.label} to={nav.href} className={({ isActive }) => `px-2 hover:text-neutral-100 ${isActive && "text-neutral-100"}`}>
                                {nav.label}
                            </NavLink>
                            // </div>
                        )
                    }
                    )}
                </nav>
                <div className="ml-auto flex items-center gap-3">
                    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Search here..."
                            className="bg-transparent px-4 py-2 outline-none border-none hidden lg:block"
                            onChange={e => setSearchInput(e.target.value)}
                            value={searchInput}
                        />
                        <button className="text-2xl text-white">
                            <IoSearch />
                        </button>
                    </form>
                    <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer active:scale-50 transition-all">
                        <img src={userIcon} width="w-full" />
                    </div>
                </div>
            </div>

        </header>
    )
}

export default Header;