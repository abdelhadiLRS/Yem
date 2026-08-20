package com.yum.app.data.models

data class BattleEntry(
    val id: String,
    val title: String,
    val theme: String,
    val category: String,
    val chefA: ChefContestant,
    val chefB: ChefContestant,
    val status: String, // LIVE DUEL, VOTING, FINISHED
    val timeLeft: String,
    val totalVotes: Int,
    val isUserVoted: Boolean = false,
    val userVotedSide: String? = null // "A" or "B"
)

data class ChefContestant(
    val id: String,
    val name: String,
    val avatarUrl: String,
    val bio: String,
    val dishName: String,
    val dishImageUrl: String,
    val votes: Int,
    val isAiChef: Boolean = false
)
