import { UserDoc } from '../models/users';
import path from 'path';

export const imageDest = (imageId: number) => path.join(__dirname, '../../images/'+ imageId + '.jpeg');

export const imageName = (imageId: number) => + imageId + ".jpeg";

export const getUserFields = (data: UserDoc,fieldName: string) => {
    try {
        const user = Array.isArray(data) ? data[0] : null;
        return (user && user[fieldName]) ? user[fieldName] : []
    } catch (error) {
        throw error;
    }
}