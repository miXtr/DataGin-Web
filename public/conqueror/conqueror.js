var geojson;
var okresy = [{"name":"Benešov","cnt":95459},{"name":"Beroun","cnt":86160},{"name":"Blansko","cnt":105708},{"name":"Brno-město","cnt":385913},{"name":"Brno-venkov","cnt":206300},{"name":"Bruntál","cnt":92693},{"name":"Břeclav","cnt":112828},{"name":"Česká Lípa","cnt":100756},{"name":"České Budějovice","cnt":186462},{"name":"Český Krumlov","cnt":60516},{"name":"Děčín","cnt":128834},{"name":"Domažlice","cnt":59926},{"name":"Frýdek-Místek","cnt":207756},{"name":"Havlíčkův Brod","cnt":94217},{"name":"Hodonín","cnt":153225},{"name":"Hradec Králové","cnt":162661},{"name":"Cheb","cnt":90188},{"name":"Chomutov","cnt":122157},{"name":"Chrudim","cnt":103199},{"name":"Jablonec n.N.","cnt":88200},{"name":"Jeseník","cnt":38779},{"name":"Jičín","cnt":79702},{"name":"Jihlava","cnt":110522},{"name":"Jindřichův Hradec","cnt":90604},{"name":"Karlovy Vary","cnt":115446},{"name":"Karviná","cnt":256394},{"name":"Kladno","cnt":158799},{"name":"Klatovy","cnt":85726},{"name":"Kolín","cnt":96001},{"name":"Kroměříž","cnt":105569},{"name":"Kutná Hora","cnt":73404},{"name":"Liberec","cnt":169878},{"name":"Litoměřice","cnt":117278},{"name":"Louny","cnt":85191},{"name":"Mělník","cnt":104659},{"name":"Mladá Boleslav","cnt":123659},{"name":"Most","cnt":111775},{"name":"Náchod","cnt":109550},{"name":"Nový Jičín","cnt":148074},{"name":"Nymburk","cnt":94884},{"name":"Olomouc","cnt":230408},{"name":"Opava","cnt":174899},{"name":"Ostrava-město","cnt":326018},{"name":"Pardubice","cnt":168423},{"name":"Pelhřimov","cnt":71914},{"name":"Písek","cnt":69843},{"name":"Plzeň-jih","cnt":62389},{"name":"Plzeň-město","cnt":188045},{"name":"Plzeň-sever","cnt":74940},{"name":"Praha","cnt":1268796},{"name":"Praha-východ","cnt":157146},{"name":"Praha-západ","cnt":131231},{"name":"Prachatice","cnt":50010},{"name":"Prostějov","cnt":107859},{"name":"Přerov","cnt":130082},{"name":"Příbram","cnt":112816},{"name":"Rakovník","cnt":54993},{"name":"Rokycany","cnt":47458},{"name":"Rychnov n.K.","cnt":77829},{"name":"Semily","cnt":73605},{"name":"Sokolov","cnt":89961},{"name":"Strakonice","cnt":69786},{"name":"Svitavy","cnt":103245},{"name":"Šumperk","cnt":121299},{"name":"Tábor","cnt":101115},{"name":"Tachov","cnt":51917},{"name":"Teplice","cnt":125498},{"name":"Trutnov","cnt":118174},{"name":"Třebíč","cnt":111693},{"name":"Uherské Hradiště","cnt":141467},{"name":"Ústí n.L.","cnt":118228},{"name":"Ústí n.O.","cnt":136760},{"name":"Vsetín","cnt":142420},{"name":"Vyškov","cnt":88154},{"name":"Zlín","cnt":190488},{"name":"Znojmo","cnt":111380},{"name":"Žďár n.S.","cnt":117219}]
var southWest = L.latLng(35, -20),
    northEast = L.latLng(70, 50),
    bounds = L.latLngBounds(southWest, northEast);
var map;

// var mapElement = document.getElementById("map");
// var x = window.innerWidth;
// console.log(x);
// console.log(mapElement.style.width);
// mapElement.style.width = x + "px";
// console.log(mapElement.style.width);
// var y = window.innerHeight;
// console.log(y);
// mapElement.style.height = y + "px";

