package com.yum.app.ui.screens

import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.yum.app.R
import com.yum.app.ui.theme.YumOrange

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AiCookingModeScreen(onBack: () -> Unit) {
    var stepIndex by remember { mutableStateOf(0) }
    var isListening by remember { mutableStateOf(true) }

    val steps = listOf(
        "Step 1: Wash and slice 150g wild mushrooms into thin slices.",
        "Step 2: Bring a large pot of salted water to boil for Tagliatelle pasta.",
        "Step 3: Heat 2 tablespoons of truffle oil in a pan over medium heat.",
        "Step 4: Sauté mushrooms for 5 minutes until golden brown.",
        "Step 5: Add heavy cream and toss with cooked pasta."
    )

    val infiniteTransition = rememberInfiniteTransition(label = "pulse")
    val pulseScale by infiniteTransition.animateFloat(
        initialValue = 1f,
        targetValue = 1.25f,
        animationSpec = infiniteRepeatable(
            animation = tween(1000, easing = LinearOutSlowInEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "scale"
    )

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(stringResource(R.string.ai_cooking_mode), fontWeight = FontWeight.Bold) },
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
                .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.SpaceBetween
        ) {
            // Step Progress
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                LinearProgressIndicator(
                    progress = (stepIndex + 1).toFloat() / steps.size,
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(8.dp)
                        .clip(RoundedCornerShape(4.dp)),
                    color = YumOrange
                )
                Spacer(modifier = Modifier.height(16.dp))
                Text(
                    text = "Step ${stepIndex + 1} of ${steps.size}",
                    fontSize = 14.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }

            // Current Step Card
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
            ) {
                Column(
                    modifier = Modifier.padding(24.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Icon(
                        imageVector = Icons.Default.VolumeUp,
                        contentDescription = "Voice Assistant",
                        tint = YumOrange,
                        modifier = Modifier.size(36.dp)
                    )
                    Spacer(modifier = Modifier.height(16.dp))
                    Text(
                        text = steps[stepIndex],
                        fontSize = 20.sp,
                        fontWeight = FontWeight.SemiBold,
                        lineHeight = 28.sp
                    )
                }
            }

            // Voice Interaction Listening Area
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Box(
                    modifier = Modifier
                        .size(90.dp)
                        .scale(if (isListening) pulseScale else 1f)
                        .clip(CircleShape)
                        .background(if (isListening) YumOrange else Color.Gray),
                    contentAlignment = Alignment.Center
                ) {
                    IconButton(onClick = { isListening = !isListening }) {
                        Icon(
                            imageVector = if (isListening) Icons.Default.Mic else Icons.Default.MicOff,
                            contentDescription = "Mic Toggle",
                            tint = Color.White,
                            modifier = Modifier.size(40.dp)
                        )
                    }
                }
                Spacer(modifier = Modifier.height(12.dp))
                Text(
                    text = if (isListening) "Listening for commands like 'Next step'..." else "Microphone muted",
                    fontSize = 14.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }

            // Step Navigation Controls
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                OutlinedButton(
                    onClick = { if (stepIndex > 0) stepIndex-- },
                    enabled = stepIndex > 0,
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Text("Previous")
                }
                Button(
                    onClick = { if (stepIndex < steps.size - 1) stepIndex++ },
                    enabled = stepIndex < steps.size - 1,
                    colors = ButtonDefaults.buttonColors(containerColor = YumOrange),
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Text("Next Step")
                }
            }
        }
    }
}
