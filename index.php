<?php

/**
 * Plugin Name: Making Stuffs Blocks
 * Plugin URI: https://makingstuffs.co.uk/making-stuffs-blocks
 * Description: A collection of simple reusable Gutenberg blocks which can be used throughout 
 * your website to alter its display.
 * Version: 0.0.6
 * Author: Making Stuffs
 * Author URI: https://makingstuffs.co.uk
 * Licence: MIT
 * Text Domain: msblocks
 * 
 */

function msblocks_register () {

    $assets_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php' );
    
    wp_register_script(
        'msblocks-script', 
        plugins_url('/build/index.js', __FILE__),
        array('wp-editor'),
        $assets_file['dependencies'],
        $assets_file['version']
    );

    wp_register_style(
        'msblocks-style',
        plugins_url('/build/css/style.css', __FILE__),
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'build/css/style.css')
    );

    wp_register_style(
        'msblocks-style-editor',
        plugins_url('/build/css/editor.css', __FILE__),
        array( 'wp-edit-blocks' ),
        filemtime(plugin_dir_path(__FILE__) . 'build/css/editor.css')
    );

    register_block_type('msblocks/ms-blocks', array(
        'style'         =>  'msblocks-style',
        'editor_style'  =>  'msblocks-style-editor',
        'editor_script' =>  'msblocks-script'
    ));
};

add_action('init', 'msblocks_register');