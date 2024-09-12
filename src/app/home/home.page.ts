import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';


interface Evento {
  nombre: string;
  precio: number;
}

interface ItemRecibo {
  label: string;
  value: string | number;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  nombre: string = '';
  apellido: string = '';
  edad: number | null = null;
  eventoSeleccionado: string = '';
  cantidadEntradas: number = 1;
  total: number = 0;
  descuento: number = 0;
  mostrarRecibo: boolean = false;
  itemsRecibo: ItemRecibo[] = [];
  alertButtons = ['Action'];

  eventos: Evento[] = [
    { nombre: 'Cine', precio: 5000 },
    { nombre: 'Eventos', precio: 12000 },
    { nombre: 'Deportes', precio: 18000 },
    { nombre: 'Concierto', precio: 45000 },
  ];

  calcularDescuento(): number {
    if (this.edad === null) return 0;
    if (this.edad < 18) return 0.1;
    if (this.edad >= 60) return 0.2; 
    return 0;
  }

  constructor(private alertController: AlertController) {}


  actualizarPrecio() {
    this.calcularTotal();
  }

  calcularTotal() {
    const eventoElegido = this.eventos.find(e => e.nombre === this.eventoSeleccionado);
    if (eventoElegido) {
      const subtotal = eventoElegido.precio * this.cantidadEntradas;
      const porcentajeDescuento = this.calcularDescuento();
      this.descuento = subtotal * porcentajeDescuento;
      this.total = subtotal - this.descuento;
    } else {
      this.total = 0;
      this.descuento = 0;
    }
  }

  formularioValido(): boolean {
    return this.nombre !== '' && 
           this.apellido !== '' && 
           this.edad !== null && 
           this.eventoSeleccionado !== '' && 
           this.cantidadEntradas > 0;
  }

  async onSubmit() {
    if (this.formularioValido()) {
      this.itemsRecibo = [
        { label: 'Nombre', value: `${this.nombre} ${this.apellido}` },
        { label: 'Edad', value: this.edad || 0 },
        { label: 'Evento', value: this.eventoSeleccionado },
        { label: 'Cantidad de entradas', value: this.cantidadEntradas },
        { label: 'Descuento aplicado', value: `$${this.descuento}` },
        { label: 'Total a pagar', value: `$${this.total}` }
      ];

      const alert = await this.alertController.create({
        header: 'Compra Exitosa',
        message: 'Tu compra se ha realizado con éxito.',
        buttons: ['OK']
      });

      await alert.present();
      this.mostrarRecibo = true;
    }
  }
}