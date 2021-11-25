import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-propagation-list-item',
  templateUrl: './propagation-list-item.component.html',
  styleUrls: ['./propagation-list-item.component.css']
})
export class PropagationListItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onClickItem(event: Event){
    if (event.target instanceof HTMLElement && event.target.id === 'awesome_id'){
      console.log('Clicked list item.')
    }
  }

  onClickButton(event: Event){
    console.log('Delete list item.')
  }



}
