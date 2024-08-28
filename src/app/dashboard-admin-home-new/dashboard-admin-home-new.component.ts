import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../Services/dashboard.service';
import { ApiCallService } from '../Services/api-call.service';
import { EventService } from '../Services/event.service';

@Component({
  selector: 'app-dashboard-admin-home-new',
  templateUrl: './dashboard-admin-home-new.component.html',
  styleUrl: './dashboard-admin-home-new.component.css'
})
export class DashboardAdminHomeNewComponent implements OnInit {
  publishresult: any;
  unpublishresult: any;
  deleteresult: any;
  flag = false;
  ename: string;
  estartdate: string;
  eenddate: string;
  edescription: string;
  eimage: string;
  activityresult: any;
  close = false;
  constructor(private apicall: ApiCallService, private eventservice : EventService) {}
  result: any;
  show = false;
  startindex = 0;
  pageSize = 5;
  sortBy = '';
  sortdirection = 'Asc';
  searchText = '';
  totalpage = 1;
  pages = [];
  pageNumber = 1;
  ngOnInit(): void {
    this.close = false;
    this.loadevents();
  }
loadevents():void{
  var data = {
    START_INDEX: this.startindex,
    PAGE_SIZE: this.pageSize,
    SORT_COLUMN_NAME: this.sortBy ,
    SORT_COLUMN_DIRECTION: this.sortdirection ,
    SEARCH_TEXT: this.searchText
  };
  //select all events
  this.eventservice.getevents(JSON.stringify(data)).subscribe((res: any) => {
    if (res != null && res != '' && res != undefined) {
    
      this.result = res.ArrayOfResponse;
      
      
        debugger
        if(  Number( res.NoOfPages)/this.pageSize > 0){
          this.totalpage =  Math.ceil( Number(  res.NoOfPages)/this.pageSize)
          this.pages = []
          for (let index = 0; index < this.totalpage; index++) {
            this.pages.push(index + 1);
            
          }
         }
         else{
          this.totalpage = 1
          this.pages = []
          this.pages.push(1)
         }
     
     
      this.show = true;

      this.result.map((e) => {
        e.Event_Start_Date = e.Event_Start_Date.toString().substring(0, 10);
        e.Event_End_Date = e.Event_End_Date.toString().substring(0, 10);
      });
    }
  });
}

onPageChange(page: number): void {
  debugger
  this.pageNumber = page;
  this.startindex = (page - 1) * this.pageSize;
  this.loadevents();
}

onPageSizeChange($event){
  this.pageSize = $event.value;
  this.loadevents();
}

onSortChange($event) {
  this.sortBy = $event.value;
  this.loadevents();
}

onDirectionChange($event) {
  this.sortdirection = $event.value;
  this.loadevents();
}

onSearch($event): void {
  debugger
  this.searchText = $event.value;
  this.loadevents();
}
  publish(eventname: string) {
    var data = {
      flag: 'PUBLISH',
      Event_Name: eventname,
    };
    //update isactive to 1
    this.apicall.eventapiservice(JSON.stringify(data)).subscribe((res: any) => {
      if (res != null && res != '' && res != undefined) {
        if (res['ID'] == '200') {
          this.publishresult = res.ArrayOfResponse;

          this.ngOnInit();
        }
      }
    });
  }

  unpublish(eventname: string) {
    var data = {
      flag: 'UNPUBLISH',
      Event_Name: eventname,
    };
    //update isactive to 0
    this.apicall.eventapiservice(JSON.stringify(data)).subscribe((res: any) => {
      if (res != null && res != '' && res != undefined) {
        if (res['ID'] == '200') {
          this.unpublishresult = res.ArrayOfResponse;
          this.ngOnInit();
        }
      }
    });
  }

  //deleting event
  delete(eventname: string) {
    var del = confirm('Are you sure ?');

    if (del) {
      var data = {
        flag: 'DELETE',
        Event_Name: eventname,
      };

      this.apicall
        .eventapiservice(JSON.stringify(data))
        .subscribe((res: any) => {
          if (res != null && res != '' && res != undefined) {
            if (res['ID'] == '200') {
              this.ngOnInit();
            }
          }
        });
    }
  }

  details(result) {
    this.flag = true;
    this.ename = result.Event_Name;
    this.estartdate = result.Event_Start_Date;
    this.eenddate = result.Event_End_Date;
    this.edescription = result.Event_Description;
    this.eimage = result.Event_Image;

    var data2 = {
      flag: 'SELECT',
      Event_Id: result.Event_Id,
    };
    //retrieving activities based on event name
    this.apicall
      .activityapiservice(JSON.stringify(data2))
      .subscribe((res: any) => {
        if (res != null && res != '' && res != undefined) {
          this.activityresult = res.ArrayOfResponse;
        }
      });
  }
}