//document.getElementById("map").style.height = window.innerHeight;
init();
    

	// var marker = L.marker([49.808, 16.31]).addTo(map);
	// marker.bindPopup("<b>Hello world!</b><br>I am a popup.");//.openPopup();

	// var popup = L.popup()
	// 	.setLatLng([49.808, 16.31])
	// 	.setContent('Čidlo bylo zde! V sobotu 21.3.2019 ve 2:00')
	// 	.openOn(map);

	// var circle = L.circle([49.808, 16.31], {
	// 	color: 'red',
	// 	fillColor: '#f03',
	// 	fillOpacity: 0.1,
	// 	radius: 5000
	// }).addTo(map);
	// var circle = L.circle([49.808, 16.31], {
	// 	color: 'red',
	// 	fillColor: '#f03',
	// 	fillOpacity: 0.99,
	// 	radius: 15
	// }).addTo(map);
	//L.control.navbar().addTo(map);

function getColor(d) {
    return d > 1000000 ? '#800026' :
           d > 200000  ? '#BD0026' :
           d > 150000 ? '#E31A1C' :
           d > 100000 ? '#FC4E2A' :
           d > 80000  ? '#FD8D3C' :
           d > 50000   ? '#FEB24C' :
           d > 0   ? '#FED976' :
                      '#FFEDA0';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.id),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

// var info = L.control();
// info.onAdd = function (map) {
//     this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
//     this.update();
//     return this._div;
// };

// var infoBar = L.control();
// infoBar.onAdd = function (map) {
//     this._div = L.DomUtil.create('div', 'infoBar');
//     this._div.innerHTML = '<h1>InfoBar</h1>';
//     return this._div;
// };
// infoBar.addTo(map);

// method that we will use to update the control based on feature properties passed
// info.update = function (region) {
//     this._div.innerHTML = '<button type="button" class="button resetbutton" onclick="zpet()">Reset</button>' + 
//         '<h4>INFO</h4>' +  (region ?
//         '<b>Okres:</b>' + region.name + '<br /> Populace: ' + region.id
//         : 'Hover over a state');
// };
// info.addTo(map);

// var legend = L.control({position: 'bottomright'});
// legend.onAdd = function (map) {
//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = [0, 50000, 80000, 100000, 150000, 200000, 1000000],
//         labels = [];
//     // loop through our density intervals and generate a label with a colored square for each interval
//     for (var i = 0; i < grades.length; i++) {
//         div.innerHTML +=
//             '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
//             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
//     }
//     return div;
// };
// legend.addTo(map);

function highlightFeature(e) {
    var layer = e.target;
    if (e.target.feature.reset){
        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });
    
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
        //info.update(layer.feature.properties);
        // infoBar.update(layer.feature.properties);
    }
}
function resetHighlight(e) {
    var layer = e.target;
    if (layer.feature.reset){
        geojson.resetStyle(layer);
        //info.update(e);
     }
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
    doSomething(e);    
}

function zoomToCountry(e) {
    map.fitBounds(e.target.getBounds());
}

function getLayerById(arr, value) {
  for (var i=0, iLen=arr.length; i<iLen; i++) {
    if (arr[i].id == value) return arr[i];
  }
}

function showModal(e){
    $("#myModal").modal();
    console.log("modal: " + layer.feature.properties.name);
    $("#modalTitleElement").html(e.target.feature.properties.name);
    
}

