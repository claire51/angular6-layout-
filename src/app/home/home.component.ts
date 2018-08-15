import { Component, OnInit } from '@angular/core';
import {ProgressBarService} from '../services/progress-bar.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  progressBarMode: string;
  constructor(private progressBarService: ProgressBarService) { }

  ngOnInit() {
    this.progressBarService.updateProgressBar$.subscribe((mode: string) => {
      this.progressBarMode = mode;
    });
  }

}
