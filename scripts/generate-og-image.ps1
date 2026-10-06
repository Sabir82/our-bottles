Add-Type -AssemblyName System.Drawing

$width = 1200
$height = 630
$bmp = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($bmp)

$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
$g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

# 1. Background gradient (pure white to subtle crisp ice blue)
$rect = New-Object System.Drawing.Rectangle(0, 0, $width, $height)
$topColor = [System.Drawing.Color]::FromArgb(255, 255, 255, 255)
$bottomColor = [System.Drawing.Color]::FromArgb(255, 240, 249, 255)
$brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, $topColor, $bottomColor, [System.Drawing.Drawing2D.LinearGradientMode]::Vertical)
$g.FillRectangle($brush, $rect)
$brush.Dispose()

# 2. Subtle soft center glow behind logo
$glowRect = New-Object System.Drawing.Rectangle(250, 60, 700, 480)
$path = New-Object System.Drawing.Drawing2D.GraphicsPath
$path.AddEllipse($glowRect)
$pathBrush = New-Object System.Drawing.Drawing2D.PathGradientBrush($path)
$pathBrush.CenterColor = [System.Drawing.Color]::FromArgb(40, 0, 136, 255)
$pathBrush.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 240, 249, 255))
$g.FillPath($pathBrush, $path)
$path.Dispose()
$pathBrush.Dispose()

# 3. Draw Official Brand Logo centered in both 1200x630 and 1:1 safe area (630x630)
$logoPath = 'd:\Projects\our-bottles\public\logo.png'
$logo = [System.Drawing.Image]::FromFile($logoPath)

$logoWidth = 640
$logoHeight = [int]($logoWidth * ($logo.Height / $logo.Width)) # ~426px
$logoX = [int](($width - $logoWidth) / 2) # 280
$logoY = [int](($height - $logoHeight) / 2 - 25) # ~77px

$g.DrawImage($logo, $logoX, $logoY, $logoWidth, $logoHeight)
$logo.Dispose()

# 4. Bottom subtitle bar / badge text
$font = New-Object System.Drawing.Font("Arial", 13, [System.Drawing.FontStyle]::Bold)
$badgeText = "CUSTOM BRANDED PACKAGED DRINKING WATER  •  RISHIKESH & PAN-INDIA"
$textSize = $g.MeasureString($badgeText, $font)

# Pill background for subtitle
$pillW = [int]($textSize.Width + 40)
$pillH = 38
$pillX = [int](($width - $pillW) / 2)
$pillY = 535

$pillBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 11, 18, 32))
$g.FillRectangle($pillBrush, $pillX, $pillY, $pillW, $pillH)
$pillBrush.Dispose()

$textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 34, 211, 238))
$textX = [int]($pillX + 20)
$textY = [int]($pillY + ($pillH - $textSize.Height) / 2)
$g.DrawString($badgeText, $font, $textBrush, $textX, $textY)
$textBrush.Dispose()
$font.Dispose()

# 5. Bottom decorative gradient stripe
$stripeY = $height - 8
$stripeRect = New-Object System.Drawing.Rectangle(0, $stripeY, $width, 8)
$stripeBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    $stripeRect,
    [System.Drawing.Color]::FromArgb(255, 0, 136, 255),
    [System.Drawing.Color]::FromArgb(255, 34, 211, 238),
    [System.Drawing.Drawing2D.LinearGradientMode]::Horizontal
)
$g.FillRectangle($stripeBrush, $stripeRect)
$stripeBrush.Dispose()

# 6. Save image to destinations
$destinations = @(
    'd:\Projects\our-bottles\public\og-image.png',
    'd:\Projects\our-bottles\public\images\og-image.png',
    'd:\Projects\our-bottles\src\app\opengraph-image.png',
    'd:\Projects\our-bottles\src\app\twitter-image.png'
)

foreach ($dest in $destinations) {
    $bmp.Save($dest, [System.Drawing.Imaging.ImageFormat]::Png)
    Write-Output "Saved OG share image to: $dest"
}

$g.Dispose()
$bmp.Dispose()
Write-Output "Social URL sharing image generation complete!"
