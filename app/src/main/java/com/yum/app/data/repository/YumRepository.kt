package com.yum.app.data.repository

import com.yum.app.data.local.BasketDao
import com.yum.app.data.local.PantryDao
import com.yum.app.data.local.PassportDao
import com.yum.app.data.models.*
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import java.util.UUID

class YumRepository(
    private val pantryDao: PantryDao,
    private val basketDao: BasketDao,
    private val passportDao: PassportDao
) {
    // Mock static recipes list based on Yum design
    private val _recipes = MutableStateFlow(
        listOf(
            Recipe(
                id = "1",
                title = "Truffle Mushroom Tagliatelle",
                titleAr = "تاغلياتيل بالمشروم والتروفل",
                description = "Creamy artisanal pasta infused with black truffle paste and wild mushrooms.",
                descriptionAr = "باستا إيطالية كريمية فاخرة مع الفطر البري ومعجون التروفل الأسود.",
                cuisine = "Italian",
                prepTimeMinutes = 25,
                calories = 520,
                difficulty = "Medium",
                rating = 4.9,
                imageUrl = "https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=600",
                ingredients = listOf("200g Tagliatelle", "150g Wild Mushrooms", "2 tbsp Truffle Oil", "100ml Heavy Cream", "Parmesan"),
                steps = listOf("Boil pasta until al dente.", "Sauté mushrooms in truffle butter.", "Stir in heavy cream and parmesan.", "Toss pasta in sauce and garnish."),
                isFeatured = true,
                isTrending = true
            ),
            Recipe(
                id = "2",
                title = "Smoked Shakshuka with Feta",
                titleAr = "شكشوكة مدخنة بالجبنة الفيتا",
                description = "Poached eggs in a spicy tomato, bell pepper, and cumin sauce topped with Greek feta.",
                descriptionAr = "بيض مطهو ببطء في صلصة طماطم حارة وفلفل رومي مع جبن الفيتا اليوناني.",
                cuisine = "Middle Eastern",
                prepTimeMinutes = 20,
                calories = 380,
                difficulty = "Easy",
                rating = 4.8,
                imageUrl = "https://images.unsplash.com/photo-1590412200988-a436970781fa?w=600",
                ingredients = listOf("4 Eggs", "3 Tomatoes", "1 Red Bell Pepper", "100g Feta Cheese", "1 tsp Cumin"),
                steps = listOf("Dice tomatoes and peppers.", "Sauté spices and vegetables until soft.", "Make wells and crack eggs.", "Cover until eggs are set and top with feta."),
                isFeatured = true,
                isTrending = false
            ),
            Recipe(
                id = "3",
                title = "Matcha Glazed Salmon",
                titleAr = "سالمون بصلصة الماتشا",
                description = "Pan-seared Atlantic salmon glazed with ceremonial grade matcha and soy honey.",
                descriptionAr = "سالمون أطلسي مشوي بصلصة الماتشا الفاخرة والعسل والصويا.",
                cuisine = "Japanese",
                prepTimeMinutes = 18,
                calories = 440,
                difficulty = "Medium",
                rating = 4.7,
                imageUrl = "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600",
                ingredients = listOf("2 Salmon Fillets", "1 tsp Matcha Powder", "2 tbsp Soy Sauce", "1 tbsp Honey"),
                steps = listOf("Whisk matcha, soy sauce, and honey.", "Sear salmon skin-side down.", "Flip and brush with glaze.", "Serve hot with steamed rice."),
                isFeatured = false,
                isTrending = true
            )
        )
    )
    val recipes: Flow<List<Recipe>> = _recipes.asStateFlow()

    // Room DB Flows
    val pantryItems: Flow<List<PantryItem>> = pantryDao.getAllPantryItems()
    val basketItems: Flow<List<BasketItem>> = basketDao.getAllBasketItems()
    val passportStamps: Flow<List<PassportStamp>> = passportDao.getAllStamps()

    // Battles flow
    private val _battles = MutableStateFlow(
        listOf(
            CulinaryBattle(
                id = "b1",
                title = "Ultimate Pasta Face-Off",
                chef1Name = "Chef Marco",
                chef2Name = "AI Culinary Assistant",
                chef1Avatar = "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=200",
                chef2Avatar = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200",
                chef1Votes = 1420,
                chef2Votes = 1890,
                timeRemainingSeconds = 420,
                dishName = "Artisanal Ravioli",
                isLive = true
            )
        )
    )
    val battles: Flow<List<CulinaryBattle>> = _battles.asStateFlow()

    // Seed initial database data only if tables are empty
    suspend fun seedInitialDataIfEmpty() {
        if (pantryDao.getCount() == 0) {
            pantryDao.insertAllPantryItems(
                listOf(
                    PantryItem("p1", "Organic Eggs", "بيض عضوي", "Dairy", "12 pcs", 3, 40, true),
                    PantryItem("p2", "Greek Yogurt", "زبادي يوناني", "Dairy", "500g", 5, 65, false),
                    PantryItem("p3", "Fresh Tomatoes", "طماطم طازجة", "Produce", "1 kg", 2, 25, true),
                    PantryItem("p4", "Extra Virgin Olive Oil", "زيت زيتون بكر", "Pantry", "750 ml", 180, 95, false)
                )
            )
        }

        if (basketDao.getCount() == 0) {
            basketDao.insertAllBasketItems(
                listOf(
                    BasketItem("b1", "Heavy Cream", "كريمة خفق", "Dairy", 1, 4.50, false),
                    BasketItem("b2", "Parmesan Cheese", "جبن بارميزان", "Dairy", 1, 8.20, true),
                    BasketItem("b3", "Fresh Basil", "ريحان طازج", "Produce", 2, 2.00, false)
                )
            )
        }

        if (passportDao.getCount() == 0) {
            passportDao.insertAllStamps(
                listOf(
                    PassportStamp("IT", "Italy", "إيطاليا", "🇮🇹", true, "2024-01-15", 5, 250),
                    PassportStamp("JP", "Japan", "اليابان", "🇯🇵", true, "2024-02-10", 3, 150),
                    PassportStamp("MX", "Mexico", "المكسيك", "🇲🇽", false, null, 0, 0),
                    PassportStamp("FR", "France", "فرنسا", "🇫🇷", false, null, 0, 0),
                    PassportStamp("SA", "Saudi Arabia", "السعودية", "🇸🇦", true, "2024-03-01", 8, 400),
                    PassportStamp("IN", "India", "الهند", "🇮🇳", false, null, 0, 0)
                )
            )
        }
    }

    // Pantry methods
    suspend fun addPantryItem(name: String, nameAr: String, category: String, quantity: String, expiryDays: Int) {
        val item = PantryItem(
            id = UUID.randomUUID().toString(),
            name = name,
            nameAr = nameAr,
            category = category,
            quantity = quantity,
            expiryDaysRemaining = expiryDays,
            freshnessPercentage = (expiryDays * 10).coerceAtMost(100),
            isZeroWasteAlert = expiryDays <= 3
        )
        pantryDao.insertPantryItem(item)
    }

    suspend fun deletePantryItem(item: PantryItem) = pantryDao.deletePantryItem(item)

    // Basket methods
    suspend fun addBasketItem(name: String, nameAr: String, category: String, quantity: Int, price: Double) {
        val item = BasketItem(
            id = UUID.randomUUID().toString(),
            name = name,
            nameAr = nameAr,
            category = category,
            quantity = quantity,
            unitPrice = price,
            isChecked = false
        )
        basketDao.insertBasketItem(item)
    }

    suspend fun updateBasketItem(item: BasketItem) = basketDao.updateBasketItem(item)
    suspend fun deleteBasketItem(item: BasketItem) = basketDao.deleteBasketItem(item)
    suspend fun clearBasket() = basketDao.clearBasket()

    // AI Messaging logic (with Mock fallback)
    suspend fun generateAiResponse(userPrompt: String): AiChatMessage {
        val promptLower = userPrompt.lowercase()
        val textResponse = when {
            promptLower.contains("pantry") || promptLower.contains("مؤونة") ->
                "Based on your Smart Pantry, I noticed your eggs and tomatoes are expiring soon! I suggest making a delicious Smoked Shakshuka with Feta."
            promptLower.contains("recipe") || promptLower.contains("وصفة") ->
                "Here is a curated recipe for Truffle Mushroom Tagliatelle that takes only 25 minutes to make!"
            promptLower.contains("hello") || promptLower.contains("مرحبا") ->
                "Hello! Welcome to Yum AI. What dish or ingredient would you like to explore today?"
            else ->
                "I am Yum AI, your global culinary assistant! I can generate custom recipes, manage your pantry, or guide you step-by-step through cooking."
        }

        val matchingRecipe = if (promptLower.contains("recipe") || promptLower.contains("tagliatelle") || promptLower.contains("وصفة")) {
            _recipes.value.first()
        } else null

        return AiChatMessage(
            id = UUID.randomUUID().toString(),
            text = textResponse,
            isFromUser = false,
            recipeCard = matchingRecipe,
            ingredientSuggestions = listOf("Tomatoes", "Garlic", "Olive Oil", "Fresh Herbs")
        )
    }
}
