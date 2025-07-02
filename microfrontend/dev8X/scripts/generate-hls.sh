#!/bin/bash

BASE_DIR="./public/videos/offers"

find "$BASE_DIR" -type d | while read -r SUBFOLDER; do
  # Skip if master.m3u8 exists
  if [ -f "$SUBFOLDER/master.m3u8" ]; then
    echo "✅ HLS already exists in: $SUBFOLDER"
    continue
  fi

  # Look for .mp4 file in the folder
  MP4_FILE=$(find "$SUBFOLDER" -maxdepth 1 -type f -name "*.mp4" | head -n 1)

  if [ -n "$MP4_FILE" ]; then
    echo "🎬 Generating HLS for: $MP4_FILE"

    ffmpeg -i "$MP4_FILE" -preset veryfast -g 48 -sc_threshold 0 \
      -filter_complex "[0:v]split=2[v1][v2]; \
        [v1]scale=w=1280:h=720[v1out]; \
        [v2]scale=w=854:h=480[v2out]" \
      -map "[v1out]" -map 0:a -c:v:0 libx264 -b:v:0 2800k -c:a:0 aac -b:a:0 128k \
      -map "[v2out]" -map 0:a -c:v:1 libx264 -b:v:1 1400k -c:a:1 aac -b:a:1 128k \
      -f hls \
      -hls_time 4 -hls_playlist_type vod \
      -master_pl_name master.m3u8 \
      -var_stream_map "v:0,a:0 v:1,a:1" \
      "$SUBFOLDER/stream_%v.m3u8"

    echo "✅ HLS generated in: $SUBFOLDER"
  else
    echo "⚠️ No .mp4 file found in: $SUBFOLDER"
  fi
done
