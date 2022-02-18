import { Component, OnInit } from '@angular/core';
import { ContentInstance } from '@craftercms/models';
import { from, forkJoin } from 'rxjs';

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
  public baseUrl: string = environment.PUBLIC_CRAFTERCMS_HOST_NAME ?? '';
  isAuthoringContext: boolean = false;

  constructor() {}

  ngOnInit(): void {
    forkJoin({
      isAuthoring: from(fetchIsAuthoring()),
      model: getModelByUrl(),
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
