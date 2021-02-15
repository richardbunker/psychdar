import React from "react"
import ClinicTile from "./ClinicTile"
import ClinicTileLoading from "./ClinicTileLoading"

export default function ClinicTileContainer(props) {
    const clinics = props.clinics.map(clinic => <ClinicTile selectClinic={props.selectClinic} key={clinic.hashed_id} isLoading={props.isLoading} isClinic={true} clinic={clinic}/>);
    return (
        <>
            <ClinicTile clinic={false} clinic={{name: "Add Clinic"}}/>
            <ClinicTileLoading clinic={true} isLoading={props.isLoading} title="Loading..."/>
            {clinics}
        </>
    )
}