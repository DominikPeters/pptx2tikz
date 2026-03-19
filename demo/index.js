var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire(path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var jszip_minExports = {};
var jszip_min = {
  get exports(){ return jszip_minExports; },
  set exports(v){ jszip_minExports = v; },
};

/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/

(function (module, exports) {
	!function(e){module.exports=e();}(function(){return function s(a,o,h){function u(r,e){if(!o[r]){if(!a[r]){var t="function"==typeof commonjsRequire&&commonjsRequire;if(!e&&t)return t(r,!0);if(l)return l(r,!0);var n=new Error("Cannot find module '"+r+"'");throw n.code="MODULE_NOT_FOUND",n}var i=o[r]={exports:{}};a[r][0].call(i.exports,function(e){var t=a[r][1][e];return u(t||e)},i,i.exports,s,a,o,h);}return o[r].exports}for(var l="function"==typeof commonjsRequire&&commonjsRequire,e=0;e<h.length;e++)u(h[e]);return u}({1:[function(e,t,r){var d=e("./utils"),c=e("./support"),p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.encode=function(e){for(var t,r,n,i,s,a,o,h=[],u=0,l=e.length,f=l,c="string"!==d.getTypeOf(e);u<e.length;)f=l-u,n=c?(t=e[u++],r=u<l?e[u++]:0,u<l?e[u++]:0):(t=e.charCodeAt(u++),r=u<l?e.charCodeAt(u++):0,u<l?e.charCodeAt(u++):0),i=t>>2,s=(3&t)<<4|r>>4,a=1<f?(15&r)<<2|n>>6:64,o=2<f?63&n:64,h.push(p.charAt(i)+p.charAt(s)+p.charAt(a)+p.charAt(o));return h.join("")},r.decode=function(e){var t,r,n,i,s,a,o=0,h=0,u="data:";if(e.substr(0,u.length)===u)throw new Error("Invalid base64 input, it looks like a data url.");var l,f=3*(e=e.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(e.charAt(e.length-1)===p.charAt(64)&&f--,e.charAt(e.length-2)===p.charAt(64)&&f--,f%1!=0)throw new Error("Invalid base64 input, bad content length.");for(l=c.uint8array?new Uint8Array(0|f):new Array(0|f);o<e.length;)t=p.indexOf(e.charAt(o++))<<2|(i=p.indexOf(e.charAt(o++)))>>4,r=(15&i)<<4|(s=p.indexOf(e.charAt(o++)))>>2,n=(3&s)<<6|(a=p.indexOf(e.charAt(o++))),l[h++]=t,64!==s&&(l[h++]=r),64!==a&&(l[h++]=n);return l};},{"./support":30,"./utils":32}],2:[function(e,t,r){var n=e("./external"),i=e("./stream/DataWorker"),s=e("./stream/Crc32Probe"),a=e("./stream/DataLengthProbe");function o(e,t,r,n,i){this.compressedSize=e,this.uncompressedSize=t,this.crc32=r,this.compression=n,this.compressedContent=i;}o.prototype={getContentWorker:function(){var e=new i(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")),t=this;return e.on("end",function(){if(this.streamInfo.data_length!==t.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),e},getCompressedWorker:function(){return new i(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},o.createWorkerFrom=function(e,t,r){return e.pipe(new s).pipe(new a("uncompressedSize")).pipe(t.compressWorker(r)).pipe(new a("compressedSize")).withStreamInfo("compression",t)},t.exports=o;},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(e,t,r){var n=e("./stream/GenericWorker");r.STORE={magic:"\0\0",compressWorker:function(){return new n("STORE compression")},uncompressWorker:function(){return new n("STORE decompression")}},r.DEFLATE=e("./flate");},{"./flate":7,"./stream/GenericWorker":28}],4:[function(e,t,r){var n=e("./utils");var o=function(){for(var e,t=[],r=0;r<256;r++){e=r;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[r]=e;}return t}();t.exports=function(e,t){return void 0!==e&&e.length?"string"!==n.getTypeOf(e)?function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t[a])];return -1^e}(0|t,e,e.length,0):function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t.charCodeAt(a))];return -1^e}(0|t,e,e.length,0):0};},{"./utils":32}],5:[function(e,t,r){r.base64=!1,r.binary=!1,r.dir=!1,r.createFolders=!0,r.date=null,r.compression=null,r.compressionOptions=null,r.comment=null,r.unixPermissions=null,r.dosPermissions=null;},{}],6:[function(e,t,r){var n=null;n="undefined"!=typeof Promise?Promise:e("lie"),t.exports={Promise:n};},{lie:37}],7:[function(e,t,r){var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array,i=e("pako"),s=e("./utils"),a=e("./stream/GenericWorker"),o=n?"uint8array":"array";function h(e,t){a.call(this,"FlateWorker/"+e),this._pako=null,this._pakoAction=e,this._pakoOptions=t,this.meta={};}r.magic="\b\0",s.inherits(h,a),h.prototype.processChunk=function(e){this.meta=e.meta,null===this._pako&&this._createPako(),this._pako.push(s.transformTo(o,e.data),!1);},h.prototype.flush=function(){a.prototype.flush.call(this),null===this._pako&&this._createPako(),this._pako.push([],!0);},h.prototype.cleanUp=function(){a.prototype.cleanUp.call(this),this._pako=null;},h.prototype._createPako=function(){this._pako=new i[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var t=this;this._pako.onData=function(e){t.push({data:e,meta:t.meta});};},r.compressWorker=function(e){return new h("Deflate",e)},r.uncompressWorker=function(){return new h("Inflate",{})};},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(e,t,r){function A(e,t){var r,n="";for(r=0;r<t;r++)n+=String.fromCharCode(255&e),e>>>=8;return n}function n(e,t,r,n,i,s){var a,o,h=e.file,u=e.compression,l=s!==O.utf8encode,f=I.transformTo("string",s(h.name)),c=I.transformTo("string",O.utf8encode(h.name)),d=h.comment,p=I.transformTo("string",s(d)),m=I.transformTo("string",O.utf8encode(d)),_=c.length!==h.name.length,g=m.length!==d.length,b="",v="",y="",w=h.dir,k=h.date,x={crc32:0,compressedSize:0,uncompressedSize:0};t&&!r||(x.crc32=e.crc32,x.compressedSize=e.compressedSize,x.uncompressedSize=e.uncompressedSize);var S=0;t&&(S|=8),l||!_&&!g||(S|=2048);var z=0,C=0;w&&(z|=16),"UNIX"===i?(C=798,z|=function(e,t){var r=e;return e||(r=t?16893:33204),(65535&r)<<16}(h.unixPermissions,w)):(C=20,z|=function(e){return 63&(e||0)}(h.dosPermissions)),a=k.getUTCHours(),a<<=6,a|=k.getUTCMinutes(),a<<=5,a|=k.getUTCSeconds()/2,o=k.getUTCFullYear()-1980,o<<=4,o|=k.getUTCMonth()+1,o<<=5,o|=k.getUTCDate(),_&&(v=A(1,1)+A(B(f),4)+c,b+="up"+A(v.length,2)+v),g&&(y=A(1,1)+A(B(p),4)+m,b+="uc"+A(y.length,2)+y);var E="";return E+="\n\0",E+=A(S,2),E+=u.magic,E+=A(a,2),E+=A(o,2),E+=A(x.crc32,4),E+=A(x.compressedSize,4),E+=A(x.uncompressedSize,4),E+=A(f.length,2),E+=A(b.length,2),{fileRecord:R.LOCAL_FILE_HEADER+E+f+b,dirRecord:R.CENTRAL_FILE_HEADER+A(C,2)+E+A(p.length,2)+"\0\0\0\0"+A(z,4)+A(n,4)+f+b+p}}var I=e("../utils"),i=e("../stream/GenericWorker"),O=e("../utf8"),B=e("../crc32"),R=e("../signature");function s(e,t,r,n){i.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=t,this.zipPlatform=r,this.encodeFileName=n,this.streamFiles=e,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[];}I.inherits(s,i),s.prototype.push=function(e){var t=e.meta.percent||0,r=this.entriesCount,n=this._sources.length;this.accumulate?this.contentBuffer.push(e):(this.bytesWritten+=e.data.length,i.prototype.push.call(this,{data:e.data,meta:{currentFile:this.currentFile,percent:r?(t+100*(r-n-1))/r:100}}));},s.prototype.openedSource=function(e){this.currentSourceOffset=this.bytesWritten,this.currentFile=e.file.name;var t=this.streamFiles&&!e.file.dir;if(t){var r=n(e,t,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:r.fileRecord,meta:{percent:0}});}else this.accumulate=!0;},s.prototype.closedSource=function(e){this.accumulate=!1;var t=this.streamFiles&&!e.file.dir,r=n(e,t,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(r.dirRecord),t)this.push({data:function(e){return R.DATA_DESCRIPTOR+A(e.crc32,4)+A(e.compressedSize,4)+A(e.uncompressedSize,4)}(e),meta:{percent:100}});else for(this.push({data:r.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null;},s.prototype.flush=function(){for(var e=this.bytesWritten,t=0;t<this.dirRecords.length;t++)this.push({data:this.dirRecords[t],meta:{percent:100}});var r=this.bytesWritten-e,n=function(e,t,r,n,i){var s=I.transformTo("string",i(n));return R.CENTRAL_DIRECTORY_END+"\0\0\0\0"+A(e,2)+A(e,2)+A(t,4)+A(r,4)+A(s.length,2)+s}(this.dirRecords.length,r,e,this.zipComment,this.encodeFileName);this.push({data:n,meta:{percent:100}});},s.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume();},s.prototype.registerPrevious=function(e){this._sources.push(e);var t=this;return e.on("data",function(e){t.processChunk(e);}),e.on("end",function(){t.closedSource(t.previous.streamInfo),t._sources.length?t.prepareNextSource():t.end();}),e.on("error",function(e){t.error(e);}),this},s.prototype.resume=function(){return !!i.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},s.prototype.error=function(e){var t=this._sources;if(!i.prototype.error.call(this,e))return !1;for(var r=0;r<t.length;r++)try{t[r].error(e);}catch(e){}return !0},s.prototype.lock=function(){i.prototype.lock.call(this);for(var e=this._sources,t=0;t<e.length;t++)e[t].lock();},t.exports=s;},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(e,t,r){var u=e("../compressions"),n=e("./ZipFileWorker");r.generateWorker=function(e,a,t){var o=new n(a.streamFiles,t,a.platform,a.encodeFileName),h=0;try{e.forEach(function(e,t){h++;var r=function(e,t){var r=e||t,n=u[r];if(!n)throw new Error(r+" is not a valid compression method !");return n}(t.options.compression,a.compression),n=t.options.compressionOptions||a.compressionOptions||{},i=t.dir,s=t.date;t._compressWorker(r,n).withStreamInfo("file",{name:e,dir:i,date:s,comment:t.comment||"",unixPermissions:t.unixPermissions,dosPermissions:t.dosPermissions}).pipe(o);}),o.entriesCount=h;}catch(e){o.error(e);}return o};},{"../compressions":3,"./ZipFileWorker":8}],10:[function(e,t,r){function n(){if(!(this instanceof n))return new n;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var e=new n;for(var t in this)"function"!=typeof this[t]&&(e[t]=this[t]);return e};}(n.prototype=e("./object")).loadAsync=e("./load"),n.support=e("./support"),n.defaults=e("./defaults"),n.version="3.10.1",n.loadAsync=function(e,t){return (new n).loadAsync(e,t)},n.external=e("./external"),t.exports=n;},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(e,t,r){var u=e("./utils"),i=e("./external"),n=e("./utf8"),s=e("./zipEntries"),a=e("./stream/Crc32Probe"),l=e("./nodejsUtils");function f(n){return new i.Promise(function(e,t){var r=n.decompressed.getContentWorker().pipe(new a);r.on("error",function(e){t(e);}).on("end",function(){r.streamInfo.crc32!==n.decompressed.crc32?t(new Error("Corrupted zip : CRC32 mismatch")):e();}).resume();})}t.exports=function(e,o){var h=this;return o=u.extend(o||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:n.utf8decode}),l.isNode&&l.isStream(e)?i.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):u.prepareContent("the loaded zip file",e,!0,o.optimizedBinaryString,o.base64).then(function(e){var t=new s(o);return t.load(e),t}).then(function(e){var t=[i.Promise.resolve(e)],r=e.files;if(o.checkCRC32)for(var n=0;n<r.length;n++)t.push(f(r[n]));return i.Promise.all(t)}).then(function(e){for(var t=e.shift(),r=t.files,n=0;n<r.length;n++){var i=r[n],s=i.fileNameStr,a=u.resolve(i.fileNameStr);h.file(a,i.decompressed,{binary:!0,optimizedBinaryString:!0,date:i.date,dir:i.dir,comment:i.fileCommentStr.length?i.fileCommentStr:null,unixPermissions:i.unixPermissions,dosPermissions:i.dosPermissions,createFolders:o.createFolders}),i.dir||(h.file(a).unsafeOriginalName=s);}return t.zipComment.length&&(h.comment=t.zipComment),h})};},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(e,t,r){var n=e("../utils"),i=e("../stream/GenericWorker");function s(e,t){i.call(this,"Nodejs stream input adapter for "+e),this._upstreamEnded=!1,this._bindStream(t);}n.inherits(s,i),s.prototype._bindStream=function(e){var t=this;(this._stream=e).pause(),e.on("data",function(e){t.push({data:e,meta:{percent:0}});}).on("error",function(e){t.isPaused?this.generatedError=e:t.error(e);}).on("end",function(){t.isPaused?t._upstreamEnded=!0:t.end();});},s.prototype.pause=function(){return !!i.prototype.pause.call(this)&&(this._stream.pause(),!0)},s.prototype.resume=function(){return !!i.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},t.exports=s;},{"../stream/GenericWorker":28,"../utils":32}],13:[function(e,t,r){var i=e("readable-stream").Readable;function n(e,t,r){i.call(this,t),this._helper=e;var n=this;e.on("data",function(e,t){n.push(e)||n._helper.pause(),r&&r(t);}).on("error",function(e){n.emit("error",e);}).on("end",function(){n.push(null);});}e("../utils").inherits(n,i),n.prototype._read=function(){this._helper.resume();},t.exports=n;},{"../utils":32,"readable-stream":16}],14:[function(e,t,r){t.exports={isNode:"undefined"!=typeof Buffer,newBufferFrom:function(e,t){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(e,t);if("number"==typeof e)throw new Error('The "data" argument must not be a number');return new Buffer(e,t)},allocBuffer:function(e){if(Buffer.alloc)return Buffer.alloc(e);var t=new Buffer(e);return t.fill(0),t},isBuffer:function(e){return Buffer.isBuffer(e)},isStream:function(e){return e&&"function"==typeof e.on&&"function"==typeof e.pause&&"function"==typeof e.resume}};},{}],15:[function(e,t,r){function s(e,t,r){var n,i=u.getTypeOf(t),s=u.extend(r||{},f);s.date=s.date||new Date,null!==s.compression&&(s.compression=s.compression.toUpperCase()),"string"==typeof s.unixPermissions&&(s.unixPermissions=parseInt(s.unixPermissions,8)),s.unixPermissions&&16384&s.unixPermissions&&(s.dir=!0),s.dosPermissions&&16&s.dosPermissions&&(s.dir=!0),s.dir&&(e=g(e)),s.createFolders&&(n=_(e))&&b.call(this,n,!0);var a="string"===i&&!1===s.binary&&!1===s.base64;r&&void 0!==r.binary||(s.binary=!a),(t instanceof c&&0===t.uncompressedSize||s.dir||!t||0===t.length)&&(s.base64=!1,s.binary=!0,t="",s.compression="STORE",i="string");var o=null;o=t instanceof c||t instanceof l?t:p.isNode&&p.isStream(t)?new m(e,t):u.prepareContent(e,t,s.binary,s.optimizedBinaryString,s.base64);var h=new d(e,o,s);this.files[e]=h;}var i=e("./utf8"),u=e("./utils"),l=e("./stream/GenericWorker"),a=e("./stream/StreamHelper"),f=e("./defaults"),c=e("./compressedObject"),d=e("./zipObject"),o=e("./generate"),p=e("./nodejsUtils"),m=e("./nodejs/NodejsStreamInputAdapter"),_=function(e){"/"===e.slice(-1)&&(e=e.substring(0,e.length-1));var t=e.lastIndexOf("/");return 0<t?e.substring(0,t):""},g=function(e){return "/"!==e.slice(-1)&&(e+="/"),e},b=function(e,t){return t=void 0!==t?t:f.createFolders,e=g(e),this.files[e]||s.call(this,e,null,{dir:!0,createFolders:t}),this.files[e]};function h(e){return "[object RegExp]"===Object.prototype.toString.call(e)}var n={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(e){var t,r,n;for(t in this.files)n=this.files[t],(r=t.slice(this.root.length,t.length))&&t.slice(0,this.root.length)===this.root&&e(r,n);},filter:function(r){var n=[];return this.forEach(function(e,t){r(e,t)&&n.push(t);}),n},file:function(e,t,r){if(1!==arguments.length)return e=this.root+e,s.call(this,e,t,r),this;if(h(e)){var n=e;return this.filter(function(e,t){return !t.dir&&n.test(e)})}var i=this.files[this.root+e];return i&&!i.dir?i:null},folder:function(r){if(!r)return this;if(h(r))return this.filter(function(e,t){return t.dir&&r.test(e)});var e=this.root+r,t=b.call(this,e),n=this.clone();return n.root=t.name,n},remove:function(r){r=this.root+r;var e=this.files[r];if(e||("/"!==r.slice(-1)&&(r+="/"),e=this.files[r]),e&&!e.dir)delete this.files[r];else for(var t=this.filter(function(e,t){return t.name.slice(0,r.length)===r}),n=0;n<t.length;n++)delete this.files[t[n].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(e){var t,r={};try{if((r=u.extend(e||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:i.utf8encode})).type=r.type.toLowerCase(),r.compression=r.compression.toUpperCase(),"binarystring"===r.type&&(r.type="string"),!r.type)throw new Error("No output type specified.");u.checkSupport(r.type),"darwin"!==r.platform&&"freebsd"!==r.platform&&"linux"!==r.platform&&"sunos"!==r.platform||(r.platform="UNIX"),"win32"===r.platform&&(r.platform="DOS");var n=r.comment||this.comment||"";t=o.generateWorker(this,r,n);}catch(e){(t=new l("error")).error(e);}return new a(t,r.type||"string",r.mimeType)},generateAsync:function(e,t){return this.generateInternalStream(e).accumulate(t)},generateNodeStream:function(e,t){return (e=e||{}).type||(e.type="nodebuffer"),this.generateInternalStream(e).toNodejsStream(t)}};t.exports=n;},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(e,t,r){t.exports=e("stream");},{stream:void 0}],17:[function(e,t,r){var n=e("./DataReader");function i(e){n.call(this,e);for(var t=0;t<this.data.length;t++)e[t]=255&e[t];}e("../utils").inherits(i,n),i.prototype.byteAt=function(e){return this.data[this.zero+e]},i.prototype.lastIndexOfSignature=function(e){for(var t=e.charCodeAt(0),r=e.charCodeAt(1),n=e.charCodeAt(2),i=e.charCodeAt(3),s=this.length-4;0<=s;--s)if(this.data[s]===t&&this.data[s+1]===r&&this.data[s+2]===n&&this.data[s+3]===i)return s-this.zero;return -1},i.prototype.readAndCheckSignature=function(e){var t=e.charCodeAt(0),r=e.charCodeAt(1),n=e.charCodeAt(2),i=e.charCodeAt(3),s=this.readData(4);return t===s[0]&&r===s[1]&&n===s[2]&&i===s[3]},i.prototype.readData=function(e){if(this.checkOffset(e),0===e)return [];var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i;},{"../utils":32,"./DataReader":18}],18:[function(e,t,r){var n=e("../utils");function i(e){this.data=e,this.length=e.length,this.index=0,this.zero=0;}i.prototype={checkOffset:function(e){this.checkIndex(this.index+e);},checkIndex:function(e){if(this.length<this.zero+e||e<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+e+"). Corrupted zip ?")},setIndex:function(e){this.checkIndex(e),this.index=e;},skip:function(e){this.setIndex(this.index+e);},byteAt:function(){},readInt:function(e){var t,r=0;for(this.checkOffset(e),t=this.index+e-1;t>=this.index;t--)r=(r<<8)+this.byteAt(t);return this.index+=e,r},readString:function(e){return n.transformTo("string",this.readData(e))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var e=this.readInt(4);return new Date(Date.UTC(1980+(e>>25&127),(e>>21&15)-1,e>>16&31,e>>11&31,e>>5&63,(31&e)<<1))}},t.exports=i;},{"../utils":32}],19:[function(e,t,r){var n=e("./Uint8ArrayReader");function i(e){n.call(this,e);}e("../utils").inherits(i,n),i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i;},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(e,t,r){var n=e("./DataReader");function i(e){n.call(this,e);}e("../utils").inherits(i,n),i.prototype.byteAt=function(e){return this.data.charCodeAt(this.zero+e)},i.prototype.lastIndexOfSignature=function(e){return this.data.lastIndexOf(e)-this.zero},i.prototype.readAndCheckSignature=function(e){return e===this.readData(4)},i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i;},{"../utils":32,"./DataReader":18}],21:[function(e,t,r){var n=e("./ArrayReader");function i(e){n.call(this,e);}e("../utils").inherits(i,n),i.prototype.readData=function(e){if(this.checkOffset(e),0===e)return new Uint8Array(0);var t=this.data.subarray(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i;},{"../utils":32,"./ArrayReader":17}],22:[function(e,t,r){var n=e("../utils"),i=e("../support"),s=e("./ArrayReader"),a=e("./StringReader"),o=e("./NodeBufferReader"),h=e("./Uint8ArrayReader");t.exports=function(e){var t=n.getTypeOf(e);return n.checkSupport(t),"string"!==t||i.uint8array?"nodebuffer"===t?new o(e):i.uint8array?new h(n.transformTo("uint8array",e)):new s(n.transformTo("array",e)):new a(e)};},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(e,t,r){r.LOCAL_FILE_HEADER="PK",r.CENTRAL_FILE_HEADER="PK",r.CENTRAL_DIRECTORY_END="PK",r.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK",r.ZIP64_CENTRAL_DIRECTORY_END="PK",r.DATA_DESCRIPTOR="PK\b";},{}],24:[function(e,t,r){var n=e("./GenericWorker"),i=e("../utils");function s(e){n.call(this,"ConvertWorker to "+e),this.destType=e;}i.inherits(s,n),s.prototype.processChunk=function(e){this.push({data:i.transformTo(this.destType,e.data),meta:e.meta});},t.exports=s;},{"../utils":32,"./GenericWorker":28}],25:[function(e,t,r){var n=e("./GenericWorker"),i=e("../crc32");function s(){n.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0);}e("../utils").inherits(s,n),s.prototype.processChunk=function(e){this.streamInfo.crc32=i(e.data,this.streamInfo.crc32||0),this.push(e);},t.exports=s;},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(e,t,r){var n=e("../utils"),i=e("./GenericWorker");function s(e){i.call(this,"DataLengthProbe for "+e),this.propName=e,this.withStreamInfo(e,0);}n.inherits(s,i),s.prototype.processChunk=function(e){if(e){var t=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=t+e.data.length;}i.prototype.processChunk.call(this,e);},t.exports=s;},{"../utils":32,"./GenericWorker":28}],27:[function(e,t,r){var n=e("../utils"),i=e("./GenericWorker");function s(e){i.call(this,"DataWorker");var t=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,e.then(function(e){t.dataIsReady=!0,t.data=e,t.max=e&&e.length||0,t.type=n.getTypeOf(e),t.isPaused||t._tickAndRepeat();},function(e){t.error(e);});}n.inherits(s,i),s.prototype.cleanUp=function(){i.prototype.cleanUp.call(this),this.data=null;},s.prototype.resume=function(){return !!i.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,n.delay(this._tickAndRepeat,[],this)),!0)},s.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(n.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0));},s.prototype._tick=function(){if(this.isPaused||this.isFinished)return !1;var e=null,t=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":e=this.data.substring(this.index,t);break;case"uint8array":e=this.data.subarray(this.index,t);break;case"array":case"nodebuffer":e=this.data.slice(this.index,t);}return this.index=t,this.push({data:e,meta:{percent:this.max?this.index/this.max*100:0}})},t.exports=s;},{"../utils":32,"./GenericWorker":28}],28:[function(e,t,r){function n(e){this.name=e||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null;}n.prototype={push:function(e){this.emit("data",e);},end:function(){if(this.isFinished)return !1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0;}catch(e){this.emit("error",e);}return !0},error:function(e){return !this.isFinished&&(this.isPaused?this.generatedError=e:(this.isFinished=!0,this.emit("error",e),this.previous&&this.previous.error(e),this.cleanUp()),!0)},on:function(e,t){return this._listeners[e].push(t),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[];},emit:function(e,t){if(this._listeners[e])for(var r=0;r<this._listeners[e].length;r++)this._listeners[e][r].call(this,t);},pipe:function(e){return e.registerPrevious(this)},registerPrevious:function(e){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=e.streamInfo,this.mergeStreamInfo(),this.previous=e;var t=this;return e.on("data",function(e){t.processChunk(e);}),e.on("end",function(){t.end();}),e.on("error",function(e){t.error(e);}),this},pause:function(){return !this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return !1;var e=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),e=!0),this.previous&&this.previous.resume(),!e},flush:function(){},processChunk:function(e){this.push(e);},withStreamInfo:function(e,t){return this.extraStreamInfo[e]=t,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var e in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,e)&&(this.streamInfo[e]=this.extraStreamInfo[e]);},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock();},toString:function(){var e="Worker "+this.name;return this.previous?this.previous+" -> "+e:e}},t.exports=n;},{}],29:[function(e,t,r){var h=e("../utils"),i=e("./ConvertWorker"),s=e("./GenericWorker"),u=e("../base64"),n=e("../support"),a=e("../external"),o=null;if(n.nodestream)try{o=e("../nodejs/NodejsStreamOutputAdapter");}catch(e){}function l(e,o){return new a.Promise(function(t,r){var n=[],i=e._internalType,s=e._outputType,a=e._mimeType;e.on("data",function(e,t){n.push(e),o&&o(t);}).on("error",function(e){n=[],r(e);}).on("end",function(){try{var e=function(e,t,r){switch(e){case"blob":return h.newBlob(h.transformTo("arraybuffer",t),r);case"base64":return u.encode(t);default:return h.transformTo(e,t)}}(s,function(e,t){var r,n=0,i=null,s=0;for(r=0;r<t.length;r++)s+=t[r].length;switch(e){case"string":return t.join("");case"array":return Array.prototype.concat.apply([],t);case"uint8array":for(i=new Uint8Array(s),r=0;r<t.length;r++)i.set(t[r],n),n+=t[r].length;return i;case"nodebuffer":return Buffer.concat(t);default:throw new Error("concat : unsupported type '"+e+"'")}}(i,n),a);t(e);}catch(e){r(e);}n=[];}).resume();})}function f(e,t,r){var n=t;switch(t){case"blob":case"arraybuffer":n="uint8array";break;case"base64":n="string";}try{this._internalType=n,this._outputType=t,this._mimeType=r,h.checkSupport(n),this._worker=e.pipe(new i(n)),e.lock();}catch(e){this._worker=new s("error"),this._worker.error(e);}}f.prototype={accumulate:function(e){return l(this,e)},on:function(e,t){var r=this;return "data"===e?this._worker.on(e,function(e){t.call(r,e.data,e.meta);}):this._worker.on(e,function(){h.delay(t,arguments,r);}),this},resume:function(){return h.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(e){if(h.checkSupport("nodestream"),"nodebuffer"!==this._outputType)throw new Error(this._outputType+" is not supported by this method");return new o(this,{objectMode:"nodebuffer"!==this._outputType},e)}},t.exports=f;},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(e,t,r){if(r.base64=!0,r.array=!0,r.string=!0,r.arraybuffer="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array,r.nodebuffer="undefined"!=typeof Buffer,r.uint8array="undefined"!=typeof Uint8Array,"undefined"==typeof ArrayBuffer)r.blob=!1;else {var n=new ArrayBuffer(0);try{r.blob=0===new Blob([n],{type:"application/zip"}).size;}catch(e){try{var i=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);i.append(n),r.blob=0===i.getBlob("application/zip").size;}catch(e){r.blob=!1;}}}try{r.nodestream=!!e("readable-stream").Readable;}catch(e){r.nodestream=!1;}},{"readable-stream":16}],31:[function(e,t,s){for(var o=e("./utils"),h=e("./support"),r=e("./nodejsUtils"),n=e("./stream/GenericWorker"),u=new Array(256),i=0;i<256;i++)u[i]=252<=i?6:248<=i?5:240<=i?4:224<=i?3:192<=i?2:1;u[254]=u[254]=1;function a(){n.call(this,"utf-8 decode"),this.leftOver=null;}function l(){n.call(this,"utf-8 encode");}s.utf8encode=function(e){return h.nodebuffer?r.newBufferFrom(e,"utf-8"):function(e){var t,r,n,i,s,a=e.length,o=0;for(i=0;i<a;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),o+=r<128?1:r<2048?2:r<65536?3:4;for(t=h.uint8array?new Uint8Array(o):new Array(o),i=s=0;s<o;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),r<128?t[s++]=r:(r<2048?t[s++]=192|r>>>6:(r<65536?t[s++]=224|r>>>12:(t[s++]=240|r>>>18,t[s++]=128|r>>>12&63),t[s++]=128|r>>>6&63),t[s++]=128|63&r);return t}(e)},s.utf8decode=function(e){return h.nodebuffer?o.transformTo("nodebuffer",e).toString("utf-8"):function(e){var t,r,n,i,s=e.length,a=new Array(2*s);for(t=r=0;t<s;)if((n=e[t++])<128)a[r++]=n;else if(4<(i=u[n]))a[r++]=65533,t+=i-1;else {for(n&=2===i?31:3===i?15:7;1<i&&t<s;)n=n<<6|63&e[t++],i--;1<i?a[r++]=65533:n<65536?a[r++]=n:(n-=65536,a[r++]=55296|n>>10&1023,a[r++]=56320|1023&n);}return a.length!==r&&(a.subarray?a=a.subarray(0,r):a.length=r),o.applyFromCharCode(a)}(e=o.transformTo(h.uint8array?"uint8array":"array",e))},o.inherits(a,n),a.prototype.processChunk=function(e){var t=o.transformTo(h.uint8array?"uint8array":"array",e.data);if(this.leftOver&&this.leftOver.length){if(h.uint8array){var r=t;(t=new Uint8Array(r.length+this.leftOver.length)).set(this.leftOver,0),t.set(r,this.leftOver.length);}else t=this.leftOver.concat(t);this.leftOver=null;}var n=function(e,t){var r;for((t=t||e.length)>e.length&&(t=e.length),r=t-1;0<=r&&128==(192&e[r]);)r--;return r<0?t:0===r?t:r+u[e[r]]>t?r:t}(t),i=t;n!==t.length&&(h.uint8array?(i=t.subarray(0,n),this.leftOver=t.subarray(n,t.length)):(i=t.slice(0,n),this.leftOver=t.slice(n,t.length))),this.push({data:s.utf8decode(i),meta:e.meta});},a.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:s.utf8decode(this.leftOver),meta:{}}),this.leftOver=null);},s.Utf8DecodeWorker=a,o.inherits(l,n),l.prototype.processChunk=function(e){this.push({data:s.utf8encode(e.data),meta:e.meta});},s.Utf8EncodeWorker=l;},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(e,t,a){var o=e("./support"),h=e("./base64"),r=e("./nodejsUtils"),u=e("./external");function n(e){return e}function l(e,t){for(var r=0;r<e.length;++r)t[r]=255&e.charCodeAt(r);return t}e("setimmediate"),a.newBlob=function(t,r){a.checkSupport("blob");try{return new Blob([t],{type:r})}catch(e){try{var n=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return n.append(t),n.getBlob(r)}catch(e){throw new Error("Bug : can't construct the Blob.")}}};var i={stringifyByChunk:function(e,t,r){var n=[],i=0,s=e.length;if(s<=r)return String.fromCharCode.apply(null,e);for(;i<s;)"array"===t||"nodebuffer"===t?n.push(String.fromCharCode.apply(null,e.slice(i,Math.min(i+r,s)))):n.push(String.fromCharCode.apply(null,e.subarray(i,Math.min(i+r,s)))),i+=r;return n.join("")},stringifyByChar:function(e){for(var t="",r=0;r<e.length;r++)t+=String.fromCharCode(e[r]);return t},applyCanBeUsed:{uint8array:function(){try{return o.uint8array&&1===String.fromCharCode.apply(null,new Uint8Array(1)).length}catch(e){return !1}}(),nodebuffer:function(){try{return o.nodebuffer&&1===String.fromCharCode.apply(null,r.allocBuffer(1)).length}catch(e){return !1}}()}};function s(e){var t=65536,r=a.getTypeOf(e),n=!0;if("uint8array"===r?n=i.applyCanBeUsed.uint8array:"nodebuffer"===r&&(n=i.applyCanBeUsed.nodebuffer),n)for(;1<t;)try{return i.stringifyByChunk(e,r,t)}catch(e){t=Math.floor(t/2);}return i.stringifyByChar(e)}function f(e,t){for(var r=0;r<e.length;r++)t[r]=e[r];return t}a.applyFromCharCode=s;var c={};c.string={string:n,array:function(e){return l(e,new Array(e.length))},arraybuffer:function(e){return c.string.uint8array(e).buffer},uint8array:function(e){return l(e,new Uint8Array(e.length))},nodebuffer:function(e){return l(e,r.allocBuffer(e.length))}},c.array={string:s,array:n,arraybuffer:function(e){return new Uint8Array(e).buffer},uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return r.newBufferFrom(e)}},c.arraybuffer={string:function(e){return s(new Uint8Array(e))},array:function(e){return f(new Uint8Array(e),new Array(e.byteLength))},arraybuffer:n,uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return r.newBufferFrom(new Uint8Array(e))}},c.uint8array={string:s,array:function(e){return f(e,new Array(e.length))},arraybuffer:function(e){return e.buffer},uint8array:n,nodebuffer:function(e){return r.newBufferFrom(e)}},c.nodebuffer={string:s,array:function(e){return f(e,new Array(e.length))},arraybuffer:function(e){return c.nodebuffer.uint8array(e).buffer},uint8array:function(e){return f(e,new Uint8Array(e.length))},nodebuffer:n},a.transformTo=function(e,t){if(t=t||"",!e)return t;a.checkSupport(e);var r=a.getTypeOf(t);return c[r][e](t)},a.resolve=function(e){for(var t=e.split("/"),r=[],n=0;n<t.length;n++){var i=t[n];"."===i||""===i&&0!==n&&n!==t.length-1||(".."===i?r.pop():r.push(i));}return r.join("/")},a.getTypeOf=function(e){return "string"==typeof e?"string":"[object Array]"===Object.prototype.toString.call(e)?"array":o.nodebuffer&&r.isBuffer(e)?"nodebuffer":o.uint8array&&e instanceof Uint8Array?"uint8array":o.arraybuffer&&e instanceof ArrayBuffer?"arraybuffer":void 0},a.checkSupport=function(e){if(!o[e.toLowerCase()])throw new Error(e+" is not supported by this platform")},a.MAX_VALUE_16BITS=65535,a.MAX_VALUE_32BITS=-1,a.pretty=function(e){var t,r,n="";for(r=0;r<(e||"").length;r++)n+="\\x"+((t=e.charCodeAt(r))<16?"0":"")+t.toString(16).toUpperCase();return n},a.delay=function(e,t,r){setImmediate(function(){e.apply(r||null,t||[]);});},a.inherits=function(e,t){function r(){}r.prototype=t.prototype,e.prototype=new r;},a.extend=function(){var e,t,r={};for(e=0;e<arguments.length;e++)for(t in arguments[e])Object.prototype.hasOwnProperty.call(arguments[e],t)&&void 0===r[t]&&(r[t]=arguments[e][t]);return r},a.prepareContent=function(r,e,n,i,s){return u.Promise.resolve(e).then(function(n){return o.blob&&(n instanceof Blob||-1!==["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(n)))&&"undefined"!=typeof FileReader?new u.Promise(function(t,r){var e=new FileReader;e.onload=function(e){t(e.target.result);},e.onerror=function(e){r(e.target.error);},e.readAsArrayBuffer(n);}):n}).then(function(e){var t=a.getTypeOf(e);return t?("arraybuffer"===t?e=a.transformTo("uint8array",e):"string"===t&&(s?e=h.decode(e):n&&!0!==i&&(e=function(e){return l(e,o.uint8array?new Uint8Array(e.length):new Array(e.length))}(e))),e):u.Promise.reject(new Error("Can't read the data of '"+r+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})};},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(e,t,r){var n=e("./reader/readerFor"),i=e("./utils"),s=e("./signature"),a=e("./zipEntry"),o=e("./support");function h(e){this.files=[],this.loadOptions=e;}h.prototype={checkSignature:function(e){if(!this.reader.readAndCheckSignature(e)){this.reader.index-=4;var t=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+i.pretty(t)+", expected "+i.pretty(e)+")")}},isSignature:function(e,t){var r=this.reader.index;this.reader.setIndex(e);var n=this.reader.readString(4)===t;return this.reader.setIndex(r),n},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var e=this.reader.readData(this.zipCommentLength),t=o.uint8array?"uint8array":"array",r=i.transformTo(t,e);this.zipComment=this.loadOptions.decodeFileName(r);},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var e,t,r,n=this.zip64EndOfCentralSize-44;0<n;)e=this.reader.readInt(2),t=this.reader.readInt(4),r=this.reader.readData(t),this.zip64ExtensibleData[e]={id:e,length:t,value:r};},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var e,t;for(e=0;e<this.files.length;e++)t=this.files[e],this.reader.setIndex(t.localHeaderOffset),this.checkSignature(s.LOCAL_FILE_HEADER),t.readLocalPart(this.reader),t.handleUTF8(),t.processAttributes();},readCentralDir:function(){var e;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);)(e=new a({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(e);if(this.centralDirRecords!==this.files.length&&0!==this.centralDirRecords&&0===this.files.length)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var e=this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);if(e<0)throw !this.isSignature(0,s.LOCAL_FILE_HEADER)?new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html"):new Error("Corrupted zip: can't find end of central directory");this.reader.setIndex(e);var t=e;if(this.checkSignature(s.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===i.MAX_VALUE_16BITS||this.diskWithCentralDirStart===i.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===i.MAX_VALUE_16BITS||this.centralDirRecords===i.MAX_VALUE_16BITS||this.centralDirSize===i.MAX_VALUE_32BITS||this.centralDirOffset===i.MAX_VALUE_32BITS){if(this.zip64=!0,(e=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(e),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,s.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral();}var r=this.centralDirOffset+this.centralDirSize;this.zip64&&(r+=20,r+=12+this.zip64EndOfCentralSize);var n=t-r;if(0<n)this.isSignature(t,s.CENTRAL_FILE_HEADER)||(this.reader.zero=n);else if(n<0)throw new Error("Corrupted zip: missing "+Math.abs(n)+" bytes.")},prepareReader:function(e){this.reader=n(e);},load:function(e){this.prepareReader(e),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles();}},t.exports=h;},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(e,t,r){var n=e("./reader/readerFor"),s=e("./utils"),i=e("./compressedObject"),a=e("./crc32"),o=e("./utf8"),h=e("./compressions"),u=e("./support");function l(e,t){this.options=e,this.loadOptions=t;}l.prototype={isEncrypted:function(){return 1==(1&this.bitFlag)},useUTF8:function(){return 2048==(2048&this.bitFlag)},readLocalPart:function(e){var t,r;if(e.skip(22),this.fileNameLength=e.readInt(2),r=e.readInt(2),this.fileName=e.readData(this.fileNameLength),e.skip(r),-1===this.compressedSize||-1===this.uncompressedSize)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if(null===(t=function(e){for(var t in h)if(Object.prototype.hasOwnProperty.call(h,t)&&h[t].magic===e)return h[t];return null}(this.compressionMethod)))throw new Error("Corrupted zip : compression "+s.pretty(this.compressionMethod)+" unknown (inner file : "+s.transformTo("string",this.fileName)+")");this.decompressed=new i(this.compressedSize,this.uncompressedSize,this.crc32,t,e.readData(this.compressedSize));},readCentralPart:function(e){this.versionMadeBy=e.readInt(2),e.skip(2),this.bitFlag=e.readInt(2),this.compressionMethod=e.readString(2),this.date=e.readDate(),this.crc32=e.readInt(4),this.compressedSize=e.readInt(4),this.uncompressedSize=e.readInt(4);var t=e.readInt(2);if(this.extraFieldsLength=e.readInt(2),this.fileCommentLength=e.readInt(2),this.diskNumberStart=e.readInt(2),this.internalFileAttributes=e.readInt(2),this.externalFileAttributes=e.readInt(4),this.localHeaderOffset=e.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");e.skip(t),this.readExtraFields(e),this.parseZIP64ExtraField(e),this.fileComment=e.readData(this.fileCommentLength);},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var e=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),0==e&&(this.dosPermissions=63&this.externalFileAttributes),3==e&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||"/"!==this.fileNameStr.slice(-1)||(this.dir=!0);},parseZIP64ExtraField:function(){if(this.extraFields[1]){var e=n(this.extraFields[1].value);this.uncompressedSize===s.MAX_VALUE_32BITS&&(this.uncompressedSize=e.readInt(8)),this.compressedSize===s.MAX_VALUE_32BITS&&(this.compressedSize=e.readInt(8)),this.localHeaderOffset===s.MAX_VALUE_32BITS&&(this.localHeaderOffset=e.readInt(8)),this.diskNumberStart===s.MAX_VALUE_32BITS&&(this.diskNumberStart=e.readInt(4));}},readExtraFields:function(e){var t,r,n,i=e.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});e.index+4<i;)t=e.readInt(2),r=e.readInt(2),n=e.readData(r),this.extraFields[t]={id:t,length:r,value:n};e.setIndex(i);},handleUTF8:function(){var e=u.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=o.utf8decode(this.fileName),this.fileCommentStr=o.utf8decode(this.fileComment);else {var t=this.findExtraFieldUnicodePath();if(null!==t)this.fileNameStr=t;else {var r=s.transformTo(e,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(r);}var n=this.findExtraFieldUnicodeComment();if(null!==n)this.fileCommentStr=n;else {var i=s.transformTo(e,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(i);}}},findExtraFieldUnicodePath:function(){var e=this.extraFields[28789];if(e){var t=n(e.value);return 1!==t.readInt(1)?null:a(this.fileName)!==t.readInt(4)?null:o.utf8decode(t.readData(e.length-5))}return null},findExtraFieldUnicodeComment:function(){var e=this.extraFields[25461];if(e){var t=n(e.value);return 1!==t.readInt(1)?null:a(this.fileComment)!==t.readInt(4)?null:o.utf8decode(t.readData(e.length-5))}return null}},t.exports=l;},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(e,t,r){function n(e,t,r){this.name=e,this.dir=r.dir,this.date=r.date,this.comment=r.comment,this.unixPermissions=r.unixPermissions,this.dosPermissions=r.dosPermissions,this._data=t,this._dataBinary=r.binary,this.options={compression:r.compression,compressionOptions:r.compressionOptions};}var s=e("./stream/StreamHelper"),i=e("./stream/DataWorker"),a=e("./utf8"),o=e("./compressedObject"),h=e("./stream/GenericWorker");n.prototype={internalStream:function(e){var t=null,r="string";try{if(!e)throw new Error("No output type specified.");var n="string"===(r=e.toLowerCase())||"text"===r;"binarystring"!==r&&"text"!==r||(r="string"),t=this._decompressWorker();var i=!this._dataBinary;i&&!n&&(t=t.pipe(new a.Utf8EncodeWorker)),!i&&n&&(t=t.pipe(new a.Utf8DecodeWorker));}catch(e){(t=new h("error")).error(e);}return new s(t,r,"")},async:function(e,t){return this.internalStream(e).accumulate(t)},nodeStream:function(e,t){return this.internalStream(e||"nodebuffer").toNodejsStream(t)},_compressWorker:function(e,t){if(this._data instanceof o&&this._data.compression.magic===e.magic)return this._data.getCompressedWorker();var r=this._decompressWorker();return this._dataBinary||(r=r.pipe(new a.Utf8EncodeWorker)),o.createWorkerFrom(r,e,t)},_decompressWorker:function(){return this._data instanceof o?this._data.getContentWorker():this._data instanceof h?this._data:new i(this._data)}};for(var u=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],l=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},f=0;f<u.length;f++)n.prototype[u[f]]=l;t.exports=n;},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(e,l,t){(function(t){var r,n,e=t.MutationObserver||t.WebKitMutationObserver;if(e){var i=0,s=new e(u),a=t.document.createTextNode("");s.observe(a,{characterData:!0}),r=function(){a.data=i=++i%2;};}else if(t.setImmediate||void 0===t.MessageChannel)r="document"in t&&"onreadystatechange"in t.document.createElement("script")?function(){var e=t.document.createElement("script");e.onreadystatechange=function(){u(),e.onreadystatechange=null,e.parentNode.removeChild(e),e=null;},t.document.documentElement.appendChild(e);}:function(){setTimeout(u,0);};else {var o=new t.MessageChannel;o.port1.onmessage=u,r=function(){o.port2.postMessage(0);};}var h=[];function u(){var e,t;n=!0;for(var r=h.length;r;){for(t=h,h=[],e=-1;++e<r;)t[e]();r=h.length;}n=!1;}l.exports=function(e){1!==h.push(e)||n||r();};}).call(this,"undefined"!=typeof commonjsGlobal?commonjsGlobal:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});},{}],37:[function(e,t,r){var i=e("immediate");function u(){}var l={},s=["REJECTED"],a=["FULFILLED"],n=["PENDING"];function o(e){if("function"!=typeof e)throw new TypeError("resolver must be a function");this.state=n,this.queue=[],this.outcome=void 0,e!==u&&d(this,e);}function h(e,t,r){this.promise=e,"function"==typeof t&&(this.onFulfilled=t,this.callFulfilled=this.otherCallFulfilled),"function"==typeof r&&(this.onRejected=r,this.callRejected=this.otherCallRejected);}function f(t,r,n){i(function(){var e;try{e=r(n);}catch(e){return l.reject(t,e)}e===t?l.reject(t,new TypeError("Cannot resolve promise with itself")):l.resolve(t,e);});}function c(e){var t=e&&e.then;if(e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof t)return function(){t.apply(e,arguments);}}function d(t,e){var r=!1;function n(e){r||(r=!0,l.reject(t,e));}function i(e){r||(r=!0,l.resolve(t,e));}var s=p(function(){e(i,n);});"error"===s.status&&n(s.value);}function p(e,t){var r={};try{r.value=e(t),r.status="success";}catch(e){r.status="error",r.value=e;}return r}(t.exports=o).prototype.finally=function(t){if("function"!=typeof t)return this;var r=this.constructor;return this.then(function(e){return r.resolve(t()).then(function(){return e})},function(e){return r.resolve(t()).then(function(){throw e})})},o.prototype.catch=function(e){return this.then(null,e)},o.prototype.then=function(e,t){if("function"!=typeof e&&this.state===a||"function"!=typeof t&&this.state===s)return this;var r=new this.constructor(u);this.state!==n?f(r,this.state===a?e:t,this.outcome):this.queue.push(new h(r,e,t));return r},h.prototype.callFulfilled=function(e){l.resolve(this.promise,e);},h.prototype.otherCallFulfilled=function(e){f(this.promise,this.onFulfilled,e);},h.prototype.callRejected=function(e){l.reject(this.promise,e);},h.prototype.otherCallRejected=function(e){f(this.promise,this.onRejected,e);},l.resolve=function(e,t){var r=p(c,t);if("error"===r.status)return l.reject(e,r.value);var n=r.value;if(n)d(e,n);else {e.state=a,e.outcome=t;for(var i=-1,s=e.queue.length;++i<s;)e.queue[i].callFulfilled(t);}return e},l.reject=function(e,t){e.state=s,e.outcome=t;for(var r=-1,n=e.queue.length;++r<n;)e.queue[r].callRejected(t);return e},o.resolve=function(e){if(e instanceof this)return e;return l.resolve(new this(u),e)},o.reject=function(e){var t=new this(u);return l.reject(t,e)},o.all=function(e){var r=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var n=e.length,i=!1;if(!n)return this.resolve([]);var s=new Array(n),a=0,t=-1,o=new this(u);for(;++t<n;)h(e[t],t);return o;function h(e,t){r.resolve(e).then(function(e){s[t]=e,++a!==n||i||(i=!0,l.resolve(o,s));},function(e){i||(i=!0,l.reject(o,e));});}},o.race=function(e){var t=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var r=e.length,n=!1;if(!r)return this.resolve([]);var i=-1,s=new this(u);for(;++i<r;)a=e[i],t.resolve(a).then(function(e){n||(n=!0,l.resolve(s,e));},function(e){n||(n=!0,l.reject(s,e));});var a;return s};},{immediate:36}],38:[function(e,t,r){var n={};(0, e("./lib/utils/common").assign)(n,e("./lib/deflate"),e("./lib/inflate"),e("./lib/zlib/constants")),t.exports=n;},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(e,t,r){var a=e("./zlib/deflate"),o=e("./utils/common"),h=e("./utils/strings"),i=e("./zlib/messages"),s=e("./zlib/zstream"),u=Object.prototype.toString,l=0,f=-1,c=0,d=8;function p(e){if(!(this instanceof p))return new p(e);this.options=o.assign({level:f,method:d,chunkSize:16384,windowBits:15,memLevel:8,strategy:c,to:""},e||{});var t=this.options;t.raw&&0<t.windowBits?t.windowBits=-t.windowBits:t.gzip&&0<t.windowBits&&t.windowBits<16&&(t.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new s,this.strm.avail_out=0;var r=a.deflateInit2(this.strm,t.level,t.method,t.windowBits,t.memLevel,t.strategy);if(r!==l)throw new Error(i[r]);if(t.header&&a.deflateSetHeader(this.strm,t.header),t.dictionary){var n;if(n="string"==typeof t.dictionary?h.string2buf(t.dictionary):"[object ArrayBuffer]"===u.call(t.dictionary)?new Uint8Array(t.dictionary):t.dictionary,(r=a.deflateSetDictionary(this.strm,n))!==l)throw new Error(i[r]);this._dict_set=!0;}}function n(e,t){var r=new p(t);if(r.push(e,!0),r.err)throw r.msg||i[r.err];return r.result}p.prototype.push=function(e,t){var r,n,i=this.strm,s=this.options.chunkSize;if(this.ended)return !1;n=t===~~t?t:!0===t?4:0,"string"==typeof e?i.input=h.string2buf(e):"[object ArrayBuffer]"===u.call(e)?i.input=new Uint8Array(e):i.input=e,i.next_in=0,i.avail_in=i.input.length;do{if(0===i.avail_out&&(i.output=new o.Buf8(s),i.next_out=0,i.avail_out=s),1!==(r=a.deflate(i,n))&&r!==l)return this.onEnd(r),!(this.ended=!0);0!==i.avail_out&&(0!==i.avail_in||4!==n&&2!==n)||("string"===this.options.to?this.onData(h.buf2binstring(o.shrinkBuf(i.output,i.next_out))):this.onData(o.shrinkBuf(i.output,i.next_out)));}while((0<i.avail_in||0===i.avail_out)&&1!==r);return 4===n?(r=a.deflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===l):2!==n||(this.onEnd(l),!(i.avail_out=0))},p.prototype.onData=function(e){this.chunks.push(e);},p.prototype.onEnd=function(e){e===l&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg;},r.Deflate=p,r.deflate=n,r.deflateRaw=function(e,t){return (t=t||{}).raw=!0,n(e,t)},r.gzip=function(e,t){return (t=t||{}).gzip=!0,n(e,t)};},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(e,t,r){var c=e("./zlib/inflate"),d=e("./utils/common"),p=e("./utils/strings"),m=e("./zlib/constants"),n=e("./zlib/messages"),i=e("./zlib/zstream"),s=e("./zlib/gzheader"),_=Object.prototype.toString;function a(e){if(!(this instanceof a))return new a(e);this.options=d.assign({chunkSize:16384,windowBits:0,to:""},e||{});var t=this.options;t.raw&&0<=t.windowBits&&t.windowBits<16&&(t.windowBits=-t.windowBits,0===t.windowBits&&(t.windowBits=-15)),!(0<=t.windowBits&&t.windowBits<16)||e&&e.windowBits||(t.windowBits+=32),15<t.windowBits&&t.windowBits<48&&0==(15&t.windowBits)&&(t.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new i,this.strm.avail_out=0;var r=c.inflateInit2(this.strm,t.windowBits);if(r!==m.Z_OK)throw new Error(n[r]);this.header=new s,c.inflateGetHeader(this.strm,this.header);}function o(e,t){var r=new a(t);if(r.push(e,!0),r.err)throw r.msg||n[r.err];return r.result}a.prototype.push=function(e,t){var r,n,i,s,a,o,h=this.strm,u=this.options.chunkSize,l=this.options.dictionary,f=!1;if(this.ended)return !1;n=t===~~t?t:!0===t?m.Z_FINISH:m.Z_NO_FLUSH,"string"==typeof e?h.input=p.binstring2buf(e):"[object ArrayBuffer]"===_.call(e)?h.input=new Uint8Array(e):h.input=e,h.next_in=0,h.avail_in=h.input.length;do{if(0===h.avail_out&&(h.output=new d.Buf8(u),h.next_out=0,h.avail_out=u),(r=c.inflate(h,m.Z_NO_FLUSH))===m.Z_NEED_DICT&&l&&(o="string"==typeof l?p.string2buf(l):"[object ArrayBuffer]"===_.call(l)?new Uint8Array(l):l,r=c.inflateSetDictionary(this.strm,o)),r===m.Z_BUF_ERROR&&!0===f&&(r=m.Z_OK,f=!1),r!==m.Z_STREAM_END&&r!==m.Z_OK)return this.onEnd(r),!(this.ended=!0);h.next_out&&(0!==h.avail_out&&r!==m.Z_STREAM_END&&(0!==h.avail_in||n!==m.Z_FINISH&&n!==m.Z_SYNC_FLUSH)||("string"===this.options.to?(i=p.utf8border(h.output,h.next_out),s=h.next_out-i,a=p.buf2string(h.output,i),h.next_out=s,h.avail_out=u-s,s&&d.arraySet(h.output,h.output,i,s,0),this.onData(a)):this.onData(d.shrinkBuf(h.output,h.next_out)))),0===h.avail_in&&0===h.avail_out&&(f=!0);}while((0<h.avail_in||0===h.avail_out)&&r!==m.Z_STREAM_END);return r===m.Z_STREAM_END&&(n=m.Z_FINISH),n===m.Z_FINISH?(r=c.inflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===m.Z_OK):n!==m.Z_SYNC_FLUSH||(this.onEnd(m.Z_OK),!(h.avail_out=0))},a.prototype.onData=function(e){this.chunks.push(e);},a.prototype.onEnd=function(e){e===m.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=d.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg;},r.Inflate=a,r.inflate=o,r.inflateRaw=function(e,t){return (t=t||{}).raw=!0,o(e,t)},r.ungzip=o;},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(e,t,r){var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;r.assign=function(e){for(var t=Array.prototype.slice.call(arguments,1);t.length;){var r=t.shift();if(r){if("object"!=typeof r)throw new TypeError(r+"must be non-object");for(var n in r)r.hasOwnProperty(n)&&(e[n]=r[n]);}}return e},r.shrinkBuf=function(e,t){return e.length===t?e:e.subarray?e.subarray(0,t):(e.length=t,e)};var i={arraySet:function(e,t,r,n,i){if(t.subarray&&e.subarray)e.set(t.subarray(r,r+n),i);else for(var s=0;s<n;s++)e[i+s]=t[r+s];},flattenChunks:function(e){var t,r,n,i,s,a;for(t=n=0,r=e.length;t<r;t++)n+=e[t].length;for(a=new Uint8Array(n),t=i=0,r=e.length;t<r;t++)s=e[t],a.set(s,i),i+=s.length;return a}},s={arraySet:function(e,t,r,n,i){for(var s=0;s<n;s++)e[i+s]=t[r+s];},flattenChunks:function(e){return [].concat.apply([],e)}};r.setTyped=function(e){e?(r.Buf8=Uint8Array,r.Buf16=Uint16Array,r.Buf32=Int32Array,r.assign(r,i)):(r.Buf8=Array,r.Buf16=Array,r.Buf32=Array,r.assign(r,s));},r.setTyped(n);},{}],42:[function(e,t,r){var h=e("./common"),i=!0,s=!0;try{String.fromCharCode.apply(null,[0]);}catch(e){i=!1;}try{String.fromCharCode.apply(null,new Uint8Array(1));}catch(e){s=!1;}for(var u=new h.Buf8(256),n=0;n<256;n++)u[n]=252<=n?6:248<=n?5:240<=n?4:224<=n?3:192<=n?2:1;function l(e,t){if(t<65537&&(e.subarray&&s||!e.subarray&&i))return String.fromCharCode.apply(null,h.shrinkBuf(e,t));for(var r="",n=0;n<t;n++)r+=String.fromCharCode(e[n]);return r}u[254]=u[254]=1,r.string2buf=function(e){var t,r,n,i,s,a=e.length,o=0;for(i=0;i<a;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),o+=r<128?1:r<2048?2:r<65536?3:4;for(t=new h.Buf8(o),i=s=0;s<o;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),r<128?t[s++]=r:(r<2048?t[s++]=192|r>>>6:(r<65536?t[s++]=224|r>>>12:(t[s++]=240|r>>>18,t[s++]=128|r>>>12&63),t[s++]=128|r>>>6&63),t[s++]=128|63&r);return t},r.buf2binstring=function(e){return l(e,e.length)},r.binstring2buf=function(e){for(var t=new h.Buf8(e.length),r=0,n=t.length;r<n;r++)t[r]=e.charCodeAt(r);return t},r.buf2string=function(e,t){var r,n,i,s,a=t||e.length,o=new Array(2*a);for(r=n=0;r<a;)if((i=e[r++])<128)o[n++]=i;else if(4<(s=u[i]))o[n++]=65533,r+=s-1;else {for(i&=2===s?31:3===s?15:7;1<s&&r<a;)i=i<<6|63&e[r++],s--;1<s?o[n++]=65533:i<65536?o[n++]=i:(i-=65536,o[n++]=55296|i>>10&1023,o[n++]=56320|1023&i);}return l(o,n)},r.utf8border=function(e,t){var r;for((t=t||e.length)>e.length&&(t=e.length),r=t-1;0<=r&&128==(192&e[r]);)r--;return r<0?t:0===r?t:r+u[e[r]]>t?r:t};},{"./common":41}],43:[function(e,t,r){t.exports=function(e,t,r,n){for(var i=65535&e|0,s=e>>>16&65535|0,a=0;0!==r;){for(r-=a=2e3<r?2e3:r;s=s+(i=i+t[n++]|0)|0,--a;);i%=65521,s%=65521;}return i|s<<16|0};},{}],44:[function(e,t,r){t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8};},{}],45:[function(e,t,r){var o=function(){for(var e,t=[],r=0;r<256;r++){e=r;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[r]=e;}return t}();t.exports=function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t[a])];return -1^e};},{}],46:[function(e,t,r){var h,c=e("../utils/common"),u=e("./trees"),d=e("./adler32"),p=e("./crc32"),n=e("./messages"),l=0,f=4,m=0,_=-2,g=-1,b=4,i=2,v=8,y=9,s=286,a=30,o=19,w=2*s+1,k=15,x=3,S=258,z=S+x+1,C=42,E=113,A=1,I=2,O=3,B=4;function R(e,t){return e.msg=n[t],t}function T(e){return (e<<1)-(4<e?9:0)}function D(e){for(var t=e.length;0<=--t;)e[t]=0;}function F(e){var t=e.state,r=t.pending;r>e.avail_out&&(r=e.avail_out),0!==r&&(c.arraySet(e.output,t.pending_buf,t.pending_out,r,e.next_out),e.next_out+=r,t.pending_out+=r,e.total_out+=r,e.avail_out-=r,t.pending-=r,0===t.pending&&(t.pending_out=0));}function N(e,t){u._tr_flush_block(e,0<=e.block_start?e.block_start:-1,e.strstart-e.block_start,t),e.block_start=e.strstart,F(e.strm);}function U(e,t){e.pending_buf[e.pending++]=t;}function P(e,t){e.pending_buf[e.pending++]=t>>>8&255,e.pending_buf[e.pending++]=255&t;}function L(e,t){var r,n,i=e.max_chain_length,s=e.strstart,a=e.prev_length,o=e.nice_match,h=e.strstart>e.w_size-z?e.strstart-(e.w_size-z):0,u=e.window,l=e.w_mask,f=e.prev,c=e.strstart+S,d=u[s+a-1],p=u[s+a];e.prev_length>=e.good_match&&(i>>=2),o>e.lookahead&&(o=e.lookahead);do{if(u[(r=t)+a]===p&&u[r+a-1]===d&&u[r]===u[s]&&u[++r]===u[s+1]){s+=2,r++;do{}while(u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&s<c);if(n=S-(c-s),s=c-S,a<n){if(e.match_start=t,o<=(a=n))break;d=u[s+a-1],p=u[s+a];}}}while((t=f[t&l])>h&&0!=--i);return a<=e.lookahead?a:e.lookahead}function j(e){var t,r,n,i,s,a,o,h,u,l,f=e.w_size;do{if(i=e.window_size-e.lookahead-e.strstart,e.strstart>=f+(f-z)){for(c.arraySet(e.window,e.window,f,f,0),e.match_start-=f,e.strstart-=f,e.block_start-=f,t=r=e.hash_size;n=e.head[--t],e.head[t]=f<=n?n-f:0,--r;);for(t=r=f;n=e.prev[--t],e.prev[t]=f<=n?n-f:0,--r;);i+=f;}if(0===e.strm.avail_in)break;if(a=e.strm,o=e.window,h=e.strstart+e.lookahead,u=i,l=void 0,l=a.avail_in,u<l&&(l=u),r=0===l?0:(a.avail_in-=l,c.arraySet(o,a.input,a.next_in,l,h),1===a.state.wrap?a.adler=d(a.adler,o,l,h):2===a.state.wrap&&(a.adler=p(a.adler,o,l,h)),a.next_in+=l,a.total_in+=l,l),e.lookahead+=r,e.lookahead+e.insert>=x)for(s=e.strstart-e.insert,e.ins_h=e.window[s],e.ins_h=(e.ins_h<<e.hash_shift^e.window[s+1])&e.hash_mask;e.insert&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[s+x-1])&e.hash_mask,e.prev[s&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=s,s++,e.insert--,!(e.lookahead+e.insert<x)););}while(e.lookahead<z&&0!==e.strm.avail_in)}function Z(e,t){for(var r,n;;){if(e.lookahead<z){if(j(e),e.lookahead<z&&t===l)return A;if(0===e.lookahead)break}if(r=0,e.lookahead>=x&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),0!==r&&e.strstart-r<=e.w_size-z&&(e.match_length=L(e,r)),e.match_length>=x)if(n=u._tr_tally(e,e.strstart-e.match_start,e.match_length-x),e.lookahead-=e.match_length,e.match_length<=e.max_lazy_match&&e.lookahead>=x){for(e.match_length--;e.strstart++,e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart,0!=--e.match_length;);e.strstart++;}else e.strstart+=e.match_length,e.match_length=0,e.ins_h=e.window[e.strstart],e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+1])&e.hash_mask;else n=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++;if(n&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=e.strstart<x-1?e.strstart:x-1,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}function W(e,t){for(var r,n,i;;){if(e.lookahead<z){if(j(e),e.lookahead<z&&t===l)return A;if(0===e.lookahead)break}if(r=0,e.lookahead>=x&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),e.prev_length=e.match_length,e.prev_match=e.match_start,e.match_length=x-1,0!==r&&e.prev_length<e.max_lazy_match&&e.strstart-r<=e.w_size-z&&(e.match_length=L(e,r),e.match_length<=5&&(1===e.strategy||e.match_length===x&&4096<e.strstart-e.match_start)&&(e.match_length=x-1)),e.prev_length>=x&&e.match_length<=e.prev_length){for(i=e.strstart+e.lookahead-x,n=u._tr_tally(e,e.strstart-1-e.prev_match,e.prev_length-x),e.lookahead-=e.prev_length-1,e.prev_length-=2;++e.strstart<=i&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),0!=--e.prev_length;);if(e.match_available=0,e.match_length=x-1,e.strstart++,n&&(N(e,!1),0===e.strm.avail_out))return A}else if(e.match_available){if((n=u._tr_tally(e,0,e.window[e.strstart-1]))&&N(e,!1),e.strstart++,e.lookahead--,0===e.strm.avail_out)return A}else e.match_available=1,e.strstart++,e.lookahead--;}return e.match_available&&(n=u._tr_tally(e,0,e.window[e.strstart-1]),e.match_available=0),e.insert=e.strstart<x-1?e.strstart:x-1,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}function M(e,t,r,n,i){this.good_length=e,this.max_lazy=t,this.nice_length=r,this.max_chain=n,this.func=i;}function H(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=v,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new c.Buf16(2*w),this.dyn_dtree=new c.Buf16(2*(2*a+1)),this.bl_tree=new c.Buf16(2*(2*o+1)),D(this.dyn_ltree),D(this.dyn_dtree),D(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new c.Buf16(k+1),this.heap=new c.Buf16(2*s+1),D(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new c.Buf16(2*s+1),D(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0;}function G(e){var t;return e&&e.state?(e.total_in=e.total_out=0,e.data_type=i,(t=e.state).pending=0,t.pending_out=0,t.wrap<0&&(t.wrap=-t.wrap),t.status=t.wrap?C:E,e.adler=2===t.wrap?0:1,t.last_flush=l,u._tr_init(t),m):R(e,_)}function K(e){var t=G(e);return t===m&&function(e){e.window_size=2*e.w_size,D(e.head),e.max_lazy_match=h[e.level].max_lazy,e.good_match=h[e.level].good_length,e.nice_match=h[e.level].nice_length,e.max_chain_length=h[e.level].max_chain,e.strstart=0,e.block_start=0,e.lookahead=0,e.insert=0,e.match_length=e.prev_length=x-1,e.match_available=0,e.ins_h=0;}(e.state),t}function Y(e,t,r,n,i,s){if(!e)return _;var a=1;if(t===g&&(t=6),n<0?(a=0,n=-n):15<n&&(a=2,n-=16),i<1||y<i||r!==v||n<8||15<n||t<0||9<t||s<0||b<s)return R(e,_);8===n&&(n=9);var o=new H;return (e.state=o).strm=e,o.wrap=a,o.gzhead=null,o.w_bits=n,o.w_size=1<<o.w_bits,o.w_mask=o.w_size-1,o.hash_bits=i+7,o.hash_size=1<<o.hash_bits,o.hash_mask=o.hash_size-1,o.hash_shift=~~((o.hash_bits+x-1)/x),o.window=new c.Buf8(2*o.w_size),o.head=new c.Buf16(o.hash_size),o.prev=new c.Buf16(o.w_size),o.lit_bufsize=1<<i+6,o.pending_buf_size=4*o.lit_bufsize,o.pending_buf=new c.Buf8(o.pending_buf_size),o.d_buf=1*o.lit_bufsize,o.l_buf=3*o.lit_bufsize,o.level=t,o.strategy=s,o.method=r,K(e)}h=[new M(0,0,0,0,function(e,t){var r=65535;for(r>e.pending_buf_size-5&&(r=e.pending_buf_size-5);;){if(e.lookahead<=1){if(j(e),0===e.lookahead&&t===l)return A;if(0===e.lookahead)break}e.strstart+=e.lookahead,e.lookahead=0;var n=e.block_start+r;if((0===e.strstart||e.strstart>=n)&&(e.lookahead=e.strstart-n,e.strstart=n,N(e,!1),0===e.strm.avail_out))return A;if(e.strstart-e.block_start>=e.w_size-z&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):(e.strstart>e.block_start&&(N(e,!1),e.strm.avail_out),A)}),new M(4,4,8,4,Z),new M(4,5,16,8,Z),new M(4,6,32,32,Z),new M(4,4,16,16,W),new M(8,16,32,32,W),new M(8,16,128,128,W),new M(8,32,128,256,W),new M(32,128,258,1024,W),new M(32,258,258,4096,W)],r.deflateInit=function(e,t){return Y(e,t,v,15,8,0)},r.deflateInit2=Y,r.deflateReset=K,r.deflateResetKeep=G,r.deflateSetHeader=function(e,t){return e&&e.state?2!==e.state.wrap?_:(e.state.gzhead=t,m):_},r.deflate=function(e,t){var r,n,i,s;if(!e||!e.state||5<t||t<0)return e?R(e,_):_;if(n=e.state,!e.output||!e.input&&0!==e.avail_in||666===n.status&&t!==f)return R(e,0===e.avail_out?-5:_);if(n.strm=e,r=n.last_flush,n.last_flush=t,n.status===C)if(2===n.wrap)e.adler=0,U(n,31),U(n,139),U(n,8),n.gzhead?(U(n,(n.gzhead.text?1:0)+(n.gzhead.hcrc?2:0)+(n.gzhead.extra?4:0)+(n.gzhead.name?8:0)+(n.gzhead.comment?16:0)),U(n,255&n.gzhead.time),U(n,n.gzhead.time>>8&255),U(n,n.gzhead.time>>16&255),U(n,n.gzhead.time>>24&255),U(n,9===n.level?2:2<=n.strategy||n.level<2?4:0),U(n,255&n.gzhead.os),n.gzhead.extra&&n.gzhead.extra.length&&(U(n,255&n.gzhead.extra.length),U(n,n.gzhead.extra.length>>8&255)),n.gzhead.hcrc&&(e.adler=p(e.adler,n.pending_buf,n.pending,0)),n.gzindex=0,n.status=69):(U(n,0),U(n,0),U(n,0),U(n,0),U(n,0),U(n,9===n.level?2:2<=n.strategy||n.level<2?4:0),U(n,3),n.status=E);else {var a=v+(n.w_bits-8<<4)<<8;a|=(2<=n.strategy||n.level<2?0:n.level<6?1:6===n.level?2:3)<<6,0!==n.strstart&&(a|=32),a+=31-a%31,n.status=E,P(n,a),0!==n.strstart&&(P(n,e.adler>>>16),P(n,65535&e.adler)),e.adler=1;}if(69===n.status)if(n.gzhead.extra){for(i=n.pending;n.gzindex<(65535&n.gzhead.extra.length)&&(n.pending!==n.pending_buf_size||(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending!==n.pending_buf_size));)U(n,255&n.gzhead.extra[n.gzindex]),n.gzindex++;n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),n.gzindex===n.gzhead.extra.length&&(n.gzindex=0,n.status=73);}else n.status=73;if(73===n.status)if(n.gzhead.name){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending===n.pending_buf_size)){s=1;break}s=n.gzindex<n.gzhead.name.length?255&n.gzhead.name.charCodeAt(n.gzindex++):0,U(n,s);}while(0!==s);n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),0===s&&(n.gzindex=0,n.status=91);}else n.status=91;if(91===n.status)if(n.gzhead.comment){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending===n.pending_buf_size)){s=1;break}s=n.gzindex<n.gzhead.comment.length?255&n.gzhead.comment.charCodeAt(n.gzindex++):0,U(n,s);}while(0!==s);n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),0===s&&(n.status=103);}else n.status=103;if(103===n.status&&(n.gzhead.hcrc?(n.pending+2>n.pending_buf_size&&F(e),n.pending+2<=n.pending_buf_size&&(U(n,255&e.adler),U(n,e.adler>>8&255),e.adler=0,n.status=E)):n.status=E),0!==n.pending){if(F(e),0===e.avail_out)return n.last_flush=-1,m}else if(0===e.avail_in&&T(t)<=T(r)&&t!==f)return R(e,-5);if(666===n.status&&0!==e.avail_in)return R(e,-5);if(0!==e.avail_in||0!==n.lookahead||t!==l&&666!==n.status){var o=2===n.strategy?function(e,t){for(var r;;){if(0===e.lookahead&&(j(e),0===e.lookahead)){if(t===l)return A;break}if(e.match_length=0,r=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++,r&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}(n,t):3===n.strategy?function(e,t){for(var r,n,i,s,a=e.window;;){if(e.lookahead<=S){if(j(e),e.lookahead<=S&&t===l)return A;if(0===e.lookahead)break}if(e.match_length=0,e.lookahead>=x&&0<e.strstart&&(n=a[i=e.strstart-1])===a[++i]&&n===a[++i]&&n===a[++i]){s=e.strstart+S;do{}while(n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&i<s);e.match_length=S-(s-i),e.match_length>e.lookahead&&(e.match_length=e.lookahead);}if(e.match_length>=x?(r=u._tr_tally(e,1,e.match_length-x),e.lookahead-=e.match_length,e.strstart+=e.match_length,e.match_length=0):(r=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++),r&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}(n,t):h[n.level].func(n,t);if(o!==O&&o!==B||(n.status=666),o===A||o===O)return 0===e.avail_out&&(n.last_flush=-1),m;if(o===I&&(1===t?u._tr_align(n):5!==t&&(u._tr_stored_block(n,0,0,!1),3===t&&(D(n.head),0===n.lookahead&&(n.strstart=0,n.block_start=0,n.insert=0))),F(e),0===e.avail_out))return n.last_flush=-1,m}return t!==f?m:n.wrap<=0?1:(2===n.wrap?(U(n,255&e.adler),U(n,e.adler>>8&255),U(n,e.adler>>16&255),U(n,e.adler>>24&255),U(n,255&e.total_in),U(n,e.total_in>>8&255),U(n,e.total_in>>16&255),U(n,e.total_in>>24&255)):(P(n,e.adler>>>16),P(n,65535&e.adler)),F(e),0<n.wrap&&(n.wrap=-n.wrap),0!==n.pending?m:1)},r.deflateEnd=function(e){var t;return e&&e.state?(t=e.state.status)!==C&&69!==t&&73!==t&&91!==t&&103!==t&&t!==E&&666!==t?R(e,_):(e.state=null,t===E?R(e,-3):m):_},r.deflateSetDictionary=function(e,t){var r,n,i,s,a,o,h,u,l=t.length;if(!e||!e.state)return _;if(2===(s=(r=e.state).wrap)||1===s&&r.status!==C||r.lookahead)return _;for(1===s&&(e.adler=d(e.adler,t,l,0)),r.wrap=0,l>=r.w_size&&(0===s&&(D(r.head),r.strstart=0,r.block_start=0,r.insert=0),u=new c.Buf8(r.w_size),c.arraySet(u,t,l-r.w_size,r.w_size,0),t=u,l=r.w_size),a=e.avail_in,o=e.next_in,h=e.input,e.avail_in=l,e.next_in=0,e.input=t,j(r);r.lookahead>=x;){for(n=r.strstart,i=r.lookahead-(x-1);r.ins_h=(r.ins_h<<r.hash_shift^r.window[n+x-1])&r.hash_mask,r.prev[n&r.w_mask]=r.head[r.ins_h],r.head[r.ins_h]=n,n++,--i;);r.strstart=n,r.lookahead=x-1,j(r);}return r.strstart+=r.lookahead,r.block_start=r.strstart,r.insert=r.lookahead,r.lookahead=0,r.match_length=r.prev_length=x-1,r.match_available=0,e.next_in=o,e.input=h,e.avail_in=a,r.wrap=s,m},r.deflateInfo="pako deflate (from Nodeca project)";},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(e,t,r){t.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1;};},{}],48:[function(e,t,r){t.exports=function(e,t){var r,n,i,s,a,o,h,u,l,f,c,d,p,m,_,g,b,v,y,w,k,x,S,z,C;r=e.state,n=e.next_in,z=e.input,i=n+(e.avail_in-5),s=e.next_out,C=e.output,a=s-(t-e.avail_out),o=s+(e.avail_out-257),h=r.dmax,u=r.wsize,l=r.whave,f=r.wnext,c=r.window,d=r.hold,p=r.bits,m=r.lencode,_=r.distcode,g=(1<<r.lenbits)-1,b=(1<<r.distbits)-1;e:do{p<15&&(d+=z[n++]<<p,p+=8,d+=z[n++]<<p,p+=8),v=m[d&g];t:for(;;){if(d>>>=y=v>>>24,p-=y,0===(y=v>>>16&255))C[s++]=65535&v;else {if(!(16&y)){if(0==(64&y)){v=m[(65535&v)+(d&(1<<y)-1)];continue t}if(32&y){r.mode=12;break e}e.msg="invalid literal/length code",r.mode=30;break e}w=65535&v,(y&=15)&&(p<y&&(d+=z[n++]<<p,p+=8),w+=d&(1<<y)-1,d>>>=y,p-=y),p<15&&(d+=z[n++]<<p,p+=8,d+=z[n++]<<p,p+=8),v=_[d&b];r:for(;;){if(d>>>=y=v>>>24,p-=y,!(16&(y=v>>>16&255))){if(0==(64&y)){v=_[(65535&v)+(d&(1<<y)-1)];continue r}e.msg="invalid distance code",r.mode=30;break e}if(k=65535&v,p<(y&=15)&&(d+=z[n++]<<p,(p+=8)<y&&(d+=z[n++]<<p,p+=8)),h<(k+=d&(1<<y)-1)){e.msg="invalid distance too far back",r.mode=30;break e}if(d>>>=y,p-=y,(y=s-a)<k){if(l<(y=k-y)&&r.sane){e.msg="invalid distance too far back",r.mode=30;break e}if(S=c,(x=0)===f){if(x+=u-y,y<w){for(w-=y;C[s++]=c[x++],--y;);x=s-k,S=C;}}else if(f<y){if(x+=u+f-y,(y-=f)<w){for(w-=y;C[s++]=c[x++],--y;);if(x=0,f<w){for(w-=y=f;C[s++]=c[x++],--y;);x=s-k,S=C;}}}else if(x+=f-y,y<w){for(w-=y;C[s++]=c[x++],--y;);x=s-k,S=C;}for(;2<w;)C[s++]=S[x++],C[s++]=S[x++],C[s++]=S[x++],w-=3;w&&(C[s++]=S[x++],1<w&&(C[s++]=S[x++]));}else {for(x=s-k;C[s++]=C[x++],C[s++]=C[x++],C[s++]=C[x++],2<(w-=3););w&&(C[s++]=C[x++],1<w&&(C[s++]=C[x++]));}break}}break}}while(n<i&&s<o);n-=w=p>>3,d&=(1<<(p-=w<<3))-1,e.next_in=n,e.next_out=s,e.avail_in=n<i?i-n+5:5-(n-i),e.avail_out=s<o?o-s+257:257-(s-o),r.hold=d,r.bits=p;};},{}],49:[function(e,t,r){var I=e("../utils/common"),O=e("./adler32"),B=e("./crc32"),R=e("./inffast"),T=e("./inftrees"),D=1,F=2,N=0,U=-2,P=1,n=852,i=592;function L(e){return (e>>>24&255)+(e>>>8&65280)+((65280&e)<<8)+((255&e)<<24)}function s(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new I.Buf16(320),this.work=new I.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0;}function a(e){var t;return e&&e.state?(t=e.state,e.total_in=e.total_out=t.total=0,e.msg="",t.wrap&&(e.adler=1&t.wrap),t.mode=P,t.last=0,t.havedict=0,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new I.Buf32(n),t.distcode=t.distdyn=new I.Buf32(i),t.sane=1,t.back=-1,N):U}function o(e){var t;return e&&e.state?((t=e.state).wsize=0,t.whave=0,t.wnext=0,a(e)):U}function h(e,t){var r,n;return e&&e.state?(n=e.state,t<0?(r=0,t=-t):(r=1+(t>>4),t<48&&(t&=15)),t&&(t<8||15<t)?U:(null!==n.window&&n.wbits!==t&&(n.window=null),n.wrap=r,n.wbits=t,o(e))):U}function u(e,t){var r,n;return e?(n=new s,(e.state=n).window=null,(r=h(e,t))!==N&&(e.state=null),r):U}var l,f,c=!0;function j(e){if(c){var t;for(l=new I.Buf32(512),f=new I.Buf32(32),t=0;t<144;)e.lens[t++]=8;for(;t<256;)e.lens[t++]=9;for(;t<280;)e.lens[t++]=7;for(;t<288;)e.lens[t++]=8;for(T(D,e.lens,0,288,l,0,e.work,{bits:9}),t=0;t<32;)e.lens[t++]=5;T(F,e.lens,0,32,f,0,e.work,{bits:5}),c=!1;}e.lencode=l,e.lenbits=9,e.distcode=f,e.distbits=5;}function Z(e,t,r,n){var i,s=e.state;return null===s.window&&(s.wsize=1<<s.wbits,s.wnext=0,s.whave=0,s.window=new I.Buf8(s.wsize)),n>=s.wsize?(I.arraySet(s.window,t,r-s.wsize,s.wsize,0),s.wnext=0,s.whave=s.wsize):(n<(i=s.wsize-s.wnext)&&(i=n),I.arraySet(s.window,t,r-n,i,s.wnext),(n-=i)?(I.arraySet(s.window,t,r-n,n,0),s.wnext=n,s.whave=s.wsize):(s.wnext+=i,s.wnext===s.wsize&&(s.wnext=0),s.whave<s.wsize&&(s.whave+=i))),0}r.inflateReset=o,r.inflateReset2=h,r.inflateResetKeep=a,r.inflateInit=function(e){return u(e,15)},r.inflateInit2=u,r.inflate=function(e,t){var r,n,i,s,a,o,h,u,l,f,c,d,p,m,_,g,b,v,y,w,k,x,S,z,C=0,E=new I.Buf8(4),A=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!e||!e.state||!e.output||!e.input&&0!==e.avail_in)return U;12===(r=e.state).mode&&(r.mode=13),a=e.next_out,i=e.output,h=e.avail_out,s=e.next_in,n=e.input,o=e.avail_in,u=r.hold,l=r.bits,f=o,c=h,x=N;e:for(;;)switch(r.mode){case P:if(0===r.wrap){r.mode=13;break}for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}if(2&r.wrap&&35615===u){E[r.check=0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0),l=u=0,r.mode=2;break}if(r.flags=0,r.head&&(r.head.done=!1),!(1&r.wrap)||(((255&u)<<8)+(u>>8))%31){e.msg="incorrect header check",r.mode=30;break}if(8!=(15&u)){e.msg="unknown compression method",r.mode=30;break}if(l-=4,k=8+(15&(u>>>=4)),0===r.wbits)r.wbits=k;else if(k>r.wbits){e.msg="invalid window size",r.mode=30;break}r.dmax=1<<k,e.adler=r.check=1,r.mode=512&u?10:12,l=u=0;break;case 2:for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}if(r.flags=u,8!=(255&r.flags)){e.msg="unknown compression method",r.mode=30;break}if(57344&r.flags){e.msg="unknown header flags set",r.mode=30;break}r.head&&(r.head.text=u>>8&1),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=3;case 3:for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}r.head&&(r.head.time=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,E[2]=u>>>16&255,E[3]=u>>>24&255,r.check=B(r.check,E,4,0)),l=u=0,r.mode=4;case 4:for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}r.head&&(r.head.xflags=255&u,r.head.os=u>>8),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=5;case 5:if(1024&r.flags){for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}r.length=u,r.head&&(r.head.extra_len=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0;}else r.head&&(r.head.extra=null);r.mode=6;case 6:if(1024&r.flags&&(o<(d=r.length)&&(d=o),d&&(r.head&&(k=r.head.extra_len-r.length,r.head.extra||(r.head.extra=new Array(r.head.extra_len)),I.arraySet(r.head.extra,n,s,d,k)),512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,r.length-=d),r.length))break e;r.length=0,r.mode=7;case 7:if(2048&r.flags){if(0===o)break e;for(d=0;k=n[s+d++],r.head&&k&&r.length<65536&&(r.head.name+=String.fromCharCode(k)),k&&d<o;);if(512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,k)break e}else r.head&&(r.head.name=null);r.length=0,r.mode=8;case 8:if(4096&r.flags){if(0===o)break e;for(d=0;k=n[s+d++],r.head&&k&&r.length<65536&&(r.head.comment+=String.fromCharCode(k)),k&&d<o;);if(512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,k)break e}else r.head&&(r.head.comment=null);r.mode=9;case 9:if(512&r.flags){for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}if(u!==(65535&r.check)){e.msg="header crc mismatch",r.mode=30;break}l=u=0;}r.head&&(r.head.hcrc=r.flags>>9&1,r.head.done=!0),e.adler=r.check=0,r.mode=12;break;case 10:for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}e.adler=r.check=L(u),l=u=0,r.mode=11;case 11:if(0===r.havedict)return e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,2;e.adler=r.check=1,r.mode=12;case 12:if(5===t||6===t)break e;case 13:if(r.last){u>>>=7&l,l-=7&l,r.mode=27;break}for(;l<3;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}switch(r.last=1&u,l-=1,3&(u>>>=1)){case 0:r.mode=14;break;case 1:if(j(r),r.mode=20,6!==t)break;u>>>=2,l-=2;break e;case 2:r.mode=17;break;case 3:e.msg="invalid block type",r.mode=30;}u>>>=2,l-=2;break;case 14:for(u>>>=7&l,l-=7&l;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}if((65535&u)!=(u>>>16^65535)){e.msg="invalid stored block lengths",r.mode=30;break}if(r.length=65535&u,l=u=0,r.mode=15,6===t)break e;case 15:r.mode=16;case 16:if(d=r.length){if(o<d&&(d=o),h<d&&(d=h),0===d)break e;I.arraySet(i,n,s,d,a),o-=d,s+=d,h-=d,a+=d,r.length-=d;break}r.mode=12;break;case 17:for(;l<14;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}if(r.nlen=257+(31&u),u>>>=5,l-=5,r.ndist=1+(31&u),u>>>=5,l-=5,r.ncode=4+(15&u),u>>>=4,l-=4,286<r.nlen||30<r.ndist){e.msg="too many length or distance symbols",r.mode=30;break}r.have=0,r.mode=18;case 18:for(;r.have<r.ncode;){for(;l<3;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}r.lens[A[r.have++]]=7&u,u>>>=3,l-=3;}for(;r.have<19;)r.lens[A[r.have++]]=0;if(r.lencode=r.lendyn,r.lenbits=7,S={bits:r.lenbits},x=T(0,r.lens,0,19,r.lencode,0,r.work,S),r.lenbits=S.bits,x){e.msg="invalid code lengths set",r.mode=30;break}r.have=0,r.mode=19;case 19:for(;r.have<r.nlen+r.ndist;){for(;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}if(b<16)u>>>=_,l-=_,r.lens[r.have++]=b;else {if(16===b){for(z=_+2;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}if(u>>>=_,l-=_,0===r.have){e.msg="invalid bit length repeat",r.mode=30;break}k=r.lens[r.have-1],d=3+(3&u),u>>>=2,l-=2;}else if(17===b){for(z=_+3;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}l-=_,k=0,d=3+(7&(u>>>=_)),u>>>=3,l-=3;}else {for(z=_+7;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}l-=_,k=0,d=11+(127&(u>>>=_)),u>>>=7,l-=7;}if(r.have+d>r.nlen+r.ndist){e.msg="invalid bit length repeat",r.mode=30;break}for(;d--;)r.lens[r.have++]=k;}}if(30===r.mode)break;if(0===r.lens[256]){e.msg="invalid code -- missing end-of-block",r.mode=30;break}if(r.lenbits=9,S={bits:r.lenbits},x=T(D,r.lens,0,r.nlen,r.lencode,0,r.work,S),r.lenbits=S.bits,x){e.msg="invalid literal/lengths set",r.mode=30;break}if(r.distbits=6,r.distcode=r.distdyn,S={bits:r.distbits},x=T(F,r.lens,r.nlen,r.ndist,r.distcode,0,r.work,S),r.distbits=S.bits,x){e.msg="invalid distances set",r.mode=30;break}if(r.mode=20,6===t)break e;case 20:r.mode=21;case 21:if(6<=o&&258<=h){e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,R(e,c),a=e.next_out,i=e.output,h=e.avail_out,s=e.next_in,n=e.input,o=e.avail_in,u=r.hold,l=r.bits,12===r.mode&&(r.back=-1);break}for(r.back=0;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}if(g&&0==(240&g)){for(v=_,y=g,w=b;g=(C=r.lencode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}u>>>=v,l-=v,r.back+=v;}if(u>>>=_,l-=_,r.back+=_,r.length=b,0===g){r.mode=26;break}if(32&g){r.back=-1,r.mode=12;break}if(64&g){e.msg="invalid literal/length code",r.mode=30;break}r.extra=15&g,r.mode=22;case 22:if(r.extra){for(z=r.extra;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}r.length+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra;}r.was=r.length,r.mode=23;case 23:for(;g=(C=r.distcode[u&(1<<r.distbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}if(0==(240&g)){for(v=_,y=g,w=b;g=(C=r.distcode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}u>>>=v,l-=v,r.back+=v;}if(u>>>=_,l-=_,r.back+=_,64&g){e.msg="invalid distance code",r.mode=30;break}r.offset=b,r.extra=15&g,r.mode=24;case 24:if(r.extra){for(z=r.extra;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}r.offset+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra;}if(r.offset>r.dmax){e.msg="invalid distance too far back",r.mode=30;break}r.mode=25;case 25:if(0===h)break e;if(d=c-h,r.offset>d){if((d=r.offset-d)>r.whave&&r.sane){e.msg="invalid distance too far back",r.mode=30;break}p=d>r.wnext?(d-=r.wnext,r.wsize-d):r.wnext-d,d>r.length&&(d=r.length),m=r.window;}else m=i,p=a-r.offset,d=r.length;for(h<d&&(d=h),h-=d,r.length-=d;i[a++]=m[p++],--d;);0===r.length&&(r.mode=21);break;case 26:if(0===h)break e;i[a++]=r.length,h--,r.mode=21;break;case 27:if(r.wrap){for(;l<32;){if(0===o)break e;o--,u|=n[s++]<<l,l+=8;}if(c-=h,e.total_out+=c,r.total+=c,c&&(e.adler=r.check=r.flags?B(r.check,i,c,a-c):O(r.check,i,c,a-c)),c=h,(r.flags?u:L(u))!==r.check){e.msg="incorrect data check",r.mode=30;break}l=u=0;}r.mode=28;case 28:if(r.wrap&&r.flags){for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8;}if(u!==(4294967295&r.total)){e.msg="incorrect length check",r.mode=30;break}l=u=0;}r.mode=29;case 29:x=1;break e;case 30:x=-3;break e;case 31:return -4;case 32:default:return U}return e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,(r.wsize||c!==e.avail_out&&r.mode<30&&(r.mode<27||4!==t))&&Z(e,e.output,e.next_out,c-e.avail_out)?(r.mode=31,-4):(f-=e.avail_in,c-=e.avail_out,e.total_in+=f,e.total_out+=c,r.total+=c,r.wrap&&c&&(e.adler=r.check=r.flags?B(r.check,i,c,e.next_out-c):O(r.check,i,c,e.next_out-c)),e.data_type=r.bits+(r.last?64:0)+(12===r.mode?128:0)+(20===r.mode||15===r.mode?256:0),(0==f&&0===c||4===t)&&x===N&&(x=-5),x)},r.inflateEnd=function(e){if(!e||!e.state)return U;var t=e.state;return t.window&&(t.window=null),e.state=null,N},r.inflateGetHeader=function(e,t){var r;return e&&e.state?0==(2&(r=e.state).wrap)?U:((r.head=t).done=!1,N):U},r.inflateSetDictionary=function(e,t){var r,n=t.length;return e&&e.state?0!==(r=e.state).wrap&&11!==r.mode?U:11===r.mode&&O(1,t,n,0)!==r.check?-3:Z(e,t,n,n)?(r.mode=31,-4):(r.havedict=1,N):U},r.inflateInfo="pako inflate (from Nodeca project)";},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(e,t,r){var D=e("../utils/common"),F=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],N=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],U=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],P=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(e,t,r,n,i,s,a,o){var h,u,l,f,c,d,p,m,_,g=o.bits,b=0,v=0,y=0,w=0,k=0,x=0,S=0,z=0,C=0,E=0,A=null,I=0,O=new D.Buf16(16),B=new D.Buf16(16),R=null,T=0;for(b=0;b<=15;b++)O[b]=0;for(v=0;v<n;v++)O[t[r+v]]++;for(k=g,w=15;1<=w&&0===O[w];w--);if(w<k&&(k=w),0===w)return i[s++]=20971520,i[s++]=20971520,o.bits=1,0;for(y=1;y<w&&0===O[y];y++);for(k<y&&(k=y),b=z=1;b<=15;b++)if(z<<=1,(z-=O[b])<0)return -1;if(0<z&&(0===e||1!==w))return -1;for(B[1]=0,b=1;b<15;b++)B[b+1]=B[b]+O[b];for(v=0;v<n;v++)0!==t[r+v]&&(a[B[t[r+v]]++]=v);if(d=0===e?(A=R=a,19):1===e?(A=F,I-=257,R=N,T-=257,256):(A=U,R=P,-1),b=y,c=s,S=v=E=0,l=-1,f=(C=1<<(x=k))-1,1===e&&852<C||2===e&&592<C)return 1;for(;;){for(p=b-S,_=a[v]<d?(m=0,a[v]):a[v]>d?(m=R[T+a[v]],A[I+a[v]]):(m=96,0),h=1<<b-S,y=u=1<<x;i[c+(E>>S)+(u-=h)]=p<<24|m<<16|_|0,0!==u;);for(h=1<<b-1;E&h;)h>>=1;if(0!==h?(E&=h-1,E+=h):E=0,v++,0==--O[b]){if(b===w)break;b=t[r+a[v]];}if(k<b&&(E&f)!==l){for(0===S&&(S=k),c+=y,z=1<<(x=b-S);x+S<w&&!((z-=O[x+S])<=0);)x++,z<<=1;if(C+=1<<x,1===e&&852<C||2===e&&592<C)return 1;i[l=E&f]=k<<24|x<<16|c-s|0;}}return 0!==E&&(i[c+E]=b-S<<24|64<<16|0),o.bits=k,0};},{"../utils/common":41}],51:[function(e,t,r){t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"};},{}],52:[function(e,t,r){var i=e("../utils/common"),o=0,h=1;function n(e){for(var t=e.length;0<=--t;)e[t]=0;}var s=0,a=29,u=256,l=u+1+a,f=30,c=19,_=2*l+1,g=15,d=16,p=7,m=256,b=16,v=17,y=18,w=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],k=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],x=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],S=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],z=new Array(2*(l+2));n(z);var C=new Array(2*f);n(C);var E=new Array(512);n(E);var A=new Array(256);n(A);var I=new Array(a);n(I);var O,B,R,T=new Array(f);function D(e,t,r,n,i){this.static_tree=e,this.extra_bits=t,this.extra_base=r,this.elems=n,this.max_length=i,this.has_stree=e&&e.length;}function F(e,t){this.dyn_tree=e,this.max_code=0,this.stat_desc=t;}function N(e){return e<256?E[e]:E[256+(e>>>7)]}function U(e,t){e.pending_buf[e.pending++]=255&t,e.pending_buf[e.pending++]=t>>>8&255;}function P(e,t,r){e.bi_valid>d-r?(e.bi_buf|=t<<e.bi_valid&65535,U(e,e.bi_buf),e.bi_buf=t>>d-e.bi_valid,e.bi_valid+=r-d):(e.bi_buf|=t<<e.bi_valid&65535,e.bi_valid+=r);}function L(e,t,r){P(e,r[2*t],r[2*t+1]);}function j(e,t){for(var r=0;r|=1&e,e>>>=1,r<<=1,0<--t;);return r>>>1}function Z(e,t,r){var n,i,s=new Array(g+1),a=0;for(n=1;n<=g;n++)s[n]=a=a+r[n-1]<<1;for(i=0;i<=t;i++){var o=e[2*i+1];0!==o&&(e[2*i]=j(s[o]++,o));}}function W(e){var t;for(t=0;t<l;t++)e.dyn_ltree[2*t]=0;for(t=0;t<f;t++)e.dyn_dtree[2*t]=0;for(t=0;t<c;t++)e.bl_tree[2*t]=0;e.dyn_ltree[2*m]=1,e.opt_len=e.static_len=0,e.last_lit=e.matches=0;}function M(e){8<e.bi_valid?U(e,e.bi_buf):0<e.bi_valid&&(e.pending_buf[e.pending++]=e.bi_buf),e.bi_buf=0,e.bi_valid=0;}function H(e,t,r,n){var i=2*t,s=2*r;return e[i]<e[s]||e[i]===e[s]&&n[t]<=n[r]}function G(e,t,r){for(var n=e.heap[r],i=r<<1;i<=e.heap_len&&(i<e.heap_len&&H(t,e.heap[i+1],e.heap[i],e.depth)&&i++,!H(t,n,e.heap[i],e.depth));)e.heap[r]=e.heap[i],r=i,i<<=1;e.heap[r]=n;}function K(e,t,r){var n,i,s,a,o=0;if(0!==e.last_lit)for(;n=e.pending_buf[e.d_buf+2*o]<<8|e.pending_buf[e.d_buf+2*o+1],i=e.pending_buf[e.l_buf+o],o++,0===n?L(e,i,t):(L(e,(s=A[i])+u+1,t),0!==(a=w[s])&&P(e,i-=I[s],a),L(e,s=N(--n),r),0!==(a=k[s])&&P(e,n-=T[s],a)),o<e.last_lit;);L(e,m,t);}function Y(e,t){var r,n,i,s=t.dyn_tree,a=t.stat_desc.static_tree,o=t.stat_desc.has_stree,h=t.stat_desc.elems,u=-1;for(e.heap_len=0,e.heap_max=_,r=0;r<h;r++)0!==s[2*r]?(e.heap[++e.heap_len]=u=r,e.depth[r]=0):s[2*r+1]=0;for(;e.heap_len<2;)s[2*(i=e.heap[++e.heap_len]=u<2?++u:0)]=1,e.depth[i]=0,e.opt_len--,o&&(e.static_len-=a[2*i+1]);for(t.max_code=u,r=e.heap_len>>1;1<=r;r--)G(e,s,r);for(i=h;r=e.heap[1],e.heap[1]=e.heap[e.heap_len--],G(e,s,1),n=e.heap[1],e.heap[--e.heap_max]=r,e.heap[--e.heap_max]=n,s[2*i]=s[2*r]+s[2*n],e.depth[i]=(e.depth[r]>=e.depth[n]?e.depth[r]:e.depth[n])+1,s[2*r+1]=s[2*n+1]=i,e.heap[1]=i++,G(e,s,1),2<=e.heap_len;);e.heap[--e.heap_max]=e.heap[1],function(e,t){var r,n,i,s,a,o,h=t.dyn_tree,u=t.max_code,l=t.stat_desc.static_tree,f=t.stat_desc.has_stree,c=t.stat_desc.extra_bits,d=t.stat_desc.extra_base,p=t.stat_desc.max_length,m=0;for(s=0;s<=g;s++)e.bl_count[s]=0;for(h[2*e.heap[e.heap_max]+1]=0,r=e.heap_max+1;r<_;r++)p<(s=h[2*h[2*(n=e.heap[r])+1]+1]+1)&&(s=p,m++),h[2*n+1]=s,u<n||(e.bl_count[s]++,a=0,d<=n&&(a=c[n-d]),o=h[2*n],e.opt_len+=o*(s+a),f&&(e.static_len+=o*(l[2*n+1]+a)));if(0!==m){do{for(s=p-1;0===e.bl_count[s];)s--;e.bl_count[s]--,e.bl_count[s+1]+=2,e.bl_count[p]--,m-=2;}while(0<m);for(s=p;0!==s;s--)for(n=e.bl_count[s];0!==n;)u<(i=e.heap[--r])||(h[2*i+1]!==s&&(e.opt_len+=(s-h[2*i+1])*h[2*i],h[2*i+1]=s),n--);}}(e,t),Z(s,u,e.bl_count);}function X(e,t,r){var n,i,s=-1,a=t[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),t[2*(r+1)+1]=65535,n=0;n<=r;n++)i=a,a=t[2*(n+1)+1],++o<h&&i===a||(o<u?e.bl_tree[2*i]+=o:0!==i?(i!==s&&e.bl_tree[2*i]++,e.bl_tree[2*b]++):o<=10?e.bl_tree[2*v]++:e.bl_tree[2*y]++,s=i,u=(o=0)===a?(h=138,3):i===a?(h=6,3):(h=7,4));}function V(e,t,r){var n,i,s=-1,a=t[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),n=0;n<=r;n++)if(i=a,a=t[2*(n+1)+1],!(++o<h&&i===a)){if(o<u)for(;L(e,i,e.bl_tree),0!=--o;);else 0!==i?(i!==s&&(L(e,i,e.bl_tree),o--),L(e,b,e.bl_tree),P(e,o-3,2)):o<=10?(L(e,v,e.bl_tree),P(e,o-3,3)):(L(e,y,e.bl_tree),P(e,o-11,7));s=i,u=(o=0)===a?(h=138,3):i===a?(h=6,3):(h=7,4);}}n(T);var q=!1;function J(e,t,r,n){P(e,(s<<1)+(n?1:0),3),function(e,t,r,n){M(e),n&&(U(e,r),U(e,~r)),i.arraySet(e.pending_buf,e.window,t,r,e.pending),e.pending+=r;}(e,t,r,!0);}r._tr_init=function(e){q||(function(){var e,t,r,n,i,s=new Array(g+1);for(n=r=0;n<a-1;n++)for(I[n]=r,e=0;e<1<<w[n];e++)A[r++]=n;for(A[r-1]=n,n=i=0;n<16;n++)for(T[n]=i,e=0;e<1<<k[n];e++)E[i++]=n;for(i>>=7;n<f;n++)for(T[n]=i<<7,e=0;e<1<<k[n]-7;e++)E[256+i++]=n;for(t=0;t<=g;t++)s[t]=0;for(e=0;e<=143;)z[2*e+1]=8,e++,s[8]++;for(;e<=255;)z[2*e+1]=9,e++,s[9]++;for(;e<=279;)z[2*e+1]=7,e++,s[7]++;for(;e<=287;)z[2*e+1]=8,e++,s[8]++;for(Z(z,l+1,s),e=0;e<f;e++)C[2*e+1]=5,C[2*e]=j(e,5);O=new D(z,w,u+1,l,g),B=new D(C,k,0,f,g),R=new D(new Array(0),x,0,c,p);}(),q=!0),e.l_desc=new F(e.dyn_ltree,O),e.d_desc=new F(e.dyn_dtree,B),e.bl_desc=new F(e.bl_tree,R),e.bi_buf=0,e.bi_valid=0,W(e);},r._tr_stored_block=J,r._tr_flush_block=function(e,t,r,n){var i,s,a=0;0<e.level?(2===e.strm.data_type&&(e.strm.data_type=function(e){var t,r=4093624447;for(t=0;t<=31;t++,r>>>=1)if(1&r&&0!==e.dyn_ltree[2*t])return o;if(0!==e.dyn_ltree[18]||0!==e.dyn_ltree[20]||0!==e.dyn_ltree[26])return h;for(t=32;t<u;t++)if(0!==e.dyn_ltree[2*t])return h;return o}(e)),Y(e,e.l_desc),Y(e,e.d_desc),a=function(e){var t;for(X(e,e.dyn_ltree,e.l_desc.max_code),X(e,e.dyn_dtree,e.d_desc.max_code),Y(e,e.bl_desc),t=c-1;3<=t&&0===e.bl_tree[2*S[t]+1];t--);return e.opt_len+=3*(t+1)+5+5+4,t}(e),i=e.opt_len+3+7>>>3,(s=e.static_len+3+7>>>3)<=i&&(i=s)):i=s=r+5,r+4<=i&&-1!==t?J(e,t,r,n):4===e.strategy||s===i?(P(e,2+(n?1:0),3),K(e,z,C)):(P(e,4+(n?1:0),3),function(e,t,r,n){var i;for(P(e,t-257,5),P(e,r-1,5),P(e,n-4,4),i=0;i<n;i++)P(e,e.bl_tree[2*S[i]+1],3);V(e,e.dyn_ltree,t-1),V(e,e.dyn_dtree,r-1);}(e,e.l_desc.max_code+1,e.d_desc.max_code+1,a+1),K(e,e.dyn_ltree,e.dyn_dtree)),W(e),n&&M(e);},r._tr_tally=function(e,t,r){return e.pending_buf[e.d_buf+2*e.last_lit]=t>>>8&255,e.pending_buf[e.d_buf+2*e.last_lit+1]=255&t,e.pending_buf[e.l_buf+e.last_lit]=255&r,e.last_lit++,0===t?e.dyn_ltree[2*r]++:(e.matches++,t--,e.dyn_ltree[2*(A[r]+u+1)]++,e.dyn_dtree[2*N(t)]++),e.last_lit===e.lit_bufsize-1},r._tr_align=function(e){P(e,2,3),L(e,m,z),function(e){16===e.bi_valid?(U(e,e.bi_buf),e.bi_buf=0,e.bi_valid=0):8<=e.bi_valid&&(e.pending_buf[e.pending++]=255&e.bi_buf,e.bi_buf>>=8,e.bi_valid-=8);}(e);};},{"../utils/common":41}],53:[function(e,t,r){t.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0;};},{}],54:[function(e,t,r){(function(e){!function(r,n){if(!r.setImmediate){var i,s,t,a,o=1,h={},u=!1,l=r.document,e=Object.getPrototypeOf&&Object.getPrototypeOf(r);e=e&&e.setTimeout?e:r,i="[object process]"==={}.toString.call(r.process)?function(e){process.nextTick(function(){c(e);});}:function(){if(r.postMessage&&!r.importScripts){var e=!0,t=r.onmessage;return r.onmessage=function(){e=!1;},r.postMessage("","*"),r.onmessage=t,e}}()?(a="setImmediate$"+Math.random()+"$",r.addEventListener?r.addEventListener("message",d,!1):r.attachEvent("onmessage",d),function(e){r.postMessage(a+e,"*");}):r.MessageChannel?((t=new MessageChannel).port1.onmessage=function(e){c(e.data);},function(e){t.port2.postMessage(e);}):l&&"onreadystatechange"in l.createElement("script")?(s=l.documentElement,function(e){var t=l.createElement("script");t.onreadystatechange=function(){c(e),t.onreadystatechange=null,s.removeChild(t),t=null;},s.appendChild(t);}):function(e){setTimeout(c,0,e);},e.setImmediate=function(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),r=0;r<t.length;r++)t[r]=arguments[r+1];var n={callback:e,args:t};return h[o]=n,i(o),o++},e.clearImmediate=f;}function f(e){delete h[e];}function c(e){if(u)setTimeout(c,0,e);else {var t=h[e];if(t){u=!0;try{!function(e){var t=e.callback,r=e.args;switch(r.length){case 0:t();break;case 1:t(r[0]);break;case 2:t(r[0],r[1]);break;case 3:t(r[0],r[1],r[2]);break;default:t.apply(n,r);}}(t);}finally{f(e),u=!1;}}}}function d(e){e.source===r&&"string"==typeof e.data&&0===e.data.indexOf(a)&&c(+e.data.slice(a.length));}}("undefined"==typeof self?void 0===e?this:e:self);}).call(this,"undefined"!=typeof commonjsGlobal?commonjsGlobal:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});},{}]},{},[10])(10)});
} (jszip_min));

var JSZip = jszip_minExports;

// ==ClosureCompiler==
// @output_file_name default.js
// @compilation_level SIMPLE_OPTIMIZATIONS
// ==/ClosureCompiler==
// module.exports = {
//     parse: parse,
//     simplify: simplify,
//     simplifyLostLess: simplifyLostLess,
//     filter: filter,
//     stringify: stringify,
//     toContentString: toContentString,
//     getElementById: getElementById,
//     getElementsByClassName: getElementsByClassName,
//     transformStream: transformStream,
// };

/**
 * @author: Tobias Nickel
 * @created: 06.04.2015
 * I needed a small xmlparser chat can be used in a worker.
 */

/**
 * @typedef tNode 
 * @property {string} tagName 
 * @property {object} attributes
 * @property {(tNode|string)[]} children 
 **/

/**
 * @typedef TParseOptions
 * @property {number} [pos]
 * @property {string[]} [noChildNodes]
 * @property {boolean} [setPos]
 * @property {boolean} [keepComments] 
 * @property {boolean} [keepWhitespace]
 * @property {boolean} [simplify]
 * @property {(a: tNode, b: tNode) => boolean} [filter]
 */

/**
 * parseXML / html into a DOM Object. with no validation and some failur tolerance
 * @param {string} S your XML to parse
 * @param {TParseOptions} [options]  all other options:
 * @return {(tNode | string)[]}
 */
function parse$1(S, options) {
    "txml";
    options = options || {};

    var pos = options.pos || 0;
    var keepComments = !!options.keepComments;
    var keepWhitespace = !!options.keepWhitespace;

    var openBracket = "<";
    var openBracketCC = "<".charCodeAt(0);
    var closeBracket = ">";
    var closeBracketCC = ">".charCodeAt(0);
    var minusCC = "-".charCodeAt(0);
    var slashCC = "/".charCodeAt(0);
    var exclamationCC = '!'.charCodeAt(0);
    var singleQuoteCC = "'".charCodeAt(0);
    var doubleQuoteCC = '"'.charCodeAt(0);
    var openCornerBracketCC = '['.charCodeAt(0);
    var closeCornerBracketCC = ']'.charCodeAt(0);


    /**
     * parsing a list of entries
     */
    function parseChildren(tagName) {
        var children = [];
        while (S[pos]) {
            if (S.charCodeAt(pos) == openBracketCC) {
                if (S.charCodeAt(pos + 1) === slashCC) {
                    var closeStart = pos + 2;
                    pos = S.indexOf(closeBracket, pos);

                    var closeTag = S.substring(closeStart, pos);
                    if (closeTag.indexOf(tagName) == -1) {
                        var parsedText = S.substring(0, pos).split('\n');
                        throw new Error(
                            'Unexpected close tag\nLine: ' + (parsedText.length - 1) +
                            '\nColumn: ' + (parsedText[parsedText.length - 1].length + 1) +
                            '\nChar: ' + S[pos]
                        );
                    }

                    if (pos + 1) pos += 1;

                    return children;
                } else if (S.charCodeAt(pos + 1) === exclamationCC) {
                    if (S.charCodeAt(pos + 2) == minusCC) {
                        //comment support
                        const startCommentPos = pos;
                        while (pos !== -1 && !(S.charCodeAt(pos) === closeBracketCC && S.charCodeAt(pos - 1) == minusCC && S.charCodeAt(pos - 2) == minusCC && pos != -1)) {
                            pos = S.indexOf(closeBracket, pos + 1);
                        }
                        if (pos === -1) {
                            pos = S.length;
                        }
                        if (keepComments) {
                            children.push(S.substring(startCommentPos, pos + 1));
                        }
                    } else if (
                        S.charCodeAt(pos + 2) === openCornerBracketCC &&
                        S.charCodeAt(pos + 8) === openCornerBracketCC &&
                        S.substr(pos + 3, 5).toLowerCase() === 'cdata'
                    ) {
                        // cdata
                        var cdataEndIndex = S.indexOf(']]>', pos);
                        if (cdataEndIndex == -1) {
                            children.push(S.substr(pos + 9));
                            pos = S.length;
                        } else {
                            children.push(S.substring(pos + 9, cdataEndIndex));
                            pos = cdataEndIndex + 3;
                        }
                        continue;
                    } else {
                        // doctypesupport
                        const startDoctype = pos + 1;
                        pos += 2;
                        var encapsuled = false;
                        while ((S.charCodeAt(pos) !== closeBracketCC || encapsuled === true) && S[pos]) {
                            if (S.charCodeAt(pos) === openCornerBracketCC) {
                                encapsuled = true;
                            } else if (encapsuled === true && S.charCodeAt(pos) === closeCornerBracketCC) {
                                encapsuled = false;
                            }
                            pos++;
                        }
                        children.push(S.substring(startDoctype, pos));
                    }
                    pos++;
                    continue;
                }
                var node = parseNode();
                children.push(node);
                if (node.tagName[0] === '?') {
                    children.push(...node.children);
                    node.children = [];
                }
            } else {
                var text = parseText();
                if (keepWhitespace) {
                    if (text.length > 0) {
                        children.push(text);
                    }
                } else {
                    var trimmed = text.trim();
                    if (trimmed.length > 0) {
                        children.push(trimmed);
                    }
                }
                pos++;
            }
        }
        return children;
    }

    /**
     *    returns the text outside of texts until the first '<'
     */
    function parseText() {
        var start = pos;
        pos = S.indexOf(openBracket, pos) - 1;
        if (pos === -2)
            pos = S.length;
        return S.slice(start, pos + 1);
    }
    /**
     *    returns text until the first nonAlphabetic letter
     */
    var nameSpacer = '\r\n\t>/= ';

    function parseName() {
        var start = pos;
        while (nameSpacer.indexOf(S[pos]) === -1 && S[pos]) {
            pos++;
        }
        return S.slice(start, pos);
    }
    /**
     *    is parsing a node, including tagName, Attributes and its children,
     * to parse children it uses the parseChildren again, that makes the parsing recursive
     */
    var NoChildNodes = options.noChildNodes || ['img', 'br', 'input', 'meta', 'link', 'hr'];

    function parseNode() {
        pos++;
        const tagName = parseName();
        const attributes = {};
        let children = [];

        // parsing attributes
        while (S.charCodeAt(pos) !== closeBracketCC && S[pos]) {
            var c = S.charCodeAt(pos);
            if ((c > 64 && c < 91) || (c > 96 && c < 123)) {
                //if('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(S[pos])!==-1 ){
                var name = parseName();
                // search beginning of the string
                var code = S.charCodeAt(pos);
                while (code && code !== singleQuoteCC && code !== doubleQuoteCC && !((code > 64 && code < 91) || (code > 96 && code < 123)) && code !== closeBracketCC) {
                    pos++;
                    code = S.charCodeAt(pos);
                }
                if (code === singleQuoteCC || code === doubleQuoteCC) {
                    var value = parseString();
                    if (pos === -1) {
                        return {
                            tagName,
                            attributes,
                            children,
                        };
                    }
                } else {
                    value = null;
                    pos--;
                }
                attributes[name] = value;
            }
            pos++;
        }
        // optional parsing of children
        if (S.charCodeAt(pos - 1) !== slashCC) {
            if (tagName == "script") {
                var start = pos + 1;
                pos = S.indexOf('</script>', pos);
                children = [S.slice(start, pos)];
                pos += 9;
            } else if (tagName == "style") {
                var start = pos + 1;
                pos = S.indexOf('</style>', pos);
                children = [S.slice(start, pos)];
                pos += 8;
            } else if (NoChildNodes.indexOf(tagName) === -1) {
                pos++;
                children = parseChildren(tagName);
            } else {
                pos++;
            }
        } else {
            pos++;
        }
        return {
            tagName,
            attributes,
            children,
        };
    }

    /**
     *    is parsing a string, that starts with a char and with the same usually  ' or "
     */

    function parseString() {
        var startChar = S[pos];
        var startpos = pos + 1;
        pos = S.indexOf(startChar, startpos);
        return S.slice(startpos, pos);
    }

    /**
     *
     */
    function findElements() {
        var r = new RegExp('\\s' + options.attrName + '\\s*=[\'"]' + options.attrValue + '[\'"]').exec(S);
        if (r) {
            return r.index;
        } else {
            return -1;
        }
    }

    var out = null;
    if (options.attrValue !== undefined) {
        options.attrName = options.attrName || 'id';
        var out = [];

        while ((pos = findElements()) !== -1) {
            pos = S.lastIndexOf('<', pos);
            if (pos !== -1) {
                out.push(parseNode());
            }
            S = S.substr(pos);
            pos = 0;
        }
    } else if (options.parseNode) {
        out = parseNode();
    } else {
        out = parseChildren('');
    }

    if (options.filter) {
        out = filter(out, options.filter);
    }

    if (options.simplify) {
        return simplify(Array.isArray(out) ? out : [out]);
    }

    if (options.setPos) {
        out.pos = pos;
    }

    return out;
}

/**
 * transform the DomObject to an object that is like the object of PHP`s simple_xmp_load_*() methods.
 * this format helps you to write that is more likely to keep your program working, even if there a small changes in the XML schema.
 * be aware, that it is not possible to reproduce the original xml from a simplified version, because the order of elements is not saved.
 * therefore your program will be more flexible and easier to read.
 *
 * @param {tNode[]} children the childrenList
 */
function simplify(children) {
    var out = {};
    if (!children.length) {
        return '';
    }

    if (children.length === 1 && typeof children[0] == 'string') {
        return children[0];
    }
    // map each object
    children.forEach(function(child) {
        if (typeof child !== 'object') {
            return;
        }
        if (!out[child.tagName])
            out[child.tagName] = [];
        var kids = simplify(child.children);
        out[child.tagName].push(kids);
        if (Object.keys(child.attributes).length && typeof kids !== 'string') {
            kids._attributes = child.attributes;
        }
    });

    for (var i in out) {
        if (out[i].length == 1) {
            out[i] = out[i][0];
        }
    }

    return out;
}
/**
 * behaves the same way as Array.filter, if the filter method return true, the element is in the resultList
 * @params children{Array} the children of a node
 * @param f{function} the filter method
 */
function filter(children, f, dept = 0, path = '') {
    var out = [];
    children.forEach(function(child, i) {
        if (typeof(child) === 'object' && f(child, i, dept, path)) out.push(child);
        if (child.children) {
            var kids = filter(child.children, f, dept + 1, (path ? path + '.' : '') + i + '.' + child.tagName);
            out = out.concat(kids);
        }
    });
    return out;
}

let cust_attr_order = 0;

function simplifyLostLess(children, parentAttributes = {}) {
  const out = {};
  if (!children.length) return out

  if (children.length === 1 && typeof children[0] === 'string') {
    return Object.keys(parentAttributes).length ? {
      attrs: { order: cust_attr_order++, ...parentAttributes },
      value: children[0],
    } : children[0]
  }
  for (const child of children) {
    if (typeof child !== 'object') return
    if (child.tagName === '?xml') continue

    if (!out[child.tagName]) out[child.tagName] = [];

    const kids = simplifyLostLess(child.children || [], child.attributes);
    
    if (typeof kids === 'object') {
      if (!kids.attrs) kids.attrs = { order: cust_attr_order++ };
      else kids.attrs.order = cust_attr_order++;
    }
    if (Object.keys(child.attributes || {}).length) {
      kids.attrs = { ...kids.attrs, ...child.attributes };
    }
    out[child.tagName].push(kids);
  }
  for (const child in out) {
    if (out[child].length === 1) out[child] = out[child][0];
  }

  return out
}

async function readXmlFile(zip, filename) {
  try {
    const data = await zip.file(filename).async('string');
    return simplifyLostLess(parse$1(data))
  }
  catch {
    return null
  }
}

// This file is autogenerated. It's used to publish ESM to npm.
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

// https://github.com/bgrins/TinyColor
// Brian Grinstead, MIT License

var trimLeft = /^\s+/;
var trimRight = /\s+$/;
function tinycolor(color, opts) {
  color = color ? color : "";
  opts = opts || {};

  // If input is already a tinycolor, return itself
  if (color instanceof tinycolor) {
    return color;
  }
  // If we are called as a function, call using new instead
  if (!(this instanceof tinycolor)) {
    return new tinycolor(color, opts);
  }
  var rgb = inputToRGB(color);
  this._originalInput = color, this._r = rgb.r, this._g = rgb.g, this._b = rgb.b, this._a = rgb.a, this._roundA = Math.round(100 * this._a) / 100, this._format = opts.format || rgb.format;
  this._gradientType = opts.gradientType;

  // Don't let the range of [0,255] come back in [0,1].
  // Potentially lose a little bit of precision here, but will fix issues where
  // .5 gets interpreted as half of the total, instead of half of 1
  // If it was supposed to be 128, this was already taken care of by `inputToRgb`
  if (this._r < 1) this._r = Math.round(this._r);
  if (this._g < 1) this._g = Math.round(this._g);
  if (this._b < 1) this._b = Math.round(this._b);
  this._ok = rgb.ok;
}
tinycolor.prototype = {
  isDark: function isDark() {
    return this.getBrightness() < 128;
  },
  isLight: function isLight() {
    return !this.isDark();
  },
  isValid: function isValid() {
    return this._ok;
  },
  getOriginalInput: function getOriginalInput() {
    return this._originalInput;
  },
  getFormat: function getFormat() {
    return this._format;
  },
  getAlpha: function getAlpha() {
    return this._a;
  },
  getBrightness: function getBrightness() {
    //http://www.w3.org/TR/AERT#color-contrast
    var rgb = this.toRgb();
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  },
  getLuminance: function getLuminance() {
    //http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
    var rgb = this.toRgb();
    var RsRGB, GsRGB, BsRGB, R, G, B;
    RsRGB = rgb.r / 255;
    GsRGB = rgb.g / 255;
    BsRGB = rgb.b / 255;
    if (RsRGB <= 0.03928) R = RsRGB / 12.92;else R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
    if (GsRGB <= 0.03928) G = GsRGB / 12.92;else G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
    if (BsRGB <= 0.03928) B = BsRGB / 12.92;else B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  },
  setAlpha: function setAlpha(value) {
    this._a = boundAlpha(value);
    this._roundA = Math.round(100 * this._a) / 100;
    return this;
  },
  toHsv: function toHsv() {
    var hsv = rgbToHsv(this._r, this._g, this._b);
    return {
      h: hsv.h * 360,
      s: hsv.s,
      v: hsv.v,
      a: this._a
    };
  },
  toHsvString: function toHsvString() {
    var hsv = rgbToHsv(this._r, this._g, this._b);
    var h = Math.round(hsv.h * 360),
      s = Math.round(hsv.s * 100),
      v = Math.round(hsv.v * 100);
    return this._a == 1 ? "hsv(" + h + ", " + s + "%, " + v + "%)" : "hsva(" + h + ", " + s + "%, " + v + "%, " + this._roundA + ")";
  },
  toHsl: function toHsl() {
    var hsl = rgbToHsl(this._r, this._g, this._b);
    return {
      h: hsl.h * 360,
      s: hsl.s,
      l: hsl.l,
      a: this._a
    };
  },
  toHslString: function toHslString() {
    var hsl = rgbToHsl(this._r, this._g, this._b);
    var h = Math.round(hsl.h * 360),
      s = Math.round(hsl.s * 100),
      l = Math.round(hsl.l * 100);
    return this._a == 1 ? "hsl(" + h + ", " + s + "%, " + l + "%)" : "hsla(" + h + ", " + s + "%, " + l + "%, " + this._roundA + ")";
  },
  toHex: function toHex(allow3Char) {
    return rgbToHex(this._r, this._g, this._b, allow3Char);
  },
  toHexString: function toHexString(allow3Char) {
    return "#" + this.toHex(allow3Char);
  },
  toHex8: function toHex8(allow4Char) {
    return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
  },
  toHex8String: function toHex8String(allow4Char) {
    return "#" + this.toHex8(allow4Char);
  },
  toRgb: function toRgb() {
    return {
      r: Math.round(this._r),
      g: Math.round(this._g),
      b: Math.round(this._b),
      a: this._a
    };
  },
  toRgbString: function toRgbString() {
    return this._a == 1 ? "rgb(" + Math.round(this._r) + ", " + Math.round(this._g) + ", " + Math.round(this._b) + ")" : "rgba(" + Math.round(this._r) + ", " + Math.round(this._g) + ", " + Math.round(this._b) + ", " + this._roundA + ")";
  },
  toPercentageRgb: function toPercentageRgb() {
    return {
      r: Math.round(bound01(this._r, 255) * 100) + "%",
      g: Math.round(bound01(this._g, 255) * 100) + "%",
      b: Math.round(bound01(this._b, 255) * 100) + "%",
      a: this._a
    };
  },
  toPercentageRgbString: function toPercentageRgbString() {
    return this._a == 1 ? "rgb(" + Math.round(bound01(this._r, 255) * 100) + "%, " + Math.round(bound01(this._g, 255) * 100) + "%, " + Math.round(bound01(this._b, 255) * 100) + "%)" : "rgba(" + Math.round(bound01(this._r, 255) * 100) + "%, " + Math.round(bound01(this._g, 255) * 100) + "%, " + Math.round(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
  },
  toName: function toName() {
    if (this._a === 0) {
      return "transparent";
    }
    if (this._a < 1) {
      return false;
    }
    return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
  },
  toFilter: function toFilter(secondColor) {
    var hex8String = "#" + rgbaToArgbHex(this._r, this._g, this._b, this._a);
    var secondHex8String = hex8String;
    var gradientType = this._gradientType ? "GradientType = 1, " : "";
    if (secondColor) {
      var s = tinycolor(secondColor);
      secondHex8String = "#" + rgbaToArgbHex(s._r, s._g, s._b, s._a);
    }
    return "progid:DXImageTransform.Microsoft.gradient(" + gradientType + "startColorstr=" + hex8String + ",endColorstr=" + secondHex8String + ")";
  },
  toString: function toString(format) {
    var formatSet = !!format;
    format = format || this._format;
    var formattedString = false;
    var hasAlpha = this._a < 1 && this._a >= 0;
    var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");
    if (needsAlphaFormat) {
      // Special case for "transparent", all other non-alpha formats
      // will return rgba when there is transparency.
      if (format === "name" && this._a === 0) {
        return this.toName();
      }
      return this.toRgbString();
    }
    if (format === "rgb") {
      formattedString = this.toRgbString();
    }
    if (format === "prgb") {
      formattedString = this.toPercentageRgbString();
    }
    if (format === "hex" || format === "hex6") {
      formattedString = this.toHexString();
    }
    if (format === "hex3") {
      formattedString = this.toHexString(true);
    }
    if (format === "hex4") {
      formattedString = this.toHex8String(true);
    }
    if (format === "hex8") {
      formattedString = this.toHex8String();
    }
    if (format === "name") {
      formattedString = this.toName();
    }
    if (format === "hsl") {
      formattedString = this.toHslString();
    }
    if (format === "hsv") {
      formattedString = this.toHsvString();
    }
    return formattedString || this.toHexString();
  },
  clone: function clone() {
    return tinycolor(this.toString());
  },
  _applyModification: function _applyModification(fn, args) {
    var color = fn.apply(null, [this].concat([].slice.call(args)));
    this._r = color._r;
    this._g = color._g;
    this._b = color._b;
    this.setAlpha(color._a);
    return this;
  },
  lighten: function lighten() {
    return this._applyModification(_lighten, arguments);
  },
  brighten: function brighten() {
    return this._applyModification(_brighten, arguments);
  },
  darken: function darken() {
    return this._applyModification(_darken, arguments);
  },
  desaturate: function desaturate() {
    return this._applyModification(_desaturate, arguments);
  },
  saturate: function saturate() {
    return this._applyModification(_saturate, arguments);
  },
  greyscale: function greyscale() {
    return this._applyModification(_greyscale, arguments);
  },
  spin: function spin() {
    return this._applyModification(_spin, arguments);
  },
  _applyCombination: function _applyCombination(fn, args) {
    return fn.apply(null, [this].concat([].slice.call(args)));
  },
  analogous: function analogous() {
    return this._applyCombination(_analogous, arguments);
  },
  complement: function complement() {
    return this._applyCombination(_complement, arguments);
  },
  monochromatic: function monochromatic() {
    return this._applyCombination(_monochromatic, arguments);
  },
  splitcomplement: function splitcomplement() {
    return this._applyCombination(_splitcomplement, arguments);
  },
  // Disabled until https://github.com/bgrins/TinyColor/issues/254
  // polyad: function (number) {
  //   return this._applyCombination(polyad, [number]);
  // },
  triad: function triad() {
    return this._applyCombination(polyad, [3]);
  },
  tetrad: function tetrad() {
    return this._applyCombination(polyad, [4]);
  }
};

// If input is an object, force 1 into "1.0" to handle ratios properly
// String input requires "1.0" as input, so 1 will be treated as 1
tinycolor.fromRatio = function (color, opts) {
  if (_typeof(color) == "object") {
    var newColor = {};
    for (var i in color) {
      if (color.hasOwnProperty(i)) {
        if (i === "a") {
          newColor[i] = color[i];
        } else {
          newColor[i] = convertToPercentage(color[i]);
        }
      }
    }
    color = newColor;
  }
  return tinycolor(color, opts);
};

// Given a string or object, convert that input to RGB
// Possible string inputs:
//
//     "red"
//     "#f00" or "f00"
//     "#ff0000" or "ff0000"
//     "#ff000000" or "ff000000"
//     "rgb 255 0 0" or "rgb (255, 0, 0)"
//     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
//     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
//     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
//     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
//     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
//     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
//
function inputToRGB(color) {
  var rgb = {
    r: 0,
    g: 0,
    b: 0
  };
  var a = 1;
  var s = null;
  var v = null;
  var l = null;
  var ok = false;
  var format = false;
  if (typeof color == "string") {
    color = stringInputToObject(color);
  }
  if (_typeof(color) == "object") {
    if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
      rgb = rgbToRgb(color.r, color.g, color.b);
      ok = true;
      format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
      s = convertToPercentage(color.s);
      v = convertToPercentage(color.v);
      rgb = hsvToRgb(color.h, s, v);
      ok = true;
      format = "hsv";
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
      s = convertToPercentage(color.s);
      l = convertToPercentage(color.l);
      rgb = hslToRgb$2(color.h, s, l);
      ok = true;
      format = "hsl";
    }
    if (color.hasOwnProperty("a")) {
      a = color.a;
    }
  }
  a = boundAlpha(a);
  return {
    ok: ok,
    format: color.format || format,
    r: Math.min(255, Math.max(rgb.r, 0)),
    g: Math.min(255, Math.max(rgb.g, 0)),
    b: Math.min(255, Math.max(rgb.b, 0)),
    a: a
  };
}

// Conversion Functions
// --------------------

// `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
// <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

// `rgbToRgb`
// Handle bounds / percentage checking to conform to CSS color spec
// <http://www.w3.org/TR/css3-color/>
// *Assumes:* r, g, b in [0, 255] or [0, 1]
// *Returns:* { r, g, b } in [0, 255]
function rgbToRgb(r, g, b) {
  return {
    r: bound01(r, 255) * 255,
    g: bound01(g, 255) * 255,
    b: bound01(b, 255) * 255
  };
}

// `rgbToHsl`
// Converts an RGB color value to HSL.
// *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
// *Returns:* { h, s, l } in [0,1]
function rgbToHsl(r, g, b) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;
  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return {
    h: h,
    s: s,
    l: l
  };
}

// `hslToRgb`
// Converts an HSL color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
function hslToRgb$2(h, s, l) {
  var r, g, b;
  h = bound01(h, 360);
  s = bound01(s, 100);
  l = bound01(l, 100);
  function hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return {
    r: r * 255,
    g: g * 255,
    b: b * 255
  };
}

// `rgbToHsv`
// Converts an RGB color value to HSV
// *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
// *Returns:* { h, s, v } in [0,1]
function rgbToHsv(r, g, b) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    v = max;
  var d = max - min;
  s = max === 0 ? 0 : d / max;
  if (max == min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return {
    h: h,
    s: s,
    v: v
  };
}

// `hsvToRgb`
// Converts an HSV color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
function hsvToRgb(h, s, v) {
  h = bound01(h, 360) * 6;
  s = bound01(s, 100);
  v = bound01(v, 100);
  var i = Math.floor(h),
    f = h - i,
    p = v * (1 - s),
    q = v * (1 - f * s),
    t = v * (1 - (1 - f) * s),
    mod = i % 6,
    r = [v, q, p, p, t, v][mod],
    g = [t, v, v, q, p, p][mod],
    b = [p, p, t, v, v, q][mod];
  return {
    r: r * 255,
    g: g * 255,
    b: b * 255
  };
}

// `rgbToHex`
// Converts an RGB color to hex
// Assumes r, g, and b are contained in the set [0, 255]
// Returns a 3 or 6 character hex
function rgbToHex(r, g, b, allow3Char) {
  var hex = [pad2(Math.round(r).toString(16)), pad2(Math.round(g).toString(16)), pad2(Math.round(b).toString(16))];

  // Return a 3 character hex if possible
  if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
  }
  return hex.join("");
}

// `rgbaToHex`
// Converts an RGBA color plus alpha transparency to hex
// Assumes r, g, b are contained in the set [0, 255] and
// a in [0, 1]. Returns a 4 or 8 character rgba hex
function rgbaToHex(r, g, b, a, allow4Char) {
  var hex = [pad2(Math.round(r).toString(16)), pad2(Math.round(g).toString(16)), pad2(Math.round(b).toString(16)), pad2(convertDecimalToHex(a))];

  // Return a 4 character hex if possible
  if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
  }
  return hex.join("");
}

// `rgbaToArgbHex`
// Converts an RGBA color to an ARGB Hex8 string
// Rarely used, but required for "toFilter()"
function rgbaToArgbHex(r, g, b, a) {
  var hex = [pad2(convertDecimalToHex(a)), pad2(Math.round(r).toString(16)), pad2(Math.round(g).toString(16)), pad2(Math.round(b).toString(16))];
  return hex.join("");
}

// `equals`
// Can be called with any tinycolor input
tinycolor.equals = function (color1, color2) {
  if (!color1 || !color2) return false;
  return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
};
tinycolor.random = function () {
  return tinycolor.fromRatio({
    r: Math.random(),
    g: Math.random(),
    b: Math.random()
  });
};

// Modification Functions
// ----------------------
// Thanks to less.js for some of the basics here
// <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

function _desaturate(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor(color).toHsl();
  hsl.s -= amount / 100;
  hsl.s = clamp01$1(hsl.s);
  return tinycolor(hsl);
}
function _saturate(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor(color).toHsl();
  hsl.s += amount / 100;
  hsl.s = clamp01$1(hsl.s);
  return tinycolor(hsl);
}
function _greyscale(color) {
  return tinycolor(color).desaturate(100);
}
function _lighten(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor(color).toHsl();
  hsl.l += amount / 100;
  hsl.l = clamp01$1(hsl.l);
  return tinycolor(hsl);
}
function _brighten(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var rgb = tinycolor(color).toRgb();
  rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
  rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
  rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
  return tinycolor(rgb);
}
function _darken(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor(color).toHsl();
  hsl.l -= amount / 100;
  hsl.l = clamp01$1(hsl.l);
  return tinycolor(hsl);
}

// Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
// Values outside of this range will be wrapped into this range.
function _spin(color, amount) {
  var hsl = tinycolor(color).toHsl();
  var hue = (hsl.h + amount) % 360;
  hsl.h = hue < 0 ? 360 + hue : hue;
  return tinycolor(hsl);
}

// Combination Functions
// ---------------------
// Thanks to jQuery xColor for some of the ideas behind these
// <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

function _complement(color) {
  var hsl = tinycolor(color).toHsl();
  hsl.h = (hsl.h + 180) % 360;
  return tinycolor(hsl);
}
function polyad(color, number) {
  if (isNaN(number) || number <= 0) {
    throw new Error("Argument to polyad must be a positive number");
  }
  var hsl = tinycolor(color).toHsl();
  var result = [tinycolor(color)];
  var step = 360 / number;
  for (var i = 1; i < number; i++) {
    result.push(tinycolor({
      h: (hsl.h + i * step) % 360,
      s: hsl.s,
      l: hsl.l
    }));
  }
  return result;
}
function _splitcomplement(color) {
  var hsl = tinycolor(color).toHsl();
  var h = hsl.h;
  return [tinycolor(color), tinycolor({
    h: (h + 72) % 360,
    s: hsl.s,
    l: hsl.l
  }), tinycolor({
    h: (h + 216) % 360,
    s: hsl.s,
    l: hsl.l
  })];
}
function _analogous(color, results, slices) {
  results = results || 6;
  slices = slices || 30;
  var hsl = tinycolor(color).toHsl();
  var part = 360 / slices;
  var ret = [tinycolor(color)];
  for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results;) {
    hsl.h = (hsl.h + part) % 360;
    ret.push(tinycolor(hsl));
  }
  return ret;
}
function _monochromatic(color, results) {
  results = results || 6;
  var hsv = tinycolor(color).toHsv();
  var h = hsv.h,
    s = hsv.s,
    v = hsv.v;
  var ret = [];
  var modification = 1 / results;
  while (results--) {
    ret.push(tinycolor({
      h: h,
      s: s,
      v: v
    }));
    v = (v + modification) % 1;
  }
  return ret;
}

// Utility Functions
// ---------------------

tinycolor.mix = function (color1, color2, amount) {
  amount = amount === 0 ? 0 : amount || 50;
  var rgb1 = tinycolor(color1).toRgb();
  var rgb2 = tinycolor(color2).toRgb();
  var p = amount / 100;
  var rgba = {
    r: (rgb2.r - rgb1.r) * p + rgb1.r,
    g: (rgb2.g - rgb1.g) * p + rgb1.g,
    b: (rgb2.b - rgb1.b) * p + rgb1.b,
    a: (rgb2.a - rgb1.a) * p + rgb1.a
  };
  return tinycolor(rgba);
};

// Readability Functions
// ---------------------
// <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)

// `contrast`
// Analyze the 2 colors and returns the color contrast defined by (WCAG Version 2)
tinycolor.readability = function (color1, color2) {
  var c1 = tinycolor(color1);
  var c2 = tinycolor(color2);
  return (Math.max(c1.getLuminance(), c2.getLuminance()) + 0.05) / (Math.min(c1.getLuminance(), c2.getLuminance()) + 0.05);
};

// `isReadable`
// Ensure that foreground and background color combinations meet WCAG2 guidelines.
// The third argument is an optional Object.
//      the 'level' property states 'AA' or 'AAA' - if missing or invalid, it defaults to 'AA';
//      the 'size' property states 'large' or 'small' - if missing or invalid, it defaults to 'small'.
// If the entire object is absent, isReadable defaults to {level:"AA",size:"small"}.

// *Example*
//    tinycolor.isReadable("#000", "#111") => false
//    tinycolor.isReadable("#000", "#111",{level:"AA",size:"large"}) => false
tinycolor.isReadable = function (color1, color2, wcag2) {
  var readability = tinycolor.readability(color1, color2);
  var wcag2Parms, out;
  out = false;
  wcag2Parms = validateWCAG2Parms(wcag2);
  switch (wcag2Parms.level + wcag2Parms.size) {
    case "AAsmall":
    case "AAAlarge":
      out = readability >= 4.5;
      break;
    case "AAlarge":
      out = readability >= 3;
      break;
    case "AAAsmall":
      out = readability >= 7;
      break;
  }
  return out;
};

// `mostReadable`
// Given a base color and a list of possible foreground or background
// colors for that base, returns the most readable color.
// Optionally returns Black or White if the most readable color is unreadable.
// *Example*
//    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:false}).toHexString(); // "#112255"
//    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:true}).toHexString();  // "#ffffff"
//    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"large"}).toHexString(); // "#faf3f3"
//    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"small"}).toHexString(); // "#ffffff"
tinycolor.mostReadable = function (baseColor, colorList, args) {
  var bestColor = null;
  var bestScore = 0;
  var readability;
  var includeFallbackColors, level, size;
  args = args || {};
  includeFallbackColors = args.includeFallbackColors;
  level = args.level;
  size = args.size;
  for (var i = 0; i < colorList.length; i++) {
    readability = tinycolor.readability(baseColor, colorList[i]);
    if (readability > bestScore) {
      bestScore = readability;
      bestColor = tinycolor(colorList[i]);
    }
  }
  if (tinycolor.isReadable(baseColor, bestColor, {
    level: level,
    size: size
  }) || !includeFallbackColors) {
    return bestColor;
  } else {
    args.includeFallbackColors = false;
    return tinycolor.mostReadable(baseColor, ["#fff", "#000"], args);
  }
};

// Big List of Colors
// ------------------
// <https://www.w3.org/TR/css-color-4/#named-colors>
var names = tinycolor.names = {
  aliceblue: "f0f8ff",
  antiquewhite: "faebd7",
  aqua: "0ff",
  aquamarine: "7fffd4",
  azure: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "000",
  blanchedalmond: "ffebcd",
  blue: "00f",
  blueviolet: "8a2be2",
  brown: "a52a2a",
  burlywood: "deb887",
  burntsienna: "ea7e5d",
  cadetblue: "5f9ea0",
  chartreuse: "7fff00",
  chocolate: "d2691e",
  coral: "ff7f50",
  cornflowerblue: "6495ed",
  cornsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "0ff",
  darkblue: "00008b",
  darkcyan: "008b8b",
  darkgoldenrod: "b8860b",
  darkgray: "a9a9a9",
  darkgreen: "006400",
  darkgrey: "a9a9a9",
  darkkhaki: "bdb76b",
  darkmagenta: "8b008b",
  darkolivegreen: "556b2f",
  darkorange: "ff8c00",
  darkorchid: "9932cc",
  darkred: "8b0000",
  darksalmon: "e9967a",
  darkseagreen: "8fbc8f",
  darkslateblue: "483d8b",
  darkslategray: "2f4f4f",
  darkslategrey: "2f4f4f",
  darkturquoise: "00ced1",
  darkviolet: "9400d3",
  deeppink: "ff1493",
  deepskyblue: "00bfff",
  dimgray: "696969",
  dimgrey: "696969",
  dodgerblue: "1e90ff",
  firebrick: "b22222",
  floralwhite: "fffaf0",
  forestgreen: "228b22",
  fuchsia: "f0f",
  gainsboro: "dcdcdc",
  ghostwhite: "f8f8ff",
  gold: "ffd700",
  goldenrod: "daa520",
  gray: "808080",
  green: "008000",
  greenyellow: "adff2f",
  grey: "808080",
  honeydew: "f0fff0",
  hotpink: "ff69b4",
  indianred: "cd5c5c",
  indigo: "4b0082",
  ivory: "fffff0",
  khaki: "f0e68c",
  lavender: "e6e6fa",
  lavenderblush: "fff0f5",
  lawngreen: "7cfc00",
  lemonchiffon: "fffacd",
  lightblue: "add8e6",
  lightcoral: "f08080",
  lightcyan: "e0ffff",
  lightgoldenrodyellow: "fafad2",
  lightgray: "d3d3d3",
  lightgreen: "90ee90",
  lightgrey: "d3d3d3",
  lightpink: "ffb6c1",
  lightsalmon: "ffa07a",
  lightseagreen: "20b2aa",
  lightskyblue: "87cefa",
  lightslategray: "789",
  lightslategrey: "789",
  lightsteelblue: "b0c4de",
  lightyellow: "ffffe0",
  lime: "0f0",
  limegreen: "32cd32",
  linen: "faf0e6",
  magenta: "f0f",
  maroon: "800000",
  mediumaquamarine: "66cdaa",
  mediumblue: "0000cd",
  mediumorchid: "ba55d3",
  mediumpurple: "9370db",
  mediumseagreen: "3cb371",
  mediumslateblue: "7b68ee",
  mediumspringgreen: "00fa9a",
  mediumturquoise: "48d1cc",
  mediumvioletred: "c71585",
  midnightblue: "191970",
  mintcream: "f5fffa",
  mistyrose: "ffe4e1",
  moccasin: "ffe4b5",
  navajowhite: "ffdead",
  navy: "000080",
  oldlace: "fdf5e6",
  olive: "808000",
  olivedrab: "6b8e23",
  orange: "ffa500",
  orangered: "ff4500",
  orchid: "da70d6",
  palegoldenrod: "eee8aa",
  palegreen: "98fb98",
  paleturquoise: "afeeee",
  palevioletred: "db7093",
  papayawhip: "ffefd5",
  peachpuff: "ffdab9",
  peru: "cd853f",
  pink: "ffc0cb",
  plum: "dda0dd",
  powderblue: "b0e0e6",
  purple: "800080",
  rebeccapurple: "663399",
  red: "f00",
  rosybrown: "bc8f8f",
  royalblue: "4169e1",
  saddlebrown: "8b4513",
  salmon: "fa8072",
  sandybrown: "f4a460",
  seagreen: "2e8b57",
  seashell: "fff5ee",
  sienna: "a0522d",
  silver: "c0c0c0",
  skyblue: "87ceeb",
  slateblue: "6a5acd",
  slategray: "708090",
  slategrey: "708090",
  snow: "fffafa",
  springgreen: "00ff7f",
  steelblue: "4682b4",
  tan: "d2b48c",
  teal: "008080",
  thistle: "d8bfd8",
  tomato: "ff6347",
  turquoise: "40e0d0",
  violet: "ee82ee",
  wheat: "f5deb3",
  white: "fff",
  whitesmoke: "f5f5f5",
  yellow: "ff0",
  yellowgreen: "9acd32"
};

// Make it easy to access colors via `hexNames[hex]`
var hexNames = tinycolor.hexNames = flip(names);

// Utilities
// ---------

// `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
function flip(o) {
  var flipped = {};
  for (var i in o) {
    if (o.hasOwnProperty(i)) {
      flipped[o[i]] = i;
    }
  }
  return flipped;
}

// Return a valid alpha value [0,1] with all invalid values being set to 1
function boundAlpha(a) {
  a = parseFloat(a);
  if (isNaN(a) || a < 0 || a > 1) {
    a = 1;
  }
  return a;
}

// Take input from [0, n] and return it as [0, 1]
function bound01(n, max) {
  if (isOnePointZero(n)) n = "100%";
  var processPercent = isPercentage(n);
  n = Math.min(max, Math.max(0, parseFloat(n)));

  // Automatically convert percentage into number
  if (processPercent) {
    n = parseInt(n * max, 10) / 100;
  }

  // Handle floating point rounding errors
  if (Math.abs(n - max) < 0.000001) {
    return 1;
  }

  // Convert into [0, 1] range if it isn't already
  return n % max / parseFloat(max);
}

// Force a number between 0 and 1
function clamp01$1(val) {
  return Math.min(1, Math.max(0, val));
}

// Parse a base-16 hex value into a base-10 integer
function parseIntFromHex(val) {
  return parseInt(val, 16);
}

// Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
// <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
function isOnePointZero(n) {
  return typeof n == "string" && n.indexOf(".") != -1 && parseFloat(n) === 1;
}

// Check to see if string passed in is a percentage
function isPercentage(n) {
  return typeof n === "string" && n.indexOf("%") != -1;
}

// Force a hex value to have 2 characters
function pad2(c) {
  return c.length == 1 ? "0" + c : "" + c;
}

// Replace a decimal with it's percentage value
function convertToPercentage(n) {
  if (n <= 1) {
    n = n * 100 + "%";
  }
  return n;
}

// Converts a decimal to a hex value
function convertDecimalToHex(d) {
  return Math.round(parseFloat(d) * 255).toString(16);
}
// Converts a hex value to a decimal
function convertHexToDecimal(h) {
  return parseIntFromHex(h) / 255;
}
var matchers = function () {
  // <http://www.w3.org/TR/css3-values/#integers>
  var CSS_INTEGER = "[-\\+]?\\d+%?";

  // <http://www.w3.org/TR/css3-values/#number-value>
  var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

  // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
  var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

  // Actual matching.
  // Parentheses and commas are optional, but not required.
  // Whitespace can take the place of commas or opening paren
  var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
  var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
  return {
    CSS_UNIT: new RegExp(CSS_UNIT),
    rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
    rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
    hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
    hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
    hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
    hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
  };
}();

// `isValidCSSUnit`
// Take in a single string / number and check to see if it looks like a CSS unit
// (see `matchers` above for definition).
function isValidCSSUnit(color) {
  return !!matchers.CSS_UNIT.exec(color);
}

// `stringInputToObject`
// Permissive string parsing.  Take in a number of formats, and output an object
// based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
function stringInputToObject(color) {
  color = color.replace(trimLeft, "").replace(trimRight, "").toLowerCase();
  var named = false;
  if (names[color]) {
    color = names[color];
    named = true;
  } else if (color == "transparent") {
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 0,
      format: "name"
    };
  }

  // Try to match string input using regular expressions.
  // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
  // Just return an object and let the conversion functions handle that.
  // This way the result will be the same whether the tinycolor is initialized with string or object.
  var match;
  if (match = matchers.rgb.exec(color)) {
    return {
      r: match[1],
      g: match[2],
      b: match[3]
    };
  }
  if (match = matchers.rgba.exec(color)) {
    return {
      r: match[1],
      g: match[2],
      b: match[3],
      a: match[4]
    };
  }
  if (match = matchers.hsl.exec(color)) {
    return {
      h: match[1],
      s: match[2],
      l: match[3]
    };
  }
  if (match = matchers.hsla.exec(color)) {
    return {
      h: match[1],
      s: match[2],
      l: match[3],
      a: match[4]
    };
  }
  if (match = matchers.hsv.exec(color)) {
    return {
      h: match[1],
      s: match[2],
      v: match[3]
    };
  }
  if (match = matchers.hsva.exec(color)) {
    return {
      h: match[1],
      s: match[2],
      v: match[3],
      a: match[4]
    };
  }
  if (match = matchers.hex8.exec(color)) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      a: convertHexToDecimal(match[4]),
      format: named ? "name" : "hex8"
    };
  }
  if (match = matchers.hex6.exec(color)) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      format: named ? "name" : "hex"
    };
  }
  if (match = matchers.hex4.exec(color)) {
    return {
      r: parseIntFromHex(match[1] + "" + match[1]),
      g: parseIntFromHex(match[2] + "" + match[2]),
      b: parseIntFromHex(match[3] + "" + match[3]),
      a: convertHexToDecimal(match[4] + "" + match[4]),
      format: named ? "name" : "hex8"
    };
  }
  if (match = matchers.hex3.exec(color)) {
    return {
      r: parseIntFromHex(match[1] + "" + match[1]),
      g: parseIntFromHex(match[2] + "" + match[2]),
      b: parseIntFromHex(match[3] + "" + match[3]),
      format: named ? "name" : "hex"
    };
  }
  return false;
}
function validateWCAG2Parms(parms) {
  // return valid WCAG2 parms for isReadable.
  // If input parms are invalid, return {"level":"AA", "size":"small"}
  var level, size;
  parms = parms || {
    level: "AA",
    size: "small"
  };
  level = (parms.level || "AA").toUpperCase();
  size = (parms.size || "small").toLowerCase();
  if (level !== "AA" && level !== "AAA") {
    level = "AA";
  }
  if (size !== "small" && size !== "large") {
    size = "small";
  }
  return {
    level: level,
    size: size
  };
}

function base64ArrayBuffer(arrayBuffer) {
  const encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  const bytes = new Uint8Array(arrayBuffer);
  const byteLength = bytes.byteLength;
  const byteRemainder = byteLength % 3;
  const mainLength = byteLength - byteRemainder;
  
  let base64 = '';
  let a, b, c, d;
  let chunk;

  for (let i = 0; i < mainLength; i = i + 3) {
    chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
    a = (chunk & 16515072) >> 18;
    b = (chunk & 258048) >> 12;
    c = (chunk & 4032) >> 6;
    d = chunk & 63;
    base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
  }

  if (byteRemainder === 1) {
    chunk = bytes[mainLength];
    a = (chunk & 252) >> 2;
    b = (chunk & 3) << 4;
    base64 += encodings[a] + encodings[b] + '==';
  } 
  else if (byteRemainder === 2) {
    chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];
    a = (chunk & 64512) >> 10;
    b = (chunk & 1008) >> 4;
    c = (chunk & 15) << 2;
    base64 += encodings[a] + encodings[b] + encodings[c] + '=';
  }

  return base64
}

function extractFileExtension(filename) {
  return filename.substr((~-filename.lastIndexOf('.') >>> 0) + 2)
}

function eachElement(node, func) {
  if (!node) return node

  let result = '';
  if (node.constructor === Array) {
    for (let i = 0; i < node.length; i++) {
      result += func(node[i], i);
    }
  } 
  else result += func(node, 0);

  return result
}

function getTextByPathList(node, path) {
  if (!node) return node

  for (const key of path) {
    node = node[key];
    if (!node) return node
  }

  return node
}

function angleToDegrees(angle) {
  if (!angle) return 0
  return Math.round(angle / 60000)
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, m => map[m])
}

function getMimeType(imgFileExt) {
  let mimeType = '';
  switch (imgFileExt.toLowerCase()) {
    case 'jpg':
    case 'jpeg':
      mimeType = 'image/jpeg';
      break
    case 'png':
      mimeType = 'image/png';
      break
    case 'gif':
      mimeType = 'image/gif';
      break
    case 'emf':
      mimeType = 'image/x-emf';
      break
    case 'wmf':
      mimeType = 'image/x-wmf';
      break
    case 'svg':
      mimeType = 'image/svg+xml';
      break
    case 'mp4':
      mimeType = 'video/mp4';
      break
    case 'webm':
      mimeType = 'video/webm';
      break
    case 'ogg':
      mimeType = 'video/ogg';
      break
    case 'avi':
      mimeType = 'video/avi';
      break
    case 'mpg':
      mimeType = 'video/mpg';
      break
    case 'wmv':
      mimeType = 'video/wmv';
      break
    case 'mp3':
      mimeType = 'audio/mpeg';
      break
    case 'wav':
      mimeType = 'audio/wav';
      break
    case 'tif':
      mimeType = 'image/tiff';
      break
    case 'tiff':
      mimeType = 'image/tiff';
      break
  }
  return mimeType
}

function isVideoLink(vdoFile) {
  const urlRegex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlRegex.test(vdoFile)
}

function toHex$1(n) {
  let hex = n.toString(16);
  while (hex.length < 2) {
    hex = '0' + hex;
  }
  return hex
}

function hasValidText(htmlString) {
  if (typeof DOMParser === 'undefined') {
    const text = htmlString.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ');
    return text.trim() !== ''
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const text = doc.body.textContent || doc.body.innerText;
  return text.trim() !== ''
}

function numberToFixed(num, fractionDigits = 4) {
  return parseFloat(num.toFixed(fractionDigits))
}

function getSchemeColorFromTheme(schemeClr, warpObj, clrMap, phClr) {
  let color;
  let slideLayoutClrOvride;
  if (clrMap) slideLayoutClrOvride = clrMap;
  else {
    let sldClrMapOvr = getTextByPathList(warpObj['slideContent'], ['p:sld', 'p:clrMapOvr', 'a:overrideClrMapping', 'attrs']);
    if (sldClrMapOvr) slideLayoutClrOvride = sldClrMapOvr;
    else {
      sldClrMapOvr = getTextByPathList(warpObj['slideLayoutContent'], ['p:sldLayout', 'p:clrMapOvr', 'a:overrideClrMapping', 'attrs']);
      if (sldClrMapOvr) slideLayoutClrOvride = sldClrMapOvr;
      else {
        slideLayoutClrOvride = getTextByPathList(warpObj['slideMasterContent'], ['p:sldMaster', 'p:clrMap', 'attrs']);
      }
    }
  }
  const schmClrName = schemeClr.substr(2);
  if (schmClrName === 'phClr' && phClr) color = phClr;
  else {
    if (slideLayoutClrOvride) {
      switch (schmClrName) {
        case 'tx1':
        case 'tx2':
        case 'bg1':
        case 'bg2':
          schemeClr = 'a:' + slideLayoutClrOvride[schmClrName];
          break
      }
    }
    else {
      switch (schmClrName) {
        case 'tx1':
          schemeClr = 'a:dk1';
          break
        case 'tx2':
          schemeClr = 'a:dk2';
          break
        case 'bg1':
          schemeClr = 'a:lt1';
          break
        case 'bg2':
          schemeClr = 'a:lt2';
          break
      }
    }
    const refNode = getTextByPathList(warpObj['themeContent'], ['a:theme', 'a:themeElements', 'a:clrScheme', schemeClr]);
    color = getTextByPathList(refNode, ['a:srgbClr', 'attrs', 'val']);
    if (!color && refNode) color = getTextByPathList(refNode, ['a:sysClr', 'attrs', 'lastClr']);
  }
  return color
}

function getBorder(node, elType, warpObj) {
  let lineNode = getTextByPathList(node, ['p:spPr', 'a:ln']);
  if (!lineNode) {
    const lnRefNode = getTextByPathList(node, ['p:style', 'a:lnRef']);
    if (lnRefNode) {
      const lnIdx = getTextByPathList(lnRefNode, ['attrs', 'idx']);
      lineNode = warpObj['themeContent']['a:theme']['a:themeElements']['a:fmtScheme']['a:lnStyleLst']['a:ln'][Number(lnIdx) - 1];
    }
  }
  if (!lineNode) lineNode = node;

  const isNoFill = getTextByPathList(lineNode, ['a:noFill']);

  let borderWidth = isNoFill ? 0 : (parseInt(getTextByPathList(lineNode, ['attrs', 'w'])) / 12700);
  if (isNaN(borderWidth)) {
    // No explicit width. Only use the PPTX default (0.75pt) when the line node has
    // an explicit fill — otherwise treat as no border (e.g. text boxes with an empty <a:ln>).
    const hasLineFill = lineNode && !!getTextByPathList(lineNode, ['a:solidFill']);
    if (hasLineFill) borderWidth = 0.75;
    else if (lineNode) borderWidth = 0;
    else if (elType !== 'obj') borderWidth = 0;
    else borderWidth = 1;
  }

  let borderColor = getTextByPathList(lineNode, ['a:solidFill', 'a:srgbClr', 'attrs', 'val']);
  if (!borderColor) {
    const schemeClrNode = getTextByPathList(lineNode, ['a:solidFill', 'a:schemeClr']);
    const schemeClr = 'a:' + getTextByPathList(schemeClrNode, ['attrs', 'val']);
    borderColor = getSchemeColorFromTheme(schemeClr, warpObj);
  }

  if (!borderColor) {
    const schemeClrNode = getTextByPathList(node, ['p:style', 'a:lnRef', 'a:schemeClr']);
    const schemeClr = 'a:' + getTextByPathList(schemeClrNode, ['attrs', 'val']);
    borderColor = getSchemeColorFromTheme(schemeClr, warpObj);

    if (borderColor) {
      let shade = getTextByPathList(schemeClrNode, ['a:shade', 'attrs', 'val']);

      if (shade) {
        shade = parseInt(shade) / 100000;
        
        const color = tinycolor('#' + borderColor).toHsl();
        borderColor = tinycolor({ h: color.h, s: color.s, l: color.l * shade, a: color.a }).toHex();
      }
    }
  }

  if (!borderColor) borderColor = '#000000';
  else borderColor = `#${borderColor}`;

  const type = getTextByPathList(lineNode, ['a:prstDash', 'attrs', 'val']);
  let borderType = 'solid';
  let strokeDasharray = '0';
  switch (type) {
    case 'solid':
      borderType = 'solid';
      strokeDasharray = '0';
      break
    case 'dash':
      borderType = 'dashed';
      strokeDasharray = '5';
      break
    case 'dashDot':
      borderType = 'dashed';
      strokeDasharray = '5, 5, 1, 5';
      break
    case 'dot':
      borderType = 'dotted';
      strokeDasharray = '1, 5';
      break
    case 'lgDash':
      borderType = 'dashed';
      strokeDasharray = '10, 5';
      break
    case 'lgDashDotDot':
      borderType = 'dotted';
      strokeDasharray = '10, 5, 1, 5, 1, 5';
      break
    case 'sysDash':
      borderType = 'dashed';
      strokeDasharray = '5, 2';
      break
    case 'sysDashDot':
      borderType = 'dotted';
      strokeDasharray = '5, 2, 1, 5';
      break
    case 'sysDashDotDot':
      borderType = 'dotted';
      strokeDasharray = '5, 2, 1, 5, 1, 5';
      break
    case 'sysDot':
      borderType = 'dotted';
      strokeDasharray = '2, 5';
      break
  }

  return {
    borderColor,
    borderWidth,
    borderType,
    strokeDasharray,
  }
}

function hueToRgb(t1, t2, hue) {
  if (hue < 0) hue += 6;
  if (hue >= 6) hue -= 6;
  if (hue < 1) return (t2 - t1) * hue + t1
  else if (hue < 3) return t2
  else if (hue < 4) return (t2 - t1) * (4 - hue) + t1
  return t1
}

function hslToRgb$1(hue, sat, light) {
  let t2;
  hue = hue / 60;
  if (light <= 0.5) {
    t2 = light * (sat + 1);
  } 
  else {
    t2 = light + sat - (light * sat);
  }
  const t1 = light * 2 - t2;
  const r = hueToRgb(t1, t2, hue + 2) * 255;
  const g = hueToRgb(t1, t2, hue) * 255;
  const b = hueToRgb(t1, t2, hue - 2) * 255;
  return { r, g, b }
}

function applyShade(rgbStr, shadeValue, isAlpha) {
  const color = tinycolor(rgbStr).toHsl();
  if (shadeValue >= 1) shadeValue = 1;
  const cacl_l = Math.min(color.l * shadeValue, 1);
  if (isAlpha) {
    return tinycolor({
      h: color.h,
      s: color.s,
      l: cacl_l,
      a: color.a
    }).toHex8()
  }

  return tinycolor({
    h: color.h,
    s: color.s,
    l: cacl_l,
    a: color.a,
  }).toHex()
}

function applyTint(rgbStr, tintValue, isAlpha) {
  const color = tinycolor(rgbStr).toHsl();
  if (tintValue >= 1) tintValue = 1;
  const cacl_l = color.l * tintValue + (1 - tintValue);
  if (isAlpha) {
    return tinycolor({
      h: color.h,
      s: color.s,
      l: cacl_l,
      a: color.a
    }).toHex8()
  }

  return tinycolor({
    h: color.h,
    s: color.s,
    l: cacl_l,
    a: color.a
  }).toHex()
}

function applyLumOff(rgbStr, offset, isAlpha) {
  const color = tinycolor(rgbStr).toHsl();
  const lum = offset + color.l;
  if (lum >= 1) {
    if (isAlpha) {
      return tinycolor({
        h: color.h,
        s: color.s,
        l: 1,
        a: color.a
      }).toHex8()
    }
      
    return tinycolor({
      h: color.h,
      s: color.s,
      l: 1,
      a: color.a
    }).toHex()
  }
  if (isAlpha) {
    return tinycolor({
      h: color.h,
      s: color.s,
      l: lum,
      a: color.a
    }).toHex8()
  }

  return tinycolor({
    h: color.h,
    s: color.s,
    l: lum,
    a: color.a
  }).toHex()
}

function applyLumMod(rgbStr, multiplier, isAlpha) {
  const color = tinycolor(rgbStr).toHsl();
  let cacl_l = color.l * multiplier;
  if (cacl_l >= 1) cacl_l = 1;
  if (isAlpha) {
    return tinycolor({
      h: color.h,
      s: color.s,
      l: cacl_l,
      a: color.a
    }).toHex8()
  }

  return tinycolor({
    h: color.h,
    s: color.s,
    l: cacl_l,
    a: color.a
  }).toHex()
}

function applyHueMod(rgbStr, multiplier, isAlpha) {
  const color = tinycolor(rgbStr).toHsl();
  let cacl_h = color.h * multiplier;
  if (cacl_h >= 360) cacl_h = cacl_h - 360;
  if (isAlpha) {
    return tinycolor({
      h: cacl_h,
      s: color.s,
      l: color.l,
      a: color.a
    }).toHex8()
  }

  return tinycolor({
    h: cacl_h,
    s: color.s,
    l: color.l,
    a: color.a
  }).toHex()
}

function applySatMod(rgbStr, multiplier, isAlpha) {
  const color = tinycolor(rgbStr).toHsl();
  let cacl_s = color.s * multiplier;
  if (cacl_s >= 1) cacl_s = 1;
  if (isAlpha) {
    return tinycolor({
      h: color.h,
      s: cacl_s,
      l: color.l,
      a: color.a
    }).toHex8()
  }

  return tinycolor({
    h: color.h,
    s: cacl_s,
    l: color.l,
    a: color.a
  }).toHex()
}

function getColorName2Hex(name) {
  let hex;
  const colorName = ['AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure', 'Beige', 'Bisque', 'black', 'BlanchedAlmond', 'Blue', 'BlueViolet', 'Brown', 'BurlyWood', 'CadetBlue', 'Chartreuse', 'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson', 'Cyan', 'DarkBlue', 'DarkCyan', 'DarkGoldenRod', 'DarkGray', 'DarkGrey', 'DarkGreen', 'DarkKhaki', 'DarkMagenta', 'DarkOliveGreen', 'DarkOrange', 'DarkOrchid', 'DarkRed', 'DarkSalmon', 'DarkSeaGreen', 'DarkSlateBlue', 'DarkSlateGray', 'DarkSlateGrey', 'DarkTurquoise', 'DarkViolet', 'DeepPink', 'DeepSkyBlue', 'DimGray', 'DimGrey', 'DodgerBlue', 'FireBrick', 'FloralWhite', 'ForestGreen', 'Fuchsia', 'Gainsboro', 'GhostWhite', 'Gold', 'GoldenRod', 'Gray', 'Grey', 'Green', 'GreenYellow', 'HoneyDew', 'HotPink', 'IndianRed', 'Indigo', 'Ivory', 'Khaki', 'Lavender', 'LavenderBlush', 'LawnGreen', 'LemonChiffon', 'LightBlue', 'LightCoral', 'LightCyan', 'LightGoldenRodYellow', 'LightGray', 'LightGrey', 'LightGreen', 'LightPink', 'LightSalmon', 'LightSeaGreen', 'LightSkyBlue', 'LightSlateGray', 'LightSlateGrey', 'LightSteelBlue', 'LightYellow', 'Lime', 'LimeGreen', 'Linen', 'Magenta', 'Maroon', 'MediumAquaMarine', 'MediumBlue', 'MediumOrchid', 'MediumPurple', 'MediumSeaGreen', 'MediumSlateBlue', 'MediumSpringGreen', 'MediumTurquoise', 'MediumVioletRed', 'MidnightBlue', 'MintCream', 'MistyRose', 'Moccasin', 'NavajoWhite', 'Navy', 'OldLace', 'Olive', 'OliveDrab', 'Orange', 'OrangeRed', 'Orchid', 'PaleGoldenRod', 'PaleGreen', 'PaleTurquoise', 'PaleVioletRed', 'PapayaWhip', 'PeachPuff', 'Peru', 'Pink', 'Plum', 'PowderBlue', 'Purple', 'RebeccaPurple', 'Red', 'RosyBrown', 'RoyalBlue', 'SaddleBrown', 'Salmon', 'SandyBrown', 'SeaGreen', 'SeaShell', 'Sienna', 'Silver', 'SkyBlue', 'SlateBlue', 'SlateGray', 'SlateGrey', 'Snow', 'SpringGreen', 'SteelBlue', 'Tan', 'Teal', 'Thistle', 'Tomato', 'Turquoise', 'Violet', 'Wheat', 'White', 'WhiteSmoke', 'Yellow', 'YellowGreen'];
  const colorHex = ['f0f8ff', 'faebd7', '00ffff', '7fffd4', 'f0ffff', 'f5f5dc', 'ffe4c4', '000000', 'ffebcd', '0000ff', '8a2be2', 'a52a2a', 'deb887', '5f9ea0', '7fff00', 'd2691e', 'ff7f50', '6495ed', 'fff8dc', 'dc143c', '00ffff', '00008b', '008b8b', 'b8860b', 'a9a9a9', 'a9a9a9', '006400', 'bdb76b', '8b008b', '556b2f', 'ff8c00', '9932cc', '8b0000', 'e9967a', '8fbc8f', '483d8b', '2f4f4f', '2f4f4f', '00ced1', '9400d3', 'ff1493', '00bfff', '696969', '696969', '1e90ff', 'b22222', 'fffaf0', '228b22', 'ff00ff', 'dcdcdc', 'f8f8ff', 'ffd700', 'daa520', '808080', '808080', '008000', 'adff2f', 'f0fff0', 'ff69b4', 'cd5c5c', '4b0082', 'fffff0', 'f0e68c', 'e6e6fa', 'fff0f5', '7cfc00', 'fffacd', 'add8e6', 'f08080', 'e0ffff', 'fafad2', 'd3d3d3', 'd3d3d3', '90ee90', 'ffb6c1', 'ffa07a', '20b2aa', '87cefa', '778899', '778899', 'b0c4de', 'ffffe0', '00ff00', '32cd32', 'faf0e6', 'ff00ff', '800000', '66cdaa', '0000cd', 'ba55d3', '9370db', '3cb371', '7b68ee', '00fa9a', '48d1cc', 'c71585', '191970', 'f5fffa', 'ffe4e1', 'ffe4b5', 'ffdead', '000080', 'fdf5e6', '808000', '6b8e23', 'ffa500', 'ff4500', 'da70d6', 'eee8aa', '98fb98', 'afeeee', 'db7093', 'ffefd5', 'ffdab9', 'cd853f', 'ffc0cb', 'dda0dd', 'b0e0e6', '800080', '663399', 'ff0000', 'bc8f8f', '4169e1', '8b4513', 'fa8072', 'f4a460', '2e8b57', 'fff5ee', 'a0522d', 'c0c0c0', '87ceeb', '6a5acd', '708090', '708090', 'fffafa', '00ff7f', '4682b4', 'd2b48c', '008080', 'd8bfd8', 'ff6347', '40e0d0', 'ee82ee', 'f5deb3', 'ffffff', 'f5f5f5', 'ffff00', '9acd32'];
  const nameLower = name.toLowerCase();
  const findIndx = colorName.findIndex(n => n.toLowerCase() === nameLower);
  if (findIndx !== -1) hex = colorHex[findIndx];
  return hex
}

function getFillType(node) {
  let fillType = '';
  if (node['a:noFill']) fillType = 'NO_FILL';
  if (node['a:solidFill']) fillType = 'SOLID_FILL';
  if (node['a:gradFill']) fillType = 'GRADIENT_FILL';
  if (node['a:pattFill']) fillType = 'PATTERN_FILL';
  if (node['a:blipFill']) fillType = 'PIC_FILL';
  if (node['a:grpFill']) fillType = 'GROUP_FILL';

  return fillType
}

async function getPicFill(type, node, warpObj) {
  if (!node) return ''

  let img;
  const rId = getTextByPathList(node, ['a:blip', 'attrs', 'r:embed']);
  let imgPath;
  if (type === 'slideBg' || type === 'slide') {
    imgPath = getTextByPathList(warpObj, ['slideResObj', rId, 'target']);
  }
  else if (type === 'slideLayoutBg') {
    imgPath = getTextByPathList(warpObj, ['layoutResObj', rId, 'target']);
  }
  else if (type === 'slideMasterBg') {
    imgPath = getTextByPathList(warpObj, ['masterResObj', rId, 'target']);
  }
  else if (type === 'themeBg') {
    imgPath = getTextByPathList(warpObj, ['themeResObj', rId, 'target']);
  }
  else if (type === 'diagramBg') {
    imgPath = getTextByPathList(warpObj, ['diagramResObj', rId, 'target']);
  }
  if (!imgPath) return imgPath

  img = getTextByPathList(warpObj, ['loaded-images', imgPath]);
  if (!img) {
    imgPath = escapeHtml(imgPath);

    const imgExt = imgPath.split('.').pop();
    if (imgExt === 'xml') return ''

    const imgArrayBuffer = await warpObj['zip'].file(imgPath).async('arraybuffer');
    const imgMimeType = getMimeType(imgExt);
    img = `data:${imgMimeType};base64,${base64ArrayBuffer(imgArrayBuffer)}`;

    const loadedImages = warpObj['loaded-images'] || {};
    loadedImages[imgPath] = img;
    warpObj['loaded-images'] = loadedImages;
  }
  return img
}

function getPicFillOpacity(node) {
  const aBlipNode = node['a:blip'];

  const aphaModFixNode = getTextByPathList(aBlipNode, ['a:alphaModFix', 'attrs']);
  let opacity = 1;
  if (aphaModFixNode && aphaModFixNode['amt'] && aphaModFixNode['amt'] !== '') {
    opacity = parseInt(aphaModFixNode['amt']) / 100000;
  }

  return opacity
}

function getPicFilters(node) {
  if (!node) return null

  const aBlipNode = node['a:blip'];
  if (!aBlipNode) return null

  const filters = {};

  // 从a:extLst中获取滤镜效果（Microsoft Office 2010+扩展）
  const extLstNode = aBlipNode['a:extLst'];
  if (extLstNode && extLstNode['a:ext']) {
    const extNodes = Array.isArray(extLstNode['a:ext']) ? extLstNode['a:ext'] : [extLstNode['a:ext']];

    for (const extNode of extNodes) {
      if (!extNode['a14:imgProps'] || !extNode['a14:imgProps']['a14:imgLayer']) continue

      const imgLayerNode = extNode['a14:imgProps']['a14:imgLayer'];
      const imgEffects = imgLayerNode['a14:imgEffect'];

      if (!imgEffects) continue

      const effectArray = Array.isArray(imgEffects) ? imgEffects : [imgEffects];

      for (const effect of effectArray) {
        // 饱和度
        if (effect['a14:saturation']) {
          const satAttr = getTextByPathList(effect, ['a14:saturation', 'attrs', 'sat']);
          if (satAttr) {
            filters.saturation = parseInt(satAttr) / 100000;
          }
        }

        // 亮度、对比度
        if (effect['a14:brightnessContrast']) {
          const brightAttr = getTextByPathList(effect, ['a14:brightnessContrast', 'attrs', 'bright']);
          const contrastAttr = getTextByPathList(effect, ['a14:brightnessContrast', 'attrs', 'contrast']);

          if (brightAttr) {
            filters.brightness = parseInt(brightAttr) / 100000;
          }
          if (contrastAttr) {
            filters.contrast = parseInt(contrastAttr) / 100000;
          }
        }

        // 锐化/柔化
        if (effect['a14:sharpenSoften']) {
          const amountAttr = getTextByPathList(effect, ['a14:sharpenSoften', 'attrs', 'amount']);
          if (amountAttr) {
            const amount = parseInt(amountAttr) / 100000;
            if (amount > 0) {
              filters.sharpen = amount;
            }
            else {
              filters.soften = Math.abs(amount);
            }
          }
        }

        // 色温
        if (effect['a14:colorTemperature']) {
          const tempAttr = getTextByPathList(effect, ['a14:colorTemperature', 'attrs', 'colorTemp']);
          if (tempAttr) {
            filters.colorTemperature = parseInt(tempAttr);
          }
        }
      }
    }
  }

  return Object.keys(filters).length > 0 ? filters : null
}

async function getBgPicFill(bgPr, sorce, warpObj) {
  const picBase64 = await getPicFill(sorce, bgPr['a:blipFill'], warpObj);
  const aBlipNode = bgPr['a:blipFill']['a:blip'];

  const aphaModFixNode = getTextByPathList(aBlipNode, ['a:alphaModFix', 'attrs']);
  let opacity = 1;
  if (aphaModFixNode && aphaModFixNode['amt'] && aphaModFixNode['amt'] !== '') {
    opacity = parseInt(aphaModFixNode['amt']) / 100000;
  }

  return {
    picBase64,
    opacity,
  }
}

function getGradientFill(node, warpObj) {
  const gsLst = node['a:gsLst']['a:gs'];
  const colors = [];
  for (let i = 0; i < gsLst.length; i++) {
    const lo_color = getSolidFill(gsLst[i], undefined, undefined, warpObj);
    const pos = getTextByPathList(gsLst[i], ['attrs', 'pos']);

    colors[i] = {
      pos: pos ? (pos / 1000 + '%') : '',
      color: lo_color,
    };
  }
  const lin = node['a:lin'];
  let rot = 0;
  let pathType = 'line';
  if (lin) rot = angleToDegrees(lin['attrs']['ang']);
  else {
    const path = node['a:path'];
    if (path && path['attrs'] && path['attrs']['path']) pathType = path['attrs']['path'];
  }
  return {
    rot,
    path: pathType,
    colors: colors.sort((a, b) => parseInt(a.pos) - parseInt(b.pos)),
  }
}

function getPatternFill(node, warpObj) {
  if (!node) return null

  const pattFill = node['a:pattFill'];
  if (!pattFill) return null

  const type = getTextByPathList(pattFill, ['attrs', 'prst']);

  const fgColorNode = pattFill['a:fgClr'];
  const bgColorNode = pattFill['a:bgClr'];

  let foregroundColor = '#000000';
  let backgroundColor = '#FFFFFF';

  if (fgColorNode) {
    foregroundColor = getSolidFill(fgColorNode, undefined, undefined, warpObj);
  }

  if (bgColorNode) {
    backgroundColor = getSolidFill(bgColorNode, undefined, undefined, warpObj);
  }

  return {
    type,
    foregroundColor,
    backgroundColor,
  }
}

function getBgGradientFill(bgPr, phClr, slideMasterContent, warpObj) {
  if (bgPr) {
    const grdFill = bgPr['a:gradFill'];
    const gsLst = grdFill['a:gsLst']['a:gs'];
    const colors = [];
    
    for (let i = 0; i < gsLst.length; i++) {
      const lo_color = getSolidFill(gsLst[i], slideMasterContent['p:sldMaster']['p:clrMap']['attrs'], phClr, warpObj);
      const pos = getTextByPathList(gsLst[i], ['attrs', 'pos']);

      colors[i] = {
        pos: pos ? (pos / 1000 + '%') : '',
        color: lo_color,
      };
    }
    const lin = grdFill['a:lin'];
    let rot = 0;
    let pathType = 'line';
    if (lin) rot = angleToDegrees(lin['attrs']['ang']) + 0;
    else {
      const path = grdFill['a:path'];
      if (path && path['attrs'] && path['attrs']['path']) pathType = path['attrs']['path']; 
    }
    return {
      rot,
      path: pathType,
      colors: colors.sort((a, b) => parseInt(a.pos) - parseInt(b.pos)),
    }
  }
  else if (phClr) {
    return phClr.indexOf('#') === -1 ? `#${phClr}` : phClr
  }
  return null
}

async function getSlideBackgroundFill(warpObj) {
  const slideContent = warpObj['slideContent'];
  const slideLayoutContent = warpObj['slideLayoutContent'];
  const slideMasterContent = warpObj['slideMasterContent'];
  
  let bgPr = getTextByPathList(slideContent, ['p:sld', 'p:cSld', 'p:bg', 'p:bgPr']);
  let bgRef = getTextByPathList(slideContent, ['p:sld', 'p:cSld', 'p:bg', 'p:bgRef']);

  let background = '#fff';
  let backgroundType = 'color';

  if (bgPr) {
    const bgFillTyp = getFillType(bgPr);

    if (bgFillTyp === 'SOLID_FILL') {
      const sldFill = bgPr['a:solidFill'];
      let clrMapOvr;
      const sldClrMapOvr = getTextByPathList(slideContent, ['p:sld', 'p:clrMapOvr', 'a:overrideClrMapping', 'attrs']);
      if (sldClrMapOvr) clrMapOvr = sldClrMapOvr;
      else {
        const sldClrMapOvr = getTextByPathList(slideLayoutContent, ['p:sldLayout', 'p:clrMapOvr', 'a:overrideClrMapping', 'attrs']);
        if (sldClrMapOvr) clrMapOvr = sldClrMapOvr;
        else clrMapOvr = getTextByPathList(slideMasterContent, ['p:sldMaster', 'p:clrMap', 'attrs']);
      }
      const sldBgClr = getSolidFill(sldFill, clrMapOvr, undefined, warpObj);
      background = sldBgClr;
    }
    else if (bgFillTyp === 'GRADIENT_FILL') {
      const gradientFill = getBgGradientFill(bgPr, undefined, slideMasterContent, warpObj);
      if (typeof gradientFill === 'string') {
        background = gradientFill;
      }
      else if (gradientFill) {
        background = gradientFill;
        backgroundType = 'gradient';
      }
    }
    else if (bgFillTyp === 'PIC_FILL') {
      background = await getBgPicFill(bgPr, 'slideBg', warpObj);
      backgroundType = 'image';
    }
    else if (bgFillTyp === 'PATTERN_FILL') {
      const patternFill = getPatternFill(bgPr, warpObj);
      if (patternFill) {
        background = patternFill;
        backgroundType = 'pattern';
      }
    }
  }
  else if (bgRef) {
    let clrMapOvr;
    const sldClrMapOvr = getTextByPathList(slideContent, ['p:sld', 'p:clrMapOvr', 'a:overrideClrMapping', 'attrs']);
    if (sldClrMapOvr) clrMapOvr = sldClrMapOvr;
    else {
      const sldClrMapOvr = getTextByPathList(slideLayoutContent, ['p:sldLayout', 'p:clrMapOvr', 'a:overrideClrMapping', 'attrs']);
      if (sldClrMapOvr) clrMapOvr = sldClrMapOvr;
      else clrMapOvr = getTextByPathList(slideMasterContent, ['p:sldMaster', 'p:clrMap', 'attrs']);
    }
    const phClr = getSolidFill(bgRef, clrMapOvr, undefined, warpObj);
    const idx = Number(bgRef['attrs']['idx']);

    if (idx > 1000) {
      const trueIdx = idx - 1000;
      const bgFillLst = warpObj['themeContent']['a:theme']['a:themeElements']['a:fmtScheme']['a:bgFillStyleLst'];
      const sortblAry = [];
      Object.keys(bgFillLst).forEach(key => {
        const bgFillLstTyp = bgFillLst[key];
        if (key !== 'attrs') {
          if (bgFillLstTyp.constructor === Array) {
            for (let i = 0; i < bgFillLstTyp.length; i++) {
              const obj = {};
              obj[key] = bgFillLstTyp[i];
              if (bgFillLstTyp[i]['attrs']) {
                obj['idex'] = bgFillLstTyp[i]['attrs']['order'];
                obj['attrs'] = {
                  'order': bgFillLstTyp[i]['attrs']['order']
                };
              }
              sortblAry.push(obj);
            }
          } 
          else {
            const obj = {};
            obj[key] = bgFillLstTyp;
            if (bgFillLstTyp['attrs']) {
              obj['idex'] = bgFillLstTyp['attrs']['order'];
              obj['attrs'] = {
                'order': bgFillLstTyp['attrs']['order']
              };
            }
            sortblAry.push(obj);
          }
        }
      });
      const sortByOrder = sortblAry.slice(0);
      sortByOrder.sort((a, b) => a.idex - b.idex);
      const bgFillLstIdx = sortByOrder[trueIdx - 1];
      const bgFillTyp = getFillType(bgFillLstIdx);
      if (bgFillTyp === 'SOLID_FILL') {
        const sldFill = bgFillLstIdx['a:solidFill'];
        const sldBgClr = getSolidFill(sldFill, clrMapOvr, undefined, warpObj);
        background = sldBgClr;
      } 
      else if (bgFillTyp === 'GRADIENT_FILL') {
        const gradientFill = getBgGradientFill(bgFillLstIdx, phClr, slideMasterContent, warpObj);
        if (typeof gradientFill === 'string') {
          background = gradientFill;
        }
        else if (gradientFill) {
          background = gradientFill;
          backgroundType = 'gradient';
        }
      }
    }
  }
  else {
    bgPr = getTextByPathList(slideLayoutContent, ['p:sldLayout', 'p:cSld', 'p:bg', 'p:bgPr']);
    bgRef = getTextByPathList(slideLayoutContent, ['p:sldLayout', 'p:cSld', 'p:bg', 'p:bgRef']);

    let clrMapOvr;
    const sldClrMapOvr = getTextByPathList(slideLayoutContent, ['p:sldLayout', 'p:clrMapOvr', 'a:overrideClrMapping', 'attrs']);
    if (sldClrMapOvr) clrMapOvr = sldClrMapOvr;
    else clrMapOvr = getTextByPathList(slideMasterContent, ['p:sldMaster', 'p:clrMap', 'attrs']);

    if (bgPr) {
      const bgFillTyp = getFillType(bgPr);
      if (bgFillTyp === 'SOLID_FILL') {
        const sldFill = bgPr['a:solidFill'];
        const sldBgClr = getSolidFill(sldFill, clrMapOvr, undefined, warpObj);
        background = sldBgClr;
      }
      else if (bgFillTyp === 'GRADIENT_FILL') {
        const gradientFill = getBgGradientFill(bgPr, undefined, slideMasterContent, warpObj);
        if (typeof gradientFill === 'string') {
          background = gradientFill;
        }
        else if (gradientFill) {
          background = gradientFill;
          backgroundType = 'gradient';
        }
      }
      else if (bgFillTyp === 'PIC_FILL') {
        background = await getBgPicFill(bgPr, 'slideLayoutBg', warpObj);
        backgroundType = 'image';
      }
      else if (bgFillTyp === 'PATTERN_FILL') {
        const patternFill = getPatternFill(bgPr, warpObj);
        if (patternFill) {
          background = patternFill;
          backgroundType = 'pattern';
        }
      }
    }
    else if (bgRef) {
      const phClr = getSolidFill(bgRef, clrMapOvr, undefined, warpObj);
      const idx = Number(bgRef['attrs']['idx']);
  
      if (idx > 1000) {
        const trueIdx = idx - 1000;
        const bgFillLst = warpObj['themeContent']['a:theme']['a:themeElements']['a:fmtScheme']['a:bgFillStyleLst'];
        const sortblAry = [];
        Object.keys(bgFillLst).forEach(key => {
          const bgFillLstTyp = bgFillLst[key];
          if (key !== 'attrs') {
            if (bgFillLstTyp.constructor === Array) {
              for (let i = 0; i < bgFillLstTyp.length; i++) {
                const obj = {};
                obj[key] = bgFillLstTyp[i];
                if (bgFillLstTyp[i]['attrs']) {
                  obj['idex'] = bgFillLstTyp[i]['attrs']['order'];
                  obj['attrs'] = {
                    'order': bgFillLstTyp[i]['attrs']['order']
                  };
                }
                sortblAry.push(obj);
              }
            } 
            else {
              const obj = {};
              obj[key] = bgFillLstTyp;
              if (bgFillLstTyp['attrs']) {
                obj['idex'] = bgFillLstTyp['attrs']['order'];
                obj['attrs'] = {
                  'order': bgFillLstTyp['attrs']['order']
                };
              }
              sortblAry.push(obj);
            }
          }
        });
        const sortByOrder = sortblAry.slice(0);
        sortByOrder.sort((a, b) => a.idex - b.idex);
        const bgFillLstIdx = sortByOrder[trueIdx - 1];
        const bgFillTyp = getFillType(bgFillLstIdx);
        if (bgFillTyp === 'SOLID_FILL') {
          const sldFill = bgFillLstIdx['a:solidFill'];
          const sldBgClr = getSolidFill(sldFill, clrMapOvr, undefined, warpObj);
          background = sldBgClr;
        }
        else if (bgFillTyp === 'GRADIENT_FILL') {
          const gradientFill = getBgGradientFill(bgFillLstIdx, phClr, slideMasterContent, warpObj);
          if (typeof gradientFill === 'string') {
            background = gradientFill;
          }
          else if (gradientFill) {
            background = gradientFill;
            backgroundType = 'gradient';
          }
        }
        else if (bgFillTyp === 'PIC_FILL') {
          background = await getBgPicFill(bgFillLstIdx, 'themeBg', warpObj);
          backgroundType = 'image';
        }
        else if (bgFillTyp === 'PATTERN_FILL') {
          const patternFill = getPatternFill(bgFillLstIdx, warpObj);
          if (patternFill) {
            background = patternFill;
            backgroundType = 'pattern';
          }
        }
      }
    }
    else {
      bgPr = getTextByPathList(slideMasterContent, ['p:sldMaster', 'p:cSld', 'p:bg', 'p:bgPr']);
      bgRef = getTextByPathList(slideMasterContent, ['p:sldMaster', 'p:cSld', 'p:bg', 'p:bgRef']);

      const clrMap = getTextByPathList(slideMasterContent, ['p:sldMaster', 'p:clrMap', 'attrs']);
      if (bgPr) {
        const bgFillTyp = getFillType(bgPr);
        if (bgFillTyp === 'SOLID_FILL') {
          const sldFill = bgPr['a:solidFill'];
          const sldBgClr = getSolidFill(sldFill, clrMap, undefined, warpObj);
          background = sldBgClr;
        }
        else if (bgFillTyp === 'GRADIENT_FILL') {
          const gradientFill = getBgGradientFill(bgPr, undefined, slideMasterContent, warpObj);
          if (typeof gradientFill === 'string') {
            background = gradientFill;
          }
          else if (gradientFill) {
            background = gradientFill;
            backgroundType = 'gradient';
          }
        }
        else if (bgFillTyp === 'PIC_FILL') {
          background = await getBgPicFill(bgPr, 'slideMasterBg', warpObj);
          backgroundType = 'image';
        }
        else if (bgFillTyp === 'PATTERN_FILL') {
          const patternFill = getPatternFill(bgPr, warpObj);
          if (patternFill) {
            background = patternFill;
            backgroundType = 'pattern';
          }
        }
      }
      else if (bgRef) {
        const phClr = getSolidFill(bgRef, clrMap, undefined, warpObj);
        const idx = Number(bgRef['attrs']['idx']);
    
        if (idx > 1000) {
          const trueIdx = idx - 1000;
          const bgFillLst = warpObj['themeContent']['a:theme']['a:themeElements']['a:fmtScheme']['a:bgFillStyleLst'];
          const sortblAry = [];
          Object.keys(bgFillLst).forEach(key => {
            const bgFillLstTyp = bgFillLst[key];
            if (key !== 'attrs') {
              if (bgFillLstTyp.constructor === Array) {
                for (let i = 0; i < bgFillLstTyp.length; i++) {
                  const obj = {};
                  obj[key] = bgFillLstTyp[i];
                  if (bgFillLstTyp[i]['attrs']) {
                    obj['idex'] = bgFillLstTyp[i]['attrs']['order'];
                    obj['attrs'] = {
                      'order': bgFillLstTyp[i]['attrs']['order']
                    };
                  }
                  sortblAry.push(obj);
                }
              } 
              else {
                const obj = {};
                obj[key] = bgFillLstTyp;
                if (bgFillLstTyp['attrs']) {
                  obj['idex'] = bgFillLstTyp['attrs']['order'];
                  obj['attrs'] = {
                    'order': bgFillLstTyp['attrs']['order']
                  };
                }
                sortblAry.push(obj);
              }
            }
          });
          const sortByOrder = sortblAry.slice(0);
          sortByOrder.sort((a, b) => a.idex - b.idex);
          const bgFillLstIdx = sortByOrder[trueIdx - 1];
          const bgFillTyp = getFillType(bgFillLstIdx);
          if (bgFillTyp === 'SOLID_FILL') {
            const sldFill = bgFillLstIdx['a:solidFill'];
            const sldBgClr = getSolidFill(sldFill, clrMapOvr, undefined, warpObj);
            background = sldBgClr;
          }
          else if (bgFillTyp === 'GRADIENT_FILL') {
            const gradientFill = getBgGradientFill(bgFillLstIdx, phClr, slideMasterContent, warpObj);
            if (typeof gradientFill === 'string') {
              background = gradientFill;
            }
            else if (gradientFill) {
              background = gradientFill;
              backgroundType = 'gradient';
            }
          }
          else if (bgFillTyp === 'PIC_FILL') {
            background = await getBgPicFill(bgFillLstIdx, 'themeBg', warpObj);
            backgroundType = 'image';
          }
          else if (bgFillTyp === 'PATTERN_FILL') {
            const patternFill = getPatternFill(bgFillLstIdx, warpObj);
            if (patternFill) {
              background = patternFill;
              backgroundType = 'pattern';
            }
          }
        }
      }
    }
  }
  return {
    type: backgroundType,
    value: background,
  }
}

async function getShapeFill(node, warpObj, source, groupHierarchy = []) {
  const fillType = getFillType(getTextByPathList(node, ['p:spPr']));
  let type = 'color';
  let fillValue = '';
  if (fillType === 'NO_FILL') {
    return null
  }
  else if (fillType === 'SOLID_FILL') {
    const shpFill = node['p:spPr']['a:solidFill'];
    fillValue = getSolidFill(shpFill, undefined, undefined, warpObj);
    type = 'color';
  }
  else if (fillType === 'GRADIENT_FILL') {
    const shpFill = node['p:spPr']['a:gradFill'];
    fillValue = getGradientFill(shpFill, warpObj);
    type = 'gradient';
  }
  else if (fillType === 'PIC_FILL') {
    const shpFill = node['p:spPr']['a:blipFill'];
    const picBase64 = await getPicFill(source, shpFill, warpObj);
    const opacity = getPicFillOpacity(shpFill);
    fillValue = {
      picBase64,
      opacity,
    };
    type = 'image';
  }
  else if (fillType === 'PATTERN_FILL') {
    const shpFill = node['p:spPr']['a:pattFill'];
    fillValue = getPatternFill({ 'a:pattFill': shpFill }, warpObj);
    type = 'pattern';
  }
  else if (fillType === 'GROUP_FILL') {
    return findFillInGroupHierarchy(groupHierarchy, warpObj, source)
  }
  if (!fillValue) {
    const clrName = getTextByPathList(node, ['p:style', 'a:fillRef']);
    fillValue = getSolidFill(clrName, undefined, undefined, warpObj);
    type = 'color';
  }
  if (!fillValue) {
    return null
  }

  return {
    type,
    value: fillValue,
  }
}

async function findFillInGroupHierarchy(groupHierarchy, warpObj, source) {
  for (const groupNode of groupHierarchy) {
    if (!groupNode || !groupNode['p:grpSpPr']) continue

    const grpSpPr = groupNode['p:grpSpPr'];
    const fillType = getFillType(grpSpPr);

    if (fillType === 'SOLID_FILL') {
      const shpFill = grpSpPr['a:solidFill'];
      const fillValue = getSolidFill(shpFill, undefined, undefined, warpObj);
      if (fillValue) {
        return {
          type: 'color',
          value: fillValue,
        }
      }
    }
    else if (fillType === 'GRADIENT_FILL') {
      const shpFill = grpSpPr['a:gradFill'];
      const fillValue = getGradientFill(shpFill, warpObj);
      if (fillValue) {
        return {
          type: 'gradient',
          value: fillValue,
        }
      }
    }
    else if (fillType === 'PIC_FILL') {
      const shpFill = grpSpPr['a:blipFill'];
      const picBase64 = await getPicFill(source, shpFill, warpObj);
      const opacity = getPicFillOpacity(shpFill);
      if (picBase64) {
        return {
          type: 'image',
          value: {
            picBase64,
            opacity,
          },
        }
      }
    }
    else if (fillType === 'PATTERN_FILL') {
      const shpFill = grpSpPr['a:pattFill'];
      const fillValue = getPatternFill({ 'a:pattFill': shpFill }, warpObj);
      if (fillValue) {
        return {
          type: 'pattern',
          value: fillValue,
        }
      }
    }
  }

  return null
}

function getSolidFill(solidFill, clrMap, phClr, warpObj) {
  if (!solidFill) return ''

  let color = '';
  let clrNode;

  if (solidFill['a:srgbClr']) {
    clrNode = solidFill['a:srgbClr'];
    color = getTextByPathList(clrNode, ['attrs', 'val']);
  } 
  else if (solidFill['a:schemeClr']) {
    clrNode = solidFill['a:schemeClr'];
    const schemeClr = 'a:' + getTextByPathList(clrNode, ['attrs', 'val']);
    color = getSchemeColorFromTheme(schemeClr, warpObj, clrMap, phClr) || '';
  }
  else if (solidFill['a:scrgbClr']) {
    clrNode = solidFill['a:scrgbClr'];
    const defBultColorVals = clrNode['attrs'];
    const red = (defBultColorVals['r'].indexOf('%') !== -1) ? defBultColorVals['r'].split('%').shift() : defBultColorVals['r'];
    const green = (defBultColorVals['g'].indexOf('%') !== -1) ? defBultColorVals['g'].split('%').shift() : defBultColorVals['g'];
    const blue = (defBultColorVals['b'].indexOf('%') !== -1) ? defBultColorVals['b'].split('%').shift() : defBultColorVals['b'];
    color = toHex$1(255 * (Number(red) / 100)) + toHex$1(255 * (Number(green) / 100)) + toHex$1(255 * (Number(blue) / 100));
  } 
  else if (solidFill['a:prstClr']) {
    clrNode = solidFill['a:prstClr'];
    const prstClr = getTextByPathList(clrNode, ['attrs', 'val']);
    color = getColorName2Hex(prstClr);
  } 
  else if (solidFill['a:hslClr']) {
    clrNode = solidFill['a:hslClr'];
    const defBultColorVals = clrNode['attrs'];
    const hue = Number(defBultColorVals['hue']) / 100000;
    const sat = Number((defBultColorVals['sat'].indexOf('%') !== -1) ? defBultColorVals['sat'].split('%').shift() : defBultColorVals['sat']) / 100;
    const lum = Number((defBultColorVals['lum'].indexOf('%') !== -1) ? defBultColorVals['lum'].split('%').shift() : defBultColorVals['lum']) / 100;
    const hsl2rgb = hslToRgb$1(hue, sat, lum);
    color = toHex$1(hsl2rgb.r) + toHex$1(hsl2rgb.g) + toHex$1(hsl2rgb.b);
  } 
  else if (solidFill['a:sysClr']) {
    clrNode = solidFill['a:sysClr'];
    const sysClr = getTextByPathList(clrNode, ['attrs', 'lastClr']);
    if (sysClr) color = sysClr;
  }

  let isAlpha = false;
  const alpha = parseInt(getTextByPathList(clrNode, ['a:alpha', 'attrs', 'val'])) / 100000;
  if (!isNaN(alpha)) {
    const al_color = tinycolor(color);
    al_color.setAlpha(alpha);
    color = al_color.toHex8();
    isAlpha = true;
  }

  const hueMod = parseInt(getTextByPathList(clrNode, ['a:hueMod', 'attrs', 'val'])) / 100000;
  if (!isNaN(hueMod)) {
    color = applyHueMod(color, hueMod, isAlpha);
  }
  const lumMod = parseInt(getTextByPathList(clrNode, ['a:lumMod', 'attrs', 'val'])) / 100000;
  if (!isNaN(lumMod)) {
    color = applyLumMod(color, lumMod, isAlpha);
  }
  const lumOff = parseInt(getTextByPathList(clrNode, ['a:lumOff', 'attrs', 'val'])) / 100000;
  if (!isNaN(lumOff)) {
    color = applyLumOff(color, lumOff, isAlpha);
  }
  const satMod = parseInt(getTextByPathList(clrNode, ['a:satMod', 'attrs', 'val'])) / 100000;
  if (!isNaN(satMod)) {
    color = applySatMod(color, satMod, isAlpha);
  }
  const shade = parseInt(getTextByPathList(clrNode, ['a:shade', 'attrs', 'val'])) / 100000;
  if (!isNaN(shade)) {
    color = applyShade(color, shade, isAlpha);
  }
  const tint = parseInt(getTextByPathList(clrNode, ['a:tint', 'attrs', 'val'])) / 100000;
  if (!isNaN(tint)) {
    color = applyTint(color, tint, isAlpha);
  }

  if (color && color.indexOf('#') === -1) color = '#' + color;

  return color
}

function extractChartColors(serNode, warpObj) {
  if (serNode.constructor !== Array) serNode = [serNode];
  const schemeClrs = [];
  for (const node of serNode) {
    let schemeClr = getTextByPathList(node, ['c:spPr', 'a:solidFill', 'a:schemeClr']);
    if (!schemeClr) schemeClr = getTextByPathList(node, ['c:spPr', 'a:ln', 'a:solidFill', 'a:schemeClr']);
    if (!schemeClr) schemeClr = getTextByPathList(node, ['c:marker', 'c:spPr', 'a:ln', 'a:solidFill', 'a:schemeClr']);

    let clr = getTextByPathList(schemeClr, ['attrs', 'val']);
    if (clr) {
      clr = getTextByPathList(warpObj['themeContent'], ['a:theme', 'a:themeElements', 'a:clrScheme', `a:${clr}`, 'a:srgbClr', 'attrs', 'val']);
      const tint = getTextByPathList(schemeClr, ['a:tint', 'attrs', 'val']) / 100000;
      if (clr && !isNaN(tint)) {
        clr = applyTint(clr, tint);
      }
    }
    else clr = getTextByPathList(node, ['c:spPr', 'a:solidFill', 'a:srgbClr', 'attrs', 'val']);

    if (clr) clr = '#' + clr;
    schemeClrs.push(clr);
  }
  return schemeClrs
}

function extractChartData(serNode) {
  const dataMat = [];
  if (!serNode) return dataMat

  if (serNode['c:xVal']) {
    let dataRow = [];
    eachElement(serNode['c:xVal']['c:numRef']['c:numCache']['c:pt'], innerNode => {
      dataRow.push(parseFloat(innerNode['c:v']));
      return ''
    });
    dataMat.push(dataRow);
    dataRow = [];
    eachElement(serNode['c:yVal']['c:numRef']['c:numCache']['c:pt'], innerNode => {
      dataRow.push(parseFloat(innerNode['c:v']));
      return ''
    });
    dataMat.push(dataRow);
  } 
  else {
    eachElement(serNode, (innerNode, index) => {
      const dataRow = [];
      const colName = getTextByPathList(innerNode, ['c:tx', 'c:strRef', 'c:strCache', 'c:pt', 'c:v']) || index;

      const rowNames = {};
      if (getTextByPathList(innerNode, ['c:cat', 'c:strRef', 'c:strCache', 'c:pt'])) {
        eachElement(innerNode['c:cat']['c:strRef']['c:strCache']['c:pt'], innerNode => {
          rowNames[innerNode['attrs']['idx']] = innerNode['c:v'];
          return ''
        });
      } 
      else if (getTextByPathList(innerNode, ['c:cat', 'c:numRef', 'c:numCache', 'c:pt'])) {
        eachElement(innerNode['c:cat']['c:numRef']['c:numCache']['c:pt'], innerNode => {
          rowNames[innerNode['attrs']['idx']] = innerNode['c:v'];
          return ''
        });
      }

      if (getTextByPathList(innerNode, ['c:val', 'c:numRef', 'c:numCache', 'c:pt'])) {
        eachElement(innerNode['c:val']['c:numRef']['c:numCache']['c:pt'], innerNode => {
          dataRow.push({
            x: innerNode['attrs']['idx'],
            y: parseFloat(innerNode['c:v']),
          });
          return ''
        });
      }

      dataMat.push({
        key: colName,
        values: dataRow,
        xlabels: rowNames,
      });
      return ''
    });
  }

  return dataMat
}

function getChartInfo(plotArea, warpObj) {
  let chart = null;
  for (const key in plotArea) {
    switch (key) {
      case 'c:lineChart':
        chart = {
          type: 'lineChart',
          data: extractChartData(plotArea[key]['c:ser']),
          colors: extractChartColors(plotArea[key]['c:ser'], warpObj),
          grouping: getTextByPathList(plotArea[key], ['c:grouping', 'attrs', 'val']),
          marker: plotArea[key]['c:marker'] ? true : false,
        };
        break
      case 'c:line3DChart':
        chart = {
          type: 'line3DChart',
          data: extractChartData(plotArea[key]['c:ser']),
          colors: extractChartColors(plotArea[key]['c:ser'], warpObj),
          grouping: getTextByPathList(plotArea[key], ['c:grouping', 'attrs', 'val']),
        };
        break
      case 'c:barChart':
        chart = {
          type: 'barChart',
          data: extractChartData(plotArea[key]['c:ser']),
          colors: extractChartColors(plotArea[key]['c:ser'], warpObj),
          grouping: getTextByPathList(plotArea[key], ['c:grouping', 'attrs', 'val']),
          barDir: getTextByPathList(plotArea[key], ['c:barDir', 'attrs', 'val']),
        };
        break
      case 'c:bar3DChart':
        chart = {
          type: 'bar3DChart',
          data: extractChartData(plotArea[key]['c:ser']),
          colors: extractChartColors(plotArea[key]['c:ser'], warpObj),
          grouping: getTextByPathList(plotArea[key], ['c:grouping', 'attrs', 'val']),
          barDir: getTextByPathList(plotArea[key], ['c:barDir', 'attrs', 'val']),
        };
        break
      case 'c:pieChart':
        chart = {
          type: 'pieChart',
          data: extractChartData(plotArea[key]['c:ser']),
          colors: extractChartColors(plotArea[key]['c:ser']['c:dPt'], warpObj),
        };
        break
      case 'c:pie3DChart':
        chart = {
          type: 'pie3DChart',
          data: extractChartData(plotArea[key]['c:ser']),
          colors: extractChartColors(plotArea[key]['c:ser']['c:dPt'], warpObj),
        };
        break
      case 'c:doughnutChart':
        chart = {
          type: 'doughnutChart',
          data: extractChartData(plotArea[key]['c:ser']),
          colors: extractChartColors(plotArea[key]['c:ser']['c:dPt'], warpObj),
          holeSize: getTextByPathList(plotArea[key], ['c:holeSize', 'attrs', 'val']),
        };
        break
      case 'c:areaChart':
        chart = {
          type: 'areaChart',
          data: extractChartData(plotArea[key]['c:ser']),
          colors: extractChartColors(plotArea[key]['c:ser'], warpObj),
          grouping: getTextByPathList(plotArea[key], ['c:grouping', 'attrs', 'val']),
        };
        break
      case 'c:area3DChart':
        chart = {
          type: 'area3DChart',
          data: extractChartData(plotArea[key]['c:ser']),
          colors: extractChartColors(plotArea[key]['c:ser'], warpObj),
          grouping: getTextByPathList(plotArea[key], ['c:grouping', 'attrs', 'val']),
        };
        break
      case 'c:scatterChart':
        chart = {
          type: 'scatterChart',
          data: extractChartData(plotArea[key]['c:ser']),
          colors: extractChartColors(plotArea[key]['c:ser'], warpObj),
          style: getTextByPathList(plotArea[key], ['c:scatterStyle', 'attrs', 'val']),
        };
        break
      case 'c:bubbleChart':
        chart = {
          type: 'bubbleChart',
          data: extractChartData(plotArea[key]['c:ser']),
          colors: extractChartColors(plotArea[key]['c:ser'], warpObj),
        };
        break
      case 'c:radarChart':
        chart = {
          type: 'radarChart',
          data: extractChartData(plotArea[key]['c:ser']),
          colors: extractChartColors(plotArea[key]['c:ser'], warpObj),
          style: getTextByPathList(plotArea[key], ['c:radarStyle', 'attrs', 'val']),
        };
        break
      case 'c:surfaceChart':
        chart = {
          type: 'surfaceChart',
          data: extractChartData(plotArea[key]['c:ser']),
          colors: extractChartColors(plotArea[key]['c:ser'], warpObj),
        };
        break
      case 'c:surface3DChart':
        chart = {
          type: 'surface3DChart',
          data: extractChartData(plotArea[key]['c:ser']),
          colors: extractChartColors(plotArea[key]['c:ser'], warpObj),
        };
        break
      case 'c:stockChart':
        chart = {
          type: 'stockChart',
          data: extractChartData(plotArea[key]['c:ser']),
          colors: [],
        };
        break
    }
  }

  return chart
}

function getHorizontalAlign(node, pNode, type, warpObj) {
  let algn = getTextByPathList(node, ['a:pPr', 'attrs', 'algn']);
  if (!algn) algn = getTextByPathList(pNode, ['a:pPr', 'attrs', 'algn']);

  if (!algn) {
    if (type === 'title' || type === 'ctrTitle' || type === 'subTitle') {
      let lvlIdx = 1;
      const lvlNode = getTextByPathList(pNode, ['a:pPr', 'attrs', 'lvl']);
      if (lvlNode) {
        lvlIdx = parseInt(lvlNode) + 1;
      }
      const lvlStr = 'a:lvl' + lvlIdx + 'pPr';
      algn = getTextByPathList(warpObj, ['slideLayoutTables', 'typeTable', type, 'p:txBody', 'a:lstStyle', lvlStr, 'attrs', 'algn']);
      if (!algn) algn = getTextByPathList(warpObj, ['slideMasterTables', 'typeTable', type, 'p:txBody', 'a:lstStyle', lvlStr, 'attrs', 'algn']);
      if (!algn) algn = getTextByPathList(warpObj, ['slideMasterTextStyles', 'p:titleStyle', lvlStr, 'attrs', 'algn']);
      if (!algn && type === 'subTitle') {
        algn = getTextByPathList(warpObj, ['slideMasterTextStyles', 'p:bodyStyle', lvlStr, 'attrs', 'algn']);
      }
    } 
    else if (type === 'body') {
      algn = getTextByPathList(warpObj, ['slideMasterTextStyles', 'p:bodyStyle', 'a:lvl1pPr', 'attrs', 'algn']);
    } 
    else {
      algn = getTextByPathList(warpObj, ['slideMasterTables', 'typeTable', type, 'p:txBody', 'a:lstStyle', 'a:lvl1pPr', 'attrs', 'algn']);
    }
  }

  let align = 'left';
  if (algn) {
    switch (algn) {
      case 'l':
        align = 'left';
        break
      case 'r':
        align = 'right';
        break
      case 'ctr':
        align = 'center';
        break
      case 'just':
        align = 'justify';
        break
      case 'dist':
        align = 'justify';
        break
      default:
        align = 'inherit';
    }
  }
  return align
}

function getVerticalAlign(node, slideLayoutSpNode, slideMasterSpNode) {
  let anchor = getTextByPathList(node, ['p:txBody', 'a:bodyPr', 'attrs', 'anchor']);
  if (!anchor) {
    anchor = getTextByPathList(slideLayoutSpNode, ['p:txBody', 'a:bodyPr', 'attrs', 'anchor']);
    if (!anchor) {
      anchor = getTextByPathList(slideMasterSpNode, ['p:txBody', 'a:bodyPr', 'attrs', 'anchor']);
      if (!anchor) anchor = 't';
    }
  }
  return (anchor === 'ctr') ? 'mid' : ((anchor === 'b') ? 'down' : 'up')
}

function getTextAutoFit(node, slideLayoutSpNode, slideMasterSpNode) {
  function checkBodyPr(bodyPr) {
    if (!bodyPr) return null

    if (bodyPr['a:noAutofit']) return { result: null }
    else if (bodyPr['a:spAutoFit']) return { result: { type: 'shape' } }
    else if (bodyPr['a:normAutofit']) {
      const fontScale = getTextByPathList(bodyPr['a:normAutofit'], ['attrs', 'fontScale']);
      if (fontScale) {
        const scalePercent = parseInt(fontScale) / 1000;
        return {
          result: {
            type: 'text',
            fontScale: scalePercent,
          }
        }
      }
      return { result: { type: 'text' } }
    }
    return null
  }

  const nodeCheck = checkBodyPr(getTextByPathList(node, ['p:txBody', 'a:bodyPr']));
  if (nodeCheck) return nodeCheck.result

  const layoutCheck = checkBodyPr(getTextByPathList(slideLayoutSpNode, ['p:txBody', 'a:bodyPr']));
  if (layoutCheck) return layoutCheck.result

  const masterCheck = checkBodyPr(getTextByPathList(slideMasterSpNode, ['p:txBody', 'a:bodyPr']));
  if (masterCheck) return masterCheck.result

  return null
}

function getParagraphSpacing(pNode) {
  if (!pNode) return null

  const pPrNode = pNode['a:pPr'];
  if (!pPrNode) return null

  const spacing = {};

  const lnSpcNode = pPrNode['a:lnSpc'];
  if (lnSpcNode) {
    const spcPct = getTextByPathList(lnSpcNode, ['a:spcPct', 'attrs', 'val']);
    const spcPts = getTextByPathList(lnSpcNode, ['a:spcPts', 'attrs', 'val']);

    if (spcPct) {
      spacing.lineSpacing = parseInt(spcPct) / 1000 / 100;
    } 
    else if (spcPts) {
      spacing.lineSpacing = parseInt(spcPts) / 100 + 'pt';
    }
  }

  const spcBefNode = pPrNode['a:spcBef'];
  if (spcBefNode) {
    const spcPct = getTextByPathList(spcBefNode, ['a:spcPct', 'attrs', 'val']);
    const spcPts = getTextByPathList(spcBefNode, ['a:spcPts', 'attrs', 'val']);

    if (spcPct) {
      spacing.spaceBefore = parseInt(spcPct) / 1000 + 'em';
    } 
    else if (spcPts) {
      spacing.spaceBefore = parseInt(spcPts) / 100 + 'pt';
    }
  }

  const spcAftNode = pPrNode['a:spcAft'];
  if (spcAftNode) {
    const spcPct = getTextByPathList(spcAftNode, ['a:spcPct', 'attrs', 'val']);
    const spcPts = getTextByPathList(spcAftNode, ['a:spcPts', 'attrs', 'val']);

    if (spcPct) {
      spacing.spaceAfter = parseInt(spcPct) / 1000 + 'em';
    } 
    else if (spcPts) {
      spacing.spaceAfter = parseInt(spcPts) / 100 + 'pt';
    }
  }

  return Object.keys(spacing).length > 0 ? spacing : null
}

const RATIO_Inches_EMUs = 914400; // 1英寸 = 914400EMUs
const RATIO_Inches_Points = 72; // 1英寸 = 72pt
const RATIO_EMUs_Points = RATIO_Inches_Points / RATIO_Inches_EMUs; // 1EMUs = (72 / 914400)pt

function getPosition(slideSpNode, slideLayoutSpNode, slideMasterSpNode) {
  let off;

  if (slideSpNode) off = slideSpNode['a:off']['attrs'];
  else if (slideLayoutSpNode) off = slideLayoutSpNode['a:off']['attrs'];
  else if (slideMasterSpNode) off = slideMasterSpNode['a:off']['attrs'];

  if (!off) return { top: 0, left: 0 }

  return {
    top: numberToFixed(parseInt(off['y']) * RATIO_EMUs_Points),
    left: numberToFixed(parseInt(off['x']) * RATIO_EMUs_Points),
  }
}

function getSize(slideSpNode, slideLayoutSpNode, slideMasterSpNode) {
  let ext;

  if (slideSpNode) ext = slideSpNode['a:ext']['attrs'];
  else if (slideLayoutSpNode) ext = slideLayoutSpNode['a:ext']['attrs'];
  else if (slideMasterSpNode) ext = slideMasterSpNode['a:ext']['attrs'];

  if (!ext) return { width: 0, height: 0 }

  return {
    width: numberToFixed(parseInt(ext['cx']) * RATIO_EMUs_Points),
    height: numberToFixed(parseInt(ext['cy']) * RATIO_EMUs_Points),
  }
}

function getShadow(node, warpObj) {
  const chdwClrNode = getSolidFill(node, undefined, undefined, warpObj);
  const outerShdwAttrs = node['attrs'];
  const dir = outerShdwAttrs['dir'] ? (parseInt(outerShdwAttrs['dir']) / 60000) : 0;
  const dist = outerShdwAttrs['dist'] ? parseInt(outerShdwAttrs['dist']) * RATIO_EMUs_Points : 0;
  const blurRad = outerShdwAttrs['blurRad'] ? parseInt(outerShdwAttrs['blurRad']) * RATIO_EMUs_Points : '';
  const vx = dist * Math.sin(dir * Math.PI / 180);
  const hx = dist * Math.cos(dir * Math.PI / 180);

  return {
    h: hx,
    v: vx,
    blur: blurRad,
    color: chdwClrNode,
  }
}

function getFontType(node, type, warpObj, slideLayoutSpNode, slideMasterSpNode, slideMasterTextStyles) {
  const extractFont = (targetNode, isDirectRun = false) => {
    if (!targetNode) return null
    
    let rPr;
    if (isDirectRun) rPr = getTextByPathList(targetNode, ['a:rPr']); 
    else {
      rPr = getTextByPathList(targetNode, ['p:txBody', 'a:lstStyle', 'a:lvl1pPr', 'a:defRPr']);
      if (!rPr) rPr = getTextByPathList(targetNode, ['p:txBody', 'a:p', 'a:pPr', 'a:defRPr']);
    }

    if (!rPr) return null

    return getTextByPathList(rPr, ['a:latin', 'attrs', 'typeface']) || getTextByPathList(rPr, ['a:ea', 'attrs', 'typeface'])
  };

  let typeface = extractFont(node, true);

  if (!typeface) typeface = extractFont(slideLayoutSpNode);
  if (!typeface) typeface = extractFont(slideMasterSpNode);

  if (!typeface) {
    let stylePath = [];
    if (type === 'title' || type === 'ctrTitle' || type === 'subTitle') {
      stylePath = ['p:titleStyle', 'a:lvl1pPr', 'a:defRPr'];
    } 
    else if (type === 'body') {
      stylePath = ['p:bodyStyle', 'a:lvl1pPr', 'a:defRPr'];
    } 
    else {
      stylePath = ['p:otherStyle', 'a:lvl1pPr', 'a:defRPr'];
    }
    const masterGlobalRPr = getTextByPathList(slideMasterTextStyles, stylePath);
    if (masterGlobalRPr) {
      typeface = getTextByPathList(masterGlobalRPr, ['a:latin', 'attrs', 'typeface']) || getTextByPathList(masterGlobalRPr, ['a:ea', 'attrs', 'typeface']);
    }
  }

  if (!typeface || typeface.startsWith('+')) {
    const fontSchemeNode = getTextByPathList(warpObj['themeContent'], ['a:theme', 'a:themeElements', 'a:fontScheme']);

    if (fontSchemeNode) {
      if (typeface && typeface.startsWith('+')) {
        switch (typeface) {
          case '+mj-lt': 
            return getTextByPathList(fontSchemeNode, ['a:majorFont', 'a:latin', 'attrs', 'typeface'])
          case '+mn-lt': 
            return getTextByPathList(fontSchemeNode, ['a:minorFont', 'a:latin', 'attrs', 'typeface'])
          case '+mj-ea': 
            return getTextByPathList(fontSchemeNode, ['a:majorFont', 'a:ea', 'attrs', 'typeface'])
          case '+mn-ea': 
            return getTextByPathList(fontSchemeNode, ['a:minorFont', 'a:ea', 'attrs', 'typeface'])
          default: 
            return typeface.replace(/^\+/, '')
        }
      }
    }

    if (type === 'title' || type === 'subTitle' || type === 'ctrTitle') {
      typeface = getTextByPathList(fontSchemeNode, ['a:majorFont', 'a:latin', 'attrs', 'typeface']) || getTextByPathList(fontSchemeNode, ['a:majorFont', 'a:ea', 'attrs', 'typeface']);
    }
    else {
      typeface = getTextByPathList(fontSchemeNode, ['a:minorFont', 'a:latin', 'attrs', 'typeface']);
    }
  }

  return typeface || ''
}

function getFontColor(node, pNode, lstStyle, pFontStyle, lvl, warpObj) {
  const rPrNode = getTextByPathList(node, ['a:rPr']);
  let filTyp, color;
  if (rPrNode) {
    filTyp = getFillType(rPrNode);
    if (filTyp === 'SOLID_FILL') {
      const solidFillNode = rPrNode['a:solidFill'];
      color = getSolidFill(solidFillNode, undefined, undefined, warpObj);
    }
    if (filTyp === 'GRADIENT_FILL') {
      const gradientFillNode = rPrNode['a:gradFill'];
      const gradient = getGradientFill(gradientFillNode, warpObj);
      return gradient
    }
  }
  if (!color && getTextByPathList(lstStyle, ['a:lvl' + lvl + 'pPr', 'a:defRPr'])) {
    const lstStyledefRPr = getTextByPathList(lstStyle, ['a:lvl' + lvl + 'pPr', 'a:defRPr']);
    filTyp = getFillType(lstStyledefRPr);
    if (filTyp === 'SOLID_FILL') {
      const solidFillNode = lstStyledefRPr['a:solidFill'];
      color = getSolidFill(solidFillNode, undefined, undefined, warpObj);
    }
  }
  if (!color) {
    const sPstyle = getTextByPathList(pNode, ['p:style', 'a:fontRef']);
    if (sPstyle) color = getSolidFill(sPstyle, undefined, undefined, warpObj);
    if (!color && pFontStyle) color = getSolidFill(pFontStyle, undefined, undefined, warpObj);
  }
  return color || ''
}

function getFontSize(node, slideLayoutSpNode, type, slideMasterTextStyles, textBodyNode, pNode) {
  let fontSize;

  if (getTextByPathList(node, ['a:rPr', 'attrs', 'sz'])) fontSize = getTextByPathList(node, ['a:rPr', 'attrs', 'sz']) / 100;

  if ((isNaN(fontSize) || !fontSize) && pNode) {
    if (getTextByPathList(pNode, ['a:endParaRPr', 'attrs', 'sz'])) {
      fontSize = getTextByPathList(pNode, ['a:endParaRPr', 'attrs', 'sz']) / 100;
    }
  }

  if ((isNaN(fontSize) || !fontSize) && textBodyNode) {
    const lstStyle = getTextByPathList(textBodyNode, ['a:lstStyle']);
    if (lstStyle) {
      let lvl = 1;
      if (pNode) {
        const lvlNode = getTextByPathList(pNode, ['a:pPr', 'attrs', 'lvl']);
        if (lvlNode !== undefined) lvl = parseInt(lvlNode) + 1;
      }

      const sz = getTextByPathList(lstStyle, [`a:lvl${lvl}pPr`, 'a:defRPr', 'attrs', 'sz']);
      if (sz) fontSize = parseInt(sz) / 100;
    }
  }

  if ((isNaN(fontSize) || !fontSize)) {
    const sz = getTextByPathList(slideLayoutSpNode, ['p:txBody', 'a:lstStyle', 'a:lvl1pPr', 'a:defRPr', 'attrs', 'sz']);
    if (sz) fontSize = parseInt(sz) / 100;
  }

  if ((isNaN(fontSize) || !fontSize) && slideLayoutSpNode) {
    let lvl = 1;
    if (pNode) {
      const lvlNode = getTextByPathList(pNode, ['a:pPr', 'attrs', 'lvl']);
      if (lvlNode !== undefined) lvl = parseInt(lvlNode) + 1;
    }
    const layoutSz = getTextByPathList(slideLayoutSpNode, ['p:txBody', 'a:lstStyle', `a:lvl${lvl}pPr`, 'a:defRPr', 'attrs', 'sz']);
    if (layoutSz) fontSize = parseInt(layoutSz) / 100;
  }

  if ((isNaN(fontSize) || !fontSize) && pNode) {
    const paraSz = getTextByPathList(pNode, ['a:pPr', 'a:defRPr', 'attrs', 'sz']);
    if (paraSz) fontSize = parseInt(paraSz) / 100;
  }

  if (isNaN(fontSize) || !fontSize) {
    let sz;
    if (type === 'title' || type === 'subTitle' || type === 'ctrTitle') {
      sz = getTextByPathList(slideMasterTextStyles, ['p:titleStyle', 'a:lvl1pPr', 'a:defRPr', 'attrs', 'sz']);
    } 
    else if (type === 'body') {
      sz = getTextByPathList(slideMasterTextStyles, ['p:bodyStyle', 'a:lvl1pPr', 'a:defRPr', 'attrs', 'sz']);
    } 
    else if (type === 'dt' || type === 'sldNum') {
      sz = '1200';
    } 
    else if (!type) {
      sz = getTextByPathList(slideMasterTextStyles, ['p:otherStyle', 'a:lvl1pPr', 'a:defRPr', 'attrs', 'sz']);
    }
    if (sz) fontSize = parseInt(sz) / 100;
  }

  const baseline = getTextByPathList(node, ['a:rPr', 'attrs', 'baseline']);
  if (baseline && !isNaN(fontSize)) fontSize -= 10;

  fontSize = (isNaN(fontSize) || !fontSize) ? 18 : fontSize;

  return fontSize + 'pt'
}

function getFontBold(node) {
  return getTextByPathList(node, ['a:rPr', 'attrs', 'b']) === '1' ? 'bold' : ''
}

function getFontItalic(node) {
  return getTextByPathList(node, ['a:rPr', 'attrs', 'i']) === '1' ? 'italic' : ''
}

function getFontDecoration(node) {
  return getTextByPathList(node, ['a:rPr', 'attrs', 'u']) === 'sng' ? 'underline' : ''
}

function getFontDecorationLine(node) {
  return getTextByPathList(node, ['a:rPr', 'attrs', 'strike']) === 'sngStrike' ? 'line-through' : ''
}

function getFontSpace(node) {
  const spc = getTextByPathList(node, ['a:rPr', 'attrs', 'spc']);
  return spc ? (parseInt(spc) / 100 + 'pt') : ''
}

function getFontSubscript(node) {
  const baseline = getTextByPathList(node, ['a:rPr', 'attrs', 'baseline']);
  if (!baseline) return ''
  return parseInt(baseline) > 0 ? 'super' : 'sub'
}

function getFontShadow(node, warpObj) {
  const txtShadow = getTextByPathList(node, ['a:rPr', 'a:effectLst', 'a:outerShdw']);
  if (txtShadow) {
    const shadow = getShadow(txtShadow, warpObj);
    if (shadow) {
      const { h, v, blur, color } = shadow;
      if (!isNaN(v) && !isNaN(h)) {
        return h + 'pt ' + v + 'pt ' + (blur ? blur + 'pt' : '') + ' ' + color
      }
    }
  }
  return ''
}

function genTextBody(textBodyNode, spNode, slideLayoutSpNode, slideMasterSpNode, type, warpObj) {
  if (!textBodyNode) return ''

  let text = '';

  const pFontStyle = getTextByPathList(spNode, ['p:style', 'a:fontRef']);

  const pNode = textBodyNode['a:p'];
  const pNodes = pNode.constructor === Array ? pNode : [pNode];

  const listTypes = [];

  for (const pNode of pNodes) {
    let rNode = pNode['a:r'];
    let fldNode = pNode['a:fld'];
    let brNode = pNode['a:br'];
    if (rNode) {
      rNode = (rNode.constructor === Array) ? rNode : [rNode];

      if (fldNode) {
        fldNode = (fldNode.constructor === Array) ? fldNode : [fldNode];
        rNode = rNode.concat(fldNode);
      }
      if (brNode) {
        brNode = (brNode.constructor === Array) ? brNode : [brNode];
        brNode.forEach(item => item.type = 'br');
  
        if (brNode.length > 1) brNode.shift();
        rNode = rNode.concat(brNode);
        rNode.sort((a, b) => {
          if (!a.attrs || !b.attrs) return true
          return a.attrs.order - b.attrs.order
        });
      }
    }

    const align = getHorizontalAlign(pNode, spNode, type, warpObj);
    const spacing = getParagraphSpacing(pNode);

    let styleText = `text-align: ${align};`;
    if (spacing) {
      if (spacing.lineSpacing) styleText += `line-height: ${spacing.lineSpacing};`;
      if (spacing.spaceBefore) styleText += `margin-top: ${spacing.spaceBefore};`;
      if (spacing.spaceAfter) styleText += `margin-bottom: ${spacing.spaceAfter};`;
    }

    const listType = getListType(pNode);
    const listLevel = getListLevel(pNode);

    if (listType) {
      while (listTypes.length > listLevel + 1) {
        const closedListType = listTypes.pop();
        text += `</${closedListType}>`;
      }

      if (listTypes[listLevel] === undefined) {
        text += `<${listType}>`;
        listTypes[listLevel] = listType;
      }
      else if (listTypes[listLevel] !== listType) {
        text += `</${listTypes[listLevel]}>`;
        text += `<${listType}>`;
        listTypes[listLevel] = listType;
      }
      text += `<li style="${styleText}">`;
    }
    else {
      while (listTypes.length > 0) {
        const closedListType = listTypes.pop();
        text += `</${closedListType}>`;
      }
      text += `<p style="${styleText}">`;
    }
    
    if (!rNode) {
      text += genSpanElement(pNode, spNode, textBodyNode, pFontStyle, slideLayoutSpNode, slideMasterSpNode, type, warpObj);
    } 
    else {
      let prevStyleInfo = null;
      let accumulatedText = '';

      for (const rNodeItem of rNode) {
        const styleInfo = getSpanStyleInfo(rNodeItem, pNode, textBodyNode, pFontStyle, slideLayoutSpNode, slideMasterSpNode, type, warpObj);

        if (!prevStyleInfo || prevStyleInfo.styleText !== styleInfo.styleText || prevStyleInfo.hasLink !== styleInfo.hasLink || styleInfo.hasLink) {
          if (accumulatedText) {
            const processedText = accumulatedText.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/\s/g, '&nbsp;');
            text += `<span style="${prevStyleInfo.styleText}">${processedText}</span>`;
            accumulatedText = '';
          }

          if (styleInfo.hasLink) {
            const processedText = styleInfo.text.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/\s/g, '&nbsp;');
            text += `<span style="${styleInfo.styleText}"><a href="${styleInfo.linkURL}" target="_blank">${processedText}</a></span>`;
            prevStyleInfo = null;
          } 
          else {
            prevStyleInfo = styleInfo;
            accumulatedText = styleInfo.text;
          }
        } 
        else accumulatedText += styleInfo.text;
      }

      if (accumulatedText && prevStyleInfo) {
        const processedText = accumulatedText.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/\s/g, '&nbsp;');
        text += `<span style="${prevStyleInfo.styleText}">${processedText}</span>`;
      }
    }

    if (listType) text += '</li>';
    else text += '</p>';
  }
  while (listTypes.length > 0) {
    const closedListType = listTypes.pop();
    text += `</${closedListType}>`;
  }
  return text
}

function getListType(node) {
  const pPrNode = node['a:pPr'];
  if (!pPrNode) return ''

  if (pPrNode['a:buChar']) return 'ul'
  if (pPrNode['a:buAutoNum']) return 'ol'
  
  return ''
}
function getListLevel(node) {
  const pPrNode = node['a:pPr'];
  if (!pPrNode) return -1

  const lvlNode = getTextByPathList(pPrNode, ['attrs', 'lvl']);
  if (lvlNode !== undefined) return parseInt(lvlNode)

  return 0
}

function genSpanElement(node, pNode, textBodyNode, pFontStyle, slideLayoutSpNode, slideMasterSpNode, type, warpObj) {
  const { styleText, text, hasLink, linkURL } = getSpanStyleInfo(node, pNode, textBodyNode, pFontStyle, slideLayoutSpNode, slideMasterSpNode, type, warpObj);
  const processedText = text.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/\s/g, '&nbsp;');

  if (hasLink) {
    return `<span style="${styleText}"><a href="${linkURL}" target="_blank">${processedText}</a></span>`
  }
  return `<span style="${styleText}">${processedText}</span>`
}

function getSpanStyleInfo(node, pNode, textBodyNode, pFontStyle, slideLayoutSpNode, slideMasterSpNode, type, warpObj) {
  const lstStyle = textBodyNode['a:lstStyle'];
  const slideMasterTextStyles = warpObj['slideMasterTextStyles'];

  let lvl = 1;
  const pPrNode = pNode['a:pPr'];
  const lvlNode = getTextByPathList(pPrNode, ['attrs', 'lvl']);
  if (lvlNode !== undefined) lvl = parseInt(lvlNode) + 1;

  let text = node['a:t'];
  if (typeof text !== 'string') text = getTextByPathList(node, ['a:fld', 'a:t']);
  if (typeof text !== 'string') text = '&nbsp;';

  let styleText = '';
  const fontColor = getFontColor(node, pNode, lstStyle, pFontStyle, lvl, warpObj);
  const fontSize = getFontSize(node, slideLayoutSpNode, type, slideMasterTextStyles, textBodyNode, pNode);
  const fontType = getFontType(node, type, warpObj, slideLayoutSpNode, slideMasterSpNode, slideMasterTextStyles);
  const fontBold = getFontBold(node);
  const fontItalic = getFontItalic(node);
  const fontDecoration = getFontDecoration(node);
  const fontDecorationLine = getFontDecorationLine(node);
  const fontSpace = getFontSpace(node);
  const shadow = getFontShadow(node, warpObj);
  const subscript = getFontSubscript(node);

  if (fontColor) {
    if (typeof fontColor === 'string') styleText += `color: ${fontColor};`;
    else if (fontColor.colors) {
      const { colors, rot } = fontColor;
      const stops = colors.map(item => `${item.color} ${item.pos}`).join(', ');
      const gradientStyle = `linear-gradient(${rot + 90}deg, ${stops})`;
      styleText += `background: ${gradientStyle}; background-clip: text; color: transparent;`;
    }
  }
  if (fontSize) styleText += `font-size: ${fontSize};`;
  if (fontType) styleText += `font-family: ${fontType};`;
  if (fontBold) styleText += `font-weight: ${fontBold};`;
  if (fontItalic) styleText += `font-style: ${fontItalic};`;
  if (fontDecoration) styleText += `text-decoration: ${fontDecoration};`;
  if (fontDecorationLine) styleText += `text-decoration-line: ${fontDecorationLine};`;
  if (fontSpace) styleText += `letter-spacing: ${fontSpace};`;
  if (subscript) styleText += `vertical-align: ${subscript};`;
  if (shadow) styleText += `text-shadow: ${shadow};`;

  const linkID = getTextByPathList(node, ['a:rPr', 'a:hlinkClick', 'attrs', 'r:id']);
  const hasLink = linkID && warpObj['slideResObj'][linkID];

  return {
    styleText,
    text,
    hasLink,
    linkURL: hasLink ? warpObj['slideResObj'][linkID]['target'] : null
  }
}

function shapeArc$1(cX, cY, rX, rY, stAng, endAng, isClose) {
  let dData;
  let angle = stAng;
  if (endAng >= stAng) {
    while (angle <= endAng) {
      const radians = angle * (Math.PI / 180);
      const x = cX + Math.cos(radians) * rX;
      const y = cY + Math.sin(radians) * rY;
      if (angle === stAng) {
        dData = ' M' + x + ' ' + y;
      }
      dData += ' L' + x + ' ' + y;
      angle++;
    }
  } 
  else {
    while (angle > endAng) {
      const radians = angle * (Math.PI / 180);
      const x = cX + Math.cos(radians) * rX;
      const y = cY + Math.sin(radians) * rY;
      if (angle === stAng) {
        dData = ' M ' + x + ' ' + y;
      }
      dData += ' L ' + x + ' ' + y;
      angle--;
    }
  }
  dData += (isClose ? ' z' : '');
  return dData
}

function getCustomShapePath(custShapType, w, h) {
  const pathLstNode = getTextByPathList(custShapType, ['a:pathLst']);
  let pathNodes = getTextByPathList(pathLstNode, ['a:path']);

  if (Array.isArray(pathNodes)) pathNodes = pathNodes.shift();

  const maxX = parseInt(pathNodes['attrs']['w']);
  const maxY = parseInt(pathNodes['attrs']['h']);
  const cX = maxX === 0 ? 0 : (1 / maxX) * w;
  const cY = maxY === 0 ? 0 : (1 / maxY) * h;
  let d = '';

  let moveToNode = getTextByPathList(pathNodes, ['a:moveTo']);

  let lnToNodes = pathNodes['a:lnTo'];
  let cubicBezToNodes = pathNodes['a:cubicBezTo'];
  let quadBezToNodes = pathNodes['a:quadBezTo'];
  const arcToNodes = pathNodes['a:arcTo'];
  let closeNode = getTextByPathList(pathNodes, ['a:close']);
  if (!Array.isArray(moveToNode)) moveToNode = [moveToNode];

  const multiSapeAry = [];
  if (moveToNode.length > 0) {
    Object.keys(moveToNode).forEach(key => {
      const moveToPtNode = moveToNode[key]['a:pt'];
      if (moveToPtNode) {
        Object.keys(moveToPtNode).forEach(key => {
          const moveToNoPt = moveToPtNode[key];
          const spX = moveToNoPt['x'];
          const spY = moveToNoPt['y'];
          const order = moveToNoPt['order'];
          multiSapeAry.push({
            type: 'movto',
            x: spX,
            y: spY,
            order,
          });
        });
      }
    });
    if (lnToNodes) {
      if (!Array.isArray(lnToNodes)) lnToNodes = [lnToNodes];
      Object.keys(lnToNodes).forEach(key => {
        const lnToPtNode = lnToNodes[key]['a:pt'];
        if (lnToPtNode) {
          Object.keys(lnToPtNode).forEach(key => {
            const lnToNoPt = lnToPtNode[key];
            const ptX = lnToNoPt['x'];
            const ptY = lnToNoPt['y'];
            const order = lnToNoPt['order'];
            multiSapeAry.push({
              type: 'lnto',
              x: ptX,
              y: ptY,
              order,
            });
          });
        }
      });
    }
    if (cubicBezToNodes) {
      const cubicBezToPtNodesAry = [];
      if (!Array.isArray(cubicBezToNodes)) cubicBezToNodes = [cubicBezToNodes];
      Object.keys(cubicBezToNodes).forEach(key => {
        cubicBezToPtNodesAry.push(cubicBezToNodes[key]['a:pt']);
      });

      cubicBezToPtNodesAry.forEach(key => {
        const pts_ary = [];
        key.forEach(pt => {
          const pt_obj = {
            x: pt['attrs']['x'],
            y: pt['attrs']['y'],
          };
          pts_ary.push(pt_obj);
        });
        const order = key[0]['attrs']['order'];
        multiSapeAry.push({
          type: 'cubicBezTo',
          cubBzPt: pts_ary,
          order,
        });
      });
    }
    if (quadBezToNodes) {
      const quadBezToPtNodesAry = [];
      if (!Array.isArray(quadBezToNodes)) quadBezToNodes = [quadBezToNodes];
      Object.keys(quadBezToNodes).forEach(key => {
        quadBezToPtNodesAry.push(quadBezToNodes[key]['a:pt']);
      });

      quadBezToPtNodesAry.forEach(key => {
        const pts_ary = [];
        key.forEach(pt => {
          const pt_obj = {
            x: pt['attrs']['x'],
            y: pt['attrs']['y'],
          };
          pts_ary.push(pt_obj);
        });
        const order = key[0]['attrs']['order'];
        multiSapeAry.push({
          type: 'quadBezTo',
          quadBzPt: pts_ary,
          order,
        });
      });
    }
    if (arcToNodes) {
      const arcToNodesAttrs = arcToNodes['attrs'];
      const order = arcToNodesAttrs['order'];
      const hR = arcToNodesAttrs['hR'];
      const wR = arcToNodesAttrs['wR'];
      const stAng = arcToNodesAttrs['stAng'];
      const swAng = arcToNodesAttrs['swAng'];
      let shftX = 0;
      let shftY = 0;
      const arcToPtNode = getTextByPathList(arcToNodes, ['a:pt', 'attrs']);
      if (arcToPtNode) {
        shftX = arcToPtNode['x'];
        shftY = arcToPtNode['y'];
      }
      multiSapeAry.push({
        type: 'arcTo',
        hR: hR,
        wR: wR,
        stAng: stAng,
        swAng: swAng,
        shftX: shftX,
        shftY: shftY,
        order,
      });
    }
    if (closeNode) {
      if (!Array.isArray(closeNode)) closeNode = [closeNode];
      Object.keys(closeNode).forEach(() => {
        multiSapeAry.push({
          type: 'close',
          order: Infinity,
        });
      });
    }

    multiSapeAry.sort((a, b) => a.order - b.order);

    let k = 0;
    while (k < multiSapeAry.length) {
      if (multiSapeAry[k].type === 'movto') {
        const spX = parseInt(multiSapeAry[k].x) * cX;
        const spY = parseInt(multiSapeAry[k].y) * cY;
        d += ' M' + spX + ',' + spY;
      } 
      else if (multiSapeAry[k].type === 'lnto') {
        const Lx = parseInt(multiSapeAry[k].x) * cX;
        const Ly = parseInt(multiSapeAry[k].y) * cY;
        d += ' L' + Lx + ',' + Ly;
      } 
      else if (multiSapeAry[k].type === 'cubicBezTo') {
        const Cx1 = parseInt(multiSapeAry[k].cubBzPt[0].x) * cX;
        const Cy1 = parseInt(multiSapeAry[k].cubBzPt[0].y) * cY;
        const Cx2 = parseInt(multiSapeAry[k].cubBzPt[1].x) * cX;
        const Cy2 = parseInt(multiSapeAry[k].cubBzPt[1].y) * cY;
        const Cx3 = parseInt(multiSapeAry[k].cubBzPt[2].x) * cX;
        const Cy3 = parseInt(multiSapeAry[k].cubBzPt[2].y) * cY;
        d += ' C' + Cx1 + ',' + Cy1 + ' ' + Cx2 + ',' + Cy2 + ' ' + Cx3 + ',' + Cy3;
      }
      else if (multiSapeAry[k].type === 'quadBezTo') {
        const Qx1 = parseInt(multiSapeAry[k].quadBzPt[0].x) * cX;
        const Qy1 = parseInt(multiSapeAry[k].quadBzPt[0].y) * cY;
        const Qx2 = parseInt(multiSapeAry[k].quadBzPt[1].x) * cX;
        const Qy2 = parseInt(multiSapeAry[k].quadBzPt[1].y) * cY;
        d += ' Q' + Qx1 + ',' + Qy1 + ' ' + Qx2 + ',' + Qy2;
      }
      else if (multiSapeAry[k].type === 'arcTo') {
        const hR = parseInt(multiSapeAry[k].hR) * cX;
        const wR = parseInt(multiSapeAry[k].wR) * cY;
        const stAng = parseInt(multiSapeAry[k].stAng) / 60000;
        const swAng = parseInt(multiSapeAry[k].swAng) / 60000;
        const endAng = stAng + swAng;
        d += shapeArc$1(wR, hR, wR, hR, stAng, endAng, false);
      }
      else if (multiSapeAry[k].type === 'close') d += 'z';
      k++;
    }
  }

  return d
}

function identifyShape(shapeData) {
  const pathLst = shapeData['a:pathLst'];
  if (!pathLst || !pathLst['a:path']) return 'custom'

  const path = pathLst['a:path'];
  const pathWidth = parseInt(path.attrs?.w) || 0;
  const pathHeight = parseInt(path.attrs?.h) || 0;

  const commands = extractPathCommands(path);
  
  if (commands.length === 0) return 'custom'

  const analysis = analyzePathCommands(commands, pathWidth, pathHeight);
  
  return matchShape(analysis)
}

function extractPathCommands(path) {
  const commands = [];
  
  if (path['a:moveTo']) {
    const moveTo = path['a:moveTo'];
    const pt = moveTo['a:pt'];
    if (pt) {
      commands.push({
        type: 'moveTo',
        points: [{ x: parseInt(pt.attrs?.x) || 0, y: parseInt(pt.attrs?.y) || 0 }]
      });
    }
  }

  const lineToList = normalizeToArray(path['a:lnTo']);
  lineToList.forEach(lnTo => {
    const pt = lnTo['a:pt'];
    if (pt) {
      commands.push({
        type: 'lineTo',
        points: [{ x: parseInt(pt.attrs?.x) || 0, y: parseInt(pt.attrs?.y) || 0 }]
      });
    }
  });

  const cubicList = normalizeToArray(path['a:cubicBezTo']);
  cubicList.forEach(cubic => {
    const pts = normalizeToArray(cubic['a:pt']);
    const points = pts.map(pt => ({
      x: parseInt(pt.attrs?.x) || 0,
      y: parseInt(pt.attrs?.y) || 0
    }));
    if (points.length === 3) {
      commands.push({ type: 'cubicBezTo', points });
    }
  });

  const arcList = normalizeToArray(path['a:arcTo']);
  arcList.forEach(arc => {
    commands.push({
      type: 'arcTo',
      wR: parseInt(arc.attrs?.wR) || 0,
      hR: parseInt(arc.attrs?.hR) || 0,
      stAng: parseInt(arc.attrs?.stAng) || 0,
      swAng: parseInt(arc.attrs?.swAng) || 0
    });
  });

  const quadList = normalizeToArray(path['a:quadBezTo']);
  quadList.forEach(quad => {
    const pts = normalizeToArray(quad['a:pt']);
    const points = pts.map(pt => ({
      x: parseInt(pt.attrs?.x) || 0,
      y: parseInt(pt.attrs?.y) || 0
    }));
    commands.push({ type: 'quadBezTo', points });
  });

  if (path['a:close']) {
    commands.push({ type: 'close' });
  }

  return commands
}

function normalizeToArray(value) {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

function analyzePathCommands(commands, pathWidth, pathHeight) {
  const analysis = {
    lineCount: 0,
    curveCount: 0,
    arcCount: 0,
    isClosed: false,
    vertices: [],
    aspectRatio: pathHeight !== 0 ? pathWidth / pathHeight : 1,
    pathWidth,
    pathHeight,
    hasCurves: false,
    isCircular: false,
    commands
  };

  commands.forEach(cmd => {
    switch (cmd.type) {
      case 'moveTo':
        analysis.vertices.push(cmd.points[0]);
        break
      case 'lineTo':
        analysis.lineCount++;
        analysis.vertices.push(cmd.points[0]);
        break
      case 'cubicBezTo':
        analysis.curveCount++;
        analysis.hasCurves = true;
        if (cmd.points.length === 3) {
          analysis.vertices.push(cmd.points[2]);
        }
        break
      case 'quadBezTo':
        analysis.curveCount++;
        analysis.hasCurves = true;
        if (cmd.points.length >= 2) {
          analysis.vertices.push(cmd.points[cmd.points.length - 1]);
        }
        break
      case 'arcTo':
        analysis.arcCount++;
        analysis.hasCurves = true;
        break
      case 'close':
        analysis.isClosed = true;
        break
    }
  });

  if (analysis.curveCount === 4 && analysis.lineCount === 0 && analysis.isClosed) {
    analysis.isCircular = checkIfCircular(commands, pathWidth, pathHeight);
  }

  return analysis
}

function checkIfCircular(commands, width, height) {
  const bezierCommands = commands.filter(c => c.type === 'cubicBezTo');
  if (bezierCommands.length !== 4) return false

  const endpoints = bezierCommands.map(cmd => cmd.points[2]);
  
  const hasTop = endpoints.some(p => Math.abs(p.y) < height * 0.1);
  const hasBottom = endpoints.some(p => Math.abs(p.y - height) < height * 0.1);
  const hasLeft = endpoints.some(p => Math.abs(p.x) < width * 0.1);
  const hasRight = endpoints.some(p => Math.abs(p.x - width) < width * 0.1);

  return (hasTop || hasBottom) && (hasLeft || hasRight)
}

function matchShape(analysis) {
  const { 
    lineCount,
    curveCount,
    isClosed,
    vertices,
    hasCurves,
    isCircular,
    pathWidth,
    pathHeight,
  } = analysis;

  if (isCircular) return 'ellipse'

  if (analysis.arcCount >= 2 && isClosed && lineCount === 0) return 'ellipse'

  if (!hasCurves && isClosed && vertices.length >= 3) return matchPolygon(vertices)

  if (lineCount === 4 && curveCount === 4 && isClosed) return 'roundRect'

  if (lineCount >= 3 && curveCount > 0 && curveCount <= lineCount && isClosed) {
    const baseShape = matchPolygonByLineCount(lineCount);
    if (baseShape !== 'custom') return baseShape === 'rectangle' ? 'roundRect' : baseShape
  }
  return 'custom'
}

function matchPolygon(vertices, width, height) {
  const uniqueVertices = removeDuplicateVertices(vertices);
  const vertexCount = uniqueVertices.length;

  switch (vertexCount) {
    case 3:
      return 'triangle'
    case 4:
      return matchQuadrilateral(uniqueVertices)
    case 5:
      return 'pentagon'
    case 6:
      return 'hexagon'
    case 7:
      return 'heptagon'
    case 8:
      return 'octagon'
    default:
      if (vertexCount > 8) {
        return 'ellipse'
      }
      return 'custom'
  }
}

function removeDuplicateVertices(vertices) {
  const threshold = 100;
  const unique = [];
  
  vertices.forEach(v => {
    const isDuplicate = unique.some(u => 
      Math.abs(u.x - v.x) < threshold && Math.abs(u.y - v.y) < threshold
    );
    if (!isDuplicate) unique.push(v);
  });
  
  return unique
}

function matchQuadrilateral(vertices) {
  if (vertices.length !== 4) return 'custom'

  const edges = [];
  for (let i = 0; i < 4; i++) {
    const p1 = vertices[i];
    const p2 = vertices[(i + 1) % 4];
    edges.push({
      dx: p2.x - p1.x,
      dy: p2.y - p1.y,
      length: Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2)
    });
  }

  if (isRectangle(edges)) return 'roundRect'
  if (isRhombus(edges)) return 'rhombus'
  if (isParallelogram(edges)) return 'parallelogram'
  if (isTrapezoid(edges)) return 'trapezoid'

  return 'custom'
}

function isRectangle(edges) {
  const tolerance = 0.1;
  const edge02Similar = Math.abs(edges[0].length - edges[2].length) / Math.max(edges[0].length, edges[2].length) < tolerance;
  const edge13Similar = Math.abs(edges[1].length - edges[3].length) / Math.max(edges[1].length, edges[3].length) < tolerance;
  
  if (!edge02Similar || !edge13Similar) return false

  for (let i = 0; i < 4; i++) {
    const e1 = edges[i];
    const e2 = edges[(i + 1) % 4];
    const dotProduct = e1.dx * e2.dx + e1.dy * e2.dy;
    const cosAngle = dotProduct / (e1.length * e2.length);
    if (Math.abs(cosAngle) > 0.1) return false
  }
  
  return true
}

function isRhombus(edges) {
  const tolerance = 0.1;
  const avgLength = edges.reduce((sum, e) => sum + e.length, 0) / 4;
  
  return edges.every(e => Math.abs(e.length - avgLength) / avgLength < tolerance)
}

function isParallelogram(edges) {
  const tolerance = 0.15;
  
  const slope0 = edges[0].dx !== 0 ? edges[0].dy / edges[0].dx : Infinity;
  const slope2 = edges[2].dx !== 0 ? edges[2].dy / edges[2].dx : Infinity;
  const slope1 = edges[1].dx !== 0 ? edges[1].dy / edges[1].dx : Infinity;
  const slope3 = edges[3].dx !== 0 ? edges[3].dy / edges[3].dx : Infinity;

  const parallel02 = Math.abs(slope0 - slope2) < tolerance || 
                     (Math.abs(slope0) > 1000 && Math.abs(slope2) > 1000);
  const parallel13 = Math.abs(slope1 - slope3) < tolerance ||
                     (Math.abs(slope1) > 1000 && Math.abs(slope3) > 1000);

  return parallel02 && parallel13
}

function isTrapezoid(edges) {
  const tolerance = 0.15;
  
  const slope0 = edges[0].dx !== 0 ? edges[0].dy / edges[0].dx : Infinity;
  const slope2 = edges[2].dx !== 0 ? edges[2].dy / edges[2].dx : Infinity;
  const slope1 = edges[1].dx !== 0 ? edges[1].dy / edges[1].dx : Infinity;
  const slope3 = edges[3].dx !== 0 ? edges[3].dy / edges[3].dx : Infinity;

  const parallel02 = Math.abs(slope0 - slope2) < tolerance ||
                     (Math.abs(slope0) > 1000 && Math.abs(slope2) > 1000);
  const parallel13 = Math.abs(slope1 - slope3) < tolerance ||
                     (Math.abs(slope1) > 1000 && Math.abs(slope3) > 1000);

  return (parallel02 && !parallel13) || (!parallel02 && parallel13)
}

function matchPolygonByLineCount(lineCount) {
  switch (lineCount) {
    case 3: return 'triangle'
    case 4: return 'rectangle'
    case 5: return 'pentagon'
    case 6: return 'hexagon'
    case 7: return 'heptagon'
    case 8: return 'octagon'
    default: return 'custom'
  }
}

function getTableBorders(node, warpObj) {
  const borders = {};
  if (node['a:bottom']) {
    const obj = {
      'p:spPr': {
        'a:ln': node['a:bottom']['a:ln']
      }
    };
    const border = getBorder(obj, undefined, warpObj);
    borders.bottom = border;
  }
  if (node['a:top']) {
    const obj = {
      'p:spPr': {
        'a:ln': node['a:top']['a:ln']
      }
    };
    const border = getBorder(obj, undefined, warpObj);
    borders.top = border;
  }
  if (node['a:right']) {
    const obj = {
      'p:spPr': {
        'a:ln': node['a:right']['a:ln']
      }
    };
    const border = getBorder(obj, undefined, warpObj);
    borders.right = border;
  }
  if (node['a:left']) {
    const obj = {
      'p:spPr': {
        'a:ln': node['a:left']['a:ln']
      }
    };
    const border = getBorder(obj, undefined, warpObj);
    borders.left = border;
  }
  return borders
}

async function getTableCellParams(tcNode, thisTblStyle, cellSource, warpObj) {
  const rowSpan = getTextByPathList(tcNode, ['attrs', 'rowSpan']);
  const colSpan = getTextByPathList(tcNode, ['attrs', 'gridSpan']);
  const vMerge = getTextByPathList(tcNode, ['attrs', 'vMerge']);
  const hMerge = getTextByPathList(tcNode, ['attrs', 'hMerge']);
  let fillColor;
  let fontColor;
  let fontBold;

  const getCelFill = getTextByPathList(tcNode, ['a:tcPr']);
  if (getCelFill) {
    const cellObj = { 'p:spPr': getCelFill };
    const fill = await getShapeFill(cellObj, warpObj, 'slide');

    if (fill && fill.type === 'color' && fill.value) {
      fillColor = fill.value; 
    }
  }
  if (!fillColor) {
    let bgFillschemeClr;
    if (cellSource) bgFillschemeClr = getTextByPathList(thisTblStyle, [cellSource, 'a:tcStyle', 'a:fill', 'a:solidFill']);
    if (bgFillschemeClr) {
      fillColor = getSolidFill(bgFillschemeClr, undefined, undefined, warpObj);
    }
  }

  let rowTxtStyl;
  if (cellSource) rowTxtStyl = getTextByPathList(thisTblStyle, [cellSource, 'a:tcTxStyle']);
  if (rowTxtStyl) {
    fontColor = getSolidFill(rowTxtStyl, undefined, undefined, warpObj);
    if (getTextByPathList(rowTxtStyl, ['attrs', 'b']) === 'on') fontBold = true;
  }

  let lin_bottm = getTextByPathList(tcNode, ['a:tcPr', 'a:lnB']);
  if (!lin_bottm) {
    if (cellSource) lin_bottm = getTextByPathList(thisTblStyle[cellSource], ['a:tcStyle', 'a:tcBdr', 'a:bottom', 'a:ln']);
    if (!lin_bottm) lin_bottm = getTextByPathList(thisTblStyle, ['a:wholeTbl', 'a:tcStyle', 'a:tcBdr', 'a:bottom', 'a:ln']);
  }
  let lin_top = getTextByPathList(tcNode, ['a:tcPr', 'a:lnT']);
  if (!lin_top) {
    if (cellSource) lin_top = getTextByPathList(thisTblStyle[cellSource], ['a:tcStyle', 'a:tcBdr', 'a:top', 'a:ln']);
    if (!lin_top) lin_top = getTextByPathList(thisTblStyle, ['a:wholeTbl', 'a:tcStyle', 'a:tcBdr', 'a:top', 'a:ln']);
  }
  let lin_left = getTextByPathList(tcNode, ['a:tcPr', 'a:lnL']);
  if (!lin_left) {
    if (cellSource) lin_left = getTextByPathList(thisTblStyle[cellSource], ['a:tcStyle', 'a:tcBdr', 'a:left', 'a:ln']);
    if (!lin_left) lin_left = getTextByPathList(thisTblStyle, ['a:wholeTbl', 'a:tcStyle', 'a:tcBdr', 'a:left', 'a:ln']);
  }
  let lin_right = getTextByPathList(tcNode, ['a:tcPr', 'a:lnR']);
  if (!lin_right) {
    if (cellSource) lin_right = getTextByPathList(thisTblStyle[cellSource], ['a:tcStyle', 'a:tcBdr', 'a:right', 'a:ln']);
    if (!lin_right) lin_right = getTextByPathList(thisTblStyle, ['a:wholeTbl', 'a:tcStyle', 'a:tcBdr', 'a:right', 'a:ln']);
  }

  const borders = {};
  if (lin_bottm) borders.bottom = getBorder(lin_bottm, undefined, warpObj);
  if (lin_top) borders.top = getBorder(lin_top, undefined, warpObj);
  if (lin_left) borders.left = getBorder(lin_left, undefined, warpObj);
  if (lin_right) borders.right = getBorder(lin_right, undefined, warpObj);

  return {
    fillColor,
    fontColor,
    fontBold,
    borders,
    rowSpan: rowSpan ? +rowSpan : undefined,
    colSpan: colSpan ? +colSpan : undefined,
    vMerge: vMerge ? +vMerge : undefined,
    hMerge: hMerge ? +hMerge : undefined,
  }
}

function getTableRowParams(trNodes, i, tblStylAttrObj, thisTblStyle, warpObj) {
  let fillColor;
  let fontColor;
  let fontBold;

  if (thisTblStyle && thisTblStyle['a:wholeTbl']) {
    const bgFillschemeClr = getTextByPathList(thisTblStyle, ['a:wholeTbl', 'a:tcStyle', 'a:fill', 'a:solidFill']);
    if (bgFillschemeClr) {
      const local_fillColor = getSolidFill(bgFillschemeClr, undefined, undefined, warpObj);
      if (local_fillColor) fillColor = local_fillColor;
    }
    const rowTxtStyl = getTextByPathList(thisTblStyle, ['a:wholeTbl', 'a:tcTxStyle']);
    if (rowTxtStyl) {
      const local_fontColor = getSolidFill(rowTxtStyl, undefined, undefined, warpObj);
      if (local_fontColor) fontColor = local_fontColor;
      if (getTextByPathList(rowTxtStyl, ['attrs', 'b']) === 'on') fontBold = true;
    }
  }
  if (i === 0 && tblStylAttrObj['isFrstRowAttr'] === 1 && thisTblStyle) {
    const bgFillschemeClr = getTextByPathList(thisTblStyle, ['a:firstRow', 'a:tcStyle', 'a:fill', 'a:solidFill']);
    if (bgFillschemeClr) {
      const local_fillColor = getSolidFill(bgFillschemeClr, undefined, undefined, warpObj);
      if (local_fillColor) fillColor = local_fillColor;
    }
    const rowTxtStyl = getTextByPathList(thisTblStyle, ['a:firstRow', 'a:tcTxStyle']);
    if (rowTxtStyl) {
      const local_fontColor = getSolidFill(rowTxtStyl, undefined, undefined, warpObj);
      if (local_fontColor) fontColor = local_fontColor;
      if (getTextByPathList(rowTxtStyl, ['attrs', 'b']) === 'on') fontBold = true;
    }
  }
  else if (i > 0 && tblStylAttrObj['isBandRowAttr'] === 1 && thisTblStyle) {
    fillColor = '';
    if ((i % 2) === 0 && thisTblStyle['a:band2H']) {
      const bgFillschemeClr = getTextByPathList(thisTblStyle, ['a:band2H', 'a:tcStyle', 'a:fill', 'a:solidFill']);
      if (bgFillschemeClr) {
        const local_fillColor = getSolidFill(bgFillschemeClr, undefined, undefined, warpObj);
        if (local_fillColor) fillColor = local_fillColor;
      }
      const rowTxtStyl = getTextByPathList(thisTblStyle, ['a:band2H', 'a:tcTxStyle']);
      if (rowTxtStyl) {
        const local_fontColor = getSolidFill(rowTxtStyl, undefined, undefined, warpObj);
        if (local_fontColor) fontColor = local_fontColor;
      }
      if (getTextByPathList(rowTxtStyl, ['attrs', 'b']) === 'on') fontBold = true;
    }
    if ((i % 2) !== 0 && thisTblStyle['a:band1H']) {
      const bgFillschemeClr = getTextByPathList(thisTblStyle, ['a:band1H', 'a:tcStyle', 'a:fill', 'a:solidFill']);
      if (bgFillschemeClr) {
        const local_fillColor = getSolidFill(bgFillschemeClr, undefined, undefined, warpObj);
        if (local_fillColor) fillColor = local_fillColor;
      }
      const rowTxtStyl = getTextByPathList(thisTblStyle, ['a:band1H', 'a:tcTxStyle']);
      if (rowTxtStyl) {
        const local_fontColor = getSolidFill(rowTxtStyl, undefined, undefined, warpObj);
        if (local_fontColor) fontColor = local_fontColor;
        if (getTextByPathList(rowTxtStyl, ['attrs', 'b']) === 'on') fontBold = true;
      }
    }
  }
  if (i === (trNodes.length - 1) && tblStylAttrObj['isLstRowAttr'] === 1 && thisTblStyle) {
    const bgFillschemeClr = getTextByPathList(thisTblStyle, ['a:lastRow', 'a:tcStyle', 'a:fill', 'a:solidFill']);
    if (bgFillschemeClr) {
      const local_fillColor = getSolidFill(bgFillschemeClr, undefined, undefined, warpObj);
      if (local_fillColor) {
        fillColor = local_fillColor;
      }
    }
    const rowTxtStyl = getTextByPathList(thisTblStyle, ['a:lastRow', 'a:tcTxStyle']);
    if (rowTxtStyl) {
      const local_fontColor = getSolidFill(rowTxtStyl, undefined, undefined, warpObj);
      if (local_fontColor) fontColor = local_fontColor;
      if (getTextByPathList(rowTxtStyl, ['attrs', 'b']) === 'on') fontBold = true;
    }
  }

  return {
    fillColor,
    fontColor,
    fontBold,
  }
}

function findOMath(obj) {
  let results = [];
  if (typeof obj !== 'object') return results
  if (obj['m:oMath']) results = results.concat(obj['m:oMath']);
  
  Object.values(obj).forEach(value => {
    if (Array.isArray(value) || typeof value === 'object') {
      results = results.concat(findOMath(value));
    }
  });
  return results
}

function parseFraction(fraction) {
  const numerator = parseOMath(fraction['m:num']);
  const denominator = parseOMath(fraction['m:den']);
  return `\\frac{${numerator}}{${denominator}}`
}
function parseSuperscript(superscript) {
  const base = parseOMath(superscript['m:e']);
  const sup = parseOMath(superscript['m:sup']);
  return `${base}^{${sup}}`
}
function parseSubscript(subscript) {
  const base = parseOMath(subscript['m:e']);
  const sub = parseOMath(subscript['m:sub']);
  return `${base}_{${sub}}`
}
function parseRadical(radical) {
  const degree = parseOMath(radical['m:deg']);
  const expression = parseOMath(radical['m:e']);
  return degree ? `\\sqrt[${degree}]{${expression}}` : `\\sqrt{${expression}}`
}
function parseMatrix(matrix) {
  const rows = matrix['m:mr'];
  const matrixRows = rows.map((row) => {
    return row['m:e'].map((element) => parseOMath(element)).join(' & ')
  });
  return `\\begin{matrix} ${matrixRows.join(' \\\\ ')} \\end{matrix}`
}
function parseNary(nary) {
  const op = getTextByPathList(nary, ['m:naryPr', 'm:chr', 'attrs', 'm:val']) || '∫';
  const sub = parseOMath(nary['m:sub']);
  const sup = parseOMath(nary['m:sup']);
  const e = parseOMath(nary['m:e']);
  return `${op}_{${sub}}^{${sup}}{${e}}`
}
function parseLimit(limit, type) {
  const base = parseOMath(limit['m:e']);
  const lim = parseOMath(limit['m:lim']);
  return type === 'low' ? `${base}_{${lim}}` : `${base}^{${lim}}`
}
function parseDelimiter(delimiter) {
  let left = getTextByPathList(delimiter, ['m:dPr', 'm:begChr', 'attrs', 'm:val']);
  let right = getTextByPathList(delimiter, ['m:dPr', 'm:endChr', 'attrs', 'm:val']);
  if (!left && !right) {
    left = '(';
    right = ')';
  }
  if (left && right) {
    left = `\\left${left}`;
    right = `\\right${right}`;
  }
  const e = parseOMath(delimiter['m:e']);
  return `${left}${e}${right}`
}
function parseFunction(func) {
  const name = parseOMath(func['m:fName']);
  const arg = parseOMath(func['m:e']);
  return `\\${name}{${arg}}`
}
function parseGroupChr(groupChr) {
  const chr = getTextByPathList(groupChr, ['m:groupChrPr', 'm:chr', 'attrs', 'm:val']);
  const e = parseOMath(groupChr['m:e']);
  return `${chr}${e}${chr}`
}
function parseEqArr(eqArr) {
  const equations = eqArr['m:e'].map((eq) => parseOMath(eq)).join(' \\\\ ');
  return `\\begin{cases} ${equations} \\end{cases}`
}
function parseBar(bar) {
  const e = parseOMath(bar['m:e']);
  const pos = getTextByPathList(bar, ['m:barPr', 'm:pos', 'attrs', 'm:val']);
  return pos === 'top' ? `\\overline{${e}}` : `\\underline{${e}}`
}
function parseAccent(accent) {
  const chr = getTextByPathList(accent, ['m:accPr', 'm:chr', 'attrs', 'm:val']) || '^';
  const e = parseOMath(accent['m:e']);
  switch (chr) {
    case '\u0301':
      return `\\acute{${e}}`
    case '\u0300':
      return `\\grave{${e}}`
    case '\u0302':
      return `\\hat{${e}}`
    case '\u0303':
      return `\\tilde{${e}}`
    case '\u0304':
      return `\\bar{${e}}`
    case '\u0306':
      return `\\breve{${e}}`
    case '\u0307':
      return `\\dot{${e}}`
    case '\u0308':
      return `\\ddot{${e}}`
    case '\u030A':
      return `\\mathring{${e}}`
    case '\u030B':
      return `\\H{${e}}`
    case '\u030C':
      return `\\check{${e}}`
    case '\u0327':
      return `\\c{${e}}`
    default:
      return `\\${chr}{${e}}`
  }
}
function parseBox(box) {
  const e = parseOMath(box['m:e']);
  return `\\boxed{${e}}`
}


function parseOMath(oMath) {
  if (!oMath) return ''

  if (Array.isArray(oMath)) {
    return oMath.map(item => parseOMath(item)).join('')
  }

  const oMathList = [];
  const keys = Object.keys(oMath);
  for (const key of keys) {
    if (Array.isArray(oMath[key])) {
      oMathList.push(...oMath[key].map(item => ({ key, value: item })));
    }
    else oMathList.push({ key, value: oMath[key] });
  }

  oMathList.sort((a, b) => {
    let oA = 0;
    if (a.key === 'm:r' && a.value && a.value['a:rPr']) oA = a.value['a:rPr']['attrs']['order'];
    else if (a.value[`${a.key}Pr`] && a.value[`${a.key}Pr`]['m:ctrlPr'] && a.value[`${a.key}Pr`]['m:ctrlPr']['a:rPr']) {
      oA = a.value[`${a.key}Pr`] && a.value[`${a.key}Pr`]['m:ctrlPr'] && a.value[`${a.key}Pr`]['m:ctrlPr']['a:rPr'] && a.value[`${a.key}Pr`]['m:ctrlPr']['a:rPr']['attrs']['order'];
    }
    let oB = 0;
    if (b.key === 'm:r' && b.value && b.value['a:rPr']) oB = b.value['a:rPr']['attrs']['order'];
    else if (b.value[`${b.key}Pr`] && b.value[`${b.key}Pr`]['m:ctrlPr'] && b.value[`${b.key}Pr`]['m:ctrlPr']['a:rPr']) {
      oB = b.value[`${b.key}Pr`] && b.value[`${b.key}Pr`]['m:ctrlPr'] && b.value[`${b.key}Pr`]['m:ctrlPr']['a:rPr'] && b.value[`${b.key}Pr`]['m:ctrlPr']['a:rPr']['attrs']['order'];
    }
    return oA - oB
  });

  return oMathList.map(({ key, value }) => {
    if (key === 'm:f') return parseFraction(value)
    if (key === 'm:sSup') return parseSuperscript(value)
    if (key === 'm:sSub') return parseSubscript(value)
    if (key === 'm:rad') return parseRadical(value)
    if (key === 'm:nary') return parseNary(value)
    if (key === 'm:limLow') return parseLimit(value, 'low')
    if (key === 'm:limUpp') return parseLimit(value, 'upp')
    if (key === 'm:d') return parseDelimiter(value)
    if (key === 'm:func') return parseFunction(value)
    if (key === 'm:groupChr') return parseGroupChr(value)
    if (key === 'm:eqArr') return parseEqArr(value)
    if (key === 'm:bar') return parseBar(value)
    if (key === 'm:acc') return parseAccent(value)
    if (key === 'm:borderBox') return parseBox(value)
    if (key === 'm:m') return parseMatrix(value)
    if (key === 'm:r') return parseOMath(value)
    if (key === 'm:t') return value
    return ''
  }).join('')
}

function latexFormart(latex) {
  return latex.replaceAll(/&lt;/g, '<')
    .replaceAll(/&gt;/g, '>')
    .replaceAll(/&amp;/g, '&')
    .replaceAll(/&apos;/g, "'")
    .replaceAll(/&quot;/g, '"')
}

/* eslint-disable max-lines */


function shapePie(H, w, adj1, adj2, isClose) {
  const pieVal = parseInt(adj2);
  const piAngle = parseInt(adj1);
  const size = parseInt(H);
  const radius = size / 2;

  let value = pieVal - piAngle;
  if (value < 0) value = 360 + value;
  value = Math.min(Math.max(value, 0), 360);

  const x = Math.cos((2 * Math.PI) / (360 / value));
  const y = Math.sin((2 * Math.PI) / (360 / value));

  let longArc, d;
  if (isClose) {
    longArc = (value <= 180) ? 0 : 1;
    d = `M${radius},${radius} L${radius},0 A${radius},${radius} 0 ${longArc},1 ${radius + y * radius},${radius - x * radius} z`;
  } 
  else {
    longArc = (value <= 180) ? 0 : 1;
    const radius1 = radius;
    const radius2 = w / 2;
    d = `M${radius1},0 A${radius2},${radius1} 0 ${longArc},1 ${radius2 + y * radius2},${radius1 - x * radius1}`;
  }

  return d
}
function shapeGear(h, points) {
  const innerRadius = h;
  const outerRadius = 1.5 * innerRadius;
  const cx = outerRadius;
  const cy = outerRadius;
  const notches = points;
  const radiusO = outerRadius;
  const radiusI = innerRadius;
  const taperO = 50;
  const taperI = 35;
  const pi2 = 2 * Math.PI;
  const angle = pi2 / (notches * 2);
  const taperAI = angle * taperI * 0.005;
  const taperAO = angle * taperO * 0.005;

  let a = angle;
  let toggle = false;

  let d = ' M' + (cx + radiusO * Math.cos(taperAO)) + ' ' + (cy + radiusO * Math.sin(taperAO));

  for (; a <= pi2 + angle; a += angle) {
    if (toggle) {
      d += ' L' + (cx + radiusI * Math.cos(a - taperAI)) + ',' + (cy + radiusI * Math.sin(a - taperAI));
      d += ' L' + (cx + radiusO * Math.cos(a + taperAO)) + ',' + (cy + radiusO * Math.sin(a + taperAO));
    } 
    else {
      d += ' L' + (cx + radiusO * Math.cos(a - taperAO)) + ',' + (cy + radiusO * Math.sin(a - taperAO));
      d += ' L' + (cx + radiusI * Math.cos(a + taperAI)) + ',' + (cy + radiusI * Math.sin(a + taperAI));
    }
    toggle = !toggle;
  }
  d += ' ';
  return d
}

function shapeArc(cX, cY, rX, rY, stAng, endAng, isClose) {
  let dData = '';
  const increment = (endAng >= stAng) ? 1 : -1;
  let angle = stAng;

  const condition = (a) => (increment > 0 ? a <= endAng : a >= endAng);

  while (condition(angle)) {
    const radians = angle * (Math.PI / 180);
    const x = cX + Math.cos(radians) * rX;
    const y = cY + Math.sin(radians) * rY;
    if (angle === stAng) {
      dData = ` M${x} ${y}`;
    }
    dData += ` L${x} ${y}`;
    angle += increment;
  }

  if (isClose) {
    dData += ' z';
  }
  return dData
}

function shapeSnipRoundRect(w, h, adj1, adj2, shapeType, adjType) {
  let adjA, adjB, adjC, adjD;

  switch (adjType) {
    case 'cornr1':
      adjA = 0;
      adjB = 0;
      adjC = 0;
      adjD = adj1;
      break
    case 'cornr2':
      adjA = adj1;
      adjB = adj2;
      adjC = adj2;
      adjD = adj1;
      break
    case 'cornrAll':
      adjA = adj1;
      adjB = adj1;
      adjC = adj1;
      adjD = adj1;
      break
    case 'diag':
      adjA = adj1;
      adjB = adj2;
      adjC = adj1;
      adjD = adj2;
      break
    case 'cornrTL':
      adjA = adj1;
      adjB = 0;
      adjC = 0;
      adjD = 0;
      break
    default:
      adjA = adjB = adjC = adjD = 0;
  }

  if (shapeType === 'round') {
    return `M0,${h / 2 + (1 - adjB) * (h / 2)} Q0,${h} ${adjB * (w / 2)},${h} L${w / 2 + (1 - adjC) * (w / 2)},${h} Q${w},${h} ${w},${h / 2 + (h / 2) * (1 - adjC)} L${w},${(h / 2) * adjD} Q${w},0 ${w / 2 + (w / 2) * (1 - adjD)},0 L${(w / 2) * adjA},0 Q0,0 0,${(h / 2) * (adjA)} z`
  } 
  else if (shapeType === 'snip') {
    return `M0,${adjA * (h / 2)} L0,${h / 2 + (h / 2) * (1 - adjB)} L${adjB * (w / 2)},${h} L${w / 2 + (w / 2) * (1 - adjC)},${h} L${w},${h / 2 + (h / 2) * (1 - adjC)} L${w},${adjD * (h / 2)} L${w / 2 + (w / 2) * (1 - adjD)},0 L${(w / 2) * adjA},0 z`
  }
  return ''
}

function getShapePath(shapType, w, h, node) {
  let pathData = '';

  switch (shapType) {
    case 'rect':
    case 'actionButtonBlank':
      pathData = `M 0 0 L ${w} 0 L ${w} ${h} L 0 ${h} Z`;
      break
    case 'flowChartPredefinedProcess':
      pathData = `M 0 0 L ${w} 0 L ${w} ${h} L 0 ${h} Z M ${w * (1 / 8)} 0 L ${w * (1 / 8)} ${h} M ${w * (7 / 8)} 0 L ${w * (7 / 8)} ${h}`;
      break
    case 'flowChartInternalStorage':
      pathData = `M 0 0 L ${w} 0 L ${w} ${h} L 0 ${h} Z M ${w * (1 / 8)} 0 L ${w * (1 / 8)} ${h} M 0 ${h * (1 / 8)} L ${w} ${h * (1 / 8)}`;
      break
    case 'flowChartCollate':
      pathData = `M 0,0 L ${w},0 L 0,${h} L ${w},${h} z`;
      break
    case 'flowChartDocument':
      {
        const x1 = w * 10800 / 21600;
        const y1 = h * 17322 / 21600;
        const y2 = h * 20172 / 21600;
        const y3 = h * 23922 / 21600;
        pathData = `M 0,0 L ${w},0 L ${w},${y1} C ${x1},${y1} ${x1},${y3} 0,${y2} z`;
      }
      break
    case 'flowChartMultidocument':
      {
        const y1 = h * 18022 / 21600;
        const y2 = h * 3675 / 21600;
        const y3 = h * 23542 / 21600;
        const y4 = h * 1815 / 21600;
        const y5 = h * 16252 / 21600;
        const y6 = h * 16352 / 21600;
        const y7 = h * 14392 / 21600;
        const y8 = h * 20782 / 21600;
        const y9 = h * 14467 / 21600;
        const x1 = w * 1532 / 21600;
        const x2 = w * 20000 / 21600;
        const x3 = w * 9298 / 21600;
        const x4 = w * 19298 / 21600;
        const x5 = w * 18595 / 21600;
        const x6 = w * 2972 / 21600;
        const x7 = w * 20800 / 21600;
        pathData = `M 0,${y2} L ${x5},${y2} L ${x5},${y1} C ${x3},${y1} ${x3},${y3} 0,${y8} z M ${x1},${y2} L ${x1},${y4} L ${x2},${y4} L ${x2},${y5} C ${x4},${y5} ${x5},${y6} ${x5},${y6} M ${x6},${y4} L ${x6},0 L ${w},0 L ${w},${y7} C ${x7},${y7} ${x2},${y9} ${x2},${y9}`;
      }
      break
    case 'actionButtonBackPrevious':
      {
        const hc = w / 2,
          vc = h / 2,
          ss = Math.min(w, h);
        const dx2 = ss * 3 / 8;
        const g9 = vc - dx2;
        const g10 = vc + dx2;
        const g11 = hc - dx2;
        const g12 = hc + dx2;
        pathData = `M 0,0 L ${w},0 L ${w},${h} L 0,${h} z M ${g11},${vc} L ${g12},${g9} L ${g12},${g10} z`;
      }
      break
    case 'actionButtonBeginning':
      {
        const hc = w / 2,
          vc = h / 2,
          ss = Math.min(w, h);
        const dx2 = ss * 3 / 8;
        const g9 = vc - dx2;
        const g10 = vc + dx2;
        const g11 = hc - dx2;
        const g12 = hc + dx2;
        const g13 = ss * 3 / 4;
        const g14 = g13 / 8;
        const g15 = g13 / 4;
        const g16 = g11 + g14;
        const g17 = g11 + g15;
        pathData = `M 0,0 L ${w},0 L ${w},${h} L 0,${h} z M ${g17},${vc} L ${g12},${g9} L ${g12},${g10} z M ${g16},${g9} L ${g11},${g9} L ${g11},${g10} L ${g16},${g10} z`;
      }
      break
    case 'actionButtonDocument':
      {
        const hc = w / 2,
          vc = h / 2,
          ss = Math.min(w, h);
        const dx2 = ss * 3 / 8;
        const g9 = vc - dx2;
        const g10 = vc + dx2;
        const dx1 = ss * 9 / 32;
        const g11 = hc - dx1;
        const g12 = hc + dx1;
        const g13 = ss * 3 / 16;
        const g14 = g12 - g13;
        const g15 = g9 + g13;
        pathData = `M 0,0 L ${w},0 L ${w},${h} L 0,${h} z M ${g11},${g9} L ${g14},${g9} L ${g12},${g15} L ${g12},${g10} L ${g11},${g10} z M ${g14},${g9} L ${g14},${g15} L ${g12},${g15} z`;
      }
      break
    case 'actionButtonEnd':
      {
        const hc = w / 2,
          vc = h / 2,
          ss = Math.min(w, h);
        const dx2 = ss * 3 / 8;
        const g9 = vc - dx2;
        const g10 = vc + dx2;
        const g11 = hc - dx2;
        const g12 = hc + dx2;
        const g13 = ss * 3 / 4;
        const g14 = g13 * 3 / 4;
        const g15 = g13 * 7 / 8;
        const g16 = g11 + g14;
        const g17 = g11 + g15;
        pathData = `M 0,${h} L ${w},${h} L ${w},0 L 0,0 z M ${g17},${g9} L ${g12},${g9} L ${g12},${g10} L ${g17},${g10} z M ${g16},${vc} L ${g11},${g9} L ${g11},${g10} z`;
      }
      break
    case 'actionButtonForwardNext':
      {
        const hc = w / 2,
          vc = h / 2,
          ss = Math.min(w, h);
        const dx2 = ss * 3 / 8;
        const g9 = vc - dx2;
        const g10 = vc + dx2;
        const g11 = hc - dx2;
        const g12 = hc + dx2;
        pathData = `M 0,${h} L ${w},${h} L ${w},0 L 0,0 z M ${g12},${vc} L ${g11},${g9} L ${g11},${g10} z`;
      }
      break
    case 'actionButtonHelp':
      {
        const hc = w / 2,
          vc = h / 2,
          ss = Math.min(w, h);
        const dx2 = ss * 3 / 8;
        const g9 = vc - dx2;
        const g11 = hc - dx2;
        const g13 = ss * 3 / 4;
        const g14 = g13 / 7;
        const g15 = g13 * 3 / 14;
        const g16 = g13 * 2 / 7;
        const g19 = g13 * 3 / 7;
        const g20 = g13 * 4 / 7;
        const g21 = g13 * 17 / 28;
        const g23 = g13 * 21 / 28;
        const g24 = g13 * 11 / 14;
        const g27 = g9 + g16;
        const g29 = g9 + g21;
        const g30 = g9 + g23;
        const g31 = g9 + g24;
        const g33 = g11 + g15;
        const g36 = g11 + g19;
        const g37 = g11 + g20;
        const g41 = g13 / 14;
        const g42 = g13 * 3 / 28;
        const cX1 = g33 + g16;
        const cX2 = g36 + g14;
        const cY3 = g31 + g42;
        const cX4 = (g37 + g36 + g16) / 2;
        pathData = `M 0,0 L ${w},0 L ${w},${h} L 0,${h} z M ${g33},${g27} ${shapeArc(cX1, g27, g16, g16, 180, 360, false).replace('M', 'L')} ${shapeArc(cX4, g27, g14, g15, 0, 90, false).replace('M', 'L')} ${shapeArc(cX4, g29, g41, g42, 270, 180, false).replace('M', 'L')} L ${g37},${g30} L ${g36},${g30} L ${g36},${g29} ${shapeArc(cX2, g29, g14, g15, 180, 270, false).replace('M', 'L')} ${shapeArc(g37, g27, g41, g42, 90, 0, false).replace('M', 'L')} ${shapeArc(cX1, g27, g14, g14, 0, -180, false).replace('M', 'L')} z M ${hc},${g31} ${shapeArc(hc, cY3, g42, g42, 270, 630, false).replace('M', 'L')} z`;
      }
      break
    case 'actionButtonHome':
      {
        const hc = w / 2,
          vc = h / 2,
          ss = Math.min(w, h);
        const dx2 = ss * 3 / 8;
        const g9 = vc - dx2;
        const g10 = vc + dx2;
        const g11 = hc - dx2;
        const g12 = hc + dx2;
        const g13 = ss * 3 / 4;
        const g14 = g13 / 16;
        const g15 = g13 / 8;
        const g16 = g13 * 3 / 16;
        const g17 = g13 * 5 / 16;
        const g18 = g13 * 7 / 16;
        const g19 = g13 * 9 / 16;
        const g20 = g13 * 11 / 16;
        const g21 = g13 * 3 / 4;
        const g22 = g13 * 13 / 16;
        const g23 = g13 * 7 / 8;
        const g24 = g9 + g14;
        const g25 = g9 + g16;
        const g26 = g9 + g17;
        const g27 = g9 + g21;
        const g28 = g11 + g15;
        const g29 = g11 + g18;
        const g30 = g11 + g19;
        const g31 = g11 + g20;
        const g32 = g11 + g22;
        const g33 = g11 + g23;
        pathData = `M 0,0 L ${w},0 L ${w},${h} L 0,${h} z M ${hc},${g9} L ${g11},${vc} L ${g28},${vc} L ${g28},${g10} L ${g33},${g10} L ${g33},${vc} L ${g12},${vc} L ${g32},${g26} L ${g32},${g24} L ${g31},${g24} L ${g31},${g25} z M ${g29},${g27} L ${g30},${g27} L ${g30},${g10} L ${g29},${g10} z`;
      }
      break
    case 'actionButtonInformation':
      {
        const hc = w / 2,
          vc = h / 2,
          ss = Math.min(w, h);
        const dx2 = ss * 3 / 8;
        const g9 = vc - dx2;
        const g11 = hc - dx2;
        const g13 = ss * 3 / 4;
        const g14 = g13 / 32;
        const g17 = g13 * 5 / 16;
        const g18 = g13 * 3 / 8;
        const g19 = g13 * 13 / 32;
        const g20 = g13 * 19 / 32;
        const g22 = g13 * 11 / 16;
        const g23 = g13 * 13 / 16;
        const g24 = g13 * 7 / 8;
        const g25 = g9 + g14;
        const g28 = g9 + g17;
        const g29 = g9 + g18;
        const g30 = g9 + g23;
        const g31 = g9 + g24;
        const g32 = g11 + g17;
        const g34 = g11 + g19;
        const g35 = g11 + g20;
        const g37 = g11 + g22;
        const g38 = g13 * 3 / 32;
        const cY1 = g9 + dx2;
        const cY2 = g25 + g38;
        pathData = `M 0,0 L ${w},0 L ${w},${h} L 0,${h} z M ${hc},${g9} ${shapeArc(hc, cY1, dx2, dx2, 270, 630, false).replace('M', 'L')} z M ${hc},${g25} ${shapeArc(hc, cY2, g38, g38, 270, 630, false).replace('M', 'L')} M ${g32},${g28} L ${g35},${g28} L ${g35},${g30} L ${g37},${g30} L ${g37},${g31} L ${g32},${g31} L ${g32},${g30} L ${g34},${g30} L ${g34},${g29} L ${g32},${g29} z`;
      }
      break
    case 'actionButtonMovie':
      {
        const hc = w / 2,
          vc = h / 2,
          ss = Math.min(w, h);
        const g11 = hc - (ss * 3 / 8);
        const g9 = vc - (ss * 3 / 8);
        const g12 = hc + (ss * 3 / 8);
        const g13 = ss * 3 / 4;
        const g14 = g13 * 1455 / 21600;
        const g15 = g13 * 1905 / 21600;
        const g16 = g13 * 2325 / 21600;
        const g17 = g13 * 16155 / 21600;
        const g18 = g13 * 17010 / 21600;
        const g19 = g13 * 19335 / 21600;
        const g20 = g13 * 19725 / 21600;
        const g21 = g13 * 20595 / 21600;
        const g22 = g13 * 5280 / 21600;
        const g23 = g13 * 5730 / 21600;
        const g24 = g13 * 6630 / 21600;
        const g25 = g13 * 7492 / 21600;
        const g26 = g13 * 9067 / 21600;
        const g27 = g13 * 9555 / 21600;
        const g28 = g13 * 13342 / 21600;
        const g29 = g13 * 14580 / 21600;
        const g30 = g13 * 15592 / 21600;
        const g31 = g11 + g14;
        const g32 = g11 + g15;
        const g33 = g11 + g16;
        const g34 = g11 + g17;
        const g35 = g11 + g18;
        const g36 = g11 + g19;
        const g37 = g11 + g20;
        const g38 = g11 + g21;
        const g39 = g9 + g22;
        const g40 = g9 + g23;
        const g41 = g9 + g24;
        const g42 = g9 + g25;
        const g43 = g9 + g26;
        const g44 = g9 + g27;
        const g45 = g9 + g28;
        const g46 = g9 + g29;
        const g47 = g9 + g30;
        pathData = `M 0,${h} L ${w},${h} L ${w},0 L 0,0 z M ${g11},${g39} L ${g11},${g44} L ${g31},${g44} L ${g32},${g43} L ${g33},${g43} L ${g33},${g47} L ${g35},${g47} L ${g35},${g45} L ${g36},${g45} L ${g38},${g46} L ${g12},${g46} L ${g12},${g41} L ${g38},${g41} L ${g37},${g42} L ${g35},${g42} L ${g35},${g41} L ${g34},${g40} L ${g32},${g40} L ${g31},${g39} z`;
      }
      break
    case 'actionButtonReturn':
      {
        const hc = w / 2,
          vc = h / 2,
          ss = Math.min(w, h);
        const dx2 = ss * 3 / 8;
        const g9 = vc - dx2;
        const g10 = vc + dx2;
        const g11 = hc - dx2;
        const g12 = hc + dx2;
        const g13 = ss * 3 / 4;
        const g14 = g13 * 7 / 8;
        const g15 = g13 * 3 / 4;
        const g16 = g13 * 5 / 8;
        const g17 = g13 * 3 / 8;
        const g18 = g13 / 4;
        const g19 = g9 + g15;
        const g20 = g9 + g16;
        const g21 = g9 + g18;
        const g22 = g11 + g14;
        const g23 = g11 + g15;
        const g24 = g11 + g16;
        const g25 = g11 + g17;
        const g26 = g11 + g18;
        const g27 = g13 / 8;
        const cX1 = g24 - g27;
        const cY2 = g19 - g27;
        const cX3 = g11 + g17;
        const cY4 = g10 - g17;
        pathData = `M 0,${h} L ${w},${h} L ${w},0 L 0,0 z M ${g12},${g21} L ${g23},${g9} L ${hc},${g21} L ${g24},${g21} L ${g24},${g20} ${shapeArc(cX1, g20, g27, g27, 0, 90, false).replace('M', 'L')} L ${g25},${g19} ${shapeArc(g25, cY2, g27, g27, 90, 180, false).replace('M', 'L')} L ${g26},${g21} L ${g11},${g21} L ${g11},${g20} ${shapeArc(cX3, g20, g17, g17, 180, 90, false).replace('M', 'L')} L ${hc},${g10} ${shapeArc(hc, cY4, g17, g17, 90, 0, false).replace('M', 'L')} L ${g22},${g21} z`;
      }
      break
    case 'actionButtonSound':
      {
        const hc = w / 2,
          vc = h / 2,
          ss = Math.min(w, h);
        const dx2 = ss * 3 / 8;
        const g9 = vc - dx2;
        const g10 = vc + dx2;
        const g11 = hc - dx2;
        const g12 = hc + dx2;
        const g13 = ss * 3 / 4;
        const g14 = g13 / 8;
        const g15 = g13 * 5 / 16;
        const g16 = g13 * 5 / 8;
        const g17 = g13 * 11 / 16;
        const g18 = g13 * 3 / 4;
        const g19 = g13 * 7 / 8;
        const g20 = g9 + g14;
        const g21 = g9 + g15;
        const g22 = g9 + g17;
        const g23 = g9 + g19;
        const g24 = g11 + g15;
        const g25 = g11 + g16;
        const g26 = g11 + g18;
        pathData = `M 0,0 L ${w},0 L ${w},${h} L 0,${h} z M ${g11},${g21} L ${g24},${g21} L ${g25},${g9} L ${g25},${g10} L ${g24},${g22} L ${g11},${g22} z M ${g26},${g21} L ${g12},${g20} M ${g26},${vc} L ${g12},${vc} M ${g26},${g22} L ${g12},${g23}`;
      }
      break
    case 'irregularSeal1':
      pathData = `M ${w * 10800 / 21600},${h * 5800 / 21600} L ${w * 14522 / 21600},0 L ${w * 14155 / 21600},${h * 5325 / 21600} L ${w * 18380 / 21600},${h * 4457 / 21600} L ${w * 16702 / 21600},${h * 7315 / 21600} L ${w * 21097 / 21600},${h * 8137 / 21600} L ${w * 17607 / 21600},${h * 10475 / 21600} L ${w},${h * 13290 / 21600} L ${w * 16837 / 21600},${h * 12942 / 21600} L ${w * 18145 / 21600},${h * 18095 / 21600} L ${w * 14020 / 21600},${h * 14457 / 21600} L ${w * 13247 / 21600},${h * 19737 / 21600} L ${w * 10532 / 21600},${h * 14935 / 21600} L ${w * 8485 / 21600},${h} L ${w * 7715 / 21600},${h * 15627 / 21600} L ${w * 4762 / 21600},${h * 17617 / 21600} L ${w * 5667 / 21600},${h * 13937 / 21600} L ${w * 135 / 21600},${h * 14587 / 21600} L ${w * 3722 / 21600},${h * 11775 / 21600} L 0,${h * 8615 / 21600} L ${w * 4627 / 21600},${h * 7617 / 21600} L ${w * 370 / 21600},${h * 2295 / 21600} L ${w * 7312 / 21600},${h * 6320 / 21600} L ${w * 8352 / 21600},${h * 2295 / 21600} z`;
      break
    case 'irregularSeal2':
      pathData = `M ${w * 11462 / 21600},${h * 4342 / 21600} L ${w * 14790 / 21600},0 L ${w * 14525 / 21600},${h * 5777 / 21600} L ${w * 18007 / 21600},${h * 3172 / 21600} L ${w * 16380 / 21600},${h * 6532 / 21600} L ${w},${h * 6645 / 21600} L ${w * 16985 / 21600},${h * 9402 / 21600} L ${w * 18270 / 21600},${h * 11290 / 21600} L ${w * 16380 / 21600},${h * 12310 / 21600} L ${w * 18877 / 21600},${h * 15632 / 21600} L ${w * 14640 / 21600},${h * 14350 / 21600} L ${w * 14942 / 21600},${h * 17370 / 21600} L ${w * 12180 / 21600},${h * 15935 / 21600} L ${w * 11612 / 21600},${h * 18842 / 21600} L ${w * 9872 / 21600},${h * 17370 / 21600} L ${w * 8700 / 21600},${h * 19712 / 21600} L ${w * 7527 / 21600},${h * 18125 / 21600} L ${w * 4917 / 21600},${h} L ${w * 4805 / 21600},${h * 18240 / 21600} L ${w * 1285 / 21600},${h * 17825 / 21600} L ${w * 3330 / 21600},${h * 15370 / 21600} L 0,${h * 12877 / 21600} L ${w * 3935 / 21600},${h * 11592 / 21600} L ${w * 1172 / 21600},${h * 8270 / 21600} L ${w * 5372 / 21600},${h * 7817 / 21600} L ${w * 4502 / 21600},${h * 3625 / 21600} L ${w * 8550 / 21600},${h * 6382 / 21600} L ${w * 9722 / 21600},${h * 1887 / 21600} z`;
      break
    case 'flowChartTerminator':
      {
        const cd2 = 180,
          cd4 = 90,
          c3d4 = 270;
        const x1 = w * 3475 / 21600;
        const x2 = w * 18125 / 21600;
        const y1 = h * 10800 / 21600;
        pathData = `M ${x1},0 L ${x2},0 ${shapeArc(x2, h / 2, x1, y1, c3d4, c3d4 + cd2, false).replace('M', 'L')} L ${x1},${h} ${shapeArc(x1, h / 2, x1, y1, cd4, cd4 + cd2, false).replace('M', 'L')} z`;
      }
      break
    case 'flowChartPunchedTape':
      {
        const cd2 = 180;
        const x1 = w * 5 / 20;
        const y1 = h * 2 / 20;
        const y2 = h * 18 / 20;
        pathData = `M 0,${y1} ${shapeArc(x1, y1, x1, y1, cd2, 0, false).replace('M', 'L')} ${shapeArc(w * (3 / 4), y1, x1, y1, cd2, 360, false).replace('M', 'L')} L ${w},${y2} ${shapeArc(w * (3 / 4), y2, x1, y1, 0, -cd2, false).replace('M', 'L')} ${shapeArc(x1, y2, x1, y1, 0, cd2, false).replace('M', 'L')} z`;
      }
      break
    case 'flowChartOnlineStorage':
      {
        const c3d4 = 270,
          cd4 = 90;
        const x1 = w * 1 / 6;
        const y1 = h * 3 / 6;
        pathData = `M ${x1},0 L ${w},0 ${shapeArc(w, h / 2, x1, y1, c3d4, 90, false).replace('M', 'L')} L ${x1},${h} ${shapeArc(x1, h / 2, x1, y1, cd4, 270, false).replace('M', 'L')} z`;
      }
      break
    case 'flowChartDisplay':
      {
        const c3d4 = 270,
          cd2 = 180;
        const x1 = w * 1 / 6;
        const x2 = w * 5 / 6;
        const y1 = h * 3 / 6;
        pathData = `M 0,${y1} L ${x1},0 L ${x2},0 ${shapeArc(w, h / 2, x1, y1, c3d4, c3d4 + cd2, false).replace('M', 'L')} L ${x1},${h} z`;
      }
      break
    case 'flowChartDelay':
      {
        const wd2 = w / 2,
          hd2 = h / 2,
          cd2 = 180,
          c3d4 = 270;
        pathData = `M 0,0 L ${wd2},0 ${shapeArc(wd2, hd2, wd2, hd2, c3d4, c3d4 + cd2, false).replace('M', 'L')} L 0,${h} z`;
      }
      break
    case 'flowChartMagneticTape':
      {
        const wd2 = w / 2,
          hd2 = h / 2,
          cd2 = 180,
          c3d4 = 270,
          cd4 = 90;
        const idy = hd2 * Math.sin(Math.PI / 4);
        const ib = hd2 + idy;
        const ang1 = Math.atan(h / w);
        const ang1Dg = ang1 * 180 / Math.PI;
        pathData = `M ${wd2},${h} ${shapeArc(wd2, hd2, wd2, hd2, cd4, cd2, false).replace('M', 'L')} ${shapeArc(wd2, hd2, wd2, hd2, cd2, c3d4, false).replace('M', 'L')} ${shapeArc(wd2, hd2, wd2, hd2, c3d4, 360, false).replace('M', 'L')} ${shapeArc(wd2, hd2, wd2, hd2, 0, ang1Dg, false).replace('M', 'L')} L ${w},${ib} L ${w},${h} z`;
      }
      break
    case 'ellipse':
    case 'flowChartConnector':
    case 'flowChartSummingJunction':
    case 'flowChartOr':
      {
        const cx = w / 2;
        const cy = h / 2;
        const rx = w / 2;
        const ry = h / 2;

        pathData = `M ${cx - rx},${cy} A ${rx},${ry} 0 1,0 ${cx + rx},${cy} A ${rx},${ry} 0 1,0 ${cx - rx},${cy} Z`;

        if (shapType === 'flowChartOr') {
          pathData += ` M ${w / 2} 0 L ${w / 2} ${h} M 0 ${h / 2} L ${w} ${h / 2}`;
        } 
        else if (shapType === 'flowChartSummingJunction') {
          const angVal = Math.PI / 4;
          const iDx = (w / 2) * Math.cos(angVal);
          const idy = (h / 2) * Math.sin(angVal);
          const il = cx - iDx;
          const ir = cx + iDx;
          const it = cy - idy;
          const ib = cy + idy;
          pathData += ` M ${il} ${it} L ${ir} ${ib} M ${ir} ${it} L ${il} ${ib}`;
        }
      }
      break
    case 'roundRect':
    case 'round1Rect':
    case 'round2DiagRect':
    case 'round2SameRect':
    case 'snip1Rect':
    case 'snip2DiagRect':
    case 'snip2SameRect':
    case 'flowChartAlternateProcess':
    case 'flowChartPunchedCard':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let sAdj1_val, sAdj2_val;
        let shpTyp, adjTyp;

        if (shapAdjst_ary && Array.isArray(shapAdjst_ary)) {
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              const sAdj1 = getTextByPathList(adj, ['attrs', 'fmla']);
              sAdj1_val = parseInt(sAdj1.substring(4)) / 50000;
            } 
            else if (sAdj_name === 'adj2') {
              const sAdj2 = getTextByPathList(adj, ['attrs', 'fmla']);
              sAdj2_val = parseInt(sAdj2.substring(4)) / 50000;
            }
          }
        } 
        else if (shapAdjst_ary) {
          const sAdj = getTextByPathList(shapAdjst_ary, ['attrs', 'fmla']);
          sAdj1_val = parseInt(sAdj.substring(4)) / 50000;
          sAdj2_val = 0;
        }

        switch (shapType) {
          case 'roundRect':
          case 'flowChartAlternateProcess':
            shpTyp = 'round';
            adjTyp = 'cornrAll';
            if (sAdj1_val === undefined) sAdj1_val = 0.33334;
            sAdj2_val = 0;
            break
          case 'round1Rect':
            shpTyp = 'round';
            adjTyp = 'cornr1';
            if (sAdj1_val === undefined) sAdj1_val = 0.33334;
            sAdj2_val = 0;
            break
          case 'round2DiagRect':
            shpTyp = 'round';
            adjTyp = 'diag';
            if (sAdj1_val === undefined) sAdj1_val = 0.33334;
            if (sAdj2_val === undefined) sAdj2_val = 0;
            break
          case 'round2SameRect':
            shpTyp = 'round';
            adjTyp = 'cornr2';
            if (sAdj1_val === undefined) sAdj1_val = 0.33334;
            if (sAdj2_val === undefined) sAdj2_val = 0;
            break
          case 'snip1Rect':
            shpTyp = 'snip';
            adjTyp = 'cornr1';
            if (sAdj1_val === undefined) sAdj1_val = 0.33334;
            sAdj2_val = 0;
            break
          case 'flowChartPunchedCard':
            shpTyp = 'snip';
            adjTyp = 'cornrTL';
            if (sAdj1_val === undefined) sAdj1_val = 0.33334;
            sAdj2_val = 0;
            break
          case 'snip2DiagRect':
            shpTyp = 'snip';
            adjTyp = 'diag';
            if (sAdj1_val === undefined) sAdj1_val = 0;
            if (sAdj2_val === undefined) sAdj2_val = 0.33334;
            break
          case 'snip2SameRect':
            shpTyp = 'snip';
            adjTyp = 'cornr2';
            if (sAdj1_val === undefined) sAdj1_val = 0.33334;
            if (sAdj2_val === undefined) sAdj2_val = 0;
            break
        }
        pathData = shapeSnipRoundRect(w, h, sAdj1_val, sAdj2_val, shpTyp, adjTyp);
      }
      break
    case 'snipRoundRect':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let sAdj1_val = 0.33334;
        let sAdj2_val = 0.33334;
        if (shapAdjst_ary) {
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              const sAdj1 = getTextByPathList(adj, ['attrs', 'fmla']);
              sAdj1_val = parseInt(sAdj1.substring(4)) / 50000;
            } 
            else if (sAdj_name === 'adj2') {
              const sAdj2 = getTextByPathList(adj, ['attrs', 'fmla']);
              sAdj2_val = parseInt(sAdj2.substring(4)) / 50000;
            }
          }
        }
        pathData = `M0,${h} L${w},${h} L${w},${(h / 2) * sAdj2_val} L${w / 2 + (w / 2) * (1 - sAdj2_val)},0 L${(w / 2) * sAdj1_val},0 Q0,0 0,${(h / 2) * sAdj1_val} z`;
      }
      break
    case 'bentConnector2':
      pathData = `M ${w} 0 L ${w} ${h} L 0 ${h}`;
      break
    case 'rtTriangle':
      pathData = `M 0 0 L 0 ${h} L ${w} ${h} Z`;
      break
    case 'triangle':
    case 'flowChartExtract':
    case 'flowChartMerge':
      {
        const shapAdjst = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd', 'attrs', 'fmla']);
        let shapAdjst_val = 0.5;
        if (shapAdjst) {
          shapAdjst_val = parseInt(shapAdjst.substring(4)) * RATIO_EMUs_Points;
        }

        let p1x = w * shapAdjst_val;
        let p1y = 0;
        let p2x = 0;
        let p2y = h;
        let p3x = w;
        let p3y = h;

        if (shapType === 'flowChartMerge') {
          [p1x, p1y] = [w - p1x, h - p1y]
          ;[p2x, p2y] = [w - p2x, h - p2y]
          ;[p3x, p3y] = [w - p3x, h - p3y];
        }

        pathData = `M ${p1x} ${p1y} L ${p2x} ${p2y} L ${p3x} ${p3y} Z`;
      }
      break
    case 'diamond':
    case 'flowChartDecision':
    case 'flowChartSort':
      pathData = `M ${w / 2} 0 L 0 ${h / 2} L ${w / 2} ${h} L ${w} ${h / 2} Z`;
      if (shapType === 'flowChartSort') {
        pathData += ` M 0 ${h / 2} L ${w} ${h / 2}`;
      }
      break
    case 'trapezoid':
    case 'flowChartManualOperation':
    case 'flowChartManualInput':
      {
        const shapAdjst = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd', 'attrs', 'fmla']);
        let adjst_val = 0.2;
        const max_adj_const = 0.7407;
        if (shapAdjst) {
          const adjst = parseInt(shapAdjst.substring(4)) * RATIO_EMUs_Points;
          adjst_val = (adjst * 0.5) / max_adj_const;
        }

        let p1x = w * adjst_val,
          p1y = 0;
        let p2x = 0,
          p2y = h;
        let p3x = w,
          p3y = h;
        let p4x = (1 - adjst_val) * w,
          p4y = 0;

        if (shapType === 'flowChartManualInput') {
          adjst_val = 0;
          p1y = h / 5;
          p1x = w * adjst_val;
          p4x = (1 - adjst_val) * w;
        }

        if (shapType === 'flowChartManualOperation') {
          [p1x, p1y] = [w - p1x, h - p1y]
          ;[p2x, p2y] = [w - p2x, h - p2y]
          ;[p3x, p3y] = [w - p3x, h - p3y]
          ;[p4x, p4y] = [w - p4x, h - p4y];
        }

        pathData = `M ${p1x} ${p1y} L ${p2x} ${p2y} L ${p3x} ${p3y} L ${p4x} ${p4y} Z`;
      }
      break
    case 'parallelogram':
    case 'flowChartInputOutput':
      {
        const shapAdjst = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd', 'attrs', 'fmla']);
        let adjst_val = 0.25;
        if (shapAdjst) {
          const max_adj_const = w > h ? w / h : h / w;
          const adjst = parseInt(shapAdjst.substring(4)) / 100000;
          adjst_val = adjst / max_adj_const;
        }
        pathData = `M ${adjst_val * w} 0 L 0 ${h} L ${(1 - adjst_val) * w} ${h} L ${w} 0 Z`;
      }
      break
    case 'pentagon':
      pathData = `M ${0.5 * w} 0 L 0 ${0.375 * h} L ${0.15 * w} ${h} L ${0.85 * w} ${h} L ${w} ${0.375 * h} Z`;
      break
    case 'hexagon':
    case 'flowChartPreparation':
      {
        const shapAdjst = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd', 'attrs', 'fmla']);
        let adj = 25000 * RATIO_EMUs_Points;
        if (shapAdjst) {
          adj = parseInt(shapAdjst.substring(4)) * RATIO_EMUs_Points;
        }
        const vf = 115470 * RATIO_EMUs_Points;
        const cnstVal1 = 50000 * RATIO_EMUs_Points;
        const cnstVal2 = 100000 * RATIO_EMUs_Points;
        const angVal1 = 60 * Math.PI / 180;
        const ss = Math.min(w, h);
        const maxAdj = cnstVal1 * w / ss;
        const a = (adj < 0) ? 0 : (adj > maxAdj) ? maxAdj : adj;
        const hd2 = h / 2;
        const shd2 = hd2 * vf / cnstVal2;
        const x1 = ss * a / cnstVal2;
        const x2 = w - x1;
        const dy1 = shd2 * Math.sin(angVal1);
        const vc = h / 2;
        const y1 = vc - dy1;
        const y2 = vc + dy1;
        pathData = `M 0,${vc} L ${x1},${y1} L ${x2},${y1} L ${w},${vc} L ${x2},${y2} L ${x1},${y2} z`;
      }
      break
    case 'heptagon':
      pathData = `M ${0.5 * w} 0 L ${w / 8} ${h / 4} L 0 ${5 / 8 * h} L ${w / 4} ${h} L ${3 / 4 * w} ${h} L ${w} ${5 / 8 * h} L ${7 / 8 * w} ${h / 4} Z`;
      break
    case 'octagon':
      {
        const shapAdjst = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd', 'attrs', 'fmla']);
        let adj1 = 0.25;
        if (shapAdjst) {
          adj1 = parseInt(shapAdjst.substring(4)) / 100000;
        }
        const adj2 = (1 - adj1);
        pathData = `M ${adj1 * w} 0 L 0 ${adj1 * h} L 0 ${adj2 * h} L ${adj1 * w} ${h} L ${adj2 * w} ${h} L ${w} ${adj2 * h} L ${w} ${adj1 * h} L ${adj2 * w} 0 Z`;
      }
      break
    case 'decagon':
      pathData = `M ${3 / 8 * w} 0 L ${w / 8} ${h / 8} L 0 ${h / 2} L ${w / 8} ${7 / 8 * h} L ${3 / 8 * w} ${h} L ${5 / 8 * w} ${h} L ${7 / 8 * w} ${7 / 8 * h} L ${w} ${h / 2} L ${7 / 8 * w} ${h / 8} L ${5 / 8 * w} 0 Z`;
      break
    case 'dodecagon':
      pathData = `M ${3 / 8 * w} 0 L ${w / 8} ${h / 8} L 0 ${3 / 8 * h} L 0 ${5 / 8 * h} L ${w / 8} ${7 / 8 * h} L ${3 / 8 * w} ${h} L ${5 / 8 * w} ${h} L ${7 / 8 * w} ${7 / 8 * h} L ${w} ${5 / 8 * h} L ${w} ${3 / 8 * h} L ${7 / 8 * w} ${h / 8} L ${5 / 8 * w} 0 Z`;
      break
    case 'star4':
      {
        const hc = w / 2,
          vc = h / 2,
          wd2 = w / 2,
          hd2 = h / 2;
        let adj = 19098 * RATIO_EMUs_Points;
        const cnstVal1 = 50000 * RATIO_EMUs_Points;
        const shapAdjst = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        if (shapAdjst) {
          const name = shapAdjst['attrs']['name'];
          if (name === 'adj') {
            adj = parseInt(shapAdjst['attrs']['fmla'].substring(4)) * RATIO_EMUs_Points;
          }
        }
        const a = (adj < 0) ? 0 : (adj > cnstVal1) ? cnstVal1 : adj;
        const iwd2 = wd2 * a / cnstVal1;
        const ihd2 = hd2 * a / cnstVal1;
        const sdx = iwd2 * Math.cos(0.7853981634);
        const sdy = ihd2 * Math.sin(0.7853981634);
        const sx1 = hc - sdx;
        const sx2 = hc + sdx;
        const sy1 = vc - sdy;
        const sy2 = vc + sdy;
        pathData = `M 0,${vc} L ${sx1},${sy1} L ${hc},0 L ${sx2},${sy1} L ${w},${vc} L ${sx2},${sy2} L ${hc},${h} L ${sx1},${sy2} z`;
      }
      break
    case 'star5':
      {
        const hc = w / 2,
          vc = h / 2,
          wd2 = w / 2,
          hd2 = h / 2;
        let adj = 19098 * RATIO_EMUs_Points;
        let hf = 105146 * RATIO_EMUs_Points;
        let vf = 110557 * RATIO_EMUs_Points;
        const maxAdj = 50000 * RATIO_EMUs_Points;
        const cnstVal1 = 100000 * RATIO_EMUs_Points;
        const shapAdjst = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        if (shapAdjst) {
          Object.keys(shapAdjst).forEach(key => {
            const name = shapAdjst[key]['attrs']['name'];
            if (name === 'adj') {
              adj = parseInt(shapAdjst[key]['attrs']['fmla'].substring(4)) * RATIO_EMUs_Points;
            } 
            else if (name === 'hf') {
              hf = parseInt(shapAdjst[key]['attrs']['fmla'].substring(4)) * RATIO_EMUs_Points;
            } 
            else if (name === 'vf') {
              vf = parseInt(shapAdjst[key]['attrs']['fmla'].substring(4)) * RATIO_EMUs_Points;
            }
          });
        }
        const a = (adj < 0) ? 0 : (adj > maxAdj) ? maxAdj : adj;
        const swd2 = wd2 * hf / cnstVal1;
        const shd2 = hd2 * vf / cnstVal1;
        const svc = vc * vf / cnstVal1;
        const dx1 = swd2 * Math.cos(0.31415926536);
        const dx2 = swd2 * Math.cos(5.3407075111);
        const dy1 = shd2 * Math.sin(0.31415926536);
        const dy2 = shd2 * Math.sin(5.3407075111);
        const x1 = hc - dx1;
        const x2 = hc - dx2;
        const x3 = hc + dx2;
        const x4 = hc + dx1;
        const y1 = svc - dy1;
        const y2 = svc - dy2;
        const iwd2 = swd2 * a / maxAdj;
        const ihd2 = shd2 * a / maxAdj;
        const sdx1 = iwd2 * Math.cos(5.9690260418);
        const sdx2 = iwd2 * Math.cos(0.94247779608);
        const sdy1 = ihd2 * Math.sin(0.94247779608);
        const sdy2 = ihd2 * Math.sin(5.9690260418);
        const sx1 = hc - sdx1;
        const sx2 = hc - sdx2;
        const sx3 = hc + sdx2;
        const sx4 = hc + sdx1;
        const sy1 = svc - sdy1;
        const sy2 = svc - sdy2;
        const sy3 = svc + ihd2;
        pathData = `M ${x1},${y1} L ${sx2},${sy1} L ${hc},0 L ${sx3},${sy1} L ${x4},${y1} L ${sx4},${sy2} L ${x3},${y2} L ${hc},${sy3} L ${x2},${y2} L ${sx1},${sy2} z`;
      }
      break
    case 'star6':
      {
        const hc = w / 2,
          vc = h / 2,
          wd2 = w / 2,
          hd2 = h / 2,
          hd4 = h / 4;
        let adj = 28868 * RATIO_EMUs_Points;
        let hf = 115470 * RATIO_EMUs_Points;
        const maxAdj = 50000 * RATIO_EMUs_Points;
        const cnstVal1 = 100000 * RATIO_EMUs_Points;
        const shapAdjst = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        if (shapAdjst) {
          Object.keys(shapAdjst).forEach(key => {
            const name = shapAdjst[key]['attrs']['name'];
            if (name === 'adj') {
              adj = parseInt(shapAdjst[key]['attrs']['fmla'].substring(4)) * RATIO_EMUs_Points;
            } 
            else if (name === 'hf') {
              hf = parseInt(shapAdjst[key]['attrs']['fmla'].substring(4)) * RATIO_EMUs_Points;
            }
          });
        }
        const a = (adj < 0) ? 0 : (adj > maxAdj) ? maxAdj : adj;
        const swd2 = wd2 * hf / cnstVal1;
        const dx1 = swd2 * Math.cos(0.5235987756);
        const x1 = hc - dx1;
        const x2 = hc + dx1;
        const y2 = vc + hd4;
        const iwd2 = swd2 * a / maxAdj;
        const ihd2 = hd2 * a / maxAdj;
        const sdx2 = iwd2 / 2;
        const sx1 = hc - iwd2;
        const sx2 = hc - sdx2;
        const sx3 = hc + sdx2;
        const sx4 = hc + iwd2;
        const sdy1 = ihd2 * Math.sin(1.0471975512);
        const sy1 = vc - sdy1;
        const sy2 = vc + sdy1;
        pathData = `M ${x1},${hd4} L ${sx2},${sy1} L ${hc},0 L ${sx3},${sy1} L ${x2},${hd4} L ${sx4},${vc} L ${x2},${y2} L ${sx3},${sy2} L ${hc},${h} L ${sx2},${sy2} L ${x1},${y2} L ${sx1},${vc} z`;
      }
      break
    case 'star7':
      {
        const hc = w / 2,
          vc = h / 2,
          wd2 = w / 2,
          hd2 = h / 2;
        let adj = 34601 * RATIO_EMUs_Points;
        let hf = 102572 * RATIO_EMUs_Points;
        let vf = 105210 * RATIO_EMUs_Points;
        const maxAdj = 50000 * RATIO_EMUs_Points;
        const cnstVal1 = 100000 * RATIO_EMUs_Points;
        const shapAdjst = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        if (shapAdjst) {
          Object.keys(shapAdjst).forEach(key => {
            const name = shapAdjst[key]['attrs']['name'];
            if (name === 'adj') {
              adj = parseInt(shapAdjst[key]['attrs']['fmla'].substring(4)) * RATIO_EMUs_Points;
            } 
            else if (name === 'hf') {
              hf = parseInt(shapAdjst[key]['attrs']['fmla'].substring(4)) * RATIO_EMUs_Points;
            } 
            else if (name === 'vf') {
              vf = parseInt(shapAdjst[key]['attrs']['fmla'].substring(4)) * RATIO_EMUs_Points;
            }
          });
        }
        const a = (adj < 0) ? 0 : (adj > maxAdj) ? maxAdj : adj;
        const swd2 = wd2 * hf / cnstVal1;
        const shd2 = hd2 * vf / cnstVal1;
        const svc = vc * vf / cnstVal1;
        const dx1 = swd2 * 97493 / 100000;
        const dx2 = swd2 * 78183 / 100000;
        const dx3 = swd2 * 43388 / 100000;
        const dy1 = shd2 * 62349 / 100000;
        const dy2 = shd2 * 22252 / 100000;
        const dy3 = shd2 * 90097 / 100000;
        const x1 = hc - dx1;
        const x2 = hc - dx2;
        const x3 = hc - dx3;
        const x4 = hc + dx3;
        const x5 = hc + dx2;
        const x6 = hc + dx1;
        const y1 = svc - dy1;
        const y2 = svc + dy2;
        const y3 = svc + dy3;
        const iwd2 = swd2 * a / maxAdj;
        const ihd2 = shd2 * a / maxAdj;
        const sdx1 = iwd2 * 97493 / 100000;
        const sdx2 = iwd2 * 78183 / 100000;
        const sdx3 = iwd2 * 43388 / 100000;
        const sx1 = hc - sdx1;
        const sx2 = hc - sdx2;
        const sx3 = hc - sdx3;
        const sx4 = hc + sdx3;
        const sx5 = hc + sdx2;
        const sx6 = hc + sdx1;
        const sdy1 = ihd2 * 90097 / 100000;
        const sdy2 = ihd2 * 22252 / 100000;
        const sdy3 = ihd2 * 62349 / 100000;
        const sy1 = svc - sdy1;
        const sy2 = svc - sdy2;
        const sy3 = svc + sdy3;
        const sy4 = svc + ihd2;
        pathData = `M ${x1},${y2} L ${sx1},${sy2} L ${x2},${y1} L ${sx3},${sy1} L ${hc},0 L ${sx4},${sy1} L ${x5},${y1} L ${sx6},${sy2} L ${x6},${y2} L ${sx5},${sy3} L ${x4},${y3} L ${hc},${sy4} L ${x3},${y3} L ${sx2},${sy3} z`;
      }
      break
    case 'star8':
      {
        const hc = w / 2,
          vc = h / 2,
          wd2 = w / 2,
          hd2 = h / 2;
        let adj = 37500 * RATIO_EMUs_Points;
        const maxAdj = 50000 * RATIO_EMUs_Points;
        const shapAdjst = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        if (shapAdjst) {
          const name = shapAdjst['attrs']['name'];
          if (name === 'adj') {
            adj = parseInt(shapAdjst['attrs']['fmla'].substring(4)) * RATIO_EMUs_Points;
          }
        }
        const a = (adj < 0) ? 0 : (adj > maxAdj) ? maxAdj : adj;
        const dx1 = wd2 * Math.cos(0.7853981634);
        const x1 = hc - dx1;
        const x2 = hc + dx1;
        const dy1 = hd2 * Math.sin(0.7853981634);
        const y1 = vc - dy1;
        const y2 = vc + dy1;
        const iwd2 = wd2 * a / maxAdj;
        const ihd2 = hd2 * a / maxAdj;
        const sdx1 = iwd2 * 92388 / 100000;
        const sdx2 = iwd2 * 38268 / 100000;
        const sdy1 = ihd2 * 92388 / 100000;
        const sdy2 = ihd2 * 38268 / 100000;
        const sx1 = hc - sdx1;
        const sx2 = hc - sdx2;
        const sx3 = hc + sdx2;
        const sx4 = hc + sdx1;
        const sy1 = vc - sdy1;
        const sy2 = vc - sdy2;
        const sy3 = vc + sdy2;
        const sy4 = vc + sdy1;
        pathData = `M 0,${vc} L ${sx1},${sy2} L ${x1},${y1} L ${sx2},${sy1} L ${hc},0 L ${sx3},${sy1} L ${x2},${y1} L ${sx4},${sy2} L ${w},${vc} L ${sx4},${sy3} L ${x2},${y2} L ${sx3},${sy4} L ${hc},${h} L ${sx2},${sy4} L ${x1},${y2} L ${sx1},${sy3} z`;
      }
      break
    case 'star10':
      {
        const hc = w / 2,
          vc = h / 2,
          wd2 = w / 2,
          hd2 = h / 2;
        let adj = 42533 * RATIO_EMUs_Points;
        let hf = 105146 * RATIO_EMUs_Points;
        const maxAdj = 50000 * RATIO_EMUs_Points;
        const cnstVal1 = 100000 * RATIO_EMUs_Points;
        const shapAdjst = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        if (shapAdjst) {
          Object.keys(shapAdjst).forEach(key => {
            const name = shapAdjst[key]['attrs']['name'];
            if (name === 'adj') {
              adj = parseInt(shapAdjst[key]['attrs']['fmla'].substring(4)) * RATIO_EMUs_Points;
            } 
            else if (name === 'hf') {
              hf = parseInt(shapAdjst[key]['attrs']['fmla'].substring(4)) * RATIO_EMUs_Points;
            }
          });
        }
        const a = (adj < 0) ? 0 : (adj > maxAdj) ? maxAdj : adj;
        const swd2 = wd2 * hf / cnstVal1;
        const dx1 = swd2 * 95106 / 100000;
        const dx2 = swd2 * 58779 / 100000;
        const x1 = hc - dx1;
        const x2 = hc - dx2;
        const x3 = hc + dx2;
        const x4 = hc + dx1;
        const dy1 = hd2 * 80902 / 100000;
        const dy2 = hd2 * 30902 / 100000;
        const y1 = vc - dy1;
        const y2 = vc - dy2;
        const y3 = vc + dy2;
        const y4 = vc + dy1;
        const iwd2 = swd2 * a / maxAdj;
        const ihd2 = hd2 * a / maxAdj;
        const sdx1 = iwd2 * 80902 / 100000;
        const sdx2 = iwd2 * 30902 / 100000;
        const sdy1 = ihd2 * 95106 / 100000;
        const sdy2 = ihd2 * 58779 / 100000;
        const sx1 = hc - iwd2;
        const sx2 = hc - sdx1;
        const sx3 = hc - sdx2;
        const sx4 = hc + sdx2;
        const sx5 = hc + sdx1;
        const sx6 = hc + iwd2;
        const sy1 = vc - sdy1;
        const sy2 = vc - sdy2;
        const sy3 = vc + sdy2;
        const sy4 = vc + sdy1;
        pathData = `M ${x1},${y2} L ${sx2},${sy2} L ${x2},${y1} L ${sx3},${sy1} L ${hc},0 L ${sx4},${sy1} L ${x3},${y1} L ${sx5},${sy2} L ${x4},${y2} L ${sx6},${vc} L ${x4},${y3} L ${sx5},${sy3} L ${x3},${y4} L ${sx4},${sy4} L ${hc},${h} L ${sx3},${sy4} L ${x2},${y4} L ${sx2},${sy3} L ${x1},${y3} L ${sx1},${vc} z`;
      }
      break
    case 'star12':
      {
        const hc = w / 2,
          vc = h / 2,
          wd2 = w / 2,
          hd2 = h / 2,
          hd4 = h / 4,
          wd4 = w / 4;
        let adj = 37500 * RATIO_EMUs_Points;
        const maxAdj = 50000 * RATIO_EMUs_Points;
        const shapAdjst = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        if (shapAdjst) {
          const name = shapAdjst['attrs']['name'];
          if (name === 'adj') {
            adj = parseInt(shapAdjst['attrs']['fmla'].substring(4)) * RATIO_EMUs_Points;
          }
        }
        const a = (adj < 0) ? 0 : (adj > maxAdj) ? maxAdj : adj;
        const dx1 = wd2 * Math.cos(0.5235987756);
        const dy1 = hd2 * Math.sin(1.0471975512);
        const x1 = hc - dx1;
        const x3 = w * 3 / 4;
        const x4 = hc + dx1;
        const y1 = vc - dy1;
        const y3 = h * 3 / 4;
        const y4 = vc + dy1;
        const iwd2 = wd2 * a / maxAdj;
        const ihd2 = hd2 * a / maxAdj;
        const sdx1 = iwd2 * Math.cos(0.2617993878);
        const sdx2 = iwd2 * Math.cos(0.7853981634);
        const sdx3 = iwd2 * Math.cos(1.308996939);
        const sdy1 = ihd2 * Math.sin(1.308996939);
        const sdy2 = ihd2 * Math.sin(0.7853981634);
        const sdy3 = ihd2 * Math.sin(0.2617993878);
        const sx1 = hc - sdx1;
        const sx2 = hc - sdx2;
        const sx3 = hc - sdx3;
        const sx4 = hc + sdx3;
        const sx5 = hc + sdx2;
        const sx6 = hc + sdx1;
        const sy1 = vc - sdy1;
        const sy2 = vc - sdy2;
        const sy3 = vc - sdy3;
        const sy4 = vc + sdy3;
        const sy5 = vc + sdy2;
        const sy6 = vc + sdy1;
        pathData = `M 0,${vc} L ${sx1},${sy3} L ${x1},${hd4} L ${sx2},${sy2} L ${wd4},${y1} L ${sx3},${sy1} L ${hc},0 L ${sx4},${sy1} L ${x3},${y1} L ${sx5},${sy2} L ${x4},${hd4} L ${sx6},${sy3} L ${w},${vc} L ${sx6},${sy4} L ${x4},${y3} L ${sx5},${sy5} L ${x3},${y4} L ${sx4},${sy6} L ${hc},${h} L ${sx3},${sy6} L ${wd4},${y4} L ${sx2},${sy5} L ${x1},${y3} L ${sx1},${sy4} z`;
      }
      break
    case 'star16':
      {
        const hc = w / 2,
          vc = h / 2,
          wd2 = w / 2,
          hd2 = h / 2;
        let adj = 37500 * RATIO_EMUs_Points;
        const maxAdj = 50000 * RATIO_EMUs_Points;
        const shapAdjst = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        if (shapAdjst) {
          const name = shapAdjst['attrs']['name'];
          if (name === 'adj') {
            adj = parseInt(shapAdjst['attrs']['fmla'].substring(4)) * RATIO_EMUs_Points;
          }
        }
        const a = (adj < 0) ? 0 : (adj > maxAdj) ? maxAdj : adj;
        const dx1 = wd2 * 92388 / 100000;
        const dx2 = wd2 * 70711 / 100000;
        const dx3 = wd2 * 38268 / 100000;
        const dy1 = hd2 * 92388 / 100000;
        const dy2 = hd2 * 70711 / 100000;
        const dy3 = hd2 * 38268 / 100000;
        const x1 = hc - dx1;
        const x2 = hc - dx2;
        const x3 = hc - dx3;
        const x4 = hc + dx3;
        const x5 = hc + dx2;
        const x6 = hc + dx1;
        const y1 = vc - dy1;
        const y2 = vc - dy2;
        const y3 = vc - dy3;
        const y4 = vc + dy3;
        const y5 = vc + dy2;
        const y6 = vc + dy1;
        const iwd2 = wd2 * a / maxAdj;
        const ihd2 = hd2 * a / maxAdj;
        const sdx1 = iwd2 * 98079 / 100000;
        const sdx2 = iwd2 * 83147 / 100000;
        const sdx3 = iwd2 * 55557 / 100000;
        const sdx4 = iwd2 * 19509 / 100000;
        const sdy1 = ihd2 * 98079 / 100000;
        const sdy2 = ihd2 * 83147 / 100000;
        const sdy3 = ihd2 * 55557 / 100000;
        const sdy4 = ihd2 * 19509 / 100000;
        const sx1 = hc - sdx1;
        const sx2 = hc - sdx2;
        const sx3 = hc - sdx3;
        const sx4 = hc - sdx4;
        const sx5 = hc + sdx4;
        const sx6 = hc + sdx3;
        const sx7 = hc + sdx2;
        const sx8 = hc + sdx1;
        const sy1 = vc - sdy1;
        const sy2 = vc - sdy2;
        const sy3 = vc - sdy3;
        const sy4 = vc - sdy4;
        const sy5 = vc + sdy4;
        const sy6 = vc + sdy3;
        const sy7 = vc + sdy2;
        const sy8 = vc + sdy1;
        pathData = `M 0,${vc} L ${sx1},${sy4} L ${x1},${y3} L ${sx2},${sy3} L ${x2},${y2} L ${sx3},${sy2} L ${x3},${y1} L ${sx4},${sy1} L ${hc},0 L ${sx5},${sy1} L ${x4},${y1} L ${sx6},${sy2} L ${x5},${y2} L ${sx7},${sy3} L ${x6},${y3} L ${sx8},${sy4} L ${w},${vc} L ${sx8},${sy5} L ${x6},${y4} L ${sx7},${sy6} L ${x5},${y5} L ${sx6},${sy7} L ${x4},${y6} L ${sx5},${sy8} L ${hc},${h} L ${sx4},${sy8} L ${x3},${y6} L ${sx3},${sy7} L ${x2},${y5} L ${sx2},${sy6} L ${x1},${y4} L ${sx1},${sy5} z`;
      }
      break
    case 'star24':
      {
        const hc = w / 2,
          vc = h / 2,
          wd2 = w / 2,
          hd2 = h / 2,
          hd4 = h / 4,
          wd4 = w / 4;
        let adj = 37500 * RATIO_EMUs_Points;
        const maxAdj = 50000 * RATIO_EMUs_Points;
        const shapAdjst = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        if (shapAdjst) {
          const name = shapAdjst['attrs']['name'];
          if (name === 'adj') {
            adj = parseInt(shapAdjst['attrs']['fmla'].substring(4)) * RATIO_EMUs_Points;
          }
        }
        const a = (adj < 0) ? 0 : (adj > maxAdj) ? maxAdj : adj;
        const dx1 = wd2 * Math.cos(0.2617993878);
        const dx2 = wd2 * Math.cos(0.5235987756);
        const dx3 = wd2 * Math.cos(0.7853981634);
        const dx4 = wd4;
        const dx5 = wd2 * Math.cos(1.308996939);
        const dy1 = hd2 * Math.sin(1.308996939);
        const dy2 = hd2 * Math.sin(1.0471975512);
        const dy3 = hd2 * Math.sin(0.7853981634);
        const dy4 = hd4;
        const dy5 = hd2 * Math.sin(0.2617993878);
        const x1 = hc - dx1;
        const x2 = hc - dx2;
        const x3 = hc - dx3;
        const x4 = hc - dx4;
        const x5 = hc - dx5;
        const x6 = hc + dx5;
        const x7 = hc + dx4;
        const x8 = hc + dx3;
        const x9 = hc + dx2;
        const x10 = hc + dx1;
        const y1 = vc - dy1;
        const y2 = vc - dy2;
        const y3 = vc - dy3;
        const y4 = vc - dy4;
        const y5 = vc - dy5;
        const y6 = vc + dy5;
        const y7 = vc + dy4;
        const y8 = vc + dy3;
        const y9 = vc + dy2;
        const y10 = vc + dy1;
        const iwd2 = wd2 * a / maxAdj;
        const ihd2 = hd2 * a / maxAdj;
        const sdx1 = iwd2 * 99144 / 100000;
        const sdx2 = iwd2 * 92388 / 100000;
        const sdx3 = iwd2 * 79335 / 100000;
        const sdx4 = iwd2 * 60876 / 100000;
        const sdx5 = iwd2 * 38268 / 100000;
        const sdx6 = iwd2 * 13053 / 100000;
        const sdy1 = ihd2 * 99144 / 100000;
        const sdy2 = ihd2 * 92388 / 100000;
        const sdy3 = ihd2 * 79335 / 100000;
        const sdy4 = ihd2 * 60876 / 100000;
        const sdy5 = ihd2 * 38268 / 100000;
        const sdy6 = ihd2 * 13053 / 100000;
        const sx1 = hc - sdx1;
        const sx2 = hc - sdx2;
        const sx3 = hc - sdx3;
        const sx4 = hc - sdx4;
        const sx5 = hc - sdx5;
        const sx6 = hc - sdx6;
        const sx7 = hc + sdx6;
        const sx8 = hc + sdx5;
        const sx9 = hc + sdx4;
        const sx10 = hc + sdx3;
        const sx11 = hc + sdx2;
        const sx12 = hc + sdx1;
        const sy1 = vc - sdy1;
        const sy2 = vc - sdy2;
        const sy3 = vc - sdy3;
        const sy4 = vc - sdy4;
        const sy5 = vc - sdy5;
        const sy6 = vc - sdy6;
        const sy7 = vc + sdy6;
        const sy8 = vc + sdy5;
        const sy9 = vc + sdy4;
        const sy10 = vc + sdy3;
        const sy11 = vc + sdy2;
        const sy12 = vc + sdy1;
        pathData = `M 0,${vc} L ${sx1},${sy6} L ${x1},${y5} L ${sx2},${sy5} L ${x2},${y4} L ${sx3},${sy4} L ${x3},${y3} L ${sx4},${sy3} L ${x4},${y2} L ${sx5},${sy2} L ${x5},${y1} L ${sx6},${sy1} L ${hc},0 L ${sx7},${sy1} L ${x6},${y1} L ${sx8},${sy2} L ${x7},${y2} L ${sx9},${sy3} L ${x8},${y3} L ${sx10},${sy4} L ${x9},${y4} L ${sx11},${sy5} L ${x10},${y5} L ${sx12},${sy6} L ${w},${vc} L ${sx12},${sy7} L ${x10},${y6} L ${sx11},${sy8} L ${x9},${y7} L ${sx10},${sy9} L ${x8},${y8} L ${sx9},${sy10} L ${x7},${y9} L ${sx8},${sy11} L ${x6},${y10} L ${sx7},${sy12} L ${hc},${h} L ${sx6},${sy12} L ${x5},${y10} L ${sx5},${sy11} L ${x4},${y9} L ${sx4},${sy10} L ${x3},${y8} L ${sx3},${sy9} L ${x2},${y7} L ${sx2},${sy8} L ${x1},${y6} L ${sx1},${sy7} z`;
      }
      break
    case 'star32':
      {
        const hc = w / 2,
          vc = h / 2,
          wd2 = w / 2,
          hd2 = h / 2;
        let adj = 37500 * RATIO_EMUs_Points;
        const maxAdj = 50000 * RATIO_EMUs_Points;
        const shapAdjst = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        if (shapAdjst) {
          const name = shapAdjst['attrs']['name'];
          if (name === 'adj') {
            adj = parseInt(shapAdjst['attrs']['fmla'].substring(4)) * RATIO_EMUs_Points;
          }
        }
        const a = (adj < 0) ? 0 : (adj > maxAdj) ? maxAdj : adj;
        const dx1 = wd2 * 98079 / 100000;
        const dx2 = wd2 * 92388 / 100000;
        const dx3 = wd2 * 83147 / 100000;
        const dx4 = wd2 * Math.cos(0.7853981634);
        const dx5 = wd2 * 55557 / 100000;
        const dx6 = wd2 * 38268 / 100000;
        const dx7 = wd2 * 19509 / 100000;
        const dy1 = hd2 * 98079 / 100000;
        const dy2 = hd2 * 92388 / 100000;
        const dy3 = hd2 * 83147 / 100000;
        const dy4 = hd2 * Math.sin(0.7853981634);
        const dy5 = hd2 * 55557 / 100000;
        const dy6 = hd2 * 38268 / 100000;
        const dy7 = hd2 * 19509 / 100000;
        const x1 = hc - dx1;
        const x2 = hc - dx2;
        const x3 = hc - dx3;
        const x4 = hc - dx4;
        const x5 = hc - dx5;
        const x6 = hc - dx6;
        const x7 = hc - dx7;
        const x8 = hc + dx7;
        const x9 = hc + dx6;
        const x10 = hc + dx5;
        const x11 = hc + dx4;
        const x12 = hc + dx3;
        const x13 = hc + dx2;
        const x14 = hc + dx1;
        const y1 = vc - dy1;
        const y2 = vc - dy2;
        const y3 = vc - dy3;
        const y4 = vc - dy4;
        const y5 = vc - dy5;
        const y6 = vc - dy6;
        const y7 = vc - dy7;
        const y8 = vc + dy7;
        const y9 = vc + dy6;
        const y10 = vc + dy5;
        const y11 = vc + dy4;
        const y12 = vc + dy3;
        const y13 = vc + dy2;
        const y14 = vc + dy1;
        const iwd2 = wd2 * a / maxAdj;
        const ihd2 = hd2 * a / maxAdj;
        const sdx1 = iwd2 * 99518 / 100000;
        const sdx2 = iwd2 * 95694 / 100000;
        const sdx3 = iwd2 * 88192 / 100000;
        const sdx4 = iwd2 * 77301 / 100000;
        const sdx5 = iwd2 * 63439 / 100000;
        const sdx6 = iwd2 * 47140 / 100000;
        const sdx7 = iwd2 * 29028 / 100000;
        const sdx8 = iwd2 * 9802 / 100000;
        const sdy1 = ihd2 * 99518 / 100000;
        const sdy2 = ihd2 * 95694 / 100000;
        const sdy3 = ihd2 * 88192 / 100000;
        const sdy4 = ihd2 * 77301 / 100000;
        const sdy5 = ihd2 * 63439 / 100000;
        const sdy6 = ihd2 * 47140 / 100000;
        const sdy7 = ihd2 * 29028 / 100000;
        const sdy8 = ihd2 * 9802 / 100000;
        const sx1 = hc - sdx1;
        const sx2 = hc - sdx2;
        const sx3 = hc - sdx3;
        const sx4 = hc - sdx4;
        const sx5 = hc - sdx5;
        const sx6 = hc - sdx6;
        const sx7 = hc - sdx7;
        const sx8 = hc - sdx8;
        const sx9 = hc + sdx8;
        const sx10 = hc + sdx7;
        const sx11 = hc + sdx6;
        const sx12 = hc + sdx5;
        const sx13 = hc + sdx4;
        const sx14 = hc + sdx3;
        const sx15 = hc + sdx2;
        const sx16 = hc + sdx1;
        const sy1 = vc - sdy1;
        const sy2 = vc - sdy2;
        const sy3 = vc - sdy3;
        const sy4 = vc - sdy4;
        const sy5 = vc - sdy5;
        const sy6 = vc - sdy6;
        const sy7 = vc - sdy7;
        const sy8 = vc - sdy8;
        const sy9 = vc + sdy8;
        const sy10 = vc + sdy7;
        const sy11 = vc + sdy6;
        const sy12 = vc + sdy5;
        const sy13 = vc + sdy4;
        const sy14 = vc + sdy3;
        const sy15 = vc + sdy2;
        const sy16 = vc + sdy1;
        pathData = `M 0,${vc} L ${sx1},${sy8} L ${x1},${y7} L ${sx2},${sy7} L ${x2},${y6} L ${sx3},${sy6} L ${x3},${y5} L ${sx4},${sy5} L ${x4},${y4} L ${sx5},${sy4} L ${x5},${y3} L ${sx6},${sy3} L ${x6},${y2} L ${sx7},${sy2} L ${x7},${y1} L ${sx8},${sy1} L ${hc},0 L ${sx9},${sy1} L ${x8},${y1} L ${sx10},${sy2} L ${x9},${y2} L ${sx11},${sy3} L ${x10},${y3} L ${sx12},${sy4} L ${x11},${y4} L ${sx13},${sy5} L ${x12},${y5} L ${sx14},${sy6} L ${x13},${y6} L ${sx15},${sy7} L ${x14},${y7} L ${sx16},${sy8} L ${w},${vc} L ${sx16},${sy9} L ${x14},${y8} L ${sx15},${sy10} L ${x13},${y9} L ${sx14},${sy11} L ${x12},${y10} L ${sx13},${sy12} L ${x11},${y11} L ${sx12},${sy13} L ${x10},${y12} L ${sx11},${sy14} L ${x9},${y13} L ${sx10},${sy15} L ${x8},${y14} L ${sx9},${sy16} L ${hc},${h} L ${sx8},${sy16} L ${x7},${y14} L ${sx7},${sy15} L ${x6},${y13} L ${sx6},${sy14} L ${x5},${y12} L ${sx5},${sy13} L ${x4},${y11} L ${sx4},${sy12} L ${x3},${y10} L ${sx3},${sy11} L ${x2},${y9} L ${sx2},${sy10} L ${x1},${y8} L ${sx1},${sy9} z`;
      }
      break
    case 'pie':
    case 'pieWedge':
    case 'arc':
      {
        const shapAdjst = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let adj1, adj2, H, isClose;

        if (shapType === 'pie') {
          adj1 = 0;
          adj2 = 270;
          H = h;
          isClose = true;
        } 
        else if (shapType === 'pieWedge') {
          adj1 = 180;
          adj2 = 270;
          H = 2 * h;
          isClose = true;
        } 
        else if (shapType === 'arc') {
          adj1 = 270;
          adj2 = 0;
          H = h;
          isClose = false;
        }

        if (shapAdjst) {
          let shapAdjst1 = getTextByPathList(shapAdjst, ['attrs', 'fmla']);
          let shapAdjst2 = shapAdjst1;
          if (shapAdjst1 === undefined) {
            shapAdjst1 = shapAdjst[0]['attrs']['fmla'];
            shapAdjst2 = shapAdjst[1]['attrs']['fmla'];
          }
          if (shapAdjst1) {
            adj1 = parseInt(shapAdjst1.substring(4)) / 60000;
          }
          if (shapAdjst2) {
            adj2 = parseInt(shapAdjst2.substring(4)) / 60000;
          }
        }

        pathData = shapePie(H, w, adj1, adj2, isClose);
      }
      break
    case 'chord':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let sAdj1_val = 45;
        let sAdj2_val = 270;
        if (shapAdjst_ary) {
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              const sAdj1 = getTextByPathList(adj, ['attrs', 'fmla']);
              sAdj1_val = parseInt(sAdj1.substring(4)) / 60000;
            } 
            else if (sAdj_name === 'adj2') {
              const sAdj2 = getTextByPathList(adj, ['attrs', 'fmla']);
              sAdj2_val = parseInt(sAdj2.substring(4)) / 60000;
            }
          }
        }
        const hR = h / 2;
        const wR = w / 2;
        pathData = shapeArc(wR, hR, wR, hR, sAdj1_val, sAdj2_val, true);
      }
      break
    case 'frame':
      {
        const shapAdjst = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd', 'attrs', 'fmla']);
        let adj1 = 12500 * RATIO_EMUs_Points;
        const cnstVal1 = 50000 * RATIO_EMUs_Points;
        const cnstVal2 = 100000 * RATIO_EMUs_Points;
        if (shapAdjst) {
          adj1 = parseInt(shapAdjst.substring(4)) * RATIO_EMUs_Points;
        }
        const a1 = (adj1 < 0) ? 0 : (adj1 > cnstVal1) ? cnstVal1 : adj1;
        const x1 = Math.min(w, h) * a1 / cnstVal2;
        const x4 = w - x1;
        const y4 = h - x1;
        pathData = `M 0,0 L ${w},0 L ${w},${h} L 0,${h} z M ${x1},${x1} L ${x1},${y4} L ${x4},${y4} L ${x4},${x1} z`;
      }
      break
    case 'donut':
      {
        const shapAdjst = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd', 'attrs', 'fmla']);
        let adj = 25000 * RATIO_EMUs_Points;
        const cnstVal1 = 50000 * RATIO_EMUs_Points;
        const cnstVal2 = 100000 * RATIO_EMUs_Points;
        if (shapAdjst) {
          adj = parseInt(shapAdjst.substring(4)) * RATIO_EMUs_Points;
        }
        const a = (adj < 0) ? 0 : (adj > cnstVal1) ? cnstVal1 : adj;
        const dr = Math.min(w, h) * a / cnstVal2;
        const iwd2 = w / 2 - dr;
        const ihd2 = h / 2 - dr;
        const outerPath = `M ${w / 2 - w / 2},${h / 2} A ${w / 2},${h / 2} 0 1,0 ${w / 2 + w / 2},${h / 2} A ${w / 2},${h / 2} 0 1,0 ${w / 2 - w / 2},${h / 2} Z`;
        const innerPath = `M ${w / 2 + iwd2},${h / 2} A ${iwd2},${ihd2} 0 1,0 ${w / 2 - iwd2},${h / 2} A ${iwd2},${ihd2} 0 1,0 ${w / 2 + iwd2},${h / 2} Z`;
        pathData = `${outerPath} ${innerPath}`;
      }
      break
    case 'noSmoking':
      {
        const shapAdjst = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd', 'attrs', 'fmla']);
        let adj = 18750 * RATIO_EMUs_Points;
        const cnstVal1 = 50000 * RATIO_EMUs_Points;
        const cnstVal2 = 100000 * RATIO_EMUs_Points;
        if (shapAdjst) {
          adj = parseInt(shapAdjst.substring(4)) * RATIO_EMUs_Points;
        }
        const a = (adj < 0) ? 0 : (adj > cnstVal1) ? cnstVal1 : adj;
        const dr = Math.min(w, h) * a / cnstVal2;
        const iwd2 = w / 2 - dr;
        const ihd2 = h / 2 - dr;
        const ang = Math.atan(h / w);
        const ct = ihd2 * Math.cos(ang);
        const st = iwd2 * Math.sin(ang);
        const m = Math.sqrt(ct * ct + st * st);
        const n = iwd2 * ihd2 / m;
        const drd2 = dr / 2;
        const dang = Math.atan(drd2 / n);
        const swAng = -Math.PI + (dang * 2);
        const stAng1 = ang - dang;
        const stAng2 = stAng1 - Math.PI;
        const ct1 = ihd2 * Math.cos(stAng1);
        const st1 = iwd2 * Math.sin(stAng1);
        const m1 = Math.sqrt(ct1 * ct1 + st1 * st1);
        const n1 = iwd2 * ihd2 / m1;
        const dx1 = n1 * Math.cos(stAng1);
        const dy1 = n1 * Math.sin(stAng1);
        const x1 = w / 2 + dx1;
        const y1 = h / 2 + dy1;
        const x2 = w / 2 - dx1;
        const y2 = h / 2 - dy1;
        const stAng1deg = stAng1 * 180 / Math.PI;
        const stAng2deg = stAng2 * 180 / Math.PI;
        const swAng2deg = swAng * 180 / Math.PI;
        const outerCircle = `M ${w / 2 - w / 2},${h / 2} A ${w / 2},${h / 2} 0 1,0 ${w / 2 + w / 2},${h / 2} A ${w / 2},${h / 2} 0 1,0 ${w / 2 - w / 2},${h / 2} Z`;
        const slash1 = `M ${x1},${y1} ${shapeArc(w / 2, h / 2, iwd2, ihd2, stAng1deg, (stAng1deg + swAng2deg), false).replace('M', 'L')} z`;
        const slash2 = `M ${x2},${y2} ${shapeArc(w / 2, h / 2, iwd2, ihd2, stAng2deg, (stAng2deg + swAng2deg), false).replace('M', 'L')} z`;
        pathData = `${outerCircle} ${slash1} ${slash2}`;
      }
      break
    case 'halfFrame':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let sAdj1_val = 3.5;
        let sAdj2_val = 3.5;
        const cnsVal = 100000 * RATIO_EMUs_Points;
        if (shapAdjst_ary) {
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              sAdj1_val = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            } 
            else if (sAdj_name === 'adj2') {
              sAdj2_val = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
          }
        }
        const minWH = Math.min(w, h);
        const maxAdj2 = (cnsVal * w) / minWH;
        const a2 = (sAdj2_val < 0) ? 0 : (sAdj2_val > maxAdj2) ? maxAdj2 : sAdj2_val;
        const x1 = (minWH * a2) / cnsVal;
        const g2 = h - (h * x1 / w);
        const maxAdj1 = (cnsVal * g2) / minWH;
        const a1 = (sAdj1_val < 0) ? 0 : (sAdj1_val > maxAdj1) ? maxAdj1 : sAdj1_val;
        const y1 = minWH * a1 / cnsVal;
        const x2 = w - (y1 * w / h);
        const y2 = h - (x1 * h / w);
        pathData = `M 0,0 L ${w},0 L ${x2},${y1} L ${x1},${y1} L ${x1},${y2} L 0,${h} z`;
      }
      break
    case 'blockArc':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let adj1 = 180;
        let adj2 = 0;
        let adj3 = 25000 * RATIO_EMUs_Points;
        const cnstVal1 = 50000 * RATIO_EMUs_Points;
        const cnstVal2 = 100000 * RATIO_EMUs_Points;
        if (shapAdjst_ary) {
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              adj1 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) / 60000;
            } 
            else if (sAdj_name === 'adj2') {
              adj2 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) / 60000;
            } 
            else if (sAdj_name === 'adj3') {
              adj3 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
          }
        }
        const cd1 = 360;
        const stAng = (adj1 < 0) ? 0 : (adj1 > cd1) ? cd1 : adj1;
        const istAng = (adj2 < 0) ? 0 : (adj2 > cd1) ? cd1 : adj2;
        const a3 = (adj3 < 0) ? 0 : (adj3 > cnstVal1) ? cnstVal1 : adj3;
        const sw11 = istAng - stAng;
        const sw12 = sw11 + cd1;
        const swAng = (sw11 > 0) ? sw11 : sw12;
        const iswAng = -swAng;
        const endAng = stAng + swAng;
        const iendAng = istAng + iswAng;
        const stRd = stAng * (Math.PI) / 180;
        const istRd = istAng * (Math.PI) / 180;
        const wd2 = w / 2;
        const hd2 = h / 2;
        const hc = w / 2;
        const vc = h / 2;
        let x1, y1;
        if (stAng > 90 && stAng < 270) {
          const wt1 = wd2 * (Math.sin((Math.PI) / 2 - stRd));
          const ht1 = hd2 * (Math.cos((Math.PI) / 2 - stRd));
          const dx1 = wd2 * (Math.cos(Math.atan(ht1 / wt1)));
          const dy1 = hd2 * (Math.sin(Math.atan(ht1 / wt1)));
          x1 = hc - dx1;
          y1 = vc - dy1;
        } 
        else {
          const wt1 = wd2 * (Math.sin(stRd));
          const ht1 = hd2 * (Math.cos(stRd));
          const dx1 = wd2 * (Math.cos(Math.atan(wt1 / ht1)));
          const dy1 = hd2 * (Math.sin(Math.atan(wt1 / ht1)));
          x1 = hc + dx1;
          y1 = vc + dy1;
        }
        const dr = Math.min(w, h) * a3 / cnstVal2;
        const iwd2 = wd2 - dr;
        const ihd2 = hd2 - dr;
        let x2, y2;
        if ((endAng <= 450 && endAng > 270) || ((endAng >= 630 && endAng < 720))) {
          const wt2 = iwd2 * (Math.sin(istRd));
          const ht2 = ihd2 * (Math.cos(istRd));
          const dx2 = iwd2 * (Math.cos(Math.atan(wt2 / ht2)));
          const dy2 = ihd2 * (Math.sin(Math.atan(wt2 / ht2)));
          x2 = hc + dx2;
          y2 = vc + dy2;
        } 
        else {
          const wt2 = iwd2 * (Math.sin((Math.PI) / 2 - istRd));
          const ht2 = ihd2 * (Math.cos((Math.PI) / 2 - istRd));
          const dx2 = iwd2 * (Math.cos(Math.atan(ht2 / wt2)));
          const dy2 = ihd2 * (Math.sin(Math.atan(ht2 / wt2)));
          x2 = hc - dx2;
          y2 = vc - dy2;
        }
        pathData = `M ${x1},${y1} ${shapeArc(wd2, hd2, wd2, hd2, stAng, endAng, false).replace('M', 'L')} L ${x2},${y2} ${shapeArc(wd2, hd2, iwd2, ihd2, istAng, iendAng, false).replace('M', 'L')} z`;
      }
      break
    case 'bracePair':
      {
        const shapAdjst = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd', 'attrs', 'fmla']);
        let adj = 8333 * RATIO_EMUs_Points;
        const cnstVal1 = 25000 * RATIO_EMUs_Points;
        const cnstVal2 = 50000 * RATIO_EMUs_Points;
        const cnstVal3 = 100000 * RATIO_EMUs_Points;
        if (shapAdjst) {
          adj = parseInt(shapAdjst.substring(4)) * RATIO_EMUs_Points;
        }
        const vc = h / 2,
          cd2 = 180,
          cd4 = 90,
          c3d4 = 270;
        const a = (adj < 0) ? 0 : (adj > cnstVal1) ? cnstVal1 : adj;
        const minWH = Math.min(w, h);
        const x1 = minWH * a / cnstVal3;
        const x2 = minWH * a / cnstVal2;
        const x3 = w - x2;
        const x4 = w - x1;
        const y2 = vc - x1;
        const y3 = vc + x1;
        const y4 = h - x1;
        pathData = `M ${x2},${h} ${shapeArc(x2, y4, x1, x1, cd4, cd2, false).replace('M', 'L')} L ${x1},${y3} ${shapeArc(0, y3, x1, x1, 0, (-cd4), false).replace('M', 'L')} ${shapeArc(0, y2, x1, x1, cd4, 0, false).replace('M', 'L')} L ${x1},${x1} ${shapeArc(x2, x1, x1, x1, cd2, c3d4, false).replace('M', 'L')} M ${x3},0 ${shapeArc(x3, x1, x1, x1, c3d4, 360, false).replace('M', 'L')} L ${x4},${y2} ${shapeArc(w, y2, x1, x1, cd2, cd4, false).replace('M', 'L')} ${shapeArc(w, y3, x1, x1, c3d4, cd2, false).replace('M', 'L')} L ${x4},${y4} ${shapeArc(x3, y4, x1, x1, 0, cd4, false).replace('M', 'L')}`;
      }
      break
    case 'leftBrace':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let adj1 = 8333 * RATIO_EMUs_Points;
        let adj2 = 50000 * RATIO_EMUs_Points;
        const cnstVal2 = 100000 * RATIO_EMUs_Points;
        if (shapAdjst_ary) {
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              adj1 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            } 
            else if (sAdj_name === 'adj2') {
              adj2 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
          }
        }
        const cd2 = 180,
          cd4 = 90,
          c3d4 = 270;
        const a2 = (adj2 < 0) ? 0 : (adj2 > cnstVal2) ? cnstVal2 : adj2;
        const minWH = Math.min(w, h);
        const q1 = cnstVal2 - a2;
        const q2 = (q1 < a2) ? q1 : a2;
        const q3 = q2 / 2;
        const maxAdj1 = q3 * h / minWH;
        const a1 = (adj1 < 0) ? 0 : (adj1 > maxAdj1) ? maxAdj1 : adj1;
        const y1 = minWH * a1 / cnstVal2;
        const y3 = h * a2 / cnstVal2;
        const y2 = y3 - y1;
        const y4 = y3 + y1;
        pathData = `M ${w},${h} ${shapeArc(w, h - y1, w / 2, y1, cd4, cd2, false).replace('M', 'L')} L ${w / 2},${y4} ${shapeArc(0, y4, w / 2, y1, 0, (-cd4), false).replace('M', 'L')} ${shapeArc(0, y2, w / 2, y1, cd4, 0, false).replace('M', 'L')} L ${w / 2},${y1} ${shapeArc(w, y1, w / 2, y1, cd2, c3d4, false).replace('M', 'L')}`;
      }
      break
    case 'rightBrace':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let adj1 = 8333 * RATIO_EMUs_Points;
        let adj2 = 50000 * RATIO_EMUs_Points;
        const cnstVal2 = 100000 * RATIO_EMUs_Points;
        if (shapAdjst_ary) {
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              adj1 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            } 
            else if (sAdj_name === 'adj2') {
              adj2 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
          }
        }
        const cd = 360,
          cd2 = 180,
          cd4 = 90,
          c3d4 = 270;
        const a2 = (adj2 < 0) ? 0 : (adj2 > cnstVal2) ? cnstVal2 : adj2;
        const minWH = Math.min(w, h);
        const q1 = cnstVal2 - a2;
        const q2 = (q1 < a2) ? q1 : a2;
        const q3 = q2 / 2;
        const maxAdj1 = q3 * h / minWH;
        const a1 = (adj1 < 0) ? 0 : (adj1 > maxAdj1) ? maxAdj1 : adj1;
        const y1 = minWH * a1 / cnstVal2;
        const y3 = h * a2 / cnstVal2;
        const y2 = y3 - y1;
        const y4 = h - y1;
        pathData = `M 0,0 ${shapeArc(0, y1, w / 2, y1, c3d4, cd, false).replace('M', 'L')} L ${w / 2},${y2} ${shapeArc(w, y2, w / 2, y1, cd2, cd4, false).replace('M', 'L')} ${shapeArc(w, y3 + y1, w / 2, y1, c3d4, cd2, false).replace('M', 'L')} L ${w / 2},${y4} ${shapeArc(0, y4, w / 2, y1, 0, cd4, false).replace('M', 'L')}`;
      }
      break
    case 'bracketPair':
      {
        const shapAdjst = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd', 'attrs', 'fmla']);
        let adj = 16667 * RATIO_EMUs_Points;
        const cnstVal1 = 50000 * RATIO_EMUs_Points;
        const cnstVal2 = 100000 * RATIO_EMUs_Points;
        if (shapAdjst) {
          adj = parseInt(shapAdjst.substring(4)) * RATIO_EMUs_Points;
        }
        const cd2 = 180,
          cd4 = 90,
          c3d4 = 270;
        const a = (adj < 0) ? 0 : (adj > cnstVal1) ? cnstVal1 : adj;
        const x1 = Math.min(w, h) * a / cnstVal2;
        const x2 = w - x1;
        const y2 = h - x1;
        pathData = `${shapeArc(x1, x1, x1, x1, c3d4, cd2, false)} ${shapeArc(x1, y2, x1, x1, cd2, cd4, false).replace('M', 'L')} ${shapeArc(x2, x1, x1, x1, c3d4, (c3d4 + cd4), false)} ${shapeArc(x2, y2, x1, x1, 0, cd4, false).replace('M', 'L')}`;
      }
      break
    case 'leftBracket':
      {
        const shapAdjst = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd', 'attrs', 'fmla']);
        let adj = 8333 * RATIO_EMUs_Points;
        const cnstVal1 = 50000 * RATIO_EMUs_Points;
        const cnstVal2 = 100000 * RATIO_EMUs_Points;
        const maxAdj = cnstVal1 * h / Math.min(w, h);
        if (shapAdjst) {
          adj = parseInt(shapAdjst.substring(4)) * RATIO_EMUs_Points;
        }
        const cd2 = 180,
          cd4 = 90,
          c3d4 = 270;
        const a = (adj < 0) ? 0 : (adj > maxAdj) ? maxAdj : adj;
        let y1 = Math.min(w, h) * a / cnstVal2;
        if (y1 > w) y1 = w;
        const y2 = h - y1;
        pathData = `M ${w},${h} ${shapeArc(y1, y2, y1, y1, cd4, cd2, false).replace('M', 'L')} L 0,${y1} ${shapeArc(y1, y1, y1, y1, cd2, c3d4, false).replace('M', 'L')} L ${w},0`;
      }
      break
    case 'rightBracket':
      {
        const shapAdjst = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd', 'attrs', 'fmla']);
        let adj = 8333 * RATIO_EMUs_Points;
        const cnstVal1 = 50000 * RATIO_EMUs_Points;
        const cnstVal2 = 100000 * RATIO_EMUs_Points;
        const maxAdj = cnstVal1 * h / Math.min(w, h);
        if (shapAdjst) {
          adj = parseInt(shapAdjst.substring(4)) * RATIO_EMUs_Points;
        }
        const cd = 360,
          cd4 = 90,
          c3d4 = 270;
        const a = (adj < 0) ? 0 : (adj > maxAdj) ? maxAdj : adj;
        const y1 = Math.min(w, h) * a / cnstVal2;
        const y2 = h - y1;
        const y3 = w - y1;
        pathData = `M 0,${h} ${shapeArc(y3, y2, y1, y1, cd4, 0, false).replace('M', 'L')} L ${w},${h / 2} ${shapeArc(y3, y1, y1, y1, cd, c3d4, false).replace('M', 'L')} L 0,0`;
      }
      break
    case 'moon':
      {
        const shapAdjst = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd', 'attrs', 'fmla']);
        let adj = 0.5;
        if (shapAdjst) {
          adj = parseInt(shapAdjst.substring(4)) / 100000;
        }
        const hd2 = h / 2;
        const cd2 = 180;
        const cd4 = 90;
        const adj2 = (1 - adj) * w;
        pathData = `M ${w},${h} ${shapeArc(w, hd2, w, hd2, cd4, (cd4 + cd2), false).replace('M', 'L')} ${shapeArc(w, hd2, adj2, hd2, (cd4 + cd2), cd4, false).replace('M', 'L')} z`;
      }
      break
    case 'corner':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let sAdj1_val = 50000 * RATIO_EMUs_Points;
        let sAdj2_val = 50000 * RATIO_EMUs_Points;
        const cnsVal = 100000 * RATIO_EMUs_Points;
        if (shapAdjst_ary) {
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              sAdj1_val = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            } 
            else if (sAdj_name === 'adj2') {
              sAdj2_val = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
          }
        }
        const minWH = Math.min(w, h);
        const maxAdj1 = cnsVal * h / minWH;
        const maxAdj2 = cnsVal * w / minWH;
        const a1 = (sAdj1_val < 0) ? 0 : (sAdj1_val > maxAdj1) ? maxAdj1 : sAdj1_val;
        const a2 = (sAdj2_val < 0) ? 0 : (sAdj2_val > maxAdj2) ? maxAdj2 : sAdj2_val;
        const x1 = minWH * a2 / cnsVal;
        const dy1 = minWH * a1 / cnsVal;
        const y1 = h - dy1;
        pathData = `M 0,0 L ${x1},0 L ${x1},${y1} L ${w},${y1} L ${w},${h} L 0,${h} z`;
      }
      break
    case 'diagStripe':
      {
        const shapAdjst = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd', 'attrs', 'fmla']);
        let sAdj1_val = 50000 * RATIO_EMUs_Points;
        const cnsVal = 100000 * RATIO_EMUs_Points;
        if (shapAdjst) {
          sAdj1_val = parseInt(shapAdjst.substring(4)) * RATIO_EMUs_Points;
        }
        const a1 = (sAdj1_val < 0) ? 0 : (sAdj1_val > cnsVal) ? cnsVal : sAdj1_val;
        const x2 = w * a1 / cnsVal;
        const y2 = h * a1 / cnsVal;
        pathData = `M 0,${y2} L ${x2},0 L ${w},0 L 0,${h} z`;
      }
      break
    case 'gear6':
    case 'gear9':
      pathData = shapeGear(w, h / 3.5, parseInt(shapType.substring(4)));
      break
    case 'bentConnector3':
      {
        const shapAdjst = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd', 'attrs', 'fmla']);
        let shapAdjst_val = 0.5;
        if (shapAdjst) {
          shapAdjst_val = parseInt(shapAdjst.substring(4)) / 100000;
        }
        pathData = `M 0 0 L ${shapAdjst_val * w} 0 L ${shapAdjst_val * w} ${h} L ${w} ${h}`;
      }
      break
    case 'plus':
      {
        const shapAdjst = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd', 'attrs', 'fmla']);
        let adj1 = 0.25;
        if (shapAdjst) {
          adj1 = parseInt(shapAdjst.substring(4)) / 100000;
        }
        const adj2 = (1 - adj1);
        pathData = `M ${adj1 * w} 0 L ${adj1 * w} ${adj1 * h} L 0 ${adj1 * h} L 0 ${adj2 * h} L ${adj1 * w} ${adj2 * h} L ${adj1 * w} ${h} L ${adj2 * w} ${h} L ${adj2 * w} ${adj2 * h} L ${w} ${adj2 * h} L ${w} ${adj1 * h} L ${adj2 * w} ${adj1 * h} L ${adj2 * w} 0 Z`;
      }
      break
    case 'teardrop':
      {
        const shapAdjst = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd', 'attrs', 'fmla']);
        let adj1 = 100000 * RATIO_EMUs_Points;
        const cnsVal1 = adj1;
        const cnsVal2 = 200000 * RATIO_EMUs_Points;
        if (shapAdjst) {
          adj1 = parseInt(shapAdjst.substring(4)) * RATIO_EMUs_Points;
        }
        const a1 = (adj1 < 0) ? 0 : (adj1 > cnsVal2) ? cnsVal2 : adj1;
        const r2 = Math.sqrt(2);
        const tw = r2 * (w / 2);
        const th = r2 * (h / 2);
        const sw = (tw * a1) / cnsVal1;
        const sh = (th * a1) / cnsVal1;
        const rd45 = (45 * (Math.PI) / 180);
        const dx1 = sw * (Math.cos(rd45));
        const dy1 = sh * (Math.cos(rd45));
        const x1 = (w / 2) + dx1;
        const y1 = (h / 2) - dy1;
        const x2 = ((w / 2) + x1) / 2;
        const y2 = ((h / 2) + y1) / 2;
        pathData = `${shapeArc(w / 2, h / 2, w / 2, h / 2, 180, 270, false)} Q ${x2},0 ${x1},${y1} Q ${w},${y2} ${w},${h / 2} ${shapeArc(w / 2, h / 2, w / 2, h / 2, 0, 90, false).replace('M', 'L')} ${shapeArc(w / 2, h / 2, w / 2, h / 2, 90, 180, false).replace('M', 'L')} z`;
      }
      break
    case 'plaque':
      {
        const shapAdjst = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd', 'attrs', 'fmla']);
        let adj1 = 16667 * RATIO_EMUs_Points;
        const cnsVal1 = 50000 * RATIO_EMUs_Points;
        const cnsVal2 = 100000 * RATIO_EMUs_Points;
        if (shapAdjst) {
          adj1 = parseInt(shapAdjst.substring(4)) * RATIO_EMUs_Points;
        }
        const a1 = (adj1 < 0) ? 0 : (adj1 > cnsVal1) ? cnsVal1 : adj1;
        const x1 = a1 * (Math.min(w, h)) / cnsVal2;
        const x2 = w - x1;
        const y2 = h - x1;
        pathData = `M 0,${x1} ${shapeArc(0, 0, x1, x1, 90, 0, false).replace('M', 'L')} L ${x2},0 ${shapeArc(w, 0, x1, x1, 180, 90, false).replace('M', 'L')} L ${w},${y2} ${shapeArc(w, h, x1, x1, 270, 180, false).replace('M', 'L')} L ${x1},${h} ${shapeArc(0, h, x1, x1, 0, -90, false).replace('M', 'L')} z`;
      }
      break
    case 'sun':
      {
        const shapAdjst = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd', 'attrs', 'fmla']);
        const refr = RATIO_EMUs_Points;
        let adj1 = 25000 * refr;
        const cnstVal1 = 12500 * refr;
        const cnstVal2 = 46875 * refr;
        if (shapAdjst) {
          adj1 = parseInt(shapAdjst.substring(4)) * refr;
        }
        const a1 = (adj1 < cnstVal1) ? cnstVal1 : (adj1 > cnstVal2) ? cnstVal2 : adj1;
        const cnstVa3 = 50000 * refr;
        const cnstVa4 = 100000 * refr;
        const g0 = cnstVa3 - a1;
        const g1 = g0 * 30274 / 32768;
        const g2 = g0 * 12540 / 32768;
        const g5 = cnstVa3 - g1;
        const g6 = cnstVa3 - g2;
        const g10 = g5 * 3 / 4;
        const g11 = g6 * 3 / 4;
        const g12 = g10 + 3662 * refr;
        const g13 = g11 + 36620 * refr;
        const g14 = g11 + 12500 * refr;
        const g15 = cnstVa4 - g10;
        const g16 = cnstVa4 - g12;
        const g17 = cnstVa4 - g13;
        const g18 = cnstVa4 - g14;
        const ox1 = w * 18436 / 21600;
        const oy1 = h * 3163 / 21600;
        const ox2 = w * 3163 / 21600;
        const oy2 = h * 18436 / 21600;
        const x10 = w * g10 / cnstVa4;
        const x12 = w * g12 / cnstVa4;
        const x13 = w * g13 / cnstVa4;
        const x14 = w * g14 / cnstVa4;
        const x15 = w * g15 / cnstVa4;
        const x16 = w * g16 / cnstVa4;
        const x17 = w * g17 / cnstVa4;
        const x18 = w * g18 / cnstVa4;
        const x19 = w * a1 / cnstVa4;
        const wR = w * g0 / cnstVa4;
        const hR = h * g0 / cnstVa4;
        const y10 = h * g10 / cnstVa4;
        const y12 = h * g12 / cnstVa4;
        const y13 = h * g13 / cnstVa4;
        const y14 = h * g14 / cnstVa4;
        const y15 = h * g15 / cnstVa4;
        const y16 = h * g16 / cnstVa4;
        const y17 = h * g17 / cnstVa4;
        const y18 = h * g18 / cnstVa4;
        pathData = `M ${w},${h / 2} L ${x15},${y18} L ${x15},${y14} z M ${ox1},${oy1} L ${x16},${y17} L ${x13},${y12} z M ${w / 2},0 L ${x18},${y10} L ${x14},${y10} z M ${ox2},${oy1} L ${x17},${y12} L ${x12},${y17} z M 0,${h / 2} L ${x10},${y14} L ${x10},${y18} z M ${ox2},${oy2} L ${x12},${y13} L ${x17},${y16} z M ${w / 2},${h} L ${x14},${y15} L ${x18},${y15} z M ${ox1},${oy2} L ${x13},${y16} L ${x16},${y13} z M ${x19},${h / 2} ${shapeArc(w / 2, h / 2, wR, hR, 180, 540, false).replace('M', 'L')} z`;
      }
      break
    case 'heart':
      {
        const dx1 = w * 49 / 48;
        const dx2 = w * 10 / 48;
        const x1 = w / 2 - dx1;
        const x2 = w / 2 - dx2;
        const x3 = w / 2 + dx2;
        const x4 = w / 2 + dx1;
        const y1 = -h / 3;
        pathData = `M ${w / 2},${h / 4} C ${x3},${y1} ${x4},${h / 4} ${w / 2},${h} C ${x1},${h / 4} ${x2},${y1} ${w / 2},${h / 4} z`;
      }
      break
    case 'lightningBolt':
      {
        const x1 = w * 5022 / 21600,
          x2 = w * 11050 / 21600,
          x3 = w * 8472 / 21600,
          x5 = w * 10012 / 21600,
          x6 = w * 14767 / 21600,
          x7 = w * 12222 / 21600,
          x8 = w * 12860 / 21600,
          x10 = w * 7602 / 21600,
          x11 = w * 16577 / 21600,
          y1 = h * 3890 / 21600,
          y2 = h * 6080 / 21600,
          y3 = h * 6797 / 21600,
          y5 = h * 12877 / 21600,
          y6 = h * 9705 / 21600,
          y7 = h * 12007 / 21600,
          y8 = h * 13987 / 21600,
          y9 = h * 8382 / 21600,
          y11 = h * 14915 / 21600;
        pathData = `M ${x3},0 L ${x8},${y2} L ${x2},${y3} L ${x11},${y7} L ${x6},${y5} L ${w},${h} L ${x5},${y11} L ${x7},${y8} L ${x1},${y6} L ${x10},${y9} L 0,${y1} z`;
      }
      break
    case 'cube':
      {
        const shapAdjst = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd', 'attrs', 'fmla']);
        const refr = RATIO_EMUs_Points;
        let adj = 25000 * refr;
        if (shapAdjst) {
          adj = parseInt(shapAdjst.substring(4)) * refr;
        }
        const cnstVal2 = 100000 * refr;
        const ss = Math.min(w, h);
        const a = (adj < 0) ? 0 : (adj > cnstVal2) ? cnstVal2 : adj;
        const y1 = ss * a / cnstVal2;
        const y4 = h - y1;
        const x4 = w - y1;
        pathData = `M 0,${y1} L ${y1},0 L ${w},0 L ${w},${y4} L ${x4},${h} L 0,${h} z M 0,${y1} L ${x4},${y1} M ${x4},${y1} L ${w},0 M ${x4},${y1} L ${x4},${h}`;
      }
      break
    case 'bevel':
      {
        const shapAdjst = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd', 'attrs', 'fmla']);
        const refr = RATIO_EMUs_Points;
        let adj = 12500 * refr;
        if (shapAdjst) {
          adj = parseInt(shapAdjst.substring(4)) * refr;
        }
        const cnstVal1 = 50000 * refr;
        const cnstVal2 = 100000 * refr;
        const ss = Math.min(w, h);
        const a = (adj < 0) ? 0 : (adj > cnstVal1) ? cnstVal1 : adj;
        const x1 = ss * a / cnstVal2;
        const x2 = w - x1;
        const y2 = h - x1;
        pathData = `M 0,0 L ${w},0 L ${w},${h} L 0,${h} z M ${x1},${x1} L ${x2},${x1} L ${x2},${y2} L ${x1},${y2} z M 0,0 L ${x1},${x1} M 0,${h} L ${x1},${y2} M ${w},0 L ${x2},${x1} M ${w},${h} L ${x2},${y2}`;
      }
      break
    case 'foldedCorner':
      {
        const shapAdjst = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd', 'attrs', 'fmla']);
        const refr = RATIO_EMUs_Points;
        let adj = 16667 * refr;
        if (shapAdjst) {
          adj = parseInt(shapAdjst.substring(4)) * refr;
        }
        const cnstVal1 = 50000 * refr;
        const cnstVal2 = 100000 * refr;
        const ss = Math.min(w, h);
        const a = (adj < 0) ? 0 : (adj > cnstVal1) ? cnstVal1 : adj;
        const dy2 = ss * a / cnstVal2;
        const dy1 = dy2 / 5;
        const x1 = w - dy2;
        const x2 = x1 + dy1;
        const y2 = h - dy2;
        const y1 = y2 + dy1;
        pathData = `M ${x1},${h} L ${x2},${y1} L ${w},${y2} L ${x1},${h} L 0,${h} L 0,0 L ${w},0 L ${w},${y2}`;
      }
      break
    case 'cloud':
    case 'cloudCallout':
      {
        const x0 = w * 3900 / 43200;
        const y0 = h * 14370 / 43200;
        const rX1 = w * 6753 / 43200,
          rY1 = h * 9190 / 43200,
          rX2 = w * 5333 / 43200,
          rY2 = h * 7267 / 43200,
          rX3 = w * 4365 / 43200,
          rY3 = h * 5945 / 43200,
          rX4 = w * 4857 / 43200,
          rY4 = h * 6595 / 43200,
          rY5 = h * 7273 / 43200,
          rX6 = w * 6775 / 43200,
          rY6 = h * 9220 / 43200,
          rX7 = w * 5785 / 43200,
          rY7 = h * 7867 / 43200,
          rX8 = w * 6752 / 43200,
          rY8 = h * 9215 / 43200,
          rX9 = w * 7720 / 43200,
          rY9 = h * 10543 / 43200,
          rX10 = w * 4360 / 43200,
          rY10 = h * 5918 / 43200,
          rX11 = w * 4345 / 43200;
        const sA1 = -11429249 / 60000,
          wA1 = 7426832 / 60000,
          sA2 = -8646143 / 60000,
          wA2 = 5396714 / 60000,
          sA3 = -8748475 / 60000,
          wA3 = 5983381 / 60000,
          sA4 = -7859164 / 60000,
          wA4 = 7034504 / 60000,
          sA5 = -4722533 / 60000,
          wA5 = 6541615 / 60000,
          sA6 = -2776035 / 60000,
          wA6 = 7816140 / 60000,
          sA7 = 37501 / 60000,
          wA7 = 6842000 / 60000,
          sA8 = 1347096 / 60000,
          wA8 = 6910353 / 60000,
          sA9 = 3974558 / 60000,
          wA9 = 4542661 / 60000,
          sA10 = -16496525 / 60000,
          wA10 = 8804134 / 60000,
          sA11 = -14809710 / 60000,
          wA11 = 9151131 / 60000;

        const getArc = (startX, startY, rX, rY, sA, wA) => {
          const cX = startX - rX * Math.cos(sA * Math.PI / 180);
          const cY = startY - rY * Math.sin(sA * Math.PI / 180);
          return shapeArc(cX, cY, rX, rY, sA, sA + wA, false).replace('M', 'L')
        };

        let cloudPath = `M ${x0},${y0}`;
        let lastPoint = [x0, y0];
        const arcs = [
          [rX1, rY1, sA1, wA1],
          [rX2, rY2, sA2, wA2],
          [rX3, rY3, sA3, wA3],
          [rX4, rY4, sA4, wA4],
          [rX2, rY5, sA5, wA5],
          [rX6, rY6, sA6, wA6],
          [rX7, rY7, sA7, wA7],
          [rX8, rY8, sA8, wA8],
          [rX9, rY9, sA9, wA9],
          [rX10, rY10, sA10, wA10],
          [rX11, rY3, sA11, wA11]
        ];

        for (const arcParams of arcs) {
          const arcPath = getArc(lastPoint[0], lastPoint[1], ...arcParams);
          cloudPath += arcPath;
          const lastL = arcPath.lastIndexOf('L');
          const coords = arcPath.substring(lastL + 1).split(' ');
          lastPoint = [parseFloat(coords[0]), parseFloat(coords[1])];
        }
        cloudPath += ' z';

        if (shapType === 'cloudCallout') {
          const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
          const refr = RATIO_EMUs_Points;
          let adj1 = -20833 * refr;
          let adj2 = 62500 * refr;
          if (shapAdjst_ary) {
            for (const adj of shapAdjst_ary) {
              const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
              if (sAdj_name === 'adj1') {
                adj1 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * refr;
              } 
              else if (sAdj_name === 'adj2') {
                adj2 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * refr;
              }
            }
          }
          const cnstVal2 = 100000 * refr;
          const ss = Math.min(w, h);
          const wd2 = w / 2,
            hd2 = h / 2;
          const dxPos = w * adj1 / cnstVal2;
          const dyPos = h * adj2 / cnstVal2;
          const xPos = wd2 + dxPos;
          const yPos = hd2 + dyPos;
          const ht = hd2 * Math.cos(Math.atan(dyPos / dxPos));
          const wt = wd2 * Math.sin(Math.atan(dyPos / dxPos));
          const g2 = wd2 * Math.cos(Math.atan(wt / ht));
          const g3 = hd2 * Math.sin(Math.atan(wt / ht));
          const g4 = (adj1 >= 0) ? wd2 + g2 : wd2 - g2;
          const g5 = (adj1 >= 0) ? hd2 + g3 : hd2 - g3;
          const g6 = g4 - xPos;
          const g7 = g5 - yPos;
          const g8 = Math.sqrt(g6 * g6 + g7 * g7);
          const g9 = ss * 6600 / 21600;
          const g10 = g8 - g9;
          const g11 = g10 / 3;
          const g12 = ss * 1800 / 21600;
          const g13 = g11 + g12;
          const g16 = (g13 * g6 / g8) + xPos;
          const g17 = (g13 * g7 / g8) + yPos;
          const g18 = ss * 4800 / 21600;
          const g20 = g18 + (g11 * 2);
          const g23 = (g20 * g6 / g8) + xPos;
          const g24 = (g20 * g7 / g8) + yPos;
          const g25 = ss * 1200 / 21600;
          const g26 = ss * 600 / 21600;
          const x23 = xPos + g26;
          const x24 = g16 + g25;
          const x25 = g23 + g12;
          const calloutPath = `${shapeArc(x23 - g26, yPos, g26, g26, 0, 360, true)} M ${x24},${g17} ${shapeArc(x24 - g25, g17, g25, g25, 0, 360, true).replace('M', 'L')} M ${x25},${g24} ${shapeArc(x25 - g12, g24, g12, g12, 0, 360, true).replace('M', 'L')}`;
          cloudPath += calloutPath;
        }
        pathData = cloudPath;
      }
      break
    case 'smileyFace':
      {
        const shapAdjst = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd', 'attrs', 'fmla']);
        const refr = RATIO_EMUs_Points;
        let adj = 4653 * refr;
        if (shapAdjst) {
          adj = parseInt(shapAdjst.substring(4)) * refr;
        }
        const cnstVal1 = 50000 * refr;
        const cnstVal2 = 100000 * refr;
        const cnstVal3 = 4653 * refr;
        const wd2 = w / 2,
          hd2 = h / 2;
        const a = (adj < -cnstVal3) ? -cnstVal3 : (adj > cnstVal3) ? cnstVal3 : adj;
        const x2 = w * 6215 / 21600;
        const x3 = w * 13135 / 21600;
        const x4 = w * 16640 / 21600;
        const y1 = h * 7570 / 21600;
        const y3 = h * 16515 / 21600;
        const dy2 = h * a / cnstVal2;
        const y2 = y3 - dy2;
        const y4 = y3 + dy2;
        const dy3 = h * a / cnstVal1;
        const y5 = y4 + dy3;
        const wR = w * 1125 / 21600;
        const hR = h * 1125 / 21600;
        const cX1 = x2;
        const cY1 = y1;
        const cX2 = x3;
        const x1_mouth = w * 4969 / 21699;
        pathData = `${shapeArc(cX1, cY1, wR, hR, 0, 360, true)} ${shapeArc(cX2, cY1, wR, hR, 0, 360, true)} M ${x1_mouth},${y2} Q ${wd2},${y5} ${x4},${y2} Q ${wd2},${y5} ${x1_mouth},${y2} M 0,${hd2} ${shapeArc(wd2, hd2, wd2, hd2, 180, 540, false).replace('M', 'L')} z`;
      }
      break
    case 'verticalScroll':
    case 'horizontalScroll':
      {
        const shapAdjst = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd', 'attrs', 'fmla']);
        const refr = RATIO_EMUs_Points;
        let adj = 12500 * refr;
        if (shapAdjst) {
          adj = parseInt(shapAdjst.substring(4)) * refr;
        }
        const cnstVal1 = 25000 * refr;
        const cnstVal2 = 100000 * refr;
        const ss = Math.min(w, h);
        const t = 0,
          l = 0,
          b = h,
          r = w;
        const a = (adj < 0) ? 0 : (adj > cnstVal1) ? cnstVal1 : adj;
        const ch = ss * a / cnstVal2;
        const ch2 = ch / 2;
        const ch4 = ch / 4;
        if (shapType === 'verticalScroll') {
          const x3 = ch + ch2;
          const x4 = ch + ch;
          const x6 = r - ch;
          const x7 = r - ch2;
          const x5 = x6 - ch2;
          const y3 = b - ch;
          const y4 = b - ch2;
          pathData = `M ${ch},${y3} L ${ch},${ch2} ${shapeArc(x3, ch2, ch2, ch2, 180, 270, false).replace('M', 'L')} L ${x7},${t} ${shapeArc(x7, ch2, ch2, ch2, 270, 450, false).replace('M', 'L')} L ${x6},${ch} L ${x6},${y4} ${shapeArc(x5, y4, ch2, ch2, 0, 90, false).replace('M', 'L')} L ${ch2},${b} ${shapeArc(ch2, y4, ch2, ch2, 90, 270, false).replace('M', 'L')} z M ${x3},${t} ${shapeArc(x3, ch2, ch2, ch2, 270, 450, false).replace('M', 'L')} ${shapeArc(x3, x3 / 2, ch4, ch4, 90, 270, false).replace('M', 'L')} L ${x4},${ch2} M ${x6},${ch} L ${x3},${ch} M ${ch},${y4} ${shapeArc(ch2, y4, ch2, ch2, 0, 270, false).replace('M', 'L')} ${shapeArc(ch2, (y4 + y3) / 2, ch4, ch4, 270, 450, false).replace('M', 'L')} z M ${ch},${y4} L ${ch},${y3}`;
        } 
        else if (shapType === 'horizontalScroll') {
          const y3 = ch + ch2;
          const y4 = ch + ch;
          const y6 = b - ch;
          const y7 = b - ch2;
          const y5 = y6 - ch2;
          const x3 = r - ch;
          const x4 = r - ch2;
          pathData = `M ${l},${y3} ${shapeArc(ch2, y3, ch2, ch2, 180, 270, false).replace('M', 'L')} L ${x3},${ch} L ${x3},${ch2} ${shapeArc(x4, ch2, ch2, ch2, 180, 360, false).replace('M', 'L')} L ${r},${y5} ${shapeArc(x4, y5, ch2, ch2, 0, 90, false).replace('M', 'L')} L ${ch},${y6} L ${ch},${y7} ${shapeArc(ch2, y7, ch2, ch2, 0, 180, false).replace('M', 'L')} z M ${x4},${ch} ${shapeArc(x4, ch2, ch2, ch2, 90, -180, false).replace('M', 'L')} ${shapeArc((x3 + x4) / 2, ch2, ch4, ch4, 180, 0, false).replace('M', 'L')} z M ${x4},${ch} L ${x3},${ch} M ${ch2},${y4} L ${ch2},${y3} ${shapeArc(y3 / 2, y3, ch4, ch4, 180, 360, false).replace('M', 'L')} ${shapeArc(ch2, y3, ch2, ch2, 0, 180, false).replace('M', 'L')} M ${ch},${y3} L ${ch},${y6}`;
        }
      }
      break
    case 'wedgeEllipseCallout':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        const refr = RATIO_EMUs_Points;
        let adj1 = -20833 * refr;
        let adj2 = 62500 * refr;
        if (shapAdjst_ary) {
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              adj1 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * refr;
            } 
            else if (sAdj_name === 'adj2') {
              adj2 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * refr;
            }
          }
        }
        const cnstVal1 = 100000 * RATIO_EMUs_Points;
        const angVal1 = 11 * Math.PI / 180;
        const vc = h / 2,
          hc = w / 2;
        const dxPos = w * adj1 / cnstVal1;
        const dyPos = h * adj2 / cnstVal1;
        const xPos = hc + dxPos;
        const yPos = vc + dyPos;
        const pang = Math.atan2(dyPos * w, dxPos * h);
        const stAng = pang + angVal1;
        const enAng = pang - angVal1;
        const dx1 = hc * Math.cos(stAng);
        const dy1 = vc * Math.sin(stAng);
        const dx2 = hc * Math.cos(enAng);
        const dy2 = vc * Math.sin(enAng);
        const x1 = hc + dx1;
        const y1 = vc + dy1;
        const x2 = hc + dx2;
        const y2 = vc + dy2;
        pathData = `M ${x1},${y1} L ${xPos},${yPos} L ${x2},${y2} ${shapeArc(hc, vc, hc, vc, enAng * 180 / Math.PI, stAng * 180 / Math.PI, true).replace('M', 'L')}`;
      }
      break
    case 'wedgeRectCallout':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        const refr = RATIO_EMUs_Points;
        let adj1 = -20833 * refr;
        let adj2 = 62500 * refr;
        if (shapAdjst_ary) {
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              adj1 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * refr;
            } 
            else if (sAdj_name === 'adj2') {
              adj2 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * refr;
            }
          }
        }
        const cnstVal1 = 100000 * RATIO_EMUs_Points;
        const vc = h / 2,
          hc = w / 2;
        const dxPos = w * adj1 / cnstVal1;
        const dyPos = h * adj2 / cnstVal1;
        const xPos = hc + dxPos;
        const yPos = vc + dyPos;
        const dq = dxPos * h / w;
        const dz = Math.abs(dyPos) - Math.abs(dq);
        const xg1 = (dxPos > 0) ? 7 : 2;
        const xg2 = (dxPos > 0) ? 10 : 5;
        const x1 = w * xg1 / 12;
        const x2 = w * xg2 / 12;
        const yg1 = (dyPos > 0) ? 7 : 2;
        const yg2 = (dyPos > 0) ? 10 : 5;
        const y1 = h * yg1 / 12;
        const y2 = h * yg2 / 12;
        const xl = (dz > 0) ? 0 : ((dxPos > 0) ? 0 : xPos);
        const xt = (dz > 0) ? ((dyPos > 0) ? x1 : xPos) : x1;
        const xr = (dz > 0) ? w : ((dxPos > 0) ? xPos : w);
        const xb = (dz > 0) ? ((dyPos > 0) ? xPos : x1) : x1;
        const yl = (dz > 0) ? y1 : ((dxPos > 0) ? y1 : yPos);
        const yt = (dz > 0) ? ((dyPos > 0) ? 0 : yPos) : 0;
        const yr = (dz > 0) ? y1 : ((dxPos > 0) ? yPos : y1);
        const yb = (dz > 0) ? ((dyPos > 0) ? yPos : h) : h;
        pathData = `M 0,0 L ${x1},0 L ${xt},${yt} L ${x2},0 L ${w},0 L ${w},${y1} L ${xr},${yr} L ${w},${y2} L ${w},${h} L ${x2},${h} L ${xb},${yb} L ${x1},${h} L 0,${h} L 0,${y2} L ${xl},${yl} L 0,${y1} z`;
      }
      break
    case 'wedgeRoundRectCallout':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        const refr = RATIO_EMUs_Points;
        let adj1 = -20833 * refr;
        let adj2 = 62500 * refr;
        let adj3 = 16667 * refr;
        if (shapAdjst_ary) {
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              adj1 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * refr;
            } 
            else if (sAdj_name === 'adj2') {
              adj2 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * refr;
            } 
            else if (sAdj_name === 'adj3') {
              adj3 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * refr;
            }
          }
        }
        const cnstVal1 = 100000 * RATIO_EMUs_Points;
        const ss = Math.min(w, h);
        const vc = h / 2,
          hc = w / 2;
        const dxPos = w * adj1 / cnstVal1;
        const dyPos = h * adj2 / cnstVal1;
        const xPos = hc + dxPos;
        const yPos = vc + dyPos;
        const dq = dxPos * h / w;
        const dz = Math.abs(dyPos) - Math.abs(dq);
        const xg1 = (dxPos > 0) ? 7 : 2;
        const xg2 = (dxPos > 0) ? 10 : 5;
        const x1 = w * xg1 / 12;
        const x2 = w * xg2 / 12;
        const yg1 = (dyPos > 0) ? 7 : 2;
        const yg2 = (dyPos > 0) ? 10 : 5;
        const y1 = h * yg1 / 12;
        const y2 = h * yg2 / 12;
        const xl = (dz > 0) ? 0 : ((dxPos > 0) ? 0 : xPos);
        const xt = (dz > 0) ? ((dyPos > 0) ? x1 : xPos) : x1;
        const xr = (dz > 0) ? w : ((dxPos > 0) ? xPos : w);
        const xb = (dz > 0) ? ((dyPos > 0) ? xPos : x1) : x1;
        const yl = (dz > 0) ? y1 : ((dxPos > 0) ? y1 : yPos);
        const yt = (dz > 0) ? ((dyPos > 0) ? 0 : yPos) : 0;
        const yr = (dz > 0) ? y1 : ((dxPos > 0) ? yPos : y1);
        const yb = (dz > 0) ? ((dyPos > 0) ? yPos : h) : h;
        const u1 = ss * adj3 / cnstVal1;
        const u2 = w - u1;
        const v2 = h - u1;
        pathData = `M 0,${u1} ${shapeArc(u1, u1, u1, u1, 180, 270, false).replace('M', 'L')} L ${x1},0 L ${xt},${yt} L ${x2},0 L ${u2},0 ${shapeArc(u2, u1, u1, u1, 270, 360, false).replace('M', 'L')} L ${w},${y1} L ${xr},${yr} L ${w},${y2} L ${w},${v2} ${shapeArc(u2, v2, u1, u1, 0, 90, false).replace('M', 'L')} L ${x2},${h} L ${xb},${yb} L ${x1},${h} L ${u1},${h} ${shapeArc(u1, v2, u1, u1, 90, 180, false).replace('M', 'L')} L 0,${y2} L ${xl},${yl} L 0,${y1} z`;
      }
      break
    case 'accentBorderCallout1':
    case 'accentBorderCallout2':
    case 'accentBorderCallout3':
    case 'borderCallout1':
    case 'borderCallout2':
    case 'borderCallout3':
    case 'accentCallout1':
    case 'accentCallout2':
    case 'accentCallout3':
    case 'callout1':
    case 'callout2':
    case 'callout3':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        const refr = RATIO_EMUs_Points;
        let adj1 = 18750 * refr;
        let adj2 = -8333 * refr;
        let adj3 = 18750 * refr;
        let adj4 = -16667 * refr;
        let adj5 = 100000 * refr;
        let adj6 = -16667 * refr;
        let adj7 = 112963 * refr;
        let adj8 = -8333 * refr;
        if (shapAdjst_ary) {
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              adj1 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * refr;
            }
            else if (sAdj_name === 'adj2') {
              adj2 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * refr;
            }
            else if (sAdj_name === 'adj3') {
              adj3 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * refr;
            }
            else if (sAdj_name === 'adj4') {
              adj4 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * refr;
            }
            else if (sAdj_name === 'adj5') {
              adj5 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * refr;
            }
            else if (sAdj_name === 'adj6') {
              adj6 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * refr;
            }
            else if (sAdj_name === 'adj7') {
              adj7 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * refr;
            }
            else if (sAdj_name === 'adj8') {
              adj8 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * refr;
            }
          }
        }
        const cnstVal1 = 100000 * refr;
        let x1, y1, x2, y2, x3, y3, x4, y4;
        const baseRect = `M 0,0 L ${w},0 L ${w},${h} L 0,${h} z`;
        switch (shapType) {
          case 'borderCallout1':
          case 'callout1':
            if (!shapAdjst_ary) {
              adj1 = 18750 * refr;
              adj2 = -8333 * refr;
              adj3 = 112500 * refr;
              adj4 = -38333 * refr;
            }
            y1 = h * adj1 / cnstVal1;
            x1 = w * adj2 / cnstVal1;
            y2 = h * adj3 / cnstVal1;
            x2 = w * adj4 / cnstVal1;
            pathData = `${baseRect} M ${x1},${y1} L ${x2},${y2}`;
            break
          case 'borderCallout2':
          case 'callout2':
            if (!shapAdjst_ary) {
              adj1 = 18750 * refr;
              adj2 = -8333 * refr;
              adj3 = 18750 * refr;
              adj4 = -16667 * refr;
              adj5 = 112500 * refr;
              adj6 = -46667 * refr;
            }
            y1 = h * adj1 / cnstVal1;
            x1 = w * adj2 / cnstVal1;
            y2 = h * adj3 / cnstVal1;
            x2 = w * adj4 / cnstVal1;
            y3 = h * adj5 / cnstVal1;
            x3 = w * adj6 / cnstVal1;
            pathData = `${baseRect} M ${x1},${y1} L ${x2},${y2} L ${x3},${y3}`;
            break
          case 'borderCallout3':
          case 'callout3':
            if (!shapAdjst_ary) {
              adj1 = 18750 * refr;
              adj2 = -8333 * refr;
              adj3 = 18750 * refr;
              adj4 = -16667 * refr;
              adj5 = 100000 * refr;
              adj6 = -16667 * refr;
              adj7 = 112963 * refr;
              adj8 = -8333 * refr;
            }
            y1 = h * adj1 / cnstVal1;
            x1 = w * adj2 / cnstVal1;
            y2 = h * adj3 / cnstVal1;
            x2 = w * adj4 / cnstVal1;
            y3 = h * adj5 / cnstVal1;
            x3 = w * adj6 / cnstVal1;
            y4 = h * adj7 / cnstVal1;
            x4 = w * adj8 / cnstVal1;
            pathData = `${baseRect} M ${x1},${y1} L ${x2},${y2} L ${x3},${y3} L ${x4},${y4}`;
            break
          case 'accentBorderCallout1':
          case 'accentCallout1':
            if (!shapAdjst_ary) {
              adj1 = 18750 * refr;
              adj2 = -8333 * refr;
              adj3 = 112500 * refr;
              adj4 = -38333 * refr;
            }
            y1 = h * adj1 / cnstVal1;
            x1 = w * adj2 / cnstVal1;
            y2 = h * adj3 / cnstVal1;
            x2 = w * adj4 / cnstVal1;
            pathData = `${baseRect} M ${x1},${y1} L ${x2},${y2} M ${x1},0 L ${x1},${h}`;
            break
          case 'accentBorderCallout2':
          case 'accentCallout2':
            if (!shapAdjst_ary) {
              adj1 = 18750 * refr;
              adj2 = -8333 * refr;
              adj3 = 18750 * refr;
              adj4 = -16667 * refr;
              adj5 = 112500 * refr;
              adj6 = -46667 * refr;
            }
            y1 = h * adj1 / cnstVal1;
            x1 = w * adj2 / cnstVal1;
            y2 = h * adj3 / cnstVal1;
            x2 = w * adj4 / cnstVal1;
            y3 = h * adj5 / cnstVal1;
            x3 = w * adj6 / cnstVal1;
            pathData = `${baseRect} M ${x1},${y1} L ${x2},${y2} L ${x3},${y3} M ${x1},0 L ${x1},${h}`;
            break
          case 'accentBorderCallout3':
          case 'accentCallout3':
            if (!shapAdjst_ary) {
              adj1 = 18750 * refr;
              adj2 = -8333 * refr;
              adj3 = 18750 * refr;
              adj4 = -16667 * refr;
              adj5 = 100000 * refr;
              adj6 = -16667 * refr;
              adj7 = 112963 * refr;
              adj8 = -8333 * refr;
            }
            y1 = h * adj1 / cnstVal1;
            x1 = w * adj2 / cnstVal1;
            y2 = h * adj3 / cnstVal1;
            x2 = w * adj4 / cnstVal1;
            y3 = h * adj5 / cnstVal1;
            x3 = w * adj6 / cnstVal1;
            y4 = h * adj7 / cnstVal1;
            x4 = w * adj8 / cnstVal1;
            pathData = `${baseRect} M ${x1},${y1} L ${x2},${y2} L ${x3},${y3} L ${x4},${y4} M ${x1},0 L ${x1},${h}`;
            break
        }
      }
      break
    case 'leftRightRibbon':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        const refr = RATIO_EMUs_Points;
        let adj1 = 50000 * refr;
        let adj2 = 50000 * refr;
        let adj3 = 16667 * refr;
        if (shapAdjst_ary) {
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              adj1 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * refr;
            } 
            else if (sAdj_name === 'adj2') {
              adj2 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * refr;
            } 
            else if (sAdj_name === 'adj3') {
              adj3 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * refr;
            }
          }
        }
        const cnstVal1 = 33333 * refr;
        const cnstVal2 = 100000 * refr;
        const cnstVal3 = 200000 * refr;
        const cnstVal4 = 400000 * refr;
        const ss = Math.min(w, h);
        const hc = w / 2,
          vc = h / 2;
        const a3 = (adj3 < 0) ? 0 : (adj3 > cnstVal1) ? cnstVal1 : adj3;
        const maxAdj1 = cnstVal2 - a3;
        const a1 = (adj1 < 0) ? 0 : (adj1 > maxAdj1) ? maxAdj1 : adj1;
        const w1 = hc - (w / 32);
        const maxAdj2 = cnstVal2 * w1 / ss;
        const a2 = (adj2 < 0) ? 0 : (adj2 > maxAdj2) ? maxAdj2 : adj2;
        const x1 = ss * a2 / cnstVal2;
        const x4 = w - x1;
        const dy1 = h * a1 / cnstVal3;
        const dy2 = h * a3 / -cnstVal3;
        const ly1 = vc + dy2 - dy1;
        const ry4 = vc + dy1 - dy2;
        const ly2 = ly1 + dy1;
        const ry3 = h - ly2;
        const ly4 = ly2 * 2;
        const ry2 = h - (ly4 - ly1);
        const hR = a3 * ss / cnstVal4;
        const x2 = hc - (w / 32);
        const x3 = hc + (w / 32);
        const y1 = ly1 + hR;
        const y2_arc = ry2 - hR;
        pathData = `M 0,${ly2} L ${x1},0 L ${x1},${ly1} L ${hc},${ly1} ${shapeArc(hc, y1, w / 32, hR, 270, 450, false).replace('M', 'L')} ${shapeArc(hc, y2_arc, w / 32, hR, 270, 90, false).replace('M', 'L')} L ${x4},${ry2} L ${x4},${h - ly4} L ${w},${ry3} L ${x4},${h} L ${x4},${ry4} L ${hc},${ry4} ${shapeArc(hc, ry4 - hR, w / 32, hR, 90, 180, false).replace('M', 'L')} L ${x2},${ly4 - ly1} L ${x1},${ly4 - ly1} L ${x1},${ly4} z M ${x3},${y1} L ${x3},${ry2} M ${x2},${y2_arc} L ${x2},${ly4 - ly1}`;
      }
      break
    case 'ribbon':
    case 'ribbon2':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let adj1 = 16667 * RATIO_EMUs_Points;
        let adj2 = 50000 * RATIO_EMUs_Points;
        if (shapAdjst_ary) {
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              adj1 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            } 
            else if (sAdj_name === 'adj2') {
              adj2 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
          }
        }
        const cnstVal1 = 25000 * RATIO_EMUs_Points;
        const cnstVal2 = 33333 * RATIO_EMUs_Points;
        const cnstVal3 = 75000 * RATIO_EMUs_Points;
        const cnstVal4 = 100000 * RATIO_EMUs_Points;
        const cnstVal5 = 200000 * RATIO_EMUs_Points;
        const cnstVal6 = 400000 * RATIO_EMUs_Points;
        const hc = w / 2,
          t = 0,
          l = 0,
          b = h,
          r = w,
          wd8 = w / 8,
          wd32 = w / 32;
        const a1 = (adj1 < 0) ? 0 : (adj1 > cnstVal2) ? cnstVal2 : adj1;
        const a2 = (adj2 < cnstVal1) ? cnstVal1 : (adj2 > cnstVal3) ? cnstVal3 : adj2;
        const x10 = r - wd8;
        const dx2 = w * a2 / cnstVal5;
        const x2 = hc - dx2;
        const x9 = hc + dx2;
        const x3 = x2 + wd32;
        const x8 = x9 - wd32;
        const x5 = x2 + wd8;
        const x6 = x9 - wd8;
        const x4 = x5 - wd32;
        const x7 = x6 + wd32;
        const hR = h * a1 / cnstVal6;
        if (shapType === 'ribbon2') {
          const dy1 = h * a1 / cnstVal5;
          const y1 = b - dy1;
          const dy2 = h * a1 / cnstVal4;
          const y2 = b - dy2;
          const y4 = t + dy2;
          const y3 = (y4 + b) / 2;
          const y6 = b - hR;
          const y7 = y1 - hR;
          pathData = `M ${l},${b} L ${wd8},${y3} L ${l},${y4} L ${x2},${y4} L ${x2},${hR} ${shapeArc(x3, hR, wd32, hR, 180, 270, false).replace('M', 'L')} L ${x8},${t} ${shapeArc(x8, hR, wd32, hR, 270, 360, false).replace('M', 'L')} L ${x9},${y4} L ${r},${y4} L ${x10},${y3} L ${r},${b} L ${x7},${b} ${shapeArc(x7, y6, wd32, hR, 90, 270, false).replace('M', 'L')} L ${x8},${y1} ${shapeArc(x8, y7, wd32, hR, 90, -90, false).replace('M', 'L')} L ${x3},${y2} ${shapeArc(x3, y7, wd32, hR, 270, 90, false).replace('M', 'L')} L ${x4},${y1} ${shapeArc(x4, y6, wd32, hR, 270, 450, false).replace('M', 'L')} z M ${x5},${y2} L ${x5},${y6} M ${x6},${y6} L ${x6},${y2} M ${x2},${y7} L ${x2},${y4} M ${x9},${y4} L ${x9},${y7}`;
        } 
        else if (shapType === 'ribbon') {
          const y1 = h * a1 / cnstVal5;
          const y2 = h * a1 / cnstVal4;
          const y4 = b - y2;
          const y3 = y4 / 2;
          const y5 = b - hR;
          const y6 = y2 - hR;
          pathData = `M ${l},${t} L ${x4},${t} ${shapeArc(x4, hR, wd32, hR, 270, 450, false).replace('M', 'L')} L ${x3},${y1} ${shapeArc(x3, y6, wd32, hR, 270, 90, false).replace('M', 'L')} L ${x8},${y2} ${shapeArc(x8, y6, wd32, hR, 90, -90, false).replace('M', 'L')} L ${x7},${y1} ${shapeArc(x7, hR, wd32, hR, 90, 270, false).replace('M', 'L')} L ${r},${t} L ${x10},${y3} L ${r},${y4} L ${x9},${y4} L ${x9},${y5} ${shapeArc(x8, y5, wd32, hR, 0, 90, false).replace('M', 'L')} L ${x3},${b} ${shapeArc(x3, y5, wd32, hR, 90, 180, false).replace('M', 'L')} L ${x2},${y4} L ${l},${y4} L ${wd8},${y3} z M ${x5},${hR} L ${x5},${y2} M ${x6},${y2} L ${x6},${hR} M ${x2},${y4} L ${x2},${y6} M ${x9},${y6} L ${x9},${y4}`;
        }
      }
      break
    case 'doubleWave':
    case 'wave':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let adj1 = (shapType === 'doubleWave') ? 6250 * RATIO_EMUs_Points : 12500 * RATIO_EMUs_Points;
        let adj2 = 0;
        if (shapAdjst_ary) {
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              adj1 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            } 
            else if (sAdj_name === 'adj2') {
              adj2 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
          }
        }
        const cnstVal2 = -10000 * RATIO_EMUs_Points;
        const cnstVal3 = 50000 * RATIO_EMUs_Points;
        const cnstVal4 = 100000 * RATIO_EMUs_Points;
        const l = 0,
          b = h,
          r = w;
        if (shapType === 'doubleWave') {
          const cnstVal1 = 12500 * RATIO_EMUs_Points;
          const a1 = (adj1 < 0) ? 0 : (adj1 > cnstVal1) ? cnstVal1 : adj1;
          const a2 = (adj2 < cnstVal2) ? cnstVal2 : (adj2 > cnstVal4) ? cnstVal4 : adj2;
          const y1 = h * a1 / cnstVal4;
          const dy2 = y1 * 10 / 3;
          const y2 = y1 - dy2;
          const y3 = y1 + dy2;
          const y4 = b - y1;
          const y5 = y4 - dy2;
          const y6 = y4 + dy2;
          const of2 = w * a2 / cnstVal3;
          const dx2 = (of2 > 0) ? 0 : of2;
          const x2 = l - dx2;
          const dx8 = (of2 > 0) ? of2 : 0;
          const x8 = r - dx8;
          const dx3 = (dx2 + x8) / 6;
          const x3 = x2 + dx3;
          const dx4 = (dx2 + x8) / 3;
          const x4 = x2 + dx4;
          const x5 = (x2 + x8) / 2;
          const x6 = x5 + dx3;
          const x7 = (x6 + x8) / 2;
          const x9 = l + dx8;
          const x15 = r + dx2;
          const x10 = x9 + dx3;
          const x11 = x9 + dx4;
          const x12 = (x9 + x15) / 2;
          const x13 = x12 + dx3;
          const x14 = (x13 + x15) / 2;
          pathData = `M ${x2},${y1} C ${x3},${y2} ${x4},${y3} ${x5},${y1} C ${x6},${y2} ${x7},${y3} ${x8},${y1} L ${x15},${y4} C ${x14},${y6} ${x13},${y5} ${x12},${y4} C ${x11},${y6} ${x10},${y5} ${x9},${y4} z`;
        } 
        else if (shapType === 'wave') {
          const cnstVal5 = 20000 * RATIO_EMUs_Points;
          const a1 = (adj1 < 0) ? 0 : (adj1 > cnstVal5) ? cnstVal5 : adj1;
          const a2 = (adj2 < cnstVal2) ? cnstVal2 : (adj2 > cnstVal4) ? cnstVal4 : adj2;
          const y1 = h * a1 / cnstVal4;
          const dy2 = y1 * 10 / 3;
          const y2 = y1 - dy2;
          const y3 = y1 + dy2;
          const y4 = b - y1;
          const y5 = y4 - dy2;
          const y6 = y4 + dy2;
          const of2 = w * a2 / cnstVal3;
          const dx2 = (of2 > 0) ? 0 : of2;
          const x2 = l - dx2;
          const dx5 = (of2 > 0) ? of2 : 0;
          const x5 = r - dx5;
          const dx3 = (dx2 + x5) / 3;
          const x3 = x2 + dx3;
          const x4 = (x3 + x5) / 2;
          const x6 = l + dx5;
          const x10 = r + dx2;
          const x7 = x6 + dx3;
          const x8 = (x7 + x10) / 2;
          pathData = `M ${x2},${y1} C ${x3},${y2} ${x4},${y3} ${x5},${y1} L ${x10},${y4} C ${x8},${y6} ${x7},${y5} ${x6},${y4} z`;
        }
      }
      break
    case 'ellipseRibbon':
    case 'ellipseRibbon2':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let adj1 = 25000 * RATIO_EMUs_Points;
        let adj2 = 50000 * RATIO_EMUs_Points;
        let adj3 = 12500 * RATIO_EMUs_Points;
        if (shapAdjst_ary) {
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              adj1 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            } 
            else if (sAdj_name === 'adj2') {
              adj2 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            } 
            else if (sAdj_name === 'adj3') {
              adj3 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
          }
        }
        const cnstVal1 = 25000 * RATIO_EMUs_Points;
        const cnstVal3 = 75000 * RATIO_EMUs_Points;
        const cnstVal4 = 100000 * RATIO_EMUs_Points;
        const cnstVal5 = 200000 * RATIO_EMUs_Points;
        const hc = w / 2,
          t = 0,
          l = 0,
          b = h,
          r = w,
          wd8 = w / 8;
        const a1 = (adj1 < 0) ? 0 : (adj1 > cnstVal4) ? cnstVal4 : adj1;
        const a2 = (adj2 < cnstVal1) ? cnstVal1 : (adj2 > cnstVal3) ? cnstVal3 : adj2;
        const q10 = cnstVal4 - a1;
        const minAdj3 = (a1 - (q10 / 2) > 0) ? a1 - (q10 / 2) : 0;
        const a3 = (adj3 < minAdj3) ? minAdj3 : (adj3 > a1) ? a1 : adj3;
        const dx2 = w * a2 / cnstVal5;
        const x2 = hc - dx2;
        const x3 = x2 + wd8;
        const x4 = r - x3;
        const x5 = r - x2;
        const x6 = r - wd8;
        const dy1 = h * a3 / cnstVal4;
        const f1 = 4 * dy1 / w;
        const q2 = x3 - (x3 * x3 / w);
        const cx1 = x3 / 2;
        const cx2 = r - cx1;
        const q1_h = h * a1 / cnstVal4;
        const dy3 = q1_h - dy1;
        const q4 = x2 - (x2 * x2 / w);
        const q5 = f1 * q4;
        const rh = b - q1_h;
        const q8 = dy1 * 14 / 16;
        const cx4 = x2 / 2;
        const q9 = f1 * cx4;
        const cx5 = r - cx4;
        if (shapType === 'ellipseRibbon') {
          const y1 = f1 * q2;
          const cy1 = f1 * cx1;
          const y3 = q5 + dy3;
          const q6 = dy1 + dy3 - y3;
          const cy3 = (q6 + dy1) + dy3;
          const y2 = (q8 + rh) / 2;
          const y5 = q5 + rh;
          const y6 = y3 + rh;
          const cy4 = q9 + rh;
          const cy6 = cy3 + rh;
          const y7 = y1 + dy3;
          pathData = `M ${l},${t} Q ${cx1},${cy1} ${x3},${y1} L ${x2},${y3} Q ${hc},${cy3} ${x5},${y3} L ${x4},${y1} Q ${cx2},${cy1} ${r},${t} L ${x6},${y2} L ${r},${rh} Q ${cx5},${cy4} ${x5},${y5} L ${x5},${y6} Q ${hc},${cy6} ${x2},${y6} L ${x2},${y5} Q ${cx4},${cy4} ${l},${rh} L ${wd8},${y2} z M ${x2},${y5} L ${x2},${y3} M ${x5},${y3} L ${x5},${y5} M ${x3},${y1} L ${x3},${y7} M ${x4},${y7} L ${x4},${y1}`;
        } 
        else if (shapType === 'ellipseRibbon2') {
          const u1 = f1 * q2;
          const y1 = b - u1;
          const cu1 = f1 * cx1;
          const cy1 = b - cu1;
          const u3 = q5 + dy3;
          const y3 = b - u3;
          const q6 = dy1 + dy3 - u3;
          const cu3 = (q6 + dy1) + dy3;
          const cy3 = b - cu3;
          const u2 = (q8 + rh) / 2;
          const y2 = b - u2;
          const u5 = q5 + rh;
          const y5 = b - u5;
          const u6 = u3 + rh;
          const y6 = b - u6;
          const cu4 = q9 + rh;
          const cy4 = b - cu4;
          const cu6 = cu3 + rh;
          const cy6 = b - cu6;
          const u7 = u1 + dy3;
          const y7 = b - u7;
          pathData = `M ${l},${b} L ${wd8},${y2} L ${l},${q1_h} Q ${cx4},${cy4} ${x2},${y5} L ${x2},${y6} Q ${hc},${cy6} ${x5},${y6} L ${x5},${y5} Q ${cx5},${cy4} ${r},${q1_h} L ${x6},${y2} L ${r},${b} Q ${cx2},${cy1} ${x4},${y1} L ${x5},${y3} Q ${hc},${cy3} ${x2},${y3} L ${x3},${y1} Q ${cx1},${cy1} ${l},${b} z M ${x2},${y3} L ${x2},${y5} M ${x5},${y5} L ${x5},${y3} M ${x3},${y7} L ${x3},${y1} M ${x4},${y1} L ${x4},${y7}`;
        }
      }
      break
    case 'line':
    case 'straightConnector1':
    case 'bentConnector4':
    case 'bentConnector5':
    case 'curvedConnector2':
    case 'curvedConnector3':
    case 'curvedConnector4':
    case 'curvedConnector5':
      pathData = `M 0 0 L ${w} ${h}`;
      break
    case 'rightArrow':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let sAdj1_val = 0.25;
        let sAdj2_val = 0.5;
        if (shapAdjst_ary) {
          const max_sAdj2_const = w / h;
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              sAdj1_val = 0.5 - (parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) / 200000);
            } 
            else if (sAdj_name === 'adj2') {
              const sAdj2_val2 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) / 100000;
              sAdj2_val = 1 - (sAdj2_val2 / max_sAdj2_const);
            }
          }
        }
        pathData = `M ${w} ${h / 2} L ${sAdj2_val * w} 0 L ${sAdj2_val * w} ${sAdj1_val * h} L 0 ${sAdj1_val * h} L 0 ${(1 - sAdj1_val) * h} L ${sAdj2_val * w} ${(1 - sAdj1_val) * h} L ${sAdj2_val * w} ${h} Z`;
      }
      break
    case 'leftArrow':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let sAdj1_val = 0.25;
        let sAdj2_val = 0.5;
        if (shapAdjst_ary) {
          const max_sAdj2_const = w / h;
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              sAdj1_val = 0.5 - (parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) / 200000);
            } 
            else if (sAdj_name === 'adj2') {
              const sAdj2_val2 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) / 100000;
              sAdj2_val = sAdj2_val2 / max_sAdj2_const;
            }
          }
        }
        pathData = `M 0 ${h / 2} L ${sAdj2_val * w} ${h} L ${sAdj2_val * w} ${(1 - sAdj1_val) * h} L ${w} ${(1 - sAdj1_val) * h} L ${w} ${sAdj1_val * h} L ${sAdj2_val * w} ${sAdj1_val * h} L ${sAdj2_val * w} 0 Z`;
      }
      break
    case 'downArrow':
    case 'flowChartOffpageConnector':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let sAdj1_val = 0.25;
        let sAdj2_val = 0.5;
        if (shapAdjst_ary) {
          const max_sAdj2_const = h / w;
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              sAdj1_val = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) / 200000;
            } 
            else if (sAdj_name === 'adj2') {
              const sAdj2_val2 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) / 100000;
              sAdj2_val = sAdj2_val2 / max_sAdj2_const;
            }
          }
        }
        if (shapType === 'flowChartOffpageConnector') {
          sAdj1_val = 0.5;
          sAdj2_val = 0.212;
        }
        pathData = `M ${(0.5 - sAdj1_val) * w} 0 L ${(0.5 - sAdj1_val) * w} ${(1 - sAdj2_val) * h} L 0 ${(1 - sAdj2_val) * h} L ${w / 2} ${h} L ${w} ${(1 - sAdj2_val) * h} L ${(0.5 + sAdj1_val) * w} ${(1 - sAdj2_val) * h} L ${(0.5 + sAdj1_val) * w} 0 Z`;
      }
      break
    case 'upArrow':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let sAdj1_val = 0.25;
        let sAdj2_val = 0.5;
        if (shapAdjst_ary) {
          const max_sAdj2_const = h / w;
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              sAdj1_val = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) / 200000;
            } 
            else if (sAdj_name === 'adj2') {
              const sAdj2_val2 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) / 100000;
              sAdj2_val = sAdj2_val2 / max_sAdj2_const;
            }
          }
        }
        pathData = `M ${w / 2} 0 L 0 ${sAdj2_val * h} L ${(0.5 - sAdj1_val) * w} ${sAdj2_val * h} L ${(0.5 - sAdj1_val) * w} ${h} L ${(0.5 + sAdj1_val) * w} ${h} L ${(0.5 + sAdj1_val) * w} ${sAdj2_val * h} L ${w} ${sAdj2_val * h} Z`;
      }
      break
    case 'leftRightArrow':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let sAdj1_val = 0.25;
        let sAdj2_val = 0.25;
        if (shapAdjst_ary) {
          const max_sAdj2_const = w / h;
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              sAdj1_val = 0.5 - (parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) / 200000);
            } 
            else if (sAdj_name === 'adj2') {
              const sAdj2_val2 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) / 100000;
              sAdj2_val = sAdj2_val2 / max_sAdj2_const;
            }
          }
        }
        pathData = `M 0 ${h / 2} L ${sAdj2_val * w} ${h} L ${sAdj2_val * w} ${(1 - sAdj1_val) * h} L ${(1 - sAdj2_val) * w} ${(1 - sAdj1_val) * h} L ${(1 - sAdj2_val) * w} ${h} L ${w} ${h / 2} L ${(1 - sAdj2_val) * w} 0 L ${(1 - sAdj2_val) * w} ${sAdj1_val * h} L ${sAdj2_val * w} ${sAdj1_val * h} L ${sAdj2_val * w} 0 Z`;
      }
      break
    case 'upDownArrow':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let sAdj1_val = 0.25;
        let sAdj2_val = 0.25;
        if (shapAdjst_ary) {
          const max_sAdj2_const = h / w;
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              sAdj1_val = 0.5 - (parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) / 200000);
            } 
            else if (sAdj_name === 'adj2') {
              const sAdj2_val2 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) / 100000;
              sAdj2_val = sAdj2_val2 / max_sAdj2_const;
            }
          }
        }
        pathData = `M ${w / 2} 0 L 0 ${sAdj2_val * h} L ${sAdj1_val * w} ${sAdj2_val * h} L ${sAdj1_val * w} ${(1 - sAdj2_val) * h} L 0 ${(1 - sAdj2_val) * h} L ${w / 2} ${h} L ${w} ${(1 - sAdj2_val) * h} L ${(1 - sAdj1_val) * w} ${(1 - sAdj2_val) * h} L ${(1 - sAdj1_val) * w} ${sAdj2_val * h} L ${w} ${sAdj2_val * h} Z`;
      }
      break
    case 'quadArrow':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let adj1 = 22500 * RATIO_EMUs_Points;
        let adj2 = 22500 * RATIO_EMUs_Points;
        let adj3 = 22500 * RATIO_EMUs_Points;
        const cnstVal1 = 50000 * RATIO_EMUs_Points;
        const cnstVal2 = 100000 * RATIO_EMUs_Points;
        const cnstVal3 = 200000 * RATIO_EMUs_Points;
        if (shapAdjst_ary) {
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              adj1 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            } 
            else if (sAdj_name === 'adj2') {
              adj2 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            } 
            else if (sAdj_name === 'adj3') {
              adj3 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
          }
        }
        const vc = h / 2,
          hc = w / 2;
        const minWH = Math.min(w, h);
        const a2 = (adj2 < 0) ? 0 : (adj2 > cnstVal1) ? cnstVal1 : adj2;
        const maxAdj1 = 2 * a2;
        const a1 = (adj1 < 0) ? 0 : (adj1 > maxAdj1) ? maxAdj1 : adj1;
        const q1 = cnstVal2 - maxAdj1;
        const maxAdj3 = q1 / 2;
        const a3 = (adj3 < 0) ? 0 : (adj3 > maxAdj3) ? maxAdj3 : adj3;
        const x1 = minWH * a3 / cnstVal2;
        const dx2 = minWH * a2 / cnstVal2;
        const x2 = hc - dx2;
        const x5 = hc + dx2;
        const dx3 = minWH * a1 / cnstVal3;
        const x3 = hc - dx3;
        const x4 = hc + dx3;
        const x6 = w - x1;
        const y2 = vc - dx2;
        const y5 = vc + dx2;
        const y3 = vc - dx3;
        const y4 = vc + dx3;
        const y6 = h - x1;
        pathData = `M 0,${vc} L ${x1},${y2} L ${x1},${y3} L ${x3},${y3} L ${x3},${x1} L ${x2},${x1} L ${hc},0 L ${x5},${x1} L ${x4},${x1} L ${x4},${y3} L ${x6},${y3} L ${x6},${y2} L ${w},${vc} L ${x6},${y5} L ${x6},${y4} L ${x4},${y4} L ${x4},${y6} L ${x5},${y6} L ${hc},${h} L ${x2},${y6} L ${x3},${y6} L ${x3},${y4} L ${x1},${y4} L ${x1},${y5} z`;
      }
      break
    case 'leftRightUpArrow':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let adj1 = 25000 * RATIO_EMUs_Points;
        let adj2 = 25000 * RATIO_EMUs_Points;
        let adj3 = 25000 * RATIO_EMUs_Points;
        const cnstVal1 = 50000 * RATIO_EMUs_Points;
        const cnstVal2 = 100000 * RATIO_EMUs_Points;
        const cnstVal3 = 200000 * RATIO_EMUs_Points;
        if (shapAdjst_ary) {
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              adj1 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            } 
            else if (sAdj_name === 'adj2') {
              adj2 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            } 
            else if (sAdj_name === 'adj3') {
              adj3 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
          }
        }
        const hc = w / 2;
        const minWH = Math.min(w, h);
        const a2 = (adj2 < 0) ? 0 : (adj2 > cnstVal1) ? cnstVal1 : adj2;
        const maxAdj1 = 2 * a2;
        const a1 = (adj1 < 0) ? 0 : (adj1 > maxAdj1) ? maxAdj1 : adj1;
        const q1 = cnstVal2 - maxAdj1;
        const maxAdj3 = q1 / 2;
        const a3 = (adj3 < 0) ? 0 : (adj3 > maxAdj3) ? maxAdj3 : adj3;
        const x1 = minWH * a3 / cnstVal2;
        const dx2 = minWH * a2 / cnstVal2;
        const x2 = hc - dx2;
        const x5 = hc + dx2;
        const dx3 = minWH * a1 / cnstVal3;
        const x3 = hc - dx3;
        const x4 = hc + dx3;
        const x6 = w - x1;
        const dy2 = minWH * a2 / cnstVal1;
        const y2 = h - dy2;
        const y4 = h - dx2;
        const y3 = y4 - dx3;
        const y5 = y4 + dx3;
        pathData = `M 0,${y4} L ${x1},${y2} L ${x1},${y3} L ${x3},${y3} L ${x3},${x1} L ${x2},${x1} L ${hc},0 L ${x5},${x1} L ${x4},${x1} L ${x4},${y3} L ${x6},${y3} L ${x6},${y2} L ${w},${y4} L ${x6},${h} L ${x6},${y5} L ${x1},${y5} L ${x1},${h} z`;
      }
      break
    case 'leftUpArrow':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let adj1 = 25000 * RATIO_EMUs_Points;
        let adj2 = 25000 * RATIO_EMUs_Points;
        let adj3 = 25000 * RATIO_EMUs_Points;
        const cnstVal1 = 50000 * RATIO_EMUs_Points;
        const cnstVal2 = 100000 * RATIO_EMUs_Points;
        const cnstVal3 = 200000 * RATIO_EMUs_Points;
        if (shapAdjst_ary) {
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              adj1 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            } 
            else if (sAdj_name === 'adj2') {
              adj2 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            } 
            else if (sAdj_name === 'adj3') {
              adj3 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
          }
        }
        const minWH = Math.min(w, h);
        const a2 = (adj2 < 0) ? 0 : (adj2 > cnstVal1) ? cnstVal1 : adj2;
        const maxAdj1 = 2 * a2;
        const a1 = (adj1 < 0) ? 0 : (adj1 > maxAdj1) ? maxAdj1 : adj1;
        const maxAdj3 = cnstVal2 - maxAdj1;
        const a3 = (adj3 < 0) ? 0 : (adj3 > maxAdj3) ? maxAdj3 : adj3;
        const x1 = minWH * a3 / cnstVal2;
        const dx2 = minWH * a2 / cnstVal1;
        const x2 = w - dx2;
        const y2 = h - dx2;
        const dx4 = minWH * a2 / cnstVal2;
        const x4 = w - dx4;
        const y4 = h - dx4;
        const dx3 = minWH * a1 / cnstVal3;
        const x3 = x4 - dx3;
        const x5 = x4 + dx3;
        const y3 = y4 - dx3;
        const y5 = y4 + dx3;
        pathData = `M 0,${y4} L ${x1},${y2} L ${x1},${y3} L ${x3},${y3} L ${x3},${x1} L ${x2},${x1} L ${x4},0 L ${w},${x1} L ${x5},${x1} L ${x5},${y5} L ${x1},${y5} L ${x1},${h} z`;
      }
      break
    case 'bentUpArrow':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let adj1 = 25000 * RATIO_EMUs_Points;
        let adj2 = 25000 * RATIO_EMUs_Points;
        let adj3 = 25000 * RATIO_EMUs_Points;
        const cnstVal1 = 50000 * RATIO_EMUs_Points;
        const cnstVal2 = 100000 * RATIO_EMUs_Points;
        const cnstVal3 = 200000 * RATIO_EMUs_Points;
        if (shapAdjst_ary) {
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              adj1 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            } 
            else if (sAdj_name === 'adj2') {
              adj2 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            } 
            else if (sAdj_name === 'adj3') {
              adj3 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
          }
        }
        const minWH = Math.min(w, h);
        const a1 = (adj1 < 0) ? 0 : (adj1 > cnstVal1) ? cnstVal1 : adj1;
        const a2 = (adj2 < 0) ? 0 : (adj2 > cnstVal1) ? cnstVal1 : adj2;
        const a3 = (adj3 < 0) ? 0 : (adj3 > cnstVal1) ? cnstVal1 : adj3;
        const y1 = minWH * a3 / cnstVal2;
        const dx1 = minWH * a2 / cnstVal1;
        const x1 = w - dx1;
        const dx3 = minWH * a2 / cnstVal2;
        const x3 = w - dx3;
        const dx2 = minWH * a1 / cnstVal3;
        const x2 = x3 - dx2;
        const x4 = x3 + dx2;
        const dy2 = minWH * a1 / cnstVal2;
        const y2 = h - dy2;
        pathData = `M 0,${y2} L ${x2},${y2} L ${x2},${y1} L ${x1},${y1} L ${x3},0 L ${w},${y1} L ${x4},${y1} L ${x4},${h} L 0,${h} z`;
      }
      break
    case 'bentArrow':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let adj1 = 25000 * RATIO_EMUs_Points;
        let adj2 = 25000 * RATIO_EMUs_Points;
        let adj3 = 25000 * RATIO_EMUs_Points;
        let adj4 = 43750 * RATIO_EMUs_Points;
        const cnstVal1 = 50000 * RATIO_EMUs_Points;
        const cnstVal2 = 100000 * RATIO_EMUs_Points;
        if (shapAdjst_ary) {
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              adj1 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            } 
            else if (sAdj_name === 'adj2') {
              adj2 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            } 
            else if (sAdj_name === 'adj3') {
              adj3 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            } 
            else if (sAdj_name === 'adj4') {
              adj4 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
          }
        }
        const minWH = Math.min(w, h);
        const a2 = (adj2 < 0) ? 0 : (adj2 > cnstVal1) ? cnstVal1 : adj2;
        const maxAdj1 = 2 * a2;
        const a1 = (adj1 < 0) ? 0 : (adj1 > maxAdj1) ? maxAdj1 : adj1;
        const a3 = (adj3 < 0) ? 0 : (adj3 > cnstVal1) ? cnstVal1 : adj3;
        const th = minWH * a1 / cnstVal2;
        const aw2 = minWH * a2 / cnstVal2;
        const th2 = th / 2;
        const dh2 = aw2 - th2;
        const ah = minWH * a3 / cnstVal2;
        const bw = w - ah;
        const bh = h - dh2;
        const bs = (bw < bh) ? bw : bh;
        const maxAdj4 = cnstVal2 * bs / minWH;
        const a4 = (adj4 < 0) ? 0 : (adj4 > maxAdj4) ? maxAdj4 : adj4;
        const bd = minWH * a4 / cnstVal2;
        const bd3 = bd - th;
        const bd2 = (bd3 > 0) ? bd3 : 0;
        const x3 = th + bd2;
        const x4 = w - ah;
        const y3 = dh2 + th;
        const y4 = y3 + dh2;
        const y5 = dh2 + bd;
        const y6 = y3 + bd2;
        pathData = `M 0,${h} L 0,${y5} ${shapeArc(bd, y5, bd, bd, 180, 270, false).replace('M', 'L')} L ${x4},${dh2} L ${x4},0 L ${w},${aw2} L ${x4},${y4} L ${x4},${y3} L ${x3},${y3} ${shapeArc(x3, y6, bd2, bd2, 270, 180, false).replace('M', 'L')} L ${th},${h} z`;
      }
      break
    case 'uturnArrow':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let adj1 = 25000 * RATIO_EMUs_Points;
        let adj2 = 25000 * RATIO_EMUs_Points;
        let adj3 = 25000 * RATIO_EMUs_Points;
        let adj4 = 43750 * RATIO_EMUs_Points;
        let adj5 = 75000 * RATIO_EMUs_Points;
        const cnstVal1 = 25000 * RATIO_EMUs_Points;
        const cnstVal2 = 100000 * RATIO_EMUs_Points;
        if (shapAdjst_ary) {
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              adj1 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
            else if (sAdj_name === 'adj2') {
              adj2 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
            else if (sAdj_name === 'adj3') {
              adj3 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
            else if (sAdj_name === 'adj4') {
              adj4 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
            else if (sAdj_name === 'adj5') {
              adj5 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
          }
        }
        const minWH = Math.min(w, h);
        const a2 = (adj2 < 0) ? 0 : (adj2 > cnstVal1) ? cnstVal1 : adj2;
        const maxAdj1 = 2 * a2;
        const a1 = (adj1 < 0) ? 0 : (adj1 > maxAdj1) ? maxAdj1 : adj1;
        const q2 = a1 * minWH / h;
        const q3 = cnstVal2 - q2;
        const maxAdj3 = q3 * h / minWH;
        const a3 = (adj3 < 0) ? 0 : (adj3 > maxAdj3) ? maxAdj3 : adj3;
        const q1 = a3 + a1;
        const minAdj5 = q1 * minWH / h;
        const a5 = (adj5 < minAdj5) ? minAdj5 : (adj5 > cnstVal2) ? cnstVal2 : adj5;
        const th = minWH * a1 / cnstVal2;
        const aw2 = minWH * a2 / cnstVal2;
        const th2 = th / 2;
        const dh2 = aw2 - th2;
        const y5 = h * a5 / cnstVal2;
        const ah = minWH * a3 / cnstVal2;
        const y4 = y5 - ah;
        const x9 = w - dh2;
        const bw = x9 / 2;
        const bs = (bw < y4) ? bw : y4;
        const maxAdj4 = cnstVal2 * bs / minWH;
        const a4 = (adj4 < 0) ? 0 : (adj4 > maxAdj4) ? maxAdj4 : adj4;
        const bd = minWH * a4 / cnstVal2;
        const bd3 = bd - th;
        const bd2 = (bd3 > 0) ? bd3 : 0;
        const x3 = th + bd2;
        const x8 = w - aw2;
        const x6 = x8 - aw2;
        const x7 = x6 + dh2;
        const x4 = x9 - bd;
        const x5 = x7 - bd2;
        pathData = `M 0,${h} L 0,${bd} ${shapeArc(bd, bd, bd, bd, 180, 270, false).replace('M', 'L')} L ${x4},0 ${shapeArc(x4, bd, bd, bd, 270, 360, false).replace('M', 'L')} L ${x9},${y4} L ${w},${y4} L ${x8},${y5} L ${x6},${y4} L ${x7},${y4} L ${x7},${x3} ${shapeArc(x5, x3, bd2, bd2, 0, -90, false).replace('M', 'L')} L ${x3},${th} ${shapeArc(x3, x3, bd2, bd2, 270, 180, false).replace('M', 'L')} L ${th},${h} z`;
      }
      break
    case 'stripedRightArrow':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let adj1 = 50000 * RATIO_EMUs_Points;
        let adj2 = 50000 * RATIO_EMUs_Points;
        const cnstVal1 = 100000 * RATIO_EMUs_Points;
        const cnstVal2 = 200000 * RATIO_EMUs_Points;
        const cnstVal3 = 84375 * RATIO_EMUs_Points;
        if (shapAdjst_ary) {
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              adj1 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            } 
            else if (sAdj_name === 'adj2') {
              adj2 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
          }
        }
        const vc = h / 2;
        const minWH = Math.min(w, h);
        const maxAdj2 = cnstVal3 * w / minWH;
        const a1 = (adj1 < 0) ? 0 : (adj1 > cnstVal1) ? cnstVal1 : adj1;
        const a2 = (adj2 < 0) ? 0 : (adj2 > maxAdj2) ? maxAdj2 : adj2;
        const x4 = minWH * 5 / 32;
        const dx5 = minWH * a2 / cnstVal1;
        const x5 = w - dx5;
        const dy1 = h * a1 / cnstVal2;
        const y1 = vc - dy1;
        const y2 = vc + dy1;
        const ssd8 = minWH / 8,
          ssd16 = minWH / 16,
          ssd32 = minWH / 32;
        pathData = `M 0,${y1} L ${ssd32},${y1} L ${ssd32},${y2} L 0,${y2} z M ${ssd16},${y1} L ${ssd8},${y1} L ${ssd8},${y2} L ${ssd16},${y2} z M ${x4},${y1} L ${x5},${y1} L ${x5},0 L ${w},${vc} L ${x5},${h} L ${x5},${y2} L ${x4},${y2} z`;
      }
      break
    case 'notchedRightArrow':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let adj1 = 50000 * RATIO_EMUs_Points;
        let adj2 = 50000 * RATIO_EMUs_Points;
        const cnstVal1 = 100000 * RATIO_EMUs_Points;
        const cnstVal2 = 200000 * RATIO_EMUs_Points;
        if (shapAdjst_ary) {
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              adj1 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            } 
            else if (sAdj_name === 'adj2') {
              adj2 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
          }
        }
        const vc = h / 2,
          hd2 = vc;
        const minWH = Math.min(w, h);
        const maxAdj2 = cnstVal1 * w / minWH;
        const a1 = (adj1 < 0) ? 0 : (adj1 > cnstVal1) ? cnstVal1 : adj1;
        const a2 = (adj2 < 0) ? 0 : (adj2 > maxAdj2) ? maxAdj2 : adj2;
        const dx2 = minWH * a2 / cnstVal1;
        const x2 = w - dx2;
        const dy1 = h * a1 / cnstVal2;
        const y1 = vc - dy1;
        const y2 = vc + dy1;
        const x1 = dy1 * dx2 / hd2;
        pathData = `M 0,${y1} L ${x2},${y1} L ${x2},0 L ${w},${vc} L ${x2},${h} L ${x2},${y2} L 0,${y2} L ${x1},${vc} z`;
      }
      break
    case 'homePlate':
      {
        const shapAdjst = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd', 'attrs', 'fmla']);
        let adj = 50000 * RATIO_EMUs_Points;
        const cnstVal1 = 100000 * RATIO_EMUs_Points;
        if (shapAdjst) {
          adj = parseInt(shapAdjst.substring(4)) * RATIO_EMUs_Points;
        }
        const vc = h / 2;
        const minWH = Math.min(w, h);
        const maxAdj = cnstVal1 * w / minWH;
        const a = (adj < 0) ? 0 : (adj > maxAdj) ? maxAdj : adj;
        const dx1 = minWH * a / cnstVal1;
        const x1 = w - dx1;
        pathData = `M 0,0 L ${x1},0 L ${w},${vc} L ${x1},${h} L 0,${h} z`;
      }
      break
    case 'chevron':
      {
        const shapAdjst = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd', 'attrs', 'fmla']);
        let adj = 50000 * RATIO_EMUs_Points;
        const cnstVal1 = 100000 * RATIO_EMUs_Points;
        if (shapAdjst) {
          adj = parseInt(shapAdjst.substring(4)) * RATIO_EMUs_Points;
        }
        const vc = h / 2;
        const minWH = Math.min(w, h);
        const maxAdj = cnstVal1 * w / minWH;
        const a = (adj < 0) ? 0 : (adj > maxAdj) ? maxAdj : adj;
        const x1 = minWH * a / cnstVal1;
        const x2 = w - x1;
        pathData = `M 0,0 L ${x2},0 L ${w},${vc} L ${x2},${h} L 0,${h} L ${x1},${vc} z`;
      }
      break
    case 'rightArrowCallout':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let adj1 = 25000 * RATIO_EMUs_Points;
        let adj2 = 25000 * RATIO_EMUs_Points;
        let adj3 = 25000 * RATIO_EMUs_Points;
        let adj4 = 64977 * RATIO_EMUs_Points;
        const cnstVal1 = 50000 * RATIO_EMUs_Points;
        const cnstVal2 = 100000 * RATIO_EMUs_Points;
        const cnstVal3 = 200000 * RATIO_EMUs_Points;
        if (shapAdjst_ary) {
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              adj1 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
            else if (sAdj_name === 'adj2') {
              adj2 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
            else if (sAdj_name === 'adj3') {
              adj3 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
            else if (sAdj_name === 'adj4') {
              adj4 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
          }
        }
        const vc = h / 2,
          r = w,
          b = h,
          l = 0,
          t = 0;
        const ss = Math.min(w, h);
        const maxAdj2 = cnstVal1 * h / ss;
        const a2 = (adj2 < 0) ? 0 : (adj2 > maxAdj2) ? maxAdj2 : adj2;
        const maxAdj1 = a2 * 2;
        const a1 = (adj1 < 0) ? 0 : (adj1 > maxAdj1) ? maxAdj1 : adj1;
        const maxAdj3 = cnstVal2 * w / ss;
        const a3 = (adj3 < 0) ? 0 : (adj3 > maxAdj3) ? maxAdj3 : adj3;
        const q2 = a3 * ss / w;
        const maxAdj4 = cnstVal2 - q2;
        const a4 = (adj4 < 0) ? 0 : (adj4 > maxAdj4) ? maxAdj4 : adj4;
        const dy1 = ss * a2 / cnstVal2;
        const dy2 = ss * a1 / cnstVal3;
        const y1 = vc - dy1;
        const y2 = vc - dy2;
        const y3 = vc + dy2;
        const y4 = vc + dy1;
        const dx3 = ss * a3 / cnstVal2;
        const x3 = r - dx3;
        const x2 = w * a4 / cnstVal2;
        pathData = `M ${l},${t} L ${x2},${t} L ${x2},${y2} L ${x3},${y2} L ${x3},${y1} L ${r},${vc} L ${x3},${y4} L ${x3},${y3} L ${x2},${y3} L ${x2},${b} L ${l},${b} z`;
      }
      break
    case 'downArrowCallout':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let adj1 = 25000 * RATIO_EMUs_Points;
        let adj2 = 25000 * RATIO_EMUs_Points;
        let adj3 = 25000 * RATIO_EMUs_Points;
        let adj4 = 64977 * RATIO_EMUs_Points;
        const cnstVal1 = 50000 * RATIO_EMUs_Points;
        const cnstVal2 = 100000 * RATIO_EMUs_Points;
        const cnstVal3 = 200000 * RATIO_EMUs_Points;
        if (shapAdjst_ary) {
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              adj1 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
            else if (sAdj_name === 'adj2') {
              adj2 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
            else if (sAdj_name === 'adj3') {
              adj3 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
            else if (sAdj_name === 'adj4') {
              adj4 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
          }
        }
        const hc = w / 2,
          r = w,
          b = h,
          l = 0,
          t = 0;
        const ss = Math.min(w, h);
        const maxAdj2 = cnstVal1 * w / ss;
        const a2 = (adj2 < 0) ? 0 : (adj2 > maxAdj2) ? maxAdj2 : adj2;
        const maxAdj1 = a2 * 2;
        const a1 = (adj1 < 0) ? 0 : (adj1 > maxAdj1) ? maxAdj1 : adj1;
        const maxAdj3 = cnstVal2 * h / ss;
        const a3 = (adj3 < 0) ? 0 : (adj3 > maxAdj3) ? maxAdj3 : adj3;
        const q2 = a3 * ss / h;
        const maxAdj4 = cnstVal2 - q2;
        const a4 = (adj4 < 0) ? 0 : (adj4 > maxAdj4) ? maxAdj4 : adj4;
        const dx1 = ss * a2 / cnstVal2;
        const dx2 = ss * a1 / cnstVal3;
        const x1 = hc - dx1;
        const x2 = hc - dx2;
        const x3 = hc + dx2;
        const x4 = hc + dx1;
        const dy3 = ss * a3 / cnstVal2;
        const y3 = b - dy3;
        const y2 = h * a4 / cnstVal2;
        pathData = `M ${l},${t} L ${r},${t} L ${r},${y2} L ${x3},${y2} L ${x3},${y3} L ${x4},${y3} L ${hc},${b} L ${x1},${y3} L ${x2},${y3} L ${x2},${y2} L ${l},${y2} z`;
      }
      break
    case 'leftArrowCallout':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let adj1 = 25000 * RATIO_EMUs_Points;
        let adj2 = 25000 * RATIO_EMUs_Points;
        let adj3 = 25000 * RATIO_EMUs_Points;
        let adj4 = 64977 * RATIO_EMUs_Points;
        const cnstVal1 = 50000 * RATIO_EMUs_Points;
        const cnstVal2 = 100000 * RATIO_EMUs_Points;
        const cnstVal3 = 200000 * RATIO_EMUs_Points;
        if (shapAdjst_ary) {
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              adj1 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
            else if (sAdj_name === 'adj2') {
              adj2 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
            else if (sAdj_name === 'adj3') {
              adj3 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
            else if (sAdj_name === 'adj4') {
              adj4 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
          }
        }
        const vc = h / 2,
          r = w,
          b = h,
          l = 0,
          t = 0;
        const ss = Math.min(w, h);
        const maxAdj2 = cnstVal1 * h / ss;
        const a2 = (adj2 < 0) ? 0 : (adj2 > maxAdj2) ? maxAdj2 : adj2;
        const maxAdj1 = a2 * 2;
        const a1 = (adj1 < 0) ? 0 : (adj1 > maxAdj1) ? maxAdj1 : adj1;
        const maxAdj3 = cnstVal2 * w / ss;
        const a3 = (adj3 < 0) ? 0 : (adj3 > maxAdj3) ? maxAdj3 : adj3;
        const q2 = a3 * ss / w;
        const maxAdj4 = cnstVal2 - q2;
        const a4 = (adj4 < 0) ? 0 : (adj4 > maxAdj4) ? maxAdj4 : adj4;
        const dy1 = ss * a2 / cnstVal2;
        const dy2 = ss * a1 / cnstVal3;
        const y1 = vc - dy1;
        const y2 = vc - dy2;
        const y3 = vc + dy2;
        const y4 = vc + dy1;
        const x1 = ss * a3 / cnstVal2;
        const dx2 = w * a4 / cnstVal2;
        const x2 = r - dx2;
        pathData = `M ${l},${vc} L ${x1},${y1} L ${x1},${y2} L ${x2},${y2} L ${x2},${t} L ${r},${t} L ${r},${b} L ${x2},${b} L ${x2},${y3} L ${x1},${y3} L ${x1},${y4} z`;
      }
      break
    case 'upArrowCallout':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let adj1 = 25000 * RATIO_EMUs_Points;
        let adj2 = 25000 * RATIO_EMUs_Points;
        let adj3 = 25000 * RATIO_EMUs_Points;
        let adj4 = 64977 * RATIO_EMUs_Points;
        const cnstVal1 = 50000 * RATIO_EMUs_Points;
        const cnstVal2 = 100000 * RATIO_EMUs_Points;
        const cnstVal3 = 200000 * RATIO_EMUs_Points;
        if (shapAdjst_ary) {
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              adj1 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
            else if (sAdj_name === 'adj2') {
              adj2 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
            else if (sAdj_name === 'adj3') {
              adj3 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
            else if (sAdj_name === 'adj4') {
              adj4 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
          }
        }
        const hc = w / 2,
          r = w,
          b = h,
          l = 0,
          t = 0;
        const ss = Math.min(w, h);
        const maxAdj2 = cnstVal1 * w / ss;
        const a2 = (adj2 < 0) ? 0 : (adj2 > maxAdj2) ? maxAdj2 : adj2;
        const maxAdj1 = a2 * 2;
        const a1 = (adj1 < 0) ? 0 : (adj1 > maxAdj1) ? maxAdj1 : adj1;
        const maxAdj3 = cnstVal2 * h / ss;
        const a3 = (adj3 < 0) ? 0 : (adj3 > maxAdj3) ? maxAdj3 : adj3;
        const q2 = a3 * ss / h;
        const maxAdj4 = cnstVal2 - q2;
        const a4 = (adj4 < 0) ? 0 : (adj4 > maxAdj4) ? maxAdj4 : adj4;
        const dx1 = ss * a2 / cnstVal2;
        const dx2 = ss * a1 / cnstVal3;
        const x1 = hc - dx1;
        const x2 = hc - dx2;
        const x3 = hc + dx2;
        const x4 = hc + dx1;
        const y1 = ss * a3 / cnstVal2;
        const dy2 = h * a4 / cnstVal2;
        const y2 = b - dy2;
        pathData = `M ${l},${y2} L ${x2},${y2} L ${x2},${y1} L ${x1},${y1} L ${hc},${t} L ${x4},${y1} L ${x3},${y1} L ${x3},${y2} L ${r},${y2} L ${r},${b} L ${l},${b} z`;
      }
      break
    case 'leftRightArrowCallout':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let adj1 = 25000 * RATIO_EMUs_Points;
        let adj2 = 25000 * RATIO_EMUs_Points;
        let adj3 = 25000 * RATIO_EMUs_Points;
        let adj4 = 48123 * RATIO_EMUs_Points;
        const cnstVal1 = 50000 * RATIO_EMUs_Points;
        const cnstVal2 = 100000 * RATIO_EMUs_Points;
        const cnstVal3 = 200000 * RATIO_EMUs_Points;
        if (shapAdjst_ary) {
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              adj1 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
            else if (sAdj_name === 'adj2') {
              adj2 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
            else if (sAdj_name === 'adj3') {
              adj3 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
            else if (sAdj_name === 'adj4') {
              adj4 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
          }
        }
        const vc = h / 2,
          hc = w / 2,
          r = w,
          b = h,
          l = 0,
          t = 0;
        const ss = Math.min(w, h);
        const maxAdj2 = cnstVal1 * h / ss;
        const a2 = (adj2 < 0) ? 0 : (adj2 > maxAdj2) ? maxAdj2 : adj2;
        const maxAdj1 = a2 * 2;
        const a1 = (adj1 < 0) ? 0 : (adj1 > maxAdj1) ? maxAdj1 : adj1;
        const maxAdj3 = cnstVal1 * w / ss;
        const a3 = (adj3 < 0) ? 0 : (adj3 > maxAdj3) ? maxAdj3 : adj3;
        const q2 = a3 * ss / (w / 2);
        const maxAdj4 = cnstVal2 - q2;
        const a4 = (adj4 < 0) ? 0 : (adj4 > maxAdj4) ? maxAdj4 : adj4;
        const dy1 = ss * a2 / cnstVal2;
        const dy2 = ss * a1 / cnstVal3;
        const y1 = vc - dy1;
        const y2 = vc - dy2;
        const y3 = vc + dy2;
        const y4 = vc + dy1;
        const x1 = ss * a3 / cnstVal2;
        const x4 = r - x1;
        const dx2 = w * a4 / cnstVal3;
        const x2 = hc - dx2;
        const x3 = hc + dx2;
        pathData = `M ${l},${vc} L ${x1},${y1} L ${x1},${y2} L ${x2},${y2} L ${x2},${t} L ${x3},${t} L ${x3},${y2} L ${x4},${y2} L ${x4},${y1} L ${r},${vc} L ${x4},${y4} L ${x4},${y3} L ${x3},${y3} L ${x3},${b} L ${x2},${b} L ${x2},${y3} L ${x1},${y3} L ${x1},${y4} z`;
      }
      break
    case 'quadArrowCallout':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let adj1 = 18515 * RATIO_EMUs_Points;
        let adj2 = 18515 * RATIO_EMUs_Points;
        let adj3 = 18515 * RATIO_EMUs_Points;
        let adj4 = 48123 * RATIO_EMUs_Points;
        const cnstVal1 = 50000 * RATIO_EMUs_Points;
        const cnstVal2 = 100000 * RATIO_EMUs_Points;
        const cnstVal3 = 200000 * RATIO_EMUs_Points;
        if (shapAdjst_ary) {
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              adj1 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
            else if (sAdj_name === 'adj2') {
              adj2 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
            else if (sAdj_name === 'adj3') {
              adj3 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
            else if (sAdj_name === 'adj4') {
              adj4 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
          }
        }
        const vc = h / 2,
          hc = w / 2,
          r = w,
          b = h,
          l = 0,
          t = 0;
        const ss = Math.min(w, h);
        const a2 = (adj2 < 0) ? 0 : (adj2 > cnstVal1) ? cnstVal1 : adj2;
        const maxAdj1 = a2 * 2;
        const a1 = (adj1 < 0) ? 0 : (adj1 > maxAdj1) ? maxAdj1 : adj1;
        const maxAdj3 = cnstVal1 - a2;
        const a3 = (adj3 < 0) ? 0 : (adj3 > maxAdj3) ? maxAdj3 : adj3;
        const q2 = a3 * 2;
        const maxAdj4 = cnstVal2 - q2;
        const a4 = (adj4 < a1) ? a1 : (adj4 > maxAdj4) ? maxAdj4 : adj4;
        const dx2 = ss * a2 / cnstVal2;
        const dx3 = ss * a1 / cnstVal3;
        const ah = ss * a3 / cnstVal2;
        const dx1 = w * a4 / cnstVal3;
        const dy1 = h * a4 / cnstVal3;
        const x8 = r - ah;
        const x2 = hc - dx1;
        const x7 = hc + dx1;
        const x3 = hc - dx2;
        const x6 = hc + dx2;
        const x4 = hc - dx3;
        const x5 = hc + dx3;
        const y8 = b - ah;
        const y2 = vc - dy1;
        const y7 = vc + dy1;
        const y3 = vc - dx2;
        const y6 = vc + dx2;
        const y4 = vc - dx3;
        const y5 = vc + dx3;
        pathData = `M ${l},${vc} L ${ah},${y3} L ${ah},${y4} L ${x2},${y4} L ${x2},${y2} L ${x4},${y2} L ${x4},${ah} L ${x3},${ah} L ${hc},${t} L ${x6},${ah} L ${x5},${ah} L ${x5},${y2} L ${x7},${y2} L ${x7},${y4} L ${x8},${y4} L ${x8},${y3} L ${r},${vc} L ${x8},${y6} L ${x8},${y5} L ${x7},${y5} L ${x7},${y7} L ${x5},${y7} L ${x5},${y8} L ${x6},${y8} L ${hc},${b} L ${x3},${y8} L ${x4},${y8} L ${x4},${y7} L ${x2},${y7} L ${x2},${y5} L ${ah},${y5} L ${ah},${y6} z`;
      }
      break
    case 'curvedDownArrow':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let adj1 = 25000 * RATIO_EMUs_Points;
        let adj2 = 50000 * RATIO_EMUs_Points;
        let adj3 = 25000 * RATIO_EMUs_Points;
        const cnstVal1 = 50000 * RATIO_EMUs_Points;
        const cnstVal2 = 100000 * RATIO_EMUs_Points;
        if (shapAdjst_ary) {
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              adj1 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
            else if (sAdj_name === 'adj2') {
              adj2 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
            else if (sAdj_name === 'adj3') {
              adj3 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
          }
        }
        const wd2 = w / 2,
          r = w,
          b = h,
          t = 0,
          c3d4 = 270,
          cd2 = 180,
          cd4 = 90;
        const ss = Math.min(w, h);
        const maxAdj2 = cnstVal1 * w / ss;
        const a2 = (adj2 < 0) ? 0 : (adj2 > maxAdj2) ? maxAdj2 : adj2;
        const a1 = (adj1 < 0) ? 0 : (adj1 > cnstVal2) ? cnstVal2 : adj1;
        const th = ss * a1 / cnstVal2;
        const aw = ss * a2 / cnstVal2;
        const q1 = (th + aw) / 4;
        const wR = wd2 - q1;
        const q7 = wR * 2;
        const q11 = Math.sqrt(q7 * q7 - th * th);
        const idy = q11 * h / q7;
        const maxAdj3 = cnstVal2 * idy / ss;
        const a3 = (adj3 < 0) ? 0 : (adj3 > maxAdj3) ? maxAdj3 : adj3;
        const ah = ss * a3 / cnstVal2;
        const x3 = wR + th;
        const q5 = Math.sqrt(h * h - ah * ah);
        const dx = q5 * wR / h;
        const x5 = wR + dx;
        const x7 = x3 + dx;
        const dh = (aw - th) / 2;
        const x4 = x5 - dh;
        const x8 = x7 + dh;
        const x6 = r - (aw / 2);
        const y1 = b - ah;
        const swAng = Math.atan(dx / ah);
        const swAngDeg = swAng * 180 / Math.PI;
        const mswAng = -swAngDeg;
        const dang2 = Math.atan((th / 2) / idy);
        const dang2Deg = dang2 * 180 / Math.PI;
        const stAng = c3d4 + swAngDeg;
        const stAng2 = c3d4 - dang2Deg;
        const swAng2 = dang2Deg - cd4;
        const swAng3 = cd4 + dang2Deg;
        pathData = `M ${x6},${b} L ${x4},${y1} L ${x5},${y1} ${shapeArc(wR, h, wR, h, stAng, (stAng + mswAng), false).replace('M', 'L')} L ${x3},${t} ${shapeArc(x3, h, wR, h, c3d4, (c3d4 + swAngDeg), false).replace('M', 'L')} L ${x5 + th},${y1} L ${x8},${y1} z M ${x3},${t} ${shapeArc(x3, h, wR, h, stAng2, (stAng2 + swAng2), false).replace('M', 'L')} ${shapeArc(wR, h, wR, h, cd2, (cd2 + swAng3), false).replace('M', 'L')}`;
      }
      break
    case 'curvedLeftArrow':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let adj1 = 25000 * RATIO_EMUs_Points;
        let adj2 = 50000 * RATIO_EMUs_Points;
        let adj3 = 25000 * RATIO_EMUs_Points;
        const cnstVal1 = 50000 * RATIO_EMUs_Points;
        const cnstVal2 = 100000 * RATIO_EMUs_Points;
        if (shapAdjst_ary) {
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              adj1 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
            else if (sAdj_name === 'adj2') {
              adj2 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
            else if (sAdj_name === 'adj3') {
              adj3 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
          }
        }
        const hd2 = h / 2,
          r = w,
          b = h,
          l = 0,
          t = 0,
          c3d4 = 270,
          cd4 = 90;
        const ss = Math.min(w, h);
        const maxAdj2 = cnstVal1 * h / ss;
        const a2 = (adj2 < 0) ? 0 : (adj2 > maxAdj2) ? maxAdj2 : adj2;
        const a1 = (adj1 < 0) ? 0 : (adj1 > a2) ? a2 : adj1;
        const th = ss * a1 / cnstVal2;
        const aw = ss * a2 / cnstVal2;
        const q1 = (th + aw) / 4;
        const hR = hd2 - q1;
        const q7 = hR * 2;
        const q11 = Math.sqrt(q7 * q7 - th * th);
        const iDx = q11 * w / q7;
        const maxAdj3 = cnstVal2 * iDx / ss;
        const a3 = (adj3 < 0) ? 0 : (adj3 > maxAdj3) ? maxAdj3 : adj3;
        const ah = ss * a3 / cnstVal2;
        const y3 = hR + th;
        const q5 = Math.sqrt(w * w - ah * ah);
        const dy = q5 * hR / w;
        const y5 = hR + dy;
        const y7 = y3 + dy;
        const dh = (aw - th) / 2;
        const y4 = y5 - dh;
        const y8 = y7 + dh;
        const y6 = b - (aw / 2);
        const x1 = l + ah;
        const swAng = Math.atan(dy / ah);
        const dang2 = Math.atan((th / 2) / iDx);
        const swAng2 = dang2 - swAng;
        const swAngDg = swAng * 180 / Math.PI;
        const swAng2Dg = swAng2 * 180 / Math.PI;
        pathData = `M ${r},${y3} ${shapeArc(l, hR, w, hR, 0, -cd4, false).replace('M', 'L')} L ${l},${t} ${shapeArc(l, y3, w, hR, c3d4, (c3d4 + cd4), false).replace('M', 'L')} L ${r},${y3} ${shapeArc(l, y3, w, hR, 0, swAngDg, false).replace('M', 'L')} L ${x1},${y7} L ${x1},${y8} L ${l},${y6} L ${x1},${y4} L ${x1},${y5} ${shapeArc(l, hR, w, hR, swAngDg, (swAngDg + swAng2Dg), false).replace('M', 'L')} ${shapeArc(l, hR, w, hR, 0, -cd4, false).replace('M', 'L')} ${shapeArc(l, y3, w, hR, c3d4, (c3d4 + cd4), false).replace('M', 'L')}`;
      }
      break
    case 'curvedRightArrow':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let adj1 = 25000 * RATIO_EMUs_Points;
        let adj2 = 50000 * RATIO_EMUs_Points;
        let adj3 = 25000 * RATIO_EMUs_Points;
        const cnstVal1 = 50000 * RATIO_EMUs_Points;
        const cnstVal2 = 100000 * RATIO_EMUs_Points;
        if (shapAdjst_ary) {
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              adj1 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
            else if (sAdj_name === 'adj2') {
              adj2 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
            else if (sAdj_name === 'adj3') {
              adj3 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
          }
        }
        const hd2 = h / 2,
          r = w,
          b = h,
          l = 0,
          cd2 = 180,
          cd4 = 90,
          c3d4 = 270;
        const ss = Math.min(w, h);
        const maxAdj2 = cnstVal1 * h / ss;
        const a2 = (adj2 < 0) ? 0 : (adj2 > maxAdj2) ? maxAdj2 : adj2;
        const a1 = (adj1 < 0) ? 0 : (adj1 > a2) ? a2 : adj1;
        const th = ss * a1 / cnstVal2;
        const aw = ss * a2 / cnstVal2;
        const q1 = (th + aw) / 4;
        const hR = hd2 - q1;
        const q7 = hR * 2;
        const q11 = Math.sqrt(q7 * q7 - th * th);
        const iDx = q11 * w / q7;
        const maxAdj3 = cnstVal2 * iDx / ss;
        const a3 = (adj3 < 0) ? 0 : (adj3 > maxAdj3) ? maxAdj3 : adj3;
        const ah = ss * a3 / cnstVal2;
        const y3 = hR + th;
        const q5 = Math.sqrt(w * w - ah * ah);
        const dy = q5 * hR / w;
        const y5 = hR + dy;
        const y7 = y3 + dy;
        const dh = (aw - th) / 2;
        const y4 = y5 - dh;
        const y8 = y7 + dh;
        const y6 = b - (aw / 2);
        const x1 = r - ah;
        const swAng = Math.atan(dy / ah);
        const stAng = Math.PI - swAng;
        const mswAng = -swAng;
        const dang2 = Math.atan((th / 2) / iDx);
        const swAng2 = dang2 - Math.PI / 2;
        const stAngDg = stAng * 180 / Math.PI;
        const mswAngDg = mswAng * 180 / Math.PI;
        const swAngDg = swAng * 180 / Math.PI;
        const swAng2dg = swAng2 * 180 / Math.PI;
        pathData = `M ${l},${hR} ${shapeArc(w, hR, w, hR, cd2, cd2 + mswAngDg, false).replace('M', 'L')} L ${x1},${y5} L ${x1},${y4} L ${r},${y6} L ${x1},${y8} L ${x1},${y7} ${shapeArc(w, y3, w, hR, stAngDg, stAngDg + swAngDg, false).replace('M', 'L')} L ${l},${hR} ${shapeArc(w, hR, w, hR, cd2, cd2 + cd4, false).replace('M', 'L')} L ${r},${th} ${shapeArc(w, y3, w, hR, c3d4, c3d4 + swAng2dg, false).replace('M', 'L')}`;
      }
      break
    case 'curvedUpArrow':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let adj1 = 25000 * RATIO_EMUs_Points;
        let adj2 = 50000 * RATIO_EMUs_Points;
        let adj3 = 25000 * RATIO_EMUs_Points;
        const cnstVal1 = 50000 * RATIO_EMUs_Points;
        const cnstVal2 = 100000 * RATIO_EMUs_Points;
        if (shapAdjst_ary) {
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              adj1 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
            else if (sAdj_name === 'adj2') {
              adj2 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
            else if (sAdj_name === 'adj3') {
              adj3 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
          }
        }
        const wd2 = w / 2,
          r = w,
          b = h,
          t = 0,
          cd2 = 180,
          cd4 = 90;
        const ss = Math.min(w, h);
        const maxAdj2 = cnstVal1 * w / ss;
        const a2 = (adj2 < 0) ? 0 : (adj2 > maxAdj2) ? maxAdj2 : adj2;
        const a1 = (adj1 < 0) ? 0 : (adj1 > cnstVal2) ? cnstVal2 : adj1;
        const th = ss * a1 / cnstVal2;
        const aw = ss * a2 / cnstVal2;
        const q1 = (th + aw) / 4;
        const wR = wd2 - q1;
        const q7 = wR * 2;
        const q11 = Math.sqrt(q7 * q7 - th * th);
        const idy = q11 * h / q7;
        const maxAdj3 = cnstVal2 * idy / ss;
        const a3 = (adj3 < 0) ? 0 : (adj3 > maxAdj3) ? maxAdj3 : adj3;
        const ah = ss * a3 / cnstVal2;
        const x3 = wR + th;
        const q5 = Math.sqrt(h * h - ah * ah);
        const dx = q5 * wR / h;
        const x5 = wR + dx;
        const x7 = x3 + dx;
        const dh = (aw - th) / 2;
        const x4 = x5 - dh;
        const x8 = x7 + dh;
        const x6 = r - (aw / 2);
        const y1 = t + ah;
        const swAng = Math.atan(dx / ah);
        const dang2 = Math.atan((th / 2) / idy);
        const swAng2 = dang2 - swAng;
        const stAng3 = Math.PI / 2 - swAng;
        const stAng2 = Math.PI / 2 - dang2;
        const stAng2dg = stAng2 * 180 / Math.PI;
        const swAng2dg = swAng2 * 180 / Math.PI;
        const stAng3dg = stAng3 * 180 / Math.PI;
        const swAngDg = swAng * 180 / Math.PI;
        pathData = `${shapeArc(wR, 0, wR, h, stAng2dg, stAng2dg + swAng2dg, false)} L ${x5},${y1} L ${x4},${y1} L ${x6},${t} L ${x8},${y1} L ${x7},${y1} ${shapeArc(x3, 0, wR, h, stAng3dg, stAng3dg + swAngDg, false).replace('M', 'L')} L ${wR},${b} ${shapeArc(wR, 0, wR, h, cd4, cd2, false).replace('M', 'L')} L ${th},${t} ${shapeArc(x3, 0, wR, h, cd2, cd4, false).replace('M', 'L')}`;
      }
      break
    case 'mathDivide':
    case 'mathEqual':
    case 'mathMinus':
    case 'mathMultiply':
    case 'mathNotEqual':
    case 'mathPlus':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let adj1, adj2, adj3;
        if (shapAdjst_ary) {
          if (Array.isArray(shapAdjst_ary)) {
            for (const adj of shapAdjst_ary) {
              const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
              if (sAdj_name === 'adj1') {
                adj1 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4));
              }
              else if (sAdj_name === 'adj2') {
                adj2 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4));
              }
              else if (sAdj_name === 'adj3') {
                adj3 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4));
              }
            }
          } 
          else {
            adj1 = parseInt(getTextByPathList(shapAdjst_ary, ['attrs', 'fmla']).substring(4));
          }
        }
        const cnstVal1 = 50000 * RATIO_EMUs_Points;
        const cnstVal2 = 100000 * RATIO_EMUs_Points;
        const cnstVal3 = 200000 * RATIO_EMUs_Points;
        const hc = w / 2,
          vc = h / 2,
          hd2 = h / 2;
        if (shapType === 'mathNotEqual') {
          if (adj1 === undefined) adj1 = 23520;
          if (adj2 === undefined) adj2 = 110 * 60000;
          if (adj3 === undefined) adj3 = 11760;
          adj1 *= RATIO_EMUs_Points;
          adj2 = (adj2 / 60000) * Math.PI / 180;
          adj3 *= RATIO_EMUs_Points;
          const angVal1 = 70 * Math.PI / 180,
            angVal2 = 110 * Math.PI / 180;
          const cnstVal4 = 73490 * RATIO_EMUs_Points;
          const a1 = (adj1 < 0) ? 0 : (adj1 > cnstVal1) ? cnstVal1 : adj1;
          const crAng = (adj2 < angVal1) ? angVal1 : (adj2 > angVal2) ? angVal2 : adj2;
          const maxAdj3 = cnstVal2 - (a1 * 2);
          const a3 = (adj3 < 0) ? 0 : (adj3 > maxAdj3) ? maxAdj3 : adj3;
          const dy1 = h * a1 / cnstVal2;
          const dy2 = h * a3 / cnstVal3;
          const dx1 = w * cnstVal4 / cnstVal3;
          const x1 = hc - dx1;
          const x8 = hc + dx1;
          const y2 = vc - dy2;
          const y3 = vc + dy2;
          const y1 = y2 - dy1;
          const y4 = y3 + dy1;
          const cadj2 = crAng - Math.PI / 2;
          const xadj2 = hd2 * Math.tan(cadj2);
          const len = Math.sqrt(xadj2 * xadj2 + hd2 * hd2);
          const bhw = len * dy1 / hd2;
          const bhw2 = bhw / 2;
          const x7 = hc + xadj2 - bhw2;
          const dx67 = xadj2 * y1 / hd2;
          const x6 = x7 - dx67;
          const dx57 = xadj2 * y2 / hd2;
          const x5 = x7 - dx57;
          const dx47 = xadj2 * y3 / hd2;
          const x4 = x7 - dx47;
          const dx37 = xadj2 * y4 / hd2;
          const x3 = x7 - dx37;
          const rx6 = x6 + bhw;
          const rx5 = x5 + bhw;
          const rx4 = x4 + bhw;
          const rx3 = x3 + bhw;
          const dx7 = dy1 * hd2 / len;
          const rxt = x7 + dx7;
          const lxt = (x7 + bhw) - dx7;
          const rx = (cadj2 > 0) ? rxt : (x7 + bhw);
          const lx = (cadj2 > 0) ? x7 : lxt;
          const dy3 = dy1 * xadj2 / len;
          const ry = (cadj2 > 0) ? dy3 : 0;
          const ly = (cadj2 > 0) ? 0 : -dy3;
          const dlx = w - rx;
          const drx = w - lx;
          const dly = h - ry;
          const dry = h - ly;
          pathData = `M ${x1},${y1} L ${x6},${y1} L ${lx},${ly} L ${rx},${ry} L ${rx6},${y1} L ${x8},${y1} L ${x8},${y2} L ${rx5},${y2} L ${rx4},${y3} L ${x8},${y3} L ${x8},${y4} L ${rx3},${y4} L ${drx},${dry} L ${dlx},${dly} L ${x3},${y4} L ${x1},${y4} L ${x1},${y3} L ${x4},${y3} L ${x5},${y2} L ${x1},${y2} z`;
        } 
        else if (shapType === 'mathDivide') {
          if (adj1 === undefined) adj1 = 23520;
          if (adj2 === undefined) adj2 = 5880;
          if (adj3 === undefined) adj3 = 11760;
          adj1 *= RATIO_EMUs_Points;
          adj2 *= RATIO_EMUs_Points;
          adj3 *= RATIO_EMUs_Points;
          const cnstVal4 = 1000 * RATIO_EMUs_Points;
          const cnstVal5 = 36745 * RATIO_EMUs_Points;
          const cnstVal6 = 73490 * RATIO_EMUs_Points;
          const a1 = (adj1 < cnstVal4) ? cnstVal4 : (adj1 > cnstVal5) ? cnstVal5 : adj1;
          const ma3h = (cnstVal6 - a1) / 4;
          const ma3w = cnstVal5 * w / h;
          const maxAdj3 = (ma3h < ma3w) ? ma3h : ma3w;
          const a3 = (adj3 < cnstVal4) ? cnstVal4 : (adj3 > maxAdj3) ? maxAdj3 : adj3;
          const maxAdj2 = cnstVal6 - (4 * a3) - a1;
          const a2 = (adj2 < 0) ? 0 : (adj2 > maxAdj2) ? maxAdj2 : adj2;
          const dy1 = h * a1 / cnstVal3;
          const yg = h * a2 / cnstVal2;
          const rad = h * a3 / cnstVal2;
          const dx1 = w * cnstVal6 / cnstVal3;
          const y3 = vc - dy1;
          const y4 = vc + dy1;
          const y2 = y3 - (yg + rad);
          const y1 = y2 - rad;
          const y5 = h - y1;
          const x1 = hc - dx1;
          const x3 = hc + dx1;
          pathData = `M ${hc},${y1} A ${rad},${rad} 0 1,0 ${hc},${y1 + 2 * rad} A ${rad},${rad} 0 1,0 ${hc},${y1} z M ${hc},${y5} A ${rad},${rad} 0 1,1 ${hc},${y5 - 2 * rad} A ${rad},${rad} 0 1,1 ${hc},${y5} z M ${x1},${y3} L ${x3},${y3} L ${x3},${y4} L ${x1},${y4} z`;
        } 
        else if (shapType === 'mathEqual') {
          if (adj1 === undefined) adj1 = 23520;
          if (adj2 === undefined) adj2 = 11760;
          adj1 *= RATIO_EMUs_Points;
          adj2 *= RATIO_EMUs_Points;
          const cnstVal5 = 36745 * RATIO_EMUs_Points;
          const cnstVal6 = 73490 * RATIO_EMUs_Points;
          const a1 = (adj1 < 0) ? 0 : (adj1 > cnstVal5) ? cnstVal5 : adj1;
          const mAdj2 = cnstVal2 - (a1 * 2);
          const a2 = (adj2 < 0) ? 0 : (adj2 > mAdj2) ? mAdj2 : adj2;
          const dy1 = h * a1 / cnstVal2;
          const dy2 = h * a2 / cnstVal3;
          const dx1 = w * cnstVal6 / cnstVal3;
          const y2 = vc - dy2;
          const y3 = vc + dy2;
          const y1 = y2 - dy1;
          const y4 = y3 + dy1;
          const x1 = hc - dx1;
          const x2 = hc + dx1;
          pathData = `M ${x1},${y1} L ${x2},${y1} L ${x2},${y2} L ${x1},${y2} z M ${x1},${y3} L ${x2},${y3} L ${x2},${y4} L ${x1},${y4} z`;
        } 
        else if (shapType === 'mathMinus') {
          if (adj1 === undefined) adj1 = 23520;
          adj1 *= RATIO_EMUs_Points;
          const cnstVal6 = 73490 * RATIO_EMUs_Points;
          const a1 = (adj1 < 0) ? 0 : (adj1 > cnstVal2) ? cnstVal2 : adj1;
          const dy1 = h * a1 / cnstVal3;
          const dx1 = w * cnstVal6 / cnstVal3;
          const y1 = vc - dy1;
          const y2 = vc + dy1;
          const x1 = hc - dx1;
          const x2 = hc + dx1;
          pathData = `M ${x1},${y1} L ${x2},${y1} L ${x2},${y2} L ${x1},${y2} z`;
        } 
        else if (shapType === 'mathMultiply') {
          if (adj1 === undefined) adj1 = 23520;
          adj1 *= RATIO_EMUs_Points;
          const cnstVal6 = 51965 * RATIO_EMUs_Points;
          const ss = Math.min(w, h);
          const a1 = (adj1 < 0) ? 0 : (adj1 > cnstVal6) ? cnstVal6 : adj1;
          const th = ss * a1 / cnstVal2;
          const a = Math.atan(h / w);
          const sa = Math.sin(a);
          const ca = Math.cos(a);
          const ta = Math.tan(a);
          const dl = Math.sqrt(w * w + h * h);
          const lM = dl - (dl * cnstVal6 / cnstVal2);
          const xM = ca * lM / 2;
          const yM = sa * lM / 2;
          const dxAM = sa * th / 2;
          const dyAM = ca * th / 2;
          const xA = xM - dxAM;
          const yA = yM + dyAM;
          const xB = xM + dxAM;
          const yB = yM - dyAM;
          const yC = (hc - xB) * ta + yB;
          const xD = w - xB;
          const xE = w - xA;
          const xF = xE - ((vc - yA) / ta);
          const xL = xA + ((vc - yA) / ta);
          const yG = h - yA;
          const yH = h - yB;
          const yI = h - yC;
          pathData = `M ${xA},${yA} L ${xB},${yB} L ${hc},${yC} L ${xD},${yB} L ${xE},${yA} L ${xF},${vc} L ${xE},${yG} L ${xD},${yH} L ${hc},${yI} L ${xB},${yH} L ${xA},${yG} L ${xL},${vc} z`;
        } 
        else if (shapType === 'mathPlus') {
          if (adj1 === undefined) adj1 = 23520;
          adj1 *= RATIO_EMUs_Points;
          const cnstVal6 = 73490 * RATIO_EMUs_Points;
          const ss = Math.min(w, h);
          const a1 = (adj1 < 0) ? 0 : (adj1 > cnstVal6) ? cnstVal6 : adj1;
          const dx1 = w * cnstVal6 / cnstVal3;
          const dy1 = h * cnstVal6 / cnstVal3;
          const dx2 = ss * a1 / cnstVal3;
          const x1 = hc - dx1;
          const x2 = hc - dx2;
          const x3 = hc + dx2;
          const x4 = hc + dx1;
          const y1 = vc - dy1;
          const y2 = vc - dx2;
          const y3 = vc + dx2;
          const y4 = vc + dy1;
          pathData = `M ${x1},${y2} L ${x2},${y2} L ${x2},${y1} L ${x3},${y1} L ${x3},${y2} L ${x4},${y2} L ${x4},${y3} L ${x3},${y3} L ${x3},${y4} L ${x2},${y4} L ${x2},${y3} L ${x1},${y3} z`;
        }
      }
      break
    case 'can':
    case 'flowChartMagneticDisk':
    case 'flowChartMagneticDrum':
      {
        const shapAdjst = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd', 'attrs', 'fmla']);
        let adj = 25000 * RATIO_EMUs_Points;
        const cnstVal1 = 50000 * RATIO_EMUs_Points;
        const cnstVal2 = 200000 * RATIO_EMUs_Points;
        if (shapAdjst) {
          adj = parseInt(shapAdjst.substring(4)) * RATIO_EMUs_Points;
        }
        if (shapType === 'flowChartMagneticDisk' || shapType === 'flowChartMagneticDrum') {
          adj = 50000 * RATIO_EMUs_Points;
        }
        const ss = Math.min(w, h);
        const maxAdj = cnstVal1 * h / ss;
        const a = (adj < 0) ? 0 : (adj > maxAdj) ? maxAdj : adj;
        const y1 = ss * a / cnstVal2;
        const y3 = h - y1;
        const cd2 = 180,
          wd2 = w / 2;
        let dVal = `${shapeArc(wd2, y1, wd2, y1, 0, cd2, false)} ${shapeArc(wd2, y1, wd2, y1, cd2, cd2 + cd2, false).replace('M', 'L')} L ${w},${y3} ${shapeArc(wd2, y3, wd2, y1, 0, cd2, false).replace('M', 'L')} L 0,${y1}`;

        if (shapType === 'flowChartMagneticDrum') {
          dVal = dVal.replace(/([MLQC])\s*([-\d.e]+)\s*([-\d.e]+)/gi, (match, command, x, y) => {
            const newX = w / 2 - (parseFloat(y) - h / 2);
            const newY = h / 2 + (parseFloat(x) - w / 2);
            return `${command}${newX} ${newY}`
          }).replace(/([MLQC])\s*([-\d.e]+)\s*([-\d.e]+)\s*([-\d.e]+)\s*([-\d.e]+)/gi, (match, command, c1x, c1y, x, y) => {
            const newC1X = w / 2 - (parseFloat(c1y) - h / 2);
            const newC1Y = h / 2 + (parseFloat(c1x) - w / 2);
            const newX = w / 2 - (parseFloat(y) - h / 2);
            const newY = h / 2 + (parseFloat(x) - w / 2);
            return `${command}${newC1X} ${newC1Y} ${newX} ${newY}`
          });
        }
        pathData = dVal;
      }
      break
    case 'swooshArrow':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        const refr = RATIO_EMUs_Points;
        let adj1 = 25000 * refr;
        let adj2 = 16667 * refr;
        if (shapAdjst_ary) {
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              adj1 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * refr;
            } 
            else if (sAdj_name === 'adj2') {
              adj2 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * refr;
            }
          }
        }
        const cnstVal1 = 1 * refr;
        const cnstVal2 = 70000 * refr;
        const cnstVal3 = 75000 * refr;
        const cnstVal4 = 100000 * refr;
        const ss = Math.min(w, h);
        const ssd8 = ss / 8;
        const hd6 = h / 6;
        const a1 = (adj1 < cnstVal1) ? cnstVal1 : (adj1 > cnstVal3) ? cnstVal3 : adj1;
        const maxAdj2 = cnstVal2 * w / ss;
        const a2 = (adj2 < 0) ? 0 : (adj2 > maxAdj2) ? maxAdj2 : adj2;
        const ad1 = h * a1 / cnstVal4;
        const ad2 = ss * a2 / cnstVal4;
        const xB = w - ad2;
        const yB = ssd8;
        const alfa = (Math.PI / 2) / 14;
        const dx0 = ssd8 * Math.tan(alfa);
        const xC = xB - dx0;
        const dx1 = ad1 * Math.tan(alfa);
        const yF = yB + ad1;
        const xF = xB + dx1;
        const xE = xF + dx0;
        const yE = yF + ssd8;
        const dy22 = yE / 2;
        const dy3 = h / 20;
        const yD = dy22 - dy3;
        const yP1 = hd6 + (hd6);
        const xP1 = w / 6;
        const yP2 = yF + (hd6 / 2);
        const xP2 = w / 4;
        pathData = `M 0,${h} Q ${xP1},${yP1} ${xB},${yB} L ${xC},0 L ${w},${yD} L ${xE},${yE} L ${xF},${yF} Q ${xP2},${yP2} 0,${h} z`;
      }
      break
    case 'circularArrow':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let adj1 = 12500 * RATIO_EMUs_Points;
        let adj2 = (1142319 / 60000) * Math.PI / 180;
        let adj3 = (20457681 / 60000) * Math.PI / 180;
        let adj4 = (10800000 / 60000) * Math.PI / 180;
        let adj5 = 12500 * RATIO_EMUs_Points;
        if (shapAdjst_ary) {
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              adj1 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
            else if (sAdj_name === 'adj2') {
              adj2 = (parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) / 60000) * Math.PI / 180;
            }
            else if (sAdj_name === 'adj3') {
              adj3 = (parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) / 60000) * Math.PI / 180;
            }
            else if (sAdj_name === 'adj4') {
              adj4 = (parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) / 60000) * Math.PI / 180;
            }
            else if (sAdj_name === 'adj5') {
              adj5 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
          }
        }
        const hc = w / 2,
          vc = h / 2,
          wd2 = w / 2,
          hd2 = h / 2;
        const ss = Math.min(w, h);
        const cnstVal1 = 25000 * RATIO_EMUs_Points;
        const cnstVal2 = 100000 * RATIO_EMUs_Points;
        const rdAngVal1 = (1 / 60000) * Math.PI / 180;
        const rdAngVal2 = (21599999 / 60000) * Math.PI / 180;
        const rdAngVal3 = 2 * Math.PI;
        const a5 = (adj5 < 0) ? 0 : (adj5 > cnstVal1) ? cnstVal1 : adj5;
        const maxAdj1 = a5 * 2;
        const a1 = (adj1 < 0) ? 0 : (adj1 > maxAdj1) ? maxAdj1 : adj1;
        const enAng = (adj3 < rdAngVal1) ? rdAngVal1 : (adj3 > rdAngVal2) ? rdAngVal2 : adj3;
        const stAng = (adj4 < 0) ? 0 : (adj4 > rdAngVal2) ? rdAngVal2 : adj4;
        const th = ss * a1 / cnstVal2;
        const thh = ss * a5 / cnstVal2;
        const th2 = th / 2;
        const rw1 = wd2 + th2 - thh;
        const rh1 = hd2 + th2 - thh;
        const rw2 = rw1 - th;
        const rh2 = rh1 - th;
        const rw3 = rw2 + th2;
        const rh3 = rh2 + th2;
        const wtH = rw3 * Math.sin(enAng);
        const htH = rh3 * Math.cos(enAng);
        const dxH = rw3 * Math.cos(Math.atan2(wtH, htH));
        const dyH = rh3 * Math.sin(Math.atan2(wtH, htH));
        const xH = hc + dxH;
        const yH = vc + dyH;
        const rI = Math.min(rw2, rh2);
        const u8 = 1 - (((dxH * dxH - rI * rI) * (dyH * dyH - rI * rI)) / (dxH * dxH * dyH * dyH));
        const u9 = Math.sqrt(u8);
        const u12 = (1 + u9) / (((dxH * dxH - rI * rI) / dxH) / dyH);
        const u15 = Math.atan2(u12, 1) > 0 ? Math.atan2(u12, 1) : Math.atan2(u12, 1) + rdAngVal3;
        const u18 = (u15 - enAng > 0) ? u15 - enAng : u15 - enAng + rdAngVal3;
        const u21 = (u18 - Math.PI > 0) ? u18 - rdAngVal3 : u18;
        const maxAng = Math.abs(u21);
        const aAng = (adj2 < 0) ? 0 : (adj2 > maxAng) ? maxAng : adj2;
        const ptAng = enAng + aAng;
        const wtA = rw3 * Math.sin(ptAng);
        const htA = rh3 * Math.cos(ptAng);
        const dxA = rw3 * Math.cos(Math.atan2(wtA, htA));
        const dyA = rh3 * Math.sin(Math.atan2(wtA, htA));
        const xA = hc + dxA;
        const yA = vc + dyA;
        const dxG = thh * Math.cos(ptAng);
        const dyG = thh * Math.sin(ptAng);
        const xG = xH + dxG;
        const yG = yH + dyG;
        const dxB = thh * Math.cos(ptAng);
        const dyB = thh * Math.sin(ptAng);
        const xB = xH - dxB;
        const yB = yH - dyB;
        const sx1 = xB - hc;
        const sy1 = yB - vc;
        const sx2 = xG - hc;
        const sy2 = yG - vc;
        const rO = Math.min(rw1, rh1);
        const x1O = sx1 * rO / rw1;
        const y1O = sy1 * rO / rh1;
        const x2O = sx2 * rO / rw1;
        const y2O = sy2 * rO / rh1;
        const dxO = x2O - x1O;
        const dyO = y2O - y1O;
        const dO = Math.sqrt(dxO * dxO + dyO * dyO);
        const DO = x1O * y2O - x2O * y1O;
        const sdelO = Math.sqrt(Math.max(0, rO * rO * dO * dO - DO * DO));
        const sdyO = (dyO * -1 > 0) ? -1 : 1;
        const dxF1 = (DO * dyO + sdyO * dxO * sdelO) / (dO * dO);
        const dxF2 = (DO * dyO - sdyO * dxO * sdelO) / (dO * dO);
        const dyF1 = (-DO * dxO + Math.abs(dyO) * sdelO) / (dO * dO);
        const dyF2 = (-DO * dxO - Math.abs(dyO) * sdelO) / (dO * dO);
        const q22 = Math.sqrt((x2O - dxF2) ** 2 + (y2O - dyF2) ** 2) - Math.sqrt((x2O - dxF1) ** 2 + (y2O - dyF1) ** 2);
        const dxF = (q22 > 0) ? dxF1 : dxF2;
        const dyF = (q22 > 0) ? dyF1 : dyF2;
        const xF = hc + (dxF * rw1 / rO);
        const yF = vc + (dyF * rh1 / rO);
        const x1I = sx1 * rI / rw2;
        const y1I = sy1 * rI / rh2;
        const x2I = sx2 * rI / rw2;
        const y2I = sy2 * rI / rh2;
        const dxI = x2I - x1I;
        const dyI = y2I - y1I;
        const dI = Math.sqrt(dxI * dxI + dyI * dyI);
        const DI = x1I * y2I - x2I * y1I;
        const sdelI = Math.sqrt(Math.max(0, rI * rI * dI * dI - DI * DI));
        const dxC1 = (DI * dyI + sdyO * dxI * sdelI) / (dI * dI);
        const dxC2 = (DI * dyI - sdyO * dxI * sdelI) / (dI * dI);
        const dyC1 = (-DI * dxI + Math.abs(dyI) * sdelI) / (dI * dI);
        const dyC2 = (-DI * dxI - Math.abs(dyI) * sdelI) / (dI * dI);
        const v22 = Math.sqrt((x1I - dxC2) ** 2 + (y1I - dyC2) ** 2) - Math.sqrt((x1I - dxC1) ** 2 + (y1I - dyC1) ** 2);
        const dxC = (v22 > 0) ? dxC1 : dxC2;
        const dyC = (v22 > 0) ? dyC1 : dyC2;
        const xC = hc + (dxC * rw2 / rI);
        const yC = vc + (dyC * rh2 / rI);
        const ist0 = Math.atan2(dyC * rh2 / rI, dxC * rw2 / rI);
        const istAng = (ist0 > 0) ? ist0 : ist0 + rdAngVal3;
        const isw1 = stAng - istAng;
        const iswAng = (isw1 > 0) ? isw1 - rdAngVal3 : isw1;
        const p5 = Math.sqrt((xF - xC) ** 2 + (yF - yC) ** 2) / 2 - thh;
        const xGp = (p5 > 0) ? xF : xG;
        const yGp = (p5 > 0) ? yF : yG;
        const xBp = (p5 > 0) ? xC : xB;
        const yBp = (p5 > 0) ? yC : yB;
        const en0 = Math.atan2((yF - vc), (xF - hc));
        const en2 = (en0 > 0) ? en0 : en0 + rdAngVal3;
        const sw0 = en2 - stAng;
        const swAng = (sw0 > 0) ? sw0 : sw0 + rdAngVal3;
        const strtAng = stAng * 180 / Math.PI;
        const endAngVal = strtAng + (swAng * 180 / Math.PI);
        const stiAng = istAng * 180 / Math.PI;
        const ediAng = stiAng + (iswAng * 180 / Math.PI);
        pathData = `${shapeArc(w / 2, h / 2, rw1, rh1, strtAng, endAngVal, false)} L ${xGp},${yGp} L ${xA},${yA} L ${xBp},${yBp} L ${xC},${yC} ${shapeArc(w / 2, h / 2, rw2, rh2, stiAng, ediAng, false).replace('M', 'L')} z`;
      }
      break
    case 'leftCircularArrow':
      {
        const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
        let adj1 = 12500 * RATIO_EMUs_Points;
        let adj2 = (-1142319 / 60000) * Math.PI / 180;
        let adj3 = (1142319 / 60000) * Math.PI / 180;
        let adj4 = (10800000 / 60000) * Math.PI / 180;
        let adj5 = 12500 * RATIO_EMUs_Points;
        if (shapAdjst_ary) {
          for (const adj of shapAdjst_ary) {
            const sAdj_name = getTextByPathList(adj, ['attrs', 'name']);
            if (sAdj_name === 'adj1') {
              adj1 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
            else if (sAdj_name === 'adj2') {
              adj2 = (parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) / 60000) * Math.PI / 180;
            }
            else if (sAdj_name === 'adj3') {
              adj3 = (parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) / 60000) * Math.PI / 180;
            }
            else if (sAdj_name === 'adj4') {
              adj4 = (parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) / 60000) * Math.PI / 180;
            }
            else if (sAdj_name === 'adj5') {
              adj5 = parseInt(getTextByPathList(adj, ['attrs', 'fmla']).substring(4)) * RATIO_EMUs_Points;
            }
          }
        }
        const hc = w / 2,
          vc = h / 2,
          wd2 = w / 2,
          hd2 = h / 2;
        const ss = Math.min(w, h);
        const cnstVal1 = 25000 * RATIO_EMUs_Points;
        const cnstVal2 = 100000 * RATIO_EMUs_Points;
        const rdAngVal1 = (1 / 60000) * Math.PI / 180;
        const rdAngVal2 = (21599999 / 60000) * Math.PI / 180;
        const rdAngVal3 = 2 * Math.PI;
        const a5 = (adj5 < 0) ? 0 : (adj5 > cnstVal1) ? cnstVal1 : adj5;
        const maxAdj1 = a5 * 2;
        const a1 = (adj1 < 0) ? 0 : (adj1 > maxAdj1) ? maxAdj1 : adj1;
        const enAng = (adj3 < rdAngVal1) ? rdAngVal1 : (adj3 > rdAngVal2) ? rdAngVal2 : adj3;
        const stAng = (adj4 < 0) ? 0 : (adj4 > rdAngVal2) ? rdAngVal2 : adj4;
        const th = ss * a1 / cnstVal2;
        const thh = ss * a5 / cnstVal2;
        const th2 = th / 2;
        const rw1 = wd2 + th2 - thh;
        const rh1 = hd2 + th2 - thh;
        const rw2 = rw1 - th;
        const rh2 = rh1 - th;
        const rw3 = rw2 + th2;
        const rh3 = rh2 + th2;
        const dxH = rw3 * Math.cos(enAng);
        const dyH = rh3 * Math.sin(enAng);
        const xH = hc + dxH;
        const yH = vc + dyH;
        const rI = Math.min(rw2, rh2);
        const u8 = 1 - (((dxH * dxH - rI * rI) * (dyH * dyH - rI * rI)) / (dxH * dxH * dyH * dyH));
        const u9 = Math.sqrt(u8);
        const u12 = (1 + u9) / (((dxH * dxH - rI * rI) / dxH) / dyH);
        const u15 = Math.atan2(u12, 1) > 0 ? Math.atan2(u12, 1) : Math.atan2(u12, 1) + rdAngVal3;
        const u18 = (u15 - enAng > 0) ? u15 - enAng : u15 - enAng + rdAngVal3;
        const u21 = (u18 - Math.PI > 0) ? u18 - rdAngVal3 : u18;
        const minAng = -Math.abs(u21);
        const aAng = (adj2 < minAng) ? minAng : (adj2 > 0) ? 0 : adj2;
        const ptAng = enAng + aAng;
        const dxA = rw3 * Math.cos(ptAng);
        const dyA = rh3 * Math.sin(ptAng);
        const xA = hc + dxA;
        const yA = vc + dyA;
        const dxE = rw1 * Math.cos(stAng);
        const dyE = rh1 * Math.sin(stAng);
        const xE = hc + dxE;
        const yE = vc + dyE;
        const dxD = rw2 * Math.cos(stAng);
        const dyD = rh2 * Math.sin(stAng);
        const xD = hc + dxD;
        const yD = vc + dyD;
        const dxG = thh * Math.cos(ptAng);
        const dyG = thh * Math.sin(ptAng);
        const xG = xH + dxG;
        const yG = yH + dyG;
        const dxB = thh * Math.cos(ptAng);
        const dyB = thh * Math.sin(ptAng);
        const xB = xH - dxB;
        const yB = yH - dyB;
        const sx1 = xB - hc;
        const sy1 = yB - vc;
        const sx2 = xG - hc;
        const sy2 = yG - vc;
        const rO = Math.min(rw1, rh1);
        const x1O = sx1 * rO / rw1;
        const y1O = sy1 * rO / rh1;
        const x2O = sx2 * rO / rw1;
        const y2O = sy2 * rO / rh1;
        const dxO = x2O - x1O;
        const dyO = y2O - y1O;
        const dO = Math.sqrt(dxO * dxO + dyO * dyO);
        const DO = x1O * y2O - x2O * y1O;
        const sdelO = Math.sqrt(Math.max(0, rO * rO * dO * dO - DO * DO));
        const sdyO = (dyO * -1 > 0) ? -1 : 1;
        const dxF1 = (DO * dyO + sdyO * dxO * sdelO) / (dO * dO);
        const dxF2 = (DO * dyO - sdyO * dxO * sdelO) / (dO * dO);
        const dyF1 = (-DO * dxO + Math.abs(dyO) * sdelO) / (dO * dO);
        const dyF2 = (-DO * dxO - Math.abs(dyO) * sdelO) / (dO * dO);
        const q22 = Math.sqrt((x2O - dxF2) ** 2 + (y2O - dyF2) ** 2) - Math.sqrt((x2O - dxF1) ** 2 + (y2O - dyF1) ** 2);
        const dxF = (q22 > 0) ? dxF1 : dxF2;
        const dyF = (q22 > 0) ? dyF1 : dyF2;
        const xF = hc + (dxF * rw1 / rO);
        const yF = vc + (dyF * rh1 / rO);
        const x1I = sx1 * rI / rw2;
        const y1I = sy1 * rI / rh2;
        const x2I = sx2 * rI / rw2;
        const y2I = sy2 * rI / rh2;
        const dxI = x2I - x1I;
        const dyI = y2I - y1I;
        const dI = Math.sqrt(dxI * dxI + dyI * dyI);
        const DI = x1I * y2I - x2I * y1I;
        const sdelI = Math.sqrt(Math.max(0, rI * rI * dI * dI - DI * DI));
        const dxC1 = (DI * dyI + sdyO * dxI * sdelI) / (dI * dI);
        const dxC2 = (DI * dyI - sdyO * dxI * sdelI) / (dI * dI);
        const dyC1 = (-DI * dxI + Math.abs(dyI) * sdelI) / (dI * dI);
        const dyC2 = (-DI * dxI - Math.abs(dyI) * sdelI) / (dI * dI);
        const v22 = Math.sqrt((x1I - dxC2) ** 2 + (y1I - dyC2) ** 2) - Math.sqrt((x1I - dxC1) ** 2 + (y1I - dyC1) ** 2);
        const dxC = (v22 > 0) ? dxC1 : dxC2;
        const dyC = (v22 > 0) ? dyC1 : dyC2;
        const xC = hc + (dxC * rw2 / rI);
        const yC = vc + (dyC * rh2 / rI);
        const ist0 = Math.atan2(dyC * rh2 / rI, dxC * rw2 / rI);
        const istAng0 = (ist0 > 0) ? ist0 : ist0 + rdAngVal3;
        const isw1 = stAng - istAng0;
        const iswAng0 = (isw1 > 0) ? isw1 : isw1 + rdAngVal3;
        const istAng = istAng0 + iswAng0;
        const iswAng = -iswAng0;
        const p5 = Math.sqrt((xF - xC) ** 2 + (yF - yC) ** 2) / 2 - thh;
        const xGp = (p5 > 0) ? xF : xG;
        const yGp = (p5 > 0) ? yF : yG;
        const xBp = (p5 > 0) ? xC : xB;
        const yBp = (p5 > 0) ? yC : yB;
        const en0 = Math.atan2((yF - vc), (xF - hc));
        const en2 = (en0 > 0) ? en0 : en0 + rdAngVal3;
        const sw0 = en2 - stAng;
        const swAng = (sw0 > 0) ? sw0 - rdAngVal3 : sw0;
        const stAng0 = stAng + swAng;
        const strtAng = stAng0 * 180 / Math.PI;
        const endAngVal = stAng * 180 / Math.PI;
        const stiAng = istAng * 180 / Math.PI;
        const ediAng = stiAng + (iswAng * 180 / Math.PI);
        pathData = `M ${xE},${yE} L ${xD},${yD} ${shapeArc(w / 2, h / 2, rw2, rh2, stiAng, ediAng, false).replace('M', 'L')} L ${xBp},${yBp} L ${xA},${yA} L ${xGp},${yGp} L ${xF},${yF} ${shapeArc(w / 2, h / 2, rw1, rh1, strtAng, endAngVal, false).replace('M', 'L')} z`;
      }
      break
    case 'leftRightCircularArrow':
    case 'chartPlus':
    case 'chartStar':
    case 'chartX':
    case 'cornerTabs':
    case 'flowChartOfflineStorage':
    case 'folderCorner':
    case 'funnel':
    case 'lineInv':
    case 'nonIsoscelesTrapezoid':
    case 'plaqueTabs':
    case 'squareTabs':
    case 'upDownArrowCallout':
      pathData = `M 0 0 L ${w} 0 L ${w} ${h} L 0 ${h} Z`;
      break
    default:
      pathData = `M 0 0 L ${w} 0 L ${w} ${h} L 0 ${h} Z`;
  }

  return pathData
}

function findTransitionNode(content, rootElement) {
  if (!content || !rootElement) return null

  const path1 = [rootElement, 'p:transition'];
  let transitionNode = getTextByPathList(content, path1);
  if (transitionNode) return transitionNode

  const path2 = [rootElement, 'mc:AlternateContent', 'mc:Choice', 'p:transition'];
  transitionNode = getTextByPathList(content, path2);
  if (transitionNode) return transitionNode

  const path3 = [rootElement, 'mc:AlternateContent', 'mc:Fallback', 'p:transition'];
  transitionNode = getTextByPathList(content, path3);
  
  return transitionNode
}

function parseTransition(transitionNode) {
  if (!transitionNode) return null

  const transition = {
    type: 'none',
    duration: 1000,
    direction: null,
  };

  const attrs = transitionNode.attrs || {};

  let durationFound = false;
  const durRegex = /^p\d{2}:dur$/; 
  for (const key in attrs) {
    if (durRegex.test(key) && !isNaN(parseInt(attrs[key], 10))) {
      transition.duration = parseInt(attrs[key], 10);
      durationFound = true;
      break
    }
  }

  if (!durationFound && attrs.spd) {
    switch (attrs.spd) {
      case 'slow':
        transition.duration = 1000;
        break
      case 'med':
        transition.duration = 800;
        break
      case 'fast':
        transition.duration = 500;
        break
      default:
        transition.duration = 1000;
        break
    }
  }

  if (attrs.advClick === '0' && attrs.advTm) {
    transition.autoNextAfter = parseInt(attrs.advTm, 10);
  }

  const effectRegex = /^(p|p\d{2}):/; 
  for (const key in transitionNode) {
    if (key !== 'attrs' && effectRegex.test(key)) {
      const effectNode = transitionNode[key];
      transition.type = key.substring(key.indexOf(':') + 1);

      if (effectNode && effectNode.attrs) {
        const effectAttrs = effectNode.attrs;
        
        if (effectAttrs.dur && !isNaN(parseInt(effectAttrs.dur, 10))) {
          if (!durationFound) transition.duration = parseInt(effectAttrs.dur, 10);
        }
        if (effectAttrs.dir) transition.direction = effectAttrs.dir;
      }
      break
    }
  }

  return transition
}

function getSmartArtTextData(dataContent) {
  const result = [];

  let ptLst = getTextByPathList(dataContent, ['dgm:dataModel', 'dgm:ptLst', 'dgm:pt']);

  if (!ptLst) return result
  if (!Array.isArray(ptLst)) ptLst = [ptLst];

  for (const pt of ptLst) {
    const textBody = getTextByPathList(pt, ['dgm:t']);

    if (textBody) {
      let nodeText = '';

      let paragraphs = getTextByPathList(textBody, ['a:p']);
      if (paragraphs) {
        if (!Array.isArray(paragraphs)) paragraphs = [paragraphs];

        paragraphs.forEach(p => {
          let runs = getTextByPathList(p, ['a:r']);
          if (runs) {
            if (!Array.isArray(runs)) runs = [runs];

            runs.forEach(r => {
              const t = getTextByPathList(r, ['a:t']);
              if (t && typeof t === 'string') nodeText += t;
            });
          }
          if (nodeText.length > 0) nodeText += '\n';
        });
      }

      const cleanText = nodeText.trim();
      if (cleanText) {
        result.push(cleanText);
      }
    }
  }

  return result
}

async function parse(file) {
  const slides = [];
  
  const zip = await JSZip.loadAsync(file);

  const filesInfo = await getContentTypes(zip);
  const { width, height, defaultTextStyle } = await getSlideInfo(zip);
  const { themeContent, themeColors } = await getTheme(zip);

  for (const filename of filesInfo.slides) {
    const singleSlide = await processSingleSlide(zip, filename, themeContent, defaultTextStyle);
    slides.push(singleSlide);
  }

  return {
    slides,
    themeColors,
    size: {
      width,
      height,
    },
  }
}

function resolveZipTarget(baseFilePath, targetPath) {
  if (!targetPath) return ''
  if (targetPath.startsWith('/')) return targetPath.slice(1)
  if (/^[a-zA-Z]+:\/\//.test(targetPath)) return targetPath

  const parts = baseFilePath.split('/').slice(0, -1);
  const targetParts = targetPath.split('/');
  for (const part of targetParts) {
    if (!part || part === '.') continue
    if (part === '..') {
      if (parts.length > 0) parts.pop();
      continue
    }
    parts.push(part);
  }
  return parts.join('/')
}

function wrapClipboardThemeAsTheme(themeContent) {
  const clipboardTheme = getTextByPathList(themeContent, ['a:clipboardTheme']);
  if (!clipboardTheme) return themeContent

  return {
    'a:theme': {
      'a:themeElements': clipboardTheme['a:themeElements'],
      'a:clrMap': clipboardTheme['a:clrMap'],
    },
  }
}

function readThemeColors(themeContent) {
  const themeColors = [];
  const clrScheme = getTextByPathList(themeContent, ['a:theme', 'a:themeElements', 'a:clrScheme']);
  if (clrScheme) {
    for (let i = 1; i <= 6; i++) {
      if (clrScheme[`a:accent${i}`] === undefined) break
      const color = getTextByPathList(clrScheme, [`a:accent${i}`, 'a:srgbClr', 'attrs', 'val']);
      if (color) themeColors.push('#' + color);
    }
  }
  return themeColors
}

function ensureArray(node) {
  if (!node) return []
  return Array.isArray(node) ? node : [node]
}

function createEmptyTables() {
  return {
    idTable: {},
    idxTable: {},
    typeTable: {},
  }
}

function normalizeGvmlShapeNode(node) {
  if (!node || typeof node !== 'object') return null

  const normalizedNode = {
    attrs: node['attrs'] ? { ...node['attrs'] } : {},
  };

  if (node['a:nvSpPr']) {
    const nvSpPrNode = node['a:nvSpPr'];
    normalizedNode['p:nvSpPr'] = {};
    if (nvSpPrNode['a:cNvPr']) normalizedNode['p:nvSpPr']['p:cNvPr'] = nvSpPrNode['a:cNvPr'];
    if (nvSpPrNode['a:cNvSpPr']) normalizedNode['p:nvSpPr']['p:cNvSpPr'] = nvSpPrNode['a:cNvSpPr'];
    if (nvSpPrNode['a:nvPr']) normalizedNode['p:nvSpPr']['p:nvPr'] = nvSpPrNode['a:nvPr'];
  }
  if (node['a:spPr']) normalizedNode['p:spPr'] = node['a:spPr'];
  if (node['a:style']) normalizedNode['p:style'] = node['a:style'];
  if (node['a:txBody']) normalizedNode['p:txBody'] = node['a:txBody'];

  const txSpNode = node['a:txSp'];
  if (txSpNode) {
    if (txSpNode['a:txBody']) normalizedNode['p:txBody'] = txSpNode['a:txBody'];
    if (txSpNode['a:txXfrm']) normalizedNode['p:txXfrm'] = txSpNode['a:txXfrm'];
  }

  return normalizedNode
}

function normalizeGvmlGroupNode(node, path, warn) {
  if (!node || typeof node !== 'object') return null

  const normalizedNode = {
    attrs: node['attrs'] ? { ...node['attrs'] } : {},
  };

  if (node['a:grpSpPr']) normalizedNode['p:grpSpPr'] = node['a:grpSpPr'];

  const childMap = [
    ['a:sp', 'p:sp'],
    ['a:grpSp', 'p:grpSp'],
  ];
  for (const [sourceKey, targetKey] of childMap) {
    if (!node[sourceKey]) continue
    const sourceChildren = ensureArray(node[sourceKey]);
    const normalizedChildren = sourceChildren
      .map((child, idx) => (
        sourceKey === 'a:sp'
          ? normalizeGvmlShapeNode(child)
          : normalizeGvmlGroupNode(child, `${path}.${sourceKey}[${idx}]`, warn)
      ))
      .filter(Boolean);
    if (normalizedChildren.length === 1) normalizedNode[targetKey] = normalizedChildren[0];
    else if (normalizedChildren.length > 1) normalizedNode[targetKey] = normalizedChildren;
  }

  for (const key in node) {
    if (key === 'attrs' || key === 'a:nvGrpSpPr' || key === 'a:grpSpPr' || key === 'a:sp' || key === 'a:grpSp') continue
    warn(`${path}.${key}: unsupported GVML group child, skipped`);
  }

  return normalizedNode
}

async function parseClipboardGVML(file, options = {}) {
  const zip = await JSZip.loadAsync(file);
  const warnings = [];
  const strict = options.strict === true;
  const warn = message => {
    warnings.push(message);
    if (strict) throw new Error(message)
  };

  const drawingPath = 'clipboard/drawings/drawing1.xml';
  const drawingRelsPath = 'clipboard/drawings/_rels/drawing1.xml.rels';
  const themeFallbackPath = 'clipboard/theme/theme1.xml';

  const drawingContent = await readXmlFile(zip, drawingPath);
  if (!drawingContent) throw new Error('Invalid GVML clipboard zip: missing clipboard/drawings/drawing1.xml')

  const drawingRelsContent = await readXmlFile(zip, drawingRelsPath);
  let relationshipArray = getTextByPathList(drawingRelsContent, ['Relationships', 'Relationship']);
  relationshipArray = ensureArray(relationshipArray);

  const slideResObj = {};
  let themePath = themeFallbackPath;
  for (const rel of relationshipArray) {
    const attrs = rel && rel['attrs'];
    if (!attrs) continue
    const typeRaw = attrs['Type'] || '';
    const relType = typeRaw.replace('http://schemas.openxmlformats.org/officeDocument/2006/relationships/', '');
    const relId = attrs['Id'];
    const isExternal = attrs['TargetMode'] === 'External';
    const target = attrs['Target'] || '';
    const resolvedTarget = isExternal ? target : resolveZipTarget(drawingPath, target);

    if (relId) {
      slideResObj[relId] = {
        type: relType,
        target: resolvedTarget,
      };
    }
    if (typeRaw === 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme' && resolvedTarget) {
      themePath = resolvedTarget;
    }
  }

  const rawThemeContent = await readXmlFile(zip, themePath);
  if (!rawThemeContent) warn(`Missing clipboard theme at ${themePath}, color resolution may be incomplete`);
  const themeContent = rawThemeContent ? wrapClipboardThemeAsTheme(rawThemeContent) : {};
  const themeColors = readThemeColors(themeContent);

  const lockedCanvas = getTextByPathList(drawingContent, ['a:graphic', 'a:graphicData', 'lc:lockedCanvas']);
  if (!lockedCanvas) throw new Error('Invalid GVML clipboard zip: missing lockedCanvas in drawing1.xml')

  const ext = getTextByPathList(lockedCanvas, ['a:grpSpPr', 'a:xfrm', 'a:ext', 'attrs']) || {};
  const width = (parseInt(ext['cx']) || 0) * RATIO_EMUs_Points;
  const height = (parseInt(ext['cy']) || 0) * RATIO_EMUs_Points;
  if (!width || !height) warn('lockedCanvas has missing/zero extents; output size may be invalid');

  const emptyTables = createEmptyTables();
  const warpObj = {
    zip,
    slideLayoutContent: null,
    slideLayoutTables: emptyTables,
    slideMasterContent: null,
    slideMasterTables: emptyTables,
    slideContent: drawingContent,
    tableStyles: {},
    slideResObj,
    slideMasterTextStyles: undefined,
    layoutResObj: {},
    masterResObj: {},
    themeContent,
    themeResObj: {},
    digramFileContent: {},
    diagramResObj: {},
    diagramContent: {
      data: null,
      layout: null,
      quickStyle: null,
      colors: null,
      drawing: null,
    },
    defaultTextStyle: undefined,
  };

  const elements = [];
  const parseTopLevelChildren = async (sourceKey, targetKey, normalizer) => {
    if (!lockedCanvas[sourceKey]) return
    const children = ensureArray(lockedCanvas[sourceKey]);
    for (let i = 0; i < children.length; i++) {
      const normalized = normalizer(children[i], `lockedCanvas.${sourceKey}[${i}]`, warn);
      if (!normalized) {
        warn(`lockedCanvas.${sourceKey}[${i}]: failed to normalize node, skipped`);
        continue
      }
      const ret = await processNodesInSlide(targetKey, normalized, warpObj, 'slide');
      if (ret) elements.push(ret);
    }
  };

  await parseTopLevelChildren('a:sp', 'p:sp', (node) => normalizeGvmlShapeNode(node));
  await parseTopLevelChildren('a:grpSp', 'p:grpSp', normalizeGvmlGroupNode);
  if (lockedCanvas['a:pic']) warn('lockedCanvas.a:pic: unsupported in v1, skipped');
  if (lockedCanvas['a:graphicFrame']) warn('lockedCanvas.a:graphicFrame: unsupported in v1, skipped');
  if (lockedCanvas['a:cxnSp']) warn('lockedCanvas.a:cxnSp: unsupported in v1, skipped');

  for (const key in lockedCanvas) {
    if (key === 'attrs' || key === 'a:nvGrpSpPr' || key === 'a:grpSpPr' || key === 'a:sp' || key === 'a:grpSp' || key === 'a:pic' || key === 'a:graphicFrame' || key === 'a:cxnSp') continue
    warn(`lockedCanvas.${key}: unsupported GVML node, skipped`);
  }

  return {
    slides: [
      {
        fill: null,
        elements,
        layoutElements: [],
        note: '',
        transition: null,
      },
    ],
    themeColors,
    size: {
      width,
      height,
    },
    warnings,
  }
}

async function getContentTypes(zip) {
  const ContentTypesJson = await readXmlFile(zip, '[Content_Types].xml');
  const subObj = ContentTypesJson['Types']['Override'];
  let slidesLocArray = [];
  let slideLayoutsLocArray = [];

  for (const item of subObj) {
    switch (item['attrs']['ContentType']) {
      case 'application/vnd.openxmlformats-officedocument.presentationml.slide+xml':
        slidesLocArray.push(item['attrs']['PartName'].substr(1));
        break
      case 'application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml':
        slideLayoutsLocArray.push(item['attrs']['PartName'].substr(1));
        break
    }
  }
  
  const sortSlideXml = (p1, p2) => {
    const n1 = +/(\d+)\.xml/.exec(p1)[1];
    const n2 = +/(\d+)\.xml/.exec(p2)[1];
    return n1 - n2
  };
  slidesLocArray = slidesLocArray.sort(sortSlideXml);
  slideLayoutsLocArray = slideLayoutsLocArray.sort(sortSlideXml);
  
  return {
    slides: slidesLocArray,
    slideLayouts: slideLayoutsLocArray,
  }
}

async function getSlideInfo(zip) {
  const content = await readXmlFile(zip, 'ppt/presentation.xml');
  const sldSzAttrs = content['p:presentation']['p:sldSz']['attrs'];
  const defaultTextStyle = content['p:presentation']['p:defaultTextStyle'];
  return {
    width: parseInt(sldSzAttrs['cx']) * RATIO_EMUs_Points,
    height: parseInt(sldSzAttrs['cy']) * RATIO_EMUs_Points,
    defaultTextStyle,
  }
}

async function getTheme(zip) {
  const preResContent = await readXmlFile(zip, 'ppt/_rels/presentation.xml.rels');
  const relationshipArray = preResContent['Relationships']['Relationship'];
  let themeURI;

  if (relationshipArray.constructor === Array) {
    for (const relationshipItem of relationshipArray) {
      if (relationshipItem['attrs']['Type'] === 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme') {
        themeURI = relationshipItem['attrs']['Target'];
        break
      }
    }
  } 
  else if (relationshipArray['attrs']['Type'] === 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme') {
    themeURI = relationshipArray['attrs']['Target'];
  }

  const themeContent = await readXmlFile(zip, 'ppt/' + themeURI);

  const themeColors = [];
  const clrScheme = getTextByPathList(themeContent, ['a:theme', 'a:themeElements', 'a:clrScheme']);
  if (clrScheme) {
    for (let i = 1; i <= 6; i++) {
      if (clrScheme[`a:accent${i}`] === undefined) break
      const color = getTextByPathList(clrScheme, [`a:accent${i}`, 'a:srgbClr', 'attrs', 'val']);
      if (color) themeColors.push('#' + color);
    }
  }

  return { themeContent, themeColors }
}

async function processSingleSlide(zip, sldFileName, themeContent, defaultTextStyle) {
  const resName = sldFileName.replace('slides/slide', 'slides/_rels/slide') + '.rels';
  const resContent = await readXmlFile(zip, resName);
  let relationshipArray = resContent['Relationships']['Relationship'];
  if (relationshipArray.constructor !== Array) relationshipArray = [relationshipArray];
  
  let noteFilename = '';
  let layoutFilename = '';
  let masterFilename = '';
  let themeFilename = '';
  let diagramFilename = '';
  const diagramFiles = {};
  const slideResObj = {};
  const layoutResObj = {};
  const masterResObj = {};
  const themeResObj = {};
  const diagramResObj = {};

  for (const relationshipArrayItem of relationshipArray) {
    const relType = relationshipArrayItem['attrs']['Type'].replace('http://schemas.openxmlformats.org/officeDocument/2006/relationships/', '');
    let relTarget = relationshipArrayItem['attrs']['Target'];
    const isExternal = relationshipArrayItem['attrs']['TargetMode'] === 'External';
    if (!isExternal) {
      if (relTarget.indexOf('../') !== -1) relTarget = relTarget.replace('../', 'ppt/');
      else relTarget = 'ppt/slides/' + relTarget;
    }

    switch (relationshipArrayItem['attrs']['Type']) {
      case 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout':
        layoutFilename = relTarget;
        slideResObj[relationshipArrayItem['attrs']['Id']] = {
          type: relType,
          target: relTarget
        };
        break
      case 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/notesSlide':
        noteFilename = relTarget;
        slideResObj[relationshipArrayItem['attrs']['Id']] = {
          type: relType,
          target: relTarget
        };
        break
      case 'http://schemas.microsoft.com/office/2007/relationships/diagramDrawing':
        diagramFilename = relTarget;
        slideResObj[relationshipArrayItem['attrs']['Id']] = {
          type: relType,
          target: relTarget
        };
        break
      case 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/diagramData':
      case 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/diagramLayout':
      case 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/diagramQuickStyle':
      case 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/diagramColors':
        diagramFiles[relationshipArrayItem['attrs']['Id']] = relTarget;
        slideResObj[relationshipArrayItem['attrs']['Id']] = {
          type: relType,
          target: relTarget
        };
        break
      case 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/image':
      case 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart':
      case 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink':
      default:
        slideResObj[relationshipArrayItem['attrs']['Id']] = {
          type: relType,
          target: relTarget,
        };
    }
  }
  
  const slideNotesContent = await readXmlFile(zip, noteFilename);
  const note = getNote(slideNotesContent);

  const slideLayoutContent = await readXmlFile(zip, layoutFilename);
  const slideLayoutTables = await indexNodes(slideLayoutContent);
  const slideLayoutResFilename = layoutFilename.replace('slideLayouts/slideLayout', 'slideLayouts/_rels/slideLayout') + '.rels';
  const slideLayoutResContent = await readXmlFile(zip, slideLayoutResFilename);
  relationshipArray = slideLayoutResContent['Relationships']['Relationship'];
  if (relationshipArray.constructor !== Array) relationshipArray = [relationshipArray];

  for (const relationshipArrayItem of relationshipArray) {
    const relType = relationshipArrayItem['attrs']['Type'].replace('http://schemas.openxmlformats.org/officeDocument/2006/relationships/', '');
    let relTarget = relationshipArrayItem['attrs']['Target'];
    if (relTarget.indexOf('../') !== -1) relTarget = relTarget.replace('../', 'ppt/');
    else relTarget = 'ppt/slideLayouts/' + relTarget;

    switch (relationshipArrayItem['attrs']['Type']) {
      case 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster':
        masterFilename = relTarget;
        break
      default:
        layoutResObj[relationshipArrayItem['attrs']['Id']] = {
          type: relType,
          target: relTarget,
        };
    }
  }

  const slideMasterContent = await readXmlFile(zip, masterFilename);
  const slideMasterTextStyles = getTextByPathList(slideMasterContent, ['p:sldMaster', 'p:txStyles']);
  const slideMasterTables = indexNodes(slideMasterContent);
  const slideMasterResFilename = masterFilename.replace('slideMasters/slideMaster', 'slideMasters/_rels/slideMaster') + '.rels';
  const slideMasterResContent = await readXmlFile(zip, slideMasterResFilename);
  relationshipArray = slideMasterResContent['Relationships']['Relationship'];
  if (relationshipArray.constructor !== Array) relationshipArray = [relationshipArray];

  for (const relationshipArrayItem of relationshipArray) {
    const relType = relationshipArrayItem['attrs']['Type'].replace('http://schemas.openxmlformats.org/officeDocument/2006/relationships/', '');
    let relTarget = relationshipArrayItem['attrs']['Target'];
    if (relTarget.indexOf('../') !== -1) relTarget = relTarget.replace('../', 'ppt/');
    else relTarget = 'ppt/slideMasters/' + relTarget;

    switch (relationshipArrayItem['attrs']['Type']) {
      case 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme':
        themeFilename = relTarget;
        break
      default:
        masterResObj[relationshipArrayItem['attrs']['Id']] = {
          type: relType,
          target: relTarget,
        };
    }
  }

  if (themeFilename) {
    const themeName = themeFilename.split('/').pop();
    const themeResFileName = themeFilename.replace(themeName, '_rels/' + themeName) + '.rels';
    const themeResContent = await readXmlFile(zip, themeResFileName);
    if (themeResContent) {
      relationshipArray = themeResContent['Relationships']['Relationship'];
      if (relationshipArray) {
        if (relationshipArray.constructor !== Array) relationshipArray = [relationshipArray];
        for (const relationshipArrayItem of relationshipArray) {
          themeResObj[relationshipArrayItem['attrs']['Id']] = {
            'type': relationshipArrayItem['attrs']['Type'].replace('http://schemas.openxmlformats.org/officeDocument/2006/relationships/', ''),
            'target': relationshipArrayItem['attrs']['Target'].replace('../', 'ppt/')
          };
        }
      }
    }
  }

  const diagramContent = {
    data: null,
    layout: null,
    quickStyle: null,
    colors: null,
    drawing: null
  };
  let digramFileContent = {};
  if (diagramFilename) {
    const diagName = diagramFilename.split('/').pop();
    const diagramResFileName = diagramFilename.replace(diagName, '_rels/' + diagName) + '.rels';
    digramFileContent = await readXmlFile(zip, diagramFilename);
    if (digramFileContent) {
      const digramFileContentObjToStr = JSON.stringify(digramFileContent).replace(/dsp:/g, 'p:');
      digramFileContent = JSON.parse(digramFileContentObjToStr);
    }
    const digramResContent = await readXmlFile(zip, diagramResFileName);
    if (digramResContent) {
      relationshipArray = digramResContent['Relationships']['Relationship'];
      if (relationshipArray.constructor !== Array) relationshipArray = [relationshipArray];
      for (const relationshipArrayItem of relationshipArray) {
        diagramResObj[relationshipArrayItem['attrs']['Id']] = {
          'type': relationshipArrayItem['attrs']['Type'].replace('http://schemas.openxmlformats.org/officeDocument/2006/relationships/', ''),
          'target': relationshipArrayItem['attrs']['Target'].replace('../', 'ppt/')
        };
      }
    }
  }

  if (Object.values(diagramFiles).length > 0) {
    for (const filePath of Object.values(diagramFiles)) {
      const content = await readXmlFile(zip, filePath);
      if (filePath.includes('/data')) diagramContent.data = content;
      else if (filePath.includes('/layout')) diagramContent.layout = content;
      else if (filePath.includes('/quickStyle')) diagramContent.quickStyle = content;
      else if (filePath.includes('/colors')) diagramContent.colors = content;
    }
  }

  const tableStyles = await readXmlFile(zip, 'ppt/tableStyles.xml');

  const slideContent = await readXmlFile(zip, sldFileName);
  const nodes = slideContent['p:sld']['p:cSld']['p:spTree'];
  const warpObj = {
    zip,
    slideLayoutContent,
    slideLayoutTables,
    slideMasterContent,
    slideMasterTables,
    slideContent,
    tableStyles,
    slideResObj,
    slideMasterTextStyles,
    layoutResObj,
    masterResObj,
    themeContent,
    themeResObj,
    digramFileContent,
    diagramResObj,
    diagramContent,
    defaultTextStyle,
  };
  const layoutElements = await getLayoutElements(warpObj);
  const fill = await getSlideBackgroundFill(warpObj);

  const elements = [];
  for (const nodeKey in nodes) {
    if (nodes[nodeKey].constructor !== Array) nodes[nodeKey] = [nodes[nodeKey]];
    for (const node of nodes[nodeKey]) {
      const ret = await processNodesInSlide(nodeKey, node, warpObj, 'slide');
      if (ret) elements.push(ret);
    }
  }

  let transitionNode = findTransitionNode(slideContent, 'p:sld');
  if (!transitionNode) transitionNode = findTransitionNode(slideLayoutContent, 'p:sldLayout');
  if (!transitionNode) transitionNode = findTransitionNode(slideMasterContent, 'p:sldMaster');

  const transition = parseTransition(transitionNode);

  return {
    fill,
    elements,
    layoutElements,
    note,
    transition,
  }
}

function getHyperlinkFromCNvPr(cNvPr, warpObj) {
  const hlinkClick = getTextByPathList(cNvPr, ['a:hlinkClick', 'attrs']);
  if (!hlinkClick) return null

  const linkId = hlinkClick['r:id'];
  if (!linkId) return null

  const res = warpObj['slideResObj'][linkId];
  if (!res) return null

  if (res['type'] !== 'hyperlink') return null

  const target = res['target'];
  if (!target || !/^https?:\/\//.test(target)) return null

  return target
}

function getNote(noteContent) {
  let text = '';
  let spNodes = getTextByPathList(noteContent, ['p:notes', 'p:cSld', 'p:spTree', 'p:sp']);
  if (!spNodes) return ''

  if (spNodes.constructor !== Array) spNodes = [spNodes];
  for (const spNode of spNodes) {
    const phType = getTextByPathList(spNode, ['p:nvSpPr', 'p:nvPr', 'p:ph', 'attrs', 'type']);
    if (phType !== 'body') continue

    const textBody = getTextByPathList(spNode, ['p:txBody']);
    if (!textBody) continue

    let pNode = textBody['a:p'];
    if (!pNode) continue
    if (pNode.constructor !== Array) pNode = [pNode];

    const listTypes = [];

    for (const p of pNode) {
      const pPr = p['a:pPr'];
      const algn = getTextByPathList(pPr, ['attrs', 'algn']);
      let align = 'left';
      if (algn) {
        switch (algn) {
          case 'r': align = 'right'; break
          case 'ctr': align = 'center'; break
          case 'just': case 'dist': align = 'justify'; break
        }
      }

      let listType = '';
      if (pPr) {
        if (pPr['a:buChar']) listType = 'ul';
        else if (pPr['a:buAutoNum']) listType = 'ol';
      }
      const lvlNode = getTextByPathList(pPr, ['attrs', 'lvl']);
      const listLevel = lvlNode !== undefined ? parseInt(lvlNode) : 0;

      if (listType) {
        while (listTypes.length > listLevel + 1) {
          text += `</${listTypes.pop()}>`;
        }
        if (listTypes[listLevel] === undefined) {
          text += `<${listType}>`;
          listTypes[listLevel] = listType;
        }
        else if (listTypes[listLevel] !== listType) {
          text += `</${listTypes[listLevel]}>`;
          text += `<${listType}>`;
          listTypes[listLevel] = listType;
        }
        text += `<li style="text-align:${align};">`;
      }
      else {
        while (listTypes.length > 0) {
          text += `</${listTypes.pop()}>`;
        }
        text += `<p style="text-align:${align};">`;
      }

      let rNodes = p['a:r'];
      if (rNodes) {
        if (rNodes.constructor !== Array) rNodes = [rNodes];
        for (const r of rNodes) {
          const t = getTextByPathList(r, ['a:t']);
          if (t && typeof t === 'string') text += t;
        }
      }

      if (listType) text += '</li>';
      else text += '</p>';
    }
    while (listTypes.length > 0) {
      text += `</${listTypes.pop()}>`;
    }
  }
  return text
}

async function getLayoutElements(warpObj) {
  const elements = [];
  const slideLayoutContent = warpObj['slideLayoutContent'];
  const slideMasterContent = warpObj['slideMasterContent'];
  const nodesSldLayout = getTextByPathList(slideLayoutContent, ['p:sldLayout', 'p:cSld', 'p:spTree']);
  const nodesSldMaster = getTextByPathList(slideMasterContent, ['p:sldMaster', 'p:cSld', 'p:spTree']);

  const showMasterSp = getTextByPathList(slideLayoutContent, ['p:sldLayout', 'attrs', 'showMasterSp']);
  if (nodesSldLayout) {
    for (const nodeKey in nodesSldLayout) {
      if (nodesSldLayout[nodeKey].constructor === Array) {
        for (let i = 0; i < nodesSldLayout[nodeKey].length; i++) {
          const ph = getTextByPathList(nodesSldLayout[nodeKey][i], ['p:nvSpPr', 'p:nvPr', 'p:ph']);
          if (!ph) {
            const ret = await processNodesInSlide(nodeKey, nodesSldLayout[nodeKey][i], warpObj, 'slideLayoutBg');
            if (ret) elements.push(ret);
          }
        }
      } 
      else {
        const ph = getTextByPathList(nodesSldLayout[nodeKey], ['p:nvSpPr', 'p:nvPr', 'p:ph']);
        if (!ph) {
          const ret = await processNodesInSlide(nodeKey, nodesSldLayout[nodeKey], warpObj, 'slideLayoutBg');
          if (ret) elements.push(ret);
        }
      }
    }
  }
  if (nodesSldMaster && showMasterSp !== '0') {
    for (const nodeKey in nodesSldMaster) {
      if (nodesSldMaster[nodeKey].constructor === Array) {
        for (let i = 0; i < nodesSldMaster[nodeKey].length; i++) {
          const ph = getTextByPathList(nodesSldMaster[nodeKey][i], ['p:nvSpPr', 'p:nvPr', 'p:ph']);
          if (!ph) {
            const ret = await processNodesInSlide(nodeKey, nodesSldMaster[nodeKey][i], warpObj, 'slideMasterBg');
            if (ret) elements.push(ret);
          }
        }
      } 
      else {
        const ph = getTextByPathList(nodesSldMaster[nodeKey], ['p:nvSpPr', 'p:nvPr', 'p:ph']);
        if (!ph) {
          const ret = await processNodesInSlide(nodeKey, nodesSldMaster[nodeKey], warpObj, 'slideMasterBg');
          if (ret) elements.push(ret);
        }
      }
    }
  }
  return elements
}

function indexNodes(content) {
  const keys = Object.keys(content);
  const spTreeNode = content[keys[0]]['p:cSld']['p:spTree'];
  const idTable = {};
  const idxTable = {};
  const typeTable = {};

  for (const key in spTreeNode) {
    if (key === 'p:nvGrpSpPr' || key === 'p:grpSpPr') continue

    const targetNode = spTreeNode[key];

    if (targetNode.constructor === Array) {
      for (const targetNodeItem of targetNode) {
        const nvSpPrNode = targetNodeItem['p:nvSpPr'];
        const id = getTextByPathList(nvSpPrNode, ['p:cNvPr', 'attrs', 'id']);
        const idx = getTextByPathList(nvSpPrNode, ['p:nvPr', 'p:ph', 'attrs', 'idx']);
        const type = getTextByPathList(nvSpPrNode, ['p:nvPr', 'p:ph', 'attrs', 'type']);

        if (id) idTable[id] = targetNodeItem;
        if (idx) idxTable[idx] = targetNodeItem;
        if (type) typeTable[type] = targetNodeItem;
      }
    } 
    else {
      const nvSpPrNode = targetNode['p:nvSpPr'];
      const id = getTextByPathList(nvSpPrNode, ['p:cNvPr', 'attrs', 'id']);
      const idx = getTextByPathList(nvSpPrNode, ['p:nvPr', 'p:ph', 'attrs', 'idx']);
      const type = getTextByPathList(nvSpPrNode, ['p:nvPr', 'p:ph', 'attrs', 'type']);

      if (id) idTable[id] = targetNode;
      if (idx) idxTable[idx] = targetNode;
      if (type) typeTable[type] = targetNode;
    }
  }

  return { idTable, idxTable, typeTable }
}

async function processNodesInSlide(nodeKey, nodeValue, warpObj, source, groupHierarchy = []) {
  let json;

  switch (nodeKey) {
    case 'p:sp': // Shape, Text
      json = await processSpNode(nodeValue, warpObj, source, groupHierarchy);
      break
    case 'p:cxnSp': // Shape, Text
      json = await processCxnSpNode(nodeValue, warpObj, source);
      break
    case 'p:pic': // Image, Video, Audio
      json = await processPicNode(nodeValue, warpObj, source);
      break
    case 'p:graphicFrame': // Chart, Diagram, Table
      json = await processGraphicFrameNode(nodeValue, warpObj, source);
      break
    case 'p:grpSp':
      json = await processGroupSpNode(nodeValue, warpObj, source, groupHierarchy);
      break
    case 'mc:AlternateContent':
      if (getTextByPathList(nodeValue, ['mc:Fallback', 'p:grpSpPr', 'a:xfrm'])) {
        json = await processGroupSpNode(getTextByPathList(nodeValue, ['mc:Fallback']), warpObj, source, groupHierarchy);
      }
      else if (getTextByPathList(nodeValue, ['mc:Choice'])) {
        json = await processMathNode(nodeValue, warpObj, source);
      }
      break
  }

  return json
}

async function processMathNode(node, warpObj, source) {
  const choice = getTextByPathList(node, ['mc:Choice']);
  const fallback = getTextByPathList(node, ['mc:Fallback']);

  const order = node['attrs']['order'];
  const xfrmNode = getTextByPathList(choice, ['p:sp', 'p:spPr', 'a:xfrm']);
  const { top, left } = getPosition(xfrmNode, undefined, undefined);
  const { width, height } = getSize(xfrmNode, undefined, undefined);

  const oMath = findOMath(choice)[0];
  const latex = latexFormart(parseOMath(oMath));

  const blipFill = getTextByPathList(fallback, ['p:sp', 'p:spPr', 'a:blipFill']);
  const picBase64 = await getPicFill(source, blipFill, warpObj);

  // Math runs can be represented either as a single object or an array of m:r nodes.
  const findFirstNodeByTag = (value, tagName) => {
    if (!value || typeof value !== 'object') return null
    if (Array.isArray(value)) {
      for (const item of value) {
        const match = findFirstNodeByTag(item, tagName);
        if (match) return match
      }
      return null
    }
    if (value[tagName]) {
      const tagged = value[tagName];
      return Array.isArray(tagged) ? tagged[0] : tagged
    }
    for (const child of Object.values(value)) {
      const match = findFirstNodeByTag(child, tagName);
      if (match) return match
    }
    return null
  };

  // Prefer an explicit math run, but fall back to the paragraph end properties when needed.
  const mathRoot = getTextByPathList(choice, ['p:sp', 'p:txBody', 'a:p', 'a14:m']);
  const rPrNode = findFirstNodeByTag(mathRoot, 'a:rPr') || getTextByPathList(choice, ['p:sp', 'p:txBody', 'a:p', 'a:endParaRPr']);
  let mathColor;
  if (rPrNode) {
    let colorVal = getTextByPathList(rPrNode, ['a:solidFill', 'a:srgbClr', 'attrs', 'val']);
    if (!colorVal) {
      const schemeClr = getTextByPathList(rPrNode, ['a:solidFill', 'a:schemeClr', 'attrs', 'val']);
      if (schemeClr) colorVal = getSchemeColorFromTheme('a:' + schemeClr, warpObj);
    }
    if (colorVal) mathColor = `#${colorVal}`;
  }
  const mathFontSzRaw = rPrNode && getTextByPathList(rPrNode, ['attrs', 'sz']);
  const mathFontSize = mathFontSzRaw ? parseInt(mathFontSzRaw) / 100 : undefined;

  let text = '';
  if (getTextByPathList(choice, ['p:sp', 'p:txBody', 'a:p', 'a:r'])) {
    const sp = getTextByPathList(choice, ['p:sp']);
    text = genTextBody(sp['p:txBody'], sp, undefined, undefined, undefined, warpObj);
  }

  return {
    type: 'math',
    top,
    left,
    width,
    height,
    latex,
    picBase64,
    text,
    order,
    color: mathColor,
    fontSize: mathFontSize,
  }
}

async function processGroupSpNode(node, warpObj, source, parentGroupHierarchy = []) {
  const order = node['attrs']['order'];
  const xfrmNode = getTextByPathList(node, ['p:grpSpPr', 'a:xfrm']);
  if (!xfrmNode) return null

  const x = parseInt(xfrmNode['a:off']['attrs']['x']) * RATIO_EMUs_Points;
  const y = parseInt(xfrmNode['a:off']['attrs']['y']) * RATIO_EMUs_Points;
  const chx = parseInt(xfrmNode['a:chOff']['attrs']['x']) * RATIO_EMUs_Points;
  const chy = parseInt(xfrmNode['a:chOff']['attrs']['y']) * RATIO_EMUs_Points;
  const cx = parseInt(xfrmNode['a:ext']['attrs']['cx']) * RATIO_EMUs_Points;
  const cy = parseInt(xfrmNode['a:ext']['attrs']['cy']) * RATIO_EMUs_Points;
  const chcx = parseInt(xfrmNode['a:chExt']['attrs']['cx']) * RATIO_EMUs_Points;
  const chcy = parseInt(xfrmNode['a:chExt']['attrs']['cy']) * RATIO_EMUs_Points;

  const isFlipV = getTextByPathList(xfrmNode, ['attrs', 'flipV']) === '1';
  const isFlipH = getTextByPathList(xfrmNode, ['attrs', 'flipH']) === '1';

  let rotate = getTextByPathList(xfrmNode, ['attrs', 'rot']) || 0;
  if (rotate) rotate = angleToDegrees(rotate);

  // 计算缩放因子
  const ws = cx / chcx;
  const hs = cy / chcy;

  // 构建当前组合层级（将当前组合添加到父级层级中）
  const currentGroupHierarchy = [...parentGroupHierarchy, node];

  const elements = [];
  for (const nodeKey in node) {
    if (node[nodeKey].constructor === Array) {
      for (const item of node[nodeKey]) {
        const ret = await processNodesInSlide(nodeKey, item, warpObj, source, currentGroupHierarchy);
        if (ret) elements.push(ret);
      }
    }
    else {
      const ret = await processNodesInSlide(nodeKey, node[nodeKey], warpObj, source, currentGroupHierarchy);
      if (ret) elements.push(ret);
    }
  }

  const processedElements = elements.map(element => ({
    ...element,
    left: numberToFixed((element.left - chx) * ws),
    top: numberToFixed((element.top - chy) * hs),
    width: numberToFixed(element.width * ws),
    height: numberToFixed(element.height * hs),
    ...(element.type === 'group' && element.elements ? {
      elements: processNestedGroupElements(element.elements, ws, hs)
    } : {})
  }));

  function processNestedGroupElements(elements, ws, hs, depth = 0) {
    if (depth > 10) return elements

    return elements.map(element => {
      const processed = {
        ...element,
        width: numberToFixed(element.width * ws),
        height: numberToFixed(element.height * hs),
      };
      if (element.type === 'group' && element.elements) {
        processed.elements = processNestedGroupElements(element.elements, ws, hs, depth + 1);
      }
      return processed
    })
  }

  return {
    type: 'group',
    top: numberToFixed(y),
    left: numberToFixed(x),
    width: numberToFixed(cx),
    height: numberToFixed(cy),
    rotate,
    order,
    isFlipV,
    isFlipH,
    elements: processedElements,
  }
}

async function processSpNode(node, warpObj, source, groupHierarchy = []) {
  const cNvPr = getTextByPathList(node, ['p:nvSpPr', 'p:cNvPr']);
  const name = getTextByPathList(cNvPr, ['attrs', 'name']);
  const idx = getTextByPathList(node, ['p:nvSpPr', 'p:nvPr', 'p:ph', 'attrs', 'idx']);
  let type = getTextByPathList(node, ['p:nvSpPr', 'p:nvPr', 'p:ph', 'attrs', 'type']);
  const order = getTextByPathList(node, ['attrs', 'order']);

  let slideLayoutSpNode, slideMasterSpNode;

  if (type) {
    if (idx) {
      slideLayoutSpNode = warpObj['slideLayoutTables']['idxTable'][idx];
      slideMasterSpNode = warpObj['slideMasterTables']['idxTable'][idx];
      if (!slideLayoutSpNode) slideLayoutSpNode = warpObj['slideLayoutTables']['typeTable'][type];
      if (!slideMasterSpNode) slideMasterSpNode = warpObj['slideMasterTables']['typeTable'][type];
    }
    else {
      slideLayoutSpNode = warpObj['slideLayoutTables']['typeTable'][type];
      slideMasterSpNode = warpObj['slideMasterTables']['typeTable'][type];
    }
  }
  else if (idx) {
    slideLayoutSpNode = warpObj['slideLayoutTables']['idxTable'][idx];
    slideMasterSpNode = warpObj['slideMasterTables']['idxTable'][idx];
  }

  if (!type) {
    const txBoxVal = getTextByPathList(node, ['p:nvSpPr', 'p:cNvSpPr', 'attrs', 'txBox']);
    if (txBoxVal === '1') type = 'text';
  }
  if (!type) type = getTextByPathList(slideLayoutSpNode, ['p:nvSpPr', 'p:nvPr', 'p:ph', 'attrs', 'type']);
  if (!type) type = getTextByPathList(slideMasterSpNode, ['p:nvSpPr', 'p:nvPr', 'p:ph', 'attrs', 'type']);

  if (!type) {
    if (source === 'diagramBg') type = 'diagram';
    else type = 'obj';
  }

  const link = getHyperlinkFromCNvPr(cNvPr, warpObj);

  return await genShape(node, slideLayoutSpNode, slideMasterSpNode, name, type, order, warpObj, source, link, groupHierarchy)
}

async function processCxnSpNode(node, warpObj, source) {
  const cNvPr = getTextByPathList(node, ['p:nvCxnSpPr', 'p:cNvPr']);
  const name = getTextByPathList(cNvPr, ['attrs', 'name']);
  const type = (node['p:nvCxnSpPr']['p:nvPr']['p:ph'] === undefined) ? undefined : node['p:nvCxnSpPr']['p:nvPr']['p:ph']['attrs']['type'];
  const order = node['attrs']['order'];
  const link = getHyperlinkFromCNvPr(cNvPr, warpObj);

  return await genShape(node, undefined, undefined, name, type, order, warpObj, source, link)
}

async function genShape(node, slideLayoutSpNode, slideMasterSpNode, name, type, order, warpObj, source, link, groupHierarchy = []) {
  const xfrmList = ['p:spPr', 'a:xfrm'];
  const slideXfrmNode = getTextByPathList(node, xfrmList);
  const slideLayoutXfrmNode = getTextByPathList(slideLayoutSpNode, xfrmList);
  const slideMasterXfrmNode = getTextByPathList(slideMasterSpNode, xfrmList);

  const shapType = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'attrs', 'prst']);
  const custShapType = getTextByPathList(node, ['p:spPr', 'a:custGeom']);

  const keypoints = {};
  if (shapType) {
    const shapAdjst_ary = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'a:avLst', 'a:gd']);
    if (shapAdjst_ary) {
      const adjList = Array.isArray(shapAdjst_ary) ? shapAdjst_ary : [shapAdjst_ary];
      for (const adj of adjList) {
        const name = getTextByPathList(adj, ['attrs', 'name']);
        const fmla = getTextByPathList(adj, ['attrs', 'fmla']);
        if (name && fmla && fmla.startsWith('val ')) {
          keypoints[name] = parseInt(fmla.substring(4)) / 50000;
        }
      }
    }
  }

  const { top, left } = getPosition(slideXfrmNode, slideLayoutXfrmNode, slideMasterXfrmNode);
  const { width, height } = getSize(slideXfrmNode, slideLayoutXfrmNode, slideMasterXfrmNode);

  const isFlipV = getTextByPathList(slideXfrmNode, ['attrs', 'flipV']) === '1';
  const isFlipH = getTextByPathList(slideXfrmNode, ['attrs', 'flipH']) === '1';

  const rotate = angleToDegrees(getTextByPathList(slideXfrmNode, ['attrs', 'rot']));

  const txtXframeNode = getTextByPathList(node, ['p:txXfrm']);
  let txtRotate;
  if (txtXframeNode) {
    const txtXframeRot = getTextByPathList(txtXframeNode, ['attrs', 'rot']);
    if (txtXframeRot) txtRotate = angleToDegrees(txtXframeRot) + 90;
  } 
  else txtRotate = rotate;

  let content = '';
  if (node['p:txBody']) content = genTextBody(node['p:txBody'], node, slideLayoutSpNode, slideMasterSpNode, type, warpObj);

  const { borderColor, borderWidth, borderType, strokeDasharray } = getBorder(node, type, warpObj);
  const fill = await getShapeFill(node, warpObj, source, groupHierarchy);

  let shadow;
  const outerShdwNode = getTextByPathList(node, ['p:spPr', 'a:effectLst', 'a:outerShdw']);
  if (outerShdwNode) shadow = getShadow(outerShdwNode, warpObj);

  const vAlign = getVerticalAlign(node, slideLayoutSpNode, slideMasterSpNode);
  const isVertical = getTextByPathList(node, ['p:txBody', 'a:bodyPr', 'attrs', 'vert']) === 'eaVert';
  const autoFit = getTextAutoFit(node, slideLayoutSpNode, slideMasterSpNode);

  const data = {
    left,
    top,
    width,
    height,
    borderColor,
    borderWidth,
    borderType,
    borderStrokeDasharray: strokeDasharray,
    fill,
    content,
    isFlipV,
    isFlipH,
    rotate,
    vAlign,
    name,
    order,
  };

  if (shadow) data.shadow = shadow;
  if (autoFit) data.autoFit = autoFit;
  if (link) data.link = link;

  const isHasValidText = data.content && hasValidText(data.content);

  if (custShapType && type !== 'diagram') {
    const ext = getTextByPathList(slideXfrmNode, ['a:ext', 'attrs']);
    const w = parseInt(ext['cx']) * RATIO_EMUs_Points;
    const h = parseInt(ext['cy']) * RATIO_EMUs_Points;
    const d = getCustomShapePath(custShapType, w, h);
    if (!isHasValidText) data.content = '';

    return {
      ...data,
      type: 'shape',
      shapType: 'custom',
      path: d,
    }
  }

  let shapePath = '';
  if (shapType) shapePath = getShapePath(shapType, width, height, node);

  if (shapType && (type === 'obj' || !type || shapType !== 'rect')) {
    if (!isHasValidText) data.content = '';
    return {
      ...data,
      type: 'shape',
      shapType,
      path: shapePath,
      keypoints,
    }
  }
  if (shapType && !isHasValidText && (fill || borderWidth)) {
    return {
      ...data,
      type: 'shape',
      content: '',
      shapType,
      path: shapePath,
      keypoints,
    }
  }
  return {
    ...data,
    type: 'text',
    isVertical,
    rotate: txtRotate,
  }
}

async function processPicNode(node, warpObj, source) {
  let resObj;
  if (source === 'slideMasterBg') resObj = warpObj['masterResObj'];
  else if (source === 'slideLayoutBg') resObj = warpObj['layoutResObj'];
  else resObj = warpObj['slideResObj'];

  const cNvPr = getTextByPathList(node, ['p:nvPicPr', 'p:cNvPr']);
  const link = getHyperlinkFromCNvPr(cNvPr, warpObj);
  const order = node['attrs']['order'];
  
  const rid = node['p:blipFill']['a:blip']['attrs']['r:embed'];
  const imgName = resObj[rid]['target'];
  const imgFileExt = extractFileExtension(imgName).toLowerCase();
  const zip = warpObj['zip'];
  const imgArrayBuffer = await zip.file(imgName).async('arraybuffer');

  let xfrmNode = node['p:spPr']['a:xfrm'];
  if (!xfrmNode) {
    const idx = getTextByPathList(node, ['p:nvPicPr', 'p:nvPr', 'p:ph', 'attrs', 'idx']);
    if (idx) xfrmNode = getTextByPathList(warpObj['slideLayoutTables'], ['idxTable', idx, 'p:spPr', 'a:xfrm']);
  }

  const mimeType = getMimeType(imgFileExt);
  const { top, left } = getPosition(xfrmNode, undefined, undefined);
  const { width, height } = getSize(xfrmNode, undefined, undefined);
  const src = `data:${mimeType};base64,${base64ArrayBuffer(imgArrayBuffer)}`;

  const svgRid = getTextByPathList(node, ['p:blipFill', 'a:blip', 'a:extLst', 'a:ext', 'asvg:svgBlip', 'attrs', 'r:embed']);
  let svgSrc;
  if (svgRid && resObj[svgRid]) {
    const svgName = resObj[svgRid]['target'];
    const svgArrayBuffer = await zip.file(svgName).async('arraybuffer');
    svgSrc = `data:image/svg+xml;base64,${base64ArrayBuffer(svgArrayBuffer)}`;
  }

  const isFlipV = getTextByPathList(xfrmNode, ['attrs', 'flipV']) === '1';
  const isFlipH = getTextByPathList(xfrmNode, ['attrs', 'flipH']) === '1';

  let rotate = 0;
  const rotateNode = getTextByPathList(node, ['p:spPr', 'a:xfrm', 'attrs', 'rot']);
  if (rotateNode) rotate = angleToDegrees(rotateNode);

  const videoNode = getTextByPathList(node, ['p:nvPicPr', 'p:nvPr', 'a:videoFile']);
  let videoRid, videoFile, videoFileExt, videoMimeType, uInt8ArrayVideo, videoBlob;
  let isVdeoLink = false;

  if (videoNode) {
    videoRid = videoNode['attrs']['r:link'];
    videoFile = resObj[videoRid]['target'];
    if (isVideoLink(videoFile)) {
      videoFile = escapeHtml(videoFile);
      isVdeoLink = true;
    } 
    else {
      videoFileExt = extractFileExtension(videoFile).toLowerCase();
      if (videoFileExt === 'mp4' || videoFileExt === 'webm' || videoFileExt === 'ogg') {
        uInt8ArrayVideo = await zip.file(videoFile).async('arraybuffer');
        videoMimeType = getMimeType(videoFileExt);
        videoBlob = URL.createObjectURL(new Blob([uInt8ArrayVideo], {
          type: videoMimeType
        }));
      }
    }
  }

  const audioNode = getTextByPathList(node, ['p:nvPicPr', 'p:nvPr', 'a:audioFile']);
  let audioRid, audioFile, audioFileExt, uInt8ArrayAudio, audioBlob;
  if (audioNode) {
    audioRid = audioNode['attrs']['r:link'];
    audioFile = resObj[audioRid]['target'];
    audioFileExt = extractFileExtension(audioFile).toLowerCase();
    if (audioFileExt === 'mp3' || audioFileExt === 'wav' || audioFileExt === 'ogg') {
      uInt8ArrayAudio = await zip.file(audioFile).async('arraybuffer');
      audioBlob = URL.createObjectURL(new Blob([uInt8ArrayAudio]));
    }
  }

  if (videoNode && !isVdeoLink) {
    return {
      type: 'video',
      top,
      left,
      width, 
      height,
      rotate,
      blob: videoBlob,
      order,
    }
  } 
  if (videoNode && isVdeoLink) {
    return {
      type: 'video',
      top,
      left,
      width, 
      height,
      rotate,
      src: videoFile,
      order,
    }
  }
  if (audioNode) {
    return {
      type: 'audio',
      top,
      left,
      width, 
      height,
      rotate,
      blob: audioBlob,
      order,
    }
  }

  let rect;
  const srcRectAttrs = getTextByPathList(node, ['p:blipFill', 'a:srcRect', 'attrs']);
  if (srcRectAttrs && (srcRectAttrs.t || srcRectAttrs.b || srcRectAttrs.l || srcRectAttrs.r)) {
    rect = {};
    if (srcRectAttrs.t) rect.t = srcRectAttrs.t / 1000;
    if (srcRectAttrs.b) rect.b = srcRectAttrs.b / 1000;
    if (srcRectAttrs.l) rect.l = srcRectAttrs.l / 1000;
    if (srcRectAttrs.r) rect.r = srcRectAttrs.r / 1000;
  }
  let geom = 'rect';
  const prstGeom = getTextByPathList(node, ['p:spPr', 'a:prstGeom', 'attrs', 'prst']);
  const custGeom = getTextByPathList(node, ['p:spPr', 'a:custGeom']);

  if (prstGeom) {
    geom = prstGeom;
  }
  else if (custGeom) {
    geom = identifyShape(custGeom);
    if (geom !== 'custom') geom = `custom:${geom}`;
  }

  const { borderColor, borderWidth, borderType, strokeDasharray } = getBorder(node, undefined, warpObj);

  const filters = getPicFilters(node['p:blipFill']);

  const imageData = {
    type: 'image',
    top,
    left,
    width,
    height,
    rotate,
    src,
    isFlipV,
    isFlipH,
    order,
    rect,
    geom,
    borderColor,
    borderWidth,
    borderType,
    borderStrokeDasharray: strokeDasharray,
  };

  if (svgSrc) imageData.svgSrc = svgSrc;
  if (filters) imageData.filters = filters;
  if (link) imageData.link = link;

  return imageData
}

async function processGraphicFrameNode(node, warpObj, source) {
  const graphicTypeUri = getTextByPathList(node, ['a:graphic', 'a:graphicData', 'attrs', 'uri']);
  
  let result;
  switch (graphicTypeUri) {
    case 'http://schemas.openxmlformats.org/drawingml/2006/table':
      result = await genTable(node, warpObj);
      break
    case 'http://schemas.openxmlformats.org/drawingml/2006/chart':
      result = await genChart(node, warpObj);
      break
    case 'http://schemas.openxmlformats.org/drawingml/2006/diagram':
      result = await genDiagram(node, warpObj);
      break
    case 'http://schemas.openxmlformats.org/presentationml/2006/ole':
      let oleObjNode = getTextByPathList(node, ['a:graphic', 'a:graphicData', 'mc:AlternateContent', 'mc:Fallback', 'p:oleObj']);
      if (!oleObjNode) oleObjNode = getTextByPathList(node, ['a:graphic', 'a:graphicData', 'p:oleObj']);
      if (oleObjNode) result = await processGroupSpNode(oleObjNode, warpObj, source);
      break
  }
  return result
}

async function genTable(node, warpObj) {
  const order = node['attrs']['order'];
  const tableNode = getTextByPathList(node, ['a:graphic', 'a:graphicData', 'a:tbl']);
  const xfrmNode = getTextByPathList(node, ['p:xfrm']);
  const { top, left } = getPosition(xfrmNode, undefined, undefined);
  const { width, height } = getSize(xfrmNode, undefined, undefined);

  const getTblPr = getTextByPathList(node, ['a:graphic', 'a:graphicData', 'a:tbl', 'a:tblPr']);
  let getColsGrid = getTextByPathList(node, ['a:graphic', 'a:graphicData', 'a:tbl', 'a:tblGrid', 'a:gridCol']);
  if (getColsGrid.constructor !== Array) getColsGrid = [getColsGrid];

  const colWidths = [];
  if (getColsGrid) {
    for (const item of getColsGrid) {
      const colWidthParam = getTextByPathList(item, ['attrs', 'w']) || 0;
      const colWidth = parseInt(colWidthParam) * RATIO_EMUs_Points;
      colWidths.push(colWidth);
    }
  }

  const firstRowAttr = getTblPr['attrs'] ? getTblPr['attrs']['firstRow'] : undefined;
  const firstColAttr = getTblPr['attrs'] ? getTblPr['attrs']['firstCol'] : undefined;
  const lastRowAttr = getTblPr['attrs'] ? getTblPr['attrs']['lastRow'] : undefined;
  const lastColAttr = getTblPr['attrs'] ? getTblPr['attrs']['lastCol'] : undefined;
  const bandRowAttr = getTblPr['attrs'] ? getTblPr['attrs']['bandRow'] : undefined;
  const bandColAttr = getTblPr['attrs'] ? getTblPr['attrs']['bandCol'] : undefined;
  const tblStylAttrObj = {
    isFrstRowAttr: (firstRowAttr && firstRowAttr === '1') ? 1 : 0,
    isFrstColAttr: (firstColAttr && firstColAttr === '1') ? 1 : 0,
    isLstRowAttr: (lastRowAttr && lastRowAttr === '1') ? 1 : 0,
    isLstColAttr: (lastColAttr && lastColAttr === '1') ? 1 : 0,
    isBandRowAttr: (bandRowAttr && bandRowAttr === '1') ? 1 : 0,
    isBandColAttr: (bandColAttr && bandColAttr === '1') ? 1 : 0,
  };

  let thisTblStyle;
  const tbleStyleId = getTblPr['a:tableStyleId'];
  if (tbleStyleId) {
    const tbleStylList = warpObj['tableStyles']['a:tblStyleLst']['a:tblStyle'];
    if (tbleStylList) {
      if (tbleStylList.constructor === Array) {
        for (let k = 0; k < tbleStylList.length; k++) {
          if (tbleStylList[k]['attrs']['styleId'] === tbleStyleId) {
            thisTblStyle = tbleStylList[k];
          }
        }
      } 
      else {
        if (tbleStylList['attrs']['styleId'] === tbleStyleId) {
          thisTblStyle = tbleStylList;
        }
      }
    }
  }
  if (thisTblStyle) thisTblStyle['tblStylAttrObj'] = tblStylAttrObj;

  let borders = {};
  const tblStyl = getTextByPathList(thisTblStyle, ['a:wholeTbl', 'a:tcStyle']);
  const tblBorderStyl = getTextByPathList(tblStyl, ['a:tcBdr']);
  if (tblBorderStyl) borders = getTableBorders(tblBorderStyl, warpObj);

  let tbl_bgcolor = '';
  let tbl_bgFillschemeClr = getTextByPathList(thisTblStyle, ['a:tblBg', 'a:fillRef']);
  if (tbl_bgFillschemeClr) {
    tbl_bgcolor = getSolidFill(tbl_bgFillschemeClr, undefined, undefined, warpObj);
  }
  if (tbl_bgFillschemeClr === undefined) {
    tbl_bgFillschemeClr = getTextByPathList(thisTblStyle, ['a:wholeTbl', 'a:tcStyle', 'a:fill', 'a:solidFill']);
    tbl_bgcolor = getSolidFill(tbl_bgFillschemeClr, undefined, undefined, warpObj);
  }

  let trNodes = tableNode['a:tr'];
  if (trNodes.constructor !== Array) trNodes = [trNodes];
  
  const data = [];
  const rowHeights = [];
  for (let i = 0; i < trNodes.length; i++) {
    const trNode = trNodes[i];
    
    const rowHeightParam = getTextByPathList(trNodes[i], ['attrs', 'h']) || 0;
    const rowHeight = parseInt(rowHeightParam) * RATIO_EMUs_Points;
    rowHeights.push(rowHeight);

    const {
      fillColor,
      fontColor,
      fontBold,
    } = getTableRowParams(trNodes, i, tblStylAttrObj, thisTblStyle, warpObj);

    const tcNodes = trNode['a:tc'];
    const tr = [];

    if (tcNodes.constructor === Array) {
      for (let j = 0; j < tcNodes.length; j++) {
        const tcNode = tcNodes[j];
        let a_sorce;
        if (j === 0 && tblStylAttrObj['isFrstColAttr'] === 1) {
          a_sorce = 'a:firstCol';
          if (tblStylAttrObj['isLstRowAttr'] === 1 && i === (trNodes.length - 1) && getTextByPathList(thisTblStyle, ['a:seCell'])) {
            a_sorce = 'a:seCell';
          } 
          else if (tblStylAttrObj['isFrstRowAttr'] === 1 && i === 0 &&
            getTextByPathList(thisTblStyle, ['a:neCell'])) {
            a_sorce = 'a:neCell';
          }
        } 
        else if (
          (j > 0 && tblStylAttrObj['isBandColAttr'] === 1) &&
          !(tblStylAttrObj['isFrstColAttr'] === 1 && i === 0) &&
          !(tblStylAttrObj['isLstRowAttr'] === 1 && i === (trNodes.length - 1)) &&
          j !== (tcNodes.length - 1)
        ) {
          if ((j % 2) !== 0) {
            let aBandNode = getTextByPathList(thisTblStyle, ['a:band2V']);
            if (aBandNode === undefined) {
              aBandNode = getTextByPathList(thisTblStyle, ['a:band1V']);
              if (aBandNode) a_sorce = 'a:band2V';
            } 
            else a_sorce = 'a:band2V';
          }
        }
        if (j === (tcNodes.length - 1) && tblStylAttrObj['isLstColAttr'] === 1) {
          a_sorce = 'a:lastCol';
          if (tblStylAttrObj['isLstRowAttr'] === 1 && i === (trNodes.length - 1) && getTextByPathList(thisTblStyle, ['a:swCell'])) {
            a_sorce = 'a:swCell';
          } 
          else if (tblStylAttrObj['isFrstRowAttr'] === 1 && i === 0 && getTextByPathList(thisTblStyle, ['a:nwCell'])) {
            a_sorce = 'a:nwCell';
          }
        }
        const text = genTextBody(tcNode['a:txBody'], tcNode, undefined, undefined, undefined, warpObj);
        const cell = await getTableCellParams(tcNode, thisTblStyle, a_sorce, warpObj);
        const td = { text };
        if (cell.rowSpan) td.rowSpan = cell.rowSpan;
        if (cell.colSpan) td.colSpan = cell.colSpan;
        if (cell.vMerge) td.vMerge = cell.vMerge;
        if (cell.hMerge) td.hMerge = cell.hMerge;
        if (cell.fontBold || fontBold) td.fontBold = cell.fontBold || fontBold;
        if (cell.fontColor || fontColor) td.fontColor = cell.fontColor || fontColor;
        if (cell.fillColor || fillColor || tbl_bgcolor) td.fillColor = cell.fillColor || fillColor || tbl_bgcolor;
        if (cell.borders) td.borders = cell.borders;

        tr.push(td);
      }
    } 
    else {
      let a_sorce;
      if (tblStylAttrObj['isFrstColAttr'] === 1 && tblStylAttrObj['isLstRowAttr'] !== 1) {
        a_sorce = 'a:firstCol';
      } 
      else if (tblStylAttrObj['isBandColAttr'] === 1 && tblStylAttrObj['isLstRowAttr'] !== 1) {
        let aBandNode = getTextByPathList(thisTblStyle, ['a:band2V']);
        if (!aBandNode) {
          aBandNode = getTextByPathList(thisTblStyle, ['a:band1V']);
          if (aBandNode) a_sorce = 'a:band2V';
        } 
        else a_sorce = 'a:band2V';
      }
      if (tblStylAttrObj['isLstColAttr'] === 1 && tblStylAttrObj['isLstRowAttr'] !== 1) {
        a_sorce = 'a:lastCol';
      }

      const text = genTextBody(tcNodes['a:txBody'], tcNodes, undefined, undefined, undefined, warpObj);
      const cell = await getTableCellParams(tcNodes, thisTblStyle, a_sorce, warpObj);
      const td = { text };
      if (cell.rowSpan) td.rowSpan = cell.rowSpan;
      if (cell.colSpan) td.colSpan = cell.colSpan;
      if (cell.vMerge) td.vMerge = cell.vMerge;
      if (cell.hMerge) td.hMerge = cell.hMerge;
      if (cell.fontBold || fontBold) td.fontBold = cell.fontBold || fontBold;
      if (cell.fontColor || fontColor) td.fontColor = cell.fontColor || fontColor;
      if (cell.fillColor || fillColor || tbl_bgcolor) td.fillColor = cell.fillColor || fillColor || tbl_bgcolor;
      if (cell.borders) td.borders = cell.borders;

      tr.push(td);
    }
    data.push(tr);
  }

  let actualTableWidth = colWidths.reduce((sum, width) => sum + width, 0);
  if (actualTableWidth) actualTableWidth = numberToFixed(actualTableWidth);

  return {
    type: 'table',
    top,
    left,
    width: actualTableWidth || width,
    height,
    data,
    order,
    borders,
    rowHeights,
    colWidths,
  }
}

async function genChart(node, warpObj) {
  const order = node['attrs']['order'];
  const xfrmNode = getTextByPathList(node, ['p:xfrm']);
  const { top, left } = getPosition(xfrmNode, undefined, undefined);
  const { width, height } = getSize(xfrmNode, undefined, undefined);

  const rid = node['a:graphic']['a:graphicData']['c:chart']['attrs']['r:id'];
  let refName = getTextByPathList(warpObj['slideResObj'], [rid, 'target']);
  if (!refName) refName = getTextByPathList(warpObj['layoutResObj'], [rid, 'target']);
  if (!refName) refName = getTextByPathList(warpObj['masterResObj'], [rid, 'target']);
  if (!refName) return {}

  const content = await readXmlFile(warpObj['zip'], refName);
  const plotArea = getTextByPathList(content, ['c:chartSpace', 'c:chart', 'c:plotArea']);

  const chart = getChartInfo(plotArea, warpObj);

  if (!chart) return {}

  const data = {
    type: 'chart',
    top,
    left,
    width,
    height,
    data: chart.data,
    colors: chart.colors,
    chartType: chart.type,
    order,
  };
  if (chart.marker !== undefined) data.marker = chart.marker;
  if (chart.barDir !== undefined) data.barDir = chart.barDir;
  if (chart.holeSize !== undefined) data.holeSize = chart.holeSize;
  if (chart.grouping !== undefined) data.grouping = chart.grouping;
  if (chart.style !== undefined) data.style = chart.style;

  return data
}

async function genDiagram(node, warpObj) {
  const order = node['attrs']['order'];
  const xfrmNode = getTextByPathList(node, ['p:xfrm']);
  const { left, top } = getPosition(xfrmNode, undefined, undefined);
  const { width, height } = getSize(xfrmNode, undefined, undefined);
  
  const dgmDrwSpArray = getTextByPathList(warpObj['digramFileContent'], ['p:drawing', 'p:spTree', 'p:sp']);
  const elements = [];
  let textList = [];
  if (dgmDrwSpArray) {
    const spList = Array.isArray(dgmDrwSpArray) ? dgmDrwSpArray : [dgmDrwSpArray];

    for (const item of spList) {
      const el = await processSpNode(item, warpObj, 'diagramBg');
      if (el) elements.push(el);
    }
  }
  else if (warpObj.diagramContent && warpObj.diagramContent.data) {
    textList = getSmartArtTextData(warpObj.diagramContent.data);
  }

  return {
    type: 'diagram',
    left,
    top,
    width,
    height,
    elements,
    textList,
    order,
  }
}

const XCOLOR_BASE_COLORS = [
    { name: "black", rgb: [0, 0, 0] },
    { name: "darkgray", rgb: [64, 64, 64] },
    { name: "gray", rgb: [128, 128, 128] },
    { name: "lightgray", rgb: [191, 191, 191] },
    { name: "white", rgb: [255, 255, 255] },
    { name: "red", rgb: [255, 0, 0] },
    { name: "green", rgb: [0, 255, 0] },
    { name: "blue", rgb: [0, 0, 255] },
    { name: "cyan", rgb: [0, 255, 255] },
    { name: "magenta", rgb: [255, 0, 255] },
    { name: "yellow", rgb: [255, 255, 0] },
    { name: "lime", rgb: [191, 255, 0] },
    { name: "olive", rgb: [128, 128, 0] },
    { name: "orange", rgb: [255, 128, 0] },
    { name: "pink", rgb: [255, 191, 191] },
    { name: "teal", rgb: [0, 128, 128] },
    { name: "violet", rgb: [128, 0, 128] },
    { name: "purple", rgb: [191, 0, 64] },
    { name: "brown", rgb: [191, 128, 64] }
];
const WHITE_INDEX = XCOLOR_BASE_COLORS.findIndex((entry) => entry.name === "white");
const COLOR_COUNT = XCOLOR_BASE_COLORS.length;
const COLOR_R = XCOLOR_BASE_COLORS.map((entry) => entry.rgb[0]);
const COLOR_G = XCOLOR_BASE_COLORS.map((entry) => entry.rgb[1]);
const COLOR_B = XCOLOR_BASE_COLORS.map((entry) => entry.rgb[2]);
const NAME_LENGTHS = XCOLOR_BASE_COLORS.map((entry) => entry.name.length);
Array.from({ length: 101 }, (_, value) => String(value).length);
const TWO_MIX_MIN_Y = 0.0001;
const ZERO_DETERMINANT_EPSILON = 1e-9;
const FAST_MODE_DEFAULTS = {
    drag: {
        depth1Radius: 3,
        depth2P2Radius: 2,
        depth2P1Radius: 2
    },
    release: {
        depth1Radius: 4,
        depth2P2Radius: 3,
        depth2P1Radius: 3
    }
};
const PAIR_COUNT = COLOR_COUNT * COLOR_COUNT;
const PAIR_DX = new Float64Array(PAIR_COUNT);
const PAIR_DY = new Float64Array(PAIR_COUNT);
const PAIR_DZ = new Float64Array(PAIR_COUNT);
const PAIR_INV_DEN = new Float64Array(PAIR_COUNT);
const TRIPLE_COUNT = COLOR_COUNT * COLOR_COUNT * COLOR_COUNT;
const TRIPLE_A = new Uint8Array(TRIPLE_COUNT);
const TRIPLE_B = new Uint8Array(TRIPLE_COUNT);
const TRIPLE_C = new Uint8Array(TRIPLE_COUNT);
const TRIPLE_UX = new Float64Array(TRIPLE_COUNT);
const TRIPLE_UY = new Float64Array(TRIPLE_COUNT);
const TRIPLE_UZ = new Float64Array(TRIPLE_COUNT);
const TRIPLE_VX = new Float64Array(TRIPLE_COUNT);
const TRIPLE_VY = new Float64Array(TRIPLE_COUNT);
const TRIPLE_VZ = new Float64Array(TRIPLE_COUNT);
const TRIPLE_UU = new Float64Array(TRIPLE_COUNT);
const TRIPLE_UV = new Float64Array(TRIPLE_COUNT);
const TRIPLE_VV = new Float64Array(TRIPLE_COUNT);
const TRIPLE_INV_DET = new Float64Array(TRIPLE_COUNT);
const TRIPLE_CAN_SOLVE = new Uint8Array(TRIPLE_COUNT);
initializeProjectionTables();
function initializeProjectionTables() {
    for (let baseIndex = 0; baseIndex < COLOR_COUNT; baseIndex += 1) {
        for (let mixIndex = 0; mixIndex < COLOR_COUNT; mixIndex += 1) {
            const pairIndex = baseIndex * COLOR_COUNT + mixIndex;
            const dx = COLOR_R[baseIndex] - COLOR_R[mixIndex];
            const dy = COLOR_G[baseIndex] - COLOR_G[mixIndex];
            const dz = COLOR_B[baseIndex] - COLOR_B[mixIndex];
            const denominator = dx * dx + dy * dy + dz * dz;
            PAIR_DX[pairIndex] = dx;
            PAIR_DY[pairIndex] = dy;
            PAIR_DZ[pairIndex] = dz;
            PAIR_INV_DEN[pairIndex] = denominator > 0 ? 1 / denominator : 0;
        }
    }
    let tripleIndex = 0;
    for (let a = 0; a < COLOR_COUNT; a += 1) {
        for (let b = 0; b < COLOR_COUNT; b += 1) {
            for (let c = 0; c < COLOR_COUNT; c += 1) {
                TRIPLE_A[tripleIndex] = a;
                TRIPLE_B[tripleIndex] = b;
                TRIPLE_C[tripleIndex] = c;
                const ux = COLOR_R[b] - COLOR_R[c];
                const uy = COLOR_G[b] - COLOR_G[c];
                const uz = COLOR_B[b] - COLOR_B[c];
                const vx = COLOR_R[a] - COLOR_R[b];
                const vy = COLOR_G[a] - COLOR_G[b];
                const vz = COLOR_B[a] - COLOR_B[b];
                TRIPLE_UX[tripleIndex] = ux;
                TRIPLE_UY[tripleIndex] = uy;
                TRIPLE_UZ[tripleIndex] = uz;
                TRIPLE_VX[tripleIndex] = vx;
                TRIPLE_VY[tripleIndex] = vy;
                TRIPLE_VZ[tripleIndex] = vz;
                const uu = ux * ux + uy * uy + uz * uz;
                const uv = ux * vx + uy * vy + uz * vz;
                const vv = vx * vx + vy * vy + vz * vz;
                const determinant = uu * vv - uv * uv;
                TRIPLE_UU[tripleIndex] = uu;
                TRIPLE_UV[tripleIndex] = uv;
                TRIPLE_VV[tripleIndex] = vv;
                if (Math.abs(determinant) > ZERO_DETERMINANT_EPSILON) {
                    TRIPLE_INV_DET[tripleIndex] = 1 / determinant;
                    TRIPLE_CAN_SOLVE[tripleIndex] = 1;
                }
                tripleIndex += 1;
            }
        }
    }
}
function clampByte(value) {
    if (value <= 0) {
        return 0;
    }
    if (value >= 255) {
        return 255;
    }
    return Math.round(value);
}
function clamp01(value) {
    if (value <= 0) {
        return 0;
    }
    if (value >= 1) {
        return 1;
    }
    return value;
}
function clampInteger(value, min, max) {
    if (value < min) {
        return min;
    }
    if (value > max) {
        return max;
    }
    return value;
}
function roundToPercent(value01) {
    return clampInteger(Math.round(value01 * 100), 1, 99);
}
function formatPercentage(value) {
    if (!Number.isFinite(value)) {
        return "0";
    }
    const clamped = Math.max(0, Math.min(100, value));
    if (Math.abs(clamped - Math.round(clamped)) < 1e-9) {
        return String(Math.round(clamped));
    }
    return clamped.toFixed(6).replace(/\.?0+$/, "");
}
function roundPercentage(value, decimals) {
    const factor = 10 ** decimals;
    const rounded = Math.round(value * factor) / factor;
    if (rounded <= 0) {
        return 0;
    }
    if (rounded >= 100) {
        return 100;
    }
    return rounded;
}
function normalizeTargetRgb(input) {
    return [clampByte(input.r), clampByte(input.g), clampByte(input.b)];
}
function normalizeRadius(raw, fallback) {
    if (!Number.isFinite(raw)) {
        return fallback;
    }
    return clampInteger(Math.round(raw), 0, 50);
}
function normalizeFastConfig(options) {
    const mode = options.mode === "release" ? "release" : "drag";
    const defaults = FAST_MODE_DEFAULTS[mode];
    const threeMixWhiteTail = options.threeMixWhiteTail === true;
    return {
        mode,
        threeMixWhiteTail,
        exact: options.exact === true || threeMixWhiteTail,
        depth1Radius: normalizeRadius(options.depth1Radius, defaults.depth1Radius),
        depth2P2Radius: normalizeRadius(options.depth2P2Radius, defaults.depth2P2Radius),
        depth2P1Radius: normalizeRadius(options.depth2P1Radius, defaults.depth2P1Radius)
    };
}
function isLexicographicallyBetter(baseIndex, p1, c1, p2, c2, bestBaseIndex, bestP1, bestC1, bestP2, bestC2, p3 = -1, c3 = -1, bestP3 = -1, bestC3 = -1) {
    if (baseIndex !== bestBaseIndex) {
        return baseIndex < bestBaseIndex;
    }
    if (p1 !== bestP1) {
        return p1 < bestP1;
    }
    if (c1 !== bestC1) {
        return c1 < bestC1;
    }
    if (p2 !== bestP2) {
        return p2 < bestP2;
    }
    if (c2 !== bestC2) {
        return c2 < bestC2;
    }
    if (p3 !== bestP3) {
        return p3 < bestP3;
    }
    return c3 < bestC3;
}
function expressionLength(baseIndex, p1, c1, p2, c2, p3 = -1, c3 = -1) {
    let length = NAME_LENGTHS[baseIndex];
    if (p1 >= 0) {
        length += 1 + formatPercentage(p1).length;
        const omitFirstMixColor = c1 === WHITE_INDEX && p2 < 0;
        if (!omitFirstMixColor) {
            length += 1 + NAME_LENGTHS[c1];
        }
    }
    if (p2 >= 0) {
        length += 1 + formatPercentage(p2).length;
        const omitSecondMixColor = c2 === WHITE_INDEX && p3 < 0;
        if (!omitSecondMixColor) {
            length += 1 + NAME_LENGTHS[c2];
        }
    }
    if (p3 >= 0) {
        length += 1 + formatPercentage(p3).length;
        if (c3 !== WHITE_INDEX) {
            length += 1 + NAME_LENGTHS[c3];
        }
    }
    return length;
}
function renderExpression(baseIndex, p1, c1, p2, c2, p3 = -1, c3 = -1) {
    let expression = XCOLOR_BASE_COLORS[baseIndex].name;
    if (p1 >= 0 && c1 >= 0) {
        expression += `!${formatPercentage(p1)}`;
        const omitFirstMixColor = c1 === WHITE_INDEX && p2 < 0;
        if (!omitFirstMixColor) {
            expression += `!${XCOLOR_BASE_COLORS[c1].name}`;
        }
    }
    if (p2 >= 0 && c2 >= 0) {
        expression += `!${formatPercentage(p2)}`;
        const omitSecondMixColor = c2 === WHITE_INDEX && p3 < 0;
        if (!omitSecondMixColor) {
            expression += `!${XCOLOR_BASE_COLORS[c2].name}`;
        }
    }
    if (p3 >= 0 && c3 >= 0) {
        expression += `!${formatPercentage(p3)}`;
        if (c3 !== WHITE_INDEX) {
            expression += `!${XCOLOR_BASE_COLORS[c3].name}`;
        }
    }
    return expression;
}
function renderCandidateRgb(baseIndex, p1, c1, p2, c2, p3 = -1, c3 = -1) {
    if (p1 < 0 || c1 < 0) {
        return [COLOR_R[baseIndex], COLOR_G[baseIndex], COLOR_B[baseIndex]];
    }
    const t1 = p1 / 100;
    const u1 = 1 - t1;
    const mix1R = COLOR_R[baseIndex] * t1 + COLOR_R[c1] * u1;
    const mix1G = COLOR_G[baseIndex] * t1 + COLOR_G[c1] * u1;
    const mix1B = COLOR_B[baseIndex] * t1 + COLOR_B[c1] * u1;
    if (p2 < 0 || c2 < 0) {
        return [clampByte(mix1R), clampByte(mix1G), clampByte(mix1B)];
    }
    const t2 = p2 / 100;
    const u2 = 1 - t2;
    const mix2R = mix1R * t2 + COLOR_R[c2] * u2;
    const mix2G = mix1G * t2 + COLOR_G[c2] * u2;
    const mix2B = mix1B * t2 + COLOR_B[c2] * u2;
    if (p3 < 0 || c3 < 0) {
        return [clampByte(mix2R), clampByte(mix2G), clampByte(mix2B)];
    }
    const t3 = p3 / 100;
    const u3 = 1 - t3;
    return [
        clampByte(mix2R * t3 + COLOR_R[c3] * u3),
        clampByte(mix2G * t3 + COLOR_G[c3] * u3),
        clampByte(mix2B * t3 + COLOR_B[c3] * u3)
    ];
}
function pickDisplayPercentages(best) {
    if (best.p1 < 0 || best.c1 < 0) {
        return { p1: -1, p2: -1, p3: -1 };
    }
    const percentages = [best.p1, best.p2, best.p3].filter((value) => value >= 0);
    const mixCount = percentages.length;
    if (mixCount === 0) {
        return { p1: -1, p2: -1, p3: -1 };
    }
    const targetR = best.renderedR;
    const targetG = best.renderedG;
    const targetB = best.renderedB;
    const rounded = new Array(mixCount).fill(0);
    const decimals = new Array(mixCount).fill(0);
    let bestCandidate = null;
    const recurse = (index) => {
        if (index >= mixCount) {
            const p1 = rounded[0];
            const p2 = mixCount >= 2 ? rounded[1] : -1;
            const p3 = mixCount >= 3 ? rounded[2] : -1;
            const [r, g, b] = renderCandidateRgb(best.baseIndex, p1, best.c1, p2, best.c2, p3, best.c3);
            if (r !== targetR || g !== targetG || b !== targetB) {
                return;
            }
            const texts = [formatPercentage(p1)];
            if (mixCount >= 2) {
                texts.push(formatPercentage(p2));
            }
            if (mixCount >= 3) {
                texts.push(formatPercentage(p3));
            }
            const score = texts.reduce((sum, text) => sum + text.length, 0);
            const decimalsSum = decimals.reduce((sum, value) => sum + value, 0);
            const tieKey = texts.join("|");
            if (bestCandidate == null ||
                score < bestCandidate.score ||
                (score === bestCandidate.score &&
                    (decimalsSum < bestCandidate.decimalsSum ||
                        (decimalsSum === bestCandidate.decimalsSum && tieKey < bestCandidate.tieKey)))) {
                bestCandidate = { p1, p2, p3, score, decimalsSum, tieKey };
            }
            return;
        }
        const raw = percentages[index];
        for (let places = 0; places <= 6; places += 1) {
            decimals[index] = places;
            rounded[index] = roundPercentage(raw, places);
            recurse(index + 1);
        }
    };
    recurse(0);
    const candidate = bestCandidate;
    if (candidate) {
        return { p1: candidate.p1, p2: candidate.p2, p3: candidate.p3 };
    }
    return { p1: best.p1, p2: best.p2, p3: best.p3 };
}
function solveLinear3x3(matrix, vector) {
    const a = matrix[0];
    const b = matrix[1];
    const c = matrix[2];
    const d = matrix[3];
    const e = matrix[4];
    const f = matrix[5];
    const g = matrix[6];
    const h = matrix[7];
    const i = matrix[8];
    const det = a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
    if (Math.abs(det) < ZERO_DETERMINANT_EPSILON) {
        return null;
    }
    const invDet = 1 / det;
    const v0 = vector[0];
    const v1 = vector[1];
    const v2 = vector[2];
    return [
        (v0 * (e * i - f * h) - b * (v1 * i - f * v2) + c * (v1 * h - e * v2)) * invDet,
        (a * (v1 * i - f * v2) - v0 * (d * i - f * g) + c * (d * v2 - v1 * g)) * invDet,
        (a * (e * v2 - v1 * h) - b * (d * v2 - v1 * g) + v0 * (d * h - e * g)) * invDet
    ];
}
function projectToSimplex(values) {
    const sorted = [...values].sort((left, right) => right - left);
    let cumulative = 0;
    let rho = -1;
    for (let index = 0; index < sorted.length; index += 1) {
        cumulative += sorted[index];
        const threshold = (cumulative - 1) / (index + 1);
        if (sorted[index] > threshold) {
            rho = index;
        }
    }
    if (rho < 0) {
        return new Array(values.length).fill(1 / values.length);
    }
    const theta = (sorted.slice(0, rho + 1).reduce((sum, value) => sum + value, 0) - 1) / (rho + 1);
    return values.map((value) => Math.max(0, value - theta));
}
function fastAnalyticSearch(targetRgb, maxMixes, config) {
    const [targetR, targetG, targetB] = targetRgb;
    let checked = 0;
    let bestError2 = Number.POSITIVE_INFINITY;
    let bestObjective = Number.NEGATIVE_INFINITY;
    let bestMixes = 3;
    let bestBaseIndex = -1;
    let bestP1 = -1;
    let bestC1 = -1;
    let bestP2 = -1;
    let bestC2 = -1;
    let bestP3 = -1;
    let bestC3 = -1;
    let bestR = 0;
    let bestG = 0;
    let bestB = 0;
    const maybeUpdate = (baseIndex, p1, c1, p2, c2, p3, c3, renderedR, renderedG, renderedB) => {
        checked += 1;
        const dr = renderedR - targetR;
        const dg = renderedG - targetG;
        const db = renderedB - targetB;
        const error2 = dr * dr + dg * dg + db * db;
        const length = expressionLength(baseIndex, p1, c1, p2, c2, p3, c3);
        const mixes = p3 >= 0 ? 3 : p2 >= 0 ? 2 : p1 >= 0 ? 1 : 0;
        const firstPercentage = p1 >= 0 ? p1 : 0;
        const objective = firstPercentage - 0.5 * length;
        if (error2 < bestError2) {
            bestError2 = error2;
            bestObjective = objective;
            bestMixes = mixes;
            bestBaseIndex = baseIndex;
            bestP1 = p1;
            bestC1 = c1;
            bestP2 = p2;
            bestC2 = c2;
            bestP3 = p3;
            bestC3 = c3;
            bestR = renderedR;
            bestG = renderedG;
            bestB = renderedB;
            return;
        }
        if (error2 > bestError2) {
            return;
        }
        if (mixes < bestMixes) {
            bestObjective = objective;
            bestMixes = mixes;
            bestBaseIndex = baseIndex;
            bestP1 = p1;
            bestC1 = c1;
            bestP2 = p2;
            bestC2 = c2;
            bestP3 = p3;
            bestC3 = c3;
            bestR = renderedR;
            bestG = renderedG;
            bestB = renderedB;
            return;
        }
        if (mixes > bestMixes) {
            return;
        }
        if (objective > bestObjective) {
            bestObjective = objective;
            bestBaseIndex = baseIndex;
            bestP1 = p1;
            bestC1 = c1;
            bestP2 = p2;
            bestC2 = c2;
            bestP3 = p3;
            bestC3 = c3;
            bestR = renderedR;
            bestG = renderedG;
            bestB = renderedB;
            return;
        }
        if (objective < bestObjective) {
            return;
        }
        if (isLexicographicallyBetter(baseIndex, p1, c1, p2, c2, bestBaseIndex, bestP1, bestC1, bestP2, bestC2, p3, c3, bestP3, bestC3)) {
            bestBaseIndex = baseIndex;
            bestP1 = p1;
            bestC1 = c1;
            bestP2 = p2;
            bestC2 = c2;
            bestP3 = p3;
            bestC3 = c3;
            bestR = renderedR;
            bestG = renderedG;
            bestB = renderedB;
        }
    };
    for (let baseIndex = 0; baseIndex < COLOR_COUNT; baseIndex += 1) {
        maybeUpdate(baseIndex, -1, -1, -1, -1, -1, -1, COLOR_R[baseIndex], COLOR_G[baseIndex], COLOR_B[baseIndex]);
    }
    if (maxMixes >= 1) {
        for (let baseIndex = 0; baseIndex < COLOR_COUNT; baseIndex += 1) {
            for (let mixIndex = 0; mixIndex < COLOR_COUNT; mixIndex += 1) {
                const pairIndex = baseIndex * COLOR_COUNT + mixIndex;
                const invDen = PAIR_INV_DEN[pairIndex];
                let projectedT = 0.5;
                if (invDen > 0) {
                    const tx = targetR - COLOR_R[mixIndex];
                    const ty = targetG - COLOR_G[mixIndex];
                    const tz = targetB - COLOR_B[mixIndex];
                    projectedT = (tx * PAIR_DX[pairIndex] + ty * PAIR_DY[pairIndex] + tz * PAIR_DZ[pairIndex]) * invDen;
                    projectedT = clamp01(projectedT);
                }
                if (config.exact) {
                    const t1 = projectedT;
                    const u1 = 1 - t1;
                    const renderedR = clampByte(COLOR_R[baseIndex] * t1 + COLOR_R[mixIndex] * u1);
                    const renderedG = clampByte(COLOR_G[baseIndex] * t1 + COLOR_G[mixIndex] * u1);
                    const renderedB = clampByte(COLOR_B[baseIndex] * t1 + COLOR_B[mixIndex] * u1);
                    maybeUpdate(baseIndex, t1 * 100, mixIndex, -1, -1, -1, -1, renderedR, renderedG, renderedB);
                    continue;
                }
                projectedT = clampInteger(roundToPercent(projectedT), 1, 99) / 100;
                const center = roundToPercent(projectedT);
                const start = Math.max(1, center - config.depth1Radius);
                const end = Math.min(99, center + config.depth1Radius);
                for (let p1 = start; p1 <= end; p1 += 1) {
                    const t1 = p1 / 100;
                    const u1 = 1 - t1;
                    const renderedR = clampByte(COLOR_R[baseIndex] * t1 + COLOR_R[mixIndex] * u1);
                    const renderedG = clampByte(COLOR_G[baseIndex] * t1 + COLOR_G[mixIndex] * u1);
                    const renderedB = clampByte(COLOR_B[baseIndex] * t1 + COLOR_B[mixIndex] * u1);
                    maybeUpdate(baseIndex, p1, mixIndex, -1, -1, -1, -1, renderedR, renderedG, renderedB);
                }
            }
        }
    }
    if (maxMixes >= 2) {
        for (let tripleIndex = 0; tripleIndex < TRIPLE_COUNT; tripleIndex += 1) {
            const a = TRIPLE_A[tripleIndex];
            const b = TRIPLE_B[tripleIndex];
            const c = TRIPLE_C[tripleIndex];
            const wx = targetR - COLOR_R[c];
            const wy = targetG - COLOR_G[c];
            const wz = targetB - COLOR_B[c];
            const uw = TRIPLE_UX[tripleIndex] * wx + TRIPLE_UY[tripleIndex] * wy + TRIPLE_UZ[tripleIndex] * wz;
            const vw = TRIPLE_VX[tripleIndex] * wx + TRIPLE_VY[tripleIndex] * wy + TRIPLE_VZ[tripleIndex] * wz;
            let x = 0.5;
            let y = 0.25;
            if (TRIPLE_CAN_SOLVE[tripleIndex] === 1) {
                const invDet = TRIPLE_INV_DET[tripleIndex];
                x = (uw * TRIPLE_VV[tripleIndex] - vw * TRIPLE_UV[tripleIndex]) * invDet;
                y = (vw * TRIPLE_UU[tripleIndex] - uw * TRIPLE_UV[tripleIndex]) * invDet;
            }
            else if (TRIPLE_UU[tripleIndex] > 0) {
                x = uw / TRIPLE_UU[tripleIndex];
                y = x * 0.5;
            }
            x = clamp01(x);
            y = Math.max(TWO_MIX_MIN_Y, Math.min(y, x));
            if (config.exact) {
                const t2 = x;
                const t1 = t2 > 0 ? clamp01(y / t2) : 0;
                const alpha = t1 * t2;
                const beta = (1 - t1) * t2;
                const gamma = 1 - t2;
                const renderedR = clampByte(COLOR_R[a] * alpha + COLOR_R[b] * beta + COLOR_R[c] * gamma);
                const renderedG = clampByte(COLOR_G[a] * alpha + COLOR_G[b] * beta + COLOR_G[c] * gamma);
                const renderedB = clampByte(COLOR_B[a] * alpha + COLOR_B[b] * beta + COLOR_B[c] * gamma);
                maybeUpdate(a, t1 * 100, b, t2 * 100, c, -1, -1, renderedR, renderedG, renderedB);
                continue;
            }
            x = clampInteger(roundToPercent(x), 1, 99) / 100;
            const p2Center = roundToPercent(x);
            const p2Start = Math.max(1, p2Center - config.depth2P2Radius);
            const p2End = Math.min(99, p2Center + config.depth2P2Radius);
            for (let p2 = p2Start; p2 <= p2End; p2 += 1) {
                const t2 = p2 / 100;
                const p1Center = roundToPercent(y / t2);
                const p1Start = Math.max(1, p1Center - config.depth2P1Radius);
                const p1End = Math.min(99, p1Center + config.depth2P1Radius);
                for (let p1 = p1Start; p1 <= p1End; p1 += 1) {
                    const t1 = p1 / 100;
                    const alpha = t1 * t2;
                    const beta = (1 - t1) * t2;
                    const gamma = 1 - t2;
                    const renderedR = clampByte(COLOR_R[a] * alpha + COLOR_R[b] * beta + COLOR_R[c] * gamma);
                    const renderedG = clampByte(COLOR_G[a] * alpha + COLOR_G[b] * beta + COLOR_G[c] * gamma);
                    const renderedB = clampByte(COLOR_B[a] * alpha + COLOR_B[b] * beta + COLOR_B[c] * gamma);
                    maybeUpdate(a, p1, b, p2, c, -1, -1, renderedR, renderedG, renderedB);
                }
            }
        }
    }
    if (maxMixes >= 3 && config.threeMixWhiteTail) {
        const targetFromWhite = [targetR - 255, targetG - 255, targetB - 255];
        for (let a = 0; a < COLOR_COUNT; a += 1) {
            const ar = COLOR_R[a] - 255;
            const ag = COLOR_G[a] - 255;
            const ab = COLOR_B[a] - 255;
            for (let b = 0; b < COLOR_COUNT; b += 1) {
                const br = COLOR_R[b] - 255;
                const bg = COLOR_G[b] - 255;
                const bb = COLOR_B[b] - 255;
                for (let c = 0; c < COLOR_COUNT; c += 1) {
                    const cr = COLOR_R[c] - 255;
                    const cg = COLOR_G[c] - 255;
                    const cb = COLOR_B[c] - 255;
                    const matrix = [ar, br, cr, ag, bg, cg, ab, bb, cb];
                    const rawWeights = solveLinear3x3(matrix, targetFromWhite);
                    if (!rawWeights) {
                        continue;
                    }
                    const rawW0 = rawWeights[0];
                    const rawW1 = rawWeights[1];
                    const rawW2 = rawWeights[2];
                    const projected = projectToSimplex([rawW0, rawW1, rawW2, 1 - rawW0 - rawW1 - rawW2]);
                    const w0 = projected[0];
                    const w1 = projected[1];
                    const w2 = projected[2];
                    const sum = w0 + w1 + w2;
                    if (sum <= ZERO_DETERMINANT_EPSILON) {
                        continue;
                    }
                    const q = w0 + w1;
                    const t3 = sum;
                    const t2 = q > ZERO_DETERMINANT_EPSILON ? q / t3 : 0;
                    const t1 = q > ZERO_DETERMINANT_EPSILON ? w0 / q : 0;
                    const p1 = t1 * 100;
                    const p2 = t2 * 100;
                    const p3 = t3 * 100;
                    const renderedR = clampByte(COLOR_R[a] * w0 + COLOR_R[b] * w1 + COLOR_R[c] * w2 + 255 * projected[3]);
                    const renderedG = clampByte(COLOR_G[a] * w0 + COLOR_G[b] * w1 + COLOR_G[c] * w2 + 255 * projected[3]);
                    const renderedB = clampByte(COLOR_B[a] * w0 + COLOR_B[b] * w1 + COLOR_B[c] * w2 + 255 * projected[3]);
                    maybeUpdate(a, p1, b, p2, c, p3, WHITE_INDEX, renderedR, renderedG, renderedB);
                }
            }
        }
    }
    if (bestBaseIndex < 0) {
        throw new Error("No candidate produced by fast analytic search.");
    }
    return {
        baseIndex: bestBaseIndex,
        p1: bestP1,
        c1: bestC1,
        p2: bestP2,
        c2: bestC2,
        p3: bestP3,
        c3: bestC3,
        renderedR: bestR,
        renderedG: bestG,
        renderedB: bestB,
        error2: bestError2,
        mixes: bestMixes,
        checked
    };
}
function rgbToXcolorExpression(target, options = {}) {
    const targetRgb = normalizeTargetRgb(target);
    const maxMixes = (options.threeMixWhiteTail === true
        ? 3
        : clampInteger(Math.floor(options.maxMixes ?? 2), 0, 3));
    const config = normalizeFastConfig(options);
    const best = fastAnalyticSearch(targetRgb, maxMixes, config);
    const display = pickDisplayPercentages(best);
    const expression = renderExpression(best.baseIndex, display.p1, best.c1, display.p2, best.c2, display.p3, best.c3);
    return {
        targetRgb: {
            r: targetRgb[0],
            g: targetRgb[1],
            b: targetRgb[2]
        },
        expression,
        renderedRgb: {
            r: best.renderedR,
            g: best.renderedG,
            b: best.renderedB
        },
        exact: best.error2 === 0,
        error2: best.error2,
        error: Math.sqrt(best.error2),
        mixes: best.mixes,
        length: expression.length,
        checked: best.checked,
        mode: config.mode
    };
}

class ColorRegistry {
  constructor(options = {}) {
    this.colors = new Map();
    this.counter = 0;
    this.options = options || {};
  }

  register(hex) {
    if (!hex) return null
    let clean = hex.replace('#', '').toUpperCase();
    // Expand 3-char hex to 6-char
    if (clean.length === 3) {
      clean = clean[0] + clean[0] + clean[1] + clean[1] + clean[2] + clean[2];
    }
    if (clean.length < 6) return null

    const rgb6 = clean.slice(0, 6);
    const alpha = clean.length === 8 ? parseInt(clean.slice(6, 8), 16) / 255 : 1;

    if (!this.colors.has(rgb6)) {
      const name = `clr${this.counter++}`;
      const entry = { name, model: 'HTML', value: rgb6 };

      if (this.options.xcolorRgbConvert) {
        try {
          const r = parseInt(rgb6.slice(0, 2), 16);
          const g = parseInt(rgb6.slice(2, 4), 16);
          const b = parseInt(rgb6.slice(4, 6), 16);
          const converted = rgbToXcolorExpression({ r, g, b }, { mode: 'release' });
          if (converted?.expression) {
            entry.model = 'xcolor';
            entry.value = converted.expression;
          }
        } catch (err) {
          // Keep HTML fallback for robustness if conversion fails for any reason.
        }
      }

      this.colors.set(rgb6, entry);
    }
    return { name: this.colors.get(rgb6).name, opacity: alpha }
  }

  getDefinitions() {
    const lines = [];
    for (const [, color] of this.colors) {
      if (color.model === 'xcolor') {
        lines.push(`\\colorlet{${color.name}}{${color.value}}`);
      } else {
        lines.push(`\\definecolor{${color.name}}{HTML}{${color.value}}`);
      }
    }
    return lines.join('\n')
  }
}

function generatePreamble(colorRegistry, hasImages, hasLinks, hasSvgTikz = false) {
  const lines = [
    '\\documentclass[border=0pt]{standalone}',
    '\\usepackage[utf8]{inputenc}',
    '\\usepackage[T1]{fontenc}',
    '\\usepackage{tikz}',
    '\\usepackage{xcolor}',
    '\\usepackage{amsmath,amssymb}',
    '\\usepackage[normalem]{ulem}',
    '\\usetikzlibrary{shapes.geometric,calc,positioning,shadows.blur,patterns,shadings}',
  ];

  if (hasImages || hasSvgTikz) {
    lines.push('\\usepackage{graphicx}');
  }
  if (hasLinks) {
    lines.push('\\usepackage{hyperref}');
  }

  lines.push('');

  const colorDefs = colorRegistry.getDefinitions();
  if (colorDefs) {
    lines.push(colorDefs);
    lines.push('');
  }

  return lines.join('\n')
}

function fillToTikz(fill, registry) {
  if (!fill) return { options: '', preCommands: '', postCommands: '' }

  switch (fill.type) {
    case 'color': {
      const color = registry.register(fill.value);
      if (!color) return { options: '', preCommands: '', postCommands: '' }
      const opts = [`fill=${color.name}`];
      if (color.opacity < 1) opts.push(`fill opacity=${color.opacity.toFixed(2)}`);
      return { options: opts.join(', '), preCommands: '', postCommands: '' }
    }

    case 'gradient': {
      const { path, rot, colors } = fill.value;
      if (!colors || colors.length < 2) return { options: '', preCommands: '', postCommands: '' }

      const first = registry.register(colors[0].color);
      const last = registry.register(colors[colors.length - 1].color);
      if (!first || !last) return { options: '', preCommands: '', postCommands: '' }

      if (path === 'circle' || path === 'rect' || path === 'shape') {
        return {
          options: `inner color=${first.name}, outer color=${last.name}`,
          shade: true,
          preCommands: '',
          postCommands: '',
        }
      }

      const angle = (rot || 0) + 90;
      return {
        options: `left color=${first.name}, right color=${last.name}, shading angle=${angle}`,
        shade: true,
        preCommands: '',
        postCommands: '',
      }
    }

    default:
      return { options: '', preCommands: '', postCommands: '' }
  }
}

function pt2cm(v) {
  return (v / 28.3465).toFixed(2)
}

function scopeTransform(element, slideHeight) {
  const opts = [];
  opts.push(`shift={(${pt2cm(element.left)},${pt2cm(slideHeight - element.top)})}`);
  if (element.rotate) {
    const cx = element.width / 2;
    const cy = -element.height / 2;   // y-up: center is half-height below the top
    opts.push(`rotate around={${-element.rotate}:(${pt2cm(cx)},${pt2cm(cy)})}`);
  }
  if (element.isFlipH) opts.push('xscale=-1');
  if (element.isFlipV) opts.push('yscale=-1');
  return opts
}

const LATEX_SPECIAL = /[&%$#_{}~^\\]/g;
const SPECIAL_MAP = {
  '&': '\\&',
  '%': '\\%',
  '$': '\\$',
  '#': '\\#',
  '_': '\\_',
  '{': '\\{',
  '}': '\\}',
  '~': '\\textasciitilde{}',
  '^': '\\textasciicircum{}',
  '\\': '\\textbackslash{}',
};

function escapeLatex$1(text) {
  return text.replace(LATEX_SPECIAL, ch => SPECIAL_MAP[ch])
}

function decodeHtmlEntities(text) {
  return text
    .replace(/&nbsp;/g, '\x00NBSP\x00')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

function restoreNbsp(text) {
  return text.replace(/\x00NBSP\x00/g, '~')
}

function parseStyle(styleStr) {
  const props = {};
  if (!styleStr) return props
  for (const part of styleStr.split(';')) {
    const colonIdx = part.indexOf(':');
    if (colonIdx === -1) continue
    const key = part.slice(0, colonIdx).trim();
    const val = part.slice(colonIdx + 1).trim();
    if (key && val) props[key] = val;
  }
  return props
}

function wrapWithFormatting(text, style, registry, options = {}) {
  let result = text;

  if (style['vertical-align'] === 'super') {
    result = `\\textsuperscript{${result}}`;
  } else if (style['vertical-align'] === 'sub') {
    result = `\\textsubscript{${result}}`;
  }

  if (style['text-decoration'] === 'underline') {
    result = `\\underline{${result}}`;
  }
  if (style['text-decoration-line'] === 'line-through') {
    result = `\\sout{${result}}`;
  }

  if (style['font-weight'] === 'bold') {
    result = `\\textbf{${result}}`;
  }
  if (style['font-style'] === 'italic') {
    result = `\\textit{${result}}`;
  }

  const color = style['color'];
  if (color && color.startsWith('#')) {
    if (options.xcolorRgbConvert && registry) {
      const converted = registry.register(color);
      if (converted) result = `\\textcolor{${converted.name}}{${result}}`;
      else {
        const hex = color.replace('#', '').toUpperCase().slice(0, 6);
        result = `\\textcolor[HTML]{${hex}}{${result}}`;
      }
    } else {
      const hex = color.replace('#', '').toUpperCase().slice(0, 6);
      result = `\\textcolor[HTML]{${hex}}{${result}}`;
    }
  }

  const fontSize = style['font-size'];
  if (fontSize) {
    const match = fontSize.match(/([\d.]+)pt/);
    if (match) {
      const size = parseFloat(match[1]);
      const skip = (size * 1.2).toFixed(1);
      result = `{\\fontsize{${size}}{${skip}}\\selectfont ${result}}`;
    }
  }

  return result
}

function processSpans(html, registry, options = {}) {
  let result = '';
  const spanRe = /<span\s+style="([^"]*)">([\s\S]*?)<\/span>/g;
  let lastIndex = 0;
  let match;

  while ((match = spanRe.exec(html)) !== null) {
    if (match.index > lastIndex) {
      const between = html.slice(lastIndex, match.index);
      result += restoreNbsp(escapeLatex$1(decodeHtmlEntities(between)));
    }

    const style = parseStyle(match[1]);
    const innerHtml = match[2];

    const linkMatch = innerHtml.match(/<a\s+href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/);
    if (linkMatch) {
      const url = linkMatch[1];
      const linkText = restoreNbsp(escapeLatex$1(decodeHtmlEntities(linkMatch[2])));
      const formatted = wrapWithFormatting(`\\href{${url}}{${linkText}}`, style, registry, options);
      result += formatted;
    } else {
      const plainText = restoreNbsp(escapeLatex$1(decodeHtmlEntities(innerHtml)));
      result += wrapWithFormatting(plainText, style, registry, options);
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < html.length) {
    result += restoreNbsp(escapeLatex$1(decodeHtmlEntities(html.slice(lastIndex))));
  }

  return result
}

function processListBlock(html, listTag, registry, options = {}) {
  const items = [];
  const liRe = /<li\s+style="([^"]*)">([\s\S]*?)<\/li>/g;
  let match;
  while ((match = liRe.exec(html)) !== null) {
    items.push(processSpans(match[2], registry, options));
  }

  const env = listTag === 'ol' ? 'enumerate' : 'itemize';
  const lines = [`\\begin{${env}}`];
  for (const item of items) {
    lines.push(`  \\item ${item}`);
  }
  lines.push(`\\end{${env}}`);
  return lines.join('\n')
}

function htmlToLatex(html, registry, options = {}) {
  if (!html) return ''

  const blocks = [];

  // Check for list wrappers
  const listWrapperRe = /<(ul|ol)>([\s\S]*?)<\/\1>/g;
  let listMatch;
  const processedRanges = [];

  while ((listMatch = listWrapperRe.exec(html)) !== null) {
    processedRanges.push({
      start: listMatch.index,
      end: listMatch.index + listMatch[0].length,
      content: processListBlock(listMatch[2], listMatch[1], registry, options),
    });
  }

  if (processedRanges.length > 0) {
    let pos = 0;
    for (const range of processedRanges) {
      const before = html.slice(pos, range.start);
      if (before.trim()) {
        blocks.push(...processParagraphs(before, registry, options));
      }
      blocks.push(range.content);
      pos = range.end;
    }
    const after = html.slice(pos);
    if (after.trim()) {
      blocks.push(...processParagraphs(after, registry, options));
    }
  } else {
    blocks.push(...processParagraphs(html, registry, options));
  }

  return blocks.join('\n')
}

function processParagraphs(html, registry, options = {}) {
  const blocks = [];
  const pRe = /<p\s+style="([^"]*)">([\s\S]*?)<\/p>/g;
  let match;

  while ((match = pRe.exec(html)) !== null) {
    const style = parseStyle(match[1]);
    const content = processSpans(match[2], registry, options);
    const align = style['text-align'];

    if (align === 'center') {
      blocks.push(`{\\centering ${content}\\par}`);
    } else if (align === 'right') {
      blocks.push(`{\\raggedleft ${content}\\par}`);
    } else {
      blocks.push(content);
    }
  }

  if (blocks.length === 0 && html.trim()) {
    blocks.push(restoreNbsp(escapeLatex$1(decodeHtmlEntities(html.replace(/<[^>]*>/g, '')))));
  }

  return blocks
}

function borderToTikzOptions(element, registry) {
  const opts = [];

  if (!element.borderWidth || !element.borderColor) return ''

  const color = registry.register(element.borderColor);
  if (!color) return ''

  opts.push(`draw=${color.name}`);
  if (color.opacity < 1) opts.push(`draw opacity=${color.opacity.toFixed(2)}`);
  opts.push(`line width=${element.borderWidth}pt`);

  if (element.borderType === 'dashed' || element.borderStrokeDasharray === '5') {
    opts.push('dashed');
  } else if (element.borderType === 'dotted' || element.borderStrokeDasharray === '1, 5') {
    opts.push('dotted');
  } else if (element.borderStrokeDasharray && element.borderStrokeDasharray !== '0') {
    const parts = element.borderStrokeDasharray.split(',').map(s => s.trim());
    if (parts.length >= 2) {
      const pattern = [];
      for (let i = 0; i < parts.length; i++) {
        pattern.push(`${i % 2 === 0 ? 'on' : 'off'} ${parts[i]}pt`);
      }
      opts.push(`dash pattern=${pattern.join(' ')}`);
    }
  }

  return opts.join(', ')
}

function cellBorderToTikz(border, registry) {
  if (!border || !border.borderWidth || !border.borderColor) return null
  const color = registry.register(border.borderColor);
  if (!color) return null

  const opts = [`draw=${color.name}`, `line width=${border.borderWidth}pt`];
  if (border.borderType === 'dashed') opts.push('dashed');
  else if (border.borderType === 'dotted') opts.push('dotted');

  return opts.join(', ')
}

function renderText(element, registry, options = {}) {
  const content = htmlToLatex(element.content, registry, options);
  if (!content.trim()) return ''

  const opts = ['anchor=north west', 'inner sep=0pt'];
  opts.push(`text width=${pt2cm(element.width)}cm`);
  opts.push(`minimum height=${pt2cm(element.height)}cm`);

  const fillInfo = fillToTikz(element.fill, registry);
  if (fillInfo.options) opts.push(fillInfo.options);

  const borderOpts = borderToTikzOptions(element, registry);
  if (borderOpts) opts.push(borderOpts);

  if (element.vAlign === 'mid') {
    opts.push(`minimum height=${pt2cm(element.height)}cm`);
    opts.push('align=center');
  }

  const lines = [];
  const fy = y => options.slideHeight - y;

  const needsScope = element.rotate || element.isFlipH || element.isFlipV;
  if (needsScope) {
    const scopeOpts = [];
    if (element.rotate) {
      const cx = element.left + element.width / 2;
      const cy = fy(element.top) - element.height / 2;
      scopeOpts.push(`rotate around={${-element.rotate}:(${pt2cm(cx)},${pt2cm(cy)})}`);
    }
    if (element.isFlipH) scopeOpts.push('xscale=-1');
    if (element.isFlipV) scopeOpts.push('yscale=-1');
    lines.push(`  \\begin{scope}[${scopeOpts.join(', ')}]`);
  }

  const indent = needsScope ? '    ' : '  ';

  lines.push(`${indent}\\node[${opts.join(', ')}] at (${pt2cm(element.left)},${pt2cm(fy(element.top))}) {${content}};`);

  if (needsScope) {
    lines.push('  \\end{scope}');
  }

  return lines.join('\n')
}

function svgPathToTikz(pathStr, offsetX = 0, offsetY = 0, slideHeight = null) {
  if (!pathStr) return ''

  const fy = slideHeight !== null ? y => slideHeight - y : y => y;

  const segments = parseSvgPath(pathStr);
  const parts = [];

  for (const { cmd, coords } of segments) {
    switch (cmd) {
      case 'M':
        parts.push(`(${pt2cm(coords[0] + offsetX)},${pt2cm(fy(coords[1] + offsetY))})`);
        break
      case 'L':
        parts.push(`-- (${pt2cm(coords[0] + offsetX)},${pt2cm(fy(coords[1] + offsetY))})`);
        break
      case 'C':
        parts.push(
          `.. controls (${pt2cm(coords[0] + offsetX)},${pt2cm(fy(coords[1] + offsetY))}) and (${pt2cm(coords[2] + offsetX)},${pt2cm(fy(coords[3] + offsetY))}) .. (${pt2cm(coords[4] + offsetX)},${pt2cm(fy(coords[5] + offsetY))})`
        );
        break
      case 'Q':
        parts.push(
          `.. controls (${pt2cm(coords[0] + offsetX)},${pt2cm(fy(coords[1] + offsetY))}) .. (${pt2cm(coords[2] + offsetX)},${pt2cm(fy(coords[3] + offsetY))})`
        );
        break
      case 'Z':
        parts.push('-- cycle');
        break
    }
  }

  return parts.join(' ')
}

// Parse SVG path into segments, each with a command letter and flat array of numbers.
// Handles coordinates separated by spaces, commas, or sign changes.
function parseSvgPath(pathStr) {
  // Match command letters or individual numbers (including scientific notation)
  const re = /([MLCQZmlcqz])|(-?(?:\d*\.)?\d+(?:[eE][+-]?\d+)?)/g;
  const tokens = [];
  let match;
  while ((match = re.exec(pathStr)) !== null) {
    tokens.push(match[0]);
  }

  const coordCounts = { M: 2, L: 2, C: 6, Q: 4, Z: 0 };
  const segments = [];
  let i = 0;

  while (i < tokens.length) {
    const token = tokens[i];
    if (/^[MLCQZmlcqz]$/.test(token)) {
      const cmd = token.toUpperCase();
      const needed = coordCounts[cmd] ?? 0;
      i++;
      if (needed === 0) {
        segments.push({ cmd, coords: [] });
      } else {
        const nums = [];
        while (nums.length < needed && i < tokens.length && !/^[MLCQZmlcqz]$/.test(tokens[i])) {
          nums.push(parseFloat(tokens[i++]));
        }
        if (nums.length === needed) {
          segments.push({ cmd, coords: nums });
        }
      }
    } else {
      i++; // skip unexpected token
    }
  }

  return segments
}

function renderShape(element, registry, options = {}) {
  const lines = [];
  const x = element.left;
  const y = options.slideHeight - element.top;   // TikZ top of element (max y)
  const w = element.width;
  const h = element.height;
  const cx = x + w / 2;
  const cy = y - h / 2;                          // TikZ center y

  // Shorthand for converting pt coords to cm strings
  const c = v => pt2cm(v);

  const needsScope = element.rotate || element.isFlipH || element.isFlipV;
  if (needsScope) {
    const scopeOpts = [];
    // TikZ applies scope transforms right-to-left (last option applied first to coordinates).
    // PPTX applies flip first, then rotation. So rotation must be listed FIRST (applied last),
    // and flip operations listed LAST (applied first).
    // Flip around (cx,0): [shift(cx), xscale=-1, shift(-cx)] — right-to-left: shift(-cx), flip, shift(cx).
    if (element.rotate) scopeOpts.push(`rotate around={${-element.rotate}:(${c(cx)},${c(cy)})}`);
    if (element.isFlipH) {
      scopeOpts.push(`shift={(${c(cx)},0)}`, 'xscale=-1', `shift={(-${c(cx)},0)}`);
    }
    if (element.isFlipV) {
      scopeOpts.push(`shift={(0,${c(cy)})}`, 'yscale=-1', `shift={(0,-${c(cy)})}`);
    }
    lines.push(`  \\begin{scope}[${scopeOpts.join(', ')}]`);
  }

  const indent = needsScope ? '    ' : '  ';
  const fillInfo = fillToTikz(element.fill, registry);
  const borderOpts = borderToTikzOptions(element, registry);

  const drawOpts = [];
  if (fillInfo.options) drawOpts.push(fillInfo.options);
  if (borderOpts) drawOpts.push(borderOpts);

  const hasFill = !!fillInfo.options;
  const hasBorder = !!borderOpts;
  const cmd = fillInfo.shade
    ? (hasBorder ? '\\shadedraw' : '\\shade')
    : (hasFill && hasBorder ? '\\filldraw' : hasFill ? '\\fill' : '\\draw');
  const optsStr = drawOpts.length ? `[${drawOpts.join(', ')}]` : '';

  switch (element.shapType) {
    case 'straightConnector1': {
      // The scope transform (if any) handles flip/rotation. Use unflipped coords here.
      // tailEnd arrowhead is at (x+w, y-h); scope flips will move it to the correct end.
      const arrowOpts = ['->'];
      if (borderOpts) arrowOpts.push(borderOpts);
      lines.push(`${indent}\\draw[${arrowOpts.join(', ')}] (${c(x)},${c(y)}) -- (${c(x + w)},${c(y - h)});`);
      break
    }

    case 'line': {
      const lineOpts = borderOpts ? `[${borderOpts}]` : '';
      lines.push(`${indent}\\draw${lineOpts} (${c(x)},${c(y)}) -- (${c(x + w)},${c(y - h)});`);
      break
    }

    case 'rect':
    case 'snip1Rect':
    case 'snip2SameRect':
      lines.push(`${indent}${cmd}${optsStr} (${c(x)},${c(y - h)}) rectangle (${c(x + w)},${c(y)});`);
      break

    case 'roundRect':
    case 'round1Rect':
    case 'round2SameRect': {
      const radius = Math.min(w, h) * 0.1;
      const opts2 = drawOpts.length ? drawOpts.join(', ') + ', ' : '';
      lines.push(`${indent}${cmd}[${opts2}rounded corners=${c(radius)}cm] (${c(x)},${c(y - h)}) rectangle (${c(x + w)},${c(y)});`);
      break
    }

    case 'ellipse':
      lines.push(`${indent}${cmd}${optsStr} (${c(cx)},${c(cy)}) ellipse (${c(w / 2)}cm and ${c(h / 2)}cm);`);
      break

    case 'triangle':
    case 'accentCallout1':
      lines.push(`${indent}${cmd}${optsStr} (${c(cx)},${c(y)}) -- (${c(x + w)},${c(y - h)}) -- (${c(x)},${c(y - h)}) -- cycle;`);
      break

    case 'diamond':
    case 'rhombus':
      lines.push(`${indent}${cmd}${optsStr} (${c(cx)},${c(y)}) -- (${c(x + w)},${c(cy)}) -- (${c(cx)},${c(y - h)}) -- (${c(x)},${c(cy)}) -- cycle;`);
      break

    case 'pentagon':
      lines.push(`${indent}${cmd}${optsStr} (${c(cx)},${c(y)}) -- (${c(x + w)},${c(y - h * 0.38)}) -- (${c(x + w * 0.81)},${c(y - h)}) -- (${c(x + w * 0.19)},${c(y - h)}) -- (${c(x)},${c(y - h * 0.38)}) -- cycle;`);
      break

    case 'hexagon':
      lines.push(`${indent}${cmd}${optsStr} (${c(x + w * 0.25)},${c(y)}) -- (${c(x + w * 0.75)},${c(y)}) -- (${c(x + w)},${c(cy)}) -- (${c(x + w * 0.75)},${c(y - h)}) -- (${c(x + w * 0.25)},${c(y - h)}) -- (${c(x)},${c(cy)}) -- cycle;`);
      break

    case 'parallelogram': {
      const off = w * 0.2;
      lines.push(`${indent}${cmd}${optsStr} (${c(x + off)},${c(y)}) -- (${c(x + w)},${c(y)}) -- (${c(x + w - off)},${c(y - h)}) -- (${c(x)},${c(y - h)}) -- cycle;`);
      break
    }

    case 'trapezoid': {
      const off = w * 0.2;
      lines.push(`${indent}${cmd}${optsStr} (${c(x + off)},${c(y)}) -- (${c(x + w - off)},${c(y)}) -- (${c(x + w)},${c(y - h)}) -- (${c(x)},${c(y - h)}) -- cycle;`);
      break
    }

    case 'custom': {
      if (element.path) {
        const tikzPath = svgPathToTikz(element.path, element.left, element.top, options.slideHeight);
        if (tikzPath) {
          lines.push(`${indent}${cmd}${optsStr} ${tikzPath};`);
          break
        }
      }
      // fallback to rect
      lines.push(`${indent}${cmd}${optsStr} (${c(x)},${c(y - h)}) rectangle (${c(x + w)},${c(y)});`);
      break
    }

    default:
      lines.push(`${indent}${cmd}${optsStr} (${c(x)},${c(y - h)}) rectangle (${c(x + w)},${c(y)});`);
      break
  }

  // Add text content if present
  const content = htmlToLatex(element.content, registry, options);
  if (content.trim()) {
    const textOpts = ['anchor=center', 'inner sep=2pt', `text width=${c(w * 0.9)}cm`];
    lines.push(`${indent}\\node[${textOpts.join(', ')}] at (${c(cx)},${c(cy)}) {${content}};`);
  }

  if (needsScope) {
    lines.push('  \\end{scope}');
  }

  return lines.join('\n')
}

// src/path-parser.ts
var COMMANDS = new Set("MmLlHhVvCcSsQqTtAaZz");
function tokenize(d) {
  const tokens = [];
  let i = 0;
  while (i < d.length) {
    const ch = d[i];
    if (ch === " " || ch === "," || ch === "	" || ch === "\n" || ch === "\r") {
      i++;
    } else if (COMMANDS.has(ch)) {
      tokens.push({ type: "command", value: ch });
      i++;
    } else if (ch === "-" || ch === "+" || ch === "." || ch >= "0" && ch <= "9") {
      let num = "";
      if (ch === "-" || ch === "+") {
        num += ch;
        i++;
      }
      let hasDot = false;
      while (i < d.length) {
        const c = d[i];
        if (c >= "0" && c <= "9") {
          num += c;
          i++;
        } else if (c === "." && !hasDot) {
          hasDot = true;
          num += c;
          i++;
        } else if (c === "e" || c === "E") {
          num += c;
          i++;
          if (i < d.length && (d[i] === "+" || d[i] === "-")) {
            num += d[i];
            i++;
          }
        } else break;
      }
      tokens.push({ type: "number", value: parseFloat(num) });
    } else {
      i++;
    }
  }
  return tokens;
}
function consumeNumbers(tokens, pos, count) {
  const nums = [];
  for (let i = 0; i < count && pos.i < tokens.length; i++) {
    if (tokens[pos.i].type !== "number") break;
    nums.push(tokens[pos.i].value);
    pos.i++;
  }
  return nums;
}
var ARG_COUNTS = {
  M: 2,
  L: 2,
  H: 1,
  V: 1,
  C: 6,
  S: 4,
  Q: 4,
  T: 2,
  A: 7,
  Z: 0
};
function parsePath(d) {
  if (!d) return [];
  const tokens = tokenize(d);
  const segments = [];
  let cx = 0, cy = 0;
  let sx = 0, sy = 0;
  let lastCmd = "";
  let lastCx2 = 0, lastCy2 = 0;
  const pos = { i: 0 };
  while (pos.i < tokens.length) {
    let cmd;
    if (tokens[pos.i].type === "command") {
      cmd = tokens[pos.i].value;
      pos.i++;
    } else {
      cmd = lastCmd === "M" ? "L" : lastCmd === "m" ? "l" : lastCmd;
    }
    const upperCmd = cmd.toUpperCase();
    const relative = cmd !== upperCmd;
    const argCount = ARG_COUNTS[upperCmd];
    if (upperCmd === "Z") {
      segments.push({ type: "Z" });
      cx = sx;
      cy = sy;
      lastCmd = cmd;
      lastCx2 = cx;
      lastCy2 = cy;
      continue;
    }
    const args = consumeNumbers(tokens, pos, argCount);
    if (args.length < argCount) break;
    const rx = relative ? cx : 0;
    const ry = relative ? cy : 0;
    switch (upperCmd) {
      case "M": {
        const x = args[0] + rx, y = args[1] + ry;
        segments.push({ type: "M", x, y });
        cx = x;
        cy = y;
        sx = x;
        sy = y;
        lastCx2 = cx;
        lastCy2 = cy;
        break;
      }
      case "L": {
        const x = args[0] + rx, y = args[1] + ry;
        segments.push({ type: "L", x, y });
        cx = x;
        cy = y;
        lastCx2 = cx;
        lastCy2 = cy;
        break;
      }
      case "H": {
        const x = args[0] + rx;
        segments.push({ type: "L", x, y: cy });
        cx = x;
        lastCx2 = cx;
        lastCy2 = cy;
        break;
      }
      case "V": {
        const y = args[0] + ry;
        segments.push({ type: "L", x: cx, y });
        cy = y;
        lastCx2 = cx;
        lastCy2 = cy;
        break;
      }
      case "C": {
        const x1 = args[0] + rx, y1 = args[1] + ry;
        const x2 = args[2] + rx, y2 = args[3] + ry;
        const x = args[4] + rx, y = args[5] + ry;
        segments.push({ type: "C", x1, y1, x2, y2, x, y });
        lastCx2 = x2;
        lastCy2 = y2;
        cx = x;
        cy = y;
        break;
      }
      case "S": {
        const x1 = lastCmd === "C" || lastCmd === "c" || lastCmd === "S" || lastCmd === "s" ? 2 * cx - lastCx2 : cx;
        const y1 = lastCmd === "C" || lastCmd === "c" || lastCmd === "S" || lastCmd === "s" ? 2 * cy - lastCy2 : cy;
        const x2 = args[0] + rx, y2 = args[1] + ry;
        const x = args[2] + rx, y = args[3] + ry;
        segments.push({ type: "C", x1, y1, x2, y2, x, y });
        lastCx2 = x2;
        lastCy2 = y2;
        cx = x;
        cy = y;
        break;
      }
      case "Q": {
        const qx = args[0] + rx, qy = args[1] + ry;
        const x = args[2] + rx, y = args[3] + ry;
        const x1 = cx + 2 / 3 * (qx - cx), y1 = cy + 2 / 3 * (qy - cy);
        const x2 = x + 2 / 3 * (qx - x), y2 = y + 2 / 3 * (qy - y);
        segments.push({ type: "C", x1, y1, x2, y2, x, y });
        lastCx2 = qx;
        lastCy2 = qy;
        cx = x;
        cy = y;
        break;
      }
      case "T": {
        const qx = lastCmd === "Q" || lastCmd === "q" || lastCmd === "T" || lastCmd === "t" ? 2 * cx - lastCx2 : cx;
        const qy = lastCmd === "Q" || lastCmd === "q" || lastCmd === "T" || lastCmd === "t" ? 2 * cy - lastCy2 : cy;
        const x = args[0] + rx, y = args[1] + ry;
        const x1 = cx + 2 / 3 * (qx - cx), y1 = cy + 2 / 3 * (qy - cy);
        const x2 = x + 2 / 3 * (qx - x), y2 = y + 2 / 3 * (qy - y);
        segments.push({ type: "C", x1, y1, x2, y2, x, y });
        lastCx2 = qx;
        lastCy2 = qy;
        cx = x;
        cy = y;
        break;
      }
      case "A": {
        const arcRx = args[0], arcRy = args[1];
        const xRot = args[2];
        const largeArc = args[3];
        const sweep = args[4];
        const x = args[5] + rx, y = args[6] + ry;
        const cubics = arcToCubics(cx, cy, x, y, arcRx, arcRy, xRot, largeArc, sweep);
        for (const c of cubics) {
          segments.push({ type: "C", x1: c[0], y1: c[1], x2: c[2], y2: c[3], x: c[4], y: c[5] });
        }
        lastCx2 = cx;
        lastCy2 = cy;
        cx = x;
        cy = y;
        break;
      }
    }
    lastCmd = cmd;
    while (pos.i < tokens.length && tokens[pos.i].type === "number") {
      const repeatArgs = consumeNumbers(tokens, pos, argCount);
      if (repeatArgs.length < argCount) break;
      const rrx = relative ? cx : 0;
      const rry = relative ? cy : 0;
      switch (upperCmd) {
        case "M":
        // repeated M becomes L
        case "L": {
          const x = repeatArgs[0] + rrx, y = repeatArgs[1] + rry;
          segments.push({ type: "L", x, y });
          cx = x;
          cy = y;
          if (upperCmd === "M") {
            sx = x;
            sy = y;
          }
          lastCx2 = cx;
          lastCy2 = cy;
          break;
        }
        case "H": {
          const x = repeatArgs[0] + rrx;
          segments.push({ type: "L", x, y: cy });
          cx = x;
          lastCx2 = cx;
          lastCy2 = cy;
          break;
        }
        case "V": {
          const y = repeatArgs[0] + rry;
          segments.push({ type: "L", x: cx, y });
          cy = y;
          lastCx2 = cx;
          lastCy2 = cy;
          break;
        }
        case "C": {
          const x1 = repeatArgs[0] + rrx, y1 = repeatArgs[1] + rry;
          const x2 = repeatArgs[2] + rrx, y2 = repeatArgs[3] + rry;
          const x = repeatArgs[4] + rrx, y = repeatArgs[5] + rry;
          segments.push({ type: "C", x1, y1, x2, y2, x, y });
          lastCx2 = x2;
          lastCy2 = y2;
          cx = x;
          cy = y;
          break;
        }
        case "S": {
          const rx1 = lastCmd === "C" || lastCmd === "c" || lastCmd === "S" || lastCmd === "s" ? 2 * cx - lastCx2 : cx;
          const ry1 = lastCmd === "C" || lastCmd === "c" || lastCmd === "S" || lastCmd === "s" ? 2 * cy - lastCy2 : cy;
          const x2 = repeatArgs[0] + rrx, y2 = repeatArgs[1] + rry;
          const x = repeatArgs[2] + rrx, y = repeatArgs[3] + rry;
          segments.push({ type: "C", x1: rx1, y1: ry1, x2, y2, x, y });
          lastCx2 = x2;
          lastCy2 = y2;
          cx = x;
          cy = y;
          break;
        }
        case "Q": {
          const qx = repeatArgs[0] + rrx, qy = repeatArgs[1] + rry;
          const x = repeatArgs[2] + rrx, y = repeatArgs[3] + rry;
          const x1 = cx + 2 / 3 * (qx - cx), y1 = cy + 2 / 3 * (qy - cy);
          const x2 = x + 2 / 3 * (qx - x), y2 = y + 2 / 3 * (qy - y);
          segments.push({ type: "C", x1, y1, x2, y2, x, y });
          lastCx2 = qx;
          lastCy2 = qy;
          cx = x;
          cy = y;
          break;
        }
        case "T": {
          const qx = lastCmd === "Q" || lastCmd === "q" || lastCmd === "T" || lastCmd === "t" ? 2 * cx - lastCx2 : cx;
          const qy = lastCmd === "Q" || lastCmd === "q" || lastCmd === "T" || lastCmd === "t" ? 2 * cy - lastCy2 : cy;
          const x = repeatArgs[0] + rrx, y = repeatArgs[1] + rry;
          const x1 = cx + 2 / 3 * (qx - cx), y1 = cy + 2 / 3 * (qy - cy);
          const x2 = x + 2 / 3 * (qx - x), y2 = y + 2 / 3 * (qy - y);
          segments.push({ type: "C", x1, y1, x2, y2, x, y });
          lastCx2 = qx;
          lastCy2 = qy;
          cx = x;
          cy = y;
          break;
        }
        case "A": {
          const arcRx = repeatArgs[0], arcRy = repeatArgs[1];
          const xRot = repeatArgs[2], largeArc = repeatArgs[3], sweep = repeatArgs[4];
          const x = repeatArgs[5] + rrx, y = repeatArgs[6] + rry;
          const cubics = arcToCubics(cx, cy, x, y, arcRx, arcRy, xRot, largeArc, sweep);
          for (const c of cubics) {
            segments.push({ type: "C", x1: c[0], y1: c[1], x2: c[2], y2: c[3], x: c[4], y: c[5] });
          }
          cx = x;
          cy = y;
          lastCx2 = cx;
          lastCy2 = cy;
          break;
        }
      }
      lastCmd = cmd;
    }
  }
  return segments;
}
function arcToCubics(x1, y1, x2, y2, rx, ry, xRotDeg, largeArcFlag, sweepFlag) {
  if (rx === 0 || ry === 0) return [[x1, y1, x2, y2, x2, y2]];
  const phi = xRotDeg * Math.PI / 180;
  const cosPhi = Math.cos(phi), sinPhi = Math.sin(phi);
  const dx = (x1 - x2) / 2, dy = (y1 - y2) / 2;
  const x1p = cosPhi * dx + sinPhi * dy;
  const y1p = -sinPhi * dx + cosPhi * dy;
  rx = Math.abs(rx);
  ry = Math.abs(ry);
  let lambda = x1p * x1p / (rx * rx) + y1p * y1p / (ry * ry);
  if (lambda > 1) {
    const sqrtLambda = Math.sqrt(lambda);
    rx *= sqrtLambda;
    ry *= sqrtLambda;
  }
  const rxSq = rx * rx, rySq = ry * ry;
  const x1pSq = x1p * x1p, y1pSq = y1p * y1p;
  let sq = (rxSq * rySq - rxSq * y1pSq - rySq * x1pSq) / (rxSq * y1pSq + rySq * x1pSq);
  if (sq < 0) sq = 0;
  let coef = Math.sqrt(sq);
  if (largeArcFlag === sweepFlag) coef = -coef;
  const cxp = coef * rx * y1p / ry;
  const cyp = -coef * ry * x1p / rx;
  const cx = cosPhi * cxp - sinPhi * cyp + (x1 + x2) / 2;
  const cy = sinPhi * cxp + cosPhi * cyp + (y1 + y2) / 2;
  function angle(ux, uy, vx, vy) {
    const dot = ux * vx + uy * vy;
    const len = Math.sqrt(ux * ux + uy * uy) * Math.sqrt(vx * vx + vy * vy);
    let a = Math.acos(Math.max(-1, Math.min(1, dot / len)));
    if (ux * vy - uy * vx < 0) a = -a;
    return a;
  }
  const theta1 = angle(1, 0, (x1p - cxp) / rx, (y1p - cyp) / ry);
  let dTheta = angle((x1p - cxp) / rx, (y1p - cyp) / ry, (-x1p - cxp) / rx, (-y1p - cyp) / ry);
  if (!sweepFlag && dTheta > 0) dTheta -= 2 * Math.PI;
  if (sweepFlag && dTheta < 0) dTheta += 2 * Math.PI;
  const numSegs = Math.ceil(Math.abs(dTheta) / (Math.PI / 2));
  const segAngle = dTheta / numSegs;
  const results = [];
  for (let i = 0; i < numSegs; i++) {
    const a1 = theta1 + i * segAngle;
    const a2 = theta1 + (i + 1) * segAngle;
    const alpha = 4 * Math.tan((a2 - a1) / 4) / 3;
    const cos1 = Math.cos(a1), sin1 = Math.sin(a1);
    const cos2 = Math.cos(a2), sin2 = Math.sin(a2);
    const ep1x = rx * cos1, ep1y = ry * sin1;
    const ep2x = rx * cos2, ep2y = ry * sin2;
    const cp1x = ep1x - alpha * rx * sin1, cp1y = ep1y + alpha * ry * cos1;
    const cp2x = ep2x + alpha * rx * sin2, cp2y = ep2y - alpha * ry * cos2;
    results.push([
      cosPhi * cp1x - sinPhi * cp1y + cx,
      sinPhi * cp1x + cosPhi * cp1y + cy,
      cosPhi * cp2x - sinPhi * cp2y + cx,
      sinPhi * cp2x + cosPhi * cp2y + cy,
      cosPhi * ep2x - sinPhi * ep2y + cx,
      sinPhi * ep2x + cosPhi * ep2y + cy
    ]);
  }
  return results;
}

// src/svg2tikz.ts
var SVG_NS = "http://www.w3.org/2000/svg";
var XLINK_NS = "http://www.w3.org/1999/xlink";
var CM_TO_PT = 28.4528;
var EPSILON = 1e-9;
var INHERITED_PROPS = /* @__PURE__ */ new Set([
  "fill",
  "fill-rule",
  "stroke",
  "stroke-width",
  "stroke-dasharray",
  "stroke-dashoffset",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-miterlimit",
  "font-family",
  "font-size",
  "font-style",
  "font-weight",
  "text-anchor",
  "dominant-baseline",
  "alignment-baseline",
  "visibility",
  "marker-start",
  "marker-mid",
  "marker-end"
]);
var CSS_COLOR_KEYWORDS = /* @__PURE__ */ new Map([
  ["black", "000000"],
  ["silver", "C0C0C0"],
  ["gray", "808080"],
  ["white", "FFFFFF"],
  ["maroon", "800000"],
  ["red", "FF0000"],
  ["purple", "800080"],
  ["fuchsia", "FF00FF"],
  ["green", "008000"],
  ["lime", "00FF00"],
  ["olive", "808000"],
  ["yellow", "FFFF00"],
  ["navy", "000080"],
  ["blue", "0000FF"],
  ["teal", "008080"],
  ["aqua", "00FFFF"],
  ["orange", "FFA500"],
  ["brown", "A52A2A"],
  ["pink", "FFC0CB"],
  ["magenta", "FF00FF"],
  ["cyan", "00FFFF"],
  ["darkgray", "A9A9A9"],
  ["darkgrey", "A9A9A9"],
  ["lightgray", "D3D3D3"],
  ["lightgrey", "D3D3D3"],
  ["transparent", null],
  ["none", null]
]);
var XCOLOR_COLORS = [
  ["black", 0, 0, 0],
  ["darkgray", 64, 64, 64],
  ["gray", 128, 128, 128],
  ["lightgray", 191, 191, 191],
  ["white", 255, 255, 255],
  ["red", 255, 0, 0],
  ["green", 0, 255, 0],
  ["blue", 0, 0, 255],
  ["cyan", 0, 255, 255],
  ["magenta", 255, 0, 255],
  ["yellow", 255, 255, 0],
  ["lime", 191, 255, 0],
  ["olive", 128, 128, 0],
  ["orange", 255, 128, 0],
  ["pink", 255, 191, 191],
  ["teal", 0, 128, 128],
  ["violet", 128, 0, 128],
  ["purple", 191, 0, 64],
  ["brown", 191, 128, 64]
];
var XCOLOR_EXACT = /* @__PURE__ */ new Map();
for (const [name, r, g, b] of XCOLOR_COLORS) {
  const hex = (r << 16 | g << 8 | b).toString(16).toUpperCase().padStart(6, "0");
  XCOLOR_EXACT.set(hex, name);
}
function svgToTikz(svgInput, options = {}) {
  const {
    precision = 2,
    scale = null,
    standalone = false
  } = options;
  const svgEl = typeof svgInput === "string" ? parseSvgElement(svgInput) : svgInput;
  if (!svgEl) throw new Error("No <svg> element found");
  const viewBox = parseViewBox(svgEl);
  const computedScale = scale ?? computeAutoScale(viewBox);
  const ctx = {
    precision,
    scale: computedScale,
    viewBox,
    colors: /* @__PURE__ */ new Map(),
    lines: [],
    indent: 1,
    classStyles: /* @__PURE__ */ new Map(),
    markers: /* @__PURE__ */ new Map(),
    gradients: /* @__PURE__ */ new Map(),
    usesArrows: false,
    tikzStyles: []
  };
  preprocessDefs(svgEl, ctx);
  processChildren(svgEl, ctx);
  const parts = [];
  if (standalone) {
    parts.push("\\documentclass[tikz]{standalone}");
    parts.push("\\usepackage{tikz}");
    parts.push("");
    parts.push("\\begin{document}");
  }
  const picOpts = [];
  if (ctx.usesArrows) picOpts.push(">=stealth");
  parts.push(picOpts.length ? `\\begin{tikzpicture}[${picOpts.join(", ")}]` : "\\begin{tikzpicture}");
  for (const [hex, name] of ctx.colors) {
    parts.push(`  \\definecolor{${name}}{HTML}{${hex}}`);
  }
  for (const line of ctx.tikzStyles) {
    parts.push(line);
  }
  for (const line of ctx.lines) {
    parts.push(line);
  }
  parts.push("\\end{tikzpicture}");
  if (standalone) parts.push("\\end{document}");
  return parts.join("\n");
}
function parseSvgElement(svgInput) {
  if (typeof DOMParser === "undefined") {
    throw new Error("DOMParser is not available in this environment");
  }
  const doc = new DOMParser().parseFromString(svgInput, "image/svg+xml");
  return doc.querySelector("svg");
}
function preprocessDefs(svgEl, ctx) {
  for (const styleEl of svgEl.querySelectorAll("style")) {
    parseStyleElement(styleEl, ctx);
  }
  for (const marker of svgEl.querySelectorAll("marker")) {
    const id = marker.getAttribute("id");
    if (!id) continue;
    ctx.markers.set(id, { isArrow: detectArrowMarker(marker) });
  }
  for (const grad of svgEl.querySelectorAll("linearGradient, radialGradient")) {
    const id = grad.getAttribute("id");
    if (!id) continue;
    ctx.gradients.set(id, parseGradient(grad));
  }
}
function parseStyleElement(styleEl, ctx) {
  const text = styleEl.textContent || "";
  const ruleRe = /\.([a-zA-Z_][\w-]*)\s*\{([^}]+)\}/g;
  let match;
  while (match = ruleRe.exec(text)) {
    const className = match[1];
    const props = parseStyleMap(match[2]);
    const tikzOpts = cssPropsToTikzOpts(props, ctx);
    ctx.classStyles.set(className, { props, tikzOpts });
    if (tikzOpts.length > 0) {
      ctx.tikzStyles.push(`  \\tikzset{${className}/.style={${tikzOpts.join(", ")}}}`);
    }
  }
}
function cssPropsToTikzOpts(props, ctx) {
  const opts = [];
  appendPaintOptions(opts, {
    fill: props.get("fill"),
    fillRule: props.get("fill-rule"),
    stroke: props.get("stroke"),
    strokeWidth: props.get("stroke-width"),
    strokeOpacity: props.get("stroke-opacity"),
    fillOpacity: props.get("fill-opacity"),
    strokeDasharray: props.get("stroke-dasharray"),
    strokeDashoffset: props.get("stroke-dashoffset"),
    strokeLinecap: props.get("stroke-linecap"),
    strokeLinejoin: props.get("stroke-linejoin"),
    strokeMiterlimit: props.get("stroke-miterlimit"),
    opacity: props.get("opacity"),
    markerStart: props.get("marker-start"),
    markerEnd: props.get("marker-end")
  }, ctx);
  if (props.get("font-size") || props.get("font-weight") || props.get("font-style") || props.get("font-family")) {
    const fontOpt = buildFontOption({
      fontSize: props.get("font-size"),
      fontWeight: props.get("font-weight"),
      fontStyle: props.get("font-style"),
      fontFamily: props.get("font-family")
    }, ctx);
    if (fontOpt) opts.push(fontOpt);
  }
  return opts;
}
function detectArrowMarker(marker) {
  const path = marker.querySelector("path, polygon");
  if (!path) return false;
  if (path.tagName?.toLowerCase() === "polygon") {
    const pts = (path.getAttribute("points") || "").trim().split(/[\s,]+/).filter(Boolean);
    return pts.length >= 4 && pts.length <= 8;
  }
  const d = path.getAttribute("d") || "";
  const segments = parsePath(d);
  const nonClosed = segments.filter((seg) => seg.type !== "Z");
  return nonClosed.length >= 2 && nonClosed.length <= 5;
}
function parseGradient(gradEl) {
  const type = gradEl.tagName?.toLowerCase() === "lineargradient" ? "linear" : "radial";
  const stops = [];
  for (const stop of gradEl.querySelectorAll("stop")) {
    const styleMap = parseStyleMap(stop.getAttribute("style"));
    const offset = parsePercentOrNumber(stop.getAttribute("offset")) ?? 0;
    const color = stop.getAttribute("stop-color") || styleMap.get("stop-color") || "black";
    const opacity = parseNumeric(stop.getAttribute("stop-opacity")) ?? parseNumeric(styleMap.get("stop-opacity")) ?? 1;
    stops.push({ offset, hex: colorToHex(color), opacity });
  }
  stops.sort((a, b) => a.offset - b.offset);
  if (type === "linear") {
    const x1 = parseNumeric(gradEl.getAttribute("x1")) ?? 0;
    const y1 = parseNumeric(gradEl.getAttribute("y1")) ?? 0;
    const x2 = parseNumeric(gradEl.getAttribute("x2")) ?? 1;
    const y2 = parseNumeric(gradEl.getAttribute("y2")) ?? 0;
    return {
      type,
      stops,
      angle: Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI
    };
  }
  return { type, stops };
}
function identityTransform() {
  return [1, 0, 0, 1, 0, 0];
}
function isIdentityTransform(transform) {
  const matrix = getTransformMatrix(transform);
  return matrix.every((value, index) => Math.abs(value - identityTransform()[index]) < EPSILON);
}
function parseTransformAttr(str) {
  if (!str) return { matrix: identityTransform(), ops: [] };
  let matrix = identityTransform();
  const ops = [];
  const re = /(\w+)\(([^)]+)\)/g;
  let match;
  while (match = re.exec(str)) {
    const fn = match[1];
    const args = match[2].trim().split(/[\s,]+/).map(Number);
    let op = null;
    let opMatrix = identityTransform();
    switch (fn) {
      case "translate":
        op = { type: "translate", tx: args[0] || 0, ty: args[1] || 0 };
        opMatrix = [1, 0, 0, 1, op.tx, op.ty];
        break;
      case "scale":
        op = { type: "scale", sx: args[0] ?? 1, sy: args[1] ?? args[0] ?? 1 };
        opMatrix = [op.sx, 0, 0, op.sy, 0, 0];
        break;
      case "rotate": {
        const angle = (args[0] || 0) * Math.PI / 180;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const cx = args[1] || 0;
        const cy = args[2] || 0;
        const rotation = [cos, sin, -sin, cos, 0, 0];
        op = { type: "rotate", angle: args[0] || 0, cx, cy };
        opMatrix = cx || cy ? multiplyTransforms(multiplyTransforms([1, 0, 0, 1, cx, cy], rotation), [1, 0, 0, 1, -cx, -cy]) : rotation;
        break;
      }
      case "skewX":
        op = { type: "skewX", angle: args[0] || 0 };
        opMatrix = [1, 0, Math.tan((args[0] || 0) * Math.PI / 180), 1, 0, 0];
        break;
      case "skewY":
        op = { type: "skewY", angle: args[0] || 0 };
        opMatrix = [1, Math.tan((args[0] || 0) * Math.PI / 180), 0, 1, 0, 0];
        break;
      case "matrix":
        if (args.length === 6 && args.every(Number.isFinite)) {
          op = { type: "matrix", values: args };
          opMatrix = args;
        }
        break;
    }
    matrix = multiplyTransforms(matrix, opMatrix);
    if (op) ops.push(op);
  }
  return { matrix, ops };
}
function multiplyTransforms(a, b) {
  return [
    a[0] * b[0] + a[2] * b[1],
    a[1] * b[0] + a[3] * b[1],
    a[0] * b[2] + a[2] * b[3],
    a[1] * b[2] + a[3] * b[3],
    a[0] * b[4] + a[2] * b[5] + a[4],
    a[1] * b[4] + a[3] * b[5] + a[5]
  ];
}
function parseViewBox(svgEl) {
  const viewBox = svgEl.getAttribute("viewBox");
  if (viewBox) {
    const [x, y, w, h] = viewBox.split(/[\s,]+/).map(Number);
    return { x, y, w, h };
  }
  const width = parseNumeric(svgEl.getAttribute("width")) ?? 300;
  const height = parseNumeric(svgEl.getAttribute("height")) ?? 150;
  return { x: 0, y: 0, w: width, h: height };
}
function computeAutoScale(viewBox) {
  const maxDim = Math.max(viewBox.w, viewBox.h);
  return maxDim === 0 ? 1 : 10 / maxDim;
}
function getStyle(el, ctx) {
  const tag = el.tagName?.toLowerCase();
  const isShape = tag && !["text", "g", "svg", "defs"].includes(tag);
  const defaultFill = isShape && !["line", "polyline"].includes(tag) ? "black" : null;
  const read = (prop) => resolveStyleValue(el, prop, ctx);
  return {
    fill: read("fill") ?? defaultFill,
    fillRule: read("fill-rule"),
    stroke: read("stroke") ?? (isShape ? "none" : null),
    strokeWidth: read("stroke-width"),
    strokeOpacity: read("stroke-opacity"),
    fillOpacity: read("fill-opacity"),
    opacity: read("opacity"),
    strokeDasharray: read("stroke-dasharray"),
    strokeDashoffset: read("stroke-dashoffset"),
    strokeLinecap: read("stroke-linecap"),
    strokeLinejoin: read("stroke-linejoin"),
    strokeMiterlimit: read("stroke-miterlimit"),
    fontFamily: read("font-family"),
    fontSize: read("font-size"),
    fontStyle: read("font-style"),
    fontWeight: read("font-weight"),
    textAnchor: read("text-anchor"),
    dominantBaseline: read("dominant-baseline") ?? read("alignment-baseline"),
    baselineShift: read("baseline-shift"),
    display: read("display"),
    visibility: read("visibility"),
    markerStart: read("marker-start"),
    markerMid: read("marker-mid"),
    markerEnd: read("marker-end")
  };
}
function resolveStyleValue(el, prop, ctx) {
  const own = getOwnStyleValue(el, prop, ctx);
  if (own != null) return own;
  const computed = getComputedStyleValue(el, prop);
  if (computed != null) return computed;
  if (INHERITED_PROPS.has(prop) && el.parentElement) {
    return resolveStyleValue(el.parentElement, prop, ctx);
  }
  return null;
}
function getOwnStyleValue(el, prop, ctx) {
  const styleMap = parseStyleMap(el.getAttribute("style"));
  if (styleMap.has(prop)) return styleMap.get(prop);
  const attr = el.getAttribute(prop);
  if (attr != null && attr !== "") return attr;
  const classValue = getClassStyleValue(el, prop, ctx);
  if (classValue != null) return classValue;
  return null;
}
function getClassStyleValue(el, prop, ctx) {
  const classAttr = el.getAttribute("class");
  if (!classAttr) return null;
  let value = null;
  for (const cls of classAttr.trim().split(/\s+/)) {
    const entry = ctx.classStyles.get(cls);
    if (!entry) continue;
    if (entry.props.has(prop)) value = entry.props.get(prop);
  }
  return value;
}
function getComputedStyleValue(el, prop) {
  const win = el.ownerDocument?.defaultView;
  if (!win?.getComputedStyle) return null;
  const computed = win.getComputedStyle(el);
  if (!computed) return null;
  const camel = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  const value = computed.getPropertyValue?.(prop) || computed[camel];
  return value && value !== "" ? value : null;
}
function parseStyleMap(styleText) {
  const props = /* @__PURE__ */ new Map();
  if (!styleText) return props;
  for (const decl of styleText.split(";")) {
    const colon = decl.indexOf(":");
    if (colon < 0) continue;
    const prop = decl.slice(0, colon).trim();
    const value = decl.slice(colon + 1).trim();
    if (prop && value) props.set(prop, value);
  }
  return props;
}
function parseUrlRef(str) {
  if (!str) return null;
  const match = str.match(/url\(["']?#([^"')]+)["']?\)/);
  return match ? match[1] : null;
}
function resolveMarkerRef(str) {
  return parseUrlRef(str);
}
function getGradientOpts(gradId, ctx) {
  const grad = ctx.gradients.get(gradId);
  if (!grad || grad.stops.length < 2) return null;
  const first = grad.stops[0];
  const last = grad.stops[grad.stops.length - 1];
  const c1 = first.hex ? getTikzColor(first.hex, ctx) : "white";
  const c2 = last.hex ? getTikzColor(last.hex, ctx) : "white";
  if (grad.type === "radial") {
    return [`inner color=${c1}`, `outer color=${c2}`];
  }
  const angle = grad.angle || 0;
  const tikzAngle = -angle;
  if (Math.abs(angle) < 1) {
    return [`left color=${c1}`, `right color=${c2}`];
  }
  if (Math.abs(angle - 90) < 1) {
    return [`top color=${c1}`, `bottom color=${c2}`];
  }
  if (Math.abs(angle + 90) < 1 || Math.abs(angle - 270) < 1) {
    return [`bottom color=${c1}`, `top color=${c2}`];
  }
  if (Math.abs(Math.abs(angle) - 180) < 1) {
    return [`right color=${c1}`, `left color=${c2}`];
  }
  return [`left color=${c1}`, `right color=${c2}`, `shading angle=${fmt(tikzAngle, ctx)}`];
}
function buildDrawCommand(el, style, ctx) {
  const opts = [...getClassStyleNames(el, ctx)];
  const gradId = parseUrlRef(style.fill);
  const gradOpts = gradId ? getGradientOpts(gradId, ctx) : null;
  const hasGradient = !!gradOpts;
  let hasFill = false;
  let fillColor = null;
  if (hasGradient) {
    hasFill = true;
    opts.push(...gradOpts);
  } else {
    const fillHex = colorToHex(style.fill);
    hasFill = fillHex !== null && style.fill !== "none";
    if (hasFill) fillColor = getTikzColor(fillHex, ctx);
  }
  const strokeHex = colorToHex(style.stroke);
  const hasStroke = strokeHex !== null && style.stroke !== "none";
  const strokeColor = hasStroke ? getTikzColor(strokeHex, ctx) : null;
  let cmd = "draw";
  if (hasGradient && hasStroke) cmd = "shadedraw";
  else if (hasGradient) cmd = "shade";
  else if (hasStroke) cmd = "draw";
  else if (hasFill) cmd = "fill";
  if (hasStroke && strokeColor && strokeColor !== "black") {
    opts.push(strokeColor);
  }
  if (!hasGradient && hasFill) {
    if (cmd === "fill") {
      if (fillColor && fillColor !== "black") opts.push(fillColor);
    } else if (fillColor === "black") {
      opts.push("fill");
    } else if (fillColor) {
      opts.push(`fill=${fillColor}`);
    }
  }
  appendStrokeAndOpacityOptions(opts, style, ctx);
  return { cmd, opts };
}
function appendPaintOptions(opts, style, ctx) {
  const fillHex = colorToHex(style.fill);
  if (fillHex) {
    const color = getTikzColor(fillHex, ctx);
    opts.push(color === "black" ? "fill" : `fill=${color}`);
  }
  const strokeHex = colorToHex(style.stroke);
  if (strokeHex) {
    const color = getTikzColor(strokeHex, ctx);
    opts.push(color === "black" ? "draw" : `draw=${color}`);
  }
  appendStrokeAndOpacityOptions(opts, style, ctx);
}
function appendStrokeAndOpacityOptions(opts, style, ctx) {
  const strokeHex = colorToHex(style.stroke);
  const hasStroke = strokeHex !== null && style.stroke !== "none";
  if (hasStroke && style.strokeWidth != null) {
    const width = parseNumeric(style.strokeWidth) ?? 1;
    opts.push(`line width=${dimPt(width, ctx)}`);
  }
  const arrow = getArrowOpts(style, ctx);
  if (arrow) opts.push(arrow);
  const opacity = parseNumeric(style.opacity);
  if (opacity != null && opacity < 1) opts.push(`opacity=${fmt(opacity, ctx)}`);
  const fillOpacity = parseNumeric(style.fillOpacity);
  if (fillOpacity != null && fillOpacity < 1) opts.push(`fill opacity=${fmt(fillOpacity, ctx)}`);
  const strokeOpacity = parseNumeric(style.strokeOpacity);
  if (strokeOpacity != null && strokeOpacity < 1) opts.push(`draw opacity=${fmt(strokeOpacity, ctx)}`);
  if (style.fillRule === "evenodd") opts.push("even odd rule");
  else if (style.fillRule === "nonzero") opts.push("nonzero rule");
  const miterLimit = parseNumeric(style.strokeMiterlimit);
  if (miterLimit != null && miterLimit >= 1 && Math.abs(miterLimit - 4) > EPSILON) {
    opts.push(`miter limit=${fmt(miterLimit, ctx)}`);
  }
  const dashPattern = buildDashPattern(style, ctx);
  if (dashPattern) opts.push(`dash pattern=${dashPattern}`);
  const dashPhase = parseNumeric(style.strokeDashoffset);
  if (dashPhase != null && Math.abs(dashPhase) > EPSILON) {
    opts.push(`dash phase=${dimPt(dashPhase, ctx)}`);
  }
  const linecap = mapLinecap(style.strokeLinecap);
  if (linecap) opts.push(`line cap=${linecap}`);
  const linejoin = mapLinejoin(style.strokeLinejoin);
  if (linejoin) opts.push(`line join=${linejoin}`);
}
function buildDashPattern(style, ctx) {
  const parts = parseDashArray(style.strokeDasharray);
  if (!parts.length) return null;
  return parts.map((value, index) => `${index % 2 === 0 ? "on" : "off"} ${dimPt(value, ctx)}`).join(" ");
}
function parseDashArray(dasharray) {
  if (!dasharray || dasharray === "none") return [];
  const parts = dasharray.replace(/,/g, " ").trim().split(/\s+/).map(parseNumeric).filter((value) => value != null && value >= 0);
  if (!parts.length) return [];
  return parts.length % 2 === 1 ? [...parts, ...parts] : parts;
}
function mapLinecap(linecap) {
  if (!linecap || linecap === "butt") return null;
  if (linecap === "square") return "rect";
  return linecap;
}
function mapLinejoin(linejoin) {
  if (!linejoin || linejoin === "miter") return null;
  return linejoin;
}
function getArrowOpts(style, ctx) {
  const startRef = resolveMarkerRef(style.markerStart);
  const endRef = resolveMarkerRef(style.markerEnd);
  const startIsArrow = startRef && ctx.markers.get(startRef)?.isArrow;
  const endIsArrow = endRef && ctx.markers.get(endRef)?.isArrow;
  if (startIsArrow && endIsArrow) {
    ctx.usesArrows = true;
    return "<->";
  }
  if (endIsArrow) {
    ctx.usesArrows = true;
    return "->";
  }
  if (startIsArrow) {
    ctx.usesArrows = true;
    return "<-";
  }
  return null;
}
function getClassStyleNames(el, ctx) {
  const classAttr = el.getAttribute("class");
  if (!classAttr) return [];
  return classAttr.trim().split(/\s+/).filter((cls) => ctx.classStyles.has(cls));
}
function buildTransformScopes(transform, ctx, forNode) {
  if (!transform || isIdentityTransform(transform)) return [];
  let opts = buildAtomicTransformOptionList(transform, ctx);
  if (opts == null) opts = buildCmTransformOpts(transform, ctx);
  if (forNode && opts.length > 0) {
    opts = ["transform shape", ...opts];
  }
  return opts.length ? [opts] : [];
}
function buildAtomicTransformOptionList(transform, ctx) {
  const ops = transform?.ops ?? [];
  if (!ops.length) return [];
  const steps = [];
  for (const op of ops) {
    const opSteps = buildAtomicScopesForOp(op, ctx);
    if (opSteps == null) return null;
    steps.push(...opSteps);
  }
  return compactTransformSteps(steps);
}
function buildAtomicScopesForOp(op, ctx) {
  switch (op.type) {
    case "translate": {
      const opts = buildShiftOpts(op.tx * ctx.scale, -op.ty * ctx.scale, ctx);
      return opts.length ? [opts] : [];
    }
    case "rotate": {
      const angle = -(op.angle || 0);
      if (Math.abs(angle) < EPSILON) return [];
      const pivot = coord(op.cx || 0, op.cy || 0, ctx);
      return [[`rotate around={${fmt(angle, ctx)}:${pivot}}`]];
    }
    case "scale": {
      const sx = op.sx ?? 1;
      const sy = op.sy ?? 1;
      const scaleOpts = [];
      if (Math.abs(sx - sy) < EPSILON) {
        if (Math.abs(sx - 1) < EPSILON) return [];
        scaleOpts.push(`scale=${fmt(sx, ctx)}`);
      } else {
        if (Math.abs(sx - 1) >= EPSILON) scaleOpts.push(`xscale=${fmt(sx, ctx)}`);
        if (Math.abs(sy - 1) >= EPSILON) scaleOpts.push(`yscale=${fmt(sy, ctx)}`);
        if (!scaleOpts.length) return [];
      }
      return wrapPivotedTransform(coord(0, 0, ctx), scaleOpts, ctx);
    }
    case "skewX": {
      const factor = -Math.tan((op.angle || 0) * Math.PI / 180);
      if (Math.abs(factor) < EPSILON) return [];
      return wrapPivotedTransform(coord(0, 0, ctx), [`xslant=${fmt(factor, ctx)}`], ctx);
    }
    case "skewY": {
      const factor = -Math.tan((op.angle || 0) * Math.PI / 180);
      if (Math.abs(factor) < EPSILON) return [];
      return wrapPivotedTransform(coord(0, 0, ctx), [`yslant=${fmt(factor, ctx)}`], ctx);
    }
    default:
      return null;
  }
}
function compactTransformSteps(steps) {
  const compacted = [];
  for (const step of steps) {
    if (!step.length) continue;
    const prev = compacted[compacted.length - 1];
    if (prev && isShiftStep(prev) && isShiftStep(step)) {
      const merged = mergeShiftSteps(prev, step);
      if (merged.length) {
        compacted[compacted.length - 1] = merged;
      } else {
        compacted.pop();
      }
      continue;
    }
    compacted.push(step);
  }
  return compacted.flat();
}
function isShiftStep(step) {
  return step.every((opt) => opt.startsWith("xshift=") || opt.startsWith("yshift="));
}
function mergeShiftSteps(a, b) {
  const merged = /* @__PURE__ */ new Map([
    ["xshift", 0],
    ["yshift", 0]
  ]);
  for (const step of [a, b]) {
    for (const opt of step) {
      const match = opt.match(/^(xshift|yshift)=(-?\d+(?:\.\d+)?)cm$/);
      if (!match) continue;
      merged.set(match[1], (merged.get(match[1]) || 0) + parseFloat(match[2]));
    }
  }
  const result = [];
  const x = merged.get("xshift") || 0;
  const y = merged.get("yshift") || 0;
  if (Math.abs(x) >= EPSILON) result.push(`xshift=${trimFloat(x)}cm`);
  if (Math.abs(y) >= EPSILON) result.push(`yshift=${trimFloat(y)}cm`);
  return result;
}
function trimFloat(value) {
  return parseFloat(value.toFixed(12));
}
function wrapPivotedTransform(pivot, transformOpts, ctx) {
  const [px, py] = parseCoordTuple(pivot);
  const startShift = buildShiftOpts(px, py, ctx);
  const endShift = buildShiftOpts(-px, -py, ctx);
  const scopes = [];
  if (startShift.length) scopes.push(startShift);
  scopes.push(transformOpts);
  if (endShift.length) scopes.push(endShift);
  return scopes;
}
function buildShiftOpts(x, y, ctx) {
  const opts = [];
  if (Math.abs(x) >= EPSILON) opts.push(`xshift=${fmt(x, ctx)}cm`);
  if (Math.abs(y) >= EPSILON) opts.push(`yshift=${fmt(y, ctx)}cm`);
  return opts;
}
function parseCoordTuple(coordText) {
  const match = coordText.match(/^\(([^,]+),([^)]+)\)$/);
  if (!match) return [0, 0];
  return [parseFloat(match[1]), parseFloat(match[2])];
}
function buildCmTransformOpts(transform, ctx) {
  const [a, b, c, d, tx, ty] = svgTransformToTikzCm(getTransformMatrix(transform), ctx);
  return [`cm={${fmt(a, ctx)},${fmt(b, ctx)},${fmt(c, ctx)},${fmt(d, ctx)},${formatPoint(tx, ty, ctx)}}`];
}
function getTransformMatrix(transform) {
  return Array.isArray(transform) ? transform : transform?.matrix ?? identityTransform();
}
function svgTransformToTikzCm(transform, ctx) {
  const [a, b, c, d, e, f] = transform;
  const x0 = -ctx.viewBox.x * ctx.scale;
  const y0 = (ctx.viewBox.y + ctx.viewBox.h) * ctx.scale;
  const ma = a;
  const mb = -b;
  const mc = -c;
  const md = d;
  const tx = ctx.scale * e + x0 - (ma * x0 + mc * y0);
  const ty = -ctx.scale * f + y0 - (mb * x0 + md * y0);
  return [ma, mb, mc, md, tx, ty];
}
function fmt(val, ctx) {
  return parseFloat(Number(val).toFixed(ctx.precision));
}
function dimPt(svgUnits, ctx) {
  return `${fmt(svgUnits * ctx.scale * CM_TO_PT, ctx)}pt`;
}
function coord(x, y, ctx) {
  const sx = (x - ctx.viewBox.x) * ctx.scale;
  const sy = (ctx.viewBox.y + ctx.viewBox.h - y) * ctx.scale;
  return formatPoint(sx, sy, ctx);
}
function formatPoint(x, y, ctx) {
  return `(${fmt(x, ctx)},${fmt(y, ctx)})`;
}
function emit(ctx, line) {
  ctx.lines.push(`${"  ".repeat(ctx.indent)}${line}`);
}
function withScope(ctx, opts, callback) {
  if (!opts.length) {
    callback();
    return;
  }
  emit(ctx, `\\begin{scope}${optsStr(opts)}`);
  ctx.indent++;
  callback();
  ctx.indent--;
  emit(ctx, "\\end{scope}");
}
function withTransformScopes(ctx, transform, forNode, callback) {
  const scopes = buildTransformScopes(transform, ctx, forNode);
  if (!scopes.length) {
    callback();
    return;
  }
  for (const opts of scopes) {
    emit(ctx, `\\begin{scope}${optsStr(opts)}`);
    ctx.indent++;
  }
  callback();
  for (let i = scopes.length - 1; i >= 0; i--) {
    ctx.indent--;
    emit(ctx, "\\end{scope}");
  }
}
function processChildren(parent, ctx) {
  for (const child of parent.children || []) {
    const tag = child.tagName?.toLowerCase();
    if (!tag) continue;
    const style = getStyle(child, ctx);
    if (style.display === "none" || style.visibility === "hidden") continue;
    const transform = parseTransformAttr(child.getAttribute("transform"));
    switch (tag) {
      case "defs":
      case "clippath":
      case "mask":
      case "style":
      case "metadata":
      case "title":
      case "desc":
        break;
      case "g":
      case "svg":
        emitGroup(child, ctx, style, transform);
        break;
      case "rect":
        emitRect(child, ctx, style, transform);
        break;
      case "circle":
        emitCircle(child, ctx, style, transform);
        break;
      case "ellipse":
        emitEllipse(child, ctx, style, transform);
        break;
      case "line":
        emitLine(child, ctx, style, transform);
        break;
      case "polyline":
        emitPolyline(child, ctx, style, transform, false);
        break;
      case "polygon":
        emitPolyline(child, ctx, style, transform, true);
        break;
      case "path":
        emitPath(child, ctx, style, transform);
        break;
      case "text":
        emitText(child, ctx, style, transform);
        break;
      case "use":
        emitUse(child, ctx, style, transform);
        break;
      default:
        if (child.children?.length) emitGroup(child, ctx, style, transform);
    }
  }
}
function emitGroup(el, ctx, style, transform) {
  const opacity = parseNumeric(style.opacity);
  if (opacity != null && opacity < 1) {
    withScope(ctx, [`opacity=${fmt(opacity, ctx)}`, "transparency group"], () => {
      withTransformScopes(ctx, transform, true, () => processChildren(el, ctx));
    });
    return;
  }
  withTransformScopes(ctx, transform, true, () => processChildren(el, ctx));
}
function emitRect(el, ctx, style, transform) {
  const x = parseNumeric(el.getAttribute("x")) ?? 0;
  const y = parseNumeric(el.getAttribute("y")) ?? 0;
  const w = parseNumeric(el.getAttribute("width")) ?? 0;
  const h = parseNumeric(el.getAttribute("height")) ?? 0;
  const rx = parseNumeric(el.getAttribute("rx"));
  const ry = parseNumeric(el.getAttribute("ry"));
  if (w === 0 || h === 0) return;
  const { cmd, opts } = buildDrawCommand(el, style, ctx);
  const radius = rx ?? ry;
  if (radius != null && radius > 0) opts.push(`rounded corners=${dimPt(radius, ctx)}`);
  withTransformScopes(ctx, transform, false, () => {
    emit(ctx, `\\${cmd}${optsStr(opts)} ${coord(x, y, ctx)} rectangle ${coord(x + w, y + h, ctx)};`);
  });
}
function emitCircle(el, ctx, style, transform) {
  const cx = parseNumeric(el.getAttribute("cx")) ?? 0;
  const cy = parseNumeric(el.getAttribute("cy")) ?? 0;
  const r = parseNumeric(el.getAttribute("r")) ?? 0;
  if (r === 0) return;
  const { cmd, opts } = buildDrawCommand(el, style, ctx);
  withTransformScopes(ctx, transform, false, () => {
    emit(ctx, `\\${cmd}${optsStr(opts)} ${coord(cx, cy, ctx)} circle[radius=${fmt(r * ctx.scale, ctx)}cm];`);
  });
}
function emitEllipse(el, ctx, style, transform) {
  const cx = parseNumeric(el.getAttribute("cx")) ?? 0;
  const cy = parseNumeric(el.getAttribute("cy")) ?? 0;
  const rx = parseNumeric(el.getAttribute("rx")) ?? 0;
  const ry = parseNumeric(el.getAttribute("ry")) ?? 0;
  if (rx === 0 && ry === 0) return;
  const { cmd, opts } = buildDrawCommand(el, style, ctx);
  withTransformScopes(ctx, transform, false, () => {
    emit(ctx, `\\${cmd}${optsStr(opts)} ${coord(cx, cy, ctx)} ellipse[x radius=${fmt(rx * ctx.scale, ctx)}cm, y radius=${fmt(ry * ctx.scale, ctx)}cm];`);
  });
}
function emitLine(el, ctx, style, transform) {
  const x1 = parseNumeric(el.getAttribute("x1")) ?? 0;
  const y1 = parseNumeric(el.getAttribute("y1")) ?? 0;
  const x2 = parseNumeric(el.getAttribute("x2")) ?? 0;
  const y2 = parseNumeric(el.getAttribute("y2")) ?? 0;
  const { cmd, opts } = buildDrawCommand(el, style, ctx);
  withTransformScopes(ctx, transform, false, () => {
    emit(ctx, `\\${cmd}${optsStr(opts)} ${coord(x1, y1, ctx)} -- ${coord(x2, y2, ctx)};`);
  });
}
function emitPolyline(el, ctx, style, transform, close) {
  const pointsAttr = el.getAttribute("points");
  if (!pointsAttr) return;
  const coords = pointsAttr.trim().split(/[\s,]+/).map(Number);
  if (coords.length < 4) return;
  const points = [];
  for (let i = 0; i < coords.length; i += 2) {
    points.push(coord(coords[i], coords[i + 1], ctx));
  }
  const { cmd, opts } = buildDrawCommand(el, style, ctx);
  withTransformScopes(ctx, transform, false, () => {
    if (points.length <= 4) {
      emit(ctx, `\\${cmd}${optsStr(opts)} ${points.join(" -- ")}${close ? " -- cycle" : ""};`);
      return;
    }
    const indent = "  ".repeat(ctx.indent);
    const contIndent = `${indent}  `;
    ctx.lines.push(`${indent}\\${cmd}${optsStr(opts)} ${points[0]}`);
    for (let i = 1; i < points.length; i++) {
      ctx.lines.push(`${contIndent}-- ${points[i]}`);
    }
    ctx.lines[ctx.lines.length - 1] += close ? " -- cycle;" : ";";
  });
}
function emitPath(el, ctx, style, transform) {
  const d = el.getAttribute("d");
  if (!d) return;
  const segments = parsePath(d);
  if (!segments.length) return;
  const { cmd, opts } = buildDrawCommand(el, style, ctx);
  const ops = [];
  for (const seg of segments) {
    switch (seg.type) {
      case "M":
        ops.push({ text: coord(seg.x, seg.y, ctx) });
        break;
      case "L":
        ops.push({ text: `-- ${coord(seg.x, seg.y, ctx)}` });
        break;
      case "C":
        ops.push({
          text: `.. controls ${coord(seg.x1, seg.y1, ctx)} and ${coord(seg.x2, seg.y2, ctx)} .. ${coord(seg.x, seg.y, ctx)}`,
          isCurve: true
        });
        break;
      case "Z":
        ops.push({ text: "-- cycle" });
        break;
    }
  }
  if (!ops.length) return;
  withTransformScopes(ctx, transform, false, () => {
    if (ops.length <= 3 && !ops.some((op) => op.isCurve)) {
      emit(ctx, `\\${cmd}${optsStr(opts)} ${ops.map((op) => op.text).join(" ")};`);
      return;
    }
    const indent = "  ".repeat(ctx.indent);
    const contIndent = `${indent}  `;
    ctx.lines.push(`${indent}\\${cmd}${optsStr(opts)} ${ops[0].text}`);
    for (let i = 1; i < ops.length; i++) {
      ctx.lines.push(`${contIndent}${ops[i].text}${i === ops.length - 1 ? ";" : ""}`);
    }
  });
}
function emitText(el, ctx, style, transform) {
  const x = parseTextCoord(el, "x") ?? 0;
  const y = parseTextCoord(el, "y") ?? 0;
  const text = serializeText(el, ctx).trim();
  if (!text) return;
  const opts = buildTextOpts(style, ctx);
  withTransformScopes(ctx, transform, true, () => {
    emit(ctx, `\\node${optsStr(opts)} at ${coord(x, y, ctx)} {${text}};`);
  });
}
function emitUse(el, ctx, style, transform) {
  const href = el.getAttribute("href") || el.getAttributeNS(XLINK_NS, "href");
  if (!href?.startsWith("#")) return;
  const target = el.ownerDocument.getElementById(href.slice(1));
  if (!target) return;
  const x = parseNumeric(el.getAttribute("x")) ?? 0;
  const y = parseNumeric(el.getAttribute("y")) ?? 0;
  const useTransform = combineTransforms(transform, {
    matrix: [1, 0, 0, 1, x, y],
    ops: Math.abs(x) < EPSILON && Math.abs(y) < EPSILON ? [] : [{ type: "translate", tx: x, ty: y }]
  });
  const opacity = parseNumeric(style.opacity);
  const render = () => {
    withTransformScopes(ctx, useTransform, true, () => {
      if (target.tagName?.toLowerCase() === "g") processChildren(target, ctx);
      else processChildren(wrapElement(target), ctx);
    });
  };
  if (opacity != null && opacity < 1) {
    withScope(ctx, [`opacity=${fmt(opacity, ctx)}`, "transparency group"], render);
    return;
  }
  render();
}
function combineTransforms(a, b) {
  return {
    matrix: multiplyTransforms(getTransformMatrix(a), getTransformMatrix(b)),
    ops: [...a?.ops ?? [], ...b?.ops ?? []]
  };
}
function wrapElement(el) {
  const doc = el.ownerDocument;
  const group = doc.createElementNS?.(SVG_NS, "g") ?? doc.createElement("g");
  group.appendChild(el.cloneNode(true));
  return group;
}
function buildTextOpts(style, ctx) {
  const opts = [];
  const fillHex = colorToHex(style.fill);
  if (fillHex && fillHex !== "000000") {
    opts.push(`text=${getTikzColor(fillHex, ctx)}`);
  }
  const opacity = parseNumeric(style.opacity);
  if (opacity != null && opacity < 1) opts.push(`text opacity=${fmt(opacity, ctx)}`);
  const anchor = mapTextAnchor(style.textAnchor, style.dominantBaseline);
  if (anchor) opts.push(`anchor=${anchor}`);
  const fontOpt = buildFontOption(style, ctx);
  if (fontOpt) opts.push(fontOpt);
  return opts;
}
function buildFontOption(style, ctx) {
  const commands = [];
  const family = mapFontFamily(style.fontFamily);
  if (family) commands.push(family);
  const size = mapFontSize(style.fontSize, ctx);
  if (size) commands.push(size);
  const weight = style.fontWeight?.toLowerCase?.();
  if (weight === "bold" || (parseNumeric(style.fontWeight) ?? 0) >= 700) {
    commands.push("\\bfseries");
  }
  if (style.fontStyle?.toLowerCase?.() === "italic" || style.fontStyle?.toLowerCase?.() === "oblique") {
    commands.push("\\itshape");
  }
  if (!commands.length) return null;
  return `font={${commands.join("")}}`;
}
function mapFontFamily(fontFamily) {
  if (!fontFamily) return null;
  const family = fontFamily.toLowerCase();
  if (family.includes("mono") || family.includes("courier") || family.includes("consolas") || family.includes("cascadia")) {
    return "\\ttfamily";
  }
  if (family.includes("sans") || family.includes("helvetica") || family.includes("arial") || family.includes("montserrat")) {
    return "\\sffamily";
  }
  return null;
}
function mapFontSize(fontSize, ctx) {
  const size = parseNumeric(fontSize);
  if (size == null) return null;
  const scaled = size * ctx.scale;
  if (scaled < 0.18) return "\\tiny";
  if (scaled < 0.24) return "\\scriptsize";
  if (scaled < 0.3) return "\\footnotesize";
  if (scaled < 0.4) return "\\small";
  if (scaled > 0.85) return "\\Large";
  if (scaled > 0.6) return "\\large";
  return null;
}
function mapTextAnchor(textAnchor, dominantBaseline) {
  const horizontal = textAnchor === "middle" ? "" : textAnchor === "end" ? " east" : " west";
  switch ((dominantBaseline || "").toLowerCase()) {
    case "middle":
    case "central":
      return `mid${horizontal}`.trim();
    case "hanging":
    case "text-before-edge":
      return `north${horizontal}`.trim();
    case "text-after-edge":
    case "ideographic":
    case "bottom":
      return `south${horizontal}`.trim();
    default:
      return `base${horizontal}`.trim();
  }
}
function parseTextCoord(el, attr) {
  const own = el.getAttribute(attr);
  if (own) return parseNumeric(own.split(/[\s,]+/)[0]);
  const tspan = el.querySelector("tspan");
  const tspanValue = tspan?.getAttribute(attr);
  return tspanValue ? parseNumeric(tspanValue.split(/[\s,]+/)[0]) : null;
}
function serializeText(el, ctx) {
  const style = getStyle(el, ctx);
  const state = { hasText: false };
  return serializeTextNode(el, ctx, style, style, state);
}
function serializeTextNode(node, ctx, inheritedStyle, rootStyle, state) {
  if (node.nodeType === 3) {
    const text = normalizeTextChunk(node.nodeValue || "");
    if (!text) return "";
    state.hasText = true;
    return escapeLatex(text);
  }
  if (node.nodeType !== 1) return "";
  const tag = node.tagName?.toLowerCase();
  if (tag !== "text" && tag !== "tspan") return "";
  const style = getStyle(node, ctx);
  const hadContentBefore = state.hasText;
  let content = "";
  for (const child of node.childNodes) {
    const part = serializeTextNode(child, ctx, style, rootStyle, state);
    if (!part) continue;
    content += part;
  }
  if (!content.trim()) return "";
  if (tag === "tspan" && shouldStartNewTextLine(node) && hadContentBefore) {
    content = `\\\\ ${content}`;
  }
  content = applyInlineTextStyles(content, style, inheritedStyle, rootStyle);
  return content;
}
function shouldStartNewTextLine(node) {
  return node.hasAttribute("x") || node.hasAttribute("y") || node.hasAttribute("dy");
}
function applyInlineTextStyles(content, style, inheritedStyle, rootStyle) {
  let result = content;
  const rootFillHex = colorToHex(rootStyle.fill);
  if (style.fontStyle !== inheritedStyle.fontStyle && (style.fontStyle === "italic" || style.fontStyle === "oblique")) {
    result = `\\textit{${result}}`;
  }
  const weight = parseNumeric(style.fontWeight) ?? 0;
  const inheritedWeight = parseNumeric(inheritedStyle.fontWeight) ?? 0;
  const isBold = style.fontWeight === "bold" || weight >= 700;
  const inheritedBold = inheritedStyle.fontWeight === "bold" || inheritedWeight >= 700;
  if (isBold && !inheritedBold) {
    result = `\\textbf{${result}}`;
  }
  const fillHex = colorToHex(style.fill);
  const inheritedFillHex = colorToHex(inheritedStyle.fill);
  const needsExplicitBlack = fillHex === "000000" && inheritedFillHex != null && inheritedFillHex !== "000000";
  if (fillHex && fillHex !== inheritedFillHex && fillHex !== rootFillHex && (fillHex !== "000000" || needsExplicitBlack)) {
    result = fillHex === "000000" ? `\\textcolor{black}{${result}}` : `\\textcolor[HTML]{${fillHex}}{${result}}`;
  }
  const baseline = (style.baselineShift || "").toLowerCase();
  if (baseline.includes("super")) result = `\\(^{${result}}\\)`;
  else if (baseline.includes("sub")) result = `\\(_{${result}}\\)`;
  return result;
}
function normalizeTextChunk(text) {
  return text.replace(/\s+/g, " ");
}
function optsStr(opts) {
  return opts.length ? `[${opts.join(", ")}]` : "";
}
function colorToHex(colorStr) {
  if (!colorStr) return null;
  const color = colorStr.trim().toLowerCase();
  if (!color || color === "none" || color === "transparent") return null;
  if (CSS_COLOR_KEYWORDS.has(color)) return CSS_COLOR_KEYWORDS.get(color);
  const hexMatch = color.match(/^#([0-9a-f]{3,8})$/i);
  if (hexMatch) return normalizeHex(hexMatch[1]);
  const rgbMatch = color.match(/^rgba?\(([^)]+)\)$/i);
  if (rgbMatch) {
    const parts = rgbMatch[1].split(",").map((part) => part.trim());
    if (parts.length >= 3) {
      const rgb = parts.slice(0, 3).map(parseCssChannel);
      if (rgb.every((value) => value != null)) {
        return toHex(rgb[0], rgb[1], rgb[2]);
      }
    }
  }
  const hslMatch = color.match(/^hsla?\(([^)]+)\)$/i);
  if (hslMatch) {
    const parts = hslMatch[1].split(",").map((part) => part.trim());
    if (parts.length >= 3) {
      const h = parseNumeric(parts[0]) ?? 0;
      const s = parsePercentOrNumber(parts[1]);
      const l = parsePercentOrNumber(parts[2]);
      if (s != null && l != null) {
        const [r, g, b] = hslToRgb(h, s, l);
        return toHex(r, g, b);
      }
    }
  }
  if (typeof document !== "undefined") {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const context = canvas.getContext("2d");
    if (context) {
      context.fillStyle = colorStr;
      const normalized = context.fillStyle;
      if (normalized && normalized !== "#000000" && normalized !== "rgba(0, 0, 0, 0)") {
        return colorToHex(normalized);
      }
      if (normalized === "#000000" && color === "black") return "000000";
    }
  }
  return null;
}
function normalizeHex(hex) {
  if (hex.length === 3) {
    return hex.split("").map((ch) => ch + ch).join("").toUpperCase();
  }
  if (hex.length === 4) {
    return hex.slice(0, 3).split("").map((ch) => ch + ch).join("").toUpperCase();
  }
  if (hex.length === 6) return hex.toUpperCase();
  if (hex.length === 8) return hex.slice(0, 6).toUpperCase();
  return null;
}
function parseCssChannel(part) {
  if (part.endsWith("%")) {
    const pct = parseNumeric(part.slice(0, -1));
    return pct == null ? null : clampChannel(pct / 100 * 255);
  }
  const value = parseNumeric(part);
  return value == null ? null : clampChannel(value);
}
function clampChannel(value) {
  return Math.max(0, Math.min(255, Math.round(value)));
}
function hslToRgb(h, s, l) {
  const hue = (h % 360 + 360) % 360 / 360;
  const sat = Math.max(0, Math.min(1, s));
  const light = Math.max(0, Math.min(1, l));
  if (sat === 0) {
    const gray = clampChannel(light * 255);
    return [gray, gray, gray];
  }
  const q = light < 0.5 ? light * (1 + sat) : light + sat - light * sat;
  const p = 2 * light - q;
  const toChannel = (t) => {
    let value = t;
    if (value < 0) value += 1;
    if (value > 1) value -= 1;
    if (value < 1 / 6) return p + (q - p) * 6 * value;
    if (value < 1 / 2) return q;
    if (value < 2 / 3) return p + (q - p) * (2 / 3 - value) * 6;
    return p;
  };
  return [
    clampChannel(toChannel(hue + 1 / 3) * 255),
    clampChannel(toChannel(hue) * 255),
    clampChannel(toChannel(hue - 1 / 3) * 255)
  ];
}
function toHex(r, g, b) {
  return (r << 16 | g << 8 | b).toString(16).toUpperCase().padStart(6, "0");
}
function hexToRgb(hex) {
  const value = parseInt(hex, 16);
  return [value >> 16 & 255, value >> 8 & 255, value & 255];
}
function nearestColorName(hex) {
  const [r, g, b] = hexToRgb(hex);
  let bestName = "gray";
  let bestDistance = Infinity;
  for (const [name, pr, pg, pb] of XCOLOR_COLORS) {
    const dr = r - pr;
    const dg = g - pg;
    const db = b - pb;
    const dist = dr * dr + dg * dg + db * db;
    if (dist < bestDistance) {
      bestDistance = dist;
      bestName = name;
    }
  }
  return bestName;
}
function getTikzColor(hex, ctx) {
  if (!hex) return null;
  if (XCOLOR_EXACT.has(hex)) return XCOLOR_EXACT.get(hex);
  if (ctx.colors.has(hex)) return ctx.colors.get(hex);
  const baseName = nearestColorName(hex);
  let suffix = 1;
  let name = `${baseName}${suffix}`;
  const usedNames = new Set(ctx.colors.values());
  while (usedNames.has(name)) {
    suffix += 1;
    name = `${baseName}${suffix}`;
  }
  ctx.colors.set(hex, name);
  return name;
}
function parseNumeric(value) {
  if (value == null || value === "") return null;
  const num = parseFloat(String(value));
  return Number.isFinite(num) ? num : null;
}
function parsePercentOrNumber(value) {
  if (value == null || value === "") return null;
  const text = String(value).trim();
  if (text.endsWith("%")) {
    const num = parseNumeric(text.slice(0, -1));
    return num == null ? null : num / 100;
  }
  return parseNumeric(text);
}
function escapeLatex(str) {
  return str.replace(/\\/g, "\\textbackslash{}").replace(/[&%$#_{}~^]/g, (char) => `\\${char}`);
}

function extractViewBox(svgString) {
  const m = svgString.match(/viewBox\s*=\s*["']\s*([\d.+-]+)\s+([\d.+-]+)\s+([\d.+-]+)\s+([\d.+-]+)\s*["']/);
  if (m) return { w: parseFloat(m[3]), h: parseFloat(m[4]) }
  const wm = svgString.match(/\bwidth\s*=\s*["']?([\d.]+)/);
  const hm = svgString.match(/\bheight\s*=\s*["']?([\d.]+)/);
  if (wm && hm) return { w: parseFloat(wm[1]), h: parseFloat(hm[1]) }
  return null
}

function renderSvgAsTikz(element, imageCollector, options) {
  const dataUrlMatch = element.svgSrc.match(/^data:image\/svg\+xml;base64,(.+)$/);
  if (!dataUrlMatch) return null

  let svgString;
  try {
    svgString = atob(dataUrlMatch[1]);
  } catch (e) {
    return null
  }

  const vb = extractViewBox(svgString);
  if (!vb || vb.w === 0 || vb.h === 0) return null

  let tikzFull;
  try {
    tikzFull = svgToTikz(svgString, { standalone: false });
  } catch (e) {
    return null
  }

  const bodyMatch = tikzFull.match(/\\begin\{tikzpicture\}(?:\[[\s\S]*?\])?([\s\S]*?)\\end\{tikzpicture\}/);
  if (!bodyMatch) return null

  // svg2tikz maps the viewBox to x ∈ [0,10], y ∈ [0, 10*svgH/svgW] (in cm).
  // Force the inner tikzpicture's TeX bounding box to exactly this extent so that
  // \resizebox scales relative to the full viewBox, not the tight drawn-content box.
  const tikzH = (10 * vb.h / vb.w).toFixed(4);
  const bbLine = `  \\path[use as bounding box] (0,0) rectangle (10,${tikzH});`;
  const body = bbLine + '\n' + bodyMatch[1].trim();

  imageCollector.hasSvgTikz = true;

  const x = element.left;
  const y = options.slideHeight - element.top;   // TikZ top of element (max y)
  const w = element.width;
  const h = element.height;
  const cx = x + w / 2;
  const cy = y - h / 2;

  const needsScope = element.rotate;
  const lines = [];

  if (needsScope) {
    const scopeOpts = [];
    if (element.rotate) scopeOpts.push(`rotate around={${-element.rotate}:(${pt2cm(cx)},${pt2cm(cy)})}`);
    lines.push(`  \\begin{scope}[${scopeOpts.join(', ')}]`);
  }

  const indent = needsScope ? '    ' : '  ';
  // anchor=north west places the top-left corner at (x, y) in y-up coordinates
  lines.push(`${indent}\\node[inner sep=0pt, anchor=north west] at (${pt2cm(x)},${pt2cm(y)}) {%`);
  lines.push(`${indent}  \\resizebox{${pt2cm(w)}cm}{${pt2cm(h)}cm}{%`);
  lines.push(`${indent}  \\begin{tikzpicture}[x=1cm, y=1cm]`);
  lines.push(body);
  lines.push(`${indent}  \\end{tikzpicture}%`);
  lines.push(`${indent}  }%`);
  lines.push(`${indent}};`);

  if (needsScope) {
    lines.push(`  \\end{scope}`);
  }

  return lines.join('\n')
}

function renderImage(element, imageCollector, options = {}) {
  const x = element.left;
  const y = options.slideHeight - element.top;   // TikZ top of element (max y)
  const w = element.width;
  const h = element.height;
  const cx = x + w / 2;
  const cy = y - h / 2;

  if (options.noImages) {
    return `  \\draw[dashed, gray] (${pt2cm(x)},${pt2cm(y - h)}) rectangle (${pt2cm(x + w)},${pt2cm(y)});\n  \\node at (${pt2cm(cx)},${pt2cm(cy)}) {\\small [Image]};`
  }

  // Use SVG source if available (renders as native TikZ, no external file needed)
  if (element.svgSrc) {
    const result = renderSvgAsTikz(element, imageCollector, options);
    if (result) {
      console.log(`  [svg2tikz] converted SVG at (${element.left},${element.top})`);
      return result
    }
    console.warn(`  [svg2tikz] SVG conversion failed at (${element.left},${element.top}), falling back to PNG`);
  }

  if (!element.src) {
    return `  % Image element with no source at (${pt2cm(x)},${element.top})`
  }

  // Extract base64 data
  const dataUrlMatch = element.src.match(/^data:image\/(\w+);base64,(.+)$/);
  if (!dataUrlMatch) {
    return `  % Image with unsupported source format at (${pt2cm(x)},${element.top})`
  }

  const ext = dataUrlMatch[1] === 'jpeg' ? 'jpg' : dataUrlMatch[1];
  const base64data = dataUrlMatch[2];
  const imageDir = options.imageDir || 'images';
  const index = imageCollector.length;
  const filename = `image_${index}.${ext}`;

  imageCollector.push({ filename, base64data, ext });

  const lines = [];
  const needsScope = element.rotate || element.isFlipH || element.isFlipV;
  const needsClip = element.rect || (element.geom && element.geom !== 'rect');

  if (needsScope || needsClip) {
    const scopeOpts = [];
    if (element.rotate) scopeOpts.push(`rotate around={${-element.rotate}:(${pt2cm(cx)},${pt2cm(cy)})}`);
    if (element.isFlipH) scopeOpts.push('xscale=-1');
    if (element.isFlipV) scopeOpts.push('yscale=-1');
    lines.push(`  \\begin{scope}${scopeOpts.length ? `[${scopeOpts.join(', ')}]` : ''}`);

    if (needsClip) {
      if (element.geom === 'ellipse') {
        lines.push(`    \\clip (${pt2cm(cx)},${pt2cm(cy)}) ellipse (${pt2cm(w / 2)}cm and ${pt2cm(h / 2)}cm);`);
      } else if (element.rect) {
        const cl = (element.rect.l || 0) * w;
        const ct = (element.rect.t || 0) * h;
        const cr = (element.rect.r || 0) * w;
        const cb = (element.rect.b || 0) * h;
        lines.push(`    \\clip (${pt2cm(x + cl)},${pt2cm(y - ct)}) rectangle (${pt2cm(x + w - cr)},${pt2cm(y - h + cb)});`);
      }
    }
  }

  const indent = (needsScope || needsClip) ? '    ' : '  ';
  lines.push(`${indent}\\node[anchor=north west, inner sep=0pt] at (${pt2cm(x)},${pt2cm(y)}) {\\includegraphics[width=${pt2cm(w)}cm, height=${pt2cm(h)}cm]{${imageDir}/${filename}}};`);

  if (needsScope || needsClip) {
    lines.push('  \\end{scope}');
  }

  return lines.join('\n')
}

function renderTable(element, registry, options = {}) {
  const lines = [];
  const x0 = element.left;
  const y0 = options.slideHeight - element.top;  // TikZ y of table top (max y)

  // Compute cumulative positions
  const colX = [0];
  for (const w of element.colWidths) {
    colX.push(colX[colX.length - 1] + w);
  }
  const rowY = [0];
  for (const h of element.rowHeights) {
    rowY.push(rowY[rowY.length - 1] + h);
  }

  lines.push(`  % Table at (${pt2cm(x0)}, ${pt2cm(element.top)})`);

  for (let r = 0; r < element.data.length; r++) {
    for (let c = 0; c < element.data[r].length; c++) {
      const cell = element.data[r][c];
      if (!cell) continue
      if (cell.hMerge || cell.vMerge) continue

      const cs = cell.colSpan || 1;
      const rs = cell.rowSpan || 1;

      const cx1 = x0 + colX[c];
      const cy1 = y0 - rowY[r];          // TikZ y of row top (higher)
      const cx2 = x0 + (colX[c + cs] !== undefined ? colX[c + cs] : colX[colX.length - 1]);
      const cy2 = y0 - (rowY[r + rs] !== undefined ? rowY[r + rs] : rowY[rowY.length - 1]);  // TikZ y of row bottom (lower)
      const midX = (cx1 + cx2) / 2;
      const midY = (cy1 + cy2) / 2;

      // Cell background
      if (cell.fillColor) {
        const color = registry.register(cell.fillColor);
        if (color) {
          lines.push(`  \\fill[fill=${color.name}] (${pt2cm(cx1)},${pt2cm(cy2)}) rectangle (${pt2cm(cx2)},${pt2cm(cy1)});`);
        }
      }

      // Cell borders
      if (cell.borders) {
        const { top, bottom, left, right } = cell.borders;
        if (top) {
          const opts = cellBorderToTikz(top, registry);
          if (opts) lines.push(`  \\draw[${opts}] (${pt2cm(cx1)},${pt2cm(cy1)}) -- (${pt2cm(cx2)},${pt2cm(cy1)});`);
        }
        if (bottom) {
          const opts = cellBorderToTikz(bottom, registry);
          if (opts) lines.push(`  \\draw[${opts}] (${pt2cm(cx1)},${pt2cm(cy2)}) -- (${pt2cm(cx2)},${pt2cm(cy2)});`);
        }
        if (left) {
          const opts = cellBorderToTikz(left, registry);
          if (opts) lines.push(`  \\draw[${opts}] (${pt2cm(cx1)},${pt2cm(cy2)}) -- (${pt2cm(cx1)},${pt2cm(cy1)});`);
        }
        if (right) {
          const opts = cellBorderToTikz(right, registry);
          if (opts) lines.push(`  \\draw[${opts}] (${pt2cm(cx2)},${pt2cm(cy2)}) -- (${pt2cm(cx2)},${pt2cm(cy1)});`);
        }
      }

      // Cell text
      const content = htmlToLatex(cell.text, registry, options);
      if (content.trim()) {
        const textW = cx2 - cx1 - 4;
        lines.push(`  \\node[anchor=center, inner sep=2pt, text width=${pt2cm(textW)}cm] at (${pt2cm(midX)},${pt2cm(midY)}) {${content}};`);
      }
    }
  }

  return lines.join('\n')
}

function renderMath(element, registry, options = {}) {
  if (!element.latex) {
    return `  % Math element at (${pt2cm(element.left)},${pt2cm(element.top)}) with no LaTeX`
  }
  // Escape % and convert Unicode math italic/bold characters to plain LaTeX
  const latex = element.latex
    .replace(/%/g, '\\%')
    .replace(/[\u{1D434}-\u{1D44D}]/gu, ch => String.fromCharCode(ch.codePointAt(0) - 0x1D434 + 65))  // Math Italic A-Z
    .replace(/[\u{1D44E}-\u{1D467}]/gu, ch => String.fromCharCode(ch.codePointAt(0) - 0x1D44E + 97))  // Math Italic a-z
    .replace(/[\u{1D400}-\u{1D419}]/gu, ch => String.fromCharCode(ch.codePointAt(0) - 0x1D400 + 65))  // Math Bold A-Z
    .replace(/[\u{1D41A}-\u{1D433}]/gu, ch => String.fromCharCode(ch.codePointAt(0) - 0x1D41A + 97))  // Math Bold a-z
    .replace(/[\u{1D7CE}-\u{1D7D7}]/gu, ch => String.fromCharCode(ch.codePointAt(0) - 0x1D7CE + 48));  // Math Bold 0-9
  const y = options.slideHeight - element.top;
  const w = element.width;
  const h = element.height;

  const nodeOpts = ['anchor=north west', 'inner sep=0pt', `text width=${pt2cm(w)}cm`, `minimum height=${pt2cm(h)}cm`];
  if (element.fontSize) {
    const leading = (element.fontSize * 1.2).toFixed(1);
    nodeOpts.push(`font=\\fontsize{${element.fontSize}}{${leading}}\\selectfont`);
  }

  let colorPrefix = '';
  if (element.color && registry) {
    const color = registry.register(element.color);
    if (color) colorPrefix = `\\color{${color.name}}`;
  }
  return `  \\node[${nodeOpts.join(', ')}] at (${pt2cm(element.left)},${pt2cm(y)}) {$${colorPrefix}\\displaystyle ${latex}$};`
}

function renderGroup(element, registry, imageCollector, options, renderElementFn) {
  const lines = [];
  const scopeOpts = scopeTransform(element, options.slideHeight);

  lines.push(`  \\begin{scope}[${scopeOpts.join(', ')}]`);

  // Children have coordinates relative to the group's top-left corner.
  // The scope already shifts the origin to the group's position, so children
  // must render in local coords: slideHeight=0 gives tikz_y = 0 - local_top = -local_top.
  const childOptions = { ...options, slideHeight: 0 };
  for (const child of element.elements) {
    const childTikz = renderElementFn(child, registry, imageCollector, childOptions);
    if (childTikz) lines.push(childTikz);
  }

  lines.push('  \\end{scope}');
  return lines.join('\n')
}

function renderFallback(element, options = {}) {
  const x = element.left;
  const y = options.slideHeight - element.top;   // TikZ top of element
  const w = element.width;
  const h = element.height;
  const cx = x + w / 2;
  const cy = y - h / 2;
  const label = element.type.charAt(0).toUpperCase() + element.type.slice(1);

  return [
    `  % Unsupported element: ${element.type} at (${pt2cm(x)},${pt2cm(element.top)}) size ${pt2cm(w)}x${pt2cm(h)}`,
    `  \\draw[dashed, gray] (${pt2cm(x)},${pt2cm(y - h)}) rectangle (${pt2cm(x + w)},${pt2cm(y)});`,
    `  \\node[gray] at (${pt2cm(cx)},${pt2cm(cy)}) {\\small [${label}]};`,
  ].join('\n')
}

function renderElement(element, registry, imageCollector, options) {
  switch (element.type) {
    case 'text':
      return renderText(element, registry, options)
    case 'shape':
      return renderShape(element, registry, options)
    case 'image':
      return renderImage(element, imageCollector, options)
    case 'table':
      return renderTable(element, registry, options)
    case 'math':
      return renderMath(element, registry, options)
    case 'group':
      return renderGroup(element, registry, imageCollector, options, renderElement)
    case 'diagram':
      return renderDiagram(element, registry, imageCollector, options)
    default:
      return renderFallback(element, options)
  }
}

function renderDiagram(element, registry, imageCollector, options) {
  if (element.elements && element.elements.length > 0) {
    const lines = [`  % Diagram at (${element.left},${element.top})`];
    for (const child of element.elements) {
      const tikz = renderElement(child, registry, imageCollector, options);
      if (tikz) lines.push(tikz);
    }
    return lines.join('\n')
  }

  return renderFallback(element)
}

function renderBackground(fill, size, registry) {
  if (!fill) return ''

  const fillInfo = fillToTikz(fill, registry);
  if (!fillInfo.options) return ''

  const cmd = fillInfo.shade ? '\\shade' : '\\fill';
  return `  ${cmd}[${fillInfo.options}] (0,0) rectangle (${pt2cm(size.width)},${pt2cm(size.height)});`
}

function hasLinks(elements) {
  for (const el of elements) {
    if (el.link) return true
    if (el.content && el.content.includes('<a href=')) return true
    if (el.type === 'group' && el.elements && hasLinks(el.elements)) return true
    if (el.type === 'diagram' && el.elements && hasLinks(el.elements)) return true
    if (el.type === 'table' && el.data) {
      for (const row of el.data) {
        for (const cell of row) {
          if (cell && cell.text && cell.text.includes('<a href=')) return true
        }
      }
    }
  }
  return false
}

function convertSlideToTikZ(slide, size, options = {}) {
  const registry = new ColorRegistry(options);
  const imageCollector = [];
  options = { ...options, slideHeight: size.height };

  let elements = [...(slide.elements || [])];
  if (options.includeLayoutElements && slide.layoutElements) {
    elements = [...slide.layoutElements, ...elements];
  }

  // Sort by z-order
  elements.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  // Render background
  const backgroundTikz = renderBackground(slide.fill, size, registry);

  // Render elements
  const elementsTikz = elements
    .map(el => renderElement(el, registry, imageCollector, options))
    .filter(Boolean);

  // Check for features that need extra packages
  const hasImg = imageCollector.length > 0;
  const hasSvgTikz = !!imageCollector.hasSvgTikz;
  const hasLnk = hasLinks(elements);

  // Generate preamble (after all colors are registered)
  const preamble = generatePreamble(registry, hasImg, hasLnk, hasSvgTikz);

  const body = [
    '\\begin{document}',
    `\\begin{tikzpicture}[x=1cm, y=1cm]`,
    `  \\clip (0,0) rectangle (${pt2cm(size.width)},${pt2cm(size.height)});`,
  ];

  if (backgroundTikz) body.push(backgroundTikz);
  body.push(...elementsTikz);

  body.push('\\end{tikzpicture}');
  body.push('\\end{document}');
  body.push('');

  return {
    tex: preamble + body.join('\n'),
    images: imageCollector,
  }
}

export { convertSlideToTikZ, parse, parseClipboardGVML };
//# sourceMappingURL=index.js.map
