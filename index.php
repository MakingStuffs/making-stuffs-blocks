<?php

/**
 * Plugin Name: Making Stuffs Blocks
 * Plugin URI: https://github.com/MakingStuffs/making-stuffs-blocks
 * Description: A collection of simple reusable Gutenberg blocks which can be used throughout 
 * your website to alter its display.
 * Version: 0.0.13
 * Author: Making Stuffs
 * Author URI: https://makingstuffs.co.uk
 * Licence: MIT
 * Text Domain: msblocks
 * 
 */

class MSBlocksRenderProduct
{
    public static function render($attributes, $content)
    {
        global $post;

        $product_grid = self::build_product_grid($attributes);
        $pagination = self::get_pagination();
        $sorting = self::get_sorting();
        $categories_obj = self::get_product_categories();
        $categories_array = array();
        $product_tags = self::get_product_tags($attributes);
        $price_filter = self::build_price_filter($attributes['filters']);

        foreach ($categories_obj as $category) {
            array_push($categories_array, $category->name);
        };

        update_post_meta($post->ID, 'categories', $categories_array);

        $output = '<div class="wp-block-msblocks-filterable-products-by-category">'
            . '<div class="msblocks-product-filtering">'
            . '<h3>Filter Products</h3>'
            . '<div class="msblocks-product-filtering__row">'
            . $product_tags
            . $price_filter
            . '</div>'
            . '</div>'
            . '<div class="msblocks-sorting">'
            . $sorting
            . $pagination
            . '</div>';
        $output .= '<div class="msblocks-products-by-category">' . $product_grid . '</div>';
        $output .= '<div class="msblocks-sorting">'
            . $sorting
            . $pagination
            . '</div>'
            . '</div>';
        return $output;
    }

    public static function get_product_categories()
    {
        $args = array(
            'taxonomy'      => 'product_cat',
            'hide_empty'    => true
        );
        return get_terms($args);
    }

    public static function get_products_by_category($category)
    {
        if (!$category) return null;
        return wc_get_products(array('category' => array($category), 'paginate' =>  true, 'limit' => 4));
    }

    protected static function build_product_grid($attributes)
    {
        $paged = (get_query_var('paged')) ? absint(get_query_var('paged')) : 1;
        $ordering = WC()->query->get_catalog_ordering_args();
        $ordering['orderby'] = array_shift(explode(' ', $ordering['orderby']));
        $ordering['orderby'] = stristr($ordering['orderby'], 'price') ? 'meta_value_num' : $ordering['orderby'];
        $products_per_page = apply_filters('loop_shop_per_page', $attributes['rows'] * $attributes['columns']);
        $loop_args = array(
            'category'      => array($attributes['category']),
            'paginate'      => true,
            'limit'         => $products_per_page,
            'page'          => $paged,
            'orderby'       => $ordering['orderby'],
            'order'         =>  $ordering['order'],
            'price_filter'  =>  array(
                'min'       =>  !empty($_GET['price_min']) ? absint($_GET['price_min']) : $attributes['filters']['price_min'],
                'max'       =>  !empty($_GET['price_max']) ? absint($_GET['price_max']) : $attributes['filters']['price_max']
            ),
        );

        if (!empty($_GET['tag_name'])) {
            $loop_args['tag'] = array('tag' => $_GET['tag_name']);
        }

        $products = wc_get_products($loop_args);

        wc_set_loop_prop('current_page', $paged);
        wc_set_loop_prop('is_paginated', wc_string_to_bool(true));
        wc_set_loop_prop('page_template', get_page_template_slug());
        wc_set_loop_prop('per_page', $products_per_page);
        wc_set_loop_prop('total', $products->total);
        wc_set_loop_prop('total_pages', $products->max_num_pages);

        if ($products) {

            $output = '<div class="msblocks-grid" rows=' . $attributes['rows'] . ' columns=' . $attributes['columns'] . '>';

            foreach ($products->products as $product) {
                $name = $product->name;
                $image_id = $product->image_id;
                $is_on_sale = $product->is_on_sale();
                $price_html = $product->get_price_html();
                $url = $product->get_permalink();
                $tags = get_the_terms($product->get_id(), 'product_tag');

                $output .= '<div class="msblocks-grid__tile">'
                    . '<div class="thumbnail">'
                    . '<a href="' . $url . '" title="View ' . $name . '">';
                if ($is_on_sale) {
                    $output .= '<span class="onsale">sale</span>';
                }
                $output .= '<picture>'
                    . '<img src="' . wp_get_attachment_image_url($image_id, array(400, 400))
                    . '"  alt="Picture of ' . $name . '"/>'
                    . '</picture>'
                    . '</a>'
                    . '</div>'
                    . '<div class="content">'
                    . '<h3>' . $name . '</h3>'
                    . '<p>'
                    . '</h3>'
                    . $price_html . '</p>'
                    . '<a href="' . $url . '" class="button" title="View ' . $name . '">'
                    . 'More Info'
                    . '</a>'
                    . '</div>'
                    . '</div>';
            }
            wp_reset_postdata();

            $output .= '</div>';
        } else {
            return __('No Products Mush', 'msblocks');
        }

        return $output;
    }

