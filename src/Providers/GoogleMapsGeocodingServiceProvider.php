<?php

namespace FriendsOfBotble\GoogleMapsGeocoding\Providers;

use Botble\Base\Facades\PanelSectionManager;
use Botble\Base\PanelSections\PanelSectionItem;
use Botble\Base\Traits\LoadAndPublishDataTrait;
use Botble\Setting\PanelSections\SettingOthersPanelSection;
use Illuminate\Support\ServiceProvider;

class GoogleMapsGeocodingServiceProvider extends ServiceProvider
{
    use LoadAndPublishDataTrait;

    public function boot(): void
    {
        $this->setNamespace('plugins/fob-google-maps-geocoding')
            ->loadAndPublishConfigurations(['permissions'])
            ->loadAndPublishTranslations()
            ->loadAndPublishViews()
            ->publishAssets()
            ->loadRoutes();

        PanelSectionManager::default()->beforeRendering(function (): void {
            PanelSectionManager::registerItem(
                SettingOthersPanelSection::class,
                fn () => PanelSectionItem::make('fob-google-maps-geocoding')
                    ->setTitle(trans('plugins/fob-google-maps-geocoding::geocoding.settings.title'))
                    ->withIcon('ti ti-map-pin')
                    ->withDescription(trans('plugins/fob-google-maps-geocoding::geocoding.settings.description'))
                    ->withPriority(190)
                    ->withRoute('fob-google-maps-geocoding.settings')
            );
        });

        $this->app->booted(function () {
            $this->app->register(HookServiceProvider::class);
        });
    }
}
