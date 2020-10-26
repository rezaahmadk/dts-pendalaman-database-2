import { Router } from 'express';
import { FirebaseClient } from '../databases/antrian';
const firebaseClient = new FirebaseClient();

const router = Router();

//@route    POST /antrian/add
//@desc     Add antrian data
router.post('/add', async (req, res, next) => {
    const antrian = req.body;
    try {
        await firebaseClient.addData(antrian);
    } catch (error) {
        return next(error);
    }

    res.json({
        message: 'success'
    });
});

//@route    GET /antrian/
//@desc     Get all antrian data
router.get('/', async (req, res, next) => {
    let antrians;
    try {
        antrians = await firebaseClient.getData();
    } catch (error) {
        return next(error);
    }

    res.json(antrians);
});

//@route    GET /antrian/:id
//@desc     Get antrian by Id
router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    let antrian;
    try {
        antrian = await firebaseClient.getDataById(id);
    } catch (error) {
        return next(error);
    }
  
    res.json(antrian);
});

//@route    PUT /antrian/:id
//@desc     Update antrian by id
router.put('/:id', async (req, res, next) => {
    const id = req.params.id;
    const update = req.body;
    let antrian;
    try {
        antrian = await firebaseClient.updateData(id, update);
    } catch (error) {
        return next(error);
    }

    res.json(antrian);
});

//@route    DELETE /antrian/:id
//@desc     Delete antrian by id
router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        await firebaseClient.deleteData(id);
    } catch (error) {
        return next(error);
    }

    res.json({
        message: 'Data Deleted'
    });
});

//@route    GET /antrian/jenisantrian/:jenisantrian
//@desc     Get antrian by jenis antrian
router.get('/jenisantrian/:jenisantrian', async (req, res, next) => {
    const jenisantrian = req.params.jenisantrian;
    let antrian;
    try {
        antrian = await firebaseClient.getDataByJenisAntrian(jenisantrian);
    } catch (error) {
        return next(error);
    }
  
    res.json(antrian);
});

//@route    GET /antrian/loket/:loket
//@desc     Get antrian by loket
router.get('/loket/:loket', async (req, res, next) => {
    const loket = Number(req.params.loket);
    let antrians;
    try {
      antrians = await firebaseClient.getDataByLoket(loket);
    } catch(error) {
      return next(error);
    }
  
    res.send(antrians);
});

export default router;