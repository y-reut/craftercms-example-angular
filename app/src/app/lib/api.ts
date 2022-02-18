import {
  getDescriptor,
  parseDescriptor,
  getNavTree,
  urlTransform,
} from '@craftercms/content';
import { DescriptorResponse, NavigationItem } from '@craftercms/models';
import { firstValueFrom, map, switchMap } from 'rxjs';

export async function getModel(path = '/site/website/index.xml') {
  return await firstValueFrom(
    getDescriptor(path, { flatten: true }).pipe(
      map((desc: (DescriptorResponse | DescriptorResponse[])) => parseDescriptor(desc))
      // Can use this for debugging purposes.
      // tap(console.log)
    )
  );
}

export async function getModelByUrl(webUrl = '/') {
  return await firstValueFrom(
    urlTransform('renderUrlToStoreUrl', webUrl).pipe(
      switchMap((path: string) => getDescriptor(path, { flatten: true }).pipe(
        map((descriptor: (DescriptorResponse | DescriptorResponse[])) => parseDescriptor(descriptor, { parseFieldValueTypes: true }))
      ))
    )
  );
}

export async function getNav() {
  return await firstValueFrom(
    getNavTree('/site/website', 1).pipe(
      // Flatten the nav so that home shows at the same level as the children.
      map((navigation: NavigationItem) => [
        {
          label: navigation.label,
          url: navigation.url,
          active: navigation.active,
          attributes: navigation.attributes
        },
        ...navigation.subItems,
      ])
    )
  );
}