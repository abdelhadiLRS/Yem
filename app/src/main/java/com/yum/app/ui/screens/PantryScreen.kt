package com.yum.app.ui.screens

import androidx.compose.foundation.background
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
import com.yum.app.data.models.PantryItem
import com.yum.app.ui.theme.YumOrange
import com.yum.app.viewmodel.YumViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PantryScreen(viewModel: YumViewModel) {
    val pantryItems by viewModel.pantryItems.collectAsState()
    val isArabic = viewModel.currentLanguage.collectAsState().value == "ar"
    var showAddDialog by remember { mutableStateOf(false) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(stringResource(R.string.smart_pantry), fontWeight = FontWeight.Bold) }
            )
        },
        floatingActionButton = {
            FloatingActionButton(
                onClick = { showAddDialog = true },
                containerColor = YumOrange
            ) {
                Icon(Icons.Default.Add, contentDescription = "Add Item", tint = Color.White)
            }
        }
    ) { padding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            // Zero Waste Banner
            item {
                val zeroWasteItems = pantryItems.filter { it.isZeroWasteAlert }
                if (zeroWasteItems.isNotEmpty()) {
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.errorContainer),
                        shape = RoundedCornerShape(16.dp)
                    ) {
                        Row(
                            modifier = Modifier.padding(16.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Icon(Icons.Default.Warning, contentDescription = null, tint = MaterialTheme.colorScheme.error)
                            Spacer(modifier = Modifier.width(12.dp))
                            Column {
                                Text(
                                    text = stringResource(R.string.zero_waste),
                                    fontWeight = FontWeight.Bold,
                                    color = MaterialTheme.colorScheme.onErrorContainer
                                )
                                Text(
                                    text = "${zeroWasteItems.size} items expiring soon! Cook now to reduce waste.",
                                    fontSize = 13.sp,
                                    color = MaterialTheme.colorScheme.onErrorContainer
                                )
                            }
                        }
                    }
                }
            }

            items(pantryItems) { item ->
                PantryItemCard(
                    item = item,
                    isArabic = isArabic,
                    onDelete = { viewModel.deletePantryItem(item) }
                )
            }
        }

        if (showAddDialog) {
            AddPantryDialog(
                onDismiss = { showAddDialog = false },
                onAdd = { name, nameAr, cat, qty, days ->
                    viewModel.addPantryItem(name, nameAr, cat, qty, days)
                    showAddDialog = false
                }
            )
        }
    }
}

@Composable
fun PantryItemCard(
    item: PantryItem,
    isArabic: Boolean,
    onDelete: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp)
    ) {
        Row(
            modifier = Modifier
                .padding(16.dp)
                .fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = if (isArabic) item.nameAr else item.name,
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = "${item.category} • ${item.quantity}",
                    fontSize = 14.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                Spacer(modifier = Modifier.height(8.dp))
                Row(verticalAlignment = Alignment.CenterVertically) {
                    LinearProgressIndicator(
                        progress = item.freshnessPercentage / 100f,
                        modifier = Modifier
                            .width(120.dp)
                            .height(6.dp)
                            .clip(RoundedCornerShape(3.dp)),
                        color = if (item.isZeroWasteAlert) Color.Red else YumOrange
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = "${item.expiryDaysRemaining} days left",
                        fontSize = 12.sp,
                        color = if (item.isZeroWasteAlert) Color.Red else MaterialTheme.colorScheme.onSurface
                    )
                }
            }
            IconButton(onClick = onDelete) {
                Icon(Icons.Default.Delete, contentDescription = "Delete", tint = MaterialTheme.colorScheme.error)
            }
        }
    }
}

@Composable
fun AddPantryDialog(
    onDismiss: () -> Unit,
    onAdd: (String, String, String, String, Int) -> Unit
) {
    var name by remember { mutableStateOf("") }
    var nameAr by remember { mutableStateOf("") }
    var category by remember { mutableStateOf("Dairy") }
    var quantity by remember { mutableStateOf("1 pc") }
    var expiryDays by remember { mutableStateOf("5") }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text("Add Pantry Item") },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                OutlinedTextField(value = name, onValueChange = { name = it }, label = { Text("Name (English)") })
                OutlinedTextField(value = nameAr, onValueChange = { nameAr = it }, label = { Text("Name (Arabic)") })
                OutlinedTextField(value = category, onValueChange = { category = it }, label = { Text("Category") })
                OutlinedTextField(value = quantity, onValueChange = { quantity = it }, label = { Text("Quantity") })
                OutlinedTextField(value = expiryDays, onValueChange = { expiryDays = it }, label = { Text("Expiry (Days)") })
            }
        },
        confirmButton = {
            Button(
                onClick = {
                    onAdd(name, nameAr, category, quantity, expiryDays.toIntOrNull() ?: 5)
                },
                colors = ButtonDefaults.buttonColors(containerColor = YumOrange)
            ) {
                Text("Add")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Cancel")
            }
        }
    )
}
