import React, { useState, useEffect } from "react";
import Sidebar from "../../components/UI/sidebar/Sidebar";
import MainContainer from "../../components/UI/containers/MainContainer";
import LargeSpinner from "../../components/UI/spinners/LargeSpinner";
import MeasureTileContainer from "../../components/Models/Measure/components/Tiles/MeasureTileContainer";
import SelectOrganisation from "../../components/Models/Organisation/Selector";

export default function UserMeasures(props) {
    const [organisation, setOrganisation] = useState(props.organisations[0]);
    const [measures, setMeasures] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = event => {
        changeOrganisation(
            props.organisations.find(org => org.hashed_id == event.target.value)
        );
    };

    const changeOrganisation = organisation => {
        setOrganisation(organisation);
        fetchMeasures(organisation.hashed_id);
    };

    const fetchMeasures = orgHashedId => {
        setIsLoading(true);
        axios
            .get("/api/organisation/" + orgHashedId + "/measures")
            .then(response => {
                setMeasures(response.data);
                setIsLoading(false);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        setOrganisation(props.organisations[0]);
        fetchMeasures(props.organisations[0].hashed_id);
    }, []);

    const showSpinner = () => {
        return (
            <div className="flex items-center justify-center pt-52">
                <LargeSpinner size="100px" />
            </div>
        );
    };

    return (
        <MainContainer>
            <div className="flex w-full">
                <Sidebar owner={"admin"} tab="measures" />
                <div className="w-full h-full p-4 space-y-2 overflow-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="text-3xl font-bold text-gray-700">
                                Measures
                            </div>
                        </div>
                        <SelectOrganisation
                            handleChange={handleChange}
                            organisations={props.organisations}
                        />
                    </div>
                    {isLoading ? (
                        showSpinner()
                    ) : (
                        <div className="py-2 grid grid-cols-3 gap-2">
                            <MeasureTileContainer measures={measures} />
                        </div>
                    )}
                </div>
            </div>
        </MainContainer>
    );
}
