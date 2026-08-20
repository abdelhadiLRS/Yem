package com.yum.app.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.yum.app.data.models.PassportStamp
import com.yum.app.data.repository.PassportRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

data class PassportUiState(
    val stamps: List<PassportStamp> = emptyList(),
    val unlockedCount: Int = 0,
    val totalCount: Int = 0,
    val selectedStamp: PassportStamp? = null
)

class PassportViewModel(
    private val passportRepository: PassportRepository
) : ViewModel() {

    private val _selectedStampId = MutableStateFlow<String?>(null)

    val uiState: StateFlow<PassportUiState> = combine(
        passportRepository.stamps,
        _selectedStampId
    ) { stamps, selectedId ->
        val unlocked = stamps.count { it.unlocked }
        val selected = stamps.find { it.id == selectedId } ?: stamps.firstOrNull()
        PassportUiState(
            stamps = stamps,
            unlockedCount = unlocked,
            totalCount = stamps.size,
            selectedStamp = selected
        )
    }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), PassportUiState())

    fun selectStamp(stamp: PassportStamp) {
        _selectedStampId.value = stamp.id
    }

    fun unlockStamp(stampId: String) {
        viewModelScope.launch {
            passportRepository.unlockStamp(stampId)
        }
    }
}
