(function ( window, document, undefined )
{
    window.addEventListener('load', init, false);

    function init()
    {
        ws.onLoad('http://localhost:58082/API/WSMaps.asmx', function ()
        {
            console.log('ws.js is loaded');
            ws.GetAllMarkers(function( markers )
            {
                markers.forEach(function( marker )
                {
                    console.log( marker );
                });
            });
        });
    }
}
)( window, document );