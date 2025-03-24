/**
 * Dados de empresas para preencher a tabela
 * Cada objeto contém informações como id, marca, nome, categoria, preço, etc.
 */
const products = [
    {
        id: 1,
        brand: "Mister Contador",
        name: "10539433000173",
        category: "Itaú",
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
        stocked: false,
        created_at: "",
        updated_at: "",
        banks: ["MercadoPago", "Inter", "C6 Bank", "BTG Pactual", "MercadoPago"],
        integracoes: {
            sieg: false,
            bancaria: true,
            cartao: true
        }
    },
];

/**
 * Objeto para armazenar os índices atuais dos carrosséis em cada célula
 */
const cellCarouselCurrentIndexes = {};

/**
 * Associação de nomes de bancos com seus logotipos
 * @return {Object} Dicionário de bancos e URLs de seus logotipos
 */
const getBankLogos = () => ({
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
});

/**
 * Inicializa o menu lateral
 * Configura os eventos de clique no botão de fechar e no botão de pesquisa
 */
function initMenu() {
    const menu = document.querySelector(".menu");
    const closeBtn = document.querySelector("#btn");
    const searchBtn = document.querySelector(".bx-search");

    if (!menu || !closeBtn || !searchBtn) return;

    /**
     * Altera a aparência do botão do menu dependendo do estado
     */
    function menuBtnChange() {
        if (menu.classList.contains("open")) {
            closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
        } else {
            closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
        }
    }

    // Adiciona eventos de clique
    closeBtn.addEventListener("click", () => {
        menu.classList.toggle("open");
        menuBtnChange();
    });

    searchBtn.addEventListener("click", () => {
        menu.classList.toggle("open");
        menuBtnChange();
    });
}

/**
 * Inicializa o carrossel em uma célula específica
 * @param {number} index - O índice do produto/linha
 */
function initCellCarousel(index) {
    cellCarouselCurrentIndexes[index] = 0;
    updateCellCarouselPosition(index);
    updateActiveSlide(index);
}

/**
 * Move o carrossel para o slide anterior
 * @param {number} index - O índice do produto/linha
 */
function prevSlide(index) {
    cellCarouselCurrentIndexes[index]--;
    
    // Tratamento circular: se passar do início, vai para o final
    const totalSlides = products[index]?.banks?.length || 5;
    if (cellCarouselCurrentIndexes[index] < 0) {
        cellCarouselCurrentIndexes[index] = totalSlides - 1;
    }

    updateCellCarouselPosition(index);
    updateActiveSlide(index);
}

/**
 * Move o carrossel para o próximo slide
 * @param {number} index - O índice do produto/linha
 */
function nextSlide(index) {
    cellCarouselCurrentIndexes[index]++;
    
    // Tratamento circular: se passar do final, volta para o início
    const totalSlides = products[index]?.banks?.length || 5;
    if (cellCarouselCurrentIndexes[index] >= totalSlides) {
        cellCarouselCurrentIndexes[index] = 0;
    }

    updateCellCarouselPosition(index);
    updateActiveSlide(index);
}

/**
 * Atualiza a posição de exibição do carrossel
 * @param {number} index - O índice do produto/linha
 */
function updateCellCarouselPosition(index) {
    const track = document.getElementById(`carousel-track-${index}`);
    if (track) {
        const slideWidth = 60; // Largura fixa de cada slide em pixels
        const position = -cellCarouselCurrentIndexes[index] * slideWidth;
        track.style.transform = `translateX(${position}px)`;
    }
}

/**
 * Atualiza visualmente qual slide está ativo no carrossel
 * @param {number} index - O índice do produto/linha
 */
function updateActiveSlide(index) {
    // Remove a classe ativa de todos os slides neste carrossel
    const slides = document.querySelectorAll(`#carousel-${index} .cell-carousel-slide`);
    slides.forEach(slide => slide.classList.remove('active'));

    // Adiciona a classe ativa ao slide atual
    const activeSlideIndex = cellCarouselCurrentIndexes[index];
    const activeSlide = document.getElementById(`slide-${index}-${activeSlideIndex}`);
    if (activeSlide) {
        activeSlide.classList.add('active');
    }
}

