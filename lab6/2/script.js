$(document).ready(function () {});

$.get("http://dummy.restapiexample.com/api/v1/employees", function (data, status) {
    data = JSON.stringify(data); 
    JSON.parse(data).data.forEach(element => {
        $('.employee').append('<div>Name: ' + element.employee_name + '; Salary: ' +
        element.employee_salary + '; Age: ' + element.employee_age + '</div>');
    });
});