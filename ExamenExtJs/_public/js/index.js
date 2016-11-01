(function ( window, document, undefined )
{
    window.addEventListener('load', init, false);

    function init()
    {
        ws.onLoad('http://localhost:58082/API/WSMaps.asmx', function ()
        {
            console.log('ws.js is loaded');
            ws.HelloWorld(function (res) {
                console.log(res.Message);
            });
        });
    }
}
)( window, document );