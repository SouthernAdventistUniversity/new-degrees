var Southern;
(function (Southern) {
    // Ver 0.2
    var URLAngular = 'https://d3faecii9yynmo.cloudfront.net/framework/dist/js/angular.all.min.js';
    var URLMenuApp = 'https://d3faecii9yynmo.cloudfront.net/main-menu/dist/js/app.js';
    var Utils = /** @class */ (function () {
        function Utils() {
            this.URLParams = this.getUrlParams();
            this.initCookieObj();
            this.initiator = document.getElementById('southern-mmenu');
        }
        Utils.prototype.addScript = function (src, callback) {
            var s = document.createElement('script');
            s.setAttribute('src', src);
            s.async = true;
            s.onload = callback;
            document.body.appendChild(s);
        };
        Utils.prototype.isDomain = function (tld) {
            return window.location.hostname.indexOf(tld) === -1 ? false : true;
        };
        Utils.prototype.initCookieObj = function () {
            Object.defineProperty(window, "SAUCookies", {
                get: function () {
                    return document.cookie.split(';').reduce(function (cookies, cookie) {
                        cookies[(cookie.split("=")[0]).replace(/ /g, '')] = decodeURIComponent(cookie.split('=')[1]);
                        return cookies;
                    }, {});
                }
            });
        };
        Utils.prototype.getUrlParams = function () {
            if (!window.location.search) {
                return false;
            }
            var keyValuePairs = window.location.search.split('?')[1].split("&"), keyValue, params = {};
            keyValuePairs.forEach(function (pair) {
                keyValue = pair.split("=");
                params[keyValue[0]] = decodeURIComponent(keyValue[1]).replace("+", " ");
            });
            return params;
        };
        return Utils;
    }());
    Southern.Utils = Utils;
    var Menu = /** @class */ (function () {
        function Menu() {
            var _this = this;
            this.utils = new Utils();
            this.loadApp = function () {
                _this.utils.addScript(_this.URLApp, _this.initAngular);
            };
            this.initAngular = function () {
                window['angular'].module('southernMenu', ['southernHeader']);
                var element = window['angular'].element(document.getElementsByTagName('southernmainmenu')[0]);
                console.log(_this.utils.initiator);
                if (!element.injector()) {
                    window['angular'].bootstrap(document.getElementsByTagName('southernmainmenu')[0], ["southernMenu"]);
                }
            };
            this.URLApp = this.getAppUrl();
        }
        Menu.prototype.init = function () {
            if (!this.utils.URLParams['disableMenu'] && !this.utils.isDomain('omniupdate.com')) {
                console.log('[SouthernApp] Menu Initiated');
                this.createMenuElement();
            }
            else {
                console.log('[SouthernApp] Disabled Menu');
            }
            if (typeof (this.callback) === typeof (function () { })) {
                this.callback(this);
            }
        };
        Menu.prototype.getAppUrl = function () {
            var url = URLMenuApp;
            return url;
        };
        Menu.prototype.createMenuElement = function () {
            var menu = document.createElement('southernmainmenu');
            if (this.utils.initiator.dataset["class"]) {
                menu.classList.add(this.utils.initiator.dataset["class"]);
            }
            menu.setAttribute('version', '0');
            document.body.insertBefore(menu, document.body.firstChild);
            this.loadAngular();
        };
        Menu.prototype.loadAngular = function () {
            if (typeof window['angular'] == 'undefined') {
                this.utils.addScript(URLAngular, this.loadApp);
            }
            else {
                this.loadApp();
            }
        };
        return Menu;
    }());
    Southern.Menu = Menu;
})(Southern || (Southern = {}));
var SouthernMenu = new Southern.Menu();
SouthernMenu.init();
