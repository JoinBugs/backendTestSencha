using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using Model.DAO;

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
        public string HelloWorld()
        {
            return UtilString.toJSON( AccessHolaMundo.get() );
        }

      
    }
}
