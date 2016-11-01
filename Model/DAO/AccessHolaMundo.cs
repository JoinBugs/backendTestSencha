using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model.Entities;

namespace Model.DAO
{
    public class AccessHolaMundo
    {
        private AccessHolaMundo() { }

        public static HolaMundo get()
        {
            return new HolaMundo(){ Message = "Hola Mundo" };
        }
    }
}