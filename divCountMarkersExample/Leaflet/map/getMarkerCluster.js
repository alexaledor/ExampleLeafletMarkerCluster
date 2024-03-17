var marker_icon = '/libraries/Leaflet/images/marker-icon.png'; //значек маркера

var icon = new LeafIcon({
    iconUrl: marker_icon,
    iconSize: [25,41],
});


//Кластерізація маркерів
var arrayLayerGroup = [];

//arrayLayerGroup['cluster'] = L.markerClusterGroup().addTo(map);

arrayLayerGroup['cluster'] = L.markerClusterGroup({
    iconCreateFunction: function(cluster) {
        return L.divIcon({ html: "<img src="+ marker_icon +" /><div>" + cluster.getChildCount() + "</div>",
            className: 'mycluster',
            iconSize: L.point(35, 35),
        });
    }
}).addTo(map);

