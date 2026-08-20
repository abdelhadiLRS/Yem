package com.yum.app.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.yum.app.data.models.Recipe
import com.yum.app.data.repository.PantryRepository
import com.yum.app.data.repository.RecipeRepository
import com.yum.app.data.repository.YumAiRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

data class RecipeGenUiState(
    val selectedIngredients: List<String> = emptyList(),
    val availablePantryItems: List<String> = emptyList(),
    val cuisinePreference: String = "Mediterranean",
    val dietaryRestriction: String = "None",
    val isGenerating: Boolean = false,
    val generatedRecipe: Recipe? = null,
    val errorMessage: String? = null
)

class AiRecipeGeneratorViewModel(
    private val pantryRepository: PantryRepository,
    private val recipeRepository: RecipeRepository,
    private val yumAiRepository: YumAiRepository
) : ViewModel() {

    private val _selectedIngredients = MutableStateFlow<List<String>>(listOf("Avocado", "Salmon Fillet"))
    private val _cuisine = MutableStateFlow("Mediterranean Fusion")
    private val _dietary = MutableStateFlow("High Protein")
    private val _isGenerating = MutableStateFlow(false)
    private val _generatedRecipe = MutableStateFlow<Recipe?>(null)
    private val _error = MutableStateFlow<String?>(null)

    val availablePantry: StateFlow<List<String>> = pantryRepository.allPantryItems
        .map { items -> items.map { it.name } }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    val uiState: StateFlow<RecipeGenUiState> = MutableStateFlow(RecipeGenUiState()).asStateFlow()

    fun toggleIngredient(name: String) {
        val current = _selectedIngredients.value
        _selectedIngredients.value = if (current.contains(name)) {
            current - name
        } else {
            current + name
        }
    }

    fun setCuisine(c: String) { _cuisine.value = c }
    fun setDietary(d: String) { _dietary.value = d }

    fun generateRecipe(onSuccess: (String) -> Unit) {
        viewModelScope.launch {
            _isGenerating.value = true
            _error.value = null
            val result = yumAiRepository.generateRecipeFromPantry(
                ingredients = _selectedIngredients.value,
                cuisinePreference = _cuisine.value,
                dietary = _dietary.value
            )
            _isGenerating.value = false
            result.onSuccess { recipe ->
                _generatedRecipe.value = recipe
                recipeRepository.addGeneratedRecipe(recipe)
                onSuccess(recipe.id)
            }.onFailure { err ->
                _error.value = err.message ?: "Failed to generate recipe"
            }
        }
    }
}
