import { Router } from '@angular/router';
import { AccesoService } from './../../services/acceso.service';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Login } from '../../interfaces/Login';
import { ResponseAcceso } from '../../interfaces/ResponseAcceso';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private accesoService = inject(AccesoService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);

  public formLogin: FormGroup = this.formBuild.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  // Función para iniciar sesión
  iniciarSesion() {
    if (this.formLogin.invalid) return;

    const objeto: Login = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password,
    };

    this.accesoService.login(objeto).subscribe({
      next: (data: ResponseAcceso) => {
        // Verificar que la respuesta sea exitosa
        if (data.status === 'success') {
          // Guardar el token en localStorage
          localStorage.setItem('token', data.data.token);
          // Redirigir al inicio
          this.router.navigate(['inicio']);
        } else {
          // Mostrar mensaje de error
          alert('Credenciales incorrectas');
        }
      },
      error: (error) => {
        // Manejo de error en la solicitud
        console.error('Error en el login:', error);
        alert(
          'Error al intentar iniciar sesión. Intente nuevamente más tarde.'
        );
      },
    });
  }

  // Función para navegar a la página de registro
  registrarse() {
    this.router.navigate(['register']);
  }
}
