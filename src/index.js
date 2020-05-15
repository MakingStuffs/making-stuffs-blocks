import { registerBlockType } from "@wordpress/blocks";
import {
  RichText,
  AlignmentToolbar,
  BlockControls,
} from "@wordpress/block-editor";

registerBlockType("gutenberg-examples/flex-row", {
  title: "Example: Basic",
  icon: "universal-access-alt",
  category: "layout",
  // Tell WP scripts what we would like to get in the attributes object passed as props
  // Below tells to get the content of the saved elements paragraph content
  attributes: {
    content: {
      type: "array",
      source: "children",
      selector: "p",
    },
    // Add props parameter for the alignment set by the user
    alignment: {
      type: "string",
      default: "none",
    },
  },
  // Give some demo content to the object
  example: {
    attributes: {
      content: "Hello Universe!",
      alignment: "left",
    },
  },
  edit: (props) => {
    // Get the attributes from the props
    const {
      attributes: { content, alignment },
      setAttributes,
      className,
    } = props;
    // Set the onChange event a la react
    const onChangeContent = (newContent) =>
      setAttributes({ content: newContent });

    const onChangeAlignment = (newAlignment) => {
        console.log(newAlignment);
      setAttributes({
        alignment: newAlignment === undefined ? "none" : newAlignment,
      });
    };
    // Return the React component to the editor
    return (
      <div>
        {
          /**
           * Use the imported blockControls element to
           * tell the editor to display the alignment toolbar and pass the functionn
           * to use as a callback in the props.
           */
          <BlockControls>
            <AlignmentToolbar value={alignment} onChange={onChangeAlignment} />
          </BlockControls>
        }
        <RichText
          tagName="p"
          // Assign the text alignment using style attribute
          style={{ textAlign: alignment }}
          className={className}
          onChange={onChangeContent}
          value={content}
        />
      </div>
    );
  },
  // Just return the component on the save function
  save: (props) => (
    <RichText.Content
      tagName="p"
      value={props.attributes.content}
      className={`ms-flex-row-${props.attributes.alignment}`}
    />
  ),
});
