# Social Media Dashboard

Une application web permettant de gérer plusieurs comptes de réseaux sociaux depuis une interface unique.

## 🚀 Installation

### Prérequis

1. Installer [Node.js](https://nodejs.org/) (version LTS recommandée)
2. Vérifier l'installation :
```bash
node --version
npm --version
```

### Installation du projet

1. Créer et accéder au dossier du projet
```bash
mkdir social-media-dashboard
cd social-media-dashboard
```

2. Initialiser le projet
```bash
npm create vite@latest . -- --template react
```

3. Installer les dépendances
```bash
npm install react-router-dom@6.21.1 react-icons@4.12.0 @headlessui/react@1.7.17 @heroicons/react@2.1.1
```

4. Installer les dépendances de développement
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Structure des fichiers

```
social-media-dashboard/
├── src/
│   ├── components/
│   │   └── Layout.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Publications.jsx
│   │   ├── Messages.jsx
│   │   ├── Accounts.jsx
│   │   └── AuthCallback.jsx
│   ├── config/
│   │   └── social.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── .env
```

### Configuration

1. Créer un fichier `.env` à la racine du projet :
```env
VITE_APP_URL=http://localhost:5173
VITE_FACEBOOK_APP_ID=votre_app_id_facebook
```

2. Configuration de l'éditeur (VS Code recommandé)
- Installer [Visual Studio Code](https://code.visualstudio.com/)
- Extensions recommandées :
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - ESLint
  - Prettier

### Démarrage

1. Installer les dépendances
```bash
npm install
```

2. Démarrer le serveur de développement
```bash
npm run dev
```

3. Ouvrir [http://localhost:5173](http://localhost:5173) dans le navigateur

### Production

Pour construire l'application pour la production :
```bash
npm run build
npm run preview
```

## 🔧 Dépannage

### Problèmes courants

1. Si `npm install` échoue :
```bash
npm cache clean --force
rm -rf node_modules
npm install
```

2. Si le port 5173 est déjà utilisé :
- Modifier le port dans vite.config.js
- Ou terminer le processus qui utilise ce port

### Configuration OAuth

1. Facebook
- Créer une application sur [Facebook Developers](https://developers.facebook.com)
- Configurer l'URL de redirection : `http://localhost:5173/auth/facebook/callback`
- Ajouter l'App ID dans le fichier `.env`

## 📝 Notes de développement

- L'application utilise React avec Vite
- Styling avec TailwindCSS
- Routing avec React Router
- Interface utilisateur avec Headless UI et Heroicons

## 🔐 Sécurité

- Ne jamais commiter le fichier `.env`
- Stocker les tokens de manière sécurisée
- Utiliser HTTPS en production
