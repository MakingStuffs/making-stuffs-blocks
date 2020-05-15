import { registerBlockType } from '@wordpress/blocks';

const blockStyle = {
    backgroundColor: '#900',
    color: '#fff',
    padding: '20px'
};

registerBlockType( 'gutenberg-examples/flex-row', {
    title: 'Example: Basic',
    icon: 'universal-access-alt',
    category: 'layout',
    example: {},
    edit: () => <div style={ blockStyle }>Howdy, Ma'am</div>,
    save: () => <div style={ blockStyle }>Howdy, Ma'am</div>
});