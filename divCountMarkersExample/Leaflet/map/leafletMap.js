//Основний модуль завантаження мапи
//var OSM = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
var OSM = L.tileLayer('http://election.test/Tiles/{z}/{x}/{y}.png', {
//var OSM = L.tileLayer('http://site1.aaa/Tiles/{z}/{x}/{y}.png', {
    maxZoom: 17,
    minZoom: 2,
    attribution: '© OpenStreetMap contributors. Tiles: CC-BY-SA 2.0\r\nMap data © OpenStreetMap contributors'
});

var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3'],
    attribution: '© GoogleStreets contributors.'
});

var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3'],
    attribution: '© GoogleHybrid contributors.'
});

var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3'],
    attribution: '© GoogleSatMap contributors.'
});

var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

var OpenMapSurfer_Roads = L.tileLayer('https://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', {
    maxZoom: 20,
    attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var Esri_NatGeoWorldMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
    maxZoom: 16
});

var centreMapLat = 47.96579;
var centreMapLng = 30.9043;
var mapZoom = 6;

var centreMapLat = 47.96579;
var centreMapLng = 30.9043;
var mapZoom = 6;

//http://{s}.tile.osm.org/{z}/{x}/{y}.png
///Tiles/{z}/{x}/{y}.png
var osmUrl = 'http://gis/Tiles/{z}/{x}/{y}.png',
    osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    osm = L.tileLayer(osmUrl, {maxZoom: 16, attribution: osmAttrib}),
    map = new L.Map('map', {center: new L.LatLng(47.96579, 30.9043), zoom: 6}),
    drawnItems = L.featureGroup().addTo(map);

//Кнопки зума
map.zoomControl.setPosition('topright');

OSM.addTo(map);
//YahooHibrid.addTo(map);

map.addControl(new L.Control.Layers({ //Панель переключения слоев
        'Esri_WorldImagery':Esri_WorldImagery,
        //'Esri_NatGeoWorldMap':Esri_NatGeoWorldMap,
        //'OpenMapSurfer_Roads':OpenMapSurfer_Roads,
        //'OpenTopoMap':OpenTopoMap,
        'OpenStreetMap':OSM,
        'GoogleStreets':googleStreets,
        'GoogleHybrid':googleHybrid,
        'GoogleSat':googleSat
    },
    {}));

L.control.scale({position:'bottomright', imperial: true}).addTo(map); //масштабная линейка (внизу, справа)

var LeafIcon = L.Icon.extend({
    options: {
        shadowUrl: '/libraries/Leaflet/images/marker-shadow.png',
        iconSize:     [32, 37],
        shadowSize:   [41, 41],
        iconAnchor:   [15, 35],
        shadowAnchor: [12, 40],
        popupAnchor:  [2, -34]
    }
});

var roundIcon = L.divIcon({
    iconSize: new L.Point(35,35),
    className: 'roundmarker',
    iconAnchor:[17,34]
});

//Відображати координати по кліку на мапі
var popup = L.popup(); //popUp для отображения координат на карте по клику

function onMapClick(e){
    popup
        .setLatLng(e.latlng)
        .setContent(e.latlng.toString() + " Zoom: " + map.getZoom().toString())
        .openOn(map);
}

//Кордон України
function showUkraineBorder() {

    $.ajax({
        type: "POST",
        url: "/json/ukraine-line.json",
        dataType: 'json',
        success: function (response) {

            var borderStyle = {
                "color" : "blue" ,
                "weight" : 2 ,
                "opacity" :.5
            };
            L.geoJson(response, {style : borderStyle}).addTo(map);
        }
    });
}

//Межі регіонів
function showRegionsBorder() {

    $.ajax({
        type: "POST",
        url: "/json/ua-regions-line.json",
        dataType: 'json',
        success: function (response) {

            var borderStyle = {
                "color" : "#00BFFF" ,
                "weight" : 1 ,
                "opacity" :.7
            };

            L.geoJson(response, {style : borderStyle}).addTo(map);
        }
    });
}

//Лінія розмежування АТО
function showLineDemarcation(weight) {

    if (weight == undefined) weight = 2;

    $.ajax({
        type: "POST",
        url: "/json/work/lineDemarcation.json",
        dataType: 'json',
        success: function (response) {

            var borderStyle = {
                "color" : "red" ,
                "weight" : weight ,
                "opacity" :.7
            };

            L.geoJson(response, {style : borderStyle}).addTo(map);
            //map.setView([48.31608, 39.11682], 8);
        }
    });
}

//Фарбуємо мапу (полігони)
function createColorRegions() {
    $.ajax({
        type: "POST",
        url: "/json/ua-regions.json", //данные по регионам
        dataType: 'json',
        success: function (response) {
            /** розміщуємо отримані властивості регіонів у Глобальний об'єкт
             для того щоб не запитувати його з сервера повторно */
            jsonUaRegions = response;

            updateColorsRegionsMap(jsonUaRegions);
        }
    });
}

//Цетрувати мапу
function centreMap(lat,lng,zoom) {
    if (lat == null){
        map.setView([centreMapLat, centreMapLng], mapZoom);
    } else {
        map.setView([lat, lng], zoom);
    }
}

//Отображение на карте линии
function showJson(idCheckbox,patchJsonFile){

    if (arrayLayerGroup[idCheckbox] != undefined){
        if (arrayLayerGroup[idCheckbox].getLayers().length > 0){
            arrayLayerGroup[idCheckbox].clearLayers();
            arrayLayerGroup[idCheckbox] = undefined;
            return;
        }
    }
    arrayLayerGroup[idCheckbox] = L.layerGroup().addTo(map);
    paintJsonToMap(patchJsonFile,arrayLayerGroup[idCheckbox]);
}

