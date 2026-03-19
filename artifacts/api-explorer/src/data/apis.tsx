import React from 'react';
import { Globe, CloudRain, Gamepad2, Sparkles, BookOpen, Rocket, Coins } from 'lucide-react';

export type ApiCategory = "Gaming" | "Weather" | "Geography" | "Fun" | "Education" | "Space" | "Finance";

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
  Gaming: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  Weather: "text-sky-400 bg-sky-500/10 border-sky-500/20",
  Geography: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  Fun: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  Education: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  Space: "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20",
  Finance: "text-teal-400 bg-teal-500/10 border-teal-500/20",
};

export const API_COLLECTION: ApiConfig[] = [
  {
    id: "pokeapi",
    name: "PokeAPI",
    category: "Gaming",
    icon: <Gamepad2 className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Gaming,
    description: "Fetch comprehensive data about any Pokemon including stats, types, and abilities.",
    options: [
      { label: "Pikachu", value: "pikachu" },
      { label: "Charizard", value: "charizard" },
      { label: "Mewtwo", value: "mewtwo" },
      { label: "Eevee", value: "eevee" }
    ],
    buildUrl: (v) => `https://pokeapi.co/api/v2/pokemon/${v}`,
    renderCustom: (data) => data?.sprites?.other?.["official-artwork"]?.front_default ? (
      <div className="flex justify-center p-4 bg-white/5 rounded-xl mb-4 border border-white/5">
        <img src={data.sprites.other["official-artwork"].front_default} alt={data.name} className="w-40 h-40 drop-shadow-2xl hover:scale-110 transition-transform duration-500" />
      </div>
    ) : null
  },
  {
    id: "open-meteo",
    name: "Open Meteo",
    category: "Weather",
    icon: <CloudRain className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Weather,
    description: "Real-time weather forecasting for anywhere in the world without an API key.",
    options: [
      { label: "New York", value: "40.71,-74.00" },
      { label: "London", value: "51.51,-0.13" },
      { label: "Tokyo", value: "35.68,139.69" },
      { label: "Sydney", value: "-33.87,151.21" }
    ],
    buildUrl: (v) => {
      const [lat, lon] = v.split(',');
      return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    }
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
      { label: "Japan", value: "japan" },
      { label: "Canada", value: "canada" }
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
    }
  },
  {
    id: "dog-ceo",
    name: "Dog CEO",
    category: "Fun",
    icon: <Sparkles className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Fun,
    description: "The internet's biggest collection of open source dog pictures.",
    options: [
      { label: "Random Any", value: "random" },
      { label: "Husky", value: "husky" },
      { label: "Labrador", value: "labrador" },
      { label: "Poodle", value: "poodle" }
    ],
    buildUrl: (v) => v === 'random' ? 'https://dog.ceo/api/breeds/image/random' : `https://dog.ceo/api/breed/${v}/images/random`,
    renderCustom: (data) => data?.message ? (
      <img src={data.message} alt="A cute dog" className="w-full h-56 object-cover rounded-xl mb-4 shadow-lg border border-white/10" />
    ) : null
  },
  {
    id: "genderize",
    name: "Genderize API",
    category: "Fun",
    icon: <Sparkles className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Fun,
    description: "Predict the gender of a person based on their name using statistical data.",
    options: [
      { label: "James", value: "James" },
      { label: "Maria", value: "Maria" },
      { label: "Alex", value: "Alex" },
      { label: "Jordan", value: "Jordan" }
    ],
    buildUrl: (v) => `https://api.genderize.io?name=${v}`
  },
  {
    id: "open-library",
    name: "Open Library",
    category: "Education",
    icon: <BookOpen className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Education,
    description: "Search the world's largest open source catalog of books.",
    options: [
      { label: "Harry Potter", value: "Harry Potter" },
      { label: "Dune", value: "Dune" },
      { label: "1984", value: "1984" },
      { label: "Ender's Game", value: "Ender's Game" }
    ],
    buildUrl: (v) => `https://openlibrary.org/search.json?q=${encodeURIComponent(v)}&limit=3`
  },
  {
    id: "nasa-apod",
    name: "NASA APOD",
    category: "Space",
    icon: <Rocket className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Space,
    description: "Discover the cosmos! Fetch NASA's official Astronomy Picture of the Day.",
    options: [
      { label: "Today", value: "today" },
      { label: "Christmas 2023", value: "2023-12-25" },
      { label: "July 4th 2023", value: "2023-07-04" },
      { label: "Jan 1st 2024", value: "2024-01-01" }
    ],
    buildUrl: (v) => `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY${v === 'today' ? '' : `&date=${v}`}`,
    renderCustom: (data) => data?.media_type === 'image' && data?.url ? (
      <div className="space-y-4 mb-4">
        <img src={data.url} alt={data.title} className="w-full h-64 object-cover rounded-xl shadow-lg border border-white/10" />
        {data.title && <h4 className="font-display font-bold text-lg">{data.title}</h4>}
      </div>
    ) : null
  },
  {
    id: "advice",
    name: "Advice Slip",
    category: "Fun",
    icon: <Sparkles className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Fun,
    description: "Generate random pearls of wisdom and life advice.",
    options: [
      { label: "Random", value: "random" },
      { label: "Search: Work", value: "work" },
      { label: "Search: Love", value: "love" },
      { label: "Search: Time", value: "time" }
    ],
    buildUrl: (v) => v === 'random' ? 'https://api.adviceslip.com/advice' : `https://api.adviceslip.com/advice/search/${v}`,
    renderCustom: (data) => {
      const adviceStr = data?.slip?.advice || data?.slips?.[0]?.advice;
      return adviceStr ? (
        <div className="p-6 bg-gradient-to-br from-accent/20 to-primary/10 rounded-xl mb-4 border border-white/10">
          <p className="text-xl font-display text-white italic text-center">"{adviceStr}"</p>
        </div>
      ) : null;
    }
  },
  {
    id: "coingecko",
    name: "CoinGecko",
    category: "Finance",
    icon: <Coins className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Finance,
    description: "Real-time cryptocurrency prices and market changes.",
    options: [
      { label: "Bitcoin", value: "bitcoin" },
      { label: "Ethereum", value: "ethereum" },
      { label: "Solana", value: "solana" },
      { label: "Dogecoin", value: "dogecoin" }
    ],
    buildUrl: (v) => `https://api.coingecko.com/api/v3/simple/price?ids=${v}&vs_currencies=usd,eur&include_24hr_change=true`
  },
  {
    id: "jokeapi",
    name: "JokeAPI",
    category: "Fun",
    icon: <Sparkles className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Fun,
    description: "A flexible and robust API for programming and general jokes.",
    options: [
      { label: "Programming", value: "Programming" },
      { label: "General", value: "Miscellaneous" },
      { label: "Pun", value: "Pun" },
      { label: "Dark (Risky!)", value: "Dark" }
    ],
    buildUrl: (v) => `https://v2.jokeapi.dev/joke/${v}${v === 'Dark' ? '' : '?safe-mode'}`
  },
  {
    id: "iss-location",
    name: "ISS Location",
    category: "Space",
    icon: <Rocket className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Space,
    description: "Track the real-time position of the International Space Station.",
    options: [
      { label: "Get Current Position", value: "current" }
    ],
    buildUrl: () => `https://api.wheretheiss.at/v1/satellites/25544`
  },
  {
    id: "agify",
    name: "Agify API",
    category: "Fun",
    icon: <Sparkles className="w-4 h-4" />,
    colorClass: CATEGORY_COLORS.Fun,
    description: "Guess the age of a person based on their name.",
    options: [
      { label: "Michael", value: "Michael" },
      { label: "Emma", value: "Emma" },
      { label: "Daniel", value: "Daniel" },
      { label: "Sofia", value: "Sofia" }
    ],
    buildUrl: (v) => `https://api.agify.io?name=${v}`
  }
];
