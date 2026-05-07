import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users.html'
})



export class UsersComponent implements OnInit {

  role: string = '';
  users: any[] = [];
  form: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: [''],
      email: [''],
      contrasenia: ['']
    });

    // ESCUCHA CAMBIOS DE RUTA
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.role = localStorage.getItem('role') || '';
        this.loadUsers();
      });
  }

  ngOnInit() {
    this.role = localStorage.getItem('role') || '';
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(res => {
      this.users = res;
    });
  }

  createUser() {
    console.log('FORM:', this.form.value);

    this.userService.createUser(this.form.value).subscribe({
      next: (res) => {
        console.log('RESPUESTA:', res);
        alert('Usuario creado');
        this.loadUsers();
        this.form.reset();
      },
      error: (err) => {
        console.error('ERROR COMPLETO:', err);
        alert('Error al crear usuario');
      }
    });
    console.log('CLICK CREAR', this.form.value);

    this.userService.createUser(this.form.value).subscribe({
      next: (res) => {
        console.log('USUARIO CREADO', res);
        this.form.reset();
      },
      error: (err) => {
        console.error('ERROR AL CREAR', err);
      }
    });
  }

  deleteUser(id: number) {
    console.log('CLICK ELIMINAR', id);

    this.userService.deleteUser(id).subscribe({
      next: () => {
        console.log('USUARIO ELIMINADO', id);
        this.loadUsers();
      },
      error: (err) => {
        console.error('ERROR AL ELIMINAR', err);
      }
    });
  }

  logout() {
    localStorage.removeItem('auth');
    location.href = '/login';
  }
}
