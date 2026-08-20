package com.yum.app.data.local

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.sqlite.db.SupportSQLiteDatabase
import com.yum.app.data.models.BasketItem
import com.yum.app.data.models.PantryItem
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

@Database(entities = [PantryItem::class, BasketItem::class], version = 1, exportSchema = false)
abstract class YumDatabase : RoomDatabase() {

    abstract fun pantryDao(): PantryDao
    abstract fun basketDao(): BasketDao

    companion object {
        @Volatile
        private var INSTANCE: YumDatabase? = null

        fun getDatabase(context: Context, scope: CoroutineScope): YumDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    YumDatabase::class.java,
                    "yum_culinary_database"
                )
                .addCallback(YumDatabaseCallback(scope))
                .build()
                INSTANCE = instance
                instance
            }
        }

        private class YumDatabaseCallback(
            private val scope: CoroutineScope
        ) : RoomDatabase.Callback() {
            override fun onCreate(db: SupportSQLiteDatabase) {
                super.onCreate(db)
                INSTANCE?.let { database ->
                    scope.launch(Dispatchers.IO) {
                        populateInitialData(database.pantryDao(), database.basketDao())
                    }
                }
            }

            suspend fun populateInitialData(pantryDao: PantryDao, basketDao: BasketDao) {
                // Initial Pantry Items
                val samplePantry = listOf(
                    PantryItem(
                        id = "p-1",
                        name = "Organic Avocados",
                        category = "Vegetables",
                        quantity = "3 pcs",
                        daysRemaining = 1,
                        freshnessScore = 30,
                        iconEmoji = "🥑",
                        isExpiringSoon = true
                    ),
                    PantryItem(
                        id = "p-2",
                        name = "Wild Atlantic Salmon Fillet",
                        category = "Proteins",
                        quantity = "450 g",
                        daysRemaining = 2,
                        freshnessScore = 45,
                        iconEmoji = "🐟",
                        isExpiringSoon = true
                    ),
                    PantryItem(
                        id = "p-3",
                        name = "Greek Sheep Yogurt",
                        category = "Dairy",
                        quantity = "500 g",
                        daysRemaining = 4,
                        freshnessScore = 80,
                        iconEmoji = "🥛",
                        isExpiringSoon = false
                    ),
                    PantryItem(
                        id = "p-4",
                        name = "Iranian Saffron Threads",
                        category = "Pantry & Spices",
                        quantity = "5 g",
                        daysRemaining = 180,
                        freshnessScore = 100,
                        iconEmoji = "✨",
                        isExpiringSoon = false
                    ),
                    PantryItem(
                        id = "p-5",
                        name = "Aged Parmigiano Reggiano",
                        category = "Dairy",
                        quantity = "200 g",
                        daysRemaining = 18,
                        freshnessScore = 90,
                        iconEmoji = "🧀",
                        isExpiringSoon = false
                    )
                )
                pantryDao.insertAll(samplePantry)

                // Initial Basket Items
                val sampleBasket = listOf(
                    BasketItem(
                        id = "b-1",
                        name = "Italian Truffle Oil",
                        category = "Condiments",
                        quantity = 1.0,
                        unit = "bottle",
                        estimatedPrice = 14.50,
                        isChecked = false,
                        storeName = "Artisan Gourmet",
                        sourceRecipeTitle = "Truffled Risotto"
                    ),
                    BasketItem(
                        id = "b-2",
                        name = "Organic Carnaroli Rice",
                        category = "Produce",
                        quantity = 1.0,
                        unit = "500g box",
                        estimatedPrice = 4.20,
                        isChecked = false,
                        storeName = "Local Market",
                        sourceRecipeTitle = "Truffled Risotto"
                    ),
                    BasketItem(
                        id = "b-3",
                        name = "Fresh Organic Rosemary",
                        category = "Herbs & Spices",
                        quantity = 1.0,
                        unit = "bunch",
                        estimatedPrice = 1.80,
                        isChecked = true,
                        storeName = "Green Organics"
                    )
                )
                basketDao.insertAll(sampleBasket)
            }
        }
    }
}
