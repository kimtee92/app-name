import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { first } from 'rxjs/operators';
import { Data } from '../data';
import { DataService } from '../data-service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})

export class DataFormComponent implements OnInit {
  dataForm: FormGroup;
  data: Data[];

  constructor(private formBuilder: FormBuilder,
    private dataService: DataService, ) { }

  ngOnInit() {
    this.loadAllData();
    this.dataForm = this.formBuilder.group({
      text: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.dataForm.controls; }

  onSubmit() {
    // stop here if form is invalid
    if (this.dataForm.invalid) {
      return;
    }

    this.dataService.create(this.dataForm.value)
      .pipe(first())
      .subscribe(
        data => {
          swal({
            type: 'success',
            title: 'Input Success!',
            text: '',
          });
          this.loadAllData();
        },
        error => {
          swal({
            type: 'error',
            title: 'Registration Error',
            text: error,
          });
        });
  }

  private loadAllData() {
    this.dataService.all().pipe(first()).subscribe((data: Data[]) => {
      this.data = data;
  });
  }

}
