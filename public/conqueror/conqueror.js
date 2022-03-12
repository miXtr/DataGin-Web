var geojson;
var okresy = [{"name":"Benešov","cnt":95459},{"name":"Beroun","cnt":86160},{"name":"Blansko","cnt":105708},{"name":"Brno-město","cnt":385913},{"name":"Brno-venkov","cnt":206300},{"name":"Bruntál","cnt":92693},{"name":"Břeclav","cnt":112828},{"name":"Česká Lípa","cnt":100756},{"name":"České Budějovice","cnt":186462},{"name":"Český Krumlov","cnt":60516},{"name":"Děčín","cnt":128834},{"name":"Domažlice","cnt":59926},{"name":"Frýdek-Místek","cnt":207756},{"name":"Havlíčkův Brod","cnt":94217},{"name":"Hodonín","cnt":153225},{"name":"Hradec Králové","cnt":162661},{"name":"Cheb","cnt":90188},{"name":"Chomutov","cnt":122157},{"name":"Chrudim","cnt":103199},{"name":"Jablonec n.N.","cnt":88200},{"name":"Jeseník","cnt":38779},{"name":"Jičín","cnt":79702},{"name":"Jihlava","cnt":110522},{"name":"Jindřichův Hradec","cnt":90604},{"name":"Karlovy Vary","cnt":115446},{"name":"Karviná","cnt":256394},{"name":"Kladno","cnt":158799},{"name":"Klatovy","cnt":85726},{"name":"Kolín","cnt":96001},{"name":"Kroměříž","cnt":105569},{"name":"Kutná Hora","cnt":73404},{"name":"Liberec","cnt":169878},{"name":"Litoměřice","cnt":117278},{"name":"Louny","cnt":85191},{"name":"Mělník","cnt":104659},{"name":"Mladá Boleslav","cnt":123659},{"name":"Most","cnt":111775},{"name":"Náchod","cnt":109550},{"name":"Nový Jičín","cnt":148074},{"name":"Nymburk","cnt":94884},{"name":"Olomouc","cnt":230408},{"name":"Opava","cnt":174899},{"name":"Ostrava-město","cnt":326018},{"name":"Pardubice","cnt":168423},{"name":"Pelhřimov","cnt":71914},{"name":"Písek","cnt":69843},{"name":"Plzeň-jih","cnt":62389},{"name":"Plzeň-město","cnt":188045},{"name":"Plzeň-sever","cnt":74940},{"name":"Praha","cnt":1268796},{"name":"Praha-východ","cnt":157146},{"name":"Praha-západ","cnt":131231},{"name":"Prachatice","cnt":50010},{"name":"Prostějov","cnt":107859},{"name":"Přerov","cnt":130082},{"name":"Příbram","cnt":112816},{"name":"Rakovník","cnt":54993},{"name":"Rokycany","cnt":47458},{"name":"Rychnov n.K.","cnt":77829},{"name":"Semily","cnt":73605},{"name":"Sokolov","cnt":89961},{"name":"Strakonice","cnt":69786},{"name":"Svitavy","cnt":103245},{"name":"Šumperk","cnt":121299},{"name":"Tábor","cnt":101115},{"name":"Tachov","cnt":51917},{"name":"Teplice","cnt":125498},{"name":"Trutnov","cnt":118174},{"name":"Třebíč","cnt":111693},{"name":"Uherské Hradiště","cnt":141467},{"name":"Ústí n.L.","cnt":118228},{"name":"Ústí n.O.","cnt":136760},{"name":"Vsetín","cnt":142420},{"name":"Vyškov","cnt":88154},{"name":"Zlín","cnt":190488},{"name":"Znojmo","cnt":111380},{"name":"Žďár n.S.","cnt":117219}]
var southWest = L.latLng(53, 8),
    northEast = L.latLng(45, 23),
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

function init(){
    map = L.map('map', {
        maxBounds: bounds,
        minZoom: 5,
        zoomControl: false
    }).setView([45, 15], 5);

    var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 18,
	attribution: 'Conqueror &copy; <a href="https://www.datagin.cz">Datagin.cz</a>',
	id: 'mapbox/streets-v11',
	tileSize: 512,
	zoomOffset: -1
}).addTo(map);

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