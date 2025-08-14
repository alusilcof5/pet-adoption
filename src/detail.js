// detail.js
const API_KEY_DOG = "live_TPQ67FP03m59ksEnlE1dpgryaCv2GjaIJrfCuJ63gK8NC2tTel5HB18riFJpEoHb";
const API_KEY_CAT = "live_xHgkhv2GMFGe2VSPjKGN1PTL0cUIm6qXcmyfG4SaZAqAyixE0nnLnYZXRiwqIe05";

// Función para obtener parámetros de la URL
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Función para obtener detalles de un perro específico
async function getDogDetails(breedId) {
    try {
        const url = `https://api.thedogapi.com/v1/images/search?breed_ids=${breedId}&limit=5`;
        const res = await fetch(url, {
            headers: { "x-api-key": API_KEY_DOG }
        });
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();
        return data.length > 0 ? processDogDetail(data[0]) : null;
    } catch (err) {
        console.error('Error cargando detalles del perro:', err);
        return null;
    }
}

// Función para obtener detalles de un gato específico
async function getCatDetails(breedId) {
    try {
        const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&limit=5`;
        const res = await fetch(url, {
            headers: { "x-api-key": API_KEY_CAT }
        });
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();
        return data.length > 0 ? processCatDetail(data[0]) : null;
    } catch (err) {
        console.error('Error cargando detalles del gato:', err);
        return null;
    }
}

// Función para procesar detalles del perro
function processDogDetail(apiData) {
    const breed = apiData.breeds[0] || {};
    
    return {
        id: `dog-${breed.id || 'unknown'}`,
        name: breed.name || "Perro sin nombre",
        type: "perros",
        emoji: "🐕",
        image: apiData.url,
        breed: breed.name || "Mestizo",
        age: getRandomAge(),
        weight: breed.weight ? `${breed.weight.metric} kg` : "No especificado",
        height: breed.height ? `${breed.height.metric} cm` : "No especificado",
        lifeSpan: breed.life_span || "No especificado",
        temperament: breed.temperament || "Amigable, Cariñoso",
        origin: breed.origin || "No especificado",
        breedGroup: breed.breed_group || "No especificado",
        description: generateDescription(breed, "perro"),
        traits: breed.temperament ? breed.temperament.split(", ").slice(0, 5) : ["Amigable", "Leal", "Activo"],
        available: true,
        energy: getRandomLevel(),
        training: getRandomLevel(),
        grooming: getRandomLevel(),
        goodWithKids: getRandomBoolean(),
        goodWithPets: getRandomBoolean()
    };
}

// Función para procesar detalles del gato
function processCatDetail(apiData) {
    const breed = apiData.breeds[0] || {};
    
    return {
        id: `cat-${breed.id || 'unknown'}`,
        name: breed.name || "Gato sin nombre",
        type: "gatos",
        emoji: "🐱",
        image: apiData.url,
        breed: breed.name || "Mestizo",
        age: getRandomAge(),
        weight: breed.weight ? `${breed.weight.metric} kg` : "No especificado",
        lifeSpan: breed.life_span || "No especificado",
        temperament: breed.temperament || "Independiente, Cariñoso",
        origin: breed.origin || "No especificado",
        description: generateDescription(breed, "gato"),
        traits: breed.temperament ? breed.temperament.split(", ").slice(0, 5) : ["Independiente", "Cariñoso", "Curioso"],
        available: true,
        energy: breed.energy_level || getRandomLevel(),
        affection: breed.affection_level || getRandomLevel(),
        grooming: breed.grooming || getRandomLevel(),
        indoor: breed.indoor || getRandomLevel(),
        intelligence: breed.intelligence || getRandomLevel()
    };
}

// Funciones auxiliares
function getRandomAge() {
    const ages = ["Cachorro", "Joven", "Adulto", "Senior"];
    return ages[Math.floor(Math.random() * ages.length)];
}

function getRandomLevel() {
    return Math.floor(Math.random() * 5) + 1;
}

function getRandomBoolean() {
    return Math.random() > 0.5;
}

function generateDescription(breed, type) {
    if (breed.description) return breed.description;
    
    const descriptions = {
        perro: [
            "Un compañero leal y amoroso que está buscando una familia que lo cuide.",
            "Este hermoso perro tiene mucho amor para dar y está ansioso por encontrar su hogar para siempre.",
            "Con una personalidad única y un corazón lleno de amor, este perro será el compañero perfecto.",
            "Un perro maravilloso que se adapta bien a diferentes estilos de vida y familias."
        ],
        gato: [
            "Un felino elegante y cariñoso que está buscando un hogar tranquilo y amoroso.",
            "Este gato especial tiene una personalidad única y está listo para brindar años de compañía.",
            "Con su naturaleza independiente pero afectuosa, este gato será el compañero ideal.",
            "Un gato maravilloso que se adapta bien a la vida doméstica y ama la compañía humana."
        ]
    };
    
    const typeDescriptions = descriptions[type] || descriptions.perro;
    return typeDescriptions[Math.floor(Math.random() * typeDescriptions.length)];
}

// Función para renderizar los detalles de la mascota
function renderPetDetails(pet) {
    const content = document.getElementById('pet-detail-content');
    
    if (!pet) {
        content.innerHTML = `
            <div class="error">
                <h2>Mascota no encontrada</h2>
                <p>Lo sentimos, no pudimos encontrar la información de esta mascota.</p>
                <a href="index.html#mascotas" class="btn-adopt">Volver a mascotas</a>
            </div>
        `;
        return;
    }

    const detailsHTML = pet.type === "perros" ? renderDogDetails(pet) : renderCatDetails(pet);
    
    content.innerHTML = `
        <div class="detail-header">
            <div class="detail-image">
                <img src="${pet.image}" alt="${pet.name}" />
            </div>
            <div class="detail-info">
                <h1 class="pet-name-detail">${pet.name} ${pet.emoji}</h1>
                <span class="pet-status">${pet.available ? 'Disponible para adopción' : 'En proceso de adopción'}</span>
                
                <div class="detail-grid">
                    <div class="detail-item">
                        <div class="detail-item-icon">🐾</div>
                        <div class="detail-item-label">Raza</div>
                        <div class="detail-item-value">${pet.breed}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-item-icon">📅</div>
                        <div class="detail-item-label">Edad</div>
                        <div class="detail-item-value">${pet.age}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-item-icon">⚖️</div>
                        <div class="detail-item-label">Peso</div>
                        <div class="detail-item-value">${pet.weight}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-item-icon">🌍</div>
                        <div class="detail-item-label">Origen</div>
                        <div class="detail-item-value">${pet.origin}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="description-section">
            <h2 class="section-title-detail">Acerca de ${pet.name}</h2>
            <p>${pet.description}</p>
            
            <h3 class="section-title-detail">Personalidad</h3>
            <div class="traits-container">
                ${pet.traits.map(trait => `<span class="trait-detail">${trait}</span>`).join('')}
            </div>
        </div>

        ${detailsHTML}

        <div class="adoption-cta">
            <h2 class="cta-title">¿Te enamoraste de ${pet.name}?</h2>
            <p>Inicia el proceso de adopción y dale una segunda oportunidad a este increíble compañero.</p>
            <div class="cta-buttons">
                <a href="#" class="btn-adopt" onclick="startAdoptionProcess('${pet.id}')">
                    <i class="fas fa-heart"></i> Iniciar adopción
                </a>
                <a href="index.html#mascotas" class="btn-back">
                    <i class="fas fa-arrow-left"></i> Ver más mascotas
                </a>
            </div>
        </div>
    `;
}

// Función para renderizar detalles específicos de perros
function renderDogDetails(pet) {
    return `
        <div class="description-section">
            <h2 class="section-title-detail">Características especiales</h2>
            <div class="detail-grid">
                <div class="detail-item">
                    <div class="detail-item-icon">⚡</div>
                    <div class="detail-item-label">Nivel de energía</div>
                    <div class="detail-item-value">${'⭐'.repeat(pet.energy)}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-item-icon">🎓</div>
                    <div class="detail-item-label">Fácil de entrenar</div>
                    <div class="detail-item-value">${'⭐'.repeat(pet.training)}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-item-icon">✂️</div>
                    <div class="detail-item-label">Cuidado del pelaje</div>
                    <div class="detail-item-value">${'⭐'.repeat(pet.grooming)}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-item-icon">👶</div>
                    <div class="detail-item-label">Bueno con niños</div>
                    <div class="detail-item-value">${pet.goodWithKids ? '✅ Sí' : '⚠️ Supervisión'}</div>
                </div>
            </div>
            
            ${pet.breedGroup !== 'No especificado' ? `
                <h3 class="section-title-detail">Grupo de raza</h3>
                <p>${pet.breedGroup}</p>
            ` : ''}
            
            <h3 class="section-title-detail">Expectativa de vida</h3>
            <p>${pet.lifeSpan} años</p>
        </div>
    `;
}

// Función para renderizar detalles específicos de gatos
function renderCatDetails(pet) {
    return `
        <div class="description-section">
            <h2 class="section-title-detail">Características especiales</h2>
            <div class="detail-grid">
                <div class="detail-item">
                    <div class="detail-item-icon">⚡</div>
                    <div class="detail-item-label">Nivel de energía</div>
                    <div class="detail-item-value">${'⭐'.repeat(pet.energy)}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-item-icon">❤️</div>
                    <div class="detail-item-label">Nivel de cariño</div>
                    <div class="detail-item-value">${'⭐'.repeat(pet.affection)}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-item-icon">🧠</div>
                    <div class="detail-item-label">Inteligencia</div>
                    <div class="detail-item-value">${'⭐'.repeat(pet.intelligence)}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-item-icon">🏠</div>
                    <div class="detail-item-label">Vida interior</div>
                    <div class="detail-item-value">${'⭐'.repeat(pet.indoor)}</div>
                </div>
            </div>
            
            <h3 class="section-title-detail">Expectativa de vida</h3>
            <p>${pet.lifeSpan} años</p>
        </div>
    `;
}

// Función para iniciar el proceso de adopción
function startAdoptionProcess(petId) {
    alert(`¡Gracias por tu interés en adoptar! El proceso de adopción para ${petId} comenzará pronto. Te contactaremos en las próximas 24 horas.`);
}

// Función para buscar mascota por nombre de raza (fallback)
async function searchPetByBreedName(petType, breedName) {
    try {
        const isdog = petType === 'perros';
        const url = isdog 
            ? `https://api.thedogapi.com/v1/images/search?limit=10&has_breeds=1`
            : `https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=1`;
        
        const apiKey = isdog ? API_KEY_DOG : API_KEY_CAT;
        
        const res = await fetch(url, {
            headers: { "x-api-key": apiKey }
        });
        
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();
        
        // Buscar una mascota que coincida con el nombre de la raza
        const matchingPet = data.find(pet => 
            pet.breeds && pet.breeds.length > 0 && 
            pet.breeds[0].name && 
            pet.breeds[0].name.toLowerCase().includes(breedName.toLowerCase())
        );
        
        if (matchingPet) {
            return isdog ? processDogDetail(matchingPet) : processCatDetail(matchingPet);
        }
        
        // Si no encontramos coincidencia exacta, devolver el primero disponible
        return data.length > 0 ? 
            (isdog ? processDogDetail(data[0]) : processCatDetail(data[0])) : null;
            
    } catch (err) {
        console.error('Error buscando mascota por nombre de raza:', err);
        return null;
    }
}

