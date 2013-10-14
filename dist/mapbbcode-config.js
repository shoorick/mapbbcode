/*
 A JavaScript library for [map] BBCode parsing, displaying and editing.
 https://github.com/MapBBCode/mapbbcode
 (c) 2013, Ilya Zverev
 Licensed WTFPL.
*/
!function(window,document,undefined){L=window.L,L.StaticLayerSwitcher=L.Control.extend({includes:L.Mixin.Events,options:{position:"topright",editable:!1,bgColor:"white",selectedColor:"#ddd",maxLayers:7},initialize:function(t,e){if(L.setOptions(this,e),this._layers=[],this._selected=0,t)if("push"in t&&"splice"in t)for(var i=0;i<t.length;i++)this.addLayer(t[i]);else for(var o in t)this.addLayer(o,t[o])},getLayers:function(){for(var t=[],e=0;e<this._layers.length;e++)t.push(this._layers[e].layer);return t},getLayerIds:function(){for(var t=[],e=0;e<this._layers.length;e++)t.push(this._layers[e].id);return t},getSelectedLayer:function(){return this._layers.length>0&&this._selected<this._layers.length?this._layers[this._selected].layer:null},getSelectedLayerId:function(){return this._layers.length>0&&this._selected<this._layers.length?this._layers[this._selected].id:""},updateId:function(t,e){var i=this._findLayer(t),o=i>=0&&this._layers[i];if(o&&o.id!==e){if(o.id=e,o.fromList){var s=this._map&&this._map.hasLayer(t),n=window.layerList.getLeafletLayers([e])[0];s&&this._map.removeLayer(t),n?(o.layer=n,s&&this._map.addLayer(n)):this._layers.splice(i,1)}return this._update(),t}return null},addLayer:function(t,e){if(!(this._layers.length>=this.options.maxLayers)){var i=e||window.layerList&&window.layerList.getLeafletLayers([t])[0];return i?(this._layers.push({id:t,layer:i,fromList:!e}),this._update(),this.fire("layerschanged",{layers:this.getLayerIds()}),1==this._layers.length&&this.fire("selectionchanged",{selected:this.getSelectedLayer(),selectedId:this.getSelectedLayerId()}),e):null}},removeLayer:function(t){var e=this._findLayer(t);if(e>=0){var i=this._selected==e;return i&&this._map.removeLayer(t),this._layers.splice(e,1),this._selected>=this._layers.length&&(this._selected=this._layers.length-1),this._update(),this.fire("layerschanged",{layers:this.getLayerIds()}),i&&this.fire("selectionchanged",{selected:this.getSelectedLayer(),selectedId:this.getSelectedLayerId()}),t}return null},moveLayer:function(t,e){var i=this._findLayer(t),o=e?i+1:i-1;if(i>=0&&o>=0&&o<this._layers.length){var s=this._layers[i];this._layers[i]=this._layers[o],this._layers[o]=s,i==this._selected?this._selected=o:o==this._selected&&(this._selected=i),this._update(),this.fire("layerschanged",{layers:this.getLayerIds()})}},_findLayer:function(t){for(var e=0;e<this._layers.length;e++)if(this._layers[e].layer===t)return e;return-1},onAdd:function(t){var e=L.DomUtil.create("div","leaflet-bar");return L.Browser.touch?L.DomEvent.on(e,"click",L.DomEvent.stopPropagation):(L.DomEvent.disableClickPropagation(e),L.DomEvent.on(e,"mousewheel",L.DomEvent.stopPropagation)),this._map=t,this._container=e,this._update(),e},_createItem:function(t){var e=document.createElement("div");e.style.backgroundColor=this.options.bgColor,this._addHoverStyle(e,"backgroundColor",this.options.selectedColor),e.style.padding="4px 10px",e.style.color="black",e.style.cursor="default";var i=t.id.indexOf(":")<0||!t.fromList?t.id:t.id.substring(0,t.id.indexOf(":"));return e.appendChild(document.createTextNode(i)),this.options.editable&&e.appendChild(this._createLayerControls(t.layer)),L.DomEvent.on(e,"click",function(){var e=this._findLayer(t.layer);this._selected!=e&&(this._selected=e,this._update(),this.fire("selectionchanged",{selected:this.getSelectedLayer(),selectedId:this.getSelectedLayerId()}))},this),e},_createLayerControls:function(t){var e=document.createElement("span");e.innerHTML="&utrif;",e.style.cursor="pointer",this._addHoverStyle(e,"color","#aaa"),L.DomEvent.on(e,"click",function(){this.moveLayer(t,!1)},this);var i=document.createElement("span");i.innerHTML="&dtrif;",i.style.cursor="pointer",i.style.marginLeft="6px",this._addHoverStyle(i,"color","#aaa"),L.DomEvent.on(i,"click",function(){this.moveLayer(t,!0)},this);var o=document.createElement("span");o.innerHTML="&Cross;",o.style.cursor="pointer",o.style.marginLeft="6px",this._addHoverStyle(o,"color","#aaa"),L.DomEvent.on(o,"click",function(){this.removeLayer(t)},this);var s=document.createElement("span");return s.style.fontSize="12pt",s.style.marginLeft="12px",s.appendChild(e),s.appendChild(i),s.appendChild(o),L.DomEvent.on(s,"click",L.DomEvent.stopPropagation),s},_addHoverStyle:function(t,e,i){var o=t.style[e];L.DomEvent.on(t,"mouseover",function(){t.style[e]!==i&&(o=t.style[e],t.style[e]=i)}),t.resetHoverStyle=function(){t.style[e]=o},t.updateHoverDefault=function(){o=t.style[e]},L.DomEvent.on(t,"mouseout",t.resetHoverStyle)},_recursiveCall:function(t,e){if(t&&t[e]){t[e].call(t);for(var i=t.getElementsByTagName("*"),o=0;o<i.length;o++)i[o][e]&&i[o][e].call(i[o])}},_update:function(){if(this._container){for(var t=[],e=0;e<this._layers.length;e++){var i=this._layers[e];i.div?this._recursiveCall(i.div,"resetHoverStyle"):i.div=this._createItem(i),i.div.style.background=this._selected==e?this.options.selectedColor:this.options.bgColor,i.div.style.borderTop=e?"1px solid "+this.options.selectedColor:"0",this._recursiveCall(i.div,"updateHoverDefault"),this._container.appendChild(i.div),t.push(i.div),this._map.hasLayer(i.layer)&&this._selected!=e?this._map.removeLayer(i.layer):this._map.hasLayer(i.layer)||this._selected!=e||this._map.addLayer(i.layer)}for(var o,s=this._container.childNodes,n=0;n<s.length;n++){o=!1;for(var r=0;r<t.length;r++)t[r]===s[n]&&(o=!0);o||this._container.removeChild(s[n])}}}}),L.staticLayerSwitcher=function(t,e){return new L.StaticLayerSwitcher(t,e)},window.layerList={list:{OpenStreetMap:"L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: 'Map &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a>', minZoom: 0, maxZoom: 19 })","OpenStreetMap DE":"L.tileLayer('http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', { attribution: 'Map &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a>', minZoom: 0, maxZoom: 18 })",CycleMap:"L.tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', { attribution: 'Map &copy; <a href=\"http://openstreetmap.org\">OSM</a> | Tiles &copy; <a href=\"http://www.opencyclemap.org\">Andy Allan</a>', minZoom: 0, maxZoom: 18 })",OpenMapSurfer:"L.tileLayer('http://129.206.74.245:8001/tms_r.ashx?x={x}&y={y}&z={z}', { name: 'MapSurfer', attribution: 'Map &copy; <a href=\"http://openstreetmap.org\">OSM</a> | Tiles &copy; <a href=\"http://giscience.uni-hd.de/\">GIScience Heidelberg</a>', minZoom: 0, maxZoom: 19 })","OpenMapSurfer Grayscale":"L.tileLayer('http://129.206.74.245:8008/tms_rg.ashx?x={x}&y={y}&z={z}', { name: 'MapSurfer', attribution: 'Map &copy; <a href=\"http://openstreetmap.org\">OSM</a> | Tiles &copy; <a href=\"http://giscience.uni-hd.de/\">GIScience Heidelberg</a>', minZoom: 0, maxZoom: 19 })",Humanitarian:"L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', { attribution: 'Map &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> | Tiles &copy; <a href=\"http://hot.openstreetmap.org\">Humanitarian OSM Team</a>', minZoom: 0, maxZoom: 19 })",Transport:"L.tileLayer('http://{s}.tile2.opencyclemap.org/transport/{z}/{x}/{y}.png', { attribution: 'Map &copy; <a href=\"http://openstreetmap.org\">OSM</a> | Tiles &copy; <a href=\"http://www.opencyclemap.org\">Andy Allan</a>', minZoom: 0, maxZoom: 18 })",Landscape:"L.tileLayer('http://{s}.tile3.opencyclemap.org/landscape/{z}/{x}/{y}.png', { attribution: 'Map &copy; <a href=\"http://openstreetmap.org\">OSM</a> | Tiles &copy; <a href=\"http://www.opencyclemap.org\">Andy Allan</a>', minZoom: 0, maxZoom: 18 })",Outdoors:"L.tileLayer('http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png', { attribution: 'Map &copy; <a href=\"http://openstreetmap.org\">OSM</a> | Tiles &copy; <a href=\"http://www.opencyclemap.org\">Andy Allan</a>', minZoom: 0, maxZoom: 18 })","MapQuest Open":"L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg', { attribution: 'Map &copy; <a href=\"http://openstreetmap.org\">OSM</a> | Tiles &copy; <a href=\"http://www.mapquest.com/\">MapQuest</a>', subdomains: '1234', minZoom: 0, maxZoom: 18 })","Stamen Toner":"L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', { attribution: 'Map &copy; <a href=\"http://openstreetmap.org\">OSM</a> | Tiles &copy; <a href=\"http://stamen.com\">Stamen Design</a>', minZoom: 0, maxZoom: 20 })","Stamen Toner Lite":"L.tileLayer('http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png', { attribution: 'Map &copy; <a href=\"http://openstreetmap.org\">OSM</a> | Tiles &copy; <a href=\"http://stamen.com\">Stamen Design</a>', minZoom: 0, maxZoom: 20 })","Stamen Watercolor":"L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png', { attribution: 'Map &copy; <a href=\"http://openstreetmap.org\">OSM</a> | Tiles &copy; <a href=\"http://stamen.com\">Stamen Design</a>', minZoom: 3, maxZoom: 16 })","Esri Street Map":"L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', { attribution: 'Tiles &copy; <a href=\"http://www.esri.com/software/arcgis/arcgisonline/maps/maps-and-map-layers\">Esri</a> | Sources: Sources: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom', minZoom: 0, maxZoom: 18 })","Esri Topographic":"L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', { attribution: 'Tiles &copy; <a href=\"http://www.esri.com/software/arcgis/arcgisonline/maps/maps-and-map-layers\">Esri</a> | Sources: Sources: Esri, DeLorme, NAVTEQ, TomTom, Intermap, increment P Corp., GEBCO, USGS, FAO, NPS, NRCAN, GeoBase, IGN, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), swisstopo, and the GIS User Community', minZoom: 0, maxZoom: 18 })","National Geographic":"L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', { attribution: 'Tiles &copy; <a href=\"http://www.esri.com/software/arcgis/arcgisonline/maps/maps-and-map-layers\">Esri</a> | Sources: Sources: National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC', minZoom: 0, maxZoom: 16 })","Esri Light Gray":"L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', { attribution: 'Tiles &copy; <a href=\"http://www.esri.com/software/arcgis/arcgisonline/maps/maps-and-map-layers\">Esri</a> | Sources: Sources: Esri, DeLorme, NAVTEQ', minZoom: 0, maxZoom: 16 })","Esri Imagery":"L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { attribution: 'Tiles &copy; <a href=\"http://www.esri.com/software/arcgis/arcgisonline/maps/maps-and-map-layers\">Esri</a> | Sources: Sources: Esri, DigitalGlobe, GeoEye, i-cubed, USDA FSA, USGS, AEX, Getmapping, Aerogrid, IGN, IGP, swisstopo, and the GIS User Community', minZoom: 0, maxZoom: 18 })","Bing Satellite":"new L.BingLayer('{key:http://msdn.microsoft.com/en-us/library/ff428642.aspx}')"},getSortedKeys:function(){var t,e=[];for(t in this.list)this.list.hasOwnProperty(t)&&e.push(t);return e.sort(),e},requiresKey:function(t){var e=/{key(?::[^}]+)?}/,i=this.list[t];return i&&e.test(i)},getKeyLink:function(t){var e=/{key(?::([^}]+))?}/,i=this.list[t],o=i&&i.match(e);return o&&o[1]&&o[1].length>0?o[1]:""},getLeafletLayers:function(layers,LL){for(var L=LL||window.L,l="string"==typeof layers?layers.split(","):layers,layerList=this.list,reKeyC=/{key(?::[^}]+)?}/,result=[],i=0;i<l.length;i++){var m=l[i].match(/^(.+?)(?::([^'"]+))?$/);if(m&&m[1]&&layerList[m[1]]){var layer=layerList[m[1]];if(m[2]&&m[2].length>0&&(layer=layer.replace(reKeyC,m[2])),!reKeyC.test(layer))try{var done=eval(layer);done&&(done.options&&(done.options.name=m[1]),result.push(done))}catch(e){}}}return result}},window.MapBBCodeConfig=L.Class.extend({includes:L.Mixin.Events,options:{layers:[],defaultZoom:2,defaultPosition:[22,11],viewWidth:600,viewHeight:300,fullViewHeight:600,editorHeight:400,windowWidth:800,windowHeight:500,fullFromStart:!1,editorInWindow:!0,editorTypeFixed:!1,maxLayers:5},strings:{},initialize:function(t){L.setOptions(this,t)},setStrings:function(t){this.strings=L.extend({},this.strings,t)},addLayer:function(t){this._layerSwitcher.addLayer(t)},_updateDivSize:function(t){var e,i,o=this._mode;"view"===o&&this.options.fullFromStart&&(o="full"),"edit"===o&&this.options.editorInWindow&&(o="window"),"view"===o?(e=""+this.options.viewWidth+"px",i=""+this.options.viewHeight+"px"):"full"===o?(e="100%",i=""+this.options.fullViewHeight+"px"):"edit"===o?(e="100%",i=""+this.options.editorHeight+"px"):"window"===o&&(e=this.options.windowWidth||this.options.viewWidth,i=this.options.windowHeight||this.options.editorHeight),t.style.width=e,t.style.height=i},_latLngToArray:function(t){return[L.Util.formatNum(t.lat,5),L.Util.formatNum(t.lng,5)]},_updateFullTitle:function(t,e){"view"===this._mode?(t.setContent(this.strings.view),t.setTitle(this.strings.viewTitle),e.setContent(this.options.fullFromStart?this.strings.viewFull:this.strings.viewNormal),e.setTitle(this.options.fullFromStart?this.strings.viewFullTitle:this.strings.viewNormalTitle)):"edit"===this._mode&&(t.setContent(this.strings.editor),t.setTitle(this.strings.editorTitle),e.setContent(this.options.editorInWindow?this.strings.editInWindow:this.strings.editInPanel),e.setTitle(this.options.editorInWindow?this.strings.editInWindowTitle:this.strings.editInPanelTitle))},bindLayerAdder:function(t){function e(t){return"string"==typeof t?document.getElementById(t):t}var i=e(t.select),o=e(t.button),s=e(t.keyBlock),n=e(t.keyTitle),r=e(t.keyValue);s.style.display="none",r.value="",o.value||(o.value=this.strings.addLayer);var a=function(e){var i=e.target.value,a=i?window.layerList.getKeyLink(i):"";a?(n.innerHTML=this.strings.keyNeeded.replace("%s",a),r.value="",s.style.display=t.keyBlockDisplay||"inline"):s.style.display="none",o.disabled=i?!1:!0};L.DomEvent.on(i,"change",a,this);var l=function(){var t,e=window.layerList.getSortedKeys(),o=this.options.layers,s=[];for(t=0;t<o.length;t++)s.push(o[t].indexOf(":")<0?o[t]:o[t].substring(0,o[t].indexOf(":")));for(;i.firstChild;)i.removeChild(i.firstChild);var n=document.createElement("option");for(n.value="",n.selected=!0,n.innerHTML=this.strings.selectLayer+"...",i.appendChild(n),t=0;t<e.length;t++)s.indexOf(e[t])>=0||(n=document.createElement("option"),n.innerHTML=e[t],n.value=e[t],i.appendChild(n));a.call(this,{target:i})};L.DomEvent.on(o,"click",function(){var t=i.value;if(t){var e=window.layerList.requiresKey(t),o=r.value.trim();e&&!o.length?window.alert(this.strings.keyNeededAlert):this.addLayer(e?t+":"+o:t)}},this),this.on("show change",function(){l.call(this)},this)},show:function(t){var e="string"==typeof t?document.getElementById(t):t;if(e){this._mode="view";var i=document.createElement("div");e.appendChild(i),this._updateDivSize(i);var o=L.map(i,{zoomControl:!1}).setView(this.options.defaultPosition&&2==this.options.defaultPosition.length?this.options.defaultPosition:[22,11],this.options.defaultZoom);o.addControl(new L.Control.Zoom({zoomInTitle:this.strings.zoomInTitle,zoomOutTitle:this.strings.zoomOutTitle}));var s=L.staticLayerSwitcher(this.options.layers,{editable:!0,maxLayers:this.options.maxLayers});o.addControl(s),s.on("layerschanged",function(t){this.options.layers=t.layers,this.fire("change",this.options)},this),s.on("selectionchanged",function(t){this.fire("layerselected",{id:t.selectedId})},this),this.options.layers=s.getLayerIds(),this._layerSwitcher=s,o.on("moveend zoomend",function(){this.options.defaultPosition=this._latLngToArray(o.getCenter()),this.options.defaultZoom=o.getZoom(),this.fire("change",this.options)},this);var n=new L.FunctionButton("full",{position:"topright"}),r=new L.FunctionButton("mode",{position:"topright"}),a=new L.FunctionButtons(["&ltrif;","&rtrif;"],{position:"bottomright",titles:[this.strings.shrinkTitle,this.strings.growTitle]}),l=new L.FunctionButtons(["&utrif;","&dtrif;"],{position:"bottomleft",titles:[this.strings.shrinkTitle,this.strings.growTitle]}),h=function(){var t="view"===this._mode?this.options.fullFromStart:!this.options.editorInWindow;t?o.removeControl(a):o.addControl(a)};n.on("clicked",function(){var t="view"===this._mode?this.options.fullFromStart:!this.options.editorInWindow;"view"===this._mode?this.options.fullFromStart=!t:this.options.editorInWindow=t,h.call(this),this._updateFullTitle(r,n),this._updateDivSize(i),o.invalidateSize(),this.fire("change",this.options)},this),r.on("clicked",function(){this._mode="view"===this._mode?"edit":"view",this.options.fullFromStart==this.options.editorInWindow&&h.call(this),this.options.editorTypeFixed&&("view"===this._mode?o.addControl(n):o.removeControl(n)),this._updateFullTitle(r,n),this._updateDivSize(i),o.invalidateSize()},this),a.on("clicked",function(t){var e=100*t.idx-50,s="view"===this._mode?this.options.viewWidth:this.options.windowWidth;s+e>=400&&1e3>=s+e&&("view"===this._mode?this.options.fullFromStart||(this.options.viewWidth+=e,this._updateDivSize(i),o.invalidateSize(),this.fire("change",this.options)):"edit"===this._mode&&this.options.editorInWindow&&(this.options.windowWidth+=e,this._updateDivSize(i),o.invalidateSize(),this.fire("change",this.options)))},this),l.on("clicked",function(t){var e,s=100*t.idx-50;"view"===this._mode?e=this.options.fullFromStart?this.options.fullViewHeight:this.options.viewHeight:"edit"===this._mode&&(e=this.options.editorInWindow?this.options.windowHeight:this.options.editorHeight),e+s>=200&&800>=e+s&&("view"===this._mode?this.options.fullFromStart?this.options.fullViewHeight+=s:this.options.viewHeight+=s:"edit"===this._mode&&(this.options.editorInWindow?this.options.windowHeight+=s:this.options.editorHeight+=s),this._updateDivSize(i),o.invalidateSize(),this.fire("change",this.options))},this),o.addControl(r),o.addControl(n),o.addControl(a),o.addControl(l),this._updateFullTitle(r,n),this.fire("show",this.options)}}}),L.FunctionButtons=L.Control.extend({includes:L.Mixin.Events,initialize:function(t,e){if(this._content=t,e.titles||(e.titles=[]),e.titles.length<t.length)for(var i=e.titles.length;i<t.length;i++)e.titles.push("");L.Control.prototype.initialize.call(this,e)},onAdd:function(t){this._map=t,this._links=[];for(var e=L.DomUtil.create("div","leaflet-bar"),i=0;i<this._content.length;i++){var o=L.DomUtil.create("a","",e);this._links.push(o),o.href="#",o.style.padding="0 4px",o.style.width="auto",o.style.minWidth="20px",this.options.titles&&this.options.titles.length>i&&(o.title=this.options.titles[i]),this._updateContent(i);var s=L.DomEvent.stopPropagation;L.DomEvent.on(o,"click",s).on(o,"mousedown",s).on(o,"dblclick",s).on(o,"click",L.DomEvent.preventDefault).on(o,"click",this.clicked,this)}return e},_updateContent:function(t){if(!(t>=this._content.length)){var e=this._links[t],i=this._content[t];if("string"==typeof i){var o=i.length<4?"":i.substring(i.length-4),s="data:image/"===i.substring(0,11);".png"===o||".gif"===o||".jpg"===o||s?(e.style.width=""+(this.options.imageSize||26)+"px",e.style.height=""+(this.options.imageSize||26)+"px",e.style.padding="0",e.style.backgroundImage="url("+i+")",e.style.backgroundRepeat="no-repeat",e.style.backgroundPosition=this.options.bgPos&&this.options.bgPos.length>t&&this.options.bgPos[t]?-this.options.bgPos[t][0]+"px "+-this.options.bgPos[t][1]+"px":"0px 0px"):e.innerHTML=i}else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(i)}}},setContent:function(t,e){t>=this._content.length||(this._content[t]=e,this._updateContent(t))},setTitle:function(t,e){this.options.titles[t]=e,this._links[t].title=e},setBgPos:function(t,e){this.options.bgPos[t]=e,this._links[t].style.backgroundPosition=e?-e[0]+"px "+-e[1]+"px":"0px 0px"},clicked:function(t){for(var e=t.target,i=this._links.length;--i>=0&&e!==this._links[i];);this.fire("clicked",{idx:i})}}),L.functionButtons=function(t,e){return new L.FunctionButtons(t,e)},L.FunctionButton=L.FunctionButtons.extend({initialize:function(t,e){e.title&&(e.titles=[e.title]),e.bgPos&&(e.bgPos=[e.bgPos]),L.FunctionButtons.prototype.initialize.call(this,[t],e)},setContent:function(t){L.FunctionButtons.prototype.setContent.call(this,0,t)},setTitle:function(t){L.FunctionButtons.prototype.setTitle.call(this,0,t)},setBgPos:function(t){L.FunctionButtons.prototype.setBgPos.call(this,0,t)}}),L.functionButton=function(t,e){return new L.FunctionButton(t,e)},window.MapBBCodeConfig.include({strings:{view:"View",editor:"Editor",editInWindow:"Window",editInPanel:"Panel",viewNormal:"Normal",viewFull:"Full width only",viewTitle:"Adjusting browsing panel",editorTitle:"Adjusting editor panel or window",editInWindowTitle:"Editor will be opened in a popup window",editInPanelTitle:"Editor will appear inside a page",viewNormalTitle:'Map panel will have "fullscreen" button',viewFullTitle:"Map panel will always have maximum size",growTitle:"Click to grow the panel",shrinkTitle:"Click to shrink the panel",zoomInTitle:"Zoom in",zoomOutTitle:"Zoom out",selectLayer:"Select layer",addLayer:"Add layer",keyNeeded:'This layer needs a developer key (<a href="%s" target="devkey">how to get it</a>)',keyNeededAlert:"This layer needs a developer key"}})}(window,document);