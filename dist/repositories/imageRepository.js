"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageRepository = void 0;
const data_source_1 = require("../data-source");
const Image_1 = require("../entities/Image");
exports.imageRepository = data_source_1.AppDataSource.getRepository(Image_1.Image);
