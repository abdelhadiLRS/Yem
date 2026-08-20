package com.yum.app.data.models

data class Recipe(
    val id: String,
    val title: String,
    val cuisine: String,
    val countryCode: String = "UN",
    val imageUrl: String,
    val prepTime: String,
    val cookTime: String,
    val difficulty: String,
    val calories: Int,
    val servings: Int,
    val rating: Double,
    val reviewsCount: Int,
    val author: ChefAuthor,
    val tags: List<String> = emptyList(),
    val dietary: List<String> = emptyList(),
    val matchScore: Int = 95,
    val ingredients: List<Ingredient> = emptyList(),
    val steps: List<CookingStep> = emptyList(),
    val tasteProfile: TasteProfile = TasteProfile(),
    val zeroWasteTip: String? = null,
    val isSaved: Boolean = false
)

data class Ingredient(
    val name: String,
    val amount: String,
    val unit: String = "",
    val inPantry: Boolean = false,
    val category: String = "General"
)

data class CookingStep(
    val stepNumber: Int,
    val title: String,
    val instruction: String,
    val durationMinutes: Int = 5,
    val chefTip: String? = null,
    val isCompleted: Boolean = false
)

data class TasteProfile(
    val sweet: Int = 3,
    val savory: Int = 8,
    val spicy: Int = 5,
    val sour: Int = 4,
    val umami: Int = 9
)

data class ChefAuthor(
    val name: String,
    val avatarUrl: String,
    val badge: String = "Master Chef",
    val followersCount: String = "12.4k"
)
