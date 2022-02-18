// @ts-nocheck

import { Component, OnInit } from '@angular/core';
import { fetchIsAuthoring, initInContextEditing, getICEAttributes }  from '@craftercms/experience-builder';

import { getModelByUrl } from '../lib/api';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public model: any = {};
  public attributes: {[attrName: string]: string} = {};

  constructor() {
  }

  ngOnInit(): void {
    getModelByUrl('/about').then(model => {
      this.model = model;
      const attributes = getICEAttributes({ model, fieldId: 'title_s' });
      this.attributes = attributes;

      fetchIsAuthoring().then((isAuthoring: boolean) => {
        if (isAuthoring && this.model && this.model.craftercms) {
          initInContextEditing({
            path: this.model.craftercms.path
          });
        }
      });
    });
  }
}
