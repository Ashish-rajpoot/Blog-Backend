import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { Post } from './../../models/post';
import { PostsService } from './../../services/posts.service';
// import { PostsService } from 'src/app/services/posts.service';

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
  postForm: FormGroup;
  post:any;
  formStatus: string = 'Add'
  postId : string = '';

  constructor(private categoryService: CategoriesService,
    private fb: FormBuilder,
    private postsService: PostsService,
    private route: ActivatedRoute
  ) {


    this.route.queryParams.subscribe(params => {
      if(params['id']) {
     this.postsService.loadSingleData(params['id']).subscribe(data => {
      this.post = data;
      this.postId = params['id'];
      
      
      this.postForm = this.fb.group({
        title: [ this.post.title, [Validators.required, Validators.minLength(10)]],
        parmalink: [{ value: this.post.parmalink, disabled: true }, [Validators.required, Validators.requiredTrue]],
        excerpt: [this.post.excerpt, [Validators.required, Validators.minLength(50)]],
        category: [`${this.post.category.categoryId}-${this.post.category.category}`, [Validators.required]],
        imgSrc: ['', [Validators.required]],
        content: [this.post.content, [Validators.required]],
      });
      this.imgSrc = this.post.postImgPath;
      this.formStatus = 'Edit';
     });
    }else{
      this.postForm = this.fb.group({
          title: ['', [Validators.required, Validators.minLength(10)]],
          parmalink: [{ value: '', disabled: true }, [Validators.required, Validators.requiredTrue]],
          excerpt: ['', [Validators.required, Validators.minLength(50)]],
          category: ['', [Validators.required]],
          imgSrc: ['', [Validators.required]],
          content: ['', [Validators.required]],
        });
    }
    });
  

    this.postForm = new FormGroup({
      title: new FormControl(''),
      parmalink: new FormControl(''),
      excerpt: new FormControl(''),
      category: new FormControl(''),
      imgSrc: new FormControl(''),
      content: new FormControl(''),
    });


  }

  ngOnInit(): void {
    // this.postForm = this.fb.group({
    //   title: ['', [Validators.required, Validators.minLength(10)]],
    //   parmalink: [{ value: '', disabled: true }, [Validators.required, Validators.requiredTrue]],
    //   excerpt: ['', [Validators.required, Validators.minLength(50)]],
    //   category: ['', [Validators.required]],
    //   imgSrc: ['', [Validators.required]],
    //   content: ['', [Validators.required]],
    // });

    this.categoryService.getCategories().subscribe(data => {
      // console.log(data);
      this.categoryList = data;
    });


  }

  get fc() {
    return this.postForm.controls;
  }

  async onTitleChange($event: any) {
    const title = $event.target.value;
    this.parmaLink = title.replace(/\s/g, '-').toLowerCase();
  }

  showPreview($event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result;
    }
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImage = $event.target.files[0];
  }

  onSubmit() {

    const splitted = this.postForm.value.category.split('-');

    const postForm: Post = {
      title: this.postForm.value.title,
      // parmalink : this.postForm.value.parmalink,
      parmalink: this.parmaLink,
      category: {
        categoryId: splitted[0],
        category: splitted[1],
      },
      excerpt: this.postForm.value.excerpt,
      postImgPath: '',
      content: this.postForm.value.content,
      isFeatured: false,
      views: 1,
      status: "ok",
      createdAt: new Date(),

    }
    // console.log(postForm);
    this.postsService.uploadPostImaage(this.selectedImage, postForm,this.postId,this.formStatus)
    this.postForm.reset();
    this.imgSrc = './assets/placeHolder.png';

  }



}
