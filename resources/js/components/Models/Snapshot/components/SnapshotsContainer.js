import React, { useState } from "react";
import MultiBarChart from "../../../Chartjs/MultiBarChart";
import ButtonBlue from "../../../UI/buttons/ButtonBlue";
import ButtonGray from "../../../UI/buttons/ButtonGray";
import GrayFadedMenuBanner from "../../../UI/GrayFadedMenuBanner";
import ModalScrollable from "../../../UI/modals/Scrollable";
import SnapshotContainer from "./SnapshotContainer";

export default function SnapshotsContainer(props) {
    const [displayManageSnapshots, setDisplayManageSnapshots] = useState(false);

    const toggleManageSnapshots = () => {
        setDisplayManageSnapshots(prevState => !prevState);
    };
    const getArrayOf = string => {
        return props.snapshots.map(snapshot => {
            return snapshot.data.result[string].toFixed(2);
        });
    };
    const dates = props.snapshots.map(snapshot => {
        return (
            snapshot.data.date +
            " (" +
            snapshot.data.effectSizeSettings.name +
            ": " +
            snapshot.data.effectSizeSettings.scale.title +
            ")"
        );
    });
    const data = [
        {
            label: "ESrmc",
            data: getArrayOf("esRmc"),
            fill: false,
            borderWidth: 2,
            borderColor: "#F6AD55",
            backgroundColor: "#F6AD55",
            pointRadius: 4,
            lineTension: 0.4,
            pointStyle: "triangle"
        },
        {
            label: "ESpre",
            data: getArrayOf("esPre"),
            fill: false,
            borderWidth: 2,
            borderColor: "#B794F4",
            backgroundColor: "#B794F4",
            pointRadius: 3,
            lineTension: 0.4,
            pointStyle: "circle"
        }
    ];
    return (
        <div className="bg-white w-full">
            {displayManageSnapshots && (
                <ModalScrollable
                    toggle={toggleManageSnapshots}
                    heading="Manage Snapshots"
                >
                    <div className="space-y-4">
                        {props.snapshots.map((snapshot, index) => {
                            return (
                                <SnapshotContainer
                                    toggle={toggleManageSnapshots}
                                    snapshot={snapshot}
                                    key={index}
                                />
                            );
                        })}
                    </div>
                    <div className="flex items-center justify-end w-full pt-2">
                        <ButtonGray
                            label="Close"
                            handleClick={toggleManageSnapshots}
                        />
                    </div>
                </ModalScrollable>
            )}
            <GrayFadedMenuBanner title="Snapshots">
                <ButtonBlue
                    label="View/Manage"
                    handleClick={toggleManageSnapshots}
                />
            </GrayFadedMenuBanner>
            <div className="bg-white py-4 px-6 space-y-2">
                <div className="font-semibold text-lg text-gray-500">
                    Effect Size Snapshots
                </div>
                <MultiBarChart
                    suggestedMin={0}
                    suggestedMax={1}
                    labels={dates}
                    dataSets={data}
                    yAxisLabel="Effect Size"
                    xAxisLabel="Snapshots"
                />
            </div>
        </div>
    );
}
