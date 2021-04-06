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
    if (reg.test(string)) {
        return true;
    } else {
        return false;
    }
};

export const returnEmptyStringIfNullValue = value => {
    if (value === null) {
        return "";
    }
    return value;
};

export const validateDateString = string => {
    const reg = new RegExp(
        /^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/]\d{4}$/
    );
    if (reg.test(string)) {
        return true;
    } else {
        return false;
    }
};

export const validateUriString = string => {
    const reg = new RegExp(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/);
    if (reg.test(string)) {
        return true;
    } else {
        return false;
    }
};

export const returnCurrentDateString = () => {
    const date = new Date();
    let dateString =
        ("0" + date.getDate()).slice(-2) +
        "/" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "/" +
        date.getFullYear();
    return dateString;
};

export const returnDateString = value => {
    const date = new Date(value);
    let dateString =
        ("0" + date.getDate()).slice(-2) +
        "/" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "/" +
        date.getFullYear();
    return dateString;
};

export const datefilter = date => {
    let dateString =
        date.getFullYear() +
        "-" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + date.getDate()).slice(-2);
    return dateString;
};

export const returnDateObjectFromDateString = dateString => {
    let dateParts = dateString.split("/");
    let dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    return dateObject;
};

export const returnCarbonDateStringFormat = dateString => {
    return datefilter(returnDateObjectFromDateString(dateString));
};
