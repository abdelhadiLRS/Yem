package com.yum.app.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.yum.app.data.models.PantryItem
import com.yum.app.data.repository.PantryRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

data class PantryUiState(
    val items: List<PantryItem> = emptyList(),
    val expiringSoonCount: Int = 0,
    val zeroWasteScore: Int = 88,
    val selectedCategory: String = "All",
    val searchQuery: String = ""
)

class SmartPantryViewModel(
    private val pantryRepository: PantryRepository
) : ViewModel() {

    private val _selectedCategory = MutableStateFlow("All")
    private val _searchQuery = MutableStateFlow("")

    val uiState: StateFlow<PantryUiState> = combine(
        pantryRepository.allPantryItems,
        _selectedCategory,
        _searchQuery
    ) { items, category, query ->
        val filtered = items.filter { item ->
            val matchesCategory = category == "All" || item.category == category
            val matchesQuery = query.isBlank() || item.name.contains(query, ignoreCase = true)
            matchesCategory && matchesQuery
        }
        val expiringCount = items.count { it.isExpiringSoon || it.daysRemaining <= 2 }
        val avgFreshness = if (items.isNotEmpty()) items.sumOf { it.freshnessScore } / items.size else 85

        PantryUiState(
            items = filtered,
            expiringSoonCount = expiringCount,
            zeroWasteScore = avgFreshness,
            selectedCategory = category,
            searchQuery = query
        )
    }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), PantryUiState())

    fun selectCategory(category: String) {
        _selectedCategory.value = category
    }

    fun onSearchQueryChange(query: String) {
        _searchQuery.value = query
    }

    fun addItem(name: String, category: String, quantity: String, daysRemaining: Int) {
        viewModelScope.launch {
            val item = PantryItem(
                id = "p-${System.currentTimeMillis()}",
                name = name,
                category = category,
                quantity = quantity,
                daysRemaining = daysRemaining,
                freshnessScore = (daysRemaining * 15).coerceIn(10, 100),
                isExpiringSoon = daysRemaining <= 2
            )
            pantryRepository.insertItem(item)
        }
    }

    fun deleteItem(item: PantryItem) {
        viewModelScope.launch {
            pantryRepository.deleteItem(item)
        }
    }
}
