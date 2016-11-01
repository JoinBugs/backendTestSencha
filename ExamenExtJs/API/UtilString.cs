using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace ExamenExtJs.API
{
    public class UtilString
    {
        private UtilString() { }

        public static String toJSON(Object obj)
        {
            return new JavaScriptSerializer().Serialize(obj);
        }
    }
}