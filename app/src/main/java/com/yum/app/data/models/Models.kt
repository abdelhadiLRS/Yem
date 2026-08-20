package com.yum.app.data.models

import androidx.room.Entity
import androidx.room.PrimaryKey

data class Recipe(
    val id: String,
    val title: String,
    val titleAr: String,
    val description: String,
    val descriptionAr: String,
    val cuisine: String,
    val prepTimeMinutes: Int,
    val calories: Int,
    val difficulty: String,
    val rating: Double,
    val imageUrl: String,
    val ingredients: List<String>,
    val steps: List<String>,
    val isFeatured: Boolean = false,
    val isTrending: Boolean = false
)

@Entity(tableName = "pantry_items")
data class PantryItem(
    @PrimaryKey val id: String,
    val name: String,
    val nameAr: String,
    val category: String,
    val quantity: String,
    val expiryDaysRemaining: Int,
    val freshnessPercentage: Int,
    val isZeroWasteAlert: Boolean = false
)

@Entity(tableName = "basket_items")
data class BasketItem(
    @PrimaryKey val id: String,
    val name: String,
    val nameAr: String,
    val category: String,
    val quantity: Int,
    val unitPrice: Double,
    val isChecked: Boolean = false
)

@Entity(tableName = "passport_stamps")
data class PassportStamp(
    @PrimaryKey val countryCode: String,
    val countryName: String,
    val countryNameAr: String,
    val flagEmoji: String,
    val isUnlocked: Boolean = false,
    val unlockedDate: String? = null,
    val recipesCompleted: Int = 0,
    val xpEarned: Int = 0
)

data class CulinaryBattle(
    val id: String,
    val title: String,
    val chef1Name: String,
    val chef2Name: String,
    val chef1Avatar: String,
    val chef2Avatar: String,
    val chef1Votes: Int,
    val chef2Votes: Int,
    val timeRemainingSeconds: Long,
    val dishName: String,
    val isLive: Boolean = true
)

data class LiveStreamInfo(
    val id: String,
    val title: String,
    val hostName: String,
    val hostAvatar: String,
    val viewerCount: Int,
    val currentDish: String,
    val isDualScreen: Boolean = false,
    val chef2Name: String? = null
)

data class AiChatMessage(
    val id: String,
    val text: String,
    val isFromUser: Boolean,
    val timestamp: Long = System.currentTimeMillis(),
    val recipeCard: Recipe? = null,
    val ingredientSuggestions: List<String> = emptyList()
)

data class UserProfile(
    val id: String,
    val name: String,
    val email: String,
    val level: Int = 5,
    val totalXp: Int = 2450,
    val badgesCount: Int = 12,
    val avatarUrl: String = "",
    val preferredCuisines: List<String> = listOf("Italian", "Middle Eastern", "Japanese")
)
