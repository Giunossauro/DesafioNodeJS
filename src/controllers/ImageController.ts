import { Request, Response } from "express";
import { Image } from "../entities/Image";
import { imageRepository } from "../repositories/imageRepository";

export class ImageController {
  async getImages(_req: Request, res: Response): Promise<void> {
    try {
      const images = await imageRepository.find({
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
    } catch (error: any | unknown) {
      console.log(error)
      res.status(500).json({ message: "Internal Sever Error" });
    }
  }

  async getImageById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const image = await imageRepository.findOne({
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
        id: image?.id,
        name: image?.name,
        description: image?.description,
        picture: image?.picture,
      });
    } catch (error: any | unknown) {
      console.log(error)
      res.status(500).json({ message: "Internal Sever Error" });
    }
  }

  async getImagesByName(req: Request, res: Response): Promise<void> {
    const { name } = req.params;

    try {
      const tempImages = await imageRepository.query(`
        SELECT * FROM images WHERE name ILIKE '${name}%';
      `);

      const images = tempImages.map((image: any): object => {
        return {
          id: image?.id,
          name: image?.name,
          description: image?.description,
          picture: image?.picture.toString("base64"),
        }
      });

      res.status(200).json(images);
    } catch (error: any | unknown) {
      console.log(error)
      res.status(500).json({ message: "Internal Sever Error" });
    }
  }

  async post(req: Request, res: Response): Promise<void> {
    //const { name, description, filename } = req.body;
    req.setEncoding("latin1");
    let data: string = "";

    for await (const chunk of req) {
      data += chunk;
    }
    
    const body: Image = JSON.parse(data);

    try {
      await imageRepository.insert([{
        name: body.name,
        description: body.description,
        picture: body.picture,
        filename: body.filename
      }]);

      res.sendStatus(201);
    } catch (error: any | unknown) {
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

  async put(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    req.setEncoding("latin1");
    let data = "";

    for await (const chunk of req) {
      data += chunk;
    }

    const body: Image = JSON.parse(data);

    try {
      await imageRepository.update(Number(id), {
        name: body.name,
        description: body.description,
        picture: body.picture,
        filename: body.filename
      });

      res.sendStatus(200);
    } catch (error: any | unknown) {
      console.log(error);
      res.status(500).json({ message: "Internal Sever Error" });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      await imageRepository.delete(Number(id));

      res.status(204).send("Imagem excluída com sucesso!");
    } catch (error: any | unknown) {
      console.log(error);
      res.status(500).json({ message: "Internal Sever Error" });
    }
  }
}
