import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})

export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  private userSub: Subscription;
  public isCollapsed = true;

  ngOnInit() {
    this.userSub = this.store.select('auth').pipe(map(
      authState => authState.user
    )).subscribe(user => {
        this.isAuthenticated = !!user;
    }
    );
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) { }

  onSaveData() {
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetchData() {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogout(){
    this.store.dispatch(new AuthActions.Logout());
  }

}
