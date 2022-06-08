import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, lastValueFrom, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Imunobiologico } from '../model/Imunobiologico';

@Injectable({
  providedIn: 'root'
})
export class ImunobiologicoServiceService {
  
  baseURL = environment.baseURL + '/api/Imunobiologico';

  constructor(private http: HttpClient) { }

  async getImunobiologicoList() {
    var imunobiologicos = lastValueFrom(this.http.get<Imunobiologico[]>(this.baseURL))
    return imunobiologicos
  }

  async getImunobiologicoById(id: string) {
    var imunobiologico = await this.http.get<Imunobiologico>(this.baseURL + '/' + id).toPromise()
    return imunobiologico
  }

  async createImunobiologico(imunobiologico: any) {
    var result = lastValueFrom(this.http.post(this.baseURL,imunobiologico));
    return result
  }

  async updateImunobiologico(imunobiologico: Imunobiologico) {
    var result = lastValueFrom(this.http.put(this.baseURL, imunobiologico));
    return result
  }

  async deleteImunobiologico(id: string) {
    var result = this.http.delete(this.baseURL + '/' + id, {responseType: 'text'}).subscribe()
    return result
  }
}
