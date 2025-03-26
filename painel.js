/**
 * Script para controle do menu lateral
 */
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do menu
    const menu = document.querySelector(".menu");
    const btnMenu = document.querySelector("#btn");
    const searchBtn = document.querySelector(".bx-search");
    
    // Função para alternar o estado do menu
    function toggleMenu() {
        menu.classList.toggle("open");
        updateMenuButtonIcon();
    }
    
    // Atualiza o ícone do botão do menu dependendo do estado
    function updateMenuButtonIcon() {
        if (menu.classList.contains("open")) {
            btnMenu.classList.replace("bx-menu", "bx-menu-alt-right");
        } else {
            btnMenu.classList.replace("bx-menu-alt-right", "bx-menu");
        }
    }
    
    // Event listeners
    if (btnMenu) {
        btnMenu.addEventListener("click", toggleMenu);
    }z
    
    if (searchBtn) {
        searchBtn.addEventListener("click", toggleMenu);
    }
  });


/**
 * Dados de empresas para preencher a tabela com barras de progresso para cada banco
 */
const products = [
    {
        id: 1,
        brand: "Mister Contador",
        name: "10539433000173",
        stocked: true,
        updated_at: "10/2025",
        lastUpdate: "2024-03-15", // Data para filtro
        banks: ["Itaú", "Santander", "Banco do Brasil", "Caixa"],
        integracoes: {
            sieg: true,
            bancaria: true,
            cartao: true
        },
        progressos: {
            "Itaú": 37,
            "Santander": 70,
            "Banco do Brasil": 100,
            "Caixa": 45
        }
    },
    {
        id: 2,
        brand: "ENGETOTUS COMERCIO",
        name: "19887163000166",
        stocked: false,
        updated_at: "",
        lastUpdate: "2024-03-10",
        banks: ["Nubank", "Inter", "C6 Bank", "BTG Pactual", "MercadoPago"],
        integracoes: {
            sieg: true,
            bancaria: false,
            cartao: true
        },
        progressos: {
            "Nubank": 90,
            "Inter": 60,
            "C6 Bank": 35,
            "BTG Pactual": 20,
            "MercadoPago": 80
        }
    },
    {
        id: 3,
        brand: "Engenharia LTDA",
        name: "81062945000130",
        stocked: false,
        updated_at: "",
        lastUpdate: "2024-03-05",
        banks: ["C6 Bank", "BTG Pactual", "MercadoPago"],
        integracoes: {
            sieg: false,
            bancaria: true,
            cartao: false
        },
        progressos: {
            "C6 Bank": 75,
            "BTG Pactual": 50,
            "MercadoPago": 30
        }
    },
    {
        id: 4,
        brand: "3 Irmãos LTDA",
        name: "21576936000135",
        stocked: true,
        updated_at: "",
        lastUpdate: "2024-02-28",
        banks: ["Inter", "C6 Bank", "BTG Pactual", "MercadoPago"],
        integracoes: {
            sieg: true,
            bancaria: true,
            cartao: false
        },
        progressos: {
            "Inter": 40,
            "C6 Bank": 65,
            "BTG Pactual": 25,
            "MercadoPago": 95
        }
    },
    {
        id: 5,
        brand: "3 Irmãos LTDA",
        name: "21576936000135",
        stocked: true,
        updated_at: "",
        lastUpdate: "2024-02-28",
        banks: ["Inter", "C6 Bank", "BTG Pactual", "MercadoPago"],
        integracoes: {
            sieg: true,
            bancaria: true,
            cartao: false
        },
        progressos: {
            "Inter": 40,
            "C6 Bank": 65,
            "BTG Pactual": 25,
            "MercadoPago": 100
        }
    },
];

