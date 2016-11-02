using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;

namespace Tester
{
    public class Program
    {
        static void Main(string[] args)
        {
            Connection con = Connection.getConnection();
            con.ejecutarReader("SELECT * FROM MARKER", reader =>
            {
                string row = "";
                for (int i = 0, l = reader.FieldCount; i < l; i++)
                    row += reader[i].ToString();
                Console.WriteLine(row);
            });
            Console.Read();
        }
    }
}