package com.yum.app.data.repository

import com.yum.app.data.models.User
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow

class AuthRepository {

    private val _currentUser = MutableStateFlow<User?>(
        User(
            id = "usr-1",
            name = "Sami Al-Mansoor",
            email = "sami@yum.culinary",
            avatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
            tasteDnaArchetype = "Mediterranean Umami Connoisseur",
            ecoPoints = 1420,
            cookedDishesCount = 42,
            stampsCount = 9,
            preferredLanguage = "en"
        )
    )
    val currentUser: Flow<User?> = _currentUser.asStateFlow()

    fun updateLanguage(lang: String) {
        _currentUser.value = _currentUser.value?.copy(preferredLanguage = lang)
    }

    fun addEcoPoints(points: Int) {
        _currentUser.value = _currentUser.value?.let {
            it.copy(ecoPoints = it.ecoPoints + points)
        }
    }
}
