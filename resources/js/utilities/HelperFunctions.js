export const truncateString = (str, num) => {
    if (str.length <= num) {
        return str;
    }
    return str.slice(0, num) + "...";
};

export const validateString = (string, minLength) => {
    if (string.length >= minLength) {
        return true;
    } else {
        return false;
    }
};

export const validateChronbachsAlpha = string => {
    const reg = new RegExp(/^(0?(\.\d+)?|1(\.0+)?)$/);
    console.log(reg.test(Number(string)));
    if (reg.test(string)) {
        return true;
    } else {
        return false;
    }
};
