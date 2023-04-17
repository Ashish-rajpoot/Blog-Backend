import { SubscribersService } from './../services/subscribers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {

  title= "subscribers"
  Subscribers: Array<any> = [];

  constructor(private subscribersService: SubscribersService) { }

  ngOnInit(): void {
    this.subscribersService.fetchAllSubscribers().subscribe((data) => {
      this.Subscribers = data;
    });
  }

  deletePost(userId:any){
    this.subscribersService.deleteUser(userId);
  }
}
