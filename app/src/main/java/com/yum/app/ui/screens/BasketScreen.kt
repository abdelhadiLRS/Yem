package com.yum.app.ui.screens

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
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.yum.app.R
import com.yum.app.data.models.BasketItem
import com.yum.app.ui.theme.YumOrange
import com.yum.app.viewmodel.YumViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun BasketScreen(viewModel: YumViewModel) {
    val basketItems by viewModel.basketItems.collectAsState()
    val isArabic = viewModel.currentLanguage.collectAsState().value == "ar"
    val totalPrice = basketItems.sumOf { it.unitPrice * it.quantity }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(stringResource(R.string.smart_basket), fontWeight = FontWeight.Bold) },
                actions = {
                    if (basketItems.isNotEmpty()) {
                        IconButton(onClick = { viewModel.clearBasket() }) {
                            Icon(Icons.Default.DeleteSweep, contentDescription = "Clear Basket", tint = MaterialTheme.colorScheme.error)
                        }
                    }
                }
            )
        },
        bottomBar = {
            if (basketItems.isNotEmpty()) {
                Surface(
                    shadowElevation = 8.dp,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Row(
                        modifier = Modifier
                            .padding(16.dp)
                            .fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Column {
                            Text("Total Estimated Cost", fontSize = 12.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                            Text("$${String.format("%.2f", totalPrice)}", fontSize = 22.sp, fontWeight = FontWeight.Bold, color = YumOrange)
                        }
                        Button(
                            onClick = { /* Checkout / Export to Yum Market */ },
                            colors = ButtonDefaults.buttonColors(containerColor = YumOrange),
                            shape = RoundedCornerShape(12.dp)
                        ) {
                            Text("Order via Yum Market")
                        }
                    }
                }
            }
        }
    ) { padding ->
        if (basketItems.isEmpty()) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(padding),
                contentAlignment = Alignment.Center
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Icon(Icons.Default.ShoppingBasket, contentDescription = null, modifier = Modifier.size(64.dp), tint = Color.Gray)
                    Spacer(modifier = Modifier.height(16.dp))
                    Text("Your basket is empty", fontSize = 18.sp, color = Color.Gray)
                }
            }
        } else {
            LazyColumn(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(padding)
                    .padding(horizontal = 16.dp),
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                items(basketItems) { item ->
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(12.dp)
                    ) {
                        Row(
                            modifier = Modifier
                                .padding(12.dp)
                                .fillMaxWidth(),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Checkbox(
                                checked = item.isChecked,
                                onCheckedChange = { viewModel.toggleBasketItemCheck(item) },
                                colors = CheckboxDefaults.colors(checkedColor = YumOrange)
                            )
                            Spacer(modifier = Modifier.width(8.dp))
                            Column(modifier = Modifier.weight(1f)) {
                                Text(
                                    text = if (isArabic) item.nameAr else item.name,
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 16.sp
                                )
                                Text(
                                    text = "${item.category} • Qty: ${item.quantity}",
                                    fontSize = 12.sp,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant
                                )
                            }
                            Text(
                                text = "$${String.format("%.2f", item.unitPrice * item.quantity)}",
                                fontWeight = FontWeight.Bold,
                                color = YumOrange
                            )
                            IconButton(onClick = { viewModel.deleteBasketItem(item) }) {
                                Icon(Icons.Default.Close, contentDescription = "Remove", tint = Color.Gray)
                            }
                        }
                    }
                }
            }
        }
    }
}
