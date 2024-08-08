using Microsoft.AspNetCore.Http;
using MISA.CUKCUKDemo.Core.DTOs;
using MISA.CUKCUKDemo.Core.Entities;
using MISA.CUKCUKDemo.Core.Exceptions;
using MISA.CUKCUKDemo.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CUKCUKDemo.Core.Services
{
    public class EmployeeService : BaseService<Employee>, IEmployeeService
    {
        IEmployeeRepository _employeeRepository;
        public EmployeeService(IEmployeeRepository employeeRepository) : base(employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public MISAServiceResult ImportService(IFormFile excelFile)
        {
            throw new NotImplementedException();
        }

        protected override void ValidateObject(Employee entity)
        {
            //Thực hiện kiểm tra mã nhân viên
            var isDuplicate = _employeeRepository.CheckEmployeeCodeDuplicate(entity.EmployeeCode);
            if(isDuplicate)
            {
                throw new ValidateException(MISA.CUKCUKDemo.Core.Resource.Resource1.ValidateMsg_EmployeeCodeEmpty);
            }
            
        }
    }
}
