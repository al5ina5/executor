export const smartStringify = (value: object) => JSON.stringify(value, (key, value) =>
    typeof value === 'bigint'
        ? value.toString()
        : value // return everything else unchanged
)