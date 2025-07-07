<?php

namespace FriendsOfBotble\GoogleMapsGeocoding\Providers;

use Botble\Base\Facades\Assets;
use Illuminate\Support\ServiceProvider;

class HookServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        add_action(BASE_ACTION_META_BOXES, [$this, 'addGeocodingAssets'], 120);
        add_filter(BASE_FILTER_FOOTER_LAYOUT_TEMPLATE, [$this, 'addGeocodingScript'], 120);
        add_filter('real_estate_dashboard_header', [$this, 'addGeocodingScript'], 120);
        add_filter('job_board_dashboard_header', [$this, 'addGeocodingScript'], 120);
    }

    public function addGeocodingAssets(): void
    {
        if (! setting('fob_google_maps_geocoding_enabled', false)) {
            return;
        }

        $apiKey = setting('fob_google_maps_geocoding_api_key');

        if (! $apiKey) {
            return;
        }

        Assets::addStylesDirectly([
            'vendor/core/plugins/fob-google-maps-geocoding/css/geocoding.css',
        ])
            ->addScriptsDirectly([
                'vendor/core/plugins/fob-google-maps-geocoding/js/geocoding.js',
            ]);
    }

    public function addGeocodingScript(?string $html): ?string
    {
        if (! setting('fob_google_maps_geocoding_enabled', false)) {
            return $html;
        }

        $apiKey = setting('fob_google_maps_geocoding_api_key');

        if (! $apiKey) {
            return $html;
        }

        return $html . view('plugins/fob-google-maps-geocoding::geocoding-script', [
                'apiKey' => $apiKey,
                'autoFill' => setting('fob_google_maps_geocoding_auto_fill', true),
            ])->render();
    }
}
