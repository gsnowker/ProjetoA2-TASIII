let pedidos = [];
let proximoId = 1;

const TIPOS_VALIDOS = ['entrega', 'retirada', 'local'];
const PRIORIDADES_VALIDAS = ['baixa', 'normal', 'alta'];
const STATUS_VALIDOS = ['recebido', 'em_preparacao', 'enviado', 'entregue', 'cancelado'];

const TRANSOES_PERMITIDAS = {
  recebido: ['em_preparacao', 'cancelado'],
  em_preparacao: ['enviado', 'cancelado'],
  enviado: ['entregue', 'cancelado'],
  entregue: [],
  cancelado: []
};

class PedidoService {
  criarPedido(dados) {
    let { cliente, tipo, valor, prioridade } = dados;

    if (typeof cliente !== 'string' || cliente.trim() === '') {
      throw { status: 400, message: "O campo 'cliente' é obrigatório e deve ser um texto não vazio." };
    }
    cliente = cliente.trim();

    if (typeof valor !== 'number' || isNaN(valor) || valor <= 0) {
      throw { status: 400, message: "O campo 'valor' deve ser um número maior que zero." };
    }

    if (!tipo || !TIPOS_VALIDOS.includes(tipo.toLowerCase())) {
      throw { status: 400, message: `O campo 'tipo' deve ser um dos seguintes valores: ${TIPOS_VALIDOS.join(', ')}.` };
    }

    if (!prioridade || !PRIORIDADES_VALIDAS.includes(prioridade.toLowerCase())) {
      throw { status: 400, message: `O campo 'prioridade' deve ser um dos seguintes valores: ${PRIORIDADES_VALIDAS.join(', ')}.` };
    }

    const novoPedido = {
      id: proximoId++,
      cliente,
      tipo: tipo.toLowerCase(),
      valor,
      prioridade: prioridade.toLowerCase(),
      status: 'recebido'
    };

    pedidos.push(novoPedido);
    return novoPedido;
  }

  listarPedidos() {
    return pedidos;
  }

  buscarPorId(id) {
    const pedidoId = Number(id);
    if (isNaN(pedidoId)) {
      throw { status: 400, message: "O ID informado deve ser um número válido." };
    }

    const pedido = pedidos.find(p => p.id === pedidoId);
    if (!pedido) {
      throw { status: 404, message: `Pedido com ID ${pedidoId} não encontrado.` };
    }

    return pedido;
  }

  atualizarStatus(id, novoStatus) {
    const pedido = this.buscarPorId(id);

    if (!novoStatus || typeof novoStatus !== 'string') {
      throw { status: 400, message: "O campo 'status' é obrigatório." };
    }

    const statusFormatado = novoStatus.toLowerCase();

    if (!STATUS_VALIDOS.includes(statusFormatado)) {
      throw { status: 400, message: `Status inválido. Os valores permitidos são: ${STATUS_VALIDOS.join(', ')}.` };
    }

    const proximosStatusPermitidos = TRANSOES_PERMITIDAS[pedido.status];
    if (!proximosStatusPermitidos.includes(statusFormatado)) {
      throw { 
        status: 400, 
        message: `Transição de status inválida. Não é possível alterar de '${pedido.status}' para '${statusFormatado}'.` 
      };
    }

    pedido.status = statusFormatado;
    return pedido;
  }

  reset() {
    pedidos = [];
    proximoId = 1;
  }
}

module.exports = new PedidoService();