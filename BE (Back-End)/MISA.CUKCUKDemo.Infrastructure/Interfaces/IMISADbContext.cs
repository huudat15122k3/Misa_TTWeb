using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CUKCUKDemo.Infrastructure.Interfaces
{
    public interface IMISADbContext
    {
        DbConnection Connection { get; }
        IDbTransaction Transaction { get; set; }
        IEnumerable<T> Get<T>();
        T? Get<T>(Guid id);
        int Insert<T>(T entity);
        int Update<T>(T entity);
        int Delete<T>(string id);
        int DeleteAny<T>(Guid[] ids);
    }
}
