import React, { useState } from "react";
import Sidebar from "../../components/UI/sidebar/Sidebar";
import Selector from "../../components/Models/Organisation/Selector";
import OrgStats from "../../components/Models/Organisation/OrgStats";
import MainContainer from "../../components/UI/containers/MainContainer";

export default function UserDashboard(props) {
    const [organisation, setOrganisation] = useState(props.organisations[0]);

    const handleChange = event => {
        changeOrganisation(
            props.organisations.find(org => org.hashed_id == event.target.value)
        );
    };

    const changeOrganisation = organisation => {
        setOrganisation(organisation);
    };

    return (
        <MainContainer>
            <div className="flex w-full">
                <Sidebar owner={"admin"} tab="dashboard" />
                <main className="w-full overflow-auto h-full">
                    <div className="flex flex-col p-4">
                        <header className="flex items-center justify-between">
                            <div className="text-3xl font-bold text-gray-700">
                                Dashboard
                            </div>
                            <div className="flex items-center">
                                <Selector
                                    handleChange={handleChange}
                                    organisations={props.organisations}
                                />
                            </div>
                        </header>
                        <div className="py-4">
                            {organisation && (
                                <OrgStats organisation={organisation} />
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </MainContainer>
    );
}
