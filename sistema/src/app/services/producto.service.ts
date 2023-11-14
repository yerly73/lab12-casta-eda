import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { Producto } from '../models/producto';




@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url = 'http://localhost:4000/api/productos/';
  pdf = 'http://localhost:4000/api/generate-pdf/';

  constructor(private http: HttpClient) { 

  }
  
  getPDF(): Observable<any> {
    return this.http.get(this.pdf, { responseType: 'blob' })
  }

  getProductos(): Observable<any> {
    return this.http.get(this.url);
  }

  deleteProducto(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  guardarProducto(producto: Producto): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('producto', producto.producto);
    formData.append('categoria', producto.categoria);
    formData.append('ubicacion', producto.ubicacion);
    formData.append('precio', producto.precio.toString());
    formData.append('imagen', producto.imagen, producto.imagen.name);
    
    return this.http.post(this.url, producto);
  }

  viewProducto(id?: string): Observable<any> {
    return this.http.get(this.url + id)
  }

  actualizarProducto(id: string, producto: Producto): Observable<any> {
    return this.http.put(this.url + id, producto);
  }

}
