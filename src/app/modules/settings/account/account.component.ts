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

import { AuthService } from '../../../core/auth/auth.service';
import { UserService } from '../../../core/user/user.service';

import { PlenaryToastService } from '@plenary/services/toast';

@Component({
  selector: 'settings-account',
  templateUrl: './account.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsAccountComponent implements OnInit {
  public accountForm: UntypedFormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly toastService: PlenaryToastService,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.accountForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.userService.user$.subscribe({
      next: (res) => {
        this.accountForm.patchValue(res);
      },
    });
  }

  handleSave(): void {
    this.userService.editProfile(this.accountForm.value).subscribe({
      next: (res: { message: string; accessToken: string; user: any }) => {
        this.userService.user = res.user;
        this.authService.accessToken = res.accessToken;
        this.authService.signInUsingToken();
        this.toastService.handleMessage(res, null, {
          handleRequest: true,
        });
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
}
