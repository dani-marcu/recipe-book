import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, Subscription, tap } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { AuthService } from './auth.service';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;
  private closeSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onLogin(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;

    this.authService
      .login(email, password)
      .pipe(
        tap(() => {
          this.router.navigate(['/recipes']);
        }),
        catchError((errorMessage) => {
          this.error = errorMessage;
          this.showErrorAlert(errorMessage);
          return of(true);
        }),
        tap(() => {
          this.isLoading = false;
        })
      )
      .subscribe();
    form.reset();
  }

  onRegister(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;

    this.authService
      .signup(email, password)
      .pipe(
        tap(() => {
          this.router.navigate(['/recipes']);
        }),
        catchError((errorMessage) => {
          this.error = errorMessage;
          this.showErrorAlert(errorMessage);
          return of(true);
        }),
        tap(() => {
          this.isLoading = false;
        })
      )
      .subscribe();
    form.reset();
  }

  showErrorAlert(message: string) {
    const alertComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(
      alertComponentFactory
    );
    componentRef.instance.message = message;
    this.closeSubscription = componentRef.instance.close.subscribe({
      next: () => {
        this.closeSubscription.unsubscribe();
        hostViewContainerRef.clear();
      },
    });
  }

  ngOnDestroy() {
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }
  }
}