function doSomething(e){
    layer = e.target;
    console.log(layer.feature.properties.name);
    showModal(e);
    if (layer.feature.reset == false){
        layer.feature.reset = true;    
        resetHighlight(e);
    } else {
        layer.setStyle({
            weight: 5,
            fillColor: '#556677',
            dashArray: '',
            fillOpacity: 0.71
        });
        layer.feature.reset = false;
    }
}
function onEachFeature(feature, layer){
	layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

function zpet(){
    console.log("click");
    // map.eachLayer(function (layer) {
    //     map.removeLayer(layer);
    // });
    map.remove();
    init();
    // readTextFile("./czechia.json", function(text){
    //     var countryGeoJson = JSON.parse(text);
    //     countryGeoJson.reset = true;
    //     geojson = L.geoJson(countryGeoJson, {style: style, onEachFeature: onEachCountry}).addTo(map);
    // });
};

function onEachCountry(feature, layer){
	layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: clickOnCountry
    });
}
function clickOnCountry(e){
    console.log(e.target.feature.properties.name);
    zoomToCountry(e);
    map.removeLayer(e.target);
    var geojsonLayer = readTextFile("./distictsCzechiaLow.json", function(text){
    var data = JSON.parse(text);
    data.features.forEach(function(region) {
            region.reset = true;
			var okres = okresy.find(item =>  {
				return item.name == region.properties.name;
			})
			if (typeof okres !== "undefined"){
				region.properties.id = okres.cnt
			} else region.properties.id = 0
			geojson = L.geoJson(region, {style: style, onEachFeature: onEachFeature}).addTo(map);
		});
    });
}
// var geojsonLayer = readTextFile("./distictsCzechiaLow.json", function(text){
//     var data = JSON.parse(text);
//     data.features.forEach(function(region) {
//             region.reset = true;
// 			var okres = okresy.find(item =>  {
// 				return item.name == region.properties.name;
// 			})
// 			if (typeof okres !== "undefined"){
// 				region.properties.id = okres.cnt
// 			} else region.properties.id = 0
// 			geojson = L.geoJson(region, {style: style, onEachFeature: onEachFeature}).addTo(map);
// 		});
// });



