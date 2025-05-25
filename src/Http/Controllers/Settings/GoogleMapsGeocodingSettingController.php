<?php

namespace FriendsOfBotble\GoogleMapsGeocoding\Http\Controllers\Settings;

use Botble\Setting\Http\Controllers\SettingController;
use FriendsOfBotble\GoogleMapsGeocoding\Forms\Settings\GoogleMapsGeocodingSettingForm;
use FriendsOfBotble\GoogleMapsGeocoding\Http\Requests\Settings\GoogleMapsGeocodingSettingRequest;

class GoogleMapsGeocodingSettingController extends SettingController
{
    public function edit()
    {
        $this->pageTitle(trans('plugins/fob-google-maps-geocoding::geocoding.settings.title'));

        return GoogleMapsGeocodingSettingForm::create()->renderForm();
    }

    public function update(GoogleMapsGeocodingSettingRequest $request)
    {
        return $this->performUpdate($request->validated());
    }
}