// Función principal para cargar la página
async function loadPetDetail() {
    const petType = getUrlParameter('type');
    const breedId = getUrlParameter('breed');
    const isFallback = getUrlParameter('fallback') === 'true';
    
    if (!petType || !breedId) {
        document.getElementById('pet-detail-content').innerHTML = `
            <div class="error">
                <h2>Información incompleta</h2>
                <p>No se encontraron los parámetros necesarios para mostrar los detalles de la mascota.</p>
                <a href="index.html#mascotas" class="btn-adopt">Volver a mascotas</a>
            </div>
        `;
        return;
    }

    let pet = null;
    
    try {
        if (isFallback) {
            // Buscar por nombre de raza
            pet = await searchPetByBreedName(petType, breedId);
        } else {
            // Buscar por ID de raza
            if (petType === 'perros') {
                pet = await getDogDetails(breedId);
            } else if (petType === 'gatos') {
                pet = await getCatDetails(breedId);
            }
        }
        
        // Si no encontramos la mascota específica, buscar una aleatoria del mismo tipo
        if (!pet) {
            const url = petType === 'perros' 
                ? `https://api.thedogapi.com/v1/images/search?limit=1&has_breeds=1`
                : `https://api.thecatapi.com/v1/images/search?limit=1&has_breeds=1`;
            
            const apiKey = petType === 'perros' ? API_KEY_DOG : API_KEY_CAT;
            
            const res = await fetch(url, {
                headers: { "x-api-key": apiKey }
            });
            
            if (res.ok) {
                const data = await res.json();
                if (data.length > 0) {
                    pet = petType === 'perros' ? processDogDetail(data[0]) : processCatDetail(data[0]);
                }
            }
        }
        
    } catch (error) {
        console.error('Error cargando detalles de la mascota:', error);
    }
    
    renderPetDetails(pet);
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', loadPetDetail);