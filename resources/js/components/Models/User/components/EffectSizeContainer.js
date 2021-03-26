import Axios from "axios";
import React, { useEffect, useState } from "react";
import EffectSizeRow from "../../../Stats/row/EffectSize";
import Measure from "../../../Stats/row/Measure";
import Scale from "../../../Stats/row/Scale";
import Significance from "../../../Stats/row/Significance";
import { correllation, mean, stdDev, tTest } from "../../../Stats/Stats";
import { calculateScaleScore } from "../../Assessment/utilities/ScaleScoring";

export default function EffectSizeContainer({ user }) {
    const [isLoading, setIsLoading] = useState(true);
    const [notEnoughData, setNotEnoughData] = useState(false);
    const [result, setResult] = useState({});

    const runStatistics = (pre, post) => {
        const tStat = tTest(pre, post);
        if (tStat.p < 0.05) {
            const preMean = mean(pre);
            const postMean = mean(post);
            const r = correllation(pre, post);
            const preSD = stdDev(pre);
            const esPre = ((postMean - preMean) / preSD).toFixed(2);

            const esRmc = (esPre / Math.sqrt(2 * (1 - r))).toFixed(2);
            setResult({
                significant: true,
                ...tStat,
                esRmc: esRmc,
                esPre: esPre
            });
        } else {
            setResult({
                significant: false,
                ...tStat,
                esRmc: "n/a",
                esPre: "n/a"
            });
        }

        setIsLoading(false);
    };

    const checkCanRunStatistics = ({ pre, post }) => {
        if (pre.length > 30) {
            const preCalc = pre.map(set => {
                return calculateScaleScore(user.data.outcome_data.scale, set);
            });
            const postCalc = post.map(set => {
                return calculateScaleScore(user.data.outcome_data.scale, set);
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
            "/effect-size-calculation/" + user.data.measure_id_for_outcome_stats
        )
            .then(response => {
                checkCanRunStatistics(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }, [user]);

    return (
        <div className="text-lg py-4 px-6 space-y-4">
            <Measure
                heading="Effect Size Measure"
                iconSize="10"
                iconColour="text-teal-400"
                title={user.data.outcome_data.name}
            />
            <Scale
                heading="Effect Size Scale"
                iconSize="10"
                iconColour="text-green-400"
                title={user.data.outcome_data.scale.title}
            />
            <Significance
                heading="Statistical Significance"
                isLoading={isLoading}
                notEnoughData={notEnoughData}
                iconSize="10"
                iconColour="text-blue-400"
                result={result}
            />
            {result.significant && (
                <EffectSizeRow
                    heading="Effect Sizes"
                    isLoading={isLoading}
                    notEnoughData={notEnoughData}
                    iconSize="10"
                    iconColour="text-yellow-300"
                    data={user.data}
                    result={result}
                />
            )}
        </div>
    );
}
