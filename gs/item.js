const coItemNumConvert = function(base, narr) {
    let mul = 1;
    let sum = 0;
    narr.forEach(function(elem) {
        sum += elem * mul;
        mul *= base;
    });
    return sum;
};
const gsItemNumConvert = function(narr) {
    return coItemNumConvert(3, narr);
};
const coItemCompSimulate = function(base, rarr, sarr) {
    const len = rarr.length;
    const carr = Array(len - 1);
    const darr = Array(len);
    for (let i = len - 1; i >= 0; --i) {
        darr[i] = rarr[i] - sarr[i];
        if (i != len - 1) {
            carr[i] = darr[i + 1] * base;
            darr[i] += carr[i];
        }
        darr[i] = Math.max(0, darr[i]);
    }
    return [carr, darr];
};
const gsItemCompSimulate = function(rarr, sarr) {
    return coItemCompSimulate(3, rarr, sarr);
};
const gsAExpNumConvert = function(narr) {
    const mularr = [1, 5, 20];
    let i = 0;
    let sum = 0;
    narr.forEach(function(elem) {
        sum += elem * mularr[i];
        ++i;
    });
    return sum;
};
const gsWExpNumConvert = function(narr) {
    return coItemNumConvert(5, narr);
};
