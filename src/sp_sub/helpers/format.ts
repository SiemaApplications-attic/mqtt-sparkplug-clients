import Long from "long";

/**
 * a replacer function as is expected by JSON.stringify.
 * it prints BigInt and Long objects as strings
 * (BigInt is not serializable, the Long object is hardly readable)
 */
export const customJSONStringify = (key: string, value: any) => {
    if ((typeof value === "bigint") || Long.isLong(value)) {
        return value.toString();
    } else {
        return value;
    }
};
