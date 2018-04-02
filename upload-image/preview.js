(function(mod){
    if(typeof exports == "object" && typeof module == "object")
        module.exports = mod();
    else if(typeof define == "function" && define.amd) 
        return define([], mod);
    else 
        (this || window).PreviewImage = mod();
})(function(){
	var Util = function(){
		function extend(dist,dest){
			for(var item in dest){
				dist[item] = dest[item];	
			}		
		}
		function isFileReader(){
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
	var color = {
		defaults: '#666',
		danger: '#d9534f',
		success: '#5cb85c',
		info: '#5bc0de',
		warning: '#f0ad4e'
	};
	function PreviewImage(opts){
		if(!opts.id){
			console.log("必须传入id值");	
			return;
		}
		this.options = {	
			id: '',
			multiple: false,
			type: ['jpg','jpeg','png','gif'],
			text: "选着图片",
			notice: "支持JPG，JPEG，PNG，GIF格式"
		}; 
		Util.extend(this.options,opts);
		this.isEmpty = false;
		this.image_file = document.getElementById(this.options.id);
		this.init();
		this.action();
	}
	PreviewImage.prototype.init = function(){
		this.image_file.style.filter = "Alpha(opacity=0)";
		this.image_file.style.opacity = "0";
		var div_wrap = document.createElement("div");
		div_wrap.className = "preview-file-wrap";
		var button_wrap = document.createElement("div");
		button_wrap.className = "button-wrap";
		this.images_wrap = document.createElement("div");
		this.images_wrap.className = "images-wrap";
		var label = document.createElement("label");
		label.style.cssText="margin:auto;text-align:center";
		label.className = "add"
		var labeltext =document.createTextNode(this.options.text);
		this.notice = document.createElement("span");
		var noticetext = document.createTextNode(this.options.notice);
		this.notice.appendChild(noticetext);
		label.appendChild(labeltext);
		label.setAttribute("for",this.options.id);
		this.image_file.parentNode.insertBefore(div_wrap,this.image_file);
		button_wrap.appendChild(this.image_file);
		button_wrap.appendChild(label);
		button_wrap.appendChild(this.notice);
		div_wrap.appendChild(button_wrap);
		div_wrap.appendChild(this.images_wrap);
		
		if(this.options.multiple) {
			this.image_file.setAttribute("multiple",this.options.multiple);
		}
	};
	PreviewImage.prototype.isValidFile = function(files){
		var valid_type = this.options.type.join(','),
			curtype;
		for(var i = 0; i < files.length; i++){
			if(Util.isFileReader()){
				curtype = files[i].type.replace("image/","");
			}else {
				curtype = files[i].match(/\.[a-z]+$/);	
				if(!curtype){
					curtype = "";		
				}else {
					curtype = curtype[0];
				}
				curtype = curtype.replace(".","");
			}
			if(valid_type.indexOf(curtype) != -1){
				return true;			
			}	
		}
		return false;			
	};
	PreviewImage.prototype.action = function(){
		var _this = this;
		_this.image_file.onchange = function(e){
			var target,files; 
			if(Util.isFileReader()){
				target = e.target || e.srcElement;
				files = target.files;
			}else {
				files = _this.image_file.value.split(",");	
			}
			if(_this.isValidFile(files)){
				_this.isEmpty = true;
				_this.notice.style.color = color.defaults;   
				_this.images_wrap.innerHTML = "";
				_this.showImage(files);
			}else {
				_this.isEmpty = false;
				_this.notice.style.color = color.danger;   
				_this.images_wrap.innerHTML = "";
			}
		};				
	};
	PreviewImage.prototype.createImage = function(src){
		var imageDiv = document.createElement("div");
		imageDiv.className = "image";
		var img = document.createElement("img");
		img.src = src;
		imageDiv.appendChild(img);
		return imageDiv;
	};
	PreviewImage.prototype.showImage = function(files){
		var i = 0;
		if(Util.isFileReader()){
			for(i=0;i<files.length;i++){
				this.readAsDataURL(files[i]);	
			}	
		}else {
			for(i=0;i<files.length;i++){
				this.images_wrap.appendChild(this.createImage(files[i]));	
			}
		}	
	};
	PreviewImage.prototype.readAsDataURL = function(file){
		var _this = this;
		var reader = new FileReader();  
		reader.readAsDataURL(file);  
		reader.onload=function(e){
			_this.images_wrap.appendChild(_this.createImage(this.result));	
		}  
	};
	PreviewImage.prototype.isEmpty = function(){
		return isEmpty;	
	};
	return PreviewImage;
});
