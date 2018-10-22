import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Transactions} from '../../model/Transactions';
import {Item} from '../../model/Items';

@Component({
  selector: 'app-dialogboxview',
  templateUrl: './dialogboxview.component.html',
  styleUrls: ['./dialogboxview.component.scss']
})

export class DialogboxviewComponent {
  itemname: string;
  description: string;
  buyername: string;
  items: Array<Item> = new  Array<Item>();
  agreestatus: number;
declinestatus: number;
  constructor(  public dialogRef: MatDialogRef<DialogboxviewComponent>,
                  @Inject(MAT_DIALOG_DATA) public transactin: Transactions) {
    this.agreestatus = 1;
    this.declinestatus = 2;
    this.items = transactin.items;
    for (let item of this.items) {
      this.itemname = item.name;
      this.description = item.description;
    }
    for (let trade of  transactin.trade_roles) {
      if (trade.transaction_role_id === 1 ) {
        this.buyername = trade.trade_party.first_name;
      }

    }
    console.log(transactin);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
