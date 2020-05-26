import { InnerBlocks } from "@wordpress/block-editor";
import { RawHTML } from '@wordpress/element';

export default ({ attributes, className }) => {
  const { color, htmlEmbed, mediaPosition, flipOrderOnMobile, isFullWidth } = attributes;

  return (
    <div
      className={`${className} ${
        isFullWidth ? "full-width" : ""
      } msblocks-flex-row`}
      flipOrderOnMobile={flipOrderOnMobile ? "true" : "false"}
      mediaPosition={mediaPosition ? mediaPosition : "left"}
    >
      <div
        className="msblocks-flex-row__tile"
        style={{ backgroundColor: color ? color : "#ddd" }}
      >
        <InnerBlocks.Content />
      </div>
      <RawHTML className="msblocks-flex-row__tile html">{htmlEmbed}</RawHTML>
    </div>
  );
};
