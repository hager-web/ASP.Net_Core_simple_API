import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  empList!: any[];
  empData: any;

  readonly rootURL: string = 'https://localhost:44340/api';

  constructor(private http: HttpClient) {}

  postEmployee() {
    return this.http.post(this.rootURL + '/Employees', this.empData);
  }
  async refreshList() {
    await this.http
      .get<any[]>(this.rootURL + '/Employees')
      .toPromise()
      .then(
        (res) => {
          this.empList = res as any[];
          console.log(this.empList);
        },
        (err) => {
          console.log(err);
        }
      );

    console.log('list  ' + this.empList);
  }
  putEmployee() {
    return this.http.put(
      this.rootURL + '/Employees/' + this.empData.Id,
      this.empData
    );
  }
  deleteEmployee(id: any) {
    return this.http.delete(this.rootURL + '/Employees/' + id);
  }

  postButton() {
    const data = new FormData();
    data.append('val', 'test');
    console.log(data);
    return this.http.post<any>('https://localhost:44340/api/PDNew/Get', data);
  }
}
