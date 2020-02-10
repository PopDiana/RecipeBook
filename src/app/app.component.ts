import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private loggingService: LoggingService, 
    private store: Store<fromApp.AppState>, @Inject(PLATFORM_ID) private platformId ) {

  }

  ngOnInit() {
    if(isPlatformBrowser(this.platformId)){
      this.store.dispatch(new AuthActions.AutoLogin());
    }  
    this.loggingService.printLog('Hello from AppComponent ngOnInit!');
  }

}
