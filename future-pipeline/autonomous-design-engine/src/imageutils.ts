import { readFileSync, existsSync } from 'fs';

export interface ImageMetadata {
  format: 'jpeg' | 'png' | 'webp' | 'unknown';
  width: number;
  height: number;
  isCmyk: boolean;
}

/**
 * Parses basic image metadata without heavy native dependencies.
 * Extracts width, height, and detects CMYK in JPEGs.
 */
export function parseImageMetadata(filePath: string): ImageMetadata {
  if (!existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  // Read the first 64KB, enough for metadata markers
  const buffer = Buffer.alloc(65536);
  const fd = readFileSync(filePath);
  fd.copy(buffer, 0, 0, Math.min(fd.length, buffer.length));

  if (buffer.length < 16) {
    return { format: 'unknown', width: 0, height: 0, isCmyk: false };
  }

  // Check for PNG: 89 50 4E 47 0D 0A 1A 0A
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
    // PNG IHDR chunk is usually right after the 8-byte signature
    // Length (4 bytes), Type (4 bytes "IHDR"), Width (4), Height (4)
    if (buffer.toString('ascii', 12, 16) === 'IHDR') {
      const width = buffer.readUInt32BE(16);
      const height = buffer.readUInt32BE(20);
      return { format: 'png', width, height, isCmyk: false };
    }
    return { format: 'png', width: 0, height: 0, isCmyk: false };
  }

  // Check for JPEG: FF D8
  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    let width = 0;
    let height = 0;
    let isCmyk = false;

    while (offset < buffer.length - 1) {
      // Find next marker
      while (offset < buffer.length && buffer[offset] !== 0xff) offset++;
      while (offset < buffer.length && buffer[offset] === 0xff) offset++;
      if (offset >= buffer.length) break;

      const marker = buffer[offset];
      offset++;

      // EOI or SOS marker means end of headers
      if (marker === 0xd9 || marker === 0xda) break;

      // Standalone markers without length
      if (marker === 0x00 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue;

      const length = buffer.readUInt16BE(offset);

      // Check APP14 (Adobe) for CMYK detection
      if (marker === 0xee && length >= 14 && offset + 13 < buffer.length) {
        const identifier = buffer.toString('ascii', offset + 2, offset + 7);
        if (identifier === 'Adobe') {
          const colorTransform = buffer[offset + 13];
          // colorTransform 0=Unknown(CMYK), 1=YCbCr, 2=YCCK
          if (colorTransform === 0 || colorTransform === 2) {
            isCmyk = true;
          }
        }
      }

      // SOF markers (Start of Frame) containing dimensions
      if ((marker >= 0xc0 && marker <= 0xc3) || (marker >= 0xc5 && marker <= 0xc7) || (marker >= 0xc9 && marker <= 0xcb) || (marker >= 0xcd && marker <= 0xcf)) {
        if (offset + 6 < buffer.length) {
          height = buffer.readUInt16BE(offset + 3);
          width = buffer.readUInt16BE(offset + 5);
        }
      }

      offset += length;
    }

    return { format: 'jpeg', width, height, isCmyk };
  }

  // Check for WebP: RIFF ... WEBP
  if (buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP') {
    // VP8 / VP8L / VP8X
    const chunkType = buffer.toString('ascii', 12, 16);
    let width = 0;
    let height = 0;

    if (chunkType === 'VP8 ') {
      if (29 < buffer.length) {
        width = buffer.readUInt16LE(26) & 0x3fff;
        height = buffer.readUInt16LE(28) & 0x3fff;
      }
    } else if (chunkType === 'VP8L') {
      if (24 < buffer.length) {
        const b0 = buffer[21];
        const b1 = buffer[22];
        const b2 = buffer[23];
        const b3 = buffer[24];
        width = 1 + (((b1 & 0x3f) << 8) | b0);
        height = 1 + (((b3 & 0xf) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6));
      }
    } else if (chunkType === 'VP8X') {
      if (29 < buffer.length) {
        width = 1 + (buffer.readUInt32LE(24) & 0xffffff);
        height = 1 + (buffer.readUInt32LE(27) & 0xffffff);
      }
    }

    return { format: 'webp', width, height, isCmyk: false };
  }

  return { format: 'unknown', width: 0, height: 0, isCmyk: false };
}
