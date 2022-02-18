import { Component, OnInit } from '@angular/core';
import { ContentInstance } from '@craftercms/models';

// @ts-expect-error
import { fetchIsAuthoring, initInContextEditing, getICEAttributes }  from '@craftercms/experience-builder';

import { getModelByUrl } from '../lib/api';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public model: ContentInstance = {
    craftercms: {
      id: '',
      path: '',
      label: '',
      dateCreated: '',
      dateModified: '',
      contentTypeId: '',
    },
  };
  public attributes: any = {};

  constructor() {}

  ngOnInit(): void {
    getModelByUrl('/about')
      .subscribe((model: ContentInstance | ContentInstance[]) => {
        this.model = model instanceof Array ? model[0] : model;
        const attributes = getICEAttributes({ model, fieldId: 'title_s' });
        this.attributes = attributes;

        fetchIsAuthoring().then((isAuthoring: boolean) => {
          if (isAuthoring) {
            initInContextEditing({
              path: this.model.craftercms.path
            });
          }
        });
      });
  }
}
