using MISA.CUKCUKDemo.Core.DTOs;
using MISA.CUKCUKDemo.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CUKCUKDemo.Core.Interfaces
{
    public interface IBaseService<T> where T : class
    {
        MISAServiceResult InsertService(T entity);
    }
}
