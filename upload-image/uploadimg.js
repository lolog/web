(function (mod) {
    if(typeof exports == "object" && typeof module == "object")
        module.exports = mod();
    else if(typeof define == "function" && define.amd)
        return define([], mod);
    else
        (this || window).UploadImg = mod();
})(function () {
    var Util = function(){
        function extend(dist,dest){
            for(var item in dest){
                dist[item] = dest[item];
            }
        }
        function isFileReader(){
            // 判断是否支持FileReader插件
            if(typeof FileReader == "undefined"){
                return false;
            }else {
                return true;
            }
        }
        return {
            extend: extend,
            isFileReader: isFileReader
        }
    }();
    var UploadImg = function (options) {
        this.options = {
            file  : "file",                    // input标签的ID
            img   : "uploadImg",               // img标签的ID
            error : "error",
            type  : ['jpg','jpeg','png','gif']  // 支持的类型
        };
        Util.extend(this.options,options);
        this.uploadfiles = document.getElementById(this.options.file);
        this.uploadImg   = document.getElementById(this.options.img);
        this.error       = document.getElementById(this.options.error);
        this.uploadFile(); // 执行文件上传

    };
    UploadImg.prototype.isValidFile = function (cur_type,flag) {
        // 允许的文件类型
        var type = this.options.type.join(',');
        if(flag == 1) {
            cur_type = cur_type.replace("image/","");
        }
        else {
            cur_type = cur_type.substring(cur_type.lastIndexOf(".")+1);
        }
        if(type.indexOf(cur_type) == -1) {
            this.error.innerHTML = "不支持该图片类型";
            return false;
        }
        else {
            return true;
        }
    };

    UploadImg.prototype.uploadFile = function () {
        var _this = this;
        this.uploadfiles.onchange = function () {
            if(Util.isFileReader()) {
                var files;
                var reader = new FileReader();
                files      = this.files[0];
                if(_this.isValidFile(files.type,1)) {
                    reader.readAsDataURL(files);
                }
                reader.onload = function (file) {
                	_this.uploadImg.src = file.target.result;
                };
            }
            else {
                if(_this.isValidFile(this.value) == false) {
                    return;
                }
                _this.uploadImg.src = this.value;
            }
        };
    };
    return UploadImg;
});