/**
 * Created by davidneil
 */

$.extend({
    getUrlVars: function (url) {
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
    },

    getUrlVar: function (name) {
        return $.getUrlVars()[name];
    },
});
