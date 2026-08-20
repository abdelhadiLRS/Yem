package com.yum.app

import android.app.Application
import com.yum.app.data.local.YumDatabase
import com.yum.app.data.repository.AuthRepository
import com.yum.app.data.repository.BasketRepository
import com.yum.app.data.repository.BattlesRepository
import com.yum.app.data.repository.LiveStreamRepository
import com.yum.app.data.repository.PantryRepository
import com.yum.app.data.repository.PassportRepository
import com.yum.app.data.repository.RecipeRepository
import com.yum.app.data.repository.YumAiRepository
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.SupervisorJob

class YumApplication : Application() {

    private val applicationScope = CoroutineScope(SupervisorJob())

    val database by lazy { YumDatabase.getDatabase(this, applicationScope) }

    val recipeRepository by lazy { RecipeRepository() }
    val pantryRepository by lazy { PantryRepository(database.pantryDao()) }
    val basketRepository by lazy { BasketRepository(database.basketDao()) }
    val passportRepository by lazy { PassportRepository() }
    val battlesRepository by lazy { BattlesRepository() }
    val liveStreamRepository by lazy { LiveStreamRepository() }
    val yumAiRepository by lazy { YumAiRepository() }
    val authRepository by lazy { AuthRepository() }

    override fun onCreate() {
        super.onCreate()
        instance = this
    }

    companion object {
        lateinit var instance: YumApplication
            private set
    }
}
