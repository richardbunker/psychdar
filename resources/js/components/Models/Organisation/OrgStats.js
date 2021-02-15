import React from "react";
import GrayFadedBanner from "../../UI/GrayFadedBanner";
import OrganisationClinics from "./components/OrganisationClinics";
import OrganisationClinicians from "./components/OrganisationClinicians";
import OrganisationClients from "./components/OrganisationClients";
import OrganisationTreatments from "./components/OrganisationTreatments";
import OrganisationConsultations from "./components/OrganisationConsultations";
import OrganisationAssessments from "./components/OrganisationAssessments";

export default function OrgStats(props) {
    return (
        <div className="text-gray-700 overflow-auto min-w-max-content">
            <div style={{ width: "100%" }} className="bg-white rounded-b">
                <GrayFadedBanner title={props.organisation.name} />
                <div className="text-base py-4 px-6 space-y-4">
                    <OrganisationClinics
                        organisationHashedId={props.organisation.hashed_id}
                    />
                    <OrganisationClinicians
                        organisationHashedId={props.organisation.hashed_id}
                    />
                    <OrganisationClients
                        organisationHashedId={props.organisation.hashed_id}
                    />
                    <OrganisationTreatments
                        organisationHashedId={props.organisation.hashed_id}
                    />
                    <OrganisationConsultations
                        organisationHashedId={props.organisation.hashed_id}
                    />
                    <OrganisationAssessments
                        organisationHashedId={props.organisation.hashed_id}
                    />
                </div>
            </div>
        </div>
    );
}
