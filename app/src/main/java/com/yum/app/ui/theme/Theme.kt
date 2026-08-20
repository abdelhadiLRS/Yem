package com.yum.app.ui.theme

import android.app.Activity
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

private val DarkColorScheme = darkColorScheme(
    primary = YumOrangeLight,
    onPrimary = YumBackgroundDark,
    primaryContainer = YumOrangeDark,
    onPrimaryContainer = YumOrangeContainer,
    secondary = YumGreenPrimary,
    onSecondary = YumBackgroundDark,
    secondaryContainer = YumGreenDark,
    onSecondaryContainer = YumGreenContainer,
    background = YumBackgroundDark,
    onBackground = YumTextPrimaryDark,
    surface = YumSurfaceDark,
    onSurface = YumTextPrimaryDark,
    surfaceVariant = YumSurfaceVariantDark,
    onSurfaceVariant = YumTextSecondaryDark,
    outline = YumOutlineDark
)

private val LightColorScheme = lightColorScheme(
    primary = YumOrangePrimary,
    onPrimary = YumSurfaceLight,
    primaryContainer = YumOrangeContainer,
    onPrimaryContainer = YumOnOrangeContainer,
    secondary = YumGreenPrimary,
    onSecondary = YumSurfaceLight,
    secondaryContainer = YumGreenContainer,
    onSecondaryContainer = YumOnGreenContainer,
    background = YumBackgroundLight,
    onBackground = YumTextPrimaryLight,
    surface = YumSurfaceLight,
    onSurface = YumTextPrimaryLight,
    surfaceVariant = YumSurfaceVariantLight,
    onSurfaceVariant = YumTextSecondaryLight,
    outline = YumOutlineLight
)

@Composable
fun YumTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme
    val view = LocalView.current

    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            window.statusBarColor = colorScheme.background.toArgb()
            window.navigationBarColor = colorScheme.surface.toArgb()
            WindowCompat.getInsetsController(window, view).isAppearanceLightStatusBars = !darkTheme
        }
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = YumTypography,
        content = content
    )
}
