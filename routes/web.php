<?php

use Botble\Base\Facades\AdminHelper;
use FriendsOfBotble\GoogleMapsGeocoding\Http\Controllers\Settings\GoogleMapsGeocodingSettingController;
use Illuminate\Support\Facades\Route;

AdminHelper::registerRoutes(function () {
    Route::group(['prefix' => 'settings/fob-google-maps-geocoding', 'as' => 'fob-google-maps-geocoding.'], function () {
        Route::get('/', [GoogleMapsGeocodingSettingController::class, 'edit'])->name('settings');
        Route::put('/', [GoogleMapsGeocodingSettingController::class, 'update'])->name('settings.update');
    });
});
