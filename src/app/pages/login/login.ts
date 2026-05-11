import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  email = '';
  password = '';
  errorMsg = '';

  constructor(private router: Router, private userService: UserService) {}

  login() {
    this.userService.getUserByEmail(this.email).subscribe({

      
      next: (res: any) => {

        const user = Array.isArray(res) ? res[0] : res;

        // Usuario no existe
        if (!user) {
          // alert('Correo o contraseña no válidos');
          this.errorMsg = 'Correo o contraseña no válidos';
          return;
        }

        // ontraseña incorrecta
        if (user.contrasenia !== this.password) {
          // alert('Correo o contraseña no válidos');
          this.errorMsg = 'Correo o contraseña no válidos';
          return;
        }

        // ✅ Login correcto
        localStorage.setItem('auth', 'true');
        localStorage.setItem('role', user.rol.toLowerCase());
        localStorage.setItem('user', JSON.stringify(user));

        this.router.navigate(['/users']);
      },

      error: (err) => {
        console.error(err);

        // alert('Correo o contraseña no válidos');
        this.errorMsg = 'Correo o contraseña no válidos';
      }
    });
  }
}
