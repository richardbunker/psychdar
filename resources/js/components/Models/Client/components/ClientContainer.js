import React from "react";
import GrayFadedBanner from "../../../UI/GrayFadedBanner";
import TreatmentEpisodesRow from "../../../Stats/row/TreatmentEpisodes";
import TotalConsultationsRow from "../../../Stats/row/TotalConsultations";
import TotalAssessmentsRow from "../../../Stats/row/TotalAssessments";
import { sum } from "../../../Stats/Stats";
import UrlRow from "../../../Stats/row/Url";
import SaveableBanner from "../../../UI/SaveableBanner";
import UpdateStatusForm from "../../../UI/forms/UpdateStatusForm";
import { spinnerBootUp } from "../../../UI/spinners/SpinnerBootUp";

export default function ClientContainer(props) {
    return props.client.identifier ? (
        <div className="space-y-2">
            <div className="bg-white rounded-b">
                <GrayFadedBanner
                    title={props.client.identifier || "Loading..."}
                />
                <div className="text-base py-4 px-6 space-y-4">
                    <TreatmentEpisodesRow
                        iconSize="10"
                        iconColour="text-pink-400"
                        number={props.client.treatments.length}
                    />
                    <TotalConsultationsRow
                        iconSize="10"
                        iconColour="text-indigo-400"
                        number={props.client.treatments
                            .map(treatment => {
                                return treatment.consultation_count;
                            })
                            .reduce(sum, 0)}
                    />
                    <TotalAssessmentsRow
                        iconSize="10"
                        iconColour="text-green-400"
                        number={props.client.treatments
                            .map(treatment => {
                                return treatment.assessments.length;
                            })
                            .reduce(sum, 0)}
                    />
                </div>
            </div>
            <div className="bg-white rounded">
                <div className="w-full rounded-t text-base font-bold text-gray-400 p-2 bg-white uppercase text-left">
                    Measures
                </div>
                <div className="text-base pt-2 pb-6 px-6 space-y-4">
                    <div>Add Measure</div>
                    <UrlRow
                        heading="Depression, Anxiety and Stress Scale (DASS21)"
                        iconSize="6"
                        iconColour="text-gray-500"
                        link={props.client.url}
                    />
                </div>
            </div>
            <div className="bg-white rounded">
                <SaveableBanner
                    title="Client Settings"
                    savedAt={props.savedAt}
                />
                <div className="text-base pt-2 pb-6 px-6 space-y-4">
                    <UpdateStatusForm
                        title="Client Status"
                        onStatusUpdate={props.onStatusUpdate}
                        currentStatus={props.client.is_active}
                        identifier="active"
                        truthyLabel="Active"
                        falseyLabel="Archived"
                    />
                    <UpdateStatusForm
                        title="Unique URL Access"
                        onStatusUpdate={props.onStatusUpdate}
                        currentStatus={
                            props.client.preferences.create_own_resources
                        }
                        identifier="url"
                        truthyLabel="Allowed"
                        falseyLabel="Disabled"
                    />
                    <UpdateStatusForm
                        title="Statistical Analyses"
                        onStatusUpdate={props.onStatusUpdate}
                        currentStatus={
                            props.client.preferences.include_in_analyses
                        }
                        identifier="stats"
                        truthyLabel="Included"
                        falseyLabel="Excluded"
                    />
                </div>
            </div>
        </div>
    ) : (
        spinnerBootUp()
    );
}
