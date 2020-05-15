import { registerBlockType } from "@wordpress/blocks";

registerBlockType("gutenberg-examples/flex-row", {
  title: "Example: Basic",
  icon: "universal-access-alt",
  category: "layout",
  // Tell WP scripts what we would like to get in the attributes object passed as props
  // Below tells to get the content of the saved elements paragraph content
  attributes: {
    content: {
        type: 'array',
        source: 'children',
        selector: 'p'
    }
  },
  // Give some demo content to the object
  example: {
      attributes: {
          content: 'Hello Universe!'
      }
  }, 
  edit: ( props ) => {
    // Get the attributes from the props
    const { attributes: { content }, setAttributes, className } = props;
    // Set the onChange event a la react
    const onChangeContent = newContent => setAttributes({ content: newContent });
    // Return the React component to the editor
    return <RichText 
        tagName="p"
        className={ className }
        onChange={ onChangeContent }
        value={ content }
    />;
  },
  // Just return the component on the save function
  save: props  => <RichText.content tagName="p" value={ props.attributes.content } />,
});
