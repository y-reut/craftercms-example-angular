// @ts-nocheck

import { Component, OnInit } from '@angular/core';
import { fetchIsAuthoring, initInContextEditing, getICEAttributes }  from '@craftercms/experience-builder';

import { getModelByUrl } from '../lib/api';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public model: any = {};
  public attributes: any = {
    'title_s': {},
    'content_o': [],
  };
  public baseUrl: string = environment.PUBLIC_CRAFTERCMS_HOST_NAME ?? '';

  constructor() {}

   ngOnInit(): void {
    getModelByUrl().then(model => {
      this.model = model;
      this.attributes['content_o'] = [];
      this.attributes['title_s'] = getICEAttributes({ model, fieldId: 'title_s' });
      for (let i = 0; i < this.model.content_o.length; i += 1) {
        const component = this.model.content_o[i];
        const attr:any = {};
        attr['self'] = getICEAttributes({ model: component, index: i });
        attr['title_s'] = getICEAttributes({ model: component, fieldId: 'title_s', index: i });
        attr['background_s'] = getICEAttributes({ model: component, fieldId: 'background_s', index: i });
        this.attributes['content_o'].push(attr);
      }

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
