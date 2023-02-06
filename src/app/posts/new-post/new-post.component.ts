import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  parmaLink: string = '';
  imgSrc: any = './assets/placeHolder.png';
  selectedImage: any = '';
  categoryList: any = [];
  postForm : FormGroup;
  
  constructor(private categoryService : CategoriesService, private fb:FormBuilder) { 
    this.postForm = new FormGroup({
      title: new FormControl(''),
      parmalink :  new FormControl(''),
      excerpt:  new FormControl(''),
      category:  new FormControl(''),
      imgSrc:  new FormControl(''),
      content: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: ['',[Validators.required, Validators.minLength(10)]],
      parmalink : ['',Validators.required,Validators.requiredTrue],
      excerpt: ['',[Validators.required,Validators.minLength(50)]],
      category: ['',Validators.required],
      imgSrc: ['', Validators.required],
      content:['',Validators.required],
    });

    this.categoryService.getCategories().subscribe(data => {
      console.log(data);
      this.categoryList = data;
    });
  }

  get fc(){
    return this.postForm.controls;
  }

  onTitleChange($event: any) {
    const title = $event.target.value;
    this.parmaLink = title.replace(/\s/g, '-').toLowerCase();
  }

  showPreview($event : any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result;
    }
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImage = $event.target.files[0];
  }
}
