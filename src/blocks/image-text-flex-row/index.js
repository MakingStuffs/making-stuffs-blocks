import { __ } from "@wordpress/i18n";
import edit from "./modules/edit";
import save from "./modules/save";
import metadata from "./block.json";

const { category, name, attributes } = metadata;

export { name, metadata };

export const settings = {
  title: "Flex Row",
  icon: "excerpt-view",
  category,
  attributes,
  edit,
  save,
};
