// ========== КОНФИГУРАЦИЯ АНИМЕ ==========
const animeData = [
    {
        id: 1,
        title: "Вайолет Эвергарден",
        poster: "images/Violet_Evergarden_light_novel_volume_1_cover.jpg",
        year: 2018,
        genre: "Драма, Фэнтези",
        rating: "9.2",
        episodes: "13 серий + фильмы",
        status: "Завершено",
        country: "Япония",
        duration: "24 мин/серия",
        description: "История бывшей солдатки Вайолет Эвергарден, которая становится автомемористкой — пишет письма для других людей. В процессе работы она пытается понять смысл слов «Я люблю тебя», которые сказал ей майор Гилберт."
    },
    {
        id: 2,
        title: "Унесённые призраками",
        poster: "images/2026-01-30-08-13-12-images.jpg",
        year: 2001,
        genre: "Приключения, Фэнтези",
        rating: "9.8",
        episodes: "Фильм",
        status: "Завершено",
        country: "Япония",
        duration: "125 мин",
        description: "Маленькая Тихиро вместе с родителями попадает в загадочный мир духов. После того как её родителей превращают в свиней, девочка вынуждена работать в бане для духов, чтобы найти способ спасти их и вернуться в человеческий мир."
    },
    {
        id: 3,
        title: "Твоё имя",
        poster: "images/2TP018QS51eFzJPCgvHCYg.png",
        year: 2016,
        genre: "Романтика, Драма",
        rating: "9.7",
        episodes: "Фильм",
        status: "Завершено",
        country: "Япония",
        duration: "106 мин",
        description: "Старшеклассники Мицуха и Таки обнаруживают, что между ними существует странная связь: они периодически меняются телами. Постепенно они начинают общаться и влюбляются, но встречаться оказывается не так просто, как кажется."
    },
    {
        id: 4,
        title: "Моя геройская академия",
        poster: "images/Boku_no_Hero_Academia_Volume_1.png",
        year: 2016,
        genre: "Экшен, Супергерои",
        rating: "8.9",
        episodes: "6 сезонов",
        status: "Онгоинг",
        country: "Япония",
        duration: "24 мин/серия",
        description: "В мире, где у большинства людей есть сверхспособности, мальчик Идзуку Мидория рождается без них. Он мечтает стать героем и попадает в академию для героев, где получает самую мощную способность от величайшего героя Вселенной."
    },
    {
        id: 5,
        title: "Клинок, рассекающий демонов",
        poster: "images/Demon_Slayer_-_Kimetsu_no_Yaiba,_volume_1.jpg",
        year: 2019,
        genre: "Экшен, Драма",
        rating: "9.9",
        episodes: "4 сезона",
        status: "Завершено",
        country: "Япония",
        duration: "24 мин/серия",
        description: "Тандзиро Камадо становится истребителем демонов, чтобы найти способ вернуть человеческий облик своей сестре Незуко, превращённой в демона, и отомстить за смерть своей семьи."
    },
    {
        id: 6,
        title: "Атака титанов",
        poster: "images/Shingeki_no_Kyojin.jpg",
        year: 2013,
        genre: "Драма, Экшен",
        rating: "9.9",
        episodes: "4 сезона",
        status: "Завершено",
        country: "Япония",
        duration: "24 мин/серия",
        description: "Человечество живёт за огромными стенами, защищающими от гигантских существ — титанов. Когда стены падают, Эрен Йегер вступает в борьбу с титанами, чтобы отомстить за смерть матери и защитить человечество."
    }
];

// ========== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ==========
let favorites = JSON.parse(localStorage.getItem('nia_favorites')) || [];
let filteredAnime = [...animeData];

// ========== ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener('DOMContentLoaded', () => {
    renderAnimeGrid();
    updateFavoritesCount();
    setupEventListeners();
    
    // Восстановление избранного при загрузке
    favorites.forEach(id => {
        const btn = document.querySelector(`.fav-btn[data-id="${id}"]`);
        if (btn) {
            btn.classList.add('active');
            btn.innerHTML = '<i class="fas fa-heart"></i> В избранном';
        }
    });
    
    console.log('🎌 NIYAZANIME загружен! Избранных:', favorites.length);
});

