export const getLineTargets = () => {
    const targetsString = process.env["LINE_TARGETS"];
    if (!targetsString) {
        return;
    }
    const targetsArray = targetsString.split(",");
    return targetsArray;
};
