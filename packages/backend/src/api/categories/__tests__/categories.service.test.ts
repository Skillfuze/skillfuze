import { CategoriesService } from '../categories.service';
import { CategoriesRepository } from '../categories.repository';
import { Category } from '../category.entity';

jest.mock('../categories.repository');

describe('CategoriesService', () => {
  let repository: CategoriesRepository;
  let service: CategoriesService;

  beforeAll(async () => {
    repository = new CategoriesRepository();
    service = new CategoriesService(repository);
  });

  describe('getAll', () => {
    let result: Category[];
    const predefinedCategories = [
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
      { id: 3, name: 'Category 3' },
    ];

    beforeAll(async () => {
      jest.spyOn(repository, 'find').mockReturnValue(new Promise(resolve => resolve(predefinedCategories)));
      result = await service.getAll();
    });

    it('should get all categories correctly', () => {
      expect(result).toBe(predefinedCategories);
    });
  });
});
