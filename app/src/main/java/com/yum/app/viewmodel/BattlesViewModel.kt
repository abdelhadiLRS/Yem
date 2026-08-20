package com.yum.app.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.yum.app.data.models.BattleEntry
import com.yum.app.data.repository.BattlesRepository
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

data class BattlesUiState(
    val battles: List<BattleEntry> = emptyList()
)

class BattlesViewModel(
    private val battlesRepository: BattlesRepository
) : ViewModel() {

    val uiState: StateFlow<BattlesUiState> = battlesRepository.battles
        .let { flow ->
            kotlinx.coroutines.flow.map(flow) { battles ->
                BattlesUiState(battles = battles)
            }
        }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), BattlesUiState())

    fun vote(battleId: String, side: String) {
        viewModelScope.launch {
            battlesRepository.castVote(battleId, side)
        }
    }
}
