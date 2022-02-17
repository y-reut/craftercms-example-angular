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
  public attributes: any = {};
  public baseUrl: string = environment.PUBLIC_CRAFTERCMS_HOST_NAME ?? '';

  constructor() {}

   ngOnInit(): void {
    getModel().then(model => {
      this.model = model;
      const attributes = {};
      attributes['content_o'] = [];
      attributes['title_s'] = getICEAttributes({ model, fieldId: 'title_s' });
      for (let i = 0; i < model.content_o.length; i += 1) {
        const component = model.content_o[i];
        const attr = {};
        attr['self'] = getICEAttributes({ model: component, index: i });
        attr['title_s'] = getICEAttributes({ model: component, fieldId: 'title_s', index: i });
        attr['background_s'] = getICEAttributes({ model: component, fieldId: 'background_s', index: i });
        attributes['content_o'].push(attr);
      }
      this.attributes = attributes;

      fetchIsAuthoring().then(isAuthoring => {
        if (isAuthoring && this.model && this.model.craftercms) {
          initInContextEditing({
            path: this.model.craftercms.path
          });
        }
      });
    });
   }
}