function addCountryGeojsonLayer(countryName){
    var fileName = "./" + countryName + ".json";
    readTextFile(fileName, function(text){
        var countryGeoJson = JSON.parse(text);
        countryGeoJson.reset = true;
        L.geoJson(countryGeoJson, {style: style, onEachFeature: onEachFeature}).addTo(map);
    });
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
var geojsonLayer;
function showLevel(targetLevel){
    // map.remove();
    // map = L.map('map', {
    //     //maxBounds: bounds,
    //     minZoom: 5,
    //     maxZoom: 10,
    //     zoomControl: false
    // }).setView([45, 15], targetZoom);
    // geojsonLayer = readTextFile("./distictsCzechiaLow.json", function(text){
    //     var data = JSON.parse(text);
    //     data.features.forEach(function(region) {
    //             region.reset = true;
    //             region.level = true;
    //             var okres = okresy.find(item =>  {
    //                 return item.name == region.properties.name;
    //             })
    //             if (typeof okres !== "undefined"){
    //                 region.properties.id = okres.cnt
    //             } else region.properties.id = 0
    //             geojson = L.geoJson(region, {style: style, onEachFeature: onEachFeature}).addTo(map);
    //         });
    //     });
    geojsonLayer = readTextFile("./kraje.json", function(text){
        var data = JSON.parse(text);
        data.features.forEach(function(region) {
                region.reset = true;
                region.level = true;
                // var okres = okresy.find(item =>  {
                //     return item.name == region.properties.name;
                // })
                // if (typeof okres !== "undefined"){
                //     region.properties.id = okres.cnt
                // } else region.properties.id = 0
                geojson = L.geoJson(region, {style: style, onEachFeature: onEachFeature}).addTo(map);
            });
        });
        // var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        //     maxZoom: 18,
        //     attribution: 'Conqueror &copy; <a href="https://www.datagin.cz">Datagin.cz</a>',
        //     id: 'mapbox/streets-v11',
        //     tileSize: 512,
        //     zoomOffset: -1
        // }).addTo(map);
    //     map.on("zoomstart", function (e) { console.log("ZOOMSTART source: " + e.sourceTarget._zoom + " target: " + e.target._zoom, e); });
    // map.on("zoomend", function (e) {
    //     console.log("ZOOMEND " + e.sourceTarget._zoom + " target: " + e.target._zoom, e); 
    //     //initAfterZoom(e.target._zoom);
    // });
    // map.on('moveend', function() { 
    //     console.log(map.getBounds());
    // });
}

function zoomIn(src, trgt){
    if (src < trgt){
        return true
    }
    else{
        return false
    }
}

function showLevelIn(trgt){
        if (trgt == 7)
            return true
        else 
            return false
}
function showLevelOut(trgt){
    if (trgt < 7)
        return true
    else 
        return false
}

function init(){
    map = L.map('map', {
        maxBounds: bounds,
        minZoom: 5,
        maxZoom: 10,
        zoomControl: false
    }).setView([45, 15], 5);
    var src = 0;
    var trgt = 0;
    map.on("zoomstart", function (e) { 
        //console.log("ZOOMSTART source: " + e.sourceTarget._zoom + " target: " + e.target._zoom, e); 
        src = e.sourceTarget._zoom;
    });
    map.on("zoomend", function (e) {
        //console.log("ZOOMEND " + e.sourceTarget._zoom + " target: " + e.target._zoom, e); 
        var trgt = e.target._zoom;
        if (zoomIn(src, trgt)){
            if (showLevelIn(trgt)){
                showLevel(e.target._zoom);
            }
        }else{
            if (showLevelOut(trgt)){
                map.eachLayer(function (layer) {
                    if (layer.feature){
                        if (layer.feature.level == true) {
                            map.removeLayer(layer);
                        }
                    }
                });
            }
        }
    });
    // map.on('moveend', function() { 
    //     console.log(map.getBounds());
    // });
    // var myMovingMarker = L.Marker.movingMarker([[48.8567, 2.3508],[50.45, 30.523333]],
    //     [20000]).addTo(map);
        //myMovingMarker.start();
        var parisKievLL = [[48.8567, 2.3508], [50.45, 30.523333]];
        // var londonParisRomeBerlinBucarest = [[51.507222, -0.1275], [48.8567, 2.3508], 
        // [41.9, 12.5], [52.516667, 13.383333], [44.4166,26.1]];
    
        var icon = L.divIcon({
            iconSize: [112, 156],
            iconAnchor: [10, 10],
            popupAnchor: [10, 0],
            shadowSize: [0, 0],
            className: 'animated-icon my-icon-id' 
        })

//marker latlng
// var ll = L.latLng(45, 17)
// // create marker
// var marker = L.marker(ll, {
//   icon: icon,
//   title: 'look at me!'
// })
// marker.addTo(map)


        // var marker1 = L.Marker.movingMarker(parisKievLL, [100000], {icon: icon}).addTo(map);
        // L.polyline(parisKievLL).addTo(map);
        // marker1.once('click', function () {
        //     marker1.start();
        //     marker1.closePopup();
        //     marker1.unbindPopup();
        //     marker1.on('click', function() {
        //         if (marker1.isRunning()) {
        //             marker1.pause();
        //         } else {
        //             marker1.start();
        //         }
        //     });
        //     setTimeout(function() {
        //         marker1.bindPopup('<b>Click me to pause !</b>').openPopup();
        //     }, 2000);
        // });
        
        
        
        // marker1.bindPopup('<b>Click me to start !</b>', {closeOnClick: false});
        // marker1.openPopup();
        
        // var marker2 = L.Marker.movingMarker(londonParisRomeBerlinBucarest,
        //     [3000, 2000, 5000, 3000], {autostart: true}).addTo(map);
        // L.polyline(londonParisRomeBerlinBucarest, {color: 'red'}).addTo(map);
        // map.fitBounds(londonParisRomeBerlinBucarest);
        
        // marker2.on('end', function() {
        //     marker2.bindPopup('<b>Welcome to Bucarest !</b><br>GitHub Page: <a target="\\blanck" href="https://github.com/ewoken/Leaflet.MovingMarker"><img src="github.png"></a>', {closeOnClick: false})
        //     .openPopup();
        // });
    // original
    //var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWljaGFsdHJua2EiLCJhIjoiY2wwdXNqaDB0MHdsZDNsbjVjMDB6ZDR5ZiJ9.mONacYmtCytV8Y96HlN8xg', {
    // old geo
    //var tiles = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    // like painting
    //var tiles = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {    
    // satelite
    // var tiles = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}', {    
    //     maxZoom: 18,
    //     attribution: 'Conqueror &copy; <a href="https://www.datagin.cz">Datagin.cz</a>',
    //     id: 'mapbox/streets-v11',
    //     tileSize: 512,
    //     zoomOffset: -1,
    //     ext: 'jpg'
    // }).addTo(map);
        
    var layer = new L.StamenTileLayer('terrain');
    map.addLayer(layer);

    readTextFile("./czechia.json", function(text){
        var countryGeoJson = JSON.parse(text);
        countryGeoJson.reset = true;
        geojson = L.geoJson(countryGeoJson, {style: style, onEachFeature: onEachCountry}).addTo(map);
    });
    
    addCountryGeojsonLayer("slovakia");
    addCountryGeojsonLayer("austria");
    addCountryGeojsonLayer("poland");
    addCountryGeojsonLayer("germany");
}