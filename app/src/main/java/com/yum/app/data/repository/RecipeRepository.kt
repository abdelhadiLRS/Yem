package com.yum.app.data.repository

import com.yum.app.data.models.ChefAuthor
import com.yum.app.data.models.CookingStep
import com.yum.app.data.models.Ingredient
import com.yum.app.data.models.Recipe
import com.yum.app.data.models.TasteProfile
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow

class RecipeRepository {

    private val _recipes = MutableStateFlow<List<Recipe>>(getInitialRecipes())
    val recipes: Flow<List<Recipe>> = _recipes.asStateFlow()

    fun getRecipeById(id: String): Recipe? {
        return _recipes.value.find { it.id == id }
    }

    fun toggleSaveRecipe(id: String) {
        _recipes.value = _recipes.value.map {
            if (it.id == id) it.copy(isSaved = !it.isSaved) else it
        }
    }

    fun addGeneratedRecipe(recipe: Recipe) {
        _recipes.value = listOf(recipe) + _recipes.value
    }

    private fun getInitialRecipes(): List<Recipe> {
        return listOf(
            Recipe(
                id = "rec-1",
                title = "Saffron Sea Bass with Fennel Citrus Puree",
                cuisine = "Mediterranean Fusion",
                countryCode = "GR",
                imageUrl = "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=80",
                prepTime = "15 mins",
                cookTime = "20 mins",
                difficulty = "Medium",
                calories = 420,
                servings = 2,
                rating = 4.9,
                reviewsCount = 142,
                author = ChefAuthor(
                    name = "Chef Elena Rostova",
                    avatarUrl = "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=200&q=80",
                    badge = "Michelin Star"
                ),
                tags = listOf("Zero Waste", "High Protein", "Gluten Free"),
                dietary = listOf("Gluten-Free", "Pescatarian"),
                matchScore = 98,
                ingredients = listOf(
                    Ingredient("Wild Sea Bass Fillet", "2 pcs (400g)", inPantry = true, category = "Proteins"),
                    Ingredient("Iranian Saffron Threads", "1 pinch", inPantry = true, category = "Pantry & Spices"),
                    Ingredient("Fresh Fennel Bulb", "1 large", inPantry = false, category = "Vegetables"),
                    Ingredient("Sicilian Blood Orange", "2 pcs", inPantry = false, category = "Produce"),
                    Ingredient("Cold Pressed Olive Oil", "2 tbsp", inPantry = true, category = "Pantry & Spices")
                ),
                steps = listOf(
                    CookingStep(1, "Infuse Saffron & Prep Citrus", "Gently bloom saffron in warm orange reduction with crushed coriander seeds.", 5, "Use the orange peels for zest to achieve 100% zero-waste extraction."),
                    CookingStep(2, "Caramelize Fennel", "Slow braise thin fennel slices in olive oil until tender and lightly charred.", 8),
                    CookingStep(3, "Pan Sear Sea Bass", "Score the skin and sear skin-side down for 4 mins until crispy, then flip for 2 mins.", 6, "Press gently with a spatula during first 30 seconds to keep the skin flat."),
                    CookingStep(4, "Plate & Drizzle Reduction", "Layer silky fennel puree, rest the crispy bass on top, finish with bright citrus saffron glaze.", 2)
                ),
                tasteProfile = TasteProfile(sweet = 3, savory = 9, spicy = 2, sour = 6, umami = 9),
                zeroWasteTip = "Fennel fronds serve as aromatic herb garnish while citrus rinds candy into zesty glaze.",
                isSaved = true
            ),
            Recipe(
                id = "rec-2",
                title = "Charred Oaxacan Mole Negro with Duck Breast",
                cuisine = "Mexican Heritage",
                countryCode = "MX",
                imageUrl = "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
                prepTime = "25 mins",
                cookTime = "45 mins",
                difficulty = "Advanced",
                calories = 680,
                servings = 4,
                rating = 5.0,
                reviewsCount = 289,
                author = ChefAuthor(
                    name = "Chef Mateo Morales",
                    avatarUrl = "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=200&q=80",
                    badge = "Oaxacan Heritage"
                ),
                tags = listOf("Signature", "Complex Umami", "Heritage"),
                dietary = listOf("Gluten-Free"),
                matchScore = 95,
                ingredients = listOf(
                    Ingredient("Crispy Duck Breast", "2 breasts (500g)", inPantry = false, category = "Proteins"),
                    Ingredient("Dried Mulato & Pasilla Chilies", "4 pcs", inPantry = true, category = "Pantry & Spices"),
                    Ingredient("70% Dark Mexican Cacao", "40g", inPantry = true, category = "Pantry & Spices"),
                    Ingredient("Toasted Sesame Seeds", "2 tbsp", inPantry = true, category = "Pantry & Spices")
                ),
                steps = listOf(
                    CookingStep(1, "Toast & Rehydrate Chilies", "Blister dried chilies on dry comal until fragrant, then soak in hot stock.", 10),
                    CookingStep(2, "Simmer Rich Mole Paste", "Blend chilies with Mexican dark chocolate, plantain, and warm spices. Simmer low.", 25),
                    CookingStep(3, "Render Duck Breast", "Score fat in diamond pattern, render slowly in cold skillet until mahogany crisp.", 12),
                    CookingStep(4, "Garnish & Rest", "Slice duck and nap with warm velvety mole. Garnish with toasted sesame.", 3)
                ),
                tasteProfile = TasteProfile(sweet = 4, savory = 9, spicy = 7, sour = 3, umami = 10),
                zeroWasteTip = "Rendered duck fat can be strained and saved in your pantry for artisan roasted potatoes."
            ),
            Recipe(
                id = "rec-3",
                title = "Levantine Spiced Lamb Shank with Pomegranate Glaze",
                cuisine = "Levantine Gourmet",
                countryCode = "LB",
                imageUrl = "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
                prepTime = "20 mins",
                cookTime = "120 mins",
                difficulty = "Hard",
                calories = 720,
                servings = 4,
                rating = 4.95,
                reviewsCount = 312,
                author = ChefAuthor(
                    name = "Chef Tarek Al-Halabi",
                    avatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
                    badge = "Beirut Culinary Master"
                ),
                tags = listOf("Slow Cooked", "High Protein", "Festive"),
                dietary = listOf("Halal", "Dairy-Free"),
                matchScore = 97,
                ingredients = listOf(
                    Ingredient("Grass-fed Lamb Shanks", "4 pcs", inPantry = false, category = "Proteins"),
                    Ingredient("Pure Pomegranate Molasses", "4 tbsp", inPantry = true, category = "Condiments"),
                    Ingredient("Seven Spices (Baharat)", "2 tsp", inPantry = true, category = "Herbs & Spices"),
                    Ingredient("Fresh Mint & Coriander", "1 bunch", inPantry = true, category = "Produce")
                ),
                steps = listOf(
                    CookingStep(1, "Brown & Aromatics", "Sear seasoned shanks on all sides until golden crust forms.", 15),
                    CookingStep(2, "Slow Braise", "Submerge in spiced broth with garlic and cinnamon; braise on low for 2 hours.", 120),
                    CookingStep(3, "Glaze Reduction", "Baste with tangy pomegranate molasses reduction under broiler.", 8)
                ),
                tasteProfile = TasteProfile(sweet = 5, savory = 10, spicy = 4, sour = 7, umami = 10)
            )
        )
    }
}
