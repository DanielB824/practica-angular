import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css'
})



export class UsersComponent implements OnInit {

  role: string = '';
  users: any[] = [];
  form: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {

    this.form = this.fb.group({
      nombre: [''],
      email: [''],
      contrasenia: ['']
    });

  }

  ngOnInit() {
    this.role = localStorage.getItem('role') || '';
    this.loadUsers();
  }

  loadUsers() {

    this.userService.getUsers().subscribe({

      next: (res) => {

        console.log('USUARIOS:', res);

        this.users = [...res];

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.error('ERROR CARGANDO USUARIOS', err);

      }

    });

  }

  createUser() {

    console.log('FORM:', this.form.value);

    this.userService.createUser(this.form.value).subscribe({

      next: (res) => {

        console.log('USUARIO CREADO', res);

        alert('Usuario creado correctamente');

        this.loadUsers();

        this.form.reset();

      },

      error: (err) => {

        console.error('ERROR COMPLETO:', err);

        alert('Error al crear usuario');

      }

    });

  }

  deleteUser(id: number) {

    this.userService.deleteUser(id).subscribe({

      next: () => {

        console.log('Usuario eliminado');

        // RECARGA LOS DATOS DESDE LA API
        this.loadUsers();

      },

      error: (err) => {

        console.error('ERROR AL ELIMINAR', err);

        alert('No se pudo eliminar el usuario');

      }

    });

  }

  trackByUser(index: number, user: any): number {
    return user.id_usuario;
  }

  logout() {
    localStorage.removeItem('auth');
    location.href = '/login';
  }
}
