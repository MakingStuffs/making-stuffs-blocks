import { registerBlockType } from "@wordpress/blocks";

registerBlockType("gutenberg-examples/flex-row", {
  title: "Example: Basic",
  icon: "universal-access-alt",
  category: "layout",
  example: {},
  edit({ className }) {
    return <p className={className}>Hey there from the green editor</p>;
  },
  save() {
    return <p>Hey there front end is red</p>;
  },
});
