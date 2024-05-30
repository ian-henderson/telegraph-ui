export function createParamString(
    params: { [key: string]: number | string | undefined } = {},
) {
    let appendedFirstParam = false;

    return Object.entries(params).reduce((acc, [key, value]) => {
        let s = acc;

        if ((typeof value === "string" && !value) || value === undefined) {
            return acc;
        }

        if (appendedFirstParam) {
            s += "&";
        } else {
            s += "?";
            appendedFirstParam = true;
        }

        s += `${key}=${value}`;

        return s;
    }, "");
}

export const genericError = "Something went wrong.";