    public static function get_pagination()
    {
        ob_start();
        woocommerce_pagination();
        return ob_get_clean();
    }

    public static function get_sorting()
    {
        ob_start();
        woocommerce_catalog_ordering();
        return ob_get_clean();
    }

    protected static function get_product_tags($attributes)
    {
        $tag_array = array();
        $all_products = wc_get_products(array(
            'category'   =>  $attributes['category'],
            'limit'      => -1,
            'price_filter'  =>  array(
                'min'       =>  !empty($_GET['price_min']) ? absint($_GET['price_min']) : $attributes['filters']['price_min'],
                'max'       =>  !empty($_GET['price_max']) ? absint($_GET['price_max']) : $attributes['filters']['price_max']
            )
        ));

        if (!empty($all_products)) {
            foreach ($all_products as $product) {
                $tags = get_the_terms($product->get_id(), 'product_tag');
                foreach ($tags as $tag) {
                    if ($tag_array[$tag->name]) {
                        $tag_array[$tag->name]['count'] = $tag_array[$tag->name]['count'] + 1;
                    } else {
                        $tag_array[$tag->name] = array(
                            'name'      => $tag->name,
                            'count'     => 1
                        );
                    }
                }
            }
        }
        wp_reset_postdata();

        $return_list = '<div class="msblocks-product-filtering-tags">'
            . '<select class="msblocks-product-filtering-tags__list" data-key="tag_name">';
            if (empty($_GET['tag_name'])) {
                $return_list .= '<option class="msblocks-product-filtering-tags__item" selected="selected" active data-key="tag_name" value="null">Select Tag</option>';
            } else {
                $return_list .= '<option class="msblocks-product-filtering-tags__item" value="null" data-key="tag_name">Select Tag</option>';
            }
        foreach ($tag_array as $index => $tag) {
            if (isset($attributes['tagLimit']) && $index >= $attributes['tagLimit']) {
                break;
            }
            if($_GET['tag_name'] === $tag['name']) {
                $return_list .= '<option active selected="selected" class="msblocks-product-filtering-tags__item" data-tag="' . $tag['name'] . '" value="tag_name=' . rawurlencode($tag['name']) . '" data-key="tag_name">'
                    . ucfirst($tag['name']) . ' (' . $tag['count'] . ')'
                    . '</option>';
            } else {
                $return_list .= '<option class="msblocks-product-filtering-tags__item" value="tag_name=' . rawurlencode($tag['name']) . '" data-key="tag_name">'
                    . ucfirst($tag['name']) . ' (' . $tag['count'] . ')'
                    . '</option>';
            }
        }

        $return_list .= '</select>'
            . '</div>';

        return $return_list;
    }

    protected static function build_price_filter($filters)
    {
        $min = !empty($_GET['price_min']) ? $_GET['price_min'] : $filters['price_min'];
        $max = !empty($_GET['price_max']) ? $_GET['price_max'] : $filters['price_max'];
        $output = '<div class="msblocks-product-filtering-price">'
            . '<label>Min: <input data-query="price_min" class="msblocks-product-filtering-price__input" value="'
            . $min
            . '" type="number" /></label>'
            . '<label>Max: <input data-query="price_max" class="msblocks-product-filtering-price__input" value="'
            . $max
            . '"type="number" /></label>'
            . '<input id="submit_msblocks_price_query" type="submit" value="Submit" data-query="price_min=' . $min . '&price_max=' . $max . '"/>'
            . '</div>';

        return $output;
    }

