'use strict';
const {
  Model
} = require('sequelize');

const isCpfValido = require('../../utils/validaCpfHelper.js');

module.exports = (sequelize, DataTypes) => {
  class Pessoa extends Model {
    static associate(models) {
      Pessoa.hasMany(models.Curso, {
        foreignKey: 'docente_id'
      });
      Pessoa.hasMany(models.Matricula, {
        foreignKey: 'estudante_id',
        // scope: { status: 'matriculado' },
        as: 'aulasMatriculadas'
      });
    }
  }
  Pessoa.init({
    nome: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [3, 100],
          msg: 'O campo nome deve ter no mínimo 3 caracteres e no máximo 100'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Formato de Email inválido'
        }
      }
    },
    cpf: {
      type: DataTypes.STRING,
      validate: {
        cpfIsValid: (cpf) => {
          if (!isCpfValido(cpf)) throw new Error('Número de CPF inválido');
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoa',
    tableName: 'pessoas',
    paranoid: true,
    defaultScope: {
      where: {
        ativo: true
      }
    }, 
    scopes: {
      todos: {
        where: {}
      }
    }
  });
  return Pessoa;
};