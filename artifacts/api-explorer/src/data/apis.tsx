import React from 'react';
import {
  Globe, CloudRain, Gamepad2, Sparkles, BookOpen, Rocket, Coins,
  Utensils, Tv, Code, Leaf, Calendar, Wifi, Palette, Shuffle
} from 'lucide-react';

export type ApiCategory =
  | "Gaming"
  | "Weather"
  | "Geography"
  | "Fun"
  | "Education"
  | "Space"
  | "Finance"
  | "Food"
  | "Entertainment"
  | "Dev Tools"
  | "Nature"
  | "Utility"
  | "Network";

export interface ApiOption {
  label: string;
  value: string;
}

export interface ApiConfig {
  id: string;
  name: string;
  category: ApiCategory;
  icon: React.ReactNode;
  colorClass: string;
  description: string;
  options: ApiOption[];
  buildUrl: (value: string) => string;
  renderCustom?: (data: any) => React.ReactNode;
}

export const CATEGORY_COLORS: Record<ApiCategory, string> = {
  Gaming:        "text-violet-400 bg-violet-500/10 border-violet-500/20",
  Weather:       "text-sky-400 bg-sky-500/10 border-sky-500/20",
  Geography:     "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  Fun:           "text-amber-400 bg-amber-500/10 border-amber-500/20",
  Education:     "text-rose-400 bg-rose-500/10 border-rose-500/20",
  Space:         "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20",
  Finance:       "text-teal-400 bg-teal-500/10 border-teal-500/20",
  Food:          "text-orange-400 bg-orange-500/10 border-orange-500/20",
  Entertainment: "text-pink-400 bg-pink-500/10 border-pink-500/20",
  "Dev Tools":   "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  Nature:        "text-lime-400 bg-lime-500/10 border-lime-500/20",
  Utility:       "text-slate-400 bg-slate-500/10 border-slate-500/20",
  Network:       "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
};

