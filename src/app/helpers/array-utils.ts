export const orderByArrayAsc = function (values: any[], orderType: any) {
    return values.sort((a, b) => {
        if (a[orderType] < b[orderType])
            return -1;

        if (a[orderType] > b[orderType])
            return 1;

        return 0
    });
}

export const orderByArrayDesc = function (values: any[], orderType: any) {
    return values.sort((a, b) => {
        if (a[orderType] < b[orderType])
            return 1;

        if (a[orderType] > b[orderType])
            return -1;

        return 0
    });
}