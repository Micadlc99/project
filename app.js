// Header Component
class HeaderComponent extends HTMLElement {
  constructor() {
    super();
    const header = document.createElement('header');
    header.innerHTML = `
      <h1>Aplicación Modular</h1>
    `;
    header.style.cssText = `
      background-color: #4CAF50;
      color: white;
      text-align: center;
      padding: 10px 0;
      margin: 0;
    `;
    this.appendChild(header);
  }
}
customElements.define('header-component', HeaderComponent);

// Footer Component
class FooterComponent extends HTMLElement {
  constructor() {
    super();
    const footer = document.createElement('footer');
    footer.innerHTML = `
      <p>&copy; 2024 Aplicación Modular</p>
    `;
    footer.style.cssText = `
      text-align: center;
      background-color: #333;
      color: white;
      position: fixed;
      bottom: 0;
      width: 100%;
      padding: 10px 0;
      margin: 0;
    `;
    this.appendChild(footer);
  }
}
customElements.define('footer-component', FooterComponent);

// Menu Component
class MenuComponent extends HTMLElement {
  constructor() {
    super();
    const nav = document.createElement('nav');
    nav.innerHTML = `
      <ul>
        <li><a href="#social-profile">Perfil Social</a></li>
        <li><a href="#custom-table">Tabla Personalizada</a></li>
        <li><a href="#gallery">Galería</a></li>
      </ul>
    `;
    nav.style.cssText = `
      background-color: #333;
      margin: 0;
      padding: 0;
    `;
    nav.querySelector('ul').style.cssText = `
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
    `;
    nav.querySelectorAll('li a').forEach(link => {
      link.style.cssText = `
        display: block;
        color: white;
        padding: 10px 15px;
        text-decoration: none;
      `;
      link.addEventListener('mouseenter', () => link.style.backgroundColor = '#575757');
      link.addEventListener('mouseleave', () => link.style.backgroundColor = 'transparent');
    });
    this.appendChild(nav);
  }
}
customElements.define('menu-component', MenuComponent);

// SocialProfile Component
// SocialProfile Component
class SocialProfileComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.section = document.createElement('section');
    this.section.innerHTML = `
      <h2>Perfil de Usuario</h2>
      <div class="profile-container">
        <div class="profile-info">
          <p><strong>Nombre:</strong> Micaela de la Cadena</p>
          <p><strong>Ciudad:</strong> Quito</p>
          <p><strong>Profesión:</strong> Estudiante Universitaria</p>
        </div>
        <div class="profile-photo">
          <img src="https://via.placeholder.com/150" alt="Foto de Micaela">
        </div>
      </div>
    `;
    this.shadowRoot.appendChild(this.section);

    // Estilos dentro del Shadow DOM
    const style = document.createElement('style');
    style.textContent = `
      h2 {
        text-align: center;
        font-size: 2rem;
        margin-bottom: 20px;
        color: #333;
      }
      .profile-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        flex-wrap: wrap;
      }
      .profile-info {
        flex: 1;
        font-size: 1.1rem;
        line-height: 1.8;
        color: #555;
      }
      .profile-info p {
        margin: 8px 0;
      }
      .profile-photo img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid #ddd;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
      }
      @media (max-width: 768px) {
        .profile-container {
          flex-direction: column;
          text-align: center;
        }
      }
    `;
    this.shadowRoot.appendChild(style);
  }
}
customElements.define('social-profile-component', SocialProfileComponent);

// CustomTable Component
class CustomTableComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.renderTable();
  }

  async renderTable() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();

    const table = document.createElement('table');
    table.style.cssText = `
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    `;

    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
      <th>ID</th>
      <th>Nombre</th>
      <th>Email</th>
    `;
    table.appendChild(headerRow);

    users.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
      `;
      row.style.borderBottom = '1px solid #ccc';
      table.appendChild(row);
    });

    this.shadowRoot.appendChild(table);
  }
}
customElements.define('custom-table-component', CustomTableComponent);

// Gallery Component
class GalleryComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.section = document.createElement('section');
    this.section.innerHTML = `
      <h2>Galería de Pokémon</h2>
      <div class="gallery">
        <!-- Las imágenes de Pokémon se agregarán dinámicamente aquí -->
      </div>
    `;
    this.shadowRoot.appendChild(this.section);

    // Estilos dentro del Shadow DOM
    const style = document.createElement('style');
    style.textContent = `
      .gallery {
        display: flex;
        gap: 10px;
        justify-content: center;
      }
      .gallery img {
        width: 150px;
        height: 150px;
        object-fit: cover;
        border: 2px solid #ddd;
        border-radius: 8px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
      }
    `;
    this.shadowRoot.appendChild(style);
  }

  async connectedCallback() {
    await this.loadImages();
  }

  // Función para cargar las imágenes de la PokeAPI
  async loadImages() {
    const pokemonList = [
      'pikachu', 'bulbasaur', 'charmander', 'squirtle', 'jigglypuff'
    ];

    const gallery = this.shadowRoot.querySelector('.gallery');

    for (let i = 0; i < pokemonList.length; i++) {
      const pokemon = pokemonList[i];
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
      const data = await response.json();

      const img = document.createElement('img');
      img.src = data.sprites.front_default;  // URL de la imagen del Pokémon
      img.alt = pokemon;
      gallery.appendChild(img);
    }
  }
}
customElements.define('gallery-component', GalleryComponent);

// Navegación Dinámica
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('menu-component a');
  const sections = document.querySelectorAll('section');

  const hideAllSections = () => {
    sections.forEach(section => {
      section.style.display = 'none';
    });
  };

  const showSection = (id) => {
    hideAllSections();
    const targetSection = document.getElementById(id);
    if (targetSection) targetSection.style.display = 'block';
  };

  links.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      showSection(targetId);
    });
  });

  // Mostrar la primera sección por defecto
  showSection('social-profile');
});
