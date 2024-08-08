using Microsoft.AspNetCore.Http;
using MISA.CUKCUKDemo.Core.DTOs;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CUKCUKDemo.Core.Exceptions
{
    public class HandleExceptionMiddleware
    {
        private RequestDelegate _next;

        public HandleExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);

            }
            catch (ValidateException ex)
            {
                var serviceResult = new MISAServiceResult();
                serviceResult.Errors.Add(ex.Message);
                var res = JsonConvert.SerializeObject(serviceResult);
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync(res);
            }
            catch (Exception ex)
            {
                var serviceResult = new MISAServiceResult();
                serviceResult.Errors.Add(ex.Message);
                var res = JsonConvert.SerializeObject(serviceResult);
                context.Response.StatusCode = 500;
                await context.Response.WriteAsync(res);
            }
        }
    }
}
