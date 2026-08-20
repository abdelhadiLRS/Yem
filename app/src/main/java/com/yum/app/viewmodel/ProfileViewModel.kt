package com.yum.app.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.yum.app.data.models.User
import com.yum.app.data.repository.AuthRepository
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

data class ProfileUiState(
    val user: User? = null
)

class ProfileViewModel(
    private val authRepository: AuthRepository
) : ViewModel() {

    val uiState: StateFlow<ProfileUiState> = authRepository.currentUser
        .let { flow ->
            kotlinx.coroutines.flow.map(flow) { user ->
                ProfileUiState(user = user)
            }
        }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), ProfileUiState())

    fun toggleLanguage() {
        viewModelScope.launch {
            val current = uiState.value.user?.preferredLanguage ?: "en"
            val next = if (current == "en") "ar" else "en"
            authRepository.updateLanguage(next)
        }
    }
}
