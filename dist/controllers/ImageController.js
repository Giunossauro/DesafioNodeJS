"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageController = void 0;
const imageRepository_1 = require("../repositories/imageRepository");
class ImageController {
    async getImages(_req, res) {
        try {
            const images = await imageRepository_1.imageRepository.find({
                select: {
                    id: true,
                    name: true,
                    description: true,
                    picture: true,
                },
                order: {
                    id: "ASC",
                },
            });
            res.status(200).json(images);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Sever Error" });
        }
    }
    async getImageById(req, res) {
        const { id } = req.params;
        try {
            const image = await imageRepository_1.imageRepository.findOne({
                select: {
                    id: true,
                    name: true,
                    description: true,
                    picture: true,
                },
                where: {
                    id: Number(id),
                },
            });
            res.status(200).json({
                id: image === null || image === void 0 ? void 0 : image.id,
                name: image === null || image === void 0 ? void 0 : image.name,
                description: image === null || image === void 0 ? void 0 : image.description,
                picture: image === null || image === void 0 ? void 0 : image.picture,
            });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Sever Error" });
        }
    }
    async getImagesByName(req, res) {
        const { name } = req.params;
        try {
            const tempImages = await imageRepository_1.imageRepository.query(`
        SELECT * FROM images WHERE name ILIKE '${name}%';
      `);
            const images = tempImages.map((image) => {
                return {
                    id: image === null || image === void 0 ? void 0 : image.id,
                    name: image === null || image === void 0 ? void 0 : image.name,
                    description: image === null || image === void 0 ? void 0 : image.description,
                    picture: image === null || image === void 0 ? void 0 : image.picture.toString("base64"),
                };
            });
            res.status(200).json(images);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Sever Error" });
        }
    }
    async post(req, res) {
        //const { name, description, filename } = req.body;
        req.setEncoding("latin1");
        let data = "";
        for await (const chunk of req) {
            data += chunk;
        }
        const body = JSON.parse(data);
        try {
            await imageRepository_1.imageRepository.insert([{
                    name: body.name,
                    description: body.description,
                    picture: body.picture,
                    filename: body.filename
                }]);
            res.sendStatus(201);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Sever Error" });
        }
    }
    /* async patch(req: Request, res: Response): Promise<void> {
      const { name, description, pictured } = req.body;
  
      try {
        await imageRepository.insert([{
          name: name,
          description: description,
          picture: picture,
        }]);
  
        res.sendStatus(201);
      } catch (error: any | unknown) {
        console.log(error);
        res.status(500).json({ message: "Internal Sever Error" });
      }
    } */
    async put(req, res) {
        const { id } = req.params;
        req.setEncoding("latin1");
        let data = "";
        for await (const chunk of req) {
            data += chunk;
        }
        const body = JSON.parse(data);
        try {
            await imageRepository_1.imageRepository.update(Number(id), {
                name: body.name,
                description: body.description,
                picture: body.picture,
                filename: body.filename
            });
            res.sendStatus(200);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Sever Error" });
        }
    }
    async delete(req, res) {
        const { id } = req.params;
        try {
            await imageRepository_1.imageRepository.delete(Number(id));
            res.status(204).send("Imagem excluída com sucesso!");
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Sever Error" });
        }
    }
}
exports.ImageController = ImageController;
