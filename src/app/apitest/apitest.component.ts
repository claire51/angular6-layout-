import { Component, OnInit , ViewContainerRef } from '@angular/core';
import {UseAccounts} from '../model/Accounts';
import {KevolService} from '../services/kevol.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-apitest',
  templateUrl: './apitest.component.html',
  styleUrls: ['./apitest.component.scss']
})
export class ApitestComponent implements OnInit {
  useAccounts: Array<UseAccounts>;
  account: UseAccounts;

  constructor(private kevolService: KevolService,  private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit() {
    this.getuseraccount();
  }


  getuseraccount() {
    this.kevolService.getdata().subscribe(
      useAccounts => this.useAccounts = useAccounts);
  }
  getHeroes(): void {
    this.kevolService.getdata()
      .subscribe(useAccounts => this.useAccounts = useAccounts.slice(1, 5));
  }
  createaccount() {
    this.kevolService.getdata().subscribe(
      useAccounts => this.useAccounts = useAccounts);
  }
  add(useraccount: UseAccounts): void {
    this.kevolService.create(useraccount)
      .subscribe(useAccounts => {
        this.useAccounts.push(useraccount);
      });
  }


  delete(useraccount: UseAccounts): void {
    this.useAccounts = this.useAccounts.filter(h => h !== useraccount);
    this.kevolService.deleteData(useraccount).subscribe();
  }


  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.kevolService.getById(id)
      .subscribe(account => this.account = account);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.kevolService.updateData(this.account)
      .subscribe(() => this.goBack());
  }
}
