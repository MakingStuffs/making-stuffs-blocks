<?php 
/**
 * Plugin Name: Gutenberg Flex Row Block
 */

 function gutenberg_flex_row_register_block() {
     $assets_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php' );

     wp_register_script(
         'gutenberg_flex_row',
         plugins_url('/build/index.js', __FILE__),
         $assets_file['dependencies'],
         $assets_file['version']
     );

     register_block_type('gutenberg-examples/gutenberg-flex-row', array(
         'editor_script'    =>  'gutenberg_flex_row'
     ));
 };
 add_action('init', 'gutenberg_flex_row_register_block');