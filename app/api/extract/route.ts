import { NextRequest, NextResponse } from 'next/server';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size exceeds 5MB limit' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let text = '';

    // Extract text based on file type
    if (file.name.toLowerCase().endsWith('.pdf')) {
      try {
        const data = await pdf(buffer);
        text = data.text;
      } catch (pdfError) {
        console.error('PDF parsing error:', pdfError);
        return NextResponse.json(
          { error: 'Failed to parse PDF file' },
          { status: 500 }
        );
      }
    } else if (file.name.toLowerCase().endsWith('.docx')) {
      try {
        const result = await mammoth.extractRawText({ buffer });
        text = result.value;
      } catch (docxError) {
        console.error('DOCX parsing error:', docxError);
        return NextResponse.json(
          { error: 'Failed to parse DOCX file' },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { error: 'Unsupported file type. Please upload PDF or DOCX' },
        { status: 400 }
      );
    }

    // Clean up the extracted text
    text = text
      .replace(/\r\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    if (!text || text.length < 100) {
      return NextResponse.json(
        { error: 'Could not extract sufficient text from file' },
        { status: 400 }
      );
    }

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error('File extraction error:', error);
    return NextResponse.json(
      { error: 'File extraction failed: ' + error.message },
      { status: 500 }
    );
  }
}