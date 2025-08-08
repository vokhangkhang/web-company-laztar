import { writeFile } from 'fs/promises'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('image') as File

  if (!file) {
    return NextResponse.json({ success: false, message: 'Không tìm thấy file!' })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const fileName = file.name
  const filePath = path.join(process.cwd(), 'public/images', fileName)

  await writeFile(filePath, buffer)

  return NextResponse.json({ success: true, path: `/images/${fileName}` })
}