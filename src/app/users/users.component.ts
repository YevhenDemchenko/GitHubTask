import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from "../share/services/http.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  constructor(private httpService: HttpService) { }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
