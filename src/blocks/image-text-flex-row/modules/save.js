import { Component } from "@wordpress/element";
import { InnerBlocks } from "@wordpress/block-editor";

export default ({ attributes, className }) => {
  const {
    color,
    mediaURL,
    buttonURL,
    buttonText,
    mediaPosition,
    flipOrderOnMobile,
    isFullWidth
  } = attributes;

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
      <div class="msblocks-flex-row__tile picture">
        {mediaURL && (
          <picture>
            {buttonURL ? (
              <a href={buttonURL} title={buttonText}>
                <img src={mediaURL} alt="Hey" />
              </a>
            ) : (
              <img src={mediaURL} alt="Hey" />
            )}
          </picture>
        )}
      </div>
    </div>
  );
};
