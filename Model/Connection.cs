using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;

namespace Model
{
    public class Connection
    {
        public static  string SERVER              = "DESKTOP-8AVQ5EF\\SQLEXPRESS",
                              DATABASE            = "testClient";
        public static  bool   TRUSTED_CONNECTION  = true;

        public SqlConnection cnConexion;
        private const string DELIM = ";";

        private static Connection instance = new Connection();
        
        private Connection()
        {
            this.cnConexion = new SqlConnection();
            configConnections();
        }

        private void configConnections()
        {
            this.cnConexion.ConnectionString = String.Format("Server={0} Database={1} Trusted_Connection={2} ", 
                                                             SERVER,
                                                             DATABASE,
                                                             TRUSTED_CONNECTION
                                                             ).Replace( " ", DELIM );
        }

        public static Connection getConnection()
        {
            return new Connection();
        }

        private bool Conectar(SqlConnection conexion)
        {
            if( conexion.State != ConnectionState.Open )
            {
                try
                {
                    if( conexion != null )
                        conexion.Open();
                }
                catch (SqlException ex)
                {
                    return false;
                }
            }
                
            return true;
        }

        public bool ConectarBD()
        {
            return Conectar(cnConexion);
        }

        public void CerrarBD()
        {
            cnConexion.Close();
        }

        public bool ejecutar(SqlCommand cmd)
        {
            try
            {
                cmd.ExecuteNonQuery();
                cmd.Dispose();                
                return true;
            }
            catch (SqlException ex)
            {
                return false;
            }
        }

        public DataTable ejecutarConsulta(SqlCommand cmd)
        {
            SqlDataAdapter adp = new SqlDataAdapter();
            DataTable dt = new DataTable();

            adp.SelectCommand = cmd;
            adp.Fill(dt);
            return dt;
        }

        public R ejecutarConsulta<R>(Func<SqlCommand, R> consult)
        {
            SqlCommand comm = new SqlCommand();
            comm.Connection = this.cnConexion;
            R result = consult.Invoke(comm);
            return result;
        }        

        public bool ejecutarReader( String SQL, Action<SqlDataReader> act )
        {
            ConectarBD();
            SqlCommand cmd = new SqlCommand(SQL, cnConexion);
            SqlDataReader dr = cmd.ExecuteReader();
            
            try
            {
                while ( dr.Read() )
                    act(dr);
                return true;
            }
            catch( SqlException ex )
            {
                return false;
            }
            finally
            {
                cmd.Dispose();
                dr.Close();
                dr.Dispose();
                CerrarBD();
            }
        }
    }
}
