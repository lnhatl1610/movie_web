import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="text-center w-full bg-neutral-600 bg-opacity-35 text-neutral-400 py-4">
            <div className="flex justify-center gap-4">
                <Link to="/">About</Link>
                <Link to="/">Contact</Link>
            </div>
            <p>Created by Nhat</p>
        </footer>
    )
}

export default Footer;