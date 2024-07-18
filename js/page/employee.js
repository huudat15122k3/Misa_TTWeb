$(document).ready(function() {
    var formMode = '';
    var employeeIDForUpdate = '';
    //Loading 
    loading();
    //Api lấy dữ liệu
    loadData();

    //Bật form
    $("#add-btn").click(function(){
        $("#m-form")[0].reset();
        formMode = 'add'
        $("#overlay").fadeIn(300);
        $("#txtEmployeeCode").focus();
    })
    //Tắt form
    $(".close-form-btn").on('click',function() {
        $("#overlay").fadeOut(300);
    })
    $('#overlay').on('click', function(event) {
        if (event.target.id === 'overlay') {
            $('#overlay').fadeOut(300);
        }
    });
    //DblClick 1 dòng để hiện form
    $(document).on('dblclick','.m-table tbody tr',rowDbClick)
   
    //Click btn để hiện form
    $(document).on('click', '.m-table tbody tr #edit-btn-form', function(event) {
        rowDbClick.call($(this).closest('tr'), event);
    });
    //xóa 1 employee
    $(document).on('click', '.m-table tbody tr #delete-btn-form', function(event) {
        let employeeID = $(this).closest('tr').data('employee').EmployeeId;
        
    // Hiển thị hộp thoại xác nhận trước khi xóa
        if (confirm('Bạn có chắc chắn muốn xóa nhân viên này không?')) {
        $.ajax({
            type: 'DELETE',
            url: `https://cukcuk.manhnv.net/api/v1/Employees/${employeeID}`,
            success: function(res) {  
                //thông báo   
                notify(resource.VI.success,resource.VI.successDeleteMsg);
                $('#notify').fadeIn();        
                // Xóa dữ liệu trong bảng và tải lại dữ liệu mới
                $("#m-table tbody").empty();
                loading()
                loadData();
                // Hiển thị thông báo xóa thành công
                
                // Ẩn thông báo sau 5 giây
                setTimeout(function() {
                    $('#notify').fadeOut();
                }, 5000);
            },
            error: function(res) {
                // Xử lý lỗi nếu có
                console.error("Error deleting employee:", res);

               
            }
        });
    }
    })


    //Submit form
    $("#btn-submit").click(function(event){
        event.preventDefault();
        //lấy dữ liệu từ các input
        let employeeCode = $('#txtEmployeeCode').val();
        let employeeFullName = $('#txtEmployeeFullName').val();

        let employeeJobPosition = $('#m-job-position').val();
        let employeeJobDepartment = $('#m-job-department').val();

        let employeeDOB = $('#txtEmployeeDOB').val();
        let employeeGender = $('input[name="gender"]:checked').val();

        let employeeIdCard = $('#txtEmployeeIdCard').val();
        let employeeIdCardDate = $('#txtEmployeeIdCardDate').val();
        let employeeIdCardAddress = $('#txtEmployeeIdCardAddress').val();

        let employeeAddress = $('#txtEmployeeAddress').val();
        let employeePhone = $('#txtEmployeePhone').val();
        let employeeEmail = $('#txtEmployeeEmail').val();
      
        let employeeAccountBank = $('#txtEmployeeAccountBank').val();
        let employeeBank = $('#txtEmployeeBank').val();
        //biến kiểm tra validate
        let isValid = true;
        
        isValid &= validateRequiredField('#txtEmployeeCode', 'Mã nhân viên là bắt buộc.');
        isValid &= validateRequiredField('#txtEmployeeFullName', 'Họ tên nhân viên là bắt buộc.');
        isValid &= validateRequiredField('#txtEmployeeIdCard', 'Số CMTND là bắt buộc.');
        isValid &= validateRequiredField('#txtEmployeePhone', 'Số điện thoại là bắt buộc.');
        isValid &= validateRequiredField('#txtEmployeeEmail', 'Email là bắt buộc.');
        isValid &= validateEmailFormat('#txtEmployeeEmail');
        isValid &= validateDate('#txtEmployeeDOB', 'Ngày sinh không được lớn hơn ngày hiện tại.');
        isValid &= validateDate('#txtEmployeeIdCardDate', 'Ngày cấp không được lớn hơn ngày hiện tại.');

        if(isValid) {
            //tạo object
            let employee = {
                    "employeeCode": employeeCode,
                    "fullName": employeeFullName,
                    "gender": employeeGender,
                    "dateOfBirth": employeeDOB,
                    "phoneNumber": employeePhone,
                    "email": employeeEmail,
                    "address": employeeAddress,
                    "identityNumber": employeeIdCard,
                    "identityDate": employeeIdCardDate,
                    "identityPlace": employeeIdCardAddress,
                    "joinDate": employeeIdCardDate,
                    "martialStatus": 0,
                    "educationalBackground": 0,
                    "qualificationId": "3541ff76-58f0-6d1a-e836-63d5d5eff719",
                    "departmentId": "3f8e6896-4c7d-15f5-a018-75d8bd200d7c",
                    "positionId": "589edf01-198a-4ff5-958e-fb52fd75a1d4",
                    "nationalityId": "b5cf83af-f756-11ec-9b48-00163e06abee",
                    "workStatus": 0,
                    "personalTaxCode": "string",
                    "salary": 0,
                    "positionCode": "string",
                    "positionName": "string",
                    "departmentCode": "string",
                    "departmentName": "string",
                    "qualificationName": "string",
                    "nationalityName": "string"
            }
            //thực hiện thêm hoặc sửa
            if(formMode == 'add') {
                $.ajax({
                    type:'POST',
                    url: 'https://cukcuk.manhnv.net/api/v1/Employees',
                    data: JSON.stringify(employee),
                    dataType: 'json',
                    contentType: 'application/json',
                    success: function(res){
                        $("#overlay").fadeOut(300);
                        $("#m-form")[0].reset();
                        $("#m-table tbody").empty();
                        loading();
                        loadData();
                        notify(resource.VI.success,resource.VI.successAddMsg);

                        $('#notify').fadeIn();
    
                        // Ẩn thông báo sau 5 giây
                        setTimeout(function() {
                            $('#notify').fadeOut();
                        }, 5000);
                    },
                    error: function(res) {
    
                    } 
                })
            }else {
                $('#btn-submit').text("Sửa");
                $.ajax({
                    type:'PUT',
                    url: `https://cukcuk.manhnv.net/api/v1/Employees/${employeeIDForUpdate}`,
                    data: JSON.stringify(employee),
                    dataType: 'json',
                    contentType: 'application/json',
                    success: function(res){
                        $("#overlay").fadeOut(300);
                        $("#m-form")[0].reset();
                        $("#m-table tbody").empty();
                        loading();
                        loadData();
                        notify(resource.VI.success,resource.VI.successEditMsg);
                        $('#notify').fadeIn();
    
                        // Ẩn thông báo sau 5 giây
                        setTimeout(function() {
                            $('#notify').fadeOut();
                        }, 5000);
                    },
                    error: function(res) {
                        notify(resource.VI.error,resource.VI.errorEditMsg);
                        $('#notify').fadeIn();
    
                        // Ẩn thông báo sau 5 giây
                        setTimeout(function() {
                            $('#notify').fadeOut();
                        }, 5000);
                    } 
                })
            }

        }
    })
    //validate dữ liệu (set blur)
    function setupValidation(fieldId, errorMessage) {
        $(fieldId).on('blur', function() {
            validateRequiredField(fieldId, errorMessage);
        });
    }
    setupValidation('#txtEmployeeCode',  'Mã nhân viên là bắt buộc.');
    setupValidation('#txtEmployeeFullName',  'Họ tên nhân viên là bắt buộc.');
    setupValidation('#txtEmployeeIdCard',  'Số CMTND là bắt buộc.');
    setupValidation('#txtEmployeePhone',  'Số điện thoại là bắt buộc.');
    setupValidation('#txtEmployeeEmail',  'Email là bắt buộc.');
    $('#txtEmployeeEmail').on('blur',function(){
        validateEmailFormat('#txtEmployeeEmail')
    })
    $('#txtEmployeeDOB').on('blur',function(){
        validateDate('#txtEmployeeDOB','Ngày sinh không được lớn hơn ngày hiện tại')
    })
    $('#txtEmployeeIdCardDate').on('blur',function(){
        validateDate('#txtEmployeeIdCardDate','Ngày cấp không được lớn hơn ngày hiện tại')
    })

    //các hàm validate 
    function showError(element, message) {
        var text_err = `<div class="error-text">${message}</div>`
        $(element).next(".error-text").remove();

        $(element).parent().append(text_err);
        $(element).addClass("error-input");
    }

    function clearError(element, message) {
        
        $(element).next(".error-text").remove();

        $(element).removeClass("error-input");
    }
    //validate không được bỏ trống
    function validateRequiredField(fieldId, message) {
        const value = $(fieldId).val();
        if (!value) {
            showError(fieldId, message);
            return false;
        }else {
            clearError(fieldId);
            return true;
        }

    }
    //validate email format

    function validateEmailFormat(emailField) {
        const email = $(emailField).val();
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (email && !emailPattern.test(email)) {
            showError(emailField, 'Email không đúng định dạng.');
            return false;
        }
        else {
            clearError(emailField);
            return true;
        }
    }
    //validate định dạng ngày tháng

    function validateDate(fieldId, message) {
        const date = $(fieldId).val();
        const today = new Date().toISOString().split('T')[0];
        if (date && date > today) {
            showError(fieldId, message);
            return false;
        }
        else {
            clearError(fieldId);
            return true;
        }
    }
    //hàm hiện thị thông báo
   function notify(rs,respone) {
        if(rs == "Thành công"){
            $('#notify-icon').removeClass("m-icon-error")
            $('#notify-icon').addClass("m-icon-success")
            $('.notify-title').text(rs).css('color','#50B83C');;
            $('.notify-bodytext').text(respone);
            console.log();
        } else if (rs == "Không thành công") {
                $('#notify-icon').addClass("m-icon-error")
                $('.notify-title').text(rs).css('color','red');
                $('.notify-bodytext').text(respone);
        }
        
   }
   //hàm hiển thị loading skeleton
    function loading() {
        var loading_skeleton = `<tr class="skeleton-row" id="skeleton-row">
                                <td class="m-text-align-center"><div class="skeleton circle"></div></td>
                                <td class="m-text-align-left"><div class="skeleton text" style="width: 20px;"></div></td>
                                <td class="m-text-align-left"><div class="skeleton text" style="width: 100px;"></div></td>
                                <td class="m-text-align-left"><div class="skeleton text"></div></td>
                                <td class="m-text-align-left"><div class="skeleton text" style="width: 80px;"></div></td>
                                <td class="m-text-align-center"><div class="skeleton text"></div></td>
                                <td class="m-text-align-left"><div class="skeleton text"></div></td>
                                <td class="m-text-align-left"><div class="skeleton text"></div></td>
                                <td class="m-text-align-left"><div class="skeleton text"></div></td>
                            </tr>`
    for(let i=1; i<=10; i++) {
        $("#m-table tbody").append(loading_skeleton);
    }
    }
    //hàm load dữ liệu
    function loadData() {
        $.ajax({
            type: "GET",
            url: "https://cukcuk.manhnv.net/api/v1/Employees",
            success: function(res) {
                //Xóa loading
                $("#m-table tbody").empty();
                let numOrder = 1;
                for(const employee of res) {
                    let employeeCode = employee.EmployeeCode;
                    let employeeFullName = employee.FullName;
                    let employeeGender = employee["GenderName"];
                    let employeeDOB = convertDate(employee["DateOfBirth"]);
                    let employeeEmail = employee.Email;
                    let employeeAddress = employee.Address;
                    // Định dạng
                    // Ngày tháng
                   
                    var el = $(`  <tr>
                                    <td class="m-text-align-center">
                                        <input type="checkbox" class="m-checkbox m-sub-checkbox" id="m-sub-checkbox">
                                    </td>
                                    <td class="m-text-align-left">${numOrder}</td>
                                    <td class="m-text-align-left">${employeeCode}</td>
                                    <td class="m-text-align-left">${employeeFullName}</td>
                                    <td class="m-text-align-left">${employeeGender}</td>
                                    <td class="m-text-align-center">${employeeDOB}</td>
                                    <td class="m-text-align-left">${employeeEmail}</td>
                                    <td class="m-text-align-left">${employeeAddress}</td>
                                    <td class="m-text-align-left"><div class="row-btn">
                                        <button class="m-icon-edit m-icon-btn " id="edit-btn-form"></button>
                                        <button class="m-icon-copy  m-icon-btn " ></button>
                                        <button class="m-icon-close-x  m-icon-btn "  id="delete-btn-form"></button>
                                    </div>
                                    </td>
                                </tr>`)
                    el.data("employee",employee)
                    $("#m-table tbody").append(el);
                    numOrder++;
                    $(".m-number").text(numOrder-1);
                }
            }
        })
    }
    //hàm dblClick 1 row
    function rowDbClick(event) {
        formMode = 'edit'
        
        $("#overlay").fadeIn(300);
        $("#txtEmployeeCode").focus();
        let employee = $(this).data("employee")
        employeeIDForUpdate = employee.EmployeeId;
        $('#txtEmployeeCode').val(employee.EmployeeCode);
        $('#txtEmployeeFullName').val(employee.FullName);
        $('#m-job-position').val(employee.PositionName);
        $('#m-job-department').val(employee.DepartmentName);
        $('#txtEmployeeDOB').val(convertDateToInputFormat(employee.DateOfBirth));
        $('input[name="gender"][value="' + employee.Gender + '"]').prop('checked', true);
        $('#txtEmployeeIdCard').val(employee.IdentityNumber);
        $('#txtEmployeeIdCardDate').val(convertDateToInputFormat(employee.IdentityDate));
        $('#txtEmployeeIdCardAddress').val(employee.IdentityPlace);
        $('#txtEmployeeAddress').val(employee.Address);
        $('#txtEmployeePhone').val(employee.PhoneNumber);
        $('#txtEmployeeEmail').val(employee.Email);
        $('#txtEmployeeAccountBank').val(employee.PersonalTaxCode);
        $('#txtEmployeeBank').val(employee.PersonalTaxCode);
    }
    //hàm convert ngày tháng 
    function convertDate(employeeDOB) {
        if(employeeDOB) {
            employeeDOB = new Date(employeeDOB);
            let date = employeeDOB.getDate();
            date = date < 10? `0${date}`:date
            let month = employeeDOB.getMonth() + 1;
            month = month < 10? `0${month}`:month
            let year = employeeDOB.getFullYear();
            return employeeDOB = `${date}/${month}/${year}`
        }
        return null;
    }
    function convertDateToInputFormat(employeeDOB) {
        if (employeeDOB) {
            employeeDOB = new Date(employeeDOB);
            let year = employeeDOB.getFullYear();
            let month = (employeeDOB.getMonth() + 1).toString().padStart(2, '0');
            let date = employeeDOB.getDate().toString().padStart(2, '0'); 
            return `${year}-${month}-${date}`;
        }
        return null;
    }

})