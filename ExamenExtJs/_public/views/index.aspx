<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="ExamenExtJs._public.views.index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8"/>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no"/>
    <link href="../css/index.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="http://cbmex7.com/ExtJS/V411/resources/css/ext-all.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js" integrity="sha256-obZACiHd7gkOk9iIL/pimWMTJ4W/pBsKu+oZnSeBIek=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.string/3.3.4/underscore.string.min.js" integrity="sha256-iOkXo5pPeEyOh1IcvZlsNVSh6p+mFfzzHF7rrkyxpes=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js" integrity="sha256-obZACiHd7gkOk9iIL/pimWMTJ4W/pBsKu+oZnSeBIek=" crossorigin="anonymous"></script>
    <script
  src="https://code.jquery.com/jquery-2.2.4.js"
  integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI="
  crossorigin="anonymous"></script>
    <script type="text/javascript" src="http://cbmex7.com/ExtJS/V411/ext-all.js"></script>
    <script type="text/javascript" src="http://cbmex7.com/ExtJS/V411/locale/ext-lang-es.js"></script>
    <script src="../js/libs/util.js"></script>
    <script src="../js/libs/utilAjax.js"></script>
    <script src="../js/libs/ws.js"></script>
    <script src="../js/index.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCbrPfEk5gYVg2BXoV-IG2P_3nHT3rX0KY&libraries=places&callback=initAutocomplete"
    async defer></script>
    <title>Home</title>
</head>
<body>
    <input id="pac-input" class="controls" type="text" placeholder="Search Box">
    <div id="map"></div>
    <section class="pnl" id="pnl-grid"></section>
    <section class="pnl" id="pnl-grid-history"></section>
</body>
</html>