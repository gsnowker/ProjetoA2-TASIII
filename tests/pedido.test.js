const request = require('supertest');
const app = require('../src/app');
const pedidoService = require('../src/services/pedidoService');

describe('API de Gerenciamento de Pedidos', () => {
  beforeEach(() => {
    pedidoService.reset();
  });

  test('POST /pedidos - Deve criar um pedido válido com HTTP 201', async () => {
    const res = await request(app)
      .post('/pedidos')
      .send({
        cliente: "Carlos Silva",
        tipo: "entrega",
        valor: 350,
        prioridade: "normal"
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id', 1);
    expect(res.body.status).toEqual('recebido');
  });

  test('POST /pedidos - Deve retornar HTTP 400 para dados inválidos', async () => {
    const res = await request(app)
      .post('/pedidos')
      .send({
        cliente: "   ",
        tipo: "invalido",
        valor: -10,
        prioridade: "alta"
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('erro');
  });

  test('GET /pedidos - Deve listar todos os pedidos com HTTP 200', async () => {
    await request(app).post('/pedidos').send({ cliente: "Ana", tipo: "retirada", valor: 100, prioridade: "baixa" });
    
    const res = await request(app).get('/pedidos');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toEqual(1);
  });

  test('GET /pedidos/:id - Deve retornar 404 para ID inexistente', async () => {
    const res = await request(app).get('/pedidos/999');
    expect(res.statusCode).toEqual(404);
  });

  test('PATCH /pedidos/:id/status - Deve atualizar status com sucesso', async () => {
    const pedido = await request(app)
      .post('/pedidos')
      .send({ cliente: "Carlos", tipo: "entrega", valor: 200, prioridade: "normal" });

    const res = await request(app)
      .patch(`/pedidos/${pedido.body.id}/status`)
      .send({ status: "em_preparacao" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('em_preparacao');
  });
});
