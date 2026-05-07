import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = 'practica-angular';
  protected readonly descripcion = signal('Esta es una practica de Angular');
  protected readonly nombre = signal('Luis Daniel');
}
