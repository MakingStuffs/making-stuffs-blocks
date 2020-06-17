import { __ } from "@wordpress/i18n";
import edit from "./modules/edit";
import save from "./modules/save";
import metadata from "./block.json";

const { name, category, attributes } = metadata;

export { name, metadata };

export const settings = {
  title: __("Filterable Products by Category"),
  icon: "excerpt-view",
  category,
  attributes,
  edit,
  save,
};
