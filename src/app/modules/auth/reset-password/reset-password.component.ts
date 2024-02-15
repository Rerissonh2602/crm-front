import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../../core/auth/auth.service';

import { plenaryAnimations } from '@plenary/animations';
import { PlenaryValidators } from '@plenary/validators';
import { PlenaryToastService } from '@plenary/services/toast';

@Component({
  selector: 'auth-reset-password',
  templateUrl: './reset-password.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: plenaryAnimations,
})
export class AuthResetPasswordComponent implements OnInit {
  @ViewChild('resetPasswordNgForm') resetPasswordNgForm: NgForm;

  public resetPasswordForm: UntypedFormGroup;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly router: Router,
    private readonly toastService: PlenaryToastService
  ) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group(
      {
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: PlenaryValidators.mustMatch('password', 'confirmPassword'),
      }
    );
  }

  resetPassword(): void {
    const token = this.activatedRoute.snapshot.paramMap.get('token');
    this.resetPasswordForm.disable();

    this.authService
      .resetPassword(token, this.resetPasswordForm.value)
      .pipe(
        finalize(() => {
          this.resetPasswordForm.enable();
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
            'Não foi possível recuperar a senha.',
            { handleRequest: true }
          );
        },
      });
  }
}
