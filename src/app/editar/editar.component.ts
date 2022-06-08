import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Imunobiologico } from '../model/Imunobiologico';
import { ImunobiologicoServiceService } from '../service/imunobiologico-service.service';
import { DialogComponent } from '../shared/dialog/dialog.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  imunobiologico = new Imunobiologico();
  formCadastro!: FormGroup;
  fabricanteSelecionado!: any;
  idIm!: string | null;
  selectValue:number = 47;

  constructor(
    private imunobiologicoService: ImunobiologicoServiceService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute
    ) { }



   ngOnInit(){
     this.validation();
     this.loadImunobiologico();

     console.log(this.imunobiologico)

  }

  loadImunobiologico(){    
    this.idIm = this.route.snapshot.params['id'];
    this.imunobiologico.id = this.idIm!;
    this.imunobiologicoService.getImunobiologicoById(this.imunobiologico.id!)
    .then(data =>{
      this.imunobiologico = data!
      this.validation()
    })
  }

  validation() {
    this.formCadastro = this.fb.group({
      id: new FormControl({value: this.imunobiologico.id, disabled: true}),
      nome: [this.imunobiologico.nome, [Validators.required]],
      anoLote: [this.imunobiologico.anoLote, [Validators.required, Validators.max(2022), Validators.min(1992)]],
      fabricante: [this.imunobiologico.fabricante, [Validators.required]]
    })
  }

  update(): void {
    const { valid, value } = this.formCadastro;
    if (valid) {
      const imunobiologico: Imunobiologico = {
        id: value.id,
        nome: value.nome,
        anoLote: Number.parseInt(value.anoLote),
        fabricante: Number.parseInt(value.fabricante)
      } as Imunobiologico;

      this.imunobiologicoService.createImunobiologico(imunobiologico)
      .then(data => {
        this.dialog.open(DialogComponent, {
          data: 'atualização de dados',
        });
      })
      .catch(err => console.log(err));      
    } 
  }

}
