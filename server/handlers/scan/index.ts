import { Request, Response } from "express";
import ScanService from "../../services/ScanService";
import uploads from "../../infra/file-storage/uploads";
import {  getPredictionFromModel } from "../../infra/others";
import FormData from "form-data";
import { createScanSchema, scanParamsSchema, userScanParamsSchema, userScanQuery } from "./schema";
import fs from 'fs'

export const createScan = async (req: Request, res: Response) => {
  const scanService = new ScanService();
  const file = req.file!;
  const form = new FormData();
  form.append("file",fs.readFileSync(file.path), "file");
  const prediction = await getPredictionFromModel(form);
  const image = await uploads.uploadToSupabase(file);
  const scanObject = {
    user_id: req.user.userId,
    image_url: image,
    disease_class: prediction.data.predicted_class,
    confidence_level: prediction.data.confidence,
  };
  await createScanSchema.validateAsync(scanObject,{abortEarly:false})
  const scan = await scanService.createScan(scanObject);
  res.send(scan);
};

export const getScan = async (req: Request, res: Response) => {
  await scanParamsSchema.validateAsync(req.params,{abortEarly:false})
  const scanService = new ScanService();
  const scan =  await scanService.getScanById(req.params.id)
  res.send(scan)
};

export const getUserScans = async (req: Request, res: Response) => {
  const query = {user_id:req.user.userId};
  await userScanParamsSchema.validateAsync(query,{abortEarly:false})
  const scanService = new ScanService();
  const scans = await scanService.getUserScans(query)
  res.send(scans)
};

export const getScans = async (req: Request, res: Response) => {
  const scanService = new ScanService();
  const scans = await scanService.getScans()
  res.send(scans)
};

export const deleteUserScan = async (req: Request, res: Response) => {
  const query = {id:req.params.id,user_id:req.user.userId};
  await userScanQuery.validateAsync(query,{abortEarly:false})
  const scanService = new ScanService();
  const scan = await scanService.deleteUserScan(query)
  res.status(204).send(scan)
};

export const deleteScan = async (req: Request, res: Response) => {
  await scanParamsSchema.validateAsync(req.params,{abortEarly:false})
  const scanService = new ScanService();
  const scan = await scanService.deleteScan(req.params.id)
  res.status(204).send(scan)
};
