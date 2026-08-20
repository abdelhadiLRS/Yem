package com.yum.app.ui.components

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.size
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.unit.dp
import com.yum.app.data.models.TasteProfile
import com.yum.app.ui.theme.YumOrangePrimary
import kotlin.math.cos
import kotlin.math.sin

@Composable
fun TasteProfileRadar(
    tasteProfile: TasteProfile,
    modifier: Modifier = Modifier.size(160.dp)
) {
    val primaryColor = YumOrangePrimary
    val gridColor = MaterialTheme.colorScheme.outline.copy(alpha = 0.4f)

    Box(
        contentAlignment = Alignment.Center,
        modifier = modifier
    ) {
        Canvas(modifier = Modifier.fillMaxSize()) {
            val center = Offset(size.width / 2f, size.height / 2f)
            val radius = (size.minDimension / 2f) * 0.75f

            val values = listOf(
                tasteProfile.sweet / 10f,
                tasteProfile.savory / 10f,
                tasteProfile.spicy / 10f,
                tasteProfile.sour / 10f,
                tasteProfile.umami / 10f
            )

            val angleStep = (2 * Math.PI / 5).toFloat()

            // Draw concentric background web grids
            for (level in 1..3) {
                val levelRadius = radius * (level / 3f)
                val gridPath = Path()
                for (i in 0 until 5) {
                    val angle = i * angleStep - (Math.PI / 2).toFloat()
                    val x = center.x + levelRadius * cos(angle)
                    val y = center.y + levelRadius * sin(angle)
                    if (i == 0) gridPath.moveTo(x, y) else gridPath.lineTo(x, y)
                }
                gridPath.close()
                drawPath(gridPath, color = gridColor, style = Stroke(width = 1.5f))
            }

            // Draw spoke lines
            for (i in 0 until 5) {
                val angle = i * angleStep - (Math.PI / 2).toFloat()
                val x = center.x + radius * cos(angle)
                val y = center.y + radius * sin(angle)
                drawLine(
                    color = gridColor,
                    start = center,
                    end = Offset(x, y),
                    strokeWidth = 1.5f
                )
            }

            // Draw filled Taste DNA polygon
            val dataPath = Path()
            values.forEachIndexed { i, value ->
                val angle = i * angleStep - (Math.PI / 2).toFloat()
                val r = radius * value.coerceIn(0.1f, 1.0f)
                val x = center.x + r * cos(angle)
                val y = center.y + r * sin(angle)
                if (i == 0) dataPath.moveTo(x, y) else dataPath.lineTo(x, y)
            }
            dataPath.close()

            // Fill & Stroke
            drawPath(dataPath, color = primaryColor.copy(alpha = 0.35f))
            drawPath(dataPath, color = primaryColor, style = Stroke(width = 3.5f))
        }
    }
}
