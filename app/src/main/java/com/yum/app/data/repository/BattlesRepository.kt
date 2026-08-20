package com.yum.app.data.repository

import com.yum.app.data.models.BattleEntry
import com.yum.app.data.models.ChefContestant
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow

class BattlesRepository {

    private val _battles = MutableStateFlow<List<BattleEntry>>(getInitialBattles())
    val battles: Flow<List<BattleEntry>> = _battles.asStateFlow()

    fun castVote(battleId: String, side: String) {
        _battles.value = _battles.value.map { battle ->
            if (battle.id == battleId && !battle.isUserVoted) {
                battle.copy(
                    chefA = battle.chefA.copy(
                        votes = if (side == "A") battle.chefA.votes + 1 else battle.chefA.votes
                    ),
                    chefB = battle.chefB.copy(
                        votes = if (side == "B") battle.chefB.votes + 1 else battle.chefB.votes
                    ),
                    totalVotes = battle.totalVotes + 1,
                    isUserVoted = true,
                    userVotedSide = side
                )
            } else battle
        }
    }

    private fun getInitialBattles(): List<BattleEntry> {
        return listOf(
            BattleEntry(
                id = "bat-1",
                title = "Battle of Umami: Human Master vs. AI Culinary Algorist",
                theme = "Deconstructed Forest Mushrooms & Truffle Broth",
                category = "Experimental Fine Dining",
                chefA = ChefContestant(
                    id = "ca-1",
                    name = "Chef Kenjiro Sato (Tokyo)",
                    avatarUrl = "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=200&q=80",
                    bio = "3-Star Michelin, 25 years traditional dashi & mushroom fermentation",
                    dishName = "Charred Matsutake in Smoked Bonito Gelee",
                    dishImageUrl = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
                    votes = 4280,
                    isAiChef = false
                ),
                chefB = ChefContestant(
                    id = "cb-1",
                    name = "Yum AI Neural Gastronome v4",
                    avatarUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
                    bio = "Trained on 4.2M molecular flavor pairings & zero-waste physics",
                    dishName = "Cryo-Extracted King Oyster Scalp with Saffron Foam",
                    dishImageUrl = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
                    votes = 4120,
                    isAiChef = true
                ),
                status = "LIVE DUEL",
                timeLeft = "14:22 mins",
                totalVotes = 8400
            ),
            BattleEntry(
                id = "bat-2",
                title = "World Pastry Cup: Paris vs. Beirut",
                theme = "Pistachio & Blossom Water Mille-Feuille",
                category = "Patisserie Mastery",
                chefA = ChefContestant(
                    id = "ca-2",
                    name = "Chef Amelie Dupont",
                    avatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
                    bio = "Meilleur Ouvrier de France finalist, Parisian viennoiserie perfection",
                    dishName = "Caramelized 1024-Layer Pistachio Arlette",
                    dishImageUrl = "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
                    votes = 2890,
                    isAiChef = false
                ),
                chefB = ChefContestant(
                    id = "cb-2",
                    name = "Chef Ziad Karam",
                    avatarUrl = "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=200&q=80",
                    bio = "Master of Levantine phyllo lace & slow-churned ashta cream",
                    dishName = "Orange Blossom Ashta Crisp with Crushed Bronte Nuts",
                    dishImageUrl = "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80",
                    votes = 3140,
                    isAiChef = false
                ),
                status = "VOTING OPEN",
                timeLeft = "42:10 mins",
                totalVotes = 6030
            )
        )
    }
}