// ========== РЕНДЕРИНГ СЕТКИ ==========
function renderAnimeGrid() {
    const grid = document.getElementById('animeGrid');
    
    if (filteredAnime.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>Ничего не найдено</h3>
                <p>Попробуйте изменить поисковый запрос</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = filteredAnime.map(anime => `
        <div class="anime-card" data-id="${anime.id}">
            <div class="poster-container">
                <img src="${anime.poster}" alt="${anime.title}" class="anime-poster" onclick="openAnimeModal(${anime.id})">
                <div class="anime-badge">
                    <i class="fas fa-star"></i> ${anime.rating}
                </div>
            </div>
            
            <div class="anime-content">
                <h3 class="anime-title" onclick="openAnimeModal(${anime.id})">${anime.title}</h3>
                
                <div class="anime-meta">
                    <span>${anime.year}</span>
                    <span class="anime-genre">${anime.genre.split(',')[0]}</span>
                </div>
                
                <div class="anime-actions">
                    <button class="action-btn info-btn" onclick="openAnimeModal(${anime.id})">
                        <i class="fas fa-info-circle"></i> Подробнее
                    </button>
                    <button class="action-btn fav-btn ${favorites.includes(anime.id) ? 'active' : ''}" 
                            data-id="${anime.id}"
                            onclick="toggleFavorite(${anime.id}, this)">
                        <i class="fas fa-heart"></i>
                        ${favorites.includes(anime.id) ? 'В избранном' : 'В избранное'}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ========== ИЗБРАННОЕ ==========
function toggleFavorite(animeId, button) {
    const index = favorites.indexOf(animeId);
    const heartIcon = button.querySelector('i');
    
    // Анимация сердечка
    heartIcon.classList.add('heart-animation');
    setTimeout(() => heartIcon.classList.remove('heart-animation'), 600);
    
    if (index === -1) {
        // Добавить в избранное
        favorites.push(animeId);
        button.classList.add('active');
        button.innerHTML = '<i class="fas fa-heart"></i> В избранном';
        showNotification(`Добавлено в избранное!`, 'success');
    } else {
        // Удалить из избранного
        favorites.splice(index, 1);
        button.classList.remove('active');
        button.innerHTML = '<i class="fas fa-heart"></i> В избранное';
        showNotification(`Удалено из избранного`, 'warning');
    }
    
    // Сохранить в localStorage
    localStorage.setItem('nia_favorites', JSON.stringify(favorites));
    updateFavoritesCount();
}

function updateFavoritesCount() {
    const counter = document.getElementById('favCount');
    counter.textContent = favorites.length;
    counter.style.transform = 'scale(1.2)';
    setTimeout(() => counter.style.transform = 'scale(1)', 300);
}

// ========== ПОИСК ==========
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const modalClose = document.getElementById('modalClose');
    const modal = document.getElementById('animeModal');
    
    // Поиск с задержкой
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(e.target.value.trim());
        }, 300);
    });
    
    // Закрытие модалки
    modalClose.addEventListener('click', () => closeModal());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

function performSearch(query) {
    if (!query) {
        filteredAnime = [...animeData];
    } else {
        const searchLower = query.toLowerCase();
        filteredAnime = animeData.filter(anime => 
            anime.title.toLowerCase().includes(searchLower) ||
            anime.genre.toLowerCase().includes(searchLower) ||
            anime.year.toString().includes(query) ||
            anime.description.toLowerCase().includes(searchLower)
        );
    }
    
    renderAnimeGrid();
}

// ========== МОДАЛЬНОЕ ОКНО ==========
function openAnimeModal(animeId) {
    const anime = animeData.find(a => a.id === animeId);
    if (!anime) return;
    
    const modal = document.getElementById('animeModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div class="anime-details">
            <div class="detail-poster">
                <img src="${anime.poster}" alt="${anime.title}">
            </div>
            
            <div class="detail-content">
                <h2>${anime.title}</h2>
                <div class="detail-rating">
                    <i class="fas fa-star"></i>
                    <span>${anime.rating} / 10</span>
                </div>
                
                <div class="detail-grid">
                    <div class="detail-item">
                        <div class="detail-label">Год выхода</div>
                        <div class="detail-value">${anime.year}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Страна</div>
                        <div class="detail-value">${anime.country}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Жанр</div>
                        <div class="detail-value">${anime.genre}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Статус</div>
                        <div class="detail-value">${anime.status}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Эпизоды</div>
                        <div class="detail-value">${anime.episodes}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Длительность</div>
                        <div class="detail-value">${anime.duration}</div>
                    </div>
                </div>
                
                <div class="detail-description">
                    ${anime.description}
                </div>
                
                <div style="margin-top: 30px; display: flex; gap: 15px;">
                    <button class="action-btn fav-btn ${favorites.includes(anime.id) ? 'active' : ''}" 
                            style="flex: 1; padding: 16px; font-size: 16px;"
                            onclick="toggleFavorite(${anime.id}, this); event.stopPropagation()">
                        <i class="fas fa-heart"></i>
                        ${favorites.includes(anime.id) ? 'Удалить из избранного' : 'Добавить в избранное'}
                    </button>
                    <button class="action-btn info-btn" 
                            style="flex: 1; padding: 16px; font-size: 16px;"
                            onclick="closeModal()">
                        <i class="fas fa-times"></i> Закрыть
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('animeModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// ========== УВЕДОМЛЕНИЯ ==========
function showNotification(message, type = 'info') {
    // Создаём уведомление
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Стили уведомления
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? 'linear-gradient(135deg, #00b894 0%, #00a085 100%)' : 
                   type === 'warning' ? 'linear-gradient(135deg, #ffaa00 0%, #ff8800 100%)' : 
                   'linear-gradient(135deg, #ff004c 0%, #ff0080 100%)',
        color: 'white',
        padding: '16px 24px',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        zIndex: '3000',
        animation: 'slideInRight 0.3s ease'
    });
    
    // Анимация
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
            to { opacity: 0; transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Удаляем через 3 секунды
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========== ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ ==========
// Экспорт/импорт избранного (для продвинутых пользователей)
function exportFavorites() {
    const data = JSON.stringify(favorites);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'niazanime_favorites.json';
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Избранное экспортировано!', 'success');
}

function importFavorites(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            if (Array.isArray(imported)) {
                favorites = [...new Set([...favorites, ...imported])];
                localStorage.setItem('nia_favorites', JSON.stringify(favorites));
                updateFavoritesCount();
                renderAnimeGrid();
                showNotification(`Импортировано ${imported.length} аниме!`, 'success');
            }
        } catch (err) {
            showNotification('Ошибка при импорте файла', 'warning');
        }
    };
    reader.readAsText(file);
}

// Быстрое добавление кнопок экспорта/импорта (раскомментировать если нужно)
/*
function addExportButtons() {
    const controls = document.querySelector('.header-controls');
    const exportBtn = document.createElement('button');
    exportBtn.className = 'action-btn';
    exportBtn.innerHTML = '<i class="fas fa-download"></i> Экспорт';
    exportBtn.onclick = exportFavorites;
    exportBtn.style.background = 'rgba(0, 212, 255, 0.1)';
    exportBtn.style.color = '#00d4ff';
    
    const importBtn = document.createElement('input');
    importBtn.type = 'file';
    importBtn.accept = '.json';
    importBtn.style.display = 'none';
    importBtn.id = 'importFile';
    importBtn.onchange = importFavorites;
    
    const importLabel = document.createElement('label');
    importLabel.className = 'action-btn';
    importLabel.innerHTML = '<i class="fas fa-upload"></i> Импорт';
    importLabel.style.background = 'rgba(0, 255, 136, 0.1)';
    importLabel.style.color = '#00ff88';
    importLabel.htmlFor = 'importFile';
    
    controls.appendChild(exportBtn);
    controls.appendChild(importLabel);
    controls.appendChild(importBtn);
}
*/
