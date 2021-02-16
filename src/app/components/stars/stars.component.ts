import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnInit {

  @Input() max: number;
  @Input() current: number;

  constructor() { }

  ngOnInit(): void {
  }

  get iterable(): unknown[] {
    return Array.from({ length: this.max });
  }
}
