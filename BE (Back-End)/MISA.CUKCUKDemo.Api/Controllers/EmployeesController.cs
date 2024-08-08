using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.CUKCUKDemo.Core.Entities;
using MISA.CUKCUKDemo.Core.Interfaces;

namespace MISA.CUKCUKDemo.Api.Controllers
{
    [Route("api/v1/employees")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private IEmployeeRepository _employeeRepository;
        private IEmployeeService _employeeService;
        public EmployeesController(IEmployeeRepository employeeRepository, IEmployeeService employeeService)
        {
            _employeeRepository = employeeRepository;
            _employeeService = employeeService;
        }
        [HttpGet]
        public IActionResult Get()
        {
            var employees = _employeeRepository.Get();
            return StatusCode(200, employees);
        }

        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            var employees = _employeeRepository.Get(id);
            return StatusCode(200, employees);
        }
        [HttpPost]
        public IActionResult Insert([FromBody] Employee employee)
        {
            var res = _employeeService.InsertService(employee);
            return StatusCode(201, employee);
        }
    }
}
