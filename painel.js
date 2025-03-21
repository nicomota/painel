// Menu Toggle Script
document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector(".menu");
    const closeBtn = document.getElementById("btn");
    const searchBtn = document.querySelector(".bx-search");

    function menuBtnChange() {
        if (menu.classList.contains("open")) {
            closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
        } else {
            closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
        }
    }

    closeBtn.addEventListener("click", () => {
        menu.classList.toggle("open");
        menuBtnChange();
    });

    searchBtn.addEventListener("click", () => {
        menu.classList.toggle("open");
        menuBtnChange();
    });
});


// Definindo os dados de empresas fora do documento ready
const products = [
    {
        id: 1,
        brand: "Mister Contador",
        name: "10539433000173",
        category: "Itaú",
        price: 154000,
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
        stocked: true,
        created_at: "",
        updated_at: "",
        banks: ["Itaú", "Bradesco", "Santander", "Banco do Brasil", "Caixa"],
        integracoes: {
            sieg: true,
            bancaria: true,
            cartao: true
        }
    },
    {
        id: 2,
        brand: "ENGETOTUS COMERCIO",
        name: "19887163000166",
        category: "Bradesco",
        price: 120000,
        description: "Outro modelo top de linha com ótimo desempenho.",
        stocked: false,
        created_at: "",
        updated_at: "",
        banks: ["Nubank", "Inter", "C6 Bank", "BTG Pactual", "MercadoPago"],
        integracoes: {
            sieg: true,
            bancaria: false,
            cartao: true
        }
    },
    {
        id: 3,
        brand: "Engenharia LTDA",
        name: "81062945000130",
        category: "Bradesco",
        price: 124800,
        description: "Lorem ipsum dolor sit amet.",
        stocked: false,
        created_at: "",
        updated_at: "",
        banks: ["C6 Bank", "BTG Pactual", "MercadoPago"],
        integracoes: {
            sieg: false,
            bancaria: true,
            cartao: false
        }
    },
    {
        id: 4,
        brand: "3 Irmãos LTDA",
        name: "21576936000135",
        category: "Bradesco",
        price: 124800,
        description: "Excelente qualidade e durabilidade.",
        stocked: true,
        created_at: "",
        updated_at: "",
        banks: ["Inter", "C6 Bank", "BTG Pactual", "MercadoPago"],
        integracoes: {
            sieg: true,
            bancaria: true,
            cartao: false
        }
    },
    {
        id: 5,
        brand: "ENOK CONTABILIDADE",
        name: "09619794000140",
        category: "Bradesco",
        price: "124800",
        description: "Ótima escolha para usuários exigentes.",
        stocked: false,
        created_at: "",
        updated_at: "",
        banks: ["MercadoPago", "Inter", "C6 Bank", "BTG Pactual", "MercadoPago"],
        integracoes: {
            sieg: false,
            bancaria: false,
            cartao: true
        }
    },
    {
        id: 6,
        brand: "Amil Empresarial",
        name: "09619794000140",
        category: "Bradesco",
        price: "124800",
        description: "Ótima escolha para usuários exigentes.",
        stocked: false,
        created_at: "",
        updated_at: "",
        banks: ["MercadoPago", "Inter", "C6 Bank", "BTG Pactual", "MercadoPago"],
        integracoes: {
            sieg: true,
            bancaria: true,
            cartao: true
        }
    },

];

// Função para inicializar o menu
function initMenu() {
    let menu = document.querySelector(".menu");
    let closeBtn = document.querySelector("#btn");
    let searchBtn = document.querySelector(".bx-search");

    // Função para alterar a aparência do botão do menu
    function menuBtnChange() {
        if (menu.classList.contains("open")) {
            closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
        } else {
            closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
        }
    }

    closeBtn.addEventListener("click", () => {
        menu.classList.toggle("open");
        menuBtnChange();
    });

    searchBtn.addEventListener("click", () => {
        menu.classList.toggle("open");
        menuBtnChange();
    });
}

// Aguarde o documento estar pronto
$(document).ready(function () {
    // Inicializar menu
    initMenu();

    // Inicializar a aplicação da tabela de produtos
    setTimeout(function () {
        new ProductTableApp($('#product-table-app'), products);
    }, 100); // Pequeno atraso para garantir que tudo está carregado
});

// Variáveis para controle dos carrosséis nas células
let cellCarouselCurrentIndexes = {};

// Funções para controlar os carrosséis nas células da tabela
function initCellCarousel(index) {
    cellCarouselCurrentIndexes[index] = 0;
    updateCellCarouselPosition(index);
    updateActiveSlide(index);
}

