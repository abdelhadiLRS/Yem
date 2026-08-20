package com.yum.app.navigation

sealed class Screen(val route: String, val title: String) {
    object Discover : Screen("discover", "Discover")
    object AiCooking : Screen("ai_cooking/{recipeId}", "AI Cooking") {
        fun createRoute(recipeId: String = "rec-1") = "ai_cooking/$recipeId"
    }
    object SmartPantry : Screen("smart_pantry", "Smart Pantry")
    object SmartBasket : Screen("smart_basket", "Smart Basket")
    object Passport : Screen("passport", "Passport")
    object WorldMap : Screen("world_map", "World Map")
    object Battles : Screen("battles", "Battles")
    object LiveStudio : Screen("live_studio", "Live Studio")
    object RecipeGenerator : Screen("recipe_generator", "AI Generator")
    object Profile : Screen("profile", "Profile")
}
