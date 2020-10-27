import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';

const ImageRegexp = /^!\[([^\]]*)]\s*\(([^)"]+)( "([^)"]+)")?\)/;

// draft to md
const styleItems = {
  atomic: {
    open: (block) => {
      const alt = block.data.alt || '';
      const title = block.text ? ` "${block.text}"` : '';
      block.text = '';
      return `![${alt}](${block.data.src}${title})`;
    },
    close: () => '',
  },
};

export const convertMdToDraft = (md) =>
  markdownToDraft(md, {
    blockEntities: {
      image: (item) => {
        return {
          type: 'IMAGE',
          mutability: 'IMMUTABLE',
          data: {
            src: item.src,
            alt: item.alt,
          },
        };
      },
    },
  });

export const convertDraftToMd = (raw) =>
  draftToMarkdown(raw, {
    styleItems,
  });
