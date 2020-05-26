import { __ } from "@wordpress/i18n";
import { Component } from "@wordpress/element";
import { Toolbar, Button } from "@wordpress/components";
import { InspectorControls } from "@wordpress/editor";
import {
  PanelBody,
  PanelRow,
  Panel,
  ColorPicker,
  ToggleControl,
  SandBox,
} from "@wordpress/components";
import { InnerBlocks, BlockControls, PlainText } from "@wordpress/block-editor";

class TextAndHtmlFlexRowEdit extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      mediaPosition: "left",
      flipOrderOnMobile: false,
      sandboxView: false,
      isFullWidth: false,
    };
  }

  render() {
    const {
      attributes: {
        htmlEmbed,
        mediaPosition,
        flipOrderOnMobile,
        color,
        sandboxView,
        isFullWidth,
      },
      className,
      setAttributes,
    } = this.props;

    const ORDER_TOOLBAR_CONTROLS = [
      {
        icon: "align-left",
        title: __("Show html on left"),
        isActive: mediaPosition === "left",
        onClick: () => setAttributes({ mediaPosition: "left" }),
      },
      {
        icon: "align-right",
        title: __("Show html on right"),
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

    const VISIBILITY_TOOLBAR_CONTROLS = [
      {
        icon: "visibility",
        title: __("Preview your HTML"),
        isActive: !sandboxView,
        onClick: () => setAttributes({ sandboxView: !sandboxView }),
      },
      {
        icon: "editor-code",
        title: __("Edit your raw HTML"),
        isActive: sandboxView,
        onClick: () => setAttributes({ sandboxView: !sandboxView }),
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
      ["core/heading", { placeholder: "This is a Title" }],
      [
        "core/paragraph",
        {
          placeholder:
            "This is the text area. You can change the colours with the block settings on the right.",
        },
      ],
      ["core/button", { placeholder: "Press Me" }],
    ];

    return (
      <div
        className={`${className} msblocks-flex-row`}
        flipOrderOnMobile={flipOrderOnMobile ? "true" : "false"}
        mediaPosition={mediaPosition ? mediaPosition : "left"}
      >
        <InspectorControls>
          <Panel>
            <PanelBody title={__("HTML Tile Settings")}>
              <PanelRow>
                <ToggleControl
                  label="Reverse tile order on mobile"
                  checked={flipOrderOnMobile}
                  onChange={() =>
                    setAttributes({ flipOrderOnMobile: !flipOrderOnMobile })
                  }
                />
              </PanelRow>
              <PanelRow>
                <ToggleControl
                  label={sandboxView ? "Show raw HTML" : "Show HTML preview"}
                  checked={sandboxView}
                  onChange={() => setAttributes({ sandboxView: !sandboxView })}
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
          <Toolbar controls={ORDER_TOOLBAR_CONTROLS} />
          <Toolbar controls={WIDTH_TOOLBAR_CONTROLS} />
          <Toolbar controls={VISIBILITY_TOOLBAR_CONTROLS} />
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
        <div class="msblocks-flex-row__tile html">
          {sandboxView ? (
            <SandBox html={htmlEmbed} title="HTML SandBox" type="iframe" />
          ) : (
            <PlainText
              value={htmlEmbed}
              onChange={(content) => setAttributes({ htmlEmbed: content })}
              placeholder={__("Write some html... ")}
              aria-label="HTML"
            />
          )}
        </div>
      </div>
    );
  }
}

export default TextAndHtmlFlexRowEdit;
