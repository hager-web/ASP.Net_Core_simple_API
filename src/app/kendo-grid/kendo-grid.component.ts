import { Component, OnInit, ViewChild } from '@angular/core';
import { inject } from '@angular/core/testing';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';
import { employees } from '../employees';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-kendo-grid',
  templateUrl: './kendo-grid.component.html',
  styles: [
    `
      .customer-photo {
        display: inline-block;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-size: 32px 35px;
        background-position: center center;
        vertical-align: middle;
        line-height: 32px;
        box-shadow: inset 0 0 1px #999, inset 0 0 10px rgba(0, 0, 0, 0.2);
        margin-left: 5px;
      }

      .customer-name {
        display: inline-block;
        vertical-align: middle;
        line-height: 32px;
        padding-left: 10px;
      }

      .red {
        color: #d9534f;
      }

      .text-bold {
        font-weight: 600;
      }
    `,
  ],
})
export class KendoGridComponent implements OnInit {
  //@ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  gridData!: any[]; //= employees;
  gridView!: any[];

  public mySelection: string[] = [];

  public ser: EmployeeService;

  constructor(private service: EmployeeService) {
    //this.gridData=service.empList;

    //his.gridView = this.gridData;
    this.ser = service;
  }

  public async ngOnInit(): Promise<void> {
    await this.service.refreshList();
    console.log(this.service.empList);
    this.gridData = this.service.empList;
    this.gridView = this.gridData;
    console.log('res  ' + this.gridData);
    console.log('list  ' + this.service.empList);
  }

  public onFilter(event: any): void {
    this.gridView = process(this.gridData, {
      filter: {
        logic: 'or',
        filters: [
          {
            field: 'FullName',
            operator: 'contains',
            value: event.target.value,
          },
          {
            field: 'JobTitle',
            operator: 'contains',
            value: event.target.value,
          },
          {
            field: 'Budget',
            operator: 'contains',
            value: event.target.value,
          },
          {
            field: 'Phone',
            operator: 'contains',
            value: event.target.value,
          },
          {
            field: 'Address',
            operator: 'contains',
            value: event.target.value,
          },
        ],
      },
    }).data;

    //this.dataBinding.skip = 0;
  }

  photoURL(dataItem: any): string {
    const code: string = dataItem.ImgId + dataItem.Gender;
    //const image: any = images;
    console.log('assets/images/' + code + '.jpg');
    return 'assets/images/' + code + '.jpg';
  }

  flagURL(dataItem: any): string {
    const code: string = dataItem.Country;
    //const image: any = images;

    return 'assets/images/' + code + '.png';
  }

  async buttonClick(): Promise<void> {
    await this.service
      .postButton()
      .toPromise()
      .then((res) => {
        console.log(res);
        alert(res);
      });
    alert('button Click');
  }
}
