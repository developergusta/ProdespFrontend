import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImunobiologicoServiceService } from 'src/app/service/imunobiologico-service.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})
export class DialogDeleteComponent implements OnInit {

  constructor(
    private imunobiologicoService: ImunobiologicoServiceService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: string,
    public dialogRef: MatDialogRef<DialogDeleteComponent>
  ) { }

  id!: string;

  ngOnInit(): void {
    this.id = this.data;
  }

  confirmaExclusao(){
    this.imunobiologicoService.deleteImunobiologico(this.id)
    .then(() => {
      this.dialog.open(DialogComponent, {
        data: 'exclusão'
      });
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