function prevSlide(index) {
    cellCarouselCurrentIndexes[index]--;

    // Se passar do início, vai para o final
    const totalSlides = products[index]?.banks?.length || 5;
    if (cellCarouselCurrentIndexes[index] < 0) {
        cellCarouselCurrentIndexes[index] = totalSlides - 1;
    }

    updateCellCarouselPosition(index);
    updateActiveSlide(index);
}

function nextSlide(index) {
    cellCarouselCurrentIndexes[index]++;

    // Se passar do final, volta para o início
    const totalSlides = products[index]?.banks?.length || 5;
    if (cellCarouselCurrentIndexes[index] >= totalSlides) {
        cellCarouselCurrentIndexes[index] = 0;
    }

    updateCellCarouselPosition(index);
    updateActiveSlide(index);
}

function updateCellCarouselPosition(index) {
    const track = document.getElementById(`carousel-track-${index}`);
    if (track) {
        // Calcula posição baseada na largura fixa de cada slide (60px)
        const slideWidth = 60;
        const position = -cellCarouselCurrentIndexes[index] * slideWidth;
        track.style.transform = `translateX(${position}px)`;
    }
}

function updateActiveSlide(index) {
    // Remove a classe ativa de todos os slides neste carrossel
    const slides = document.querySelectorAll(`#carousel-${index} .cell-carousel-slide`);
    slides.forEach(slide => slide.classList.remove('active'));

    // Adiciona a classe ativa ao slide atual
    // Para 2 slides visíveis, o primeiro dos dois deve ser ativo
    const activeSlideIndex = cellCarouselCurrentIndexes[index];
    const activeSlide = document.getElementById(`slide-${index}-${activeSlideIndex}`);
    if (activeSlide) {
        activeSlide.classList.add('active');
    }
}

class ProductTableApp {
    constructor($el, dataOrUrl) {
        this.initState();

        if (Array.isArray(dataOrUrl)) {
            this.state.isLoaded = true;
            this.state.products = dataOrUrl;
            this.defineElements($el, this.state.products);
            this.render(this.state.products);
            this.bindEvents();
        } else {
            this.fetchJson(dataOrUrl).then(
                (res) => {
                    this.state.isLoaded = true;
                    this.state.products = res;
                    this.defineElements($el, this.state.products);
                    this.render(this.state.products);
                    this.bindEvents();
                },
                (jqXHR) => {
                    this.state.err = jqXHR;
                    console.error(`Error loading data: ${this.state.err.responseText}`);
                }
            );
        }
    }

    // Modificações no método initState para adicionar o filtro de integrações
    initState() {
        this.state = { 
            isLoaded: false, 
            products: [], 
            err: null,
            filters: {
                brand: 'all',
                bank: 'all',
                status: 'all',
                integration: 'all', // Novo filtro de integração
                sortBy: 'none',
                idSearch: ''
            }
        };
    }

    // Modificações no método defineElements para referenciar o elemento do filtro
    defineElements($el, products) {
        // Extract unique brands and banks
        const brands = ['all', ...new Set(products.map(p => p.brand))];
        const banks = ['all', ...new Set(products.flatMap(p => p.banks))];

        this.$el = $el;
        this.$tbody = this.$el.find('tbody');
        this.$noResults = this.$el.find('#prod-no-results');

        // Brand filter
        this.$filterBrand = this.$el.find('#prod-filter-brand')
            .html(brands.map(brand => `<option value="${brand}">${brand}</option>`).join(''));

        // Bank filter
        this.$filterBank = this.$el.find('#prod-filter-category')
            .html(banks.map(bank => `<option value="${bank}">${bank}</option>`).join(''));

        // Other elements
        this.$sortBy = this.$el.find('#prod-sort-by');
        this.$statusFilter = this.$el.find('#prod-status-filter');
        this.$integrationFilter = this.$el.find('#prod-integration-filter'); // Novo filtro de integração
        this.$idSearch = this.$el.find('#prod-id-search');
    }

    // Modificações no método bindEvents para responder às mudanças no filtro
    bindEvents() {
        // Add event listeners to all filter elements
        this.$filterBrand.on('change', () => {
            this.state.filters.brand = this.$filterBrand.val();
            this.applyFilters();
        });

        this.$filterBank.on('change', () => {
            this.state.filters.bank = this.$filterBank.val();
            this.applyFilters();
        });

        this.$sortBy.on('change', () => {
            this.state.filters.sortBy = this.$sortBy.val();
            this.applyFilters();
        });

        this.$statusFilter.on('change', () => {
            this.state.filters.status = this.$statusFilter.val();
            this.applyFilters();
        });

        // Novo listener para o filtro de integração
        this.$integrationFilter.on('change', () => {
            this.state.filters.integration = this.$integrationFilter.val();
            this.applyFilters();
        });

        this.$idSearch.on('input', () => {
            this.state.filters.idSearch = this.$idSearch.val().trim();
            this.applyFilters();
        });
    }

