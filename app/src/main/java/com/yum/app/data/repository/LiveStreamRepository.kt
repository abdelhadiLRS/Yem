package com.yum.app.data.repository

import com.yum.app.data.models.ChatMessage
import com.yum.app.data.models.LiveStream
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow

class LiveStreamRepository {

    private val _streams = MutableStateFlow<List<LiveStream>>(getInitialStreams())
    val streams: Flow<List<LiveStream>> = _streams.asStateFlow()

    private val _chatMessages = MutableStateFlow<List<ChatMessage>>(getInitialChat())
    val chatMessages: Flow<List<ChatMessage>> = _chatMessages.asStateFlow()

    fun sendMessage(senderName: String, text: String) {
        val newMsg = ChatMessage(
            id = "msg-${System.currentTimeMillis()}",
            senderName = senderName,
            senderLocation = "Home Chef",
            messageText = text,
            timestamp = "Just now",
            isFromUser = true
        )
        _chatMessages.value = _chatMessages.value + newMsg
    }

    private fun getInitialStreams(): List<LiveStream> {
        return listOf(
            LiveStream(
                id = "live-1",
                title = "Dim Sum Alchemy: Xiao Long Bao Masterclass",
                chefName = "Chef Lin Wei",
                chefAvatar = "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=200&q=80",
                dishName = "Shanghai Soup Dumplings with Black Vinegar Reduction",
                viewersCount = 1420,
                thumbnail = "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=1000&q=80",
                activeStep = "Step 4/7: Delicate 18-Fold Pleating & Agar Broth Seal",
                currentIngredients = listOf("Wheat Starch", "Rich Bone Aspic", "Minced Kurobuta Pork", "Aged Ginger"),
                isLive = true
            ),
            LiveStream(
                id = "live-2",
                title = "Fire & Smoke: Argentine Asado Secrets",
                chefName = "Chef Santiago Gomez",
                chefAvatar = "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=200&q=80",
                dishName = "Wood-Fired Ribeye with Chimichurri Crudo",
                viewersCount = 890,
                thumbnail = "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
                activeStep = "Step 2/5: Hardwood Ember Management & Salt Crust",
                currentIngredients = listOf("Grass-fed Ribeye", "Coarse Sea Salt", "Fresh Oregano", "Wine Vinegar"),
                isLive = true
            )
        )
    }

    private fun getInitialChat(): List<ChatMessage> {
        return listOf(
            ChatMessage("m-1", "Nadia (Dubai)", "Dubai", "What is the exact ratio of ginger to black vinegar?", "12:04"),
            ChatMessage("m-2", "Chef Julien (Lyon)", "Lyon", "Magnificent dough elasticity! The gluten window is crystal clear.", "12:05"),
            ChatMessage("m-3", "Karim (Cairo)", "Cairo", "Loving the live ingredient overlay feature on the Android stream!", "12:06")
        )
    }
}
