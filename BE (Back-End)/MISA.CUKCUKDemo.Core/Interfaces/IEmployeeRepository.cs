using MISA.CUKCUKDemo.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CUKCUKDemo.Core.Interfaces
{
    public interface IEmployeeRepository:IBaseRepository<Employee>
    {  
        /// <summary>
        /// Hàm kiểm tra trùng mã
        /// </summary>
        /// <param name="employeeCode">Mã cần kiểm tra</param>
        /// <returns>True - Đã trùng; False - Chưa có trong hệ thống</returns>
        /// Created by: NHDAT (07/08/2024)
        bool CheckEmployeeCodeDuplicate(string employeeCode);
    }
}
