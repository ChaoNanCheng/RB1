import { Component, OnInit } from '@angular/core';

@Component({
  selector:'app-footer',
  templateUrl:'./footer-layout.component.html'
})

export class FooterLayoutComponent implements OnInit {
  public author:string = '';
  public thisYear: number;

  constructor() { }

  ngOnInit(): void {
    this.author = 'Wilson Cheng';
    this.thisYear =  new Date().getFullYear();
  }
}
