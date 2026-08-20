package com.yum.app.data.models

data class PassportStamp(
    val id: String,
    val country: String,
    val countryAr: String,
    val flag: String,
    val cuisineName: String,
    val badgeLevel: String, // Novice, Enthusiast, Master, Grand Chef
    val dishesTried: Int,
    val dishesTotal: Int,
    val unlocked: Boolean,
    val signatureDish: String,
    val description: String,
    val unlockDate: String? = null,
    val latitude: Double = 0.0,
    val longitude: Double = 0.0
)
