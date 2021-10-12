import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-close-account',
  templateUrl: './close-account.component.html',
  styleUrls: ['./close-account.component.css']
})
export class CloseAccountComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  closeAccount(password: string): void{
    console.log(password);
  }
}
