import { Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {ProgressBarService} from './services/progress-bar.service';

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
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver , public auth: AuthService,  private progressBarService: ProgressBarService) {
  }

  ngOnInit() {
    this.isLoggedIn$ = this.auth.isAuthenticated();
    this.progressBarService.updateProgressBar$.subscribe((mode: string) => {
      this.progressBarMode = mode;
    });
  }

  onLogout() {
    this.auth.logout();
  }


}
