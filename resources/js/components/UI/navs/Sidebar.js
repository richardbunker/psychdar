import React from "react";
import Logo from "../logo/logo";

export default function Sidebar(props) {
    const tabActive = "ml-6 border-l-4 border-teal-400 pl-4 py-2 text-gray-200";
    const tabInActive =
        "ml-6 border-l-4 border-transparent pl-4 py-2 text-gray-500 hover:text-gray-300";

    return (
        <div className="h-screen border-t-4 border-teal-400 hidden lg:block">
            <div className="h-full py-4 text-lg font-semibold flex flex-col bg-gray-900">
                <Logo />
                <div
                    className={
                        props.tab === "dashboard" ? tabActive : tabInActive
                    }
                >
                    <a href={"/dashboard"}>Dashboard</a>
                </div>
                <div
                    className={
                        props.tab === "clients" ? tabActive : tabInActive
                    }
                >
                    <a href={"/clients"}>Clients</a>
                </div>
                <div
                    className={
                        props.tab === "measures" ? tabActive : tabInActive
                    }
                >
                    <a href={"/measures"}>Measures</a>
                </div>
                <div className={tabInActive + " mt-4"}>
                    <a href={"/logout"}>Logout</a>
                </div>
            </div>
        </div>
    );
}