    private static function get_active_filters()
    {
        $active_filters = array();

        if (isset($_GET['price_min']) && isset($_GET['price_max'])) {
            $active_filters['price'] = array(
                'min'       =>  $_GET['price_min'],
                'max'       =>  $_GET['price_max']
            );
        }

        if (!empty($_GET['tag_name'])) {
            $active_filters['tag_name'] = $_GET['tag_name'];
        }


        if (!empty($active_filters)) {
            $output = '<div class="msblocks-product-filtering-active">'
                . '<ul>';

            foreach ($active_filters as $key => $filter) {

                if ($key === 'price') {
                    $output .= '<li data-query="price_min='
                        . $filter['min']
                        . '&price_max='
                        . $filter['max']
                        . '" class="msblocks-product-filtering-active__item">'
                        . get_woocommerce_currency_symbol()
                        . $filter['min']
                        . ' to '
                        . get_woocommerce_currency_symbol()
                        . $filter['max']
                        . '</li>';
                } else {
                    $output .= '<li data-query="' . $key . '=' . rawurlencode($filter) . '" class="msblocks-product-filtering-active__item">'
                        . $filter
                        . '</li>';
                }
            }
            $output .= '</div>'
                . '</ul>';

            return $output;
        } else {
            $output = '<div class="msblocks-product-filtering-active">'
                . '<p>No filters are currently active</p>'
                . '</div>';

            return $output;
        }
    }
}

function msblocks_register()
{

    $assets_file = include(plugin_dir_path(__FILE__) . 'build/index.asset.php');
    $assets_file = include(plugin_dir_path(__FILE__) . 'build/bundle.asset.php');

    wp_register_script(
        'msblocks-script',
        plugins_url('/build/index.js', __FILE__),
        array('wp-editor'),
        $assets_file['dependencies'],
        $assets_file['version']
    );

    wp_register_script(
        'msblocks-frontend',
        plugins_url('/build/bundle.js', __FILE__),
        $assets_file['dependencies'],
        $assets_file['version']
    );

    register_block_type('msblocks/ms-blocks', array(
        'style'             =>  'msblocks-style',
        'script'            =>  'msblocks-frontend',
        'editor_style'      =>  'msblocks-style-editor',
        'editor_script'     =>  'msblocks-script',
    ));

    wp_register_style(
        'msblocks-style',
        plugins_url('/build/css/style.css', __FILE__),
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'build/css/style.css')
    );

    wp_register_style(
        'msblocks-style-editor',
        plugins_url('/build/css/editor.css', __FILE__),
        array('wp-edit-blocks'),
        filemtime(plugin_dir_path(__FILE__) . 'build/css/editor.css')
    );
};
add_action('init', 'msblocks_register');

function msblocks_dynamic_block_register()
{
    register_meta('post', 'categories', array(
        'type'              => 'array',
        'single'            => true,
        'description'       => 'a description',
        'show_in_rest'      => array(
            'schema'        => array(
                'type'      => 'array',
                'items'     => array(
                    'type'  => 'string'
                )
            )
        )
    ));

    register_block_type(
        'msblocks/filterable-products-by-category',
        array(
            'render_callback'   => array('MSBlocksRenderProduct', 'render'),
            'attributes'        => array(
                'rows'          => array(
                    'type'      => 'number',
                    'default'   => 1
                ),
                'columns'       => array(
                    'type'      => 'number',
                    'default'   => 2
                ),
                'category'      => array(
                    'type'      => 'string',
                    'default'   => 'clothing'
                ),
                'isEditing'     => array(
                    'type'      => 'boolean',
                    'default'   => false
                ),
                'categories'    => array(
                    'type'      => 'array',
                    'source'    => 'meta',
                    'meta'      => 'categories'
                ),
                'filters'       => array(
                    'type'      => 'object',
                    'default'   => array(
                        'price_min'   =>  0,
                        'price_max'   =>  100
                    )
                ),
                'tagLimit'      => array(
                    'type'      => 'number',
                    'default'   => 10
                )
            )
        )
    );
}
add_action('init', 'msblocks_dynamic_block_register');

/**
 * Add a custom query parameter for the price to the wc_get_products function
 */
function msblocks_handle_product_price_query($query, $query_vars)
{

    // Is the value existent?
    if (!empty($query_vars['price_filter'])) {
        // If so add index to meta_query on the product object
        $query['meta_query'][] = array(
            'key'       => '_price',
            'value'     => array($query_vars['price_filter']['min'], $query_vars['price_filter']['max']),
            'compare'   =>  'BETWEEN',
            'type'      => 'NUMERIC'
        );
    }

    return $query;
}
add_filter('woocommerce_product_data_store_cpt_get_products_query', 'msblocks_handle_product_price_query', 10, 2);
