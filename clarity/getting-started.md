# Getting Started

## Prerequisites

You'll first need to ensure you have installed these prerequisites for the instructions below to work.

- [**yabai**](https://github.com/koekeishiya/yabai)
  - Minimally for retrieving window and workspace information.
  - Will require yabai's scripting addition if you want the widget to respond to clicks on the workspace and app icons.
- [**Übersicht**](https://github.com/felixhageloh/uebersicht)
  - For displaying this very widget.
- [**SF Pro**](https://developer.apple.com/fonts/) and [**SF Symbols**](https://developer.apple.com/sf-symbols/)
  - Apple's San Francisco font and symbols to mimic system styles.
  - May be available by default. If the font doesn't match the system font, or symbols don't appear automatically, you will need to download them.
- **Git**
  - For easy downloading of the source code and to update it anytime.
  - Should be available by default (or will be auto-prompted by macOS to download alongside Xcode CLI Tools if you run any `git` command).
  - May be omitted if you prefer to [manually download the zip from the GitHub page](https://github.com/wxwern/clarity) and unpack it in the Übersicht widgets folder.

## Setup & Installation

Setting up `clarity` is easy. Once you have the prerequisites down, clone this repo to your Übersicht widgets directory.

```sh
$ git clone https://github.com/wernjie/clarity $HOME/Library/Application\ Support/Übersicht/widgets/clarity
```

The default configurations should work immediately. If needed, you may perform basic customisations to settings at `lib/settings.jsx`.

Once you're done updating the designs, take note that we're not done yet! `clarity` tries to operate efficiently - it actually requires you to set up subscriptions to [yabai signals](https://github.com/koekeishiya/yabai/wiki/Commands#automation-with-rules-and-signals), which is more efficient than repeated polling for state changes. Hence, include the following at the end of `.yabairc`, depending on what you have configured:

```sh
# clarity config updates
REL_SPACES_IND="osascript -e 'tell application id \"tracesof.Uebersicht\" to refresh widget id \"clarity-spaces-jsx\"'"
REL_BAR_IND="osascript -e 'tell application id \"tracesof.Uebersicht\" to refresh widget id \"clarity-bar-jsx\"'"

# - if space indicators are enabled
yabai -m signal --add event=space_changed   action="$REL_SPACES_IND"
yabai -m signal --add event=display_changed action="$REL_SPACES_IND"
# - if app icon indicators within space indicators are enabled
yabai -m signal --add event=window_created   action="$REL_SPACES_IND"
yabai -m signal --add event=window_moved     action="$REL_SPACES_IND"
yabai -m signal --add event=window_resized   action="$REL_SPACES_IND"
yabai -m signal --add event=window_destroyed action="$REL_SPACES_IND"
yabai -m signal --add event=window_minimized   action="$REL_SPACES_IND"
yabai -m signal --add event=window_deminimized action="$REL_SPACES_IND"
yabai -m signal --add event=application_hidden action="$REL_SPACES_IND"
yabai -m signal --add event=application_visible action="$REL_SPACES_IND"
yabai -m signal --add event=mission_control_exit action="$REL_SPACES_IND"

# - if center space indicators are enabled
yabai -m signal --add event=space_changed    action="$REL_BAR_IND"
yabai -m signal --add event=display_changed  action="$REL_BAR_IND"
# - if window titles or app names are enabled
yabai -m signal --add event=window_focused              action="$REL_BAR_IND"
yabai -m signal --add event=window_title_changed        action="$REL_BAR_IND"
yabai -m signal --add event=application_front_switched  action="$REL_BAR_IND"
# - if wallpaper blur is enabled
yabai -m signal --add event=window_created   action="$REL_BAR_IND"
yabai -m signal --add event=window_moved     action="$REL_BAR_IND"
yabai -m signal --add event=window_resized   action="$REL_BAR_IND"
yabai -m signal --add event=window_destroyed action="$REL_BAR_IND"
yabai -m signal --add event=window_minimized   action="$REL_BAR_IND"
yabai -m signal --add event=window_deminimized action="$REL_BAR_IND"
yabai -m signal --add event=application_hidden action="$REL_BAR_IND"
yabai -m signal --add event=application_visible action="$REL_BAR_IND"
yabai -m signal --add event=mission_control_exit action="$REL_BAR_IND"

# refresh immediately on yabai load
osascript -e "$REL_SPACES_IND"
osascript -e "$REL_BAR_IND"
```

Now enjoy using `clarity`!

## Other Notes

?> Find more information about `clarity` on [GitHub](https://github.com/wxwern/clarity)!

!> Your wallpaper should not be too busy or too bright, as this status bar is only designed with a dark background in mind.




