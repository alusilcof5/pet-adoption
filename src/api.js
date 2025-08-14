// src/api.js

const API_KEY_DOG = import.meta.env.VITE_API_KEY_DOG;
const API_KEY_CAT = import.meta.env.VITE_API_KEY_CAT;

export async function getDogs(limit = 25) {
    const url = `https://api.thedogapi.com/v1/images/search?limit=${limit}&has_breeds=1`;
    return fetchPets(url, API_KEY_DOG, "perros");
}

export async function getCats(limit = 25) {
    const url = `https://api.thecatapi.com/v1/images/search?limit=${limit}&has_breeds=1`;
    return fetchPets(url, API_KEY_CAT, "gatos");
}

async function fetchPets(url, apiKey, type) {
    try {
        const res = await fetch(url, {
            headers: { "x-api-key": apiKey }
        });
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();
        return processPetData(data, type);
    } catch (err) {
        console.error(`Error cargando ${type}:`, err);
        return [];
    }
}

function processPetData(apiData, type) {
    return apiData.map((pet, index) => {
        const breed = pet.breeds[0] || {};
        const isYoung = breed.life_span && parseInt(breed.life_span) < 2;

        return {
            id: `${type}-${index}`,
            name: breed.name || "Sin nombre",
            age: isYoung ? "Cachorro" : "Adulto",
            breed: breed.name || "Mestizo",
            type,
            category: isYoung ? "cachorros" : "adultos",
            description: breed.temperament || "Una mascota maravillosa buscando hogar",
            traits: breed.temperament ? breed.temperament.split(", ").slice(0, 3) : ["Amigable"],
            emoji: type === "perros" ? "🐕" : "🐱",
            available: true,
            image: pet.url
        };
    });
}
