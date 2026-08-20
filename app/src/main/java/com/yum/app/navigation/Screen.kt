package com.yum.app.navigation

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.ui.graphics.vector.ImageVector
import com.yum.app.R

sealed class Screen(val route: String, val titleRes: Int, val icon: ImageVector) {
    object Splash : Screen("splash", R.string.app_name, Icons.Default.RestaurantMenu)
    object Auth : Screen("auth", R.string.login, Icons.Default.Lock)
    object Home : Screen("home", R.string.nav_home, Icons.Default.Home)
    object Discover : Screen("discover", R.string.nav_discover, Icons.Default.Explore)
    object AiChat : Screen("ai_chat", R.string.nav_ai, Icons.Default.Psychology)
    object AiCookingMode : Screen("ai_cooking_mode", R.string.ai_cooking_mode, Icons.Default.Mic)
    object Pantry : Screen("pantry", R.string.smart_pantry, Icons.Default.Kitchen)
    object Basket : Screen("basket", R.string.smart_basket, Icons.Default.ShoppingBasket)
    object Passport : Screen("passport", R.string.yum_passport, Icons.Default.Public)
    object WorldMap : Screen("world_map", R.string.world_map, Icons.Default.Map)
    object Battles : Screen("battles", R.string.culinary_battles, Icons.Default.EmojiEvents)
    object LiveStudio : Screen("live_studio", R.string.live_studio, Icons.Default.LiveTv)
    object Profile : Screen("profile", R.string.nav_profile, Icons.Default.Person)
    object Settings : Screen("settings", R.string.settings, Icons.Default.Settings)
}

val bottomNavScreens = listOf(
    Screen.Home,
    Screen.Discover,
    Screen.AiChat,
    Screen.Pantry,
    Screen.Basket,
    Screen.Passport,
    Screen.Profile
)
