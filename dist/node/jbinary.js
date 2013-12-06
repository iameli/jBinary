!function(a){var b=function(){return this}();"object"==typeof exports?module.exports=a.call(b,require("jdataview")):"function"==typeof define&&define.amd?define(["jdataview"],function(){a.apply(b,arguments)}):b.jBinary=a.call(b,b.jDataView)}(function(a){"use strict";function b(a){for(var b=1,c=arguments.length;c>b;++b){var d=arguments[b];for(var e in d)void 0!==d[e]&&(a[e]=d[e])}return a}function c(a){return arguments[0]=g(a),b.apply(null,arguments)}function d(a,b,c){return c instanceof Function?c.call(a,b.contexts[0]):c}function e(b,c){return b instanceof e?b.as(c):(b instanceof a||(b=new a(b,void 0,void 0,c?c["jBinary.littleEndian"]:void 0)),this instanceof e?(this.view=b,this.view.seek(0),this.contexts=[],this.as(c,!0)):new e(b,c))}var f=this;"atob"in f&&"btoa"in f||!function(){var a=f,b="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",c=function(){try{document.createElement("$")}catch(a){return a}}();a.btoa||(a.btoa=function(a){for(var d,e,f=0,g=b,h="";a.charAt(0|f)||(g="=",f%1);h+=g.charAt(63&d>>8-8*(f%1))){if(e=a.charCodeAt(f+=.75),e>255)throw c;d=d<<8|e}return h}),a.atob||(a.atob=function(a){if(a=a.replace(/=+$/,""),1==a.length%4)throw c;for(var d,e,f=0,g=0,h="";e=a.charAt(g++);~e&&(d=f%4?64*d+e:e,f++%4)?h+=String.fromCharCode(255&d>>(6&-2*f)):0)e=b.indexOf(e);return h})}();var g=Object.create||function(a){var b=function(){};return b.prototype=a,new b},h=Object.defineProperty;h||(h=function(a,b,c,d){d&&(a[b]=c.value)});var i=e.prototype;i.cacheKey="jBinary.Cache",i.id=0,i._getCached=function(a,b,c){if(a.hasOwnProperty(this.cacheKey))return a[this.cacheKey];var d=b.call(this,a);return h(a,this.cacheKey,{value:d},c),d},i.getContext=function(a){switch(typeof a){case"undefined":a=0;case"number":return this.contexts[a];case"string":return this.getContext(function(b){return a in b});case"function":for(var b=0,c=this.contexts.length;c>b;b++){var d=this.contexts[b];if(a.call(this,d))return d}return}},i.inContext=function(a,b){this.contexts.unshift(a);var c=b.call(this);return this.contexts.shift(),c},e.Type=function(a){return c(e.Type.prototype,a)},e.Type.prototype={inherit:function(a,b){function d(a,b){var d=f[a];d&&(e||(e=c(f)),b.call(e,d),e[a]=null)}var e,f=this;return d("params",function(b){for(var c=0,d=Math.min(b.length,a.length);d>c;c++)this[b[c]]=a[c]}),d("setParams",function(b){b.apply(this,a)}),d("typeParams",function(a){for(var c=0,d=a.length;d>c;c++){var e=a[c],f=this[e];f&&(this[e]=b(f))}}),d("resolve",function(a){a.call(this,b)}),e||f},createProperty:function(a){return c(this,{binary:a})},toValue:function(a,b){return b!==!1&&"string"==typeof a?this.binary.getContext(a)[a]:d(this,this.binary,a)}},e.Template=function(a){return c(e.Template.prototype,a,{createProperty:function(){var b=(a.createProperty||e.Template.prototype.createProperty).apply(this,arguments);return b.getBaseType&&(b.baseType=b.binary.getType(b.getBaseType(b.binary.contexts[0]))),b}})},e.Template.prototype=c(e.Type.prototype,{setParams:function(){this.baseType&&(this.typeParams=["baseType"].concat(this.typeParams||[]))},baseRead:function(){return this.binary.read(this.baseType)},baseWrite:function(a){return this.binary.write(this.baseType,a)}}),e.Template.prototype.read=e.Template.prototype.baseRead,e.Template.prototype.write=e.Template.prototype.baseWrite,i.typeSet={extend:e.Type({setParams:function(){this.parts=arguments},resolve:function(a){for(var b=this.parts,c=b.length,d=new Array(c),e=0;c>e;e++)d[e]=a(b[e]);this.parts=d},read:function(){var a=this.parts,c=this.binary.read(a[0]);return this.binary.inContext(c,function(){for(var d=1,e=a.length;e>d;d++)b(c,this.read(a[d]))}),c},write:function(a){var b=this.parts;this.binary.inContext(a,function(){for(var c=0,d=b.length;d>c;c++)this.write(b[c],a)})}}),"enum":e.Template({params:["baseType","matches"],setParams:function(a,b){this.backMatches={};for(var c in b)this.backMatches[b[c]]=c},read:function(){var a=this.baseRead();return a in this.matches?this.matches[a]:a},write:function(a){this.baseWrite(a in this.backMatches?this.backMatches[a]:a)}}),string:e.Template({params:["length","encoding"],read:function(){return this.binary.view.getString(this.toValue(this.length),void 0,this.encoding)},write:function(a){this.binary.view.writeString(a,this.encoding)}}),string0:e.Type({params:["length","encoding"],read:function(){var a=this.binary.view,b=this.length;if(void 0===b){var c,d=a.tell(),e=0;for(b=a.byteLength-d;b>e&&(c=a.getUint8());)e++;var f=a.getString(e,d,this.encoding);return b>e&&a.skip(1),f}return a.getString(b,void 0,this.encoding).replace(/\0.*$/,"")},write:function(a){var b=this.binary.view,c=void 0===this.length?1:this.length-a.length;b.writeString(a,void 0,this.encoding),c>0&&(b.writeUint8(0),b.skip(c-1))}}),array:e.Template({params:["baseType","length"],read:function(){var a=this.toValue(this.length);if(this.baseType===i.typeSet.uint8)return this.binary.view.getBytes(a,void 0,!0,!0);var b;if(void 0!==a){b=new Array(a);for(var c=0;a>c;c++)b[c]=this.baseRead()}else{var d=this.binary.view.byteLength;for(b=[];this.binary.tell()<d;)b.push(this.baseRead())}return b},write:function(a){if(this.baseType===i.typeSet.uint8)return this.binary.view.writeBytes(a);for(var b=0,c=a.length;c>b;b++)this.baseWrite(a[b])}}),object:e.Type({params:["structure","proto"],resolve:function(a){var b={};for(var c in this.structure)b[c]=this.structure[c]instanceof Function?this.structure[c]:a(this.structure[c]);this.structure=b},read:function(){var a=this,b=this.structure,d=this.proto?c(this.proto):{};return this.binary.inContext(d,function(){for(var c in b){var e=b[c]instanceof Function?b[c].call(a,this.contexts[0]):this.read(b[c]);void 0!==e&&(d[c]=e)}}),d},write:function(a){var b=this,c=this.structure;this.binary.inContext(a,function(){for(var d in c)c[d]instanceof Function?a[d]=c[d].call(b,this.contexts[0]):this.write(c[d],a[d])})}}),bitfield:e.Type({params:["bitSize"],read:function(){return this.binary.view.getUnsigned(this.bitSize)},write:function(a){this.binary.view.writeUnsigned(a,this.bitSize)}}),"if":e.Template({params:["condition","trueType","falseType"],typeParams:["trueType","falseType"],getBaseType:function(){return this.toValue(this.condition)?this.trueType:this.falseType}}),if_not:e.Template({setParams:function(a,b,c){this.baseType=["if",a,c,b]}}),"const":e.Template({params:["baseType","value","strict"],read:function(){var a=this.baseRead();if(this.strict&&a!==this.value){if(this.strict instanceof Function)return this.strict(a);throw new TypeError("Unexpected value.")}return a},write:function(a){this.baseWrite(this.strict||void 0===a?this.value:a)}}),skip:e.Type({setParams:function(a){this.read=this.write=function(){this.binary.view.skip(this.toValue(a))}}}),blob:e.Type({params:["length"],read:function(){return this.binary.view.getBytes(this.toValue(this.length))},write:function(a){this.binary.view.writeBytes(a,!0)}}),binary:e.Template({params:["length","typeSet"],read:function(){var a=this.binary.tell(),b=this.binary.skip(this.toValue(this.length)),c=this.binary.view.slice(a,b);return new e(c,this.typeSet)},write:function(a){this.binary.write("blob",a.read("blob",0))}}),lazy:e.Template({marker:"jBinary.Lazy",params:["innerType","length"],getBaseType:function(){return["binary",this.length,this.binary.typeSet]},read:function(){var a=function(c){return 0===arguments.length?"value"in a?a.value:a.value=a.binary.read(a.innerType):b(a,{wasChanged:!0,value:c}).value};return a[this.marker]=!0,b(a,{binary:b(this.baseRead(),{contexts:this.binary.contexts.slice()}),innerType:this.innerType})},write:function(a){a.wasChanged||!a[this.marker]?this.binary.write(this.innerType,a()):this.baseWrite(a.binary)}})},i.as=function(a,b){var d=b?this:c(this);return a=a||i.typeSet,d.typeSet=i.typeSet===a||i.typeSet.isPrototypeOf(a)?a:c(i.typeSet,a),d.cacheKey=i.cacheKey,d.cacheKey=d._getCached(a,function(){return i.cacheKey+"."+ ++i.id},!0),d};var j=e.Type({params:["littleEndian"],read:function(){return this.binary.view["get"+this.dataType](void 0,this.littleEndian)},write:function(a){this.binary.view["write"+this.dataType](a,this.littleEndian)}});!function(a){for(var b=0,d=a.length;d>b;b++){var e=a[b];i.typeSet[e.toLowerCase()]=c(j,{dataType:e})}}(["Uint8","Uint16","Uint32","Uint64","Int8","Int16","Int32","Int64","Float32","Float64","Char"]),b(i.typeSet,{"byte":i.typeSet.uint8,"float":i.typeSet.float32,"double":i.typeSet.float64}),i.toValue=function(a){return d(this,this,a)},i.seek=function(a,b){if(a=this.toValue(a),void 0!==b){var c=this.view.tell();this.view.seek(a);var d=b.call(this);return this.view.seek(c),d}return this.view.seek(a)},i.tell=function(){return this.view.tell()},i.skip=function(a,b){return this.seek(this.tell()+this.toValue(a),b)},i.getType=function(a,b){switch(typeof a){case"string":if(!(a in this.typeSet))throw new ReferenceError("Unknown type `"+a+"`");return this.getType(this.typeSet[a],b);case"number":return this.getType(i.typeSet.bitfield,[a]);case"object":if(a instanceof e.Type){var c=this;return a.inherit(b||[],function(a){return c.getType(a)})}var d=a instanceof Array;return this._getCached(a,d?function(a){return this.getType(a[0],a.slice(1))}:function(a){return this.getType(i.typeSet.object,[a])},d)}},i.createProperty=function(a){return this.getType(a).createProperty(this)},i._action=function(a,b,c){return void 0!==a?void 0!==b?this.seek(b,c):c.call(this):void 0},i.read=function(a,b){return this._action(a,b,function(){return this.createProperty(a).read(this.contexts[0])})},i.readAll=function(){return this.read("jBinary.all",0)},i.write=function(a,b,c){return this._action(a,c,function(){var c=this.tell();return this.createProperty(a).write(b,this.contexts[0]),this.tell()-c})},i.writeAll=function(a){return this.write("jBinary.all",a,0)},i._toURI=function(a){var b=this.seek(0,function(){return this.view.getString(void 0,void 0,this.view._isNodeBuffer?"base64":"binary")});return"data:"+a+";base64,"+(this.view._isNodeBuffer?b:btoa(b))},i.toURI=function(a){return this._toURI(a||this.typeSet["jBinary.mimeType"]||"application/octet-stream")},i.slice=function(a,b,c){return new e(this.view.slice(a,b,c),this.typeSet)};var k=!0&&require("stream").Readable;return e.loadData=function l(b,c){var d;if(!c)return{then:function(a,c){var d=function(b,d){return b?c(b):a(d)};return l(b,d)}};switch(!0){case!1:var e=new FileReader;return e.onload=e.onerror=function(){c(this.error,this.result)},e.readAsArrayBuffer(b),void 0;case!0&&!!k&&b instanceof k:var f=[];return b.on("readable",function(){f.push(this.read())}).on("end",function(){c(null,Buffer.concat(f))}).on("error",c),void 0;case"string"!=typeof b:return c(new TypeError("Unsupported source type."));case!!(d=b.match(/^data:(.+?)(;base64)?,(.*)$/)):try{var g=d[2],h=d[3];c(null,g&&a.prototype.compatibility.NodeBuffer?new Buffer(h,"base64"):(g?atob:decodeURIComponent)(h))}catch(i){c(i)}return;case!1:var j=new XMLHttpRequest;j.open("GET",b,!0),"responseType"in j?j.responseType="arraybuffer":"overrideMimeType"in j?j.overrideMimeType("text/plain; charset=x-user-defined"):j.setRequestHeader("Accept-Charset","x-user-defined"),"onload"in j||(j.onreadystatechange=function(){4===this.readyState&&this.onload()});var m=function(a){c(new Error(a))};return j.onload=function(){return 0!==this.status&&200!==this.status?m("HTTP Error #"+this.status+": "+this.statusText):("response"in this||(this.response=new VBArray(this.responseBody).toArray()),c(null,this.response),void 0)},j.onerror=function(){m("Network error.")},j.send(null),void 0;case!1:return c(new TypeError("Unsupported source type."));case!0&&/^(https?):\/\//.test(b):return require("request").get({uri:b,encoding:null},function(a,b,d){if(!a&&200!==b.statusCode){var e=require("http").STATUS_CODES[b.statusCode];a=new Error("HTTP Error #"+b.statusCode+": "+e)}c(a,d)}),void 0;case!0:require("fs").readFile(b,c)}},e.load=function m(a,b,c){if(!c){if("function"!=typeof b)return{then:function(c,d){var e=function(a,b){return a?d(a):c(b)};return m(a,b,e)}};c=b,b=void 0}e.loadData(a,function(a,d){a?c(a):c(null,new e(d,b))})},e});