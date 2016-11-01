using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model.Entities;

namespace Model.DAO
{
    public class AccessMarker
    {
        private AccessMarker() { }

        public static bool saveMarker( Marker marker )
        {
            return true;
        }

        public static List<Marker> getAllMarkers()
        {
            List<Marker> markers = new List<Marker>();
            markers.Add(new Marker()
            {
                Name = "marker1",
                Latitud = 123123123,
                Longitud = 234234234,
                Address = "Guadalajara"
            });

            return markers;
        }
    }
}
