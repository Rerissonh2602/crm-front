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

import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'auth-sign-in',
  templateUrl: './sign-in.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: plenaryAnimations,
})
export class AuthSignInComponent implements OnInit {
  @ViewChild('signInNgForm') signInNgForm: NgForm;

  public signInForm: UntypedFormGroup;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly router: Router,
    private readonly toastService: PlenaryToastService
  ) {}

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email],
      ],
      password: ['', Validators.required],
    });
  }

  signIn(): void {
    this.signInForm.disable();

    this.authService
      .signIn(this.signInForm.value)
      .pipe(
        finalize(() => {
          this.signInForm.enable();
        })
      )
      .subscribe({
        next: () => {
          const redirectURL =
            this.activatedRoute.snapshot.queryParamMap.get('redirectURL') ||
            '/signed-in-redirect';
          this.router.navigateByUrl(redirectURL);
        },
        error: (error) => {
          this.toastService.handleMessage(
            error,
            'Não foi possível fazer login.',
            { handleRequest: true }
          );
        },
      });
  }
}
