import { PublicKey } from '@solana/web3.js'

export enum ProgramName {
  Brick = 'brick',
}

export const BRICK_PROGRAM_ID = 'brick5uEiJqSkfuAvMtKmq7kiuEVmbjVMiigyV51GRF';
export const BRICK_PROGRAM_ID_PK = new PublicKey(BRICK_PROGRAM_ID);
export const METADATA_PROGRAM_ID_PK = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
export const BUBBLEGUM_PROGRAM_ID_PK = new PublicKey("BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY");
export const NOOP_PROGRAM_ID_PK = new PublicKey("noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV");
export const COMPRESSION_PROGRAM_ID_PK = new PublicKey("cmtDvXumGCrqC1Age74AVPhSRVXJMd8PJS91L8KbNCK");

export const FNET_MINT = new PublicKey("FNETmyYZNMTNcWCEssWS4ZJ6hZ1yu9Fu3n8uNmSRLzF5");
export const USDC_MINT = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
