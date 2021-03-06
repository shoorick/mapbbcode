/*
 * List of public-use layers.
 */
window.layerList = {
    // some entries in this list were adapted from the https://github.com/leaflet-extras/leaflet-providers list (it has BSD 2-clause license)
    list: {
        "OpenStreetMap": "L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: 'Map &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a>', minZoom: 0, maxZoom: 19 })",
        "OpenStreetMap DE": "L.tileLayer('http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', { attribution: 'Map &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a>', minZoom: 0, maxZoom: 18 })",
        "CycleMap": "L.tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', { attribution: 'Map &copy; <a href=\"http://openstreetmap.org\">OSM</a> | Tiles &copy; <a href=\"http://www.opencyclemap.org\">Andy Allan</a>', minZoom: 0, maxZoom: 18 })",
        "OpenMapSurfer": "L.tileLayer('http://129.206.74.245:8001/tms_r.ashx?x={x}&y={y}&z={z}', { name: 'MapSurfer', attribution: 'Map &copy; <a href=\"http://openstreetmap.org\">OSM</a> | Tiles &copy; <a href=\"http://giscience.uni-hd.de/\">GIScience Heidelberg</a>', minZoom: 0, maxZoom: 19 })",
        "OpenMapSurfer Grayscale": "L.tileLayer('http://129.206.74.245:8008/tms_rg.ashx?x={x}&y={y}&z={z}', { name: 'MapSurfer', attribution: 'Map &copy; <a href=\"http://openstreetmap.org\">OSM</a> | Tiles &copy; <a href=\"http://giscience.uni-hd.de/\">GIScience Heidelberg</a>', minZoom: 0, maxZoom: 19 })",
        "Humanitarian": "L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', { attribution: 'Map &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> | Tiles &copy; <a href=\"http://hot.openstreetmap.org\">Humanitarian OSM Team</a>', minZoom: 0, maxZoom: 19 })",
        "Transport": "L.tileLayer('http://{s}.tile2.opencyclemap.org/transport/{z}/{x}/{y}.png', { attribution: 'Map &copy; <a href=\"http://openstreetmap.org\">OSM</a> | Tiles &copy; <a href=\"http://www.opencyclemap.org\">Andy Allan</a>', minZoom: 0, maxZoom: 18 })",
        "Landscape": "L.tileLayer('http://{s}.tile3.opencyclemap.org/landscape/{z}/{x}/{y}.png', { attribution: 'Map &copy; <a href=\"http://openstreetmap.org\">OSM</a> | Tiles &copy; <a href=\"http://www.opencyclemap.org\">Andy Allan</a>', minZoom: 0, maxZoom: 18 })",
        "Outdoors": "L.tileLayer('http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png', { attribution: 'Map &copy; <a href=\"http://openstreetmap.org\">OSM</a> | Tiles &copy; <a href=\"http://www.opencyclemap.org\">Andy Allan</a>', minZoom: 0, maxZoom: 18 })",
        "MapQuest Open": "L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg', { attribution: 'Map &copy; <a href=\"http://openstreetmap.org\">OSM</a> | Tiles &copy; <a href=\"http://www.mapquest.com/\">MapQuest</a>', subdomains: '1234', minZoom: 0, maxZoom: 18 })",
        "Stamen Toner": "L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', { attribution: 'Map &copy; <a href=\"http://openstreetmap.org\">OSM</a> | Tiles &copy; <a href=\"http://stamen.com\">Stamen Design</a>', minZoom: 0, maxZoom: 20 })",
        "Stamen Toner Lite": "L.tileLayer('http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png', { attribution: 'Map &copy; <a href=\"http://openstreetmap.org\">OSM</a> | Tiles &copy; <a href=\"http://stamen.com\">Stamen Design</a>', minZoom: 0, maxZoom: 20 })",
        "Stamen Watercolor": "L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png', { attribution: 'Map &copy; <a href=\"http://openstreetmap.org\">OSM</a> | Tiles &copy; <a href=\"http://stamen.com\">Stamen Design</a>', minZoom: 3, maxZoom: 16 })",
        "Esri Street Map": "L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', { attribution: 'Tiles &copy; <a href=\"http://www.esri.com/software/arcgis/arcgisonline/maps/maps-and-map-layers\">Esri</a> | Sources: Sources: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom', minZoom: 0, maxZoom: 18 })",
        "Esri Topographic": "L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', { attribution: 'Tiles &copy; <a href=\"http://www.esri.com/software/arcgis/arcgisonline/maps/maps-and-map-layers\">Esri</a> | Sources: Sources: Esri, DeLorme, NAVTEQ, TomTom, Intermap, increment P Corp., GEBCO, USGS, FAO, NPS, NRCAN, GeoBase, IGN, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), swisstopo, and the GIS User Community', minZoom: 0, maxZoom: 18 })",
        "National Geographic": "L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', { attribution: 'Tiles &copy; <a href=\"http://www.esri.com/software/arcgis/arcgisonline/maps/maps-and-map-layers\">Esri</a> | Sources: Sources: National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC', minZoom: 0, maxZoom: 16 })",
        "Esri Light Gray": "L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', { attribution: 'Tiles &copy; <a href=\"http://www.esri.com/software/arcgis/arcgisonline/maps/maps-and-map-layers\">Esri</a> | Sources: Sources: Esri, DeLorme, NAVTEQ', minZoom: 0, maxZoom: 16 })",
        "Esri Imagery": "L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { attribution: 'Tiles &copy; <a href=\"http://www.esri.com/software/arcgis/arcgisonline/maps/maps-and-map-layers\">Esri</a> | Sources: Sources: Esri, DigitalGlobe, GeoEye, i-cubed, USDA FSA, USGS, AEX, Getmapping, Aerogrid, IGN, IGP, swisstopo, and the GIS User Community', minZoom: 0, maxZoom: 18 })",
        "Bing Satellite": "new L.BingLayer('{key:http://msdn.microsoft.com/en-us/library/ff428642.aspx}')"
    },

    getSortedKeys: function() {
        var result = [], k;
        for( k in this.list )
            if( this.list.hasOwnProperty(k) )
                result.push(k);
        result.sort();
        return result;
    },

    requiresKey: function( layer ) {
        var reKeyC = /{key(?::[^}]+)?}/,
            l = this.list[layer];
        return l && reKeyC.test(l);
    },

    getKeyLink: function( layer ) {
        var reKeyC = /{key(?::([^}]+))?}/,
            l = this.list[layer],
            m = l && l.match(reKeyC);
        return m && m[1] && m[1].length > 0 ? m[1] : '';
    },

    getLeafletLayers: function( layers, LL ) {
        /* jshint unused: false */
        var L = LL || window.L,
            l = typeof layers === 'string' ? layers.split(',') : layers,
            layerList = this.list,
            reKeyC = /{key(?::[^}]+)?}/,
            result = [];
        for( var i = 0; i < l.length; i++ ) {
            var m = l[i].match(/^(.+?)(?::([^'"]+))?$/);
            if( m && m[1] && layerList[m[1]] ) {
                var layer = layerList[m[1]];
                if( m[2] && m[2].length > 0 )
                    layer = layer.replace(reKeyC, m[2]);
                if( !reKeyC.test(layer) ) {
                    try {
                        var done = eval(layer);
                        if( done ) {
                            if( done.options )
                                done.options.name = m[1];
                            result.push(done);
                        }
                    } catch(e) {}
                }
            }
        }
        return result;
    }
};
