import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }
  if (
    file.type !== 'application/vnd.openxmlformats-officedocument.presentationml.presentation' &&
    file.type !== 'application/pdf'
  ) {
    return NextResponse.json({ error: 'Only pptx or pdf files are allowed' }, { status: 400 });
  }
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  await fs.mkdir(uploadsDir, { recursive: true });
  const filePath = path.join(uploadsDir, file.name);
  await fs.writeFile(filePath, buffer);
  return NextResponse.json({ message: 'File uploaded successfully', fileName: file.name });
};

export const GET = async () => {
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  await fs.mkdir(uploadsDir, { recursive: true });
  const files = await fs.readdir(uploadsDir);
  return NextResponse.json({ files });
};

export const DELETE = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const fileName = searchParams.get('file');
  if (!fileName) {
    return NextResponse.json({ error: 'Missing file name' }, { status: 400 });
  }
  const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
  try {
    await fs.unlink(filePath);
    return NextResponse.json({ message: 'File deleted' });
  } catch (err) {
    return NextResponse.json({ error: 'File not found or cannot delete' }, { status: 404 });
  }
}; 