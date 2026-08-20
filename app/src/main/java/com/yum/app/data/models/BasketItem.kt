package com.yum.app.data.models

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "basket_items")
data class BasketItem(
    @PrimaryKey
    val id: String,
    val name: String,
    val category: String, // Produce, Meat & Seafood, Dairy, Herbs & Spices, Condiments, Bakery
    val quantity: Double = 1.0,
    val unit: String = "item",
    val estimatedPrice: Double = 3.50,
    val isChecked: Boolean = false,
    val storeName: String = "Local Market",
    val sourceRecipeTitle: String? = null,
    val addedTimestamp: Long = System.currentTimeMillis()
)
