using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;

namespace Model
{
    public class Connection
    {
        public SqlConnection    cnConexion,
                                cnConexionBDProblema;

        public static String DB_IP = "127.0.0.1",
                                 DB_PORT = "3306",    
                                 DB_DEFAULT_NAME = "sqlJudge",
                                 DB_USER = "root",
                                 DB_PASS = "root";

        private static Connection instance = new Connection();

        private String DELIM = ";";
        
        private Connection()
        {
            this.cnConexion = new SqlConnection();
            this.cnConexionBDProblema = new SqlConnection();
            configConnections();
        }

        private void configConnections()
        {
            this.cnConexion.ConnectionString = String.Format("SERVER={0} PORT={1} DATABASE={2} UID={3} PWD={4}",
                                                                                                DB_IP,
                                                                                                DB_PORT,
                                                                                                DB_DEFAULT_NAME,
                                                                                                DB_USER,
                                                                                                DB_PASS
                                                                                                ).Replace(" ", DELIM);

        }

        public static Connection getConnection()
        {
            return instance;
        }

        private bool Conectar(string bd, SqlConnection conexion)
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
                    //MessageBox.Show("Problemas con el servidor de bases de datos", "Conexión", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    return false;
                }
            }
            // CONEXIÓN A LA BASE DE DATOS DEL PROBLEMA A EVALUAR
                
            return true;
        }

        public bool ConectarBD()
        {
            return Conectar(DB_DEFAULT_NAME, cnConexion);
        }

        public bool ConectarBDProblema( String bd )
        {
            return Conectar(bd, cnConexionBDProblema);
        }

        public void Cerrar()
        {
            cnConexion.Close();
        }

        public void CerrarBDProblema()
        {
            cnConexionBDProblema.Close();
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
            comm.Connection = this.cnConexionBDProblema;
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
                Cerrar();
            }
        }

        public override object InitializeLifetimeService()
        {
            return null;
        }
    }
}
