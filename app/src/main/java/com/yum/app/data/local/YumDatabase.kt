package com.yum.app.data.local

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import com.yum.app.data.models.BasketItem
import com.yum.app.data.models.PantryItem
import com.yum.app.data.models.PassportStamp

@Database(
    entities = [PantryItem::class, BasketItem::class, PassportStamp::class],
    version = 1,
    exportSchema = false
)
abstract class YumDatabase : RoomDatabase() {
    abstract fun pantryDao(): PantryDao
    abstract fun basketDao(): BasketDao
    abstract fun passportDao(): PassportDao

    companion object {
        @Volatile
        private var INSTANCE: YumDatabase? = null

        fun getDatabase(context: Context): YumDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    YumDatabase::class.java,
                    "yum_database"
                ).fallbackToDestructiveMigration().build()
                INSTANCE = instance
                instance
            }
        }
    }
}
