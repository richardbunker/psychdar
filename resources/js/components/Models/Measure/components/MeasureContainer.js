import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import GrayFadedBanner from "../../../UI/GrayFadedBanner";
import TealButton from "../../../UI/buttons/TealButton";
import RenderMeasure from "../../Measure/components/Render/Measure";
import { truncateString } from "../../../../utilities/HelperFunctions";
import { formatNameAndAbbr } from "../utilities/MeasureFunctions";
import ModalCentered from "../../../UI/modals/Centered";
import DetailsBuilder from "../components/Details/DetailsBuilder";
import GrayFadedMenuBanner from "../../../UI/GrayFadedMenuBanner";
import ScaleScorer from "./Scoring/ScaleScorer";

export default function MeasureContainer({ measure }) {
    const [responses, setResponses] = useState({});

    const [showDetailsBuilder, setShowDetailsBuilder] = useState(false);

    // useEffect(() => {
    //     let itemsObject = {};
    //     measure.structure.items.map((item, index) => {
    //         if (item.type === "Text") {
    //             return (itemsObject = {
    //                 ...itemsObject,
    //                 [String(index)]: "Text"
    //             });
    //         } else {
    //             return (itemsObject = {
    //                 ...itemsObject,
    //                 [String(index)]: "..."
    //             });
    //         }
    //     });
    //     setResponses(itemsObject);
    // }, []);

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
                <ModalCentered
                    heading="Measure Details"
                    toggleModal={toggleModal}
                >
                    <DetailsBuilder
                        onDetailsSubmit={onDetailsSubmit}
                        measure={measure}
                    />
                </ModalCentered>
            )}
            <div className="space-y-4 py-2">
                <div className="text-3xl font-bold text-gray-700">
                    {formatNameAndAbbr(measure.name, measure.abbreviation)}
                </div>
                <div className="bg-white w-full rounded-b">
                    <GrayFadedMenuBanner title="Details">
                        <TealButton onHandleClick={toggleModal} text="Edit" />
                    </GrayFadedMenuBanner>
                    <div className="font-bold px-6 py-4 space-y-4 text-base text-gray-600">
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
                    <GrayFadedBanner title="Scoring" />
                    <div className="p-6 bg-gray-700 rounded-b font-bold text-base space-y-4">
                        <div className="space-y-2">
                            {measure.structure.items.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="text-green-400">
                                            {truncateString(item.title, 30)}
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
                                <div className="space-y-2">
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
                    <GrayFadedBanner title="Structure" />
                    <div className="p-2">
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
