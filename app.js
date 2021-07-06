import { BrainHttp } from "./api/BrainHttp.js";
const serverURL  = 'http://127.0.0.1:3000/api';


window.addEventListener('DOMContentLoaded', function(){
  fetchAllEmployees();
});

let fetchAllEmployees = () => {
    let http = new BrainHttp();
    let url = `${serverURL}/employees`;
    http.get(url, (err, employees) =>{
        if(err) throw err; 
        let employeeRows = '';
        for(let employee of employees){
            employeeRows += `
            <tr>
            <td>${employee.id}</td>
            <td>${employee.first_name}</td>
            <td>${employee.last_name}</td>
            <td>${employee.email}</td>
            <td>${employee.gender}</td>
            <td>${employee.ip_address}</td>
            <td> 
            <button class="btn btn-secondary  mt-0 btn-sm update">update</button>
            <button class="btn btn-danger  mt-0  btn-sm delete">delete</button>
            </td>
            </tr>
            `;
        }
     document.querySelector('#table-body').innerHTML = employeeRows;
    });
}


let addEmployeeForm = document.querySelector('#add-employee-form');
addEmployeeForm.addEventListener('submit', function(e){
    e.preventDefault();
    $('#add-employee-form').modal('hide');
    let employee = {
        first_name: document.querySelector('#add-first-name').value,
        last_name: document.querySelector('#add-last-name').value,
        email: document.querySelector('#add-email').value,
        gender: document.querySelector('#add-gender').value,
        ip_address: document.querySelector('#add-ip-address').value,
    };
    let url = `${serverURL}/employees`;
    let http = new BrainHttp();
    http.post(url, employee, (data) => {
        console.log(data);
        fetchAllEmployees();
        clearFormFields();
    });

})


let clearFormFields = () =>{
        document.querySelector('#add-first-name').value = '';
        document.querySelector('#add-last-name').value = '';
        document.querySelector('#add-email').value = '';
        document.querySelector('#add-gender').value = '';
        document.querySelector('#add-ip-address').value = '';
}

let tableBody = document.querySelector('#table-body');
tableBody.addEventListener('click', function(e){
    let targetElement = e.target;
    if(targetElement.classList.contains('delete')){
        let selectedId = targetElement.parentElement.parentElement.firstElementChild.innerHTML;
        let url = `${serverURL}/employees/${selectedId}`;
        let http = new BrainHttp();
        http.delete(url, (data) =>{
            console.log(data);
            fetchAllEmployees();
        })
      
    }
    if(targetElement.classList.contains('update')){
        console.log('You clicked update');
    }

})