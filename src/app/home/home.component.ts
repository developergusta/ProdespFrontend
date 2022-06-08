import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Fabricante } from '../model/Fabricante';
import { Imunobiologico } from '../model/Imunobiologico';
import { ImunobiologicoServiceService } from '../service/imunobiologico-service.service';
import { DialogDeleteComponent } from '../shared/dialog-delete/dialog-delete.component';
import { DialogComponent } from '../shared/dialog/dialog.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imunobiologicos?: Imunobiologico[];
  displayedColumns: string[] = ['id', 'nome', 'datacadastro', 'anolote', 'fabricante', 'opcao'];
  dataSource = new MatTableDataSource(this.imunobiologicos);



  constructor(
    private imunobiologicoService: ImunobiologicoServiceService,
    public dialog: MatDialog
  ) { }

  async ngOnInit() {
    try {
      await this.getImunobiologicos();
      this.dataSource = new MatTableDataSource(this.imunobiologicos);
    } catch (error) {
      console.log(error);
    }
  }

  async getImunobiologicos() {
    this.imunobiologicos = await this.imunobiologicoService.getImunobiologicoList();
  }

  getEnumValue(fabricanteId: number) {
    return Fabricante[fabricanteId];
  }

  excluir(id: string) {
    this.imunobiologicoService.getImunobiologicoById(id)
      .then(() => {
        this.dialog.open(DialogDeleteComponent, {
          data: id
        });
      })
      .catch(err => console.log(err))
  }
}
