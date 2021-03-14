import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { InertiaLink } from "@inertiajs/inertia-react";
import GrayFadedBanner from "../../../UI/GrayFadedBanner";
import RenderMeasure from "../../Measure/components/Render/Measure";
import { truncateString } from "../../../../utilities/HelperFunctions";
import { formatNameAndAbbr } from "../utilities/MeasureFunctions";
import DetailsBuilder from "../components/Details/DetailsBuilder";
import ScalesBuilder from "../components/Scales/ScalesBuilder";
import ScaleScorer from "./Scoring/ScaleScorer";
import WhiteMenuBanner from "../../../UI/WhiteMenuBanner";
import ModalScrollable from "../../../UI/modals/Scrollable";
import ToggleButton from "../../../UI/buttons/ToggleButton";
import GrayFadedMenuBanner from "../../../UI/GrayFadedMenuBanner";
import SaveSubmitButton from "../../../UI/forms/SaveSubmitButton";

export default function MeasureContainer({ measure }) {
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        let prepareResponses = measure.structure.items.map(item => {
            return "...";
        });
        setResponses(prepareResponses);
    }, []);

    const [showDetailsBuilder, setShowDetailsBuilder] = useState(false);

    const [showScalesBuilder, setShowScalesBuilder] = useState(false);

    const [showConfirmPublish, setShowConfirmPublish] = useState(false);

    const handleOnItemChange = itemValue => {
        setResponses(prevState => {
            return { ...prevState, ...itemValue };
        });
    };

    const toggleDetailsModal = () => {
        setShowDetailsBuilder(prevState => !prevState);
    };

    const toggleScoringModal = () => {
        setShowScalesBuilder(prevState => !prevState);
    };

    const toggleConfirmPublish = () => {
        setShowConfirmPublish(prevState => !prevState);
    };

    const onDetailsSubmit = details => {
        const values = {
            hashedId: measure.hashed_id,
            details: details
        };
        Inertia.post("/measures/details", values);
        toggleDetailsModal();
    };

    const onScalesSubmit = scales => {
        const values = {
            hashedId: measure.hashed_id,
            scales: scales
        };
        Inertia.post("/measure/scales", values);
        toggleScoringModal();
    };

    const publishMeasure = () => {
        const values = {
            hashedId: measure.hashed_id
        };
        Inertia.post("/measure/publish", values);
        toggleConfirmPublish();
    };

    const displayAlpha = () => {
        return measure.details.alpha === null ? "..." : measure.details.alpha;
    };
    const displayAuthor = () => {
        return measure.details.author === null
            ? "..."
            : truncateString(measure.details.author, 15);
    };
    const displayScales = () => {
        return measure.scales.length === 0 ? "0" : measure.scales.length;
    };

    return (
        <main className="w-full">
            {showDetailsBuilder && (
                <ModalScrollable
                    heading="Measure Details"
                    toggleModal={toggleDetailsModal}
                >
                    <DetailsBuilder
                        onDetailsSubmit={onDetailsSubmit}
                        measure={measure}
                        toggleModal={toggleDetailsModal}
                    />
                </ModalScrollable>
            )}
            {showScalesBuilder && (
                <ModalScrollable
                    heading="Scoring Details"
                    toggleModal={toggleScoringModal}
                >
                    <ScalesBuilder
                        onScalesSubmit={onScalesSubmit}
                        measure={measure}
                        toggleModal={toggleScoringModal}
                    />
                </ModalScrollable>
            )}
            {showConfirmPublish && (
                <ModalScrollable heading="Confirm Publish">
                    <div className="text-xl text-gray-700 p-4 leading-normal">
                        <strong>PLEASE NOTE:</strong> Once published, you will
                        be unable to edit the measure nor update its details.
                        Would you like to proceed?
                    </div>
                    <div className="flex items-center justify-end space-x-2">
                        <button
                            className="w-24 font-semibold hover:bg-gray-500 px-3 py-2 rounded text-white bg-gray-400 uppercase"
                            onClick={() => toggleConfirmPublish()}
                        >
                            Cancel
                        </button>
                        <SaveSubmitButton
                            label="Confirm & Publish"
                            onHandleClick={publishMeasure}
                        />
                    </div>
                </ModalScrollable>
            )}
            <div className="space-y-2">
                <GrayFadedMenuBanner
                    title={formatNameAndAbbr(
                        measure.name,
                        measure.abbreviation
                    )}
                >
                    {!measure.is_published && (
                        <div className="flex items-center space-x-2">
                            <InertiaLink
                                className="flex font-semibold bg-gray-400 items-center px-3 rounded text-sm text-white hover:bg-gray-500 w-full uppercase py-2"
                                href={"/measure/" + measure.hashed_id + "/edit"}
                            >
                                Edit
                            </InertiaLink>
                            <button
                                onClick={() => toggleConfirmPublish()}
                                className="flex font-semibold bg-teal-400 items-center px-3 rounded text-sm text-white hover:bg-teal-500 w-full uppercase py-2"
                            >
                                Publish
                            </button>
                        </div>
                    )}
                </GrayFadedMenuBanner>
                <div>
                    <GrayFadedMenuBanner title="Details">
                        <ToggleButton
                            onHandleClick={toggleDetailsModal}
                            text="Update"
                        />
                    </GrayFadedMenuBanner>
                    <div className="py-4 px-6 bg-gray-700 text-lg space-y-4 leading-normal text-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="font-semibold">
                                Cronbach's Alpha
                            </div>
                            <div>
                                {measure.details ? displayAlpha() : "..."}
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="font-semibold">Reference</div>
                            <div>
                                {measure.details ? displayAuthor() : "..."}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <GrayFadedBanner title="Items" />
                    <div className="py-4 px-6 bg-gray-700 text-lg space-y-4 leading-normal">
                        <div className="space-y-2">
                            {measure.structure.items.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between font-semibold"
                                    >
                                        <div className="text-green-400">
                                            {truncateString(item.title, 50)}
                                        </div>
                                        <div className="text-blue-400">
                                            {item.type === "Qualitative"
                                                ? truncateString(
                                                      String(
                                                          responses[
                                                              String(index)
                                                          ]
                                                      ),
                                                      10
                                                  )
                                                : responses[String(index)]}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="">
                    <GrayFadedMenuBanner title="Scoring">
                        <ToggleButton
                            onHandleClick={toggleScoringModal}
                            text="Update"
                        />
                    </GrayFadedMenuBanner>
                    <div className="py-4 px-6 bg-gray-700 text-lg space-y-4">
                        <div className="flex font-semibold items-center justify-between text-gray-200">
                            <div>Scales</div>
                            <div>{measure.scales ? displayScales() : "0"}</div>
                        </div>
                        {measure.scales &&
                            measure.scales.map((scale, index) => {
                                return (
                                    <ScaleScorer
                                        key={index}
                                        scale={scale}
                                        responses={responses}
                                    />
                                );
                            })}
                    </div>
                </div>
                <div className="bg-white rounded-b">
                    <GrayFadedBanner title="Preview" />
                    <div className="p-6">
                        <RenderMeasure
                            handleOnItemChange={handleOnItemChange}
                            measure={measure}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
