import Datauri from 'datauri';
import path from 'path';

export const dataUri = (req: any) => {
  const dUri = new Datauri();
  return dUri.format(
    path.extname(req.file.originalname).toString(),
    req.file.buffer,
  );
};
