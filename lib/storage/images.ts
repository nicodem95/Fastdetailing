import 'server-only';
import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { randomUUID } from 'node:crypto';

const extensionsByContentType = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
} as const;

type SupportedImageContentType = keyof typeof extensionsByContentType;

let client: S3Client | undefined;

function getStorageConfig() {
  const bucket = process.env.OBJECT_STORAGE_BUCKET;
  const accessKeyId = process.env.OBJECT_STORAGE_ACCESS_KEY_ID;
  const secretAccessKey = process.env.OBJECT_STORAGE_SECRET_ACCESS_KEY;
  const publicUrl = process.env.OBJECT_STORAGE_PUBLIC_URL;

  if (!bucket || !accessKeyId || !secretAccessKey || !publicUrl) {
    throw new Error('Object storage configuration is incomplete.');
  }

  if (!client) {
    client = new S3Client({
      endpoint: process.env.OBJECT_STORAGE_ENDPOINT || undefined,
      region: process.env.OBJECT_STORAGE_REGION || 'us-east-1',
      forcePathStyle: process.env.OBJECT_STORAGE_FORCE_PATH_STYLE === 'true',
      credentials: { accessKeyId, secretAccessKey },
    });
  }

  return { bucket, publicUrl: publicUrl.endsWith('/') ? publicUrl : `${publicUrl}/` };
}

function validateObjectKey(key: string) {
  if (!key.startsWith('realisations/') || key.split('/').some((part) => !part || part === '.' || part === '..')) {
    throw new Error('Invalid image object key.');
  }
}

export function createImageObjectKey(contentType: string) {
  if (!Object.hasOwn(extensionsByContentType, contentType)) {
    throw new Error('Unsupported image type. Use JPEG, PNG or WebP.');
  }

  const extension = extensionsByContentType[contentType as SupportedImageContentType];
  return `realisations/${randomUUID()}.${extension}`;
}

export async function uploadImageObject({ key, body, contentType }: {
  key: string;
  body: Uint8Array;
  contentType: string;
}) {
  validateObjectKey(key);
  if (!Object.hasOwn(extensionsByContentType, contentType)) {
    throw new Error('Unsupported image type. Use JPEG, PNG or WebP.');
  }

  const { bucket, publicUrl } = getStorageConfig();
  await client!.send(new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: contentType,
  }));

  const encodedKey = key.split('/').map(encodeURIComponent).join('/');
  return { key, url: new URL(encodedKey, publicUrl).toString() };
}

export async function deleteImageObject(key: string) {
  validateObjectKey(key);
  const { bucket } = getStorageConfig();
  await client!.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
}