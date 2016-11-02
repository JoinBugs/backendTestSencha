using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Entities
{
    public class Marker
    {
        public Marker() { }

        public Marker( string name, double latitud, double longitud, string address )
        {
            this.Name = name;
            this.Latitud = latitud;
            this.Longitud = longitud;
            this.Address = address;
        }

        public string Name { get; set; }
        public double Latitud { get; set; }
        public double Longitud { get; set; }
        public string Address { get; set; }
    }
}
