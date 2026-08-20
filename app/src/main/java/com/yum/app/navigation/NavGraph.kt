package com.yum.app.navigation

import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.navArgument
import com.yum.app.YumApplication
import com.yum.app.ui.features.aicooking.AiCookingScreen
import com.yum.app.ui.features.battles.BattlesScreen
import com.yum.app.ui.features.discover.DiscoverScreen
import com.yum.app.ui.features.livestudio.LiveStudioScreen
import com.yum.app.ui.features.passport.PassportScreen
import com.yum.app.ui.features.profile.ProfileScreen
import com.yum.app.ui.features.recipegenerator.AiRecipeGeneratorScreen
import com.yum.app.ui.features.smartbasket.SmartBasketScreen
import com.yum.app.ui.features.smartpantry.SmartPantryScreen
import com.yum.app.ui.features.worldmap.WorldMapScreen
import com.yum.app.viewmodel.AiCookingViewModel
import com.yum.app.viewmodel.AiRecipeGeneratorViewModel
import com.yum.app.viewmodel.BattlesViewModel
import com.yum.app.viewmodel.DiscoverViewModel
import com.yum.app.viewmodel.LiveStudioViewModel
import com.yum.app.viewmodel.PassportViewModel
import com.yum.app.viewmodel.ProfileViewModel
import com.yum.app.viewmodel.SmartBasketViewModel
import com.yum.app.viewmodel.SmartPantryViewModel

@Composable
fun YumNavGraph(
    navController: NavHostController,
    app: YumApplication = YumApplication.instance
) {
    val discoverViewModel = DiscoverViewModel(app.recipeRepository)
    val cookingViewModel = AiCookingViewModel(app.recipeRepository, app.yumAiRepository)
    val pantryViewModel = SmartPantryViewModel(app.pantryRepository)
    val basketViewModel = SmartBasketViewModel(app.basketRepository)
    val passportViewModel = PassportViewModel(app.passportRepository)
    val battlesViewModel = BattlesViewModel(app.battlesRepository)
    val liveStudioViewModel = LiveStudioViewModel(app.liveStreamRepository)
    val recipeGenViewModel = AiRecipeGeneratorViewModel(app.pantryRepository, app.recipeRepository, app.yumAiRepository)
    val profileViewModel = ProfileViewModel(app.authRepository)

    Scaffold(
        bottomBar = {
            BottomNavBar(navController = navController)
        }
    ) { paddingValues ->
        NavHost(
            navController = navController,
            startDestination = Screen.Discover.route,
            modifier = Modifier.padding(paddingValues)
        ) {
            composable(Screen.Discover.route) {
                DiscoverScreen(
                    viewModel = discoverViewModel,
                    onNavigateToCooking = { recipeId ->
                        navController.navigate(Screen.AiCooking.createRoute(recipeId))
                    },
                    onNavigateToAiGen = {
                        navController.navigate(Screen.RecipeGenerator.route)
                    }
                )
            }

            composable(
                route = Screen.AiCooking.route,
                arguments = listOf(navArgument("recipeId") { type = NavType.StringType; defaultValue = "rec-1" })
            ) { backStackEntry ->
                val recipeId = backStackEntry.arguments?.getString("recipeId") ?: "rec-1"
                AiCookingScreen(
                    recipeId = recipeId,
                    viewModel = cookingViewModel,
                    onBack = { navController.popBackStack() }
                )
            }

            composable(Screen.SmartPantry.route) {
                SmartPantryScreen(
                    viewModel = pantryViewModel,
                    onRescueFoodClick = {
                        navController.navigate(Screen.RecipeGenerator.route)
                    }
                )
            }

            composable(Screen.SmartBasket.route) {
                SmartBasketScreen(
                    viewModel = basketViewModel
                )
            }

            composable(Screen.Passport.route) {
                PassportScreen(
                    viewModel = passportViewModel,
                    onNavigateToWorldMap = {
                        navController.navigate(Screen.WorldMap.route)
                    }
                )
            }

            composable(Screen.WorldMap.route) {
                WorldMapScreen(
                    viewModel = passportViewModel,
                    onBack = { navController.popBackStack() }
                )
            }

            composable(Screen.Battles.route) {
                BattlesScreen(
                    viewModel = battlesViewModel
                )
            }

            composable(Screen.LiveStudio.route) {
                LiveStudioScreen(
                    viewModel = liveStudioViewModel
                )
            }

            composable(Screen.RecipeGenerator.route) {
                AiRecipeGeneratorScreen(
                    viewModel = recipeGenViewModel,
                    onBack = { navController.popBackStack() },
                    onRecipeGenerated = { recipeId ->
                        navController.navigate(Screen.AiCooking.createRoute(recipeId))
                    }
                )
            }

            composable(Screen.Profile.route) {
                ProfileScreen(
                    viewModel = profileViewModel
                )
            }
        }
    }
}
