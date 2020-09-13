export const isValue = (value) => {
    if (value) return undefined;
    return "ERROR";
}

export const maxLength = (length) => {
    return (value) => {
        if (value.length < length) return undefined;
        return "ERROR"
    }
}
