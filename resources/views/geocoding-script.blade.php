<script>
    window.GoogleMapsGeocodingConfig = {
        apiKey: '{{ $apiKey }}',
        autoFill: {{ $autoFill ? 'true' : 'false' }},
        messages: {
            error: '{{ trans('plugins/fob-google-maps-geocoding::geocoding.geocoding.error') }}',
            noResults: '{{ trans('plugins/fob-google-maps-geocoding::geocoding.geocoding.no_results') }}',
            apiError: '{{ trans('plugins/fob-google-maps-geocoding::geocoding.geocoding.api_error') }}',
            success: '{{ trans('plugins/fob-google-maps-geocoding::geocoding.geocoding.success') }}'
        }
    };
</script>
<script src="https://maps.googleapis.com/maps/api/js?key={{ $apiKey }}&libraries=places" async defer></script>
