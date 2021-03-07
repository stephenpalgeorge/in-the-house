import { IErrorObject } from '@in-the-house/api-interfaces';
import { Response, Request, Router } from 'express';
import { listmps, singlemp } from '../controllers';

import { apiMiddleware, constituenciesMiddleware, namesMiddleware } from '../middleware';

const router = Router();

router.get(
  '/test',
  [apiMiddleware.keyMiddleware, apiMiddleware.usageMiddleware],
  async (req: Request, res: Response) => {
    res.json({ message: 'testing the api routes and middleware' });
  }
);

/**
 * ----------
 * POSTCODES
 * ----------
 */

// GET SINGLE POSTCODE
// ----------
// req.params.postcode is a single, full postcode. The end point returns a JSON
// object that includes an MPs contact details as provided on the uk parliament
// website:
// https://members.parliament.uk/
// 
router.get(
  '/postcodes/single/:postcode',
  [apiMiddleware.keyMiddleware, apiMiddleware.usageMiddleware],
  async (req: Request, res: Response) => {
    const mp = await singlemp('fymp', req.params.postcode);
    if (!mp) {
      const error: IErrorObject = { type: 'Not found', message: 'could not find an MP for that postcode - check you wrote it correctly?' };
      res.status(404).json(error);
    } else res.status(200).json(mp);
  }
);

// GET MULTIPLE POSTCODES
// ----------
router.get(
  '/list/:postcodes',
  [apiMiddleware.keyMiddleware, apiMiddleware.usageMiddleware],
  async (req: Request, res: Response) => {
    const [errors, mps] = await listmps('fymp', req.params.postcodes);
    if (errors.length > 0) {
      const error: IErrorObject = { type: 'Not found', message: `Could not find MPs: ${errors.join(', ')}` };
      res.status(404).json(error);
    } else res.status(200).json(mps);
  }
);

/**
 * ----------
 * NAMES
 * ----------
 */

// GET SINGLE NAME
// ----------
// req.params.name is a single MPs full name. This endpoint returns
// the details for the MP that matches that name, or a 404 if no-
// one if found.
// 
router.get(
  '/single/:name',
  [apiMiddleware.keyMiddleware, apiMiddleware.usageMiddleware, namesMiddleware],
  async (req: Request, res: Response) => {
    const mp = await singlemp('name', req.params.name);
    if (!mp) {
      const error: IErrorObject = { type: 'Not found', message: 'Could not find an mp by that name...check for typos?' };
      res.status(404).json(error);
    } else res.status(200).json(mp);
  }
);

// GET MULTIPLE NAMES
// ----------
// req.params.names is a '+' separated list of names that is then iterated
// on to return an array of objects in format: {
//    Name: name,
//    MP: mp_data
// }
// 
router.get(
  '/list/:names',
  [apiMiddleware.keyMiddleware, apiMiddleware.usageMiddleware, namesMiddleware],
  async (req: Request, res: Response) => {
    const [errors, mps] = await listmps('name', req.params.names);
    if (errors.length > 0) {
      const error: IErrorObject = { type: 'Not found', message: `Could not find MPs: ${errors.join(', ')}` };
      res.status(404).json(error);
    } else res.status(200).json(mps);
  }
);

/**
 * ----------
 * CONSTITUENCIES
 * ----------
 */

// GET SINGLE CONSTITUENCY
// ----------
// req.params.cons is a constituency that is used to find the
// details of a member of parliament.
// 
router.get(
  '/single/:con',
  [apiMiddleware.keyMiddleware, apiMiddleware.usageMiddleware, constituenciesMiddleware],
  async (req: Request, res: Response) => {
    const mp = await singlemp('constituency', req.params.con);
    if (!mp) {
      const error: IErrorObject = { type: 'Not found', message: `Could not find the constituency: ${req.params.con}` };
      res.status(404).json(error);
    } else res.status(200).json(mp);
  }
);

// GET MULTIPLE CONSTITUENCIES
// ----------
// req.params.cons is a comma separated string of constituency names, which
// is then iterated on to fetch an array of MPs in the format {
//    Constituency: con,
//    MP: mp_data
// }
// 
router.get(
  '/list/:cons',
  [apiMiddleware.keyMiddleware, apiMiddleware.usageMiddleware, constituenciesMiddleware],
  async (req: Request, res: Response) => {
    const [errors, mps] = await listmps('constituency', req.params.cons);
    if (errors.length > 0) {
      const error: IErrorObject = { type: 'Not found', message: `Could not find constituencies: ${errors.join(', ')}` };
      res.status(404).json(error);
    } else res.status(200).json(mps);
  }
);

export default router;
