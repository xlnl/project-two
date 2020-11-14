'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('provinces', [
      { name: 'Ha Tinh',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { name: 'Nghe An',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { name: 'Quang Binh',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { name: 'Quang Tri',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { name: 'Thanh Hoa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { name: 'Thua Thien - Hue',
      createdAt: new Date(),
      updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('provinces', null, {});
  }
};
