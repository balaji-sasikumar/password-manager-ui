import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordService } from 'src/app/services/password.service';

@Component({
  selector: 'app-password-add',
  templateUrl: './password-add.component.html',
  styleUrls: ['./password-add.component.scss'],
})
export class PasswordAddComponent implements OnInit {
  passwordForm: FormGroup;
  isUpdate = false;
  id = 0;

  constructor(
    private fb: FormBuilder,
    private passwordService: PasswordService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.passwordForm = this.fb.group({
      category: ['', Validators.required],
      app: ['', Validators.required],
      userName: ['', Validators.required],
      decryptedPassword: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isUpdate = true;
      this.id = +id;
      this.passwordService.getDecryptedPassword(+id).subscribe((password) => {
        this.passwordForm.patchValue(password);
      });
    }
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      console.log(this.passwordForm.value);
      if (this.isUpdate) {
        this.passwordService
          .updatePassword(this.id, this.passwordForm.value)
          .subscribe(() => {
            this.snackBar.open('Credentials Updated Successfully! ', 'Close', {
              duration: 3000,
            });
            this.router.navigate(['/']);
          });
        return;
      }
      this.passwordService
        .addPassword(this.passwordForm.value)
        .subscribe(() => {
          this.snackBar.open('Credentials Added Successfully! ', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/']);
        });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
