// Dados dos produtos - JPR Móveis Rústicos (Atualizado com informações reais)
const produtos = [
    {
        id: 'mesa-001',
        nome: 'Mesa Sublime',
        slug: 'mesa-sublime',
        preco: 3400,
        precoFormatado: 'R$ 3.400,00',
        categoria: 'Premium',
        imagem: './Imagem das mesas/Mesa-Sublime-2.png',
        descricao: 'Disponível em diversas cores com acabamento brilhante ou acetinado',
        descricaoLonga: 'A Mesa Sublime oferece versatilidade em cores, com opções de acabamento brilhante ou acetinado. Oferecemos verniz automotivo ou verniz P.U. acetinado, além de modelos com bordas rústicas ou bordas retas. Acompanha 2 bancos grandes.',
        dimensoes: {
            comprimento: '2,0m / 2,5m / 3,0m',
            largura: 'Sob consulta',
            altura: 'Padrão',
            espessura: 'Padrão'
        },
        caracteristicas: [
            'Diversas cores disponíveis',
            'Acabamento brilhante ou acetinado',
            'Verniz automotivo ou P.U. acetinado',
            'Bordas rústicas ou retas',
            '2 bancos grandes inclusos'
        ],
        disponibilidade: 'Em estoque',
        prazoEntrega: '10-25 dias úteis',
        sobMedida: true,
        badge: 'PERSONALIZAÇÃO'
    },
    {
        id: 'mesa-002',
        imagem: './Imagem das mesas/Mesa-Paris-1.png',
        nome: 'Mesa Paris',
        slug: 'mesa-paris',
        preco: 3400,
        precoFormatado: 'R$ 3.400,00',
        categoria: 'Premium',
        descricao: 'Design clássico com versatilidade de acabamentos',
        descricaoLonga: 'A Mesa Paris oferece versatilidade em cores, com opções de acabamento brilhante ou acetinado. Oferecemos verniz automotivo ou verniz P.U. acetinado, além de modelos com bordas rústicas ou bordas retas. Acompanha 2 bancos grandes.',
        dimensoes: {
            comprimento: '2,0m / 2,5m / 3,0m',
            largura: 'Sob consulta',
            altura: 'Padrão',
            espessura: 'Padrão'
        },
        caracteristicas: [
            'Diversas cores disponíveis',
            'Acabamento brilhante ou acetinado',
            'Verniz automotivo ou P.U. acetinado',
            'Bordas rústicas ou retas',
            '2 bancos grandes inclusos'
        ],
        disponibilidade: 'Em estoque',
        prazoEntrega: '10-25 dias úteis',
        sobMedida: true,
        badge: 'PERSONALIZAÇÃO'
    },
    {
        id: 'mesa-003',
        imagem: './Imagem das mesas/Mesa-Requinte.png',
        nome: 'Mesa Requinte',
        slug: 'mesa-requinte',
        preco: 3400,
        precoFormatado: 'R$ 3.400,00',
        categoria: 'Premium',
        descricao: 'Elegância rústica com opções de acabamento premium',
        descricaoLonga: 'A Mesa Requinte oferece versatilidade em cores, com opções de acabamento brilhante ou acetinado. Oferecemos verniz automotivo ou verniz P.U. acetinado, além de modelos com bordas rústicas ou bordas retas. Acompanha 2 bancos grandes.',
        dimensoes: {
            comprimento: '2,0m / 2,5m / 3,0m',
            largura: 'Sob consulta',
            altura: 'Padrão',
            espessura: 'Padrão'
        },
        caracteristicas: [
            'Diversas cores disponíveis',
            'Acabamento brilhante ou acetinado',
            'Verniz automotivo ou P.U. acetinado',
            'Bordas rústicas ou retas',
            '2 bancos grandes inclusos'
        ],
        disponibilidade: 'Em estoque',
        prazoEntrega: '10-25 dias úteis',
        sobMedida: true,
        badge: 'PERSONALIZAÇÃO'
    },
    {
        id: 'mesa-004',
        imagem: './Imagem das mesas/Mesa-Luxuria-1.png',
        nome: 'Mesa Luxúria',
        slug: 'mesa-luxuria',
        preco: 4500,
        precoFormatado: 'R$ 4.500,00',
        categoria: 'Top Premium',
        descricao: 'Exclusiva com banquetas artesanais incluídas',
        descricaoLonga: 'A Mesa Luxúria é o topo da linha JPR, oferecendo versatilidade em cores com opções de acabamento brilhante ou acetinado. Inclui banquetas artesanais: 8 na medida 2,0m, 10 na medida 2,5m e 12 na medida 3,0m.',
        dimensoes: {
            comprimento: '2,0m / 2,5m / 3,0m',
            largura: 'Sob consulta',
            altura: 'Padrão',
            espessura: 'Padrão'
        },
        caracteristicas: [
            'Topo da linha JPR',
            'Diversas cores disponíveis',
            'Acabamento brilhante ou acetinado',
            'Verniz automotivo ou P.U. acetinado',
            'Banquetas artesanais incluídas'
        ],
        disponibilidade: 'Em estoque',
        prazoEntrega: '10-25 dias úteis',
        sobMedida: true,
        badge: 'TOP PREMIUM'
    },
    {
        id: 'mesa-005',
        imagem: './Imagem das mesas/Mesa-Imperatriz-2.png',
        nome: 'Mesa Imperatriz',
        slug: 'mesa-imperatriz',
        preco: 3400,
        precoFormatado: 'R$ 3.400,00',
        categoria: 'Premium',
        descricao: 'Sofisticação clássica com acabamentos personalizáveis',
        descricaoLonga: 'A Mesa Imperatriz oferece versatilidade em cores, com opções de acabamento brilhante ou acetinado. Oferecemos verniz automotivo ou verniz P.U. acetinado, além de modelos com bordas rústicas ou bordas retas. Acompanha 2 bancos grandes.',
        dimensoes: {
            comprimento: '2,0m / 2,5m / 3,0m',
            largura: 'Sob consulta',
            altura: 'Padrão',
            espessura: 'Padrão'
        },
        caracteristicas: [
            'Diversas cores disponíveis',
            'Acabamento brilhante ou acetinado',
            'Verniz automotivo ou P.U. acetinado',
            'Bordas rústicas ou retas',
            '2 bancos grandes inclusos'
        ],
        disponibilidade: 'Em estoque',
        prazoEntrega: '10-25 dias úteis',
        sobMedida: true,
        badge: 'PERSONALIZAÇÃO'
    },
    {
        id: 'mesa-006',
        imagem: './Imagem das mesas/Mesa-Charme.png',
        nome: 'Mesa Charme',
        slug: 'mesa-charme',
        preco: 3400,
        precoFormatado: 'R$ 3.400,00',
        categoria: 'Premium',
        descricao: 'Design encantador com toque rústico artesanal',
        descricaoLonga: 'A Mesa Charme oferece versatilidade em cores, com opções de acabamento brilhante ou acetinado. Oferecemos verniz automotivo ou verniz P.U. acetinado, além de modelos com bordas rústicas ou bordas retas. Acompanha 2 bancos grandes.',
        dimensoes: {
            comprimento: '2,0m / 2,5m / 3,0m',
            largura: 'Sob consulta',
            altura: 'Padrão',
            espessura: 'Padrão'
        },
        caracteristicas: [
            'Diversas cores disponíveis',
            'Acabamento brilhante ou acetinado',
            'Verniz automotivo ou P.U. acetinado',
            'Bordas rústicas ou retas',
            '2 bancos grandes inclusos'
        ],
        disponibilidade: 'Em estoque',
        prazoEntrega: '10-25 dias úteis',
        sobMedida: true,
        badge: 'PERSONALIZAÇÃO'
    },
    {
        id: 'mesa-007',
        imagem: './Imagem das mesas/Mesa-Imperio-2.png',
        nome: 'Mesa Império',
        slug: 'mesa-imperio',
        preco: 3400,
        precoFormatado: 'R$ 3.400,00',
        categoria: 'Premium',
        descricao: 'Elegância imperial com opções de customização completa',
        descricaoLonga: 'A Mesa Império oferece versatilidade em cores, com opções de acabamento brilhante ou acetinado. Oferecemos verniz automotivo ou verniz P.U. acetinado, além de modelos com bordas rústicas ou bordas retas. Acompanha 2 bancos grandes.',
        dimensoes: {
            comprimento: '2,0m / 2,5m / 3,0m',
            largura: 'Sob consulta',
            altura: 'Padrão',
            espessura: 'Padrão'
        },
        caracteristicas: [
            'Diversas cores disponíveis',
            'Acabamento brilhante ou acetinado',
            'Verniz automotivo ou P.U. acetinado',
            'Bordas rústicas ou retas',
            '2 bancos grandes inclusos'
        ],
        disponibilidade: 'Em estoque',
        prazoEntrega: '10-25 dias úteis',
        sobMedida: true,
        badge: 'PERSONALIZAÇÃO'
    },
    {
        id: 'mesa-008',
        imagem: './Imagem das mesas/Mesa-Requinte-Nobre-2.png',
        nome: 'Mesa Requinte Nobre',
        slug: 'mesa-requinte-nobre',
        preco: 3400,
        precoFormatado: 'R$ 3.400,00',
        categoria: 'Premium Plus',
        descricao: 'Refinamento nobre com acabamento excepcional',
        descricaoLonga: 'A Mesa Requinte Nobre oferece versatilidade em cores, com opções de acabamento brilhante ou acetinado. Oferecemos verniz automotivo ou verniz P.U. acetinado, além de modelos com bordas rústicas ou bordas retas. Acompanha 2 bancos grandes.',
        dimensoes: {
            comprimento: '2,0m / 2,5m / 3,0m',
            largura: 'Sob consulta',
            altura: 'Padrão',
            espessura: 'Padrão'
        },
        caracteristicas: [
            'Diversas cores disponíveis',
            'Acabamento brilhante ou acetinado',
            'Verniz automotivo ou P.U. acetinado',
            'Bordas rústicas ou retas',
            '2 bancos grandes inclusos'
        ],
        disponibilidade: 'Em estoque',
        prazoEntrega: '10-25 dias úteis',
        sobMedida: true,
        badge: 'PREMIUM PLUS'
    },
    {
        id: 'mesa-009',
        imagem: './Imagem das mesas/Mesa-Nobreza-1.png',
        nome: 'Mesa Nobreza',
        slug: 'mesa-nobreza',
        preco: 4200,
        precoFormatado: 'R$ 4.200,00',
        categoria: 'Premium',
        descricao: 'Nobreza rústica em suas formas e acabamentos',
        descricaoLonga: 'A Mesa Nobreza oferece versatilidade em cores, com opções de acabamento brilhante ou acetinado. Oferecemos verniz automotivo ou verniz P.U. acetinado, além de modelos com bordas rústicas ou bordas retas. Acompanha 2 bancos grandes.',
        dimensoes: {
            comprimento: '2,0m / 2,5m / 3,0m',
            largura: 'Sob consulta',
            altura: 'Padrão',
            espessura: 'Padrão'
        },
        caracteristicas: [
            'Diversas cores disponíveis',
            'Acabamento brilhante ou acetinado',
            'Verniz automotivo ou P.U. acetinado',
            'Bordas rústicas ou retas',
            '2 bancos grandes inclusos'
        ],
        disponibilidade: 'Em estoque',
        prazoEntrega: '10-25 dias úteis',
        sobMedida: true,
        badge: 'PERSONALIZAÇÃO'
    },
    {
        id: 'mesa-010',
        imagem: './Imagem das mesas/Mesa-Encanto-2.png',
        nome: 'Mesa Encanto',
        slug: 'mesa-encanto',
        preco: 3400,
        precoFormatado: 'R$ 3.400,00',
        categoria: 'Premium',
        descricao: 'Encanto rústico que seduz à primeira vista',
        descricaoLonga: 'A Mesa Encanto oferece versatilidade em cores, com opções de acabamento brilhante ou acetinado. Oferecemos verniz automotivo ou verniz P.U. acetinado, além de modelos com bordas rústicas ou bordas retas. Acompanha 2 bancos grandes.',
        dimensoes: {
            comprimento: '2,0m / 2,5m / 3,0m',
            largura: 'Sob consulta',
            altura: 'Padrão',
            espessura: 'Padrão'
        },
        caracteristicas: [
            'Diversas cores disponíveis',
            'Acabamento brilhante ou acetinado',
            'Verniz automotivo ou P.U. acetinado',
            'Bordas rústicas ou retas',
            '2 bancos grandes inclusos'
        ],
        disponibilidade: 'Em estoque',
        prazoEntrega: '10-25 dias úteis',
        sobMedida: true,
        badge: 'PERSONALIZAÇÃO'
    },
    {
        id: 'mesa-011',
        imagem: './Imagem das mesas/Mesa-Glamour-Mel.png',
        nome: 'Mesa Glamour Mel',
        slug: 'mesa-glamour-mel',
        preco: 3400,
        precoFormatado: 'R$ 3.400,00',
        categoria: 'Premium',
        descricao: 'Glamour com tons melados e sofisticados',
        descricaoLonga: 'A Mesa Glamour Mel oferece versatilidade em cores, com opções de acabamento brilhante ou acetinado. Oferecemos verniz automotivo ou verniz P.U. acetinado, além de modelos com bordas rústicas ou bordas retas. Acompanha 2 bancos grandes.',
        dimensoes: {
            comprimento: '2,0m / 2,5m / 3,0m',
            largura: 'Sob consulta',
            altura: 'Padrão',
            espessura: 'Padrão'
        },
        caracteristicas: [
            'Diversas cores disponíveis',
            'Acabamento brilhante ou acetinado',
            'Verniz automotivo ou P.U. acetinado',
            'Bordas rústicas ou retas',
            '2 bancos grandes inclusos'
        ],
        disponibilidade: 'Em estoque',
        prazoEntrega: '10-25 dias úteis',
        sobMedida: true,
        badge: 'PERSONALIZAÇÃO'
    },
    {
        id: 'mesa-012',
        imagem: './Imagem das mesas/mesa-glamour.png',
        nome: 'Mesa Glamour',
        slug: 'mesa-glamour',
        preco: 3400,
        precoFormatado: 'R$ 3.400,00',
        categoria: 'Premium',
        descricao: 'Glamour sofisticado com acabamento excepcional',
        descricaoLonga: 'A Mesa Glamour oferece versatilidade em cores, com opções de acabamento brilhante ou acetinado. Oferecemos verniz automotivo ou verniz P.U. acetinado, além de modelos com bordas rústicas ou bordas retas. Acompanha 2 bancos grandes.',
        dimensoes: {
            comprimento: '2,0m / 2,5m / 3,0m',
            largura: 'Sob consulta',
            altura: 'Padrão',
            espessura: 'Padrão'
        },
        caracteristicas: [
            'Diversas cores disponíveis',
            'Acabamento brilhante ou acetinado',
            'Verniz automotivo ou P.U. acetinado',
            'Bordas rústicas ou retas',
            '2 bancos grandes inclusos'
        ],
        disponibilidade: 'Em estoque',
        prazoEntrega: '10-25 dias úteis',
        sobMedida: true,
        badge: 'PERSONALIZAÇÃO'
    },
    {
        id: 'mesa-013',
        imagem: './Imagem das mesas/Mesa-Imperatriz-Natural-2.png',
        nome: 'Mesa Imperatriz Natural',
        slug: 'mesa-imperatriz-natural',
        preco: 3400,
        precoFormatado: 'R$ 3.400,00',
        categoria: 'Premium',
        descricao: 'Acabamento natural que realça a beleza da madeira',
        descricaoLonga: 'A Mesa Imperatriz Natural oferece versatilidade em cores, com opções de acabamento brilhante ou acetinado. Oferecemos verniz automotivo ou verniz P.U. acetinado, além de modelos com bordas rústicas ou bordas retas. Acompanha 2 bancos grandes.',
        dimensoes: {
            comprimento: '2,0m / 2,5m / 3,0m',
            largura: 'Sob consulta',
            altura: 'Padrão',
            espessura: 'Padrão'
        },
        caracteristicas: [
            'Diversas cores disponíveis',
            'Acabamento brilhante ou acetinado',
            'Verniz automotivo ou P.U. acetinado',
            'Bordas rústicas ou retas',
            '2 bancos grandes inclusos'
        ],
        disponibilidade: 'Em estoque',
        prazoEntrega: '10-25 dias úteis',
        sobMedida: true,
        badge: 'NATURAL'
    }
];

// Emojis dos produtos (usa o mesmo emoji para todas as mesas)
const emojisProdutos = {
    'mesa-001': '🪵',
    'mesa-002': '🪵',
    'mesa-003': '🪵',
    'mesa-004': '🪵',
    'mesa-005': '🪵',
    'mesa-006': '🪵',
    'mesa-007': '🪵',
    'mesa-008': '🪵',
    'mesa-009': '🪵',
    'mesa-010': '🪵',
    'mesa-011': '🪵',
    'mesa-012': '🪵',
    'mesa-013': '🪵'
};
