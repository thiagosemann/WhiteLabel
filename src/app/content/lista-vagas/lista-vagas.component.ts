import { Component, OnInit } from '@angular/core';
import { VagasDeGaragemService } from 'src/app/shared/service/vagasDeGaragem_service';
import { VagaDeGaragem } from 'src/app/shared/utilitarios/vagaDeGaragem';

@Component({
  selector: 'app-lista-vagas',
  templateUrl: './lista-vagas.component.html',
  styleUrls: ['./lista-vagas.component.css']
})
export class ListaVagasComponent implements OnInit {
  vagas: VagaDeGaragem[] = [];
  filtroDataInicio!: string;
  filtroDataFim!: string;
  filtroPrecoMinimo!: number;
  filtroPrecoMaximo!: number;
  ordenacaoAsc = true;

  constructor(private vagasDeGaragemService: VagasDeGaragemService) {}

  ngOnInit() {
    this.carregarVagas();
  }

  carregarVagas() {
    this.vagasDeGaragemService.getVagasDeGaragem().subscribe(
      (vagas) => {
        this.vagas = vagas;
        console.log(this.vagas)

      },
      (erro) => {
        console.error('Erro ao obter vagas de garagem:', erro);
      }
    );
  }

  filtrarVagas(): VagaDeGaragem[] {
    return this.vagas.filter(vaga => {
      const precoMinimoNaoVazio = this.filtroPrecoMinimo !== undefined && this.filtroPrecoMinimo !== null;
      const precoMaximoNaoVazio = this.filtroPrecoMaximo !== undefined && this.filtroPrecoMaximo !== null;

      if (
        (precoMinimoNaoVazio && vaga.valor_diaria < this.filtroPrecoMinimo) ||
        (precoMaximoNaoVazio && vaga.valor_diaria > this.filtroPrecoMaximo)
      ) {
        return false;
      }

      return true;
    });
  }

  alternarOrdenacao() {
    this.ordenacaoAsc = !this.ordenacaoAsc;
  }
}
