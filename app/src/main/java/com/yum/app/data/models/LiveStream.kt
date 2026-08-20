package com.yum.app.data.models

data class LiveStream(
    val id: String,
    val title: String,
    val chefName: String,
    val chefAvatar: String,
    val dishName: String,
    val viewersCount: Int,
    val thumbnail: String,
    val activeStep: String,
    val currentIngredients: List<String> = emptyList(),
    val isLive: Boolean = true
)

data class ChatMessage(
    val id: String,
    val senderName: String,
    val senderLocation: String? = null,
    val messageText: String,
    val timestamp: String,
    val isFromUser: Boolean = false,
    val isChef: Boolean = false
)

data class User(
    val id: String,
    val name: String,
    val email: String,
    val avatarUrl: String,
    val tasteDnaArchetype: String = "Mediterranean Umami Connoisseur",
    val ecoPoints: Int = 1240,
    val cookedDishesCount: Int = 38,
    val stampsCount: Int = 9,
    val preferredLanguage: String = "en"
)
