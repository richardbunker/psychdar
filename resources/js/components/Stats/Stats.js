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
    const [pow1, pow2] = [arr1, arr2].map(l =>
        l.reduce((a, b) => a + pow(b, 2), 0)
    );
    const mulSum = arr1.map((n, i) => n * arr2[i]).reduce(sum);
    const dense = sqrt((pow1 - pow(sum1, 2) / n) * (pow2 - pow(sum2, 2) / n));
    if (dense === 0) {
        return 0;
    }
    return (mulSum - (sum1 * sum2) / n) / dense;
};

export const stdDev = array => {
    const xBar = mean(array);
    const sumOfSquares = array.map(x => Math.pow(x - xBar, 2)).reduce(sum);
    return Math.sqrt(sumOfSquares / (array.length - 1));
};

const sDiff = (array1, array2) => {
    const sumOfDiff = array2.map((x, i) => {
        return x - array1[i];
    });
    return stdDev(sumOfDiff);
};

const gammaln = x => {
    let j = 0;
    let cof = [
        76.18009172947146,
        -86.50532032941678,
        24.01409824083091,
        -1.231739572450155,
        0.001208650973866179,
        -5395239384953e-18
    ];
    let ser = 1.000000000190015;
    let xx, y, tmp;
    tmp = (y = xx = x) + 5.5;
    tmp -= (xx + 0.5) * Math.log(tmp);
    for (; j < 6; j++) ser += cof[j] / ++y;
    return Math.log((2.5066282746310007 * ser) / xx) - tmp;
};

const betacf = (x, a, b) => {
    let fpmin = 1e-30;
    let m = 1;
    let qab = a + b;
    let qap = a + 1;
    let qam = a - 1;
    let c = 1;
    let d = 1 - (qab * x) / qap;
    let m2, aa, del, h;
    if (Math.abs(d) < fpmin) d = fpmin;
    d = 1 / d;
    h = d;
    for (; m <= 100; m++) {
        m2 = 2 * m;
        aa = (m * (b - m) * x) / ((qam + m2) * (a + m2));
        d = 1 + aa * d;
        if (Math.abs(d) < fpmin) d = fpmin;
        c = 1 + aa / c;
        if (Math.abs(c) < fpmin) c = fpmin;
        d = 1 / d;
        h *= d * c;
        aa = (-(a + m) * (qab + m) * x) / ((a + m2) * (qap + m2));
        d = 1 + aa * d;
        if (Math.abs(d) < fpmin) d = fpmin;
        c = 1 + aa / c;
        if (Math.abs(c) < fpmin) c = fpmin;
        d = 1 / d;
        del = d * c;
        h *= del;
        if (Math.abs(del - 1) < 3e-7) break;
    }
    return h;
};

const ibeta = (x, a, b) => {
    var bt =
        x === 0 || x === 1
            ? 0
            : Math.exp(
                  gammaln(a + b) -
                      gammaln(a) -
                      gammaln(b) +
                      a * Math.log(x) +
                      b * Math.log(1 - x)
              );
    if (x < 0 || x > 1) return false;
    if (x < (a + 1) / (a + b + 2)) return (bt * betacf(x, a, b)) / a;
    return 1 - (bt * betacf(1 - x, b, a)) / b;
};

const cdf = (x, dof) => {
    var dof2 = dof / 2;
    return ibeta(
        (x + Math.sqrt(x * x + dof)) / (2 * Math.sqrt(x * x + dof)),
        dof2,
        dof2
    );
};

export const tTest = (pre, post) => {
    const df = pre.length - 1;
    const t =
        (mean(post) - mean(pre)) / (sDiff(pre, post) / Math.sqrt(pre.length));
    const p = cdf(-Math.abs(t), df) * 2;
    return {
        df: df,
        t: t,
        p: p
    };
};
