const createResponse = (type, data) => {
    let obj = {}
    obj[type] = true;
    obj['data'] = data;

    return obj;
}

module.exports = createResponse;