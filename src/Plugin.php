<?php

namespace FriendsOfBotble\GoogleMapsGeocoding;

use Botble\PluginManagement\Abstracts\PluginOperationAbstract;
use Botble\Setting\Facades\Setting;

class Plugin extends PluginOperationAbstract
{
    public static function remove(): void
    {
        Setting::delete([
            'fob_google_maps_geocoding_api_key',
            'fob_google_maps_geocoding_enabled',
            'fob_google_maps_geocoding_auto_fill',
        ]);
    }
}
