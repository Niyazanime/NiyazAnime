// 1. Конфигурация Firebase
const firebaseConfig = {
    apiKey: "ТВОЙ_КЛЮЧ",
    authDomain: "твой-проект.firebaseapp.com",
    databaseURL: "https://твой-проект.firebaseio.com",
    projectId: "твой-проект",
    storageBucket: "твой-проект.appspot.com",
    messagingSenderId: "ID",
    appId: "APP_ID"
};

// 2. Инициализация приложения
const App = {
    config: {
        animeList: [
            { id: 1, title: "Наруто", rating: "9.5", year: "2002", genre: "Сёнен", poster: "ссылка_на_фото", description: "История о ниндзя..." },
            // Добавь сюда остальные аниме из своего списка
        ],
        defaultAvatars: [
            "https://cdn-icons-png.flaticon.com/512/3583/3583461.png",
            "https://cdn-icons-png.flaticon.com/512/3583/3583466.png"
        ]
    },

    init() {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        this.db = firebase.database();
        this.checkAuth();
        this.setupEventListeners();
        console.log("App initialized");
    },

    checkAuth() {
        const savedUser = localStorage.getItem('nia_user');
        if (savedUser) {
            this.me = JSON.parse(savedUser);
            this.showApp();
        } else {
            document.getElementById('gate').style.display = 'flex';
        }
    },

    async register() {
        const username = document.getElementById('username-input').value.trim();
        if (!username) return alert("Введите никнейм!");

        const userId = Math.floor(1000 + Math.random() * 9000);
        this.me = {
            username: username,
            userId: userId,
            avatar: this.config.defaultAvatars[0],
            joined: new Date().toISOString(),
            messageCount: 0
        };

        await this.db.ref('users/' + username).set(this.me);
        localStorage.setItem('nia_user', JSON.stringify(this.me));
        this.showApp();
    },

    showApp() {
        document.getElementById('gate').style.fadeOut = "0.5s";
        setTimeout(() => {
            document.getElementById('gate').style.display = 'none';
            document.body.classList.add('app-loaded');
            this.loadAnime();
            this.initChat();
            this.updateUI();
        }, 500);
    },

    updateUI() {
        document.getElementById('user-name-display').textContent = this.me.username;
        document.getElementById('user-id-display').textContent = 'ID: ' + this.me.userId;
        document.getElementById('user-avatar-img').src = this.me.avatar;
    },

    // Метод для переключения вкладок
    switchView(viewId) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(viewId).classList.add('active');
    },

    // Метод для отправки сообщений
    async sendMessage() {
        const input = document.getElementById('message-input');
        const text = input.value.trim();
        if (!text) return;

        const message = {
            username: this.me.username,
            text: text,
            timestamp: new Date().toLocaleTimeString()
        };

        await this.db.ref('chat/messages').push(message);
        input.value = '';
    },

    setupEventListeners() {
        // Здесь можно добавить обработчики кликов, если они не прописаны в HTML
    }
};

// Запуск при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
    App.init();
});
          
