
import {
    Globe, LayoutDashboard, Languages, Smartphone, Zap, School, PenTool, Brain, Feather, Trophy
} from 'lucide-react';

import {
    siReact, siNextdotjs, siSupabase, siTailwindcss, siVite,
    siFramer, siPhotopea, siD3, siMapbox, siNodedotjs, siHuggingface,
    siPython, siVuedotjs, siSass, siLatex,
    siPandas, siScikitlearn, siPlotly, siHtml5, siJavascript, siTypescript, siGoogle, siThreedotjs
} from 'simple-icons';
import OverseerIcon from '../components/icons/OverseerIcon';

export const projects = [
    {
        id: 2,
        title: 'Roman Reigns — Tribal Chief',
        category: 'Thematic Portfolio',
        color: '#94a3b8', // Silver/Grey
        lightColor: '#475569', // Slate-600
        description: "A narrative-driven, cinematic professional portfolio dedicated to WWE Superstar Roman Reigns. This project blends creative coding with a premium aesthetic, featuring real-time statistics, smooth scroll transitions, and a deep-dive into the 'Island of Relevancy'. It's my most ambitious work in terms of thematic storytelling and visual engagement.",
        link: 'https://romanfolio.ezzio.me',
        darkPattern: true,
        techStack: ['Next.js 15', 'Tailwind v4', 'Three.js', 'Framer Motion'],
        stamp: '/assets/romanfolio/stamp.webp',
        gallery: [
            '/assets/romanfolio/hero.webp',
            '/assets/romanfolio/bio.webp',
            '/assets/romanfolio/dominance.webp',
            '/assets/romanfolio/ledger.webp',
            '/assets/romanfolio/highlights.webp',
            '/assets/romanfolio/bloodline.webp',
            '/assets/romanfolio/origins.webp',
            '/assets/romanfolio/testimonials.webp'
        ]
    },
    {
        id: 0,
        title: 'SSC2 League',
        category: 'Gamified Learning',
        color: '#00E5FF', // Neon Cyan
        lightColor: '#0e7490', // Cyan-700 (Darker for better contrast)
        description: "My biggest project yet with a 52.6% adoption rate (and we announced it after the midterm exams). Collaborated with T.A. Ahmed Tawfik of FEPS to develop a GLMS (Gamified Learning Management System) for the course SSC2. It features everything you'd expect from a GLMS and more, be it a leaderboard, a weekly performance chart, XP rewards, or a comprehensive questions bank.",
        link: null, // Internal Tool - No public link
        darkPattern: true,
        techStack: ['Next.js', 'Supabase', 'Tailwind', 'Vite'],
        stamp: '/assets/ssc2/logo.webp', // Image Stamp
        gallery: [
            '/assets/ssc2/gallery-1.webp',
            '/assets/ssc2/gallery-2.webp',
            '/assets/ssc2/gallery-3.webp',
            '/assets/ssc2/gallery-4.webp',
            '/assets/ssc2/gallery-5.webp',
            '/assets/ssc2/gallery-6.webp',
            '/assets/ssc2/gallery-7.webp'
        ]
    },
    {
        id: 5,
        title: 'MZ',
        category: 'Tech Startup Platform',
        color: '#92b600', // Brand Green
        lightColor: '#7b9900', // MZ Hover Green
        description: "The official home of our digital studio. MZ specializes in precision-built digital products—the sites people share, the tools teams rely on, and the platforms that grow careers. A high-performance platform reflecting our commitment to technical excellence and premium aesthetics.",
        link: 'https://mz.ezzio.me',
        techStack: ['Next.js 16', 'React 19', 'Tailwind v4', 'Framer Motion'],
        stamp: '/assets/mz/logo.webp',
        gallery: [
            '/assets/mz/hero', // Adapts: mz-hero-dark.png / light.png
            '/assets/mz/cases',     // Adapts: mz-cases-dark.png / light.png
            '/assets/mz/speciality'  // Adapts: mz-speciality-dark.png / light.png
        ]
    },
    {
        id: 3,
        title: 'The Null Hypothesis',
        category: 'Learning Platform',
        color: '#D4A373', // Sepia/Bronze (Dark Academia)
        lightColor: '#78350f', // Amber-900 (Rich Leather/Coffee)
        description: "A (very) highly interactive, dark academia styled statistical learning platform. Featuring intuitive simulations, Python coding, AI-powered explanations, and highly rigourous courses.",
        link: 'https://nullhypothesis.dev',
        techStack: ['Next.js 16', 'Tailwind v4', 'Huggingface', 'Tiptap'],
        stamp: '/assets/null/logo.webp', // Custom Logo Image
        gallery: [
            '/assets/null/hero',        // Adaptive (hero-dark/light)
            '/assets/null/atlas',        // Adaptive (atlas-dark/light)
            '/assets/null/case'        // Adaptive (case-dark/light)
        ]
    },
    {
        id: 9,
        title: 'FlickBall',
        category: 'Sports Analytics',
        color: '#DB0030', // New Era Red
        lightColor: '#e31b45', // Lighter shade for contrast
        description: "What happens when you combine artistic design with data-driven insights? Comic book tribute to the new era of FC Barcelona under Hansi Flick. A data-driven web application to celebrate and document the resurgence of FC Barcelona under the German coach. Featuring complete match statistics, player ratings, and a comprehensive history of the team with LLM-powered insights.",
        link: 'https://flickball.ezzio.me',
        techStack: ['Next.js 15', 'TypeScript', 'Tailwind v4', 'Google Gemini', 'Recharts'],
        stamp: '/assets/flickball/logo.webp',
        gallery: [
            '/assets/flickball/gallery-1.webp',
            '/assets/flickball/gallery-2.webp',
            '/assets/flickball/gallery-3.webp',
            '/assets/flickball/gallery-4.webp',
            '/assets/flickball/gallery-5.webp',
        ]
    },
    {
        id: 6,
        title: 'Graphic Designs',
        category: 'Art',
        color: '#FF0055', // Neon Pink/Red
        lightColor: '#be123c', // Rose-700
        description: "I might be a system developer, but I'm also a graphic designer (polymathy, baby!). These are some of my designs---mostly posters. See why I'm good at UI/UX.",
        link: null,
        techStack: ['Photopea', 'Figma'],
        stamp: PenTool,
        gallery: [
            // Row 1 & 2: The "Undisputed" Promo Collection (Minimalist, high-impact branding)
            {
                type: 'design',
                src: '/assets/designs/PIPEBOMB.webp',
                title: 'THE PIPEBOMB',
                description: "\"I have a lot of things I want to get off my chest.\" Sitting menancingly with his legs crossed, CM Punk delivered one of the most iconic promos of all time."
            },
            {
                type: 'design',
                src: '/assets/designs/STORY.webp',
                title: 'STORY, FINISHED.',
                description: "\"Sorry it took me so long.\" This one is for you, Dusty. Cody Rhodes finally finishing his story and becoming the first Rhodes to win a WWE championship at Wrestlemania XL."
            },
            {
                type: 'design',
                src: '/assets/designs/IQUIT.webp',
                title: 'I QUIT',
                description: "\"I feed our whole family with this title.\" Roman Reigns becoming the tribal chief after brutally beating down Jey Uso. Peak cinema."
            },
            {
                type: 'design',
                src: '/assets/designs/STREAK.webp',
                title: '21-1 (F5)',
                description: "A chilling typographic tribute to the shocking moment the greatest streak in sports entertainment history was conquered."
            },
            {
                type: 'design',
                src: '/assets/designs/STREAK - Alt.webp',
                title: '21-1 (THE VASE)',
                description: "An alternate, grittier variant honoring the legacy of The Undertaker at the grandest stage of them all."
            },
            {
                type: 'design',
                src: '/assets/designs/ENDOFANERA.webp',
                title: 'END OF AN ERA',
                description: "\"STREAK'S OVER, STREAK'S OVER!\" The match marking the end of the attitude era. The Undertaker kicking out of sweet chin music + pedigree is something I'll never forget."
            },
            {
                type: 'design',
                src: '/assets/designs/SHIELD.webp',
                title: 'IMPLOSION',
                description: "\"There's always a plan B.\" Remember when Seth Rollins betrayed The Shield? The effect is still haunting us till this day."
            },
            {
                type: 'design',
                src: '/assets/designs/Wrestlemania.webp',
                title: 'VICTORY HAS A PRICE',
                description: "\"How far will you go?\" Randy busted Cody's head open, CM Punk said he'd bur Roman next to his fateher. Capturing the epic weight and physical toll of reaching the summit at Wrestlemania."
            },

            // Phase 2: High-Fidelity Cinematic Renders
            {
                type: 'design',
                src: '/assets/designs/RomanReigns.webp',
                title: 'OTC',
                description: "The superhero landing pose-right before a Superman punch. Combined with the Samoan tattoo and ominous lightning, it's a great acknowledgment for our Tribal Chief."
            },
            {
                type: 'design',
                src: '/assets/designs/LAKnight.webp',
                title: 'YEAH!',
                description: "Streetwear-styled poster for the Megastar. Loved it so much I ended up prining it on a notebook. YEAH!"
            },
            {
                type: 'design',
                src: '/assets/designs/DX.webp',
                title: 'ARE YOU READY?',
                description: "Capturing the rebellious energy of the most iconic faction in history through high-glow neon aesthetics."
            },
            {
                type: 'design',
                src: '/assets/designs/WeTheOnes.webp',
                title: 'WE THE ONES',
                description: "A Red Dead Redemption-styled propaganda poster inspired by the Bloodline and the aesthetics of Bioshock."
            },
            {
                type: 'design',
                src: '/assets/designs/SPEARIT.webp',
                title: 'SPEAR IT',
                description: "I was singing 'Beat It', then my sister said 'Spear It'. The poster made itself."
            },

            // Phase 3: Artistic, Personal & Experimental
            {
                type: 'design',
                src: '/assets/designs/Poetry.webp',
                title: 'POETRY',
                description: "A surrealist typographic exploration of an emerald green color scheme, inspired by the verses of my friend Abdulrahman Mostafa."
            },
            {
                type: 'design',
                src: '/assets/designs/Fin.webp',
                title: 'FIN.',
                description: "I made this poster to mark the end of my journey at EMAM Research Center. It was a bittersweet moment, but I'm proud of what we accomplished there."
            },
            {
                type: 'design',
                src: '/assets/designs/BDay.webp',
                title: '21',
                description: "A playful scrapbook-style collage poster designed for my 21st birthday, looking back at the years that built me."
            },
            {
                type: 'design',
                src: '/assets/designs/Eid.webp',
                title: 'EID CELEBRATION',
                description: "A Sonic The Hedgehog-themed poster for Eid Al-Fitr. Look at Eggman go!"
            },
            {
                type: 'design',
                src: '/assets/designs/SonicCU.webp',
                title: 'SONIC & CO.',
                description: "Changing the Cairo University atmosphere from summer to autumn because we never have this atmosphere IRL, featuring the blue blur and the gang."
            },

            // Phase 4: Grand Finales & Expanded Sets
            {
                type: 'design',
                src: '/assets/designs/Wargames.webp',
                title: 'WARGAMES 2025: CIVIL WAR',
                description: "A really weird project. I don't think I need to say anything else. Just look at it."
            },
            {
                type: 'design',
                src: '/assets/designs/1316 - Light.webp',
                title: '1316: THE LIGHT ERA',
                description: "Started as a minimalist movie poster-ish thingy, ended up with a completely different result. It's a poster for the 4th longest-reigning champion in WWE history."
            },
            {
                type: 'design',
                src: '/assets/designs/1316 - Dark.webp',
                title: '1316: THE DARK ERA',
                description: "Started as a minimalist movie poster-ish thingy, ended up with a completely different result. It's a poster for the 4th longest-reigning champion in WWE history."
            }
        ]
    },
    /*
    {
        id: 10,
        title: 'The Overseer',
        category: 'System Intelligence',
        color: '#6366f1', // Indigo-500 (Intelligence/System feel)
        lightColor: '#4338ca', // Indigo-700
        description: "Inspired by the supercomputer from F9 (2021) and the Batcomputer, The Overseer is a comprehensive global monitoring system designed to visualize complex data streams in real-time. Features a 3D interactive globe for geospatial data, live news and metrics tracking.",
        link: 'https://overseer.ezzio.me',
        techStack: ['Next.js 16', 'React 19', 'Tailwind v4', 'Zustand', 'React Globe GL', 'Puppeteer'],
        stamp: OverseerIcon, // Custom Animated SVG Icon
        gallery: [
            '/assets/overseer/overseer-1.webp',
            '/assets/overseer/overseer-2.webp',
            '/assets/overseer/overseer-3.webp'
        ]
    },
    */
    {
        id: 8,
        title: 'SharkPy',
        category: 'Machine Learning',
        color: '#0077BE', // Ocean Blue
        lightColor: '#1d4ed8', // Blue-700 (Keep)
        description: "Weird fact: it's named after Ferran Torres, the 'shark' that saved Barcelona in the 2025 Copa del Rey final against Real Madrid. Oh, and it's an XAI-first machine learning package, with Sklearn, XGBoost, and SHAPASH integration.",
        link: 'https://github.com/Ezzio11/sharkpy',
        techStack: [
            { icon: 'Python', name: 'Python', type: 'simple-icon' },
            { icon: 'Pandas', name: 'Pandas', type: 'simple-icon' },
            { icon: 'Scikit-learn', name: 'Scikit-learn', type: 'simple-icon' },
            { icon: 'Plotly', name: 'Shapash', type: 'simple-icon' } // Using Plotly/generic for Visualization
        ],
        stamp: '/assets/sharkpy/logo.webp',
        notebookCells: [
            // Markdown: Introduction
            {
                type: 'markdown',
                content: `# SharkPy Tutorial Notebook 🦈

Welcome to the SharkPy tutorial! SharkPy is a fun, user-friendly machine learning package that simplifies model training, prediction, explanation, and more.`
            },
            // Markdown: Imports
            {
                type: 'markdown',
                content: `## Import Required Libraries
Import SharkPy and other necessary libraries for data handling and visualization.`
            },
            // Import libraries
            {
                type: 'input',
                content: 'from sharkpy import Shark\nimport pandas as pd\nimport numpy as np',
                count: 1
            },
            // Markdown: Regression
            {
                type: 'markdown',
                content: `## Basic Usage: Regression Example
Let's start with a simple regression task using synthetic data.`
            },
            // Regression example - Create data
            {
                type: 'input',
                content: `# Generate sample regression data
np.random.seed(42)
data = pd.DataFrame({
    'feature1': np.random.normal(0, 1, 100),
    'feature2': np.random.normal(5, 2, 100),
    'target': np.random.normal(10, 3, 100) + np.random.normal(0, 1, 100)
})

print(data.head())`,
                count: 2
            },
            {
                type: 'output',
                content: `   feature1  ...     target
0  0.496714  ...  10.244367
1 -0.138264  ...  11.122173
2  0.647689  ...  13.996447
3  1.523030  ...  13.771776
4 -0.234153  ...   5.846090

[5 rows x 3 columns]`,
                count: 2
            },
            // Markdown: Train model
            {
                type: 'markdown',
                content: `### Initialize Shark and Train a Model`
            },
            // Train regression model
            {
                type: 'input',
                content: `shark = Shark()

# Train a linear regression model
shark.learn(
    data=data,
    target='target',
    project_name='Regression Demo',
    model_choice='linear_regression'
)`,
                count: 3
            },
            {
                type: 'output',
                content: `🦈 Sharpening teeth on Regression Demo! Ready to take a bite out of prediction! 🦈
🦈 Looks like a regression problem (numeric target: target)
🦈 Model training complete! Ready to make predictions.`,
                count: 3
            },
            // Markdown: Predictions
            {
                type: 'markdown',
                content: `### Make Predictions`
            },
            // Make predictions
            {
                type: 'input',
                content: `# Predict on the training data
predictions = shark.predict()
print("First 5 predictions:", predictions[:5])

# Predict on new data
new_data = pd.DataFrame({
    'feature1': [0.5, -0.5],
    'feature2': [4.0, 6.0]
})
new_predictions = shark.predict(new_data)
print("New predictions:", new_predictions)`,
                count: 4
            },
            {
                type: 'output',
                content: `🦈 Sharky is analyzing the data!
🦈 No data provided! Using training data for prediction...
🦈 Made 100 predictions!
First 5 predictions: [10.71443672 10.31747877 10.71010113 11.18857546 10.2493035 ]
🦈 Sharky is analyzing the data!
🦈 Made 2 predictions!
New predictions: [10.64707926 10.06464807]`,
                count: 4
            },
            // Markdown: Classification
            {
                type: 'markdown',
                content: `## Classification Example
Now, let's try classification with the Iris dataset.`
            },
            // Load Iris data
            {
                type: 'input',
                content: `iris_url = 'https://raw.githubusercontent.com/jbrownlee/Datasets/master/iris.csv'
iris_data = pd.read_csv(iris_url, header=None)
iris_data.columns = ['sepal_length', 'sepal_width', 'petal_length', 'petal_width', 'species']

print(iris_data.head())`,
                count: 5
            },
            {
                type: 'output',
                content: `   sepal_length  sepal_width  petal_length  petal_width      species
0           5.1          3.5           1.4          0.2  Iris-setosa
1           4.9          3.0           1.4          0.2  Iris-setosa
2           4.7          3.2           1.3          0.2  Iris-setosa
3           4.6          3.1           1.5          0.2  Iris-setosa
4           5.0          3.6           1.4          0.2  Iris-setosa`,
                count: 5
            },
            // Markdown: Train classifier
            {
                type: 'markdown',
                content: `### Train a Classification Model`
            },
            // Train classification model
            {
                type: 'input',
                content: `shark_class = Shark()

shark_class.learn(
    data=iris_data,
    target='species',
    project_name='Iris Classification',
    model_choice='logistic_regression'
)`,
                count: 6
            },
            {
                type: 'output',
                content: `🦈 Sharpening teeth on Iris Classification! Ready to take a bite out of prediction! 🦈
🦈 Looks like a classification problem (categorical target: species)
🦈 Model training complete! Ready to make predictions.`,
                count: 6
            },
            // Markdown: Make predictions
            {
                type: 'markdown',
                content: `### Make Predictions`
            },
            // Classification predictions
            {
                type: 'input',
                content: `# Predict on training data
class_predictions = shark_class.predict()
print("First 5 predictions:", class_predictions[:5])

# Predict on new data (example)
new_iris = pd.DataFrame({
    'sepal_length': [5.1, 6.2],
    'sepal_width': [3.5, 2.8],
    'petal_length': [1.4, 4.3],
    'petal_width': [0.2, 1.3]
})
new_class_preds = shark_class.predict(new_iris)
print("New predictions:", new_class_preds)`,
                count: 7
            },
            {
                type: 'output',
                content: `🦈 Sharky is analyzing the data!
🦈 No data provided! Using training data for prediction...
🦈 Made 150 predictions!
First 5 predictions: ['Iris-setosa' 'Iris-setosa' 'Iris-setosa' 'Iris-setosa' 'Iris-setosa']
🦈 Sharky is analyzing the data!
🦈 Made 2 predictions!
New predictions: ['Iris-setosa' 'Iris-versicolor']`,
                count: 7
            },
            // Markdown: Model Battle
            {
                type: 'markdown',
                content: `## Model Battle: Compare Multiple Models
Let's battle models on the Iris dataset!`
            },
            // Model Battle
            {
                type: 'input',
                content: `battle_result = shark_class.battle(
    data=iris_data,
    target='species',
    models=['logistic_regression', 'random_forest', 'xgboost'],
    metric='accuracy',
    n_trials=10  # Fewer trials for demo
)

print("Champion model:", battle_result['champion'])
print("Score:", battle_result['score'])`,
                count: 8
            },
            {
                type: 'output',
                content: `🦈 WELCOME TO THE BATTLE ARENA! 🦈

Testing models:
 - LOGISTIC_REGRESSION
 - RANDOM_FOREST
 - XGBOOST

🏆 CHAMPION: LOGISTIC_REGRESSION with accuracy: 0.9733

Champion model: logistic_regression
Score: 0.9733333333333334`,
                count: 8
            },
            // Markdown: Available Models
            {
                type: 'markdown',
                content: `## Available Models
Check out all available models in SharkPy.`
            },
            // Available models
            {
                type: 'input',
                content: `available = shark.available_models()
print(available)`,
                count: 9
            },
            {
                type: 'output',
                content: `🦈 Available Models in SharkPy 🦈

                                   name                                               strengths                                          best_for        data_size              training_speed
linear_regression     Linear Regression                             Simple, interpretable, fast             Linear relationships, baseline models         Any size                   Very fast
logistic_regression Logistic Regression                          Simple, probabilistic output Binary/multiclass classification, baseline models         Any size                   Very fast
random_forest             Random Forest Robust, handles non-linearity, feature importance          Complex relationships, feature selection  Medium to large                        Fast
ridge                  Ridge Regression      L2 regularization, handles multicollinearity     Linear relationships with correlated features         Any size                        Fast
xgboost                       XGBoost    High performance, feature importance, missing values               Complex relationships, competitions  Medium to large Medium (with GPU support)
lightgbm                     LightGBM                   Fast training, low memory usage       Large datasets, speed-critical applications            Large                   Very fast
catboost                     CatBoost Handles categorical features, reduced overfitting           Datasets with many categorical features  Medium to large                      Medium`,
                count: 9
            }
        ]
    },
    {
        id: 1,
        title: '1316: The Reign',
        category: 'Scrollytelling',
        color: '#D00000', // Bloody Red
        lightColor: '#991b1b', // Red-800
        description: "A scrollytelling of the historical 1316 days reign of THE UNDISPUTED WWE UNIVERSAL CHAMPION. THE ULTIMATE NEEDLE MOVER. THE TRIBAL CHIEF. THE HEAD OF THE TABLE. THE GREATEST TO EVER DO IT. THE GOAT OF ALL GOATS. ROMAN. REIGNS",
        link: 'https://1316.ezzio.me',
        bgImage: '/assets/roman/samoan-pattern.webp',
        overlayImage: '/assets/roman/ulafala.webp',
        darkPattern: true, // New flag for styling
        techStack: ['Next.js', 'Framer Motion', 'Tailwind', 'Photopea'],
        stamp: '/assets/roman/hand.webp', // Restored Stamp
        gallery: [
            '/assets/roman/gallery-1.webp',
            '/assets/roman/gallery-2.webp',
            '/assets/roman/gallery-3.webp',
            '/assets/roman/gallery-4.webp',
            '/assets/roman/gallery-5.webp'
        ]
    },
    {
        id: 4,
        title: 'EMAM Research Center',
        category: 'Research Tools',
        color: '#00ff9f',
        lightColor: '#15803d', // Green-700
        description: "As a team manager at EMAM Research Center, I developed a full-stack app for managing papers and searching through archives. That was because we didn't want to send grades in a PDF just like any other normal human being.",
        link: null, // Internal Tool - No public link
        techStack: ['Node.js', 'Supabase', 'Tailwind', 'Vite'],
        stamp: '/assets/erc/logo.webp', // Image Stamp
        gallery: [
            '/assets/erc/login',
            '/assets/erc/dashboard',
            '/assets/erc/workshops',
            '/assets/erc/resources',
        ]
    },
    {
        id: 7,
        title: 'The Decline of The Polymath',
        category: 'Interactive Story',
        color: '#632D30', // Ox Blood Red for the title
        lightColor: '#F2EFE8', // Parchment for the card background
        bgImage: '/assets/polymath/rice-paper.webp',
        description: "My very first data-meets-web project. I wanted to explore the idea of a 'Polymath' and whatever happened to the ones who once were. I used ECharts to create interactive visualizations and a timeline of 1000+ years of history.",
        link: '/polymath.html',
        techStack: [
            { icon: 'HTML5', name: 'HTML5', type: 'simple-icon' },
            { icon: 'TailwindCSS', name: 'Tailwind', type: 'simple-icon' },
            { icon: 'D3.js', name: 'ECharts', type: 'simple-icon' }, // Using D3 icon as proxy or generic chart
            { icon: 'Javascript', name: 'Vanilla JS', type: 'simple-icon' }
        ],
        stamp: Brain,
        gallery: [
            '/assets/polymath/polymath-preview.webp',
            '/assets/polymath/hall_of_fame.webp',
            '/assets/polymath/chart_time.webp',
            '/assets/polymath/map.webp',
            '/assets/polymath/treemap.webp'
        ]
    },
];

