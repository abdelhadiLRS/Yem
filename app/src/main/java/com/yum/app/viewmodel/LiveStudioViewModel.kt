package com.yum.app.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.yum.app.data.models.ChatMessage
import com.yum.app.data.models.LiveStream
import com.yum.app.data.repository.LiveStreamRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

data class LiveStudioUiState(
    val activeStream: LiveStream? = null,
    val streams: List<LiveStream> = emptyList(),
    val chatMessages: List<ChatMessage> = emptyList(),
    val inputMessage: String = ""
)

class LiveStudioViewModel(
    private val liveStreamRepository: LiveStreamRepository
) : ViewModel() {

    private val _selectedStreamId = MutableStateFlow<String?>(null)
    private val _inputMessage = MutableStateFlow("")

    val uiState: StateFlow<LiveStudioUiState> = combine(
        liveStreamRepository.streams,
        liveStreamRepository.chatMessages,
        _selectedStreamId,
        _inputMessage
    ) { streams, messages, selectedId, input ->
        val active = streams.find { it.id == selectedId } ?: streams.firstOrNull()
        LiveStudioUiState(
            activeStream = active,
            streams = streams,
            chatMessages = messages,
            inputMessage = input
        )
    }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), LiveStudioUiState())

    fun selectStream(stream: LiveStream) {
        _selectedStreamId.value = stream.id
    }

    fun onInputMessageChange(text: String) {
        _inputMessage.value = text
    }

    fun sendChat(senderName: String) {
        val text = _inputMessage.value.trim()
        if (text.isNotBlank()) {
            viewModelScope.launch {
                liveStreamRepository.sendMessage(senderName, text)
                _inputMessage.value = ""
            }
        }
    }
}
