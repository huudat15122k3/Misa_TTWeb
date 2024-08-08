using MISA.CUKCUKDemo.Core.DTOs;
using MISA.CUKCUKDemo.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CUKCUKDemo.Core.Services
{
    public class BaseService<T> : IBaseService<T> where T : class
    {
        protected IBaseRepository<T> repository;

        public BaseService(IBaseRepository<T> repository)
        {
            this.repository = repository;
        }

        public MISAServiceResult InsertService(T entity)
        {
            SetNewId(entity);
            ValidateObject(entity);
            var res = repository.Insert(entity);
            return new MISAServiceResult();
            
        }

        private void SetNewId(T entity)
        {
            var className = typeof(T).Name;
            var prop = typeof(T).GetProperty($"{className}Id");
            if( prop != null &&(prop.PropertyType ==typeof( Guid) || prop.PropertyType == typeof(Guid?)))
            {
                prop.SetValue(entity, Guid.NewGuid());
            }
        }

        protected virtual void ValidateObject(T entity)
        {

        }

            
    }
}
