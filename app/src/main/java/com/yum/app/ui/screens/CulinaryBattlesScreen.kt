package com.yum.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.EmojiEvents
import androidx.compose.material.icons.filled.LiveTv
import androidx.compose.material.icons.filled.ThumbUp
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import com.yum.app.R
import com.yum.app.ui.theme.YumOrange
import com.yum.app.viewmodel.YumViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CulinaryBattlesScreen(
    viewModel: YumViewModel,
    onBack: () -> Unit
) {
    val battles by viewModel.battles.collectAsState()
    var votedChef1 by remember { mutableStateOf(false) }
    var votedChef2 by remember { mutableStateOf(false) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(stringResource(R.string.culinary_battles), fontWeight = FontWeight.Bold) },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                }
            )
        }
    ) { padding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            item {
                Text(text = "Live Chef Face-Off", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold)
            }

            items(battles.size) { index ->
                val battle = battles[index]
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(20.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
                ) {
                    Column(modifier = Modifier.padding(20.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Surface(
                                shape = RoundedCornerShape(8.dp),
                                color = Color.Red
                            ) {
                                Text("LIVE", color = Color.White, fontWeight = FontWeight.Bold, fontSize = 12.sp, modifier = Modifier.padding(horizontal = 8.dp, vertical = 2.dp))
                            }
                            Text("Dish: ${battle.dishName}", fontWeight = FontWeight.SemiBold, fontSize = 14.sp)
                        }

                        Spacer(modifier = Modifier.height(20.dp))

                        // Battle Face-off vs UI
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceEvenly,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            // Chef 1
                            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                AsyncImage(
                                    model = battle.chef1Avatar,
                                    contentDescription = battle.chef1Name,
                                    modifier = Modifier.size(70.dp).clip(CircleShape),
                                    contentScale = ContentScale.Crop
                                )
                                Spacer(modifier = Modifier.height(8.dp))
                                Text(battle.chef1Name, fontWeight = FontWeight.Bold, fontSize = 14.sp)
                                Button(
                                    onClick = { votedChef1 = true; votedChef2 = false },
                                    colors = ButtonDefaults.buttonColors(containerColor = if (votedChef1) YumOrange else Color.Gray),
                                    modifier = Modifier.padding(top = 8.dp)
                                ) {
                                    Icon(Icons.Default.ThumbUp, contentDescription = null, modifier = Modifier.size(16.dp))
                                    Spacer(modifier = Modifier.width(4.dp))
                                    Text("${battle.chef1Votes + if (votedChef1) 1 else 0}")
                                }
                            }

                            Text("VS", fontSize = 24.sp, fontWeight = FontWeight.Black, color = YumOrange)

                            // Chef 2
                            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                AsyncImage(
                                    model = battle.chef2Avatar,
                                    contentDescription = battle.chef2Name,
                                    modifier = Modifier.size(70.dp).clip(CircleShape),
                                    contentScale = ContentScale.Crop
                                )
                                Spacer(modifier = Modifier.height(8.dp))
                                Text(battle.chef2Name, fontWeight = FontWeight.Bold, fontSize = 14.sp)
                                Button(
                                    onClick = { votedChef2 = true; votedChef1 = false },
                                    colors = ButtonDefaults.buttonColors(containerColor = if (votedChef2) YumOrange else Color.Gray),
                                    modifier = Modifier.padding(top = 8.dp)
                                ) {
                                    Icon(Icons.Default.ThumbUp, contentDescription = null, modifier = Modifier.size(16.dp))
                                    Spacer(modifier = Modifier.width(4.dp))
                                    Text("${battle.chef2Votes + if (votedChef2) 1 else 0}")
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LiveStudioScreen(onBack: () -> Unit) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(stringResource(R.string.live_studio), fontWeight = FontWeight.Bold) },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                }
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            // Live Stream Player Placeholder
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(240.dp)
                    .clip(RoundedCornerShape(20.dp))
                    .background(Color.Black),
                contentAlignment = Alignment.Center
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Icon(Icons.Default.LiveTv, contentDescription = null, tint = Color.Red, modifier = Modifier.size(56.dp))
                    Spacer(modifier = Modifier.height(8.dp))
                    Text("Live Stream Studio Broadcast", color = Color.White, fontWeight = FontWeight.Bold)
                    Text("Chef Antonio is making Handmade Gnocchi", color = Color.LightGray, fontSize = 12.sp)
                }
            }

            Spacer(modifier = Modifier.height(20.dp))
            Text("Interactive Live Chat & Ingredient Overlays", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
        }
    }
}
