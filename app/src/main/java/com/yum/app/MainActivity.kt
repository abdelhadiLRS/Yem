package com.yum.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.compose.*
import com.yum.app.data.local.YumDatabase
import com.yum.app.data.repository.YumRepository
import com.yum.app.navigation.Screen
import com.yum.app.navigation.bottomNavScreens
import com.yum.app.ui.screens.*
import com.yum.app.ui.theme.YumOrange
import com.yum.app.ui.theme.YumTheme
import com.yum.app.viewmodel.YumViewModel
import com.yum.app.viewmodel.YumViewModelFactory

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate()

        val db = YumDatabase.getDatabase(this)
        val repository = YumRepository(db.pantryDao(), db.basketDao(), db.passportDao())
        val viewModelFactory = YumViewModelFactory(repository)

        setContent {
            val viewModel: YumViewModel = androidx.lifecycle.viewmodel.compose.viewModel(factory = viewModelFactory)
            val isDarkMode by viewModel.isDarkMode.collectAsState()

            YumTheme(darkTheme = isDarkMode) {
                MainAppHost(viewModel = viewModel)
            }
        }
    }
}

@Composable
fun MainAppHost(viewModel: YumViewModel) {
    val navController = rememberNavController()
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route

    val isBottomBarVisible = bottomNavScreens.any { it.route == currentRoute }

    Scaffold(
        bottomBar = {
            if (isBottomBarVisible) {
                NavigationBar {
                    bottomNavScreens.forEach { screen ->
                        NavigationBarItem(
                            icon = { Icon(screen.icon, contentDescription = stringResource(screen.titleRes)) },
                            label = { Text(stringResource(screen.titleRes)) },
                            selected = currentRoute == screen.route,
                            colors = NavigationBarItemDefaults.colors(
                                selectedIconColor = YumOrange,
                                selectedTextColor = YumOrange,
                                indicatorColor = YumOrange.copy(alpha = 0.15f)
                            ),
                            onClick = {
                                navController.navigate(screen.route) {
                                    popUpTo(navController.graph.findStartDestination().id) {
                                        saveState = true
                                    }
                                    launchSingleTop = true
                                    restoreState = true
                                }
                            }
                        )
                    }
                }
            }
        }
    ) { innerPadding ->
        NavHost(
            navController = navController,
            startDestination = Screen.Splash.route,
            modifier = Modifier.padding(if (isBottomBarVisible) innerPadding else PaddingValues())
        ) {
            composable(Screen.Splash.route) {
                SplashScreen(
                    onTimeout = {
                        navController.navigate(Screen.Home.route) {
                            popUpTo(Screen.Splash.route) { inclusive = true }
                        }
                    }
                )
            }
            composable(Screen.Auth.route) {
                AuthScreen(
                    onLoginSuccess = {
                        navController.navigate(Screen.Home.route) {
                            popUpTo(Screen.Auth.route) { inclusive = true }
                        }
                    }
                )
            }
            composable(Screen.Home.route) {
                HomeScreen(
                    viewModel = viewModel,
                    onNavigateToAi = { navController.navigate(Screen.AiChat.route) },
                    onNavigateToBattles = { navController.navigate(Screen.Battles.route) },
                    onNavigateToLiveStudio = { navController.navigate(Screen.LiveStudio.route) }
                )
            }
            composable(Screen.Discover.route) {
                HomeScreen(
                    viewModel = viewModel,
                    onNavigateToAi = { navController.navigate(Screen.AiChat.route) },
                    onNavigateToBattles = { navController.navigate(Screen.Battles.route) },
                    onNavigateToLiveStudio = { navController.navigate(Screen.LiveStudio.route) }
                )
            }
            composable(Screen.AiChat.route) {
                AiChatScreen(
                    viewModel = viewModel,
                    onNavigateToCookingMode = { navController.navigate(Screen.AiCookingMode.route) }
                )
            }
            composable(Screen.AiCookingMode.route) {
                AiCookingModeScreen(onBack = { navController.popBackStack() })
            }
            composable(Screen.Pantry.route) {
                PantryScreen(viewModel = viewModel)
            }
            composable(Screen.Basket.route) {
                BasketScreen(viewModel = viewModel)
            }
            composable(Screen.Passport.route) {
                PassportScreen(
                    viewModel = viewModel,
                    onNavigateToWorldMap = { navController.navigate(Screen.WorldMap.route) }
                )
            }
            composable(Screen.WorldMap.route) {
                WorldMapScreen(onBack = { navController.popBackStack() })
            }
            composable(Screen.Battles.route) {
                CulinaryBattlesScreen(
                    viewModel = viewModel,
                    onBack = { navController.popBackStack() }
                )
            }
            composable(Screen.LiveStudio.route) {
                LiveStudioScreen(onBack = { navController.popBackStack() })
            }
            composable(Screen.Profile.route) {
                ProfileScreen(
                    viewModel = viewModel,
                    onNavigateToSettings = { navController.navigate(Screen.Settings.route) }
                )
            }
            composable(Screen.Settings.route) {
                SettingsScreen(
                    viewModel = viewModel,
                    onBack = { navController.popBackStack() }
                )
            }
        }
    }
}
