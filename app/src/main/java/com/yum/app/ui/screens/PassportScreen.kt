package com.yum.app.ui.screens

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Map
import androidx.compose.material.icons.filled.Place
import androidx.compose.material.icons.filled.Public
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.yum.app.R
import com.yum.app.data.models.PassportStamp
import com.yum.app.ui.theme.YumOrange
import com.yum.app.viewmodel.YumViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PassportScreen(
    viewModel: YumViewModel,
    onNavigateToWorldMap: () -> Unit
) {
    val stamps by viewModel.passportStamps.collectAsState()
    val isArabic = viewModel.currentLanguage.collectAsState().value == "ar"
    val unlockedCount = stamps.count { it.isUnlocked }
    val totalXp = stamps.sumOf { it.xpEarned }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(stringResource(R.string.yum_passport), fontWeight = FontWeight.Bold) },
                actions = {
                    IconButton(onClick = onNavigateToWorldMap) {
                        Icon(Icons.Default.Map, contentDescription = "World Map", tint = YumOrange)
                    }
                }
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(16.dp)
        ) {
            // Passport Banner Card
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = YumOrange),
                shape = RoundedCornerShape(20.dp)
            ) {
                Column(modifier = Modifier.padding(20.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text("Global Culinary Passport", color = Color.White, fontWeight = FontWeight.Bold, fontSize = 20.sp)
                            Text("Level 5 Master Gourmet", color = Color.White.copy(0.85f), fontSize = 13.sp)
                        }
                        Surface(
                            shape = CircleShape,
                            color = Color.White.copy(0.2f)
                        ) {
                            Icon(Icons.Default.Public, contentDescription = null, tint = Color.White, modifier = Modifier.padding(12.dp).size(32.dp))
                        }
                    }
                    Spacer(modifier = Modifier.height(16.dp))
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text("Stamps Unlocked: $unlockedCount / ${stamps.size}", color = Color.White, fontWeight = FontWeight.SemiBold)
                        Text("Total XP: $totalXp", color = Color.White, fontWeight = FontWeight.SemiBold)
                    }
                }
            }

            Spacer(modifier = Modifier.height(20.dp))
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text("Cuisine Stamps", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold)
                TextButton(onClick = onNavigateToWorldMap) {
                    Text("Interactive Map >", color = YumOrange)
                }
            }
            Spacer(modifier = Modifier.height(12.dp))

            LazyVerticalGrid(
                columns = GridCells.Fixed(2),
                horizontalArrangement = Arrangement.spacedBy(12.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                items(stamps) { stamp ->
                    PassportStampCard(stamp = stamp, isArabic = isArabic)
                }
            }
        }
    }
}

@Composable
fun PassportStampCard(stamp: PassportStamp, isArabic: Boolean) {
    Card(
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(
            containerColor = if (stamp.isUnlocked) MaterialTheme.colorScheme.surfaceVariant else Color.LightGray.copy(0.3f)
        )
    ) {
        Column(
            modifier = Modifier.padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(text = stamp.flagEmoji, fontSize = 40.sp)
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = if (isArabic) stamp.countryNameAr else stamp.countryName,
                fontWeight = FontWeight.Bold,
                fontSize = 16.sp
            )
            Spacer(modifier = Modifier.height(4.dp))
            if (stamp.isUnlocked) {
                Surface(
                    color = YumOrange.copy(0.15f),
                    shape = RoundedCornerShape(8.dp)
                ) {
                    Text(
                        text = "${stamp.xpEarned} XP",
                        color = YumOrange,
                        fontSize = 12.sp,
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 2.dp)
                    )
                }
            } else {
                Text("Locked", fontSize = 12.sp, color = Color.Gray)
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun WorldMapScreen(onBack: () -> Unit) {
    var selectedCountry by remember { mutableStateOf("Italy") }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(stringResource(R.string.world_map), fontWeight = FontWeight.Bold) },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.Default.Public, contentDescription = "Back")
                    }
                }
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(16.dp)
        ) {
            Text("Native Interactive World Map", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold)
            Spacer(modifier = Modifier.height(8.dp))
            Text("Tap pins on the native map below to discover regional recipes:", fontSize = 14.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
            Spacer(modifier = Modifier.height(16.dp))

            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(260.dp)
                    .clip(RoundedCornerShape(20.dp))
                    .background(Color(0xFF2B3A4A)),
                contentAlignment = Alignment.Center
            ) {
                Canvas(modifier = Modifier.fillMaxSize()) {
                    // Draw decorative globe latitude / longitude grid lines
                    for (i in 1..4) {
                        drawLine(
                            color = Color.White.copy(alpha = 0.15f),
                            start = Offset(0f, size.height * (i / 5f)),
                            end = Offset(size.width, size.height * (i / 5f)),
                            strokeWidth = 2f
                        )
                    }
                }

                // Interactive Map Pins
                Box(
                    modifier = Modifier
                        .offset(x = (-60).dp, y = (-30).dp)
                        .clickable { selectedCountry = "Italy" }
                ) {
                    MapPin(name = "Italy", flag = "🇮🇹", isSelected = selectedCountry == "Italy")
                }

                Box(
                    modifier = Modifier
                        .offset(x = 80.dp, y = (-20).dp)
                        .clickable { selectedCountry = "Japan" }
                ) {
                    MapPin(name = "Japan", flag = "🇯🇵", isSelected = selectedCountry == "Japan")
                }

                Box(
                    modifier = Modifier
                        .offset(x = 10.dp, y = 30.dp)
                        .clickable { selectedCountry = "Saudi Arabia" }
                ) {
                    MapPin(name = "Saudi Arabia", flag = "🇸🇦", isSelected = selectedCountry == "Saudi Arabia")
                }
            }

            Spacer(modifier = Modifier.height(20.dp))

            // Country Details Card
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(16.dp)
            ) {
                Column(modifier = Modifier.padding(20.dp)) {
                    Text(text = "Selected Region: $selectedCountry", fontSize = 18.sp, fontWeight = FontWeight.Bold)
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = when (selectedCountry) {
                            "Italy" -> "Famous for artisanal pasta, risotto, truffle tagliatelle, and espresso culture."
                            "Japan" -> "Renowned for sushi, ramen, matcha infusions, and precision culinary art."
                            else -> "Rich in authentic heritage spices, kabsa, smoked shakshuka, and traditional hospitality."
                        },
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
        }
    }
}

@Composable
fun MapPin(name: String, flag: String, isSelected: Boolean) {
    Surface(
        shape = RoundedCornerShape(20.dp),
        color = if (isSelected) YumOrange else Color.Black.copy(0.7f),
        contentColor = Color.White
    ) {
        Row(
            modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(flag, fontSize = 16.sp)
            Spacer(modifier = Modifier.width(4.dp))
            Text(name, fontSize = 12.sp, fontWeight = FontWeight.Bold)
        }
    }
}
