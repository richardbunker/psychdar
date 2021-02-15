import React from "react";
import ClinicianTile from "./ClinicianTile";
import ClinicianTileLoading from "./ClinicianTileLoading";

export default function ClinicTileContainer(props) {
    const clinicians = props.clinicians.map(clinician => (
        <ClinicianTile
            selectClinician={props.selectClinician}
            key={clinician.hashed_id}
            isLoading={props.isLoading}
            isClinician={true}
            clinician={clinician}
        />
    ));
    return (
        <div className="bg-gray-200 rounded-b p-2 grid grid-cols-3 gap-2">
            <ClinicianTile isClinician={false} clinician={{ first_name: "Add", last_name: "Clinician" }} />
            <ClinicianTileLoading
                isLoading={props.isLoading}
                title="Loading..."
            />
            {clinicians}
        </div>
    );
}
