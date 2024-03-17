/**
 *  Прототипи GeoJson для створення векторних обєктів
 */

//Спасибо Александру Тугай!!!
var circleToGeoJSON = L.Circle.prototype.toGeoJSON;
L.Circle.include({
    toGeoJSON: function() {
        var feature = circleToGeoJSON.call(this);
        feature.properties = this.properties;
        return feature;
    }
});

var markerToGeoJSON = L.Marker.prototype.toGeoJSON;
L.Marker.include({
    toGeoJSON: function() {
        var feature = markerToGeoJSON.call(this);
        feature.properties = this.properties;//Спасибо Александру Тугай!!!
        return feature;
    }
});

var lineToGeoJSON = L.Polyline.prototype.toGeoJSON;
L.Polyline.include({
    toGeoJSON: function() {
        var feature = lineToGeoJSON.call(this);
        feature.properties = this.properties;
        return feature;
    }
});

var polygonToGeoJSON = L.Polygon.prototype.toGeoJSON;
L.Polygon.include({
    toGeoJSON: function() {
        var feature = polygonToGeoJSON.call(this);
        feature.properties = this.properties;
        return feature;
    }
});