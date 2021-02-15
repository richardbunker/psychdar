export const formatNameAndAbbr = (name, abbr) => {
    if (abbr) {
        return name + " (" + abbr + ")";
    }
    return name;
};
