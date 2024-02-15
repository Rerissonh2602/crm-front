import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';

import { plenaryAnimations } from '@plenary/animations';
import { PlenaryToastService } from '@plenary/services/toast';

import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'auth-forgot-password',
  templateUrl: './forgot-password.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: plenaryAnimations,
})
export class AuthForgotPasswordComponent implements OnInit {
  @ViewChild('forgotPasswordNgForm') forgotPasswordNgForm: NgForm;

  public forgotPasswordForm: UntypedFormGroup;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly router: Router,
    private readonly toastService: PlenaryToastService
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  sendResetLink(): void {
    this.forgotPasswordForm.disable();

    this.authService
      .forgotPassword(this.forgotPasswordForm.get('email').value)
      .pipe(
        finalize(() => {
          this.forgotPasswordForm.enable();
        })
      )
      .subscribe({
        next: (response) => {
          this.toastService.handleMessage(response, null, {
            handleRequest: true,
          });
          const redirectURL =
            this.activatedRoute.snapshot.queryParamMap.get('redirectURL') ||
            '/login';
          this.router.navigateByUrl(redirectURL);
        },
        error: (error) => {
          this.toastService.handleMessage(
            error,
            'Não foi possível redefinir a senha.',
            { handleRequest: true }
          );
        },
      });
  }
}
