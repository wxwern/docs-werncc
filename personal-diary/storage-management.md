# Storage Management

By navigating to **Personal Diary** &rarr; **Settings** &rarr; **Storage Location and Usage**, you can manage details about how your data is stored and check the amount of storage it currently uses.

![Storage Location and Usage Screenshot]()

## Storage Usage

As seen in the screenshot above, you can verify the amount of storage currently used by the app on your device (**Total Local and Cache Storage Used**), and free storage your device has that can be used immediately for operations like data exports (**Free Local Storage Available**).

The app cannot check the amount of storage stored in iCloud, but can let you know an estimate of what proportion of files have been downloaded. This is shown in **Data Availability** under "iCloud Storage State" as a percentage if you have incomplete data.

You must go to **System Settings** &rarr; [Your Name] &rarr; **iCloud** &rarr; **Manage Account Storage** to view the amount of storage Personal Diary occupies there.

## Storage Locations

There are two supported storage locations: **iCloud Drive** and **Local Storage**. Only <u>one</u> storage location may be active at any time.

As the names imply, Local Storage keeps all your data locally on your device, while iCloud Drive saves data in your Apple ID. 

?> **Hint:** You must use iCloud Drive to enjoy [iCloud Sync](/personal-diary/sync-and-handoff).

### Migrating Data between Storage Locations

If you choose to change your storage location only after using the app for a while, you may need to migrate your data.

Your data can be migrated **between iCloud Drive and Local Storage**.

The storage location you're currently using will be called your **"Active Storage Location"**, and is the option set in **Storage Location and Usage** under app settings (and may be changed automatically if you change System Settings).

This process may take a while, and consider backing up your data before performing mass-migrations.

#### Local Storage &rarr; iCloud Drive

Suppose you initially have data on Local Storage and want to use iCloud to enjoy cross-device sync, so you sign in to your Apple ID and enable iCloud Drive.

When you next open the app, the app's active location has changed, and will restart with the [Multi-Journal Picker](/personal-diary/multiple-journals), showing two segments: **Journals on iCloud**, and **Inactive Journals on Local Storage**.

![Journal Picker Multi Storage Location Screenshot]()

Selecting journals in your active storage location (if you have any) opens it as per usual, but you cannot open inactive journals. Doing the latter will prompt you to either migrate or chanage storage locations.

![Journal Picker Inactive Journal Screenshot]()

You can then choose to migrate the entire journal to your active storage location (in this case, from Local Storage to iCloud Drive).

!> **Warning:** Make sure you have enough free space on iCloud to keep your diary data before performing the migration to avoid unintended data loss. The app cannot determine the amount of free space available in iCloud automatically.

#### iCloud Drive &rarr; Local Storage

Suppose you no longer want to use iCloud and want to remove your data from your Apple ID. Thus, you want to move data from iCloud Drive to your Local Storage.

You navigate to Personal Diary &rarr; Settings &rarr; Storage Location &amp; Usage, and **verify that all your data has been downloaded** from iCloud via the **Data Availability** indicator.

Next, in the same page, you set the location to **Local Storage**. Once done, the app reloads, showing the [Multi-Journal Picker](/personal-diary/multiple-journals) with two segments: **Journals on iCloud**, and **Inactive Journals on Local Storage**.

![Journal Picker Multi Storage Location Screenshot]()

Selecting journals in your active storage location (if you have any) opens it as per usual, but you cannot open inactive journals. Doing the latter will prompt you to either migrate or chanage storage locations.

![Journal Picker Inactive Journal Screenshot]()

You can then choose to migrate the entire journal to your active storage location (in this case, from iCloud Drive to Local Storage).

!> **Warning:** Make sure all your data has been downloaded before you migrate out of iCloud Drive to prevent unintended data loss.

?> **Hint:** Migration from iCloud Drive to Local Storage requires that you leave iCloud Drive turned on in System Settings until the migration is complete. Otherwise, the app can't access your data on iCloud Drive for migration.



