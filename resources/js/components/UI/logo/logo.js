import React from "react";
import logo from "./logo.png";

export default function Logo() {
    return (
        <a href="/dashboard" className="w-48 px-6 mb-6">
            <img
                src={logo}
                alt="Psychdar Logo"
                className="transform -rotate-2"
            />
        </a>
    );
}
