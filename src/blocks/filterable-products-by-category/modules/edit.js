import { __ } from "@wordpress/i18n";
import { withSelect, select } from "@wordpress/data";
import ServerSideRender from "@wordpress/server-side-render";
import { InspectorControls } from "@wordpress/block-editor";
import {
  PanelBody,
  PanelRow,
  RangeControl,
  Placeholder,
  MenuGroup,
  MenuItemsChoice,
} from "@wordpress/components";

import metadata from "../block.json";

const { name, attributes } = metadata;

const EmptyPlaceholder = (props) => {
  return (
    <Placeholder label={__("Filterable Products by Category", "msblocks")}>
      {__("You aint put no products", "msblocks")}
    </Placeholder>
  );
};

export default (props) => {
  const {
    attributes: {
      columns,
      rows,
      category,
      categories,
      tagLimit,
      filters
    },
    setAttributes,
  } = props;

  const filterInputs = document.querySelectorAll('.msblocks-price-filter__input');
  filterInputs.forEach(input => addEventListener('change', (event) => {
    console.log(event);
  }));

  console.log(filterInputs);
  
  return (
    <>
      <InspectorControls>
        <PanelBody title="Select Category" initialOpen={false}>
          <MenuGroup>
            <MenuItemsChoice
              choices={categories.map((category) => ({
                value: category,
                label: category,
              }))}
              value={category}
              onSelect={(category) => setAttributes({ category })}
            />
          </MenuGroup>
        </PanelBody>
        <PanelBody title={`Arrangement`} initialOpen={false}>
          <PanelRow>
            <RangeControl
              label="Columns"
              min={1}
              max={4}
              value={columns}
              onChange={(columns) => setAttributes({ columns })}
            />
          </PanelRow>
          <PanelRow>
            <RangeControl
              label="Rows"
              min={1}
              max={4}
              value={rows}
              onChange={(rows) => setAttributes({ rows })}
            />
          </PanelRow>
        </PanelBody>
        <PanelBody title="Customise Filters" initialOpen={false}>
          <PanelRow>
            <RangeControl
              value={tagLimit}
              onChange={(tagLimit) => setAttributes({ tagLimit })}
              min={0}
              max={20}
              label="Tags"
            />
          </PanelRow>
            <PanelRow>
              <RangeControl
                value={!filters || !filters.price_min ? 0 : filters.price_min}
                min={0}
                max={100}
                onChange={(min) => setAttributes({ filters: {...filters, price_min: min } })}
                label="min"
              />
              </PanelRow><PanelRow>
              <RangeControl
                value={!filters || !filters.price_max ? 100 : filters.price_max}
                min={0}
                max={9999}
                onChange={(max) => setAttributes({ filters: {...filters, price_max: max  } })}
                label="max"
              />
            </PanelRow>
        </PanelBody>
      </InspectorControls>
      <ServerSideRender
        block={name}
        attributes={{
          rows,
          columns,
          category,
          isEditing: true,
          filters,
          tagLimit
        }}
        EmptyResponsePlaceholder={EmptyPlaceholder}
      />
    </>
  );
};
