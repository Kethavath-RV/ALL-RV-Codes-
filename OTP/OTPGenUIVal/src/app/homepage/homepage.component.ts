import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  user:any
  constructor(public route:ActivatedRoute) { }

  ngOnInit(): void {
    this.user = this.route.snapshot.queryParams.emailId
  }


}
