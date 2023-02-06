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
  constructor(private firestore : Firestore, private toaster : ToastrService ) { }




    addCategory(category: Category) {
     category.id = doc(collection(this.firestore, 'categories')).id;
    const ok = addDoc(collection(this.firestore, 'categories'), category);
    ok.then(() => {
      this.toaster.success('Category added successfully')
    }).catch(err => {
      console.error(err);
    });
      return ok ;
    }

  getCategories(): Observable<any> {
    const categoryRef = collection(this.firestore, 'categories');
    return collectionData(categoryRef,{idField: 'id'});
  };
  
  deleteCategory(category : Category) {
    const categoryRef = doc(this.firestore, `categories/${category.id}`);
    deleteDoc(categoryRef);
    return this.toaster.success('Category deleted successfully');
  }
  
  updateCategory(category : Category, data : any)  {
    // alert(category.id)
    const categoryRef = doc(this.firestore, `categories/${category.id}`);
    this.toaster.success('Category Updated successfully');
    return updateDoc(categoryRef,data);
  };
  
  
  deleteCategoryById(id : string) {
    const categoryRef = doc(this.firestore, `categories/${id}`);
    deleteDoc(categoryRef);
    return this.toaster.success('Category deleted successfully');
    
  }
}
