package com.yum.app.data.local

import androidx.room.*
import com.yum.app.data.models.BasketItem
import com.yum.app.data.models.PantryItem
import com.yum.app.data.models.PassportStamp
import kotlinx.coroutines.flow.Flow

@Dao
interface PantryDao {
    @Query("SELECT * FROM pantry_items ORDER BY expiryDaysRemaining ASC")
    fun getAllPantryItems(): Flow<List<PantryItem>>

    @Query("SELECT COUNT(*) FROM pantry_items")
    suspend fun getCount(): Int

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertPantryItem(item: PantryItem)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAllPantryItems(items: List<PantryItem>)

    @Delete
    suspend fun deletePantryItem(item: PantryItem)

    @Query("DELETE FROM pantry_items WHERE id = :id")
    suspend fun deletePantryItemById(id: String)
}

@Dao
interface BasketDao {
    @Query("SELECT * FROM basket_items")
    fun getAllBasketItems(): Flow<List<BasketItem>>

    @Query("SELECT COUNT(*) FROM basket_items")
    suspend fun getCount(): Int

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertBasketItem(item: BasketItem)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAllBasketItems(items: List<BasketItem>)

    @Update
    suspend fun updateBasketItem(item: BasketItem)

    @Delete
    suspend fun deleteBasketItem(item: BasketItem)

    @Query("DELETE FROM basket_items WHERE id = :id")
    suspend fun deleteBasketItemById(id: String)

    @Query("DELETE FROM basket_items")
    suspend fun clearBasket()
}

@Dao
interface PassportDao {
    @Query("SELECT * FROM passport_stamps")
    fun getAllStamps(): Flow<List<PassportStamp>>

    @Query("SELECT COUNT(*) FROM passport_stamps")
    suspend fun getCount(): Int

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAllStamps(stamps: List<PassportStamp>)

    @Update
    suspend fun updateStamp(stamp: PassportStamp)
}
