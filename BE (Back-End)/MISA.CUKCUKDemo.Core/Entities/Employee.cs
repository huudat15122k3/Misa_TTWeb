using MISA.CUKCUKDemo.Core.Const;
using MISA.CUKCUKDemo.Core.CustomValidation;
using MISA.CUKCUKDemo.Core.MISAEnum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CUKCUKDemo.Core.Entities
{
    public class Employee
    {
        public Guid EmployeeId { get; set; }

        [Required(ErrorMessage = MISAConst.ERROR_EMPLOYEECODE_EMPTY)]
        public required string EmployeeCode { get; set; }

        [Required(ErrorMessage = MISAConst.ERROR_EMPLOYEENAME_EMPTY)]
        public required string FullName { get; set; }
        [DateGreaterThanToday(ErrorMessage = MISAConst.ERROR_EMPLOYEEDOB_VALIDATE)]
        public DateTime? DateOfBirth { get; set; }
        public Gender Gender { get; set; }
        public string? IdentifyNumber { get; set; }
        public DateTime? IdentifyDate { get; set; }
        public string? IdentifyPlace { get; set; }
        [EmailAddress(ErrorMessage =MISAConst.ERROR_EMPLOYEEEMAIL_FORM)]
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? LandlineNumber { get; set; }
        public string? BankAccount { get; set; }
        public string? BankName { get; set; }
        public string? BankBranch { get; set; }
        public string? Address { get; set; }
        public Guid PositionId { get; set; }
        public Guid DepartmentId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string? ModifiedBy { get; set; }
    }
}
