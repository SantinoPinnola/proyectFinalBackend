import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary';
import { productsAPI } from '../apis/productsAPI';
import { ProductI } from '../interfaces/productsInterfaces';
import { logger } from '../middlewares/logger';
class imageController {

    async uploadImage (req : Request, res : Response) {
        try {
            logger.info('entrando')
            if(req.files) {
                logger.warn('entrando en file');
                const id = req.params.id;
                const { tempFilePath } = req.files.thumbnail as UploadedFile;
                console.log(tempFilePath);
                const { secure_url, public_id } = await cloudinary.uploader.upload(
					tempFilePath,
					{ folder: 'samples' }
				);
                console.log('subiendo fotod');
                const product = await productsAPI.getProducts(id) as ProductI[];
                const updatedItem = await productsAPI.updateProduct(id, {$push : {photos : public_id } });
                res.status(201).json({
                    msg: 'añadiendo imagen',
                });
                
            }
        }
        catch (error: any) {
            return res.status(400).json({ msg: error.message });
        }
    }
}

export const imgController = new imageController();