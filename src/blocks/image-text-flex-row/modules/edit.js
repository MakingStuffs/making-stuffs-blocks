import { __ } from "@wordpress/i18n";
import { Component } from "@wordpress/element";
import { Button, Toolbar } from "@wordpress/components";
import { InspectorControls } from "@wordpress/editor";
import {
  PanelBody,
  PanelRow,
  Panel,
  ColorPicker,
  ToggleControl,
} from "@wordpress/components";
import {
  InnerBlocks,
  MediaUpload,
  URLInputButton,
  BlockControls,
} from "@wordpress/block-editor";

class ImageAndTextFlexRowEdit extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      mediaPosition: "left",
      flipOrderOnMobile: false,
      isFullWidth: false,
    };
    this.onSelectImage = this.onSelectImage.bind(this);
    this.onLinkButtonChange = this.onLinkButtonChange.bind(this);
  }

  onSelectImage(media) {
    const { setAttributes } = this.props;
    setAttributes({
      mediaID: media.id,
      mediaURL: media.url,
    });
  }

  onLinkButtonChange(url, post) {
    const { setAttributes } = this.props;
    setAttributes({
      buttonURL: url,
      text: (post && post.title) || "Click Here",
    });
  }

  render() {
    const {
      attributes: {
        mediaID,
        mediaURL,
        mediaPosition,
        buttonURL,
        flipOrderOnMobile,
        color,
        isFullWidth,
      },
      className,
      setAttributes,
    } = this.props;

    const TOOLBAR_CONTROLS = [
      {
        icon: "align-left",
        title: __("Show media on left"),
        isActive: mediaPosition === "left",
        onClick: () => setAttributes({ mediaPosition: "left" }),
      },
      {
        icon: "align-right",
        title: __("Show media on right"),
        isActive: mediaPosition === "right",
        onClick: () => setAttributes({ mediaPosition: "right" }),
      },
      {
        icon: "sort",
        title: __("Reverse order on mobiles"),
        isActive: flipOrderOnMobile,
        onClick: () => setAttributes({ flipOrderOnMobile: !flipOrderOnMobile }),
      },
    ];

    const WIDTH_TOOLBAR_CONTROLS = [
      {
        icon: "image-flip-horizontal",
        title: __("Make full width"),
        isActive: isFullWidth,
        onClick: () => setAttributes({ isFullWidth: !isFullWidth }),
      },
    ];

    const MY_TEMPLATE = [
      ["core/heading", { placeholder: "Hey" }],
      ["core/paragraph", { placeholder: "You mother lover" }],
      ["core/button", { placeholder: "button" }],
    ];

    return (
      <div
        className={`${className} msblocks-flex-row-editor`}
        flipOrderOnMobile={flipOrderOnMobile ? "true" : "false"}
        mediaPosition={mediaPosition ? mediaPosition : "left"}
      >
        <InspectorControls>
          <Panel>
            <PanelBody title={__("Image Tile Settings")}>
              <PanelRow>
                <ToggleControl
                  label="Reverse tile order on mobile"
                  checked={flipOrderOnMobile}
                  onChange={() =>
                    setAttributes({ flipOrderOnMobile: !flipOrderOnMobile })
                  }
                />
              </PanelRow>
            </PanelBody>
            <PanelBody title={__("Text Tile Settings")}>
              <PanelRow>
                <ColorPicker
                  color={color}
                  onChangeComplete={(value) =>
                    setAttributes({ color: value.hex })
                  }
                />
              </PanelRow>
            </PanelBody>
          </Panel>
        </InspectorControls>
        <BlockControls>
          <Toolbar controls={TOOLBAR_CONTROLS} />
          <Toolbar controls={WIDTH_TOOLBAR_CONTROLS} />
        </BlockControls>

        <div
          className="msblocks-flex-row__tile"
          style={{ backgroundColor: color ? color : "#ddd" }}
        >
          <InnerBlocks
            template={MY_TEMPLATE}
            allowedBlocks={["core/heading", "core/paragraph", "core/button"]}
          />
        </div>
        <div class="msblocks-flex-row__tile picture">
          <URLInputButton url={buttonURL} onChange={this.onLinkButtonChange} />
          <MediaUpload
            onSelect={this.onSelectImage}
            allowedTypes="image"
            value={mediaID}
            render={({ open }) => (
              <Button
                className={
                  mediaID
                    ? "msblocks-image-button msblocks-button"
                    : "msblocks-button"
                }
                onClick={open}
              >
                {!mediaID ? (
                  __("Upload Image", "msblocks")
                ) : (
                  <picture>
                    <img src={mediaURL} alt="Words" />
                  </picture>
                )}
              </Button>
            )}
          />
        </div>
      </div>
    );
  }
}

export default ImageAndTextFlexRowEdit;
