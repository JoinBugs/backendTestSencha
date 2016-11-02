(function ( window, document, undefined )
{
    window.addEventListener('load', init, false);

    function init()
    {
        ws.onLoad('http://localhost:58082/API/WSMaps.asmx', function ()
        {
            console.log('ws.js is loaded');

            ws.SaveMarker(function () { }, {
                'name'      : 'place from js',
                'latitud'   : 123123123,
                'longitud'  : 4324324324,
                'address'   : 'this is a unreal address'
            });

            /*ws.GetAllMarkers(function( markers )
            {
                markers.forEach(function( marker )
                {
                    console.log( marker );
                });
            });*/
        });
    }
}
)( window, document );