export const techIcons = {
    'React': siReact,
    'Next.js': siNextdotjs,
    'Supabase': siSupabase,
    'Tailwind': siTailwindcss,
    'Vite': siVite,
    'Framer Motion': siFramer,
    'Photopea': siPhotopea,
    'D3.js': siD3,
    'Mapbox': siMapbox,
    'Node.js': siNodedotjs,
    'Python': siPython,
    'Vue.js': siVuedotjs,
    'SCSS': siSass,
    'LaTeX': siLatex,
    'Pandas': siPandas,
    'Scikit-learn': siScikitlearn,
    'Plotly': siPlotly,
    'HTML5': siHtml5,
    'Javascript': siJavascript,
    'Stats': 'Stats', // Custom handling

    // Null Hypothesis Tech
    'Huggingface': siHuggingface,

    // MSTAG Specific (Bleeding Edge Versions)
    'Next.js 16': siNextdotjs,
    'React 19': siReact,
    'Tailwind v4': siTailwindcss,
    'Figma': siFramer, // Placeholder if Figma icon not imported
    'TypeScript': siTypescript,
    'Google Gemini': siGoogle,
    'Next.js 15': siNextdotjs,
    'Recharts': siReact, // Using React icon for Recharts
    'Three.js': siThreedotjs,
};

export const getCategoryIcon = (category) => {
    switch (category) {
        case 'Sports Analytics': return Trophy; // Trophy icon for sports
        case 'Gamified Learning': return School; // Educational focus
        case 'Research Tools': return LayoutDashboard; // Dashboard/tools
        case 'Learning Platform': return School; // Educational
        case 'Startup Platform': return Zap; // Innovation/energy
        case 'Scrollytelling': return Feather; // Story/narrative
        case 'Thematic Portfolio': return Feather;
        case 'Art': return PenTool;
        case 'Machine Learning': return Zap;
        case 'Interactive Story': return Feather;
        // Legacy fallbacks
        case 'Web': return Globe;
        case 'Dashboard': return LayoutDashboard;
        case 'Translation': return Languages;
        case 'App': return Smartphone;
        default: return Globe;
    }
};
