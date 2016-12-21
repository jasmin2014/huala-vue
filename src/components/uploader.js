/**!
 * uploader
 * @insertBefore
 *
 **/

(function (window) {

    window.uploader = (function () {

        function createXhr() {
            if (typeof XMLHttpRequest != "undefined") {
                return new XMLHttpRequest();
            } else if (typeof ActiveXObject != "undefined") {
                if (typeof arguments.callee.activeXString != "string") {
                    var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"];
                    for (var i = 0, len = versions.length; i < len; i++) {
                        try {
                            new ActiveXObject(versions[i]);
                            arguments.callee.activeXString = versions[i];
                            break;
                        } catch (e) {
                            throw new Error('Create XHR ActiveXObject error.' + e);
                        }
                    }
                }
                return new ActiveXObject(arguments.callee.activeXString);
            } else throw new Error('No XHR object avaliable.' + e);
        }

        /**
         * 图片压缩
         * @param imgData 文件
         * @param rate  压缩比率
         * @param onCompress 回调函数
         */
        function compressImg(imgData, com_rate, onCompress) {
            if (!imgData)return;
            onCompress = onCompress || function () {
                };
            com_rate = com_rate || 1;//压缩比率默认为1
            var img = new Image();
            img.onload = function () {
                if (com_rate != 1) {//按最大高度等比缩放
                    var rate = Math.sqrt(com_rate);
                    img.width *= rate;
                    img.height *= rate;
                }
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;
                //ctx.drawImage(img, 0, 0);
                ctx.clearRect(0, 0, canvas.width, canvas.height); // canvas清屏
                //重置canvans宽高 canvas.width = img.width; canvas.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height); // 将图像绘制到canvas上
                onCompress(convertBase64UrlToBlob(canvas.toDataURL("image/jpeg")));//必须等压缩完才读取canvas值，否则canvas内容是黑帆布
            };

            //记住必须先绑定事件，才能设置src属性，否则img没内容可以画到canvas
            img.src = imgData;
        }

        /**
         * 将以base64的图片url数据转换为Blob
         * @param urlData
         *            用url方式表示的base64图片数据
         */
        function convertBase64UrlToBlob(urlData) {

            var bytes = window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte

            //处理异常,将ascii码小于0的转换为大于0
            var ab = new ArrayBuffer(bytes.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < bytes.length; i++) {
                ia[i] = bytes.charCodeAt(i);
            }
            return new Blob([ab], {type: 'image/jpeg'});
        }

        /**
         * 图片上传
         * @param url 请求地址
         * @param file 文件
         * @param callback 回调函数
         */
        function handUpload(url, file, callback) {
            if (url === undefined) {
                throw new Error('上传地址不能为空');
            }
            var xhr = createXhr();
            xhr.open("POST", url, true);
            //xhr.setRequestHeader("Content-Type", "multipart/form-data");
            //xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            xhr.setRequestHeader("withCredentials", "false")
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    var body = (typeof xhr.response === 'string') ? JSON.parse(xhr.response) : xhr.response;
                    if (xhr.status >= 200 && xhr.status < 300 ||
                        xhr.status == 304) {
                        if (callback) {
                            callback(body);
                        }
                    } else {
                        if (callback) {
                            callback(body);
                        }
                    }
                }
            };
            var data = new FormData();
            if (!file) {
                throw new Error('上传文件不能为空');
            }
            var name = file.name;
            if (!name) {
                throw new Error('文件名称没定义');
            }
            data.append("file", file,file.name);
            try {
                xhr.send(data);
            } catch (e) {
                throw new Error(e);
            }
        }

        return {
            /**
             * 图片上传
             * @param url 请求地址
             * @param file 文件
             * @param callback 回调函数
             */
            upload: function (url, file, callback) {//上传
                handUpload(url, file, callback);
            },
            /**
             * 图片压缩
             * @param imgData 文件
             * @param rate  压缩比率
             * @param onCompress 回调函数
             */
            compress(imgData, rate, onCompress){
                compressImg(imgData, rate, onCompress)
            }
        }
    })();

})(window)