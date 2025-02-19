import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PasswordService } from '../../services/password.service';
import { Router } from '@angular/router';
import { Password } from 'src/interface/password.interface';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.scss'],
})
export class PasswordListComponent implements OnInit {
  passwords: Password[] = [];
  displayedColumns: string[] = [
    'id',
    'category',
    'app',
    'userName',
    'password',
    'actions',
  ];
  dialogRef!: MatDialogRef<any>;
  @ViewChild('deleteConfirmationDialog')
  deleteConfirmationDialog!: TemplateRef<any>;

  constructor(
    private passwordService: PasswordService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.passwordService.getPasswords().subscribe((data) => {
      this.passwords = data;
    });
  }

  decryptPassword(password: Password) {
    if (password.decryptedPassword) {
      password.decryptedPassword = undefined; // Hide the password if already decrypted
      return;
    }

    this.passwordService.getDecryptedPassword(password.id).subscribe((res) => {
      password.decryptedPassword = res.decryptedPassword;
    });
  }
  addNewCredential() {
    this.router.navigate(['/add']);
  }
  editCredential(id: number) {
    console.log(id);
    this.router.navigate(['/update', id]);
  }
  deleteCredential(id: number) {
    this.dialogRef = this.dialog.open(this.deleteConfirmationDialog);

    this.dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User confirmed deletion
        this.passwordService.deletePassword(id).subscribe(() => {
          this.passwordService.getPasswords().subscribe((data) => {
            this.passwords = data;
          });
        });
      }
    });
  }
}
