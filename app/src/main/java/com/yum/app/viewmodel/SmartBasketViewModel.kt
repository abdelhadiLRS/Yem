package com.yum.app.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.yum.app.data.models.BasketItem
import com.yum.app.data.repository.BasketRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

data class BasketUiState(
    val items: List<BasketItem> = emptyList(),
    val totalEstimatedCost: Double = 0.0,
    val checkedCount: Int = 0,
    val totalCount: Int = 0,
    val selectedStore: String = "All"
)

class SmartBasketViewModel(
    private val basketRepository: BasketRepository
) : ViewModel() {

    private val _selectedStore = MutableStateFlow("All")

    val uiState: StateFlow<BasketUiState> = combine(
        basketRepository.allBasketItems,
        _selectedStore
    ) { items, store ->
        val filtered = if (store == "All") items else items.filter { it.storeName == store }
        val totalCost = filtered.filter { !it.isChecked }.sumOf { it.estimatedPrice * it.quantity }
        val checked = filtered.count { it.isChecked }

        BasketUiState(
            items = filtered,
            totalEstimatedCost = totalCost,
            checkedCount = checked,
            totalCount = filtered.size,
            selectedStore = store
        )
    }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), BasketUiState())

    fun toggleCheck(item: BasketItem) {
        viewModelScope.launch {
            basketRepository.updateItem(item.copy(isChecked = !item.isChecked))
        }
    }

    fun addItem(name: String, category: String, price: Double, store: String) {
        viewModelScope.launch {
            val item = BasketItem(
                id = "b-${System.currentTimeMillis()}",
                name = name,
                category = category,
                estimatedPrice = price,
                storeName = store
            )
            basketRepository.insertItem(item)
        }
    }

    fun deleteItem(item: BasketItem) {
        viewModelScope.launch {
            basketRepository.deleteItem(item)
        }
    }

    fun clearChecked() {
        viewModelScope.launch {
            basketRepository.clearCheckedItems()
        }
    }
}