export const API_COLLECTION: ApiConfig[] = [

  // ── ORIGINAL 12 ─────────────────────────────────────────────────────────────

  {
    id: "pokeapi",
    name: "PokeAPI",
    category: "Gaming",
    icon: <Gamepad2 className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Gaming,
    description: "Fetch comprehensive data about any Pokemon including stats, types, and abilities.",
    options: [
      { label: "Pikachu",   value: "pikachu"   },
      { label: "Charizard", value: "charizard" },
      { label: "Mewtwo",    value: "mewtwo"    },
      { label: "Eevee",     value: "eevee"     },
    ],
    buildUrl: (v) => `https://pokeapi.co/api/v2/pokemon/${v}`,
    renderCustom: (data) =>
      data?.sprites?.other?.["official-artwork"]?.front_default ? (
        <div className="flex justify-center p-4 bg-white/5 rounded-xl mb-4 border border-white/5">
          <img
            src={data.sprites.other["official-artwork"].front_default}
            alt={data.name}
            className="w-40 h-40 drop-shadow-2xl hover:scale-110 transition-transform duration-500"
          />
        </div>
      ) : null,
  },

  {
    id: "open-meteo",
    name: "Open Meteo",
    category: "Weather",
    icon: <CloudRain className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Weather,
    description: "Real-time weather forecasting for anywhere in the world without an API key.",
    options: [
      { label: "New York", value: "40.71,-74.00"    },
      { label: "London",   value: "51.51,-0.13"     },
      { label: "Tokyo",    value: "35.68,139.69"    },
      { label: "Sydney",   value: "-33.87,151.21"   },
    ],
    buildUrl: (v) => {
      const [lat, lon] = v.split(',');
      return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    },
  },

  {
    id: "rest-countries",
    name: "REST Countries",
    category: "Geography",
    icon: <Globe className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Geography,
    description: "Detailed information about nations including capitals, populations, and flags.",
    options: [
      { label: "France", value: "france" },
      { label: "Brazil", value: "brazil" },
      { label: "Japan",  value: "japan"  },
      { label: "Canada", value: "canada" },
    ],
    buildUrl: (v) => `https://restcountries.com/v3.1/name/${v}`,
    renderCustom: (data) => {
      const flag = data?.[0]?.flags?.svg;
      return flag ? (
        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl mb-4 border border-white/5">
          <img src={flag} alt="Flag" className="w-24 h-auto rounded shadow-lg" />
          <h3 className="text-2xl font-display font-bold">{data[0]?.name?.common}</h3>
        </div>
      ) : null;
    },
  },

  {
    id: "dog-ceo",
    name: "Dog CEO",
    category: "Fun",
    icon: <Sparkles className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Fun,
    description: "The internet's biggest collection of open source dog pictures.",
    options: [
      { label: "Random Any", value: "random"   },
      { label: "Husky",      value: "husky"    },
      { label: "Labrador",   value: "labrador" },
      { label: "Poodle",     value: "poodle"   },
    ],
    buildUrl: (v) =>
      v === 'random'
        ? 'https://dog.ceo/api/breeds/image/random'
        : `https://dog.ceo/api/breed/${v}/images/random`,
    renderCustom: (data) =>
      data?.message ? (
        <img
          src={data.message}
          alt="A cute dog"
          className="w-full h-56 object-cover rounded-xl mb-4 shadow-lg border border-white/10"
        />
      ) : null,
  },

  {
    id: "genderize",
    name: "Genderize API",
    category: "Fun",
    icon: <Sparkles className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Fun,
    description: "Predict the gender of a person based on their name using statistical data from millions of records.",
    options: [
      { label: "James",  value: "James"  },
      { label: "Maria",  value: "Maria"  },
      { label: "Alex",   value: "Alex"   },
      { label: "Jordan", value: "Jordan" },
    ],
    buildUrl: (v) => `https://api.genderize.io?name=${v}`,
  },

  {
    id: "open-library",
    name: "Open Library",
    category: "Education",
    icon: <BookOpen className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Education,
    description: "Search the world's largest open source catalog of books.",
    options: [
      { label: "Harry Potter", value: "Harry Potter"  },
      { label: "Dune",         value: "Dune"          },
      { label: "1984",         value: "1984"          },
      { label: "Ender's Game", value: "Ender's Game"  },
    ],
    buildUrl: (v) => `https://openlibrary.org/search.json?q=${encodeURIComponent(v)}&limit=3`,
  },

  {
    id: "nasa-apod",
    name: "NASA APOD",
    category: "Space",
    icon: <Rocket className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Space,
    description: "Discover the cosmos! Fetch NASA's official Astronomy Picture of the Day.",
    options: [
      { label: "Today",          value: "today"      },
      { label: "Christmas 2023", value: "2023-12-25" },
      { label: "July 4th 2023",  value: "2023-07-04" },
      { label: "Jan 1st 2024",   value: "2024-01-01" },
    ],
    buildUrl: (v) =>
      `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY${v === 'today' ? '' : `&date=${v}`}`,
    renderCustom: (data) =>
      data?.media_type === 'image' && data?.url ? (
        <div className="space-y-4 mb-4">
          <img
            src={data.url}
            alt={data.title}
            className="w-full h-64 object-cover rounded-xl shadow-lg border border-white/10"
          />
          {data.title && <h4 className="font-display font-bold text-lg">{data.title}</h4>}
        </div>
      ) : null,
  },

  {
    id: "advice",
    name: "Advice Slip",
    category: "Fun",
    icon: <Sparkles className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Fun,
    description: "Generate random pearls of wisdom and life advice from a curated database.",
    options: [
      { label: "Random",       value: "random" },
      { label: "Search: Work", value: "work"   },
      { label: "Search: Love", value: "love"   },
      { label: "Search: Time", value: "time"   },
    ],
    buildUrl: (v) =>
      v === 'random'
        ? 'https://api.adviceslip.com/advice'
        : `https://api.adviceslip.com/advice/search/${v}`,
    renderCustom: (data) => {
      const adviceStr = data?.slip?.advice || data?.slips?.[0]?.advice;
      return adviceStr ? (
        <div className="p-6 bg-gradient-to-br from-accent/20 to-primary/10 rounded-xl mb-4 border border-white/10">
          <p className="text-xl font-display text-white italic text-center">"{adviceStr}"</p>
        </div>
      ) : null;
    },
  },

  {
    id: "coingecko",
    name: "CoinGecko",
    category: "Finance",
    icon: <Coins className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Finance,
    description: "Real-time cryptocurrency prices and 24-hour market changes.",
    options: [
      { label: "Bitcoin",  value: "bitcoin"  },
      { label: "Ethereum", value: "ethereum" },
      { label: "Solana",   value: "solana"   },
      { label: "Dogecoin", value: "dogecoin" },
    ],
    buildUrl: (v) =>
      `https://api.coingecko.com/api/v3/simple/price?ids=${v}&vs_currencies=usd,eur&include_24hr_change=true`,
  },

  {
    id: "jokeapi",
    name: "JokeAPI",
    category: "Fun",
    icon: <Sparkles className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Fun,
    description: "A flexible and robust API for programming and general jokes.",
    options: [
      { label: "Programming",  value: "Programming"  },
      { label: "General",      value: "Miscellaneous" },
      { label: "Pun",          value: "Pun"          },
      { label: "Dark (Risky)", value: "Dark"         },
    ],
    buildUrl: (v) => `https://v2.jokeapi.dev/joke/${v}${v === 'Dark' ? '' : '?safe-mode'}`,
  },

  {
    id: "iss-location",
    name: "ISS Location",
    category: "Space",
    icon: <Rocket className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Space,
    description: "Track the real-time position of the International Space Station as it orbits at 28,000 km/h.",
    options: [{ label: "Get Current Position", value: "current" }],
    buildUrl: () => `https://api.wheretheiss.at/v1/satellites/25544`,
  },

  {
    id: "agify",
    name: "Agify API",
    category: "Fun",
    icon: <Sparkles className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Fun,
    description: "Guess the age of a person based on their name using global statistical data.",
    options: [
      { label: "Michael", value: "Michael" },
      { label: "Emma",    value: "Emma"    },
      { label: "Daniel",  value: "Daniel"  },
      { label: "Sofia",   value: "Sofia"   },
    ],
    buildUrl: (v) => `https://api.agify.io?name=${v}`,
  },

  // ── 20 NEW NICHE APIS ────────────────────────────────────────────────────────

  {
    id: "rick-and-morty",
    name: "Rick & Morty API",
    category: "Entertainment",
    icon: <Tv className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Entertainment,
    description: "Explore every character from the Rick and Morty universe — status, species, origin and more.",
    options: [
      { label: "Rick Sanchez", value: "1"  },
      { label: "Morty Smith",  value: "2"  },
      { label: "Summer Smith", value: "3"  },
      { label: "Beth Smith",   value: "4"  },
    ],
    buildUrl: (v) => `https://rickandmortyapi.com/api/character/${v}`,
    renderCustom: (data) =>
      data?.image ? (
        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl mb-4 border border-white/5">
          <img
            src={data.image}
            alt={data.name}
            className="w-20 h-20 rounded-xl object-cover shadow-lg"
          />
          <div>
            <p className="text-lg font-bold">{data.name}</p>
            <p className="text-sm text-muted-foreground">{data.status} · {data.species}</p>
            <p className="text-xs text-muted-foreground mt-1">Origin: {data.origin?.name}</p>
          </div>
        </div>
      ) : null,
  },

  {
    id: "jikan-anime",
    name: "Jikan (MyAnimeList)",
    category: "Entertainment",
    icon: <Tv className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Entertainment,
    description: "Unofficial MyAnimeList API — fetch full metadata on any anime including scores and synopsis.",
    options: [
      { label: "Attack on Titan", value: "16498" },
      { label: "Death Note",      value: "1535"  },
      { label: "Naruto",          value: "20"    },
      { label: "One Piece",       value: "21"    },
    ],
    buildUrl: (v) => `https://api.jikan.moe/v4/anime/${v}`,
    renderCustom: (data) =>
      data?.data?.images?.jpg?.image_url ? (
        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl mb-4 border border-white/5">
          <img
            src={data.data.images.jpg.image_url}
            alt={data.data.title}
            className="w-20 h-28 rounded-lg object-cover shadow-lg flex-shrink-0"
          />
          <div>
            <p className="text-lg font-bold leading-tight">{data.data.title}</p>
            <p className="text-sm text-muted-foreground mt-1">
              ⭐ {data.data.score}/10 · {data.data.type}
            </p>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-3">{data.data.synopsis}</p>
          </div>
        </div>
      ) : null,
  },

  {
    id: "themealdb",
    name: "TheMealDB",
    category: "Food",
    icon: <Utensils className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Food,
    description: "A crowd-sourced recipe and meal database with thousands of dishes from around the world.",
    options: [
      { label: "Pasta",      value: "pasta"      },
      { label: "Sushi",      value: "sushi"      },
      { label: "Tacos",      value: "tacos"      },
      { label: "Butter Chicken", value: "butter chicken" },
    ],
    buildUrl: (v) => `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(v)}`,
    renderCustom: (data) =>
      data?.meals?.[0]?.strMealThumb ? (
        <div className="mb-4">
          <img
            src={data.meals[0].strMealThumb}
            alt={data.meals[0].strMeal}
            className="w-full h-48 object-cover rounded-xl shadow-lg border border-white/10"
          />
          <p className="mt-2 text-sm font-bold">{data.meals[0].strMeal}</p>
          <p className="text-xs text-muted-foreground">{data.meals[0].strArea} · {data.meals[0].strCategory}</p>
        </div>
      ) : null,
  },

  {
    id: "cocktaildb",
    name: "TheCocktailDB",
    category: "Food",
    icon: <Utensils className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Food,
    description: "A free cocktail and drinks database with recipes, ingredients, and images.",
    options: [
      { label: "Margarita",     value: "margarita"     },
      { label: "Mojito",        value: "mojito"        },
      { label: "Old Fashioned", value: "old fashioned" },
      { label: "Negroni",       value: "negroni"       },
    ],
    buildUrl: (v) =>
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(v)}`,
    renderCustom: (data) =>
      data?.drinks?.[0]?.strDrinkThumb ? (
        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl mb-4 border border-white/5">
          <img
            src={data.drinks[0].strDrinkThumb}
            alt={data.drinks[0].strDrink}
            className="w-24 h-24 rounded-xl object-cover shadow-lg"
          />
          <div>
            <p className="text-lg font-bold">{data.drinks[0].strDrink}</p>
            <p className="text-sm text-muted-foreground">{data.drinks[0].strCategory}</p>
            <p className="text-xs text-muted-foreground mt-1">Glass: {data.drinks[0].strGlass}</p>
          </div>
        </div>
      ) : null,
  },

  {
    id: "color-api",
    name: "The Color API",
    category: "Dev Tools",
    icon: <Palette className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS["Dev Tools"],
    description: "Identify any hex color — get its name, RGB, HSL values, and closest named match.",
    options: [
      { label: "Crimson Red",   value: "DC143C" },
      { label: "Ocean Blue",    value: "006994" },
      { label: "Forest Green",  value: "228B22" },
      { label: "Golden Yellow", value: "FFD700" },
    ],
    buildUrl: (v) => `https://www.thecolorapi.com/id?hex=${v}&format=json`,
    renderCustom: (data) =>
      data?.hex?.value ? (
        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl mb-4 border border-white/5">
          <div
            style={{ backgroundColor: data.hex.value }}
            className="w-16 h-16 rounded-xl shadow-lg border border-white/20 flex-shrink-0"
          />
          <div>
            <p className="text-xl font-bold">{data.name?.value}</p>
            <p className="text-sm font-mono text-muted-foreground">{data.hex?.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              rgb({data.rgb?.r}, {data.rgb?.g}, {data.rgb?.b})
            </p>
          </div>
        </div>
      ) : null,
  },

  {
    id: "nationalize",
    name: "Nationalize API",
    category: "Fun",
    icon: <Globe className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Fun,
    description: "Predict the most likely nationality of a person based on their first name, using data from millions of people.",
    options: [
      { label: "Santiago", value: "Santiago" },
      { label: "Mohammed", value: "Mohammed" },
      { label: "Pierre",   value: "Pierre"   },
      { label: "Yuki",     value: "Yuki"     },
    ],
    buildUrl: (v) => `https://api.nationalize.io?name=${v}`,
  },

  {
    id: "open-trivia",
    name: "Open Trivia DB",
    category: "Education",
    icon: <BookOpen className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Education,
    description: "A free, user-contributed trivia question database with over 4,000 verified questions across 24 categories.",
    options: [
      { label: "Science",     value: "17" },
      { label: "History",     value: "23" },
      { label: "Sports",      value: "21" },
      { label: "Geography",   value: "22" },
    ],
    buildUrl: (v) =>
      `https://opentdb.com/api.php?amount=1&category=${v}&type=multiple`,
  },

  {
    id: "random-user",
    name: "Random User Generator",
    category: "Dev Tools",
    icon: <Code className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS["Dev Tools"],
    description: "Generate realistic random user profiles with names, addresses, photos and contact info — perfect for prototyping.",
    options: [
      { label: "US Person", value: "us" },
      { label: "UK Person", value: "gb" },
      { label: "AU Person", value: "au" },
      { label: "CA Person", value: "ca" },
    ],
    buildUrl: (v) => `https://randomuser.me/api/?results=1&nat=${v}`,
    renderCustom: (data) =>
      data?.results?.[0]?.picture?.large ? (
        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl mb-4 border border-white/5">
          <img
            src={data.results[0].picture.large}
            alt="Random User"
            className="w-16 h-16 rounded-full object-cover shadow-lg border-2 border-primary/30"
          />
          <div>
            <p className="font-bold">
              {data.results[0].name.first} {data.results[0].name.last}
            </p>
            <p className="text-sm text-muted-foreground">
              {data.results[0].location.city}, {data.results[0].location.country}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {data.results[0].email}
            </p>
          </div>
        </div>
      ) : null,
  },

  {
    id: "exchange-rates",
    name: "Open Exchange Rates",
    category: "Finance",
    icon: <Coins className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Finance,
    description: "Live foreign exchange rates for 160+ currencies, updated hourly from a trusted source.",
    options: [
      { label: "USD Base", value: "USD" },
      { label: "EUR Base", value: "EUR" },
      { label: "GBP Base", value: "GBP" },
      { label: "JPY Base", value: "JPY" },
    ],
    buildUrl: (v) => `https://open.er-api.com/v6/latest/${v}`,
  },

  {
    id: "chuck-norris",
    name: "Chuck Norris API",
    category: "Fun",
    icon: <Sparkles className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Fun,
    description: "A hand-curated database of Chuck Norris facts. Categorized, safe, and absolutely ridiculous.",
    options: [
      { label: "Random",      value: "random"  },
      { label: "Programming", value: "dev"     },
      { label: "Science",     value: "science" },
      { label: "History",     value: "history" },
    ],
    buildUrl: (v) =>
      v === 'random'
        ? 'https://api.chucknorris.io/jokes/random'
        : `https://api.chucknorris.io/jokes/random?category=${v}`,
    renderCustom: (data) =>
      data?.value ? (
        <div className="p-6 bg-gradient-to-br from-red-500/10 to-orange-500/5 rounded-xl mb-4 border border-red-500/20">
          <p className="text-base text-white italic">"{data.value}"</p>
        </div>
      ) : null,
  },

  {
    id: "wikipedia",
    name: "Wikipedia Summary",
    category: "Education",
    icon: <BookOpen className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Education,
    description: "Fetch concise, structured summaries and metadata for any topic directly from Wikipedia's REST API.",
    options: [
      { label: "JavaScript",      value: "JavaScript"      },
      { label: "Quantum Physics", value: "Quantum_mechanics" },
      { label: "Renaissance",     value: "Renaissance"     },
      { label: "The Internet",    value: "Internet"        },
    ],
    buildUrl: (v) =>
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(v)}`,
    renderCustom: (data) =>
      data?.extract ? (
        <div className="flex gap-4 p-4 bg-white/5 rounded-xl mb-4 border border-white/5">
          {data.thumbnail?.source && (
            <img
              src={data.thumbnail.source}
              alt={data.title}
              className="w-20 h-20 object-cover rounded-lg shadow-lg flex-shrink-0"
            />
          )}
          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-5">
            {data.extract}
          </p>
        </div>
      ) : null,
  },

  {
    id: "deck-of-cards",
    name: "Deck of Cards API",
    category: "Gaming",
    icon: <Shuffle className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Gaming,
    description: "A playful API that simulates a real deck of cards — shuffle, draw, and build card game logic.",
    options: [
      { label: "Draw 1 Card",  value: "1" },
      { label: "Draw 3 Cards", value: "3" },
      { label: "Draw 5 Cards", value: "5" },
      { label: "Draw a Hand (7)", value: "7" },
    ],
    buildUrl: (v) => `https://deckofcardsapi.com/api/deck/new/draw/?count=${v}`,
    renderCustom: (data) =>
      data?.cards?.length > 0 ? (
        <div className="flex flex-wrap gap-2 p-4 bg-white/5 rounded-xl mb-4 border border-white/5 justify-center">
          {data.cards.map((card: any, i: number) => (
            <img
              key={i}
              src={card.image}
              alt={`${card.value} of ${card.suit}`}
              className="h-24 rounded shadow-lg hover:scale-105 transition-transform duration-200"
            />
          ))}
        </div>
      ) : null,
  },

  {
    id: "cat-fact",
    name: "Cat Fact Ninja",
    category: "Fun",
    icon: <Sparkles className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Fun,
    description: "A random cat fact API with a library of 300+ verified facts about our feline overlords.",
    options: [
      { label: "Random Fact", value: "random" },
    ],
    buildUrl: () => `https://catfact.ninja/fact`,
    renderCustom: (data) =>
      data?.fact ? (
        <div className="p-6 bg-gradient-to-br from-amber-500/10 to-orange-500/5 rounded-xl mb-4 border border-amber-500/20">
          <p className="text-base italic text-white">🐱 "{data.fact}"</p>
        </div>
      ) : null,
  },

  {
    id: "fake-store",
    name: "Fake Store API",
    category: "Dev Tools",
    icon: <Code className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS["Dev Tools"],
    description: "A free e-commerce API with products, carts, and user data — designed for front-end prototyping and testing.",
    options: [
      { label: "Product #1",  value: "1"  },
      { label: "Product #5",  value: "5"  },
      { label: "Product #10", value: "10" },
      { label: "Product #18", value: "18" },
    ],
    buildUrl: (v) => `https://fakestoreapi.com/products/${v}`,
    renderCustom: (data) =>
      data?.image ? (
        <div className="flex gap-4 p-4 bg-white/5 rounded-xl mb-4 border border-white/5">
          <img
            src={data.image}
            alt={data.title}
            className="w-20 h-20 object-contain bg-white rounded-lg p-1 flex-shrink-0"
          />
          <div>
            <p className="text-sm font-bold line-clamp-2">{data.title}</p>
            <p className="text-sm text-teal-400 font-bold mt-1">${data.price}</p>
            <p className="text-xs text-muted-foreground mt-0.5">⭐ {data.rating?.rate} ({data.rating?.count} reviews)</p>
          </div>
        </div>
      ) : null,
  },

  {
    id: "tv-maze",
    name: "TV Maze",
    category: "Entertainment",
    icon: <Tv className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Entertainment,
    description: "A rich TV show database with schedules, cast info, and episode data for thousands of series.",
    options: [
      { label: "Breaking Bad",   value: "169"  },
      { label: "Game of Thrones", value: "82"  },
      { label: "Stranger Things", value: "2993" },
      { label: "The Office",      value: "526" },
    ],
    buildUrl: (v) => `https://api.tvmaze.com/shows/${v}`,
    renderCustom: (data) =>
      data?.image?.medium ? (
        <div className="flex gap-4 p-4 bg-white/5 rounded-xl mb-4 border border-white/5">
          <img
            src={data.image.medium}
            alt={data.name}
            className="w-24 h-32 object-cover rounded-lg shadow-lg flex-shrink-0"
          />
          <div>
            <p className="text-lg font-bold">{data.name}</p>
            <p className="text-sm text-muted-foreground">{data.genres?.join(' · ')}</p>
            <p className="text-xs text-muted-foreground mt-1">
              ⭐ {data.rating?.average ?? 'N/A'} · {data.status}
            </p>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: data.summary?.replace(/<[^>]*>/g, '') ?? '' }}
            />
          </div>
        </div>
      ) : null,
  },

  {
    id: "the-cat-api",
    name: "The Cat API",
    category: "Fun",
    icon: <Sparkles className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Fun,
    description: "Millions of cat images served on demand. Because everyone needs more cats in their life.",
    options: [
      { label: "Random Cat",  value: "cat"    },
      { label: "Another Cat", value: "cat2"   },
      { label: "One More",    value: "cat3"   },
    ],
    buildUrl: () => `https://api.thecatapi.com/v1/images/search?limit=1`,
    renderCustom: (data) =>
      data?.[0]?.url ? (
        <img
          src={data[0].url}
          alt="A cat"
          className="w-full h-52 object-cover rounded-xl mb-4 shadow-lg border border-white/10"
        />
      ) : null,
  },

  {
    id: "ip-geolocation",
    name: "IP Geolocation",
    category: "Network",
    icon: <Wifi className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Network,
    description: "Identify the geographic location, timezone, ISP, and currency of any IP address instantly.",
    options: [
      { label: "My IP",            value: "me"           },
      { label: "Google DNS",       value: "8.8.8.8"      },
      { label: "Cloudflare DNS",   value: "1.1.1.1"      },
      { label: "OpenDNS",          value: "208.67.222.222" },
    ],
    buildUrl: (v) =>
      v === 'me'
        ? `https://ipapi.co/json/`
        : `https://ipapi.co/${v}/json/`,
  },

  {
    id: "public-holidays",
    name: "Public Holidays",
    category: "Utility",
    icon: <Calendar className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Utility,
    description: "Lookup public holidays for any country and year, covering 100+ countries worldwide.",
    options: [
      { label: "USA 2025",     value: "US" },
      { label: "UK 2025",      value: "GB" },
      { label: "Germany 2025", value: "DE" },
      { label: "Japan 2025",   value: "JP" },
    ],
    buildUrl: (v) => `https://date.nager.at/api/v3/PublicHolidays/2025/${v}`,
  },

  {
    id: "sunrise-sunset",
    name: "Sunrise & Sunset",
    category: "Nature",
    icon: <Leaf className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Nature,
    description: "Get precise sunrise, sunset, solar noon, and day length for any location on Earth.",
    options: [
      { label: "New York", value: "40.7128,-74.0060"    },
      { label: "London",   value: "51.5074,-0.1278"     },
      { label: "Tokyo",    value: "35.6762,139.6503"    },
      { label: "Sydney",   value: "-33.8688,151.2093"   },
    ],
    buildUrl: (v) => {
      const [lat, lng] = v.split(',');
      return `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`;
    },
    renderCustom: (data) =>
      data?.results ? (
        <div className="grid grid-cols-2 gap-3 p-4 bg-white/5 rounded-xl mb-4 border border-white/5">
          {[
            ['🌅 Sunrise',   new Date(data.results.sunrise).toLocaleTimeString()],
            ['🌇 Sunset',    new Date(data.results.sunset).toLocaleTimeString()],
            ['☀️ Solar Noon', new Date(data.results.solar_noon).toLocaleTimeString()],
            ['⏱ Day Length',
              `${Math.floor(data.results.day_length / 3600)}h ${Math.floor((data.results.day_length % 3600) / 60)}m`],
          ].map(([label, val]) => (
            <div key={String(label)} className="text-center p-2 bg-white/5 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">{label}</p>
              <p className="font-mono font-bold text-sm">{val}</p>
            </div>
          ))}
        </div>
      ) : null,
  },

  {
    id: "magic-the-gathering",
    name: "Magic: The Gathering",
    category: "Gaming",
    icon: <Gamepad2 className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Gaming,
    description: "Query cards from the iconic trading card game — get rules text, mana cost, rarity, and artwork.",
    options: [
      { label: "Lightning Bolt",   value: "Lightning Bolt"   },
      { label: "Dark Ritual",      value: "Dark Ritual"      },
      { label: "Counterspell",     value: "Counterspell"     },
      { label: "Birds of Paradise", value: "Birds of Paradise" },
    ],
    buildUrl: (v) =>
      `https://api.magicthegathering.io/v1/cards?name=${encodeURIComponent(v)}&pageSize=1`,
    renderCustom: (data) =>
      data?.cards?.[0]?.imageUrl ? (
        <div className="flex justify-center p-4 bg-white/5 rounded-xl mb-4 border border-white/5">
          <img
            src={data.cards[0].imageUrl}
            alt={data.cards[0].name}
            className="h-64 rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : null,
  },
];
