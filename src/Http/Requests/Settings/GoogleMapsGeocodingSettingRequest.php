<?php

namespace FriendsOfBotble\GoogleMapsGeocoding\Http\Requests\Settings;

use Botble\Support\Http\Requests\Request;

class GoogleMapsGeocodingSettingRequest extends Request
{
    public function rules(): array
    {
        return [
            'fob_google_maps_geocoding_api_key' => ['nullable', 'string', 'max:255'],
            'fob_google_maps_geocoding_enabled' => ['nullable', 'boolean'],
            'fob_google_maps_geocoding_auto_fill' => ['nullable', 'boolean'],
        ];
    }
}
