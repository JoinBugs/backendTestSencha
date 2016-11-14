window.pages = [];
window.isBotClick = false;
window.TOTAL = 0;

var fetchedData = window.fetchedData = function()
{
    this.data = null;
    this.total = 0;
};

function refreshGrid()
{
    window.isBotClick = true;
    document.getElementById('button-1025-btnIconEl').click();
}

function indexPageOfMarker( pages, page )
{
    for (var i = 0, l = pages.length; i < l; i++)
        if (pages[i].page === page)
            return i;
    return -1;
}

function getData(page, count, store)
{
    page = page - 1;
    var args = {
        'index_start': ( page * count ) + 1,
        'index_end': ( page * count) + count
    };
    ws.GetMarkersByRange(function (markers)
    {
        var pageFill = [];
        if (util.isArray(markers) && markers.length > 0)
        {
            markers.forEach(function (marker) {
                console.log(marker);
                pageFill.push({
                    'marker': new google.maps.Marker({
                        map: map,
                        icon: icon,
                        title: marker.Name,
                        position: new google.maps.LatLng(parseFloat(marker.Latitud), parseFloat(marker.Longitud))
                    }),
                    'reference': marker.Reference
                });
                setPopUpOnMarker(pageFill[ pageFill.length - 1 ], window.map);
            });
            var index_page = indexPageOfMarker( window.pages, page );
            if (index_page === -1)
                window.pages.push({
                    'page': page,
                    'markers': pageFill
                });
            else
                window.pages[index_page] = {
                    'page': page,
                    'markers': pageFill
                };
        }
            
        fetchedData.data = _.map(markers, function (e) { return [e.Address] });
        fetchedData.total = window.TOTAL;
        store.proxy.data = fetchedData;
        window.grid.setLoading(false);
        window.store = store;
        refreshGrid();
        //userHistory.load();
        //userHistory.reload();
    }, args);
}

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
            //window.userHistory.add({ 'history': places[0].formatted_address });

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

                setPopUpOnMarker(pages[pages.length - 1], window.map );

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

        window.icon = {
            'url': 'https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png',
            'size': new google.maps.Size(71, 71),
            'origin': new google.maps.Point(0, 0),
            'anchor': new google.maps.Point(17, 34),
            'scaledSize': new google.maps.Size(25, 25)
        };

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
                pageSize: 2,
                proxy: {
                    type: 'memory',
                    reader: { type: 'array', root: 'data', totalProperty: 'total' }
                },
                listeners: {
                    beforeload: function (store, operation, eOpts) {
                        if (window.isBotClick)
                        {
                            window.isBotClick = false;
                            return;
                        }
                        var page = operation.page;
                        var limit = operation.limit;
                        window.grid.setLoading(true);
                        getData(page, limit, store);
                    }
                }
            });
   
        window.userHistory = userHistory;

        ws.onLoad('http://localhost:58082/API/WSMaps.asmx', function()
        {
            window.icon = {
                'url': 'https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png',
                'size': new google.maps.Size(71, 71),
                'origin': new google.maps.Point(0, 0),
                'anchor': new google.maps.Point(17, 34),
                'scaledSize': new google.maps.Size(25, 25)
            };

            ws.GetAllMarkers(function (markers) {
                if (util.isArray(markers) && markers.length > 0)
                {
                    window.TOTAL = markers.length;
                }
                    
                    /*markers.forEach(function (marker) {
                        console.log(marker);
                        //window.userHistory.add({ 'history': marker.Address });
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
                    });*/
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

      window.grid =  Ext.create('Ext.grid.Panel', {
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
                itemclick: function (dv, record, item, index, e) 
                {
                    var index_current_page = indexPageOfMarker(pages, parseInt(document.getElementById('numberfield-1019-inputEl').value) - 1 );
                    var markers = window.pages[index_current_page].markers;
                    for (var i = 0, l = markers.length; i < l; i++)
                        if (i !== index)
                            markers[i].marker.setMap( null );
                            //window.markers[i].marker.setMap(null);

                    var bounds = new google.maps.LatLngBounds();

                    markers[index].marker.setMap(window.map);
                    map.setZoom(10);
                    map.panTo(markers[index].marker.position);
                }
            },
            bbar: Ext.create('Ext.PagingToolbar', {
                store: userHistory,
                displayInfo: true,
                displayMsg: '{0} - {1} of {2}',
                emptyMsg: "No Hay Entradas"
            })
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