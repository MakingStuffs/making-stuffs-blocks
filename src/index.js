import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import * as imageTextFlexRow from "./blocks/image-text-flex-row";
import * as htmlTextFlexRow from "./blocks/text-html-flex-row";
import './style.scss';
import './editor.scss';

(() => {
  const blocks = [imageTextFlexRow, htmlTextFlexRow];

  blocks.forEach((block) => {
      registerBlockType(block.name, block.settings);
    });
})();
