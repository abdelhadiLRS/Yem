package com.yum.app.data.local

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import androidx.room.Update
import com.yum.app.data.models.BasketItem
import kotlinx.coroutines.flow.Flow

@Dao
interface BasketDao {
    @Query("SELECT * FROM basket_items ORDER BY addedTimestamp DESC")
    fun getAllBasketItems(): Flow<List<BasketItem>>

    @Query("SELECT * FROM basket_items WHERE isChecked = 0")
    fun getPendingBasketItems(): Flow<List<BasketItem>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertItem(item: BasketItem)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAll(items: List<BasketItem>)

    @Update
    suspend fun updateItem(item: BasketItem)

    @Delete
    suspend fun deleteItem(item: BasketItem)

    @Query("DELETE FROM basket_items WHERE id = :id")
    suspend fun deleteById(id: String)

    @Query("DELETE FROM basket_items WHERE isChecked = 1")
    suspend fun clearCheckedItems()

    @Query("DELETE FROM basket_items")
    suspend fun clearAll()
}
