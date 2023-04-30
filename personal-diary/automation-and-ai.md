# Automation and AI

There are a few useful automation and AI-related functionalities supported within the app. These can be found in the **Automation and AI** section in the app's settings.

## Auto Mood Detection

Utilising a custom machine learning model for emotion analysis, Personal Diary provides the ability to **automatically detect and select the corresponding mood that your entry text implies**, saving a step on writing your entries. This is done entirely on-device, so none of your private diary data is transmitted out for this purpose. You can always override the selected option manually.

?> This is only supported on English text.

?> This machine learning model requires iOS 14+, iPadOS 14+, macOS 11+ and watchOS 7+. Older systems uses a fallback with basic keyword analysis.

## Auto Weather Selection

Using geo-location data from GPS (via Location Services), or from your IP Address (via [ipinfo.io](https://ipinfo.io/)), Personal Diary can **automatically look up and set the current weather conditions** (via [OpenWeatherMap](https://openweathermap.org/)) for the current entry you're writing.

?> Auto weather selection is only available for _current_ weather conditions, not the past and future.

## Siri Integration

Personal Diary has basic experimental integration with Siri features, like Siri Shortcuts and Suggestions.

### Siri Shortcuts

Check out the available options in the **Siri Shortcuts app**.

### Siri Voice Command

The app exposes itself as a "note-taking app" to Siri. Thus, something like:

> Hey Siri, write a note in Personal Diary stating today is a great day

Would create an entry with **'today is a great day'** as its contents.

### Siri Suggestions

If you, for instance, open the app or create an entry consistently at a certain place or time, **Siri may automatically suggest you these actions when the time is right**. For instance, in Spotlight, as a notification on the Lock Screen, a pop up in the App Switcher, in the App Library, and more.

This is configured under **System Settings** &rarr; **Siri &amp; Search**. Note that there are global settings and per-app settings there.
