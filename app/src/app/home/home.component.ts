// @ts-nocheck

import { Component, OnInit } from '@angular/core';
import { fetchIsAuthoring, initInContextEditing, getICEAttributes }  from '@craftercms/experience-builder';

import { getModel } from '../lib/api';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public model: any = {};
  public attributes: {[attrName: string]: string} = {};
  public baseUrl: string = environment.PUBLIC_CRAFTERCMS_HOST_NAME ?? '';

  constructor() {
    getModel().then(model => {
      this.model = model;
      const attributes = getICEAttributes({ model, fieldId: 'title_s' });
      this.attributes = attributes;
    });
   }

  ngOnInit(): void {
    fetchIsAuthoring().then(isAuthoring => {
      if (isAuthoring && this.model && this.model.craftercms) {
        initInContextEditing({
          path: this.model.craftercms.path
        });
      }
    });
  }

}
