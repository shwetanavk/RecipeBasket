import {
  Component,
  //ComponentFactoryResolver,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import {
  Observable,
  //Subscription
} from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
//import { PlaceHolderDirective } from '../shared/placeholder/place-holder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  //@ViewChild(PlaceHolderDirective) alertHost: PlaceHolderDirective;

  //private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) //private componentFactoryResolver: ComponentFactoryResolver
  {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;
    this.error = null;

    let authObj: Observable<AuthResponseData>;
    this.isLoading = true;

    if (this.isLoginMode) {
      authObj = this.authService.signin(email, password);
    } else {
      authObj = this.authService.signup(email, password);
    }

    authObj.subscribe({
      next: (resData) => {
        console.log('Signup success:', resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error: (errorMessage) => {
        console.error('Signup failed:', errorMessage);
        this.error = errorMessage;
        //this.showErrorAlert(errorMessage);
        this.isLoading = false;
      },
      complete: () => {
        console.log('Signup process completed.');
      },
    });

    authForm.reset();
  }

  onHandleError() {
    this.error = null;
  }

  // private showErrorAlert(message: string) {
  //   Programattically create alert component and manually instantiate component - for this we have component factory
  //   const alertComponentFactory =
  //     this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
  //   const hostViewContainerRef = this.alertHost.viewContainerRef;
  //   hostViewContainerRef.clear();

  //   const componetRef = hostViewContainerRef.createComponent(
  //     alertComponentFactory
  //   );

  //   componetRef.instance.message = message;
  //   this.closeSub = componetRef.instance.close.subscribe(() => {
  //     this.closeSub.unsubscribe();
  //     hostViewContainerRef.clear();
  //   });
  // }

  ngOnDestroy(): void {
    // if (this.closeSub) {
    //   this.closeSub.unsubscribe();
    // }
  }
}
