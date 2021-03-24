import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { InertiaLink } from "@inertiajs/inertia-react";
import GrayFadedBanner from "../../../UI/GrayFadedBanner";
import RenderMeasure from "../../Measure/components/Render/Measure";
import { truncateString } from "../../../../utilities/HelperFunctions";
import { formatNameAndAbbr } from "../utilities/MeasureFunctions";
import DetailsBuilder from "../components/Details/DetailsBuilder";
import ScalesBuilder from "../components/Scales/ScalesBuilder";
import ModalScrollable from "../../../UI/modals/Scrollable";
import GrayFadedMenuBanner from "../../../UI/GrayFadedMenuBanner";
import ButtonTeal from "../../../UI/buttons/ButtonTeal";
import ButtonBlue from "../../../UI/buttons/ButtonBlue";
import ScalesContainer from "./Scales/ScalesContainer";
import ButtonGray from "../../../UI/buttons/ButtonGray";

export default function MeasureContainer({ measure }) {
    const [responses, setResponses] = useState([]);

    const prepareDefaultResponseByItemType = type => {
        switch (type) {
            case "Text":
                return "...";
                break;

            case "Qualitative":
                return "...";
                break;

            default:
                return 0;
                break;
        }
    };

    useEffect(() => {
        let prepareResponses = {};
        measure.structure.items.map((item, index) => {
            prepareResponses = {
                ...prepareResponses,
                ["item_" + String(index)]: prepareDefaultResponseByItemType(
                    item.type
                )
            };
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
        Inertia.post("/measure/details", values);
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
                        <div>
                            <strong>PLEASE NOTE:</strong> Once published, you
                            will be <strong>unable</strong> to edit the
                            following features:
                        </div>
                        <ul className="list-disc pl-10 py-2">
                            <li>Name</li>
                            <li>Intructions</li>
                            <li>Access Level</li>
                            <li>Items</li>
                            {measure.is_private === 0 && (
                                <>
                                    <li>Details</li>
                                    <li>Scoring</li>
                                </>
                            )}
                        </ul>
                        {measure.is_private === 1 && (
                            <div>
                                All other features can be edited (i.e., Details
                                & Scoring information).
                            </div>
                        )}
                    </div>
                    <div className="flex items-center justify-end space-x-2">
                        <ButtonGray
                            handleClick={toggleConfirmPublish}
                            label="Cancel"
                        />
                        <ButtonTeal
                            handleClick={publishMeasure}
                            label="Confirm & Publish"
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
                            <ButtonTeal
                                label="Publish"
                                handleClick={toggleConfirmPublish}
                            />
                        </div>
                    )}
                </GrayFadedMenuBanner>
                <div>
                    <GrayFadedMenuBanner title="Details">
                        {measure.is_private ? (
                            <ButtonBlue
                                handleClick={toggleDetailsModal}
                                label="Update"
                            />
                        ) : (
                            <div></div>
                        )}
                    </GrayFadedMenuBanner>
                    <div className="py-4 px-6 bg-gray-800 text-lg space-y-4 leading-normal text-gray-200">
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
                    <div className="py-4 px-6 bg-gray-800 text-lg space-y-4 leading-normal">
                        <div className="space-y-2">
                            {measure.structure.items.map((item, index) => {
                                return item.type === "Text" ? (
                                    <div key={index}></div>
                                ) : (
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
                                                              "item_" +
                                                                  String(index)
                                                          ]
                                                      ),
                                                      10
                                                  )
                                                : responses[
                                                      "item_" + String(index)
                                                  ]}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="">
                    <GrayFadedMenuBanner title="Scoring">
                        {measure.is_private ? (
                            <ButtonBlue
                                handleClick={toggleScoringModal}
                                label="Update"
                            />
                        ) : (
                            <div></div>
                        )}
                    </GrayFadedMenuBanner>
                    <ScalesContainer responses={responses} measure={measure} />
                </div>
                <div className="bg-white rounded-b">
                    <GrayFadedBanner title="Preview" />
                    <div className="p-6">
                        <RenderMeasure
                            handleSubmit={() =>
                                console.log(
                                    "Well then, aren't you a stickybeak?"
                                )
                            }
                            handleOnItemChange={handleOnItemChange}
                            measure={measure}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
