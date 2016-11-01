(function (window, undefined) {
    var utilAjax = {},
        Ajax = {},
        queryString = {};

    utilAjax.queryString = queryString;
    window.utilAjax = utilAjax;

    (function () {
        var Ajax = function () {
            init.apply(this, arguments);
        },
            init = function () {
                this.IP = IP;
                this.URL = URL;
                this.exec = exec;
                this.method = method;
                this.response = response;
                this.XHR = XHR;
            };

        Ajax.prototype = {

        };
    })
      .apply(Ajax);

    (function () {
        var READY_STATE_UNINITIALIZED = 0;
        var READY_STATE_LOADING = 1;
        var READY_STATE_LOADED = 2;
        var READY_STATE_INTERACTIVE = 3;
        var READY_STATE_COMPLETE = 4;
        var ASYNC = true;

        var NEW_XHR = function () {
            if (window.XMLHttpRequest)
                return new XMLHttpRequest();
            else
                return new ActiveXObject("Microsoft.XMLHTTP");
        },

            that = this,

            response = function (METHOD, URL, exec, data) {
                data || (data = null);

                var XHR = NEW_XHR(),

                filterResponse = function (response) {
                    var response = s.trim(response.replace(/\n+/, ''));
                    if (XHR.responseXML)
                        return that.fromXMLToJSON(response) || that.fromXMLToString(response);
                    return response;
                };

                XHR.onreadystatechange = function () {
                    if (XHR.readyState === READY_STATE_COMPLETE &&
                            XHR.status === 200)
                        exec(filterResponse(XHR.responseText));
                },

            filterData = function (data) {
                var result = "";
                for (var key in data)
                    result += key + "=" + encodeURIComponent(data[key]) + "&";
                return result + "noCache=" + Math.random();
            },

            parseURL = function (URL) {
                if (that.IP !== undefined)
                    URL = that.IP + URL;
                return URL;
            };

                XHR.open(METHOD, parseURL(URL), ASYNC);
                XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                XHR.send(filterData(data));
            },

        toType = function (obj) {
            return Object.prototype.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
        };

        this.get = function (URL, exec, data) //change URL, exec, data
        {
            return response('GET', URL, exec, data);
        };

        this.post = function (URL, exec, data) {
            return response('POST', URL, exec, data);
        };

        this.cleanStr = function (str) {
            return str.replace(/(\r\n|\n|\r)/gm, "");
        };

        this.fromXMLToJSON = function (obj_like_str) {
            obj_like_str = this.cleanStr(obj_like_str);
            var exp = /(\[|\{)(.+)(\}|\])/mg;
            if (exp.test(obj_like_str))
                return JSON.parse(obj_like_str.match(exp)[0]);
            return false;
        };

        this.fromXMLToString = function (obj_like_str) {
            obj_like_str = this.cleanStr(obj_like_str);
            var exp = /\>(.+)\<\/string\>/;
            if (exp.test(obj_like_str))
                return obj_like_str.match(exp)[1];
            return false;
        };
    })
    .apply(utilAjax);

    (function () {
        this.send = function (obj, url) {
            var strQuery = '';
            for (var key in obj)
                strQuery += key + '=' + obj[key] + '&';
            strQuery = strQuery.substring(0, strQuery.length - 1);

            if (url === undefined)
                return strQuery;
            window.location = url + '?' + strQuery;
        };

        var getParams = function () {
            var urlCurrent = window.location.href;
            return urlCurrent.slice(urlCurrent.indexOf('?') + 1).split('&');
        };

        this.getAsArray = function () {
            return getParams().map(function (param) {
                var items = param.split('='),
                    obj = {};
                obj[items[0]] = items[1];
                return obj;
            });
        };

        this.getAsObject = function () {
            var obj = {};
            getParams().forEach(function (param) {
                var items = param.split('=');
                obj[items[0]] = items[1];
            });
            return obj;
        };
    })
    .apply(queryString);

})(window);