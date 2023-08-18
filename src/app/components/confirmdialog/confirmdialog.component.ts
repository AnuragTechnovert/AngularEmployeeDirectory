import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmdialog',
  templateUrl: './confirmdialog.component.html',
  styleUrls: ['./confirmdialog.component.css']
})
export class ConfirmdialogComponent {
  constructor(public dialog: MatDialogRef<ConfirmdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string }) { }
}