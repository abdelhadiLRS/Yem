package com.yum.app.data.local

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import androidx.room.Update
import com.yum.app.data.models.PantryItem
import kotlinx.coroutines.flow.Flow

@Dao
interface PantryDao {
    @Query("SELECT * FROM pantry_items ORDER BY daysRemaining ASC")
    fun getAllPantryItems(): Flow<List<PantryItem>>

    @Query("SELECT * FROM pantry_items WHERE isExpiringSoon = 1 OR daysRemaining <= 2")
    fun getExpiringSoonItems(): Flow<List<PantryItem>>

    @Query("SELECT * FROM pantry_items WHERE category = :category")
    fun getItemsByCategory(category: String): Flow<List<PantryItem>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertItem(item: PantryItem)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAll(items: List<PantryItem>)

    @Update
    suspend fun updateItem(item: PantryItem)

    @Delete
    suspend fun deleteItem(item: PantryItem)

    @Query("DELETE FROM pantry_items WHERE id = :id")
    suspend fun deleteById(id: String)

    @Query("DELETE FROM pantry_items")
    suspend fun clearAll()
}