//Первый вариант функции загрузки файла JSON (без возможности редактирования)
function paintJsonToMap(filename, LayerGroupName) {

    //console.log('111',Filename);

    var centreMapLat;
    var centreMapLng;
    var mapZoom;

    $.ajax({
        type: "POST",
        url: "/json/" + filename,
        dataType: 'json',

        success: function (response) {

            console.log(response);

            L.geoJson(response, {
                    style:
                        function (features) {

                            var allStyle = new Object();

                            if (features.properties.color) {
                                allStyle.color = features.properties.color;//цвет линии
                            }
                            if (features.properties.weight) {
                                allStyle.weight = features.properties.weight;//ширина линии
                            }
                            if (features.properties.fillColor) {
                                allStyle.fillColor = features.properties.fillColor;//цвет заливки
                            }
                            if (features.properties.opacity) {
                                allStyle.opacity = features.properties.opacity;//прозрачность
                            }
                            if (features.properties.fillOpacity) {
                                allStyle.fillOpacity = features.properties.fillOpacity;
                            }

                            //Circle create
                            if ((features.properties.radius) && (features.geometry.type == "Point")) {
                                //Перестановка координат местами
                                var array = features.geometry.coordinates;
                                var Ltd = array[1];
                                var Lng = array[0];

                                var Circle = L.circle([Ltd, Lng], features.properties.radius).setStyle(allStyle);

                                if (features.properties.title) {
                                    Circle.bindPopup(features.properties.title);
                                } //если есть подсказка к маркеру

                                //Circle.addTo(map);
                                LayerGroupName.addLayer(Circle);

                            }

                            //Marker create
                            else if (features.geometry.type == "Point") {
                                //Перестановка координат местами
                                var arrayPoint = features.geometry.coordinates;
                                var Ltd = arrayPoint[1];
                                var Lng = arrayPoint[0];

                                console.log(features.properties.icon.options.iconUrl);

                                if (features.properties.iconUrl) {//если есть значек для маркера
                                    var myIcon = L.icon({
                                        iconUrl: features.properties.iconUrl,
                                        iconAnchor: features.properties.icon.options.iconAnchor,
                                        popupAnchor: features.properties.icon.options.popupAnchor
                                    });
                                    var Marker = L.marker([Ltd, Lng], {icon: myIcon});
                                } else {
                                    Marker = L.marker([Ltd, Lng]);
                                }

                                if (features.properties.title) {//если есть подсказка к маркеру
                                    Marker.bindPopup(features.properties.title);
                                }


                                //Marker.addTo(map);
                                LayerGroupName.addLayer(Marker);

                            }

                            //LineString create
                            else if (features.geometry.type == "LineString") {
                                var arrayLS = features.geometry.coordinates;
                                var arrayLSres = new Array();
                                //Перестановка координат местами
                                for (var i = 0; i < features.geometry.coordinates.length; i++) {
                                    var Ltd = arrayLS[i][1];
                                    var Lng = arrayLS[i][0];
                                    var LtdLng = [Ltd, Lng];
                                    arrayLSres.push(LtdLng);
                                }
                                var Polyline = L.polyline(arrayLSres).setStyle(allStyle);

                                if (features.properties.title) { //если есть подсказка к маркеру
                                    Polyline.bindPopup(features.properties.title);
                                }
                                //Polyline.addTo(map);
                                LayerGroupName.addLayer(Polyline);

                            }

                            //Polygon create
                            else if (features.geometry.type == "Polygon") {
                                var arrayPL = features.geometry.coordinates;
                                var arrayPLres = new Array();
                                var res = new Array();
                                //Перестановка координат местами
                                for (var i = 0; i < features.geometry.coordinates[0].length; i++) {
                                    var ltd = arrayPL[0][i][1];
                                    var lng = arrayPL[0][i][0];
                                    var ltdlng = [ltd, lng];
                                    //console.log(ltdlng);
                                    res.push(arrayPLres.push(ltdlng));
                                }
                                var Polygon = L.polygon(arrayPLres).setStyle(allStyle);

                                if (features.properties.title) {
                                    Polygon.bindPopup(features.properties.title);
                                }
                                //Polygon.addTo(map);
                                //Polygon.enableEdit();
                                //if (LayerGroupName == )
                                LayerGroupName.addLayer(Polygon); //добавляем слой в группу
                            }

                            //Координаты центра карты и зум
                            if (features.properties.mapCentreCoordinates) {
                                centreMapLat = features.properties.mapCentreCoordinates.lat;
                                centreMapLng = features.properties.mapCentreCoordinates.lng;
                            }

                            if (features.properties.mapZoom) {
                                mapZoom = features.properties.mapZoom;
                            }
                        }
                }
            );

            /**Центровка карти и ее зум*/
            map.setView([centreMapLat, centreMapLng], mapZoom);

            //map.setView([centreMapLat, centreMapLng], mapZoom);

            /***/
            //L.circleMarker([50.43739, 30.55161]).setRadius(20).setStyle({"color":"red"}).addTo(map);
            //L.circleMarker([47.44579, 37.36279],{radius:100, fillColor:"green"}).addTo(map);
        }
    });

}

//Отображение маркера на карте по координатам
var selectedMarker = null;
var ShowMarker = function(lat, lng){
    if(selectedMarker) map.removeLayer(selectedMarker);
    selectedMarker =  L.marker([lat, lng]).addTo(map);
    map.panTo([lat, lng]);
};