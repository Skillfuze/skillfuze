import { EditorState } from 'draft-js';
import deepEqual from 'deep-eql';
import cloneDeep from 'clone-deep';
import axios from 'axios';
import { stateToHTML } from 'draft-js-export-html';
import { Blog, CreateBlogDTO, Category } from '@skillfuze/types';
import { parseError } from '../utils/parseError';

export interface BlogState {
  readonly title: string;
  readonly description: string;
  readonly thumbnailURL: string;
  readonly tags: string[];
  readonly editorState: EditorState | string;
  readonly category: Category;
  readonly url?: string;
}

export class BlogService {
  private state: BlogState;

  public constructor(state: BlogState) {
    this.state = cloneDeep(state);
  }

  public async create(payload: CreateBlogDTO): Promise<Blog> {
    try {
      const { data: blog } = await axios.post<Blog>('/api/v1/blogs', payload);
      this.state = cloneDeep(payload);

      return blog;
    } catch (err) {
      throw parseError(err.response.data);
    }
  }

  public async update(blogId: string, payload: CreateBlogDTO): Promise<Blog> {
    try {
      const { data: blog } = await axios.patch<Blog>(`/api/v1/blogs/${blogId}`, payload);
      this.state = cloneDeep(payload);

      return blog;
    } catch (err) {
      throw parseError(err.response.data);
    }
  }

  public static async get(blogId: string): Promise<Blog> {
    const { data: blog } = await axios.get<Blog>(`/api/v1/blogs/${blogId}`);
    return blog;
  }

  public static async publish(blogId: string): Promise<Blog> {
    const { data: blog } = await axios.post<Blog>(`/api/v1/blogs/${blogId}/publish`);
    return blog;
  }

  public static blogStateToDTO(state: BlogState): CreateBlogDTO {
    const { editorState, ...rest } = state;
    return {
      ...rest,
      content: stateToHTML((state.editorState as EditorState).getCurrentContent()),
    };
  }

  public shouldUpdate(payload: BlogState): boolean {
    return !deepEqual(
      { ...this.state, editorState: (this.state.editorState as EditorState).getCurrentContent() },
      { ...payload, editorState: (payload.editorState as EditorState).getCurrentContent() },
    );
  }
}
