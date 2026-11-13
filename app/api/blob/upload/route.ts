import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { getAdminUser } from '@/lib/auth/server';
import { allowedImageTypes, maxImageBytes } from '@/lib/storage/images';

export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const response = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!(await getAdminUser())) throw new Error('Unauthorized');
        if (!pathname.startsWith('realisations/')) throw new Error('Invalid path');
        return {
          allowedContentTypes: allowedImageTypes,
          maximumSizeInBytes: maxImageBytes,
          addRandomSuffix: true,
        };
      },
    });
    return NextResponse.json(response);
  } catch {
    return NextResponse.json({ error: 'Upload refusé.' }, { status: 400 });
  }
}
