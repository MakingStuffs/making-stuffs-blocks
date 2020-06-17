import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import * as imageTextFlexRow from "./blocks/image-text-flex-row";
import * as htmlTextFlexRow from "./blocks/text-html-flex-row";
import * as filterableProductsByCategory from "./blocks/filterable-products-by-category";
import "./sass/style.scss";
import "./sass/editor.scss";

(() => {
  const blocks = [
    imageTextFlexRow,
    htmlTextFlexRow,
    filterableProductsByCategory,
  ];

  blocks.forEach((block) => {
    registerBlockType(block.name, block.settings);
  });
})();
