import { Form, NgForm } from '@angular/forms';
import { Category } from './../models/category';
import { CategoriesService } from './../services/categories.service';

import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  constructor(private cs: CategoriesService, ) {
  }
  
  categoryList : Category[] = [];
  categoryObj : Category= {
    id: '',
    category: ''
  };
  category : string = ""
  id : string = ""
  
  // categoryAdd !: NgForm;
  
editMode : boolean = false;
editStatus : string = "Add"

  ngOnInit(): void {
    this.getData();
    // alert(this.editStatus)
  }
  
  resetUserForm(userForm: NgForm) {
    userForm.resetForm();
    this.editStatus="Add";
    this.editMode= false;
} 
  

  getData(){
    this.cs.getCategories().subscribe((data) => {
      this.categoryList = data;
    })
   
  }
  
  addCategory(formData : any){
    const categoryData : Category = {
      category : formData.value.category,
      id: ''
    }
    if(this.editStatus=="Add"){
      this.cs.addCategory(categoryData)
      this.resetUserForm(formData);    
    }else if(this.editStatus=='Update'){
      // this.categoryAdd;
      if(window.confirm("Are you sure you want to update?")){
          this.categoryObj.category = this.category;
          this.categoryObj.id = this.id;
          this.cs.updateCategory(this.categoryObj,this.categoryObj);
          this.editMode = false;
          this.editStatus = "Add";
          this.resetUserForm(formData);
      }
    }
  }

  editCategory(category : Category){
    this.editStatus = "Update"
    this.category = category.category
    this.id = category.id
    this.editMode = true
    // alert(this.editStatus)
    // return category;
  }
  
  // updateCategory(formData : any){
  //   // this.categoryAdd;
  //   if(window.confirm("Are you sure you want to update?")){
  //     this.categoryObj.category = this.category;
  //     this.categoryObj.id = this.id;
  //     this.cs.updateCategory(this.categoryObj,this.categoryObj);
  //     this.editMode = false;
  //   this.resetUserForm(formData);
  //     this.editStatus = "Update"
  //  }
  // }

  deleteCategory(category : Category){
    if(window.confirm("Are you sure you want to delete this" + category.category +" category?" ))
    this.cs.deleteCategory(category)
  }
  
  deleteCategoryById(id : string){
    alert(id);
    this.cs.deleteCategoryById(id);
  }
}


  // onSubmit(formData: any) {
  //   const categoryData : Category = {
  //       category : formData.value.category,
  //   }
  //   console.log(categoryData);
  //   this.categoriesService.saveData(categoryData);
  // }

 


  // getData() {
  //   const collectionInstance = collection(this.firestore, 'categories');
  //   collectionData(collectionInstance)
  //     .subscribe((val) => {
  //       console.log(val)
  //     })

  //   this.userData = collectionData(collectionInstance, { idField: 'id' });
  // }


  // updateData(id: string) {
  //   const docInstance = doc(this.firestore, 'categories', id);
  //   const newData = {
  //     category: "Upadated Data"
  //   }
  //   updateDoc(docInstance, newData)
  // }
  // deleteData(id: string) {
  //   const docInstance = doc(this.firestore, 'categories', id);
  //   deleteDoc(docInstance)
  // }