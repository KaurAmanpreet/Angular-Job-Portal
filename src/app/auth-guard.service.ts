import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./service/auth.service";
import { Injectable } from "@angular/core";
import { take, map } from 'rxjs/operators';

@Injectable()

export class AuthGuardService implements CanActivate{
  constructor(private loginService: AuthService, private router: Router) {}
  
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAdmin();
  }

  private checkAdmin(): Observable<boolean> {
    return this.loginService.getUserData().pipe(
      take(1),
      map((userData: any) => {
        if (userData && userData.isAdmin) {
          return true;
        } else {
          this.router.navigate(['/Home']);
          return false;
        }
      })
    );
  }

}