import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ServiceService } from 'src/app/API/service.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DatePipe],
})
export class DashboardComponent implements OnInit {

  rowData: any[] = [];
displayedColumns: string[] = ['Name', 'Age', 'Address', 'Date','Problem','Actions'];

formattedDate = this.datePipe.transform(new Date(), 'dd/MMM/yyyy');
  
 public employeeFormGroup = this.fb.group({
  employee_name: [],
  '_id': [],
  '_rev': [],
  'addressof': [],
  'problem': [],
  'dateof': [],
  'age': [],
  amount: [],
  balance: [],
  profit: [],
  finalamt: [],
  balanceMonth: [],
  amtPerMonth: [],
  'interest': [] 
 });



constructor (private fb: FormBuilder, public service:ServiceService ,private datePipe: DatePipe){}

saveAction() {
  
 if (this.employeeFormGroup.valid) {
 let employeeObject:any = this.employeeFormGroup.value;
 console.log(employeeObject);

 

 employeeObject['object_name'] = 'staff_name'
 
  

 if (employeeObject['_id'] == null) {
 delete employeeObject['_id']
}
 if (employeeObject['_rev'] == null) {
 delete employeeObject['_rev']
 }
  

  let bulkDocsArray = [];
  bulkDocsArray.push(employeeObject);
  this.service.updateDocument(bulkDocsArray);
  }
   
  else {
  alert("Some of fields not valid")
  }
 this.onEdit('item');

}
  fetchAction() {
    this.service.searchDocument('object_name:staff_name')
     }

     editAction(employeeObject: any) {
       this.employeeFormGroup.reset()
      this.employeeFormGroup.patchValue(employeeObject)
   }

    deleteAction(employeeObject: any) {
     this.service.deleteDocument(employeeObject['_id'], employeeObject['_rev'])
     }

     resetAction() {
    this.employeeFormGroup.reset()
       this.employeeFormGroup.markAsUntouched()
      } 
     
      onreset(){
        this.employeeFormGroup.reset();
       }
       
       applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.service.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.service.dataSource.paginator) {
          this.service.dataSource.paginator.firstPage();
        }
      }
      ngOnInit() {

       
      }
  
      onEdit(item :any) {
        this.service.employees.forEach(element => {
          element.isEdit = false;
        });
        item.isEdit = true ; 


      }



     printBill() {
  const name = this.employeeFormGroup.value.employee_name;
    const balinput  = this.employeeFormGroup.value.balance;
    const baldue = this.employeeFormGroup.value.balanceMonth;

  var printWindow :any = window.open('', 'Print', 'height=800,width=800');
printWindow.document.write('<html><head><title>Bill</title>');
printWindow.document.write('<style>@media print{body{font-size:10pt}</style>');
printWindow.document.write('</head><body>');
printWindow.document.write('<img src="../assets/print.png">');
printWindow.document.write('<h1>FISCAL NOTE</h1>');
printWindow.document.write('<p>Date: ' + this.formattedDate  + '</p><br/>');
printWindow.document.write('<tr><td>Name : </td><td>' + name  + '</td></tr><br/>');


printWindow.document.write('<tr><td>Balance : </td><td>' + balinput  + '</td></tr><br/>');
printWindow.document.write('<tr><td>Balance Month : </td><td>' + baldue  + '</td></tr><br/>');

printWindow.document.write('</table>');
printWindow.document.write('</body></html>');
printWindow.print();
printWindow.close();
};


}
