/**
 * cookie处理
 */
(function (window) {
    window.cookies = (function () {

        return {
            /**
             *
             * @param name
             * @returns {null}
             */
            get: function (name) {
                let myWindow = window;
                name = myWindow.escape(name);
                let regexp = new RegExp('(?:^' + name + '|;\\s*' + name + ')=(.*?)(?:;|$)', 'g');
                let result = regexp.exec(document.cookie);
                return (result === null) ? null : myWindow.unescape(result[1]);
            },
            /**
             *
             * @param name
             * @param value
             * @param expires
             * @param path
             * @param domain
             */
            save: function (name, value, expires, path, domain) {
                let myWindow = window;
                let cookieStr = myWindow.escape(name) + '=' + myWindow.escape(value) + ';';

                if (expires) {
                    let dtExpires = new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24);
                    cookieStr += 'expires=' + dtExpires.toUTCString() + ';';
                }
                if (path) {
                    cookieStr += 'path=' + path + ';';
                }
                if (domain) {
                    cookieStr += 'domain=' + domain + ';';
                }
                document.cookie = cookieStr;
            },
            /**
             *
             * @param name
             * @param path
             * @param domain
             */
            remove: function (name, path, domain) {
                if (this.get(name)) {
                    this.save(name, '', -1, path, domain);
                }
            }
        }
    })();

})(window)