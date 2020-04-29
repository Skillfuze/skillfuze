import { EditorState } from 'draft-js';
import deepEqual from 'deep-eql';
import cloneDeep from 'clone-deep';
import axios from 'axios';
import { stateToHTML } from 'draft-js-export-html';

export interface BlogState {
  readonly title: string;
  readonly description: string;
  readonly thumbnailURL: string;
  readonly tags: string[];
  readonly editorState: EditorState | string;
}

export class BlogService {
  private state: BlogState;

  public constructor(state: BlogState) {
    this.state = cloneDeep(state);
  }

  public async create(payload: BlogState): Promise<any> {
    this.state = cloneDeep(payload);
    const { data: blog } = await axios.post('/api/v1/blogs', {
      ...payload,
      content: stateToHTML((payload.editorState as EditorState).getCurrentContent()),
      editorState: undefined,
    });

    return blog;
  }

  public async update(blogId: string, payload: BlogState): Promise<any> {
    this.state = cloneDeep(payload);
    const { data: blog } = await axios.patch(`/api/v1/blogs/${blogId}`, {
      ...payload,
      content: stateToHTML((payload.editorState as EditorState).getCurrentContent()),
      editorState: undefined,
    });

    return blog;
  }

  public static async get(blogId: string): Promise<any> {
    const { data: blog } = await axios.get(`/api/v1/blogs/${blogId}`);
    return blog;
  }

  public static async publish(blogId: string): Promise<any> {
    const { data: blog } = await axios.post(`/api/v1/blogs/${blogId}/publish`);
    return blog;
  }

  public shouldUpdate(payload: BlogState): boolean {
    return !deepEqual(
      { ...this.state, editorState: (this.state.editorState as EditorState).getCurrentContent() },
      { ...payload, editorState: (payload.editorState as EditorState).getCurrentContent() },
    );
  }
}
