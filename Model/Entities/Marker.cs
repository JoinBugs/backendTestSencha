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

        public Marker( string name, string latitud, string longitud, string address, string reference )
        {
            this.Name = name;
            this.Latitud = latitud;
            this.Longitud = longitud;
            this.Address = address;
            this.Reference = reference;
        }

        public string Name { get; set; }
        public string Latitud { get; set; }
        public string Longitud { get; set; }
        public string Address { get; set; }
        public string Reference { get; set; }
    }
}
