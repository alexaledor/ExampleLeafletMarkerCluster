//Відображення легенди на мапі
var LegendArray = {};
var pic = '_blast.png';
var status = 'Обстріли';
//LegendArray[0] = "<tr><td><img src='images/markers/" + pic + "'></td><td>" + status + "</td></tr>";
//LegendArray[1] = "<tr><td><img src='images/markers/" + pic + "'></td><td>" + status + "</td></tr>";
//LegendArray[2] = "<tr><td><img src='images/markers/" + pic + "'></td><td>" + status + "</td></tr>";


//Легенда (местоположение)
var Legend = L.control({position: 'bottomright'});//bottomright, topleft
Legend.onAdd = function () {
    this._div = L.DomUtil.create('div', 'leaflet-bar legend');
    this._div.innerHTML += "";
    return this._div;
};


Legend.update = function(htm){
    this._div.innerHTML = htm;
};

Legend.addTo(map);

//формирование (обновление) Легенды
var RefreshLegend = function(){

    var htm = "<table style='width: 250px; font-size: 14px'>";

    for(var index in LegendArray){
        if(!LegendArray.hasOwnProperty(index)){
            continue;
        }
        htm += LegendArray[index];
    }

    htm += "</table>";
    Legend.update(htm);
};

//Статистика вбиті та ранені
var InjuredKilledArray = [];
/*var st_date = '23/11/2018';
var end_date = '07/12/2018';*/
/*var count = 0;
var injured = 0;
var killed = 1;*/

//InjuredKilledArray[0] = "<label style='float: right; margin: 5px; cursor: pointer' onclick='closeWinInfo()'>X</label>";

var InjuredKilled = L.control({position: 'bottomright'});
InjuredKilled.onAdd = function () {
    this._div = L.DomUtil.create('div', 'leaflet-bar legend injuredkilled');
    this._div.innerHTML += "";
    return this._div;
};

InjuredKilled.addTo(map);

InjuredKilled.update = function(htm){
    this._div.innerHTML = htm;
};

var RefreshInjuredKilled = function(){
    var htm = "<table style='width: 250px; margin: 5px; font-size: 14px'>";
    for(var index in InjuredKilledArray){
        if(!InjuredKilledArray.hasOwnProperty(index)){
            continue;
        }
        htm += InjuredKilledArray[index];
    }
    htm += "</table>";
    htm += "<a href='/?ato-statistic' target='_blank' style='width: 200px;'>Більш детально...</a>";
    InjuredKilled.update(htm);
};

//RefreshInjuredKilled();

function closeWinInfo() {
    $('.injuredkilled').addClass('hidden');
}

//кнопка Легенда
/*var LegendControl = L.control({position: 'topright'});
LegendControl.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'leaflet-bar');
    this.link = L.DomUtil.create('a', 'legent', this._div);
    this.link.innerHTML = "<span title='показати/сховати легенду' style='padding: 5px;' onclick='ShowHideLegend();'>L</span>";
    //this.link.href = 'javascript:void(0)(ShowHideLegent())';
    return this._div;
};

LegendControl.addTo(map);*/

/*var checkLegend = false;

//отобразить/спрятать Легенду
var ShowHideLegend = function(){
    if(checkLegend){
        Legend.removeFrom(map);
        checkLegend = false;
    }else{
        Legend.addTo(map);
        RefreshLegend();
        checkLegend = true;
    }
};*/

//ShowHideLegend();