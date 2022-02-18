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
  public baseUrl: string = environment.PUBLIC_CRAFTERCMS_HOST_NAME ?? '';
  isAuthoring: boolean = false;

  constructor() {}

  ngOnInit(): void {
    getModelByUrl()
      .subscribe((model: ContentInstance | ContentInstance[]) => {
        this.model = model instanceof Array ? model[0] : model;
        fetchIsAuthoring().then((isAuthoring: boolean) => {
          if (isAuthoring && this.model && this.model.craftercms) {
            this.isAuthoring = isAuthoring;
            initInContextEditing({
              path: this.model.craftercms.path
            });
          }
        });
    });
  }

  getIce(params: any): Promise<any> {
    const { model, index, fieldId } = params;
    const isAuthoring = this.isAuthoring;
    return getICEAttributes({ model, fieldId, index, isAuthoring });
  }
}
