import React from 'react';
import DraftEditor, { composeDecorators } from 'draft-js-plugins-editor';
import { EditorState } from 'draft-js';

import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import createLinkPlugin from 'draft-js-anchor-plugin';
import createDividerPlugin from 'draft-js-divider-plugin';
import createImagePlugin from 'draft-js-image-plugin';
import createVideoPlugin from 'draft-js-video-plugin';
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  BlockquoteButton,
  CodeBlockButton,
} from 'draft-js-buttons';
import AddEmbedButton from './buttons/AddEmbedButton';

import NoSSR from '../NoSSR';

const sideToolbarPlugin = createSideToolbarPlugin();
const { SideToolbar } = sideToolbarPlugin;

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

const dividerPlugin = createDividerPlugin();
const { DividerButton } = dividerPlugin;

const linkPlugin = createLinkPlugin({});

const focusPlugin = createFocusPlugin();
const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;
const resizeablePlugin = createResizeablePlugin();

const decorator = composeDecorators(alignmentPlugin.decorator, resizeablePlugin.decorator, focusPlugin.decorator);

const imagePlugin = createImagePlugin({ decorator });
const videoPlugin = createVideoPlugin({ decorator });

const plugins = [
  sideToolbarPlugin,
  inlineToolbarPlugin,
  linkPlugin,
  dividerPlugin,
  imagePlugin,
  videoPlugin,
  focusPlugin,
  alignmentPlugin,
  resizeablePlugin,
];

interface EditorProps {
  editorState: EditorState;
  onChange: (editorState: EditorState) => void;
}

const Editor: React.FC<EditorProps> = (props: EditorProps) => {
  const blockStyleFn = (contentBlock): string => {
    const type = contentBlock.getType();
    if (type === 'header-one') {
      return 'text-2xl font-semibold';
    }
    if (type === 'header-two') {
      return 'text-xl font-semibold';
    }

    return '';
  };

  return (
    <NoSSR>
      <div className="flex justify-end mb-2">
        <AddEmbedButton
          editorState={props.editorState}
          onChange={props.onChange}
          modifier={imagePlugin.addImage}
          type="image"
        />
        <AddEmbedButton
          editorState={props.editorState}
          onChange={props.onChange}
          modifier={videoPlugin.addVideo}
          type="video"
        />
      </div>
      <DraftEditor
        plugins={plugins}
        editorState={props.editorState}
        onChange={props.onChange}
        blockStyleFn={blockStyleFn}
        placeholder="Tell your story..."
      />
      <AlignmentTool />
      <SideToolbar>
        {externalProps => (
          <>
            <HeadlineOneButton {...externalProps} />
            <HeadlineTwoButton {...externalProps} />
            <BlockquoteButton {...externalProps} />
            <CodeBlockButton {...externalProps} />
            <DividerButton {...externalProps} />
          </>
        )}
      </SideToolbar>
      <InlineToolbar>
        {externalProps => (
          <>
            <BoldButton {...(externalProps as any)} />
            <ItalicButton {...(externalProps as any)} />
            <UnderlineButton {...(externalProps as any)} />
            <linkPlugin.LinkButton {...(externalProps as any)} />
          </>
        )}
      </InlineToolbar>
    </NoSSR>
  );
};

export default Editor;
