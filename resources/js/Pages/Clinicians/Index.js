import React, { useState, useEffect } from "react";
import ClinicCliniciansContainer from "../../components/Models/Clinician/components/ClinicCliniciansContainer";
import MainContainer from "../../components/UI/containers/MainContainer";
import SelectOrganisation from "../../components/Models/Organisation/Selector";
import Sidebar from "../../components/UI/sidebar/Sidebar";
import LargeSpinner from "../../components/UI/spinners/LargeSpinner";

export default function UserClinicians(props) {
    const [organisation, setOrganisation] = useState([]);
    const [clinics, setClinics] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = event => {
        changeOrganisation(
            props.organisations.find(org => org.hashed_id == event.target.value)
        );
    };

    const changeOrganisation = organisation => {
        setOrganisation(organisation);
        fetchClinics(organisation.hashed_id);
    };

    const fetchClinics = orgHashedId => {
        setIsLoading(true);
        axios
            .get("/api/organisation/" + orgHashedId + "/clinics")
            .then(response => {
                setClinics(response.data);
                setIsLoading(false);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        setOrganisation(props.organisations[0]);
        fetchClinics(props.organisations[0].hashed_id);
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
                <Sidebar owner={"admin"} tab="clinicians" />
                <main className="w-full h-full p-4 space-y-2 overflow-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="text-3xl font-bold text-gray-700">
                                Clinicians
                            </div>
                        </div>
                        <SelectOrganisation
                            handleChange={handleChange}
                            organisations={props.organisations}
                        />
                    </div>
                    {isLoading
                        ? showSpinner()
                        : clinics.map(clinic => {
                              return (
                                  <div
                                      key={clinic.hashed_id}
                                      className="space-y-2 py-2"
                                  >
                                      <ClinicCliniciansContainer
                                          key={clinic.hashed_id}
                                          clinic={clinic}
                                      />
                                  </div>
                              );
                          })}
                </main>
            </div>
        </MainContainer>
    );
}
