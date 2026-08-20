# ProGuard rules for Yum Android app
-keepattributes *Annotation*
-keepclassmembers class * {
    @androidx.room.* <methods>;
}
