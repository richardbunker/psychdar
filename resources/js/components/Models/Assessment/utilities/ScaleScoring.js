export const calculateScaleScore = (scale, responses) => {
    let totalScore = 0;
    scale.items.map(scaleItem => {
        if (Object.keys(responses).includes("item_" + String(scaleItem))) {
            totalScore += responses["item_" + String(scaleItem)];
        }
    });
    if (scale.operation === "Mean") {
        return (totalScore / Object.keys(responses).length).toFixed(2);
    } else {
        return totalScore;
    }
};
