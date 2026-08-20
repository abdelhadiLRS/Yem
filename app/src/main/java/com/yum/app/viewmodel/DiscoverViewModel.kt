package com.yum.app.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.yum.app.data.models.Recipe
import com.yum.app.data.repository.RecipeRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

data class DiscoverUiState(
    val recipes: List<Recipe> = emptyList(),
    val searchQuery: String = "",
    val selectedCuisine: String = "All",
    val selectedDietary: String = "All",
    val isLoading: Boolean = false
)

class DiscoverViewModel(
    private val recipeRepository: RecipeRepository
) : ViewModel() {

    private val _searchQuery = MutableStateFlow("")
    private val _selectedCuisine = MutableStateFlow("All")
    private val _selectedDietary = MutableStateFlow("All")

    val uiState: StateFlow<DiscoverUiState> = combine(
        recipeRepository.recipes,
        _searchQuery,
        _selectedCuisine,
        _selectedDietary
    ) { recipes, query, cuisine, dietary ->
        val filtered = recipes.filter { recipe ->
            val matchesQuery = query.isBlank() ||
                recipe.title.contains(query, ignoreCase = true) ||
                recipe.cuisine.contains(query, ignoreCase = true) ||
                recipe.ingredients.any { it.name.contains(query, ignoreCase = true) }

            val matchesCuisine = cuisine == "All" || recipe.cuisine.contains(cuisine, ignoreCase = true)
            val matchesDietary = dietary == "All" || recipe.dietary.contains(dietary)

            matchesQuery && matchesCuisine && matchesDietary
        }
        DiscoverUiState(
            recipes = filtered,
            searchQuery = query,
            selectedCuisine = cuisine,
            selectedDietary = dietary
        )
    }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), DiscoverUiState())

    fun onSearchQueryChange(query: String) {
        _searchQuery.value = query
    }

    fun onCuisineSelected(cuisine: String) {
        _selectedCuisine.value = cuisine
    }

    fun onDietarySelected(dietary: String) {
        _selectedDietary.value = dietary
    }

    fun toggleSave(recipeId: String) {
        viewModelScope.launch {
            recipeRepository.toggleSaveRecipe(recipeId)
        }
    }
}
