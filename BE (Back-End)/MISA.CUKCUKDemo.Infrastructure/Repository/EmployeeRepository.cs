using Dapper;
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
    public class EmployeeRepository : BaseRepository<Employee>,IEmployeeRepository
    {


        public EmployeeRepository(IMISADbContext dbContext) : base(dbContext)
        { 
        }

        public bool CheckEmployeeCodeDuplicate(string employeeCode)
        {
            var sql = "SELECT EmployeeCode FROM Employee e WHERE e.EmployeeCode =  @EmployeeCode";
            var parameters = new DynamicParameters();
            parameters.Add("@EmployeeCode", employeeCode);
            var res = _dbContext.Connection.QueryFirstOrDefault<string>(sql, parameters);
            return res != null;
        }
       

  

        
    }
}
