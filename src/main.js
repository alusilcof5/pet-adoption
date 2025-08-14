// src/main.js
import { getDogs, getCats } from "./api.js";

let pets = [];

async function loadPets() {
    const [dogs, cats] = await Promise.all([getDogs(), getCats()]);
    pets = [...dogs, ...cats];
    renderPets(pets);
}

function renderPets(petsToShow = pets) {
    const petsGrid = document.getElementById("pets-grid");
    petsGrid.innerHTML = "";

    petsToShow.forEach(pet => {
        const petCard = document.createElement("div");
        petCard.className = "pet-card";
        petCard.innerHTML = `
            <div class="pet-image" style="background-image: url('${pet.image}'); background-size: cover; background-position: center; height: 200px; border-radius: 10px;">
                <div class="pet-badge">${pet.available ? "Disponible" : "En proceso"}</div>
            </div>
            <div class="pet-content">
                <div class="pet-name">${pet.name}</div>
                <div class="pet-age">${pet.age}</div>
                <span class="pet-breed">${pet.breed}</span>
                <p class="pet-description">${pet.description}</p>
                <div class="pet-traits">
                    ${pet.traits.map(trait => `<span class="trait">${trait}</span>`).join("")}
                </div>
            </div>
        `;

        // Evento click para abrir modal
        petCard.addEventListener("click", () => {
            openPetModal(pet);
        });

        petsGrid.appendChild(petCard);
    });
}


function setupFilters() {
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.dataset.filter;
            if (filter === "all") {
                renderPets(pets);
            } else {
                renderPets(pets.filter(pet => pet.type === filter || pet.category === filter));
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setupFilters();
    loadPets();
});


const modal = document.getElementById("petModal");
const modalContent = document.getElementById("modal-content");
const modalCloseBtn = document.querySelector(".modal-close");

function openPetModal(pet) {
    modalContent.innerHTML = `
        <div class="modal-pet-card">
            <img src="${pet.image}" alt="${pet.name}" class="modal-pet-image">
            <h2>${pet.name} ${pet.emoji}</h2>
            <p><strong>Edad:</strong> ${pet.age}</p>
            <p><strong>Raza:</strong> ${pet.breed}</p>
            <p><strong>Descripción:</strong> ${pet.description}</p>
            <p><strong>Características:</strong> ${pet.traits.join(", ")}</p>
            <button class="modal-adopt-btn">¡Adóptame!</button>
        </div>
    `;
    modal.style.display = "flex";
}

// Cerrar modal al hacer click en la X
modalCloseBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Cerrar modal al hacer click fuera del contenido
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
