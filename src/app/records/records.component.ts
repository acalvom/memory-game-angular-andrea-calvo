import { Component, OnInit } from '@angular/core';
import { records } from '../shared/models/records.model';
import { RecordrestService } from '../shared/services/recordrest.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  topRecords: records[] =[];

  constructor(private connection: RecordrestService) { }

  showTopRecords(){
    this.connection.getTopRecords().subscribe(
    (value: records[]) => {
      this.topRecords = value;
      console.log(value);
      }

    );
  }
  ngOnInit(): void {
    this.showTopRecords();
  }

}