    // Modificações no método applyFilters para aplicar o filtro de integração
    applyFilters() {
        let filteredProducts = [...this.state.products];

        // Brand filter
        if (this.state.filters.brand !== 'all') {
            filteredProducts = filteredProducts.filter(p => p.brand === this.state.filters.brand);
        }

        // Bank filter
        if (this.state.filters.bank !== 'all') {
            filteredProducts = filteredProducts.filter(p => p.banks.includes(this.state.filters.bank));
        }

        // Status filter
        if (this.state.filters.status === 'active') {
            filteredProducts = filteredProducts.filter(p => p.stocked === true);
        } else if (this.state.filters.status === 'inactive') {
            filteredProducts = filteredProducts.filter(p => p.stocked === false);
        }

        // Novo filtro de integração
        if (this.state.filters.integration !== 'all') {
            switch(this.state.filters.integration) {
                case 'sieg':
                    filteredProducts = filteredProducts.filter(p => p.integracoes?.sieg === true);
                    break;
                case 'bancaria':
                    filteredProducts = filteredProducts.filter(p => p.integracoes?.bancaria === true);
                    break;
                case 'cartao':
                    filteredProducts = filteredProducts.filter(p => p.integracoes?.cartao === true);
                    break;
            }
        }

        // ID Search filter
        if (this.state.filters.idSearch) {
            filteredProducts = filteredProducts.filter(p => 
                p.id.toString().includes(this.state.filters.idSearch)
            );
        }

        // Sorting
        switch(this.state.filters.sortBy) {
            case 'created_at':
                filteredProducts.sort((a, b) => 
                    moment(a.created_at, 'YYYY/MM/DD').valueOf() - 
                    moment(b.created_at, 'YYYY/MM/DD').valueOf()
                );
                break;
            case 'updated_at':
                filteredProducts.sort((a, b) => 
                    moment(a.updated_at, 'YYYY/MM/DD').valueOf() - 
                    moment(b.updated_at, 'YYYY/MM/DD').valueOf()
                );
                break;
        }

        // Render filtered and sorted results
        this.render(filteredProducts);
    }

