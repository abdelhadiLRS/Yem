package com.yum.app.data.repository

import com.yum.app.data.local.PantryDao
import com.yum.app.data.models.PantryItem
import kotlinx.coroutines.flow.Flow

class PantryRepository(private val pantryDao: PantryDao) {

    val allPantryItems: Flow<List<PantryItem>> = pantryDao.getAllPantryItems()
    val expiringSoonItems: Flow<List<PantryItem>> = pantryDao.getExpiringSoonItems()

    fun getItemsByCategory(category: String): Flow<List<PantryItem>> {
        return pantryDao.getItemsByCategory(category)
    }

    suspend fun insertItem(item: PantryItem) {
        pantryDao.insertItem(item)
    }

    suspend fun updateItem(item: PantryItem) {
        pantryDao.updateItem(item)
    }

    suspend fun deleteItem(item: PantryItem) {
        pantryDao.deleteItem(item)
    }

    suspend fun deleteById(id: String) {
        pantryDao.deleteById(id)
    }
}