// Objeto para armazenar os índices atuais dos carrosséis
const cellCarouselCurrentIndexes = {};
/* Associação de nomes de bancos com seus logotipos*/
const getBankLogos = () => ({
    "Itaú": "https://logodownload.org/wp-content/uploads/2014/05/itau-logo-1-1.png",
    "Santander": "https://play-lh.googleusercontent.com/g_QDzrOlw8Belx8qb47fUu0MPL6AVFzDdbOz_NJZYQDNLveHYxwiUoe09Wvkxf-_548q=w240-h480-rw",
    "Banco do Brasil": "https://play-lh.googleusercontent.com/1-aNhsSPNqiVluwNGZar_7F5PbQ4u1zteuJ1jumnArhe8bfYHHaVwu4aVOF5-NAmLaA=w240-h480-rw",
    "Caixa": "https://play-lh.googleusercontent.com/ubV0x2kGJIEe10shxuFnH9Cy21OgHARwVUZ89nyE0YOZN9c25ov_dyHdk1rMgbPvoDI=w240-h480-rw",
    "Nubank": "https://logodownload.org/wp-content/uploads/2019/08/nubank-logo-1.png",
    "Inter": "https://play-lh.googleusercontent.com/DABQ3z4xA93QNsK9wqR2LdnamoDHkaKc-h1AueqJrVE7pP9GkIvZqf_URfxOIiNbFyzK=w240-h480-rw",
    "C6 Bank": "https://play-lh.googleusercontent.com/qYXhGgBxFLr5xgnv0AGhqW9v7tyedb_i5AVoebI6pow5pWPNZH1qEHnslmSHNkVpB-g=w240-h480-rw",
    "BTG Pactual": "https://play-lh.googleusercontent.com/0y84dcSeljAid36WeCs-9FWY4fENzxVilh1TS9G4jV30VHsFHJ3lGofMeS3w5hpvRk0D=s48-rw",
    "MercadoPago": "https://play-lh.googleusercontent.com/nvcgc4oLlZihaCigkzhfjiB1DYBe_CTx_u8Xy3Bvj_JyWKg5FQK-QLKKFIm2o_Ggmdw=w240-h480-rw"
});

/**
 * Objeto para gerenciar o carrossel e a barra de progresso
 */
const carouselManager = {
    // Inicializa o carrossel e barra de progresso
    init(index) {
        cellCarouselCurrentIndexes[index] = 0;
        this.updatePosition(index);
        this.updateActiveSlide(index);
        this.updateProgressBar(index);
    },

    // Move para o slide anterior
    prev(index) {
        const totalSlides = products[index]?.banks?.length || 0;
        cellCarouselCurrentIndexes[index] = (cellCarouselCurrentIndexes[index] - 1 + totalSlides) % totalSlides;
        this.updatePosition(index);
        this.updateActiveSlide(index);
        this.updateProgressBar(index);
    },

    // Move para o próximo slide
    next(index) {
        const totalSlides = products[index]?.banks?.length || 0;
        cellCarouselCurrentIndexes[index] = (cellCarouselCurrentIndexes[index] + 1) % totalSlides;
        this.updatePosition(index);
        this.updateActiveSlide(index);
        this.updateProgressBar(index);
    },

    // Atualiza a posição do carrossel
    updatePosition(index) {
        const track = document.getElementById(`carousel-track-${index}`);
        if (track) {
            const slideWidth = 60;
            track.style.transform = `translateX(${-cellCarouselCurrentIndexes[index] * slideWidth}px)`;
        }
    },

    // Atualiza qual slide está ativo visualmente
    updateActiveSlide(index) {
        const slides = document.querySelectorAll(`#carousel-${index} .cell-carousel-slide`);
        slides.forEach(slide => slide.classList.remove('active'));

        const activeSlide = document.getElementById(`slide-${index}-${cellCarouselCurrentIndexes[index]}`);
        if (activeSlide) activeSlide.classList.add('active');
    },

    // Atualiza a barra de progresso baseada no banco selecionado
    updateProgressBar(index) {
        const product = products[index];
        if (!product) return;

        const selectedBank = product.banks[cellCarouselCurrentIndexes[index]];
        const progress = product.progressos?.[selectedBank] || 0;

        const progressBar = document.getElementById(`progress-bar-${index}`);
        const progressText = document.getElementById(`progress-text-${index}`);

        if (progressBar && progressText) {
            // Atualiza a largura e texto
            progressBar.style.width = `${progress}%`;
            progressText.textContent = `${progress}%`;

            // Atualiza as classes para estilo adequado
            progressBar.classList.remove('low', 'medium', 'high');
            progressBar.classList.add(progress < 30 ? 'low' : progress < 70 ? 'medium' : 'high');

            // Atualiza o título para mostrar detalhes ao passar o mouse
            const progressContainer = progressBar.closest('.progress-container');
            if (progressContainer) {
                progressContainer.title = `Lançamentos Conciliados ${selectedBank}: ${progress}%`;
            }
            
            // Atualiza a visibilidade do ícone de download com base no progresso
            const downloadCell = document.querySelector(`tr[data-key="${product.id}"] td:nth-child(8)`);
            if (downloadCell) {
                if (progress === 100) {
                    downloadCell.innerHTML = '<i class="bx bxs-download" style="cursor: pointer; font-size: 20px; color: #2196F3;"></i>';
                } else {
                    downloadCell.innerHTML = '';
                }
            }
        }
    }
};

