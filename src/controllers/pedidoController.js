const pedidoService = require('../services/pedidoService');

class PedidoController {
  criar(req, res, next) {
    try {
      const novoPedido = pedidoService.criarPedido(req.body);
      return res.status(201).json(novoPedido);
    } catch (error) {
      next(error);
    }
  }

  listar(req, res, next) {
    try {
      const pedidos = pedidoService.listarPedidos();
      return res.status(200).json(pedidos);
    } catch (error) {
      next(error);
    }
  }

  buscarPorId(req, res, next) {
    try {
      const pedido = pedidoService.buscarPorId(req.params.id);
      return res.status(200).json(pedido);
    } catch (error) {
      next(error);
    }
  }

  atualizarStatus(req, res, next) {
    try {
      const { status } = req.body;
      const pedidoAtualizado = pedidoService.atualizarStatus(req.params.id, status);
      return res.status(200).json(pedidoAtualizado);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PedidoController();