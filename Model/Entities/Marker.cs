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

        public Marker( string name, long latitud, long longitud, string address )
        {
            this.Name = name;
            this.Latitud = latitud;
            this.Longitud = longitud;
            this.Address = address;
        }

        public string Name { get; set; }
        public long Latitud { get; set; }
        public long Longitud { get; set; }
        public string Address { get; set; }
    }
}