/**
 * Classe para gerenciar a aplicação da tabela de produtos
 */
class ProductTableApp {
    constructor($el, products) {
        this.initState();
        this.state.products = products;
        this.state.isLoaded = true;
        this.defineElements($el);
        this.render();
        this.bindEvents();
    }

    initState() {
        this.state = {
            isLoaded: false,
            products: [],
            filters: {
                brand: 'all',
                bank: 'all',
                date: '',         // Nova propriedade para o filtro de data
                integration: 'all',
                sortBy: 'none',
                idSearch: ''
            }
        };
    }

    defineElements($el) {
        // Extrai marcas e bancos únicos
        const brands = ['all', ...new Set(this.state.products.map(p => p.brand))];
        const banks = ['all', ...new Set(this.state.products.flatMap(p => p.banks))];

        this.$el = $el;
        this.$tbody = this.$el.find('tbody');
        this.$noResults = this.$el.find('#prod-no-results');

        // Filtros
        this.$filterBrand = this.$el.find('#prod-filter-brand')
            .html(brands.map(brand => `<option value="${brand}">${brand}</option>`).join(''));
        this.$filterBank = this.$el.find('#prod-filter-bank')
            .html(banks.map(bank => `<option value="${bank}">${bank}</option>`).join(''));
        this.$sortBy = this.$el.find('#prod-sort-by');
        this.$integrationFilter = this.$el.find('#prod-integration-filter');
        this.$dateFilter = this.$el.find('#prod-date-filter');
        this.$idSearch = this.$el.find('#prod-id-search');
    }

    bindEvents() {
        // Associa eventos aos filtros
        const filterElements = [
            { el: this.$filterBrand, key: 'brand' },
            { el: this.$filterBank, key: 'bank' },
            { el: this.$sortBy, key: 'sortBy' },
            { el: this.$integrationFilter, key: 'integration' }
        ];

        // Aplica eventos de mudança para todos os filtros de seleção
        filterElements.forEach(item => {
            item.el.on('change', () => {
                this.state.filters[item.key] = item.el.val();
                this.applyFilters();
            });
        });

        // Evento para busca por ID
        this.$idSearch.on('input', () => {
            this.state.filters.idSearch = this.$idSearch.val().trim();
            this.applyFilters();
        });
    }

    applyFilters() {
        let filteredProducts = [...this.state.products];
        const filters = this.state.filters;

        // Filtro de marca
        if (filters.brand !== 'all') {
            filteredProducts = filteredProducts.filter(p => p.brand === filters.brand);
        }

        // Filtro de banco
        if (filters.bank !== 'all') {
            filteredProducts = filteredProducts.filter(p => p.banks.includes(filters.bank));
        }

        // Filtro de integração
        if (filters.integration !== 'all') {
            filteredProducts = filteredProducts.filter(p =>
                p.integracoes?.[filters.integration] === true
            );
        }

        // Filtro de data (mês/ano)
        if (filters.date) {
            const selectedDate = new Date(filters.date + "-01"); // Adiciona o dia 01 para criar uma data válida

            filteredProducts = filteredProducts.filter(p => {
                if (!p.lastUpdate) return true; // Se não houver data, mantém o item

                // Extrair o ano e mês da data do produto para comparação
                const productDate = new Date(p.lastUpdate);
                const productYearMonth = productDate.getFullYear() + "-" +
                    String(productDate.getMonth() + 1).padStart(2, "0");
                const selectedYearMonth = selectedDate.getFullYear() + "-" +
                    String(selectedDate.getMonth() + 1).padStart(2, "0");

                return productYearMonth >= selectedYearMonth;
            });
        }

        // Filtro de busca por ID
        if (filters.idSearch) {
            filteredProducts = filteredProducts.filter(p =>
                p.id.toString().includes(filters.idSearch)
            );
        }


        // Renderiza os resultados filtrados
        this.render(filteredProducts);
    }

