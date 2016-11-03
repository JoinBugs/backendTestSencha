window.markers = [];

function setPopUpOnMarker( marker, map )
{
    var infowindow = new google.maps.InfoWindow(),
        service = new google.maps.places.PlacesService(map);

    service.getDetails({ 'reference': marker.reference }, function (details, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            google.maps.event.addListener(marker.marker, 'click', function () {
                infowindow.setContent('<div class="detail-marker">'
                                      + details.name + "<br />"
                                      + (details.formatted_address || 'sin direccion') + "<br />"
                                      + (details.website || 'sin sitio web') + "<br />"
                                      + (details.rating || 'sin rating') + "<br />"
                                      + (details.formatted_phone_number || 'sin numero de telefono') + "<br />"
                                      + (details.photos[1].html_attributions) + "<br />"
                                      + (details.photos[2].html_attributions) + "<br />"
                                      + (details.photos[3].html_attributions)
                                      + '</div>'
                                    );
                infowindow.open(map, this);
            });
        }
    });
}


function initAutocomplete() {
    var map = window.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -33.8688, lng: 151.2195 },
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // Create the search box and link it to the UI element.
    // // get the element
    var input = document.getElementById('pac-input');
    //configure the element as a widged of google maps
    var searchBox = new google.maps.places.SearchBox(input);
    window.searchBox = searchBox;
    //get display control on top of all map
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });

    // var markers = [];
    // [START region_getplaces]
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.

    ws.onLoad('http://localhost:58082/API/WSMaps.asmx', function ()
    {
        searchBox.addListener('places_changed', function () {

            var places = searchBox.getPlaces(),
                infowindow = new google.maps.InfoWindow(),
                service = new google.maps.places.PlacesService(map);

            //userHistory.removeAll();
            window.userHistory.add({ 'history': places[0].formatted_address });

            if (places.length == 0) {
                return;
            }

            // Clear out the old markers.
            markers.forEach(function (marker) {
                marker.marker.setMap(null);
            });
            //markers = [];

            // For each place, get the icon, name and location.
            var bounds = new google.maps.LatLngBounds();
            places.forEach(function (place) {
                var icon = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };

                // Create a marker for each place.
                markers.push({
                    'marker': new google.maps.Marker({
                        map: map,
                        icon: icon,
                        title: place.name,
                        position: place.geometry.location
                    }),
                    'reference': place.reference
                });

                ws.SaveMarker(function (res) {
                    console.log(res);
                }, {
                    'name': place.name,
                    'latitud': place.geometry.location.lat(),
                    'longitud': place.geometry.location.lng(),
                    'address': place.formatted_address,
                    'reference' : place.reference
                });

                setPopUpOnMarker(markers[markers.length - 1], window.map );

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            map.fitBounds(bounds);
        });
    });

    
    // [END region_getplaces]
    //
}


(function (window, document, undefined) {
    window.addEventListener('load', function () {
        init();
    },
    false);

    function init() {
        Ext.onReady(function () {
            console.log("- Libreria ExtJS cargada. Ahora ya puedo utilizar ExtJS. .....");

            // --------------------------------------------------------------
            // CONFIGURACIONES GLOBALES
            // ---------------------------------------------------------------
            Ext.QuickTips.init();
            Ext.Ajax.defaultHeaders = { 'Content-Type': 'application/json;charset=utf-8;' };
            // ---------------------------------------------------------------

            PageLoaded();
        });
    }

    function doEmptyNode(node) {
        var nodes = Array.prototype.slice.call(node.childNodes);
        nodes.forEach(function (node) { node.remove(); });
    }

    function PageLoaded() {
        var btnSearch = document.querySelector('#pac-input');

        Ext.define('usersuggest', {
            extend: 'Ext.data.Model',
            fields: ['path']
        });

        Ext.define('UserHistory', {
            extend: 'Ext.data.Model',
            fields: ['history']
        });

        var userStore = Ext.create('Ext.data.Store', {
            model: 'usersuggest',
            data: []
        }),
            userHistory = Ext.create('Ext.data.Store', {
                model: 'UserHistory',
                data: []
            });

        window.userHistory = userHistory;

        ws.onLoad('http://localhost:58082/API/WSMaps.asmx', function()
        {
            var icon = {
                'url': 'https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png',
                'size': new google.maps.Size(71, 71),
                'origin': new google.maps.Point(0, 0),
                'anchor': new google.maps.Point(17, 34),
                'scaledSize': new google.maps.Size(25, 25)
            };

            ws.GetAllMarkers(function (markers) {
                if (util.isArray(markers) && markers.length > 0)
                    markers.forEach(function (marker) {
                        console.log(marker);
                        window.userHistory.add({ 'history': marker.Address });
                        window.markers.push({
                            'marker': new google.maps.Marker({
                                map: map,
                                icon: icon,
                                title: marker.Name,
                                position: new google.maps.LatLng(parseFloat(marker.Latitud), parseFloat(marker.Longitud))
                            }),
                            'reference': marker.Reference
                        });
                        setPopUpOnMarker(window.markers[window.markers.length - 1], window.map);
                    });
                else
                    Ext.MessageBox.alert('Aviso', 'No hay Registros Guardados', function (btn) {
                    });
            });
        });

        Ext.create('Ext.grid.Panel', {
            renderTo: document.querySelector('#pnl-grid'),
            store: userStore,
            width: 400,
            height: 200,
            title: 'Sugerencias de busqueda',
            columns: [
                {
                    text: 'Rutas',
                    width: 1000,
                    sortable: false,
                    hideable: false,
                    dataIndex: 'path'
                }
            ]
        });

        Ext.create('Ext.grid.Panel', {
            renderTo: document.querySelector('#pnl-grid-history'),
            store: userHistory,
            width: 400,
            height: 200,
            title: 'Historial de busqueda',
            columns: [
                {
                    text: 'Historial',
                    width: 1000,
                    sortable: false,
                    hideable: false,
                    dataIndex: 'history'
                }
            ],
            listeners: {
                itemclick: function (dv, record, item, index, e) {
                    for (var i = 0, l = window.markers.length; i < l; i++)
                        if (i !== index)
                            window.markers[i].marker.setMap(null);

                    var bounds = new google.maps.LatLngBounds();

                    markers[index].marker.setMap(window.map);
                    map.setZoom(10);
                    map.panTo(markers[index].marker.position);
                }
            }
        });

        btnSearch.addEventListener('keypress', function (e) {
            var dataNode = document.querySelectorAll('.pac-item'),
                dataMatched = _.map(dataNode, function (data) {
                    return {
                        'path': data.childNodes[1].textContent + ' ' + data.childNodes[2].textContent
                    };
                });

            userStore.removeAll();
            userStore.add(dataMatched);
            _.forEach(dataMatched, function (data) {
                console.log(data["path"]);
            });
            window.dataMatched = dataMatched;
        },
          false);
    }
})
(window, document);