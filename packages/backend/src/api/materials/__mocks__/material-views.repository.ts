import { MaterialView } from '../material.view';

export class MaterialViewsRepository {
  public async findOne(options: any) {
    if (options.id === 'MATERIAL_ID') {
      const materialView = new MaterialView();
      materialView.url = 'URL';
      return materialView;
    }

    return undefined;
  }
}
