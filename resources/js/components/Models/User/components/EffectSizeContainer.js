import Axios from "axios";
import React, { useEffect, useState } from "react";
import DescriptiveStats from "../../../Stats/row/DescriptiveStats";
import EffectSizeRow from "../../../Stats/row/EffectSize";
import Measure from "../../../Stats/row/Measure";
import Scale from "../../../Stats/row/Scale";
import Significance from "../../../Stats/row/Significance";
import Snapshot from "../../../Stats/row/Snapshot";
import { correllation, mean, stdDev, tTest } from "../../../Stats/Stats";
import SpinnerLarge from "../../../UI/spinners/LargeSpinner";
import { calculateScaleScore } from "../../Assessment/utilities/ScaleScoring";
import GraphPrePostMeans from "./GraphPrePostMeans";

export default function EffectSizeContainer({ data }) {
    const [isLoading, setIsLoading] = useState(true);
    const [notEnoughData, setNotEnoughData] = useState(false);
    const [result, setResult] = useState({});

    const runStatistics = (pre, post) => {
        const tStat = tTest(pre, post);
        const preMean = mean(pre);
        const postMean = mean(post);
        const r = correllation(pre, post);
        const preSD = stdDev(pre);
        const esPre = (postMean - preMean) / preSD;
        const esRmc = esPre / Math.sqrt(2 * (1 - r));
        setResult({
            significant: tStat.p < 0.05 ? true : false,
            ...tStat,
            sdPre: preSD,
            r: r,
            esRmc: esRmc,
            esPre: esPre,
            preMean: preMean,
            postMean: postMean
        });
        setIsLoading(false);
    };

    const checkCanRunStatistics = ({ pre, post }) => {
        if (pre.length > 30) {
            const preCalc = pre.map(set => {
                return calculateScaleScore(
                    data.effect_size_settings.scale,
                    set
                );
            });
            const postCalc = post.map(set => {
                return calculateScaleScore(
                    data.effect_size_settings.scale,
                    set
                );
            });
            runStatistics(preCalc, postCalc);
            setNotEnoughData(false);
        } else {
            disableProcess();
        }
    };

    const disableProcess = () => {
        setNotEnoughData(true);
        setIsLoading(false);
    };

    useEffect(() => {
        Axios.get(
            "/effect-size-calculation/" +
                data.effect_size_settings.hashedMeasureId +
                "/" +
                data.effect_size_settings.start +
                "_" +
                data.effect_size_settings.end
        )
            .then(response => {
                checkCanRunStatistics(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }, [data]);

    return (
        <div className="text-lg py-4 px-6 space-y-4">
            <Measure
                heading="Measure"
                iconSize="10"
                iconColour="text-teal-400"
                title={data.effect_size_settings.name}
            />
            <Scale
                heading="Scale"
                iconSize="10"
                iconColour="text-green-400"
                title={data.effect_size_settings.scale.title}
            />
            <DescriptiveStats
                heading="Descriptive Statistics"
                isLoading={isLoading}
                notEnoughData={notEnoughData}
                iconSize="10"
                iconColour="text-pink-400"
                result={result}
            />
            <Significance
                heading="Repeated Measures t-test"
                isLoading={isLoading}
                notEnoughData={notEnoughData}
                iconSize="10"
                iconColour="text-blue-400"
                result={result}
            />
            <EffectSizeRow
                heading="Effect Sizes"
                isLoading={isLoading}
                notEnoughData={notEnoughData}
                iconSize="10"
                iconColour="text-yellow-300"
                data={data}
                result={result}
            />
            {!notEnoughData && (
                <Snapshot
                    effectSizeSettings={data.effect_size_settings}
                    result={result}
                    heading="Snapshot"
                    isLoading={isLoading}
                    iconSize="10"
                    iconColour="text-orange-400"
                />
            )}
            {isLoading && (
                <div className="w-full flex items-center justify-center my-10 py-10">
                    <SpinnerLarge size="200px" />
                </div>
            )}
            {!isLoading && !notEnoughData && (
                <GraphPrePostMeans
                    effectSizeData={data.effect_size_settings}
                    result={result}
                    significant={result.significant}
                />
            )}
        </div>
    );
}
