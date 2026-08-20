package com.yum.app.data.models

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "pantry_items")
data class PantryItem(
    @PrimaryKey
    val id: String,
    val name: String,
    val category: String, // Vegetables, Proteins, Dairy, Pantry & Spices, Grains, Bakery
    val quantity: String,
    val daysRemaining: Int,
    val freshnessScore: Int, // 0 - 100
    val iconEmoji: String = "📦",
    val isExpiringSoon: Boolean = false,
    val addedTimestamp: Long = System.currentTimeMillis()
)
