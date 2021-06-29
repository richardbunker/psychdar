export const calculateScaleScore = (scale, responses) => {
    let totalScore = 0;
    scale.items.map(scaleItem => {
        if (Object.keys(responses).includes("item_" + String(scaleItem))) {
            totalScore += responses["item_" + String(scaleItem)];
        }
    });
    if (scale.operation === "Mean") {
        const result = totalScore / scale.items.length;
        return Math.round(result * 1e2) / 1e2;
    } else {
        return totalScore;
    }
};

export const calculateCuttOff = (scale, scaleScore) => {
    return scale.cuttOffs.map(cuttOff => {
        if (scaleScore >= cuttOff.min && scaleScore <= cuttOff.max) {
            return scaleScore;
        }
    });
};

export const detectAlertableScaleScore = (scale, scaleScore, measure) => {
    return scale.cuttOffs
        .map(cuttOff => {
            if (
                scaleScore >= cuttOff.min &&
                scaleScore <= cuttOff.max &&
                cuttOff.alert
            ) {
                return {
                    label: cuttOff.label,
                    score: scaleScore,
                    scale: scale.title,
                    measure: measure.name
                };
            }
        })
        .filter(item => item !== undefined);
};