/**
 * Classe para gerenciar a aplicação da tabela de produtos
 * Implementa filtragem, ordenação e renderização dos dados
 */
class ProductTableApp {
    /**
     * Construtor da aplicação
     * @param {jQuery} $el - Elemento jQuery que contém a tabela
     * @param {Array|string} dataOrUrl - Array de produtos ou URL para buscar os dados
     */
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
                    console.error(`Erro ao carregar dados: ${this.state.err.responseText}`);
                }
            );
        }
    }

    /**
     * Inicializa o estado da aplicação com os filtros padrão
     */
    initState() {
        this.state = { 
            isLoaded: false, 
            products: [], 
            err: null,
            filters: {
                brand: 'all',
                bank: 'all',
                status: 'all',
                integration: 'all',
                sortBy: 'none',
                idSearch: ''
            }
        };
    }

    /**
     * Define e inicializa os elementos do DOM relacionados à tabela
     * @param {jQuery} $el - Elemento jQuery que contém a tabela
     * @param {Array} products - Array de produtos
     */
    defineElements($el, products) {
        // Extrai marcas e bancos únicos
        const brands = ['all', ...new Set(products.map(p => p.brand))];
        const banks = ['all', ...new Set(products.flatMap(p => p.banks))];

        this.$el = $el;
        this.$tbody = this.$el.find('tbody');
        this.$noResults = this.$el.find('#prod-no-results');

        // Filtro de marca
        this.$filterBrand = this.$el.find('#prod-filter-brand')
            .html(brands.map(brand => `<option value="${brand}">${brand}</option>`).join(''));

        // Filtro de banco
        this.$filterBank = this.$el.find('#prod-filter-category')
            .html(banks.map(bank => `<option value="${bank}">${bank}</option>`).join(''));

        // Outros elementos
        this.$sortBy = this.$el.find('#prod-sort-by');
        this.$statusFilter = this.$el.find('#prod-status-filter');
        this.$integrationFilter = this.$el.find('#prod-integration-filter');
        this.$idSearch = this.$el.find('#prod-id-search');
    }

    /**
     * Associa os eventos aos elementos de filtro e ordenação
     */
    bindEvents() {
        // Eventos para todos os elementos de filtro
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

        this.$integrationFilter.on('change', () => {
            this.state.filters.integration = this.$integrationFilter.val();
            this.applyFilters();
        });

        this.$idSearch.on('input', () => {
            this.state.filters.idSearch = this.$idSearch.val().trim();
            this.applyFilters();
        });
    }

    /**
     * Aplica todos os filtros selecionados e atualiza a tabela
     */
    applyFilters() {
        let filteredProducts = [...this.state.products];

        // Filtro de marca
        if (this.state.filters.brand !== 'all') {
            filteredProducts = filteredProducts.filter(p => p.brand === this.state.filters.brand);
        }

        // Filtro de banco
        if (this.state.filters.bank !== 'all') {
            filteredProducts = filteredProducts.filter(p => p.banks.includes(this.state.filters.bank));
        }

        // Filtro de status
        if (this.state.filters.status === 'active') {
            filteredProducts = filteredProducts.filter(p => p.stocked === true);
        } else if (this.state.filters.status === 'inactive') {
            filteredProducts = filteredProducts.filter(p => p.stocked === false);
        }

        // Filtro de integração
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

        // Filtro de busca por ID
        if (this.state.filters.idSearch) {
            filteredProducts = filteredProducts.filter(p => 
                p.id.toString().includes(this.state.filters.idSearch)
            );
        }

        // Ordenação
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

        // Renderiza os resultados filtrados e ordenados
        this.render(filteredProducts);
    }

    /**
     * Renderiza a tabela com os produtos fornecidos
     * @param {Array} products - Lista de produtos a serem exibidos
     */
    render(products) {
        const bankLogos = getBankLogos();

        if (!this.state.isLoaded) {
            this.$tbody.html('<div>Carregando...</div>');
            return;
        }

        this.$tbody.html(
            products.map(
                (product, index) => {
                    // Função para obter a URL do logo do banco
                    const getBankLogoUrl = (bankName) => {
                        return bankLogos[bankName] || `/api/placeholder/50/30`;
                    };

                    // Verifica se o produto tem notificações (para simulação, aleatório)
                    const hasNotification = Math.random() > 0.6;

                    return `<tr class="prod-table-row" data-key="${product.id}" style="height: 70px;">
                        <td class="prod-table-cell prod-align-right">${product.id}</td>
                        <td class="prod-table-cell prod-align-left">${product.brand}</td>
                        <td class="prod-table-cell prod-align-left">${product.name}</td>
                        <td class="prod-table-cell prod-align-left" style="display: flex; justify-content: left; align-items: center; height: 70px;">
                            <button class="cell-carousel-btn prev" onclick="prevSlide(${index})">&lt;</button>
                            <div class="cell-carousel" id="carousel-${index}">
                                <div class="cell-carousel-track" id="carousel-track-${index}">
                                    ${product.banks.map((bank, bankIndex) => `
                                        <div class="cell-carousel-slide" id="slide-${index}-${bankIndex}">
                                            <img src="${getBankLogoUrl(bank)}" alt="${bank}" title="${bank}" onerror="this.src='/api/placeholder/50/30'; this.onerror='';" />
                                        </div>
                                    `).join('')}
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
                        <td class="prod-table-cell prod-align-center style="width=200px">${product.created_at}</td>
                        <td class="prod-table-cell prod-align-center style="width=200px">${product.updated_at}</td>
                        <td class="prod-table-cell prod-align-center notification-cell">
                            <div class="notification-bell">
                                <i class="fas fa-bell"></i>
                                ${hasNotification ? '<span class="notification-badge has-new">1</span>' : ''}
                            </div>
                        </td>
                    </tr>`;
                }
            ).join('')
        );

        // Exibe ou oculta a mensagem de "Nenhum resultado encontrado"
        products.length === 0
            ? this.$noResults.removeClass('prod-hidden')
            : this.$noResults.addClass('prod-hidden');

        // Inicializa os carrosséis após renderizar
        products.forEach((_, index) => {
            initCellCarousel(index);
        });
        
        // Configura a seleção de linha com efeito de salto
        this.setupRowSelection();
        
        // Seleciona a primeira linha por padrão (se houver resultados e nenhuma seleção ativa)
        if (products.length > 0 && !$('.prod-table-row.selected').length) {
            $('.prod-table-row:first').addClass('selected');
        }
        
        // Inicializa o sistema de notificações para os sinos
        this.setupNotificationSystem();
    }
    
    /**
     * Configura a funcionalidade de seleção de linhas na tabela
     */
    setupRowSelection() {
        // Remove listeners antigos para evitar duplicação
        $('.prod-table-row').off('click.rowSelect');
        
        // Adiciona evento de clique a todas as linhas da tabela
        $('.prod-table-row').on('click.rowSelect', function(e) {
            // Ignora se o clique for em um botão ou controle dentro da linha
            if ($(e.target).hasClass('cell-carousel-btn') || 
                $(e.target).closest('button').length ||
                $(e.target).prop('tagName') === 'INPUT' ||
                $(e.target).prop('tagName') === 'SELECT' ||
                $(e.target).closest('.notification-bell').length) {
                return;
            }
            
            // Verifica se a linha está selecionada
            const isSelected = $(this).hasClass('selected');
            
            // Remove a classe 'selected' de todas as linhas
            $('.prod-table-row').removeClass('selected');
            
            // Se a linha não estava selecionada, adiciona a classe 'selected'
            if (!isSelected) {
                $(this).addClass('selected');
                
                // Efeito de rolagem suave para manter a linha visível
                const $container = $('.prod-table-wrapper');
                const containerHeight = $container.height();
                const rowTop = $(this).position().top;
                const rowHeight = $(this).outerHeight();
                
                // Verifica se a linha está parcialmente fora da visão
                if (rowTop < 0 || rowTop + rowHeight > containerHeight) {
                    // Calcula a posição ideal para centralizar a linha
                    const scrollTo = $container.scrollTop() + rowTop - (containerHeight / 2) + (rowHeight / 2);
                    $container.animate({ scrollTop: scrollTo }, 300);
                }
            }
        });
    }
    
    /**
     * Configura o sistema de notificações para os sinos na tabela
     */
    setupNotificationSystem() {
        // Verifica se já existe um pop-up de notificação
        if (!document.querySelector('.notification-popup')) {
            // Cria o overlay para o fundo escurecido
            const overlay = document.createElement('div');
            overlay.className = 'notification-overlay';
            document.body.appendChild(overlay);
            
            // Cria o pop-up de notificação
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
                    <button class="notification-btn notification-btn-secondary" id="view-ticket">Ver Ticket</button>
                </div>
            `;
            document.body.appendChild(popup);
            
            // Configura os eventos do pop-up
            this.setupNotificationEvents(overlay, popup);
        }
        
        // Adiciona evento de clique aos sinos de notificação
        $('.notification-bell').off('click').on('click', function(e) {
            e.stopPropagation(); // Evita que o clique selecione a linha
            
            // Obtém o ID do produto a partir da linha da tabela
            const productId = $(this).closest('tr').data('key');
            
            // Atualiza o conteúdo do pop-up com informações do ticket
            updateNotificationPopup(productId);
            
            // Mostra o pop-up
            $('.notification-overlay, .notification-popup').addClass('visible');
            
            // Remove o badge de notificação
            const badge = $(this).find('.notification-badge');
            if (badge.length) {
                badge.removeClass('has-new');
                setTimeout(() => badge.remove(), 300);
            }
        });
    }
    
    /**
     * Configura os eventos para o pop-up de notificação
     * @param {HTMLElement} overlay - O elemento overlay
     * @param {HTMLElement} popup - O elemento do pop-up
     */
    setupNotificationEvents(overlay, popup) {
        // Fecha o pop-up ao clicar no botão de fechar
        const closeBtn = popup.querySelector('.close-notification');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                overlay.classList.remove('visible');
                popup.classList.remove('visible');
            });
        }
        
        // Fecha o pop-up ao clicar no botão "Ignorar"
        const dismissBtn = popup.querySelector('#dismiss-notification');
        if (dismissBtn) {
            dismissBtn.addEventListener('click', () => {
                overlay.classList.remove('visible');
                popup.classList.remove('visible');
            });
        }
        
        // Ação ao clicar no botão "Ver Ticket"
        const viewBtn = popup.querySelector('#view-ticket');
        if (viewBtn) {
            viewBtn.addEventListener('click', () => {
                // Aqui implementaria a navegação para a página do ticket
                alert('Abrindo detalhes do ticket...');
                overlay.classList.remove('visible');
                popup.classList.remove('visible');
            });
        }
        
        // Fecha o pop-up ao clicar no overlay
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            popup.classList.remove('visible');
        });
    }

    /**
     * Busca dados JSON de uma URL
     * @param {string} url - URL para buscar os dados
     * @return {Promise} Promessa com os dados JSON
     */
    fetchJson(url) {
        return $.ajax({
            url: url,
            dataType: 'json'
        });
    }
}

/**
 * Configura a navegação por teclado (setas para cima/baixo)
 * para navegar entre as linhas da tabela
 */
function setupKeyboardNavigation() {
    $(document).on('keydown', function(e) {
        const $rows = $('.prod-table-row');
        if ($rows.length === 0) return;
        
        const $selected = $('.prod-table-row.selected');
        let index = $rows.index($selected);
        
        // Navegação com seta para baixo
        if (e.which === 40) {
            e.preventDefault();
            index = (index < $rows.length - 1) ? index + 1 : index;
            $rows.removeClass('selected');
            $rows.eq(index).addClass('selected');
            
            // Rola para manter visível
            scrollToSelectedRow($rows.eq(index));
        }
        
        // Navegação com seta para cima
        if (e.which === 38) {
            e.preventDefault();
            index = (index > 0) ? index - 1 : 0;
            $rows.removeClass('selected');
            $rows.eq(index).addClass('selected');
            
            // Rola para manter visível
            scrollToSelectedRow($rows.eq(index));
        }
    });
}

/**
 * Faz rolagem para manter a linha selecionada visível
 * @param {jQuery} $row - Elemento jQuery da linha selecionada
 */
function scrollToSelectedRow($row) {
    const $container = $('.prod-table-wrapper');
    const containerHeight = $container.height();
    const rowTop = $row.position().top;
    const rowHeight = $row.outerHeight();
    
    if (rowTop < 0) {
        $container.animate({ scrollTop: $container.scrollTop() - Math.abs(rowTop) }, 150);
    } else if (rowTop + rowHeight > containerHeight) {
        $container.animate({ scrollTop: $container.scrollTop() + (rowTop + rowHeight - containerHeight) }, 150);
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
    
    // Atualiza o conteúdo do pop-up
    const messageElement = popup.querySelector('.notification-message');
    if (messageElement) {
        messageElement.innerHTML = `
            O ticket <strong>#${productId}</strong> relacionado a "${product.brand || 'Cliente'}" 
            foi respondido pelo cliente. Clique abaixo para visualizar a resposta.
        `;
    }
    
    // Adiciona uma hora aleatória para simular quando a notificação foi recebida
    const timeElement = popup.querySelector('.notification-time');
    if (timeElement) {
        const times = ['há 5 minutos', 'há 10 minutos', 'há 30 minutos', 'há 1 hora', 'agora mesmo'];
        const randomTime = times[Math.floor(Math.random() * times.length)];
        timeElement.textContent = `Recebido ${randomTime}`;
    }
}

/**
 * Adiciona um sino de notificação a uma linha específica
 * Esta função pode ser chamada para adicionar sinos a novas linhas criadas dinamicamente
 * @param {HTMLElement} row - Elemento da linha da tabela
 * @param {boolean} hasNotification - Se deve mostrar uma notificação ativa
 * @return {HTMLElement} - O elemento do sino criado
 */
function addNotificationBellToRow(row, hasNotification = false) {
    // Cria a célula para o sino
    const notificationCell = document.createElement('td');
    notificationCell.className = 'prod-table-cell prod-align-center notification-cell';
    
    // Cria o sino
    const bell = document.createElement('div');
    bell.className = 'notification-bell';
    bell.innerHTML = '<i class="fas fa-bell"></i>';
    
    // Adiciona badge de notificação se necessário
    if (hasNotification) {
        const badge = document.createElement('span');
        badge.className = 'notification-badge has-new';
        badge.textContent = '1';
        bell.appendChild(badge);
    }
    
    // Adiciona o sino à célula e a célula à linha
    notificationCell.appendChild(bell);
    row.appendChild(notificationCell);
    
    // Adiciona evento de clique ao sino
    bell.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Obtém o ID do produto da linha
        const productId = parseInt(row.getAttribute('data-key'), 10);
        
        // Atualiza e mostra o pop-up
        updateNotificationPopup(productId);
        document.querySelector('.notification-overlay').classList.add('visible');
        document.querySelector('.notification-popup').classList.add('visible');
        
        // Remove o badge
        const badge = this.querySelector('.notification-badge');
        if (badge) {
            badge.classList.remove('has-new');
            setTimeout(() => badge.remove(), 300);
        }
    });
    
    return bell;
}

/**
 * Adiciona uma nova notificação a um sino específico
 * @param {HTMLElement} bell - Elemento do sino de notificação
 * @param {string} message - Mensagem a ser exibida no pop-up
 * @param {number} count - Número a ser exibido no badge
 */
function addNotificationToBell(bell, message = 'Nova notificação de ticket', count = 1) {
    if (!bell) return;
    
    // Verifica se já existe um badge
    let badge = bell.querySelector('.notification-badge');
    
    if (!badge) {
        // Cria o badge se não existir
        badge = document.createElement('span');
        badge.className = 'notification-badge';
        bell.appendChild(badge);
    }
    
    // Atualiza o contador do badge
    const currentCount = parseInt(badge.textContent || '0', 10);
    badge.textContent = currentCount + count;
    
    // Adiciona animação
    badge.classList.add('has-new');
    
    // Armazena a mensagem no sino para ser exibida no pop-up
    bell.dataset.message = message;
}

/**
 * Simula a chegada de novas notificações periodicamente
 * Esta função é apenas para demonstração
 */
function simulateIncomingNotifications() {
    setInterval(() => {
        // Seleciona uma linha aleatória
        const rows = document.querySelectorAll('.prod-table-row');
        if (rows.length === 0) return;
        
        const randomRow = rows[Math.floor(Math.random() * rows.length)];
        const bell = randomRow.querySelector('.notification-bell');
        
        if (bell && !bell.querySelector('.notification-badge')) {
            // Obtém o ID do produto
            const productId = parseInt(randomRow.getAttribute('data-key'), 10);
            const product = products.find(p => p.id === productId) || {};
            
            // Mensagem personalizada
            const message = `O ticket #${productId} de "${product.brand || 'Cliente'}" foi atualizado.`;
            
            // Adiciona notificação
            addNotificationToBell(bell, message, 1);
        }
    }, 30000); // A cada 30 segundos
}

