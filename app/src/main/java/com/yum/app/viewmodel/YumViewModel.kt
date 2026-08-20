package com.yum.app.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.yum.app.data.models.*
import com.yum.app.data.repository.YumRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

class YumViewModel(private val repository: YumRepository) : ViewModel() {

    init {
        viewModelScope.launch {
            repository.seedInitialDataIfEmpty()
        }
    }

    // Recipes & Home state
    val recipes: StateFlow<List<Recipe>> = repository.recipes
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    // Pantry state
    val pantryItems: StateFlow<List<PantryItem>> = repository.pantryItems
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    // Basket state
    val basketItems: StateFlow<List<BasketItem>> = repository.basketItems
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    // Passport state
    val passportStamps: StateFlow<List<PassportStamp>> = repository.passportStamps
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    // Battles state
    val battles: StateFlow<List<CulinaryBattle>> = repository.battles
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    // Yum AI Chat State
    private val _chatMessages = MutableStateFlow(
        listOf(
            AiChatMessage(
                id = "m1",
                text = "Welcome to Yum AI! How can I assist your culinary journey today?",
                isFromUser = false,
                ingredientSuggestions = listOf("Suggest dinner recipes", "Check my expiring pantry items", "How to make Tagliatelle?")
            )
        )
    )
    val chatMessages: StateFlow<List<AiChatMessage>> = _chatMessages.asStateFlow()

    private val _isAiThinking = MutableStateFlow(false)
    val isAiThinking: StateFlow<Boolean> = _isAiThinking.asStateFlow()

    // Settings / App state
    private val _isDarkMode = MutableStateFlow(false)
    val isDarkMode: StateFlow<Boolean> = _isDarkMode.asStateFlow()

    private val _currentLanguage = MutableStateFlow("en")
    val currentLanguage: StateFlow<String> = _currentLanguage.asStateFlow()

    // Actions
    fun sendAiPrompt(prompt: String) {
        if (prompt.isBlank()) return
        val userMsg = AiChatMessage(
            id = System.currentTimeMillis().toString(),
            text = prompt,
            isFromUser = true
        )
        _chatMessages.value = _chatMessages.value + userMsg
        _isAiThinking.value = true

        viewModelScope.launch {
            val response = repository.generateAiResponse(prompt)
            _isAiThinking.value = false
            _chatMessages.value = _chatMessages.value + response
        }
    }

    fun addPantryItem(name: String, nameAr: String, category: String, quantity: String, expiryDays: Int) {
        viewModelScope.launch {
            repository.addPantryItem(name, nameAr, category, quantity, expiryDays)
        }
    }

    fun deletePantryItem(item: PantryItem) {
        viewModelScope.launch {
            repository.deletePantryItem(item)
        }
    }

    fun addBasketItem(name: String, nameAr: String, category: String, quantity: Int, price: Double) {
        viewModelScope.launch {
            repository.addBasketItem(name, nameAr, category, quantity, price)
        }
    }

    fun toggleBasketItemCheck(item: BasketItem) {
        viewModelScope.launch {
            repository.updateBasketItem(item.copy(isChecked = !item.isChecked))
        }
    }

    fun deleteBasketItem(item: BasketItem) {
        viewModelScope.launch {
            repository.deleteBasketItem(item)
        }
    }

    fun clearBasket() {
        viewModelScope.launch {
            repository.clearBasket()
        }
    }

    fun toggleDarkMode() {
        _isDarkMode.value = !_isDarkMode.value
    }

    fun setLanguage(lang: String) {
        _currentLanguage.value = lang
    }
}
