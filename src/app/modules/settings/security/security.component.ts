import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { UserService } from '../../../core/user/user.service';

import { PlenaryToastService } from '@plenary/services/toast';
import { PlenaryConfirmationService } from '@plenary/services/confirmation';
import { PlenaryValidators } from '@plenary/validators';

@Component({
  selector: 'settings-security',
  templateUrl: './security.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsSecurityComponent implements OnInit {
  public configForm: UntypedFormGroup;
  public securityForm: UntypedFormGroup;

  constructor(
    private readonly confirmationService: PlenaryConfirmationService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly toastService: PlenaryToastService,
  ) {}

  ngOnInit(): void {
    this.securityForm = this.formBuilder.group(
      {
        password: ['', [Validators.required]],
        newPassword: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: PlenaryValidators.mustMatch(
          'newPassword',
          'confirmPassword'
        ),
      }
    );
  }

  handleSave(): void {
    this.configForm = this.formBuilder.group({
      title: 'Você tem certeza que quer realizar essa ação?',
      message:
        'Você precisará acessar sua conta novamente para <span class="font-medium">validar sua nova senha.</span>',
      icon: this.formBuilder.group({
        show: true,
        name: 'heroicons_outline:exclamation',
        color: 'warn',
      }),
      actions: this.formBuilder.group({
        confirm: this.formBuilder.group({
          show: true,
          label: 'Sim, eu tenho certeza!',
          color: 'warn',
        }),
        cancel: this.formBuilder.group({
          show: true,
          label: 'Cancelar',
        }),
      }),
      dismissible: true,
    });
    const dialogRef = this.confirmationService.open(this.configForm.value);

    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'confirmed') {
        this.userService.editPassword(this.securityForm.value).subscribe({
          next: (res) => {
            this.toastService.handleMessage(res, null, {
              handleRequest: true,
            });
            this.router.navigate(['/login']);
          },
          error: (error) => {
            this.toastService.handleMessage(
              error,
              'Não foi possível modificar os dados pessoais.',
              { handleRequest: true }
            );
          },
        });
      }
    });
  }
}
