#!/bin/bash

BASE_DIR="./public/videos/offers"

find "$BASE_DIR" -type d | while read -r SUBFOLDER; do
  # Skip if master.m3u8 exists
  if [ -f "$SUBFOLDER/master.m3u8" ]; then
    echo "✅ HLS already exists in: $SUBFOLDER"
    continue
  fi

  # Find the first .mp4 file in the folder
  MP4_FILE=$(find "$SUBFOLDER" -maxdepth 1 -type f -name "*.mp4" | head -n 1)

  if [ -n "$MP4_FILE" ]; then
    echo "🎬 Generating HLS for: $MP4_FILE"

    # Check if the .mp4 has an audio stream
    HAS_AUDIO=$(ffprobe -i "$MP4_FILE" -show_streams -select_streams a -loglevel error)

    if [ -z "$HAS_AUDIO" ]; then
      echo "🔇 No audio stream detected. Generating video-only HLS."
      AUDIO_MAP_720=""
      AUDIO_MAP_480=""
      AUDIO_CODEC_720=""
      AUDIO_CODEC_480=""
      VAR_STREAM_MAP="v:0 v:1"
    else
      echo "🔊 Audio stream detected. Including audio in HLS."
      AUDIO_MAP_720="-map 0:a?"
      AUDIO_MAP_480="-map 0:a?"
      AUDIO_CODEC_720="-c:a:0 aac -b:a:0 128k"
      AUDIO_CODEC_480="-c:a:1 aac -b:a:1 128k"
      VAR_STREAM_MAP="v:0,a:0 v:1,a:1"
    fi

    ffmpeg -i "$MP4_FILE" -preset veryfast -g 48 -sc_threshold 0 \
      -filter_complex "[0:v]split=2[v1][v2]; \
        [v1]scale=w=1280:h=720[v1out]; \
        [v2]scale=w=854:h=480[v2out]" \
      -map "[v1out]" $AUDIO_MAP_720 -c:v:0 libx264 -b:v:0 2800k $AUDIO_CODEC_720 \
      -map "[v2out]" $AUDIO_MAP_480 -c:v:1 libx264 -b:v:1 1400k $AUDIO_CODEC_480 \
      -f hls \
      -hls_time 4 -hls_playlist_type vod \
      -master_pl_name master.m3u8 \
      -var_stream_map "$VAR_STREAM_MAP" \
      "$SUBFOLDER/stream_%v.m3u8"

    echo "✅ HLS generated in: $SUBFOLDER"
  else
    echo "⚠️ No .mp4 file found in: $SUBFOLDER"
  fi
done
