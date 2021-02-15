import React from "react";
import ClinicianCard from "../components/ClinicianCard";
import HorziontalScroller from "../../../UI/HorizontalScroller";
import GrayFadedBanner from "../../../UI/GrayFadedBanner";

export default function ClinicianContainer(props) {
    return (
        <div style={props.width} className="bg-white rounded-b">
            <GrayFadedBanner textSize="" title="Clinicians" />
            <HorziontalScroller>
                {props.clinic.clinicians.map(clinician => {
                    return (
                        <ClinicianCard
                            key={clinician.hashed_id}
                            clinician={clinician}
                        />
                    );
                })}
            </HorziontalScroller>
        </div>
    );
}
