using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CUKCUKDemo.Core.DTOs
{
    public class MISAServiceResult
    {
        public bool Success { get; set; }
        public object? Data { get; set; }
        public List<string> Errors { get; set; } = new List<string>();
    }
}
