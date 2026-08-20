package com.yum.app.data.repository

import com.yum.app.data.local.BasketDao
import com.yum.app.data.models.BasketItem
import kotlinx.coroutines.flow.Flow

class BasketRepository(private val basketDao: BasketDao) {

    val allBasketItems: Flow<List<BasketItem>> = basketDao.getAllBasketItems()
    val pendingBasketItems: Flow<List<BasketItem>> = basketDao.getPendingBasketItems()

    suspend fun insertItem(item: BasketItem) {
        basketDao.insertItem(item)
    }

    suspend fun insertAll(items: List<BasketItem>) {
        basketDao.insertAll(items)
    }

    suspend fun updateItem(item: BasketItem) {
        basketDao.updateItem(item)
    }

    suspend fun deleteItem(item: BasketItem) {
        basketDao.deleteItem(item)
    }

    suspend fun deleteById(id: String) {
        basketDao.deleteById(id)
    }

    suspend fun clearCheckedItems() {
        basketDao.clearCheckedItems()
    }
}
