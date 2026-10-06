Add-Type -AssemblyName System.Drawing

$sourcePath = 'C:\Users\Acer\.gemini\antigravity-ide\brain\4ddab731-2096-4e9a-884d-dd038fff2503\.user_uploaded\media_1791284097046.png'
$src = [System.Drawing.Image]::FromFile($sourcePath)

function Save-ResizedPng($img, $w, $h, $outPath) {
    $bmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)
    $g.DrawImage($img, 0, 0, $w, $h)
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    Write-Output "Generated $outPath (${w}x${h})"
}

function Save-Ico($img, $w, $h, $outPath) {
    $bmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)
    $g.DrawImage($img, 0, 0, $w, $h)
    
    $hIcon = $bmp.GetHicon()
    $icon = [System.Drawing.Icon]::FromHandle($hIcon)
    $fs = [System.IO.File]::OpenWrite($outPath)
    $icon.Save($fs)
    $fs.Close()
    $icon.Dispose()
    $g.Dispose()
    $bmp.Dispose()
    Write-Output "Generated $outPath (${w}x${h} ICO)"
}

# Destinations in public/
Save-ResizedPng $src 16 16 'D:\Projects\our-bottles\public\favicon-16x16.png'
Save-ResizedPng $src 32 32 'D:\Projects\our-bottles\public\favicon-32x32.png'
Save-ResizedPng $src 48 48 'D:\Projects\our-bottles\public\favicon-48x48.png'
Save-ResizedPng $src 96 96 'D:\Projects\our-bottles\public\favicon-96x96.png'
Save-ResizedPng $src 180 180 'D:\Projects\our-bottles\public\apple-touch-icon.png'
Save-ResizedPng $src 192 192 'D:\Projects\our-bottles\public\android-chrome-192x192.png'
Save-ResizedPng $src 512 512 'D:\Projects\our-bottles\public\android-chrome-512x512.png'
Save-ResizedPng $src 512 512 'D:\Projects\our-bottles\public\favicon.png'
Save-ResizedPng $src 1024 1024 'D:\Projects\our-bottles\public\icon-1024.png'

# App router route icons
Save-ResizedPng $src 512 512 'D:\Projects\our-bottles\src\app\icon.png'
Save-ResizedPng $src 180 180 'D:\Projects\our-bottles\src\app\apple-icon.png'

# ICO files
Save-Ico $src 48 48 'D:\Projects\our-bottles\public\favicon.ico'
Save-Ico $src 48 48 'D:\Projects\our-bottles\src\app\favicon.ico'

$src.Dispose()
Write-Output "All favicon sizes generated successfully!"
