import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from './employee-dashboard-model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelOBJ: EmployeeModel = new EmployeeModel()
  employeeData !: any
  showUpdate! : boolean
  showAdd! : boolean

  constructor(private formbuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName: [''],
      lastName: [''],
      email:[''],
      mobileNumber:[''],
      salary:['']
    })
    this.getAllEmployee()
  }

  clickAddEmployee(){
    this.formValue.reset()
    this.showAdd=  true;
    this.showUpdate =false
  }

  postEmployeeDetails(){
    this.employeeModelOBJ.firstName = this.formValue.value.firstName;
    this.employeeModelOBJ.lastName = this.formValue.value.lastName;
    this.employeeModelOBJ.email = this.formValue.value.email;
    this.employeeModelOBJ.mobileNumber = this.formValue.value.mobileNUmber;
    this.employeeModelOBJ.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeModelOBJ).subscribe(res => {
      console.log(res);
      alert('success')
      let ref = document.getElementById('cancel')
      ref?.click()
      this.formValue.reset()
    }, err=>{
      console.log(err);

    })
  }

  getAllEmployee(){
    this.api.getEmployee().subscribe(res =>{
        this.employeeData =res
    })
  }

  deleteEmployee(row: any){
    this.api.deleteEmployee(row.id).subscribe(res =>{
      alert('Employee deleted')
      this.getAllEmployee()
    })
  }
  onEdit(row: any){
    this.showAdd=  false;
    this.showUpdate =true
    this.employeeModelOBJ.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobileNumber'].setValue(row.mobileNumber);
    this.formValue.controls['salary'].setValue(row.salary);

     }

     updateEmployeeDetails(){
      this.employeeModelOBJ.firstName = this.formValue.value.firstName;
      this.employeeModelOBJ.lastName = this.formValue.value.lastName;
      this.employeeModelOBJ.email = this.formValue.value.email;
      this.employeeModelOBJ.mobileNumber = this.formValue.value.mobileNUmber;
      this.employeeModelOBJ.salary = this.formValue.value.salary;

      this.api.updateEmployee(this.employeeModelOBJ, this.employeeModelOBJ.id).subscribe(res => {
        alert('updated successfully')
        let ref = document.getElementById('cancel')
        ref?.click()
        this.formValue.reset()
        this.getAllEmployee()

      })
     }
}
