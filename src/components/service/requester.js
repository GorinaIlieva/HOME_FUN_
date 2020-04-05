const appKey = 'kid_BJVrLcNDL';
const appSecret = 'aeaee2abb6e14e7aa3dcac257264b76f';
const rootUrl = 'https://baas.kinvey.com'

function createAuthorization(type) {
    return type === 'Basic'
        ? `Basic ${btoa(`${appKey}:${appSecret}`)}`
        : `Kinvey ${sessionStorage.getItem('authtoken')}`
}

function makingHeaders(httpRequest, data, type) {

    let headers = {
        method: httpRequest,
        headers: {
            'Authorization': createAuthorization(type),
            'Content-Type': 'application/json'
        },
    }
    if (httpRequest === 'POST' || httpRequest === 'PUT') {
        headers.body = JSON.stringify(data)
    }
    return headers
}

function makingUrl(kM, eP) {

    return `${rootUrl}/${kM}/${appKey}/${eP}`
}

function handleError(x) {
    if (!x.ok) {
        if (x.status === 409) {
            throw new Error(`${x.status}: Username is already taken!` )
        } else if (x.status === 500) {
            throw new Error(`${x.status}: ${x.statusText}` + 'Server Error!')
        } else if (x.status === 401) {
            throw new Error(`${x.status}: ${x.statusText}`)
        } else {
            throw new Error(`${x.status}: ${x.statusText}`)
        }
    }
    return x
}


function deserializeData(x) {
    if (x.status === 204) {
        return x
    }

    return x.json()
}
function fetchingData(hError = handleError, dData = deserializeData, url, head) {

    return fetch(url, head)
        .then(hError)
        .then(dData)
}

export function post(kinveyModule, endPoint, httpRequest, data, type) {
    return fetchingData(undefined, undefined, makingUrl(kinveyModule, endPoint), makingHeaders(httpRequest, data, type))
}

export function put(kinveyModule, endPoint, httpRequest, data, type) {
    return fetchingData(undefined, undefined, makingUrl(kinveyModule, endPoint), makingHeaders(httpRequest, data, type))
}
export function get(kinveyModule, endPoint, httpRequest, type) {
    return fetchingData(undefined, undefined, makingUrl(kinveyModule, endPoint), makingHeaders(httpRequest, type))
}
export function del(kinveyModule, endPoint, httpRequest, type) {
    return fetchingData(undefined, undefined, makingUrl(kinveyModule, endPoint), makingHeaders(httpRequest, type))
}

