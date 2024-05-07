import { createScan, scanId, scanQuery, userId } from "../interfaces";
import ScanRepository from "../repositories/ScanRepository";

class ScanService {
  private scanRepository = new ScanRepository();

  async getScanById(id: scanId) {
    return await this.scanRepository.getById(id);
  }

  async getScans(){
    return await this.scanRepository.findMany()
  }

  async getUserScans(query: scanQuery) {
    return await this.scanRepository.findManyByFilter(query);
  }

  async createScan(data: createScan) {
    return await this.scanRepository.create(data);
  }

  async deleteUserScan(query: scanQuery) {
    const scan = await this.scanRepository.findByFilter(query);
    return await this.scanRepository.delete(scan.id);
  }

  async deleteScan(id:scanId){
     await this.scanRepository.getById(id)
     return await this.scanRepository.delete(id)
  }
}

export default ScanService;
