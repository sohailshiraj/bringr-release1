import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TreoAnimations } from '@treo/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'auth-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: TreoAnimations,
})
export class AuthSignInComponent implements OnInit {
  signInForm: FormGroup;
  message: any;

  /**
   * Constructor
   *
   * @param {ActivatedRoute} _activatedRoute
   * @param {AuthService} _authService
   * @param {FormBuilder} _formBuilder
   * @param {Router} _router
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private service: AuthService,
    private _snackBar: MatSnackBar
  ) {
    // Set the defaults
    this.message = null;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.signInForm = this._formBuilder.group({
      username: [''],
      password: [''],
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Sign in
   */
  signIn(): void {
    // Disable the form
    this.signInForm.disable();

    // Hide the message
    this.message = null;

    // Get the credentials
    const credentials = this.signInForm.value;

    this.service
      .adminLogin(credentials.username, credentials.password)
      .subscribe(
        (res: any) => {
          if (res.response == 200 || res.response == '200') {
            localStorage.setItem(
              'user_details',
              btoa(JSON.stringify(res.data))
            );
            const redirectURL =
              this._activatedRoute.snapshot.queryParamMap.get('redirectURL') ||
              '/signed-in-redirect';

            // Navigate to the redirect url
            this._router.navigateByUrl(redirectURL);
          } else {
            this.signInForm.enable();

            // Show the error message
            this.message = {
              appearance: 'outline',
              content: 'Wrong username or password',
              shake: true,
              showIcon: false,
              type: 'error',
            };
          }
        },
        (err: any) => {
          this.signInForm.enable();
          this.openSnackBar('Something went wrong');
        }
      );

    // Sign in
    // this._authService.signIn(credentials).subscribe(
    //   () => {
    //     // Set the redirect url.
    //     // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
    //     // to the correct page after a successful sign in. This way, that url can be set via
    //     // routing file and we don't have to touch here.
    //     const redirectURL =
    //       this._activatedRoute.snapshot.queryParamMap.get('redirectURL') ||
    //       '/signed-in-redirect';

    //     // Navigate to the redirect url
    //     this._router.navigateByUrl(redirectURL);
    //   },
    //   (response) => {
    //     // Re-enable the form
    //     const redirectURL =
    //       this._activatedRoute.snapshot.queryParamMap.get('redirectURL') ||
    //       '/signed-in-redirect';

    //     // Navigate to the redirect url
    //     this._router.navigateByUrl(redirectURL);
    //   }
    // );
  }

  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }
}
