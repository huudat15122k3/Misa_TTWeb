using Dapper;
using MISA.CUKCUKDemo.Infrastructure.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CUKCUKDemo.Infrastructure.DatabaseContext
{
    public class SQLServerDbContext : IMISADbContext
    {
        public DbConnection Connection { get; }
        public IDbTransaction Transaction { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        public SQLServerDbContext()
        {
            Connection = new SqlConnection("");
        }
        public IEnumerable<T> Get<T>()
        {
            var className = typeof(T).Name;
            var sql = $"Select * from {className}";
            var data = Connection.Query<T>(sql).ToList();
            return data;
        }

        public T? Get<T>(Guid id)
        {
            var className = typeof(T).Name;

            var sql = $"SELECT * From {className} where {className}Id = @id";
            var parameters = new DynamicParameters();
            parameters.Add("@id", id);

            //Thực hiện lấy dữ liệu:
            var data = Connection.Query<T>(sql, param: parameters).FirstOrDefault();
            //Trả về kết quả:
            return data;
        }

        public int Insert<T>(T entity)
        {
            var className = typeof(T).Name;

            var propListName = "";
            var propListValue = "";

            var props = entity.GetType().GetProperties();
            var parameters = new DynamicParameters();
            foreach (var prop in props)
            {
                var propName = prop.Name;
                propListName += $"{propName},";
                var propValue = prop.GetValue(entity);
                propListValue += $"@{propValue},";
                parameters.Add($"@{propName}", propValue);
            }
            propListName = propListName.Substring(0, propListName.Length - 1);
            propListValue = propListValue.Substring(0, propListName.Length - 1);
            //Câu lệnh sql lấy dữ liệu:
            var sql = $"INSERT INTO {className} ({propListName}) VALUES ({propListValue})";

            var res = Connection.Execute(sql, param: parameters);
            return res;
        }

        public int Update<T>(T entity)
        {
            throw new NotImplementedException();
        }

        public int Delete<T>(string id)
        {
            var className = typeof(T).Name;
            var sql = $"DELETE FROM {className} WHERE {className}Id = @id";
            var parameters = new DynamicParameters();
            parameters.Add("@id", id);
            var res = Connection.Execute(sql, parameters);
            return res;
        }

        public int DeleteAny<T>(Guid[] ids)
        {
            var className = typeof(T).Name;
            var res = 0;
            var sql = $"DELETE FROM {className} WHERE {className}Id IN (@ids)";
            var parameters = new DynamicParameters();
            var Ids = "";
            foreach (var item in ids)
            {
                Ids += $"{item},";
            }
            Ids = Ids.Substring(0, Ids.Length - 1);
            parameters.Add("@ids", Ids);
            res = Connection.Execute(sql, parameters);
            return res;
        }
    }
}
