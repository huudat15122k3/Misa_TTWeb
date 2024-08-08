using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CUKCUKDemo.Core.Exceptions
{
    public class ValidateException : Exception
    {
        private string MsgError = string.Empty;
        public ValidateException(string errors)
        {
            this.MsgError = errors;
        }

        public override string Message => this.MsgError;
    }
}
