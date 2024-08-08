using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.CUKCUKDemo.Core.Entities;
using MISA.CUKCUKDemo.Core.Interfaces;
using MISA.CUKCUKDemo.Infrastructure.Interfaces;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CUKCUKDemo.Infrastructure.Repository
{
    public class BaseRepository<T> : IBaseRepository<T>, IDisposable where T : class
    {
        protected IMISADbContext _dbContext;
        protected string _className;

        public BaseRepository(IMISADbContext dbContext)
        {
            _dbContext = dbContext;
            _className = typeof(T).Name;
        }

        public IEnumerable<T> Get()
        {
            var data = _dbContext.Get<T>();
            return data;
        }

        public T? Get(Guid id)
        {
            var data = _dbContext.Get<T>(id);
            return data;
        }

        public int Insert(T entity)
        {
            _dbContext.Connection.Open();
            _dbContext.Transaction = _dbContext.Connection.BeginTransaction();
            var res = _dbContext.Insert<T>(entity);
            _dbContext.Transaction.Commit();
            return res;

        }

        public int Update(T entity)
        {
            var res = _dbContext.Update<T>(entity);
            return res;
        }

        public int Delete(string id)
        {
            var res = _dbContext.Delete<T>(id);
            return res;
        }

        public int DeleteAny(Guid[] ids)
        {
            var res = _dbContext.DeleteAny<T>(ids);
            return res;
        }

        public void Dispose()
        {
            _dbContext.Connection.Close();
        }
    }
}
