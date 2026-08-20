package com.yum.app.data.repository

import com.yum.app.data.models.PassportStamp
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow

class PassportRepository {

    private val _stamps = MutableStateFlow<List<PassportStamp>>(getInitialStamps())
    val stamps: Flow<List<PassportStamp>> = _stamps.asStateFlow()

    fun unlockStamp(stampId: String) {
        _stamps.value = _stamps.value.map {
            if (it.id == stampId) {
                it.copy(
                    unlocked = true,
                    dishesTried = (it.dishesTried + 1).coerceAtMost(it.dishesTotal),
                    unlockDate = "Just now"
                )
            } else it
        }
    }

    private fun getInitialStamps(): List<PassportStamp> {
        return listOf(
            PassportStamp(
                id = "stamp-jp",
                country = "Japan",
                countryAr = "اليابان",
                flag = "🇯🇵",
                cuisineName = "Artisan Kaiseki & Washoku",
                badgeLevel = "Master",
                dishesTried = 5,
                dishesTotal = 5,
                unlocked = true,
                signatureDish = "Dashi Glazed Black Cod with Miso",
                description = "Mastery of umami extraction, precision knife skills, and seasonal micro-ingredients.",
                latitude = 35.6762,
                longitude = 139.6503
            ),
            PassportStamp(
                id = "stamp-it",
                country = "Italy",
                countryAr = "إيطاليا",
                flag = "🇮🇹",
                cuisineName = "Handmade Pasta & Slow Cucina",
                badgeLevel = "Enthusiast",
                dishesTried = 3,
                dishesTotal = 5,
                unlocked = true,
                signatureDish = "Truffled Risotto alla Milanese",
                description = "Rooted in simplicity, hyper-local olive oils, and regional pasta alchemy.",
                latitude = 41.8719,
                longitude = 12.5674
            ),
            PassportStamp(
                id = "stamp-mx",
                country = "Mexico",
                countryAr = "المكسيك",
                flag = "🇲🇽",
                cuisineName = "Ancient Mole & Nixtamalization",
                badgeLevel = "Novice",
                dishesTried = 1,
                dishesTotal = 4,
                unlocked = true,
                signatureDish = "Charred Duck Breast in Mole Negro",
                description = "Complex chili smoking, indigenous heirloom corn nixtamalization, and artisanal chocolates.",
                latitude = 23.6345,
                longitude = -102.5528
            ),
            PassportStamp(
                id = "stamp-lb",
                country = "Lebanon",
                countryAr = "لبنان",
                flag = "🇱🇧",
                cuisineName = "Levantine Mezze & Clay Pot Braises",
                badgeLevel = "Master",
                dishesTried = 4,
                dishesTotal = 4,
                unlocked = true,
                signatureDish = "Pomegranate Glazed Lamb Shank",
                description = "Sumac, zaatar aromatics, velvety labneh emulsions, and slow wood-fire cooking.",
                latitude = 33.8547,
                longitude = 35.8623
            ),
            PassportStamp(
                id = "stamp-fr",
                country = "France",
                countryAr = "فرنسا",
                flag = "🇫🇷",
                cuisineName = "Haute Cuisine & Classical Sauces",
                badgeLevel = "Locked",
                dishesTried = 0,
                dishesTotal = 5,
                unlocked = false,
                signatureDish = "Canard à l'Orange with Grand Marnier",
                description = "Mother sauces, butter emulsion mastery, and artisanal patisserie techniques.",
                latitude = 46.2276,
                longitude = 2.2137
            ),
            PassportStamp(
                id = "stamp-ma",
                country = "Morocco",
                countryAr = "المغرب",
                flag = "🇲🇦",
                cuisineName = "Maghreb Tagines & Ras el Hanout",
                badgeLevel = "Locked",
                dishesTried = 0,
                dishesTotal = 4,
                unlocked = false,
                signatureDish = "Preserved Lemon Tagine with Saffron",
                description = "Sweet and savory harmony, clay vessel steam circulation, and 27-spice blends.",
                latitude = 31.7917,
                longitude = -7.0926
            )
        )
    }
}
