export const sum = (a, b) => a + b;

export const mean = nums => {
    return nums.reduce(sum) / nums.length;
};

export const median = arr => {
    const mid = Math.floor(arr.length / 2),
        nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

export const frequency = (acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
};

export const correllation = (arr1, arr2) => {
    const { min, pow, sqrt } = Math;
    const n = min(arr1.length, arr2.length);
    if (n === 0) {
        return 0;
    }
    [arr1, arr2] = [arr1.slice(0, n), arr2.slice(0, n)];
    const [sum1, sum2] = [arr1, arr2].map(l => l.reduce(sum));
    const [pow1, pow2] = [arr1, arr2].map(l => l.reduce((a, b) => a + pow(b, 2), 0));
    const mulSum = arr1.map((n, i) => n * arr2[i]).reduce(sum);
    const dense = sqrt((pow1 - pow(sum1, 2) / n) * (pow2 - pow(sum2, 2) / n));
    if (dense === 0) {
        return 0;
    }
    return (mulSum - (sum1 * sum2) / n) / dense;
}

export const stdDev = array => {
    const xBar = mean(array)
    const sumOfSquares = array.map(x => Math.pow((x - xBar), 2)).reduce(sum)
    return Math.sqrt((sumOfSquares / (array.length - 1)))
}