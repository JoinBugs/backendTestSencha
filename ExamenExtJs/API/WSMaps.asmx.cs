using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using Model.DAO;
using Model.Entities;

namespace ExamenExtJs.API
{
    /// <summary>
    /// Summary description for WSMaps
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class WSMaps : System.Web.Services.WebService
    {
        [WebMethod]
        public string SaveMarker( string name, string latitud, string longitud, string address, string reference )
        {
            return AccessMarker.saveMarker( new Marker( name, latitud, longitud, address, reference ) ).ToString();
        }

        [WebMethod]
        public string GetAllMarkers()
        {
            return UtilString.toJSON( AccessMarker.getAllMarkers() );
        }

        [WebMethod]
        public string GetMarkersByRange( int index_start, int index_end )
        {
            return UtilString.toJSON( AccessMarker.getMarkersByRange( index_start, index_end ) );
        }
    }
}