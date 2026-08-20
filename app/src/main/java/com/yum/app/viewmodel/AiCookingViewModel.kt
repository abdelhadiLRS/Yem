package com.yum.app.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.yum.app.data.models.CookingStep
import com.yum.app.data.models.Recipe
import com.yum.app.data.repository.RecipeRepository
import com.yum.app.data.repository.YumAiRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

data class CookingUiState(
    val recipe: Recipe? = null,
    val currentStepIndex: Int = 0,
    val isTimerRunning: Boolean = false,
    val timerSecondsRemaining: Int = 0,
    val isVoiceListening: Boolean = false,
    val aiSousChefMessage: String = "I'm your AI Sous-Chef. Ask me for temperature, substitutions, or next steps!",
    val isCompleted: Boolean = false
)

class AiCookingViewModel(
    private val recipeRepository: RecipeRepository,
    private val yumAiRepository: YumAiRepository
) : ViewModel() {

    private val _uiState = MutableStateFlow(CookingUiState())
    val uiState: StateFlow<CookingUiState> = _uiState.asStateFlow()

    fun loadRecipe(recipeId: String) {
        val recipe = recipeRepository.getRecipeById(recipeId) ?: recipeRepository.getRecipeById("rec-1")
        _uiState.value = _uiState.value.copy(
            recipe = recipe,
            currentStepIndex = 0,
            timerSecondsRemaining = (recipe?.steps?.getOrNull(0)?.durationMinutes ?: 5) * 60,
            isCompleted = false
        )
    }

    fun nextStep() {
        val current = _uiState.value
        val recipe = current.recipe ?: return
        if (current.currentStepIndex < recipe.steps.size - 1) {
            val nextIdx = current.currentStepIndex + 1
            _uiState.value = current.copy(
                currentStepIndex = nextIdx,
                timerSecondsRemaining = recipe.steps[nextIdx].durationMinutes * 60,
                isTimerRunning = false
            )
        } else {
            _uiState.value = current.copy(isCompleted = true)
        }
    }

    fun prevStep() {
        val current = _uiState.value
        val recipe = current.recipe ?: return
        if (current.currentStepIndex > 0) {
            val prevIdx = current.currentStepIndex - 1
            _uiState.value = current.copy(
                currentStepIndex = prevIdx,
                timerSecondsRemaining = recipe.steps[prevIdx].durationMinutes * 60,
                isTimerRunning = false
            )
        }
    }

    fun toggleTimer() {
        _uiState.value = _uiState.value.copy(isTimerRunning = !_uiState.value.isTimerRunning)
    }

    fun toggleVoice() {
        _uiState.value = _uiState.value.copy(isVoiceListening = !_uiState.value.isVoiceListening)
    }

    fun askAiSousChef(question: String) {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(aiSousChefMessage = "Thinking...")
            val response = yumAiRepository.getCulinaryAdvice(question)
            _uiState.value = _uiState.value.copy(aiSousChefMessage = response)
        }
    }
}
