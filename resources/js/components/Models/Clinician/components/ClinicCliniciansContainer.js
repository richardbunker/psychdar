import React from "react";
import GrayFadeBanner from "../../../UI/GrayFadedBanner";
import ClinicianTileContainer from "./ClinicianTileContainer";

export default function ClinicCliniciansContainer(props) {
    return (
        <div>
            <GrayFadeBanner
                title={props.isLoading ? "Loading..." : props.clinic.name}
            />
            <ClinicianTileContainer
                isLoading={props.isLoading}
                clinicians={props.clinic.clinicians}
            />
        </div>
    );
}
