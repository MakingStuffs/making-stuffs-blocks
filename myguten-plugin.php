<?php 
/**
 * Plugin Name: Some Plugin
 */

 function myguten_enqueue() {
     $assets_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php' );

     wp_register_script(
         'myguten-script',
         plugins_url('/build/index.js', __FILE__),
         $assets_file['dependencies'],
         $assets_file['version']
     );
 };
 add_action('enqueue_block_editor_assets', 'myguten_enqueue');