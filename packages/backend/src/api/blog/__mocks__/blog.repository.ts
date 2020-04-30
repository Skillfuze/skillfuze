export class BlogRepository {
  public async update(criteria: any, updatePayload: any): Promise<any> {
    if (criteria.id === '1') {
      return { generatedMaps: [{ ...updatePayload }], affected: 1, id: criteria.id };
    }
    return { affected: 0 };
  }

  public async findOne(criteria: any): Promise<any> {
    if (criteria.id === '1' || criteria === '1') {
      return { user: { id: 1 }, id: criteria.id, url: 'title-1', publishedAt: new Date(Date.now()) };
    }
    return undefined;
  }
}
