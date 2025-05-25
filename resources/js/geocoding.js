class GoogleMapsGeocoding {
    constructor() {
        this.config = window.GoogleMapsGeocodingConfig || {};
        this.geocoder = null;
        this.autocomplete = null;
        this.debounceTimer = null;
        this.debounceDelay = 1000; // 1 second delay

        this.init();
    }

    init() {
        // Wait for Google Maps API to load
        if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
            setTimeout(() => this.init(), 100);
            return;
        }

        this.geocoder = new google.maps.Geocoder();
        this.setupAutocomplete();
        this.bindEvents();
    }

    setupAutocomplete() {
        let locationField = document.querySelector('input[name="location"]');

        if (!locationField) {
            locationField = document.querySelector('input[name="address"]');
        }

        if (!locationField) {
            return;
        }

        // Initialize Places Autocomplete
        this.autocomplete = new google.maps.places.Autocomplete(locationField, {
            types: ['address'], // Restrict to addresses
            fields: ['place_id', 'geometry', 'name', 'formatted_address', 'address_components']
        });

        // Listen for place selection
        this.autocomplete.addListener('place_changed', () => {
            this.handlePlaceSelection();
        });

        // Style the autocomplete dropdown
        this.styleAutocompleteDropdown();
    }

    styleAutocompleteDropdown() {
        // Styles are now loaded via CSS file
        // This method is kept for any dynamic styling needs
    }

    handlePlaceSelection() {
        const place = this.autocomplete.getPlace();

        if (!place.geometry) {
            this.showMessage('No details available for this location', 'warning');
            return;
        }

        // Get coordinates
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        // Update coordinate fields
        this.updateCoordinates(lat, lng);

        // Update location field with formatted address if available
        let locationField = document.querySelector('input[name="location"]');

        if (!locationField) {
            locationField = document.querySelector('input[name="address"]');
        }

        if (place.formatted_address && locationField) {
            locationField.value = place.formatted_address;
        }

        this.showMessage(this.config.messages.success, 'success');
    }

    bindEvents() {
        let locationField = document.querySelector('input[name="location"]');

        if (!locationField) {
            locationField = document.querySelector('input[name="address"]');
        }

        const latitudeField = document.querySelector('input[name="latitude"]');
        const longitudeField = document.querySelector('input[name="longitude"]');

        if (!locationField || !latitudeField || !longitudeField) {
            return;
        }

        // Add geocoding button next to location field
        this.addGeocodingButton(locationField);

        // Manual geocoding fallback for typed addresses
        if (this.config.autoFill) {
            locationField.addEventListener('blur', (e) => {
                // Only geocode if autocomplete didn't handle it
                setTimeout(() => {
                    if (e.target.value.trim() && (!latitudeField.value || !longitudeField.value)) {
                        this.geocodeAddress(e.target.value);
                    }
                }, 300);
            });
        }
    }

    addGeocodingButton(locationField) {
        const wrapper = locationField.closest('.form-group') || locationField.parentElement;

        // Check if button already exists to prevent duplication
        if (wrapper.querySelector('.geocoding-button')) {
            return;
        }

        // Create button container
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'mt-2';

        // Create button
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn btn-info btn-sm geocoding-button';
        button.innerHTML = this.getMapPinIcon() + ' Get Coordinates';
        button.title = 'Get latitude and longitude for this location';

        // Add custom styles
        button.style.cssText = `
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 12px;
            padding: 6px 12px;
            border-radius: 4px;
            transition: all 0.2s ease;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        `;

        button.addEventListener('click', () => {
            const location = locationField.value.trim();
            if (location) {
                this.geocodeAddress(location);
            } else {
                this.showMessage('Please enter a location first', 'warning');
            }
        });

        // Add hover effects
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-1px)';
            button.style.boxShadow = '0 2px 6px rgba(0,0,0,0.15)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
        });

        buttonContainer.appendChild(button);
        wrapper.appendChild(buttonContainer);
    }

    getMapPinIcon() {
        // Return the SVG content for map-pin icon
        return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
            <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
        </svg>`;
    }

    debounceGeocode(address) {
        clearTimeout(this.debounceTimer);

        if (!address || address.length < 3) {
            return;
        }

        this.debounceTimer = setTimeout(() => {
            this.geocodeAddress(address);
        }, this.debounceDelay);
    }

    geocodeAddress(address) {
        if (!this.geocoder || !address.trim()) {
            return;
        }

        // Show loading state
        this.setLoadingState(true);

        this.geocoder.geocode({address: address}, (results, status) => {
            this.setLoadingState(false);

            if (status === 'OK' && results && results.length > 0) {
                const location = results[0].geometry.location;
                const lat = location.lat();
                const lng = location.lng();

                this.updateCoordinates(lat, lng);
                this.showMessage(this.config.messages.success, 'success');
            } else {
                let message = this.config.messages.noResults;

                if (status === 'OVER_QUERY_LIMIT') {
                    message = 'API quota exceeded. Please try again later.';
                } else if (status === 'REQUEST_DENIED') {
                    message = 'API request denied. Please check your API key.';
                } else if (status === 'INVALID_REQUEST') {
                    message = 'Invalid request. Please check the location.';
                }

                this.showMessage(message, 'error');
            }
        });
    }

    updateCoordinates(lat, lng) {
        const latitudeField = document.querySelector('input[name="latitude"]');
        const longitudeField = document.querySelector('input[name="longitude"]');

        if (latitudeField && longitudeField) {
            latitudeField.value = lat.toFixed(6);
            longitudeField.value = lng.toFixed(6);

            // Trigger change events
            latitudeField.dispatchEvent(new Event('change'));
            longitudeField.dispatchEvent(new Event('change'));
        }
    }

    setLoadingState(loading) {
        const button = document.querySelector('.geocoding-button');
        if (button) {
            if (loading) {
                button.disabled = true;
                button.innerHTML = this.getLoadingIcon() + ' Getting coordinates...';
                button.style.opacity = '0.7';
            } else {
                button.disabled = false;
                button.innerHTML = this.getMapPinIcon() + ' Get Coordinates';
                button.style.opacity = '1';
            }
        }
    }

    getLoadingIcon() {
        // Return the SVG content for loading spinner
        return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin">
            <path d="M21 12a9 9 0 11-6.219-8.56"/>
        </svg>`;
    }

    showMessage(message, type = 'info') {
        // Use existing notification system if available
        if (typeof Botble !== 'undefined' && Botble.showNotice) {
            Botble.showNotice(type, message);
        } else if (typeof toastr !== 'undefined') {
            toastr[type](message);
        } else {
            // Fallback to alert
            alert(message);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    if (window.GoogleMapsGeocodingConfig) {
        new GoogleMapsGeocoding();
    }
});

// Also initialize if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
        if (window.GoogleMapsGeocodingConfig) {
            new GoogleMapsGeocoding();
        }
    });
} else {
    if (window.GoogleMapsGeocodingConfig) {
        new GoogleMapsGeocoding();
    }
}
