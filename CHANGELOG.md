# Release Notes

## [1.0.0] - 2024-12-19

### Added
- Initial release of FOB Google Maps Geocoding plugin
- **Google Places Autocomplete**: Real-time address suggestions as you type
- **Automatic geocoding**: Instant coordinate population from autocomplete selection
- Google Maps API integration for latitude/longitude retrieval
- Settings page for API key configuration
- Auto-fill toggle for coordinates
- Manual geocoding button for fallback scenarios
- **Styled autocomplete dropdown**: Custom CSS for better UX
- Error handling for various API response states
- Support for Google Maps Geocoding API and Places API
- Multi-language support (English included)
- Proper permission system integration
- Asset publishing system
- Compatible with Botble CMS 7.5.0+

### Features
- **Places Autocomplete**: Smart address suggestions with instant geocoding
- **Dual API Support**: Uses both Places API and Geocoding API
- **Fallback Geocoding**: Manual geocoding for typed addresses
- **Smart Detection**: Only geocodes when coordinates are missing
- **Configurable**: Enable/disable features through admin panel
- **Error Handling**: Graceful handling of API errors and quota limits
- **User-Friendly**: Styled dropdown, clear notifications, and loading states
- **Secure**: API key configuration through admin panel
- **Performance Optimized**: Efficient API usage with smart fallbacks

### Technical Details
- Follows Friends of Botble plugin structure
- Uses modern JavaScript ES6+ features
- Integrates with existing Botble notification system
- Proper namespace: `FriendsOfBotble\GoogleMapsGeocoding`
- Settings stored with `fob_` prefix for consistency
- Compatible with existing PropertyForm without modifications
