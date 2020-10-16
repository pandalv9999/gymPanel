/**
 * AJAX helper
 * @param method - GET|POST|PUT|DELETE
 * @param url - API end point
 * @param data - request payload data
 * @param successCallback - Successful callback function
 * @param errorCallback - Error callback function
 */
function ajax(method, url, data, successCallback, errorCallback) {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url, true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            successCallback(xhr.responseText);
        } else {
            errorCallback();
        }
    };

    xhr.onerror = function() {
        console.error("The request couldn't be completed.");
        errorCallback();
    };

    if (data === null) {
        xhr.send();
    } else {
        xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        xhr.send(data);
    }
}

function isAvailableForInterval(intervals, interval) {
    for (let curr of intervals) {
        if (curr[0] === interval[0] && curr[1] === interval[1]) {
            return false;
        }
    }
    return true;
}

