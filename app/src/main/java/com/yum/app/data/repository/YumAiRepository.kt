package com.yum.app.data.repository

import com.yum.app.data.models.ChefAuthor
import com.yum.app.data.models.CookingStep
import com.yum.app.data.models.Ingredient
import com.yum.app.data.models.Recipe
import com.yum.app.data.models.TasteProfile
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class YumAiRepository {

    suspend fun generateRecipeFromPantry(
        ingredients: List<String>,
        cuisinePreference: String,
        dietary: String
    ): Result<Recipe> = withContext(Dispatchers.IO) {
        try {
            // Simulated AI generation with smart culinary rules (Gemini Ready)
            val primaryIngredient = ingredients.firstOrNull() ?: "Avocado"
            val recipe = Recipe(
                id = "ai-rec-${System.currentTimeMillis()}",
                title = "AI Zero-Waste $cuisinePreference Pan-Seared $primaryIngredient Fusion",
                cuisine = cuisinePreference.ifBlank { "Modern Gastronomy" },
                countryCode = "UN",
                imageUrl = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80",
                prepTime = "10 mins",
                cookTime = "15 mins",
                difficulty = "Easy",
                calories = 380,
                servings = 2,
                rating = 4.9,
                reviewsCount = 1,
                author = ChefAuthor(
                    name = "Yum AI Sous-Chef",
                    avatarUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
                    badge = "AI Gastronome"
                ),
                tags = listOf("AI Generated", "Zero-Waste", dietary.ifBlank { "Nutritious" }),
                dietary = if (dietary.isNotBlank()) listOf(dietary) else listOf("Balanced"),
                matchScore = 99,
                ingredients = ingredients.map {
                    Ingredient(name = it, amount = "As available", inPantry = true, category = "Pantry")
                } + listOf(
                    Ingredient(name = "Extra Virgin Olive Oil", amount = "1 tbsp", inPantry = true, category = "Pantry & Spices"),
                    Ingredient(name = "Flaky Sea Salt & Citrus", amount = "To taste", inPantry = true, category = "Pantry & Spices")
                ),
                steps = listOf(
                    CookingStep(1, "Preheat & Slice", "Slice $primaryIngredient into uniform wedges. Heat olive oil in a stainless pan.", 3),
                    CookingStep(2, "Sear & Bloom Flavors", "Sear until golden crust develops, tossing in complementary herbs and spices.", 7),
                    CookingStep(3, "Deglaze & Garnish", "Finish with citrus zest and pan reduction for an instant zero-waste gourmet plate.", 5)
                ),
                tasteProfile = TasteProfile(sweet = 3, savory = 8, spicy = 4, sour = 6, umami = 9),
                zeroWasteTip = "Utilizes 100% of your expiring $primaryIngredient with zero kitchen waste.",
                isSaved = true
            )
            Result.success(recipe)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun getCulinaryAdvice(query: String): String = withContext(Dispatchers.IO) {
        // Smart AI culinary advice
        val q = query.lowercase()
        when {
            q.contains("salmon") || q.contains("fish") ->
                "For crispy salmon skin, ensure the skin is bone-dry before searing. Start in a cold pan with light oil over medium heat, gently pressing down for the first 30 seconds."
            q.contains("substitute") || q.contains("instead of") ->
                "You can substitute Greek yogurt with labneh or coconut yogurt for dairy-free. For saffron, a blend of ground turmeric and mild smoked paprika gives radiant color."
            q.contains("wine") || q.contains("pairing") ->
                "With rich umami and braised meats, pair with full-bodied tannic reds like Syrah or a crisp pomegranate citrus reduction for a non-alcoholic gourmet pairing."
            else ->
                "Chef Tip: Always season in layers at each cooking phase rather than just at the end. This builds deep multidimensional flavor complexity."
        }
    }
}
