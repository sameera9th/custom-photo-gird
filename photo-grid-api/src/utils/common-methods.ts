import { Counter } from '../models/auto-inc-counter';
import path from 'path';

// service to get auto increment number, this is a manually implemented mechanism to auto-increment numbers since Mongo does not have such a feature.
export const getValueForNextSequence = async (sequenceOfName: string) => {
    try{
        const sequenceDoc = await Counter.findOneAndUpdate({_id: sequenceOfName }, { $inc: { sequence_value: Number(1) }})
        if(sequenceDoc){
            return sequenceDoc.sequence_value;
        }
        return Number(1);
    } catch (ex) {
        throw ex;
    }
}

export const imageDest = (imageId: number) => path.join(__dirname, '../../images/'+ imageId + '.jpeg');

export const imageName = (imageId: number) => + imageId + ".jpeg";