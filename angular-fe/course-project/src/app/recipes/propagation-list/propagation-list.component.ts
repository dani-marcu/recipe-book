import { Component, OnInit } from '@angular/core';
import {PropagationListItemComponent} from "./propagation-list-item/propagation-list-item.component";

@Component({
  selector: 'app-propagation-list',
  templateUrl: './propagation-list.component.html',
  styleUrls: ['./propagation-list.component.css']
})
export class PropagationListComponent implements OnInit {
  items: PropagationListItemComponent[] = [new PropagationListItemComponent(),new PropagationListItemComponent(),new PropagationListItemComponent()];

  constructor() { }

  ngOnInit(): void {
  }

}
