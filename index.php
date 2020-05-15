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

     wp_register_style(
         'gutenberg_flex_row_editor',
         plugins_url('css/editor.css', __FILE__),
         array( 'wp-edit-blocks' ),
         filemtime( plugin_dir_path( __FILE__ ) )
     );
     
     wp_register_style(
         'gutenberg_flex_row',
         plugins_url('css/style.css', __FILE__),
         array( ),
         filemtime( plugin_dir_path( __FILE__ ) )
     );
     
     register_block_type('gutenberg-examples/gutenberg-flex-row', array(
         'style'            =>  'gutenberg_flex_row',
         'editor_style'     =>  'gutenberg_flex_row_editor',
         'editor_script'    =>  'gutenberg_flex_row'
     ));
     
 };
 add_action('init', 'gutenberg_flex_row_register_block');