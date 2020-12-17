import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public selectedProviders = [];
  public unselectedProviders = [
    {
      id: '1',
      name: 'John',
      address: '123 Greenway Blvd',
      phone: '8991234321'
    },
    {
      id: '2',
      name: 'Mary',
      address: '443 Windwhisper Road',
      phone: '2233211903'
    },
    {
      id: '3',
      name: 'Jason',
      address: '9992 Pumpkin Hollow',
      phone: '4343219384'
    }
  ];

  public clickedProviders = [];


  clickProvider = (providerId) => {
    const foundIndex = this.clickedProviders.findIndex(( index ) => index === this.unselectedProviders[providerId].id)
    if (foundIndex > -1) {
      this.clickedProviders.splice(foundIndex, 1)
    } else {
      this.clickedProviders.push(this.unselectedProviders[providerId].id)
    }
  }


  selectProviders = () => {
    this.clickedProviders.forEach((providerId) => {
      const foundIndex = this.unselectedProviders.findIndex(({ id }) => id === providerId)
      this.selectedProviders.push(this.unselectedProviders[foundIndex]);
      this.unselectedProviders.splice(foundIndex, 1);
    })

    this.clickedProviders = [];

    sessionStorage.setItem('unselectedProviders', JSON.stringify(this.unselectedProviders));
    sessionStorage.setItem('selectedProviders', JSON.stringify(this.selectedProviders));
  }

  unselectProvider = (providerId) => {
    const unselectedProvider = this.selectedProviders[providerId];
    function insertSorted(insertedProvider, arr) {
      let isLast = true;
      if(arr.length === 0)
        arr.push(insertedProvider)
      else {
        for (let i = 0, len = arr.length; i < len; i++) {
          if (parseInt(insertedProvider.id) < parseInt(arr[i].id)) {
            isLast = false;
            arr.splice(i, 0, insertedProvider);
            break;
          }
        }
        if(isLast){
          arr.push(insertedProvider);
        }
      }
      return arr;
    }

    this.unselectedProviders = insertSorted(unselectedProvider, this.unselectedProviders);
    this.selectedProviders.splice(providerId, 1);

    sessionStorage.setItem('unselectedProviders', JSON.stringify(this.unselectedProviders));
    sessionStorage.setItem('selectedProviders', JSON.stringify(this.selectedProviders));
  }

  highlightClickedProvider = (providerId) => {
    if (this.clickedProviders.includes(this.unselectedProviders[providerId].id)) {
      return "table-primary";
    }
  }

  constructor() {}

  ngOnInit() {
    if (sessionStorage.getItem('unselectedProviders') !== null) {
      this.unselectedProviders = JSON.parse(sessionStorage.getItem('unselectedProviders'));
      this.selectedProviders = JSON.parse(sessionStorage.getItem('selectedProviders'));
    }
  }

}
