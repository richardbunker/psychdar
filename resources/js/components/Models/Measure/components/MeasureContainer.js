import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import GrayFadedBanner from "../../../UI/GrayFadedBanner";
import RenderMeasure from "../../Measure/components/Render/Measure";
import { truncateString } from "../../../../utilities/HelperFunctions";
import { formatNameAndAbbr } from "../utilities/MeasureFunctions";
import DetailsBuilder from "../components/Details/DetailsBuilder";
import ScaleScorer from "./Scoring/ScaleScorer";
import WhiteMenuBanner from "../../../UI/WhiteMenuBanner";
import ModalScrollable from "../../../UI/modals/Scrollable";
import ToggleButton from "../../../UI/buttons/ToggleButton";

export default function MeasureContainer({ measure }) {
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        let prepareResponses = measure.structure.items.map(item => {
            return "...";
        });
        setResponses(prepareResponses);
    }, []);

    const [showDetailsBuilder, setShowDetailsBuilder] = useState(false);

    const handleOnItemChange = itemValue => {
        setResponses(prevState => {
            return { ...prevState, ...itemValue };
        });
    };

    const toggleModal = () => {
        setShowDetailsBuilder(prevState => !prevState);
    };

    const onDetailsSubmit = details => {
        const values = {
            hashedId: measure.hashed_id,
            details: details
        };
        Inertia.post("/measures/details", values);
        toggleModal();
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
        return measure.details.scales.length === 0
            ? "..."
            : measure.details.scales.length;
    };

    return (
        <main className="w-full">
            {showDetailsBuilder && (
                <ModalScrollable
                    heading="Measure Details"
                    toggleModal={toggleModal}
                >
                    <DetailsBuilder
                        onDetailsSubmit={onDetailsSubmit}
                        measure={measure}
                        toggleModal={toggleModal}
                    />
                </ModalScrollable>
            )}
            <div className="space-y-2">
                <GrayFadedBanner
                    title={formatNameAndAbbr(
                        measure.name,
                        measure.abbreviation
                    )}
                />
                <div className="bg-white w-full">
                    <WhiteMenuBanner title="Details">
                        <ToggleButton
                            onHandleClick={toggleModal}
                            text="Update"
                        />
                    </WhiteMenuBanner>
                    <div className="px-6 pt-2 pb-4 space-y-4 text-lg text-gray-600">
                        <div className="flex items-center justify-between">
                            <div>Cronbach's Alpha</div>
                            <div>
                                {measure.details ? displayAlpha() : "..."}
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>Author/Reference</div>
                            <div>
                                {measure.details ? displayAuthor() : "..."}
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>Scales</div>
                            <div>
                                {measure.details ? displayScales() : "..."}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <GrayFadedBanner title="Metrics" />
                    <div className="py-4 px-6 bg-gray-700 text-lg space-y-4">
                        <div className="space-y-2">
                            {measure.structure.items.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between"
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
                        <div>
                            {measure.details && (
                                <div className="leading-normal">
                                    {measure.details.scales.length > 0 && (
                                        <div className="pb-2 text-blue-400 uppercase">
                                            Scales
                                        </div>
                                    )}
                                    {measure.details.scales.map(
                                        (scale, index) => {
                                            return (
                                                <ScaleScorer
                                                    key={index}
                                                    scale={scale}
                                                    responses={responses}
                                                />
                                            );
                                        }
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-b">
                    <GrayFadedBanner title="Preview" />
                    <div className="p-6">
                        <RenderMeasure
                            handleOnItemChange={handleOnItemChange}
                            measure={measure.structure}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
