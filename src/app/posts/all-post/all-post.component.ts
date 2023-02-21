import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit {

  postData: Array<any> = [];
  postId: string = '';

  constructor(private postservice : PostsService,
              private route: ActivatedRoute,
              ) { }

  ngOnInit(): void {
    this.postservice.loadData().subscribe(data => {
      console.log(data);
      this.postData = data;
    }, (err:any) => {
      console.log(err);
    });
  }

  deletePost(postImgPath:string,id: string) {
      this.postservice.deleteImage(postImgPath,id);
  }

  markFeatured(id:string,featuredValue: boolean) {
    const value ={
      isFeatured: featuredValue,
    }
    this.postservice.markFeatured(id,value,featuredValue);
  }
}
