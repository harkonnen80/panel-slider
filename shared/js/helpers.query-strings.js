/**
 * Created by davidneil
 */

Object.prototype.getUrlVars = function (url) {
    var vars = [];
    var hash;
    var hashes;

    if (url) {
        hashes = url.slice(url.indexOf('?') + 1).split(/[&#]+/);
    } else {
        hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    }

    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }

    return vars;
};

/**
 * Allows query strings to be updated while retaining the rest of the URL (including hashes)
 *
 * @param options
 * @returns {*}
 */
function updateUrlParameter(options) {
    var url     = options.uri;
    var key     = options.key;
    var value   = options.value;

    // remove the hash part before operating on the uri
    var findHash    = url.indexOf('#');
    var hash        = findHash === -1 ? ''  : url.substr(findHash);
    var uri           = findHash === -1 ? url : url.substr(0, findHash);

    var re          = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
    var separator   = uri.indexOf('?') !== -1 ? '&' : '?';

    if (uri.match(re)) {
        uri = uri.replace(re, '$1' + key + '=' + value + '$2');
    } else {
        uri = uri + separator + key + '=' + value;
    }

    return uri + hash;  // finally append the hash as well
}