    // Rest of the existing methods remain the same (render, fetchJson, etc.)
    render(products) {
        const twoSpace = '&nbsp;&nbsp;';

        if (!this.state.isLoaded) {
            this.$tbody.html('<div>Carregando...</div>');
            return;
        }

        this.$tbody.html(
            products.map(
                (product, index) =>
                    `<tr class="prod-table-row" data-key="${product.id}" style="height: 70px;">
                        <td class="prod-table-cell prod-align-right">${product.id}</td>
                        <td class="prod-table-cell prod-align-left">${product.brand}</td>
                        <td class="prod-table-cell prod-align-left">${product.name}</td>
                        <td class="prod-table-cell prod-align-left" style="display: flex; justify-content: left; align-items: center; height: 70px;">
                            <button class="cell-carousel-btn prev" onclick="prevSlide(${index})">&lt;</button>
                            <div class="cell-carousel" id="carousel-${index}">
                                <div class="cell-carousel-track" id="carousel-track-${index}">
                                    ${product.banks.map((bank, bankIndex) => {
                                    // Função para obter a URL do logo do banco
                                    const getBankLogoUrl = (bankName) => {
                                        const bankLogos = {
                                            "Itaú": "https://logodownload.org/wp-content/uploads/2014/05/itau-logo-1-1.png",
                                            "Bradesco": "https://logodownload.org/wp-content/uploads/2018/09/bradesco-logo-1.png",
                                            "Santander": "https://play-lh.googleusercontent.com/g_QDzrOlw8Belx8qb47fUu0MPL6AVFzDdbOz_NJZYQDNLveHYxwiUoe09Wvkxf-_548q=w240-h480-rw",
                                            "Banco do Brasil": "https://play-lh.googleusercontent.com/1-aNhsSPNqiVluwNGZar_7F5PbQ4u1zteuJ1jumnArhe8bfYHHaVwu4aVOF5-NAmLaA=w240-h480-rw",
                                            "Caixa": "https://play-lh.googleusercontent.com/ubV0x2kGJIEe10shxuFnH9Cy21OgHARwVUZ89nyE0YOZN9c25ov_dyHdk1rMgbPvoDI=w240-h480-rw",
                                            "Nubank": "https://logodownload.org/wp-content/uploads/2019/08/nubank-logo-1.png",
                                            "Inter": "https://play-lh.googleusercontent.com/DABQ3z4xA93QNsK9wqR2LdnamoDHkaKc-h1AueqJrVE7pP9GkIvZqf_URfxOIiNbFyzK=w240-h480-rw",
                                            "C6 Bank": "https://play-lh.googleusercontent.com/qYXhGgBxFLr5xgnv0AGhqW9v7tyedb_i5AVoebI6pow5pWPNZH1qEHnslmSHNkVpB-g=w240-h480-rw",
                                            "BTG Pactual": "https://play-lh.googleusercontent.com/0y84dcSeljAid36WeCs-9FWY4fENzxVilh1TS9G4jV30VHsFHJ3lGofMeS3w5hpvRk0D=s48-rw",
                                            "MercadoPago": "https://play-lh.googleusercontent.com/nvcgc4oLlZihaCigkzhfjiB1DYBe_CTx_u8Xy3Bvj_JyWKg5FQK-QLKKFIm2o_Ggmdw=w240-h480-rw"
                                        };

                                        return bankLogos[bankName] || `/api/placeholder/50/30`;
                                    };

                                    return `
                                        <div class="cell-carousel-slide" id="slide-${index}-${bankIndex}">
                                            <img src="${getBankLogoUrl(bank)}" alt="${bank}" title="${bank}" onerror="this.src='/api/placeholder/50/30'; this.onerror='';" />
                                        </div>
                                        `;
                                }).join('')}
                                </div>
                            </div>
                            <button class="cell-carousel-btn next" onclick="nextSlide(${index})">&gt;</button>
                        </td>
                        <td class="prod-table-cell prod-align-center">
                            <div class="integration-icons">
                                <img 
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAKlBMVEUAH9sAH9sAANn///8AC9oAF9uHkOvp7PzW2vlueecRLt49TuGmrO+5v/MNfTzSAAAAAXRSTlPrdz7jlgAAALRJREFUOI3FktEOwyAIRQsFUav//7vDxm2AWZslS3aerJykcHGDG7a/CUwKfxaoiJLoQtiVrwRCTxAYUxZHIzsFQ94DHa2AS90LfCx1FRSaAja9ydUCLgfsKpRn/8SKH5OSfkiaFMCYQ+yhYQzqbMJ1GJOMRolJAtbUJjJGWgSzjDpKHHdhwFECL/BhGKFI+MWyi3YjyJKDF6RyFHp+0xMycBnH8prCPTg6xxqni2dv+IFwxwM8XgtlMXyPeQAAAABJRU5ErkJggg==" 
                                    alt="Integração SIEG" 
                                    title="Útima integração realizada 10:27 17/03/2025" 
                                    class="integration-icon ${product.integracoes?.sieg ? 'active' : 'inactive'}"
                                />
                                <img 
                                    src="https://icones.pro/wp-content/uploads/2021/05/icone-de-lettre-d-information-i-bleu.png" 
                                    alt="Integração Bancária" 
                                    title="Útima integração realizada 10:27 20/03/2025" 
                                    class="integration-icon ${product.integracoes?.bancaria ? 'active' : 'inactive'}"
                                />
                                <img 
                                    src="https://site.getnet.com.br/wp-content/uploads/2022/11/Maquininha-de-cartao-pra-home.jpg" 
                                    alt="Cartão (Getnet/Rede/Cielo)" 
                                    title="Cartão (Getnet/Rede/Cielo)" 
                                    class="integration-icon ${product.integracoes?.cartao ? 'active' : 'inactive'}"
                                />
                            </div>
                        </td>
                        <td class="prod-table-cell prod-align-left">${product.created_at}</td>
                        <td class="prod-table-cell prod-align-left">${product.updated_at}</td>
                        <td class="prod-table-cell prod-align-left">
                        ${product.stocked
                            ? `<span style="color: #00cc00; font-weight: bold;"><i class="fas fa-check-circle"></i>${twoSpace}Ativo</span>`
                            : `<span style="color: #ff0000; font-weight: bold;"><i class="fas fa-minus-circle"></i>${twoSpace}Inativo</span>`
                        }
                        </td>
                    </tr>`,
            ),
        );

        products.length === 0
            ? this.$noResults.removeClass('prod-hidden')
            : this.$noResults.addClass('prod-hidden');

        // Inicializar os carrosséis após renderizar
        products.forEach((_, index) => {
            initCellCarousel(index);
        });
    }

    fetchJson(url) {
        return $.ajax({
            url: url,
            dataType: 'json',
        });
    }
}

// Update the document ready script to use the improved class
$(document).ready(function () {
    // Inicializar menu
    initMenu();

    // Inicializar a aplicação da tabela de produtos
    setTimeout(function () {
        new ProductTableApp($('#product-table-app'), products);
    }, 100); // Pequeno atraso para garantir que tudo está carregado
});