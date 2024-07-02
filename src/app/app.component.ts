import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
interface Item {
  id: number;
  name: string;
  email:string;
  password:string;
  address: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angularLocal';
  localStorageForm!:FormGroup;
  items: Item[] = [];
  constructor(private formBuilder:FormBuilder){}
  ngOnInit(): void {
    this.formDetail();
    this.getAllData();
  }
  formDetail(){
    this.localStorageForm = this.formBuilder.group({
      name: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      address: new FormControl('',[Validators.required])
    })
  }
  onSubmit(){
    console.log(this.localStorageForm.value)
    if (this.localStorageForm.valid) {
      const newItem: Item = {
        id: this.items.length + 1, // Example: Generate ID based on current length
        name: this.localStorageForm.value.name,
        email: this.localStorageForm.value.email,
        password: this.localStorageForm.value.password,
        address: this.localStorageForm.value.address,
      };

      this.items.push(newItem);
      localStorage.setItem('items', JSON.stringify(this.items));
      this.localStorageForm.reset();
    }
  }
  getAllData(){
    const getDatas = localStorage.getItem('items');
    this.items = getDatas ? JSON.parse(getDatas) : [];
  }
}
