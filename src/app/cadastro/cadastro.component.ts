import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Imunobiologico } from '../model/Imunobiologico';
import { ImunobiologicoServiceService } from '../service/imunobiologico-service.service';
import { DialogComponent } from '../shared/dialog/dialog.component';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  imunobiologico! : Imunobiologico;
  formCadastro!: FormGroup;
  fabricanteSelecionado!: any;

  constructor(
    private imunobiologicoService: ImunobiologicoServiceService,
    private fb: FormBuilder,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.validation();
  }

  public validation(): any {
    this.formCadastro = this.fb.group({
      nome: ['', [Validators.required]],
      anoLote: ['', [Validators.required, Validators.max(2022), Validators.min(1992)]],
      fabricante: [1, [Validators.required]]
    })
  }

  create(): void {
    const { valid, value } = this.formCadastro;
    if (valid) {
      const imunobiologico: Imunobiologico = {
        nome: value.nome,
        anoLote: Number.parseInt(value.anoLote),
        fabricante: Number.parseInt(value.fabricante)
      } as Imunobiologico;

      console.log(imunobiologico)

      this.imunobiologicoService.createImunobiologico(imunobiologico)
      .then(data => {
        this.dialog.open(DialogComponent, {
          data: 'cadastro',
        });
      })
      .catch(err => console.log(err));


      
    } 
  }

}
