import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
interface Item {
  id: number;
  name: string;
  email: string;
  password: string;
  address: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('closebutton') closebutton:any;

  title = 'angularLocal';
  localStorageForm!: FormGroup;
  items: Item[] = [];
  showAdd!: boolean;
  showUpdate!: boolean;
  selectedUser: any;
  constructor(private formBuilder: FormBuilder ,) {}
  ngOnInit(): void {
    this.formDetail();
    this.getAllData();
  }
  formDetail() {
    this.localStorageForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
    });
  }
  onSubmit() {
    // console.log(this.localStorageForm.value)
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
  getAllData() {
    let getDatas = localStorage.getItem('items');
    this.items = getDatas ? JSON.parse(getDatas) : [];
  }
  clickAddForm() {
    this.localStorageForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  editForm(row: any) {
    this.selectedUser = row;

    this.showAdd = false;
    this.showUpdate = true;
    if (this.selectedUser) {
      this.localStorageForm.patchValue({
        name: this.selectedUser.name,
        email: this.selectedUser.email,
        password: this.selectedUser.password,
        address: this.selectedUser.address,
      });
    }
  }
  updateData() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id == this.selectedUser.id) {
        (this.items[i].name = this.localStorageForm.value.name),
          (this.items[i].email = this.localStorageForm.value.email),
          (this.items[i].password = this.localStorageForm.value.password),
          (this.items[i].address = this.localStorageForm.value.address);
      }
    }
    this.closebutton.nativeElement.click();
    localStorage.setItem('items', JSON.stringify(this.items));
    this.getAllData();
    this.localStorageForm.reset();
  }
  deleteData(id: number) {
    this.items = this.items.filter((item) => item.id !== id);
    localStorage.setItem('items', JSON.stringify(this.items));
  }
}
