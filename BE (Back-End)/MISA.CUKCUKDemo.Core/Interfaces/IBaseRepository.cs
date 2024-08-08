using MISA.CUKCUKDemo.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CUKCUKDemo.Core.Interfaces
{
    public interface IBaseRepository<T> where T : class
    {
        IEnumerable<T> Get();
        T? Get(Guid id);
        int Insert(T entity);
        int Update(T entity);
        int Delete(string id);
        int DeleteAny(Guid[] ids );
    }
}
