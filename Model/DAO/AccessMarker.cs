using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model.Entities;
using System.Data.SqlClient;

namespace Model.DAO
{
    public class AccessMarker
    {
        private static Connection db = Connection.getConnection();

        private AccessMarker() { }

        public static bool saveMarker( Marker marker )
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "INSERT INTO MARKER( name, latitud, longitud, address ) VALUES( @name, @latitud, @longitud, @address )";
            cmd.Connection = db.cnConexion;
            cmd.Parameters.AddWithValue("@name", marker.Name );
            cmd.Parameters.AddWithValue("@latitud", marker.Latitud);
            cmd.Parameters.AddWithValue("@longitud", marker.Longitud);
            cmd.Parameters.AddWithValue("@address", marker.Address);
            db.ConectarBD();
            bool sucess = db.ejecutar(cmd);
            db.CerrarBD();
            return sucess;
        }

        public static List<Marker> getAllMarkers()
        {
            List<Marker> markers = new List<Marker>();

            db.ejecutarReader("SELECT * FROM MARKER", reader =>
            {
                markers.Add(new Marker()
                {
                    Name = reader["name"].ToString(),
                    Latitud = reader["latitud"].ToString(),
                    Longitud = reader["longitud"].ToString(),
                    Address = reader["address"].ToString()
                });
            });

            return markers;
        }
    }
}
