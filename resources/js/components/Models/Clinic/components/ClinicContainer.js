import React from "react";
import ClinicStats from "../components/ClinicStats";
import HorizontalScroller from "../../../UI/HorizontalScroller";
import ClientSpread from "../components/ClientSpread";
import CaseLoad from "../components/CaseLoad";
import ConsultationSpreadPerClient from "../components/ConsultationSpreadPerClient";
import ClinicianContainer from "../components/ClinicianContainer";
import ConsultationSpreadPerTreatmentEpisode from "../components/ConsultationSpreadPerTreatmentEpisode";
import MedianMeanSessionsPerTreatmentEpisode from "../components/MedianMeanSessionsPerTreatmentEpisode";
import MedianMeanSessionsPerClient from "../components/MedianMeanSessionsPerClient";

export default function ClinicContainer(props) {
    const width = { width: "900px" };
    return (
        <div className="overflow-auto space-y-2">
            <div className="min-w-max-content">
                <ClinicStats width={{ width: "100%" }} clinic={props.clinic} />
            </div>
            <div className="bg-teal-100 rounded">
                <HorizontalScroller>
                    <ClientSpread
                        width={width}
                        clinicians={props.clinic.clinicians}
                    />
                    <CaseLoad
                        width={width}
                        clinicians={props.clinic.clinicians}
                    />
                </HorizontalScroller>
            </div>
            <div className="bg-teal-100 rounded">
                <HorizontalScroller>
                    <ConsultationSpreadPerTreatmentEpisode
                        width={width}
                        clinicians={props.clinic.clinicians}
                    />
                    <ConsultationSpreadPerClient
                        width={width}
                        clinicians={props.clinic.clinicians}
                    />
                </HorizontalScroller>
            </div>
            <div className="bg-teal-100 rounded">
                <HorizontalScroller>
                    <MedianMeanSessionsPerTreatmentEpisode
                        width={width}
                        clinicians={props.clinic.clinicians}
                    />
                    <MedianMeanSessionsPerClient
                        width={width}
                        clinicians={props.clinic.clinicians}
                    />
                </HorizontalScroller>
            </div>
            <div className="h-full">
                <ClinicianContainer
                    width={{ width: "100%" }}
                    clinic={props.clinic}
                />
            </div>
        </div>
    );
}
