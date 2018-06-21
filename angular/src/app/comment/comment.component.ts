import { Component, OnInit } from '@angular/core';
import { Comment } from '../models/Comment.model';
import { Services } from '../models/Services.model';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  services : Services[];
  comment : Comment;
  comments : Comment[];
  optSearch: string = '';
  selectOptionsU: string = '';

  constructor(private commentService: CommentService) { }

  ngOnInit() {
    this.comments = [];
    this.callGetServices();
  }

  selectSearch(event: any) {
    this.optSearch = event.target.value;
  }

  doSomething(event: any) {
    this.selectOptionsU = event;
  }

  callGetServices(){
    this.commentService.getListOfServers()
    .subscribe(
      data => {
        this.services = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  CommentService() {
    debugger
    let commentttt = { Service : this.optSearch, User : localStorage.email, Text : this.selectOptionsU };
    this.comments.push(commentttt);
  }
}
