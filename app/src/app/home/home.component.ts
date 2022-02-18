import { Component, OnInit } from '@angular/core';
import { ContentInstance } from '@craftercms/models';

// @ts-expect-error
import { fetchIsAuthoring, initInContextEditing, getICEAttributes }  from '@craftercms/experience-builder';

import { getModelByUrl } from '../lib/api';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public model: ContentInstance = {
    craftercms: {
      id: '',
      path: '',
      label: '',
      dateCreated: '',
      dateModified: '',
      contentTypeId: '',
    },
    content_o: [],
  };
  public attributes: any = {
    'title_s': {},
    'content_o': [],
  };
  public baseUrl: string = environment.PUBLIC_CRAFTERCMS_HOST_NAME ?? '';

  constructor() {}

   ngOnInit(): void {
    getModelByUrl().then((model: ContentInstance | ContentInstance[]) => {
      this.model = model instanceof Array ? model[0] : model;
      this.attributes['title_s'] = getICEAttributes({ model, fieldId: 'title_s' });
      for (let i = 0; i < this.model['content_o'].length; i += 1) {
        const component = this.model['content_o'][i];
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
