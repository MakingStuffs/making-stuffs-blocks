import { __ } from '@wordpress/i18n';
import edit from './modules/edit';
import save from './modules/save';
import metadata from './block.json';

const { attributes, category, name, keywords } = metadata;

export { name, metadata };

export const settings = {
  title: __("Text and HTML Flex Row"),
  description: __("Embed some raw html and a text tile within a collapsible flex row"),
  icon: "excerpt-view",
  keywords,
  category,
  attributes,
  edit,
  save,
};
