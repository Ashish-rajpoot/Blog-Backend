import { Post } from './../models/post';
import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/compat/Firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { addDoc, collection, collectionData, doc, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
// import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  imagePath: string = '';
  postData!: Observable<any>;
   post: any = Array<any>();
   isFeatured: boolean = false;
  

  constructor(private storage : AngularFireStorage,
              private firestore : Firestore,
              private toster : ToastrService,
              private router : Router,
              private afs : AngularFirestore
              ) { }

              postDoc : AngularFirestoreDocument<any> | any;
  uploadPostImaage(selectedImage: any,postForm:any,postId:any , postStatus:any)    {
    const filePath = `postImg/${Date.now()}`;
    console.log(filePath);

    this.storage.upload(filePath,selectedImage).then(() => {
      this.storage.ref(filePath).getDownloadURL().subscribe((url:any) => {
        if(postStatus ==='Edit'){
          postForm.postImgPath = url;
          this.updateData(postId,postForm);
        }else{
          postForm.postImgPath = url;
          this.savepostData(postForm);
        }
      });
    }, err => {
      console.log(err);
    });

  }

  savepostData(postForm:any) {
    addDoc(collection(this.firestore, 'post'), postForm)
    .then(() => {
      this.toster.success('Post added successfully');
      this.router.navigate(['/posts']);
    })
  }


  loadData(): Observable<any> {
      const postRef = collection(this.firestore, 'post');
      return collectionData(postRef,{idField: 'id'});
    };
  

  loadSingleData(postId:string){
    const data = this.afs.doc(`post/${postId}`).valueChanges();
    return data;
  }

  updateData(postId:string, data:any){
    this.afs.doc(`post/${postId}`).update(data)
    .then(()=>{
      this.toster.success('Post updated successfully');
      this.router.navigate(['/posts']);
    })
    .catch(err => {
      console.log(err);
    });
  }

  deletePost(postId:string){
    this.afs.doc(`post/${postId}`).delete();
    // const data = this.loadSingleData(postId);
  }
  
  deleteImage(postImgPath:string,PostId:string){
    this.storage.storage.refFromURL(postImgPath).delete()
    .then(()=>{
      this.deletePost(PostId);
      this.toster.success('Post deleted successfully');
    })
    .catch(()=>{
      this.toster.success('Error deleting Data');
    });
  };


  markFeatured(postId:string,featuredValue:object,value: boolean){
   const docRef= this.afs.doc(`post/${postId}`).update(featuredValue)
    .then(()=>{
      if(value){
        this.toster.success('Marked Featured successfully');
      }else{
        this.toster.success('Removed Featured successfully');

      }
    })
    .catch(()=>{
      this.toster.success('Error updating');
    });
  };
}
