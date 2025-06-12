import { IoHome } from "react-icons/io5";
import { PiTelevision } from "react-icons/pi";
import { MdOutlineMovieCreation } from "react-icons/md";
import { IoSearch } from "react-icons/io5";

export const navigation = [
    {
        label: "TV Shows",
        href: "tv",
        icon: <PiTelevision />
    },
    {
        label: "Movie",
        href: "movie",
        icon: <MdOutlineMovieCreation />
    }
]

export const mobileNavigation = [
    {
        label: "Home",
        href: "/",
        icon: <IoHome />
    },
    ...navigation,
    {
        label: "Search",
        href: "/search",
        icon: <IoSearch />
    }
]