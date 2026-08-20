package com.yum.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.yum.app.R
import com.yum.app.data.models.AiChatMessage
import com.yum.app.ui.components.RecipeCard
import com.yum.app.ui.theme.YumOrange
import com.yum.app.viewmodel.YumViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AiChatScreen(
    viewModel: YumViewModel,
    onNavigateToCookingMode: () -> Unit
) {
    val messages by viewModel.chatMessages.collectAsState()
    val isThinking by viewModel.isAiThinking.collectAsState()
    val isArabic = viewModel.currentLanguage.collectAsState().value == "ar"
    var inputText by remember { mutableStateOf("") }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(Icons.Default.Psychology, contentDescription = null, tint = YumOrange)
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(text = stringResource(R.string.nav_ai), fontWeight = FontWeight.Bold)
                    }
                },
                actions = {
                    IconButton(onClick = onNavigateToCookingMode) {
                        Icon(Icons.Default.Mic, contentDescription = "Cooking Mode", tint = YumOrange)
                    }
                }
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) {
            LazyColumn(
                modifier = Modifier
                    .weight(1f)
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                items(messages) { msg ->
                    ChatBubble(
                        message = msg,
                        isArabic = isArabic,
                        onSuggestionClick = { suggestion ->
                            viewModel.sendAiPrompt(suggestion)
                        }
                    )
                }

                if (isThinking) {
                    item {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            modifier = Modifier.padding(8.dp)
                        ) {
                            CircularProgressIndicator(
                                modifier = Modifier.size(20.dp),
                                color = YumOrange,
                                strokeWidth = 2.dp
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Text(
                                text = "Yum AI is thinking...",
                                style = MaterialTheme.typography.bodySmall,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        }
                    }
                }
            }

            // Input Bar
            Surface(
                tonalElevation = 4.dp,
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier
                        .padding(12.dp)
                        .fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    IconButton(onClick = { /* Camera feature */ }) {
                        Icon(Icons.Default.PhotoCamera, contentDescription = "Camera", tint = YumOrange)
                    }
                    IconButton(onClick = onNavigateToCookingMode) {
                        Icon(Icons.Default.Mic, contentDescription = "Voice Input", tint = YumOrange)
                    }
                    OutlinedTextField(
                        value = inputText,
                        onValueChange = { inputText = it },
                        placeholder = { Text("Ask Yum AI...") },
                        modifier = Modifier
                            .weight(1f)
                            .padding(horizontal = 8.dp),
                        shape = RoundedCornerShape(24.dp)
                    )
                    IconButton(
                        onClick = {
                            if (inputText.isNotBlank()) {
                                viewModel.sendAiPrompt(inputText)
                                inputText = ""
                            }
                        }
                    ) {
                        Icon(Icons.Default.Send, contentDescription = "Send", tint = YumOrange)
                    }
                }
            }
        }
    }
}

@Composable
fun ChatBubble(
    message: AiChatMessage,
    isArabic: Boolean,
    onSuggestionClick: (String) -> Unit
) {
    Column(
        horizontalAlignment = if (message.isFromUser) Alignment.End else Alignment.Start,
        modifier = Modifier.fillMaxWidth()
    ) {
        Surface(
            shape = RoundedCornerShape(16.dp),
            color = if (message.isFromUser) YumOrange else MaterialTheme.colorScheme.surfaceVariant,
            modifier = Modifier.widthIn(max = 280.dp)
        ) {
            Column(modifier = Modifier.padding(12.dp)) {
                Text(
                    text = message.text,
                    color = if (message.isFromUser) Color.White else MaterialTheme.colorScheme.onSurface,
                    fontSize = 15.sp
                )
            }
        }

        // Attached Recipe Card
        message.recipeCard?.let { recipe ->
            Spacer(modifier = Modifier.height(8.dp))
            RecipeCard(
                recipe = recipe,
                isArabic = isArabic,
                onClick = {},
                modifier = Modifier.width(280.dp)
            )
        }

        // Suggestions Pills
        if (message.ingredientSuggestions.isNotEmpty()) {
            Spacer(modifier = Modifier.height(8.dp))
            Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                message.ingredientSuggestions.forEach { suggestion ->
                    SuggestionChip(
                        onClick = { onSuggestionClick(suggestion) },
                        label = { Text(suggestion, fontSize = 12.sp) },
                        colors = SuggestionChipDefaults.suggestionChipColors(
                            containerColor = YumOrange.copy(alpha = 0.1f),
                            labelColor = YumOrange
                        )
                    )
                }
            }
        }
    }
}
