export const prepareCarbonNowDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const time =
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return year + "-" + month + "-" + day + " " + time;
};