    render(products = this.state.products) {
        const bankLogos = getBankLogos();

        if (!this.state.isLoaded) {
            this.$tbody.html('<div>Carregando...</div>');
            return;
        }

        // Gera o HTML para cada linha da tabela
        this.$tbody.html(
            products.map((product, index) => {
                // Banco inicial e progresso para a barra
                const initialBank = product.banks[0] || "";
                const initialProgress = product.progressos?.[initialBank] || 0;
                const progressClass = initialProgress < 30 ? 'low' : initialProgress < 70 ? 'medium' : 'high';
                const hasNotification = Math.random() > 0.6; // Simulação de notificação
                
                // Verifica se o progresso é 100% para exibir o ícone de download
                const showDownloadIcon = initialProgress === 100;

                return `<tr class="prod-table-row" data-key="${product.id}" style="height: 70px;">
                    <td class="prod-table-cell prod-align-right">${product.id}</td>
                    <td class="prod-table-cell prod-align-left">${product.brand}</td>
                    <td class="prod-table-cell prod-align-left">${product.name}</td>
                    <td class="prod-table-cell prod-align-left" style="display: flex; justify-content: left; align-items: center; height: 70px; margin-top:9px">
                        <button class="cell-carousel-btn prev" onclick="carouselManager.prev(${index})">&lt;</button>
                        <div class="cell-carousel" id="carousel-${index}">
                            <div class="cell-carousel-track" id="carousel-track-${index}">
                                ${product.banks.map((bank, bankIndex) => `
                                    <div class="cell-carousel-slide" id="slide-${index}-${bankIndex}">
                                        <img src="${bankLogos[bank] || "/api/placeholder/50/30"}" alt="${bank}" title="${bank}" onerror="this.src='/api/placeholder/50/30'; this.onerror='';" />
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        <button class="cell-carousel-btn next" onclick="carouselManager.next(${index})">&gt;</button>
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
                                src="https://img.freepik.com/vetores-premium/icone-do-predio-do-banco-no-escuro_116137-4384.jpg" 
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
                    <td class="prod-table-cell prod-align-center" style="width: 200px; padding: 10px 20px;">
                        <div class="progress-container">
                            <div class="progress-bar-bg">
                                <div class="progress-bar ${progressClass}" id="progress-bar-${index}" style="width: ${initialProgress}%;"></div>
                            </div>
                            <div class="progress-text" id="progress-text-${index}">${initialProgress}%</div>
                        </div>
                    </td>
                    <td class="prod-table-cell prod-align-center notification-cell"></td>
                    <td class="prod-table-cell prod-align-center notification-cell">
                    ${showDownloadIcon ? '<i class="bx bxs-download" style="cursor: pointer; font-size: 20px; color: #2196F3;"></i>' : ''}
                    </td>
                    <td class="prod-table-cell prod-align-center notification-cell">
                        <div class="notification-bell">
                            <i class="fas fa-bell"></i>
                            ${hasNotification ? '<span class="notification-badge has-new">1</span>' : ''}
                        </div>
                    </td>
                </tr>`;
            }).join('')
        );

        // Exibe mensagem se não houver resultados
        products.length === 0
            ? this.$noResults.removeClass('prod-hidden')
            : this.$noResults.addClass('prod-hidden');

        // Inicializa os carrosséis e barras de progresso
        products.forEach((_, index) => {
            carouselManager.init(index);
        });

        // Configura a seleção de linha e notificações
        this.setupRowSelection();
        this.setupNotificationSystem();

        // Seleciona a primeira linha por padrão
        if (products.length > 0 && !$('.prod-table-row.selected').length) {
            $('.prod-table-row:first').addClass('selected');
        }
    }

    setupRowSelection() {
        $('.prod-table-row').off('click.rowSelect').on('click.rowSelect', function (e) {
            // Ignora se o clique for em controles interativos
            if ($(e.target).hasClass('cell-carousel-btn') ||
                $(e.target).closest('button').length ||
                $(e.target).prop('tagName') === 'INPUT' ||
                $(e.target).prop('tagName') === 'SELECT' ||
                $(e.target).closest('.notification-bell').length) {
                return;
            }

            // Seleciona a linha clicada
            const isSelected = $(this).hasClass('selected');
            $('.prod-table-row').removeClass('selected');

            if (!isSelected) {
                $(this).addClass('selected');

                // Rola para manter a linha visível
                const $container = $('.prod-table-wrapper');
                const containerHeight = $container.height();
                const rowTop = $(this).position().top;
                const rowHeight = $(this).outerHeight();

                if (rowTop < 0 || rowTop + rowHeight > containerHeight) {
                    const scrollTo = $container.scrollTop() + rowTop - (containerHeight / 2) + (rowHeight / 2);
                    $container.animate({ scrollTop: scrollTo }, 300);
                }
            }
        });
    }

    setupNotificationSystem() {
        // Configuração do sistema de notificações
        if (!document.querySelector('.notification-popup')) {
            // Cria elementos de notificação
            const overlay = document.createElement('div');
            overlay.className = 'notification-overlay';

            const popup = document.createElement('div');
            popup.className = 'notification-popup';
            popup.innerHTML = `
                <div class="notification-header">
                    <div class="notification-title">Notificação de Ticket</div>
                    <button class="close-notification">&times;</button>
                </div>
                <div class="notification-content">
                    <div class="notification-message">
                        O ticket foi respondido pelo cliente. Clique abaixo para visualizar a resposta.
                    </div>
                    <div class="notification-time">
                        Recebido há 5 minutos
                    </div>
                </div>
                <div class="notification-actions">
                    <button class="notification-btn notification-btn-secondary" id="dismiss-notification">Ignorar</button>
                    <button class="notification-btn notification-btn-secondary" id="view-ticket"><a href="http://demo.mistercontador.com.br/onboard/tickets;periodo=22025;agenciabancariaId=4028">Ver Ticket</a></button>
                </div>
            `;

            document.body.appendChild(overlay);
            document.body.appendChild(popup);

            // Configura eventos do popup
            const closeElements = [
                popup.querySelector('.close-notification'),
                popup.querySelector('#dismiss-notification'),
                overlay
            ];

            closeElements.forEach(el => {
                if (el) el.addEventListener('click', () => {
                    overlay.classList.remove('visible');
                    popup.classList.remove('visible');
                });
            });
        }

        // Evento de clique para os sinos de notificação
        $('.notification-bell').off('click').on('click', function (e) {
            e.stopPropagation();

            // Obtém o ID do produto
            const productId = $(this).closest('tr').data('key');

            // Atualiza e mostra o popup
            updateNotificationPopup(productId);
            $('.notification-overlay, .notification-popup').addClass('visible');

            // Remove o badge
            const badge = $(this).find('.notification-badge');
            if (badge.length) {
                badge.removeClass('has-new');
                setTimeout(() => badge.remove(), 300);
            }
        });
    }
}

/**
 * Atualiza o conteúdo do pop-up de notificação com base no ID do produto
 * @param {number} productId - ID do produto/ticket
 */
function updateNotificationPopup(productId) {
    const popup = document.querySelector('.notification-popup');
    if (!popup) return;

    // Encontra o produto pelo ID
    const product = products.find(p => p.id === productId) || {};

    // Atualiza o conteúdo
    const messageEl = popup.querySelector('.notification-message');
    if (messageEl) {
        messageEl.innerHTML = `
            O ticket <strong>#${productId}</strong> relacionado a "${product.brand || 'Cliente'}" 
            foi respondido pelo cliente. Clique abaixo para visualizar a resposta.
        `;
    }

    // Simula tempo aleatório de recebimento
    const timeEl = popup.querySelector('.notification-time');
    if (timeEl) {
        const times = ['há 5 minutos', 'há 10 minutos', 'há 30 minutos', 'há 1 hora', 'agora mesmo'];
        const randomTime = times[Math.floor(Math.random() * times.length)];
        timeEl.textContent = `Recebido ${randomTime}`;
    }
}

/**
 * Configura navegação por teclado (setas para cima/baixo)
 */
function setupKeyboardNavigation() {
    $(document).on('keydown', function (e) {
        const $rows = $('.prod-table-row');
        if ($rows.length === 0) return;

        const $selected = $('.prod-table-row.selected');
        let index = $rows.index($selected);

        // Navegação com setas
        if (e.which === 40) { // Seta para baixo
            e.preventDefault();
            index = Math.min(index + 1, $rows.length - 1);
        } else if (e.which === 38) { // Seta para cima
            e.preventDefault();
            index = Math.max(index - 1, 0);
        } else {
            return; // Sai da função se não for seta para cima ou para baixo
        }

        // Seleciona a nova linha
        $rows.removeClass('selected');
        $rows.eq(index).addClass('selected');

        // Ajusta a rolagem para manter a linha visível
        const $container = $('.prod-table-wrapper');
        const containerHeight = $container.height();
        const rowTop = $rows.eq(index).position().top;
        const rowHeight = $rows.eq(index).outerHeight();

        if (rowTop < 0) {
            $container.animate({ scrollTop: $container.scrollTop() - Math.abs(rowTop) }, 150);
        } else if (rowTop + rowHeight > containerHeight) {
            $container.animate({ scrollTop: $container.scrollTop() + (rowTop + rowHeight - containerHeight) }, 150);
        }
    });
}

/**
 * Inicializa a aplicação quando o documento estiver pronto
 */
$(document).ready(function () {
    // Inicializa o menu
    if (typeof initMenu === 'function') {
        initMenu();
    }

    // Configura navegação por teclado
    setupKeyboardNavigation();

    // Inicializa a tabela de produtos
    setTimeout(() => {
        new ProductTableApp($('#product-table-app'), products);
    }, 100);
});