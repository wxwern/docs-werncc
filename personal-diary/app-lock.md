# App Lock

Afraid of prying eyes? Personal Diary can help by providing a passcode lock for the app, with support for biometrics unlock via Face ID and Touch ID.

![Passcode Screen]()

## Configuration

To set up, change, or reset your passcode (password), simply navigating to **Biometrics and Passcode** under app settings and set your preferences!

![Biometrics and Passcode Settings Page]()

Note that Personal Diary for watchOS does not support App Lock.

If you forgot your passcode, you can attempt to reset it under **Recovery Mode** (accessible under app settings, or the passcode panel when locked).

!> **Warning:** Please refrain from forgetting your passcode. Recovery Mode may still require authentication or have insufficient information to verify your identity, and thus may not be able to reset your passcode depending on your configuration and app state.

## Implementation Notes

As of the current release, App Lock offers privacy by preventing trivial access to the app's data. Personal Diary still relies on other aspects of your device and account security to secure your diary data, yet providing fast access. Notably:

?> All diary data _accessible locally_ is **secured by your device password**, and encrypted with [**Apple's Data Protection**](https://support.apple.com/en-gb/guide/security/secf6276da8a/web) [(Class A: Complete Protection)](https://support.apple.com/en-gb/guide/security/secb010e978a/1/web/1) if possible.

?> All diary data _stored on iCloud_ is **secured by your Apple ID login credentials**, and encryption level depending on if you have [**iCloud Advanced Data Protection**](https://support.apple.com/en-gb/guide/security/sec973254c5f/web) turned on.

!> Turning on **Apple Watch Sync** on your iPhone **downgrades Apple's Data Protection security** to 'Class C: Protected Until First User Authentication' on the iPhone, in order for background sync between an Apple Watch and a locked iPhone to occur.

Aside from system encryption, app-level encryption is planned to follow in a future release of Personal Diary, at the expense of disabling password resets and poorer read-write performance.


