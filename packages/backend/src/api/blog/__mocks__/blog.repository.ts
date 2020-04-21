export class BlogRepository {
  public async update(criteria: any, updatePayload: any): Promise<any> {
    if (criteria.id === 1) {
      return { generatedMaps: [{ ...updatePayload }], affected: 1 };
    }
    return { affected: 0 };
  }

  public async findOne(criteria: any): Promise<any> {
    if (criteria.id === 1) {
      return { user: { id: 1 } };
    }
    return undefined;
  }
}