/**
 * Atualiza o cabeçalho da tabela para substituir "Status" por "Notificações"
 */
function updateTableHeader() {
    const headerRow = document.querySelector('.prod-table-head tr');
    if (!headerRow) return;
    
    // Busca o cabeçalho de Status (geralmente o último antes da modificação)
    const headers = headerRow.querySelectorAll('th');
    let statusHeader = null;
    
    for (let i = 0; i < headers.length; i++) {
        if (headers[i].textContent.trim().toLowerCase() === 'status') {
            statusHeader = headers[i];
            break;
        }
    }
    
    // Se encontrar o cabeçalho de Status, atualiza para "Notificações"
    if (statusHeader) {
        statusHeader.textContent = 'Notificações';
        statusHeader.className = 'prod-table-cell prod-align-center';
    }
    // Se não encontrar, pode ser que precise adicionar um novo
    else if (!headerRow.querySelector('th:last-child').classList.contains('notification-cell')) {
        const notificationHeader = document.createElement('th');
        notificationHeader.className = 'prod-table-cell prod-align-center';
        notificationHeader.textContent = 'Notificações';
        headerRow.appendChild(notificationHeader);
    }
}

/**
 * Inicializa a aplicação quando o documento estiver pronto
 */
$(document).ready(function () {
    // Inicializa o menu
    initMenu();
    
    // Configura navegação por teclado
    setupKeyboardNavigation();
    
    // Atualiza o cabeçalho da tabela para mostrar "Notificações" em vez de "Status"
    updateTableHeader();

    // Inicializa a aplicação da tabela de produtos com um pequeno atraso
    // para garantir que o DOM esteja completamente carregado
    setTimeout(function () {
        new ProductTableApp($('#product-table-app'), products);
        
        // Inicia a simulação de notificações (remover em produção)
        simulateIncomingNotifications();
    }, 100);
});