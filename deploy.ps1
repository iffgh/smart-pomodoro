# 🚀 ПОЛЕЗНЫЕ КОМАНДЫ ДЛЯ РАЗРАБОТКИ

# 📊 Показать структуру проекта
function Show-Structure {
    Get-ChildItem -Recurse | Where-Object { $_.Name -notlike ".*" } | ForEach-Object {
        $depth = ($_.FullName.Split("\").Count - $PWD.Path.Split("\").Count)
        $indent = "  " * $depth
        if ($_.PSIsContainer) {
            Write-Host "$indent📁 $($_.Name)" -ForegroundColor Blue
        } else {
            Write-Host "$indent📄 $($_.Name)" -ForegroundColor Green
        }
    }
}

# 🔄 Быстрое обновление Git
function Update-Git {
    git add .
    git commit -m "Update: $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
    git push
}

# 🧹 Очистка кэша браузера (симуляция)
function Clear-BrowserCache {
    Write-Host "🗑️  Для очистки кэша:" -ForegroundColor Yellow
    Write-Host "   Chrome: Ctrl+Shift+Delete" -ForegroundColor White
    Write-Host "   Firefox: Ctrl+Shift+Delete" -ForegroundColor White
    Write-Host "   Edge: Ctrl+Shift+Delete" -ForegroundColor White
}

# 🎵 Тест звуковой системы
function Test-Sounds {
    Start-Process "index.html"
    Write-Host "🔊 Запущен тест звуков..." -ForegroundColor Green
    Write-Host "   • Открой консоль (F12)" -ForegroundColor White
    Write-Host "   • Кликни по странице" -ForegroundColor White
    Write-Host "   • Запусти таймер" -ForegroundColor White
}

# 📱 Запуск в режиме разработки
function Start-Dev {
    Write-Host "🚀 Запуск в режиме разработки..." -ForegroundColor Green
    Show-Structure
    Test-Sounds
}

# Экспортируем функции
Export-ModuleMember -Function Show-Structure, Update-Git, Clear-BrowserCache, Test-Sounds, Start-Dev

Write-Host "✅ Полезные команды загружены!" -ForegroundColor Green
Write-Host "📋 Доступные команды:" -ForegroundColor Cyan
Write-Host "   • Show-Structure    - Показать структуру проекта" -ForegroundColor White
Write-Host "   • Update-Git        - Обновить Git репозиторий" -ForegroundColor White
Write-Host "   • Clear-BrowserCache - Инструкция по очистке кэша" -ForegroundColor White
Write-Host "   • Test-Sounds       - Тест звуковой системы" -ForegroundColor White
Write-Host "   • Start-Dev         - Запуск разработки" -ForegroundColor White
