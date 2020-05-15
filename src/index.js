import { registerBlockType } from '@wordpress/blocks';

registerBlockType( 'myguten/test-block', {
    title: 'Basic Example',
    icon: 'smiley',
    category: 'layout',
    edit: () => <div>Howdy, Ma'am</div>,
    save: () => <div>Howdy, Ma'am</div>
});