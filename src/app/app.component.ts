import { Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {ProgressBarService} from './services/progress-bar.service';
import {Spinkit} from 'ng-http-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MLINZI';
  isLoggedIn$: Observable<boolean>;
  progressBarMode: string;
  color = 'primary';
  public spinkit = Spinkit;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver , public auth: AuthService,  private progressBarService: ProgressBarService) {
    this.auth.showloading = false;

  }

  ngOnInit() {
    localStorage.setItem('token', 'notoken');
    this.isLoggedIn$ = this.auth.isAuthenticated();
    this.progressBarService.updateProgressBar$.subscribe((mode: string) => {
      this.progressBarMode = mode;
    });
  }

  onLogout() {
    this.auth.logout();
  }


}
