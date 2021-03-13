import React from "react";
import logo from "./logo.png";

export default function Logo() {
    return (
        <a href="/dashboard" className="px-6 py-2 mb-6 w-60">
            <img
                src={logo}
                alt="Psychdar Logo"
                className="transform -rotate-2"
            />
        </a>
    );
}
