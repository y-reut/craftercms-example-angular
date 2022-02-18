import { Component, OnInit } from '@angular/core';
import { ContentInstance } from '@craftercms/models';
import { from, forkJoin } from 'rxjs';

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
  isAuthoringContext: boolean = false;

  constructor() {}

  ngOnInit(): void {
    forkJoin({
      isAuthoring: from(fetchIsAuthoring()),
      model: getModelByUrl('/about'),
    }).subscribe(({ isAuthoring, model }) => {
      this.model = model instanceof Array ? model[0] : model;
      if (isAuthoring && this.model && this.model.craftercms) {
        this.isAuthoringContext = true;
        initInContextEditing({
          path: this.model.craftercms.path
        });
      }
    });
  }

  getIce(params: any): Promise<any> {
    const { model, index, fieldId } = params;
    const isAuthoring = this.isAuthoringContext;
    return getICEAttributes({ model, fieldId, index, isAuthoring });
  }
}
