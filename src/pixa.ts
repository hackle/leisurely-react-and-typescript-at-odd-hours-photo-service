import { Request, Response } from 'express';
import axios from 'axios';

export type PixaResponse = { 
    hits: {
        webformatURL: string,
        previewURL: string,
        largeImageURL: string,
    }[] 
};
const apiKey = '18049587-99bf6238de19f175bd7defcf8';
const makePixaUrl = (term: string) => `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(term)}&image_type=photo&pretty=true`;

export async function searchForPhotos(req: Request, res: Response) {
    const pixaResponse = await axios.get<PixaResponse>(makePixaUrl(req.params.term));

    res.send(pixaResponse.data);
}