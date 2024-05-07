import { createScan, scanId, scanQuery } from "../interfaces";
import TABLE from "../models";
import { HttpError } from "../util/HttpError";

class ScanRepository {
  async getById(id: scanId) {
    const scan = await TABLE.SCANS.query().findById(id);
    if (!scan) {
      throw new HttpError(404, "scan not found");
    }
    return scan;
  }

  async findMany(){
    return await TABLE.SCANS.query()
  }

  async findByFilter(query: scanQuery) {
    const scan = await TABLE.SCANS.query().findOne(query);
    if (!scan) {
      throw new HttpError(404, "scan not found");
    }
    return scan;
  }

  async findManyByFilter(query: scanQuery) {
    const scan = await TABLE.SCANS.query().where(query);
    if (!scan) {
      throw new HttpError(404, "scan not found");
    }
    return scan;
  }

  async create(data: createScan) {
    return await TABLE.SCANS.query().insert(data);
  }

  async delete(id: scanId) {
    return await TABLE.SCANS.query().deleteById(id);
  }
}

export default ScanRepository;
