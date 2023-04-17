import { Observable } from 'rxjs';
import { Category } from './../models/category';
import { Injectable } from '@angular/core';
import { addDoc, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { collection } from '@firebase/firestore'

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  userData!: Observable<any>;
  constructor(private firestore: Firestore, private toaster: ToastrService) { }




  addCategory(category: Category) {
    category.categoryId = doc(collection(this.firestore, 'categories')).id;
    const ok = addDoc(collection(this.firestore, 'categories'), category);
    ok.then(() => {
      this.toaster.success('Category added successfully')
    }).catch(err => {
      console.error(err);
    });
    return ok;
  }

  getCategories(): Observable<any> {
    const categoryRef = collection(this.firestore, 'categories');
    // console.log(categoryRef);
    return collectionData(categoryRef, { idField: 'categoryId' });
  };
  getCategoriesWithId(): Observable<any> {
    const categoryRef = collection(this.firestore, 'categories');
    // console.log(categoryRef);
    return collectionData(categoryRef, { idField: 'category.categoryId' });
  };

  deleteCategory(category: Category) {
    const categoryRef = doc(this.firestore, `categories/${category.categoryId}`);
    const postRef = doc(this.firestore, `post/${category.categoryId}`);
    // deleteDoc(categoryRef);
    // console.log(postRef);
    deleteDoc(categoryRef);
    return this.toaster.success('Category deleted successfully');
  }

  updateCategory(category: Category, data: any) {
    // console.log(category)
    const categoryRef = doc(this.firestore, `categories/${category.categoryId}`);
    console.log(categoryRef);
    this.toaster.success('Category Updated successfully');
    return updateDoc(categoryRef, data);
  };


  deleteCategoryById(categoryId: string) {
    const categoryRef = doc(this.firestore, `categories/${categoryId}`);
    deleteDoc(categoryRef);
    return this.toaster.success('Category deleted successfully');

  }
}
