const db = require("../../models");
const { Op } = require("sequelize");
const Sequelize = require("sequelize");

const Product = db.Product;
const productCategory = db.Product_Category;
const productImage = db.Product_Image;
const productWarehouses = db.Product_Warehouses;

module.exports = {
  allProduct: async (req, res) => {
    try {
      const { page, limit, search_query, order, by, pmin, pmax } = req.query;
      const page_list = +page || 0;
      const limit_list = +limit || 12;
      const search = search_query || "";
      const offset = limit_list * page_list;
      const order_by = order || "name";
      const direction = by || "ASC";
      const price_max = +pmax || 21398745600069;
      const price_min = +pmin || 0;
      const totalRows = await Product.count({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: "%" + search + "%",
              },
              price: {
                [Op.and]: [
                  {
                    [Op.gte]: price_min,
                  },
                  {
                    [Op.lte]: price_max,
                  },
                ],
              },
            },
          ],
        },
      });
      const totalPage = Math.ceil(totalRows / limit_list);
      const all = await Product.findAll({
        include: [
          {
            model: productImage,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: productCategory,
          },
          {
            model: productWarehouses,
            as: "Details",
          },
        ],
        attributes: [
          "id",
          "name",
          "desc",
          "price",
          "weight",
          [Sequelize.fn("SUM", Sequelize.col("stocks")), "product_stocks"],
        ],
        group: ["ProductId"],
        having: {
          [Op.or]: [
            {
              name: {
                [Op.like]: "%" + search + "%",
              },
              price: {
                [Op.and]: [
                  {
                    [Op.gte]: price_min,
                  },
                  {
                    [Op.lte]: price_max,
                  },
                ],
              },
            },
          ],
        },
        offset: offset,
        limit: limit_list,
        order: [[order_by, direction]],
        subQuery: false,
      });
      res.status(200).send({
        result: all,
        page: page_list,
        limit: limit_list,
        offset: offset,
        totalRows: totalRows,
        totalPage: totalPage,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  detailProduct: async (req, res) => {
    try {
      const response = await Product.findOne({
        include: [
          {
            model: productImage,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            required: true,
          },
          {
            model: productCategory,
            attributes: ["category"],
            required: true,
          },
          {
            model: productWarehouses,
            as: "Details",
            required: true,
          },
        ],
        where: {
          name: req.params.name,
        },
      });
      res.status(200).send(response);
    } catch (err) {
      console.log(err);
      res.status(404).send(err);
    }
  },
};
