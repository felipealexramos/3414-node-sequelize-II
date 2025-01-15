const Controller = require('./Controller.js');
const CursoServices = require('../services/CursoServices.js');
const { Op } = require('sequelize');

const cursoServices = new CursoServices();

class CursoController extends Controller {
  constructor() {
    super(cursoServices);
  }

  async pegaCursos(req, res) {
    const { data_inicial, data_final } = req.query;
    const where = {};

    //se existirem params, cria uma prop {}
    if (data_inicial || data_final ? where.data_inicio = {} : null);

    //se existir data_inicial, adiciona a prop gte com os valor
    if (data_inicial ? where.data_inicio[Op.gte] = data_inicial : null);

    //se existir data_final, adiciona a prop lte com os valor
    if (data_final ? where.data_inicio[Op.lte] = data_final : null);

    try {
      const listaCursos = await cursoServices.pegaTodosOsRegistros(where);
      return res.status(200).json(listaCursos);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CursoController;
