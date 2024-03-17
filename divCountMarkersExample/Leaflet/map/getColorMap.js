var colorArray = []; //масив кольорів для расскраски регионов по вибраному крітерію
var jsonUaRegions = {}; //Глобальний об'єкт властивостей мапи


var electionLayerGroup = L.layerGroup().addTo(map);

//Функция инициализации
function updateColorsRegionsMap(response) {
    if (electionLayerGroup.getLayers().length > 0) {
        electionLayerGroup.clearLayers();//Очищаем слой залівки
    }

    electionLayerGroup.addLayer(
        geojson = L.geoJson(response, {        //(здесь цикл?)
            style: styleRegions,                    //задание цветов (стилей) для отображения каждого региона
            onEachFeature: onEachFeatureRegions     //события при работе с регионом (наведение, уход, клик)
        })
    );
}


//Задание цветов (стилей) для отображения каждого региона feature, на вход получет номер региона
function styleRegions(feature) {
    return {
        fillColor: getColorRegions(feature), //получаем цвет для очередного региона по его id//fillColor: 'yellow',
        weight: 2,
        opacity: .6,        //контрастность (прозрачность) границы регионов (было .7)
        //color: '#DCDCDC',   //цвет границы при загрузке
        color: '#ADD8E6',   //цвет границы при загрузке
        dashArray: '3',
        fillOpacity: .2    //прозрачность цвета областей
    };
}

//Получение цвета для региона по id региона из ранее сформированного массива
function getColorRegions(feature) {
    return colorArray[parseInt(feature.id)];
}

//Все события при работе с регионом на карте
function onEachFeatureRegions(feature, layer) {
    layer.on({
        mouseover: highlightFeatureRegions, //наведение курсора на область
        mouseout: resetHighlightRegions, //уход курсора с области
        click: clickRegion //клик по региону на карте
    });
}

//Наведение на область
function highlightFeatureRegions(e) {
    var layer = e.target;

    //console.log(map.getZoom());
    if (map.getZoom() < 11){
        layer.setStyle({
            weight: 3, //толщина границы области при наведении на область
            color: '#D3D3D3', //цвет границы области при наведении на область #D3D3D3 #DCDCDC
            //color: '#FFFF00', //цвет границы области при наведении на область #D3D3D3
            dashArray: '3',
            fillOpacity: 0.5
        });
    }

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
}

//Уход с области (сброс выделения области)
function resetHighlightRegions(e) {
    geojson.resetStyle(e.target);
}